import { describe, expect, it } from 'vitest';
import {
  balanceReading,
  parallelPoint,
  percentGap,
  resultant,
  splitAngles,
  springShares,
} from './engine.js';

describe('two concurrent forces', () => {
  it('follows the parallelogram rule', () => {
    expect(resultant(3, 4, 90)).toBeCloseTo(5, 9);
    expect(resultant(5, 5, 60)).toBeCloseTo(8.66, 2);
    expect(resultant(6, 8, 120)).toBeCloseTo(7.21, 2);
  });

  it('splits the angle towards the larger force', () => {
    const even = splitAngles(4, 4, 80);
    expect(even.a1).toBeCloseTo(40, 9);
    const { a1, a2 } = splitAngles(5, 2, 90);
    expect(a1).toBeLessThan(a2);
    expect(a1 + a2).toBeCloseTo(90, 9);
  });

  it('reads within one division of the true value and repeats', () => {
    const off = [];
    for (const [f1, f2, alpha] of [
      [3, 4, 90],
      [2.5, 3.1, 60],
      [1, 5, 150],
      [4.2, 4.2, 35],
    ]) {
      const reading = balanceReading(f1, f2, alpha);
      if (Math.abs(reading - resultant(f1, f2, alpha)) > 0.15) off.push([f1, f2, alpha]);
      if (reading !== balanceReading(f1, f2, alpha)) off.push([f1, f2, alpha]);
    }
    expect(off).toEqual([]);
  });

  it('works out the gap in percent', () => {
    expect(percentGap(5.2, 5)).toBeCloseTo(4, 9);
  });
});

describe('two parallel forces on a bar', () => {
  it('finds the point where F1·d1 = F2·d2', () => {
    const x = parallelPoint(2, 0, 4, 30);
    expect(x).toBe(20);
    expect(2 * x).toBe(4 * (30 - x));
  });

  it('shares the load between the springs the same way for the single load', () => {
    const f1 = 1;
    const f2 = 2;
    const apart = springShares(30, [
      { force: f1, at: 3 },
      { force: f2, at: 27 },
    ]);
    const single = springShares(30, [{ force: f1 + f2, at: parallelPoint(f1, 3, f2, 27) }]);
    expect(single.left).toBeCloseTo(apart.left, 9);
    expect(single.right).toBeCloseTo(apart.right, 9);
  });
});
