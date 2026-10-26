/**
 * Two bench experiments for the forms of mechanical energy.
 *
 * Gravitational potential energy (thế năng hấp dẫn): a weight dropped into a
 * tray of sand leaves a dent. The higher it starts and the heavier it is, the
 * more energy it has and the deeper the dent. Kinetic energy (động năng): a
 * ball rolling into a wooden block pushes it along. The heavier and the faster
 * the ball, the farther the block slides.
 *
 * The scale factors are made up for the lesson so the numbers stay simple;
 * grade 6 compares the results, it does not compute energies.
 */

export const MASSES = [100, 200]; // grams
export const HEIGHTS = [10, 20, 30]; // centimetres
export const SPEEDS = [1, 2, 3]; // chậm, vừa, nhanh

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * Depth of the dent in centimetres: proportional to mass and to drop height.
 * @param {number} massG @param {number} heightCm
 */
export function dent(massG, heightCm) {
  return tidy(0.5 * (massG / 100) * (heightCm / 10));
}

/**
 * How far the block slides, in centimetres: proportional to the ball's mass
 * and to the square of its speed level.
 * @param {number} massG @param {number} speed
 */
export function push(massG, speed) {
  return tidy(2 * (massG / 100) * speed * speed);
}

/**
 * Which of two trials shows more energy, as -1, 0 or 1.
 * @param {number} a @param {number} b
 */
export function compare(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
