/**
 * SVG geometry for arrows, in pixel space (y down).
 */

/**
 * Points of a triangular arrow head whose tip sits at (x2, y2), pointing away
 * from (x1, y1). Returns '' for a zero-length arrow, which then draws no head.
 * @param {number} x1 @param {number} y1 tail
 * @param {number} x2 @param {number} y2 tip
 * @param {number} [size] head length in pixels
 */
export function arrowHead(x1, y1, x2, y2, size = 10) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-9) return '';
  const ux = dx / len;
  const uy = dy / len;
  const s = Math.min(size, len);
  const bx = x2 - ux * s;
  const by = y2 - uy * s;
  const w = s * 0.5;
  const pts = [
    [x2, y2],
    [bx - uy * w, by + ux * w],
    [bx + uy * w, by - ux * w],
  ];
  return pts.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');
}

/**
 * Where the shaft of an arrow should stop, so a thick line does not poke out
 * past the head's tip.
 * @param {number} x1 @param {number} y1 @param {number} x2 @param {number} y2
 * @param {number} [size]
 * @returns {{ x: number, y: number }}
 */
export function shaftEnd(x1, y1, x2, y2, size = 10) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 1e-9) return { x: x2, y: y2 };
  const k = Math.max(0, len - Math.min(size, len) * 0.8) / len;
  return { x: round(x1 + (x2 - x1) * k), y: round(y1 + (y2 - y1) * k) };
}

/** @param {number} v */
function round(v) {
  return Math.round(v * 100) / 100;
}
