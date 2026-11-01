import { describe, expect, it } from 'vitest';
import {
  DOMAIN_LABELS,
  SCENARIOS,
  SIGN_SETS,
  advance,
  choose,
  isFinished,
  isSolved,
  newRun,
  report,
} from './engine.js';

/** @param {number} index */
const safeOption = (index) => SCENARIOS[index].options.findIndex((o) => o.safe);
/** @param {number} index */
const unsafeOption = (index) => SCENARIOS[index].options.findIndex((o) => !o.safe);

describe('situations', () => {
  it('have unique ids and exactly one safe option each', () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
    const bad = SCENARIOS.filter((s) => s.options.filter((o) => o.safe).length !== 1);
    expect(bad).toEqual([]);
  });

  it('cover every domain and do not always put the safe option in one place', () => {
    for (const domain of Object.keys(DOMAIN_LABELS)) {
      expect(SCENARIOS.some((s) => s.domain === domain)).toBe(true);
    }
    expect(new Set(SCENARIOS.map((s) => s.options.findIndex((o) => o.safe))).size).toBe(3);
  });
});

describe('a walk through the situations', () => {
  it('stays on a situation until its safe option is found', () => {
    let run = choose(newRun(), unsafeOption(0));
    expect(isSolved(run, 0)).toBe(false);
    expect(advance(run).index).toBe(0);
    run = choose(run, safeOption(0));
    expect(isSolved(run, 0)).toBe(true);
    expect(advance(run).index).toBe(1);
  });

  it('ignores repeated tries and tries after solving', () => {
    let run = choose(newRun(), unsafeOption(0));
    expect(choose(run, unsafeOption(0))).toBe(run);
    run = choose(run, safeOption(0));
    expect(choose(run, unsafeOption(0))).toBe(run);
  });

  it('scores first tries per domain and finishes after the last situation', () => {
    let run = newRun();
    SCENARIOS.forEach((s, i) => {
      if (s.domain === 'dien') run = choose(run, unsafeOption(i));
      run = advance(choose(run, safeOption(i)));
    });
    expect(isFinished(run)).toBe(true);
    expect(advance(run)).toBe(run);
    const rows = report(run);
    expect(rows.find((r) => r.domain === 'dien')?.firstTry).toBe(0);
    const others = rows.filter((r) => r.domain !== 'dien');
    expect(others.every((r) => r.firstTry === r.total)).toBe(true);
    expect(rows.reduce((sum, r) => sum + r.total, 0)).toBe(SCENARIOS.length);
  });
});

describe('sign sets', () => {
  it('put every card in a bin that exists and fill every bin', () => {
    const bad = SIGN_SETS.flatMap((set) => {
      const ids = set.bins.map((b) => b.id);
      return [
        ...set.cards.filter((c) => !ids.includes(c.bin)).map((c) => c.id),
        ...ids.filter((id) => !set.cards.some((c) => c.bin === id)),
      ];
    });
    expect(bad).toEqual([]);
  });

  it('use a distinct picture and id for each card of a set', () => {
    for (const set of SIGN_SETS) {
      expect(new Set(set.cards.map((c) => c.id)).size).toBe(set.cards.length);
      expect(new Set(set.cards.map((c) => c.sign)).size).toBe(set.cards.length);
    }
  });
});
