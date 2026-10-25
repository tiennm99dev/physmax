import { describe, expect, it } from 'vitest';
import {
  displacement,
  phaseDifference,
  sampleWaves,
  standingWaveNodes,
  superpose,
  waveNumbers,
} from './wave.js';

const w = { amplitude: 2, wavelength: 4, period: 0.5 };

describe('wave engine', () => {
  it('starts at the crest and repeats every wavelength and period', () => {
    expect(displacement(w, 0, 0)).toBe(2);
    expect(displacement(w, 4, 0)).toBe(2);
    expect(displacement(w, 0, 0.5)).toBe(2);
    expect(displacement(w, 2, 0)).toBe(-2);
    expect(displacement(w, 1, 0)).toBeCloseTo(0, 9);
  });

  it('moves the crest forward by v·t', () => {
    const { speed } = waveNumbers(w);
    expect(speed).toBe(8);
    expect(displacement(w, speed * 0.1, 0.1)).toBe(2);
    const back = { ...w, direction: /** @type {const} */ (-1) };
    expect(displacement(back, -speed * 0.1, 0.1)).toBe(2);
  });

  it('gives frequency and angular frequency', () => {
    const n = waveNumbers(w);
    expect(n).toMatchObject({ speed: 8, frequency: 2 });
    expect(n.angularFrequency).toBeCloseTo(4 * Math.PI, 9);
  });

  it('superposes waves: equal waves in opposite phase cancel', () => {
    const anti = { ...w, phase: Math.PI };
    for (const x of [0, 0.3, 1.7]) expect(superpose([w, anti], x, 0.2)).toBeCloseTo(0, 9);
    expect(superpose([w, w], 0, 0)).toBe(4);
  });

  it('reduces phase differences to one turn', () => {
    expect(phaseDifference(1, 4)).toBeCloseTo(Math.PI / 2, 9);
    expect(phaseDifference(4, 4)).toBeCloseTo(0, 9);
    expect(phaseDifference(-1, 4)).toBeCloseTo((3 * Math.PI) / 2, 9);
  });

  it('samples a snapshot along x and a point along t', () => {
    const snap = sampleWaves([w], { along: 'x', from: 0, to: 4, at: 0, count: 4 });
    expect(snap.map((p) => p.s)).toEqual([0, 1, 2, 3, 4]);
    expect(snap[0].u).toBe(2);
    expect(snap[2].u).toBe(-2);
    const point = sampleWaves([w], { along: 't', from: 0, to: 0.5, at: 0, count: 2 });
    expect(point.map((p) => p.u)).toEqual([2, -2, 2]);
  });

  it('places standing-wave nodes every half wavelength', () => {
    expect(standingWaveNodes(1.2, 3)).toEqual([0, 0.4, 0.8, 1.2]);
  });
});
