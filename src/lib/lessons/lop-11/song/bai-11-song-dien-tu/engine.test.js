import { describe, expect, it } from 'vitest';
import {
  EXP_MAX,
  EXP_MIN,
  TARGETS,
  bandSpans,
  exponentOf,
  placed,
  targetBand,
  wavelengthAt,
} from './engine.js';

describe('the spectrum slider', () => {
  it('maps slider positions to wavelengths', () => {
    expect(wavelengthAt(0)).toBe(1);
    expect(wavelengthAt(-3)).toBeCloseTo(1e-3, 12);
    expect(exponentOf(5e-7)).toBeCloseTo(-6.3, 9);
  });

  it('puts every target in a band the slider can reach', () => {
    const lost = TARGETS.filter((t) => {
      const band = targetBand(t);
      if (!band) return true;
      const mid = (Math.log10(band.from) + Math.log10(band.to)) / 2;
      return mid < EXP_MIN || mid > EXP_MAX || !placed(exponentOf(10 ** mid), t);
    });
    expect(lost).toEqual([]);
    expect(new Set(TARGETS.map((t) => targetBand(t)?.id)).size).toBe(7);
  });

  it('rejects a slider in the wrong band', () => {
    expect(placed(0, TARGETS[0])).toBe(true);
    expect(placed(-6.3, TARGETS[0])).toBe(false);
  });

  it('draws spans that cover the scale', () => {
    const spans = bandSpans();
    expect(spans[0].start).toBe(0);
    expect(spans.at(-1)?.end).toBe(1);
  });
});
