import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { energies, makeTask, meets, ratioAt, snapTo } from './engine.js';

const TASKS = Array.from({ length: 300 }, (_, i) => makeTask(rng(i * 7919 + 3)));

describe('energies', () => {
  it('splits the total between kinetic and potential energy', () => {
    const e = energies(100, 5, 3);
    expect(e.W).toBeCloseTo(0.125, 12);
    expect(e.Wt).toBeCloseTo(0.045, 12);
    expect(e.Wd).toBeCloseTo(0.08, 12);
  });
});

describe('makeTask', () => {
  it('puts the spot inside the swing', () => {
    const bad = TASKS.filter((t) => !(t.spot > 0 && t.spot < t.A));
    expect(bad).toEqual([]);
  });

  it('draws every kind of task', () => {
    expect(new Set(TASKS.map((t) => t.kind)).size).toBe(4);
  });

  it('gives a spot where the asked state really holds', () => {
    const bad = TASKS.filter((t) => {
      const e = energies(t.k, t.A, t.spot);
      if (t.kind === 'kinetic-ratio') return Math.abs(e.Wd - t.n * e.Wt) > 1e-12;
      if (t.kind === 'potential-ratio') return Math.abs(e.Wt - t.n * e.Wd) > 1e-12;
      // |v| = vmax/n means Wđ = W/n².
      if (t.kind === 'speed') return Math.abs(e.Wd - e.W / (t.n * t.n)) > 1e-12;
      return !Number.isInteger(t.spot);
    });
    expect(bad).toEqual([]);
  });

  it('can be met on the snap grid, on both sides of O', () => {
    const missed = TASKS.filter((t) => !meets(t, snapTo(t.spot, t.A)) || !meets(t, -t.spot));
    expect(missed).toEqual([]);
  });
});

describe('placing the block', () => {
  it('snaps to tenths of a centimetre inside the swing', () => {
    expect(snapTo(3.536, 5)).toBe(3.5);
    expect(snapTo(-7, 5)).toBe(-5);
  });

  it('reads the energy ratio, with none at the equilibrium position', () => {
    const t = {
      k: 40,
      A: 4,
      kind: /** @type {const} */ ('kinetic-ratio'),
      n: 3,
      spot: 2,
      goal: '',
      steps: [],
    };
    expect(ratioAt(t, 2)).toBeCloseTo(3, 12);
    expect(ratioAt(t, 0)).toBeNull();
    expect(meets(t, 2.1)).toBe(true);
    expect(meets(t, 2.2)).toBe(false);
  });
});
