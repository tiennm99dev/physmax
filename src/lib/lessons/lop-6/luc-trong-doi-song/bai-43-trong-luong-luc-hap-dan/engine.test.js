import { describe, expect, it } from 'vitest';
import { PLACES, RANGE, THINGS, timesLighter, trendFromEarth, weightAt } from './engine.js';

describe('mass and weight in three places', () => {
  it('gives the weight of each object in each place', () => {
    expect(weightAt(1, 'trai-dat')).toBe(9.8);
    expect(weightAt(1, 'mat-trang')).toBe(1.6);
    expect(weightAt(2, 'sao-hoa')).toBe(7.4);
    expect(weightAt(0.5, 'sao-hoa')).toBe(1.85);
  });

  it('keeps every reading inside the spring balance range', () => {
    for (const t of THINGS) {
      for (const p of PLACES) expect(weightAt(t.mass, p.id)).toBeLessThanOrEqual(RANGE);
    }
  });

  it('keeps the mass and lowers the weight away from Earth', () => {
    expect(trendFromEarth('mat-trang')).toEqual({ mass: 'khong-doi', weight: 'giam' });
    expect(trendFromEarth('sao-hoa')).toEqual({ mass: 'khong-doi', weight: 'giam' });
    expect(trendFromEarth('trai-dat')).toEqual({ mass: 'khong-doi', weight: 'khong-doi' });
  });

  it('makes things about six times lighter on the Moon', () => {
    expect(timesLighter('mat-trang')).toBeCloseTo(6.125);
    expect(Math.round(timesLighter('mat-trang'))).toBe(6);
  });
});
