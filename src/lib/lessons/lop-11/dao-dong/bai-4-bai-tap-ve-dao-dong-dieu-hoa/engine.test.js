import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { PHASES, PHASE_OPTIONS, check, extremesOf, makeProblem, startHint } from './engine.js';

describe('makeProblem', () => {
  it('draws problems whose start sits on a grid line of A/2', () => {
    const rand = rng(7);
    const bad = [];
    for (let i = 0; i < 40; i += 1) {
      const p = makeProblem(rand);
      const x0 = startHint(p).x0;
      const halves = (2 * x0) / p.A;
      if (Math.abs(halves - Math.round(halves)) > 1e-9) bad.push(p);
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed', () => {
    expect(makeProblem(rng(3))).toEqual(makeProblem(rng(3)));
  });
});

describe('check', () => {
  const p = { A: 4, T: 0.8, phase: 1 };

  it('accepts the right reading', () => {
    expect(check(p, { A: 4, T: 0.8, phase: 1 })).toEqual({ A: true, T: true, phase: true });
  });

  it('flags each wrong part', () => {
    expect(check(p, { A: 8, T: 0.4, phase: 7 })).toEqual({ A: false, T: false, phase: false });
    expect(check(p, { A: null, T: 0.8, phase: null })).toEqual({ A: false, T: true, phase: false });
  });
});

describe('phases', () => {
  it('are all different and labelled', () => {
    expect(new Set(PHASE_OPTIONS.map((o) => o.label)).size).toBe(PHASES.length);
    expect(PHASE_OPTIONS[3].label).toBe('2π/3');
  });

  it('tell the starting direction', () => {
    expect(startHint({ A: 4, T: 1, phase: 1 })).toMatchObject({ way: 'đi xuống (chiều âm)' });
    expect(startHint({ A: 4, T: 1, phase: 7 }).x0).toBeCloseTo(2, 9);
    expect(startHint({ A: 4, T: 1, phase: 0 }).way).toBe('đang ở vị trí biên');
  });
});

describe('extremesOf', () => {
  it('gives ω, ωA and ω²A', () => {
    const d = extremesOf({ A: 5, T: 1, phase: 0 });
    expect(d.omega).toBeCloseTo(2 * Math.PI, 9);
    expect(d.vMax).toBeCloseTo(10 * Math.PI, 9);
    expect(d.aMax).toBeCloseTo(20 * Math.PI ** 2, 9);
  });
});
