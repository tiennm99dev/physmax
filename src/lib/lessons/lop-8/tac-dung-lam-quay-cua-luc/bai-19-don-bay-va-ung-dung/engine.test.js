import { describe, expect, it } from 'vitest';
import {
  HOLES,
  TASKS,
  arms,
  balanced,
  balancingEffort,
  effortDirection,
  forceGain,
  leverKind,
  netMoment,
  taskDone,
} from './engine.js';

describe('lever on a bar with holes', () => {
  it('measures both lever arms from the fulcrum', () => {
    expect(arms({ o: 4, load: 2, effort: 10 })).toEqual({ d1: 20, d2: 60 });
  });

  it('sorts levers by where the fulcrum, load and effort sit', () => {
    expect(leverKind({ o: 4, load: 2, effort: 10 })).toBe(1);
    expect(leverKind({ o: 0, load: 3, effort: 12 })).toBe(2);
    expect(leverKind({ o: 0, load: 12, effort: 3 })).toBe(3);
    expect(leverKind({ o: 12, load: 9, effort: 0 })).toBe(2);
    expect(leverKind({ o: 5, load: 5, effort: 9 })).toBeNull();
    expect(leverKind({ o: 5, load: 2, effort: 5 })).toBeNull();
  });

  it('points the effort down across the fulcrum and up on the same side', () => {
    expect(effortDirection({ o: 4, load: 2, effort: 10 })).toBe('xuong');
    expect(effortDirection({ o: 0, load: 3, effort: 12 })).toBe('len');
  });

  it('balances when F1 · d1 = F2 · d2', () => {
    const s = { o: 4, load: 2, effort: 10 };
    expect(balancingEffort(60, s)).toBe(20);
    expect(netMoment(60, 20, s)).toBe(0);
    expect(netMoment(60, 30, s)).toBeGreaterThan(0);
    expect(netMoment(60, 10, s)).toBeLessThan(0);
    const up = { o: 0, load: 4, effort: 12 };
    expect(balancingEffort(60, up)).toBe(20);
    expect(netMoment(60, 20, up)).toBe(0);
    expect(balancingEffort(60, { o: 3, load: 1, effort: 3 })).toBeNull();
    const odd = { o: 0, load: 2, effort: 7 };
    expect(balanced(60, 17, odd)).toBe(true);
    expect(balanced(60, 18, odd)).toBe(false);
  });

  it('saves force only when the effort arm is the longer one', () => {
    expect(forceGain({ o: 4, load: 2, effort: 10 })).toBe('loi');
    expect(forceGain({ o: 0, load: 12, effort: 3 })).toBe('thiet');
    expect(forceGain({ o: 6, load: 3, effort: 9 })).toBe('bang');
  });

  it('has a reachable setup for every task', () => {
    for (const task of TASKS) {
      let found = false;
      for (let o = 0; o < HOLES; o += 1)
        for (let load = 0; load < HOLES; load += 1)
          for (let effort = 0; effort < HOLES; effort += 1) {
            const s = { o, load, effort };
            const f = balancingEffort(task.weight, s);
            if (f !== null && Number.isInteger(f) && taskDone(task, task.weight, f, s))
              found = true;
          }
      expect(found).toBe(true);
    }
  });
});
