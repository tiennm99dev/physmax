/**
 * A simple pendulum: its bob swings between kinetic and potential energy, and
 * with a drag term the mechanical energy falls away as heat.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Length of the drawn pendulum, in metres. */
export const LENGTH = 1.5;

/** Rate of the drag slowing the bob when friction is on, per second. */
export const DRAG = 0.1;

const SUBSTEP = 1 / 240;

/** @typedef {{ theta: number, omega: number }} Swing angle in radians, angular speed in rad/s */

/**
 * The swing released from rest at an angle.
 * @param {number} degrees
 * @returns {Swing}
 */
export const releaseAt = (degrees) => ({ theta: (degrees * Math.PI) / 180, omega: 0 });

/**
 * Advances the swing by `dt` seconds in small energy-keeping steps.
 * @param {Swing} swing @param {number} dt @param {number} drag rate per second, 0 for none
 * @returns {Swing}
 */
export function stepSwing(swing, dt, drag) {
  let { theta, omega } = swing;
  const steps = Math.max(1, Math.round(dt / SUBSTEP));
  const h = dt / steps;
  const k = G / LENGTH;
  const fade = Math.exp(-drag * h);
  for (let i = 0; i < steps; i += 1) {
    omega -= k * Math.sin(theta) * (h / 2);
    theta += omega * h;
    omega -= k * Math.sin(theta) * (h / 2);
    omega *= fade;
  }
  return { theta, omega };
}

/**
 * Height in metres of the bob above its lowest point.
 * @param {number} theta radians
 */
export const heightOf = (theta) => LENGTH * (1 - Math.cos(theta));

/**
 * Potential energy in joules, the zero level at the lowest point.
 * @param {number} m kg @param {number} theta radians
 */
export const potentialOf = (m, theta) => m * G * heightOf(theta);

/**
 * Kinetic energy in joules.
 * @param {number} m kg @param {number} omega rad/s
 */
export const kineticOf = (m, omega) => 0.5 * m * (LENGTH * omega) ** 2;

/**
 * Mechanical energy in joules.
 * @param {number} m kg @param {Swing} swing
 */
export const mechanicalOf = (m, swing) =>
  tidy(potentialOf(m, swing.theta) + kineticOf(m, swing.omega));
