import { describe, expect, it } from 'vitest';
import { ROPES, frontAt, judgeRuler, reached, ropeAt, wavelengthOf } from './engine.js';

const shake = { amplitude: 0.1, frequency: 2, speed: 1.6 };

describe('the shaken rope', () => {
  it('has λ = v / f', () => {
    expect(wavelengthOf(shake)).toBe(0.8);
    expect(ROPES.map((r) => wavelengthOf({ ...shake, speed: r.speed }))).toEqual([0.8, 0.4]);
  });

  it('leaves points ahead of the front at rest', () => {
    expect(ropeAt(shake, 1, 0.5)).toBe(0);
    expect(frontAt(shake, 0.5)).toBe(0.8);
    expect(frontAt(shake, 10)).toBe(2);
  });

  it('repeats the source motion one wavelength later', () => {
    const t = 1.3;
    const bad = [0, 0.05, 0.2, 0.37].filter(
      (x) => Math.abs(ropeAt(shake, x, t) - ropeAt(shake, x + 0.8, t)) > 1e-9,
    );
    expect(bad).toEqual([]);
    expect(ropeAt(shake, 0, 0.125)).toBe(0.1);
    expect(ropeAt(shake, 0.4, 1.125)).toBe(-0.1);
  });

  it('knows when both markers are reached', () => {
    expect(reached(shake, 0.5, 0.2, 0.9)).toBe(false);
    expect(reached(shake, 0.6, 0.2, 0.9)).toBe(true);
  });
});

describe('the ruler', () => {
  it('names in-phase, opposite-phase and other distances', () => {
    expect(judgeRuler(0.8, 0.8)).toMatchObject({ kind: 'same', k: 1 });
    expect(judgeRuler(1.61, 0.8)).toMatchObject({ kind: 'same', k: 2 });
    expect(judgeRuler(0.4, 0.8)).toMatchObject({ kind: 'opposite', k: 0 });
    expect(judgeRuler(1.2, 0.8)).toMatchObject({ kind: 'opposite', k: 1 });
    expect(judgeRuler(0.6, 0.8).kind).toBe('other');
    expect(judgeRuler(0, 0.8).kind).toBe('none');
  });
});
