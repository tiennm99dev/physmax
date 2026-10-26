/**
 * Magnetic fields drawn for a Grade 7 lesson: a bar magnet, a U-shaped
 * magnet and the Earth. Outside a magnet, the field of each is modelled by a
 * point "pole" of strength +1 at its north pole (field lines leave it) and −1
 * at its south pole (lines enter it). This pole model gives the right shape
 * of field lines outside the magnet, which is all the lesson draws; the
 * inside of each body is hidden. Coordinates are in field units, y up.
 */
import { fieldAt, traceFieldLine } from '#lib/domain/vector-field.js';

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {{ x: number, y: number, strength: number }} Source */
/** @typedef {{ x0: number, x1: number, y0: number, y1: number }} Box */
/**
 * @typedef {{
 *   id: 'thang' | 'chu-u' | 'trai-dat',
 *   sources: Source[],
 *   boxes: Box[],
 *   disc: number,
 * }} Scene
 */

export const BOUNDS = { xMin: -6, xMax: 6, yMin: -3.75, yMax: 3.75 };

/** @type {Record<Scene['id'], Scene>} */
export const SCENES = {
  thang: {
    id: 'thang',
    // S on the left, N on the right.
    sources: [
      { x: 1.6, y: 0, strength: 1 },
      { x: -1.6, y: 0, strength: -1 },
    ],
    boxes: [{ x0: -2, x1: 2, y0: -0.45, y1: 0.45 }],
    disc: 0,
  },
  'chu-u': {
    id: 'chu-u',
    // Arms point up; N at the top of the left arm, S at the top of the right.
    sources: [
      { x: -1.2, y: 0.75, strength: 1 },
      { x: 1.2, y: 0.75, strength: -1 },
    ],
    boxes: [
      { x0: -1.6, x1: -0.8, y0: -1.8, y1: 0.95 },
      { x0: 0.8, x1: 1.6, y0: -1.8, y1: 0.95 },
      { x0: -1.6, x1: 1.6, y0: -1.8, y1: -1 },
    ],
    disc: 0,
  },
  'trai-dat': {
    id: 'trai-dat',
    // The Earth's magnetic axis is tilted from its rotation axis (vertical):
    // its north magnetic pole (lines leave) lies in the Southern Hemisphere.
    sources: [
      { x: -0.14, y: -0.65, strength: 1 },
      { x: 0.14, y: 0.65, strength: -1 },
    ],
    boxes: [],
    disc: 1.9,
  },
};

/**
 * Whether `p` lies inside the magnet (or the Earth).
 * @param {Scene} scene @param {Vec} p
 */
export function inside(scene, p) {
  if (scene.disc > 0 && Math.hypot(p.x, p.y) < scene.disc) return true;
  return scene.boxes.some((b) => p.x > b.x0 && p.x < b.x1 && p.y > b.y0 && p.y < b.y1);
}

/**
 * Moves `p` just outside the body if it is inside (to the nearest edge), and
 * keeps it within BOUNDS.
 * @param {Scene} scene @param {Vec} p @param {number} [margin]
 * @returns {Vec}
 */
export function pushOut(scene, p, margin = 0.35) {
  let q = {
    x: Math.max(BOUNDS.xMin + margin, Math.min(BOUNDS.xMax - margin, p.x)),
    y: Math.max(BOUNDS.yMin + margin, Math.min(BOUNDS.yMax - margin, p.y)),
  };
  for (let pass = 0; pass < 3 && inside(scene, q); pass++) {
    if (scene.disc > 0 && Math.hypot(q.x, q.y) < scene.disc) {
      const r = Math.hypot(q.x, q.y);
      const k = (scene.disc + margin) / r;
      q = r < 1e-6 ? { x: 0, y: scene.disc + margin } : { x: q.x * k, y: q.y * k };
      continue;
    }
    const b = scene.boxes.find((bx) => q.x > bx.x0 && q.x < bx.x1 && q.y > bx.y0 && q.y < bx.y1);
    if (!b) break;
    const moves = [
      { d: q.x - b.x0, p: { x: b.x0 - margin, y: q.y } },
      { d: b.x1 - q.x, p: { x: b.x1 + margin, y: q.y } },
      { d: q.y - b.y0, p: { x: q.x, y: b.y0 - margin } },
      { d: b.y1 - q.y, p: { x: q.x, y: b.y1 + margin } },
    ].sort((m, n) => m.d - n.d);
    q = moves[0].p;
  }
  return q;
}

/**
 * Field at `p`, slightly softened so it stays finite near a pole.
 * @param {Scene} scene @param {Vec} p
 */
export function field(scene, p) {
  return fieldAt(scene.sources, p, { softening: 0.15 });
}

/**
 * Direction the north (red) end of a small compass needle points at `p`, in
 * degrees counter-clockwise from +x (y up). A needle lines up with the field.
 * @param {Scene} scene @param {Vec} p
 */
export function needleAngle(scene, p) {
  const f = field(scene, p);
  return (Math.atan2(f.y, f.x) * 180) / Math.PI;
}

/**
 * Size of the field at `p` relative to its size 1 unit outside the north
 * pole, so the scenes compare the same way.
 * @param {Scene} scene @param {Vec} p
 */
export function relativeStrength(scene, p) {
  const n = scene.sources.find((s) => s.strength > 0) ?? scene.sources[0];
  const f = field(scene, p);
  const ref = field(scene, { x: n.x, y: n.y + (scene.id === 'trai-dat' ? -1.6 : 1) });
  return Math.hypot(f.x, f.y) / Math.hypot(ref.x, ref.y);
}

/**
 * Word for a relative field strength.
 * @param {number} rel
 */
export function strengthWord(rel) {
  if (rel >= 1.2) return 'mạnh';
  if (rel >= 0.35) return 'vừa';
  return 'yếu';
}

/**
 * A small deterministic random generator (LCG), so every visitor sees the
 * same sprinkle of iron filings.
 * @param {number} seed
 */
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Iron filings sprinkled around the magnet: each settles along the field,
 * and they gather where the field is strong (accepted with a probability
 * that grows with the field), as in a real magnetic spectrum.
 * @param {Scene} scene @param {number} tries @param {number} [seed]
 * @returns {Array<{ x: number, y: number, angle: number }>}
 */
export function filings(scene, tries, seed = 7) {
  const rand = rng(seed);
  /** @type {Array<{ x: number, y: number, angle: number }>} */
  const out = [];
  for (let i = 0; i < tries; i++) {
    const p = {
      x: BOUNDS.xMin + rand() * (BOUNDS.xMax - BOUNDS.xMin),
      y: BOUNDS.yMin + rand() * (BOUNDS.yMax - BOUNDS.yMin),
    };
    const keep = rand();
    if (inside(scene, p)) continue;
    const rel = relativeStrength(scene, p);
    if (keep > Math.min(1, 0.04 + 0.7 * rel)) continue;
    out.push({ x: p.x, y: p.y, angle: needleAngle(scene, p) });
  }
  return out;
}

/**
 * Field lines leaving the north pole(s), traced until they reach a south pole
 * or leave the picture.
 * @param {Scene} scene @param {number} [count]
 * @returns {Vec[][]}
 */
export function fieldLines(scene, count = 12) {
  /** @type {Vec[][]} */
  const lines = [];
  for (const s of scene.sources.filter((src) => src.strength > 0)) {
    for (let k = 0; k < count; k++) {
      const t = ((k + 0.5) / count) * 2 * Math.PI;
      const start = { x: s.x + 0.2 * Math.cos(t), y: s.y + 0.2 * Math.sin(t) };
      lines.push(
        traceFieldLine(scene.sources, start, {
          bounds: BOUNDS,
          step: 0.06,
          maxSteps: 900,
          stopRadius: 0.2,
        }),
      );
    }
  }
  return lines;
}
