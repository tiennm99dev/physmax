import { describe, expect, it } from 'vitest';
import {
  BOUNDS,
  SCENES,
  fieldLines,
  filings,
  inside,
  needleAngle,
  pushOut,
  relativeStrength,
  strengthWord,
} from './engine.js';

const bar = SCENES.thang;
const earth = SCENES['trai-dat'];

/** Smallest difference between two angles in degrees. */
const diff = (/** @type {number} */ a, /** @type {number} */ b) => {
  const d = (((a - b) % 360) + 360) % 360;
  return Math.min(d, 360 - d);
};

describe('compass needle around a bar magnet', () => {
  it('points away from the north pole beyond it', () => {
    expect(diff(needleAngle(bar, { x: 4, y: 0 }), 0)).toBeLessThan(1);
  });

  it('points toward the south pole beyond it', () => {
    expect(diff(needleAngle(bar, { x: -4, y: 0 }), 0)).toBeLessThan(1);
  });

  it('points from N to S, opposite to the magnet, alongside its middle', () => {
    expect(diff(needleAngle(bar, { x: 0, y: 1.5 }), 180)).toBeLessThan(1);
    expect(diff(needleAngle(bar, { x: 0, y: -1.5 }), 180)).toBeLessThan(1);
  });
});

describe('field strength', () => {
  it('is strongest near the poles and weak far away', () => {
    const nearPole = relativeStrength(bar, { x: 2.4, y: 0 });
    const middle = relativeStrength(bar, { x: 0, y: 1 });
    const far = relativeStrength(bar, { x: 5.5, y: 3.5 });
    expect(nearPole).toBeGreaterThan(middle);
    expect(middle).toBeGreaterThan(far);
    expect(strengthWord(nearPole)).toBe('mạnh');
    expect(strengthWord(far)).toBe('yếu');
  });

  it('gathers more filings near the poles than far from the magnet', () => {
    const fs = filings(bar, 2000);
    const area = (/** @type {(p: { x: number, y: number }) => boolean} */ test) =>
      fs.filter(test).length;
    const nearPoles = area((p) => Math.abs(Math.abs(p.x) - 2.5) < 0.5 && Math.abs(p.y) < 0.5);
    const farCorner = area((p) => p.x > 4.5 && p.y > 2.75);
    expect(nearPoles).toBeGreaterThan(farCorner);
    expect(fs.every((p) => !inside(bar, p))).toBe(true);
  });
});

describe('field lines', () => {
  it('leave the north pole and end at the south pole', () => {
    const lines = fieldLines(bar, 8);
    const ending = lines.filter((l) => {
      const end = l[l.length - 1];
      return Math.hypot(end.x + 1.6, end.y) < 0.3;
    });
    expect(ending.length).toBeGreaterThanOrEqual(lines.length / 2);
    for (const l of lines) {
      for (const p of l) {
        expect(p.x).toBeGreaterThanOrEqual(BOUNDS.xMin);
        expect(p.x).toBeLessThanOrEqual(BOUNDS.xMax);
      }
    }
  });
});

describe('Earth', () => {
  it('turns a compass at the surface roughly toward geographic north', () => {
    const a = needleAngle(earth, { x: 2.4, y: 0 });
    expect(diff(a, 90)).toBeLessThan(25);
  });

  it('runs field lines from the Southern to the Northern Hemisphere outside the Earth', () => {
    const a = needleAngle(earth, { x: -2.4, y: 0.1 });
    expect(diff(a, 90)).toBeLessThan(30);
  });
});

describe('placing the compass', () => {
  it('keeps the needle out of the magnet and the Earth', () => {
    expect(inside(bar, pushOut(bar, { x: 0.5, y: 0.1 }))).toBe(false);
    expect(inside(earth, pushOut(earth, { x: 0.3, y: 0.2 }))).toBe(false);
    expect(inside(earth, pushOut(earth, { x: 0, y: 0 }))).toBe(false);
    const u = SCENES['chu-u'];
    expect(inside(u, pushOut(u, { x: -1.3, y: -1.5 }))).toBe(false);
  });
});
