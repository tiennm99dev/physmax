import { describe, expect, it } from 'vitest';
import { stateAt } from '#lib/domain/motion.js';
import {
  TRUE_K,
  bestK,
  fitError,
  hypothesisHolds,
  hypothesisMotion,
  measure,
  predict,
} from './engine.js';

describe('inclined-plane experiment', () => {
  it('measures close to s = 0.2·t² and repeats the same readings', () => {
    const data = measure(1);
    expect(data.map((d) => d.t)).toEqual([1, 2, 3, 4, 5]);
    for (const d of data) {
      expect(Math.abs(d.value - TRUE_K * d.t * d.t)).toBeLessThanOrEqual(
        TRUE_K * d.t * d.t * 0.03 + 0.005,
      );
    }
    expect(measure(1)).toEqual(data);
    expect(measure(2)).not.toEqual(data);
  });

  it('accepts s ∝ t² and rejects s ∝ t, for every run', () => {
    for (let run = 1; run <= 20; run++) {
      const data = measure(run);
      expect(hypothesisHolds('square', data), `run ${run}`).toBe(true);
      expect(hypothesisHolds('linear', data), `run ${run}`).toBe(false);
      expect(bestK('square', data)).toBeCloseTo(TRUE_K, 1);
    }
  });

  it('fits exact data with zero error', () => {
    const exact = [1, 2, 3].map((t) => ({ t, value: 0.5 * t }));
    expect(bestK('linear', exact)).toBeCloseTo(0.5, 12);
    expect(fitError('linear', 0.5, exact)).toBeCloseTo(0, 12);
    expect(fitError('square', 0.5, [])).toBe(0);
    expect(bestK('square', [])).toBe(0);
  });

  it('predicts and turns each hypothesis into a motion with the same s(t)', () => {
    expect(predict('linear', 0.6, 3)).toBeCloseTo(1.8, 12);
    expect(predict('square', 0.2, 3)).toBeCloseTo(1.8, 12);
    for (const h of /** @type {const} */ (['linear', 'square'])) {
      const m = hypothesisMotion(h, 0.3, 5);
      for (const t of [0, 1.5, 4]) expect(stateAt(m, t).x).toBeCloseTo(predict(h, 0.3, t), 9);
    }
  });
});
