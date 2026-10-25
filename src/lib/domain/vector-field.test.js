import { describe, expect, it } from 'vitest';
import { arrowLength, fieldAt, gridPoints, sampleField, traceFieldLine } from './vector-field.js';

describe('vector field engine', () => {
  it('points away from a positive source and falls off as 1/r²', () => {
    const src = [{ x: 0, y: 0, strength: 4 }];
    expect(fieldAt(src, { x: 1, y: 0 })).toEqual({ x: 4, y: 0 });
    expect(fieldAt(src, { x: 2, y: 0 })).toEqual({ x: 1, y: 0 });
    expect(fieldAt(src, { x: 0, y: -2 })).toEqual({ x: 0, y: -1 });
  });

  it('points toward a negative source', () => {
    const f = fieldAt([{ x: 1, y: 1, strength: -2 }], { x: 1, y: 3 });
    expect(f).toEqual({ x: 0, y: -0.5 });
  });

  it('cancels midway between equal sources and adds a uniform part', () => {
    const pair = [
      { x: -1, y: 0, strength: 1 },
      { x: 1, y: 0, strength: 1 },
    ];
    expect(fieldAt(pair, { x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
    expect(fieldAt([], { x: 5, y: 5 }, { uniform: { x: 0, y: -9.8 } })).toEqual({ x: 0, y: -9.8 });
  });

  it('ignores a source exactly at the point and softens a near one', () => {
    expect(fieldAt([{ x: 0, y: 0, strength: 1 }], { x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
    const soft = fieldAt([{ x: 0, y: 0, strength: 1 }], { x: 0.001, y: 0 }, { softening: 1 });
    expect(soft.x).toBeLessThan(0.01);
  });

  it('lays out grid cell centres row by row', () => {
    const pts = gridPoints({ xMin: 0, xMax: 4, yMin: 0, yMax: 2 }, 2, 1);
    expect(pts).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 1 },
    ]);
  });

  it('skips grid cells next to a source', () => {
    const bounds = { xMin: -2, xMax: 2, yMin: -2, yMax: 2 };
    const all = sampleField([{ x: 0.5, y: 0.5, strength: 1 }], bounds, { nx: 4, ny: 4 });
    const near = sampleField([{ x: 0.5, y: 0.5, strength: 1 }], bounds, {
      nx: 4,
      ny: 4,
      minDistance: 0.1,
    });
    expect(all).toHaveLength(16);
    expect(near).toHaveLength(15);
    expect(near.every((s) => s.magnitude > 0)).toBe(true);
  });

  it('scales arrow length logarithmically and caps it', () => {
    expect(arrowLength(0, 1, 30)).toBe(0);
    expect(arrowLength(4, 1, 30)).toBe(30);
    expect(arrowLength(1000, 1, 30)).toBe(30);
    expect(arrowLength(1, 1, 30)).toBeGreaterThan(arrowLength(0.5, 1, 30));
  });

  it('traces a straight field line out of a lone source and stops at the edge', () => {
    const bounds = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    const line = traceFieldLine(
      [{ x: 0, y: 0, strength: 1 }],
      { x: 0.5, y: 0 },
      {
        bounds,
        step: 0.5,
      },
    );
    expect(line.length).toBe(10);
    for (const p of line) expect(p.y).toBeCloseTo(0, 9);
    expect(line.at(-1)?.x).toBeCloseTo(5, 9);
  });

  it('ends a line from a positive source at a negative one', () => {
    const dipole = [
      { x: -2, y: 0, strength: 1 },
      { x: 2, y: 0, strength: -1 },
    ];
    const line = traceFieldLine(
      dipole,
      { x: -1.7, y: 0.1 },
      {
        bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
        step: 0.1,
        stopRadius: 0.3,
      },
    );
    const end = line.at(-1) ?? { x: 0, y: 0 };
    expect(Math.hypot(end.x - 2, end.y)).toBeLessThan(0.3);
  });
});
