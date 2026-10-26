import { describe, expect, it } from 'vitest';
import {
  BASE_LEVEL,
  ECHO_MIN,
  MATERIALS,
  MEASURES,
  echoDelay,
  hearing,
  materialById,
  minEchoDistance,
  noiseLevel,
} from './engine.js';

describe('echo delay', () => {
  it('is the there-and-back distance over the speed of sound', () => {
    expect(echoDelay(17)).toBeCloseTo(0.1);
    expect(echoDelay(170)).toBeCloseTo(1);
  });

  it('needs a wall at least about 11,3 m away for 1/15 s', () => {
    expect(minEchoDistance()).toBeCloseTo(11.333, 3);
    expect(echoDelay(minEchoDistance())).toBeCloseTo(ECHO_MIN);
  });
});

describe('what the listener hears', () => {
  const glass = materialById('kinh');
  const foam = materialById('xop');

  it('hears a clear echo from a far, hard wall', () => {
    expect(hearing(20, glass)).toBe('echo');
  });

  it('hears the reflection merged with the direct sound from a near wall', () => {
    expect(hearing(5, glass)).toBe('merged');
  });

  it('hears hardly any echo from a soft wall', () => {
    expect(hearing(20, foam)).toBe('faint');
  });

  it('classes hard smooth materials as good reflectors', () => {
    expect(MATERIALS.filter((m) => m.good).map((m) => m.id)).toEqual(['kinh', 'da-hoa']);
    for (const m of MATERIALS) expect(m.good).toBe(m.reflect >= 0.5);
  });
});

describe('noise at the house', () => {
  it('starts at the road level', () => {
    expect(noiseLevel([])).toBe(BASE_LEVEL);
  });

  it('adds up the measures', () => {
    expect(noiseLevel(['coi', 'cay', 'tuong', 'cua'])).toBe(47);
    expect(noiseLevel(['tuong', 'san'])).toBe(72);
  });

  it('has exactly one measure that makes it worse', () => {
    expect(MEASURES.filter((m) => m.change > 0).map((m) => m.id)).toEqual(['san']);
  });
});
