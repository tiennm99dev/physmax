import { describe, expect, it } from 'vitest';
import {
  COARSE_STEP,
  FINE_STEP,
  MAX_BLUR,
  OBJECTIVES,
  START,
  TOP,
  focusOf,
  gapMm,
  moveTube,
  totalMagnification,
  touches,
} from './engine.js';

const [low, mid, high] = OBJECTIVES;

/** Lower the tube with the coarse knob until it is as close to focus as coarse steps get. */
function coarseFocus(/** @type {import('./engine.js').Objective} */ o) {
  let p = START;
  while (Math.abs(p - COARSE_STEP) < Math.abs(p)) p = moveTube(p, -COARSE_STEP, o).p;
  return p;
}

describe('virtual microscope', () => {
  it('multiplies eyepiece and objective magnifications', () => {
    expect(totalMagnification(10, 40)).toBe(400);
    expect(totalMagnification(15, 4)).toBe(60);
  });

  it('gives shorter working distance and depth to stronger objectives', () => {
    for (let i = 1; i < OBJECTIVES.length; i++) {
      expect(OBJECTIVES[i].workingDistance).toBeLessThan(OBJECTIVES[i - 1].workingDistance);
      expect(OBJECTIVES[i].depth).toBeLessThan(OBJECTIVES[i - 1].depth);
    }
    expect(gapMm(0, low)).toBe(17);
    expect(gapMm(0, high)).toBeCloseTo(0.6, 9);
  });

  it('focuses the 4x objective with the coarse knob alone, but not the stronger ones', () => {
    expect(focusOf(coarseFocus(low), low).focus).toBe('ro-net');
    expect(focusOf(coarseFocus(mid), mid).focus).toBe('gan-ro');
    expect(focusOf(coarseFocus(high), high).focus).toBe('gan-ro');
  });

  it('reaches sharp focus with the fine knob for every objective', () => {
    for (const o of OBJECTIVES) {
      let p = coarseFocus(o);
      const dir = p > 0 ? -FINE_STEP : FINE_STEP;
      for (let i = 0; i < 40 && focusOf(p, o).focus !== 'ro-net'; i++) p = moveTube(p, dir, o).p;
      expect(focusOf(p, o).focus, `${o.power}x`).toBe('ro-net');
    }
  });

  it('crashes the 40x objective into the slide when the coarse knob lowers it past focus', () => {
    let p = coarseFocus(high);
    const r = moveTube(p, -COARSE_STEP, high);
    expect(r.crashed).toBe(true);
    expect(r.p).toBe(-high.workingDistance);
    expect(gapMm(r.p, high)).toBe(0);
    expect(touches(r.p, high)).toBe(true);
    p = moveTube(p, -COARSE_STEP, low).p;
    expect(touches(p, low)).toBe(false);
  });

  it('stops at the top and blurs more far from focus, within the limit', () => {
    expect(moveTube(TOP - 10, COARSE_STEP, low).p).toBe(TOP);
    expect(focusOf(300, mid).blur).toBeGreaterThan(focusOf(60, mid).blur);
    expect(focusOf(TOP, high).blur).toBe(MAX_BLUR);
    expect(focusOf(0, high).blur).toBe(0);
  });
});
