import { describe, expect, it } from 'vitest';
import { budget, energies, fanSplit, rad, startEnergy, swing } from './engine.js';

describe('pendulum energies', () => {
  it('has only potential energy at release and none at the lowest point at rest', () => {
    const e = energies({ theta: rad(60), omega: 0 });
    expect(e.kinetic).toBe(0);
    // 0,5 kg · 10 · 1 m · (1 − cos 60°) = 2,5 J
    expect(e.potential).toBeCloseTo(2.5, 10);
    expect(energies({ theta: 0, omega: 0 }).mechanical).toBe(0);
  });

  it('keeps kinetic plus potential energy constant without air resistance', () => {
    const total = startEnergy(40);
    let s = { theta: rad(40), omega: 0 };
    let maxKinetic = 0;
    for (let i = 0; i < 300; i++) {
      s = swing(s, 1 / 60, 0);
      const b = budget(s, total);
      maxKinetic = Math.max(maxKinetic, b.kinetic);
      expect(b.kinetic + b.potential).toBeCloseTo(total, 6);
      expect(b.heat).toBeLessThan(1e-6);
    }
    // At the bottom all the potential energy has become kinetic energy.
    expect(maxKinetic).toBeCloseTo(total, 2);
  });

  it('turns mechanical energy into heat with air resistance, total unchanged', () => {
    const total = startEnergy(40);
    let s = { theta: rad(40), omega: 0 };
    for (let i = 0; i < 600; i++) s = swing(s, 1 / 60, 0.3);
    const b = budget(s, total);
    expect(b.heat).toBeGreaterThan(total * 0.8);
    expect(b.kinetic + b.potential + b.heat).toBeCloseTo(total, 10);
  });
});

describe('electric fan', () => {
  it('gives out exactly the electrical energy it takes in', () => {
    for (const level of /** @type {const} */ ([1, 2, 3])) {
      const f = fanSplit(level);
      expect(f.kinetic + f.heat + f.sound).toBeCloseTo(f.input, 10);
      expect(f.kinetic).toBeGreaterThan(f.heat);
    }
    expect(fanSplit(3)).toEqual({ input: 50, kinetic: 35, heat: 13, sound: 2 });
  });
});
