import { describe, expect, it } from 'vitest';
import {
  accelerationOf,
  areaPieces,
  classify,
  displacementAt,
  distanceAt,
  pieceArea,
  roadExtent,
  turnTime,
  velocityAt,
} from './engine.js';

/**
 * @param {number} v0 @param {number} a @param {number} t
 */
const signedArea = (v0, a, t) => areaPieces(v0, a, t).reduce((sum, p) => sum + pieceArea(p), 0);

describe('the formulas', () => {
  it('reproduces the speeding-up example', () => {
    const a = accelerationOf(10, 20, 5);
    expect(a).toBe(2);
    expect(velocityAt(10, a, 5)).toBe(20);
    expect(displacementAt(10, a, 5)).toBe(75);
  });

  it('reproduces the braking train example', () => {
    const a = accelerationOf(15, 0, 30);
    expect(a).toBe(-0.5);
    expect(displacementAt(15, a, 30)).toBe(225);
  });

  it('agrees with v² − v0² = 2ad across a range of motions', () => {
    const failures = [];
    for (const [v0, a, t] of [
      [0, 2, 5],
      [10, -1.5, 4],
      [-6, 3, 7],
      [12, 0, 3],
    ]) {
      const v = velocityAt(v0, a, t);
      const d = displacementAt(v0, a, t);
      if (Math.abs(v * v - v0 * v0 - 2 * a * d) > 1e-6) failures.push([v0, a, t]);
    }
    expect(failures).toEqual([]);
  });
});

describe('the area under the v-t line', () => {
  it('equals the displacement with or without a turn', () => {
    const failures = [];
    for (const [v0, a, t] of [
      [10, 2, 5],
      [15, -0.5, 30],
      [6, -2, 5],
      [-8, 2, 6],
      [0, -3, 4],
      [5, 0, 4],
    ]) {
      if (Math.abs(signedArea(v0, a, t) - displacementAt(v0, a, t)) > 1e-6) failures.push([v0, a]);
    }
    expect(failures).toEqual([]);
  });

  it('splits at the axis when the velocity changes sign', () => {
    const pieces = areaPieces(6, -2, 5);
    expect(pieces.map((p) => p.sign)).toEqual([1, -1]);
    expect(pieces.map(pieceArea)).toEqual([9, -4]);
  });

  it('is empty before time starts and for a body at rest', () => {
    expect(areaPieces(6, -2, 0)).toEqual([]);
    expect(areaPieces(0, 0, 5)).toEqual([]);
  });
});

describe('a turning motion', () => {
  it('turns only when v0 and a have opposite signs and time reaches it', () => {
    expect(turnTime(6, -2, 5)).toBe(3);
    expect(turnTime(6, -2, 2)).toBeNull();
    expect(turnTime(6, 2, 5)).toBeNull();
    expect(turnTime(0, 2, 5)).toBeNull();
  });

  it('adds both legs in the distance but not in the displacement', () => {
    expect(displacementAt(6, -2, 5)).toBe(5);
    expect(distanceAt(6, -2, 5)).toBe(13);
    expect(distanceAt(8, -2, 6)).toBe(20);
  });

  it('keeps the far point of the motion on the road', () => {
    expect(roadExtent(20, -4, 10)).toBe(50);
    expect(roadExtent(0, 0, 10)).toBe(10);
  });
});

describe('classify', () => {
  it('reads the kind of motion from the signs of v and a', () => {
    expect(classify(0, 0)).toBe('dung-yen');
    expect(classify(5, 0)).toBe('deu');
    expect(classify(5, 2)).toBe('nhanh-dan');
    expect(classify(-5, -2)).toBe('nhanh-dan');
    expect(classify(5, -2)).toBe('cham-dan');
    expect(classify(-5, 2)).toBe('cham-dan');
  });

  it('calls neither speeding up nor slowing down at the instant v is zero', () => {
    expect(classify(0, 2)).toBe('dung-tuc-thoi');
    expect(classify(velocityAt(15, -2.5, 6), -2.5)).toBe('dung-tuc-thoi');
  });
});
