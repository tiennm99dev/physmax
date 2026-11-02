import { describe, expect, it } from 'vitest';
import { aimAt, cosOf, kindOf, workOf } from './engine.js';

describe('work of a force', () => {
  it('follows A = F.s.cos α', () => {
    expect(workOf(100, 20, 60)).toBe(1000);
    expect(workOf(50, 10, 0)).toBe(500);
    expect(workOf(100, 10, 30)).toBeCloseTo(866.025, 3);
  });

  it('is exactly zero when the force is perpendicular', () => {
    expect(cosOf(90)).toBe(0);
    expect(workOf(80, 7, 90)).toBe(0);
  });

  it('is negative past a right angle', () => {
    expect(workOf(2000, 25, 180)).toBe(-50000);
    expect(workOf(100, 10, 120)).toBe(-500);
  });
});

describe('kinds of work', () => {
  it('sorts the angle into driving, none and resisting', () => {
    expect(kindOf(0)).toBe('phat-dong');
    expect(kindOf(85)).toBe('phat-dong');
    expect(kindOf(90)).toBe('khong');
    expect(kindOf(95)).toBe('can');
    expect(kindOf(180)).toBe('can');
  });
});

describe('aiming the force', () => {
  it('reads direction and size from the pointer', () => {
    expect(aimAt(100, 100, { x: 150, y: 100 }, 1)).toEqual({ alpha: 0, force: 50 });
    expect(aimAt(100, 100, { x: 100, y: 40 }, 1)).toEqual({ alpha: 90, force: 60 });
    expect(aimAt(100, 100, { x: 60, y: 60 }, 1).alpha).toBe(135);
  });

  it('stays in the upper half and within the force limits', () => {
    expect(aimAt(100, 100, { x: 40, y: 140 }, 1)).toEqual({ alpha: 180, force: 60 });
    expect(aimAt(100, 100, { x: 300, y: 130 }, 1)).toEqual({ alpha: 0, force: 100 });
    expect(aimAt(100, 100, { x: 102, y: 100 }, 1).force).toBe(20);
  });
});
