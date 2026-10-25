/**
 * Virtual version of Galilei's inclined-plane experiment: a ball rolls from
 * rest down a gentle slope, the distance is "measured" at whole seconds with
 * a small, repeatable reading error, and a hypothesis s = k·t or s = k·t² is
 * tested against the data.
 */

/** Half the ball's acceleration on the slope: s = 0.2·t² m. */
export const TRUE_K = 0.2;

/** @typedef {'linear' | 'square'} Hypothesis */
/** @typedef {{ t: number, value: number }} Reading */

/**
 * A small deterministic pseudo-random sequence in [-1, 1), so every visitor
 * and every test sees the same "measurement errors".
 * @param {number} seed
 */
function noise(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s / 2 ** 32) * 2 - 1;
  };
}

/**
 * Distances read at t = 1, 2, …, `count` seconds, each off by at most
 * `error` (relative) from 0.2·t², rounded to the centimetre.
 * @param {number} run which repetition of the experiment (changes the errors)
 * @param {{ count?: number, error?: number }} [options]
 * @returns {Reading[]}
 */
export function measure(run, options = {}) {
  const { count = 5, error = 0.03 } = options;
  const next = noise(run * 7919 + 17);
  return Array.from({ length: count }, (_, i) => {
    const t = i + 1;
    const exact = TRUE_K * t * t;
    return { t, value: Math.round(exact * (1 + error * next()) * 100) / 100 };
  });
}

/**
 * Value of the hypothesis at time t.
 * @param {Hypothesis} h @param {number} k @param {number} t
 */
export function predict(h, k, t) {
  return h === 'linear' ? k * t : k * t * t;
}

/**
 * The k that fits the data best (least squares through the origin).
 * @param {Hypothesis} h @param {Reading[]} data
 */
export function bestK(h, data) {
  const f = (/** @type {number} */ t) => (h === 'linear' ? t : t * t);
  const num = data.reduce((n, d) => n + d.value * f(d.t), 0);
  const den = data.reduce((n, d) => n + f(d.t) ** 2, 0);
  return den === 0 ? 0 : num / den;
}

/**
 * Mean relative gap between the hypothesis and the readings, as a fraction.
 * @param {Hypothesis} h @param {number} k @param {Reading[]} data
 */
export function fitError(h, k, data) {
  if (data.length === 0) return 0;
  const total = data.reduce(
    (n, d) => n + Math.abs(predict(h, k, d.t) - d.value) / Math.abs(d.value || 1),
    0,
  );
  return total / data.length;
}

/** A model fits when it is within 5% of the readings on average. */
export const FIT_THRESHOLD = 0.05;

/**
 * Whether the hypothesis explains the data: with its own best k it stays
 * within `FIT_THRESHOLD`.
 * @param {Hypothesis} h @param {Reading[]} data
 */
export function hypothesisHolds(h, data) {
  return fitError(h, bestK(h, data), data) <= FIT_THRESHOLD;
}

/**
 * The `motion.js` description of the hypothesis, for the x-t plot: s = k·t is
 * uniform motion at speed k, s = k·t² starts from rest with acceleration 2k.
 * @param {Hypothesis} h @param {number} k @param {number} tMax
 * @returns {import('#lib/domain/motion.js').Motion}
 */
export function hypothesisMotion(h, k, tMax) {
  return h === 'linear'
    ? { v0: k, stages: [{ duration: tMax, acceleration: 0 }] }
    : { v0: 0, stages: [{ duration: tMax, acceleration: 2 * k }] };
}
