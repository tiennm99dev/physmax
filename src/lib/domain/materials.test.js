import { describe, expect, it } from 'vitest';
import { LIQUIDS, SOLIDS, material, qty, specificWeight, tidy, toGPerCm3 } from './materials.js';

describe('chapter materials', () => {
  it('finds a material by id and rejects an unknown one', () => {
    expect(material('sat').density).toBe(7800);
    expect(material('nuoc').density).toBe(1000);
    expect(() => material('khong-co')).toThrow();
  });

  it('keeps ids unique across solids and liquids', () => {
    const ids = [...SOLIDS, ...LIQUIDS].map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('converts kg/m³ to g/cm³ and gives d = 10D', () => {
    expect(toGPerCm3(2700)).toBe(2.7);
    expect(toGPerCm3(13600)).toBe(13.6);
    expect(specificWeight(1000)).toBe(10000);
    expect(tidy(0.1 + 0.2)).toBe(0.3);
  });

  it('writes numbers the way the book prints them', () => {
    expect(qty(2697.3, 1)).toBe('2 697,3');
    expect(qty(7800)).toBe('7 800');
    expect(qty(2.75, 2)).toBe('2,75');
    expect(qty(0)).toBe('0');
    expect(qty(-1.5)).toBe('−1,5');
  });
});
