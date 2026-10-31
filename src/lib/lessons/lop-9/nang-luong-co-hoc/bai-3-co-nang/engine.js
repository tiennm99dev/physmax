/**
 * A skateboarder on a track the learner shapes. The track passes through
 * control heights at equally spaced x; between two of them it follows a
 * half-cosine, so it is smooth and flat at every control point. The rider
 * starts at rest on the first point, the ground is the zero level of
 * potential energy, and with friction on a force μ·P·cos α along the track
 * turns mechanical energy into heat. Short walls at both ends send the rider
 * back.
 */
import { G, potential, speedFrom } from '../_shared/energy.js';

/** Rider and board, kg. */
export const MASS = 50;
/** Metres between two control points. */
export const SPACING = 2;
/** Highest a control point can go, m. */
export const MAX_HEIGHT = 6;
/** Friction coefficient when friction is on. */
export const FRICTION = 0.08;

/** @typedef {{ x: number, v: number, heat: number, total: number, resting: boolean }} Rider */

/**
 * Track length along x, m.
 * @param {number[]} heights
 */
export const trackLength = (heights) => SPACING * (heights.length - 1);

/**
 * Height of the track at `x` and its slope dy/dx.
 * @param {number[]} heights @param {number} x
 */
export function trackAt(heights, x) {
  const last = heights.length - 1;
  const u0 = Math.min(Math.max(x / SPACING, 0), last);
  const i = Math.min(Math.floor(u0), last - 1);
  const u = u0 - i;
  const a = heights[i];
  const b = heights[i + 1];
  const y = a + ((b - a) * (1 - Math.cos(Math.PI * u))) / 2;
  const slope = ((b - a) * Math.PI * Math.sin(Math.PI * u)) / (2 * SPACING);
  return { y, slope };
}

/**
 * Where the rider starts, a quarter of the way into the first stretch, so the
 * track is already sloping there (it is flat at the control point itself).
 */
export const START_X = SPACING / 4;

/**
 * Height of the start, m.
 * @param {number[]} heights
 */
export const startHeight = (heights) => trackAt(heights, START_X).y;

/**
 * The rider at rest at the start.
 * @param {number[]} heights
 * @returns {Rider}
 */
export function start(heights) {
  const y = startHeight(heights);
  return { x: START_X, v: 0, heat: 0, total: potential(MASS, y), resting: y <= 0 };
}

/**
 * Kinetic, potential and mechanical energy of the rider, and the heat made
 * so far; they always add up to the starting energy.
 * @param {number[]} heights @param {Rider} r
 */
export function energies(heights, r) {
  const wt = potential(MASS, trackAt(heights, r.x).y);
  const w = Math.max(wt, r.total - r.heat);
  return { wd: w - wt, wt, w, heat: r.heat };
}

/**
 * Speed of the rider in m/s, read from the kinetic energy.
 * @param {number[]} heights @param {Rider} r
 */
export const speed = (heights, r) => speedFrom(MASS, energies(heights, r).wd);

/**
 * Advance the rider by `dt` seconds. The speed along the track changes by
 * −g·sin α (and friction against the motion); after each sub-step it is
 * rescaled so that Wđ + Wt + heat stays the starting energy exactly.
 * @param {number[]} heights @param {Rider} r @param {number} dt @param {boolean} friction
 * @returns {Rider}
 */
export function advance(heights, r, dt, friction) {
  if (r.resting) return r;
  const mu = friction ? FRICTION : 0;
  const end = trackLength(heights);
  let { x, v, heat } = r;
  const n = Math.max(1, Math.ceil(dt / 0.002));
  const h = dt / n;
  for (let k = 0; k < n; k++) {
    const { slope } = trackAt(heights, x);
    const norm = Math.sqrt(1 + slope * slope);
    const sin = slope / norm;
    const cos = 1 / norm;
    const pull = -G * sin;
    const grip = mu * G * cos;
    if (Math.abs(v) < 1e-3 && Math.abs(pull) <= grip) {
      return { x, v: 0, heat, total: r.total, resting: true };
    }
    const dir = Math.abs(v) < 1e-3 ? Math.sign(pull) : Math.sign(v);
    let nv = v + (pull - dir * grip) * h;
    if (mu > 0 && Math.sign(nv) !== dir && Math.abs(pull) <= grip) nv = 0;
    const ds = ((v + nv) / 2) * h;
    let nx = x + ds * cos;
    if (nx <= 0) {
      nx = 0;
      nv = Math.abs(nv);
    } else if (nx >= end) {
      nx = end;
      nv = -Math.abs(nv);
    }
    const nheat = heat + mu * MASS * G * cos * Math.abs(ds);
    const left = r.total - nheat - potential(MASS, trackAt(heights, nx).y);
    if (left < 0) {
      // Past the turning point: stay where the rider was and start sliding back.
      nv = 0;
    } else {
      x = nx;
      heat = nheat;
      if (Math.abs(nv) > 0.05) nv = Math.sign(nv) * Math.sqrt((2 * left) / MASS);
    }
    v = nv;
  }
  return { x, v, heat, total: r.total, resting: false };
}

/**
 * Index of the first control point after the start that is at least as high
 * as the start: without friction the rider can never get past it.
 * Returns -1 when every later point is lower.
 * @param {number[]} heights
 */
export function blockingPoint(heights) {
  const y = startHeight(heights);
  for (let i = 1; i < heights.length; i++) if (heights[i] >= y) return i;
  return -1;
}
