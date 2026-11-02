import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  CLUES,
  FIELDS,
  LINKS,
  SCALE,
  compareWithPerson,
  fieldOf,
  judgeClue,
  linksOf,
} from './engine.js';

const ids = FIELDS.map((f) => f.id);

describe('fields', () => {
  it('are unique and placed on the map without two at one spot', () => {
    expect(new Set(ids).size).toBe(FIELDS.length);
    expect(new Set(FIELDS.map((f) => `${f.x},${f.y}`)).size).toBe(FIELDS.length);
  });

  it('throw on an unknown id', () => {
    expect(fieldOf('nano').short).toBe('Nano');
    expect(() => fieldOf(/** @type {import('./engine.js').FieldId} */ ('xx'))).toThrow();
  });
});

describe('links', () => {
  it('join two different real fields, once per pair', () => {
    const bad = LINKS.filter((l) => l.a === l.b || !ids.includes(l.a) || !ids.includes(l.b));
    expect(bad).toEqual([]);
    const pairs = LINKS.map((l) => [l.a, l.b].sort().join());
    expect(new Set(pairs).size).toBe(LINKS.length);
  });

  it('reach every field at least twice', () => {
    expect(ids.filter((id) => linksOf(id).length < 2)).toEqual([]);
  });

  it('are seen from both ends', () => {
    expect(linksOf('nano').map((l) => l.other)).toContain('ban-dan');
    expect(linksOf('ban-dan').map((l) => l.other)).toContain('nano');
  });
});

describe('clues', () => {
  it('cover every field', () => {
    expect(ids.filter((id) => !CLUES.some((c) => c.field === id))).toEqual([]);
  });

  it('accept only the field of the clue', () => {
    const [clue] = CLUES;
    expect(judgeClue(clue, clue.field).ok).toBe(true);
    const other = ids.find((id) => id !== clue.field);
    if (!other) throw new Error('no other field');
    expect(judgeClue(clue, other).ok).toBe(false);
  });
});

describe('size scale', () => {
  it('runs from small to large', () => {
    const exps = SCALE.map((s) => s.exponent);
    expect(exps).toEqual([...exps].sort((a, b) => a - b));
    expect(new Set(exps).size).toBe(exps.length);
  });

  it('compares each stop with a person', () => {
    expect(compareWithPerson(-9)).toBe('Nhỏ hơn con người khoảng $10^{9}$ lần.');
    expect(compareWithPerson(7)).toBe('Lớn hơn con người khoảng $10^{7}$ lần.');
    expect(compareWithPerson(0)).toContain('đời sống');
  });

  it('writes only TeX that KaTeX accepts', () => {
    const texts = [
      ...SCALE.map((s) => s.size),
      ...SCALE.map((s) => compareWithPerson(s.exponent)),
      ...FIELDS.map((f) => f.object),
      ...CLUES.map((c) => c.text),
    ];
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
