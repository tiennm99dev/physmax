/**
 * A model of a body in moving air: drag and lift grow with the square of the
 * speed and depend on the shape. The coefficients are illustrative, the book
 * only compares shapes and speeds. A falling body reaches a greatest speed
 * where drag balances its weight.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;
/** Air density, kg/m³. */
const AIR = 1.2;
/** Area facing the wind for every shape in the tunnel, m². */
const AREA = 0.1;
/** Attack angle where a wing stalls, in degrees. */
export const STALL = 15;

export const SHAPES = [
  { value: 'tam', label: 'Tấm phẳng', drag: 1.2 },
  { value: 'cau', label: 'Quả cầu', drag: 0.47 },
  { value: 'giot', label: 'Giọt nước', drag: 0.05 },
  { value: 'canh', label: 'Cánh máy bay', drag: 0 },
];

/**
 * Lift and drag coefficients of a wing at an attack angle: lift rises to the
 * stall, then falls while drag keeps climbing.
 * @param {number} alpha degrees
 */
export function wingCoefficients(alpha) {
  const lift = alpha <= STALL ? 0.2 + 0.1 * alpha : 1.7 - 0.06 * (alpha - STALL);
  return { lift, drag: 0.03 + 0.0018 * alpha * alpha };
}

/**
 * Drag and lift on a shape in the tunnel, in newtons.
 * @param {string} shape @param {number} speed m/s @param {number} alpha wing attack angle
 * @returns {{ drag: number, lift: number }}
 */
export function airForces(shape, speed, alpha) {
  const q = 0.5 * AIR * AREA * speed * speed;
  if (shape === 'canh') {
    const c = wingCoefficients(alpha);
    return { drag: tidy(q * c.drag), lift: tidy(q * c.lift) };
  }
  const found = SHAPES.find((s) => s.value === shape) ?? SHAPES[0];
  return { drag: tidy(q * found.drag), lift: 0 };
}

/**
 * Points of one streamline at height `y0` around the shape centred at (`cx`, `cy`):
 * blunter shapes push the air further aside, and a lifting wing bends it down.
 * @param {string} shape @param {number} y0 @param {number} cx @param {number} cy
 * @param {number} width @param {number} alpha
 * @returns {Array<{ x: number, y: number }>}
 */
export function streamline(shape, y0, cx, cy, width, alpha) {
  const push = { tam: 30, cau: 22, giot: 10, canh: 6 }[shape] ?? 10;
  const spread = { tam: 55, cau: 45, giot: 60, canh: 70 }[shape] ?? 50;
  const away = y0 - cy;
  const bend = shape === 'canh' ? alpha * 0.8 : 0;
  const points = [];
  for (let x = 0; x <= width; x += 12) {
    const u = (x - cx) / spread;
    const aside = (Math.sign(away) * push * Math.exp(-u * u) * 30) / Math.max(30, Math.abs(away));
    points.push({ x, y: y0 + aside + (bend * (Math.tanh((x - cx) / 40) + 1)) / 2 });
  }
  return points;
}

/** Drag per square of speed, N·s²/m², for a skydiver with the parachute shut or open. */
export const DRAG_FACTOR = { shut: 0.25, open: 25 };

/**
 * The speed where drag k·v² balances the weight.
 * @param {number} mass kg @param {number} k
 */
export function terminalSpeed(mass, k) {
  return Math.sqrt((mass * G) / k);
}

/**
 * Speed `t` seconds after starting to fall from rest under weight and k·v² drag.
 * @param {number} mass @param {number} k @param {number} t
 */
export function fallSpeed(mass, k, t) {
  const top = terminalSpeed(mass, k);
  return top * Math.tanh((G * t) / top);
}
