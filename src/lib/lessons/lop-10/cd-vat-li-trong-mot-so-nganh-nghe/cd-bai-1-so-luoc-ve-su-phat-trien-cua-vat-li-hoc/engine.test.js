import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  BRANCH_BINS,
  BRANCH_CARDS,
  MILESTONES,
  STAGES,
  earlierOf,
  judgeDuel,
  makeDuel,
  milestonesIn,
  nextRound,
  stageOfYear,
} from './engine.js';

describe('milestones', () => {
  it('have unique ids and unique years', () => {
    expect(new Set(MILESTONES.map((m) => m.id)).size).toBe(MILESTONES.length);
    expect(new Set(MILESTONES.map((m) => m.year)).size).toBe(MILESTONES.length);
  });

  it('sit in the stage their year belongs to', () => {
    const wrong = MILESTONES.filter((m) => stageOfYear(m.year) !== m.stage).map((m) => m.id);
    expect(wrong).toEqual([]);
  });

  it('mark only the discoveries of the 1890s as the crisis', () => {
    const crisis = MILESTONES.filter((m) => m.crisis).map((m) => m.year);
    expect(crisis).toEqual([1895, 1896, 1897]);
  });
});

describe('milestonesIn', () => {
  it('filters by stage and keeps every stage playable', () => {
    for (const { id } of STAGES) {
      const list = milestonesIn(id);
      expect(list.length).toBeGreaterThanOrEqual(3);
      expect(list.every((m) => m.stage === id)).toBe(true);
    }
  });

  it('returns all milestones oldest first', () => {
    const years = milestonesIn('all').map((m) => m.year);
    expect(years).toHaveLength(MILESTONES.length);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});

describe('duel', () => {
  it('always draws two different milestones from the pool', () => {
    const pool = milestonesIn('tien');
    const bad = [];
    for (let round = 0; round < 40; round++) {
      const { first, second } = makeDuel(pool, round);
      if (first.id === second.id || !pool.includes(first) || !pool.includes(second)) {
        bad.push(round);
      }
    }
    expect(bad).toEqual([]);
  });

  it('varies between rounds', () => {
    const pairs = new Set();
    for (let round = 0; round < 40; round++) {
      const { first, second } = makeDuel(MILESTONES, round);
      pairs.add(`${first.id}-${second.id}`);
    }
    expect(pairs.size).toBeGreaterThan(5);
  });

  it('never repeats a pair in the next round, even in the smallest pool', () => {
    const pool = milestonesIn('tien');
    const pair = (/** @type {number} */ r) => {
      const { first, second } = makeDuel(pool, r);
      return [first.id, second.id].sort().join();
    };
    const repeats = [];
    for (let round = 0; round < 30; round++) {
      if (pair(nextRound(pool, round)) === pair(round)) repeats.push(round);
    }
    expect(repeats).toEqual([]);
  });

  it('judges the earlier milestone right and the later one wrong', () => {
    const newton = MILESTONES.find((m) => m.id === 'newton');
    const planck = MILESTONES.find((m) => m.id === 'planck');
    if (!newton || !planck) throw new Error('missing milestone');
    const duel = { first: planck, second: newton };
    expect(earlierOf(duel)).toBe(newton);
    expect(judgeDuel(duel, 'newton').ok).toBe(true);
    expect(judgeDuel(duel, 'planck').ok).toBe(false);
    expect(judgeDuel(duel, 'planck').text).toContain('1687');
  });
});

describe('text', () => {
  it('writes only TeX that KaTeX accepts', () => {
    expect(strictTexFailures(MILESTONES.map((m) => m.detail))).toEqual([]);
  });
});

describe('branch cards', () => {
  it('all point at a real bin and every bin has cards', () => {
    const bins = BRANCH_BINS.map((b) => b.id);
    expect(BRANCH_CARDS.filter((c) => !bins.includes(c.bin))).toEqual([]);
    expect(bins.filter((b) => !BRANCH_CARDS.some((c) => c.bin === b))).toEqual([]);
  });
});
