import { describe, expect, it } from 'vitest';
import { isCorrect, place, progress, shuffled } from './sorter.js';

const cards = [
  { id: 'a', label: 'A', bin: 'x', why: '' },
  { id: 'b', label: 'B', bin: 'y', why: '' },
  { id: 'c', label: 'C', bin: 'x', why: '' },
];

describe('card sorter', () => {
  it('places, moves and removes a card without mutating the input', () => {
    /** @type {Record<string, string>} */
    const empty = {};
    const one = place(empty, 'a', 'y');
    expect(empty).toEqual({});
    expect(one).toEqual({ a: 'y' });
    expect(place(one, 'a', 'x')).toEqual({ a: 'x' });
    expect(place(one, 'a', null)).toEqual({});
  });

  it('checks each card against its own bin', () => {
    expect(isCorrect(cards[0], {})).toBe(null);
    expect(isCorrect(cards[0], { a: 'x' })).toBe(true);
    expect(isCorrect(cards[0], { a: 'y' })).toBe(false);
  });

  it('counts progress and finishes only when every card is right', () => {
    expect(progress(cards, { a: 'x', b: 'x' })).toEqual({
      placed: 2,
      correct: 1,
      total: 3,
      done: false,
    });
    expect(progress(cards, { a: 'x', b: 'y', c: 'x' }).done).toBe(true);
  });

  it('shuffles deterministically and keeps every item', () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    const s = shuffled(items, 7);
    expect(s).toEqual(shuffled(items, 7));
    expect([...s].sort((p, q) => p - q)).toEqual(items);
    expect(s).not.toEqual(items);
  });
});
