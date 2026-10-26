import { describe, expect, it } from 'vitest';
import {
  BLOCK_MATERIALS,
  EDGE,
  blockMass,
  blockVolume,
  closestMaterial,
  densityOf,
  measure,
} from './engine.js';

describe('density of a block', () => {
  it('computes volume and mass', () => {
    expect(blockVolume(2, 3, 4)).toBe(24);
    expect(blockMass(2700, 24)).toBe(64.8);
    expect(blockMass(7800, 1000)).toBe(7800);
  });

  it('gives D in g/cm³ and kg/m³', () => {
    expect(densityOf(64.8, 24)).toEqual({ gPerCm3: 2.7, kgPerM3: 2700 });
    expect(() => densityOf(1, 0)).toThrow();
  });

  it('keeps m/V the same whatever the size of the block', () => {
    for (const m of BLOCK_MATERIALS) {
      const small = measure(m.density, EDGE.min, EDGE.min, EDGE.min);
      const big = measure(m.density, EDGE.max, 7, 3);
      expect(small.ratio).toBe(big.ratio);
      expect(small.ratio * 1000).toBeCloseTo(m.density, 6);
    }
  });

  it('names the material from a measured density', () => {
    expect(closestMaterial(2650).id).toBe('nhom');
    expect(closestMaterial(8950).id).toBe('dong');
    expect(closestMaterial(790).id).toBe('go');
  });
});
