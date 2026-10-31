import { describe, expect, it } from 'vitest';
import { MEDIA, angleFromPointer, arcBetween, boundary, rayDir, reflectance } from './light.js';

describe('light at a boundary', () => {
  it('keeps sin i / sin r equal to n2 / n1', () => {
    const bad = [];
    for (const i of [10, 25, 40, 60, 80]) {
      const b = boundary(1, MEDIA.nuoc.n, i);
      if (Math.abs((b.ratio ?? 0) - 4 / 3) > 1e-9) bad.push(i);
    }
    expect(bad).toEqual([]);
    expect(boundary(1, 4 / 3, 30).refraction).toBeCloseTo(22.024, 3);
    expect(boundary(1, 1.5, 45).refraction).toBeCloseTo(28.126, 3);
    expect(boundary(1, 1.5, 0).ratio).toBeNull();
  });

  it('reflects totally past the critical angle', () => {
    const water = boundary(4 / 3, 1, 50);
    expect(water.total).toBe(true);
    expect(water.reflected).toBe(1);
    expect(water.critical).toBeCloseTo(48.59, 2);
    expect(boundary(4 / 3, 1, 30).refraction).toBeCloseTo(41.81, 2);
    expect(boundary(1.5, 1, 41).total).toBe(false);
  });

  it('reflects little at normal incidence and more near grazing', () => {
    expect(reflectance(1, 1.5, 0)).toBeCloseTo(0.04, 6);
    expect(reflectance(1, 1.5, 85)).toBeGreaterThan(0.5);
    expect(reflectance(1.5, 1, 41.5)).toBeGreaterThan(reflectance(1.5, 1, 20));
  });

  it('turns pointer positions into angles of incidence', () => {
    const at = { x: 100, y: 100 };
    expect(angleFromPointer(at, { x: 100, y: 50 }, 85)).toBe(0);
    expect(angleFromPointer(at, { x: 50, y: 50 }, 85)).toBeCloseTo(45, 9);
    expect(angleFromPointer(at, { x: 0, y: 110 }, 85)).toBe(85);
    expect(angleFromPointer(at, { x: 150, y: 50 }, 85)).toBe(0);
    const d = rayDir(30, true, false);
    expect(d.x).toBeCloseTo(-0.5, 9);
    expect(d.y).toBeCloseTo(-Math.sqrt(3) / 2, 9);
    expect(arcBetween({ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, 10)).toBe(
      'M 0.0 -10.0 A 10 10 0 0 0 -10.0 0.0',
    );
  });
});
