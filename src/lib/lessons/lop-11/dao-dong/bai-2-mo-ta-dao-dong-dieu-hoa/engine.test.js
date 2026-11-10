import { describe, expect, it } from 'vitest';
import { OMEGAS, TARGETS, compare, phiOfStep, projection } from './engine.js';

describe('the matching game', () => {
  it('matches only the same A, ω and phase', () => {
    const target = TARGETS[0];
    expect(compare({ ...target }, target).matched).toBe(true);
    expect(compare({ ...target, phi: target.phi + 2 * Math.PI }, target).matched).toBe(true);
    expect(compare({ ...target, A: 5 }, target)).toMatchObject({ matched: false, sameA: false });
  });

  it('names the phase difference against the target', () => {
    const target = TARGETS[0];
    const ahead = compare({ ...target, phi: 0 }, target);
    expect(ahead.relation).toMatchObject({ name: 'vuông pha', lead: 1 });
    expect(ahead.dphi).toBeCloseTo(Math.PI / 2, 9);
    expect(compare({ ...target, phi: Math.PI / 2 }, target).relation.name).toBe('ngược pha');
  });

  it('keeps every target reachable by the controls', () => {
    const bad = TARGETS.filter((t) => {
      const k = Math.round((t.phi * 6) / Math.PI);
      const phiOk = Math.abs(phiOfStep(k) - t.phi) < 1e-9 && k >= -6 && k <= 6;
      const omegaOk = OMEGAS.some((o) => Math.abs(o.omega - t.omega) < 1e-9);
      const aOk = Number.isInteger(t.A) && t.A >= 2 && t.A <= 8;
      return !(phiOk && omegaOk && aOk);
    });
    expect(bad).toEqual([]);
  });
});

describe('projection', () => {
  it('drops M straight onto the axis', () => {
    const { m, p } = projection(100, 50, 40, Math.PI / 3);
    expect(p.x).toBeCloseTo(120, 9);
    expect(m.x).toBe(p.x);
    expect(m.y).toBeCloseTo(50 - 40 * Math.sin(Math.PI / 3), 9);
    expect(p.y).toBe(50);
  });
});
