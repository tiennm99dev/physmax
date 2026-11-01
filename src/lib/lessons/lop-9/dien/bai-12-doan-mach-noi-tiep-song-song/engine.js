/**
 * Meter readings at every point of a series or parallel circuit, the meter
 * scale that fits each reading, and the laws the readings obey: in series one
 * current and added voltages, in parallel one voltage and added currents.
 */
import { tidy } from '#lib/core/number-format.js';
import { flatNetwork, solveCircuit } from '#lib/domain/circuit.js';

/** @typedef {{ range: number, division: number, labelStep: number }} Scale */

/** Ammeter scales, smallest first. @type {Scale[]} */
export const AMMETER_SCALES = [
  { range: 0.6, division: 0.02, labelStep: 0.2 },
  { range: 3, division: 0.1, labelStep: 1 },
  { range: 10, division: 0.2, labelStep: 2 },
];
/** Voltmeter scales, smallest first. @type {Scale[]} */
export const VOLTMETER_SCALES = [
  { range: 3, division: 0.1, labelStep: 1 },
  { range: 15, division: 0.5, labelStep: 5 },
  { range: 30, division: 1, labelStep: 10 },
];

/**
 * The smallest scale that can show `value`, or null when it is over every
 * range.
 * @param {Scale[]} scales @param {number} value
 */
export function pickScale(scales, value) {
  return scales.find((s) => value <= s.range + 1e-9) ?? null;
}

/**
 * Current and voltage of the whole circuit (`main`) and of each resistor.
 * @param {'series' | 'parallel'} mode @param {number[]} rs @param {number} u
 * @param {boolean} closed
 */
export function readings(mode, rs, u, closed) {
  const sol = solveCircuit(flatNetwork(mode, rs), u);
  const resistance = sol.resistance;
  if (!closed) {
    return {
      resistance,
      main: { i: 0, u: 0 },
      parts: rs.map(() => ({ i: 0, u: 0 })),
    };
  }
  return {
    resistance,
    main: { i: sol.current, u },
    parts: sol.resistors.map((p) => ({ i: p.current, u: p.voltage })),
  };
}

/**
 * Equivalent resistance by the book's formulas: R₁ + R₂ + … in series,
 * 1/R = 1/R₁ + 1/R₂ + … in parallel.
 * @param {'series' | 'parallel'} mode @param {number[]} rs
 */
export function equivalent(mode, rs) {
  return mode === 'series'
    ? tidy(rs.reduce((n, r) => n + r, 0))
    : tidy(1 / rs.reduce((n, r) => n + 1 / r, 0));
}

/**
 * Whether the readings obey the circuit's laws: in series every current is
 * the main current and the voltages add up; in parallel every voltage is the
 * source voltage and the currents add up.
 * @param {'series' | 'parallel'} mode
 * @param {{ main: { i: number, u: number }, parts: { i: number, u: number }[] }} r
 */
export function obeysLaws(mode, r) {
  const near = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-6;
  const sumI = r.parts.reduce((n, p) => n + p.i, 0);
  const sumU = r.parts.reduce((n, p) => n + p.u, 0);
  return mode === 'series'
    ? r.parts.every((p) => near(p.i, r.main.i)) && near(sumU, r.main.u)
    : r.parts.every((p) => near(p.u, r.main.u)) && near(sumI, r.main.i);
}
