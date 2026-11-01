import { describe, expect, it } from 'vitest';
import {
  BALLS,
  INSTRUMENTS,
  analyze,
  covers,
  reading,
  resultChoices,
  resultLine,
  roundTo,
} from './engine.js';

const [ruler, caliper, micrometer] = INSTRUMENTS;
const SAMPLE = [15.85, 15.9, 15.85, 15.8, 15.9];

describe('roundTo', () => {
  it('rounds half up without binary noise', () => {
    expect(roundTo(0.005, 2)).toBe(0.01);
    expect(roundTo(0.025, 2)).toBe(0.03);
    expect(roundTo(0.057, 2)).toBe(0.06);
    expect(roundTo(0.5, 0)).toBe(1);
    expect(roundTo(15.86, 2)).toBe(15.86);
  });
});

describe('analyze', () => {
  it('reproduces the worked example of the lesson', () => {
    const stats = analyze(SAMPLE, caliper);
    expect(stats.mean).toBe(15.86);
    expect(stats.deviations).toEqual([0.01, 0.04, 0.01, 0.06, 0.04]);
    expect(stats.meanDeviation).toBe(0.032);
    expect(stats.toolError).toBe(0.025);
    expect(stats.rawError).toBe(0.057);
    expect(stats.error).toBe(0.06);
    expect(stats.relative).toBeCloseTo(0.378, 3);
    expect(resultLine(stats, caliper)).toBe('d = 15,86 ± 0,06 mm');
  });

  it('writes a ruler result in whole millimetres', () => {
    const stats = analyze([16, 15, 16, 16], ruler);
    expect(resultLine(stats, ruler)).toBe('d = 16 ± 1 mm');
  });
});

describe('reading', () => {
  it('repeats for a draw and stays on the scale, near the true value', () => {
    expect(reading(3, BALLS[0], caliper, false)).toBe(reading(3, BALLS[0], caliper, false));
    const bad = [];
    for (const instrument of INSTRUMENTS) {
      for (let draw = 1; draw <= 200; draw += 1) {
        const r = reading(draw, BALLS[0], instrument, false);
        const divisions = r / instrument.step;
        const onScale = Math.abs(divisions - Math.round(divisions)) < 1e-6;
        const near = Math.abs(r - BALLS[0]) <= instrument.spread + instrument.step / 2 + 1e-9;
        if (!onScale || !near) bad.push([instrument.id, draw, r]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('random and systematic errors', () => {
  /** @param {typeof caliper} instrument @param {number} diameter @param {number} start @param {boolean} shifted */
  const statsOf = (instrument, diameter, start, shifted) =>
    analyze(
      Array.from({ length: 5 }, (_, i) => reading(start + i, diameter, instrument, shifted)),
      instrument,
    );

  it('the band of five readings holds the true value with a good zero mark', () => {
    const bad = [];
    for (const instrument of INSTRUMENTS) {
      for (const diameter of BALLS) {
        for (let start = 1; start <= 100; start += 5) {
          if (!covers(statsOf(instrument, diameter, start, false), diameter)) {
            bad.push([instrument.id, diameter, start]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('a zero error pushes the true value out of the band, however often one measures', () => {
    const bad = [];
    for (const instrument of INSTRUMENTS) {
      for (const diameter of BALLS) {
        for (let start = 1; start <= 100; start += 5) {
          if (covers(statsOf(instrument, diameter, start, true), diameter)) {
            bad.push([instrument.id, diameter, start]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('resultChoices', () => {
  it('holds the correct line once, among distinct lines, at a moving position', () => {
    const positions = new Set();
    for (let n = 3; n <= 6; n += 1) {
      const readings = Array.from({ length: n }, (_, i) =>
        reading(i + 1, BALLS[0], micrometer, false),
      );
      const stats = analyze(readings, micrometer);
      const { options, answer } = resultChoices(stats, micrometer);
      expect(options[answer]).toBe(resultLine(stats, micrometer));
      expect(new Set(options).size).toBe(options.length);
      expect(options.length).toBeGreaterThanOrEqual(3);
      positions.add(answer);
    }
    expect(positions.size).toBeGreaterThan(1);
  });
});
