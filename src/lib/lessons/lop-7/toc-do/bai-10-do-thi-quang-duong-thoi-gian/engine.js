/**
 * A distance–time (s–t) graph made of one-hour stages: `s[i]` is the distance
 * (km) covered after i hours, with s[0] = 0. On each stage the car keeps a
 * steady speed, so the graph is a straight piece whose steepness is the
 * speed; a flat piece means the car stands still.
 */

/** Length of one stage (h). */
export const STAGE = 1;

/** Number of stages on the graph. */
export const STAGES = 4;

/** Largest distance on the s axis (km). */
export const S_MAX = 240;

/** Snap step for dragged distances (km). */
export const S_STEP = 10;

/** Distances after 0, 1, 2, 3, 4 h when the widget opens (the book's car). */
export const START = [0, 60, 120, 180, 180];

/**
 * Speed (km/h) on each stage.
 * @param {number[]} s
 */
export function stageSpeeds(s) {
  return s.slice(1).map((v, i) => (v - s[i]) / STAGE);
}

/**
 * Distance covered at time `t` (h), read off the graph: straight between the
 * corners, held at the last value after the end.
 * @param {number[]} s @param {number} t
 */
export function distanceAt(s, t) {
  if (t <= 0) return s[0];
  const last = s.length - 1;
  if (t >= last * STAGE) return s[last];
  const i = Math.floor(t / STAGE);
  const f = t / STAGE - i;
  return s[i] + (s[i + 1] - s[i]) * f;
}

/**
 * Moves the end of stage `i` (1-based corner index) to distance `target`,
 * changing only that stage's speed: later corners shift by the same amount
 * so later stages keep their speeds. The stage cannot go backwards (distance
 * never decreases) and the last corner stays on the axis.
 * @param {number[]} s @param {number} i @param {number} target
 */
export function moveCorner(s, i, target) {
  const snapped = Math.round(target / S_STEP) * S_STEP;
  const room = S_MAX - s[s.length - 1];
  const delta = Math.min(Math.max(snapped - s[i], s[i - 1] - s[i]), room);
  return s.map((v, k) => (k >= i ? v + delta : v));
}

/**
 * A plain sentence for each stage: moving at a speed, or standing still.
 * @param {number[]} s
 */
export function describe(s) {
  return stageSpeeds(s).map((v, i) => {
    const span = `Từ ${i * STAGE} h đến ${(i + 1) * STAGE} h`;
    return v === 0 ? `${span}: xe đứng yên.` : `${span}: xe chạy ${v} km/h, đi thêm ${v} km.`;
  });
}

/**
 * @typedef {{ id: string, label: string, text: string, answer: number[] }} Challenge
 */

/** @type {Challenge[]} */
export const CHALLENGES = [
  {
    id: 'c1',
    label: 'Thử thách 1',
    text: 'Ô tô chạy đều 60 km/h trong 3 giờ đầu, sau đó dừng lại nghỉ 1 giờ.',
    answer: [0, 60, 120, 180, 180],
  },
  {
    id: 'c2',
    label: 'Thử thách 2',
    text: 'Xe chạy 40 km/h trong 2 giờ, nghỉ 1 giờ, rồi chạy tiếp 1 giờ với tốc độ 50 km/h.',
    answer: [0, 40, 80, 80, 130],
  },
  {
    id: 'c3',
    label: 'Thử thách 3',
    text: 'Xe chạy cả 4 giờ, tổng quãng đường 150 km. Tốc độ trong giờ đầu gấp đôi tốc độ (không đổi) trong 3 giờ sau.',
    answer: [0, 60, 90, 120, 150],
  },
];

/**
 * Whether the drawn graph matches a challenge, and the first stage that is off.
 * @param {number[]} s @param {Challenge} c
 */
export function checkChallenge(s, c) {
  const got = stageSpeeds(s);
  const want = stageSpeeds(c.answer);
  const wrong = got.findIndex((v, i) => v !== want[i]);
  return { ok: wrong === -1, wrong };
}
