import { describe, expect, it } from 'vitest';
import { collide, kineticSum, momentum } from './collision.js';

describe('collide', () => {
  it('hands all the motion over between equal carts in an elastic collision', () => {
    expect(collide('dan-hoi', 1, 0.6, 1, 0)).toEqual({ v1: 0, v2: 0.6 });
  });

  it('halves the speed of equal carts that stick together', () => {
    expect(collide('mem', 1, 4, 1, 0)).toEqual({ v1: 2, v2: 2 });
  });

  it('keeps total momentum in both kinds, for carts meeting head-on', () => {
    const cases = [
      [0.5, 1, 0.2, -0.5],
      [1, 0.3, 0.4, -1],
      [0.2, 0.8, 1, 0],
    ];
    const bad = cases.flatMap(([m1, v1, m2, v2]) =>
      /** @type {const} */ (['dan-hoi', 'mem']).filter((kind) => {
        const after = collide(kind, m1, v1, m2, v2);
        return Math.abs(momentum(m1, after.v1) + momentum(m2, after.v2) - m1 * v1 - m2 * v2) > 1e-8;
      }),
    );
    expect(bad).toEqual([]);
  });

  it('keeps kinetic energy only in an elastic collision', () => {
    const before = kineticSum(2, 3, 1, 0);
    const elastic = collide('dan-hoi', 2, 3, 1, 0);
    const soft = collide('mem', 2, 3, 1, 0);
    expect(kineticSum(2, elastic.v1, 1, elastic.v2)).toBeCloseTo(before, 6);
    expect(kineticSum(2, soft.v1, 1, soft.v2)).toBeLessThan(before);
  });
});
