/**
 * Charging by rubbing (nhiễm điện do cọ xát), counted in electrons. Each body
 * starts neutral: as many electrons (−) as positive charge (+) in its nuclei.
 * Rubbing a rod with a cloth moves electrons from the body that holds them
 * less tightly to the other; the totals are conserved. The order follows the
 * book's convention: a glass rod rubbed with silk turns positive, a plastic
 * rod rubbed with wool turns negative.
 */

/** @typedef {'nhua' | 'thuy-tinh'} RodId */
/** @typedef {'len' | 'lua'} ClothId */

/**
 * How readily a material gives up electrons when rubbed: the higher one loses
 * electrons to the lower one.
 * @type {Record<RodId | ClothId, number>}
 */
export const GIVE_RANK = { 'thuy-tinh': 3, len: 2, lua: 1, nhua: 0 };

/** @type {Record<RodId, string>} */
export const RODS = { nhua: 'Thước nhựa', 'thuy-tinh': 'Thanh thủy tinh' };

/** @type {Record<ClothId, string>} */
export const CLOTHS = { len: 'Mảnh len (dạ)', lua: 'Mảnh lụa' };

/** Electrons moved by one rub. */
export const PER_RUB = 2;

/** Most electrons a rod can gain or lose in the model. */
export const MAX_CHARGE = 12;

/** Paper bits on the table. */
export const PAPER_BITS = 6;

/**
 * Charge of the rod after `rubs` rubs, in units of the electron charge
 * (negative: extra electrons). The cloth carries the opposite charge.
 * @param {RodId} rod
 * @param {ClothId} cloth
 * @param {number} rubs
 */
export function rodCharge(rod, cloth, rubs) {
  const moved = Math.min(MAX_CHARGE, Math.max(0, Math.floor(rubs)) * PER_RUB);
  if (moved === 0) return 0;
  return GIVE_RANK[rod] > GIVE_RANK[cloth] ? moved : -moved;
}

/**
 * Sign word of a charge.
 * @param {number} q
 * @returns {'duong' | 'am' | 'trung-hoa'}
 */
export function chargeSign(q) {
  if (q > 0) return 'duong';
  if (q < 0) return 'am';
  return 'trung-hoa';
}

/**
 * Paper bits a rod with charge `q` lifts: none when neutral, more the more
 * it is charged.
 * @param {number} q
 */
export function bitsLifted(q) {
  return Math.min(PAPER_BITS, Math.floor(Math.abs(q) / 2));
}

/**
 * How two bodies hanging near each other move. A charged body attracts a
 * neutral light body; two charges of the same kind repel, of different kinds
 * attract.
 * @param {number} qa
 * @param {number} qb
 * @returns {'day' | 'hut' | 'khong'}
 */
export function interaction(qa, qb) {
  if (qa === 0 && qb === 0) return 'khong';
  if (qa === 0 || qb === 0) return 'hut';
  return Math.sign(qa) === Math.sign(qb) ? 'day' : 'hut';
}
