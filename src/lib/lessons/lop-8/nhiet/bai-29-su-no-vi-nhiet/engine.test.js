import { describe, expect, it } from 'vitest';
import {
  ALPHA,
  SUBSTANCES,
  bend,
  closingTemperature,
  contactClosed,
  railGap,
  railGrowth,
  volumeGain,
} from './engine.js';

describe('rails and their joint gap', () => {
  it('grows a 12,5 m steel rail by 0,15 mm per °C', () => {
    expect(railGrowth(21)).toBeCloseTo(0.15, 9);
    expect(railGrowth(50)).toBeCloseTo(4.5, 9);
    expect(railGrowth(0)).toBeCloseTo(-3, 9);
  });

  it('closes the 6 mm gap at 60 °C and opens it in the cold', () => {
    expect(railGap(20)).toBe(6);
    expect(railGap(60)).toBeCloseTo(0, 9);
    expect(railGap(-10)).toBeCloseTo(10.5, 9);
    expect(closingTemperature()).toBeCloseTo(60, 9);
    expect(railGap(30, 0)).toBeLessThan(0);
  });
});

describe('the copper–steel strip', () => {
  it('bends toward steel when hot and toward copper when cold', () => {
    expect(ALPHA.dong).toBeGreaterThan(ALPHA.thep);
    expect(bend(25)).toBe(0);
    expect(bend(125)).toBeCloseTo(500, 9);
    expect(bend(-15)).toBeCloseTo(-200, 9);
  });

  it('opens a thermostat contact above its set point', () => {
    expect(contactClosed(true, 100, 150)).toBe(true);
    expect(contactClosed(true, 150, 150)).toBe(false);
    expect(contactClosed(false, 145, 150)).toBe(false);
    expect(contactClosed(false, 140, 150)).toBe(true);
  });
});

describe('solids, liquids and gases', () => {
  it('reads the table for a 50 °C rise and scales it', () => {
    expect(volumeGain('khong-khi', 50)).toBe(183);
    expect(volumeGain('ruou', 25)).toBe(29);
    expect(volumeGain('sat', 100)).toBeCloseTo(3.6, 9);
    expect(volumeGain('khong-co', 10)).toBeNaN();
  });

  it('expands gases more than liquids, and liquids more than solids', () => {
    const most = (/** @type {string} */ st) =>
      Math.max(...SUBSTANCES.filter((s) => s.state === st).map((s) => s.per50));
    const least = (/** @type {string} */ st) =>
      Math.min(...SUBSTANCES.filter((s) => s.state === st).map((s) => s.per50));
    expect(least('khi')).toBeGreaterThan(most('long'));
    expect(least('long')).toBeGreaterThan(most('ran'));
  });
});
