// Stated pronouns in the pipeline (README "Pronouns"). The scraper records each account's stated
// pronouns ({ text, forms, source } or null: none stated); cards, the terms file and every brief
// that names people carry them; a gate on scripts checks gendered third-person pronouns against
// who in the segment has stated that form. House characters' forms are configuration
// (config/pipeline.json `pronouns.house`, from how docs/bible/02-cast.md refers to each).
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lex, scriptLines, sourceTag, verbatimMismatch } from './scan.mjs'
import { findPost, normHandle } from './digest.mjs'
import { castHandle } from './context.mjs'

/** The standing rule, in every brief but a viewer's. */
export const PRONOUN_RULE = 'Refer to a real person by name or handle. Use a pronoun for them only when one is stated (listed with them here), and then that one; where none is stated, use the name, or "they". Never infer pronouns from a name, a picture, a voice or how someone writes.'

/** how a person's pronouns read: the phrase as written, or "none stated" */
export const pronounLabel = (p) => (p && typeof p === 'object' && p.text ? p.text : typeof p === 'string' && p.trim() ? p : 'none stated')

/** the forms a record names: ['she', 'they'], ['any'], [] */
export const formsOf = (p) => (Array.isArray(p?.forms) ? p.forms : [])

/** the people on kept cards, from research/kept/<card>.json: [{ handle, did, pronouns }] */
export function peopleOfCards(ctx, cards = []) {
  const out = new Map()
  for (const id of cards) {
    const f = join(ctx.paths.production, 'research', 'kept', `${id}.json`)
    if (!existsSync(f)) continue
    let c
    try { c = JSON.parse(readFileSync(f, 'utf8')) } catch { continue }
    for (const p of c.people ?? []) {
      const key = p.did ?? p.handle
      if (key && !out.has(key)) out.set(key, { handle: p.handle, did: p.did ?? null, pronouns: p.pronouns ?? 'none stated' })
    }
  }
  return [...out.values()]
}

/** the cards a brief's people come from: its own, else (assemble, stage, review) the plan's */
export function briefCards(ctx, task) {
  if (task.cards?.length) return task.cards
  if (!['assemble', 'stage', 'review'].includes(task.stage)) return []
  const f = join(ctx.paths.production, 'plan.json')
  try {
    return [...new Set((JSON.parse(readFileSync(f, 'utf8')).segments ?? []).flatMap((s) => s.cards ?? []))]
  } catch {
    return []
  }
}

const GENDERED = /\b(he|him|his|himself|she|her|hers|herself)\b/giu
const FORM = { he: 'he', him: 'he', his: 'he', himself: 'he', she: 'she', her: 'she', hers: 'she', herself: 'she' }

/**
 * The pronoun gate for one script (a draft, or an assembled segment).
 * @param {object} ctx with config, digest, castInfo, sources (the script's own sources.json)
 * @param {object} a { seg, file, text: script.js source, screen: [{ file, text }] other sources of on-screen text (index.js) }
 * @returns {{ problems: [{ form, at, word, line, who: [] }], people }} who: the people in the segment with that form
 */
export function pronounProblems(ctx, { seg, file, text, screen = [] }) {
  const house = ctx.config.pronouns?.house ?? {}
  const { cast = {}, guests = new Set() } = ctx.castInfo ?? {}
  const d = ctx.digest
  const posts = (ctx.sources?.posts ?? []).filter((p) => !p?.segment || p.segment === seg)
  const lines = scriptLines(text)
  // the people in the segment: house characters who speak, guests, and the accounts it cites
  const people = new Map()
  const add = (key, label, pronouns) => { if (key && !people.has(key)) people.set(key, { who: label, forms: formsOf(pronouns), stated: pronounLabel(pronouns) }) }
  for (const l of lines) for (const w of l.who) {
    if (guests.has(w)) {
      const h = castHandle(cast[w])
      const acc = h ? d?.accounts?.get(h) : null
      add(`@${h || w}`, `@${h || w} (guest ${w})`, acc?.pronouns ?? null)
    } else if (house[w]) add(w, w, house[w])
    else add(w, w, null)
  }
  for (const a of ctx.sources?.accounts ?? []) {
    const h = normHandle(a?.handle)
    if (!h) continue
    const inSeg = !a.segment || a.segment === seg || posts.some((p) => normHandle(findPost(d, p.uri)?.handle) === h)
    if (inSeg) add(`@${h}`, `@${h}`, d?.accounts?.get(h)?.pronouns ?? null)
  }
  // real people's words stay exact: a line with a verbatim, interview or catchphrase source, and
  // on-screen text that is a cited post's text, are not read
  const exemptLine = (l) => l.who.some((w) => guests.has(w)) || ['verbatim', 'interview', 'catchphrase'].includes(sourceTag(l.comments)?.kind)
  const isPostText = (s) => posts.some((p) => { const t = findPost(d, p.uri)?.text ?? p.text; return t && !verbatimMismatch(s, t) })
  const found = []
  const scan = (str, at, line, where) => {
    for (const m of String(str ?? '').matchAll(GENDERED)) found.push({ form: FORM[m[1].toLowerCase()], word: m[1], at, line, where })
  }
  const lineTexts = new Set()
  for (const l of lines) {
    if (l.text) lineTexts.add(l.text)
    if (!l.text || exemptLine(l)) continue
    scan(l.text, `${file}:${l.line}${l.id ? ` (${l.id})` : ''}`, l.line, `spoken by ${l.who.join(', ')}`)
  }
  for (const src of [{ file, text }, ...screen]) {
    const { tokens, masked } = lex(src.text)
    for (const t of tokens) {
      if (t.kind !== 'string' && t.kind !== 'template') continue
      if (lineTexts.has(t.value) || !/\s/.test(t.value.trim())) continue
      const before = masked.slice(Math.max(0, t.start - 200), t.start)
      if (/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)$/.test(before) || /\b(as|id|who|say|voice|look)\s*:\s*$/.test(before)) continue
      if (isPostText(t.value)) continue
      const line = src.text.slice(0, t.start).split('\n').length
      scan(t.value, `${src.file}:${line}`, line, 'on screen')
    }
  }
  const list = [...people.values()]
  const problems = found.map((f) => ({ ...f, who: list.filter((p) => p.forms.includes(f.form) || p.forms.includes('any')).map((p) => p.who) }))
  return { problems, people: list }
}

/** failures and warnings from pronounProblems; `blocking` false turns failures into warnings (the draft stage) */
export function pronounGateLines(r, { blocking = true } = {}) {
  const failures = []
  const warnings = []
  const roster = r.people.map((p) => `${p.who}: ${p.stated}`).join('; ') || 'nobody'
  for (const p of r.problems) {
    const where = `${p.at}: "${p.word}" (${p.where})`
    if (!p.who.length) (blocking ? failures : warnings).push(`${where}: nobody in this segment has stated "${p.form}" (people here: ${roster}). Use the name or handle, or "they"; never infer a pronoun (rule in every brief)`)
    else warnings.push(`${where} could refer to ${p.who.join(', ')}; check it is one of them (people here: ${roster})`)
  }
  return { failures, warnings }
}
