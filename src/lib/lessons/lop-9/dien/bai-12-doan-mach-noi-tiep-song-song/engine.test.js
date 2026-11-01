import { describe, expect, it } from 'vitest';
import {
  AMMETER_SCALES,
  VOLTMETER_SCALES,
  equivalent,
  obeysLaws,
  pickScale,
  readings,
} from './engine.js';

describe('series and parallel readings', () => {
  it('reads a series circuit', () => {
    const r = readings('series', [10, 20], 12, true);
    expect(r.resistance).toBe(30);
    expect(r.main).toEqual({ i: 0.4, u: 12 });
    expect(r.parts).toEqual([
      { i: 0.4, u: 4 },
      { i: 0.4, u: 8 },
    ]);
    expect(obeysLaws('series', r)).toBe(true);
  });

  it('reads a parallel circuit', () => {
    const r = readings('parallel', [10, 15], 6, true);
    expect(r.resistance).toBe(6);
    expect(r.main).toEqual({ i: 1, u: 6 });
    expect(r.parts).toEqual([
      { i: 0.6, u: 6 },
      { i: 0.4, u: 6 },
    ]);
    expect(obeysLaws('parallel', r)).toBe(true);
  });

  it('reads zero with the switch open', () => {
    const r = readings('series', [10, 20], 12, false);
    expect(r.main.i).toBe(0);
    expect(r.parts.every((p) => p.i === 0)).toBe(true);
  });

  it('obeys the laws for many networks', () => {
    const bad = [];
    for (const mode of /** @type {const} */ (['series', 'parallel']))
      for (const rs of [[5], [5, 10], [20, 30, 60], [5, 5, 5, 5], [100, 35, 15]])
        for (const u of [1.5, 6, 12])
          if (!obeysLaws(mode, readings(mode, rs, u, true))) bad.push([mode, rs, u]);
    expect(bad).toEqual([]);
  });

  it('computes the equivalent resistance', () => {
    expect(equivalent('series', [10, 20, 30])).toBe(60);
    expect(equivalent('parallel', [20, 30])).toBe(12);
    expect(equivalent('parallel', [6, 6, 6])).toBe(2);
  });
});

describe('meter scales', () => {
  it('picks the smallest range that fits', () => {
    expect(pickScale(AMMETER_SCALES, 0.4)?.range).toBe(0.6);
    expect(pickScale(AMMETER_SCALES, 0.6)?.range).toBe(0.6);
    expect(pickScale(AMMETER_SCALES, 2.4)?.range).toBe(3);
    expect(pickScale(AMMETER_SCALES, 9.6)?.range).toBe(10);
    expect(pickScale(AMMETER_SCALES, 12)).toBe(null);
    expect(pickScale(VOLTMETER_SCALES, 12)?.range).toBe(15);
  });

  it('keeps the worst bench case on the ammeter: four 5 Ω in parallel at 12 V', () => {
    const r = readings('parallel', [5, 5, 5, 5], 12, true);
    expect(pickScale(AMMETER_SCALES, r.main.i)).not.toBe(null);
  });
});
