/**
 * Straight-line motion made of stages with constant acceleration: uniform
 * motion (a = 0) and uniformly accelerated motion. Positions and velocities
 * are signed along one axis; time starts at 0.
 */
import { clean } from './vector.js';

/** @typedef {{ duration: number, acceleration: number }} Stage */
/** @typedef {{ x0?: number, v0?: number, stages: Stage[] }} Motion */
/** @typedef {{ t: number, x: number, v: number, a: number }} MotionState */

/**
 * Position, velocity and acceleration at time `t`. Past the last stage the
 * body keeps its final velocity; before 0 it sits at the start.
 * @param {Motion} motion
 * @param {number} t
 * @returns {MotionState}
 */
export function stateAt(motion, t) {
  let x = motion.x0 ?? 0;
  let v = motion.v0 ?? 0;
  if (t <= 0)
    return {
      t: clean(Math.max(0, t)),
      x: clean(x),
      v: clean(v),
      a: motion.stages[0]?.acceleration ?? 0,
    };
  let start = 0;
  for (const stage of motion.stages) {
    const dt = Math.min(stage.duration, t - start);
    if (dt < stage.duration) {
      return {
        t: clean(t),
        x: clean(x + v * dt + (stage.acceleration * dt * dt) / 2),
        v: clean(v + stage.acceleration * dt),
        a: stage.acceleration,
      };
    }
    x += v * stage.duration + (stage.acceleration * stage.duration * stage.duration) / 2;
    v += stage.acceleration * stage.duration;
    start += stage.duration;
  }
  return { t: clean(t), x: clean(x + v * (t - start)), v: clean(v), a: 0 };
}

/**
 * Total duration of all stages.
 * @param {Motion} motion
 */
export function totalTime(motion) {
  return clean(motion.stages.reduce((n, s) => n + s.duration, 0));
}

/**
 * `count + 1` evenly spaced states from 0 to `tMax`, plus every stage
 * boundary, so a plotted x-t or v-t line keeps its corners.
 * @param {Motion} motion
 * @param {number} tMax
 * @param {number} [count]
 * @returns {MotionState[]}
 */
export function sampleMotion(motion, tMax, count = 60) {
  const times = new Set();
  for (let i = 0; i <= count; i++) times.add(clean((tMax * i) / count));
  let edge = 0;
  for (const s of motion.stages) {
    edge += s.duration;
    if (edge < tMax) times.add(clean(edge));
  }
  return [...times].sort((a, b) => a - b).map((t) => stateAt(motion, t));
}

/**
 * Displacement (độ dịch chuyển) between two times: the signed change of position.
 * @param {Motion} motion
 * @param {number} t0 @param {number} t1
 */
export function displacement(motion, t0, t1) {
  return clean(stateAt(motion, t1).x - stateAt(motion, t0).x);
}

/**
 * Distance travelled (quãng đường đi được) from 0 to `t`: the length of the
 * path, which counts every turn-around, so it is never less than |displacement|.
 * @param {Motion} motion
 * @param {number} t
 */
export function distanceTravelled(motion, t) {
  /** @type {number[]} */
  const cuts = [0];
  let start = 0;
  for (const s of motion.stages) {
    const v0 = stateAt(motion, start).v;
    // The velocity changes sign inside a stage at most once, where v0 + a·τ = 0.
    if (s.acceleration !== 0) {
      const tau = -v0 / s.acceleration;
      if (tau > 0 && tau < s.duration) cuts.push(start + tau);
    }
    start += s.duration;
    cuts.push(start);
  }
  const ends = [...cuts.filter((c) => c < t), t];
  let total = 0;
  for (let i = 1; i < ends.length; i++) {
    total += Math.abs(stateAt(motion, ends[i]).x - stateAt(motion, ends[i - 1]).x);
  }
  return clean(total);
}

/**
 * Average speed (tốc độ trung bình) and average velocity (vận tốc trung bình)
 * over [t0, t1].
 * @param {Motion} motion
 * @param {number} t0 @param {number} t1
 */
export function averages(motion, t0, t1) {
  const dt = t1 - t0;
  if (!(dt > 0)) return { speed: 0, velocity: 0 };
  const path = distanceTravelled(motion, t1) - distanceTravelled(motion, t0);
  return { speed: clean(path / dt), velocity: clean(displacement(motion, t0, t1) / dt) };
}
