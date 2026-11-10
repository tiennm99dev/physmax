import { describe, expect, it } from 'vitest';
import {
  equationTex,
  lagOf,
  phaseRelation,
  piFraction,
  piText,
  piTex,
  sample,
  speedAt,
  stateAt,
  wrapPhase,
} from './oscillation.js';

describe('stateAt', () => {
  it('starts at the positive end when the initial phase is 0', () => {
    const s = stateAt(5, Math.PI, 0, 0);
    expect(s.x).toBeCloseTo(5, 9);
    expect(s.v).toBeCloseTo(0, 9);
    expect(s.a).toBeCloseTo(-5 * Math.PI ** 2, 9);
  });

  it('passes the equilibrium with the greatest speed a quarter period later', () => {
    const s = stateAt(5, Math.PI, 0, 0.5);
    expect(s.x).toBeCloseTo(0, 9);
    expect(s.v).toBeCloseTo(-5 * Math.PI, 9);
    expect(s.a).toBeCloseTo(0, 9);
  });

  it('keeps a = −ω²x at any time', () => {
    const bad = [0.1, 0.37, 1.2, 2.9].filter((t) => {
      const s = stateAt(4, 3, 0.7, t);
      return Math.abs(s.a + 9 * s.x) > 1e-9;
    });
    expect(bad).toEqual([]);
  });
});

describe('phases as fractions of π', () => {
  it('wraps a phase into (−π, π]', () => {
    expect(wrapPhase(3 * Math.PI)).toBeCloseTo(Math.PI, 9);
    expect(wrapPhase(-Math.PI)).toBeCloseTo(Math.PI, 9);
    expect(wrapPhase((5 * Math.PI) / 3)).toBeCloseTo(-Math.PI / 3, 9);
  });

  it('finds small fractions of π in lowest terms', () => {
    expect(piFraction((2 * Math.PI) / 6)).toEqual({ p: 1, q: 3 });
    expect(piFraction(-Math.PI / 2)).toEqual({ p: -1, q: 2 });
    expect(piFraction(0)).toEqual({ p: 0, q: 1 });
    expect(piFraction(1)).toBeNull();
  });

  it('writes them as TeX and as text', () => {
    expect(piTex((2 * Math.PI) / 3)).toBe('\\frac{2\\pi}{3}');
    expect(piTex(-Math.PI / 2)).toBe('-\\frac{\\pi}{2}');
    expect(piTex(4 * Math.PI)).toBe('4\\pi');
    expect(piTex(5)).toBe('5');
    expect(piText(-Math.PI / 6)).toBe('−π/6');
    expect(piText(Math.PI)).toBe('π');
    expect(piText(2.5)).toBe('2,5');
  });
});

describe('equationTex', () => {
  it('writes the equation the book way', () => {
    expect(equationTex(5, 2 * Math.PI, -Math.PI / 3)).toBe(
      'x = 5\\cos\\left(2\\pi t - \\frac{\\pi}{3}\\right)',
    );
    expect(equationTex(2.5, Math.PI, 0)).toBe('x = 2{,}5\\cos\\left(\\pi t\\right)');
    expect(equationTex(10, 4, Math.PI / 2)).toBe('x = 10\\cos\\left(4t + \\frac{\\pi}{2}\\right)');
  });
});

describe('phaseRelation', () => {
  it('names the common cases', () => {
    expect(phaseRelation(0).name).toBe('cùng pha');
    expect(phaseRelation(2 * Math.PI).name).toBe('cùng pha');
    expect(phaseRelation(-Math.PI).name).toBe('ngược pha');
    expect(phaseRelation(Math.PI / 2)).toMatchObject({ name: 'vuông pha', lead: 1 });
    expect(phaseRelation(-Math.PI / 3)).toMatchObject({ name: 'lệch pha', lead: 2 });
  });

  it('turns a phase difference into a time lag', () => {
    expect(lagOf(Math.PI / 2, 2)).toBeCloseTo(0.5, 9);
    expect(lagOf((3 * Math.PI) / 2, 2)).toBeCloseTo(0.5, 9);
  });
});

describe('helpers', () => {
  it('gives the speed at a position', () => {
    expect(speedAt(5, 2, 3)).toBeCloseTo(8, 9);
    expect(speedAt(5, 2, 5)).toBe(0);
  });

  it('samples a curve from end to end', () => {
    const pts = sample((t) => 2 * t, 0, 1, 4);
    expect(pts).toHaveLength(5);
    expect(pts[4]).toEqual({ t: 1, y: 2 });
  });
});
