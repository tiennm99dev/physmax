import { describe, expect, it } from 'vitest';
import { KMH_PER_MS, closeEnough, speed, toKmh, toMs } from './speed.js';

describe('speed', () => {
  it('divides distance by time', () => {
    expect(speed(100, 20)).toBe(5);
    expect(speed(180, 3)).toBe(60);
    expect(speed(5, 0)).toBeNaN();
  });

  it('converts between m/s and km/h', () => {
    expect(KMH_PER_MS).toBe(3.6);
    expect(toKmh(10)).toBeCloseTo(36);
    expect(toMs(72)).toBeCloseTo(20);
    expect(toKmh(toMs(54))).toBeCloseTo(54);
  });

  it('accepts a speed rounded to two decimals', () => {
    expect(closeEnough(14.29, 5 / 0.35)).toBe(true);
    expect(closeEnough(14.2, 5 / 0.35)).toBe(true);
    expect(closeEnough(13.5, 5 / 0.35)).toBe(false);
    expect(closeEnough(0.33, 1 / 3)).toBe(true);
    expect(closeEnough(NaN, 1)).toBe(false);
  });
});
