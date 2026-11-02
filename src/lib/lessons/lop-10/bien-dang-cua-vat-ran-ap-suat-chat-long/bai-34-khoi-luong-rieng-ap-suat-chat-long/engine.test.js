import { describe, expect, it } from 'vitest';
import { material } from '#lib/domain/materials.js';
import {
  G,
  GOAL,
  LOADS,
  MAX_DEPTH,
  PA,
  TANK_LIQUIDS,
  columnPressure,
  halfWidth,
  keepInside,
  outputForce,
  outputStroke,
  pistonPressure,
  press,
  pressureAt,
} from './engine.js';

describe('pressure in a liquid', () => {
  it('matches the 20 cm water difference of the book', () => {
    expect(columnPressure(1000, 0.2)).toBeCloseTo(1960, 6);
  });

  it('equals the atmosphere at the surface and grows evenly with depth', () => {
    expect(pressureAt(1000, 0)).toBe(PA);
    expect(pressureAt(1000, 5)).toBeCloseTo(150300, 6);
    expect(pressureAt(800, 3) - pressureAt(800, 1)).toBeCloseTo(800 * G * 2, 6);
  });

  it('adds nearly one atmosphere for each ten metres of water', () => {
    expect(columnPressure(1000, 10) / PA).toBeCloseTo(0.967, 3);
  });

  it('offers the densest liquid with room left on the graph', () => {
    const densest = Math.max(...TANK_LIQUIDS.map((l) => l.density));
    expect(densest).toBe(material('nuoc-muoi').density);
    expect(pressureAt(densest, MAX_DEPTH)).toBeLessThan(250000);
  });
});

describe('the tank', () => {
  it('keeps the sensor inside both shapes at every depth', () => {
    const bad = [];
    for (const shape of /** @type {const} */ (['thang', 'loe'])) {
      for (let depth = 0; depth <= MAX_DEPTH; depth += 1) {
        const x = keepInside(shape, depth, 500);
        if (x <= 0 || x >= halfWidth(shape, depth)) bad.push({ shape, depth, x });
      }
    }
    expect(bad).toEqual([]);
  });

  it('narrows only the flared tank', () => {
    expect(halfWidth('thang', 10)).toBe(120);
    expect(halfWidth('loe', 10)).toBe(30);
  });
});

describe('the hydraulic press', () => {
  it('multiplies the force by the ratio of the areas', () => {
    expect(outputForce(250, 10, 400)).toBe(10000);
  });

  it('turns 300 N on 10 cm² into the pressure 300 000 Pa', () => {
    expect(pistonPressure(300, 10)).toBeCloseTo(300000, 6);
  });

  it('gives back the same work on both pistons', () => {
    const inWork = 300 * 20;
    expect(outputForce(300, 10, 500) * outputStroke(20, 10, 500)).toBeCloseTo(inWork, 9);
  });

  it('lifts the car only when the output reaches its weight', () => {
    const car = LOADS.find((l) => l.id === 'o-to')?.mass ?? 0;
    expect(press(300, 10, 500, car).lifts).toBe(true);
    expect(press(250, 10, 500, car).lifts).toBe(false);
    expect(press(300, 10, 500, car).presses).toBe(13);
  });

  it('can lift every load with some setting and fail with another', () => {
    const bad = LOADS.filter(
      (l) => !press(500, 5, 1000, l.mass).lifts || press(100, 20, 200, l.mass).lifts,
    );
    expect(bad).toEqual([]);
  });

  it('counts the presses so that they reach the goal', () => {
    const { rise, presses } = press(400, 5, 200, 120);
    expect(rise * presses).toBeGreaterThanOrEqual(GOAL);
    expect(rise * (presses - 1)).toBeLessThan(GOAL);
  });
});
