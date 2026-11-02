import { describe, expect, it } from 'vitest';
import {
  COLUMN,
  GATE,
  LOCAL_G,
  fallenAt,
  gravityFrom,
  heightRow,
  idealTime,
  reading,
  slopeThroughOrigin,
  snapGate,
  summarize,
} from './engine.js';

describe('a reading', () => {
  it('stays within the scatter of the ideal time, for many draws', () => {
    const failures = [];
    for (let draw = 1; draw <= 200; draw++) {
      const r = reading(draw, 0.8);
      if (Math.abs(r - idealTime(0.8)) > 0.002) failures.push(draw);
    }
    expect(failures).toEqual([]);
  });

  it('repeats for the same draw and varies between draws', () => {
    expect(reading(7, 0.5)).toBe(reading(7, 0.5));
    const values = new Set([1, 2, 3, 4, 5, 6].map((draw) => reading(draw, 0.5)));
    expect(values.size).toBeGreaterThan(1);
  });

  it('keeps the falling cylinder on the rail', () => {
    expect(fallenAt(idealTime(0.5))).toBeCloseTo(0.5, 9);
    expect(fallenAt(10)).toBe(COLUMN);
  });
});

describe('the g of one gate position', () => {
  it('reproduces the first worked example', () => {
    const row = heightRow(0.8, [0.404, 0.405, 0.403]);
    expect(row.mean).toBe(0.404);
    expect(row.tSquared).toBe(0.1632);
    expect(row.g).toBe(9.803);
  });

  it('inverts the fall time', () => {
    expect(gravityFrom(0.6, idealTime(0.6))).toBeCloseTo(LOCAL_G, 9);
  });
});

describe('the result over several positions', () => {
  it('reproduces the second worked example', () => {
    const rows = [
      heightRow(0.4, [0.286]),
      heightRow(0.6, [0.35]),
      heightRow(0.8, [0.404]),
      heightRow(1, [0.452]),
      heightRow(1.2, [0.495]),
    ];
    expect(rows.map((r) => r.g)).toEqual([9.78, 9.796, 9.803, 9.789, 9.795]);
    const result = summarize(rows);
    expect(result.g).toBe(9.793);
    expect(result.error).toBe(0.006);
    expect(result.slope).toBe(4.897);
    expect(result.gFromSlope).toBe(9.79);
  });

  it('finds the slope of points on a line through the origin', () => {
    const rows = [
      { s: 0.2, tSquared: 0.04 },
      { s: 1, tSquared: 0.2 },
    ];
    expect(slopeThroughOrigin(rows)).toBeCloseTo(5, 9);
    expect(slopeThroughOrigin([])).toBe(0);
  });
});

describe('snapGate', () => {
  it('rounds to a step and stays on the rail', () => {
    expect(snapGate(0.44)).toBe(0.4);
    expect(snapGate(0.05)).toBe(GATE.min);
    expect(snapGate(3)).toBe(GATE.max);
  });
});
