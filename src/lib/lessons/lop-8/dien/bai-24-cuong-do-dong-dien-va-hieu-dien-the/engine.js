/**
 * A battery, a switch and a lamp, with an ammeter and a voltmeter the learner
 * connects either way. The ammeter is modelled as a near-zero resistance and
 * the voltmeter as a near-infinite one, so connecting them the wrong way gives
 * what a real bench gives: an ammeter across the lamp shorts it and is
 * overloaded, a voltmeter in series stops the current and reads about the
 * source voltage. A meter wired with its terminals reversed swings its needle
 * below zero. The lamp is modelled as a fixed 6 Ω, so the current is U/6.
 */

/** Lamp resistance in the model, Ω. */
export const LAMP_OHMS = 6;

/** Ammeter range (giới hạn đo) and smallest division (độ chia nhỏ nhất), A. */
export const AMMETER = { range: 1, division: 0.05 };

/** Voltmeter range and smallest division, V. */
export const VOLTMETER = { range: 6, division: 0.1 };

/** Source voltages the bench offers, V. */
export const SOURCES = [1.5, 3, 4.5];

/** @typedef {'noi-tiep' | 'song-song' | 'khong'} Placement */
/** @typedef {{ at: Placement, plusToPositive: boolean }} Meter */
/** @typedef {'ak-song-song' | 'vk-noi-tiep' | 'ak-nguoc' | 'vk-nguoc'} BenchError */

/** Rounds away floating-point noise. */
const tidy = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;

/**
 * What the bench shows. Meter readings are signed: negative means the needle
 * swings back below zero. `ammeter` is Infinity when it is overloaded, and
 * null for a meter that is not connected.
 * @param {{ voltage: number, closed: boolean, ammeter: Meter, voltmeter: Meter }} bench
 * @returns {{
 *   lampCurrent: number,
 *   lampOn: boolean,
 *   ammeter: number | null,
 *   voltmeter: number | null,
 *   errors: BenchError[],
 * }}
 */
export function readBench({ voltage, closed, ammeter, voltmeter }) {
  /** @type {BenchError[]} */
  const errors = [];
  const aOn = ammeter.at !== 'khong';
  const vOn = voltmeter.at !== 'khong';
  if (vOn && voltmeter.at === 'noi-tiep') errors.push('vk-noi-tiep');
  if (aOn && ammeter.at === 'song-song') errors.push('ak-song-song');

  let lampCurrent = 0;
  let aRead = 0;
  let vRead = 0;
  if (closed) {
    if (vOn && voltmeter.at === 'noi-tiep') {
      // Almost no current; the whole source voltage falls across the voltmeter.
      vRead = voltage;
    } else if (aOn && ammeter.at === 'song-song') {
      // The ammeter shorts the lamp: a very large current through it.
      aRead = Infinity;
    } else {
      lampCurrent = tidy(voltage / LAMP_OHMS);
      aRead = lampCurrent;
      vRead = voltage;
    }
  }
  const sign = (/** @type {Meter} */ m) => (m.plusToPositive ? 1 : -1);
  if (aOn && aRead !== 0 && !ammeter.plusToPositive) errors.push('ak-nguoc');
  if (vOn && vRead !== 0 && !voltmeter.plusToPositive) errors.push('vk-nguoc');
  return {
    lampCurrent,
    lampOn: lampCurrent > 0,
    ammeter: aOn ? aRead * sign(ammeter) : null,
    voltmeter: vOn ? vRead * sign(voltmeter) : null,
    errors,
  };
}

/**
 * Needle angle in degrees for a reading on a meter of the given range: −60°
 * at zero, +60° at full scale, pinned a little past either end.
 * @param {number} reading
 * @param {number} range
 */
export function needleAngle(reading, range) {
  const f = Math.max(-0.08, Math.min(1.08, reading / range));
  return tidy(-60 + 120 * f);
}

/**
 * Converts between A and mA, or V and mV / kV.
 * @param {number} value
 * @param {'A' | 'mA' | 'V' | 'mV' | 'kV'} from
 * @param {'A' | 'mA' | 'V' | 'mV' | 'kV'} to
 */
export function convert(value, from, to) {
  /** @type {Record<string, number>} */
  const base = { A: 1, mA: 0.001, V: 1, mV: 0.001, kV: 1000 };
  return tidy((value * base[from]) / base[to]);
}
