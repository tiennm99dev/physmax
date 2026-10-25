/**
 * The virtual ruler. Every length is a whole number of millimetres so the
 * checks are exact. A ruler has a range (giới hạn đo, GHĐ) and a smallest
 * division (độ chia nhỏ nhất, ĐCNN). The learner picks a ruler, slides it so
 * its 0 mark meets one end of the object, looks at the other end from a
 * chosen direction and reads the nearest mark.
 */

/** @typedef {{ id: string, name: string, range: number, division: number }} Ruler range and division in mm */
/** @typedef {{ id: string, name: string, length: number }} Thing length in mm */
/** @typedef {'trai' | 'vuong-goc' | 'phai'} Eye */

/** @type {Ruler[]} */
export const RULERS = [
  { id: 'a', name: 'Thước A: GHĐ 10 cm, ĐCNN 1 mm', range: 100, division: 1 },
  { id: 'b', name: 'Thước B: GHĐ 20 cm, ĐCNN 1 mm', range: 200, division: 1 },
  { id: 'c', name: 'Thước C: GHĐ 30 cm, ĐCNN 0,5 cm', range: 300, division: 5 },
];

/** @type {Thing[]} */
export const THINGS = [
  { id: 'tay', name: 'Cục tẩy', length: 43 },
  { id: 'but-chi', name: 'Bút chì', length: 176 },
  { id: 'la', name: 'Chiếc lá', length: 95 },
  { id: 'vo', name: 'Quyển vở', length: 245 },
];

/**
 * How far the line of sight shifts the apparent end of the object along the
 * ruler when the eye looks from one side (the object stands above the scale).
 */
export const PARALLAX = 3;

/**
 * Whether a ruler suits a length: it must measure it in one go (GHĐ at least
 * the length) and have the finest division among the rulers that can.
 * @param {Ruler} ruler @param {number} length @param {Ruler[]} [all]
 * @returns {'ngan' | 'tho' | 'phu-hop'}
 */
export function suitability(ruler, length, all = RULERS) {
  if (ruler.range < length) return 'ngan';
  const finest = Math.min(...all.filter((r) => r.range >= length).map((r) => r.division));
  return ruler.division > finest ? 'tho' : 'phu-hop';
}

/**
 * The mark the eye lines up with the far end of the object, rounded to the
 * nearest division. `offset` is where the near end of the object sits on the
 * ruler (0 when it meets the 0 mark), in mm. Null when the far end is off the
 * ruler.
 * @param {Thing} thing @param {Ruler} ruler @param {number} offset @param {Eye} eye
 * @returns {number | null}
 */
export function readingAt(thing, ruler, offset, eye) {
  const shift = eye === 'trai' ? PARALLAX : eye === 'phai' ? -PARALLAX : 0;
  const end = offset + thing.length + shift;
  if (end < 0 || end > ruler.range) return null;
  return Math.round(end / ruler.division) * ruler.division;
}

/**
 * The correct measurement: the length rounded to the ruler's division.
 * @param {Thing} thing @param {Ruler} ruler
 */
export function correctReading(thing, ruler) {
  return Math.round(thing.length / ruler.division) * ruler.division;
}

/** @typedef {'ngan' | 'lech-0' | 'mat-lech' | 'sai-so' | 'dung' | 'tho'} Verdict */

/**
 * Judge a recorded result (in mm) against how the measurement was made, in
 * the order the textbook steps give.
 * @param {{ thing: Thing, ruler: Ruler, offset: number, eye: Eye, typed: number }} m
 * @returns {Verdict}
 */
export function judge({ thing, ruler, offset, eye, typed }) {
  const fit = suitability(ruler, thing.length);
  if (fit === 'ngan') return 'ngan';
  if (offset !== 0) return 'lech-0';
  if (eye !== 'vuong-goc') return 'mat-lech';
  if (Math.abs(typed - correctReading(thing, ruler)) > 1e-9) return 'sai-so';
  return fit === 'tho' ? 'tho' : 'dung';
}
