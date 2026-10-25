import { describe, expect, it } from 'vitest';
import { VISIBLE_SQUASH, applyForce, classify, squash } from './engine.js';

const rest = { x: 0, y: 0 };
const rolling = { x: 2, y: 0 };

/** @param {{ x: number, y: number }} u @param {number} angle @param {number} s */
const change = (u, angle, s) => classify(u, applyForce(u, angle, s));

describe('push-and-pull playground', () => {
  it('leaves the motion unchanged without a force', () => {
    expect(change(rest, 0, 0)).toBe('dung-yen');
    expect(change(rolling, 90, 0)).toBe('khong-doi');
  });

  it('starts a resting ball in the direction of the force', () => {
    expect(change(rest, 0, 1)).toBe('bat-dau');
    expect(applyForce(rest, 90, 2)).toEqual({ x: 0, y: 2 });
  });

  it('speeds up, slows down, stops or bounces back a rolling ball', () => {
    expect(change(rolling, 0, 1)).toBe('nhanh-len');
    expect(change(rolling, 180, 1)).toBe('cham-lai');
    expect(change(rolling, 180, 2)).toBe('dung-lai');
    expect(change(rolling, 180, 3)).toBe('bat-nguoc');
    expect(applyForce(rolling, 180, 3)).toEqual({ x: -1, y: 0 });
  });

  it('turns a rolling ball when the force is not along its path', () => {
    expect(change(rolling, 90, 1)).toBe('doi-huong');
    expect(change(rolling, 45, 3)).toBe('doi-huong');
    expect(change(rolling, 225, 2)).toBe('doi-huong');
  });

  it('dents the rubber ball visibly but not the steel ball', () => {
    expect(squash('bong', 1)).toBeGreaterThan(VISIBLE_SQUASH);
    expect(squash('bong', 3)).toBeCloseTo(0.36);
    expect(squash('bi', 3)).toBeLessThan(VISIBLE_SQUASH);
    expect(squash('bong', 0)).toBe(0);
  });
});
