import { describe, expect, it } from 'vitest';
import {
  SAMPLES,
  THERMOMETERS,
  judge,
  otherScales,
  restLevel,
  safeFor,
  step,
  toDivision,
} from './engine.js';

const [ruou, thuyNgan, yTe] = THERMOMETERS;
const sample = (/** @type {string} */ id) => {
  const s = SAMPLES.find((x) => x.id === id);
  if (!s) throw new Error(id);
  return s;
};

describe('virtual thermometer', () => {
  it('moves the column toward the sample and settles', () => {
    let level = 27;
    level = step(thuyNgan, level, 100, 1);
    expect(level).toBeGreaterThan(27);
    expect(level).toBeLessThan(100);
    for (let i = 0; i < 150; i++) level = step(thuyNgan, level, 100, 0.1);
    expect(level).toBe(100);
  });

  it('keeps the highest reading on a clinical thermometer', () => {
    expect(step(yTe, 38.6, 27, 5)).toBe(38.6);
    expect(step(yTe, 35, 38.6, 1)).toBeGreaterThan(35);
    expect(restLevel(yTe)).toBe(35);
    expect(restLevel(ruou)).toBe(27);
  });

  it('keeps thermometers out of samples above their range', () => {
    expect(safeFor(ruou, sample('nuoc-soi'))).toBe(false);
    expect(safeFor(thuyNgan, sample('nuoc-soi'))).toBe(true);
    expect(safeFor(yTe, sample('nuoc-am'))).toBe(false);
    expect(safeFor(yTe, sample('nach'))).toBe(true);
  });

  it('rounds to the division', () => {
    expect(toDivision(38.6, 0.1)).toBe(38.6);
    expect(toDivision(38.6, 1)).toBe(39);
  });

  it('judges the reading step by step', () => {
    const nach = sample('nach');
    expect(judge({ th: yTe, sample: nach, level: 38.6, typed: 38.6 })).toBe('dung');
    expect(judge({ th: yTe, sample: nach, level: 38.6, typed: 38.5 })).toBe('sai-so');
    expect(judge({ th: yTe, sample: nach, level: 37.2, typed: 37.2 })).toBe('chua-on-dinh');
    expect(judge({ th: yTe, sample: nach, level: 39.4, typed: 39.4 })).toBe('chua-vay');
    expect(judge({ th: yTe, sample: sample('nuoc-da'), level: 35, typed: 35 })).toBe('ngoai-ghd');
    expect(judge({ th: ruou, sample: nach, level: 38.6, typed: 39 })).toBe('dung');
  });

  it('keeps a feverish reading when the next person is measured without shaking', () => {
    const khoe = sample('nach-khoe');
    let level = step(yTe, 35, 38.6, 20);
    level = step(yTe, level, khoe.temp, 20);
    expect(level).toBe(38.6);
    expect(judge({ th: yTe, sample: khoe, level, typed: 38.6 })).toBe('chua-vay');
    level = step(yTe, Math.min(level, yTe.min), khoe.temp, 20);
    expect(judge({ th: yTe, sample: khoe, level, typed: 36.8 })).toBe('dung');
  });

  it('converts to °F and to K with the offset 273', () => {
    expect(otherScales(0)).toEqual({ f: 32, k: 273 });
    expect(otherScales(100)).toEqual({ f: 212, k: 373 });
    expect(otherScales(38.6).f).toBeCloseTo(101.48);
    expect(otherScales(27)).toEqual({ f: 80.6, k: 300 });
  });
});
