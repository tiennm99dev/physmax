import { describe, expect, it } from 'vitest';
import {
  fullOscillations,
  isHarmonic,
  isPeriodic,
  pathLength,
  positionAt,
  triangle,
} from './engine.js';

describe('the three motions', () => {
  it('all start at x = A', () => {
    for (const mode of /** @type {const} */ (['dieu-hoa', 'tuan-hoan', 'tat-dan'])) {
      expect(positionAt(mode, 5, 1, 0)).toBeCloseTo(5, 9);
    }
  });

  it('repeat after one period only when periodic', () => {
    expect(positionAt('dieu-hoa', 5, 0.8, 0.3 + 0.8)).toBeCloseTo(
      positionAt('dieu-hoa', 5, 0.8, 0.3),
      9,
    );
    expect(positionAt('tuan-hoan', 5, 0.8, 0.3 + 0.8)).toBeCloseTo(
      positionAt('tuan-hoan', 5, 0.8, 0.3),
      9,
    );
    expect(positionAt('tat-dan', 5, 0.8, 0.8)).toBeLessThan(5);
    expect(isPeriodic('tat-dan')).toBe(false);
    expect(isHarmonic('tuan-hoan')).toBe(false);
  });

  it('reach the other end at half a period', () => {
    expect(positionAt('dieu-hoa', 4, 2, 1)).toBeCloseTo(-4, 9);
    expect(triangle(0.5)).toBeCloseTo(-1, 9);
    expect(triangle(0.25)).toBeCloseTo(0, 9);
  });
});

describe('counting', () => {
  it('counts full oscillations', () => {
    expect(fullOscillations(1.99, 1)).toBe(1);
    expect(fullOscillations(2, 1)).toBe(2);
  });

  it('covers 4A in each period', () => {
    expect(pathLength('dieu-hoa', 3, 1, 2)).toBeCloseTo(24, 9);
    expect(pathLength('dieu-hoa', 3, 1, 0.5)).toBeCloseTo(6, 9);
    expect(pathLength('dieu-hoa', 3, 1, 0.75)).toBeCloseTo(9, 9);
    expect(pathLength('tuan-hoan', 3, 1, 1.25)).toBeCloseTo(15, 9);
  });
});
