import { describe, expect, it } from 'vitest';
import {
  BALL,
  CALIPER_ERROR,
  RULER_ERROR,
  analyze,
  clampE,
  clampF,
  compareNote,
  distanceAt,
  idealTime,
  lengthOf,
  reading,
  timeAt,
} from './engine.js';

describe('analyze', () => {
  it('reproduces the average speed example', () => {
    const r = analyze([0.777, 0.78, 0.776], 0.5, RULER_ERROR);
    expect(r.mean).toBe(0.778);
    expect(r.speed).toBe(0.643);
    expect(r.speedError).toBe(0.002);
  });

  it('reproduces the instantaneous speed example', () => {
    const r = analyze([0.033, 0.032, 0.031], BALL, CALIPER_ERROR);
    expect(r.mean).toBe(0.032);
    expect(r.speed).toBe(0.625);
    expect(r.speedError).toBe(0.023);
  });
});

describe('the ball on the track', () => {
  it('is consistent between time and distance', () => {
    expect(distanceAt(timeAt(0.5, 6), 6)).toBeCloseTo(0.5, 9);
    expect(distanceAt(100, 6)).toBe(1);
  });

  it('blocks a later gate for a shorter time', () => {
    expect(idealTime('B', 0.2, 0.7, 6)).toBeLessThan(idealTime('A', 0.2, 0.7, 6));
  });

  it('gives speeds that grow from E to F in every setting', () => {
    const failures = [];
    for (let tilt = 3; tilt <= 10; tilt++) {
      for (const [e, f] of [
        [0.1, 0.15],
        [0.2, 0.7],
        [0.8, 0.95],
      ]) {
        const vE = BALL / idealTime('A', e, f, tilt);
        const vEF = (f - e) / idealTime('AB', e, f, tilt);
        const vF = BALL / idealTime('B', e, f, tilt);
        if (!(vE < vEF && vEF < vF)) failures.push({ tilt, e, f });
      }
    }
    expect(failures).toEqual([]);
  });

  it('repeats a reading for the same draw and scatters between draws', () => {
    expect(reading(4, 'AB', 0.2, 0.7, 6)).toBe(reading(4, 'AB', 0.2, 0.7, 6));
    const set = new Set([1, 2, 3, 4, 5, 6].map((d) => reading(d, 'AB', 0.2, 0.7, 6)));
    expect(set.size).toBeGreaterThan(1);
    const ideal = idealTime('AB', 0.2, 0.7, 6);
    expect(Math.abs(reading(1, 'AB', 0.2, 0.7, 6) - ideal)).toBeLessThan(0.0036);
  });
});

describe('the gates', () => {
  it('measures the right length in each mode', () => {
    expect(lengthOf('AB', 0.2, 0.7)).toEqual({ length: 0.5, error: RULER_ERROR });
    expect(lengthOf('A', 0.2, 0.7)).toEqual({ length: BALL, error: CALIPER_ERROR });
  });

  it('keeps the gates in order', () => {
    expect(clampE(0.7, 0.5)).toBe(0.45);
    expect(clampF(0.3, 0.5)).toBe(0.55);
    expect(clampE(0.01, 0.5)).toBe(0.1);
    expect(clampF(1, 0.5)).toBe(0.95);
  });
});

describe('compareNote', () => {
  it('waits for all three speeds', () => {
    expect(compareNote({ A: 0.5, AB: 0.6 })).toBeNull();
  });

  it('reports the ball speeding up, or the error hiding it', () => {
    expect(compareNote({ A: 0.5, AB: 0.6, B: 0.7 })).toContain('nhanh dần');
    expect(compareNote({ A: 0.6, AB: 0.6, B: 0.6 })).toContain('sai số');
  });
});
