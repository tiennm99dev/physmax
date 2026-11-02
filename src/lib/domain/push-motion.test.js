import { describe, expect, it } from 'vitest';
import { pushState } from './push-motion.js';

describe('pushState', () => {
  it('speeds up uniformly while the force acts', () => {
    expect(pushState(2, 1, 1, 0.5)).toEqual({ v: 1, x: 0.25 });
    expect(pushState(2, 1, 1, 1)).toEqual({ v: 2, x: 1 });
  });

  it('keeps its velocity once the force ends', () => {
    expect(pushState(2, 1, 1, 3)).toEqual({ v: 2, x: 5 });
  });

  it('gains less speed from the same force when heavier', () => {
    expect(pushState(2, 4, 1, 3).v).toBe(0.5);
  });
});
