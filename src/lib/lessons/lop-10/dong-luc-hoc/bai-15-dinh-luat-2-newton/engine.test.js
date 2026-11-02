import { describe, expect, it } from 'vitest';
import {
  FORCES,
  MASSES,
  forceSeries,
  massSeries,
  measure,
  record,
  slopeThroughOrigin,
  travelTime,
} from './engine.js';

describe('a measured run', () => {
  it('takes the time set by a = F/m', () => {
    expect(travelTime(2, 1)).toBeCloseTo(1, 9);
    expect(travelTime(4, 0.5)).toBeCloseTo(Math.sqrt(0.25), 9);
  });

  it('reads an acceleration close to F/m for every setting', () => {
    const off = [];
    for (const force of FORCES) {
      for (const mass of MASSES) {
        const { acceleration } = measure(force, mass);
        if (Math.abs(acceleration - force / mass) > 0.02 * (force / mass) + 0.01) {
          off.push([force, mass, acceleration]);
        }
      }
    }
    expect(off).toEqual([]);
  });

  it('replaces a repeated run instead of adding a point', () => {
    const once = record([], measure(2, 1));
    const twice = record(once, measure(2, 1));
    expect(twice).toHaveLength(1);
    expect(record(twice, measure(3, 1))).toHaveLength(2);
  });
});

describe('the graphs drawn from the data', () => {
  const readings = FORCES.flatMap((f) => MASSES.map((m) => measure(f, m)));

  it('gives a against F a slope of about 1/m', () => {
    const slope = slopeThroughOrigin(forceSeries(readings, 2));
    expect(slope).toBeCloseTo(0.5, 1);
  });

  it('gives a against 1/m a slope of about F', () => {
    const slope = slopeThroughOrigin(massSeries(readings, 3));
    expect(slope).toBeCloseTo(3, 1);
  });

  it('keeps only the chosen mass or force, in order', () => {
    expect(forceSeries(readings, 1).map((p) => p.x)).toEqual(FORCES);
    expect(massSeries(readings, 1).map((p) => p.x)).toEqual([0.4, 0.5, 0.667, 1, 2]);
  });

  it('has no slope without data', () => {
    expect(slopeThroughOrigin([])).toBeNull();
  });
});
