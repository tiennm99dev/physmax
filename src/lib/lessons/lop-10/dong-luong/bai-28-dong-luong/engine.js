/**
 * Momentum, impulse and the average force of a short interaction: an egg caught
 * by surfaces that stop it over different times, and a ball hitting a wall.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Mass of the egg, in kg. */
export const EGG_MASS = 0.06;

/** Largest average force the shell is taken to survive, in N. */
export const BREAK_FORCE = 30;

/** Assumed stopping times of the surfaces, in milliseconds. */
export const SURFACES = [
  { value: 4, label: 'Sàn gạch', color: '#be123c' },
  { value: 8, label: 'Khăn gấp', color: '#d97706' },
  { value: 20, label: 'Tay hạ dần', color: '#4f46e5' },
  { value: 40, label: 'Đệm xốp', color: '#0f766e' },
];

/**
 * Speed reached after a free fall from height `h`.
 * @param {number} h metres
 */
export const fallSpeed = (h) => Math.sqrt(2 * G * h);

/**
 * The egg dropped from `h` and stopped over `ms` milliseconds. Its weight is
 * small next to the stopping force and is left out.
 * @param {number} h metres @param {number} ms
 * @returns {{ speed: number, momentum: number, force: number, broken: boolean }}
 */
export function catchEgg(h, ms) {
  const speed = fallSpeed(h);
  const change = EGG_MASS * speed;
  const force = change / (ms / 1000);
  return { speed, momentum: change, force, broken: force > BREAK_FORCE };
}

/**
 * Fraction of the fall done after `elapsed` seconds, as distance from the start.
 * @param {number} h metres @param {number} elapsed seconds
 */
export function fallProgress(h, elapsed) {
  const total = Math.sqrt((2 * h) / G);
  const u = Math.min(1, elapsed / total);
  return u * u;
}

/**
 * A ball of mass `m` meets a wall at speed `v1` and leaves it at speed `v2`, back
 * the way it came. The positive axis points towards the wall.
 * @param {number} m kg @param {number} v1 m/s @param {number} v2 m/s @param {number} ms contact time
 * @returns {{ p1: number, p2: number, change: number, force: number }}
 */
export function bounce(m, v1, v2, ms) {
  const p1 = tidy(m * v1);
  const p2 = tidy(-m * v2);
  const change = tidy(p2 - p1);
  return { p1, p2, change, force: tidy(change / (ms / 1000)) };
}
