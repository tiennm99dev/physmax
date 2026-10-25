import { describe, expect, it } from 'vitest';
import {
  criticalAngle,
  describeImage,
  principalRays,
  refractionAngle,
  thinLensImage,
} from './optics.js';

describe('refraction', () => {
  it('follows Snell from air into water and glass', () => {
    expect(refractionAngle(1, 1.5, 0)).toBe(0);
    expect(refractionAngle(1, 1.5, 30)).toBeCloseTo(19.47122063, 6);
    expect(refractionAngle(1, 1, 42)).toBe(42);
  });

  it('reflects totally past the critical angle', () => {
    expect(criticalAngle(1.5, 1)).toBeCloseTo(41.8103149, 6);
    expect(criticalAngle(1, 1.5)).toBeNull();
    expect(refractionAngle(1.5, 1, 41)).not.toBeNull();
    expect(refractionAngle(1.5, 1, 45)).toBeNull();
  });
});

describe('thin lens', () => {
  it('forms a real, inverted, equal image at d = 2f', () => {
    const img = thinLensImage(10, 20);
    expect(img).toEqual({
      distance: 20,
      magnification: -1,
      real: true,
      upright: false,
      atInfinity: false,
    });
    expect(describeImage(img)).toBe('Ảnh thật, ngược chiều, bằng vật');
  });

  it('forms a virtual, upright, larger image inside the focal length', () => {
    const img = thinLensImage(10, 5);
    expect(img.distance).toBe(-10);
    expect(img.magnification).toBe(2);
    expect(describeImage(img)).toBe('Ảnh ảo, cùng chiều, lớn hơn vật');
  });

  it('puts the image at infinity when the object is at the focus', () => {
    expect(thinLensImage(10, 10).atInfinity).toBe(true);
    expect(describeImage(thinLensImage(10, 10))).toMatch(/vô cực/);
  });

  it('always gives a smaller virtual upright image for a diverging lens', () => {
    for (const d of [3, 10, 25, 80]) {
      const img = thinLensImage(-10, d);
      expect(img.real).toBe(false);
      expect(img.upright).toBe(true);
      expect(Math.abs(img.magnification)).toBeLessThan(1);
    }
    expect(thinLensImage(-10, 10).distance).toBe(-5);
  });
});

describe('principal rays', () => {
  /**
   * Where two emergent rays (or their extensions) cross.
   * @param {{ x: number, y: number }[]} a @param {{ x: number, y: number }[]} b
   */
  const cross = (a, b) => {
    const [p, q] = a;
    const [r, s] = b;
    const m1 = (q.y - p.y) / (q.x - p.x);
    const m2 = (s.y - r.y) / (s.x - r.x);
    const x = (r.y - p.y + m1 * p.x - m2 * r.x) / (m1 - m2);
    return { x, y: p.y + m1 * (x - p.x) };
  };

  it('meet at the real image for a converging lens', () => {
    const rays = principalRays(10, 30, 4, 60);
    expect(rays).toHaveLength(3);
    const img = thinLensImage(10, 30);
    for (const [i, j] of [
      [0, 1],
      [1, 2],
    ]) {
      const c = cross(rays[i].emergent, rays[j].emergent);
      expect(c.x).toBeCloseTo(img.distance, 6);
      expect(c.y).toBeCloseTo(4 * img.magnification, 6);
    }
    expect(rays.every((r) => r.virtual.length === 0)).toBe(true);
  });

  it('extend backwards to a virtual image', () => {
    const rays = principalRays(10, 6, 2, 40);
    const img = thinLensImage(10, 6);
    const c = cross(rays[0].virtual, rays[1].virtual);
    expect(c.x).toBeCloseTo(img.distance, 6);
    expect(c.y).toBeCloseTo(2 * img.magnification, 6);
    expect(rays[2].virtual).toHaveLength(2);
  });

  it('drop the focal ray when the object sits at the focus', () => {
    expect(principalRays(10, 10, 3, 40)).toHaveLength(2);
  });
});
