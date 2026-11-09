/**
 * A small model city: each pollution source releases pollutants that reach
 * the air, the water or the soil. The widget turns sources on and shows
 * what ends up where; the challenges ask which sources release a pollutant.
 */

/** @typedef {'khong-khi' | 'nuoc' | 'dat'} MediumId */

/** @type {Array<{ id: MediumId, label: string }>} */
export const MEDIA = [
  { id: 'khong-khi', label: 'Không khí' },
  { id: 'nuoc', label: 'Nước' },
  { id: 'dat', label: 'Đất' },
];

/** @type {Record<string, { name: string, effect: string }>} */
export const POLLUTANTS = {
  co2: { name: 'CO₂', effect: 'Khí nhà kính chính, làm Trái Đất nóng lên.' },
  so2: { name: 'SO₂', effect: 'Gây mưa acid; kích thích đường hô hấp.' },
  nox: { name: 'NOₓ', effect: 'Gây mưa acid và khói mù quang hoá; hại phổi.' },
  bui: {
    name: 'Bụi mịn PM2,5',
    effect: 'Đi sâu vào phổi và máu, gây bệnh hô hấp, tim mạch.',
  },
  co: {
    name: 'CO',
    effect: 'Kết hợp với hemoglobin trong máu, cản trở vận chuyển oxygen, gây ngộ độc.',
  },
  'kim-loai': {
    name: 'Kim loại nặng (chì, thuỷ ngân, cadmium)',
    effect: 'Tích tụ trong cơ thể qua chuỗi thức ăn, hại hệ thần kinh, thận.',
  },
  'hoa-chat': {
    name: 'Thuốc bảo vệ thực vật, phân bón dư thừa',
    effect: 'Gây ngộ độc; làm nước phú dưỡng, tảo phát triển mạnh, cá chết.',
  },
  ch4: { name: 'CH₄', effect: 'Khí nhà kính mạnh, giữ nhiệt tốt hơn CO₂ nhiều lần.' },
  nhua: {
    name: 'Rác nhựa, vi nhựa',
    effect: 'Phân huỷ hàng trăm năm; vi nhựa đi vào chuỗi thức ăn.',
  },
  cfc: {
    name: 'CFC',
    effect: 'Phá huỷ tầng ozone; tia tử ngoại tăng gây ung thư da, đục thuỷ tinh thể.',
  },
  'phong-xa': {
    name: 'Chất phóng xạ',
    effect: 'Tia phóng xạ làm tổn thương tế bào, gây bệnh phóng xạ, ung thư.',
  },
};

/**
 * @typedef {object} Release
 * @property {string} pollutant key of `POLLUTANTS`
 * @property {MediumId[]} media where it ends up
 * @property {string} [via] how it gets to the water and soil
 */

/**
 * @typedef {object} Source
 * @property {string} id
 * @property {string} label
 * @property {string} color
 * @property {Release[]} releases
 */

const ACID_RAIN = 'qua mưa acid';

/** @type {Source[]} */
export const SOURCES = [
  {
    id: 'nhiet-dien',
    label: 'Nhà máy nhiệt điện than',
    color: '#475569',
    releases: [
      { pollutant: 'co2', media: ['khong-khi'] },
      { pollutant: 'so2', media: ['khong-khi', 'nuoc', 'dat'], via: ACID_RAIN },
      { pollutant: 'nox', media: ['khong-khi', 'nuoc', 'dat'], via: ACID_RAIN },
      { pollutant: 'bui', media: ['khong-khi'] },
      { pollutant: 'kim-loai', media: ['dat', 'nuoc'], via: 'từ bãi tro xỉ' },
    ],
  },
  {
    id: 'giao-thong',
    label: 'Xe máy, ô tô',
    color: '#dc2626',
    releases: [
      { pollutant: 'co2', media: ['khong-khi'] },
      { pollutant: 'co', media: ['khong-khi'] },
      { pollutant: 'nox', media: ['khong-khi', 'nuoc', 'dat'], via: ACID_RAIN },
      { pollutant: 'bui', media: ['khong-khi'] },
    ],
  },
  {
    id: 'khu-cong-nghiep',
    label: 'Khu công nghiệp xả nước thải',
    color: '#7c3aed',
    releases: [{ pollutant: 'kim-loai', media: ['nuoc', 'dat'] }],
  },
  {
    id: 'dong-ruong',
    label: 'Ruộng lúa phun thuốc, bón phân',
    color: '#65a30d',
    releases: [
      { pollutant: 'hoa-chat', media: ['dat', 'nuoc'] },
      { pollutant: 'ch4', media: ['khong-khi'] },
    ],
  },
  {
    id: 'bai-rac',
    label: 'Bãi rác',
    color: '#b45309',
    releases: [
      { pollutant: 'ch4', media: ['khong-khi'] },
      { pollutant: 'nhua', media: ['dat', 'nuoc'] },
      { pollutant: 'kim-loai', media: ['dat', 'nuoc'], via: 'theo nước rỉ rác' },
    ],
  },
  {
    id: 'thiet-bi-cu',
    label: 'Tủ lạnh, điều hoà cũ bị thải bỏ',
    color: '#0891b2',
    releases: [{ pollutant: 'cfc', media: ['khong-khi'] }],
  },
  {
    id: 'su-co-hat-nhan',
    label: 'Sự cố nhà máy điện hạt nhân',
    color: '#db2777',
    releases: [{ pollutant: 'phong-xa', media: ['khong-khi', 'nuoc', 'dat'] }],
  },
];

/**
 * What reaches each medium from the active sources: one row per pollutant,
 * with the sources that bring it there.
 * @param {string[]} active source ids
 * @returns {Record<MediumId, Array<{ pollutant: string, sources: string[], via: string[] }>>}
 */
export function byMedium(active) {
  /** @type {Record<MediumId, Array<{ pollutant: string, sources: string[], via: string[] }>>} */
  const out = { 'khong-khi': [], nuoc: [], dat: [] };
  for (const source of SOURCES) {
    if (!active.includes(source.id)) continue;
    for (const r of source.releases) {
      for (const m of r.media) {
        let row = out[m].find((x) => x.pollutant === r.pollutant);
        if (!row) {
          row = { pollutant: r.pollutant, sources: [], via: [] };
          out[m].push(row);
        }
        row.sources.push(source.id);
        if (r.via && m !== 'khong-khi' && !row.via.includes(r.via)) row.via.push(r.via);
      }
    }
  }
  return out;
}

/**
 * Ids of the sources that release any of `pollutants`, in `SOURCES` order.
 * @param {string[]} pollutants
 */
export function sourcesOf(pollutants) {
  return SOURCES.filter((s) => s.releases.some((r) => pollutants.includes(r.pollutant))).map(
    (s) => s.id,
  );
}

/** @type {Array<{ id: string, prompt: string, pollutants: string[] }>} */
export const CHALLENGES = [
  {
    id: 'mua-acid',
    prompt: 'Bật đúng những nguồn thải ra khí gây mưa acid (SO₂, NOₓ).',
    pollutants: ['so2', 'nox'],
  },
  {
    id: 'nha-kinh',
    prompt: 'Bật đúng những nguồn thải ra khí nhà kính CO₂ hoặc CH₄.',
    pollutants: ['co2', 'ch4'],
  },
  {
    id: 'kim-loai',
    prompt: 'Bật đúng những nguồn đưa kim loại nặng vào đất và nước.',
    pollutants: ['kim-loai'],
  },
  {
    id: 'ozone',
    prompt: 'Bật đúng những nguồn thải ra chất làm suy giảm tầng ozone.',
    pollutants: ['cfc'],
  },
  {
    id: 'bui',
    prompt: 'Bật đúng những nguồn thải ra bụi mịn PM2,5.',
    pollutants: ['bui'],
  },
];

/**
 * Compares the chosen sources with the right ones for a challenge.
 * @param {string[]} chosen
 * @param {{ pollutants: string[] }} challenge
 */
export function checkChallenge(chosen, challenge) {
  const right = sourcesOf(challenge.pollutants);
  const missing = right.filter((id) => !chosen.includes(id));
  const extra = chosen.filter((id) => !right.includes(id));
  return { ok: missing.length === 0 && extra.length === 0, missing, extra };
}

/** @param {string} id */
export function sourceLabel(id) {
  return SOURCES.find((s) => s.id === id)?.label ?? id;
}

/** Zones of the scene, in SVG units on a 360 × 200 board. */
export const ZONES = {
  'khong-khi': { x: 0, y: 4, w: 360, h: 72 },
  dat: { x: 0, y: 124, w: 240, h: 72 },
  nuoc: { x: 240, y: 124, w: 120, h: 72 },
};

/**
 * Fixed scattered spots for one source's dots in one zone, so the picture is
 * the same for every visitor.
 * @param {number} sourceIndex
 * @param {MediumId} medium
 * @param {number} [count]
 */
export function dotSpots(sourceIndex, medium, count = 4) {
  const z = ZONES[medium];
  const spots = [];
  let seed = (sourceIndex + 1) * 7919 + medium.length * 104729;
  for (let k = 0; k < count; k++) {
    seed = (seed * 48271) % 2147483647;
    const u = seed / 2147483647;
    seed = (seed * 48271) % 2147483647;
    const v = seed / 2147483647;
    spots.push({ x: z.x + 8 + u * (z.w - 16), y: z.y + 8 + v * (z.h - 16) });
  }
  return spots;
}
