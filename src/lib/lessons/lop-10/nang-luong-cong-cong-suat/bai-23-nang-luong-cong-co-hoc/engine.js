/**
 * Work done by a constant force whose direction makes an angle α with the
 * displacement: A = F·s·cos α, and what its sign says about the force.
 */
import { tidy } from '#lib/core/number-format.js';
import { clamp, snap } from '#lib/core/visuals/svg-math.js';

export const FORCE_MIN = 20;
export const FORCE_MAX = 100;
export const ANGLE_STEP = 5;
export const FORCE_STEP = 5;

/** Angles worth trying at once, in degrees. */
export const KEY_ANGLES = [0, 60, 90, 120, 180];

/**
 * Cosine of an angle in degrees, with the binary noise rounded away so that
 * cos 90° is exactly 0.
 * @param {number} deg
 */
export const cosOf = (deg) => tidy(Math.cos((deg * Math.PI) / 180));

/**
 * Work in joules.
 * @param {number} force newtons
 * @param {number} distance metres
 * @param {number} deg angle between the force and the displacement
 */
export const workOf = (force, distance, deg) => tidy(force * distance * cosOf(deg));

/**
 * What the angle makes of the force's work.
 * @param {number} deg
 * @returns {'phat-dong' | 'khong' | 'can'}
 */
export function kindOf(deg) {
  const c = cosOf(deg);
  if (c > 0) return 'phat-dong';
  return c < 0 ? 'can' : 'khong';
}

/**
 * The force drawn from a pointer position: its direction stays in the upper
 * half (0° right, 90° up, 180° left) and its length in pixels gives its size.
 * @param {number} cx tail x @param {number} cy tail y
 * @param {{ x: number, y: number }} p pointer
 * @param {number} pxPerNewton
 * @returns {{ alpha: number, force: number }}
 */
export function aimAt(cx, cy, p, pxPerNewton) {
  const dx = p.x - cx;
  const dy = cy - p.y;
  const raw = dy <= 0 ? (dx >= 0 ? 0 : 180) : (Math.atan2(dy, dx) * 180) / Math.PI;
  const force = Math.hypot(dx, Math.max(dy, 0)) / pxPerNewton;
  return {
    alpha: clamp(snap(raw, ANGLE_STEP), 0, 180),
    force: clamp(snap(force, FORCE_STEP), FORCE_MIN, FORCE_MAX),
  };
}

/**
 * SVG path of the small arc marking the angle, swept counter-clockwise on
 * screen from the displacement direction.
 * @param {number} cx @param {number} cy @param {number} r @param {number} deg
 */
export function arcPath(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  const x = tidy(cx + r * Math.cos(a), 2);
  const y = tidy(cy - r * Math.sin(a), 2);
  return `M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${x} ${y}`;
}
