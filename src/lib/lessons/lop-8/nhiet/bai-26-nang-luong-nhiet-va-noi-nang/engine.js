/**
 * Two cups of water seen as moving molecules. A cup has a temperature in °C
 * and a mass in grams. The mean kinetic energy of one molecule grows with
 * temperature (in the particle model it is proportional to t + 273), and the
 * thermal energy of the cup, the sum of the kinetic energies of all its
 * molecules, grows with both temperature and mass. The on-screen motion is a
 * random walk whose speed is exaggerated, so 20 °C and 80 °C look clearly
 * different, while the numbers the widget prints are the model's real ratios.
 */

/** School offset between °C and K. */
export const KELVIN = 273;

/** Molecules drawn per 100 g of water. */
export const DOTS_PER_100G = 14;

/** @typedef {{ x: number, y: number, dx: number, dy: number }} Particle */
/** @typedef {{ x0: number, y0: number, x1: number, y1: number }} Box */
/** @typedef {{ celsius: number, grams: number }} Cup */

/** Rounds away floating-point noise. */
const tidy = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;

/**
 * Mean kinetic energy of one molecule compared with the same molecule at
 * 0 °C: (t + 273) / 273.
 * @param {number} celsius
 */
export function kineticRatio(celsius) {
  return tidy((celsius + KELVIN) / KELVIN);
}

/**
 * Thermal energy (tổng động năng of all molecules) of a cup, in units of the
 * thermal energy of 100 g of water at 0 °C.
 * @param {Cup} cup
 */
export function thermalEnergy({ celsius, grams }) {
  return tidy((grams / 100) * kineticRatio(celsius));
}

/**
 * Exaggerated on-screen speed in SVG units per second: slow but never still
 * near 0 °C, six times faster at 100 °C.
 * @param {number} celsius
 */
export function screenSpeed(celsius) {
  return tidy(8 + 0.4 * Math.max(0, celsius));
}

/**
 * How many molecules to draw for a mass of water.
 * @param {number} grams
 */
export function dotCount(grams) {
  return Math.round((grams / 100) * DOTS_PER_100G);
}

/** @param {() => number} rand */
function direction(rand) {
  const a = rand() * 2 * Math.PI;
  return { dx: Math.cos(a), dy: Math.sin(a) };
}

/**
 * Molecules scattered at random inside a box.
 * @param {() => number} rand
 * @param {number} n
 * @param {Box} box
 * @returns {Particle[]}
 */
export function scatter(rand, n, box) {
  return Array.from({ length: n }, () => ({
    x: box.x0 + rand() * (box.x1 - box.x0),
    y: box.y0 + rand() * (box.y1 - box.y0),
    ...direction(rand),
  }));
}

/**
 * Molecules bunched round one point, like a drop of ink just let fall.
 * @param {() => number} rand
 * @param {number} n
 * @param {{ x: number, y: number }} at
 * @param {number} radius
 * @returns {Particle[]}
 */
export function drop(rand, n, at, radius) {
  return Array.from({ length: n }, () => {
    const r = radius * Math.sqrt(rand());
    const a = rand() * 2 * Math.PI;
    return { x: at.x + r * Math.cos(a), y: at.y + r * Math.sin(a), ...direction(rand) };
  });
}

/**
 * Moves every molecule for `dt` seconds at `speed`, turning it in a new random
 * direction now and then (a collision) and bouncing it off the walls. Faster
 * molecules collide more often, so the walk stays zigzag at any speed.
 * @param {Particle[]} particles
 * @param {number} dt
 * @param {number} speed
 * @param {() => number} rand
 * @param {Box} box
 * @returns {Particle[]}
 */
export function step(particles, dt, speed, rand, box) {
  const hit = Math.min(1, dt * (2 + speed / 15));
  return particles.map((p) => {
    let { dx, dy } = rand() < hit ? direction(rand) : p;
    let x = p.x + dx * speed * dt;
    let y = p.y + dy * speed * dt;
    if (x < box.x0) [x, dx] = [2 * box.x0 - x, Math.abs(dx)];
    if (x > box.x1) [x, dx] = [2 * box.x1 - x, -Math.abs(dx)];
    if (y < box.y0) [y, dy] = [2 * box.y0 - y, Math.abs(dy)];
    if (y > box.y1) [y, dy] = [2 * box.y1 - y, -Math.abs(dy)];
    x = Math.min(box.x1, Math.max(box.x0, x));
    y = Math.min(box.y1, Math.max(box.y0, y));
    return { x, y, dx, dy };
  });
}

/**
 * Root-mean-square distance of the particles from their centre: how far a
 * drop of ink has spread.
 * @param {Array<{ x: number, y: number }>} points
 */
export function spread(points) {
  if (points.length === 0) return 0;
  const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
  const ms = points.reduce((s, p) => s + (p.x - cx) ** 2 + (p.y - cy) ** 2, 0) / points.length;
  return tidy(Math.sqrt(ms));
}

/** @typedef {'A' | 'B' | 'bang'} Larger */

/**
 * Which cup has the larger mean molecular kinetic energy, and which the larger
 * internal energy as far as temperature and mass alone decide it: when one
 * cup is hotter but holds less water, the comparison needs data, so it is
 * reported as 'chua-ro'.
 * @param {Cup} a
 * @param {Cup} b
 * @returns {{ kinetic: Larger, internal: Larger | 'chua-ro' }}
 */
export function compare(a, b) {
  const sign = (/** @type {number} */ d) => (d > 0 ? 1 : d < 0 ? -1 : 0);
  const dt = sign(a.celsius - b.celsius);
  const dm = sign(a.grams - b.grams);
  /** @param {number} s @returns {Larger} */
  const who = (s) => (s > 0 ? 'A' : s < 0 ? 'B' : 'bang');
  const kinetic = who(dt);
  if (dt * dm < 0) return { kinetic, internal: 'chua-ro' };
  return { kinetic, internal: who(dt !== 0 ? dt : dm) };
}
