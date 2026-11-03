import { describe, expect, it } from 'vitest';
import {
  ECLIPSE_NAME,
  SUN_TIDE,
  eclipseAt,
  eclipseText,
  elongationFromPoint,
  moonLatitude,
  moonOnOrbit,
  shadowLength,
  tideHeight,
  tideKind,
  tideRange,
  waterAt,
  wrap180,
} from './engine.js';

describe('eclipses', () => {
  it('happens only near new or full moon', () => {
    const wrong = [];
    for (let d = 0; d < 360; d += 5) {
      const { kind } = eclipseAt(d, 0, true);
      const far = Math.min(Math.abs(wrap180(d)), Math.abs(wrap180(d - 180)));
      if (kind !== 'none' && far > 5) wrong.push(d);
    }
    expect(wrong).toEqual([]);
  });

  it('needs the Sun close to the node', () => {
    expect(eclipseAt(0, 0, true).kind).toBe('solar-total');
    expect(eclipseAt(0, 0, false).kind).toBe('solar-annular');
    expect(eclipseAt(0, 14, true).kind).toBe('solar-partial');
    expect(eclipseAt(0, 40, true).kind).toBe('none');
    expect(eclipseAt(180, 0, true).kind).toBe('lunar-total');
    expect(eclipseAt(180, 8, true).kind).toBe('lunar-partial');
    expect(eclipseAt(180, 14, true).kind).toBe('lunar-penumbral');
    expect(eclipseAt(180, 40, true).kind).toBe('none');
  });

  it('has an eclipse season of the right width', () => {
    const reach = (/** @type {number} */ d) => {
      let s = 0;
      while (eclipseAt(d, s, true).kind !== 'none') s += 0.5;
      return s;
    };
    expect(reach(0)).toBeGreaterThan(15);
    expect(reach(0)).toBeLessThan(19);
    expect(reach(180)).toBeGreaterThan(15);
    expect(reach(180)).toBeLessThan(19);
  });

  it('has the Moon on the ecliptic at the nodes and at its tilt a quarter orbit away', () => {
    expect(moonLatitude(0, 0)).toBeCloseTo(0, 6);
    expect(moonLatitude(180, 0)).toBeCloseTo(0, 6);
    expect(moonLatitude(90, 0)).toBeCloseTo(5.145, 3);
    expect(moonLatitude(270, 0)).toBeCloseTo(-5.145, 3);
  });

  it('names every kind and explains each', () => {
    expect(Object.keys(ECLIPSE_NAME)).toHaveLength(7);
    const said = [
      eclipseText(0, 0, true),
      eclipseText(0, 0, false),
      eclipseText(0, 14, true),
      eclipseText(180, 0, true),
      eclipseText(180, 8, true),
      eclipseText(180, 14, true),
      eclipseText(0, 40, true),
      eclipseText(90, 0, true),
    ];
    expect(said.filter((t) => t.length < 20)).toEqual([]);
    expect(eclipseText(0, 40, true)).toContain('đường nút');
  });

  it('asks for a little more dragging when the Sun is on the node and the Moon just off line', () => {
    for (const d of [2, 358, 178, 182]) {
      expect(eclipseAt(d, 0, true).kind).toBe('none');
      expect(eclipseText(d, 0, true)).not.toContain('đường nút');
    }
  });
});

describe('the drawing', () => {
  it('turns a point on the orbit into the angle from the Sun and back', () => {
    const wrong = [];
    for (const d of [0, 30, 90, 180, 270, 359]) {
      const p = moonOnOrbit(d, 80);
      if (Math.abs(wrap180(elongationFromPoint(p.x, p.y) - d)) > 1e-6) wrong.push(d);
    }
    expect(wrong).toEqual([]);
  });

  it('puts the new moon towards the Sun, on the left', () => {
    expect(moonOnOrbit(0, 80).x).toBeCloseTo(-80, 6);
    expect(moonOnOrbit(180, 80).x).toBeCloseTo(80, 6);
    expect(moonOnOrbit(90, 80).y).toBeCloseTo(-80, 6);
  });
});

describe('tides', () => {
  it('adds the bulges at new and full moon and opposes them at the quarters', () => {
    expect(tideRange(0)).toBeCloseTo(1 + SUN_TIDE, 6);
    expect(tideRange(180)).toBeCloseTo(1 + SUN_TIDE, 6);
    expect(tideRange(90)).toBeCloseTo(1 - SUN_TIDE, 6);
    expect(tideRange(270)).toBeCloseTo(1 - SUN_TIDE, 6);
    expect(tideKind(0)).toBe('cuong');
    expect(tideKind(180)).toBe('cuong');
    expect(tideKind(90)).toBe('kem');
    expect(tideKind(45)).toBe('trung-gian');
  });

  it('gives two high waters a turn, at opposite sides of the Earth', () => {
    expect(tideHeight(0, 0)).toBeCloseTo(tideHeight(180, 0), 6);
    expect(tideHeight(0, 0)).toBeGreaterThan(tideHeight(90, 0));
    expect(waterAt(0, 0)).toBeCloseTo(waterAt(12.42, 0), 6);
    expect(waterAt(6.21, 0)).toBeLessThan(0);
  });

  it('has the range match the peak of the height over the globe', () => {
    const wrong = [];
    for (const d of [0, 30, 60, 90, 120]) {
      const samples = Array.from({ length: 720 }, (_, i) => tideHeight(i / 2, d));
      if (Math.abs(Math.max(...samples) - tideRange(d)) > 1e-3) wrong.push(d);
    }
    expect(wrong).toEqual([]);
  });
});

describe('shadow length', () => {
  it('reaches about the Earth from the Moon', () => {
    const l = shadowLength(149_600_000, 1_737, 696_000);
    expect(l).toBeGreaterThan(370_000);
    expect(l).toBeLessThan(380_000);
  });
});
