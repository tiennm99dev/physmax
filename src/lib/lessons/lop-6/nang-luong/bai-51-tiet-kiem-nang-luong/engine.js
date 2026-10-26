/**
 * A virtual home and its electricity bill. Each appliance has a power (W) and
 * the hours a day it is really needed. A wasteful habit leaves it running for
 * extra hours nobody uses (a light on in an empty room, a TV nobody watches);
 * an appliance left plugged in also draws a little standby power the rest of
 * the day. Lights can be filament bulbs (60 W) or LED bulbs (15 W) giving the
 * same light, which matches the 10 % and 40 % useful fractions of the lesson
 * on wasted energy.
 *
 * Electrical energy: E (kWh) = P (W) × t (h) ÷ 1 000. The bill is the monthly
 * energy (30 days) times one illustrative price per kWh.
 */

/** @typedef {'soi-dot' | 'led'} BulbId */
/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   room: string,
 *   watts: number,
 *   lamp?: boolean,
 *   needHours: number,
 *   extraHours: number,
 *   standbyW: number,
 *   wasteLabel: string,
 * }} Device
 */
/**
 * @typedef {{
 *   bulbs: Record<string, BulbId>,
 *   offWhenIdle: Record<string, boolean>,
 *   unplug: boolean,
 * }} Settings
 */

/** Same light from either bulb; power in W. */
export const BULB_WATTS = { 'soi-dot': 60, led: 15 };
/** @type {Record<BulbId, string>} */
export const BULB_NAMES = { 'soi-dot': 'Đèn sợi đốt 60 W', led: 'Đèn LED 15 W' };

/** Illustrative electricity price, đồng per kWh. */
export const PRICE = 2000;
export const DAYS = 30;

/** @type {Device[]} */
export const DEVICES = [
  {
    id: 'den-khach',
    name: 'Đèn phòng khách',
    room: 'Phòng khách',
    watts: BULB_WATTS['soi-dot'],
    lamp: true,
    needHours: 5,
    extraHours: 5,
    standbyW: 0,
    wasteLabel: 'bật cả ban ngày khi trời sáng',
  },
  {
    id: 'tivi',
    name: 'Ti vi',
    room: 'Phòng khách',
    watts: 100,
    needHours: 4,
    extraHours: 4,
    standbyW: 2,
    wasteLabel: 'bật mà không ai xem',
  },
  {
    id: 'den-ngu',
    name: 'Đèn phòng ngủ',
    room: 'Phòng ngủ',
    watts: BULB_WATTS['soi-dot'],
    lamp: true,
    needHours: 3,
    extraHours: 5,
    standbyW: 0,
    wasteLabel: 'quên tắt khi ra khỏi phòng',
  },
  {
    id: 'quat',
    name: 'Quạt điện',
    room: 'Phòng ngủ',
    watts: 50,
    needHours: 8,
    extraHours: 6,
    standbyW: 0,
    wasteLabel: 'chạy khi không có ai trong phòng',
  },
  {
    id: 'dieu-hoa',
    name: 'Điều hoà',
    room: 'Phòng ngủ',
    watts: 1000,
    needHours: 5,
    extraHours: 3,
    standbyW: 3,
    wasteLabel: 'bật sẵn khi chưa có ai, để cửa mở',
  },
  {
    id: 'den-bep',
    name: 'Đèn bếp',
    room: 'Bếp',
    watts: BULB_WATTS['soi-dot'],
    lamp: true,
    needHours: 2,
    extraHours: 4,
    standbyW: 0,
    wasteLabel: 'để sáng suốt buổi tối',
  },
  {
    id: 'binh-nong',
    name: 'Bình nóng lạnh',
    room: 'Phòng tắm',
    watts: 2500,
    needHours: 0.5,
    extraHours: 1.5,
    standbyW: 0,
    wasteLabel: 'bật sẵn quá lâu trước khi tắm',
  },
];

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * Electrical energy in kWh used by `watts` running for `hours`.
 * @param {number} watts @param {number} hours
 */
export function kWh(watts, hours) {
  return tidy((watts * hours) / 1000);
}

/** @param {number} energyKWh */
export function cost(energyKWh) {
  return Math.round(energyKWh * PRICE);
}

/**
 * Power of a device under the settings (bulb choice for lamps).
 * @param {Device} d @param {Settings} s
 */
export function powerOf(d, s) {
  return d.lamp ? BULB_WATTS[s.bulbs[d.id] ?? 'soi-dot'] : d.watts;
}

/**
 * Daily use of one device: running hours, running and standby energy.
 * @param {Device} d @param {Settings} s
 */
export function deviceDay(d, s) {
  const hours = d.needHours + (s.offWhenIdle[d.id] ? 0 : d.extraHours);
  const run = kWh(powerOf(d, s), hours);
  const standby = s.unplug ? 0 : kWh(d.standbyW, 24 - hours);
  return { hours, run, standby, total: tidy(run + standby) };
}

/**
 * The whole home: energy per day and per month, and the monthly bill.
 * @param {Settings} s
 */
export function houseUsage(s) {
  const byDevice = DEVICES.map((d) => ({ device: d, ...deviceDay(d, s) }));
  const day = tidy(byDevice.reduce((sum, r) => sum + r.total, 0));
  const month = tidy(day * DAYS);
  return { byDevice, day, month, bill: cost(month) };
}

/** Every habit wasteful: filament bulbs, all left on, all plugged in. @returns {Settings} */
export function wastefulSettings() {
  return { bulbs: {}, offWhenIdle: {}, unplug: false };
}

/** Every habit thrifty. @returns {Settings} */
export function thriftySettings() {
  /** @type {Record<string, BulbId>} */
  const bulbs = {};
  /** @type {Record<string, boolean>} */
  const offWhenIdle = {};
  for (const d of DEVICES) {
    if (d.lamp) bulbs[d.id] = 'led';
    offWhenIdle[d.id] = true;
  }
  return { bulbs, offWhenIdle, unplug: true };
}

/**
 * The single change that would cut the monthly bill the most from here, or
 * null when every habit is already thrifty.
 * @param {Settings} s
 * @returns {{ text: string, savedMonth: number } | null}
 */
export function bestTip(s) {
  const base = houseUsage(s).month;
  /** @type {{ text: string, savedMonth: number } | null} */
  let best = null;
  /** @param {string} text @param {Settings} next */
  const consider = (text, next) => {
    const savedMonth = tidy(base - houseUsage(next).month);
    if (savedMonth > 0 && (!best || savedMonth > best.savedMonth)) best = { text, savedMonth };
  };
  for (const d of DEVICES) {
    if (!s.offWhenIdle[d.id]) {
      consider(`tắt ${d.name.toLowerCase()} khi không dùng (đang ${d.wasteLabel})`, {
        ...s,
        offWhenIdle: { ...s.offWhenIdle, [d.id]: true },
      });
    }
    if (d.lamp && (s.bulbs[d.id] ?? 'soi-dot') === 'soi-dot') {
      consider(`thay ${d.name.toLowerCase()} bằng đèn LED`, {
        ...s,
        bulbs: { ...s.bulbs, [d.id]: 'led' },
      });
    }
  }
  if (!s.unplug) consider('rút phích cắm ti vi, điều hoà khi không dùng', { ...s, unplug: true });
  return best;
}
