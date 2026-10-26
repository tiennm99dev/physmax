/**
 * The Earth seen from above the North Pole, lit by the Sun from the left.
 *
 * A place on the Earth sits at a position angle measured counterclockwise
 * from the right-hand side of the picture (the side facing away from the
 * Sun). The Earth spins counterclockwise seen from above the North Pole, that
 * is from west to east, so the angle of every place grows with time:
 *
 * - angle 0°: the place faces away from the Sun, local midnight;
 * - angle 90°: the place turns into the light, sunrise (6 h);
 * - angle 180°: the place faces the Sun, local noon (12 h);
 * - angle 270°: the place turns into the shadow, sunset (18 h).
 *
 * One turn (360°) takes about 24 hours, so 15° is one hour. The time here is
 * the solar time of the place (noon when the Sun is highest), not the clock
 * time of a time zone.
 *
 * The sky picture uses the simplest model, an observer on the equator at an
 * equinox: the Sun rises due east at 6 h, is overhead at noon and sets due
 * west at 18 h, its height above the horizon being 90° − 15° × |hour − 12|.
 */

/** Degrees the Earth turns in one hour. */
export const DEG_PER_HOUR = 15;

/**
 * @typedef {{ id: string, name: string, lon: number, lonText: string }} Place
 */

/** Places marked on the globe; `lon` east positive, in degrees. */
/** @type {Place[]} */
export const PLACES = [
  { id: 'viet-nam', name: 'Việt Nam', lon: 105, lonText: 'kinh độ 105° Đông' },
  { id: 'anh', name: 'Anh', lon: 0, lonText: 'kinh độ 0°' },
  { id: 'brazil', name: 'Brazil', lon: -45, lonText: 'kinh độ 45° Tây' },
  { id: 'hawaii', name: 'Hawaii', lon: -155, lonText: 'kinh độ 155° Tây' },
];

/** @param {number} a */
export function wrap360(a) {
  return ((a % 360) + 360) % 360;
}

/**
 * Position angle of a place when the Earth has turned `spin` degrees.
 * @param {number} spin @param {number} lon
 */
export function placeAngle(spin, lon) {
  return wrap360(spin + lon);
}

/**
 * Local solar time, in hours in [0, 24), of a place at position angle `angle`.
 * @param {number} angle
 */
export function hourAt(angle) {
  return wrap360(angle) / DEG_PER_HOUR;
}

/**
 * Spin that puts `lon` at local hour `hour`.
 * @param {number} lon @param {number} hour
 */
export function spinFor(lon, hour) {
  return wrap360(hour * DEG_PER_HOUR - lon);
}

/**
 * Height of the Sun above the horizon, in degrees, for the equator model;
 * negative below the horizon.
 * @param {number} hour
 */
export function sunAltitude(hour) {
  return 90 - DEG_PER_HOUR * Math.abs(wrapHour(hour) - 12);
}

/** @param {number} hour */
function wrapHour(hour) {
  return ((hour % 24) + 24) % 24;
}

/**
 * Whether the place is on the lit half of the Earth (daytime). Sunrise and
 * sunset, exactly on the edge, count as day.
 * @param {number} hour
 */
export function isDay(hour) {
  return sunAltitude(hour) >= 0;
}

/**
 * @typedef {'dem' | 'moc' | 'sang' | 'trua' | 'chieu' | 'lan'} Moment
 */

/**
 * The part of the day at a local hour.
 * @param {number} hour
 * @returns {Moment}
 */
export function momentOf(hour) {
  const h = wrapHour(hour);
  if (h >= 5.5 && h <= 6.5) return 'moc';
  if (h >= 17.5 && h <= 18.5) return 'lan';
  if (h >= 11.5 && h <= 12.5) return 'trua';
  if (h > 6.5 && h < 11.5) return 'sang';
  if (h > 12.5 && h < 17.5) return 'chieu';
  return 'dem';
}

/** @type {Record<Moment, string>} */
export const MOMENT_TEXT = {
  dem: 'ban đêm: nơi này ở nửa Trái Đất không được chiếu sáng, không thấy Mặt Trời',
  moc: 'Mặt Trời mọc: nơi này vừa quay vào nửa được chiếu sáng, thấy Mặt Trời nhô lên ở phía đông',
  sang: 'buổi sáng: Mặt Trời ở phía đông và đang lên cao dần',
  trua: 'giữa trưa: Mặt Trời lên cao nhất trên bầu trời',
  chieu: 'buổi chiều: Mặt Trời đã sang phía tây và thấp dần',
  lan: 'Mặt Trời lặn: nơi này sắp quay vào nửa tối, thấy Mặt Trời khuất dần ở phía tây',
};

/**
 * A local hour written as a clock reading: 6.5 → '6 giờ 30 phút', 0 → '0 giờ'.
 * @param {number} hour
 */
export function clockText(hour) {
  const total = Math.round(wrapHour(hour) * 60) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/**
 * Where the Sun is drawn in the sky picture, as a fraction across the sky from
 * the eastern horizon (0) to the western horizon (1), and its height as a
 * fraction of the highest point (1 at noon), along a parabola-shaped arc.
 * Null at night.
 * @param {number} hour
 * @returns {{ across: number, up: number } | null}
 */
export function skyPosition(hour) {
  const h = wrapHour(hour);
  if (!isDay(h)) return null;
  const across = (h - 6) / 12;
  return { across, up: 4 * across * (1 - across) };
}
