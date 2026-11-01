import { describe, expect, it } from 'vitest';
import { LIGHTS, seenColour } from './engine.js';

describe('colour of objects', () => {
  it('shows the colour scattered back, black when none is', () => {
    const white = ['do', 'luc', 'lam'];
    expect(seenColour(white, LIGHTS.trang.parts)).toBe('trang');
    expect(seenColour(white, LIGHTS.do.parts)).toBe('do');
    expect(seenColour(['do'], LIGHTS.trang.parts)).toBe('do');
    expect(seenColour(['do'], LIGHTS.lam.parts)).toBe('den');
    expect(seenColour(['luc'], LIGHTS.luc.parts)).toBe('luc');
    expect(seenColour([], LIGHTS.trang.parts)).toBe('den');
  });
});
