/**
 * Pulling a wooden block with a spring balance across different surfaces.
 * Forces in newtons, masses in kilograms, speeds in metres per second.
 *
 * While the block rests, static friction (ma sát nghỉ) matches the pull, up
 * to a largest value. A stronger pull starts it sliding; then sliding
 * friction (ma sát trượt), a little smaller and fixed for the surface and
 * load, acts against the motion. On a trolley with wheels the friction is
 * rolling friction (ma sát lăn), far smaller. The balance shows the friction
 * exactly when the block rests or moves at a steady speed.
 *
 * The surface factors are made up for the lesson; grade 6 compares them, it
 * does not compute with them.
 */

/** @typedef {'kinh' | 'go' | 'nham' | 'banh-xe'} SurfaceId */
/** @typedef {{ id: SurfaceId, name: string, grip: number, slide: number, rolling: boolean }} Surface */
/** @typedef {{ moving: boolean, v: number }} Motion */

/** @type {Surface[]} */
export const SURFACES = [
  { id: 'kinh', name: 'Mặt kính', grip: 0.25, slide: 0.2, rolling: false },
  { id: 'go', name: 'Mặt gỗ', grip: 0.4, slide: 0.3, rolling: false },
  { id: 'nham', name: 'Giấy nhám', grip: 0.8, slide: 0.6, rolling: false },
  { id: 'banh-xe', name: 'Đặt trên xe lăn', grip: 0.04, slide: 0.03, rolling: true },
];

/** Mass of the block and of the extra weight put on it, in kilograms. */
export const BLOCK_MASS = 0.5;
export const EXTRA_MASS = 0.5;
/** Range and smallest step of the spring balance, in newtons. */
export const RANGE = 10;
export const PULL_STEP = 0.05;

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * @param {SurfaceId} id
 * @returns {Surface}
 */
export function surface(id) {
  return SURFACES.find((s) => s.id === id) ?? SURFACES[0];
}

/**
 * Largest static friction and the sliding (or rolling) friction for a surface
 * and load, using P = 10m for the weight pressing on the surface.
 * @param {SurfaceId} id @param {boolean} loaded
 */
export function limits(id, loaded) {
  const s = surface(id);
  const mass = BLOCK_MASS + (loaded ? EXTRA_MASS : 0);
  const weight = tidy(10 * mass);
  return { mass, weight, maxStatic: tidy(s.grip * weight), sliding: tidy(s.slide * weight) };
}

/**
 * Snap a pull to the balance's steps and range.
 * @param {number} f
 */
export function snapPull(f) {
  return tidy(Math.min(RANGE, Math.max(0, Math.round(f / PULL_STEP) * PULL_STEP)));
}

/**
 * Advance the block by `dt` seconds under a pull `f`.
 * @param {Motion} m
 * @param {number} f
 * @param {{ mass: number, maxStatic: number, sliding: number }} lim
 * @param {number} dt
 * @returns {Motion}
 */
export function step(m, f, lim, dt) {
  if (!m.moving) {
    return f > lim.maxStatic ? { moving: true, v: 0 } : { moving: false, v: 0 };
  }
  const v = tidy(m.v + ((f - lim.sliding) / lim.mass) * dt);
  if (v > 0) return { moving: true, v };
  // Stopped: it stays at rest unless the pull beats static friction again.
  return { moving: f > lim.maxStatic, v: 0 };
}

/**
 * The friction acting now: static friction equal to the pull while the block
 * rests, the sliding (rolling) value once it moves.
 * @param {Motion} m @param {number} f @param {{ sliding: number }} lim
 */
export function friction(m, f, lim) {
  return m.moving ? lim.sliding : tidy(f);
}

/**
 * @typedef {'dung-yen' | 'bat-dau' | 'nhanh-dan' | 'deu' | 'cham-dan'} MotionKind
 */

/**
 * What the block is doing, in the words of the lesson.
 * @param {Motion} m @param {number} f @param {{ maxStatic: number, sliding: number }} lim
 * @returns {MotionKind}
 */
export function motionKind(m, f, lim) {
  if (!m.moving) return f > lim.maxStatic ? 'bat-dau' : 'dung-yen';
  const d = tidy(f - lim.sliding);
  if (d === 0) return 'deu';
  return d > 0 ? 'nhanh-dan' : 'cham-dan';
}
