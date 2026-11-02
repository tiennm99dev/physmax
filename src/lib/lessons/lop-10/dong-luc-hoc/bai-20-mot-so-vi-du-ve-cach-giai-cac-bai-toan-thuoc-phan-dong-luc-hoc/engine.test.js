import { describe, expect, it } from 'vitest';
import {
  PROBLEMS,
  checkForces,
  inclineAccel,
  isRightAnswer,
  linkedBodies,
  simulate,
  slantedPullAccel,
  steadySlantedPull,
  sumAlong,
} from './engine.js';

/** @param {string} value */
const problem = (value) => {
  const found = PROBLEMS.find((p) => p.value === value);
  if (!found) throw new Error(value);
  return found;
};

describe('the worked answers', () => {
  it('pushes a crate along the floor', () => {
    expect(slantedPullAccel(55, 220, 0, 0.35)).toBeCloseTo(0.57, 2);
  });

  it('slides a book down an incline', () => {
    expect(inclineAccel(30, 0.3)).toBeCloseTo(2.35, 2);
    expect(inclineAccel(30, 0)).toBeCloseTo(4.9, 9);
    expect(inclineAccel(30, 0.2)).toBeCloseTo(3.2, 2);
  });

  it('keeps a slanted pull steady', () => {
    expect(steadySlantedPull(10, 30, 0.2)).toBeCloseTo(20.29, 2);
    expect(steadySlantedPull(20, 60, 0.1)).toBeCloseTo(33.41, 2);
  });

  it('solves two linked bodies', () => {
    const rough = linkedBodies(5, 10, 45, 0.1);
    expect(rough.a).toBeCloseTo(2.02, 2);
    expect(rough.tension).toBeCloseTo(15, 9);
    expect(linkedBodies(2, 3, 20, 0)).toEqual({ a: 4, tension: 8 });
  });
});

describe('the solver problems', () => {
  it('has the expected accelerations', () => {
    expect(problem('ngang').answer).toBeCloseTo(2.87, 2);
    expect(problem('nghieng').answer).toBeCloseTo(2.35, 2);
    expect(problem('ham').answer).toBe(-4.9);
  });

  it('agrees with the force sum in the simulation', () => {
    const off = PROBLEMS.filter((p) => Math.abs(simulate(p, 1).a - p.answer) > 1e-6);
    expect(off).toEqual([]);
  });

  it('keeps the forces across Ox balanced', () => {
    const off = PROBLEMS.filter((p) => Math.abs(sumAlong(p.forces, p.axis + 90)) > 1e-6);
    expect(off).toEqual([]);
  });

  it('has exactly one right axis and one right equation in each', () => {
    const off = PROBLEMS.filter(
      (p) =>
        p.axes.filter((a) => a.right).length !== 1 ||
        p.equations.filter((e) => e.right).length !== 1,
    );
    expect(off).toEqual([]);
  });

  it('accepts a rounded answer and refuses a wrong sign', () => {
    expect(isRightAnswer(2.87, problem('ngang'))).toBe(true);
    expect(isRightAnswer(4.9, problem('ham'))).toBe(false);
    expect(isRightAnswer(-4.9, problem('ham'))).toBe(true);
  });

  it('reports missing and extra forces', () => {
    const p = problem('nghieng');
    const all = p.forces.map((f) => f.tex);
    expect(checkForces(all, p)).toEqual({ missing: [], extra: [] });
    const result = checkForces([all[0], p.decoys[0].tex], p);
    expect(result.missing).toHaveLength(2);
    expect(result.extra).toEqual([p.decoys[0]]);
  });

  it('stops a braking car and leaves it stopped', () => {
    const p = problem('ham');
    const end = simulate(p, 5);
    expect(end.v).toBe(0);
    expect(end.s).toBeCloseTo(40.82, 2);
    expect(simulate(p, 2).v).toBeCloseTo(10.2, 9);
  });
});
