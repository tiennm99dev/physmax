import { describe, expect, it } from 'vitest';
import { RANGE, SURFACES, friction, limits, motionKind, snapPull, step } from './engine.js';

const rest = { moving: false, v: 0 };

describe('block pulled across surfaces', () => {
  it('gives each surface its friction, larger on rougher surfaces and with a load', () => {
    expect(limits('kinh', false)).toMatchObject({ weight: 5, maxStatic: 1.25, sliding: 1 });
    expect(limits('go', false)).toMatchObject({ maxStatic: 2, sliding: 1.5 });
    expect(limits('nham', false)).toMatchObject({ maxStatic: 4, sliding: 3 });
    expect(limits('banh-xe', false)).toMatchObject({ maxStatic: 0.2, sliding: 0.15 });
    expect(limits('go', true)).toMatchObject({ weight: 10, sliding: 3 });
  });

  it('keeps every friction value reachable on the balance', () => {
    for (const s of SURFACES) {
      for (const loaded of [false, true]) {
        const lim = limits(s.id, loaded);
        expect(snapPull(lim.sliding), s.id).toBe(lim.sliding);
        expect(lim.maxStatic, s.id).toBeLessThan(RANGE);
        expect(lim.sliding, s.id).toBeLessThan(lim.maxStatic);
      }
    }
  });

  it('holds the block with static friction equal to the pull', () => {
    const lim = limits('go', false);
    expect(step(rest, 1.8, lim, 0.1)).toEqual(rest);
    expect(friction(rest, 1.8, lim)).toBe(1.8);
    expect(motionKind(rest, 2, lim)).toBe('dung-yen');
  });

  it('starts sliding past the largest static friction, then feels sliding friction', () => {
    const lim = limits('go', false);
    expect(motionKind(rest, 2.05, lim)).toBe('bat-dau');
    const moving = step(rest, 2.05, lim, 0.1);
    expect(moving.moving).toBe(true);
    expect(friction(moving, 2.05, lim)).toBe(1.5);
    const faster = step(moving, 2.05, lim, 0.1);
    expect(faster.v).toBeCloseTo(0.11);
    expect(motionKind(faster, 2.05, lim)).toBe('nhanh-dan');
  });

  it('moves steadily when the pull equals sliding friction and stops when it is smaller', () => {
    const lim = limits('go', false);
    const m = { moving: true, v: 0.3 };
    expect(motionKind(m, 1.5, lim)).toBe('deu');
    expect(step(m, 1.5, lim, 0.5).v).toBe(0.3);
    expect(motionKind(m, 1, lim)).toBe('cham-dan');
    const stopped = step(m, 1, lim, 1);
    expect(stopped).toEqual(rest);
  });

  it('snaps pulls to the balance steps', () => {
    expect(snapPull(1.52)).toBe(1.5);
    expect(snapPull(0.149)).toBe(0.15);
    expect(snapPull(12)).toBe(RANGE);
    expect(snapPull(-1)).toBe(0);
  });
});
