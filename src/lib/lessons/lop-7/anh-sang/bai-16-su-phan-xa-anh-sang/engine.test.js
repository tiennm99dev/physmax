import { describe, expect, it } from 'vitest';
import {
  MAX_OUT,
  facetTilts,
  fromNormal,
  incidenceFrom,
  reflectOnFacet,
  reflectionAngle,
  spread,
} from './engine.js';

const I = { x: 100, y: 100 };

describe('law of reflection on a mirror', () => {
  it('makes the angle of reflection equal the angle of incidence', () => {
    for (const i of [0, 15, 30, 45, 60, 80]) expect(reflectionAngle(i)).toBe(i);
  });

  it('sends a ray along the normal straight back', () => {
    expect(reflectOnFacet(0, 0).out).toBe(0);
  });

  it('places points around the point of incidence', () => {
    const up = fromNormal(I, 10, 0);
    expect(up.x).toBeCloseTo(100);
    expect(up.y).toBeCloseTo(90);
    const right = fromNormal(I, 10, 90);
    expect(right.x).toBeCloseTo(110);
    expect(right.y).toBeCloseTo(100);
  });

  it('reads the angle of incidence back from the laser position', () => {
    expect(incidenceFrom(I, fromNormal(I, 50, -35))).toBe(35);
    expect(incidenceFrom(I, { x: 150, y: 50 })).toBe(0);
    expect(incidenceFrom(I, { x: 0, y: 99 })).toBe(80);
  });
});

describe('diffuse reflection', () => {
  const pattern = [-12, 9, 15, -6, -14];

  it('keeps the law about each facet normal', () => {
    const r = reflectOnFacet(30, 10);
    expect(r.out).toBe(50);
    expect(r.incidence).toBe(40);
    expect(r.reflection).toBe(r.incidence);
  });

  it('scatters a parallel beam, unlike a smooth mirror', () => {
    expect(spread(40, [0, 0, 0, 0, 0])).toBe(0);
    expect(spread(40, facetTilts(40, pattern))).toBeGreaterThan(30);
  });

  it('never sends a ray into the surface', () => {
    for (let i = 0; i <= 80; i += 5) {
      for (const t of facetTilts(i, pattern)) {
        expect(Math.abs(reflectOnFacet(i, t).out)).toBeLessThanOrEqual(MAX_OUT);
      }
    }
  });
});
