import { describe, expect, it } from 'vitest';
import {
  CHALLENGES,
  S_MAX,
  START,
  checkChallenge,
  describe as describeStages,
  distanceAt,
  moveCorner,
  stageSpeeds,
} from './engine.js';

describe('reading the graph', () => {
  it('gives the speed of each stage', () => {
    expect(stageSpeeds(START)).toEqual([60, 60, 60, 0]);
  });

  it('reads the distance between corners', () => {
    expect(distanceAt(START, 1.5)).toBe(90);
    expect(distanceAt(START, 3.5)).toBe(180);
    expect(distanceAt(START, 0)).toBe(0);
    expect(distanceAt(START, 9)).toBe(180);
  });

  it('describes moving and standing stages', () => {
    const d = describeStages(START);
    expect(d[0]).toContain('60 km/h');
    expect(d[3]).toContain('đứng yên');
  });
});

describe('dragging a corner', () => {
  it('changes only that stage and keeps later speeds', () => {
    const s = moveCorner(START, 1, 80);
    expect(s).toEqual([0, 80, 140, 200, 200]);
    expect(stageSpeeds(s).slice(1)).toEqual([60, 60, 0]);
  });

  it('snaps to 10 km and never lets distance go down', () => {
    expect(moveCorner(START, 2, 123)).toEqual([0, 60, 120, 180, 180]);
    expect(moveCorner(START, 2, 10)).toEqual([0, 60, 60, 120, 120]);
  });

  it('keeps the last corner on the axis', () => {
    const s = moveCorner(START, 1, 400);
    expect(s[4]).toBe(S_MAX);
  });
});

describe('challenges', () => {
  it('every answer fits on the axis and is accepted', () => {
    for (const c of CHALLENGES) {
      expect(Math.max(...c.answer)).toBeLessThanOrEqual(S_MAX);
      expect(checkChallenge(c.answer, c).ok).toBe(true);
    }
  });

  it('points at the first wrong stage', () => {
    expect(checkChallenge(START, CHALLENGES[1])).toEqual({ ok: false, wrong: 0 });
    expect(checkChallenge(START, CHALLENGES[0]).ok).toBe(true);
  });

  it('the third challenge has a first-hour speed twice the later one', () => {
    const v = stageSpeeds(CHALLENGES[2].answer);
    expect(v).toEqual([60, 30, 30, 30]);
  });
});
