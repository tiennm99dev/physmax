import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { CAREERS, INTERESTS, isRight, suggest, tally } from './engine.js';

const ids = CAREERS.map((c) => c.id);

describe('career cards', () => {
  it('have unique ids and a valid answer among three options', () => {
    expect(new Set(ids).size).toBe(CAREERS.length);
    const bad = CAREERS.filter((c) => c.options.length !== 3 || !c.options[c.answer]);
    expect(bad).toEqual([]);
  });

  it('do not always put the right option in one place', () => {
    expect(new Set(CAREERS.map((c) => c.answer)).size).toBe(3);
  });

  it('write only TeX that KaTeX accepts', () => {
    expect(strictTexFailures(CAREERS.map((c) => c.why))).toEqual([]);
  });
});

describe('tally', () => {
  it('counts flipped cards and right guesses', () => {
    const [a, b] = CAREERS;
    const guesses = { [a.id]: a.answer, [b.id]: (b.answer + 1) % 3 };
    expect(tally(guesses)).toEqual({ flipped: 2, right: 1 });
    expect(tally({})).toEqual({ flipped: 0, right: 0 });
  });

  it('recognises the right option', () => {
    const [a] = CAREERS;
    expect(isRight(a, a.answer)).toBe(true);
    expect(isRight(a, (a.answer + 1) % 3)).toBe(false);
  });
});

describe('interests', () => {
  it('point only at real careers and leave no career unreachable', () => {
    const named = INTERESTS.flatMap((i) => i.careers);
    expect(named.filter((id) => !ids.includes(id))).toEqual([]);
    expect(ids.filter((id) => !named.includes(id))).toEqual([]);
  });

  it('suggest nothing until an interest is chosen', () => {
    expect(suggest([])).toEqual([]);
  });

  it('rank careers matching more interests first', () => {
    const list = suggest(['lap-rap', 'lap-trinh']);
    expect(list[0].id).toBe('co-khi');
    expect(list[0].reasons).toHaveLength(2);
    expect(list).toHaveLength(3);
  });

  it('honour the limit and give every career something to study', () => {
    const all = suggest(
      INTERESTS.map((i) => i.id),
      CAREERS.length,
    );
    expect(all).toHaveLength(CAREERS.length);
    expect(all.filter((s) => !s.study)).toEqual([]);
    expect(suggest(['moi-truong'], 2)).toHaveLength(2);
  });
});
