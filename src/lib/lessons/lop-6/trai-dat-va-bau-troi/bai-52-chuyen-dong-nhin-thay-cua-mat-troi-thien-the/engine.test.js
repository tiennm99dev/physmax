import { describe, expect, it } from 'vitest';
import {
  clockText,
  hourAt,
  isDay,
  momentOf,
  placeAngle,
  skyPosition,
  spinFor,
  sunAltitude,
} from './engine.js';

describe('solar time from the Earth turning', () => {
  it('maps the position angle to midnight, sunrise, noon and sunset', () => {
    expect(hourAt(0)).toBe(0);
    expect(hourAt(90)).toBe(6);
    expect(hourAt(180)).toBe(12);
    expect(hourAt(270)).toBe(18);
    expect(hourAt(-15)).toBe(23);
  });

  it('advances one hour for every 15 degrees of spin', () => {
    const before = hourAt(placeAngle(100, 105));
    const after = hourAt(placeAngle(115, 105));
    expect(after - before).toBe(1);
  });

  it('finds the spin that puts a place at a given hour', () => {
    const spin = spinFor(105, 12);
    expect(hourAt(placeAngle(spin, 105))).toBe(12);
    // Noon at 105° E is 6 h at 15° E and 5 h at 0°.
    expect(hourAt(placeAngle(spin, 15))).toBe(6);
    expect(hourAt(placeAngle(spin, 0))).toBe(5);
  });
});

describe('the Sun in the sky', () => {
  it('stands highest at noon and on the horizon at 6 h and 18 h', () => {
    expect(sunAltitude(12)).toBe(90);
    expect(sunAltitude(6)).toBe(0);
    expect(sunAltitude(18)).toBe(0);
    expect(sunAltitude(0)).toBe(-90);
    expect(sunAltitude(9)).toBe(45);
  });

  it('is day between sunrise and sunset only', () => {
    expect(isDay(6)).toBe(true);
    expect(isDay(13)).toBe(true);
    expect(isDay(5.9)).toBe(false);
    expect(isDay(22)).toBe(false);
  });

  it('crosses the sky from east to west', () => {
    expect(skyPosition(6)).toEqual({ across: 0, up: 0 });
    expect(skyPosition(12)?.up).toBeCloseTo(1);
    expect(skyPosition(9)?.across).toBe(0.25);
    expect(skyPosition(15)?.across).toBe(0.75);
    expect(skyPosition(2)).toBeNull();
  });

  it('names the parts of the day', () => {
    expect(momentOf(6)).toBe('moc');
    expect(momentOf(9)).toBe('sang');
    expect(momentOf(12)).toBe('trua');
    expect(momentOf(15)).toBe('chieu');
    expect(momentOf(18)).toBe('lan');
    expect(momentOf(23)).toBe('dem');
  });

  it('writes the time like a clock', () => {
    expect(clockText(6.5)).toBe('6 giờ 30 phút');
    expect(clockText(0)).toBe('0 giờ');
    expect(clockText(23.999)).toBe('0 giờ');
    expect(clockText(-1)).toBe('23 giờ');
  });
});
