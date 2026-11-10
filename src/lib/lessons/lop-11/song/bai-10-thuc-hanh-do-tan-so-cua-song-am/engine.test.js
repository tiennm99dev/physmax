import { describe, expect, it } from 'vitest';
import {
  FORKS,
  TIME_DIVS,
  divisionsPerPeriod,
  judgeFrequency,
  meanAndError,
  periodMs,
  readable,
  trace,
} from './engine.js';

describe('the virtual oscilloscope', () => {
  it('turns a frequency into divisions per period', () => {
    expect(periodMs(400)).toBe(2.5);
    expect(divisionsPerPeriod(400, 0.5)).toBe(5);
    expect(divisionsPerPeriod(250, 1)).toBe(4);
    expect(divisionsPerPeriod(320, 0.5)).toBe(6.25);
  });

  it('draws a trace that repeats every period', () => {
    const pts = trace(400, 0.5, 3, 100);
    expect(pts[0]).toEqual({ x: 0, y: 0 });
    // One period is 5 divisions: x = 1.25 is a quarter period, the crest.
    const crest = trace(400, 0.5, 3, 8).find((p) => p.x === 1.25);
    expect(crest?.y).toBe(3);
    expect(pts.at(-1)?.x).toBe(10);
  });

  it('lets every fork be read at some TIME/DIV setting', () => {
    const unreadable = FORKS.filter((f) => !TIME_DIVS.some((d) => readable(f.frequency, d)));
    expect(unreadable).toEqual([]);
    expect(readable(400, 0.1)).toBe(false);
    expect(readable(400, 2)).toBe(true);
  });

  it('accepts a reading within 3 %', () => {
    expect(judgeFrequency(410, 400)).toEqual({ ok: true, error: 2.5 });
    expect(judgeFrequency(450, 400).ok).toBe(false);
  });

  it('writes repeated readings as a mean and its error', () => {
    expect(meanAndError([438, 444, 441])).toEqual({ mean: 441, delta: 2 });
  });
});
