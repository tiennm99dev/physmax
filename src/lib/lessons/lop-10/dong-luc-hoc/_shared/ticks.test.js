import { describe, expect, it } from 'vitest';
import { ticksUpTo } from './ticks.js';

describe('axis marks', () => {
  it('uses round steps and never passes the maximum', () => {
    expect(ticksUpTo(10)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(ticksUpTo(70)).toEqual([0, 20, 40, 60]);
    expect(ticksUpTo(4)).toEqual([0, 1, 2, 3, 4]);
    expect(ticksUpTo(0.8)).toEqual([0, 0.2, 0.4, 0.6, 0.8]);
  });
});
