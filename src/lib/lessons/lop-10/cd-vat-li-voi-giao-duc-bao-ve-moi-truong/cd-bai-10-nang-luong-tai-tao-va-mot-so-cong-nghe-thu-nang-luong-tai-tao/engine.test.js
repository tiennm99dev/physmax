import { describe, expect, it } from 'vitest';
import {
  CUT_IN,
  CUT_OUT,
  RATED_SPEED,
  hydroPower,
  powerCurve,
  ratedPower,
  solarDayKwh,
  solarPower,
  windPower,
  windRaw,
} from './engine.js';

describe('solar panel', () => {
  it('gives P = η G A', () => {
    expect(solarPower(1000, 2, 0.2)).toBe(400);
    expect(solarPower(800, 10, 0.16)).toBe(1280);
    expect(solarPower(0, 10, 0.2)).toBe(0);
  });

  it('gives the energy of a day of sunshine in kWh', () => {
    expect(solarDayKwh(10, 0.2, 4)).toBe(8);
    expect(solarDayKwh(1.5, 0.12, 5)).toBe(0.9);
  });
});

describe('wind turbine', () => {
  it('follows ½ ρ π R² v³ times the turbine share', () => {
    expect(windRaw(12, 40)).toBeCloseTo(663552 * Math.PI, 3);
    expect(windRaw(10, 30) / windRaw(5, 30)).toBeCloseTo(8, 9);
    expect(windRaw(10, 40) / windRaw(10, 20)).toBeCloseTo(4, 9);
  });

  it('stays still outside the working speeds', () => {
    expect(windPower(CUT_IN - 0.5, 40)).toBe(0);
    expect(windPower(CUT_OUT + 0.5, 40)).toBe(0);
    expect(windPower(CUT_IN, 40)).toBeGreaterThan(0);
  });

  it('is capped at the rated power', () => {
    expect(windPower(RATED_SPEED, 40)).toBeCloseTo(ratedPower(40), 6);
    expect(windPower(20, 40)).toBe(ratedPower(40));
    expect(windPower(8, 40)).toBeLessThan(ratedPower(40));
  });

  it('draws a curve that drops to 0 at the cut-out speed', () => {
    const curve = powerCurve(40, 30);
    expect(curve[0]).toEqual({ x: 0, y: 0 });
    expect(curve.at(-1)).toEqual({ x: 30, y: 0 });
    const atCutOut = curve.filter((p) => p.x === CUT_OUT).map((p) => p.y);
    expect(atCutOut).toEqual([ratedPower(40) / 1e6, 0]);
    expect(curve.some((p) => p.y > ratedPower(40) / 1e6 + 1e-9)).toBe(false);
  });
});

describe('hydropower', () => {
  it('gives P = η ρ g Q h', () => {
    expect(hydroPower(100, 50, 0.9)).toBe(44100000);
    expect(hydroPower(10, 20, 1)).toBe(1960000);
  });
});
