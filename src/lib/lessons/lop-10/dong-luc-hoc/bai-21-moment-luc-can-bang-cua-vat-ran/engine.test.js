import { describe, expect, it } from 'vitest';
import {
  MAX_TILT,
  beamTilt,
  coupleMoments,
  leverArm,
  moment,
  sideMoment,
  supportForces,
} from './engine.js';

describe('moment of a force', () => {
  it('is force times lever arm', () => {
    expect(moment(20, 0.3)).toBe(6);
    expect(moment(4, 0.5)).toBe(2);
  });

  it('shrinks the arm with a slanted force and vanishes through the axis', () => {
    expect(leverArm(0.5, 30)).toBeCloseTo(0.25, 9);
    expect(leverArm(0.5, 90)).toBe(0.5);
    expect(leverArm(0.5, 180)).toBe(0);
  });
});

describe('the beam on a pivot', () => {
  it('adds the moments on one side', () => {
    expect(sideMoment([0, 0, 2, 0, 0])).toBe(0.6);
    expect(sideMoment([1, 1, 0, 0, 1])).toBe(0.8);
  });

  it('stays level when the moments match with different weights', () => {
    const left = sideMoment([0, 0, 2, 0, 0]);
    const right = sideMoment([0, 3, 0, 0, 0]);
    expect(left).toBe(right);
    expect(beamTilt(left, right)).toBe(0);
  });

  it('tips towards the heavier moment, up to a limit', () => {
    expect(beamTilt(0, 0.5)).toBeGreaterThan(0);
    expect(beamTilt(0.5, 0)).toBeLessThan(0);
    expect(beamTilt(10, 0)).toBe(-MAX_TILT);
  });
});

describe('a couple', () => {
  it('has the same moment wherever the axis sits between the forces', () => {
    const totals = [0, 0.1, 0.25, 0.4].map((d1) => coupleMoments(5, d1, 0.4 - d1).total);
    expect(new Set(totals).size).toBe(1);
    expect(totals[0]).toBe(2);
  });

  it('splits between the two forces', () => {
    expect(coupleMoments(10, 0.1, 0.3)).toEqual({ m1: 1, m2: 3, total: 4 });
  });
});

describe('a beam on two supports', () => {
  it('solves the worked example', () => {
    expect(
      supportForces(1, [
        { force: 20, at: 0.5 },
        { force: 30, at: 0.2 },
      ]),
    ).toEqual({ first: 34, second: 16 });
  });

  it('solves the exercise', () => {
    expect(
      supportForces(2, [
        { force: 100, at: 1 },
        { force: 200, at: 0.5 },
      ]),
    ).toEqual({ first: 200, second: 100 });
  });
});
