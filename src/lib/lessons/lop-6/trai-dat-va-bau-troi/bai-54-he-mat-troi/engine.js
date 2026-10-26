/**
 * Data and scaling for a model of the Solar System.
 *
 * Distances from the Sun are mean orbital radii in astronomical units
 * (đơn vị thiên văn, AU): 1 AU is the mean Earth–Sun distance, about
 * 150 million km. Diameters are equatorial, in km, with the ratio to the
 * Earth's diameter. Periods are the times to go once around the Sun, in
 * Earth years. Orbits are drawn as circles, which they nearly are.
 */

/** One astronomical unit, in millions of km (the textbook's rounded value). */
export const AU_MILLION_KM = 150;

/** Earth's equatorial diameter, km. */
export const EARTH_KM = 12756;
/** The Sun's diameter, km. */
export const SUN_KM = 1392000;

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   au: number,
 *   km: number,
 *   periodYears: number,
 *   group: 'trong' | 'ngoai',
 *   color: string,
 * }} Planet
 */

/** The eight planets, nearest the Sun first. */
/** @type {Planet[]} */
export const PLANETS = [
  {
    id: 'thuy',
    name: 'Thuỷ tinh',
    au: 0.39,
    km: 4879,
    periodYears: 0.24,
    group: 'trong',
    color: '#a8a29e',
  },
  {
    id: 'kim',
    name: 'Kim tinh',
    au: 0.72,
    km: 12104,
    periodYears: 0.62,
    group: 'trong',
    color: '#fbbf24',
  },
  {
    id: 'trai-dat',
    name: 'Trái Đất',
    au: 1,
    km: EARTH_KM,
    periodYears: 1,
    group: 'trong',
    color: '#3b82f6',
  },
  {
    id: 'hoa',
    name: 'Hoả tinh',
    au: 1.52,
    km: 6792,
    periodYears: 1.88,
    group: 'trong',
    color: '#ef4444',
  },
  {
    id: 'moc',
    name: 'Mộc tinh',
    au: 5.2,
    km: 142984,
    periodYears: 11.86,
    group: 'ngoai',
    color: '#d97706',
  },
  {
    id: 'tho',
    name: 'Thổ tinh',
    au: 9.54,
    km: 120536,
    periodYears: 29.46,
    group: 'ngoai',
    color: '#eab308',
  },
  {
    id: 'thien-vuong',
    name: 'Thiên Vương tinh',
    au: 19.2,
    km: 51118,
    periodYears: 84.01,
    group: 'ngoai',
    color: '#67e8f9',
  },
  {
    id: 'hai-vuong',
    name: 'Hải Vương tinh',
    au: 30.07,
    km: 49528,
    periodYears: 164.8,
    group: 'ngoai',
    color: '#6366f1',
  },
];

/** @param {string} id */
export function planet(id) {
  const p = PLANETS.find((x) => x.id === id);
  if (!p) throw new Error(`Không có hành tinh ${id}`);
  return p;
}

/**
 * A distance in AU written in millions of km.
 * @param {number} au
 */
export function millionKm(au) {
  return Math.round(au * AU_MILLION_KM * 100) / 100;
}

/**
 * How many times the diameter of `p` holds the Earth's, to two decimals.
 * @param {Planet} p
 */
export function diameterVsEarth(p) {
  return Math.round((p.km / EARTH_KM) * 100) / 100;
}

/**
 * Turns travelled around the Sun after `years`.
 * @param {Planet} p @param {number} years
 */
export function turnsAfter(p, years) {
  return years / p.periodYears;
}

/**
 * Angle (degrees) of a planet on its orbit after `years`, starting from a
 * fixed spread so the planets do not all line up.
 * @param {Planet} p @param {number} years
 */
export function orbitAngle(p, years) {
  const start = PLANETS.indexOf(p) * 47;
  return (((start + 360 * turnsAfter(p, years)) % 360) + 360) % 360;
}

/** Smallest and largest half-width of the orbit view, in AU. */
export const VIEW_MIN_AU = 1.7;
export const VIEW_MAX_AU = 32;

/**
 * Half-width of the orbit view, in AU, for a zoom slider position 0 to 100
 * (0 = closest, inner planets; 100 = whole system). Logarithmic, so each
 * step zooms by the same factor.
 * @param {number} zoom
 */
export function viewAu(zoom) {
  const t = Math.min(100, Math.max(0, zoom)) / 100;
  return VIEW_MIN_AU * Math.pow(VIEW_MAX_AU / VIEW_MIN_AU, t);
}

/**
 * Planets whose orbits fit in a view of half-width `au`.
 * @param {number} au
 */
export function planetsInView(au) {
  return PLANETS.filter((p) => p.au <= au);
}
