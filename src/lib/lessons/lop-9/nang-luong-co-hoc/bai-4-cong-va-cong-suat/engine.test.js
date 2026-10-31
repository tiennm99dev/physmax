import { describe, expect, it } from 'vitest';
import { BRICK, compare, liftAt, power, work } from './engine.js';

describe('work and power', () => {
  it('computes A = F·s and 𝒫 = A/t', () => {
    expect(work(700, 2)).toBe(1400);
    expect(work(10000, 20)).toBe(200000);
    expect(power(200000, 80)).toBe(2500);
    expect(power(36000, 120)).toBe(300);
    expect(power(5, 0)).toBe(0);
  });

  it('reproduces the two-person brick case', () => {
    const an = liftAt({ bricks: 10, time: 50 }, 4, 50);
    const binh = liftAt({ bricks: 15, time: 60 }, 4, 60);
    expect(BRICK).toBe(16);
    expect(an).toMatchObject({ force: 160, work: 640, power: 12.8, finished: true });
    expect(binh).toMatchObject({ force: 240, work: 960, power: 16, finished: true });
    expect(compare(an, binh)).toEqual({ moreWork: 'b', morePower: 'b' });
  });

  it('lifts at a steady pace and stops at the top', () => {
    const half = liftAt({ bricks: 5, time: 40 }, 6, 20);
    expect(half.h).toBeCloseTo(3, 12);
    expect(half.workSoFar).toBeCloseTo(240, 9);
    expect(half.finished).toBe(false);
    expect(liftAt({ bricks: 5, time: 40 }, 6, 99).h).toBe(6);
    expect(liftAt({ bricks: 5, time: 40 }, 6, -1).h).toBe(0);
  });

  it('separates more work from more power', () => {
    const a = liftAt({ bricks: 10, time: 20 }, 4, 0);
    const b = liftAt({ bricks: 15, time: 60 }, 4, 0);
    expect(compare(a, b)).toEqual({ moreWork: 'b', morePower: 'a' });
    expect(compare(a, a)).toEqual({ moreWork: 'equal', morePower: 'equal' });
  });
});
