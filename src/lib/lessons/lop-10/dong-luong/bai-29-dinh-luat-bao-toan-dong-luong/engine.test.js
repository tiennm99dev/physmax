import { describe, expect, it } from 'vitest';
import { CART, TRACK, endTime, meetTime, recoil, stateAt } from './engine.js';

const base = /** @type {const} */ ({ kind: 'dan-hoi', m1: 1, v1: 0.6, m2: 1, v2: 0 });

describe('meetTime', () => {
  it('finds the moment the carts touch', () => {
    expect(meetTime(base)).toBeCloseTo((1.2 - CART) / 0.6, 9);
    const t = /** @type {number} */ (meetTime(base));
    const s = stateAt(base, t);
    expect(s.x2 - s.x1).toBeCloseTo(CART, 9);
  });

  it('is null for carts that never catch each other', () => {
    expect(meetTime({ ...base, v1: 0.2, v2: 0.5 })).toBeNull();
    expect(meetTime({ ...base, v1: 0, v2: 0 })).toBeNull();
  });

  it('is null when the carts would touch past the end of the track', () => {
    expect(meetTime({ ...base, v1: 0.5, v2: 0.45 })).toBeNull();
  });
});

describe('stateAt', () => {
  it('changes the velocities at the collision', () => {
    const t = /** @type {number} */ (meetTime(base));
    expect(stateAt(base, t + 0.5)).toMatchObject({ v1: 0, v2: 0.6, collided: true });
  });

  it('keeps stuck carts touching', () => {
    const s = { ...base, kind: /** @type {const} */ ('mem') };
    const t = /** @type {number} */ (meetTime(s));
    const later = stateAt(s, t + 1);
    expect(later.x2 - later.x1).toBeCloseTo(CART, 9);
    expect(later.v1).toBe(0.3);
  });
});

describe('endTime', () => {
  it('keeps every cart on the track', () => {
    const setups = [
      base,
      { ...base, m1: 1, m2: 0.2 },
      { ...base, v1: 1, v2: -1 },
      { ...base, kind: /** @type {const} */ ('mem'), v1: 0.5, v2: -0.5 },
    ];
    const bad = setups.filter((s) => {
      const end = stateAt(s, endTime(s));
      return end.x1 < CART / 2 - 1e-9 || end.x2 > TRACK - CART / 2 + 1e-9;
    });
    expect(bad).toEqual([]);
  });

  it('ends a moment after the collision when the carts stop dead', () => {
    const s = { ...base, kind: /** @type {const} */ ('mem'), v1: 0.5, v2: -0.5 };
    expect(endTime(s)).toBeCloseTo(/** @type {number} */ (meetTime(s)) + 3, 9);
  });
});

describe('recoil', () => {
  it('follows conservation of momentum from rest', () => {
    expect(recoil(4, 0.02, 500)).toBe(-2.5);
    expect(recoil(900, 100, 1800)).toBe(-200);
  });
});
