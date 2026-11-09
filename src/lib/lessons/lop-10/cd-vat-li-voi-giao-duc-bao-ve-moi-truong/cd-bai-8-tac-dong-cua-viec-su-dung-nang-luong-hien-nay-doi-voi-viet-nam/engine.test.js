import { describe, expect, it } from 'vitest';
import {
  HYDRO_CAP,
  RECENT_MIX,
  SOURCES,
  intensity,
  meetsGoal,
  renewableShare,
  setShare,
  shownShares,
  yearlyMt,
} from './engine.js';

const sum = (/** @type {number[]} */ m) => m.reduce((s, v) => s + v, 0);

describe('mix', () => {
  it('has one share per source and adds up to 100', () => {
    expect(RECENT_MIX.length).toBe(SOURCES.length);
    expect(sum(RECENT_MIX)).toBe(100);
  });

  it('keeps 100% and the chosen value when one share moves', () => {
    const failures = [];
    for (let i = 0; i < SOURCES.length; i++) {
      for (const v of [0, 1, 17, 50, 99, 100]) {
        const m = setShare(RECENT_MIX, i, v);
        if (Math.abs(sum(m) - 100) > 1e-9 || m[i] !== v || m.some((x) => x < 0))
          failures.push({ i, v, m });
        const shown = shownShares(m);
        if (sum(shown) !== 100 || shown[i] !== v) failures.push({ i, v, shown });
      }
    }
    expect(failures).toEqual([]);
  });

  it('scales the other shares in proportion', () => {
    expect(setShare([50, 50, 0, 0, 0, 0], 0, 20)).toEqual([20, 80, 0, 0, 0, 0]);
    expect(setShare([40, 20, 20, 10, 10, 0], 0, 70)).toEqual([70, 10, 10, 5, 5, 0]);
  });

  it('does not drift the others when one share moves step by step', () => {
    let m = [...RECENT_MIX];
    for (let v = 46; v >= 17; v--) m = setShare(m, 0, v);
    const direct = setShare(RECENT_MIX, 0, 17);
    expect(m.map((x) => x.toFixed(9))).toEqual(direct.map((x) => x.toFixed(9)));
    expect(shownShares(m)).toEqual([17, 14, 47, 16, 5, 1]);
  });

  it('shares out evenly when every other share is 0', () => {
    expect(setShare([100, 0, 0, 0, 0, 0], 0, 50)).toEqual([50, 10, 10, 10, 10, 10]);
  });

  it('clamps the value', () => {
    expect(setShare(RECENT_MIX, 1, 130)[1]).toBe(100);
    expect(setShare(RECENT_MIX, 1, -5)[1]).toBe(0);
  });
});

describe('emissions', () => {
  it('average the factors by share', () => {
    expect(intensity([100, 0, 0, 0, 0, 0])).toBe(820);
    expect(intensity([50, 0, 0, 0, 50, 0])).toBe(415.5);
    expect(intensity(RECENT_MIX)).toBeCloseTo(444.13, 6);
  });

  it('turn TWh and g/kWh into million tonnes', () => {
    expect(yearlyMt([100, 0, 0, 0, 0, 0], 100)).toBe(82);
    expect(yearlyMt(RECENT_MIX)).toBeCloseTo(124.36, 2);
  });

  it('count renewables, hydropower included', () => {
    expect(renewableShare(RECENT_MIX)).toBe(44);
  });
});

describe('goal', () => {
  it('is not met by the recent mix', () => {
    expect(meetsGoal(RECENT_MIX)).toBe(false);
  });

  it('is met by a cleaner mix within the hydro cap', () => {
    expect(meetsGoal([17, 10, 30, 25, 15, 3])).toBe(true);
  });

  it('is not met by leaning on more hydropower', () => {
    const m = [10, 5, HYDRO_CAP + 20, 20, 15, 0];
    expect(sum(m)).toBe(100);
    expect(meetsGoal(m)).toBe(false);
  });
});
