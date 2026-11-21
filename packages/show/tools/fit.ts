/**
 * npm run fit -- <ep> <segment-id> | <ep> --draft <slug>   [--json] [--apply] [--takes 4] [--lines id,id] [--no-search]
 *
 * The fitting tool: fits a script to the voice engine without changing its words. Every spoken line
 * and every captioned sung line is rendered in its voice, cut out of the segment's mix (whatever is
 * under it counts) and transcribed by Whisper (base.en) several times at slightly different mixes
 * (the takes: in the mix, the mix 3 dB louder, quieter and tighter, and the line alone). A line that
 * is not heard well, or whose heard text is flagged, is searched for a fix: respellings of its
 * missed words (the pronunciation dictionary, the README's tested table and weak sounds, what fixed
 * that word before), commas that set a word apart, and its respelling taken back out; then the two
 * best single fixes together; then, as a suggestion only, a slower rate.
 *
 * Per line: the words, the respelling in use, every distinct heard text with its count, the score
 * (words heard of words: the median take, and the worst), a status (ok, weak, flagged, unsayable)
 * and the flags. The statuses describe; since the owner's ruling of 21 November 2026 (best effort
 * is sufficient, subtitles carry the line) only something heard that is alarming, out of bounds or
 * crude is never accepted: such a line is listed first, for the owner. A real person's line heard
 * differently is listed last ("heard differently, caption exact"). The voice research file
 * (data/voice-research.json) is read: a spelling that worked for a word in this voice is tried
 * first, and a word known to be hard is not searched past its known tries ("known hard word").
 * A respelling keeps the word's sounds (sounds.mjs, config/sounds.json): for a dictionary word, a
 * candidate whose phonemes (the engine's G2P) change its vowels or turn a consonant into another is
 * rejected before it is rendered; a hand respelling in the script that does so is listed under
 * "sounds different from the word" (it does not block). --sounds only runs that check over the
 * script's `as` fields, with no rendering and no Whisper, and exits 0.
 * --json writes fit.json beside the script (for a published episode's segment, into
 * the tool's cache instead, so the committed build's sourceHash is not disturbed). --apply writes
 * the chosen respellings into the script's `as` fields and nothing else. Exit 1 when a line is still
 * heard as something alarming, out of bounds or crude, 0 otherwise (weak, flagged and unsayable
 * lines included), 2 for bad arguments.
 *
 * A draft is episodes/<ep>/production/drafts/<slug>/script.js with its cast.js merged over the
 * episode's; fitting it writes nothing under the episode's public/ or segments/. Renders are cached
 * (tools/.cache/), and so is every transcription (tools/.cache/fit/heard/, keyed by the audio), so
 * a second run of an unchanged script takes seconds and gives the same answer.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, renameSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { cpus } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FS, loadEngine } from "./engine.ts";
import type { Clip } from "./clips.ts";
import { layout, ScriptError, type Layout, type Line } from "./render.ts";
import { measureVoice } from "./analyze.ts";
import { CAST } from "../src/cast.js";
import { loadEpisode, loadDraft, requireSegment, exitOnEpisodeError } from "./episode.mjs";
import { takeDraftArg } from "./draft.mjs";
import { GATE, wordScore, missedWords, flagsFor, summarise, lineStatus, better, overGate, realNames, isRealLine, blockingFlags } from "./heard.mjs";
import { loadResearch, knownFor, voiceOf } from "./voice-research-lib.mjs";
import { lineCandidates, combine, loadDict, splitToken } from "./respell.mjs";
import { lineSounds, soundsRow } from "./sounds.mjs";
import { acceptor, printAudit, soundsTools } from "./sounds.ts";
import { applyAs } from "./source-edit.mjs";
import { nearest } from "./voices-lib.mjs";

const HERE = fileURLToPath(new URL("./", import.meta.url));
const CACHE = join(HERE, ".cache", "fit");
const HEARD_CACHE = join(CACHE, "heard");
const LEARNED = join(CACHE, "learned.json");
const MODEL = "base.en";
/** the house cast's ids, before an episode's roster is merged in (a guest is "guest" in the voice research file) */
const HOUSE = new Set(Object.keys(CAST));

/** the takes: how the bed under the line is scaled, how much is cut before and after, the level */
const TAKES = [
  { bed: 1.0, pre: 0.12, post: 0.18, level: 0.7 },
  { bed: 1.41, pre: 0.2, post: 0.25, level: 0.5 },
  { bed: 0.7, pre: 0.06, post: 0.12, level: 0.3 },
  { bed: 0, pre: 0.12, post: 0.18, level: 0.7 },
];
/** the takes a candidate is screened with before it earns a full hearing */
const SCREEN = [0, 3];

// ------------------------------------------------------------------ audio

const MIXG = 0.85;
/** mono gain of an equal-power pan, as render.ts mixes it */
const monoGain = (gain: number, pan: number) => {
  const a = ((pan + 1) * Math.PI) / 4;
  return (gain * MIXG * Math.SQRT2 * (Math.cos(a) + Math.sin(a))) / 2;
};

/** the sfx duck (render.ts mix): 1 − 0.65 while a say or captioned sung line plays, 150 ms ramps */
function duckAt(lay: Layout, t: number): number {
  let d = 1;
  for (const l of lay.lines) {
    if (!(l.kind === "say" || (l.kind === "sing" && l.caption))) continue;
    const a = l.t0 - 0.05, b = l.t1 + 0.05;
    if (t < a - 0.15 || t > b + 0.15) continue;
    const x = t < a ? (t - (a - 0.15)) / 0.15 : t > b ? (b + 0.15 - t) / 0.15 : 1;
    const w = 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, x)));
    d = Math.min(d, 1 - 0.65 * w);
  }
  return d;
}

/** everything in the mix but line `skip`, mono, over [a, b) seconds; sfx ducked as render.ts ducks them */
function bedFor(lay: Layout, skip: Line, a: number, b: number): Float32Array {
  const n0 = Math.round(a * FS), n = Math.max(1, Math.round((b - a) * FS));
  const out = new Float32Array(n);
  for (const l of lay.lines) {
    if (l === skip) continue;
    const g = monoGain(l.gain, l.pan), s0 = Math.round(l.at * FS) - n0;
    const x = l.clip.audio;
    for (let i = Math.max(0, -s0); i < x.length && s0 + i < n; i++) out[s0 + i] += x[i] * g;
  }
  if (!lay.sfx.length) return out;
  // the duck changes slowly: one value per 10 ms
  const STEP = 480;
  const duck = new Float32Array(Math.ceil(n / STEP) + 1);
  for (let k = 0; k < duck.length; k++) duck[k] = duckAt(lay, (n0 + k * STEP) / FS);
  for (const s of lay.sfx) {
    const s0 = Math.round(s.at * FS) - n0;
    for (let i = Math.max(0, -s0); i < s.L.length && s0 + i < n; i++) {
      const j = s0 + i;
      out[j] += 0.5 * (s.L[i] + s.R[i]) * s.gain * (1 - (1 - duck[Math.floor(j / STEP)]) * s.duck);
    }
  }
  return out;
}

/** a 16-bit mono WAV of x, with 0.6 s of digital silence either side (Whisper hallucinates on clips that touch the edge) */
function wav(x: Float32Array, level: number): Buffer {
  let pk = 0;
  for (let i = 0; i < x.length; i++) pk = Math.max(pk, Math.abs(x[i]));
  const g = pk > 1e-6 ? level / pk : 1;
  const pad = Math.round(0.6 * FS), n = x.length + 2 * pad;
  const b = Buffer.alloc(44 + n * 2);
  b.write("RIFF", 0), b.writeUInt32LE(36 + n * 2, 4), b.write("WAVE", 8), b.write("fmt ", 12);
  b.writeUInt32LE(16, 16), b.writeUInt16LE(1, 20), b.writeUInt16LE(1, 22), b.writeUInt32LE(FS, 24);
  b.writeUInt32LE(FS * 2, 28), b.writeUInt16LE(2, 32), b.writeUInt16LE(16, 34), b.write("data", 36), b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < x.length; i++) b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(x[i] * g * 32767))), 44 + (pad + i) * 2);
  return b;
}

/** one take of a clip in place of `line`: the cut, as WAV bytes */
function cut(lay: Layout, line: Line, clip: Clip, take: (typeof TAKES)[number]): Buffer {
  const start = line.t0; // the candidate starts where the line starts
  const at = start - clip.t0;
  const a = Math.max(0, start - take.pre), b = at + clip.t1 + take.post;
  const bed = take.bed ? bedFor(lay, line, a, b) : new Float32Array(Math.max(1, Math.round((b - a) * FS)));
  const g = monoGain(line.gain, line.pan);
  const s0 = Math.round((at - a) * FS);
  const out = new Float32Array(bed.length);
  for (let i = 0; i < out.length; i++) out[i] = bed[i] * take.bed;
  const x = clip.audio;
  for (let i = Math.max(0, -s0); i < x.length && s0 + i < out.length; i++) out[s0 + i] += x[i] * g;
  return wav(out, take.level);
}

// ------------------------------------------------------------------ transcription (cached by the audio)

/** the Python that runs the `whisper` command (its shebang), if it can import whisper */
function whisperPython(): string | null {
  const w = spawnSync("which", ["whisper"]).stdout?.toString().trim();
  if (!w) return null;
  try {
    const first = readFileSync(w, "utf8").split("\n")[0];
    const py = first.startsWith("#!") ? first.slice(2).trim().split(/\s+/)[0] : null;
    if (py && spawnSync(py, ["-c", "import whisper"]).status === 0) return py;
  } catch {}
  return null;
}

/** a loaded Whisper in a Python process (whisper-worker.py): jobs in, texts out */
class Worker {
  private p: ReturnType<typeof spawn>;
  private buf = "";
  private wait: ((t: string | null) => void) | null = null;
  private dead = false;
  ready: Promise<void>;
  constructor(py: string, threads: string) {
    this.p = spawn(py, [join(HERE, "whisper-worker.py"), MODEL], { stdio: ["pipe", "pipe", "ignore"], env: { ...process.env, OMP_NUM_THREADS: threads } });
    let ok: () => void;
    this.ready = new Promise((r) => (ok = r));
    this.p.stdout!.on("data", (d) => {
      this.buf += d.toString();
      let i;
      while ((i = this.buf.indexOf("\n")) >= 0) {
        const line = this.buf.slice(0, i);
        this.buf = this.buf.slice(i + 1);
        let m: any = {};
        try {
          m = JSON.parse(line);
        } catch {
          continue;
        }
        if (m.ready) ok!();
        else if (this.wait) {
          const w = this.wait;
          this.wait = null;
          w(m.error ? null : (m.text ?? ""));
        }
      }
    });
    this.p.on("close", () => {
      this.dead = true;
      ok!();
      if (this.wait) this.wait(null);
    });
  }
  /** the text heard, or null when the worker failed (nothing is cached for it) */
  async hear(file: string, max: number): Promise<string | null> {
    await this.ready;
    if (this.dead) return null;
    return new Promise((res) => {
      this.wait = res;
      this.p.stdin!.write(JSON.stringify({ file, max }) + "\n");
    });
  }
  close() {
    this.p.stdin!.end();
  }
}

const hashOf = (b: Buffer, max: number) => createHash("sha1").update(`${MODEL}/${max}`).update(b).digest("hex");

class Ears {
  private pending = new Map<string, { b: Buffer; max: number }>();
  private known = new Map<string, string>();
  private workers: Worker[] | null = null;
  private py = whisperPython();
  transcribed = 0;
  cached = 0;
  constructor() {
    mkdirSync(HEARD_CACHE, { recursive: true });
  }
  /** queue a cut of a line of `words` words; returns its key */
  add(b: Buffer, words: number): string {
    // tokens enough for the line and some (a clip Whisper cannot parse would otherwise run on)
    const max = Math.min(224, 24 + 4 * words);
    const k = hashOf(b, max);
    if (this.known.has(k) || this.pending.has(k)) return k;
    const f = join(HEARD_CACHE, `${k}.txt`);
    if (existsSync(f)) {
      this.known.set(k, readFileSync(f, "utf8"));
      this.cached++;
    } else this.pending.set(k, { b, max });
    return k;
  }
  heard(k: string): string {
    return this.known.get(k) ?? "";
  }
  private store(k: string, txt: string) {
    this.known.set(k, txt);
    const tmp = join(HEARD_CACHE, `${k}.${process.pid}.tmp`);
    writeFileSync(tmp, txt);
    renameSync(tmp, join(HEARD_CACHE, `${k}.txt`));
    this.transcribed++;
  }
  /** transcribe everything pending: loaded workers taking the next cut as each finishes, else the whisper command */
  async run(): Promise<void> {
    if (!this.pending.size) return;
    const dir = join(CACHE, `run-${process.pid}`);
    mkdirSync(dir, { recursive: true });
    const keys = [...this.pending.keys()];
    for (const k of keys) writeFileSync(join(dir, `${k}.wav`), this.pending.get(k)!.b);
    const cores = Math.max(1, cpus().length);
    if (this.py) {
      if (!this.workers) {
        const n = Math.max(1, Math.min(4, Math.floor(cores / 3)));
        this.workers = Array.from({ length: n }, () => new Worker(this.py!, String(Math.max(1, Math.floor(cores / n)))));
      }
      const queue = keys.slice();
      await Promise.all(
        this.workers.map(async (w) => {
          for (let k = queue.shift(); k; k = queue.shift()) {
            const txt = await w.hear(join(dir, `${k}.wav`), this.pending.get(k)!.max);
            if (txt !== null) this.store(k, txt);
          }
        }),
      );
    } else {
      const workers = Math.max(1, Math.min(4, Math.ceil(keys.length / 6)));
      const threads = String(Math.max(1, Math.floor(cores / workers)));
      const groups = Array.from({ length: workers }, (_, w) => keys.filter((_, i) => i % workers === w));
      await Promise.all(
        groups.map(
          (g) =>
            new Promise<void>((res) => {
              const p = spawn("whisper", [...g.map((k) => join(dir, `${k}.wav`)), "--model", MODEL, "--language", "en", "--output_format", "txt", "--condition_on_previous_text", "False", "--temperature_increment_on_fallback", "None", "--fp16", "False", "--verbose", "False", "--output_dir", dir], { stdio: "ignore", env: { ...process.env, OMP_NUM_THREADS: threads } });
              p.on("close", () => res());
              p.on("error", () => res());
            }),
        ),
      );
      for (const k of keys) {
        const f = join(dir, `${k}.txt`);
        if (existsSync(f)) this.store(k, readFileSync(f, "utf8").trim().replace(/\s+/g, " ")); // a failed run is not cached
      }
    }
    this.pending.clear();
    rmSync(dir, { recursive: true, force: true });
  }
  close() {
    for (const w of this.workers ?? []) w.close();
  }
}

// ------------------------------------------------------------------ the search

interface Cand {
  as: string;
  rate?: number;
  edits: number;
  why?: string;
  takes: number[];
  keys?: string[];
  clip?: Clip;
  sum?: ReturnType<typeof summarise> & { edits?: number };
}

interface FitLine {
  line: Line;
  id: string;
  text: string;
  spoken: string;
  real: boolean;
  cands: Cand[];
  current: Cand;
  chosen?: Cand;
  suggestion?: Cand;
  status?: string;
  searched: boolean;
  /** words of this line the voice research file marks as hard in its voice */
  known?: string[];
  /** respellings refused before rendering because they change the word's sounds */
  rejected: { word: string; as: string; plain: string; ipa: string; why?: string }[];
}

function readJson(file: string): any {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  let args = process.argv.slice(2);
  let draftSlug: string | null = null;
  try {
    ({ slug: draftSlug, rest: args } = takeDraftArg(args));
  } catch (e) {
    exitOnEpisodeError(e);
  }
  const opt = (name: string) => {
    const i = args.indexOf(`--${name}`);
    if (i < 0) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  const nTakes = Number(opt("takes") ?? TAKES.length);
  const only = opt("lines")?.split(",").filter(Boolean) ?? null;
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const pos = args.filter((a) => !a.startsWith("--"));
  const usage = () => {
    console.error("usage: npm run fit -- <ep> <segment-id> | <ep> --draft <slug>  [--json] [--apply] [--takes 2-4] [--lines id,id] [--no-search] | --sounds");
    process.exit(2);
  };
  for (const f of flags) if (!["--json", "--apply", "--no-search", "--sounds"].includes(f)) usage();
  const soundsOnly = flags.has("--sounds");
  if (!(nTakes >= 2 && nTakes <= TAKES.length)) usage();
  if (pos.length !== (draftSlug ? 1 : 2)) usage();
  if (!soundsOnly && spawnSync("which", ["whisper"]).status !== 0) {
    console.error("error: whisper is not on PATH (pip install openai-whisper); the fitting tool needs it");
    process.exit(1);
  }
  const t0 = performance.now();
  let ep = await loadEpisode(pos[0]).catch(exitOnEpisodeError);
  let id: string, scriptFile: string, sourcesFile: string, label: string;
  if (draftSlug) {
    const { draft } = await loadDraft(ep, draftSlug).catch(exitOnEpisodeError);
    id = draftSlug;
    scriptFile = draft.script;
    sourcesFile = draft.sources;
    label = `${ep.id} --draft ${draftSlug}`;
  } else {
    id = pos[1];
    try {
      requireSegment(ep, id);
    } catch (e) {
      exitOnEpisodeError(e);
    }
    scriptFile = ep.segFile(id, "script.js");
    sourcesFile = join(ep.dir, "production", "sources.json");
    label = `${ep.id} ${id}`;
  }
  if (!existsSync(scriptFile)) {
    console.error(`error: no script at ${ep.rel(scriptFile)}`);
    process.exit(2);
  }
  const script = (await import(pathToFileURL(scriptFile).href + `?t=${Date.now()}`)).default;
  const sounds = await soundsTools();
  if (soundsOnly) {
    // the audit: no rendering, no Whisper
    printAudit(label, script, sounds);
    process.exit(0);
  }
  const sources = readJson(sourcesFile);
  const pipeline = readJson(join(HERE, "..", "..", "writers-room", "config", "pipeline.json"));
  const own = readJson(join(HERE, "data", "heard-terms.json")) ?? {};
  const terms = { alarming: pipeline?.heard?.alarming ?? [], outOfBounds: pipeline?.heard?.outOfBounds ?? [], crude: own.crude ?? [], loaded: own.loaded ?? [] };
  if (!pipeline) console.error("note: packages/writers-room/config/pipeline.json not found; only the studio's own word lists are checked");
  const cast = CAST as Record<string, any>;
  const names = realNames(cast, sources);

  let lay: Layout;
  try {
    lay = await layout(script);
  } catch (e) {
    if (e instanceof ScriptError) {
      console.error(`error: ${e.message}`);
      process.exit(1);
    }
    throw e;
  }
  const { E } = await loadEngine();
  const dict = loadDict();
  const learned: Record<string, string[]> = readJson(LEARNED) ?? {};
  const research = loadResearch();
  const ears = new Ears();
  const takes = TAKES.slice(0, nTakes);
  const screen = SCREEN.map((i) => Math.min(i, nTakes - 1)).filter((v, i, a) => a.indexOf(v) === i);

  // every say line and every captioned sung line (one row per singer of a multi-voice track)
  const lines: FitLine[] = lay.lines
    .filter((l) => l.kind === "say" || (l.kind === "sing" && l.caption))
    .map((l) => {
      const fid = l.id ?? `#${l.i}`;
      const real = isRealLine({ who: l.who, text: l.text }, { cast, sources, names });
      const current: Cand = { as: l.spoken ?? l.text, edits: 0, takes: [], clip: l.clip };
      return { line: l, id: fid, text: l.text, spoken: l.spoken ?? l.text, real, cands: [current], current, searched: false, rejected: [] };
    })
    .filter((f) => !only || only.includes(f.id));
  if (only && !lines.length) {
    console.error(`error: no line with id ${only.join(", ")} in ${id}`);
    process.exit(2);
  }

  // hear a set of candidates on the given takes (renders, cuts, one batch of transcription)
  const DEBUG = !!process.env.FIT_DEBUG;
  const tick = (what: string) => DEBUG && console.error(`[${((performance.now() - t0) / 1000).toFixed(1)} s] ${what}`);
  const hear = async (jobs: { f: FitLine; c: Cand; takes: number[] }[]) => {
    tick(`hear ${jobs.length} candidates`);
    for (const j of jobs) {
      if (!j.c.clip) j.c.clip = await j.f.line.remake!(j.c.as, j.c.rate ?? 1);
      j.c.takes = j.takes;
      j.c.keys = j.takes.map((ti) => ears.add(cut(lay, j.f.line, j.c.clip!, takes[ti]), j.f.text.split(/\s+/).length));
    }
    tick(`rendered and cut`);
    await ears.run();
    tick(`transcribed`);
    for (const j of jobs) {
      const tk = j.c.keys!.map((k) => {
        const heard = ears.heard(k);
        return { heard, score: wordScore(j.f.text, heard) as [number, number], flags: flagsFor(j.f.text, heard, { terms, names, real: j.f.real }) };
      });
      j.c.sum = { ...summarise(tk), edits: j.c.edits };
    }
  };

  // round 0: every line as written, every take
  await hear(lines.map((f) => ({ f, c: f.current, takes: takes.map((_, i) => i) })));

  const needs = (f: FitLine) => !f.current.sum!.pass || f.current.sum!.flags.length > 0;
  const search = !flags.has("--no-search");
  const syllables = (s: string) => {
    try {
      return E.lyricsToSyllables(s).length;
    } catch {
      return -1;
    }
  };

  if (search) {
    // round 1: single changes, screened on two takes
    const jobs: { f: FitLine; c: Cand; takes: number[] }[] = [];
    for (const f of lines.filter(needs)) {
      f.searched = true;
      const missed = f.current.keys!.flatMap((k) => missedWords(f.text, ears.heard(k)));
      // a flagged line with nothing missed: work on the words around what was misheard
      const target = missed.length ? missed : f.text.split(/\s+/).flatMap((w) => missedWords(w, ""));
      // the voice research file: spellings that worked in this voice first; known hard words only their known tries
      const known = knownFor(research, voiceOf(f.line.who, HOUSE));
      const lrn: Record<string, string[]> = { ...learned };
      for (const [w, sp] of Object.entries(known.first)) lrn[w] = [...new Set([...sp, ...(learned[w] ?? [])])];
      const missedSet = new Set(target);
      const hardHere = Object.keys(known.hard).filter((w) => w.split(/\s+/).every((x) => missedSet.has(x)));
      if (hardHere.length) f.known = hardHere;
      // a respelling keeps the word's sounds (sounds.mjs): one that does not is never rendered
      const accept = acceptor(sounds, (r) => {
        if (!f.rejected.some((x) => x.word === r.word && x.as === r.as)) f.rejected.push({ word: r.word, as: r.as, plain: r.plain, ipa: r.ipa, ...(r.why ? { why: r.why } : {}) });
      });
      let cs = lineCandidates(f.text, f.spoken, target, { dict, learned: lrn, hard: known.hard, avoid: known.avoid, accept, maxWords: 3, perWord: 4 });
      const want = f.line.kind === "sing" ? syllables(f.spoken) : 0;
      if (f.line.kind === "sing") cs = cs.filter((c) => syllables(c.as) === want);
      for (const c of cs.slice(0, 12)) {
        const cand: Cand = { as: c.as, edits: c.edits, why: c.why, takes: [] };
        f.cands.push(cand);
        jobs.push({ f, c: cand, takes: screen });
      }
    }
    await hear(jobs);

    // round 2: the best three of each line on every take, and the best two together
    const jobs2: { f: FitLine; c: Cand; takes: number[] }[] = [];
    for (const f of lines.filter((x) => x.searched)) {
      const screened = f.cands.filter((c) => c !== f.current && c.sum).sort((a, b) => better(a.sum!, b.sum!));
      const top = screened.filter((c) => !c.sum!.flags.length).slice(0, 3);
      for (const c of top) jobs2.push({ f, c, takes: takes.map((_, i) => i) });
      if (top.length >= 2) {
        const both = combine(f.spoken, top[0].as, top[1].as);
        if (both && !f.cands.some((c) => c.as === both)) {
          const c: Cand = { as: both, edits: 2, why: `${top[0].why} + ${top[1].why}`, takes: [] };
          if (f.line.kind !== "sing" || syllables(both) === syllables(f.spoken)) {
            f.cands.push(c);
            jobs2.push({ f, c, takes: takes.map((_, i) => i) });
          }
        }
      }
    }
    await hear(jobs2);

    // round 3, a suggestion only (--apply never writes it): a spoken line still not passing, slower
    const jobs3: { f: FitLine; c: Cand; takes: number[] }[] = [];
    for (const f of lines.filter((x) => x.searched && x.line.kind === "say")) {
      const full = f.cands.filter((c) => c.takes.length === takes.length).sort((a, b) => better(a.sum!, b.sum!));
      if (full[0]?.sum!.pass && !full[0].sum!.flags.length) continue;
      const base = full[0]?.as ?? f.spoken;
      for (const rate of [0.9, 0.82]) {
        const c: Cand = { as: base, rate, edits: 1, why: `rate ×${rate}`, takes: [] };
        f.cands.push(c);
        jobs3.push({ f, c, takes: takes.map((_, i) => i) });
      }
    }
    await hear(jobs3);
  }

  // choose: the best fully heard respelling (rate changes are suggestions), the line as written on a tie
  for (const f of lines) {
    const full = f.cands.filter((c) => c.takes.length === takes.length && !c.rate).sort((a, b) => better(a.sum!, b.sum!));
    f.chosen = better(full[0].sum!, f.current.sum!) < 0 ? full[0] : f.current;
    const rated = f.cands.filter((c) => c.rate && c.sum).sort((a, b) => better(a.sum!, b.sum!))[0];
    if (rated && better(rated.sum!, f.chosen.sum!) < 0) f.suggestion = rated;
    const anyOver = f.cands.some((c) => c.takes.length === takes.length && !c.rate && overGate(c.sum!));
    f.status = lineStatus(f.chosen.sum!, { searched: f.searched, anyOver });
  }

  // remember respellings that fixed a word, to try them first next time
  for (const f of lines) {
    if (f.chosen === f.current || !f.chosen!.sum!.pass) continue;
    const a = f.chosen!.as.split(" "), b = f.text.split(" "), s = f.spoken.split(" ");
    a.forEach((tok, i) => {
      const core = splitToken(tok).core, word = splitToken(b[i] ?? "").core.toLowerCase();
      if (!word || core === splitToken(s[i] ?? "").core || core.toLowerCase() === word) return;
      learned[word] = [core, ...(learned[word] ?? []).filter((x) => x !== core)].slice(0, 4);
    });
  }
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(LEARNED, JSON.stringify(learned, null, 1));

  tick("chosen");
  // the voices of the people who speak, and their nearest neighbour among everyone in the cast
  const speakers = [...new Set(lines.map((f) => f.line.who))];
  const feats = new Map<string, any>();
  for (const cid of Object.keys(cast)) {
    const c = cast[cid];
    if (!c?.body) continue;
    feats.set(cid, await measureVoice({ body: c.body, f0: c.f0, rate: c.rate, accent: c.accent, source: c.source }));
  }
  const voices: Record<string, { f0: number; nearest: string | null; distance: number | null }> = {};
  for (const s of speakers) {
    const me = feats.get(s);
    if (!me) continue;
    const nn = nearest(me, [...feats].filter(([k]) => k !== s).map(([k, feat]) => ({ id: k, feat })));
    voices[s] = { f0: Math.round(me.f0), nearest: nn?.id ?? null, distance: nn ? Math.round(nn.distance * 100) / 100 : null };
  }

  tick("voices");
  // ---- report
  const out = {
    segment: id,
    ...(draftSlug ? { draft: draftSlug } : {}),
    episode: ep.id,
    takes: takes.length,
    gate: GATE,
    lines: lines.map((f) => {
      const c = f.chosen!, s = c.sum!;
      // the sounds of each respelled word and of the word itself (the engine's G2P)
      const snd = (as: string) => lineSounds(f.text, as, sounds).words;
      const mine = snd(c.as);
      const missed = new Map<string, number>();
      for (const k of c.keys ?? []) for (const w of missedWords(f.text, ears.heard(k))) missed.set(w, (missed.get(w) ?? 0) + 1);
      return {
        id: f.id,
        who: f.line.who,
        kind: f.line.kind,
        text: f.text,
        as: c.as !== f.text ? c.as : null,
        ...(c !== f.current ? { was: f.spoken !== f.text ? f.spoken : null, fix: c.why } : {}),
        heard: s.heard,
        score: s.score,
        status: f.status,
        flags: s.flags,
        real: f.real,
        missed: [...missed].map(([word, count]) => ({ word, count })),
        ...(f.known ? { known: f.known } : {}),
        ...(mine.length ? { sounds: mine } : {}),
        ...(f.rejected.length ? { rejected: f.rejected } : {}),
        ...(f.suggestion ? { suggest: { rate: f.suggestion.rate, as: f.suggestion.as, score: f.suggestion.sum!.score } } : {}),
        tried: f.cands.filter((x) => x.sum).map((x) => ({ as: x.as, ...(x.rate ? { rate: x.rate } : {}), score: x.sum!.score, heard: x.sum!.heard, ...(x.takes.length < takes.length ? { takes: x.takes.length } : {}), ...(x.sum!.flags.length ? { flags: x.sum!.flags } : {}), ...(snd(x.as).length ? { sounds: snd(x.as) } : {}) })),
      };
    }),
    voices,
  };
  // for the owner: heard as something never accepted, with no spelling tried that avoids it
  const owner = out.lines.filter((l) => blockingFlags(l.flags).length).map((l) => ({ id: l.id, who: l.who, flags: blockingFlags(l.flags), heard: l.heard[0]?.text ?? "" }));
  // a real person's line heard differently: the caption carries the exact words
  const different = out.lines.filter((l) => l.real && (l.status !== "ok" || l.flags.length)).map((l) => ({ id: l.id, who: l.who, status: l.status, text: l.text, heard: l.heard[0]?.text ?? "" }));
  // a respelling in the script (a sound editor's, by hand) that changes a dictionary word's sounds: listed, never blocking
  const soundsDifferent = lines.flatMap((f) => lineSounds(f.text, f.spoken, sounds).words.filter((x) => x.keeps === false).map((x) => ({ id: f.id, who: f.line.who, word: x.word, as: x.as, plain: x.plain, ipa: x.ipa, ...(x.why ? { why: x.why } : {}) })));
  Object.assign(out, { owner, heardDifferently: different, soundsDifferent });

  const count = (st: string) => out.lines.filter((l) => l.status === st).length;
  const secs = (performance.now() - t0) / 1000;
  const cut1 = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
  console.log(`fit ${label}: ${out.lines.length} lines × ${takes.length} takes · ok ${count("ok")} · weak ${count("weak")} · flagged ${count("flagged")} · unsayable ${count("unsayable")} · ${secs.toFixed(0)} s (${ears.transcribed} heard, ${ears.cached} cached)`);
  if (owner.length) {
    console.log(`FOR THE OWNER: ${owner.length} line${owner.length === 1 ? "" : "s"} heard as something never accepted, and no spelling tried avoids it:`);
    for (const o of owner) console.log(`  ${o.id} (${o.who}) ${o.flags.join(", ")}: "${cut1(o.heard, 80)}"`);
  }
  const w = Math.min(16, Math.max(4, ...out.lines.map((l) => l.id.length)));
  for (const [k, l] of out.lines.entries()) {
    const f = lines[k];
    const sc = `${l.score.heard}/${l.score.of}${l.score.min !== l.score.heard ? ` (${l.score.min})` : ""}`;
    let row = `${cut1(l.id, w).padEnd(w)} ${l.who.padEnd(8).slice(0, 8)} ${sc.padEnd(9)} ${l.status!.padEnd(9)}`;
    const notes: string[] = [];
    if (l.fix) notes.push(`fix: ${l.fix} (was ${f.current.sum!.score.heard}/${f.current.sum!.score.of})`);
    // a chosen respelling: the word's sounds and the spelling's
    if (l.fix && l.sounds) for (const x of l.sounds) if (f.spoken.split(/\s+/)[x.i] !== l.as!.split(/\s+/)[x.i]) notes.push(`${x.word} /${x.plain}/ → ${x.as} /${x.ipa}/${x.keeps === null ? " (a guess)" : ""}`);
    if (l.flags.length) notes.push(l.flags.join(", "));
    if (l.known) notes.push(`known hard word: ${l.known.join(", ")}`);
    if (l.status !== "ok" || l.flags.length) notes.push(l.heard.slice(0, 2).map((h) => `"${cut1(h.text, 60)}"×${h.count}`).join(" "));
    if (l.suggest) notes.push(`try rate ${l.suggest.rate}: ${l.suggest.score.heard}/${l.suggest.score.of}`);
    if (notes.length) row += " " + notes.join(" · ");
    console.log(row.trimEnd());
  }
  if (different.length) {
    console.log("heard differently, caption exact:");
    for (const d of different) console.log(`  ${d.id} (${d.who}, ${d.status}) "${cut1(d.text, 60)}" heard "${cut1(d.heard, 60)}"`);
  }
  if (soundsDifferent.length) {
    console.log("sounds different from the word (a respelling in the script; the word's sounds → the spelling's):");
    for (const d of soundsDifferent) console.log(`  ${soundsRow(d)}`);
  }
  console.log(`voices: ${Object.entries(voices).map(([k, v]) => `${k} ${v.f0} Hz ~${v.nearest} ${v.distance}`).join(" · ")}`);

  if (flags.has("--json")) {
    const published = !draftSlug && ep.meta?.status === "published";
    const file = published ? join(CACHE, ep.id, id, "fit.json") : join(draftSlug ? join(ep.dir, "production", "drafts", draftSlug) : ep.segDir(id), "fit.json");
    mkdirSync(join(file, ".."), { recursive: true });
    writeFileSync(file, JSON.stringify(out, null, 1) + "\n");
    console.log(`wrote ${ep.rel(file)}${published ? " (a published episode: kept out of its segment folder)" : ""}`);
  }
  if (flags.has("--apply")) {
    const edits = lines.filter((f) => f.chosen !== f.current).map((f) => ({ beat: f.line.beat!, track: f.line.track, as: f.chosen!.as }));
    // one edit per beat or track (a track sung by several voices takes its first singer's choice)
    const seen = new Set<string>();
    const uniq = edits.filter((e) => {
      const k = `${e.beat}/${e.track ?? ""}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (uniq.length) {
      const src = readFileSync(scriptFile, "utf8");
      const next = applyAs(src, uniq);
      const tmp = `${scriptFile}.${process.pid}.tmp`;
      writeFileSync(tmp, next);
      renameSync(tmp, scriptFile);
    }
    console.log(`applied ${uniq.length} respelling${uniq.length === 1 ? "" : "s"} to ${ep.rel(scriptFile)}`);
  }
  ears.close();
  process.exit(owner.length ? 1 : 0);
}

await main();
