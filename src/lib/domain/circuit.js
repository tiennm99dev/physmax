/**
 * Ohm's-law solver for resistor networks built from series and parallel
 * groups, fed by an ideal source of voltage U. Resistances are in ohms; an
 * open switch or broken wire is `Infinity`, a bare wire is 0.
 */
import { clean } from './vector.js';

/**
 * @typedef {{ type: 'resistor', r: number, label?: string }} Resistor
 * @typedef {{ type: 'series' | 'parallel', items: Network[] }} Group
 * @typedef {Resistor | Group} Network
 * @typedef {{ label: string, r: number, current: number, voltage: number, power: number }} ResistorReading
 * @typedef {{
 *   resistance: number,
 *   current: number,
 *   power: number,
 *   short: boolean,
 *   open: boolean,
 *   resistors: ResistorReading[],
 * }} CircuitSolution
 */

/**
 * Equivalent resistance of resistors in series: R = R1 + R2 + …
 * @param {number[]} rs
 */
export function seriesResistance(rs) {
  return clean(rs.reduce((n, r) => n + r, 0));
}

/**
 * Equivalent resistance of resistors in parallel: 1/R = 1/R1 + 1/R2 + …
 * A 0 Ω branch shorts the group; an empty or all-open group is open.
 * @param {number[]} rs
 */
export function parallelResistance(rs) {
  if (rs.some((r) => r === 0)) return 0;
  const g = rs.reduce((n, r) => n + 1 / r, 0);
  return g === 0 ? Infinity : clean(1 / g);
}

/**
 * Equivalent resistance of a whole network.
 * @param {Network} net
 * @returns {number}
 */
export function equivalentResistance(net) {
  if (net.type === 'resistor') return net.r;
  const rs = net.items.map(equivalentResistance);
  return net.type === 'series' ? seriesResistance(rs) : parallelResistance(rs);
}

/**
 * Current, voltage and power of every resistor, in network order. Unlabelled
 * resistors are named R1, R2, … in that order.
 * @param {Network} net
 * @param {number} voltage source voltage U
 * @returns {CircuitSolution}
 */
export function solveCircuit(net, voltage) {
  const resistance = equivalentResistance(net);
  const short = resistance === 0;
  const open = resistance === Infinity;
  /** @type {ResistorReading[]} */
  const resistors = [];
  let n = 0;

  /**
   * Hands a branch its current I and voltage U and walks down the tree.
   * @param {Network} node @param {number} i @param {number} u
   */
  const walk = (node, i, u) => {
    if (node.type === 'resistor') {
      n += 1;
      resistors.push({
        label: node.label ?? `R${n}`,
        r: node.r,
        current: clean(i),
        voltage: clean(u),
        power: clean(u * i),
      });
      return;
    }
    if (node.type === 'series') {
      for (const item of node.items) {
        const r = equivalentResistance(item);
        walk(item, i, r === Infinity ? (i === 0 ? u : 0) : i * r);
      }
      return;
    }
    const shorted = node.items.some((item) => equivalentResistance(item) === 0);
    for (const item of node.items) {
      const r = equivalentResistance(item);
      walk(item, shorted ? (r === 0 ? i : 0) : u / r, u);
    }
  };

  if (short) {
    walk(net, Infinity, 0);
  } else {
    walk(net, open ? 0 : voltage / resistance, voltage);
  }
  return {
    resistance,
    current: short ? Infinity : clean(open ? 0 : voltage / resistance),
    power: short ? Infinity : clean(open ? 0 : (voltage * voltage) / resistance),
    short,
    open,
    resistors,
  };
}

/**
 * A flat network of resistors all in series or all in parallel.
 * @param {'series' | 'parallel'} mode
 * @param {number[]} rs
 * @returns {Group}
 */
export function flatNetwork(mode, rs) {
  return { type: mode, items: rs.map((r) => ({ type: 'resistor', r })) };
}
