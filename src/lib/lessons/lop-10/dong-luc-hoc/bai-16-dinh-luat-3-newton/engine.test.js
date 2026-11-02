import { describe, expect, it } from 'vitest';
import { PUSH_TIME, RUN_TIME, outcome, rinkExtent, skatersAt, stillTime } from './engine.js';

describe('two skaters pushing off', () => {
  it('gives each an acceleration set by their own mass', () => {
    expect(outcome(120, 50, 60)).toMatchObject({ aA: 2.4, aB: 2 });
  });

  it('keeps mass times speed equal on both sides', () => {
    const { vA, vB } = outcome(150, 40, 75);
    expect(40 * vA).toBeCloseTo(75 * vB, 6);
  });

  it('stops a run without animation in the push first, so the meters show the force', () => {
    const first = stillTime(0);
    expect(skatersAt(150, 50, 75, first).reading).toBe(150);
    expect(stillTime(first)).toBe(RUN_TIME);
    expect(stillTime(RUN_TIME)).toBeLessThan(PUSH_TIME);
  });

  it('shows the force on both meters only during the push', () => {
    expect(skatersAt(100, 50, 60, 0).reading).toBe(0);
    expect(skatersAt(100, 50, 60, 0.5).reading).toBe(100);
    expect(skatersAt(100, 50, 60, 2).reading).toBe(0);
  });

  it('sends them in opposite directions, the lighter one farther', () => {
    const { xA, xB } = skatersAt(100, 40, 80, RUN_TIME);
    expect(xA).toBeLessThan(0);
    expect(xB).toBeGreaterThan(0);
    expect(Math.abs(xA)).toBeCloseTo(2 * xB, 6);
  });

  it('sizes the rink to the farther skater', () => {
    const { xA } = skatersAt(300, 30, 90, RUN_TIME);
    expect(rinkExtent(300, 30, 90)).toBe(Math.abs(xA));
    expect(rinkExtent(50, 90, 90)).toBe(5);
  });
});
