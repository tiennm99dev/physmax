import { describe, expect, it } from 'vitest';
import {
  BULB_AMPS,
  METERS,
  MISSIONS,
  bestRange,
  energyAfter,
  evaluate,
  unitText,
} from './engine.js';

/** @typedef {import('./engine.js').Setup} Setup */

const [current, voltage, energy] = MISSIONS;

/** @param {Partial<Setup>} over @returns {Setup} */
const setup = (over) => ({
  kind: 'dc',
  volts: 3,
  meter: 'ampe-ke',
  position: 'noi-tiep',
  polarity: 'dung',
  range: 0.6,
  ...over,
});

describe('virtual bench', () => {
  it('reads 0,5 A through the 3 V bulb with an ammeter in series on the 0,6 A range', () => {
    expect(BULB_AMPS).toBe(0.5);
    const r = evaluate(current, setup({}));
    expect(r.tone).toBe('ok');
    expect(r.value).toBe(0.5);
    expect(r.bulb).toBe('on');
    expect(r.needle).toBeCloseTo(0.5 / 0.6);
  });

  it('reads 3 V across the bulb with a voltmeter in parallel on the 6 V range', () => {
    const r = evaluate(voltage, setup({ meter: 'von-ke', position: 'song-song', range: 6 }));
    expect(r.tone).toBe('ok');
    expect(r.value).toBe(3);
  });

  it('shows 1,5 W on the joulemeter wired between source and bulb', () => {
    const r = evaluate(energy, setup({ meter: 'joulemeter' }));
    expect(r.tone).toBe('ok');
    expect(r.power).toBe(1.5);
    expect(r.needle).toBeNull();
    expect(energyAfter(1.5, 60)).toBe(90);
  });

  it('rejects an AC supply and a voltage above the rating', () => {
    expect(evaluate(current, setup({ kind: 'ac' })).tone).toBe('fail');
    const burnt = evaluate(current, setup({ volts: 6 }));
    expect(burnt.tone).toBe('fail');
    expect(burnt.bulb).toBe('burnt');
  });

  it('shorts the bulb with an ammeter in parallel and opens it with a voltmeter in series', () => {
    const short = evaluate(current, setup({ position: 'song-song' }));
    expect(short.bulb).toBe('off');
    expect(short.needle).toBeGreaterThan(1);
    const open = evaluate(voltage, setup({ meter: 'von-ke', range: 6 }));
    expect(open.bulb).toBe('off');
    expect(open.tone).toBe('fail');
  });

  it('lets wiring faults that bypass the bulb win over a too-high supply voltage', () => {
    const short = evaluate(current, setup({ position: 'song-song', volts: 12 }));
    expect(short.bulb).toBe('off');
    expect(short.text).toContain('nối tắt');
    const open = evaluate(voltage, setup({ meter: 'von-ke', range: 6, volts: 12 }));
    expect(open.bulb).toBe('off');
    expect(open.value).toBe(12);
    expect(open.text).toContain('vượt quá thang đo');
    expect(evaluate(current, setup({ volts: 12 })).bulb).toBe('burnt');
  });

  it('reports an over-range needle before telling that the device is the wrong one', () => {
    const r = evaluate(voltage, setup({ range: 0.3 }));
    expect(r.tone).toBe('fail');
    expect(r.needle).toBeGreaterThan(1);
    expect(r.text).toContain('giới hạn đo');
  });

  it('sends the needle backwards on reversed polarity', () => {
    const r = evaluate(current, setup({ polarity: 'nguoc' }));
    expect(r.tone).toBe('fail');
    expect(r.needle).toBeLessThan(0);
    expect(evaluate(energy, setup({ meter: 'joulemeter', polarity: 'nguoc' })).tone).toBe('fail');
  });

  it('flags the wrong device for the mission even when wired correctly', () => {
    const r = evaluate(current, setup({ meter: 'von-ke', position: 'song-song', range: 6 }));
    expect(r.tone).toBe('fail');
    expect(r.text).toContain('ampe kế');
  });

  it('judges the range: too small fails, too large warns, smallest fit passes', () => {
    expect(evaluate(current, setup({ range: 0.3 })).tone).toBe('fail');
    expect(evaluate(current, setup({ range: 3 })).tone).toBe('warn');
    expect(
      evaluate(voltage, setup({ meter: 'von-ke', position: 'song-song', range: 1.5 })).tone,
    ).toBe('fail');
    expect(
      evaluate(voltage, setup({ meter: 'von-ke', position: 'song-song', range: 15 })).tone,
    ).toBe('warn');
    expect(bestRange(METERS['ampe-ke'].ranges, 0.5)).toBe(0.6);
    expect(bestRange(METERS['von-ke'].ranges, 3)).toBe(6);
    expect(bestRange([1], 2)).toBeNull();
  });

  it('writes values with a decimal comma', () => {
    expect(unitText(0.5, 'A')).toBe('0,5 A');
  });

  it('has one solvable setup per mission', () => {
    for (const m of MISSIONS) {
      const ranges = METERS[m.meter].ranges;
      const range = ranges.length ? (bestRange(ranges, m.meter === 'ampe-ke' ? 0.5 : 3) ?? 0) : 0;
      expect(evaluate(m, setup({ meter: m.meter, position: m.position, range })).tone).toBe('ok');
    }
  });
});
