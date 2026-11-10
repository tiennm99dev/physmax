import { describe, expect, it } from 'vitest';
import {
  AMPLITUDE,
  COUNT,
  WAVELENGTH,
  compressions,
  directionRight,
  particles,
  rarefactions,
  shiftOf,
} from './engine.js';

describe('a row of particles carrying a wave', () => {
  it('moves particles across the row for a transverse wave', () => {
    const row = particles('ngang', 0.3);
    expect(row).toHaveLength(COUNT);
    expect(row.every((p) => p.x === p.i)).toBe(true);
    expect(row[3].y).toBe(shiftOf(3, 0.3));
  });

  it('moves particles along the row for a longitudinal wave', () => {
    const row = particles('doc', 0.3);
    expect(row.every((p) => p.y === 0)).toBe(true);
    expect(row[5].x).toBe(Number((5 + shiftOf(5, 0.3)).toFixed(9)));
  });

  it('never lets two coils cross', () => {
    const crossed = [0, 0.1, 0.37, 0.8].filter((t) => {
      const xs = particles('doc', t).map((p) => p.x);
      return xs.some((x, i) => i > 0 && x <= xs[i - 1]);
    });
    expect(crossed).toEqual([]);
    expect(AMPLITUDE).toBeLessThan(WAVELENGTH / (2 * Math.PI));
  });

  it('repeats one wavelength further along', () => {
    expect(shiftOf(2, 0.4)).toBeCloseTo(shiftOf(2 + WAVELENGTH, 0.4), 9);
  });
});

describe('compressions and rarefactions', () => {
  it('finds the crowded places of the spring', () => {
    const t = 0;
    const centres = compressions(t);
    expect(centres).toEqual([2, 10, 18]);
    const gap = (/** @type {number} */ x) => {
      const xs = particles('doc', t).map((p) => p.x);
      return xs[x + 1] - xs[x - 1];
    };
    expect(gap(2)).toBeLessThan(2);
    expect(gap(6)).toBeGreaterThan(2);
    expect(rarefactions(t)).toEqual([6, 14, 22]);
  });

  it('moves the compressions forward with the wave', () => {
    expect(compressions(0.25)[0]).toBe(4);
  });
});

describe('the direction question', () => {
  it('accepts across for transverse and along for longitudinal', () => {
    expect(directionRight('ngang', 'vuong-goc')).toBe(true);
    expect(directionRight('ngang', 'trung')).toBe(false);
    expect(directionRight('doc', 'trung')).toBe(true);
  });
});
