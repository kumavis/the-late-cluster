// Small, exact edits to a script.js or cast.js written as plain data: find where a value sits in
// the source text and replace or insert one property, leaving every comment, line break and other
// value as it was. Used by `fit --apply` (a line's `as`) and `voices` (a guest's voice).
//
// Pure, Node builtins only: `node --test` loads it with nothing installed.

/**
 * Parse the object or array literal that starts at `start` (default: the first `{` after
 * `export default`, or after `export const <name> =` when `name` is given) into a tree of spans:
 * { type: 'obj', start, end, props: [{ key, keyStart, valueStart, value }] }, { type: 'arr', start,
 * end, items: [node] }, { type: 'str', start, end, value }, { type: 'num' | 'raw', start, end }.
 * `end` is one past the closing character. Throws on anything that is not plain data.
 */
export function parseLiteral(src, { name = null, start = null } = {}) {
  let i = start
  if (i === null) {
    const re = name ? new RegExp(`export\\s+const\\s+${name}\\s*=\\s*`) : /export\s+default\s+/
    const m = re.exec(src)
    if (!m) throw new Error(name ? `no "export const ${name} =" in the source` : 'no "export default" in the source')
    i = m.index + m[0].length
  }
  const ws = () => {
    for (;;) {
      while (i < src.length && /\s/.test(src[i])) i++
      if (src.startsWith('//', i)) {
        while (i < src.length && src[i] !== '\n') i++
      } else if (src.startsWith('/*', i)) {
        const e = src.indexOf('*/', i + 2)
        if (e < 0) throw new Error('unclosed comment')
        i = e + 2
      } else return
    }
  }
  const str = () => {
    const q = src[i], s0 = i
    i++
    let out = ''
    while (i < src.length && src[i] !== q) {
      if (src[i] === '\\') {
        const c = src[i + 1]
        out += { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', 0: '\0' }[c] ?? c
        i += 2
      } else {
        if (q === '`' && src.startsWith('${', i)) throw new Error('template literals with ${} are not plain data')
        out += src[i++]
      }
    }
    if (src[i] !== q) throw new Error('unclosed string')
    i++
    return { type: 'str', start: s0, end: i, value: out }
  }
  const value = () => {
    ws()
    const c = src[i]
    if (c === '{') return obj()
    if (c === '[') return arr()
    if (c === "'" || c === '"' || c === '`') {
      // 'a' + 'b' + …: one string value (spanning all of it; not editable as one literal)
      const first = str()
      let node = first
      for (;;) {
        const save = i
        ws()
        if (src[i] !== '+') {
          i = save
          return node
        }
        i++
        ws()
        if (!["'", '"', '`'].includes(src[i])) throw new Error(`only strings can be joined with + (at ${i})`)
        const next = str()
        node = { type: 'str', start: first.start, end: next.end, value: node.value + next.value, joined: true }
      }
    }
    const s0 = i
    while (i < src.length && !/[,\]}\s]/.test(src[i]) && !src.startsWith('//', i)) i++
    if (i === s0) throw new Error(`unexpected ${JSON.stringify(src[i])} at ${i}`)
    const raw = src.slice(s0, i)
    return { type: /^[-+]?(\d|\.\d)/.test(raw) ? 'num' : 'raw', start: s0, end: i, value: raw }
  }
  const obj = () => {
    const s0 = i
    i++
    const props = []
    for (;;) {
      ws()
      if (src[i] === '}') {
        i++
        return { type: 'obj', start: s0, end: i, props }
      }
      const keyStart = i
      let key
      if (src[i] === "'" || src[i] === '"') key = str().value
      else {
        const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i))
        if (!m) throw new Error(`bad key at ${i}: ${JSON.stringify(src.slice(i, i + 20))}`)
        key = m[0]
        i += key.length
      }
      ws()
      if (src[i] !== ':') throw new Error(`expected ":" after ${key} at ${i}`)
      i++
      const v = value()
      props.push({ key, keyStart, valueStart: v.start, value: v })
      ws()
      if (src[i] === ',') i++
    }
  }
  const arr = () => {
    const s0 = i
    i++
    const items = []
    for (;;) {
      ws()
      if (src[i] === ']') {
        i++
        return { type: 'arr', start: s0, end: i, items }
      }
      items.push(value())
      ws()
      if (src[i] === ',') i++
    }
  }
  return value()
}

/** a property of an object node, or undefined */
export const prop = (node, key) => node?.props?.find((p) => p.key === key)

/** a string literal for `value` in the quote style of an existing literal ("'" by default) */
export function quote(value, like = "'") {
  if (like === '"') return JSON.stringify(value)
  const q = like === '`' ? '`' : "'"
  return q + String(value).replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q).replace(/\n/g, '\\n') + q
}

/**
 * Set one property of the object literal `node` to the source text `valueSrc`: replace its value
 * if it is there, else insert `, key: valueSrc` right after the property named `after` (or after
 * the last property). Returns the new source.
 */
export function setProp(src, node, key, valueSrc, { after = null } = {}) {
  if (node?.type !== 'obj') throw new Error('not an object literal')
  const have = prop(node, key)
  if (have) return src.slice(0, have.value.start) + valueSrc + src.slice(have.value.end)
  const anchor = (after && prop(node, after)) || node.props[node.props.length - 1]
  if (!anchor) return src.slice(0, node.start + 1) + ` ${key}: ${valueSrc} ` + src.slice(node.start + 1)
  const at = anchor.value.end
  return src.slice(0, at) + `, ${key}: ${valueSrc}` + src.slice(at)
}

/**
 * Apply several `as` edits to a segment script's source. Each edit is { beat, track?, as } (track:
 * the index in a music block's tracks). The `as` goes after the beat's `text` (or `lyrics`), in the
 * quote style of that literal. Edits are applied from the end of the file backwards, so the spans
 * found first stay valid. Returns the new source.
 */
export function applyAs(src, edits) {
  const root = parseLiteral(src)
  const beats = prop(root, 'beats')?.value
  if (beats?.type !== 'arr') throw new Error('the script has no beats array')
  const targets = edits.map((e) => {
    let node = beats.items[e.beat]
    if (!node) throw new Error(`no beat #${e.beat}`)
    if (e.track !== undefined && e.track !== null) {
      const tracks = prop(prop(node, 'music')?.value, 'tracks')?.value
      node = tracks?.items?.[e.track]
      if (!node) throw new Error(`no track #${e.track} in beat #${e.beat}`)
    }
    const like = prop(node, 'text')?.value ?? prop(node, 'lyrics')?.value
    const q = like?.type === 'str' ? src[like.start] : "'"
    const after = prop(node, 'text') ? 'text' : 'lyrics'
    return { node, value: quote(e.as, q), after }
  })
  // apply from the last position to the first
  targets.sort((a, b) => b.node.start - a.node.start)
  let out = src
  for (const t of targets) out = setProp(out, t.node, 'as', t.value, { after: t.after })
  return out
}
