/**
 * A route on a grid map, one cell per kilometre: x grows to the East and y to
 * the North. The route is a list of grid points, walked along straight legs.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { clamp } from '#lib/core/visuals/svg-math.js';

/** @typedef {{ x: number, y: number }} GridPoint */

export const MAP = /** @type {const} */ ({ xMin: -6, xMax: 6, yMin: -4, yMax: 4 });

/** The arrow-key and compass-pad steps, one kilometre each. */
export const STEPS = /** @type {const} */ ({
  bac: { x: 0, y: 1, label: 'Bắc' },
  nam: { x: 0, y: -1, label: 'Nam' },
  dong: { x: 1, y: 0, label: 'Đông' },
  tay: { x: -1, y: 0, label: 'Tây' },
});

/**
 * The nearest grid point on the map to any map position.
 * @param {number} x @param {number} y
 * @returns {GridPoint}
 */
export function snapToMap(x, y) {
  return {
    x: clamp(Math.round(x), MAP.xMin, MAP.xMax),
    y: clamp(Math.round(y), MAP.yMin, MAP.yMax),
  };
}

/**
 * The route with one more leg, unchanged when that leg goes nowhere.
 * @param {GridPoint[]} route
 * @param {GridPoint} point
 * @returns {GridPoint[]}
 */
export function addLeg(route, point) {
  const last = route.at(-1);
  if (last && last.x === point.x && last.y === point.y) return route;
  return [...route, point];
}

/**
 * The route with one more one-kilometre leg in a compass direction.
 * @param {GridPoint[]} route
 * @param {{ x: number, y: number }} step
 * @returns {GridPoint[]}
 */
export function walk(route, step) {
  const last = route.at(-1) ?? { x: 0, y: 0 };
  return addLeg(route, snapToMap(last.x + step.x, last.y + step.y));
}

/**
 * Quãng đường đi được: the sum of every leg's length.
 * @param {GridPoint[]} route
 */
export function pathLength(route) {
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    total += Math.hypot(route[i].x - route[i - 1].x, route[i].y - route[i - 1].y);
  }
  return tidy(total);
}

/**
 * Độ dịch chuyển: from the start of the route to its end, whatever lies between.
 * @param {GridPoint[]} route
 */
export function displacement(route) {
  const first = route[0] ?? { x: 0, y: 0 };
  const last = route.at(-1) ?? first;
  const x = last.x - first.x;
  const y = last.y - first.y;
  return { x, y, size: tidy(Math.hypot(x, y)) };
}

/**
 * The compass direction of a displacement as rich text: 'Đông', 'Tây – Nam',
 * with its angle from the East-West line when it lies between two directions.
 * @param {number} x @param {number} y
 */
export function directionText(x, y) {
  if (x === 0 && y === 0) return 'không có hướng, vì vị trí đầu và cuối trùng nhau';
  const eastWest = x > 0 ? 'Đông' : 'Tây';
  const northSouth = y > 0 ? 'Bắc' : 'Nam';
  if (y === 0) return `hướng ${eastWest}`;
  if (x === 0) return `hướng ${northSouth}`;
  const angle = (Math.atan2(Math.abs(y), Math.abs(x)) * 180) / Math.PI;
  return `hướng ${eastWest} – ${northSouth}, lệch $${numTex(angle, 1)}^\\circ$ so với hướng ${eastWest}`;
}

/**
 * A length as a TeX relation: '= 5' when exact, '\approx 5{,}39' otherwise.
 * @param {number} value
 */
export function lengthRelation(value) {
  return tidy(value, 2) === tidy(value) ? `= ${numTex(value, 2)}` : `\\approx ${numTex(value, 2)}`;
}

/**
 * The tasks of the widget. Each asks for a route with a given path length and
 * displacement size.
 * @type {Array<{ id: string, label: string, ask: string, s: number, d: number, done: string }>}
 */
export const MISSIONS = [
  {
    id: 've-cho-cu',
    label: 'Về chỗ cũ',
    ask: 'Vẽ lộ trình có $s = 8$ km nhưng $d = 0$.',
    s: 8,
    d: 0,
    done: 'Đúng: xe đi $8$ km rồi về chỗ cũ, nên độ dịch chuyển bằng $0$.',
  },
  {
    id: 'o-to',
    label: 'Đi vòng',
    ask: 'Vẽ lộ trình có $s = 13$ km và $d = 5$ km, ví dụ đi $6$ km về Tây, $4$ km về Nam, $3$ km về Đông.',
    s: 13,
    d: 5,
    done: 'Đúng: đi vòng $13$ km mà vị trí cuối chỉ cách vị trí đầu $5$ km.',
  },
  {
    id: 'di-thang',
    label: 'Đi thẳng',
    ask: 'Vẽ lộ trình có $s = d = 6$ km.',
    s: 6,
    d: 6,
    done: 'Đúng: đi thẳng, không đổi chiều thì độ lớn độ dịch chuyển bằng quãng đường.',
  },
];

/**
 * Whether a route meets a task.
 * @param {GridPoint[]} route
 * @param {{ s: number, d: number }} mission
 */
export function meets(route, mission) {
  return (
    Math.abs(pathLength(route) - mission.s) < 1e-6 &&
    Math.abs(displacement(route).size - mission.d) < 1e-6
  );
}

/**
 * What the current route shows about displacement and path length.
 * @param {GridPoint[]} route
 * @returns {string}
 */
export function compareNote(route) {
  const s = pathLength(route);
  const d = displacement(route).size;
  if (s === 0) return 'Chạm vào một điểm trên bản đồ hoặc dùng các nút hướng để bắt đầu lộ trình.';
  if (d === 0) {
    return `Xe đã về vị trí đầu: $d = 0$ dù đã đi $s ${lengthRelation(s)}$ km.`;
  }
  if (Math.abs(s - d) < 1e-6) {
    return 'Lộ trình thẳng, không đổi chiều: độ lớn độ dịch chuyển bằng quãng đường, $d = s$.';
  }
  return `Lộ trình có đổi hướng nên $d < s$: mũi tên đỏ chỉ nối vị trí đầu với vị trí cuối.`;
}
