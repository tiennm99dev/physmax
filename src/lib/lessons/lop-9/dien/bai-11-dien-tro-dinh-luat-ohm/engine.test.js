import { describe, expect, it } from 'vitest';
import {
  AREAS,
  I_MAX,
  LENGTHS,
  MATERIALS,
  U_MAX,
  addPoint,
  lineEnd,
  materialById,
  ohmCurrent,
  ratios,
  wireResistance,
} from './engine.js';

describe('wire resistance', () => {
  it('computes R = ρl/S with S in mm²', () => {
    expect(wireResistance(0.5e-6, 1, 0.1)).toBe(5);
    expect(wireResistance(1.1e-6, 3, 0.1)).toBe(33);
    expect(wireResistance(0.4e-6, 1, 0.2)).toBe(2);
    expect(wireResistance(1.7e-8, 150, 2)).toBeCloseTo(1.275, 9);
  });

  it('keeps every bench wire within the graph at full voltage', () => {
    const bad = [];
    for (const m of MATERIALS)
      for (const l of LENGTHS)
        for (const s of AREAS) {
          const r = wireResistance(m.rho, l, s);
          if (ohmCurrent(U_MAX, r) > I_MAX) bad.push([m.id, l, s, r]);
        }
    expect(bad).toEqual([]);
  });

  it('falls back to the first material', () => {
    expect(materialById('nicrom').rho).toBe(1.1e-6);
    expect(materialById('vang').id).toBe('nikelin');
  });
});

describe('Ohm law and the I–U graph', () => {
  it('gives I = U/R', () => {
    expect(ohmCurrent(6, 2)).toBe(3);
    expect(ohmCurrent(4.5, 5)).toBe(0.9);
    expect(ohmCurrent(1, 0)).toBe(Infinity);
  });

  it('clips the line to the graph box', () => {
    expect(lineEnd(2)).toEqual({ u: 6, i: 3 });
    expect(lineEnd(10)).toEqual({ u: 6, i: 0.6 });
    expect(lineEnd(1)).toEqual({ u: 3, i: 3 });
  });

  it('finds the common ratio U/I', () => {
    const pts = [1.5, 3, 4.5].map((u) => ({ u, i: ohmCurrent(u, 5) }));
    expect(ratios(pts)).toEqual({ list: [5, 5, 5], same: true, value: 5 });
    expect(ratios([{ u: 0, i: 0 }]).same).toBe(false);
    expect(
      ratios([
        { u: 2, i: 1 },
        { u: 3, i: 1 },
      ]).value,
    ).toBe(null);
  });

  it('records each voltage once, sorted', () => {
    let pts = addPoint([], { u: 3, i: 0.6 });
    pts = addPoint(pts, { u: 1, i: 0.2 });
    pts = addPoint(pts, { u: 3, i: 0.6 });
    expect(pts.map((p) => p.u)).toEqual([1, 3]);
  });
});
