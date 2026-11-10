import { describe, expect, it } from 'vitest';
import {
  DRAGS,
  F_MAX,
  F_MIN,
  F_STEP,
  NATURAL,
  dampedAt,
  drivenAmplitude,
  drivenAt,
  envelope,
  isResonance,
  lagAt,
  lossPerPeriod,
  resonanceCurve,
} from './engine.js';

const DRIVEN = DRAGS.filter((d) => d.beta > 0);

describe('free damped motion', () => {
  it('starts at the release point and stays inside its envelope', () => {
    expect(dampedAt(5, 1, 0.4, 0)).toBeCloseTo(5, 12);
    const out = [0.3, 1.1, 2.7, 4.9, 7.5].filter(
      (t) => Math.abs(dampedAt(5, 1, 0.4, t)) > envelope(5, 0.4, t) + 1e-12,
    );
    expect(out).toEqual([]);
  });

  it('keeps its amplitude with no drag', () => {
    expect(dampedAt(5, 1, 0, 3)).toBeCloseTo(5, 9);
  });

  it('loses a fixed share of energy each period', () => {
    const l = lossPerPeriod(1, 0.15);
    expect(l.amplitude).toBeCloseTo(Math.exp(-0.15), 12);
    expect(l.energy + l.lost).toBeCloseTo(1, 12);
    expect(lossPerPeriod(1, 0).lost).toBe(0);
  });
});

describe('driven motion', () => {
  it('peaks at the natural frequency on the slider grid', () => {
    const grid = [];
    for (let f = F_MIN; f <= F_MAX + 1e-9; f += F_STEP) grid.push(Math.round(f * 100) / 100);
    const bad = [];
    for (const f0 of NATURAL) {
      for (const d of DRIVEN) {
        const best = grid.reduce((a, b) =>
          drivenAmplitude(b, f0, d.beta) > drivenAmplitude(a, f0, d.beta) ? b : a,
        );
        if (!isResonance(best, f0)) bad.push({ f0, beta: d.beta, best });
      }
    }
    expect(bad).toEqual([]);
  });

  it('peaks higher and sharper with less drag', () => {
    const peaks = DRIVEN.map((d) => drivenAmplitude(1, 1, d.beta));
    expect(peaks[0]).toBeGreaterThan(peaks[1]);
    expect(peaks[1]).toBeGreaterThan(peaks[2]);
    const small = drivenAmplitude(1.2, 1, 0.15) / peaks[0];
    const big = drivenAmplitude(1.2, 1, 1.2) / peaks[2];
    expect(small).toBeLessThan(big);
  });

  it('lags by a quarter period at resonance and swings at the driving frequency', () => {
    expect(lagAt(1.5, 1.5, 0.5)).toBeCloseTo(Math.PI / 2, 12);
    expect(drivenAt(2, 1, 0.5, 0.25)).toBeCloseTo(drivenAt(2, 1, 0.5, 0.75), 12);
  });

  it('draws the curve across the slider range', () => {
    const c = resonanceCurve(1, 0.5);
    expect(c[0].x).toBeCloseTo(F_MIN, 12);
    expect(c.at(-1)?.x).toBeCloseTo(F_MAX, 12);
  });

  it('accepts only picks near the natural frequency', () => {
    expect(isResonance(1.05, 1)).toBe(true);
    expect(isResonance(1.1, 1)).toBe(false);
  });
});
