import { describe, expect, it } from 'vitest';
import {
  EARTH_KM,
  PLANETS,
  SUN_KM,
  VIEW_MAX_AU,
  VIEW_MIN_AU,
  diameterVsEarth,
  millionKm,
  orbitAngle,
  planet,
  planetsInView,
  turnsAfter,
  viewAu,
} from './engine.js';

describe('planet data', () => {
  it('lists the eight planets from the nearest to the farthest', () => {
    expect(PLANETS.map((p) => p.name)).toEqual([
      'Thuỷ tinh',
      'Kim tinh',
      'Trái Đất',
      'Hoả tinh',
      'Mộc tinh',
      'Thổ tinh',
      'Thiên Vương tinh',
      'Hải Vương tinh',
    ]);
    const distances = PLANETS.map((p) => p.au);
    expect([...distances].sort((a, b) => a - b)).toEqual(distances);
  });

  it('takes longer to go round the Sun the farther a planet is', () => {
    const periods = PLANETS.map((p) => p.periodYears);
    expect([...periods].sort((a, b) => a - b)).toEqual(periods);
  });

  it('groups four rocky inner and four gas outer planets', () => {
    expect(PLANETS.filter((p) => p.group === 'trong').map((p) => p.id)).toEqual([
      'thuy',
      'kim',
      'trai-dat',
      'hoa',
    ]);
  });

  it('makes Jupiter the largest planet and Mercury the smallest', () => {
    const bySize = [...PLANETS].sort((a, b) => b.km - a.km);
    expect(bySize[0].id).toBe('moc');
    expect(bySize.at(-1)?.id).toBe('thuy');
  });
});

describe('distances and sizes', () => {
  it('converts AU to millions of km at 150 million km per AU', () => {
    expect(millionKm(1)).toBe(150);
    expect(millionKm(5.2)).toBe(780);
    expect(millionKm(9.54)).toBe(1431);
  });

  it('compares diameters with the Earth', () => {
    expect(diameterVsEarth(planet('moc'))).toBe(11.21);
    expect(diameterVsEarth(planet('thuy'))).toBe(0.38);
    expect(Math.round(SUN_KM / EARTH_KM)).toBe(109);
  });
});

describe('the orbit view', () => {
  it('counts turns around the Sun', () => {
    expect(turnsAfter(planet('trai-dat'), 3)).toBe(3);
    expect(turnsAfter(planet('moc'), 11.86)).toBe(1);
    expect(orbitAngle(planet('trai-dat'), 1)).toBeCloseTo(orbitAngle(planet('trai-dat'), 0));
  });

  it('zooms logarithmically from the inner planets to the whole system', () => {
    expect(viewAu(0)).toBe(VIEW_MIN_AU);
    expect(viewAu(100)).toBeCloseTo(VIEW_MAX_AU);
    expect(viewAu(50)).toBeCloseTo(Math.sqrt(VIEW_MIN_AU * VIEW_MAX_AU));
    expect(planetsInView(viewAu(0)).map((p) => p.id)).toEqual(['thuy', 'kim', 'trai-dat', 'hoa']);
    expect(planetsInView(viewAu(100))).toHaveLength(8);
  });
});
