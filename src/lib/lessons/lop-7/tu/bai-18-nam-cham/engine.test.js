import { describe, expect, it } from 'vitest';
import {
  REACH,
  bearingOf,
  directionName,
  interaction,
  isAligned,
  norm,
  rightPole,
  screenAngle,
  settle,
  strength,
} from './engine.js';

describe('two bar magnets', () => {
  it('makes like poles repel and unlike poles attract', () => {
    expect(interaction('N', 'N')).toBe('day');
    expect(interaction('S', 'S')).toBe('day');
    expect(interaction('N', 'S')).toBe('hut');
    expect(interaction('S', 'N')).toBe('hut');
  });

  it('gives every magnet two different poles', () => {
    expect(rightPole('N')).toBe('S');
    expect(rightPole('S')).toBe('N');
  });

  it('weakens the force as the gap grows', () => {
    expect(strength(0)).toBe(1);
    expect(strength(10)).toBeGreaterThan(strength(40));
    expect(strength(200)).toBeLessThan(0.02);
  });

  it('pulls unlike poles into contact and pushes like poles apart when close', () => {
    expect(settle(30, 'hut')).toBe(0);
    expect(settle(30, 'day')).toBeGreaterThan(REACH);
    expect(settle(REACH + 40, 'hut')).toBe(REACH + 40);
  });
});

describe('compass', () => {
  it('names the eight directions clockwise from North', () => {
    expect(directionName(0)).toBe('Bắc');
    expect(directionName(90)).toBe('Đông');
    expect(directionName(135)).toBe('Đông Nam');
    expect(directionName(270)).toBe('Tây');
    expect(directionName(-45)).toBe('Tây Bắc');
    expect(directionName(350)).toBe('Bắc');
  });

  it('measures bearings from geographic North, not from the top of the screen', () => {
    expect(bearingOf(120, 30)).toBe(90);
    expect(bearingOf(10, 300)).toBe(70);
    expect(norm(-90)).toBe(270);
  });

  it('checks that the dial N mark sits under the red needle end', () => {
    expect(isAligned(32, 30)).toBe(true);
    expect(isAligned(358, 2)).toBe(true);
    expect(isAligned(60, 30)).toBe(false);
  });

  it('reads the screen angle of a point around the centre', () => {
    const c = { x: 100, y: 100 };
    expect(screenAngle(c, { x: 100, y: 50 })).toBe(0);
    expect(screenAngle(c, { x: 150, y: 100 })).toBe(90);
    expect(screenAngle(c, { x: 50, y: 100 })).toBe(270);
    expect(screenAngle(c, { x: 130, y: 60 }, 5)).toBe(35);
  });
});
