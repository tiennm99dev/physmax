/**
 * A test circuit: a battery, a lamp, a switch and a gap held by two clips,
 * where a sample of some material closes the loop. The lamp lights only when
 * there is a source, the switch is closed and the sample lets current through
 * (a conductor, vật dẫn điện). In a metal the charges that move are its free
 * electrons, which drift from the negative terminal round to the positive one.
 */

/** @typedef {{ id: string, label: string, conducts: boolean, note: string }} Material */

/** @type {Material[]} */
export const MATERIALS = [
  { id: 'dong', label: 'Dây đồng', conducts: true, note: 'kim loại, có nhiều electron tự do' },
  { id: 'nhom', label: 'Giấy nhôm', conducts: true, note: 'kim loại, có nhiều electron tự do' },
  { id: 'sat', label: 'Đinh sắt', conducts: true, note: 'kim loại, có nhiều electron tự do' },
  {
    id: 'than-chi',
    label: 'Ruột bút chì',
    conducts: true,
    note: 'than chì (graphite) dẫn điện, dù không phải kim loại',
  },
  { id: 'nhua', label: 'Thước nhựa', conducts: false, note: 'nhựa là vật cách điện' },
  { id: 'cao-su', label: 'Dây chun', conducts: false, note: 'cao su là vật cách điện' },
  { id: 'su', label: 'Mảnh sứ', conducts: false, note: 'sứ là vật cách điện' },
  {
    id: 'thuy-tinh',
    label: 'Thanh thủy tinh',
    conducts: false,
    note: 'thủy tinh là vật cách điện',
  },
  { id: 'go', label: 'Que gỗ khô', conducts: false, note: 'gỗ khô là vật cách điện' },
];

/**
 * @param {string} id
 * @returns {Material | undefined}
 */
export function material(id) {
  return MATERIALS.find((m) => m.id === id);
}

/**
 * @typedef {'khong-nguon' | 'cong-tac-mo' | 'ho' | 'cach-dien' | 'co-dong-dien'} CircuitReason
 */

/**
 * Whether current flows round the test circuit, and why not when it does
 * not. The first missing condition is reported.
 * @param {{ source: boolean, closed: boolean, sample: string | null }} setup
 *   `sample` is a material id, or null when the gap is left open
 * @returns {{ flowing: boolean, reason: CircuitReason }}
 */
export function circuitState({ source, closed, sample }) {
  if (!source) return { flowing: false, reason: 'khong-nguon' };
  if (!closed) return { flowing: false, reason: 'cong-tac-mo' };
  const m = sample === null ? undefined : material(sample);
  if (!m) return { flowing: false, reason: 'ho' };
  if (!m.conducts) return { flowing: false, reason: 'cach-dien' };
  return { flowing: true, reason: 'co-dong-dien' };
}

/**
 * Position on the loop of a point a fraction `t` of the way round, starting
 * at the battery's negative terminal (bottom left) and going the way the
 * electrons move: right along the bottom, up the right side, left along the
 * top and down to the positive terminal.
 * @param {number} t any number; only its fractional part counts
 * @param {{ left: number, right: number, top: number, bottom: number }} box
 */
export function loopPoint(t, { left, right, top, bottom }) {
  const w = right - left;
  const h = bottom - top;
  const total = 2 * (w + h);
  let d = (((t % 1) + 1) % 1) * total;
  if (d <= w) return { x: left + d, y: bottom };
  d -= w;
  if (d <= h) return { x: right, y: bottom - d };
  d -= h;
  if (d <= w) return { x: right - d, y: top };
  d -= w;
  return { x: left, y: top + d };
}
