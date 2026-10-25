import { describe, expect, it } from 'vitest';
import {
  PARALLAX,
  RULERS,
  THINGS,
  correctReading,
  judge,
  readingAt,
  suitability,
} from './engine.js';

const [a, b, c] = RULERS;
const thing = (/** @type {string} */ id) => {
  const t = THINGS.find((x) => x.id === id);
  if (!t) throw new Error(id);
  return t;
};

describe('virtual ruler', () => {
  it('picks the ruler that measures in one go with the finest division', () => {
    expect(suitability(a, 176)).toBe('ngan');
    expect(suitability(b, 176)).toBe('phu-hop');
    expect(suitability(c, 176)).toBe('tho');
    expect(suitability(a, 43)).toBe('phu-hop');
    expect(suitability(b, 43)).toBe('phu-hop');
    expect(suitability(c, 245)).toBe('phu-hop');
  });

  it('gives every object at least one suitable ruler', () => {
    for (const t of THINGS) {
      expect(
        RULERS.some((r) => suitability(r, t.length) === 'phu-hop'),
        t.id,
      ).toBe(true);
    }
  });

  it('rounds the reading to the nearest division', () => {
    expect(correctReading(thing('but-chi'), b)).toBe(176);
    expect(correctReading(thing('but-chi'), c)).toBe(175);
    expect(correctReading(thing('vo'), c)).toBe(245);
    expect(correctReading(thing('tay'), c)).toBe(45);
  });

  it('reads the far end, shifted when the eye looks from a side', () => {
    const t = thing('la');
    expect(readingAt(t, b, 0, 'vuong-goc')).toBe(95);
    expect(readingAt(t, b, 0, 'trai')).toBe(95 + PARALLAX);
    expect(readingAt(t, b, 0, 'phai')).toBe(95 - PARALLAX);
    expect(readingAt(t, b, 20, 'vuong-goc')).toBe(115);
    expect(readingAt(thing('vo'), a, 0, 'vuong-goc')).toBe(null);
  });

  it('judges the measurement step by step', () => {
    const t = thing('but-chi');
    const base = { thing: t, ruler: b, offset: 0, eye: /** @type {const} */ ('vuong-goc') };
    expect(judge({ ...base, typed: 176 })).toBe('dung');
    expect(judge({ ...base, typed: 175 })).toBe('sai-so');
    expect(judge({ ...base, offset: 4, typed: 176 })).toBe('lech-0');
    expect(judge({ ...base, eye: 'trai', typed: 176 })).toBe('mat-lech');
    expect(judge({ ...base, ruler: a, typed: 176 })).toBe('ngan');
    expect(judge({ ...base, ruler: c, typed: 175 })).toBe('tho');
  });
});
