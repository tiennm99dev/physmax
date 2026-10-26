import { describe, expect, it } from 'vitest';
import { lineAtX, litFraction, meet, regionAt, seesSourcePoint, shadowShape } from './engine.js';

/** Source at x = 0, obstacle halfway, screen at x = 200. */
const scene = (/** @type {number} */ a) => ({
  sx: 0,
  sy: 100,
  a,
  ox: 100,
  oy: 100,
  b: 20,
  mx: 200,
});

describe('a point source (nguồn sáng hẹp)', () => {
  const sc = scene(0);

  it('casts a sharp shadow twice the obstacle at twice the distance', () => {
    expect(regionAt(sc, 100)).toBe('toi');
    expect(regionAt(sc, 139)).toBe('toi');
    expect(regionAt(sc, 141)).toBe('sang');
    const { umbraOnScreen, penumbra } = shadowShape(sc);
    expect(umbraOnScreen?.[0]).toBeCloseTo(60);
    expect(umbraOnScreen?.[1]).toBeCloseTo(140);
    expect(penumbra).toEqual([]);
  });

  it('has no penumbra anywhere on the screen', () => {
    for (let y = 0; y <= 200; y += 5) expect(regionAt(sc, y)).not.toBe('nua-toi');
  });
});

describe('a wide source (nguồn sáng rộng)', () => {
  const sc = scene(10);

  it('has an umbra in the middle and a penumbra around it', () => {
    expect(regionAt(sc, 100)).toBe('toi');
    expect(regionAt(sc, 145)).toBe('nua-toi');
    expect(regionAt(sc, 160)).toBe('sang');
  });

  it('puts the edges where the straight-line construction says', () => {
    const { umbraOnScreen, shadowOnScreen } = shadowShape(sc);
    // Source top (90) through obstacle top (80) reaches the screen at 70.
    expect(umbraOnScreen?.[0]).toBeCloseTo(70);
    expect(umbraOnScreen?.[1]).toBeCloseTo(130);
    // Source bottom (110) through obstacle top (80) reaches 50.
    expect(shadowOnScreen[0]).toBeCloseTo(50);
    expect(shadowOnScreen[1]).toBeCloseTo(150);
    expect(litFraction(sc, 50)).toBeCloseTo(1);
    expect(litFraction(sc, 70)).toBeCloseTo(0);
  });

  it('lets a penumbra point see only the far part of the source', () => {
    // From y = 60 the line to the source bottom (110) crosses the obstacle plane at 85.
    expect(seesSourcePoint(sc, 110, 60)).toBe(false);
    expect(seesSourcePoint(sc, 90, 60)).toBe(true);
  });

  it('lights the penumbra more toward its outer edge', () => {
    expect(litFraction(sc, 60)).toBeCloseTo(0.5);
    expect(litFraction(sc, 55)).toBeGreaterThan(litFraction(sc, 65));
  });

  it('loses the umbra when the source is wider than the obstacle and the screen is far', () => {
    const wide = scene(50);
    const { umbraOnScreen, umbra } = shadowShape(wide);
    expect(umbraOnScreen).toBeNull();
    expect(umbra).toHaveLength(3);
    expect(regionAt(wide, 100)).toBe('nua-toi');
  });
});

describe('line helpers', () => {
  it('extends a line to a given x', () => {
    expect(lineAtX({ x: 0, y: 0 }, { x: 1, y: 2 }, 3)).toEqual({ x: 3, y: 6 });
  });

  it('meets two lines, or not when parallel', () => {
    expect(meet({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 })).toEqual({
      x: 1,
      y: 1,
    });
    expect(meet({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 })).toBeNull();
  });
});
