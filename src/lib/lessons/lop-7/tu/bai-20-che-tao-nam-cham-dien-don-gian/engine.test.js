import { describe, expect, it } from 'vitest';
import { MAX_CLIPS, clipsHeld, poles, strength } from './engine.js';

const base = { on: true, turns: 200, current: 1, core: true };

describe('electromagnet model', () => {
  it('has no magnetic field when the switch is open', () => {
    expect(strength({ ...base, on: false })).toBe(0);
    expect(clipsHeld({ ...base, on: false })).toBe(0);
    expect(poles(false, false)).toBeNull();
  });

  it('holds more clips with more turns or more current', () => {
    expect(clipsHeld({ ...base, turns: 300 })).toBeGreaterThan(clipsHeld(base));
    expect(clipsHeld({ ...base, current: 1.5 })).toBeGreaterThan(clipsHeld(base));
    expect(clipsHeld(base)).toBe(5);
  });

  it('is much weaker without a soft-iron core', () => {
    expect(strength(base)).toBe(10 * strength({ ...base, core: false }));
    expect(clipsHeld({ ...base, core: false })).toBe(0);
  });

  it('depends on turns times current', () => {
    expect(strength({ ...base, turns: 100, current: 2 })).toBe(strength(base));
  });

  it('never holds more clips than fit on the core', () => {
    expect(clipsHeld({ ...base, turns: 400, current: 3 })).toBe(MAX_CLIPS);
  });

  it('swaps its poles when the current is reversed', () => {
    expect(poles(true, false)).toEqual({ left: 'S', right: 'N' });
    expect(poles(true, true)).toEqual({ left: 'N', right: 'S' });
    expect(poles(true, false, 0)).toBeNull();
  });
});
