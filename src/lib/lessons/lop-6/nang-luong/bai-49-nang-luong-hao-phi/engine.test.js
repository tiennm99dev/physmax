import { describe, expect, it } from 'vitest';
import { BULBS, bulb, split, totalFor, wasted } from './engine.js';

describe('useful and wasted energy of bulbs', () => {
  it('splits the total so that useful plus wasted equals it', () => {
    expect(split('soi-dot', 100)).toEqual({ total: 100, useful: 10, wasted: 90 });
    expect(split('led', 100)).toEqual({ total: 100, useful: 40, wasted: 60 });
    for (const b of BULBS) {
      const s = split(b.id, 60);
      expect(s.useful + s.wasted).toBeCloseTo(60, 10);
    }
  });

  it('needs far less electrical energy from an LED for the same light', () => {
    expect(totalFor('soi-dot', 10)).toBe(100);
    expect(totalFor('compact', 10)).toBe(40);
    expect(totalFor('led', 10)).toBe(25);
  });

  it('wastes the difference and falls back to the filament bulb', () => {
    expect(wasted(100, 40)).toBe(60);
    expect(bulb(/** @type {any} */ ('khong-co')).id).toBe('soi-dot');
  });
});
