import { describe, expect, it } from 'vitest';
import {
  GATE_A,
  SCALES,
  SLOPES,
  TRACK,
  bestScale,
  gateTime,
  reading,
  rolledAt,
  runTime,
  summarise,
  timeAt,
} from './engine.js';

const [steep, gentle] = SLOPES;
const [fine, coarse] = SCALES;

describe('rolling from rest', () => {
  it('needs twice the time to roll four times as far', () => {
    expect(timeAt(0.4, 0.5)).toBeCloseTo(2 * timeAt(0.1, 0.5));
    expect(timeAt(-1, 0.5)).toBe(0);
  });

  it('rolls back to the distance it took the time for', () => {
    expect(rolledAt(timeAt(0.6, steep.accel), steep.accel)).toBeCloseTo(0.6);
    expect(rolledAt(-1, steep.accel)).toBe(0);
    expect(rolledAt(100, steep.accel)).toBe(TRACK);
  });

  it('times the stretch between the two gates', () => {
    expect(gateTime(0.3, steep.accel)).toBeCloseTo(0.5345, 4);
    expect(gateTime(0.8, gentle.accel)).toBeCloseTo(10.328, 3);
    expect(gateTime(0.5, steep.accel)).toBeCloseTo(
      timeAt(GATE_A + 0.5, steep.accel) - timeAt(GATE_A, steep.accel),
    );
  });

  it('varies a little from run to run', () => {
    const runs = [0, 1, 2, 3].map((n) => runTime(0.5, steep.accel, n));
    expect(new Set(runs).size).toBeGreaterThan(1);
    for (const t of runs) expect(Math.abs(t - gateTime(0.5, steep.accel))).toBeLessThan(0.004);
    expect(runTime(0.5, steep.accel, -1)).toBeCloseTo(runTime(0.5, steep.accel, 6));
  });
});

describe('timer display', () => {
  it('cuts the time to the division of the scale', () => {
    expect(reading(0.77489, fine)).toBe(0.774);
    expect(reading(0.77489, coarse)).toBe(0.77);
    expect(reading(2.3, fine)).toBe(2.3);
  });

  it('shows nothing beyond the largest time of the scale', () => {
    expect(reading(10.328, fine)).toBe(null);
    expect(reading(10.328, coarse)).toBe(10.32);
    expect(reading(9.999, fine)).toBe(9.999);
  });

  it('picks the finer scale whenever the time fits in it', () => {
    expect(bestScale(4).id).toBe('nho');
    expect(bestScale(12).id).toBe('lon');
  });
});

describe('trial summary', () => {
  it('averages only trials made with the same set-up', () => {
    const trials = [
      { distance: 50, slope: 'doc', scale: 'nho', time: 0.776 },
      { distance: 50, slope: 'doc', scale: 'nho', time: 0.773 },
      { distance: 50, slope: 'doc', scale: 'nho', time: 0.777 },
      { distance: 30, slope: 'doc', scale: 'nho', time: 0.536 },
      { distance: 50, slope: 'doc', scale: 'lon', time: 0.77 },
    ];
    const s = summarise(/** @type {import('./engine.js').Trial[]} */ (trials), 50, 'doc', fine);
    expect(s.count).toBe(3);
    expect(s.mean).toBe(0.775);
    expect(s.spread).toBe(0.002);
    expect(summarise([], 50, 'doc', fine).mean).toBe(null);
  });
});
