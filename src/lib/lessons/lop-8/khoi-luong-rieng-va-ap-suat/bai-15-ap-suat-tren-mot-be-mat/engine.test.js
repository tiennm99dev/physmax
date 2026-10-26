import { describe, expect, it } from 'vitest';
import { FACES, MAX_BRICKS, TARGETS, areaOf, dentMm, pressure, stack, waysTo } from './engine.js';

describe('pressure of bricks on sand', () => {
  it('gives the pressed area of each face', () => {
    expect(areaOf('nam')).toEqual({ cm2: 200, m2: 0.02 });
    expect(areaOf('nghieng')).toEqual({ cm2: 100, m2: 0.01 });
    expect(areaOf('dung')).toEqual({ cm2: 50, m2: 0.005 });
  });

  it('computes p = F / S', () => {
    expect(pressure(20, 0.02)).toBe(1000);
    expect(pressure(20, 0.005)).toBe(4000);
    expect(() => pressure(1, 0)).toThrow();
  });

  it('raises the pressure with more bricks or a smaller face', () => {
    expect(stack('nam', 1).p).toBe(1000);
    expect(stack('nam', 3)).toEqual({ force: 60, area: { cm2: 200, m2: 0.02 }, p: 3000 });
    expect(stack('nghieng', 1).p).toBe(2000);
    expect(stack('dung', 2).p).toBe(8000);
    expect(stack('dung', MAX_BRICKS).p).toBe(12000);
  });

  it('can reach every target pressure', () => {
    for (const t of TARGETS) expect(waysTo(t).length).toBeGreaterThan(0);
    expect(waysTo(4000)).toEqual([
      { face: 'nghieng', n: 2 },
      { face: 'dung', n: 1 },
    ]);
    expect(waysTo(6000)).toEqual([{ face: 'nghieng', n: 3 }]);
  });

  it('makes a deeper dent for a larger pressure, within the drawing', () => {
    expect(dentMm(1000)).toBeLessThan(dentMm(4000));
    for (const f of FACES) expect(dentMm(stack(f.id, MAX_BRICKS).p)).toBeLessThanOrEqual(30);
  });
});
