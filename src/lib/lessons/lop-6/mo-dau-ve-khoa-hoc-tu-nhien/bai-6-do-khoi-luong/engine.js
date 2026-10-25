/**
 * The virtual scales. Masses are in grams. A scale has a range (giới hạn đo,
 * GHĐ) and a smallest division (độ chia nhỏ nhất, ĐCNN). Before anything is put
 * on the pan the scale may not read 0: the dial scale's needle is off by a
 * few divisions and the electronic balance still counts the weighing paper.
 * `zero` is what the scale shows with an empty pan; the learner turns the
 * adjusting screw (dial) or presses the zero key (electronic) to make it 0.
 */

/** @typedef {'dong-ho' | 'dien-tu'} ScaleId */
/** @typedef {{ id: ScaleId, name: string, range: number, division: number, startZero: number }} Scale */
/** @typedef {{ id: string, name: string, mass: number }} Thing */

/** @type {Scale[]} */
export const SCALES = [
  {
    id: 'dong-ho',
    name: 'Cân đồng hồ: GHĐ 5 kg, ĐCNN 20 g',
    range: 5000,
    division: 20,
    startZero: 60,
  },
  {
    id: 'dien-tu',
    name: 'Cân điện tử: GHĐ 500 g, ĐCNN 0,1 g',
    range: 500,
    division: 0.1,
    startZero: 1.2,
  },
];

/** @type {Thing[]} */
export const THINGS = [
  { id: 'ghim', name: 'Hộp ghim', mass: 23.8 },
  { id: 'tao', name: 'Quả táo', mass: 186.4 },
  { id: 'duong', name: 'Túi đường', mass: 1000 },
  { id: 'dua', name: 'Quả dưa hấu', mass: 2463.5 },
];

/** Adjusting-screw step of the dial scale, in grams. */
export const SCREW_STEP = 20;

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * Round a mass to the nearest division of a scale.
 * @param {number} mass @param {number} division
 */
export function toDivision(mass, division) {
  return tidy(Math.round(tidy(mass / division)) * division);
}

/**
 * Whether a scale suits a mass: it must weigh it (GHĐ at least the mass) and
 * have the finest division among the scales that can.
 * @param {Scale} scale @param {number} mass @param {Scale[]} [all]
 * @returns {'qua-tai' | 'tho' | 'phu-hop'}
 */
export function suitability(scale, mass, all = SCALES) {
  if (scale.range < mass) return 'qua-tai';
  const finest = Math.min(...all.filter((s) => s.range >= mass).map((s) => s.division));
  return scale.division > finest ? 'tho' : 'phu-hop';
}

/**
 * What the scale shows: the mass on the pan plus the empty-pan reading.
 * Null when the load is beyond the range (the dial needle hits its stop, the
 * electronic balance shows an overload sign).
 * @param {Scale} scale @param {number} load mass on the pan @param {number} zero
 * @returns {number | null}
 */
export function shown(scale, load, zero) {
  const value = tidy(load + zero);
  return value > scale.range ? null : value;
}

/**
 * The empty-pan reading after turning the dial scale's screw by `turns` steps
 * (positive turns the needle forward). The screw only moves the needle when
 * the pan is empty.
 * @param {number} zero @param {number} turns
 */
export function turnScrew(zero, turns) {
  return tidy(Math.max(-200, Math.min(200, zero + turns * SCREW_STEP)));
}

/**
 * Zero key of the electronic balance: whatever is on the pan now reads 0.
 * @param {number} zero @param {number} load
 */
export function pressZero(zero, load) {
  return tidy(zero - (load + zero));
}

/** @typedef {'chua-dat' | 'qua-tai' | 'chua-chinh-0' | 'sai-so' | 'tho' | 'dung'} Verdict */

/**
 * Judge a recorded result (grams) in the order of the textbook steps.
 * @param {{ thing: Thing, scale: Scale, zero: number, placed: boolean, typed: number }} m
 * @returns {Verdict}
 */
export function judge({ thing, scale, zero, placed, typed }) {
  if (!placed) return 'chua-dat';
  const fit = suitability(scale, thing.mass);
  if (fit === 'qua-tai') return 'qua-tai';
  if (zero !== 0) return 'chua-chinh-0';
  if (Math.abs(typed - toDivision(thing.mass, scale.division)) > 1e-9) return 'sai-so';
  return fit === 'tho' ? 'tho' : 'dung';
}
