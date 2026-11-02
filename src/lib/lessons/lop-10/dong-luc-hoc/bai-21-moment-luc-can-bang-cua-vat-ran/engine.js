/**
 * Moments about an axis: a beam on a pivot with unit weights on its pegs, the
 * lever arm of a slanted force, and a couple, whose moment is the same about
 * every axis perpendicular to its plane.
 */
import { tidy } from '#lib/core/number-format.js';
import { clamp } from '#lib/core/visuals/svg-math.js';

/** Weight of one hanging load, in newtons. */
export const UNIT_WEIGHT = 1;
/** Distance between two pegs on the beam, in metres. */
export const PEG_GAP = 0.1;
/** Most a beam tips over, in degrees. */
export const MAX_TILT = 14;

/**
 * M = F·d.
 * @param {number} force newtons @param {number} arm metres
 */
export function moment(force, arm) {
  return tidy(force * arm);
}

/**
 * Moment of the loads on one side of the pivot. `loads[i]` weights hang on
 * peg i + 1, so that peg sits (i + 1)·PEG_GAP from the pivot.
 * @param {number[]} loads
 */
export function sideMoment(loads) {
  return tidy(loads.reduce((sum, n, i) => sum + n * UNIT_WEIGHT * (i + 1) * PEG_GAP, 0));
}

/**
 * Tilt of the beam in degrees, positive clockwise (right side down), growing
 * with the unbalanced moment up to a limit.
 * @param {number} leftMoment @param {number} rightMoment
 */
export function beamTilt(leftMoment, rightMoment) {
  return clamp((rightMoment - leftMoment) * 12, -MAX_TILT, MAX_TILT);
}

/**
 * The lever arm of a force applied `reach` metres from the axis, at `angle`
 * degrees to the line from the axis to the point: d = r·sin α.
 * @param {number} reach @param {number} angle
 */
export function leverArm(reach, angle) {
  return tidy(reach * Math.sin((angle * Math.PI) / 180));
}

/**
 * Moment of a couple about an axis between its two lines of action: both forces
 * turn the same way, so their moments add up to F·(d1 + d2) = F·d.
 * @param {number} force @param {number} d1 @param {number} d2 distances to the axis
 * @returns {{ m1: number, m2: number, total: number }}
 */
export function coupleMoments(force, d1, d2) {
  return { m1: moment(force, d1), m2: moment(force, d2), total: moment(force, d1 + d2) };
}

/**
 * Support forces on a beam resting on supports at both ends, from
 * moments about one end and the force balance.
 * @param {number} length metres between supports
 * @param {Array<{ force: number, at: number }>} loads each at a distance from the first support
 * @returns {{ first: number, second: number }}
 */
export function supportForces(length, loads) {
  const total = loads.reduce((sum, l) => sum + l.force, 0);
  const second = loads.reduce((sum, l) => sum + l.force * l.at, 0) / length;
  return { first: tidy(total - second), second: tidy(second) };
}
