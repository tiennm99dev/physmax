import { describe, expect, it } from 'vitest';
import { COLS, ROWS, TASKS, answerTip, checkArrow, clampNode } from './engine.js';

const task = (/** @type {string} */ id) => {
  const t = TASKS.find((x) => x.id === id);
  if (!t) throw new Error(id);
  return t;
};

describe('force arrow on a scaled grid', () => {
  it('accepts the right arrow of every task, inside the grid', () => {
    for (const t of TASKS) {
      const tip = answerTip(t);
      expect(tip.c, t.id).toBeGreaterThanOrEqual(0);
      expect(tip.c, t.id).toBeLessThanOrEqual(COLS);
      expect(tip.r, t.id).toBeGreaterThanOrEqual(0);
      expect(tip.r, t.id).toBeLessThanOrEqual(ROWS);
      expect(Number.isInteger(tip.c) && Number.isInteger(tip.r), t.id).toBe(true);
      expect(checkArrow(t, t.at, tip).correct, t.id).toBe(true);
    }
  });

  it('works out the size an arrow stands for', () => {
    const t = task('keo-thung');
    expect(answerTip(t)).toEqual({ c: 10, r: 5 });
    expect(checkArrow(t, t.at, { c: 9, r: 5 }).value).toBe(20);
    expect(checkArrow(task('nam-cham'), { c: 8, r: 2 }, { c: 8, r: 6 }).value).toBe(2);
  });

  it('names each wrong feature separately', () => {
    const t = task('keo-thung');
    const backwards = checkArrow(t, t.at, { c: 4, r: 5 });
    expect(backwards).toMatchObject({ point: true, line: true, sense: false, magnitude: true });
    const vertical = checkArrow(t, t.at, { c: 7, r: 2 });
    expect(vertical).toMatchObject({ line: false, sense: false, magnitude: true });
    const moved = checkArrow(t, { c: 8, r: 5 }, { c: 11, r: 5 });
    expect(moved).toMatchObject({ point: false, line: true, sense: true, magnitude: true });
    const short = checkArrow(t, t.at, { c: 9, r: 5 });
    expect(short).toMatchObject({ sense: true, magnitude: false, correct: false });
    expect(checkArrow(t, t.at, t.at)).toMatchObject({ empty: true, line: false });
  });

  it('upward and downward forces use rows that grow downwards', () => {
    const lift = task('nang-ta');
    expect(answerTip(lift)).toEqual({ c: 8, r: 4 });
    expect(checkArrow(lift, lift.at, { c: 8, r: 12 }).sense).toBe(false);
  });

  it('keeps dragged nodes on the grid', () => {
    expect(clampNode({ c: -2, r: 3.4 })).toEqual({ c: 0, r: 3 });
    expect(clampNode({ c: 30, r: 11 })).toEqual({ c: COLS, r: ROWS });
  });
});
