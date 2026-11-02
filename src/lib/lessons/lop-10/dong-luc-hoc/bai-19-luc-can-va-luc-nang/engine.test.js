import { describe, expect, it } from 'vitest';
import {
  DRAG_FACTOR,
  G,
  STALL,
  airForces,
  fallSpeed,
  streamline,
  terminalSpeed,
  wingCoefficients,
} from './engine.js';

describe('the wind tunnel', () => {
  it('quadruples the drag when the wind doubles', () => {
    const slow = airForces('cau', 10, 0).drag;
    expect(airForces('cau', 20, 0).drag).toBeCloseTo(slow * 4, 9);
  });

  it('shows no force with no wind', () => {
    expect(airForces('canh', 0, 10)).toEqual({ drag: 0, lift: 0 });
  });

  it('ranks the shapes from blunt to streamlined', () => {
    const drag = ['tam', 'cau', 'giot'].map((s) => airForces(s, 30, 0).drag);
    expect(drag[0]).toBeGreaterThan(drag[1]);
    expect(drag[1]).toBeGreaterThan(drag[2]);
  });

  it('gives lift only to the wing', () => {
    expect(airForces('tam', 30, 10).lift).toBe(0);
    expect(airForces('canh', 30, 10).lift).toBeGreaterThan(airForces('canh', 30, 10).drag);
  });

  it('loses lift past the stall while drag keeps growing', () => {
    expect(wingCoefficients(STALL + 5).lift).toBeLessThan(wingCoefficients(STALL).lift);
    expect(wingCoefficients(STALL + 5).drag).toBeGreaterThan(wingCoefficients(STALL).drag);
  });

  it('bends a streamline around the shape and leaves it straight far away', () => {
    const line = streamline('tam', 60, 180, 120, 360, 0);
    expect(line[0].y).toBeCloseTo(60, 3);
    expect(line[15].y).toBeLessThan(55);
  });
});

describe('falling through air', () => {
  it('balances the weight at the greatest speed', () => {
    const top = terminalSpeed(80, DRAG_FACTOR.open);
    expect(DRAG_FACTOR.open * top * top).toBeCloseTo(80 * G, 9);
  });

  it('starts at rest like free fall and levels off', () => {
    const k = DRAG_FACTOR.shut;
    expect(fallSpeed(70, k, 0)).toBe(0);
    expect(fallSpeed(70, k, 0.1)).toBeCloseTo(0.98, 2);
    expect(fallSpeed(70, k, 60)).toBeCloseTo(terminalSpeed(70, k), 3);
  });

  it('falls far more slowly with the parachute open', () => {
    expect(terminalSpeed(70, DRAG_FACTOR.open)).toBeCloseTo(5.24, 2);
    expect(terminalSpeed(70, DRAG_FACTOR.shut)).toBeCloseTo(52.4, 1);
  });
});
