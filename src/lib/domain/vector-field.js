/**
 * Fields made by point sources, sampled on a grid of arrows. A source of
 * strength k at P gives k·r̂/r² at a point r away, which models the electric
 * field of a point charge (k ∝ q) and, with negative k, the gravity of a mass.
 * Coordinates are in field units with y up.
 */
import { add, clean, magnitude } from './vector.js';

/** @typedef {import('./vector.js').Vec} Vec */
/** @typedef {{ x: number, y: number, strength: number }} Source */
/** @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Bounds */

/**
 * Field at `p` from every source plus an optional uniform part. `softening`
 * keeps the value finite right next to a source.
 * @param {Source[]} sources
 * @param {Vec} p
 * @param {{ uniform?: Vec, softening?: number }} [options]
 * @returns {Vec}
 */
export function fieldAt(sources, p, options = {}) {
  const { uniform = { x: 0, y: 0 }, softening = 0 } = options;
  let ex = 0;
  let ey = 0;
  for (const s of sources) {
    const dx = p.x - s.x;
    const dy = p.y - s.y;
    const r2 = dx * dx + dy * dy + softening * softening;
    if (r2 === 0) continue;
    const k = s.strength / (r2 * Math.sqrt(r2));
    ex += k * dx;
    ey += k * dy;
  }
  return add({ x: ex, y: ey }, uniform);
}

/**
 * Centres of an `nx` by `ny` grid of cells covering `bounds`.
 * @param {Bounds} bounds
 * @param {number} nx @param {number} ny
 * @returns {Vec[]}
 */
export function gridPoints(bounds, nx, ny) {
  const dx = (bounds.xMax - bounds.xMin) / nx;
  const dy = (bounds.yMax - bounds.yMin) / ny;
  /** @type {Vec[]} */
  const out = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      out.push({ x: clean(bounds.xMin + dx * (i + 0.5)), y: clean(bounds.yMin + dy * (j + 0.5)) });
    }
  }
  return out;
}

/**
 * Arrow length for a field of size `m`: grows with log(1 + m/ref) and stops at
 * `maxLength`, so a weak far field stays visible next to a strong near one.
 * @param {number} m field magnitude
 * @param {number} ref magnitude drawn at about half length
 * @param {number} maxLength
 */
export function arrowLength(m, ref, maxLength) {
  if (!(m > 0) || !(ref > 0)) return 0;
  return clean(Math.min(maxLength, (maxLength * Math.log1p(m / ref)) / Math.log1p(4)));
}

/**
 * Samples the field on the grid, skipping cells too close to a source where
 * the arrow would only hide the source marker.
 * @param {Source[]} sources
 * @param {Bounds} bounds
 * @param {{ nx: number, ny: number, uniform?: Vec, minDistance?: number, softening?: number }} grid
 * @returns {Array<{ at: Vec, field: Vec, magnitude: number }>}
 */
export function sampleField(sources, bounds, grid) {
  const { nx, ny, uniform, minDistance = 0, softening } = grid;
  return gridPoints(bounds, nx, ny)
    .filter((p) => sources.every((s) => Math.hypot(p.x - s.x, p.y - s.y) >= minDistance))
    .map((at) => {
      const field = fieldAt(sources, at, { uniform, softening });
      return { at, field, magnitude: magnitude(field) };
    });
}

/**
 * Traces a field line from `start` with fixed steps (midpoint method), until
 * it leaves `bounds`, reaches a sink or runs out of steps. Pass a negative
 * `step` to trace backwards, against the field.
 * @param {Source[]} sources
 * @param {Vec} start
 * @param {{ bounds: Bounds, step: number, maxSteps?: number, uniform?: Vec, stopRadius?: number }} options
 * @returns {Vec[]}
 */
export function traceFieldLine(sources, start, options) {
  const { bounds, step, maxSteps = 400, uniform, stopRadius = Math.abs(step) } = options;
  const unit = (/** @type {Vec} */ p) => {
    const f = fieldAt(sources, p, { uniform });
    const m = Math.hypot(f.x, f.y);
    return m === 0 ? null : { x: f.x / m, y: f.y / m };
  };
  const inside = (/** @type {Vec} */ p) =>
    p.x >= bounds.xMin && p.x <= bounds.xMax && p.y >= bounds.yMin && p.y <= bounds.yMax;
  /** @type {Vec[]} */
  const line = [start];
  let p = start;
  for (let i = 0; i < maxSteps; i++) {
    const d1 = unit(p);
    if (!d1) break;
    const mid = { x: p.x + (d1.x * step) / 2, y: p.y + (d1.y * step) / 2 };
    const d2 = unit(mid) ?? d1;
    p = { x: p.x + d2.x * step, y: p.y + d2.y * step };
    if (!inside(p)) break;
    line.push(p);
    const sink = sources.some(
      (s) => s.strength < 0 === step > 0 && Math.hypot(p.x - s.x, p.y - s.y) < stopRadius,
    );
    if (sink) break;
  }
  return line;
}
