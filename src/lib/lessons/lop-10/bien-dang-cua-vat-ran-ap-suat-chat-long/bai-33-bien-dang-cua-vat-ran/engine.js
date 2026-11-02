/**
 * A spring pulled past its elastic limit. Up to the limit the force follows
 * Hooke's law. Beyond it the spring gives way more easily, and on release it
 * comes back along a line of slope k, keeping a permanent stretch. All lengths
 * are in metres and forces in newtons, unless a name says otherwise.
 */
import { tidy } from '#lib/core/number-format.js';

/** Natural length of every spring, in metres. */
export const NATURAL = 0.2;

/** How much of its stiffness a spring keeps beyond the elastic limit. */
const YIELD_STIFFNESS = 0.3;

/** @typedef {{ id: string, name: string, k: number, limit: number, max: number, color: string }} Spring */

/**
 * Stiffness in N/m, elastic limit and the largest force offered, in newtons.
 * @type {Spring[]}
 */
export const SPRINGS = [
  { id: 'a', name: 'Lò xo A', k: 20, limit: 4, max: 5, color: '#0f766e' },
  { id: 'b', name: 'Lò xo B', k: 50, limit: 8, max: 10, color: '#4f46e5' },
  { id: 'c', name: 'Lò xo C', k: 100, limit: 12, max: 15, color: '#b45309' },
];

/**
 * The stretch left after release once the spring has felt a force `peak`.
 * @param {Spring} spring @param {number} peak
 */
export function permanentSet(spring, peak) {
  if (peak <= spring.limit) return 0;
  return (peak - spring.limit) * (1 / (YIELD_STIFFNESS * spring.k) - 1 / spring.k);
}

/**
 * The stretch under `force` for a spring that has already felt `peak`.
 * @param {Spring} spring @param {number} force @param {number} peak
 */
export function stretchAt(spring, force, peak) {
  return permanentSet(spring, Math.max(force, peak)) + force / spring.k;
}

/**
 * The force that holds the spring at a given stretch, never pushing and never
 * above the spring's largest offered force.
 * @param {Spring} spring @param {number} stretch @param {number} peak
 */
export function forceAt(spring, stretch, peak) {
  const top = Math.max(peak, spring.limit);
  const elastic = spring.k * (stretch - permanentSet(spring, top));
  const force =
    elastic <= top
      ? elastic
      : spring.limit + YIELD_STIFFNESS * spring.k * (stretch - spring.limit / spring.k);
  return Math.min(spring.max, Math.max(0, force));
}

/**
 * What the spring is doing now: resting, within the limit, being pulled past
 * it, or already damaged (`released` with a stretch left, or `damaged` under a
 * force again).
 * @param {Spring} spring @param {number} force @param {number} peak
 * @returns {'rest' | 'elastic' | 'beyond' | 'released' | 'damaged'}
 */
export function stateOf(spring, force, peak) {
  if (Math.max(force, peak) <= spring.limit) return force === 0 ? 'rest' : 'elastic';
  if (force === 0) return 'released';
  return force >= peak ? 'beyond' : 'damaged';
}

/**
 * The graph of the pull so far, as points in cm and N: the straight part, then
 * the bent part once the limit is passed.
 * @param {Spring} spring @param {number} peak
 */
export function pullPath(spring, peak) {
  const point = (/** @type {number} */ f) => ({
    x: tidy(stretchAt(spring, f, peak) * 100),
    y: f,
  });
  if (peak <= spring.limit) return [{ x: 0, y: 0 }, point(peak)];
  return [
    { x: 0, y: 0 },
    { x: tidy((spring.limit / spring.k) * 100), y: spring.limit },
    point(peak),
  ];
}

/**
 * The line a damaged spring comes back along, in cm and N; empty for a spring
 * still within its limit.
 * @param {Spring} spring @param {number} peak
 */
export function releasePath(spring, peak) {
  if (peak <= spring.limit) return [];
  return [
    { x: tidy(permanentSet(spring, peak) * 100), y: 0 },
    { x: tidy(stretchAt(spring, peak, peak) * 100), y: peak },
  ];
}

/**
 * A zigzag coil from (`x`, `y1`) straight down to (`x`, `y2`), as SVG points.
 * @param {number} x @param {number} y1 @param {number} y2
 * @param {number} [turns] @param {number} [half] half width of the coil
 */
export function coilPoints(x, y1, y2, turns = 12, half = 14) {
  const lead = 6;
  const step = (y2 - y1 - 2 * lead) / (2 * turns);
  const points = [
    { x, y: y1 },
    { x, y: y1 + lead },
  ];
  for (let i = 0; i < 2 * turns; i += 1) {
    points.push({ x: x + (i % 2 === 0 ? half : -half), y: y1 + lead + step * (i + 0.5) });
  }
  points.push({ x, y: y2 - lead }, { x, y: y2 });
  return points;
}

/** Everyday deformations, sorted by the learner into stretching and compressing. */
export const DEFORMATION_BINS = [
  { id: 'keo', label: 'Biến dạng kéo' },
  { id: 'nen', label: 'Biến dạng nén' },
];

export const DEFORMATION_CARDS = [
  {
    id: 'cap-thang-may',
    label: 'Dây cáp treo buồng thang máy',
    bin: 'keo',
    why: 'Trọng lượng của buồng thang kéo dây cáp dài ra.',
  },
  {
    id: 'cot-nha',
    label: 'Cột chịu lực của toà nhà',
    bin: 'nen',
    why: 'Phần nhà phía trên và nền nhà ép hai đầu cột vào trong, cột ngắn đi một chút.',
  },
  {
    id: 'cao-su',
    label: 'Dây cao su bị hai tay kéo',
    bin: 'keo',
    why: 'Hai lực ngược chiều hướng ra ngoài làm dây dài ra.',
  },
  {
    id: 'giam-xoc',
    label: 'Lò xo giảm xóc khi xe máy chở nặng',
    bin: 'nen',
    why: 'Trọng lượng xe và người ép lò xo ngắn lại.',
  },
  {
    id: 'bungee',
    label: 'Dây bungee lúc người chơi rơi xuống thấp nhất',
    bin: 'keo',
    why: 'Người chơi kéo dây dài ra.',
  },
  {
    id: 'qua-bong',
    label: 'Quả bóng bị ép giữa hai bàn tay',
    bin: 'nen',
    why: 'Hai lực ngược chiều hướng vào trong vật làm quả bóng dẹt lại.',
  },
];
