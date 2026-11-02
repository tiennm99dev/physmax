import { describe, expect, it } from 'vitest';
import {
  G,
  PAIRS,
  TUBE,
  fallDistance,
  fallSpeed,
  fallTime,
  flashes,
  runNote,
  terminalIn,
} from './engine.js';

describe('free fall with no air', () => {
  it('follows v = gt and s = gt²/2', () => {
    expect(fallSpeed(2, Infinity)).toBeCloseTo(19.6, 9);
    expect(fallDistance(2, Infinity)).toBeCloseTo(19.6, 9);
    expect(fallTime(19.6, Infinity)).toBeCloseTo(2, 9);
  });

  it('gives every body the same time', () => {
    const times = PAIRS.flatMap((p) => p.bodies).map((b) => fallTime(TUBE, terminalIn(b, false)));
    expect(new Set(times).size).toBe(1);
    expect(times[0]).toBeCloseTo(Math.sqrt(2 / G), 9);
  });

  it('shows flashes whose gaps grow by the same step', () => {
    const marks = flashes(Infinity, 0.1);
    expect(marks.slice(0, 4)).toEqual([0, 0.049, 0.196, 0.441]);
    const gaps = marks.slice(1).map((m, i) => m - marks[i]);
    const steps = gaps.slice(1).map((g, i) => g - gaps[i]);
    expect(steps.every((s) => Math.abs(s - G * 0.01) < 1e-3)).toBe(true);
  });
});

describe('falling through air', () => {
  it('approaches free fall for a large terminal speed', () => {
    expect(fallDistance(0.4, 1e4)).toBeCloseTo(fallDistance(0.4, Infinity), 4);
  });

  it('never exceeds its terminal speed', () => {
    expect(fallSpeed(50, 0.6)).toBeCloseTo(0.6, 9);
  });

  it('inverts distance and time, even for a very light body', () => {
    const failures = [];
    for (const terminal of [0.6, 1, 6, 40]) {
      const t = fallTime(TUBE, terminal);
      if (Math.abs(fallDistance(t, terminal) - TUBE) > 1e-9) failures.push(terminal);
    }
    expect(failures).toEqual([]);
  });

  it('separates the two bodies of every pair', () => {
    const failures = PAIRS.filter(({ bodies: [a, b] }) => {
      return fallTime(TUBE, a.terminal) >= fallTime(TUBE, b.terminal);
    });
    expect(failures).toEqual([]);
  });
});

describe('runNote', () => {
  it('names the cause in air and the equal fall with no air', () => {
    expect(runNote(PAIRS[1], true)).toContain('lực cản');
    expect(runNote(PAIRS[0], false)).toContain('cùng chạm đáy');
    expect(runNote(PAIRS[0], false)).toContain('0{,}45');
  });
});
