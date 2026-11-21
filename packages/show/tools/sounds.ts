/**
 * The sounds check, with the engine's own G2P (tools/sounds.mjs holds the rule; config/sounds.json
 * the near-identical vowels). No rendering, no Whisper: it reads scripts and the voice research file.
 *
 *   npm run fit -- <ep> --draft <slug> --sounds     every word whose `as` does not keep a dictionary
 *   npm run fit -- <ep> <seg> --sounds              word's sounds, with both phoneme strings; exit 0
 *   npm run voice-research -- --sounds [--dry-run]  the research file: working spellings that are not
 *                                                   the word's sounds become `misleads`; the page is
 *                                                   regenerated
 *
 * Run directly: bun packages/show/tools/sounds.ts --research [--dry-run], or
 * bun packages/show/tools/sounds.ts <ep> --draft <slug> | <ep> <seg>.
 */
import { renameSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { loadEngine } from "./engine.ts";
import { loadDict, loadReadings } from "./respell.mjs";
import { auditSounds, loadSoundsConfig, memoIpa, scriptLines, soundsRow, spellingSounds, wordSounds } from "./sounds.mjs";
import { PAGE_FILE, RESEARCH_FILE, loadResearch, markMisleading, renderPage, validate } from "./voice-research-lib.mjs";

/** what the rule needs: the engine's sounds of a spelling (memoised), the dictionary, the config */
export async function soundsTools() {
  const { g2p } = await loadEngine();
  const ipa = memoIpa((w: string) => g2p.toPhrases(w).flatMap((p: any) => p.segments.map((s: any) => s.ipa)));
  return { ipa, dict: loadDict(), readings: loadReadings(), config: loadSoundsConfig() };
}

export type SoundsTools = Awaited<ReturnType<typeof soundsTools>>;

/** an `accept(word, spelling)` for respell.mjs lineCandidates: false when a dictionary word's sounds change */
export function acceptor(tools: SoundsTools, onReject?: (r: NonNullable<ReturnType<typeof wordSounds>>) => void) {
  return (word: string, spelling: string) => {
    const r = wordSounds(word, spelling, tools);
    if (r && r.keeps === false) {
      onReject?.(r);
      return false;
    }
    return true;
  };
}

/** print the audit of one script; returns the audit */
export function printAudit(label: string, script: any, tools: SoundsTools) {
  const a = auditSounds(scriptLines(script), tools);
  console.log(`sounds ${label}: ${a.lines} line${a.lines === 1 ? "" : "s"} with \`as\` · ${a.different.length} word${a.different.length === 1 ? "" : "s"} sound different from the word · ${a.guesses.length} guess${a.guesses.length === 1 ? "" : "es"} · ${a.readings.length} with two readings`);
  if (a.different.length) {
    console.log("sounds different from the word (the word's sounds → the spelling's):");
    for (const r of a.different) console.log(`  ${soundsRow(r)}`);
  }
  if (a.guesses.length) {
    console.log("guesses (not in the dictionary: no reference, sounds shown only):");
    for (const r of a.guesses) console.log(`  ${r.id} (${r.who}) ${r.word} → ${r.as}: /${r.ipa || "?"}/`);
  }
  if (a.readings.length) {
    console.log("words with two readings (the engine's for the plain spelling; the others: which one the line means is yours to hear):");
    for (const r of a.readings) console.log(`  ${r.id} (${r.who}) ${r.word}: plain /${r.plain}/ · also ${r.alternates.map((x: string) => `/${x}/`).join(", ")}`);
  }
  if (a.unaligned.length) console.log(`not checked (the \`as\` has not one word per caption word): ${a.unaligned.map((u) => u.id).join(", ")}`);
  return a;
}

/** the research file through the rule; writes it and the page unless dry */
export function researchSounds(tools: SoundsTools, { dry = false } = {}) {
  const r = loadResearch();
  const problems = validate(r);
  if (problems.length) {
    console.error(`error: packages/show/tools/data/voice-research.json is not well formed:\n  ${problems.join("\n  ")}`);
    return 1;
  }
  const m = markMisleading(r, (word: string, spelling: string) => spellingSounds(word, spelling, tools));
  for (const c of m.changed) console.log(`${c.word}: ${c.from}${c.to !== c.from ? ` → ${c.to}` : ""}${c.moved.length ? `; misleads: ${c.moved.join(", ")}` : ""}${c.works?.length ? `; works after all (a reading of the word): ${c.works.join(", ")}` : ""}`);
  const all = m.research.words.filter((e: any) => (e.misleads ?? []).length);
  console.log(`${m.changed.length} entr${m.changed.length === 1 ? "y" : "ies"} changed; ${all.length} word${all.length === 1 ? "" : "s"} with a misleading spelling, ${m.research.words.filter((e: any) => e.status === "misleads").length} marked misleads`);
  for (const e of all) for (const x of e.misleads) console.log(`  ${e.word} (${e.status}) /${e.ipa ?? "?"}/ → ${x.as} /${x.ipa || "?"}/${x.why ? ` (${x.why})` : ""}`);
  const bad = validate(m.research);
  if (bad.length) {
    console.error(`error: the research file would not be well formed:\n  ${bad.join("\n  ")}`);
    return 1;
  }
  if (dry) console.log("dry run: nothing written");
  else {
    const write = (file: string, text: string) => {
      const tmp = `${file}.${process.pid}.tmp`;
      writeFileSync(tmp, text);
      renameSync(tmp, file);
    };
    write(RESEARCH_FILE, JSON.stringify(m.research, null, 1) + "\n");
    write(PAGE_FILE, renderPage(m.research));
    console.log("wrote packages/show/tools/data/voice-research.json and docs/voice-research.md");
  }
  return 0;
}

async function main() {
  const args = process.argv.slice(2);
  const tools = await soundsTools();
  if (args.includes("--research")) process.exit(researchSounds(tools, { dry: args.includes("--dry-run") }));
  const { takeDraftArg } = await import("./draft.mjs");
  const { loadEpisode, loadDraft, requireSegment, exitOnEpisodeError } = await import("./episode.mjs");
  let slug: string | null = null, rest: string[] = args;
  try {
    ({ slug, rest } = takeDraftArg(args));
  } catch (e) {
    exitOnEpisodeError(e);
  }
  const pos = rest.filter((a) => !a.startsWith("--"));
  if (pos.length !== (slug ? 1 : 2)) {
    console.error("usage: bun packages/show/tools/sounds.ts <ep> --draft <slug> | <ep> <seg> | --research [--dry-run]");
    process.exit(2);
  }
  const ep = await loadEpisode(pos[0]).catch(exitOnEpisodeError);
  let file: string;
  if (slug) file = (await loadDraft(ep, slug).catch(exitOnEpisodeError)).draft.script;
  else {
    try {
      requireSegment(ep, pos[1]);
    } catch (e) {
      exitOnEpisodeError(e);
    }
    file = ep.segFile(pos[1], "script.js");
  }
  const script = (await import(pathToFileURL(file).href)).default;
  printAudit(slug ? `${ep.id} --draft ${slug}` : `${ep.id} ${pos[1]}`, script, tools);
  process.exit(0);
}

if (import.meta.main) await main();
