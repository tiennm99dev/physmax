/**
 * One object weighed in three places. Its mass (kg) is the same everywhere, so
 * a beam balance always balances it with the same standard masses; its weight
 * (N), read on a spring balance, is the pull of the planet or moon it is on:
 * the weight of 1 kg there.
 */

/** @typedef {'trai-dat' | 'mat-trang' | 'sao-hoa'} PlaceId */
/** @typedef {{ id: PlaceId, name: string, perKg: number }} Place */
/** @typedef {'tang' | 'giam' | 'khong-doi'} Trend */

/** Weight of 1 kg in each place, in newtons. */
/** @type {Place[]} */
export const PLACES = [
  { id: 'trai-dat', name: 'Trái Đất', perKg: 9.8 },
  { id: 'mat-trang', name: 'Mặt Trăng', perKg: 1.6 },
  { id: 'sao-hoa', name: 'Sao Hỏa', perKg: 3.7 },
];

/** @type {Array<{ id: string, name: string, mass: number }>} */
export const THINGS = [
  { id: 'qua-dua', name: 'Quả dưa', mass: 0.5 },
  { id: 'tui-gao', name: 'Túi gạo', mass: 1 },
  { id: 'can-nuoc', name: 'Can nước', mass: 2 },
];

/** Range of the spring balance, in newtons. */
export const RANGE = 20;

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * @param {PlaceId} id
 * @returns {Place}
 */
export function place(id) {
  return PLACES.find((p) => p.id === id) ?? PLACES[0];
}

/**
 * Weight of `mass` kilograms in a place, in newtons.
 * @param {number} mass @param {PlaceId} where
 */
export function weightAt(mass, where) {
  return tidy(mass * place(where).perKg);
}

/**
 * How mass and weight change from Earth to `where`.
 * @param {PlaceId} where
 * @returns {{ mass: Trend, weight: Trend }}
 */
export function trendFromEarth(where) {
  const g = place(where).perKg;
  const earth = place('trai-dat').perKg;
  /** @type {Trend} */
  const weight = g === earth ? 'khong-doi' : g < earth ? 'giam' : 'tang';
  return { mass: 'khong-doi', weight };
}

/**
 * How many times lighter (in weight) the object is in `where` than on Earth.
 * @param {PlaceId} where
 */
export function timesLighter(where) {
  return tidy(place('trai-dat').perKg / place(where).perKg);
}
