import { describe, expect, it } from 'vitest';
import { convert, equilibriumTemperature, heat, scaleTicks } from './temperature.js';

describe('temperature engine', () => {
  it('converts the fixed points of water', () => {
    expect(convert(0, 'C', 'F')).toBe(32);
    expect(convert(100, 'C', 'F')).toBe(212);
    expect(convert(100, 'C', 'K')).toBe(373.15);
    expect(convert(100, 'C', 'K', { exactKelvin: false })).toBe(373);
    expect(convert(98.6, 'F', 'C')).toBe(37);
    expect(convert(0, 'K', 'C')).toBe(-273.15);
    expect(convert(-40, 'F', 'C')).toBe(-40);
  });

  it('round-trips between every pair of scales', () => {
    const scales = /** @type {const} */ (['C', 'F', 'K']);
    for (const a of scales) {
      for (const b of scales) expect(convert(convert(25, a, b), b, a)).toBeCloseTo(25, 9);
    }
  });

  it('mixes hot and cold water to the weighted mean', () => {
    const water = 4200;
    expect(
      equilibriumTemperature([
        { mass: 1, specificHeat: water, temperature: 80 },
        { mass: 3, specificHeat: water, temperature: 20 },
      ]),
    ).toBe(35);
    expect(equilibriumTemperature([])).toBeNaN();
  });

  it('computes Q = m·c·Δt', () => {
    expect(heat(2, 4200, 10)).toBe(84000);
  });

  it('marks major and minor ticks', () => {
    const ticks = scaleTicks(-10, 10, 10, 5);
    expect(ticks).toEqual([
      { value: -10, major: true },
      { value: -5, major: false },
      { value: 0, major: true },
      { value: 5, major: false },
      { value: 10, major: true },
    ]);
    expect(scaleTicks(0, 1, 0.5, 0.1)).toHaveLength(11);
  });
});
