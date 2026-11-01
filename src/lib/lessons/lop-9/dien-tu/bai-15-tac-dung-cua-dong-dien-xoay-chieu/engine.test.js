import { describe, expect, it } from 'vitest';
import {
  NAIL_MAX,
  NEEDLE_MAX,
  behaviour,
  coilCurrent,
  endPole,
  follow,
  lampGlow,
  nailPull,
  needleTilt,
  poleChangesPerSecond,
} from './engine.js';

const dc = { source: /** @type {const} */ ('mot-chieu'), closed: true, reversed: false, freq: 1 };
const ac = { source: /** @type {const} */ ('xoay-chieu'), closed: true, reversed: false, freq: 1 };

describe('coil current', () => {
  it('is zero with the switch open', () => {
    expect(coilCurrent({ ...dc, closed: false }, 0.3)).toBe(0);
    expect(coilCurrent({ ...ac, closed: false }, 0.3)).toBe(0);
  });

  it('keeps one direction from a direct source', () => {
    expect(coilCurrent(dc, 0)).toBe(1);
    expect(coilCurrent(dc, 0.75)).toBe(1);
    expect(coilCurrent({ ...dc, reversed: true }, 0.75)).toBe(-1);
  });

  it('changes direction every half cycle from an alternating source', () => {
    expect(coilCurrent(ac, 0.25)).toBeCloseTo(1, 9);
    expect(coilCurrent(ac, 0.5)).toBe(0);
    expect(coilCurrent(ac, 0.75)).toBeCloseTo(-1, 9);
  });
});

describe('effects in front of the coil', () => {
  it('names the end pole from the current', () => {
    expect(endPole(1)).toBe('N');
    expect(endPole(-1)).toBe('S');
    expect(endPole(0)).toBe(null);
  });

  it('turns the compass needle one way or the other with the current', () => {
    expect(needleTilt(1)).toBe(NEEDLE_MAX);
    expect(needleTilt(-1)).toBe(-NEEDLE_MAX);
    expect(needleTilt(0)).toBe(0);
  });

  it('pulls the nail and lights the lamp whatever the direction', () => {
    expect(nailPull(1)).toBe(NAIL_MAX);
    expect(nailPull(-1)).toBe(NAIL_MAX);
    expect(lampGlow(-0.5)).toBe(0.5);
    expect(lampGlow(0.5)).toBe(0.5);
  });

  it('counts two pole changes per cycle', () => {
    expect(poleChangesPerSecond(50)).toBe(100);
  });

  it('describes what the object does', () => {
    expect(behaviour({ ...dc, closed: false }, 'kim')).toBe('yen');
    expect(behaviour(dc, 'kim')).toBe('lech');
    expect(behaviour(ac, 'kim')).toBe('rung');
    expect(behaviour(ac, 'dinh')).toBe('hut');
  });
});

describe('needle with inertia', () => {
  it('lags behind and snaps when close', () => {
    expect(follow(0, 60, 0.06 * Math.log(2))).toBeCloseTo(30, 9);
    expect(follow(59.97, 60, 0.01)).toBe(60);
  });

  it('swings less when the current alternates fast', () => {
    /** @param {number} freq */
    const peak = (freq) => {
      let shown = 0;
      let top = 0;
      for (let k = 0; k < 600; k++) {
        const t = k / 120;
        shown = follow(shown, needleTilt(coilCurrent({ ...ac, freq }, t)), 1 / 120);
        if (t > 2) top = Math.max(top, Math.abs(shown));
      }
      return top;
    };
    expect(peak(0.5)).toBeGreaterThan(55);
    expect(peak(8)).toBeLessThan(25);
  });
});
