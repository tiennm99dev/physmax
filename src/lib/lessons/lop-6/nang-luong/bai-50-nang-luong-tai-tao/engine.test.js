import { describe, expect, it } from 'vitest';
import { TILES, canPlace, cityOutput, output } from './engine.js';

/** @type {import('./engine.js').Conditions} */
const sunnyWindyRainy = { sky: 'nang', wind: 'manh', season: 'mua' };
/** @type {import('./engine.js').Conditions} */
const calmDryNight = { sky: 'dem', wind: 'lang', season: 'kho' };

describe('placing renewable sources', () => {
  it('builds hydro only on the river and nothing else there', () => {
    expect(canPlace('thuy-dien', 'song').ok).toBe(true);
    expect(canPlace('thuy-dien', 'dat').ok).toBe(false);
    expect(canPlace('pin', 'song').ok).toBe(false);
    expect(canPlace('gio', 'mai-nha').ok).toBe(false);
    expect(canPlace('pin', 'mai-nha').ok).toBe(true);
    expect(TILES.filter((t) => t === 'song')).toHaveLength(1);
  });

  it('makes solar depend on the sky, wind on the wind and hydro on the season', () => {
    expect(output('pin', 'mai-nha', sunnyWindyRainy)).toBe(10);
    expect(output('pin', 'mai-nha', { ...sunnyWindyRainy, sky: 'may' })).toBe(4);
    expect(output('pin', 'mai-nha', calmDryNight)).toBe(0);
    expect(output('gio', 'bo-bien', sunnyWindyRainy)).toBe(12);
    expect(output('gio', 'dat', sunnyWindyRainy)).toBe(6);
    expect(output('gio', 'doi', calmDryNight)).toBe(0);
    expect(output('thuy-dien', 'song', sunnyWindyRainy)).toBe(30);
    expect(output('thuy-dien', 'song', calmDryNight)).toBe(15);
    expect(output('gio', 'mai-nha', sunnyWindyRainy)).toBe(0);
  });
});

describe('powering the city', () => {
  /** @type {import('./engine.js').Placements} */
  const mix = { 0: 'gio', 1: 'gio', 2: 'pin', 3: 'pin', 4: 'thuy-dien', 6: 'pin', 7: 'gio' };

  it('adds up the sources and compares them with demand', () => {
    const r = cityOutput(mix, sunnyWindyRainy);
    expect(r.by).toEqual({ pin: 30, gio: 36, 'thuy-dien': 30 });
    expect(r.total).toBe(96);
    expect(r.demand).toBe(100);
    expect(r.shortfall).toBe(4);
  });

  it('falls short on a calm, dry night', () => {
    const r = cityOutput(mix, calmDryNight);
    expect(r.total).toBe(15);
    expect(r.demand).toBe(80);
    expect(r.shortfall).toBe(65);
    expect(r.surplus).toBe(0);
  });
});
