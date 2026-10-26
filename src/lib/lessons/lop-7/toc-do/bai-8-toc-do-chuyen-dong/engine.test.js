import { describe, expect, it } from 'vitest';
import { RACERS, compare, coveredAt, rank } from './engine.js';

const [an, binh, chi, dung] = RACERS;

describe('ranking by speed', () => {
  it('orders the starting racers by s/t', () => {
    const r = rank(RACERS);
    expect(r.map((x) => x.id)).toEqual(['chi', 'an', 'binh', 'dung']);
    expect(r[0].v).toBeCloseTo(6.25);
    expect(r[0].kmh).toBeCloseTo(22.5);
    expect(r[1].v).toBeCloseTo(6);
    expect(r[2].v).toBeCloseTo(5);
    expect(r[3].v).toBeCloseTo(4.5);
  });

  it('gives equal speeds the same rank', () => {
    const r = rank([
      { ...an, s: 50, t: 10 },
      { ...binh, s: 100, t: 20 },
      { ...chi, s: 30, t: 10 },
    ]);
    expect(r.map((x) => x.rank)).toEqual([1, 1, 3]);
  });
});

describe('comparing two racers', () => {
  it('compares times when the distance is the same', () => {
    expect(compare(an, binh)).toEqual({ rule: 'same-s', faster: an });
  });

  it('compares distances when the time is the same', () => {
    expect(compare(chi, dung)).toEqual({ rule: 'same-t', faster: chi });
  });

  it('compares s/t otherwise', () => {
    expect(compare(an, chi)).toEqual({ rule: 'speed', faster: chi });
    expect(compare({ ...an, s: 50, t: 10 }, { ...binh, s: 100, t: 20 }).faster).toBe(null);
  });
});

describe('race animation', () => {
  it('moves at the racer speed and stops at the finish', () => {
    expect(coveredAt(an, 5)).toBeCloseTo(30);
    expect(coveredAt(an, 20)).toBe(60);
    expect(coveredAt(an, -1)).toBe(0);
  });
});
