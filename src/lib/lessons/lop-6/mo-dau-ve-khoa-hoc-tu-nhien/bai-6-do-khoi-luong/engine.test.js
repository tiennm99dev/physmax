import { describe, expect, it } from 'vitest';
import {
  SCALES,
  THINGS,
  judge,
  pressZero,
  shown,
  suitability,
  toDivision,
  turnScrew,
} from './engine.js';

const [dial, digital] = SCALES;
const thing = (/** @type {string} */ id) => {
  const t = THINGS.find((x) => x.id === id);
  if (!t) throw new Error(id);
  return t;
};

describe('virtual scales', () => {
  it('picks the scale that can weigh the thing with the finest division', () => {
    expect(suitability(dial, 186.4)).toBe('tho');
    expect(suitability(digital, 186.4)).toBe('phu-hop');
    expect(suitability(digital, 1000)).toBe('qua-tai');
    expect(suitability(dial, 1000)).toBe('phu-hop');
    expect(suitability(dial, 2463.5)).toBe('phu-hop');
  });

  it('gives every thing one suitable scale', () => {
    for (const t of THINGS) {
      expect(
        SCALES.some((s) => suitability(s, t.mass) === 'phu-hop'),
        t.id,
      ).toBe(true);
    }
  });

  it('rounds a mass to the nearest division', () => {
    expect(toDivision(186.4, 20)).toBe(180);
    expect(toDivision(23.8, 20)).toBe(20);
    expect(toDivision(2463.5, 20)).toBe(2460);
    expect(toDivision(186.4, 0.1)).toBe(186.4);
    expect(toDivision(23.8, 0.1)).toBe(23.8);
  });

  it('adds the empty-pan reading and shows overload', () => {
    expect(shown(dial, 0, 60)).toBe(60);
    expect(shown(dial, 1000, 60)).toBe(1060);
    expect(shown(digital, 186.4, 1.2)).toBe(187.6);
    expect(shown(digital, 1000, 0)).toBe(null);
  });

  it('zeroes the dial by the screw and the balance by the zero key', () => {
    expect(turnScrew(60, -3)).toBe(0);
    expect(turnScrew(60, -4)).toBe(-20);
    expect(pressZero(1.2, 0)).toBe(0);
    // Pressing zero with the apple on the pan hides the apple's mass.
    const z = pressZero(1.2, 186.4);
    expect(z).toBe(-186.4);
    expect(shown(digital, 186.4, z)).toBe(0);
  });

  it('judges the measurement step by step', () => {
    const tao = thing('tao');
    const base = { thing: tao, scale: digital, zero: 0, placed: true };
    expect(judge({ ...base, typed: 186.4 })).toBe('dung');
    expect(judge({ ...base, typed: 186 })).toBe('sai-so');
    expect(judge({ ...base, placed: false, typed: 186.4 })).toBe('chua-dat');
    expect(judge({ ...base, zero: 1.2, typed: 187.6 })).toBe('chua-chinh-0');
    expect(judge({ ...base, scale: dial, typed: 180 })).toBe('tho');
    expect(judge({ ...base, thing: thing('duong'), typed: 1000 })).toBe('qua-tai');
    expect(judge({ ...base, thing: thing('dua'), scale: dial, typed: 2460 })).toBe('dung');
  });
});
