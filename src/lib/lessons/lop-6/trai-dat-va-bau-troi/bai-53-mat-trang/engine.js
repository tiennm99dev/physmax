/**
 * Phases of the Moon. The picture is seen from above the North Pole with the
 * Sun far to the left, so the half of the Moon facing left is always lit. The
 * Moon goes around the Earth counterclockwise in this picture.
 *
 * The phase angle `p` (degrees) is the Moon's position measured from new moon
 * (Moon between the Earth and the Sun, p = 0) in the direction it travels:
 * p = 90 first quarter, p = 180 full moon (Earth between), p = 270 last
 * quarter. One lunar cycle (tuần trăng) lasts about 29,5 days.
 *
 * Seen from the Earth, the lit fraction of the disc is (1 − cos p) / 2. For an
 * observer in the Northern Hemisphere, as in Việt Nam, the waxing Moon (first
 * half of the lunar month) is lit on the right and the waning Moon on the left.
 */

/** Length of one lunar cycle, in days. */
export const CYCLE_DAYS = 29.5;

/** @param {number} a */
export function wrap360(a) {
  return ((a % 360) + 360) % 360;
}

/**
 * Phase angle from the Moon's position angle in the picture (counterclockwise
 * from the right, the Sun lying at 180°).
 * @param {number} position
 */
export function phaseFromPosition(position) {
  return wrap360(position - 180);
}

/** @param {number} p */
export function positionFromPhase(p) {
  return wrap360(p + 180);
}

/**
 * Days since new moon.
 * @param {number} p
 */
export function ageDays(p) {
  return (wrap360(p) / 360) * CYCLE_DAYS;
}

/**
 * Phase angle after `days` days.
 * @param {number} days
 */
export function phaseAfter(days) {
  return wrap360((days / CYCLE_DAYS) * 360);
}

/**
 * The lunar calendar day (1 to 30), taking day 1 as the day of new moon.
 * @param {number} p
 */
export function lunarDay(p) {
  return Math.min(30, Math.floor(ageDays(p)) + 1);
}

/**
 * Lit fraction of the disc seen from the Earth, 0 (new) to 1 (full).
 * @param {number} p
 */
export function litFraction(p) {
  const f = (1 - Math.cos((wrap360(p) * Math.PI) / 180)) / 2;
  return Math.round(f * 1e9) / 1e9;
}

/**
 * @typedef {'khong-trang' | 'luoi-liem-dau' | 'ban-nguyet-dau' | 'khuyet-dau' | 'tron'
 *   | 'khuyet-cuoi' | 'ban-nguyet-cuoi' | 'luoi-liem-cuoi'} PhaseId
 */

/** @type {{ id: PhaseId, name: string, from: number, to: number }[]} */
export const PHASES = [
  { id: 'luoi-liem-dau', name: 'Trăng lưỡi liềm đầu tháng', from: 12, to: 80 },
  { id: 'ban-nguyet-dau', name: 'Trăng bán nguyệt đầu tháng', from: 80, to: 100 },
  { id: 'khuyet-dau', name: 'Trăng khuyết đầu tháng', from: 100, to: 168 },
  { id: 'tron', name: 'Trăng tròn', from: 168, to: 192 },
  { id: 'khuyet-cuoi', name: 'Trăng khuyết cuối tháng', from: 192, to: 260 },
  { id: 'ban-nguyet-cuoi', name: 'Trăng bán nguyệt cuối tháng', from: 260, to: 280 },
  { id: 'luoi-liem-cuoi', name: 'Trăng lưỡi liềm cuối tháng', from: 280, to: 348 },
];

const NEW_MOON = { id: /** @type {PhaseId} */ ('khong-trang'), name: 'Không trăng' };

/**
 * The phase seen from the Earth.
 * @param {number} p
 * @returns {{ id: PhaseId, name: string }}
 */
export function phaseOf(p) {
  const a = wrap360(p);
  const hit = PHASES.find((ph) => a >= ph.from && a < ph.to);
  return hit ? { id: hit.id, name: hit.name } : NEW_MOON;
}

/** @param {PhaseId} id */
export function phaseName(id) {
  return id === NEW_MOON.id ? NEW_MOON.name : (PHASES.find((ph) => ph.id === id)?.name ?? '');
}

/**
 * Phase angle at the middle of a named phase.
 * @param {PhaseId} id
 */
export function phaseCentre(id) {
  const ph = PHASES.find((x) => x.id === id);
  return ph ? (ph.from + ph.to) / 2 : 0;
}

/**
 * Whether the Moon is waxing (first half of the lunar month).
 * @param {number} p
 */
export function isWaxing(p) {
  const a = wrap360(p);
  return a > 0 && a < 180;
}

/** @param {number} v */
const r2 = (v) => Math.round(v * 100) / 100;

/**
 * SVG path of the lit part of the disc as seen from the Northern Hemisphere,
 * centred at (cx, cy) with radius r. Empty at new moon.
 * @param {number} cx @param {number} cy @param {number} r @param {number} p
 */
export function litPath(cx, cy, r, p) {
  const a = wrap360(p);
  if (litFraction(a) < 0.002) return '';
  const top = `${r2(cx)} ${r2(cy - r)}`;
  const bottom = `${r2(cx)} ${r2(cy + r)}`;
  if (litFraction(a) > 0.998) {
    return `M ${top} A ${r} ${r} 0 1 1 ${bottom} A ${r} ${r} 0 1 1 ${top} Z`;
  }
  const rx = r2(r * Math.abs(Math.cos((a * Math.PI) / 180)));
  if (a < 180) {
    // Lit on the right; the terminator bulges right for a crescent.
    const sweep = a < 90 ? 0 : 1;
    return `M ${top} A ${r} ${r} 0 0 1 ${bottom} A ${rx} ${r} 0 0 ${sweep} ${top} Z`;
  }
  // Waning: lit on the left; the terminator bulges left for a crescent.
  const sweep = a > 270 ? 1 : 0;
  return `M ${top} A ${r} ${r} 0 0 0 ${bottom} A ${rx} ${r} 0 0 ${sweep} ${top} Z`;
}
