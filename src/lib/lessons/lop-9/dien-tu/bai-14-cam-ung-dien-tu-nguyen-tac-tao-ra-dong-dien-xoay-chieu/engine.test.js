import { describe, expect, it } from 'vitest';
import {
  LINES,
  ROTOR_LINES,
  approach,
  fluxAt,
  inducedCurrent,
  lineCount,
  motionOf,
  pushSample,
  rotorCurrent,
  rotorFlux,
  rotorLines,
  rotorQuarter,
  settle,
  signedFlux,
  swing,
} from './engine.js';

describe('flux of a sliding magnet', () => {
  it('falls off with distance', () => {
    expect(fluxAt(0)).toBe(1);
    expect(fluxAt(3)).toBe(0.5);
    expect(fluxAt(6)).toBeCloseTo(0.2, 9);
    expect(lineCount(0)).toBe(LINES);
    expect(lineCount(3)).toBe(5);
    expect(lineCount(6)).toBe(2);
  });

  it('counts a south pole negative', () => {
    expect(signedFlux(3, 'N')).toBe(0.5);
    expect(signedFlux(3, 'S')).toBe(-0.5);
  });
});

describe('induced current', () => {
  it('appears only while the flux changes', () => {
    expect(inducedCurrent(0.5, 0.5, 0.1)).toBe(0);
    expect(inducedCurrent(0.5, 0.6, 0)).toBe(0);
  });

  it('reverses when the magnet moves the other way or is turned round', () => {
    const inN = inducedCurrent(signedFlux(6, 'N'), signedFlux(5, 'N'), 0.1);
    const outN = inducedCurrent(signedFlux(5, 'N'), signedFlux(6, 'N'), 0.1);
    const inS = inducedCurrent(signedFlux(6, 'S'), signedFlux(5, 'S'), 0.1);
    expect(inN).toBeLessThan(0);
    expect(outN).toBeCloseTo(-inN, 9);
    expect(inS).toBeCloseTo(-inN, 9);
  });

  it('grows with the speed of the change and stays on the scale', () => {
    const slow = inducedCurrent(0.2, 0.21, 0.1);
    const fast = inducedCurrent(0.2, 0.22, 0.1);
    expect(Math.abs(fast)).toBeCloseTo(2 * Math.abs(slow), 9);
    expect(inducedCurrent(0, 1, 0.01)).toBe(-1);
  });

  it('reads the needle direction', () => {
    expect(swing(0.5)).toBe('phai');
    expect(swing(-0.5)).toBe('trai');
    expect(swing(0.01)).toBe(null);
  });
});

describe('motion helpers', () => {
  it('moves toward the target at a limited speed', () => {
    expect(approach(10, 0, 20, 0.1)).toBe(8);
    expect(approach(1, 0, 20, 0.1)).toBe(0);
    expect(approach(2, 5, 10, 0.1)).toBe(3);
  });

  it('lets the needle catch up and snap', () => {
    const half = settle(0, 1, 0.08 * Math.log(2));
    expect(half).toBeCloseTo(0.5, 9);
    expect(settle(0.9995, 1, 0.01)).toBe(1);
  });

  it('names the motion', () => {
    expect(motionOf(5, 4)).toBe('vao');
    expect(motionOf(4, 5)).toBe('ra');
    expect(motionOf(4, 4)).toBe('yen');
  });

  it('keeps only the recent part of the trace', () => {
    let trace = /** @type {Array<{ t: number, i: number }>} */ ([]);
    for (let k = 0; k <= 80; k++) trace = pushSample(trace, k * 0.1, 0);
    expect(trace[0].t).toBeCloseTo(2, 9);
    expect(trace.at(-1)?.t).toBeCloseTo(8, 9);
  });
});

describe('spinning magnet', () => {
  it('gives a flux that rises and falls in turn', () => {
    expect(rotorFlux(0)).toBe(1);
    expect(rotorFlux(180)).toBe(-1);
    expect(rotorLines(0)).toBe(ROTOR_LINES);
    expect(rotorLines(90)).toBe(0);
    expect(rotorLines(180)).toBe(ROTOR_LINES);
  });

  it('gives a current that changes direction every half turn', () => {
    const bad = [];
    for (let deg = 5; deg < 720; deg += 10) {
      const half = Math.floor(deg / 180) % 2;
      const i = rotorCurrent(deg);
      if ((half === 0 && i <= 0) || (half === 1 && i >= 0)) bad.push(deg);
    }
    expect(bad).toEqual([]);
    expect(rotorCurrent(0)).toBe(0);
    expect(rotorCurrent(180)).toBe(0);
  });

  it('agrees with the sliding magnet: a north pole coming closer swings the needle left', () => {
    const q = rotorQuarter(300);
    expect(q).toEqual({ pole: 'N', closer: true, more: true });
    expect(rotorCurrent(300)).toBeLessThan(0);
    expect(rotorQuarter(45)).toEqual({ pole: 'N', closer: false, more: false });
    expect(rotorQuarter(135).more).toBe(true);
    expect(rotorQuarter(-45).pole).toBe('N');
  });
});
