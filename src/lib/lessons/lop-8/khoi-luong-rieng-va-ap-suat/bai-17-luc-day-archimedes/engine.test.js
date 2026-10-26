import { describe, expect, it } from 'vitest';
import {
  BALANCE_MAX,
  BATH_LIQUIDS,
  BLOCK,
  BLOCK_MATERIALS,
  BLOCK_VOLUME,
  LOWER,
  buoyancy,
  floatDepth,
  hung,
  maxLower,
  release,
  weightOf,
} from './engine.js';

describe('Archimedes bench', () => {
  it('weighs the 100 cm³ block', () => {
    expect(BLOCK_VOLUME).toBe(100);
    expect(weightOf(7800)).toBe(7.8);
    expect(weightOf(2700)).toBe(2.7);
    for (const m of BLOCK_MATERIALS) expect(weightOf(m.density)).toBeLessThanOrEqual(BALANCE_MAX);
  });

  it('pushes up with F_A = d · V of the submerged part', () => {
    expect(buoyancy(1000, 100)).toBe(1);
    expect(buoyancy(800, 50)).toBe(0.4);
    expect(buoyancy(13600, 100)).toBe(13.6);
  });

  it('lowers the balance reading as the block goes in, then keeps it', () => {
    expect(hung(7800, 1000, LOWER.min)).toMatchObject({ sunk: 0, FA: 0, reading: 7.8 });
    expect(hung(7800, 1000, 2)).toMatchObject({ sunk: 2, volume: 50, FA: 0.5, reading: 7.3 });
    expect(hung(7800, 1000, 4).reading).toBe(6.8);
    expect(hung(7800, 1000, 9).reading).toBe(6.8);
  });

  it('lets a floating block slacken the string at its floating depth', () => {
    expect(floatDepth(800, 1000)).toBe(3.2);
    expect(maxLower(800, 1000)).toBe(3.2);
    const h = hung(800, 1000, 9);
    expect(h.depth).toBe(3.2);
    expect(h.FA).toBe(0.8);
    expect(h.reading).toBe(0);
    expect(h.slack).toBe(true);
    expect(floatDepth(7800, 1000)).toBeNull();
    expect(maxLower(7800, 1000)).toBe(LOWER.max);
    expect(floatDepth(7800, 13600)).toBeCloseTo((BLOCK.height * 7800) / 13600, 9);
  });

  it('sinks, hovers or floats by comparing P and F_A', () => {
    expect(release(7800, 1000).fate).toBe('chim');
    expect(release(800, 800).fate).toBe('lo-lung');
    expect(release(900, 800).fate).toBe('chim');
    expect(release(900, 1000)).toEqual({ fate: 'noi', P: 0.9, FAFull: 1, depth: 3.6 });
    expect(release(7800, 13600).fate).toBe('noi');
    for (const m of BLOCK_MATERIALS) {
      for (const l of BATH_LIQUIDS) {
        const r = release(m.density, l.density);
        const byDensity =
          m.density > l.density ? 'chim' : m.density === l.density ? 'lo-lung' : 'noi';
        expect(r.fate).toBe(byDensity);
      }
    }
  });
});
