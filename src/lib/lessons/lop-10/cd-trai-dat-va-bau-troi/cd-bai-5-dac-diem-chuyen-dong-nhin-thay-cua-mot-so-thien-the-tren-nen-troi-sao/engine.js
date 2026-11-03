/**
 * The sky of the lesson computed from the heliocentric model: planets on
 * circular orbits with their real sizes, periods and tilts, a mean Moon, and
 * the daily path of the Sun for an observer. Good to a degree or two, enough to
 * show the shape of the motions. Day `n` counts from 1 January 2027.
 */

const RAD = Math.PI / 180;
const DAY_MS = 86_400_000;
const START = Date.UTC(2027, 0, 1);
/** Days from the epoch of the orbital elements (noon, 1 January 2000) to day 0. */
const EPOCH_OFFSET = 9861.5;
const TILT = 23.44;

/** @param {number} deg wrapped to [-180, 180) */
export function wrap180(deg) {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

/** @param {number} deg wrapped to [0, 360) */
export function wrap360(deg) {
  return ((deg % 360) + 360) % 360;
}

/**
 * @typedef {{ id: string, name: string, a: number, l0: number, rate: number, i: number, node: number }} Planet
 * `a` in astronomical units, angles in degrees, `rate` in degrees a day.
 */

/** @type {Planet[]} */
export const PLANETS = [
  { id: 'thuy', name: 'Thủy tinh', a: 0.387, l0: 252.25, rate: 4.09233, i: 7, node: 48.33 },
  { id: 'kim', name: 'Kim tinh', a: 0.723, l0: 181.98, rate: 1.60213, i: 3.39, node: 76.68 },
  { id: 'hoa', name: 'Hỏa tinh', a: 1.524, l0: 355.45, rate: 0.52403, i: 1.85, node: 49.56 },
];

const EARTH = { a: 1, l0: 100.46, rate: 0.98561 };

/** @param {string} id */
export function planetById(id) {
  return /** @type {Planet} */ (PLANETS.find((p) => p.id === id));
}

/**
 * Longitude on the circular orbit, in degrees.
 * @param {{ l0: number, rate: number }} body @param {number} n
 */
export function orbitAngle(body, n) {
  return wrap360(body.l0 + body.rate * (n + EPOCH_OFFSET));
}

/** @param {number} n */
export function earthAngle(n) {
  return orbitAngle(EARTH, n);
}

/**
 * Position of the planet seen from Earth: ecliptic longitude and latitude.
 * @param {Planet} p @param {number} n
 * @returns {{ lon: number, lat: number }}
 */
export function seenFromEarth(p, n) {
  const u = (orbitAngle(p, n) - p.node) * RAD;
  const node = p.node * RAD;
  const tilt = p.i * RAD;
  const x = p.a * (Math.cos(node) * Math.cos(u) - Math.sin(node) * Math.sin(u) * Math.cos(tilt));
  const y = p.a * (Math.sin(node) * Math.cos(u) + Math.cos(node) * Math.sin(u) * Math.cos(tilt));
  const z = p.a * Math.sin(u) * Math.sin(tilt);
  const e = earthAngle(n) * RAD;
  const dx = x - Math.cos(e);
  const dy = y - Math.sin(e);
  return {
    lon: wrap360(Math.atan2(dy, dx) / RAD),
    lat: Math.atan2(z, Math.hypot(dx, dy)) / RAD,
  };
}

/**
 * Mean longitude of the Sun seen from Earth.
 * @param {number} n
 */
export function sunLon(n) {
  return wrap360(earthAngle(n) + 180);
}

/**
 * Mean position of the Moon: its orbit is tilted about 5° to the ecliptic.
 * @param {number} n
 * @returns {{ lon: number, lat: number }}
 */
export function moonPosition(n) {
  const j = n + EPOCH_OFFSET;
  return {
    lon: wrap360(218.316 + 13.176396 * j),
    lat: 5.128 * Math.sin((93.272 + 13.22935 * j) * RAD),
  };
}

/**
 * Angle from the Sun, positive to the east of it.
 * @param {number} lon @param {number} n
 */
export function elongation(lon, n) {
  return wrap180(lon - sunLon(n));
}

/**
 * The largest elongation an inner planet reaches on a circular orbit.
 * @param {Planet} p
 */
export function maxElongation(p) {
  return p.a < 1 ? Math.asin(p.a) / RAD : 180;
}

/**
 * Whether the planet is moving westward among the stars at the moment.
 * @param {Planet} p @param {number} n
 */
export function isRetrograde(p, n) {
  return wrap180(seenFromEarth(p, n + 1).lon - seenFromEarth(p, n).lon) < 0;
}

/**
 * When an inner planet can be seen, from the side of the Sun it is on.
 * @param {number} elong degrees, positive to the east of the Sun
 */
export function visibilityOf(elong) {
  return elong > 0 ? 'hoàng hôn, ở trên trời phía Tây' : 'bình minh, ở trên trời phía Đông';
}

/** @param {number} n */
export function dateText(n) {
  const d = new Date(START + Math.floor(n) * DAY_MS);
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

/**
 * The constellations the Sun crosses, by modern boundaries, with the first day
 * (month, day) the Sun is in each.
 */
const ZODIAC_DATES = /** @type {const} */ ([
  ['Ma Kết', 1, 20],
  ['Bảo Bình', 2, 16],
  ['Song Ngư', 3, 12],
  ['Bạch Dương', 4, 19],
  ['Kim Ngưu', 5, 14],
  ['Song Tử', 6, 21],
  ['Cự Giải', 7, 20],
  ['Sư Tử', 8, 11],
  ['Xử Nữ', 9, 17],
  ['Thiên Bình', 10, 31],
  ['Thiên Yết', 11, 23],
  ['Xà Phu', 11, 30],
  ['Nhân Mã', 12, 18],
]);

/** Start of each constellation along the ecliptic, in increasing longitude from Ma Kết. */
export const ZODIAC = ZODIAC_DATES.map(([name, month, day]) => ({
  name,
  from: sunLon((Date.UTC(2027, month - 1, day) - START) / DAY_MS),
}));

/**
 * The constellation at an ecliptic longitude.
 * @param {number} lon
 */
export function constellationAt(lon) {
  const first = ZODIAC[0].from;
  const offset = wrap360(lon - first);
  let name = ZODIAC[0].name;
  for (const z of ZODIAC) {
    if (wrap360(z.from - first) <= offset) name = z.name;
  }
  return name;
}

/**
 * Path of a planet on the sky over the last days, as sky positions.
 * @param {Planet} p @param {number} n @param {number} days @param {number} step
 */
export function trail(p, n, days, step) {
  const points = [];
  for (let d = n - days; d <= n; d += step) points.push(seenFromEarth(p, d));
  return points;
}

/**
 * Cuts a list of x positions into runs without a jump across the strip.
 * @template {{ x: number, y: number }} T
 * @param {T[]} points @param {number} jump
 * @returns {T[][]}
 */
export function splitRuns(points, jump) {
  /** @type {T[][]} */
  const runs = [];
  /** @type {T[]} */
  let run = [];
  for (const p of points) {
    const last = run[run.length - 1];
    if (last && Math.abs(p.x - last.x) > jump) {
      runs.push(run);
      run = [];
    }
    run.push(p);
  }
  if (run.length) runs.push(run);
  return runs;
}

/**
 * The Moon's phase from its angle to the Sun.
 * @param {number} elong degrees east of the Sun, -180 to 180
 * @returns {{ name: string, lit: number, waxing: boolean }}
 */
export function moonPhase(elong) {
  const e = wrap360(elong);
  const names = [
    'trăng non (không trăng)',
    'trăng lưỡi liềm đầu tháng',
    'trăng bán nguyệt đầu tháng',
    'trăng khuyết đầu tháng',
    'trăng tròn',
    'trăng khuyết cuối tháng',
    'trăng bán nguyệt cuối tháng',
    'trăng lưỡi liềm cuối tháng',
  ];
  const at = Math.floor(((e + 22.5) % 360) / 45);
  return { name: names[at], lit: (1 - Math.cos(e * RAD)) / 2, waxing: e < 180 };
}

/**
 * SVG path of the lit part of the Moon as seen from the northern hemisphere,
 * where the waxing Moon is lit on the right.
 * @param {number} cx @param {number} cy @param {number} r
 * @param {number} elong degrees east of the Sun
 */
export function moonLitPath(cx, cy, r, elong) {
  const e = wrap360(elong);
  const waxing = e < 180;
  const edge = r * Math.abs(Math.cos(e * RAD));
  const gibbous = e > 90 && e < 270;
  const outer = waxing ? 1 : 0;
  const inner = gibbous === waxing ? 1 : 0;
  return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outer} ${cx} ${cy + r} A ${edge} ${r} 0 0 ${inner} ${cx} ${cy - r} Z`;
}

/**
 * The Sun's true longitude on a day of the year, 0 for 1 January.
 * @param {number} day
 */
export function sunTrueLon(day) {
  const j = day + EPOCH_OFFSET;
  const g = (357.53 + 0.9856 * j) * RAD;
  return wrap360(280.46 + 0.98565 * j + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

/**
 * Declination of the Sun on a day of the year, in degrees.
 * @param {number} day
 */
export function declination(day) {
  return Math.asin(Math.sin(TILT * RAD) * Math.sin(sunTrueLon(day) * RAD)) / RAD;
}

/**
 * Altitude and azimuth (from north towards east) of the Sun.
 * @param {number} lat @param {number} dec @param {number} hour local solar time
 * @returns {{ alt: number, az: number }}
 */
export function sunPosition(lat, dec, hour) {
  const h = (hour - 12) * 15 * RAD;
  const f = lat * RAD;
  const d = dec * RAD;
  const alt = Math.asin(Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(h));
  const az = Math.atan2(
    -Math.cos(d) * Math.sin(h),
    Math.sin(d) * Math.cos(f) - Math.cos(d) * Math.cos(h) * Math.sin(f),
  );
  return { alt: alt / RAD, az: wrap360(az / RAD) };
}

/**
 * Hours of daylight, ignoring the bending of light by the air.
 * @param {number} lat @param {number} dec
 */
export function dayLength(lat, dec) {
  const c = -Math.tan(lat * RAD) * Math.tan(dec * RAD);
  return (2 * Math.acos(Math.min(1, Math.max(-1, c)))) / RAD / 15;
}

/**
 * A length of time from fractional hours, rounded to the minute.
 * @param {number} hours
 */
export function durationText(hours) {
  const total = Math.round(hours * 60);
  return `${Math.floor(total / 60)} giờ ${total % 60} phút`;
}

/**
 * How far north of due east the Sun rises (negative: south of it), in degrees.
 * @param {number} lat @param {number} dec
 */
export function riseOffset(lat, dec) {
  return Math.asin(Math.sin(dec * RAD) / Math.cos(lat * RAD)) / RAD;
}

/**
 * Height of the Sun at noon, in degrees, and the side of the zenith it is on.
 * @param {number} lat @param {number} dec
 * @returns {{ alt: number, side: 'Nam' | 'Bắc' | 'đỉnh đầu' }}
 */
export function noonSun(lat, dec) {
  const alt = 90 - Math.abs(lat - dec);
  if (Math.abs(lat - dec) < 0.05) return { alt, side: 'đỉnh đầu' };
  return { alt, side: lat > dec ? 'Nam' : 'Bắc' };
}

/** The four dates that mark the seasons, as days of the year. */
export const MARKS = [
  { id: 'xuan', name: 'Xuân phân', day: 78 },
  { id: 'ha', name: 'Hạ chí', day: 171 },
  { id: 'thu', name: 'Thu phân', day: 265 },
  { id: 'dong', name: 'Đông chí', day: 354 },
];
