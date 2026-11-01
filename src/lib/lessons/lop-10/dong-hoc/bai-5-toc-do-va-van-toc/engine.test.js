import { describe, expect, it } from 'vitest';
import {
  RIVER_LENGTH,
  RIVER_WIDTH,
  along,
  courseNote,
  crossing,
  positionAt,
  runTime,
  startOf,
} from './engine.js';

describe('crossing', () => {
  it('computes the 3-4-5 crossing of the lesson', () => {
    const c = crossing(3, 4);
    expect(c.speed).toBe(5);
    expect(c.time).toBe(20);
    expect(c.drift).toBe(80);
    expect(c.path).toBe(100);
    expect(c.angle).toBe(53.1);
  });

  it('keeps the crossing time when the current changes', () => {
    expect(crossing(3, 0).time).toBe(crossing(3, 4).time);
    expect(crossing(3, 0).drift).toBe(0);
  });
});

describe('along the river', () => {
  it('adds with the current and subtracts against it', () => {
    expect(along(5, 2, 'xuoi')).toBe(7);
    expect(along(5, 2, 'nguoc')).toBe(-3);
    expect(along(2, 3, 'nguoc')).toBe(1);
    expect(along(3, 3, 'nguoc')).toBe(0);
  });
});

describe('runs', () => {
  it('moves the boat on the vector sum', () => {
    expect(positionAt('ngang', 3, 4, 10)).toEqual({ x: 40, y: 30 });
    expect(positionAt('xuoi', 5, 2, 2)).toEqual({ x: 14, y: 0 });
    expect(positionAt('nguoc', 5, 2, 2)).toEqual({ x: -6, y: 0 });
  });

  it('ends a crossing at the far bank when it stays on the drawing', () => {
    expect(runTime('ngang', 3, 1)).toBe(RIVER_WIDTH / 3);
  });

  it('never leaves the drawing', () => {
    const failures = [];
    for (const course of /** @type {const} */ (['ngang', 'xuoi', 'nguoc'])) {
      for (let boat = 2; boat <= 5; boat += 0.5) {
        for (let water = 0; water <= 4; water += 0.5) {
          const start = startOf(course);
          const end = positionAt(course, boat, water, runTime(course, boat, water));
          const x = start.x + end.x;
          if (x < -1e-6 || x > RIVER_LENGTH + 1e-6) failures.push({ course, boat, water, x });
        }
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('courseNote', () => {
  it('names the drift and the standstill', () => {
    expect(courseNote('nguoc', 3, 3)).toContain('đứng yên');
    expect(courseNote('nguoc', 2, 3)).toContain('trôi lùi');
    expect(courseNote('xuoi', 2, 3)).toContain('tổng');
  });
});
