import { describe, expect, it } from 'vitest';
import { stateAt } from '../_shared/oscillation.js';
import { GOALS, energies, meets, ratioSpot, springMotion } from './engine.js';

describe('springMotion', () => {
  it('gives ω = √(k/m) and its period', () => {
    const s = springMotion(40, 0.1);
    expect(s.omega).toBeCloseTo(20, 9);
    expect(s.T).toBeCloseTo(Math.PI / 10, 9);
  });
});

describe('energies', () => {
  it('splits the total between kinetic and potential energy', () => {
    const e = energies(100, 4, 2);
    expect(e.W).toBeCloseTo(0.08, 12);
    expect(e.Wt).toBeCloseTo(0.02, 12);
    expect(e.Wd).toBeCloseTo(0.06, 12);
  });

  it('matches ½mv² at every moment of the motion', () => {
    const k = 40;
    const m = 0.4;
    const A = 5;
    const { omega } = springMotion(k, m);
    const bad = [0, 0.1, 0.23, 0.5, 0.71].filter((t) => {
      const s = stateAt(A, omega, 0, t);
      const kinetic = 0.5 * m * (s.v / 100) ** 2;
      return Math.abs(kinetic - energies(k, A, s.x).Wd) > 1e-12;
    });
    expect(bad).toEqual([]);
  });
});

describe('goals', () => {
  it('put Wđ = n·Wt at |x| = A/√(n + 1)', () => {
    const bad = GOALS.filter((g) => {
      const x = 6 * ratioSpot(g.n);
      const e = energies(50, 6, x);
      return Math.abs(e.Wd - g.n * e.Wt) > 1e-12;
    });
    expect(bad).toEqual([]);
  });

  it('can be met by stepping a twenty-fourth of a period from an end', () => {
    const missed = GOALS.filter(
      (g) =>
        !Array.from({ length: 24 }, (_, i) => 5 * Math.cos((i * 2 * Math.PI) / 24)).some((x) =>
          meets(g, x, 5),
        ),
    );
    expect(missed).toEqual([]);
  });

  it('rejects other spots and a block at rest', () => {
    expect(meets(GOALS[0], 5, 5)).toBe(false);
    expect(meets(GOALS[0], 0, 0)).toBe(false);
    expect(meets(GOALS[1], -2.5, 5)).toBe(true);
  });
});
