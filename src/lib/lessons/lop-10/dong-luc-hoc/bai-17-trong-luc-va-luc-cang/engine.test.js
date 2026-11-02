import { describe, expect, it } from 'vitest';
import { centroid, hangAngle, isInside, placed, tensions, weightOf } from './engine.js';

const L_SHAPE = [
  { x: 0, y: 0 },
  { x: 120, y: 0 },
  { x: 120, y: 40 },
  { x: 40, y: 40 },
  { x: 40, y: 120 },
  { x: 0, y: 120 },
];

describe('weight', () => {
  it('is mass times g', () => {
    expect(weightOf(50)).toBe(490);
    expect(weightOf(2.5)).toBe(24.5);
  });
});

describe('tension in two ropes', () => {
  it('shares a symmetric load as P/(2 cos α)', () => {
    const { t1, t2 } = tensions(29.4, 30, 30);
    expect(t1).toBeCloseTo(t2, 9);
    expect(t1).toBeCloseTo(16.97, 2);
  });

  it('equals the weight at 60 degrees each side', () => {
    expect(tensions(49, 60, 60).t1).toBeCloseTo(49, 9);
  });

  it('splits two vertical ropes evenly', () => {
    expect(tensions(40, 0, 0)).toEqual({ t1: 20, t2: 20 });
  });

  it('solves the lopsided exercise', () => {
    const { t1, t2 } = tensions(49, 30, 60);
    expect(t1).toBeCloseTo(42.44, 2);
    expect(t2).toBeCloseTo(24.5, 9);
  });

  it('balances the weight both ways', () => {
    const P = 60;
    const { t1, t2 } = tensions(P, 25, 70);
    const r = Math.PI / 180;
    expect(t1 * Math.sin(25 * r)).toBeCloseTo(t2 * Math.sin(70 * r), 6);
    expect(t1 * Math.cos(25 * r) + t2 * Math.cos(70 * r)).toBeCloseTo(P, 6);
  });
});

describe('the balance point of a plate', () => {
  it('finds the centre of a rectangle', () => {
    expect(
      centroid([
        { x: 0, y: 0 },
        { x: 80, y: 0 },
        { x: 80, y: 60 },
        { x: 0, y: 60 },
      ]),
    ).toEqual({ x: 40, y: 30 });
  });

  it('finds the meeting point of the medians of a triangle', () => {
    expect(
      centroid([
        { x: 0, y: 0 },
        { x: 90, y: 0 },
        { x: 0, y: 60 },
      ]),
    ).toEqual({ x: 30, y: 20 });
  });

  it('puts the centre of an L-shape outside its material', () => {
    const g = centroid(L_SHAPE);
    expect(g).toEqual({ x: 44, y: 44 });
    expect(isInside(g, L_SHAPE)).toBe(false);
    expect(isInside({ x: 20, y: 20 }, L_SHAPE)).toBe(true);
  });

  it('hangs the centre straight below the pin from any hole', () => {
    const g = centroid(L_SHAPE);
    const pin = { x: 180, y: 40 };
    const off = [];
    for (const hole of L_SHAPE) {
      const down = placed(g, hole, pin, hangAngle(hole, g));
      if (Math.abs(down.x - pin.x) > 1e-6 || down.y <= pin.y) off.push(hole);
    }
    expect(off).toEqual([]);
  });
});
