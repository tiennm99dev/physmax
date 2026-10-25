import { describe, expect, it } from 'vitest';
import { ZERO, elapsed, gap, reset, rolled, start, stop, summarise, toDisplay } from './engine.js';

describe('stopwatch', () => {
  it('counts between Start and Stop', () => {
    let sw = start(ZERO, 1000);
    expect(elapsed(sw, 2500)).toBe(1500);
    sw = stop(sw, 3480);
    expect(elapsed(sw, 9999)).toBe(2480);
    expect(toDisplay(elapsed(sw, 0))).toBe(2.48);
  });

  it('carries on from the old reading when Reset is forgotten', () => {
    let sw = stop(start(ZERO, 0), 2000);
    sw = stop(start(sw, 5000), 7500);
    expect(toDisplay(elapsed(sw, 0))).toBe(4.5);
    expect(elapsed(reset(sw), 0)).toBe(0);
  });

  it('ignores Reset while running and a second Start', () => {
    const sw = start(ZERO, 100);
    expect(reset(sw)).toBe(sw);
    expect(start(sw, 900)).toBe(sw);
  });

  it('cuts the display to hundredths', () => {
    expect(toDisplay(2479.9)).toBe(2.47);
    expect(toDisplay(-5)).toBe(0);
  });
});

describe('rolling ball and trials', () => {
  it('rolls a quarter of the track in half the time', () => {
    expect(rolled(1.32, 2.64)).toBeCloseTo(0.25);
    expect(rolled(3, 2.64)).toBe(1);
    expect(rolled(-1, 2.64)).toBe(0);
  });

  it('averages only trials started from zero', () => {
    const s = summarise([
      { measured: 2.71, resetFirst: true },
      { measured: 2.58, resetFirst: true },
      { measured: 5.3, resetFirst: false },
      { measured: 2.65, resetFirst: true },
    ]);
    expect(s.count).toBe(3);
    expect(s.mean).toBe(2.65);
    expect(s.spread).toBe(0.07);
    expect(summarise([]).mean).toBe(null);
  });

  it('rounds differences to the division', () => {
    expect(gap(2.71, 2.64)).toBe(0.07);
    expect(gap(2.58, 2.64)).toBe(-0.06);
  });
});
