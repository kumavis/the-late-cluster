// Words the studio's own drawing code puts on screen, with neutral defaults. Nothing here belongs
// to an episode. A segment chooses its own: the counter's label with `built: { label }`, the
// desk key cap's letter with `keyLabel` (both on the segment module). An episode with a legacy
// entry (src/legacy/, only 001-pilot) gets that entry's `stage` text through src/roster.js, which
// writes it into STAGE_TEXT before anything is drawn.
//
// Pure: no imports, so `node --test` can load it.

/** the defaults every episode starts from */
export const STAGE_DEFAULTS = Object.freeze({
  /** the episode counter's label, top-left (stage/chrome.js builtCounter) */
  counterLabel: 'COUNT',
  /** the letter on the desk's key cap (stage/set.js, set.eKey); blank by default */
  keyLabel: '',
})

/** what this page or process draws: the defaults, then the legacy entry's `stage`, if any */
export const STAGE_TEXT = { ...STAGE_DEFAULTS }
