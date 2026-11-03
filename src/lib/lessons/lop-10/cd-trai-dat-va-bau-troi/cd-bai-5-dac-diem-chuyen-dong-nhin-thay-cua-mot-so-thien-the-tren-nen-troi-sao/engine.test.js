import { describe, expect, it } from 'vitest';
import {
  MARKS,
  PLANETS,
  ZODIAC,
  constellationAt,
  dateText,
  dayLength,
  declination,
  durationText,
  elongation,
  isRetrograde,
  maxElongation,
  moonLitPath,
  moonPhase,
  moonPosition,
  noonSun,
  planetById,
  riseOffset,
  seenFromEarth,
  splitRuns,
  sunLon,
  sunPosition,
  visibilityOf,
  wrap180,
} from './engine.js';

const kim = planetById('kim');
const thuy = planetById('thuy');
const hoa = planetById('hoa');
/** @param {number} days */
const everyDay = (days) => Array.from({ length: days }, (_, i) => i);

describe('the planets seen from Earth', () => {
  it('keeps Venus and Mercury close to the Sun', () => {
    const reach = (/** @type {typeof kim} */ p) =>
      Math.max(...everyDay(1200).map((n) => Math.abs(elongation(seenFromEarth(p, n).lon, n))));
    expect(reach(kim)).toBeLessThan(47.5);
    expect(reach(kim)).toBeGreaterThan(44);
    expect(reach(thuy)).toBeLessThan(24.5);
    expect(reach(thuy)).toBeGreaterThan(21);
    expect(maxElongation(kim)).toBeCloseTo(46.3, 0);
    expect(maxElongation(hoa)).toBe(180);
  });

  it('lets Mars stand opposite the Sun and go backwards then', () => {
    const days = everyDay(800);
    const opposite = days.find((n) => Math.abs(elongation(seenFromEarth(hoa, n).lon, n)) > 178);
    expect(opposite).toBeDefined();
    expect(isRetrograde(hoa, /** @type {number} */ (opposite))).toBe(true);
  });

  it('has Mars go forward most of the time', () => {
    const back = everyDay(800).filter((n) => isRetrograde(hoa, n)).length;
    expect(back / 800).toBeLessThan(0.15);
    expect(back).toBeGreaterThan(40);
  });

  it('moves the Sun one degree a day to the east', () => {
    expect(wrap180(sunLon(10) - sunLon(9))).toBeCloseTo(0.9856, 3);
  });

  it('moves the Moon about thirteen degrees a day and within five degrees of the ecliptic', () => {
    expect(wrap180(moonPosition(11).lon - moonPosition(10).lon)).toBeCloseTo(13.18, 1);
    const far = everyDay(60).filter((n) => Math.abs(moonPosition(n).lat) > 5.2);
    expect(far).toEqual([]);
  });

  it('places a known new moon', () => {
    // A new moon fell on 6 February 2027.
    const n = (Date.UTC(2027, 1, 6) - Date.UTC(2027, 0, 1)) / 86_400_000;
    expect(Math.abs(wrap180(moonPosition(n).lon - sunLon(n)))).toBeLessThan(15);
  });

  it('tells evening from morning by the side of the Sun', () => {
    expect(visibilityOf(30)).toContain('hoàng hôn');
    expect(visibilityOf(-30)).toContain('bình minh');
  });

  it('names the planets once each', () => {
    expect(new Set(PLANETS.map((p) => p.name)).size).toBe(PLANETS.length);
  });
});

describe('the zodiac strip', () => {
  it('puts the Sun in its constellation by date', () => {
    const on = (/** @type {number} */ m, /** @type {number} */ d) =>
      sunLon((Date.UTC(2027, m - 1, d) - Date.UTC(2027, 0, 1)) / 86_400_000);
    expect(constellationAt(on(1, 25))).toBe('Ma Kết');
    expect(constellationAt(on(3, 21))).toBe('Song Ngư');
    expect(constellationAt(on(8, 15))).toBe('Sư Tử');
    expect(constellationAt(on(12, 1))).toBe('Xà Phu');
    expect(constellationAt(on(1, 5))).toBe('Nhân Mã');
    expect(ZODIAC).toHaveLength(13);
  });

  it('writes dates the Vietnamese way', () => {
    expect(dateText(0)).toBe('01/01/2027');
    expect(dateText(31)).toBe('01/02/2027');
  });

  it('cuts a trail where it jumps across the strip', () => {
    const runs = splitRuns(
      [
        { x: 10, y: 0 },
        { x: 5, y: 0 },
        { x: 395, y: 0 },
      ],
      200,
    );
    expect(runs.map((r) => r.length)).toEqual([2, 1]);
  });
});

describe('the phases of the Moon', () => {
  it('names the phase and the lit share from the angle to the Sun', () => {
    expect(moonPhase(0).name).toContain('non');
    expect(moonPhase(0).lit).toBeCloseTo(0, 6);
    expect(moonPhase(90).name).toBe('trăng bán nguyệt đầu tháng');
    expect(moonPhase(90).lit).toBeCloseTo(0.5, 6);
    expect(moonPhase(180).name).toBe('trăng tròn');
    expect(moonPhase(180).lit).toBeCloseTo(1, 6);
    expect(moonPhase(-90).name).toBe('trăng bán nguyệt cuối tháng');
  });

  it('lights the right side while waxing and the left side while waning', () => {
    expect(moonLitPath(50, 50, 10, 45)).toContain('0 0 1 50 60');
    expect(moonLitPath(50, 50, 10, -45)).toContain('0 0 0 50 60');
  });
});

describe('the daily path of the Sun', () => {
  it('reaches the marked declinations on the marked days', () => {
    const [xuan, ha, thu, dong] = MARKS.map((m) => declination(m.day));
    expect(Math.abs(xuan)).toBeLessThan(0.5);
    expect(ha).toBeGreaterThan(23.3);
    expect(Math.abs(thu)).toBeLessThan(0.5);
    expect(dong).toBeLessThan(-23.3);
  });

  it('rises due east and gives twelve hours at the equinox', () => {
    expect(riseOffset(21, 0)).toBeCloseTo(0, 6);
    expect(dayLength(21, 0)).toBeCloseTo(12, 6);
    expect(sunPosition(21, 0, 6).alt).toBeCloseTo(0, 6);
    expect(sunPosition(21, 0, 6).az).toBeCloseTo(90, 6);
    expect(sunPosition(21, 0, 18).az).toBeCloseTo(270, 6);
  });

  it('makes summer days long and winter days short north of the equator', () => {
    expect(dayLength(21, 23.44)).toBeCloseTo(13.3, 0);
    expect(dayLength(21, -23.44)).toBeCloseTo(10.7, 0);
    expect(riseOffset(21, 23.44)).toBeGreaterThan(23);
    expect(riseOffset(21, -23.44)).toBeLessThan(-23);
  });

  it('gives the noon height and the side of the zenith', () => {
    expect(noonSun(21, 0)).toEqual({ alt: 69, side: 'Nam' });
    expect(noonSun(21, -23.5)).toEqual({ alt: 45.5, side: 'Nam' });
    expect(noonSun(21, 23.5)).toEqual({ alt: 87.5, side: 'Bắc' });
    expect(noonSun(21, 21).side).toBe('đỉnh đầu');
    expect(sunPosition(21, 0, 12).alt).toBeCloseTo(69, 6);
  });
});

describe('durationText', () => {
  it('never writes sixty minutes', () => {
    expect(durationText(12)).toBe('12 giờ 0 phút');
    expect(durationText(10.5)).toBe('10 giờ 30 phút');
    expect(durationText(11.999)).toBe('12 giờ 0 phút');
  });
});
