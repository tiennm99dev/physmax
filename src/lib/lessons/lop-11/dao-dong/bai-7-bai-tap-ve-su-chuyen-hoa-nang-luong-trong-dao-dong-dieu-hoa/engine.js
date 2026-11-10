/**
 * Place-the-block drill on energy in a spring pendulum: each task names a
 * state (Wđ = nWt, Wt = nWđ, v = vmax/n or a kinetic energy in mJ), the
 * learner drags the block to a position and the check compares where it
 * stands with |x| = the spot that state needs. Lengths in cm, energies in J.
 */
import { int, pick } from '#lib/core/drill.js';
import { numTex } from '#lib/core/number-format.js';

const STIFFNESS = [20, 40, 50, 80, 100];
const AMPLITUDES = [4, 5, 6, 8];
const KINDS = ['kinetic-ratio', 'potential-ratio', 'speed', 'energy'];

/** Positions the block snaps to, in cm. */
export const SNAP = 0.1;

/** How near the spot the block must stand, in cm. */
export const TOLERANCE = 0.1;

/**
 * @typedef {{
 *   k: number,
 *   A: number,
 *   kind: 'kinetic-ratio' | 'potential-ratio' | 'speed' | 'energy',
 *   n: number,
 *   spot: number,
 *   goal: string,
 *   steps: string[],
 * }} EnergyTask
 *   `spot` is the |x|, in cm, where the state holds; `goal` and `steps` are
 *   rich text.
 */

/**
 * Energies, in joules, of a block of amplitude A (cm) at position x (cm).
 * @param {number} k N/m @param {number} A cm @param {number} x cm
 */
export function energies(k, A, x) {
  const W = 0.5 * k * (A / 100) ** 2;
  const Wt = 0.5 * k * (x / 100) ** 2;
  return { W, Wt, Wd: Math.max(0, W - Wt) };
}

/**
 * @param {() => number} rand
 * @returns {EnergyTask}
 */
export function makeTask(rand) {
  const k = pick(rand, STIFFNESS);
  const A = pick(rand, AMPLITUDES);
  const kind = /** @type {EnergyTask['kind']} */ (pick(rand, KINDS));
  const W = energies(k, A, 0).W;
  const Wtex = `W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\cdot ${k} \\cdot ${numTex(A / 100, 2)}^2 = ${numTex(W * 1000, 1)}\\text{ mJ}`;
  if (kind === 'kinetic-ratio') {
    const n = pick(rand, [1, 3, 8, 15]);
    const spot = A / Math.sqrt(n + 1);
    return {
      k,
      A,
      kind,
      n,
      spot,
      goal: n === 1 ? '$W_đ = W_t$' : `$W_đ = ${n}W_t$`,
      steps: [
        `$W = W_đ + W_t = ${n + 1}W_t$, nên $\\dfrac{1}{2}kA^2 = ${n + 1} \\cdot \\dfrac{1}{2}kx^2$.`,
        `$|x| = \\dfrac{A}{\\sqrt{${n + 1}}} = \\dfrac{${A}}{\\sqrt{${n + 1}}} \\approx ${numTex(spot, 2)}$ cm.`,
      ],
    };
  }
  if (kind === 'potential-ratio') {
    const n = pick(rand, [3, 8]);
    const spot = A * Math.sqrt(n / (n + 1));
    return {
      k,
      A,
      kind,
      n,
      spot,
      goal: `$W_t = ${n}W_đ$`,
      steps: [
        `$W = W_t + \\dfrac{W_t}{${n}} = \\dfrac{${n + 1}}{${n}}W_t$, nên $x^2 = \\dfrac{${n}}{${n + 1}}A^2$.`,
        `$|x| = A\\sqrt{\\dfrac{${n}}{${n + 1}}} \\approx ${numTex(spot, 2)}$ cm.`,
      ],
    };
  }
  if (kind === 'speed') {
    const n = pick(rand, [2, 3]);
    const spot = A * Math.sqrt(1 - 1 / (n * n));
    return {
      k,
      A,
      kind,
      n,
      spot,
      goal: `$|v| = \\dfrac{v_{max}}{${n}}$`,
      steps: [
        `$W_đ = \\dfrac{1}{2}mv^2 = \\dfrac{1}{${n * n}} \\cdot \\dfrac{1}{2}mv_{max}^2 = \\dfrac{W}{${n * n}}$, nên $W_t = \\dfrac{${n * n - 1}}{${n * n}}W$.`,
        `$|x| = A\\sqrt{\\dfrac{${n * n - 1}}{${n * n}}} \\approx ${numTex(spot, 2)}$ cm.`,
      ],
    };
  }
  const spot = int(rand, 1, A - 1);
  const Wd = energies(k, A, spot).Wd;
  return {
    k,
    A,
    kind,
    n: 0,
    spot,
    goal: `$W_đ = ${numTex(Wd * 1000, 1)}$ mJ`,
    steps: [
      `$${Wtex}$.`,
      `$W_t = W - W_đ = ${numTex((W - Wd) * 1000, 1)}$ mJ $= \\dfrac{1}{2}kx^2$.`,
      `$|x| = \\sqrt{\\dfrac{2W_t}{k}} = \\sqrt{\\dfrac{2 \\cdot ${numTex(W - Wd, 4)}}{${k}}} = ${numTex(spot / 100, 2)}$ m $= ${spot}$ cm.`,
    ],
  };
}

/**
 * A dragged position on the snap grid, inside [−A, A].
 * @param {number} x @param {number} A
 */
export function snapTo(x, A) {
  const s = Math.round(x / SNAP) * SNAP;
  return Math.round(Math.max(-A, Math.min(A, s)) * 10) / 10;
}

/**
 * Whether the block at x stands where the task asks (either side of O).
 * @param {EnergyTask} task @param {number} x
 */
export const meets = (task, x) => Math.abs(Math.abs(x) - task.spot) <= TOLERANCE + 1e-9;

/**
 * Wđ / Wt at x, or null at the equilibrium position where Wt = 0.
 * @param {EnergyTask} task @param {number} x
 */
export function ratioAt(task, x) {
  const e = energies(task.k, task.A, x);
  return e.Wt === 0 ? null : e.Wd / e.Wt;
}
