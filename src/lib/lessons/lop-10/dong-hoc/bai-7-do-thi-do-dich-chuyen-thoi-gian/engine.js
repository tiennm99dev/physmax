/**
 * Displacement-time graphs: a graph is a list of points { t, d } sorted by
 * time, joined by straight lines. Time is in seconds, displacement in metres.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {{ t: number, d: number }} GraphPoint */

export const T_MAX = 12;
export const D_MIN = -10;
export const D_MAX = 30;
const STILL = 0.2; // below this speed, a hand-drawn line counts as standing still

/**
 * The graph's value at time `t`, flat beyond its ends.
 * @param {GraphPoint[]} points
 * @param {number} t
 */
export function valueAt(points, t) {
  if (points.length === 0) return 0;
  if (t <= points[0].t) return points[0].d;
  for (let i = 1; i < points.length; i++) {
    if (t <= points[i].t) {
      const a = points[i - 1];
      const b = points[i];
      if (b.t === a.t) return b.d;
      return a.d + ((b.d - a.d) * (t - a.t)) / (b.t - a.t);
    }
  }
  return points[points.length - 1].d;
}

/**
 * Velocity from the slope of the graph around `t`, over a window of ±`h`
 * seconds, cut off at the ends of the graph.
 * @param {GraphPoint[]} points
 * @param {number} t
 * @param {number} [h]
 */
export function slopeAt(points, t, h = 0.5) {
  if (points.length < 2) return 0;
  const lo = Math.max(points[0].t, t - h);
  const hi = Math.min(points[points.length - 1].t, t + h);
  if (hi <= lo) return 0;
  return tidy((valueAt(points, hi) - valueAt(points, lo)) / (hi - lo), 6);
}

/**
 * What a velocity means for the motion, in words.
 * @param {number} v
 */
export function motionWord(v) {
  if (Math.abs(v) < STILL) return 'đứng yên';
  return v > 0 ? 'chuyển động theo chiều dương' : 'chuyển động ngược chiều dương';
}

/**
 * The drawing tasks of the widget; `free` has no line to copy.
 * @type {Array<{ id: string, label: string, points: GraphPoint[] }>}
 */
export const TARGETS = [
  { id: 'tu-do', label: 'Vẽ tự do', points: [] },
  {
    id: 'deu',
    label: 'Đi đều',
    points: [
      { t: 0, d: 0 },
      { t: 12, d: 24 },
    ],
  },
  {
    id: 'nghi',
    label: 'Đi, nghỉ, về',
    points: [
      { t: 0, d: 0 },
      { t: 4, d: 12 },
      { t: 8, d: 12 },
      { t: 12, d: 0 },
    ],
  },
  {
    id: 'lui',
    label: 'Lùi rồi đứng',
    points: [
      { t: 0, d: 20 },
      { t: 5, d: -5 },
      { t: 12, d: -5 },
    ],
  },
];

/**
 * Average distance in metres between a drawn graph and its target.
 * @param {GraphPoint[]} samples
 * @param {GraphPoint[]} target
 */
export function meanError(samples, target) {
  if (samples.length === 0 || target.length === 0) return 0;
  const total = samples.reduce((sum, s) => sum + Math.abs(s.d - valueAt(target, s.t)), 0);
  return tidy(total / samples.length, 3);
}

/**
 * Feedback after a run on a target.
 * @param {number} error metres
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function verdict(error) {
  if (error <= 2) {
    return {
      tone: 'ok',
      text: 'Rất khít: em đã đi đúng vận tốc trên từng đoạn, vì độ dốc của đồ thị chính là vận tốc.',
    };
  }
  return {
    tone: 'warn',
    text: 'Chưa khít. Đoạn dốc hơn cần đi nhanh hơn, đoạn nằm ngang cần đứng yên, đoạn đi xuống cần đi ngược chiều dương. Thử lại nhé.',
  };
}

/**
 * Velocity and meaning of one straight segment of a graph.
 * @param {GraphPoint} a
 * @param {GraphPoint} b
 */
export function segmentInfo(a, b) {
  const dt = tidy(b.t - a.t);
  const dd = tidy(b.d - a.d);
  const v = dt === 0 ? 0 : tidy(dd / dt);
  return { dt, dd, v, word: motionWord(v) };
}
