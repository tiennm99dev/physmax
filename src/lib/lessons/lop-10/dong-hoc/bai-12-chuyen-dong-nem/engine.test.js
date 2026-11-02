import { describe, expect, it } from 'vitest';
import {
  G,
  components,
  droppedHeight,
  flightTime,
  landingNote,
  pathTo,
  peakOf,
  rangeOf,
  stateAt,
} from './engine.js';

describe('a horizontal throw', () => {
  const shot = { v0: 15, angle: 0, height: 19.6 };

  it('falls in the time of a free fall from the same height', () => {
    expect(flightTime(shot)).toBeCloseTo(2, 9);
    expect(rangeOf(shot)).toBeCloseTo(30, 6);
  });

  it('lands at the same moment whatever its speed', () => {
    expect(flightTime({ ...shot, v0: 30 })).toBeCloseTo(flightTime(shot), 9);
  });

  it('keeps level with a body dropped at the same moment', () => {
    const failures = [];
    for (const t of [0, 0.5, 1, 1.5, 2]) {
      if (Math.abs(stateAt(shot, t).y - droppedHeight(shot, t)) > 1e-9) failures.push(t);
    }
    expect(failures).toEqual([]);
  });

  it('reaches the ground at the speed of its two parts', () => {
    const end = stateAt(shot, 2);
    expect(end.vx).toBeCloseTo(15, 6);
    expect(end.vy).toBeCloseTo(-19.6, 6);
    expect(end.speed).toBeCloseTo(Math.hypot(15, 19.6), 6);
  });
});

describe('an oblique throw from the ground', () => {
  it('matches H = v0²sin²α/2g and L = v0²sin2α/g', () => {
    const shot = { v0: 20, angle: 30, height: 0 };
    expect(peakOf(shot)).toBeCloseTo((400 * 0.25) / (2 * G), 5);
    expect(rangeOf(shot)).toBeCloseTo((400 * Math.sin(Math.PI / 3)) / G, 5);
    expect(flightTime(shot)).toBeCloseTo((2 * 10) / G, 5);
  });

  it('flies furthest at 45° and equally far at complementary angles', () => {
    const at = (/** @type {number} */ angle) => rangeOf({ v0: 25, angle, height: 0 });
    expect(at(45)).toBeGreaterThan(at(40));
    expect(at(45)).toBeGreaterThan(at(50));
    expect(at(30)).toBeCloseTo(at(60), 4);
  });

  it('has no vertical speed at the top and a constant horizontal one', () => {
    const shot = { v0: 20, angle: 60, height: 0 };
    const { vx, vy0 } = components(shot);
    const top = stateAt(shot, vy0 / G);
    expect(top.vy).toBeCloseTo(0, 5);
    expect(top.vx).toBe(vx);
    expect(top.y).toBeCloseTo(peakOf(shot), 5);
  });
});

describe('the drawn path and the target', () => {
  it('stops at the ground and clamps the time', () => {
    const shot = { v0: 10, angle: 45, height: 0 };
    const path = pathTo(shot, 100);
    expect(path.at(-1)?.x).toBeCloseTo(rangeOf(shot), 5);
    expect(path.at(-1)?.y).toBe(0);
    expect(stateAt(shot, -1).x).toBe(0);
  });

  it('calls a landing within the margin a hit and says which way it missed', () => {
    expect(landingNote(31, 30).hit).toBe(true);
    expect(landingNote(40, 30).text).toContain('quá bia');
    expect(landingNote(20, 30).text).toContain('trước bia');
  });
});
