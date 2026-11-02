import { describe, expect, it } from 'vitest';
import { scatter } from './scatter.js';

describe('scatter', () => {
  it('repeats for a reading and stays in range', () => {
    const values = Array.from({ length: 200 }, (_, k) => scatter(k));
    expect(values.filter((v) => v < -1 || v > 1)).toEqual([]);
    expect(scatter(7)).toBe(values[7]);
    expect(new Set(values).size).toBeGreaterThan(190);
  });
});
