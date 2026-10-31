import { describe, expect, it } from 'vitest';
import { boundary } from '../_shared/light.js';
import { MIN_ROWS, indexFromSpeed, lawCheck } from './engine.js';

describe('refraction law check', () => {
  it('confirms the law once three angles give the same ratio', () => {
    const rows = [20, 40, 60].map((i) => ({ ratio: boundary(1, 1.5, i).ratio ?? 0 }));
    expect(lawCheck(rows.slice(0, MIN_ROWS - 1), 1.5).enough).toBe(false);
    const c = lawCheck(rows, 1.5);
    expect(c.enough).toBe(true);
    expect(c.mean).toBeCloseTo(1.5, 9);
  });

  it('rejects a table that does not match the expected index', () => {
    expect(lawCheck([{ ratio: 1.5 }, { ratio: 1.33 }, { ratio: 1.5 }], 1.5).enough).toBe(false);
    expect(lawCheck([], 1.5)).toEqual({ mean: 0, steady: true, enough: false });
  });

  it('gives n = c / v', () => {
    expect(indexFromSpeed(2e8)).toBeCloseTo(1.5, 12);
    expect(indexFromSpeed(2.25e8)).toBeCloseTo(4 / 3, 12);
  });
});
