import { describe, expect, it } from 'vitest';
import { LENSES, MAX_BLUR, focalLength, magnifierView, sharpRange } from './engine.js';

describe('magnifying glass', () => {
  it('derives the focal length from the printed magnification', () => {
    expect(focalLength(5)).toBe(5);
    expect(focalLength(10)).toBe(2.5);
    expect(focalLength(3)).toBeCloseTo(8.333, 3);
  });

  it('is sharp only between the 25 cm image and the focal length', () => {
    const { near, far } = sharpRange(5);
    expect(near).toBeCloseTo(125 / 30, 9);
    expect(far).toBe(5);
    expect(magnifierView(4.5, 5).zone).toBe('ro-net');
    expect(magnifierView(5, 5).zone).toBe('ro-net');
    expect(magnifierView(4.5, 5).blur).toBe(0);
    expect(magnifierView(2, 5).zone).toBe('qua-gan');
    expect(magnifierView(7, 5).zone).toBe('qua-xa');
  });

  it('enlarges more as the lens moves away from the object, up to G + 1', () => {
    expect(magnifierView(0, 5).scale).toBe(1);
    const a = magnifierView(2, 5).scale;
    const b = magnifierView(4, 5).scale;
    expect(a).toBeCloseTo(5 / 3, 9);
    expect(b).toBeGreaterThan(a);
    expect(magnifierView(4.9, 5).scale).toBe(6);
  });

  it('blurs more the farther the lens is from the sharp range, within the limit', () => {
    expect(magnifierView(1, 5).blur).toBeGreaterThan(magnifierView(3, 5).blur);
    expect(magnifierView(9, 5).blur).toBeGreaterThan(magnifierView(5.5, 5).blur);
    for (const g of LENSES) {
      for (let d = 0; d <= 2 * focalLength(g); d += 0.1) {
        const v = magnifierView(d, g);
        expect(v.blur).toBeGreaterThanOrEqual(0);
        expect(v.blur).toBeLessThanOrEqual(MAX_BLUR);
      }
    }
  });

  it('leaves a sharp position reachable in 1 mm steps for every lens', () => {
    for (const g of LENSES) {
      const hits = Array.from({ length: 200 }, (_, i) => i / 10).filter(
        (d) => magnifierView(d, g).zone === 'ro-net',
      );
      expect(hits.length, `${g}x`).toBeGreaterThan(1);
    }
  });
});
