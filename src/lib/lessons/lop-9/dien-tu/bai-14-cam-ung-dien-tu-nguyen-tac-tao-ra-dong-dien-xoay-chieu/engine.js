/**
 * A bar magnet and a closed coil wired to a centre-zero galvanometer. The
 * magnet either slides along the coil's axis (its near end `d` cm from the
 * coil) or spins in front of the coil. The magnetic flux through the coil is
 * kept as a signed fraction (positive when the lines enter the coil from a
 * north pole), and the induced current is −GAIN · ΔΦ/Δt, clamped to the
 * galvanometer's scale [−1, 1]: positive swings the needle right.
 */
import { clamp } from '#lib/core/visuals/svg-math.js';

/** Farthest distance, in cm, between the magnet's near end and the coil. */
export const RANGE = 12;
/** Field lines through the coil when the magnet touches it. */
export const LINES = 10;
/** Field lines through the coil when the spinning magnet faces it squarely. */
export const ROTOR_LINES = 8;
/** Galvanometer reading per unit of flux change per second. */
export const GAIN = 0.5;
/** Readings smaller than this leave the needle at zero. */
export const DEAD = 0.04;

/**
 * Share of the strongest flux that reaches the coil from `d` cm away.
 * @param {number} d
 */
export function fluxAt(d) {
  const r = Math.max(0, d) / 3;
  return 1 / (1 + r * r);
}

/**
 * Whole field lines through the coil when the magnet is `d` cm away.
 * @param {number} d
 */
export function lineCount(d) {
  return Math.round(LINES * fluxAt(d));
}

/**
 * Signed flux: lines from a facing north pole count positive, from a south
 * pole negative.
 * @param {number} d @param {'N' | 'S'} pole
 */
export function signedFlux(d, pole) {
  return (pole === 'N' ? 1 : -1) * fluxAt(d);
}

/**
 * Galvanometer reading for a flux change over `dt` seconds.
 * @param {number} before @param {number} after @param {number} dt
 */
export function inducedCurrent(before, after, dt) {
  if (dt <= 0) return 0;
  const i = clamp((-GAIN * (after - before)) / dt, -1, 1);
  return Math.abs(i) < 1e-9 ? 0 : i;
}

/**
 * Moves `pos` toward `target` at no more than `speed` per second.
 * @param {number} pos @param {number} target @param {number} speed @param {number} dt
 */
export function approach(pos, target, speed, dt) {
  const step = speed * dt;
  if (Math.abs(target - pos) <= step) return target;
  return pos + Math.sign(target - pos) * step;
}

/**
 * The needle's lag behind the reading it is driven to (time constant `tau`).
 * @param {number} shown @param {number} target @param {number} dt @param {number} [tau]
 */
export function settle(shown, target, dt, tau = 0.08) {
  const next = shown + (target - shown) * (1 - Math.exp(-dt / tau));
  return Math.abs(next - target) < 1e-3 ? target : next;
}

/**
 * Which way the needle swings for a reading.
 * @param {number} i
 * @returns {'phai' | 'trai' | null}
 */
export function swing(i) {
  if (i > DEAD) return 'phai';
  if (i < -DEAD) return 'trai';
  return null;
}

/**
 * What a slide of the magnet does: 'vao' toward the coil, 'ra' away, 'yen' at rest.
 * @param {number} before @param {number} after
 * @returns {'vao' | 'ra' | 'yen'}
 */
export function motionOf(before, after) {
  if (after < before - 1e-9) return 'vao';
  if (after > before + 1e-9) return 'ra';
  return 'yen';
}

/** @param {number} deg */
const rad = (deg) => (deg * Math.PI) / 180;

/**
 * Signed flux through the coil when the magnet has turned `deg` degrees from
 * pointing its north pole at the coil.
 * @param {number} deg
 */
export function rotorFlux(deg) {
  return Math.cos(rad(deg));
}

/**
 * Reading while the magnet spins steadily: −dΦ/dt is proportional to sin.
 * @param {number} deg
 */
export function rotorCurrent(deg) {
  const i = Math.sin(rad(deg));
  return Math.abs(i) < 1e-9 ? 0 : i;
}

/** @param {number} deg */
export function rotorLines(deg) {
  return Math.round(ROTOR_LINES * Math.abs(rotorFlux(deg)));
}

/**
 * The quarter turn the spinning magnet is in, for the feedback text: which
 * pole is nearer the coil, whether it is coming closer, and whether the field
 * lines through the coil are growing. `dir` is the way it turns: +1 as the
 * angle grows, −1 back.
 * @param {number} deg @param {1 | -1} [dir]
 * @returns {{ pole: 'N' | 'S', closer: boolean, more: boolean }}
 */
export function rotorQuarter(deg, dir = 1) {
  const a = ((deg % 360) + 360) % 360;
  const pole = a < 90 || a >= 270 ? 'N' : 'S';
  const closer = (a >= 90 && a < 180) || a >= 270 ? dir > 0 : dir < 0;
  return { pole, closer, more: closer };
}
