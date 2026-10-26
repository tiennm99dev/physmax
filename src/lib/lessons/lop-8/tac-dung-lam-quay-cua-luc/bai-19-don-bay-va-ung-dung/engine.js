/**
 * A light rigid bar used as a lever (đòn bẩy), with holes every SPACING_CM.
 * The fulcrum O, the load (vật cần nâng, weight F1 at O1) and the effort
 * (lực tác dụng F2 at O2) each sit at a hole. The bar's own weight is ignored.
 * The bar balances when the moments match: F1 · d1 = F2 · d2, where d1 = OO1
 * and d2 = OO2 are the lever arms of the vertical forces.
 */

/** Number of holes on the bar, numbered 0 to HOLES − 1. */
export const HOLES = 13;

/** Distance between two neighbouring holes, in cm. */
export const SPACING_CM = 10;

/** Rounds away floating-point noise (0.1 + 0.2 → 0.3). */
export const tidy = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;

/**
 * @typedef {{ o: number, load: number, effort: number }} Setup hole numbers of
 *   the fulcrum O, the load point O1 and the effort point O2
 */

/**
 * Lever arms in cm: d1 from O to the load, d2 from O to the effort.
 * @param {Setup} s
 */
export function arms(s) {
  return { d1: Math.abs(s.load - s.o) * SPACING_CM, d2: Math.abs(s.effort - s.o) * SPACING_CM };
}

/**
 * The kind of lever, as the textbook sorts them: 1 when O lies between O1 and
 * O2; 2 when O lies outside and the effort is farther from O than the load;
 * 3 when O lies outside and the effort is nearer O than the load. Null when
 * two points coincide or the load sits on the fulcrum.
 * @param {Setup} s
 * @returns {1 | 2 | 3 | null}
 */
export function leverKind(s) {
  if (s.o === s.load || s.o === s.effort || s.load === s.effort) return null;
  if ((s.load - s.o) * (s.effort - s.o) < 0) return 1;
  const { d1, d2 } = arms(s);
  return d2 > d1 ? 2 : 3;
}

/**
 * Which way the effort must point to hold the load up: down when it is on the
 * other side of O from the load, up when it is on the same side.
 * @param {Setup} s
 * @returns {'xuong' | 'len'}
 */
export function effortDirection(s) {
  return (s.load - s.o) * (s.effort - s.o) < 0 ? 'xuong' : 'len';
}

/**
 * The effort F2, in N, that balances a load of `weight` N: F2 = F1 · d1 / d2.
 * Null when the effort acts at the fulcrum (its line passes through O).
 * @param {number} weight N
 * @param {Setup} s
 */
export function balancingEffort(weight, s) {
  const { d1, d2 } = arms(s);
  if (d2 === 0) return null;
  return tidy((weight * d1) / d2);
}

/**
 * Net turning effect on the bar, in N·m, clockwise positive as drawn with the
 * holes numbered left to right: the load pulls down; the effort pulls down or
 * up as `effortDirection` says. Zero means the bar balances.
 * @param {number} weight load F1 in N
 * @param {number} effort F2 in N
 * @param {Setup} s
 */
export function netMoment(weight, effort, s) {
  const x1 = ((s.load - s.o) * SPACING_CM) / 100;
  const x2 = ((s.effort - s.o) * SPACING_CM) / 100;
  const sign = effortDirection(s) === 'xuong' ? 1 : -1;
  const m = tidy(weight * x1 + sign * effort * x2);
  return m === 0 ? 0 : m;
}

/**
 * Whether an effort `effort` N, set in whole newtons, holds the load: it is
 * within half a newton of the balancing effort.
 * @param {number} weight N
 * @param {number} effort N
 * @param {Setup} s
 */
export function balanced(weight, effort, s) {
  const need = balancingEffort(weight, s);
  return need !== null && Math.abs(effort - need) < 0.5;
}

/**
 * Whether the lever saves force (F2 < F1), costs force (F2 > F1) or neither.
 * @param {Setup} s
 * @returns {'loi' | 'thiet' | 'bang' | null}
 */
export function forceGain(s) {
  const { d1, d2 } = arms(s);
  if (d2 === 0) return null;
  if (d2 > d1) return 'loi';
  if (d2 < d1) return 'thiet';
  return 'bang';
}

/**
 * Tasks for the lever bench: lift a `weight` N load with an effort of at most
 * `maxEffort` N, using a lever of the given kind (any kind when null).
 * @type {Array<{ weight: number, maxEffort: number, kind: 1 | 2 | 3 | null, text: string }>}
 */
export const TASKS = [
  {
    weight: 60,
    maxEffort: 20,
    kind: 1,
    text: 'Dùng đòn bẩy loại 1 giữ cân bằng vật 60 N bằng lực không quá 20 N.',
  },
  {
    weight: 60,
    maxEffort: 30,
    kind: 2,
    text: 'Dùng đòn bẩy loại 2 giữ cân bằng vật 60 N bằng lực không quá 30 N.',
  },
  {
    weight: 20,
    maxEffort: 100,
    kind: 3,
    text: 'Dựng một đòn bẩy loại 3 (như đôi đũa, cần câu) và giữ cân bằng vật 20 N. Lực cần lớn hơn hay nhỏ hơn trọng lượng vật?',
  },
];

/**
 * Whether the bar, as set, completes the task.
 * @param {(typeof TASKS)[number]} task
 * @param {number} weight
 * @param {number} effort
 * @param {Setup} s
 */
export function taskDone(task, weight, effort, s) {
  return (
    weight === task.weight &&
    effort <= task.maxEffort &&
    (task.kind === null || leverKind(s) === task.kind) &&
    effort > 0 &&
    balanced(weight, effort, s)
  );
}
