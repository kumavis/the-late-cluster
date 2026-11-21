/**
 * npm run voices -- <ep> [--drafts] [--rule <castId>:<rule>]… [--dry-run] [--json]
 *
 * Gives every guest of an episode a voice that is distinct from the house and from every other
 * guest, and writes it into the cast entries. With --drafts, the guests of every draft under
 * production/drafts/ (each draft's own cast.js) are placed together with the episode's, so two
 * drafts' guests cannot collide when both are selected; the same cast id in several files is one
 * guest with one voice, written into each file that defines it.
 *
 * Each voice is measured as `analyze.ts voices` measures it (median f0 and long-term spectrum of two
 * test sentences; distance = pitch semitones / 2 and spectrum dB / 2.5). A guest whose voice is
 * already 1.5 or more from everything placed before it keeps it, so its fitted respellings stay
 * good. Any other guest gets the slot (a body, a pitch, a timbre, from voices-lib.mjs) that clears
 * 1.5 nearest its old pitch, or the most distant one if none clears it. A `guest: true` entry with no
 * `body` (a writer's entry) has no voice yet: it gets the slot that clears 1.5 with the most room, so
 * fresh guests spread across the range, and the table says "new (no voice yet)". Only `body`, `f0`
 * and `source` change (inserted if absent); `rate`, `accent` and `pan` (the attitude and the place) stay.
 *
 * Rules, per guest: not-lowest, not-highest, below:<Hz>, above:<Hz> (measured median f0), keep,
 * new. The pronoun steer (config/voices.json, the owner's ruling of 21 November 2026) adds a soft
 * above:/below: for a guest whose stated pronouns (from the sources.json record and the digest) are
 * she without he, or he without she; distinctness comes first, a hand --rule switches it off, and the
 * table says whether it applied and was met. Nothing reads a voice back as a statement about a person. --dry-run prints the table and writes nothing; --json also writes production/voices.json.
 * Exit 0 when every voice is 1.5 or more from its nearest neighbour, 1 when one is not, 2 for bad
 * arguments. A guest that changed voice needs its lines fitted again (npm run fit).
 */
import { existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { CAST } from "../src/cast.js";
import { measureVoice } from "./analyze.ts";
import { loadEpisode, exitOnEpisodeError } from "./episode.mjs";
import { draftSlugs } from "./draft.mjs";
import { MIN_DISTANCE, allowed, assign, castGuests, guestPronouns, nearest, parseRule, pronounText, slotGrid, steerRules, writeVoice } from "./voices-lib.mjs";
import { REPO } from "./episode.mjs";

/** the house: whoever src/cast.js defines, before any episode is merged in */
const HOUSE = Object.keys(CAST);

const args = process.argv.slice(2);
const rules: Record<string, ReturnType<typeof parseRule>[]> = {};
const rest: string[] = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--rule") {
    try {
      const r = parseRule(args[++i]);
      (rules[r.id] ??= []).push(r);
    } catch (e) {
      console.error(`error: ${(e as Error).message}`);
      process.exit(2);
    }
  } else rest.push(args[i]);
}
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const pos = rest.filter((a) => !a.startsWith("--"));
for (const f of flags) if (!["--drafts", "--dry-run", "--json"].includes(f)) pos.length = 0;
if (pos.length !== 1) {
  console.error("usage: npm run voices -- <ep> [--drafts] [--rule <castId>:not-lowest|not-highest|below:<Hz>|above:<Hz>|keep|new]… [--dry-run] [--json]");
  process.exit(2);
}
const t0 = performance.now();
const ep = await loadEpisode(pos[0]).catch(exitOnEpisodeError);

// ---- who: the episode's own cast entries, then each draft's
// (an entry with a body, or `guest: true` with no voice yet: a writer's entry, placed fresh)
type Def = { file: string; from: string; entry: any; voiced: boolean };
const guests = new Map<string, Def[]>();
const addFile = async (file: string, from: string) => {
  if (!existsSync(file)) return;
  const own = (await import(pathToFileURL(file).href)).CAST ?? {};
  for (const { id, entry, voiced } of castGuests(own, HOUSE)) {
    if (!guests.has(id)) guests.set(id, []);
    guests.get(id)!.push({ file, from, entry, voiced });
  }
};
await addFile(join(ep.dir, "cast.js"), "episode");
const drafts = flags.has("--drafts") ? draftSlugs(ep, { readdirSync }) : [];
for (const d of drafts) await addFile(join(ep.dir, "production", "drafts", d, "cast.js"), d);
for (const id of Object.keys(rules)) if (!guests.has(id)) {
  console.error(`error: --rule for ${id}, who is not a guest here (guests: ${[...guests.keys()].join(", ") || "none"})`);
  process.exit(2);
}
if (!guests.size) {
  console.log(`voices ${ep.id}: no guests${flags.has("--drafts") ? "" : " in the episode's cast.js (add --drafts for the drafts' own)"}`);
  process.exit(0);
}

// ---- measure: the house, every guest as it is now, and the slots
const spec = (c: any) => ({ body: c.body, f0: c.f0, rate: c.rate, accent: c.accent, source: c.source });
const house = [];
for (const id of HOUSE) house.push({ id, feat: await measureVoice(spec((CAST as any)[id])) });
const gl = [];
for (const [id, defs] of guests) {
  // the voice it has now: the episode's entry if there is one, else the first draft's
  // (when the files disagree, the episode's or the first draft's is tried first, and if it is kept
  // it is written into the others, so the guest has one voice everywhere)
  // (a guest with no voice in any file has none: feat null, placed fresh)
  const now = defs.find((d) => d.voiced) ?? null;
  const distinctVoices = new Set(defs.map((d) => JSON.stringify([d.entry.body, d.entry.f0, d.entry.source])));
  gl.push({ id, feat: now ? await measureVoice(spec(now.entry)) : null, now, defs, split: distinctVoices.size > 1, fresh: !now });
}
// ---- stated pronouns, from the sources.json record the pipeline carries (never from the cast entry)
const readJson = (f: string) => { try { return JSON.parse(readFileSync(f, "utf8")); } catch { return null; } };
const steerCfg = readJson(join(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..", "config", "voices.json"))?.pronounSteer ?? { enabled: false };
const sourceFiles = [join(ep.dir, "production", "sources.json"), ...drafts.map((d) => join(ep.dir, "production", "drafts", d, "sources.json"))].map(readJson).filter(Boolean);
const week = readJson(join(ep.dir, "episode.json"))?.week;
const authors = week ? readJson(join(REPO, "data", "weeks", week, "digest.json"))?.authors ?? {} : {};
const said = guestPronouns(sourceFiles, authors);
const prefer: Record<string, any[]> = {};
for (const [id] of guests) { const p = steerRules(said.get(id)?.pronouns ?? null, said.has(id) ? steerCfg : { enabled: false }); if (p.length) prefer[id] = p; }

const slots = [];
for (const s of slotGrid()) slots.push({ ...s, feat: await measureVoice({ body: s.body, f0: s.f0, rate: 1, accent: 0.2, source: s.source }) });

const result = assign({ house, guests: gl.map((g) => ({ id: g.id, feat: g.feat })), slots, rules, prefer });

// a slot was measured at a standard rate and accent; measured with the guest's own, a new voice can
// land closer than it looked. Such a guest is placed again from a short list measured its own way.
const real = async (k: number, v: any) => measureVoice(spec({ ...(gl[k].now ?? gl[k].defs[0]).entry, body: v.body, f0: v.f0, source: v.source }));
const feats: any[] = [];
for (const [k, r] of result.entries()) feats[k] = r.keep ? gl[k].feat : await real(k, r.slot);
for (const [k, r] of result.entries()) {
  if (r.keep) continue;
  const others = () => [...house, ...result.flatMap((x, j) => (j === k ? [] : [{ id: x.id, feat: feats[j] }]))];
  if ((nearest(feats[k], others())?.distance ?? Infinity) >= MIN_DISTANCE) continue;
  const used = new Set(result.flatMap((x, j) => (j !== k && !x.keep ? [x.slot.key] : [])));
  const rs = rules[r.id] ?? [];
  const short = slots
    .filter((sl) => !used.has(sl.key) && allowed(sl.feat.f0, rs, others().map((o) => o.feat.f0)))
    .map((sl) => ({ sl, d: nearest(sl.feat, others())?.distance ?? Infinity }))
    .sort((a, b) => b.d - a.d)
    .slice(0, 32);
  let best: any = null;
  for (const { sl } of short) {
    const f = await real(k, sl);
    const d = nearest(f, others())?.distance ?? Infinity;
    const near = gl[k].feat ? Math.abs(12 * Math.log2(f.f0 / gl[k].feat.f0)) : 0;
    const pref = rs.length ? [] : prefer[r.id] ?? [];
    const met = !pref.length || allowed(f.f0, pref, []) ? 1 : 0;
    const score = [d >= MIN_DISTANCE ? 1 : 0, met, d >= MIN_DISTANCE ? -near : d];
    if (!best || score[0] > best.score[0] || (score[0] === best.score[0] && (score[1] > best.score[1] || (score[1] === best.score[1] && score[2] > best.score[2])))) best = { sl, f, score };
  }
  if (best) {
    r.slot = best.sl;
    feats[k] = best.f;
  }
}

// ---- write: body, f0 and source of each changed guest, in every file that defines it
const writes = new Map<string, string>();
for (const [k, r] of result.entries()) {
  if (r.keep && !gl[k].split) continue;
  const v = r.keep ? gl[k].now!.entry : r.slot;
  for (const d of gl[k].defs) {
    if (r.keep && d === gl[k].now) continue;
    writes.set(d.file, writeVoice(writes.get(d.file) ?? readFileSync(d.file, "utf8"), r.id, v));
  }
}
// the final voices, measured with each guest's own rate and accent
const final = result.map((r, k) => ({ id: r.id, feat: feats[k], r, k }));
const everyone = [...house, ...final.map((f) => ({ id: f.id, feat: f.feat }))];
const table = final.map((f) => {
  const nn = nearest(f.feat, everyone.filter((x) => x.id !== f.id));
  const before = gl[f.k].feat;
  return {
    id: f.id,
    in: gl[f.k].defs.map((d) => d.from),
    f0: Math.round(f.feat.f0),
    nearest: nn?.id ?? null,
    distance: nn ? Math.round(nn.distance * 100) / 100 : null,
    kept: f.r.keep,
    ...(gl[f.k].fresh ? { fresh: true } : {}),
    ...(f.r.keep ? {} : { voice: { body: f.r.slot.body, f0: f.r.slot.f0, source: f.r.slot.source, note: f.r.slot.note }, was: before ? Math.round(before.f0) : null, split: gl[f.k].split }),
    ...(rules[f.id] ? { rules: rules[f.id].map((x) => x.rule + (x.hz ? `:${x.hz}` : "")) } : {}),
    pronouns: pronounText(said.get(f.id)),
    // the steer: whether it applied (a hand rule switches it off) and whether the final voice meets it
    steer: rules[f.id] ? (prefer[f.id] ? "off: a hand rule" : "none") : prefer[f.id] ? { wanted: prefer[f.id].map((x: any) => `${x.rule}:${x.hz}`).join(" "), met: allowed(f.feat.f0, prefer[f.id], []) } : "none",
  };
});
const bad = table.filter((t) => t.distance !== null && t.distance < MIN_DISTANCE);

console.log(`voices ${ep.id}: ${table.length} guests${drafts.length ? ` from the episode and ${drafts.length} drafts` : ""} against ${HOUSE.length} house voices · nearest at least ${MIN_DISTANCE} · ${((performance.now() - t0) / 1000).toFixed(0)} s`);
const w = Math.max(6, ...table.map((t) => t.id.length));
for (const t of table) {
  const what = t.kept ? (gl.find((g) => g.id === t.id)!.split ? `kept (${t.in[0]}'s voice, now in all its files)` : "kept") : `${t.fresh ? "new (no voice yet)" : "new"}: ${t.voice!.body.female}/${t.voice!.body.child} f0 ${t.voice!.f0} ${t.voice!.note}${t.was ? ` (was ${t.was} Hz)` : ""}`;
  const steer = typeof t.steer === "string" ? `steer ${t.steer}` : `steer ${t.steer.wanted}: ${t.steer.met ? "met" : "NOT MET"}`;
  console.log(`${t.id.padEnd(w)} ${String(t.f0).padStart(4)} Hz  ~${String(t.nearest).padEnd(w)} ${t.distance?.toFixed(2)}  ${what}${t.distance! < MIN_DISTANCE ? "  TOO CLOSE" : ""}  [${t.in.join(", ")}]  pronouns ${t.pronouns}; ${steer}`);
}
for (const t of table) if (typeof t.steer === "object" && !t.steer.met) console.log(`steer not met for ${t.id}: placed at ${t.f0} Hz to stay distinct from the house and the other guests (wanted ${t.steer.wanted}); a preference, not a rule`);
const changed = table.filter((t) => !t.kept || gl.find((g) => g.id === t.id)!.split);
if (!flags.has("--dry-run")) {
  for (const [file, src] of writes) {
    const tmp = `${file}.${process.pid}.tmp`;
    writeFileSync(tmp, src);
    renameSync(tmp, file);
  }
  if (writes.size) console.log(`wrote ${[...writes.keys()].map((f) => ep.rel(f)).join(", ")}`);
} else if (writes.size) console.log(`dry run: would write ${[...writes.keys()].map((f) => ep.rel(f)).join(", ")}`);
if (changed.length) console.log(`fit again: ${[...new Set(changed.flatMap((t) => t.in))].join(", ")} (their respellings were chosen for the old voices)`);
if (flags.has("--json")) {
  const file = join(ep.dir, "production", "voices.json");
  writeFileSync(file, JSON.stringify({ episode: ep.id, min: MIN_DISTANCE, guests: table }, null, 1) + "\n");
  console.log(`wrote ${ep.rel(file)}`);
}
process.exit(bad.length ? 1 : 0);
