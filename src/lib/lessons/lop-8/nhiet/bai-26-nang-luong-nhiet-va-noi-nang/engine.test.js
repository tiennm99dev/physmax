import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  compare,
  dotCount,
  drop,
  kineticRatio,
  scatter,
  screenSpeed,
  spread,
  step,
  thermalEnergy,
} from './engine.js';

const box = { x0: 0, y0: 0, x1: 100, y1: 80 };

describe('molecules in a cup of water', () => {
  it('raises the mean kinetic energy with temperature', () => {
    expect(kineticRatio(0)).toBe(1);
    expect(kineticRatio(273)).toBe(2);
    expect(kineticRatio(80)).toBeGreaterThan(kineticRatio(20));
  });

  it('adds up the kinetic energy of every molecule, so mass counts too', () => {
    expect(thermalEnergy({ celsius: 0, grams: 100 })).toBe(1);
    expect(thermalEnergy({ celsius: 20, grams: 200 })).toBeCloseTo(
      2 * thermalEnergy({ celsius: 20, grams: 100 }),
      9,
    );
    expect(thermalEnergy({ celsius: 80, grams: 100 })).toBeGreaterThan(
      thermalEnergy({ celsius: 20, grams: 100 }),
    );
  });

  it('draws more molecules for more water and moves them faster when hot', () => {
    expect(dotCount(100)).toBe(14);
    expect(dotCount(200)).toBe(28);
    expect(screenSpeed(100)).toBeGreaterThan(3 * screenSpeed(0));
  });

  it('keeps every molecule inside the cup', () => {
    const rand = rng(7);
    let ps = scatter(rand, 30, box);
    for (let i = 0; i < 500; i++) ps = step(ps, 0.05, screenSpeed(100), rand, box);
    for (const p of ps) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(100);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(80);
    }
  });

  it('spreads a drop of ink faster in hot water', () => {
    /** @param {number} celsius */
    const after = (celsius) => {
      const rand = rng(3);
      let ink = drop(rand, 40, { x: 50, y: 40 }, 3);
      for (let i = 0; i < 40; i++) ink = step(ink, 0.05, screenSpeed(celsius), rand, box);
      return spread(ink);
    };
    expect(spread(drop(rng(1), 40, { x: 50, y: 40 }, 3))).toBeLessThan(3);
    expect(after(90)).toBeGreaterThan(after(10));
  });

  it('compares two cups as the book does', () => {
    expect(compare({ celsius: 80, grams: 100 }, { celsius: 20, grams: 100 })).toEqual({
      kinetic: 'A',
      internal: 'A',
    });
    expect(compare({ celsius: 50, grams: 100 }, { celsius: 50, grams: 200 })).toEqual({
      kinetic: 'bang',
      internal: 'B',
    });
    expect(compare({ celsius: 50, grams: 200 }, { celsius: 50, grams: 200 })).toEqual({
      kinetic: 'bang',
      internal: 'bang',
    });
    expect(compare({ celsius: 80, grams: 100 }, { celsius: 20, grams: 200 })).toEqual({
      kinetic: 'A',
      internal: 'chua-ro',
    });
    expect(compare({ celsius: 30, grams: 200 }, { celsius: 20, grams: 200 }).internal).toBe('A');
  });
});
