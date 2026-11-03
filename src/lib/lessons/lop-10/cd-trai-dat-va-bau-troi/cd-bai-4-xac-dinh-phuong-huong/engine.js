/**
 * The northern sky of the lesson: real star positions (J2000), turned by the
 * hour and month, seen by an observer at a chosen latitude who faces north.
 */

const RAD = Math.PI / 180;

/**
 * @typedef {{ id: string, name: string, ra: number, dec: number, mag: number, candidate?: boolean }} Star
 * `ra` in hours, `dec` in degrees, `mag` is the apparent brightness.
 */

/** @type {Star[]} */
export const STARS = [
  { id: 'polaris', name: 'Sao Bắc Cực', ra: 2.53, dec: 89.26, mag: 2, candidate: true },
  { id: 'yildun', name: 'δ Gấu Bé', ra: 17.537, dec: 86.59, mag: 4.4 },
  { id: 'eps-umi', name: 'ε Gấu Bé', ra: 16.766, dec: 82.04, mag: 4.2 },
  { id: 'zeta-umi', name: 'ζ Gấu Bé', ra: 15.734, dec: 77.79, mag: 4.3 },
  { id: 'eta-umi', name: 'η Gấu Bé', ra: 16.292, dec: 75.75, mag: 5 },
  { id: 'kochab', name: 'Kochab (β Gấu Bé)', ra: 14.845, dec: 74.16, mag: 2.1, candidate: true },
  { id: 'pherkad', name: 'γ Gấu Bé', ra: 15.345, dec: 71.83, mag: 3 },
  { id: 'dubhe', name: 'α Gấu Lớn', ra: 11.062, dec: 61.75, mag: 1.8, candidate: true },
  { id: 'merak', name: 'β Gấu Lớn', ra: 11.031, dec: 56.38, mag: 2.3 },
  { id: 'phecda', name: 'γ Gấu Lớn', ra: 11.897, dec: 53.69, mag: 2.4 },
  { id: 'megrez', name: 'δ Gấu Lớn', ra: 12.257, dec: 57.03, mag: 3.3 },
  { id: 'alioth', name: 'ε Gấu Lớn', ra: 12.9, dec: 55.96, mag: 1.8 },
  { id: 'mizar', name: 'ζ Gấu Lớn', ra: 13.399, dec: 54.93, mag: 2.2 },
  { id: 'alkaid', name: 'η Gấu Lớn', ra: 13.792, dec: 49.31, mag: 1.9 },
  { id: 'caph', name: 'β Thiên Hậu', ra: 0.153, dec: 59.15, mag: 2.3 },
  { id: 'schedar', name: 'α Thiên Hậu', ra: 0.675, dec: 56.54, mag: 2.2, candidate: true },
  { id: 'navi', name: 'γ Thiên Hậu', ra: 0.945, dec: 60.72, mag: 2.4 },
  { id: 'ruchbah', name: 'δ Thiên Hậu', ra: 1.43, dec: 60.24, mag: 2.7 },
  { id: 'segin', name: 'ε Thiên Hậu', ra: 1.907, dec: 63.67, mag: 3.4 },
  { id: 'deneb', name: 'Deneb (α Thiên Nga)', ra: 20.69, dec: 45.28, mag: 1.3, candidate: true },
  { id: 'sadr', name: 'γ Thiên Nga', ra: 20.37, dec: 40.26, mag: 2.2 },
  { id: 'delta-cyg', name: 'δ Thiên Nga', ra: 19.75, dec: 45.13, mag: 2.9 },
  { id: 'gienah', name: 'ε Thiên Nga', ra: 20.77, dec: 33.97, mag: 2.5 },
  { id: 'albireo', name: 'β Thiên Nga', ra: 19.512, dec: 27.96, mag: 3.1 },
  { id: 'capella', name: 'Capella', ra: 5.278, dec: 46, mag: 0.1, candidate: true },
  { id: 'vega', name: 'Vega', ra: 18.616, dec: 38.78, mag: 0, candidate: true },
];

/** @type {Record<string, Star>} */
const BY_ID = Object.fromEntries(STARS.map((s) => [s.id, s]));

/** The stick figure of each constellation, as pairs of star ids. */
export const FIGURES = [
  {
    id: 'gau-lon',
    name: 'Gấu Lớn',
    lines: [
      ['dubhe', 'merak'],
      ['merak', 'phecda'],
      ['phecda', 'megrez'],
      ['megrez', 'dubhe'],
      ['megrez', 'alioth'],
      ['alioth', 'mizar'],
      ['mizar', 'alkaid'],
    ],
  },
  {
    id: 'gau-be',
    name: 'Gấu Bé',
    lines: [
      ['polaris', 'yildun'],
      ['yildun', 'eps-umi'],
      ['eps-umi', 'zeta-umi'],
      ['zeta-umi', 'eta-umi'],
      ['eta-umi', 'pherkad'],
      ['pherkad', 'kochab'],
      ['kochab', 'zeta-umi'],
    ],
  },
  {
    id: 'thien-hau',
    name: 'Thiên Hậu',
    lines: [
      ['caph', 'schedar'],
      ['schedar', 'navi'],
      ['navi', 'ruchbah'],
      ['ruchbah', 'segin'],
    ],
  },
  {
    id: 'thien-nga',
    name: 'Thiên Nga',
    lines: [
      ['deneb', 'sadr'],
      ['sadr', 'albireo'],
      ['delta-cyg', 'sadr'],
      ['sadr', 'gienah'],
    ],
  },
];

/**
 * The three ways of the lesson to find Polaris. A guide runs from `from`
 * through `through`; its ticks are multiples of the length of `unit`.
 * `times` is the multiple the book gives.
 */
export const GUIDES = [
  {
    id: 'gau-lon',
    label: 'Gấu Lớn',
    from: 'merak',
    through: 'dubhe',
    unit: ['merak', 'dubhe'],
    times: 5,
    text: 'Từ $\\beta$ qua $\\alpha$ của Gấu Lớn, kéo dài thêm khoảng $5$ lần đoạn $\\alpha\\beta$.',
  },
  {
    id: 'thien-hau',
    label: 'Thiên Hậu',
    from: 'mid-navi-ruchbah',
    through: 'polaris',
    unit: ['navi', 'ruchbah'],
    times: 7,
    text: 'Từ trung điểm đoạn $\\gamma\\delta$ của Thiên Hậu, đi vuông góc với đoạn này một đoạn cỡ $7$ lần $\\gamma\\delta$.',
  },
  {
    id: 'thien-nga',
    label: 'Thiên Nga',
    from: 'gienah',
    through: 'deneb',
    unit: ['gienah', 'deneb'],
    times: 4,
    text: 'Từ cánh $\\varepsilon$ qua đuôi Deneb của Thiên Nga, kéo dài thêm khoảng $4$ lần đoạn nối hai sao đó.',
  },
];

/**
 * Unit vector of a sky position.
 * @param {number} ra hours @param {number} dec degrees
 */
function unitOf(ra, dec) {
  const a = ra * 15 * RAD;
  const d = dec * RAD;
  return { x: Math.cos(d) * Math.cos(a), y: Math.cos(d) * Math.sin(a), z: Math.sin(d) };
}

/** @param {{ x: number, y: number, z: number }} v */
function raDecOf(v) {
  const n = Math.hypot(v.x, v.y, v.z);
  return {
    ra: (((Math.atan2(v.y, v.x) / RAD / 15) % 24) + 24) % 24,
    dec: Math.asin(v.z / n) / RAD,
  };
}

/**
 * Angle between two sky positions, in degrees.
 * @param {{ ra: number, dec: number }} a @param {{ ra: number, dec: number }} b
 */
export function separation(a, b) {
  const u = unitOf(a.ra, a.dec);
  const v = unitOf(b.ra, b.dec);
  const dot = u.x * v.x + u.y * v.y + u.z * v.z;
  return Math.acos(Math.min(1, Math.max(-1, dot))) / RAD;
}

/** @param {string} id */
function pointOf(id) {
  if (id === 'mid-navi-ruchbah') {
    const u = unitOf(BY_ID.navi.ra, BY_ID.navi.dec);
    const v = unitOf(BY_ID.ruchbah.ra, BY_ID.ruchbah.dec);
    return raDecOf({ x: u.x + v.x, y: u.y + v.y, z: u.z + v.z });
  }
  return BY_ID[id];
}

/**
 * Length of a guide's unit, and how many units its start lies from Polaris.
 * @param {typeof GUIDES[number]} guide
 */
export function guideMeasure(guide) {
  const unit = separation(BY_ID[guide.unit[0]], BY_ID[guide.unit[1]]);
  // The book counts the Dipper and the Swan from the second star of the pair.
  const start = guide.id === 'thien-hau' ? pointOf(guide.from) : pointOf(guide.through);
  return { unit, units: separation(start, BY_ID.polaris) / unit };
}

/**
 * Sky positions along a guide: from its start, past Polaris, sampled along the
 * great circle, with the multiples of the unit marked.
 * @param {typeof GUIDES[number]} guide
 */
export function guidePath(guide) {
  const start = pointOf(guide.from);
  const end = BY_ID.polaris;
  const span = separation(start, end);
  const u = unitOf(start.ra, start.dec);
  const v = unitOf(end.ra, end.dec);
  const sinSpan = Math.sin(span * RAD);
  /** @param {number} deg */
  const at = (deg) => {
    const p = Math.sin((span - deg) * RAD) / sinSpan;
    const q = Math.sin(deg * RAD) / sinSpan;
    return raDecOf({ x: p * u.x + q * v.x, y: p * u.y + q * v.y, z: p * u.z + q * v.z });
  };
  const steps = 24;
  const line = Array.from({ length: steps + 1 }, (_, i) => at((span * i) / steps));
  const { unit } = guideMeasure(guide);
  const offset = guide.id === 'thien-hau' ? 0 : separation(start, pointOf(guide.through));
  /** @type {Array<{ ra: number, dec: number }>} */
  const ticks = [];
  for (let k = 1; offset + k * unit < span; k += 1) ticks.push(at(offset + k * unit));
  return { line, ticks };
}

/**
 * Local sidereal time in hours for a night hour in the middle of a month. The
 * sky comes back about 4 minutes earlier each night, so 2 hours a month.
 * @param {number} month 1 to 12 @param {number} hour local solar time, 0 to 24
 */
export function siderealHours(month, hour) {
  const day = (month - 1) * 30.44 + 15;
  return (((6.65 + (24 * day) / 365.25 + hour) % 24) + 24) % 24;
}

/**
 * Altitude and azimuth (from north towards east) of a sky position, in degrees.
 * @param {{ ra: number, dec: number }} star
 * @param {number} lat degrees north @param {number} lst sidereal time, hours
 */
export function horizontal(star, lat, lst) {
  const h = (lst - star.ra) * 15 * RAD;
  const d = star.dec * RAD;
  const f = lat * RAD;
  const alt = Math.asin(Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(h));
  const az = Math.atan2(
    -Math.cos(d) * Math.sin(h),
    Math.sin(d) * Math.cos(f) - Math.cos(d) * Math.cos(h) * Math.sin(f),
  );
  return { alt: alt / RAD, az: az / RAD };
}

/**
 * Stereographic view for someone facing north with the eyes raised to `center`
 * degrees: x grows to the east (their right hand), y grows upward.
 * @param {number} alt @param {number} az @param {number} center
 */
export function project(alt, az, center) {
  const a = alt * RAD;
  const z = az * RAD;
  const c = center * RAD;
  const d = 1 + Math.sin(c) * Math.sin(a) + Math.cos(c) * Math.cos(a) * Math.cos(z);
  return {
    x: (2 * Math.cos(a) * Math.sin(z)) / d,
    y: (2 * (Math.cos(c) * Math.sin(a) - Math.sin(c) * Math.cos(a) * Math.cos(z))) / d,
  };
}

/** @param {string} id */
export function starById(id) {
  return BY_ID[id];
}

/**
 * What the learner hears after tapping a bright star while looking for Polaris.
 * @param {string} id
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeStar(id) {
  /** @type {Record<string, string>} */
  const why = {
    kochab: 'Đó là Kochab, ở phần gàu của Gấu Bé. Sao Bắc Cực nằm ở đầu cán gáo, xa phần gàu nhất.',
    dubhe: 'Đó là sao $\\alpha$ của Gấu Lớn, sao chỉ đường chứ chưa phải đích. Hãy đi tiếp từ nó.',
    schedar:
      'Đó là sao $\\alpha$ của Thiên Hậu. Sao này quay rõ rệt quanh một điểm khi giờ thay đổi.',
    deneb: 'Đó là Deneb, đuôi của Thiên Nga. Kéo giờ để thấy nó dịch chuyển nhiều trên trời.',
    capella: 'Capella rất sáng, nhưng sao sáng nhất không phải Sao Bắc Cực.',
    vega: 'Vega rất sáng, nhưng sao sáng nhất không phải Sao Bắc Cực.',
  };
  if (id === 'polaris') {
    return {
      ok: true,
      text: 'Đúng, đây là Sao Bắc Cực. Kéo giờ để thấy mọi sao quay quanh nó còn nó gần như đứng yên.',
    };
  }
  return { ok: false, text: why[id] ?? 'Chưa đúng. Hãy dùng đường dẫn để tìm lại.' };
}

/** @type {Array<{ prompt: string, answer: string, why: string }>} */
export const FACING = [
  {
    prompt: 'Em quay mặt về phía Sao Bắc Cực. Tay phải của em chỉ hướng nào?',
    answer: 'Đông',
    why: 'Mặt hướng Bắc thì tay phải chỉ hướng Đông.',
  },
  {
    prompt: 'Em quay mặt về phía Sao Bắc Cực. Sau lưng em là hướng nào?',
    answer: 'Nam',
    why: 'Bắc và Nam ngược nhau, nên sau lưng là hướng Nam.',
  },
  {
    prompt: 'Em quay mặt về phía Sao Bắc Cực. Tay trái của em chỉ hướng nào?',
    answer: 'Tây',
    why: 'Mặt hướng Bắc thì tay trái chỉ hướng Tây.',
  },
  {
    prompt: 'Em đi lên phía Sao Bắc Cực rồi rẽ phải. Em đang đi về hướng nào?',
    answer: 'Đông',
    why: 'Đang đi về hướng Bắc, rẽ phải thì sang hướng Đông.',
  },
  {
    prompt: 'Sao Bắc Cực ở sau lưng em. Trước mặt em là hướng nào?',
    answer: 'Nam',
    why: 'Sao Bắc Cực ở hướng Bắc, nên trước mặt là hướng Nam.',
  },
];

export const DIRECTIONS = ['Bắc', 'Đông', 'Nam', 'Tây'];
