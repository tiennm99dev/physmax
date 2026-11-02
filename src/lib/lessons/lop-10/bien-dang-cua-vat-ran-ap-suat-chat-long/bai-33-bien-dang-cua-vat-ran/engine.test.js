import { describe, expect, it } from 'vitest';
import {
  DEFORMATION_BINS,
  DEFORMATION_CARDS,
  NATURAL,
  SPRINGS,
  coilPoints,
  forceAt,
  permanentSet,
  pullPath,
  releasePath,
  stateOf,
  stretchAt,
} from './engine.js';

const [A, B, C] = SPRINGS;

describe("Hooke's law within the limit", () => {
  it('gives the stretch F/k and keeps the ratio equal to k', () => {
    expect(stretchAt(B, 4, 4)).toBeCloseTo(0.08, 9);
    const bad = SPRINGS.filter((s) => Math.abs(s.limit / stretchAt(s, s.limit, 0) - s.k) > 1e-9);
    expect(bad).toEqual([]);
  });

  it('leaves no permanent stretch up to the limit', () => {
    expect(permanentSet(A, A.limit)).toBe(0);
    expect(stretchAt(A, 0, A.limit)).toBe(0);
  });
});

describe('beyond the limit', () => {
  it('stretches more than Hooke would give and keeps a stretch on release', () => {
    expect(stretchAt(B, 10, 10)).toBeGreaterThan(10 / B.k);
    expect(permanentSet(B, 10)).toBeGreaterThan(0);
    expect(stretchAt(B, 0, 10)).toBeCloseTo(permanentSet(B, 10), 9);
  });

  it('continues the elastic line without a jump at the limit', () => {
    expect(stretchAt(C, C.limit + 1e-6, 0)).toBeCloseTo(C.limit / C.k, 4);
  });

  it('comes back along a line of slope k', () => {
    const [from, to] = releasePath(B, 10);
    expect((to.y - from.y) / ((to.x - from.x) / 100)).toBeCloseTo(B.k, 6);
    expect(to.x).toBeCloseTo(stretchAt(B, 10, 10) * 100, 6);
  });

  it('has no release line while within the limit', () => {
    expect(releasePath(B, 8)).toEqual([]);
  });
});

describe('dragging the end of the spring', () => {
  it('finds the force that gives the stretch, for a new and a damaged spring', () => {
    const bad = [];
    for (const s of SPRINGS) {
      for (const peak of [0, s.limit, s.max]) {
        for (let f = 0.5; f <= s.max; f += 0.5) {
          const back = forceAt(s, stretchAt(s, f, peak), peak);
          const expected = Math.max(f, 0);
          if (Math.abs(back - expected) > 1e-9) bad.push({ id: s.id, peak, f, back });
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never pushes on a slack spring or goes past the largest force', () => {
    expect(forceAt(B, 0, 10)).toBe(0);
    expect(forceAt(B, 5, 0)).toBe(B.max);
  });
});

describe('the state of the spring', () => {
  it('names each stage of a pull', () => {
    expect(stateOf(B, 0, 0)).toBe('rest');
    expect(stateOf(B, 8, 8)).toBe('elastic');
    expect(stateOf(B, 9, 9)).toBe('beyond');
    expect(stateOf(B, 0, 9)).toBe('released');
    expect(stateOf(B, 5, 9)).toBe('damaged');
    expect(stateOf(B, 2, 8)).toBe('elastic');
  });
});

describe('the drawing', () => {
  it('keeps the longest spring and its largest force arrow on the board', () => {
    const longest = SPRINGS.map(
      (s) => 14 + (NATURAL + stretchAt(s, s.max, s.max)) * 450 + s.max * 8,
    );
    expect(Math.max(...longest)).toBeLessThan(340);
  });

  it('draws the coil from one end to the other', () => {
    const points = coilPoints(100, 10, 110);
    expect(points[0]).toEqual({ x: 100, y: 10 });
    expect(points.at(-1)).toEqual({ x: 100, y: 110 });
    expect(points.slice(1).every((p, i) => p.y > points[i].y)).toBe(true);
  });

  it('draws the pull path through the limit once passed', () => {
    expect(pullPath(B, 4).map((p) => p.y)).toEqual([0, 4]);
    expect(pullPath(B, 10).map((p) => p.y)).toEqual([0, 8, 10]);
  });
});

describe('the sorting cards', () => {
  it('all land in a bin that exists', () => {
    const bins = DEFORMATION_BINS.map((b) => b.id);
    expect(DEFORMATION_CARDS.filter((c) => !bins.includes(c.bin))).toEqual([]);
  });
});
