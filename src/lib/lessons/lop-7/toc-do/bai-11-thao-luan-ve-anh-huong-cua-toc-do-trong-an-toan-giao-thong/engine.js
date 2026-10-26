/**
 * Emergency stop: from the moment the driver sees an obstacle, the car first
 * keeps its speed for the reaction time (reaction distance = v·t), then
 * brakes with a steady deceleration until it stops (braking distance
 * v²/(2a), which grows with the square of the speed). Speeds in, out are
 * km/h for the learner; the physics runs in m and s.
 */
import { toKmh, toMs } from '../_shared/speed.js';

/** Reaction times (s): an alert driver, and one distracted (phone, tiredness). */
export const DRIVERS = [
  { id: 'tinh-tao', label: 'Tập trung (1 s)', time: 1 },
  { id: 'mat-tap-trung', label: 'Mất tập trung (2 s)', time: 2 },
];

/** Braking deceleration (m/s²) on a dry and on a wet road. */
export const ROADS = [
  { id: 'kho', label: 'Đường khô', decel: 7 },
  { id: 'uot', label: 'Đường ướt', decel: 4 },
];

/**
 * Reaction, braking and total stopping distance (m) at `kmh`.
 * @param {number} kmh @param {number} reaction @param {number} decel
 */
export function stopping(kmh, reaction, decel) {
  const v = toMs(kmh);
  const think = v * reaction;
  const brake = (v * v) / (2 * decel);
  return { v, think, brake, total: think + brake, time: reaction + v / decel };
}

/**
 * Distance travelled (m) `t` seconds after the obstacle appears.
 * @param {number} kmh @param {number} reaction @param {number} decel @param {number} t
 */
export function travelledAt(kmh, reaction, decel, t) {
  const v = toMs(kmh);
  if (t <= 0) return 0;
  if (t <= reaction) return v * t;
  const tb = Math.min(t - reaction, v / decel);
  return v * reaction + v * tb - (decel * tb * tb) / 2;
}

/**
 * What happens with an obstacle `gap` metres ahead: the car stops short (with
 * the room left), or hits it (with the speed at impact, km/h).
 * @param {number} kmh @param {number} reaction @param {number} decel @param {number} gap
 */
export function outcome(kmh, reaction, decel, gap) {
  const s = stopping(kmh, reaction, decel);
  if (s.total <= gap) return { hit: false, left: gap - s.total, impactKmh: 0 };
  const braking = Math.max(0, gap - s.think);
  const v2 = s.v * s.v - 2 * decel * braking;
  return { hit: true, left: 0, impactKmh: toKmh(Math.sqrt(Math.max(0, v2))) };
}

/**
 * Smallest safe gap (m) to the car ahead for a travelling speed, from the
 * traffic rules; below 60 km/h the driver chooses a suitable gap (null).
 * @param {number} kmh
 */
export function safeGap(kmh) {
  if (kmh < 60) return null;
  if (kmh <= 60) return 35;
  if (kmh <= 80) return 55;
  if (kmh <= 100) return 70;
  if (kmh <= 120) return 100;
  return null;
}
