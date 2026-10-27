import { describe, expect, it } from 'vitest';
import { AMMETER, VOLTMETER, convert, needleAngle, readBench } from './engine.js';

/** @typedef {import('./engine.js').Meter} Meter */

/** @type {Meter} */
const series = { at: 'noi-tiep', plusToPositive: true };
/** @type {Meter} */
const across = { at: 'song-song', plusToPositive: true };
/** @type {Meter} */
const none = { at: 'khong', plusToPositive: true };

describe('measuring current and voltage on the bench', () => {
  it('reads I = U / 6 and the source voltage when both meters are right', () => {
    const r = readBench({ voltage: 3, closed: true, ammeter: series, voltmeter: across });
    expect(r).toEqual({ lampCurrent: 0.5, lampOn: true, ammeter: 0.5, voltmeter: 3, errors: [] });
    expect(
      readBench({ voltage: 4.5, closed: true, ammeter: series, voltmeter: none }).ammeter,
    ).toBe(0.75);
    expect(
      readBench({ voltage: 1.5, closed: true, ammeter: series, voltmeter: none }).ammeter,
    ).toBe(0.25);
  });

  it('keeps every reading on the meter scales', () => {
    for (const u of [1.5, 3, 4.5]) {
      const r = readBench({ voltage: u, closed: true, ammeter: series, voltmeter: across });
      expect(r.ammeter).toBeLessThanOrEqual(AMMETER.range);
      expect(Math.round((r.ammeter ?? 0) / AMMETER.division) * AMMETER.division).toBeCloseTo(
        r.ammeter ?? 0,
        9,
      );
      expect(r.voltmeter).toBeLessThanOrEqual(VOLTMETER.range);
      expect(Math.round((r.voltmeter ?? 0) / VOLTMETER.division) * VOLTMETER.division).toBeCloseTo(
        r.voltmeter ?? 0,
        9,
      );
    }
  });

  it('reads nothing with the switch open', () => {
    const r = readBench({ voltage: 3, closed: false, ammeter: series, voltmeter: across });
    expect(r).toMatchObject({ lampOn: false, ammeter: 0, voltmeter: 0, errors: [] });
  });

  it('shorts the lamp and overloads an ammeter put across it', () => {
    const r = readBench({ voltage: 3, closed: true, ammeter: across, voltmeter: across });
    expect(r.lampOn).toBe(false);
    expect(r.ammeter).toBe(Infinity);
    expect(r.voltmeter).toBe(0);
    expect(r.errors).toEqual(['ak-song-song']);
  });

  it('stops the current when the voltmeter is in series', () => {
    const r = readBench({ voltage: 4.5, closed: true, ammeter: series, voltmeter: series });
    expect(r).toMatchObject({ lampOn: false, ammeter: 0, voltmeter: 4.5 });
    expect(r.errors).toEqual(['vk-noi-tiep']);
  });

  it('swings a reversed meter below zero', () => {
    const r = readBench({
      voltage: 3,
      closed: true,
      ammeter: { at: 'noi-tiep', plusToPositive: false },
      voltmeter: { at: 'song-song', plusToPositive: false },
    });
    expect(r.ammeter).toBe(-0.5);
    expect(r.voltmeter).toBe(-3);
    expect(r.errors).toEqual(['ak-nguoc', 'vk-nguoc']);
    expect(needleAngle(-0.5, 1)).toBe(-69.6);
  });

  it('maps readings to needle angles', () => {
    expect(needleAngle(0, 1)).toBe(-60);
    expect(needleAngle(0.5, 1)).toBe(0);
    expect(needleAngle(1, 1)).toBe(60);
    expect(needleAngle(Infinity, 1)).toBe(69.6);
  });

  it('converts between units', () => {
    expect(convert(0.25, 'A', 'mA')).toBe(250);
    expect(convert(1500, 'mA', 'A')).toBe(1.5);
    expect(convert(220, 'V', 'kV')).toBe(0.22);
    expect(convert(500, 'mV', 'V')).toBe(0.5);
    expect(convert(2.5, 'kV', 'V')).toBe(2500);
  });
});
