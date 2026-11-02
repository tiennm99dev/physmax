import { describe, expect, it } from 'vitest';
import {
  BREAK_FORCE,
  EGG_MASS,
  SURFACES,
  bounce,
  catchEgg,
  fallProgress,
  fallSpeed,
} from './engine.js';

describe('the egg', () => {
  it('reaches the speed of a free fall', () => {
    expect(fallSpeed(1.25)).toBeCloseTo(4.95, 2);
  });

  it('gets the same momentum change whatever stops it', () => {
    const changes = SURFACES.map((s) => catchEgg(1.25, s.value).momentum);
    expect(new Set(changes).size).toBe(1);
    expect(changes[0]).toBeCloseTo(EGG_MASS * fallSpeed(1.25), 9);
  });

  it('feels a smaller force over a longer stop', () => {
    const forces = SURFACES.map((s) => catchEgg(1.25, s.value).force);
    expect(forces[0]).toBeCloseTo(74.25, 2);
    expect(forces[2]).toBeCloseTo(14.85, 2);
    expect(forces).toEqual([...forces].sort((a, b) => b - a));
  });

  it('breaks on a hard floor and survives a soft stop at every height offered', () => {
    const heights = [0.5, 1, 1.5, 2];
    const bad = heights.filter(
      (h) =>
        !catchEgg(h, 4).broken || catchEgg(h, 40).broken || catchEgg(h, 20).force > BREAK_FORCE,
    );
    expect(bad).toEqual([]);
  });

  it('falls from the top to the floor', () => {
    expect(fallProgress(1, 0)).toBe(0);
    expect(fallProgress(1, 10)).toBe(1);
    expect(fallProgress(1.6, Math.sqrt((2 * 1.6) / 9.8) / 2)).toBeCloseTo(0.25, 9);
  });
});

describe('the ball on a wall', () => {
  it('changes its momentum by the sum of the two sizes when it bounces back', () => {
    const r = bounce(0.4, 10, 8, 20);
    expect(r.p1).toBe(4);
    expect(r.p2).toBe(-3.2);
    expect(r.change).toBe(-7.2);
    expect(r.force).toBe(-360);
  });

  it('changes it by one size when it stops dead', () => {
    expect(bounce(0.5, 10, 0, 50).change).toBe(-5);
    expect(bounce(0.5, 10, 0, 50).force).toBe(-100);
  });
});
