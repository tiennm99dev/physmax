import { describe, expect, it } from 'vitest';
import { cartAt, playbackRate, roadMarks, stopDistance, stopTime, SURFACES } from './engine.js';

describe('the sliding cart', () => {
  it('stops sooner on a rougher surface', () => {
    const distances = SURFACES.filter((s) => s.drag > 0).map((s) => stopDistance(4, s.drag));
    expect(distances).toEqual([...distances].sort((a, b) => a - b));
    expect(stopDistance(4, 1)).toBe(8);
    expect(stopTime(4, 1)).toBe(4);
  });

  it('never stops with no friction', () => {
    expect(stopDistance(4, 0)).toBe(Infinity);
    expect(stopTime(4, 0)).toBe(Infinity);
    expect(cartAt(4, 0, 100)).toEqual({ v: 4, d: 400 });
  });

  it('rests once it has stopped', () => {
    expect(cartAt(4, 1, 2)).toEqual({ v: 2, d: 6 });
    expect(cartAt(4, 1, 99)).toEqual({ v: 0, d: 8 });
  });

  it('speeds up only the long slides', () => {
    expect(playbackRate(4, 3)).toBe(1);
    expect(playbackRate(4, 0.1)).toBe(5);
    expect(playbackRate(4, 0)).toBe(1);
  });

  it('lists the road marks in view', () => {
    expect(roadMarks(7, 12, 5)).toEqual([10, 15]);
    expect(roadMarks(0, 12, 5)).toEqual([0, 5, 10]);
  });
});
