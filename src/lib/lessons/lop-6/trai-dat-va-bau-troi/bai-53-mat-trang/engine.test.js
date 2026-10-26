import { describe, expect, it } from 'vitest';
import {
  ageDays,
  isWaxing,
  litFraction,
  litPath,
  lunarDay,
  phaseAfter,
  phaseCentre,
  phaseFromPosition,
  phaseName,
  phaseOf,
  positionFromPhase,
} from './engine.js';

describe('the Moon around the Earth', () => {
  it('is new between the Earth and the Sun and full on the far side', () => {
    expect(phaseFromPosition(180)).toBe(0);
    expect(phaseFromPosition(0)).toBe(180);
    expect(phaseFromPosition(270)).toBe(90);
    expect(positionFromPhase(90)).toBe(270);
  });

  it('counts the age and the lunar day', () => {
    expect(ageDays(180)).toBe(14.75);
    expect(ageDays(90)).toBe(7.375);
    expect(lunarDay(0)).toBe(1);
    expect(lunarDay(180)).toBe(15);
    expect(lunarDay(359.9)).toBe(30);
    expect(phaseAfter(29.5)).toBe(0);
    expect(phaseAfter(14.75)).toBe(180);
  });

  it('lights a growing then shrinking part of the disc', () => {
    expect(litFraction(0)).toBe(0);
    expect(litFraction(90)).toBe(0.5);
    expect(litFraction(180)).toBe(1);
    expect(litFraction(270)).toBe(0.5);
    expect(isWaxing(45)).toBe(true);
    expect(isWaxing(200)).toBe(false);
    expect(isWaxing(0)).toBe(false);
  });
});

describe('phase names', () => {
  it('follows the order of the lunar month', () => {
    const ids = [0, 45, 90, 135, 180, 225, 270, 315, 355].map((p) => phaseOf(p).id);
    expect(ids).toEqual([
      'khong-trang',
      'luoi-liem-dau',
      'ban-nguyet-dau',
      'khuyet-dau',
      'tron',
      'khuyet-cuoi',
      'ban-nguyet-cuoi',
      'luoi-liem-cuoi',
      'khong-trang',
    ]);
  });

  it('names a phase and finds its middle', () => {
    expect(phaseName('tron')).toBe('Trăng tròn');
    expect(phaseName('khong-trang')).toBe('Không trăng');
    expect(phaseOf(phaseCentre('khuyet-cuoi')).id).toBe('khuyet-cuoi');
  });
});

describe('drawing the lit part', () => {
  it('draws nothing at new moon and a whole disc at full moon', () => {
    expect(litPath(50, 50, 40, 0)).toBe('');
    expect(litPath(50, 50, 40, 180)).toContain('A 40 40 0 1 1');
  });

  it('lights the right half at first quarter and the left half at last quarter', () => {
    // Right semicircle (sweep 1 from top to bottom) and a flat terminator.
    expect(litPath(50, 50, 40, 90)).toBe('M 50 10 A 40 40 0 0 1 50 90 A 0 40 0 0 1 50 10 Z');
    expect(litPath(50, 50, 40, 270)).toBe('M 50 10 A 40 40 0 0 0 50 90 A 0 40 0 0 0 50 10 Z');
  });

  it('bulges the terminator towards the lit side for a crescent', () => {
    expect(litPath(50, 50, 40, 60)).toBe('M 50 10 A 40 40 0 0 1 50 90 A 20 40 0 0 0 50 10 Z');
    expect(litPath(50, 50, 40, 300)).toBe('M 50 10 A 40 40 0 0 0 50 90 A 20 40 0 0 1 50 10 Z');
  });
});
