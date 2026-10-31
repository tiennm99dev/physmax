import { describe, expect, it } from 'vitest';
import { compareKinetic, dropAt, fallTime } from './engine.js';

describe('dropping a body from rest', () => {
  it('starts with only potential energy and lands with only kinetic energy', () => {
    const start = dropAt(2, 5, 0);
    expect(start).toMatchObject({ h: 5, v: 0, wd: 0, wt: 100, landed: false });
    const end = dropAt(2, 5, 10);
    expect(end.landed).toBe(true);
    expect(end.h).toBeCloseTo(0, 9);
    expect(end.wt).toBeCloseTo(0, 9);
    expect(end.v).toBeCloseTo(10, 9);
    expect(end.wd).toBeCloseTo(100, 9);
  });

  it('keeps Wđ + Wt equal to the starting Wt during the fall', () => {
    const bad = [];
    for (const [m, h0] of [
      [0.5, 1],
      [2, 5],
      [5, 20],
    ]) {
      const tf = fallTime(h0);
      for (let k = 0; k <= 10; k++) {
        const s = dropAt(m, h0, (tf * k) / 10);
        if (Math.abs(s.wd + s.wt - 10 * m * h0) > 1e-9) bad.push([m, h0, k]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('times the fall', () => {
    expect(fallTime(20)).toBeCloseTo(2, 12);
    expect(fallTime(0)).toBe(0);
    expect(dropAt(1, 0, 1)).toMatchObject({ h: 0, v: 0, landed: true });
  });
});

describe('comparing kinetic energies', () => {
  it('multiplies by the mass factor and the square of the speed factor', () => {
    expect(compareKinetic({ m: 2, v: 3 }, { m: 1, v: 6 })).toMatchObject({
      wa: 9,
      wb: 18,
      massFactor: 0.5,
      speedFactor: 2,
      ratio: 2,
    });
    expect(compareKinetic({ m: 1000, v: 10 }, { m: 1000, v: 30 }).ratio).toBe(9);
  });
});
