/**
 * A door seen from above, turning about its hinge (trục quay O). A force F
 * pushes the door at a distance r from the hinge, at an angle α to the door
 * leaf. The lever arm (cánh tay đòn) d is the distance from O to the line of
 * action (giá) of F, d = r · sin α, and the moment of the force is M = F · d.
 * The door has a closer spring: it only starts to turn once M reaches
 * OPEN_MOMENT, and it swings faster the larger M is (a model, not a law).
 */

/** Width of the door leaf, in cm. */
export const DOOR_CM = 80;

/** Smallest moment, in N·m, that starts the door turning against its closer. */
export const OPEN_MOMENT = 4;

/** Rounds away floating-point noise (0.1 + 0.2 → 0.3). */
export const tidy = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;

/**
 * Lever arm in cm: the distance from the hinge to the line of action of a
 * force applied `r` cm from the hinge at `angle` degrees to the door leaf.
 * @param {number} r cm
 * @param {number} angle degrees, 0 to 180
 */
export function leverArm(r, angle) {
  return Math.abs(tidy(r * Math.sin((angle * Math.PI) / 180)));
}

/**
 * M = F · d.
 * @param {number} force N
 * @param {number} arm m
 */
export function moment(force, arm) {
  return tidy(force * arm);
}

/**
 * @typedef {'doc' | 'qua-truc' | 'khong-luc' | 'yeu' | 'mo'} DoorReason
 * `doc`: the force is vertical, parallel to the hinge axis; `qua-truc`: its
 * line of action passes through the axis; `khong-luc`: F = 0; `yeu`: the
 * moment is too small to beat the closer; `mo`: the door turns.
 */

/**
 * What a force does to the door.
 * @param {{ force: number, r: number, angle: number, vertical?: boolean }} push
 *   force in N, r in cm, angle in degrees between the force and the door leaf
 * @returns {{ arm: number, moment: number, opens: boolean, reason: DoorReason }}
 *   arm in cm, moment in N·m
 */
export function doorPush({ force, r, angle, vertical = false }) {
  if (vertical) return { arm: 0, moment: 0, opens: false, reason: 'doc' };
  const arm = leverArm(r, angle);
  const m = moment(force, arm / 100);
  if (force === 0) return { arm, moment: 0, opens: false, reason: 'khong-luc' };
  if (arm === 0) return { arm, moment: 0, opens: false, reason: 'qua-truc' };
  if (m < OPEN_MOMENT) return { arm, moment: m, opens: false, reason: 'yeu' };
  return { arm, moment: m, opens: true, reason: 'mo' };
}

/**
 * How fast the door swings open, in degrees per second (0 when it stays shut).
 * @param {number} m moment in N·m
 */
export function swingSpeed(m) {
  if (m < OPEN_MOMENT) return 0;
  return tidy(Math.min(180, 20 + 15 * (m - OPEN_MOMENT)));
}

/**
 * Seconds the door takes to swing from shut to wide open (90°), or null when
 * it does not open.
 * @param {number} m moment in N·m
 */
export function openTime(m) {
  const v = swingSpeed(m);
  return v === 0 ? null : tidy(90 / v);
}

/**
 * Smallest force, in N, that opens the door when pushed `r` cm from the hinge
 * at `angle` degrees, or null when no force can (the line passes through O).
 * @param {number} r cm
 * @param {number} angle degrees
 */
export function leastForce(r, angle) {
  const arm = leverArm(r, angle);
  return arm === 0 ? null : tidy(OPEN_MOMENT / (arm / 100));
}
