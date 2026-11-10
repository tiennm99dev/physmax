import { describe, expect, it } from 'vitest';
import {
  brightness,
  classify,
  countMaxima,
  countMinima,
  fringeSpacing,
  pathDifference,
  relativeAmplitude,
  surfaceAt,
} from './engine.js';

describe('two-source interference on water', () => {
  it('measures the path difference from each source', () => {
    const r = pathDifference({ x: 0, y: 4 }, 6);
    expect(r).toEqual({ d1: 5, d2: 5, delta: 0 });
    expect(pathDifference({ x: 3, y: 4 }, 6)).toMatchObject({ d1: 7.211102551, d2: 4 });
  });

  it('doubles the amplitude on a maximum and cancels on a minimum', () => {
    expect(relativeAmplitude(4, 2)).toBe(2);
    expect(relativeAmplitude(3, 2)).toBe(0);
    expect(Math.abs(surfaceAt({ x: 0.5, y: 0 }, 4, 2, 0.3))).toBeLessThan(1e-9);
  });

  it('names maxima and minima from the book example', () => {
    // f = 20 Hz, v = 40 cm/s: λ = 2 cm.
    expect(classify(22 - 16, 2)).toMatchObject({ kind: 'max', k: 3 });
    expect(classify(15 - 10, 2)).toMatchObject({ kind: 'min', k: 2 });
    expect(classify(-3, 2)).toMatchObject({ kind: 'min', k: -2 });
    expect(classify(1.4, 2).kind).toBe('between');
  });

  it('counts maxima and minima between the sources', () => {
    expect(countMaxima(9, 2)).toBe(9);
    expect(countMaxima(10, 3)).toBe(7);
    expect(countMaxima(8, 2)).toBe(7);
    expect(countMinima(9, 2)).toBe(8);
    expect(countMinima(10, 3)).toBe(6);
    expect(countMinima(8, 2)).toBe(8);
  });
});

describe("Young's double slit", () => {
  it('gives the fringe spacing i = λD/a', () => {
    expect(fringeSpacing(0.6, 2, 1)).toBe(1.2);
    expect(fringeSpacing(0.5, 1.5, 0.5)).toBe(1.5);
  });

  it('is bright on k·i and dark half way between', () => {
    expect(brightness(3.6, 1.2)).toBeCloseTo(1, 9);
    expect(brightness(3, 1.2)).toBeCloseTo(0, 9);
  });
});
