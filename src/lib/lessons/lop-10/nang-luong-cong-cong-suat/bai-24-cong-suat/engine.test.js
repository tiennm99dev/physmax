import { describe, expect, it } from 'vitest';
import { GEARS, bestGear, heightAt, liftWork, powerOf, pullOf } from './engine.js';

describe('lifting a person', () => {
  it('takes the same work whatever the time', () => {
    const work = liftWork(60, 15);
    expect(work).toBe(8820);
    expect(powerOf(work, 60)).toBe(147);
    expect(powerOf(work, 15)).toBe(588);
  });

  it('agrees with P = F.v', () => {
    const force = 60 * 9.8;
    expect(powerOf(liftWork(60, 15), 30)).toBeCloseTo(force * (15 / 30), 9);
  });

  it('stops climbing at the top', () => {
    expect(heightAt(12, 4, 1)).toBe(3);
    expect(heightAt(12, 4, 9)).toBe(12);
  });

  it('gives no power for no time', () => {
    expect(powerOf(100, 0)).toBe(0);
  });
});

describe('gears', () => {
  it('trades speed for force at one power', () => {
    expect(pullOf(60000, 20)).toBe(3000);
    expect(pullOf(60000, GEARS[0].speed)).toBe(7500);
  });

  it('picks the highest gear that pulls enough', () => {
    expect(bestGear(60000, 1500)?.value).toBe(5);
    expect(bestGear(60000, 3000)?.value).toBe(3);
    expect(bestGear(60000, 6000)?.value).toBe(1);
    expect(bestGear(40000, 6000)).toBe(null);
  });
});
