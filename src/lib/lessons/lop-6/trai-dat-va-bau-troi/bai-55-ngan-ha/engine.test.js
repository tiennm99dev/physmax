import { describe, expect, it } from 'vitest';
import {
  LIGHT_YEAR_KM,
  STOPS,
  distanceText,
  durationText,
  kmAt,
  kmFromLy,
  lightSeconds,
  lyFromKm,
  nextStop,
  posOf,
  sceneAt,
  stopsPassed,
} from './engine.js';

describe('the light-year', () => {
  it('is the distance light covers in a year of 365 days', () => {
    expect(LIGHT_YEAR_KM).toBe(9460800000000);
    expect(lyFromKm(kmFromLy(4.24))).toBeCloseTo(4.24);
  });

  it('takes light 1,3 s to the Moon and 8 min 20 s to the Sun', () => {
    expect(durationText(lightSeconds(384400))).toBe('1,3 giây');
    expect(lightSeconds(150e6)).toBe(500);
    expect(durationText(500)).toBe('8 phút 20 giây');
    expect(durationText(lightSeconds(4.5e9))).toBe('4,2 giờ');
    expect(durationText(lightSeconds(kmFromLy(4.24)))).toBe('4,24 năm');
    expect(durationText(lightSeconds(kmFromLy(26000)))).toBe('26 000 năm');
  });
});

describe('writing distances', () => {
  it('switches units as the distance grows', () => {
    expect(distanceText(384400)).toBe('384 400 km');
    expect(distanceText(150e6)).toBe('150 triệu km');
    expect(distanceText(4.5e9)).toBe('4,5 tỉ km');
    expect(distanceText(kmFromLy(16.7))).toBe('16,7 năm ánh sáng');
    expect(distanceText(kmFromLy(100000))).toBe('100 000 năm ánh sáng');
  });
});

describe('the journey slider', () => {
  it('maps positions to distances logarithmically and back', () => {
    expect(kmAt(0)).toBe(1e5);
    expect(posOf(kmAt(500))).toBe(500);
    for (const s of STOPS) {
      expect(posOf(s.km)).toBeGreaterThan(0);
      // Jumping to a stop's position reaches it.
      expect(stopsPassed(kmAt(posOf(s.km))).at(-1)?.id).toBe(s.id);
    }
  });

  it('lists the stops in order of distance', () => {
    const km = STOPS.map((s) => s.km);
    expect([...km].sort((a, b) => a - b)).toEqual(km);
  });

  it('shows the scene of the farthest region reached', () => {
    expect(sceneAt(1e5)).toBe('trai-dat-mat-trang');
    expect(sceneAt(150e6)).toBe('he-mat-troi');
    expect(sceneAt(kmFromLy(4.24))).toBe('cac-sao');
    expect(sceneAt(kmFromLy(26000))).toBe('ngan-ha');
    expect(sceneAt(kmFromLy(2.5e6))).toBe('thien-ha');
  });

  it('knows which stops are behind and which is next', () => {
    expect(stopsPassed(150e6).map((s) => s.id)).toEqual(['mat-trang', 'mat-troi']);
    expect(nextStop(150e6)?.id).toBe('hai-vuong');
    expect(nextStop(kmFromLy(3e6))).toBeNull();
  });
});
