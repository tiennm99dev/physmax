/**
 * Two people each pull a load of bricks up to the same floor with a pulley,
 * at a steady pace, each in their own time. The pulling force equals the
 * load's weight, so the work done is A = F·s = P·h and the power is
 * 𝒫 = A/t. The numbers follow the classic textbook case: bricks of 16 N.
 */
import { tidy } from '#lib/core/number-format.js';

/** Weight of one brick, N. */
export const BRICK = 16;

/**
 * Work in J of a constant force `f` (N) moving its point `s` metres along
 * its own direction.
 * @param {number} f @param {number} s
 */
export const work = (f, s) => tidy(f * s);

/**
 * Power in W of `a` joules of work done in `t` seconds.
 * @param {number} a @param {number} t
 */
export const power = (a, t) => (t > 0 ? tidy(a / t) : 0);

/** @typedef {{ bricks: number, time: number }} Puller */

/**
 * One person's lift at `elapsed` seconds: the load's height, the work done
 * so far, and the final work and power.
 * @param {Puller} p @param {number} height @param {number} elapsed
 */
export function liftAt(p, height, elapsed) {
  const force = p.bricks * BRICK;
  const done = Math.min(1, Math.max(0, elapsed / p.time));
  const total = work(force, height);
  return {
    force,
    h: height * done,
    workSoFar: tidy(total * done),
    work: total,
    power: power(total, p.time),
    finished: done >= 1,
  };
}

/**
 * Who did more work and who worked faster: 'a', 'b' or 'equal' for each.
 * @param {{ work: number, power: number }} a @param {{ work: number, power: number }} b
 */
export function compare(a, b) {
  /** @param {number} x @param {number} y */
  const pick = (x, y) => (Math.abs(x - y) < 1e-9 ? 'equal' : x > y ? 'a' : 'b');
  return { moreWork: pick(a.work, b.work), morePower: pick(a.power, b.power) };
}
