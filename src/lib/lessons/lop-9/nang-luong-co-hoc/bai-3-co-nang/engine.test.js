import { describe, expect, it } from 'vitest';
import {
  MASS,
  START_X,
  advance,
  blockingPoint,
  energies,
  speed,
  start,
  startHeight,
  trackAt,
  trackLength,
} from './engine.js';

const VALLEY = [5, 0.5, 3, 1, 4];

/** @param {number[]} heights @param {boolean} friction @param {number} seconds */
function run(heights, friction, seconds) {
  let r = start(heights);
  const trace = [r];
  for (let k = 0; k < seconds * 20; k++) {
    r = advance(heights, r, 0.05, friction);
    trace.push(r);
  }
  return trace;
}

describe('track shape', () => {
  it('passes through every control height, flat there', () => {
    /** @type {number[]} */
    const bad = [];
    VALLEY.forEach((h, i) => {
      const p = trackAt(VALLEY, i * 2);
      if (Math.abs(p.y - h) > 1e-9 || Math.abs(p.slope) > 1e-9) bad.push(i);
    });
    expect(bad).toEqual([]);
    expect(trackLength(VALLEY)).toBe(8);
    expect(trackAt(VALLEY, 1).y).toBeCloseTo(2.75, 9);
    expect(trackAt(VALLEY, 1).slope).toBeLessThan(0);
  });
});

describe('skateboarder', () => {
  it('starts at rest with only potential energy', () => {
    const r = start(VALLEY);
    expect(r.x).toBe(START_X);
    const e = energies(VALLEY, r);
    expect(e.wd).toBe(0);
    expect(e.wt).toBeCloseTo(MASS * 10 * startHeight(VALLEY), 9);
  });

  it('keeps mechanical energy constant without friction', () => {
    const trace = run(VALLEY, false, 12);
    const total = trace[0].total;
    const bad = trace.filter((r) => {
      const e = energies(VALLEY, r);
      return Math.abs(e.w - total) > 1e-6 || r.heat !== 0;
    });
    expect(bad).toEqual([]);
    // it really moves through the track and comes back
    expect(Math.max(...trace.map((r) => r.x))).toBeGreaterThan(7.5);
    expect(Math.min(...trace.slice(40).map((r) => r.x))).toBeLessThan(1);
    expect(Math.max(...trace.map((r) => speed(VALLEY, r)))).toBeGreaterThan(8.7);
  });

  it('turns mechanical energy into heat with friction, the total unchanged', () => {
    const trace = run(VALLEY, true, 40);
    const total = trace[0].total;
    /** @type {Array<[string, number]>} */
    const bad = [];
    let lastW = Infinity;
    for (const r of trace) {
      const e = energies(VALLEY, r);
      if (Math.abs(e.w + e.heat - total) > 1e-6) bad.push(['sum', r.x]);
      if (e.w > lastW + 1e-6) bad.push(['grew', r.x]);
      lastW = e.w;
    }
    expect(bad).toEqual([]);
    expect(trace.at(-1)?.heat).toBeGreaterThan(total * 0.3);
  });

  it('never rises above the start height without friction', () => {
    const hill = [3, 1, 4, 0, 2];
    const trace = run(hill, false, 10);
    const top = startHeight(hill);
    const high = trace.filter((r) => trackAt(hill, r.x).y > top + 1e-6);
    expect(high).toEqual([]);
    expect(Math.max(...trace.map((r) => r.x))).toBeLessThan(4);
    expect(blockingPoint(hill)).toBe(2);
    expect(blockingPoint(VALLEY)).toBe(-1);
  });

  it('does not move from a start on the ground', () => {
    const flat = [0, 0, 0, 0, 0];
    const r = start(flat);
    expect(r.resting).toBe(true);
    expect(advance(flat, r, 1, false)).toBe(r);
  });
});
