import { describe, expect, it } from 'vitest';
import {
  AT_REST,
  TOP_SPEED,
  accelerationOf,
  effectivePull,
  frictionOf,
  limitsOf,
  settle,
  stepBlock,
  tracePoints,
} from './engine.js';

const WOOD = limitsOf('go', 5);

describe('friction limits', () => {
  it('follows N = mg and F = μN', () => {
    expect(WOOD.normal).toBe(49);
    expect(WOOD.sliding).toBe(14.7);
    expect(WOOD.maxRest).toBe(19.6);
  });

  it('scales with the mass', () => {
    expect(limitsOf('go', 10).sliding).toBe(29.4);
  });
});

describe('a pulled block', () => {
  it('keeps still while static friction matches the pull', () => {
    const block = settle(AT_REST, 12, WOOD);
    expect(block.moving).toBe(false);
    expect(frictionOf(block, 12, WOOD)).toBe(12);
    expect(accelerationOf(block, 12, 5, WOOD)).toBe(0);
  });

  it('stays at rest exactly at the greatest static friction', () => {
    expect(settle(AT_REST, WOOD.maxRest, WOOD).moving).toBe(false);
  });

  it('slides past the limit, and friction falls to the sliding value', () => {
    const block = settle(AT_REST, 20, WOOD);
    expect(block.moving).toBe(true);
    expect(frictionOf(block, 20, WOOD)).toBe(14.7);
    expect(accelerationOf(block, 20, 5, WOOD)).toBeCloseTo(1.06, 9);
  });

  it('moves steadily when the pull equals sliding friction', () => {
    const block = { moving: true, v: 1, x: 0 };
    const next = stepBlock(block, WOOD.sliding, 5, WOOD, 0.1);
    expect(next.v).toBe(1);
    expect(accelerationOf(block, WOOD.sliding, 5, WOOD)).toBe(0);
  });

  it('counts a pull within half a notch of sliding friction as balanced', () => {
    const block = { moving: true, v: 1, x: 0 };
    expect(effectivePull(block, 15, WOOD, 1)).toBe(14.7);
    expect(effectivePull(block, 16, WOOD, 1)).toBe(16);
    expect(effectivePull(AT_REST, 15, WOOD, 1)).toBe(15);
  });

  it('stops when the pull falls short, then holds on static friction', () => {
    let block = { moving: true, v: 0.05, x: 0 };
    for (let i = 0; i < 20 && block.moving; i += 1) block = stepBlock(block, 5, 5, WOOD, 0.1);
    expect(block.moving).toBe(false);
    expect(block.v).toBe(0);
    expect(frictionOf(block, 5, WOOD)).toBe(5);
  });

  it('never runs past the fastest speed the picture shows', () => {
    const next = stepBlock({ moving: true, v: TOP_SPEED, x: 0 }, 50, 5, WOOD, 0.1);
    expect(next.v).toBe(TOP_SPEED);
  });
});

describe('the graph line', () => {
  it('climbs to the limit and drops when the slider jumps past it', () => {
    const block = settle(AT_REST, 25, WOOD);
    expect(tracePoints(false, block, 25, WOOD)).toEqual([
      { x: 19.6, y: 19.6 },
      { x: 19.6, y: 14.7 },
      { x: 25, y: 14.7 },
    ]);
  });

  it('adds one point otherwise', () => {
    expect(tracePoints(false, AT_REST, 10, WOOD)).toEqual([{ x: 10, y: 10 }]);
    expect(tracePoints(true, { moving: true, v: 1, x: 0 }, 30, WOOD)).toEqual([{ x: 30, y: 14.7 }]);
  });
});
