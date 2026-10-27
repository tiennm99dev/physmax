import { describe, expect, it } from 'vitest';
import {
  POWER,
  energyFor,
  energyIn,
  increments,
  joulesPerDegree,
  slope,
  temperatureAfter,
} from './engine.js';

describe('heating water on the joulemeter bench', () => {
  it('needs 470 J per degree for 100 g and 890 J for 200 g', () => {
    expect(joulesPerDegree(100)).toBe(470);
    expect(joulesPerDegree(200)).toBe(890);
  });

  it('warms the water in proportion to the energy', () => {
    expect(energyFor(3, 100)).toBe(1410);
    expect(energyFor(6, 100)).toBe(2820);
    expect(energyFor(9, 100)).toBe(4230);
    expect(temperatureAfter(1410, 100)).toBe(28);
    expect(temperatureAfter(energyFor(9, 200), 200, 30)).toBe(39);
  });

  it('counts the energy the wire receives', () => {
    expect(POWER).toBe(24);
    expect(energyIn(60)).toBe(1440);
    expect(energyIn(10, 30)).toBe(300);
  });

  it('measures rises and energies from the first row of the table', () => {
    const rows = [
      { celsius: 25, joules: 120 },
      { celsius: 28, joules: 1530 },
      { celsius: 31, joules: 2940 },
    ];
    expect(increments(rows)).toEqual([
      { rise: 0, energy: 0 },
      { rise: 3, energy: 1410 },
      { rise: 6, energy: 2820 },
    ]);
    expect(slope(increments(rows))).toBe(470);
    expect(increments([])).toEqual([]);
    expect(slope([{ rise: 0, energy: 0 }])).toBeNaN();
  });
});
