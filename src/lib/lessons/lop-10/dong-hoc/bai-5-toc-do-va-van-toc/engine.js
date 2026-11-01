/**
 * A boat on a straight river. Book notation: 1 is the boat, 2 the water and
 * 3 the bank, so v13 = v12 + v23 as vectors. Speeds are in m/s, the current
 * flows along +x (to the right) and the far bank lies along +y.
 */
import { tidy } from '#lib/core/number-format.js';

export const RIVER_WIDTH = 60;
export const RIVER_LENGTH = 140;

/**
 * A crossing with the bow held at right angles to the bank.
 * @param {number} boat speed relative to the water, above 0
 * @param {number} water speed of the current
 * @param {number} [width]
 */
export function crossing(boat, water, width = RIVER_WIDTH) {
  const time = tidy(width / boat);
  const speed = tidy(Math.hypot(boat, water));
  return {
    speed,
    time,
    drift: tidy(water * time),
    path: tidy(speed * time),
    // Angle between the track and the line straight across the river.
    angle: tidy((Math.atan2(water, boat) * 180) / Math.PI, 1),
  };
}

/**
 * The velocity relative to the bank when the bow points along the river,
 * signed so that + is with the current.
 * @param {number} boat
 * @param {number} water
 * @param {'xuoi' | 'nguoc'} direction
 */
export function along(boat, water, direction) {
  return direction === 'xuoi' ? tidy(boat + water) : tidy(water - boat);
}

/**
 * The boat's position in metres after `t` seconds on the chosen course.
 * @param {'ngang' | 'xuoi' | 'nguoc'} course
 * @param {number} boat @param {number} water @param {number} t
 * @returns {{ x: number, y: number }} from its starting point
 */
export function positionAt(course, boat, water, t) {
  if (course === 'ngang') return { x: water * t, y: boat * t };
  return { x: along(boat, water, course) * t, y: 0 };
}

/**
 * The starting point on the river drawing, in metres.
 * @param {'ngang' | 'xuoi' | 'nguoc'} course
 */
export function startOf(course) {
  if (course === 'ngang') return { x: 6, y: 0 };
  return { x: course === 'xuoi' ? 6 : 100, y: RIVER_WIDTH / 2 };
}

/**
 * How long a run lasts before the boat reaches the far bank or the edge of
 * the drawing, at most `limit` seconds.
 * @param {'ngang' | 'xuoi' | 'nguoc'} course
 * @param {number} boat @param {number} water @param {number} [limit]
 */
export function runTime(course, boat, water, limit = 30) {
  const start = startOf(course);
  const velocity = course === 'ngang' ? water : along(boat, water, course);
  const untilEdge =
    velocity > 0
      ? (RIVER_LENGTH - start.x) / velocity
      : velocity < 0
        ? start.x / -velocity
        : Infinity;
  const untilBank = course === 'ngang' ? RIVER_WIDTH / boat : Infinity;
  return Math.min(limit, untilEdge, untilBank);
}

/**
 * What the current settings teach, as rich text.
 * @param {'ngang' | 'xuoi' | 'nguoc'} course
 * @param {number} boat @param {number} water
 */
export function courseNote(course, boat, water) {
  if (course === 'ngang') {
    if (water === 0) {
      return 'Nước đứng yên: thuyền đi thẳng sang bờ bên kia, vận tốc so với bờ chính là vận tốc so với nước.';
    }
    return 'Dòng nước chỉ đẩy thuyền trôi theo dòng, không đổi thời gian qua sông: thời gian ấy chỉ phụ thuộc thành phần vận tốc vuông góc với bờ.';
  }
  if (course === 'xuoi')
    return 'Hai vận tốc cùng chiều nên độ lớn vận tốc tổng hợp bằng tổng hai độ lớn.';
  const v = along(boat, water, 'nguoc');
  if (v === 0)
    return 'Hai vận tốc ngược chiều và bằng nhau: thuyền chạy hết máy mà đứng yên so với bờ.';
  if (v > 0)
    return 'Dòng nước mạnh hơn thuyền: thuyền vẫn hướng mũi ngược dòng nhưng bị trôi lùi so với bờ.';
  return 'Hai vận tốc ngược chiều nên độ lớn vận tốc tổng hợp bằng hiệu hai độ lớn.';
}
