import { describe, expect, it } from 'vitest';
import { criticalGuessOk, fibrePath, isTotal } from './engine.js';

describe('total internal reflection', () => {
  it('needs a denser first medium and an angle past the critical one', () => {
    expect(isTotal(4 / 3, 1, 48)).toBe(false);
    expect(isTotal(4 / 3, 1, 49)).toBe(true);
    expect(isTotal(1, 4 / 3, 89)).toBe(false);
    expect(isTotal(1.5, 1, 42)).toBe(true);
  });

  it('accepts a critical angle found within one degree', () => {
    expect(criticalGuessOk(1.5, 1, 42)).toBe(true);
    expect(criticalGuessOk(4 / 3, 1, 49)).toBe(true);
    expect(criticalGuessOk(4 / 3, 1, 45)).toBe(false);
    expect(criticalGuessOk(1, 1.5, 42)).toBe(false);
  });
});

describe('optical fibre', () => {
  const base = { n1: 1.5, n2: 1.2, length: 300, width: 60 };

  it('carries all the light when the wall angle passes the critical angle', () => {
    const p = fibrePath({ ...base, theta: 30 });
    expect(p.total).toBe(true);
    expect(p.wallIncidence).toBe(60);
    expect(p.leaks).toEqual([]);
    expect(p.delivered).toBe(1);
    const last = p.segments[p.segments.length - 1];
    expect(last.x2).toBe(300);
    const bad = p.segments.filter((s) => s.y2 < -1e-9 || s.y2 > 60 + 1e-9);
    expect(bad).toEqual([]);
  });

  it('leaks light at each bounce below the critical angle', () => {
    const p = fibrePath({ ...base, theta: 45 });
    expect(p.total).toBe(false);
    expect(p.leaks.length).toBeGreaterThan(0);
    expect(p.leaks[0].angle).toBeCloseTo(62.11, 2);
    expect(p.delivered).toBeLessThan(0.5);
  });

  it('never traps light in a core less dense than its cladding', () => {
    const p = fibrePath({ ...base, n2: 1.6, theta: 10 });
    expect(p.total).toBe(false);
    expect(p.leaks.length).toBeGreaterThan(0);
  });

  it('sends a ray along the axis straight through', () => {
    const p = fibrePath({ ...base, theta: 0 });
    expect(p.segments).toEqual([{ x1: 0, y1: 30, x2: 300, y2: 30, intensity: 1 }]);
  });
});
