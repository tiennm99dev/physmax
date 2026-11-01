import { describe, expect, it } from 'vitest';
import {
  V_MAX,
  actualAcceleration,
  averageAcceleration,
  classify,
  isIdle,
  signed,
  step,
} from './engine.js';

const REST = { speed: 0, x: 0, t: 0 };

describe('driving', () => {
  it('gains 2 m/s each second on the gas', () => {
    let s = REST;
    for (let i = 0; i < 50; i++) s = step(s, 'ga', 0.1);
    expect(s.speed).toBeCloseTo(10, 6);
    expect(s.x).toBeCloseTo(25, 6);
  });

  it('keeps its speed with no pedal and loses 4 m/s each second on the brake', () => {
    const s = { speed: 12, x: 0, t: 0 };
    expect(step(s, 'tha', 1).speed).toBe(12);
    expect(step(s, 'phanh', 1).speed).toBe(8);
  });

  it('stops at zero and tops out at the limit', () => {
    expect(step({ speed: 1, x: 0, t: 0 }, 'phanh', 1).speed).toBe(0);
    expect(step({ speed: V_MAX, x: 0, t: 0 }, 'ga', 1).speed).toBe(V_MAX);
  });

  it('reports no acceleration when the pedal cannot act', () => {
    expect(actualAcceleration(REST, 'phanh')).toBe(0);
    expect(actualAcceleration({ speed: V_MAX, x: 0, t: 0 }, 'ga')).toBe(0);
    expect(actualAcceleration({ speed: 5, x: 0, t: 0 }, 'phanh')).toBe(-4);
    expect(isIdle(REST, 'tha')).toBe(true);
    expect(isIdle(REST, 'ga')).toBe(false);
  });
});

describe('signs', () => {
  it('classifies by the sign of a times v, for either axis', () => {
    for (const axis of /** @type {const} */ ([1, -1])) {
      expect(classify(signed(10, axis), signed(2, axis))).toBe('nhanh-dan');
      expect(classify(signed(10, axis), signed(-4, axis))).toBe('cham-dan');
      expect(classify(signed(10, axis), signed(0, axis))).toBe('deu');
    }
    expect(classify(0, 0)).toBe('dung-yen');
    expect(classify(0, 2)).toBe('nhanh-dan');
  });

  it('never returns a negative zero', () => {
    expect(Object.is(signed(0, -1), 0)).toBe(true);
  });
});

describe('averageAcceleration', () => {
  it('gives the book values', () => {
    expect(averageAcceleration(30, 9, 3)).toBe(-7);
    expect(averageAcceleration(10, 12, 5)).toBe(0.4);
    expect(averageAcceleration(5, 5, 0)).toBe(0);
  });
});
