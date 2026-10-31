import { describe, expect, it } from 'vitest';
import { thinLensImage } from '#lib/domain/optics.js';
import { PRESETS, closeEnough, focalOfPower, magnifyingPower, solveLens } from './engine.js';

describe('magnifying glass', () => {
  it('links the mark Gx and the focal length by G = 25 / f', () => {
    expect(magnifyingPower(5)).toBe(5);
    expect(magnifyingPower(10)).toBe(2.5);
    expect(focalOfPower(10)).toBe(2.5);
    expect(focalOfPower(2.5)).toBe(10);
  });
});

describe('lens problems from similar triangles', () => {
  it('solves the three cases', () => {
    expect(solveLens(12, 36, 2)).toMatchObject({ kind: 'that', distance: 18, height: 1 });
    expect(solveLens(15, 10, 1)).toMatchObject({ kind: 'ao', distance: 30, height: 3 });
    expect(solveLens(-12, 24, 3)).toMatchObject({ kind: 'ao', distance: 8, height: 1 });
    expect(solveLens(10, 10, 2)).toMatchObject({ kind: 'khong', distance: null });
  });

  it('agrees with the thin lens formula on a grid', () => {
    const bad = [];
    for (const f of [-15, -8, 6, 10, 17]) {
      for (const d of [2, 5, 9, 14, 23, 40]) {
        if (d === f) continue;
        const s = solveLens(f, d, 3);
        const img = thinLensImage(f, d);
        const dist = Math.abs(img.distance);
        const ok =
          s.distance !== null &&
          Math.abs(s.distance - dist) < 1e-6 &&
          Math.abs((s.height ?? 0) - 3 * Math.abs(img.magnification)) < 1e-6 &&
          (s.kind === 'that') === img.real;
        if (!ok) bad.push([f, d]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives every preset a clean answer', () => {
    const messy = PRESETS.filter((p) => {
      const s = solveLens(p.lens === 'hoi-tu' ? p.f : -p.f, p.d, p.h);
      return [s.distance, s.height].some(
        (v) => v === null || Math.abs(v * 10 - Math.round(v * 10)) > 1e-9,
      );
    });
    expect(messy).toEqual([]);
  });

  it('accepts answers rounded to one decimal place', () => {
    expect(closeEnough(6.7, 20 / 3)).toBe(true);
    expect(closeEnough(6.6, 20 / 3)).toBe(false);
    expect(closeEnough(null, 1)).toBe(false);
  });
});
