import { describe, expect, it } from 'vitest';
import { stateAt } from '../_shared/oscillation.js';
import { GOALS, axisFor, extremes, motionKind, reached } from './engine.js';

describe('extremes', () => {
  it('gives ωA and ω²A', () => {
    const e = extremes(5, 2 * Math.PI);
    expect(e.vMax).toBeCloseTo(31.42, 2);
    expect(e.aMax).toBeCloseTo(197.39, 2);
  });
});

describe('axisFor', () => {
  it('picks a round axis just above the largest value', () => {
    expect(axisFor(8)).toEqual({ yMax: 10, yStep: 5 });
    expect(axisFor(31.4)).toEqual({ yMax: 40, yStep: 20 });
  });

  it('never lets the curve leave the axis and keeps at most three steps', () => {
    const bad = [3, 8, 12.6, 25.1, 50.3, 39.5, 158, 316].filter((m) => {
      const { yMax, yStep } = axisFor(m);
      return yMax < m || yMax / yStep > 3 + 1e-9;
    });
    expect(bad).toEqual([]);
  });
});

describe('the goals', () => {
  it('each describes the state at its phase', () => {
    const A = 4;
    const w = Math.PI;
    const at = (/** @type {number} */ phase) => stateAt(A, w, phase, 0);
    expect(at(GOALS[0].phase).v).toBeCloseTo(w * A, 9);
    expect(at(GOALS[1].phase).a).toBeCloseTo(w * w * A, 9);
    expect(at(GOALS[2].phase).x).toBeCloseTo(0, 9);
    expect(at(GOALS[2].phase).v).toBeLessThan(0);
    expect(at(GOALS[3].phase).v).toBeCloseTo(0, 9);
    expect(at(GOALS[3].phase).a).toBeLessThan(0);
    expect(at(GOALS[4].phase).x).toBeCloseTo(A / 2, 9);
    expect(at(GOALS[4].phase).v).toBeGreaterThan(0);
  });

  it('can be reached with the arrow keys, a fortieth of a period each', () => {
    const steps = Array.from({ length: 80 }, (_, i) => (i * 2 * Math.PI) / 40);
    const missed = GOALS.filter((g) => !steps.some((p) => reached(g, p)));
    expect(missed).toEqual([]);
  });

  it('accepts a phase a whole turn away', () => {
    expect(reached(GOALS[1], 3 * Math.PI)).toBe(true);
    expect(reached(GOALS[1], 0)).toBe(false);
  });
});

describe('motionKind', () => {
  it('tells speeding up from slowing down', () => {
    expect(motionKind(5, 0, 5)).toBe('bien');
    expect(motionKind(0, -3, 5)).toBe('can-bang');
    expect(motionKind(2, -3, 5)).toBe('nhanh-dan');
    expect(motionKind(-2, -3, 5)).toBe('cham-dan');
  });
});
