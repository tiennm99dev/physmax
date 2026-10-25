/**
 * Drawing a force arrow on a squared grid to a given scale (tỉ xích). Points
 * are grid nodes `{ c, r }`: column to the right, row downwards, as on paper.
 * An arrow is right when its tail sits at the point of application (điểm đặt),
 * it lies along the force's line (phương), points the force's way (chiều) and
 * its length in squares times the scale equals the force's size (độ lớn).
 */

/** @typedef {{ c: number, r: number }} Node */
/**
 * @typedef {{
 *   id: string,
 *   text: string,
 *   object: { c: number, r: number, w: number, h: number, label: string },
 *   extra?: { c: number, r: number, w: number, h: number, label: string },
 *   at: Node,
 *   angle: 0 | 90 | 180 | 270,
 *   size: number,
 *   scale: number,
 * }} Task
 */

export const COLS = 16;
export const ROWS = 10;

/** Line and sense of each direction, with row numbers growing downwards. */
const UNIT = {
  0: { dc: 1, dr: 0 },
  90: { dc: 0, dr: -1 },
  180: { dc: -1, dr: 0 },
  270: { dc: 0, dr: 1 },
};

/** @type {Task[]} */
export const TASKS = [
  {
    id: 'keo-thung',
    text: 'Lực kéo thùng hàng có độ lớn 30 N, phương nằm ngang, chiều từ trái sang phải, điểm đặt tại A. Tỉ xích: 1 ô ứng với 10 N.',
    object: { c: 3, r: 4, w: 4, h: 3, label: 'Thùng hàng' },
    at: { c: 7, r: 5 },
    angle: 0,
    size: 30,
    scale: 10,
  },
  {
    id: 'nang-ta',
    text: 'Lực của tay nâng quả tạ có độ lớn 40 N, phương thẳng đứng, chiều từ dưới lên trên, điểm đặt tại A (giữa mặt dưới quả tạ). Tỉ xích: 1 ô ứng với 10 N.',
    object: { c: 6, r: 6, w: 4, h: 2, label: 'Quả tạ' },
    at: { c: 8, r: 8 },
    angle: 90,
    size: 40,
    scale: 10,
  },
  {
    id: 'day-xe',
    text: 'Lực đẩy xe có độ lớn 15 N, phương nằm ngang, chiều từ phải sang trái, điểm đặt tại A. Tỉ xích: 1 ô ứng với 5 N.',
    object: { c: 4, r: 3, w: 5, h: 3, label: 'Xe đẩy' },
    at: { c: 9, r: 4 },
    angle: 180,
    size: 15,
    scale: 5,
  },
  {
    id: 'nam-cham',
    text: 'Lực hút của nam châm đặt phía dưới lên viên bi sắt có độ lớn 2 N, phương thẳng đứng, chiều từ trên xuống dưới, điểm đặt tại A (tâm viên bi). Tỉ xích: 1 ô ứng với 0,5 N.',
    object: { c: 7, r: 1, w: 2, h: 2, label: 'Bi sắt' },
    extra: { c: 6, r: 8, w: 4, h: 2, label: 'Nam châm' },
    at: { c: 8, r: 2 },
    angle: 270,
    size: 2,
    scale: 0.5,
  },
];

/**
 * @typedef {{
 *   empty: boolean,
 *   point: boolean,
 *   line: boolean,
 *   sense: boolean,
 *   length: number,
 *   value: number,
 *   magnitude: boolean,
 *   correct: boolean,
 * }} Check
 */

/**
 * Check an arrow from `tail` to `tip` against a task.
 * @param {Task} task @param {Node} tail @param {Node} tip
 * @returns {Check}
 */
export function checkArrow(task, tail, tip) {
  const dc = tip.c - tail.c;
  const dr = tip.r - tail.r;
  const u = UNIT[task.angle];
  const length = Math.hypot(dc, dr);
  const value = Math.round(length * task.scale * 1e6) / 1e6;
  const empty = length === 0;
  const point = tail.c === task.at.c && tail.r === task.at.r;
  const line = !empty && dc * u.dr - dr * u.dc === 0;
  const sense = line && dc * u.dc + dr * u.dr > 0;
  const magnitude = !empty && Math.abs(value - task.size) < 1e-9;
  return {
    empty,
    point,
    line,
    sense,
    length,
    value,
    magnitude,
    correct: point && line && sense && magnitude,
  };
}

/**
 * The tip of the right arrow for a task.
 * @param {Task} task
 * @returns {Node}
 */
export function answerTip(task) {
  const u = UNIT[task.angle];
  const n = task.size / task.scale;
  return { c: task.at.c + u.dc * n, r: task.at.r + u.dr * n };
}

/**
 * Keep a node on the grid.
 * @param {Node} p
 * @returns {Node}
 */
export function clampNode(p) {
  return {
    c: Math.max(0, Math.min(COLS, Math.round(p.c))),
    r: Math.max(0, Math.min(ROWS, Math.round(p.r))),
  };
}
