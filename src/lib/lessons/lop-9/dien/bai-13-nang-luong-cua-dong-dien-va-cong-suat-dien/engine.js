/**
 * A household electricity bill: each appliance uses W = P·t a day, a month
 * adds up the days, the công tơ (kWh meter) counts the total, and the bill is
 * the number of kWh times the price of one kWh.
 */
import { tidy } from '#lib/core/number-format.js';

/** Joules in one kilowatt-hour: 1 kWh = 1 000 W · 3 600 s. */
export const J_PER_KWH = 3_600_000;
/** Days counted in one month of the bill. */
export const DAYS = 30;
/** The công tơ reading at the start of the month, kWh. */
export const METER_START = 1245;

/**
 * Appliances on the bench: rated power P (W) at 220 V and a typical use, in
 * half hours a day.
 * @type {{ id: string, name: string, power: number, half: number }[]}
 */
export const APPLIANCES = [
  { id: 'den', name: 'Đèn LED', power: 20, half: 12 },
  { id: 'quat', name: 'Quạt điện', power: 60, half: 16 },
  { id: 'tivi', name: 'Ti vi', power: 100, half: 8 },
  { id: 'noi', name: 'Nồi cơm điện', power: 700, half: 2 },
  { id: 'am', name: 'Ấm siêu tốc', power: 1500, half: 1 },
  { id: 'dieuhoa', name: 'Điều hoà', power: 1000, half: 0 },
];

/**
 * Electrical energy W = U·I·t in J (U in V, I in A, t in s).
 * @param {number} u @param {number} i @param {number} t
 */
export function energyJ(u, i, t) {
  return tidy(u * i * t);
}

/**
 * Energy in kWh used by a device of power `power` (W) running `hours` hours:
 * W = P·t with P in kW and t in h.
 * @param {number} power @param {number} hours
 */
export function energyKWh(power, hours) {
  return tidy((power / 1000) * hours);
}

/**
 * The current a device of rated power `power` (W) draws at voltage `u` (V):
 * I = P/U.
 * @param {number} power @param {number} u
 */
export function ratedCurrent(power, u) {
  return tidy(power / u);
}

/**
 * Per-appliance energy a day and a month, the month's total, the công tơ
 * reading at the end of the month and the bill.
 * @param {{ name: string, power: number, hours: number }[]} uses
 * @param {number} price đồng per kWh
 */
export function monthlyBill(uses, price) {
  const rows = uses.map((u) => {
    const day = energyKWh(u.power, u.hours);
    return { name: u.name, power: u.power, hours: u.hours, day, month: tidy(day * DAYS) };
  });
  const total = tidy(rows.reduce((n, r) => n + r.month, 0));
  const top = rows.reduce(
    (best, r) => (best === null || r.month > best.month ? r : best),
    /** @type {(typeof rows)[number] | null} */ (null),
  );
  return {
    rows,
    total,
    meterEnd: tidy(METER_START + total, 1),
    cost: Math.round(total * price),
    top: top && top.month > 0 ? top : null,
  };
}

/**
 * The digits a five-wheel công tơ shows for a reading: whole kWh, padded
 * with zeros; the last wheel (tenths) is shown apart.
 * @param {number} reading
 */
export function meterDigits(reading) {
  const tenths = Math.floor(tidy(reading * 10, 6)) % 10;
  const whole = String(Math.floor(tidy(reading, 6)) % 100000).padStart(5, '0');
  return { whole: whole.split(''), tenths };
}
