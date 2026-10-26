import { describe, expect, it } from 'vitest';
import { HEIGHTS, MASSES, SPEEDS, compare, dent, push } from './engine.js';
import { FORMS, CARDS } from './forms.js';

describe('dropping a weight into sand', () => {
  it('leaves a deeper dent from higher up and for a heavier weight', () => {
    expect(dent(100, 10)).toBe(0.5);
    expect(dent(100, 30)).toBe(1.5);
    expect(dent(200, 10)).toBe(1);
    expect(dent(200, 30)).toBe(3);
    for (const m of MASSES) {
      for (let i = 1; i < HEIGHTS.length; i++) {
        expect(dent(m, HEIGHTS[i])).toBeGreaterThan(dent(m, HEIGHTS[i - 1]));
      }
    }
  });
});

describe('a rolling ball hitting a block', () => {
  it('pushes the block farther for a faster or heavier ball', () => {
    expect(push(100, 1)).toBe(2);
    expect(push(100, 3)).toBe(18);
    expect(push(200, 3)).toBe(36);
    for (let i = 1; i < SPEEDS.length; i++) {
      expect(push(100, SPEEDS[i])).toBeGreaterThan(push(100, SPEEDS[i - 1]));
    }
    expect(compare(push(200, 1), push(100, 1))).toBe(1);
    expect(compare(1, 1)).toBe(0);
  });
});

describe('energy form cards', () => {
  it('puts every card in a known form and gives every form a card', () => {
    const ids = FORMS.map((f) => f.id);
    for (const c of CARDS) expect(ids, c.id).toContain(c.bin);
    for (const f of FORMS)
      expect(
        CARDS.some((c) => c.bin === f.id),
        f.id,
      ).toBe(true);
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
  });
});
