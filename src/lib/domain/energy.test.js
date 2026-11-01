import { describe, expect, it } from 'vitest';
import { G, kinetic, potential, speedFrom, weight } from './energy.js';

describe('mechanical energy formulas', () => {
  it('uses P = 10·m and Wt = P·h', () => {
    expect(G).toBe(10);
    expect(weight(1.5)).toBeCloseTo(15, 12);
    expect(potential(1.5, 8)).toBeCloseTo(120, 12);
    expect(potential(3, 0)).toBe(0);
  });

  it('computes Wđ = ½·m·v² and inverts it', () => {
    expect(kinetic(1200, 15)).toBeCloseTo(135000, 9);
    expect(kinetic(60, 5)).toBeCloseTo(750, 12);
    expect(speedFrom(60, 750)).toBeCloseTo(5, 12);
    expect(speedFrom(2, 0)).toBe(0);
    expect(speedFrom(2, -1)).toBe(0);
  });
});
