import { describe, expect, it } from 'vitest';
import { parallelogram, resultant } from '#lib/domain/force-diagram.js';
import {
  angleBetween,
  forceFromTip,
  inclineParts,
  isBalancedOnBoard,
  resolve,
  snapForce,
} from './engine.js';

describe('dragging a tip', () => {
  it('snaps to whole newtons and degrees', () => {
    expect(snapForce(12.4, -0.4, 40)).toEqual({ magnitude: 12, angle: 0 });
    expect(snapForce(99, 361, 40)).toEqual({ magnitude: 40, angle: 1 });
  });

  it('reads a tip as size and direction', () => {
    expect(forceFromTip(0, 30, 40)).toEqual({ magnitude: 30, angle: 90 });
    expect(forceFromTip(-20, 0, 40)).toEqual({ magnitude: 20, angle: 180 });
  });
});

describe('the parallelogram rule', () => {
  it('reproduces the tugboat example', () => {
    expect(Math.round(parallelogram(8000, 8000, 30))).toBe(15455);
  });

  it('gives the worked cases of the exercises', () => {
    expect(parallelogram(6, 8, 90)).toBe(10);
    expect(parallelogram(30, 30, 120)).toBe(30);
    expect(parallelogram(40, 25, 180)).toBe(15);
    expect(parallelogram(5, 5, 60)).toBeCloseTo(8.66, 2);
  });

  it('measures the smaller angle between two directions', () => {
    expect(angleBetween(350, 10)).toBe(20);
    expect(angleBetween(0, 180)).toBe(180);
  });
});

describe('balance', () => {
  it('finds a third force that balances the first two on the snapped grid', () => {
    const f1 = { magnitude: 30, angle: 0 };
    const f2 = { magnitude: 40, angle: 90 };
    const r = resultant([f1, f2]);
    const f3 = snapForce(r.magnitude, r.angle + 180, 80);
    expect(f3.magnitude).toBe(50);
    expect(isBalancedOnBoard([f1, f2, f3])).toBe(true);
    expect(isBalancedOnBoard([f1, f2])).toBe(false);
  });

  it('can always get within tolerance for any pair the board allows', () => {
    const misses = [];
    for (const [m1, a1, m2, a2] of [
      [40, 0, 40, 1],
      [37, 13, 29, 97],
      [40, 200, 11, 305],
      [1, 359, 40, 77],
    ]) {
      const pair = [
        { magnitude: m1, angle: a1 },
        { magnitude: m2, angle: a2 },
      ];
      const r = resultant(pair);
      const f3 = snapForce(r.magnitude, r.angle + 180, 80);
      if (!isBalancedOnBoard([...pair, f3])) misses.push([m1, a1, m2, a2]);
    }
    expect(misses).toEqual([]);
  });
});

describe('resolving a force', () => {
  it('splits along horizontal and vertical axes', () => {
    const parts = resolve({ magnitude: 100, angle: 60 }, 0);
    expect(parts.along).toBeCloseTo(50, 6);
    expect(parts.across).toBeCloseTo(86.6, 1);
  });

  it('keeps the size of the force whatever the axis', () => {
    const parts = resolve({ magnitude: 50, angle: 47 }, 20);
    expect(Math.hypot(parts.along, parts.across)).toBeCloseTo(50, 6);
  });

  it('splits weight on a slope', () => {
    const parts = inclineParts(20, 30);
    expect(parts.along).toBeCloseTo(10, 6);
    expect(parts.normal).toBeCloseTo(17.32, 2);
    expect(inclineParts(20, 0)).toEqual({ along: 0, normal: 20 });
  });
});
