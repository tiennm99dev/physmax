import { describe, expect, it } from 'vitest';
import {
  SPEED_GOALS,
  WHEEL_RADIUS,
  angleFrom,
  compareSpeeds,
  frequencyOf,
  lapsDone,
  omegaFromRpm,
  periodOf,
  wheelPoint,
} from './engine.js';

describe('the wheel', () => {
  it('gives every point the same angle and a speed that grows with the radius', () => {
    const near = wheelPoint(0.2, 1.5, 2);
    const far = wheelPoint(0.5, 1.5, 2);
    expect(near.theta).toBe(far.theta);
    expect(near.v).toBeCloseTo(0.3, 9);
    expect(far.v).toBeCloseTo(0.75, 9);
    expect(far.s).toBeCloseTo(1.5, 9);
  });

  it('ties period and frequency to the angular speed', () => {
    expect(periodOf(Math.PI)).toBeCloseTo(2, 9);
    expect(frequencyOf(Math.PI)).toBeCloseTo(0.5, 9);
  });

  it('turns the Hoa Binh rotor speed into rad/s', () => {
    expect(omegaFromRpm(125)).toBeCloseTo(13.09, 2);
  });

  it('counts a lap at the end of a full turn', () => {
    expect(lapsDone(6)).toBe(0);
    expect(lapsDone(2 * Math.PI)).toBe(1);
  });

  it('compares two points whichever is further out', () => {
    expect(compareSpeeds(0.2, 0.5)).toEqual({ faster: 'B', ratio: 2.5 });
    expect(compareSpeeds(0.4, 0.2)).toEqual({ faster: 'A', ratio: 2 });
    expect(compareSpeeds(0.3, 0.3)).toEqual({ faster: null, ratio: 1 });
  });

  it('offers only speed goals the sliders can reach', () => {
    const unreachable = SPEED_GOALS.filter((goal) => {
      for (let o = 5; o <= 30; o++) {
        for (let r = 10; r <= WHEEL_RADIUS * 100; r += 5) {
          if (wheelPoint(r / 100, o / 10, 0).v === goal) return false;
        }
      }
      return true;
    });
    expect(unreachable).toEqual([]);
  });
});

describe('angleFrom', () => {
  it('reads angles counter-clockwise from the right, on a y-down board', () => {
    expect(angleFrom(1, 0)).toBeCloseTo(0, 9);
    expect(angleFrom(0, -1)).toBeCloseTo(Math.PI / 2, 9);
    expect(angleFrom(-1, 0)).toBeCloseTo(Math.PI, 9);
    expect(angleFrom(0, 1)).toBeCloseTo((3 * Math.PI) / 2, 9);
  });
});
