// The head tile's clear. Every head is rendered into a px×px tile at the bottom-left corner of one
// shared WebGL canvas, which the stage copies onto its 2D canvas with smoothing on. The smoothing
// filter reads a pixel or two past the tile's right and top edges, so those pixels must be as clean
// as the tile: anything an earlier, bigger tile left there (a close-up, say) shows on the stage as a
// thin line forming a corner beside the head, on and off as the head moves.

/** how far past the tile the clear reaches, in canvas pixels */
export const TILE_MARGIN = 4

/** the side of the square (from the canvas's bottom-left corner) to clear for a px tile in a
 * size×size canvas: the tile and the margin, never past the canvas */
export function tileClear(px, size) {
  return Math.min(size, Math.max(0, Math.round(px)) + TILE_MARGIN)
}
