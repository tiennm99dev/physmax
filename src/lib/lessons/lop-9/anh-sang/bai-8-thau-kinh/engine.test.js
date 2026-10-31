import { describe, expect, it } from 'vitest';
import { TARGETS, imageKind, meetsTarget, zoneOf } from './engine.js';

describe('object zones', () => {
  it('sorts converging-lens positions the book way', () => {
    expect(zoneOf(10, 30)).toBe('xa');
    expect(zoneOf(10, 20)).toBe('hai-f');
    expect(zoneOf(10, 15)).toBe('giua');
    expect(zoneOf(10, 10)).toBe('tieu-diem');
    expect(zoneOf(10, 6)).toBe('gan');
    expect(zoneOf(-10, 30)).toBe('phan-ki');
  });

  it('names the image of each case', () => {
    expect(imageKind(10, 30)).toEqual({ real: true, size: 'nho' });
    expect(imageKind(10, 20)).toEqual({ real: true, size: 'bang' });
    expect(imageKind(10, 15)).toEqual({ real: true, size: 'lon' });
    expect(imageKind(10, 10)).toBeNull();
    expect(imageKind(10, 6)).toEqual({ real: false, size: 'lon' });
    expect(imageKind(-10, 6)).toEqual({ real: false, size: 'nho' });
  });

  it('can reach every challenge with some lens and distance', () => {
    const missing = TARGETS.filter(
      (t) => ![10, -10].some((f) => [5, 15, 20, 30].some((d) => meetsTarget(f, d, t))),
    );
    expect(missing).toEqual([]);
    expect(meetsTarget(10, 30, TARGETS[1])).toBe(false);
  });
});
