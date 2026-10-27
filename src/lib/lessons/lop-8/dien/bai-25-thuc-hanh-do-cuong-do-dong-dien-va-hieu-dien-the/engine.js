/**
 * The practical bench of the KHTN 8 lesson: a source, a switch, a torch lamp,
 * an ammeter at position (1) (between the source's + pole and the lamp) or (2)
 * (between the lamp and the − pole), and a voltmeter across the source or
 * across the lamp.
 *
 * The model is close enough to a real bench for the readings to behave the
 * way the book reports them:
 * - each source has an internal resistance, so the voltage across a working
 *   lamp is a little smaller than the voltage the source shows on open circuit;
 * - the ammeter has a small resistance, the voltmeter draws no current;
 * - a filament lamp is not a fixed resistor: its current grows like U^0.55
 *   (a hot filament resists more), passing its rated current at its rated
 *   voltage, so the I–U graph bends.
 * Meter readings snap to the meter's smallest division (độ chia nhỏ nhất).
 */

/** Ammeter: range (giới hạn đo), smallest division and resistance in Ω. */
export const AMMETER = { range: 0.6, division: 0.01, ohms: 0.1 };

/** Voltmeter: range and smallest division, V. */
export const VOLTMETER = { range: 6, division: 0.1 };

/**
 * @typedef {{ id: string, label: string, emf: number, ohms: number, nominal: number }} Source
 * `emf` is the open-circuit voltage, `nominal` the voltage printed on it.
 */

/** @type {Source[]} */
export const SOURCES = [
  { id: '1v5', label: '1,5 V', emf: 1.5, ohms: 0.4, nominal: 1.5 },
  { id: '3v', label: '3 V', emf: 3, ohms: 0.8, nominal: 3 },
  { id: '6v', label: '6 V', emf: 6, ohms: 1.6, nominal: 6 },
  { id: 'cu', label: '1,5 V (pin cũ)', emf: 1.3, ohms: 1.5, nominal: 1.5 },
];

/** @typedef {{ id: string, label: string, ratedU: number, ratedI: number }} Lamp */

/** @type {Lamp[]} */
export const LAMPS = [
  { id: 'd1', label: 'Đèn 6 V – 0,5 A', ratedU: 6, ratedI: 0.5 },
  { id: 'd2', label: 'Đèn 6 V – 0,3 A', ratedU: 6, ratedI: 0.3 },
];

/** Exponent of the lamp's I–U curve. */
const LAMP_POWER = 0.55;

/** Rounds away floating-point noise. */
const tidy = (/** @type {number} */ v) => Math.round(v * 1e9) / 1e9;

/** @param {string} id */
export const sourceById = (id) => SOURCES.find((s) => s.id === id) ?? SOURCES[0];
/** @param {string} id */
export const lampById = (id) => LAMPS.find((l) => l.id === id) ?? LAMPS[0];

/**
 * Current through the lamp at a given voltage across it.
 * @param {Lamp} lamp
 * @param {number} u
 */
export function lampCurrent(lamp, u) {
  if (u <= 0) return 0;
  return lamp.ratedI * Math.pow(u / lamp.ratedU, LAMP_POWER);
}

/**
 * The closed circuit, solved: the current I is the one at which the lamp,
 * given U = E − I (r + r_A), lets exactly I through.
 * @param {Source} source
 * @param {Lamp} lamp
 * @returns {{ current: number, lampVoltage: number, terminalVoltage: number }}
 */
export function solveCircuit(source, lamp) {
  const drop = source.ohms + AMMETER.ohms;
  let lo = 0;
  let hi = source.emf / drop;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    if (lampCurrent(lamp, source.emf - mid * drop) > mid) lo = mid;
    else hi = mid;
  }
  const current = (lo + hi) / 2;
  return {
    current,
    lampVoltage: source.emf - current * drop,
    terminalVoltage: source.emf - current * source.ohms,
  };
}

/**
 * A value as the meter shows it: on the nearest division mark.
 * @param {number} value
 * @param {number} division
 */
export function snapToDivision(value, division) {
  return tidy(Math.round(value / division) * division);
}

/** @typedef {'1' | '2'} AmmeterAt */
/** @typedef {'nguon' | 'den'} VoltmeterAt */

/**
 * What the two meters and the lamp show.
 * @param {{ sourceId: string, lampId: string, closed: boolean, ammeterAt: AmmeterAt, voltmeterAt: VoltmeterAt }} bench
 */
export function readBench({ sourceId, lampId, closed, voltmeterAt }) {
  const source = sourceById(sourceId);
  const lamp = lampById(lampId);
  if (!closed) {
    return {
      ammeter: 0,
      voltmeter: voltmeterAt === 'nguon' ? snapToDivision(source.emf, VOLTMETER.division) : 0,
      lampOn: false,
      glow: 0,
    };
  }
  const c = solveCircuit(source, lamp);
  // The same current passes position (1) and position (2): one loop, no branch.
  return {
    ammeter: snapToDivision(c.current, AMMETER.division),
    voltmeter: snapToDivision(
      voltmeterAt === 'nguon' ? c.terminalVoltage : c.lampVoltage,
      VOLTMETER.division,
    ),
    lampOn: true,
    glow: Math.min(1, Math.pow(c.current / lamp.ratedI, 2)),
  };
}

/** @typedef {'uNguon' | 'i1' | 'i2' | 'uDen'} Column */

/** Columns of the results table, in the order the book measures them. */
export const COLUMNS = /** @type {const} */ (['uNguon', 'i1', 'i2', 'uDen']);

/**
 * The reading each table cell should hold for a source and a lamp. The
 * source voltage is read with the switch open, as in the book.
 * @param {string} sourceId
 * @param {string} lampId
 * @returns {Record<Column, number>}
 */
export function expectedRow(sourceId, lampId) {
  const source = sourceById(sourceId);
  const c = solveCircuit(source, lampById(lampId));
  const i = snapToDivision(c.current, AMMETER.division);
  return {
    uNguon: snapToDivision(source.emf, VOLTMETER.division),
    i1: i,
    i2: i,
    uDen: snapToDivision(c.lampVoltage, VOLTMETER.division),
  };
}

/** Division of the meter that fills a column. @param {Column} col */
export const divisionOf = (col) =>
  col === 'i1' || col === 'i2' ? AMMETER.division : VOLTMETER.division;

/**
 * Checks a typed reading against the meter: within one smallest division of
 * the true mark, as a careful reader manages on a dial.
 * @param {number | null} typed
 * @param {number} expected
 * @param {number} division
 * @returns {'trong' | 'dung' | 'sai'}
 */
export function checkReading(typed, expected, division) {
  if (typed === null) return 'trong';
  return Math.abs(typed - expected) <= division + 1e-9 ? 'dung' : 'sai';
}

/**
 * Needle angle in degrees: −60° at zero, +60° at full scale, pinned a little
 * past full scale.
 * @param {number} reading
 * @param {number} range
 */
export function needleAngle(reading, range) {
  const f = Math.max(0, Math.min(1.05, reading / range));
  return tidy(-60 + 120 * f);
}
