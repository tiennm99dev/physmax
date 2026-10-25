import { describe, expect, it } from 'vitest';
import {
  SPRINGS,
  STEP_MASS,
  extension,
  lengthOf,
  overLimit,
  proportional,
  readingOk,
} from './engine.js';

const [soft, stiff] = SPRINGS;

describe('spring with hanging masses', () => {
  it('stretches in proportion to the mass within the limit', () => {
    expect(lengthOf(soft, 0, false)).toBe(10);
    expect(lengthOf(soft, 50, false)).toBe(12);
    expect(lengthOf(soft, 150, false)).toBe(16);
    expect(lengthOf(soft, 300, false)).toBe(22);
    expect(lengthOf(stiff, 100, false)).toBe(14);
    const rows = [1, 2, 3, 4].map((n) => {
      const m = n * STEP_MASS;
      return { m, dl: extension(lengthOf(soft, m, false), soft.l0) };
    });
    expect(rows.map((r) => r.dl)).toEqual([2, 4, 6, 8]);
    expect(proportional(rows)).toBe(true);
  });

  it('stretches more than in proportion past the elastic limit and keeps a set', () => {
    expect(overLimit(soft, 300)).toBe(false);
    expect(overLimit(soft, 350)).toBe(true);
    expect(lengthOf(soft, 350, false)).toBe(28);
    expect(lengthOf(soft, 0, true)).toBe(11.5);
    expect(lengthOf(stiff, 0, true)).toBe(13);
  });

  it('accepts readings within a quarter of a division', () => {
    expect(readingOk(16, 16)).toBe(true);
    expect(readingOk(16.1, 16)).toBe(true);
    expect(readingOk(16.5, 16)).toBe(false);
  });

  it('needs two nonzero rows with the same ratio to call it proportional', () => {
    expect(proportional([{ m: 50, dl: 2 }])).toBe(false);
    expect(
      proportional([
        { m: 0, dl: 0 },
        { m: 50, dl: 2 },
        { m: 100, dl: 4 },
      ]),
    ).toBe(true);
    expect(
      proportional([
        { m: 50, dl: 2 },
        { m: 100, dl: 5 },
      ]),
    ).toBe(false);
  });
});
