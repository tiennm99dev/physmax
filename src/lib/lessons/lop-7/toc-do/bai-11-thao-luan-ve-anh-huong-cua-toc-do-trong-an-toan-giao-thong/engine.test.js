import { describe, expect, it } from 'vitest';
import { outcome, safeGap, stopping, travelledAt } from './engine.js';

describe('stopping distance', () => {
  it('splits into reaction and braking distance', () => {
    const s = stopping(54, 1, 7);
    expect(s.v).toBeCloseTo(15);
    expect(s.think).toBeCloseTo(15);
    expect(s.brake).toBeCloseTo(225 / 14);
    expect(s.total).toBeCloseTo(15 + 225 / 14);
  });

  it('quadruples the braking distance when the speed doubles', () => {
    expect(stopping(120, 1, 7).brake / stopping(60, 1, 7).brake).toBeCloseTo(4);
    expect(stopping(120, 1, 7).think / stopping(60, 1, 7).think).toBeCloseTo(2);
  });

  it('is longer on a wet road and with a distracted driver', () => {
    expect(stopping(60, 1, 4).total).toBeGreaterThan(stopping(60, 1, 7).total);
    expect(stopping(60, 2, 7).think).toBeCloseTo(2 * stopping(60, 1, 7).think);
  });

  it('fits the rule gaps at their top speeds on a dry road', () => {
    expect(stopping(60, 1, 7).total).toBeCloseTo(36.5, 1);
    expect(stopping(90, 1, 7).total).toBeCloseTo(69.6, 1);
  });
});

describe('the run', () => {
  it('ends where the stopping distance says', () => {
    const s = stopping(72, 1, 7);
    expect(travelledAt(72, 1, 7, 0.5)).toBeCloseTo(10);
    expect(travelledAt(72, 1, 7, 100)).toBeCloseTo(s.total);
    expect(travelledAt(72, 1, 7, s.time)).toBeCloseTo(s.total);
    expect(travelledAt(72, 1, 7, -1)).toBe(0);
  });

  it('stops short or hits the obstacle', () => {
    const near = outcome(60, 1, 7, 30);
    expect(near.hit).toBe(true);
    expect(near.impactKmh).toBeGreaterThan(0);
    expect(near.impactKmh).toBeLessThan(60);
    const far = outcome(60, 1, 7, 50);
    expect(far.hit).toBe(false);
    expect(far.left).toBeCloseTo(50 - stopping(60, 1, 7).total);
    expect(outcome(60, 2, 7, 20).impactKmh).toBeCloseTo(60);
  });
});

describe('safe gap rule', () => {
  it('follows the table of minimum gaps', () => {
    expect(safeGap(50)).toBe(null);
    expect(safeGap(60)).toBe(35);
    expect(safeGap(80)).toBe(55);
    expect(safeGap(90)).toBe(70);
    expect(safeGap(110)).toBe(100);
  });
});
