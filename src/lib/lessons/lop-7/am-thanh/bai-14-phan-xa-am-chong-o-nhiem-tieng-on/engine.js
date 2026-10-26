/**
 * Echoes and noise. A clap travels to a wall and back: the reflected sound
 * reaches the ear 2d/v after the direct sound. The ear hears it as a separate
 * echo (tiếng vang) only when that delay is at least 1/15 s, and only when
 * the wall reflects sound well. The noise model adds up the effect of
 * anti-noise measures on the sound level at a house next to a road.
 */

/** Speed of sound in air, m/s. */
export const SPEED = 340;
/** Shortest delay after the direct sound at which an echo is heard apart. */
export const ECHO_MIN = 1 / 15;

/**
 * @typedef {{ id: string, name: string, reflect: number, good: boolean, why: string }} Material
 * `reflect` is the share of the sound energy sent back (illustrative).
 */

/** @type {Material[]} */
export const MATERIALS = [
  {
    id: 'kinh',
    name: 'Kính',
    reflect: 0.95,
    good: true,
    why: 'cứng, bề mặt nhẵn',
  },
  {
    id: 'da-hoa',
    name: 'Đá hoa',
    reflect: 0.9,
    good: true,
    why: 'cứng, bề mặt nhẵn',
  },
  {
    id: 'rem',
    name: 'Rèm nhung',
    reflect: 0.25,
    good: false,
    why: 'mềm, bề mặt gồ ghề',
  },
  {
    id: 'xop',
    name: 'Tấm xốp',
    reflect: 0.1,
    good: false,
    why: 'mềm, xốp',
  },
];

/**
 * @param {string} id
 * @returns {Material}
 */
export function materialById(id) {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
}

/**
 * Time between the direct sound and the sound reflected by a wall `d` metres
 * away (the sound goes there and back).
 * @param {number} d
 */
export function echoDelay(d) {
  return (2 * d) / SPEED;
}

/** Shortest distance to a wall for an echo to be heard apart, in metres. */
export function minEchoDistance() {
  return (SPEED * ECHO_MIN) / 2;
}

/**
 * What the listener hears: a clear echo, an echo too faint to notice, or a
 * reflection that merges with the direct sound and only makes it louder and
 * longer.
 * @param {number} d
 * @param {Material} material
 * @returns {'echo' | 'faint' | 'merged'}
 */
export function hearing(d, material) {
  if (!material.good) return 'faint';
  return echoDelay(d) >= ECHO_MIN ? 'echo' : 'merged';
}

/**
 * @typedef {{ id: string, name: string, how: string, change: number }} Measure
 * `change` is the illustrative change of the level at the house, in dB.
 */

/** Level at the house beside the road with no measure taken, dB. */
export const BASE_LEVEL = 80;
/** A level at or below this is quiet enough to study and rest. */
export const QUIET_LEVEL = 55;

/** @type {Measure[]} */
export const MEASURES = [
  {
    id: 'coi',
    name: 'Đặt biển cấm bóp còi, hạn chế xe tải chạy qua',
    how: 'giảm độ to của nguồn âm',
    change: -8,
  },
  {
    id: 'cay',
    name: 'Trồng hàng cây xanh giữa đường và nhà',
    how: 'phân tán âm trên đường truyền',
    change: -5,
  },
  {
    id: 'tuong',
    name: 'Xây tường chắn âm dọc đường',
    how: 'ngăn chặn đường truyền âm',
    change: -10,
  },
  {
    id: 'cua',
    name: 'Lắp cửa kính hai lớp, treo rèm dày',
    how: 'ngăn chặn và hấp thụ âm truyền vào phòng',
    change: -10,
  },
  {
    id: 'san',
    name: 'Lát toàn bộ sân trước nhà bằng đá hoa nhẵn',
    how: 'mặt cứng, nhẵn phản xạ âm tốt, hắt thêm tiếng ồn vào nhà',
    change: 2,
  },
];

/**
 * Level at the house after the chosen measures, in dB.
 * @param {Iterable<string>} chosen measure ids
 */
export function noiseLevel(chosen) {
  const ids = new Set(chosen);
  return MEASURES.reduce((n, m) => (ids.has(m.id) ? n + m.change : n), BASE_LEVEL);
}
