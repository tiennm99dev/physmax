import { describe, expect, it } from 'vitest';
import { anglesAt, distanceToMirror, imageOf, mirrorHit, seesImage } from './engine.js';

const MX = 100;

describe('image in a plane mirror', () => {
  it('is symmetric to the object about the mirror', () => {
    expect(imageOf({ x: 60, y: 30 }, MX)).toEqual({ x: 140, y: 30 });
    const p = { x: 25, y: 70 };
    expect(distanceToMirror(imageOf(p, MX), MX)).toBe(distanceToMirror(p, MX));
  });

  it('keeps the size of the object', () => {
    const a = { x: 40, y: 80 };
    const b = { x: 60, y: 20 };
    const a2 = imageOf(a, MX);
    const b2 = imageOf(b, MX);
    expect(Math.hypot(b2.x - a2.x, b2.y - a2.y)).toBeCloseTo(Math.hypot(b.x - a.x, b.y - a.y));
  });
});

describe('rays to the eye', () => {
  const p = { x: 60, y: 40 };
  const e = { x: 20, y: 120 };

  it('reflect at the point that obeys the law of reflection', () => {
    const k = mirrorHit(p, e, MX);
    expect(k).not.toBeNull();
    if (!k) return;
    expect(k.x).toBe(MX);
    // Eye 80 from the mirror, image 40 behind it: k divides the drop 80 in 2:1.
    expect(k.y).toBeCloseTo(120 - (80 * 80) / 120);
    const { incidence, reflection } = anglesAt(p, k, e);
    expect(incidence).toBeCloseTo(reflection);
  });

  it('needs the reflection point on the mirror itself', () => {
    expect(seesImage(p, e, MX, 0, 200)).toBe(true);
    expect(seesImage(p, e, MX, 0, 50)).toBe(false);
  });

  it('has no reflection for points behind the mirror', () => {
    expect(mirrorHit({ x: 120, y: 40 }, e, MX)).toBeNull();
  });
});
