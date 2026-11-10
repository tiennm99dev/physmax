/**
 * Damped and driven oscillation of a spring pendulum, lengths in cm.
 * The motion obeys x″ + 2βx′ + ω0²x = (F0/m) cos ωt, where β (1/s) measures
 * the drag. With no drive the body swings with an amplitude A0·e^(−βt) that
 * dies away; with the drive it settles to the driving frequency with the
 * steady amplitude of `drivenAmplitude`, largest near the natural frequency.
 */
import { int, rng } from '#lib/core/drill.js';
import { TAU } from '../_shared/oscillation.js';

/** Drag settings: β in 1/s. */
export const DRAGS = [
  { value: 0, label: 'Không', beta: 0 },
  { value: 1, label: 'Nhỏ', beta: 0.15 },
  { value: 2, label: 'Vừa', beta: 0.5 },
  { value: 3, label: 'Lớn', beta: 1.2 },
];

/** Natural frequencies, in Hz, hidden in the find-the-resonance rounds. */
export const NATURAL = [0.8, 1, 1.25, 1.5, 1.75, 2];

/** Driving frequencies the slider offers, in Hz. */
export const F_MIN = 0.2;
export const F_MAX = 3;
export const F_STEP = 0.05;

/** How near the natural frequency a pick counts as resonance, in Hz. */
export const RESONANCE_TOLERANCE = 0.05;

/**
 * Force per unit mass of the drive, in cm/s², as a multiple of ω0: then the
 * peak height depends only on the drag, whatever the natural frequency.
 */
const DRIVE = 2;

/**
 * Position of a freely released, damped body (amplitude A0 at t = 0).
 * @param {number} A0 cm @param {number} f0 Hz @param {number} beta 1/s
 * @param {number} t s
 */
export function dampedAt(A0, f0, beta, t) {
  const w0 = TAU * f0;
  const wd = Math.sqrt(Math.max(0, w0 * w0 - beta * beta));
  return A0 * Math.exp(-beta * t) * Math.cos(wd * t);
}

/**
 * The amplitude envelope A0·e^(−βt).
 * @param {number} A0 @param {number} beta @param {number} t
 */
export const envelope = (A0, beta, t) => A0 * Math.exp(-beta * t);

/**
 * Share of the amplitude and of the energy left after one period of the
 * free motion (the damped period 2π/ωd, the spacing of the graph's peaks),
 * and the share of energy lost.
 * @param {number} f0 Hz @param {number} beta 1/s
 */
export function lossPerPeriod(f0, beta) {
  const w0 = TAU * f0;
  const wd = Math.sqrt(Math.max(0, w0 * w0 - beta * beta));
  const amp = wd === 0 ? 0 : Math.exp((-beta * TAU) / wd);
  return { amplitude: amp, energy: amp * amp, lost: 1 - amp * amp };
}

/**
 * Steady amplitude, in cm, of the body driven at frequency f.
 * @param {number} f Hz @param {number} f0 Hz @param {number} beta 1/s
 */
export function drivenAmplitude(f, f0, beta) {
  const w = TAU * f;
  const w0 = TAU * f0;
  const d = Math.hypot(w0 * w0 - w * w, 2 * beta * w);
  return d === 0 ? Infinity : (DRIVE * w0) / d;
}

/**
 * How far the steady motion lags behind the force, in rad (0 to π).
 * @param {number} f @param {number} f0 @param {number} beta
 */
export function lagAt(f, f0, beta) {
  const w = TAU * f;
  const w0 = TAU * f0;
  return Math.atan2(2 * beta * w, w0 * w0 - w * w);
}

/**
 * Position of the driven body in its steady motion at time t.
 * @param {number} f @param {number} f0 @param {number} beta @param {number} t
 */
export function drivenAt(f, f0, beta, t) {
  return drivenAmplitude(f, f0, beta) * Math.cos(TAU * f * t - lagAt(f, f0, beta));
}

/**
 * The resonance curve A(f) from F_MIN to F_MAX.
 * @param {number} f0 @param {number} beta @param {number} [n]
 * @returns {Array<{ x: number, y: number }>}
 */
export function resonanceCurve(f0, beta, n = 112) {
  const out = [];
  for (let i = 0; i <= n; i += 1) {
    const f = F_MIN + ((F_MAX - F_MIN) * i) / n;
    out.push({ x: f, y: drivenAmplitude(f, f0, beta) });
  }
  return out;
}

/**
 * Whether a driving frequency is the natural frequency, within tolerance.
 * @param {number} f @param {number} f0
 */
export const isResonance = (f, f0) => Math.abs(f - f0) <= RESONANCE_TOLERANCE + 1e-9;

/**
 * The hidden natural frequency of round `round` (1, 2, ...), never the same
 * as the round before, so "Hệ khác" always brings a new system.
 * @param {number} round
 */
export function naturalFor(round) {
  let at = int(rng(4231), 0, NATURAL.length - 1);
  for (let r = 2; r <= round; r += 1) {
    at = (at + 1 + int(rng(r * 4231), 0, NATURAL.length - 2)) % NATURAL.length;
  }
  return NATURAL[at];
}
