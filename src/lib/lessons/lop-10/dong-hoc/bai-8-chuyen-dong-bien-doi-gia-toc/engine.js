/**
 * A virtual car with a gas pedal and a brake, driving forward on a straight
 * road. Speeds are in m/s, drag is left out, and the car never reverses.
 * Signed velocity and acceleration follow the chosen positive direction.
 */
import { clamp } from '#lib/core/visuals/svg-math.js';
import { tidy } from '#lib/core/number-format.js';

/** @typedef {'ga' | 'phanh' | 'tha'} Pedal */
/** @typedef {{ speed: number, x: number, t: number }} CarState */

export const V_MAX = 30;
export const PEDAL_ACCELERATION = /** @type {const} */ ({ ga: 2, phanh: -4, tha: 0 });

/**
 * The car after `dt` seconds with a pedal held down.
 * @param {CarState} state
 * @param {Pedal} pedal
 * @param {number} dt
 * @returns {CarState}
 */
export function step(state, pedal, dt) {
  const speed = clamp(state.speed + PEDAL_ACCELERATION[pedal] * dt, 0, V_MAX);
  return {
    speed: tidy(speed, 6),
    x: state.x + ((state.speed + speed) / 2) * dt,
    t: state.t + dt,
  };
}

/**
 * Whether the car is at rest with nothing pushing it, so time need not run.
 * @param {CarState} state
 * @param {Pedal} pedal
 */
export function isIdle(state, pedal) {
  return state.speed === 0 && pedal !== 'ga';
}

/**
 * The acceleration the car actually has right now: zero when the pedal cannot
 * change the speed any further.
 * @param {CarState} state
 * @param {Pedal} pedal
 */
export function actualAcceleration(state, pedal) {
  if (pedal === 'ga' && state.speed >= V_MAX) return 0;
  if (pedal === 'phanh' && state.speed <= 0) return 0;
  return PEDAL_ACCELERATION[pedal];
}

/**
 * A velocity or acceleration measured along the chosen positive direction.
 * @param {number} value along the car's motion
 * @param {1 | -1} axis 1 when the positive direction is the car's direction
 */
export function signed(value, axis) {
  return value === 0 ? 0 : value * axis;
}

/**
 * The kind of motion, from the signs of v and a: a·v > 0 speeds up, a·v < 0
 * slows down, whichever way the axis points.
 * @param {number} v signed velocity
 * @param {number} a signed acceleration
 */
export function classify(v, a) {
  if (v === 0 && a === 0) return 'dung-yen';
  if (a === 0) return 'deu';
  if (v === 0) return 'nhanh-dan';
  return a * v > 0 ? 'nhanh-dan' : 'cham-dan';
}

export const KIND_TEXT = /** @type {const} */ ({
  'dung-yen': 'Xe đứng yên: $v = 0$ và $a = 0$. Giữ chân ga để xe chạy.',
  deu: 'Vận tốc không đổi nên $a = 0$: xe chuyển động đều, không phải chuyển động biến đổi.',
  'nhanh-dan': 'Nhanh dần: $\\vec{a}$ cùng chiều với $\\vec{v}$, tức $a \\cdot v > 0$.',
  'cham-dan': 'Chậm dần: $\\vec{a}$ ngược chiều với $\\vec{v}$, tức $a \\cdot v < 0$.',
});

/**
 * Average acceleration over a stretch of driving.
 * @param {number} v0 @param {number} v @param {number} dt
 */
export function averageAcceleration(v0, v, dt) {
  return dt > 0 ? tidy((v - v0) / dt, 3) : 0;
}
