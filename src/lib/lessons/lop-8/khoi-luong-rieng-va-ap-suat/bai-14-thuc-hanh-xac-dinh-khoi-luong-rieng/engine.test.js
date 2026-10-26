import { describe, expect, it } from 'vitest';
import { material } from '../_shared/materials.js';
import {
  CYLINDER,
  D_TOLERANCE,
  OBJECTS,
  checkField,
  densityFrom,
  labObject,
  levelAfter,
  readTyped,
} from './engine.js';

/** @type {Record<string, string>} */
const MATERIAL_ID = { đá: 'da', sắt: 'sat', nhôm: 'nhom', chì: 'chi' };

describe('measuring the density of a sinking object', () => {
  it('keeps every reading on a division of the cylinder and inside its range', () => {
    for (const o of OBJECTS) {
      expect(o.start % CYLINDER.step).toBe(0);
      expect(o.volume % CYLINDER.step).toBe(0);
      expect(levelAfter(o)).toBeLessThanOrEqual(CYLINDER.max);
    }
  });

  it('gives each object the density of its material', () => {
    for (const o of OBJECTS) {
      const d = densityFrom(o.mass, o.start, levelAfter(o));
      expect(d).not.toBeNull();
      expect((d ?? 0) * 1000).toBeCloseTo(material(MATERIAL_ID[o.material]).density, 6);
    }
    expect(densityFrom(62.4, 40, 48)).toBe(7.8);
    expect(densityFrom(10, 50, 50)).toBeNull();
  });

  it('reads typed numbers with a comma or a point', () => {
    expect(readTyped('7,8')).toBe(7.8);
    expect(readTyped(' 62.4 ')).toBe(62.4);
    expect(readTyped('abc')).toBeNull();
    expect(readTyped('')).toBeNull();
  });

  it('checks a field against the true value', () => {
    expect(checkField('', 50)).toBe('empty');
    expect(checkField('năm mươi', 50)).toBe('invalid');
    expect(checkField('50', 50)).toBe('ok');
    expect(checkField('52', 50)).toBe('wrong');
    expect(checkField('2,65', 2.6, D_TOLERANCE)).toBe('ok');
    expect(checkField('2,7', 2.6, D_TOLERANCE)).toBe('wrong');
    expect(labObject('khong-co').id).toBe(OBJECTS[0].id);
  });
});
