import { describe, expect, it } from 'vitest';
import {
  ATM,
  cupOutcome,
  flowDirection,
  flowStep,
  liquidPressure,
  settledLevel,
} from './engine.js';

describe('liquid pressure', () => {
  it('grows with depth: p = d·h', () => {
    expect(liquidPressure(1000, 0)).toBe(0);
    expect(liquidPressure(1000, 10)).toBe(1000);
    expect(liquidPressure(1000, 100)).toBe(10000);
    expect(liquidPressure(800, 50)).toBe(4000);
    expect(liquidPressure(1000, 60)).toBeGreaterThan(liquidPressure(1000, 30));
    expect(() => liquidPressure(1000, -1)).toThrow();
  });

  it('is far smaller in a glass of water than the air pressure', () => {
    expect(liquidPressure(1000, 10) * 50).toBeLessThan(ATM);
  });
});

describe('communicating vessels', () => {
  it('settles both branches at the mean level', () => {
    expect(settledLevel(30, 10)).toBe(20);
    expect(flowDirection(30, 10)).toBe('trai-sang-phai');
    expect(flowDirection(10, 30)).toBe('phai-sang-trai');
    expect(flowDirection(20, 20)).toBe('dung-yen');
  });

  it('flows step by step without overshooting', () => {
    let [l, r] = [30, 10];
    for (let i = 0; i < 100; i += 1) [l, r] = flowStep(l, r, 0.7);
    expect([l, r]).toEqual([20, 20]);
    expect(flowStep(12, 18, 1)).toEqual([13, 17]);
    expect(flowStep(20, 20, 1)).toEqual([20, 20]);
  });
});

describe('glass of water under a sheet of paper', () => {
  it('holds the water only with the paper and the air', () => {
    expect(cupOutcome('ngua', false, true).stays).toBe(true);
    expect(cupOutcome('up', false, true).stays).toBe(false);
    expect(cupOutcome('up', true, true).stays).toBe(true);
    expect(cupOutcome('nghieng', true, true).stays).toBe(true);
    expect(cupOutcome('up', true, false).stays).toBe(false);
  });
});
