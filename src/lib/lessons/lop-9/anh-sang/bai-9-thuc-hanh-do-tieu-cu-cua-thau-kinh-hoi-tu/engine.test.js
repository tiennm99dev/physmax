import { describe, expect, it } from 'vitest';
import {
  LENSES,
  OBJECT_HEIGHT,
  focalFromSymmetric,
  imageDistance,
  mean,
  sameHeight,
  screenImage,
} from './engine.js';

describe('virtual focal-length bench', () => {
  it('gives a sharp image as tall as the object exactly at d = d′ = 2f', () => {
    const bad = [];
    for (const f of LENSES) {
      const s = screenImage(f, 2 * f, 2 * f);
      if (!s.sharp || !sameHeight(s.height, OBJECT_HEIGHT)) bad.push(f);
      if (focalFromSymmetric(2 * f, 2 * f) !== f) bad.push(`f${f}`);
    }
    expect(bad).toEqual([]);
  });

  it('blurs the image when the screen is off the image', () => {
    expect(imageDistance(10, 15)).toBeCloseTo(30, 12);
    expect(screenImage(10, 20, 25).sharp).toBe(false);
    expect(screenImage(10, 20, 25).blur).toBeCloseTo(1, 12);
    const tall = screenImage(10, 15, 30);
    expect(tall.sharp).toBe(true);
    expect(tall.height).toBeCloseTo(6, 12);
  });

  it('forms no image on the screen with the object inside the focal length', () => {
    expect(imageDistance(10, 10)).toBeNull();
    expect(screenImage(12, 8, 30)).toMatchObject({ formed: false, sharp: false });
  });

  it('averages the trials', () => {
    expect(mean([9.8, 10.2, 10])).toBeCloseTo(10, 12);
    expect(mean([])).toBe(0);
  });
});
