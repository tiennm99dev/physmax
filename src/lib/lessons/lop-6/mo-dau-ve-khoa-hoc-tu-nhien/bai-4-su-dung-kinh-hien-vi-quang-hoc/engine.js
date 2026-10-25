/**
 * A virtual light microscope. The tube position `p` is counted in steps of
 * 10 µm from the position where the specimen is in focus; the objectives are
 * parfocal, so p = 0 is in focus for all of them. Each objective has its own
 * working distance (gap between its tip and the slide at focus) and depth of
 * field: the stronger the objective, the shorter both are, so the coarse knob
 * alone can no longer bring it into focus and can drive it into the slide.
 */

/** @typedef {{ power: number, workingDistance: number, depth: number }} Objective */

/**
 * Objectives on the turret. `workingDistance` and `depth` are in 10 µm steps:
 * the 4x objective sits about 17 mm above the slide at focus, the 40x one only
 * about 0.6 mm.
 * @type {Objective[]}
 */
export const OBJECTIVES = [
  { power: 4, workingDistance: 1700, depth: 30 },
  { power: 10, workingDistance: 700, depth: 10 },
  { power: 40, workingDistance: 60, depth: 2 },
];

/** Eyepiece magnifications offered. */
export const EYEPIECES = [10, 15];

/** One click of the coarse knob moves the tube 0.5 mm; one click of the fine knob 20 µm. */
export const COARSE_STEP = 50;
export const FINE_STEP = 2;

/** Tube position at the start: raised well above focus, off the coarse-step grid. */
export const START = 1530;
/** Highest tube position. */
export const TOP = 2500;

/** Largest blur (pixels) drawn in the field of view. */
export const MAX_BLUR = 10;

/**
 * Total magnification of the image: eyepiece × objective.
 * @param {number} eyepiece @param {number} objective
 */
export function totalMagnification(eyepiece, objective) {
  return eyepiece * objective;
}

/**
 * Gap between the objective tip and the slide, in millimetres.
 * @param {number} p @param {Objective} o
 */
export function gapMm(p, o) {
  return Math.max(0, o.workingDistance + p) / 100;
}

/**
 * Move the tube by `delta` steps (negative lowers it toward the slide). The
 * tube stops when the objective touches the slide; `crashed` reports that.
 * @param {number} p @param {number} delta @param {Objective} o
 * @returns {{ p: number, crashed: boolean }}
 */
export function moveTube(p, delta, o) {
  const next = Math.min(TOP, p + delta);
  const lowest = -o.workingDistance;
  return next <= lowest ? { p: lowest, crashed: true } : { p: next, crashed: false };
}

/**
 * Whether the tube position touches the slide with this objective (after a
 * turret change, for example).
 * @param {number} p @param {Objective} o
 */
export function touches(p, o) {
  return p <= -o.workingDistance;
}

/** @typedef {'ro-net' | 'gan-ro' | 'mo'} Focus */

/**
 * How sharp the field of view is.
 * - `ro-net`: within the depth of field.
 * - `gan-ro`: close enough that the fine knob should finish the job.
 * - `mo`: far from focus; the coarse knob is needed first.
 * @param {number} p @param {Objective} o
 * @returns {{ focus: Focus, blur: number }}
 */
export function focusOf(p, o) {
  const off = Math.abs(p);
  if (off <= o.depth) return { focus: 'ro-net', blur: 0 };
  const blur = Math.min(MAX_BLUR, 0.6 + ((off - o.depth) / (5 * o.depth)) * 2);
  return { focus: off <= COARSE_STEP ? 'gan-ro' : 'mo', blur };
}
