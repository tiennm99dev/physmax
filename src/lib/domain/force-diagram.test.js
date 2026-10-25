import { describe, expect, it } from 'vitest';
import {
  components,
  describeDirection,
  equilibrant,
  isBalanced,
  parallelogram,
  resultant,
} from './force-diagram.js';

describe('force diagram engine', () => {
  it('splits a force into components', () => {
    expect(components({ magnitude: 10, angle: 90 })).toEqual({ x: 0, y: 10 });
    expect(components({ magnitude: 10, angle: 180 })).toEqual({ x: -10, y: 0 });
  });

  it('adds perpendicular forces like a 3-4-5 triangle', () => {
    const r = resultant([
      { magnitude: 3, angle: 0 },
      { magnitude: 4, angle: 90 },
    ]);
    expect(r.magnitude).toBe(5);
    expect(r.angle).toBeCloseTo(53.130102354, 6);
  });

  it('finds opposite equal forces balanced, and gravity with a normal force too', () => {
    expect(
      isBalanced([
        { magnitude: 20, angle: 270 },
        { magnitude: 20, angle: 90 },
      ]),
    ).toBe(true);
    expect(
      isBalanced([
        { magnitude: 20, angle: 270 },
        { magnitude: 15, angle: 90 },
      ]),
    ).toBe(false);
    expect(isBalanced([])).toBe(true);
  });

  it('balances three forces at 120° to each other', () => {
    const three = [0, 120, 240].map((angle) => ({ magnitude: 7, angle }));
    expect(isBalanced(three, 1e-9)).toBe(true);
  });

  it('gives the equilibrant opposite the resultant', () => {
    expect(equilibrant([{ magnitude: 5, angle: 30 }])).toEqual({ magnitude: 5, angle: 210 });
    expect(equilibrant([])).toEqual({ magnitude: 0, angle: 0 });
  });

  it('matches the parallelogram rule', () => {
    expect(parallelogram(3, 4, 90)).toBe(5);
    expect(parallelogram(6, 6, 120)).toBeCloseTo(6, 9);
    expect(parallelogram(6, 4, 0)).toBe(10);
    expect(parallelogram(6, 4, 180)).toBe(2);
    for (const alpha of [15, 60, 135]) {
      expect(parallelogram(5, 8, alpha)).toBeCloseTo(
        resultant([
          { magnitude: 5, angle: 0 },
          { magnitude: 8, angle: alpha },
        ]).magnitude,
        9,
      );
    }
  });

  it('names the axis directions in Vietnamese', () => {
    expect(describeDirection(0)).toBe('sang phải');
    expect(describeDirection(-90)).toBe('xuống dưới');
    expect(describeDirection(450)).toBe('lên trên');
    expect(describeDirection(37.5)).toBe('hợp với phương ngang góc 37,5°');
    expect(describeDirection(53.130102354)).toBe('hợp với phương ngang góc 53,1°');
  });
});
