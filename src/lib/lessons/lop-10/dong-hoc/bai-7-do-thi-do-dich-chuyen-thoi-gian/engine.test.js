import { describe, expect, it } from 'vitest';
import {
  TARGETS,
  meanError,
  motionWord,
  segmentInfo,
  slopeAt,
  valueAt,
  verdict,
} from './engine.js';

const GRAPH = [
  { t: 0, d: 1 },
  { t: 3, d: 7 },
  { t: 5, d: 7 },
  { t: 8, d: 1 },
];

describe('reading a graph', () => {
  it('interpolates between points and stays flat past the ends', () => {
    expect(valueAt(GRAPH, 1.5)).toBe(4);
    expect(valueAt(GRAPH, 4)).toBe(7);
    expect(valueAt(GRAPH, 6.5)).toBe(4);
    expect(valueAt(GRAPH, -1)).toBe(1);
    expect(valueAt(GRAPH, 99)).toBe(1);
    expect(valueAt([], 2)).toBe(0);
  });

  it('reads the velocity from the slope', () => {
    expect(slopeAt(GRAPH, 1)).toBe(2);
    expect(slopeAt(GRAPH, 4)).toBe(0);
    expect(slopeAt(GRAPH, 6.5)).toBe(-2);
    expect(slopeAt(GRAPH, 0)).toBe(2);
    expect(slopeAt([{ t: 0, d: 0 }], 0)).toBe(0);
  });

  it('describes a segment the way the worked example does', () => {
    expect(segmentInfo(GRAPH[0], GRAPH[1])).toMatchObject({ dt: 3, dd: 6, v: 2 });
    expect(segmentInfo(GRAPH[1], GRAPH[2]).word).toBe('đứng yên');
    expect(segmentInfo(GRAPH[2], GRAPH[3]).v).toBe(-2);
    expect(segmentInfo(GRAPH[2], GRAPH[3]).word).toContain('ngược');
  });

  it('names the direction from the sign of the velocity', () => {
    expect(motionWord(0.1)).toBe('đứng yên');
    expect(motionWord(2)).toBe('chuyển động theo chiều dương');
    expect(motionWord(-2)).toBe('chuyển động ngược chiều dương');
  });
});

describe('copying a target', () => {
  it('gives zero error on an exact copy', () => {
    const target = TARGETS[2].points;
    const samples = target.map((p) => ({ ...p }));
    expect(meanError(samples, target)).toBe(0);
    expect(verdict(0).tone).toBe('ok');
  });

  it('flags a line that misses the target', () => {
    const target = TARGETS[1].points;
    const samples = [
      { t: 0, d: 10 },
      { t: 12, d: 10 },
    ];
    expect(meanError(samples, target)).toBe(12);
    expect(verdict(12).tone).toBe('warn');
  });

  it('has no error to score on free drawing', () => {
    expect(meanError([{ t: 0, d: 3 }], TARGETS[0].points)).toBe(0);
  });
});
