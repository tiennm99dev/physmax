import { describe, expect, it } from 'vitest';
import { add, clean, fromPolar, magnitude, scale, sum, toPolar } from './vector.js';

describe('vector', () => {
  it('converts between polar and components with y up', () => {
    expect(fromPolar(2, 0)).toEqual({ x: 2, y: 0 });
    expect(fromPolar(2, 90)).toEqual({ x: 0, y: 2 });
    expect(fromPolar(10, 30)).toEqual({ x: clean(5 * Math.sqrt(3)), y: 5 });
    expect(toPolar({ x: 0, y: -3 })).toEqual({ magnitude: 3, angle: 270 });
    expect(toPolar({ x: -1, y: 0 })).toEqual({ magnitude: 1, angle: 180 });
    expect(toPolar({ x: 0, y: 0 })).toEqual({ magnitude: 0, angle: 0 });
  });

  it('round-trips any direction', () => {
    for (let a = 0; a < 360; a += 15) {
      const back = toPolar(fromPolar(7, a));
      expect(back.magnitude).toBeCloseTo(7, 9);
      expect(back.angle).toBeCloseTo(a, 9);
    }
  });

  it('adds, sums and scales without float tails', () => {
    expect(add({ x: 0.1, y: 0.2 }, { x: 0.2, y: 0.1 })).toEqual({ x: 0.3, y: 0.3 });
    expect(sum([])).toEqual({ x: 0, y: 0 });
    expect(sum([fromPolar(3, 0), fromPolar(4, 90)])).toEqual({ x: 3, y: 4 });
    expect(magnitude({ x: 3, y: 4 })).toBe(5);
    expect(scale({ x: 1, y: -2 }, 1.5)).toEqual({ x: 1.5, y: -3 });
  });
});
