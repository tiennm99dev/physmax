import { describe, expect, it } from 'vitest';
import { arrowHead, shaftEnd } from './arrow.js';

describe('arrow geometry', () => {
  it('puts the head tip at the arrow tip, centred on the shaft', () => {
    expect(arrowHead(0, 0, 100, 0, 10)).toBe('100,0 90,5 90,-5');
    expect(arrowHead(0, 0, 0, 50, 10)).toBe('0,50 -5,40 5,40');
  });

  it('draws no head for a zero-length arrow and shrinks it for a short one', () => {
    expect(arrowHead(3, 3, 3, 3)).toBe('');
    expect(arrowHead(0, 0, 4, 0, 10)).toBe('4,0 0,2 0,-2');
  });

  it('stops the shaft inside the head', () => {
    expect(shaftEnd(0, 0, 100, 0, 10)).toEqual({ x: 92, y: 0 });
    expect(shaftEnd(5, 5, 5, 5)).toEqual({ x: 5, y: 5 });
  });
});
