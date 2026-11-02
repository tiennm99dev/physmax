import { describe, expect, it } from 'vitest';
import {
  CART,
  SHUTTER,
  TRACK,
  positions,
  reading,
  runLab,
  runTime,
  speedFrom,
  velocitiesAfter,
  worked,
} from './engine.js';

const MASSES = [0.2, 0.4, 0.6];
const SPEEDS = [0.4, 0.6, 0.8];

/** Every bench setting the widget offers. */
function allSetups() {
  return /** @type {const} */ (['mem', 'dan-hoi']).flatMap((kind) =>
    MASSES.flatMap((mA) => MASSES.flatMap((mB) => SPEEDS.map((v) => ({ kind, mA, mB, v })))),
  );
}

describe('reading', () => {
  it('reads close to plate length over speed, to the millisecond', () => {
    const t = reading(0.5, 1);
    expect(Math.abs(t - 0.2)).toBeLessThan(0.0026);
    expect(Math.round(t * 1000) / 1000).toBe(t);
    expect(SHUTTER).toBe(0.1);
  });

  it('is repeatable', () => {
    expect(reading(0.4, 7)).toBe(reading(0.4, 7));
  });
});

describe('velocitiesAfter', () => {
  it('moves stuck carts together', () => {
    const { vA, vB } = velocitiesAfter({ kind: 'mem', mA: 0.4, mB: 0.4, v: 0.5 });
    expect(vA).toBe(vB);
    expect(vA).toBeCloseTo(0.245, 9);
  });

  it('stops the first of two equal carts', () => {
    expect(velocitiesAfter({ kind: 'dan-hoi', mA: 0.4, mB: 0.4, v: 0.5 }).vA).toBe(0);
  });
});

describe('runLab', () => {
  it('gives one reading after a soft collision', () => {
    const r = runLab({ kind: 'mem', mA: 0.4, mB: 0.2, v: 0.6 }, 1);
    expect(r.afterA).toBeNull();
  });

  it('gives no reading for a cart that stops', () => {
    const r = runLab({ kind: 'dan-hoi', mA: 0.4, mB: 0.4, v: 0.6 }, 1);
    expect(r.afterA).toBeNull();
    expect(r.directionA).toBe(0);
  });

  it('marks a light cart that bounces back', () => {
    expect(runLab({ kind: 'dan-hoi', mA: 0.2, mB: 0.6, v: 0.6 }, 1).directionA).toBe(-1);
    expect(runLab({ kind: 'dan-hoi', mA: 0.6, mB: 0.2, v: 0.6 }, 1).directionA).toBe(1);
  });

  it('confirms momentum conservation within a few percent on every setting', () => {
    const bad = allSetups().flatMap((s) =>
      [1, 2, 3, 4, 5].filter((run) => worked(s, runLab(s, run)).gap > 5),
    );
    expect(bad).toEqual([]);
  });
});

describe('worked', () => {
  it('counts a cart going backwards as negative', () => {
    const s = /** @type {const} */ ({ kind: 'dan-hoi', mA: 0.2, mB: 0.4, v: 0.5 });
    const r = /** @type {const} */ ({ before: 0.2, afterA: 0.61, afterB: 0.305, directionA: -1 });
    const w = worked(s, r);
    expect(w.before).toBeCloseTo(0.1, 9);
    expect(w.after).toBeCloseTo(0.09836, 4);
    expect(w.gap).toBeCloseTo(1.64, 2);
  });

  it('adds both masses after a soft collision', () => {
    const s = /** @type {const} */ ({ kind: 'mem', mA: 0.4, mB: 0.4, v: 0.5 });
    const r = /** @type {const} */ ({ before: 0.2, afterA: null, afterB: 0.408, directionA: 1 });
    expect(worked(s, r).after).toBeCloseTo(0.8 * speedFrom(0.408), 9);
  });
});

describe('positions', () => {
  it('keeps the carts on the track and apart for the whole run', () => {
    const bad = allSetups().filter((s) => {
      const end = runTime(s);
      return Array.from({ length: 21 }, (_, i) => positions(s, (i * end) / 20)).some(
        (p) =>
          p.xB > TRACK - CART / 2 + 1e-9 || p.xA < CART / 2 - 1e-9 || p.xB - p.xA < CART - 1e-9,
      );
    });
    expect(bad).toEqual([]);
  });

  it('finishes each run within a reasonable time', () => {
    const bad = allSetups().filter((s) => runTime(s) > 10);
    expect(bad).toEqual([]);
  });
});
