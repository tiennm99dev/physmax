import { describe, expect, it } from 'vitest';
import { evaluateLoop, workingParts } from './engine.js';

/** @typedef {import('./engine.js').Slot} Slot */

const pin = /** @type {Slot} */ ({ kind: 'pin' });
const pinBack = /** @type {Slot} */ ({ kind: 'pin', flipped: true });
const on = /** @type {Slot} */ ({ kind: 'cong-tac', closed: true });
const offSwitch = /** @type {Slot} */ ({ kind: 'cong-tac', closed: false });
const lamp = /** @type {Slot} */ ({ kind: 'den' });
const wire = /** @type {Slot} */ ({ kind: 'day' });
const led = /** @type {Slot} */ ({ kind: 'led' });
const ledBack = /** @type {Slot} */ ({ kind: 'led', flipped: true });

describe('a one-loop circuit', () => {
  it('lights the lamp in a closed loop with a source and a closed switch', () => {
    expect(evaluateLoop([pin, on, lamp, wire])).toEqual({
      flowing: true,
      reason: 'kin',
      clockwise: true,
    });
    expect(workingParts([pin, on, lamp, wire])).toEqual([2]);
  });

  it('sends the current the other way when the pin is turned round', () => {
    expect(evaluateLoop([pinBack, on, lamp, wire]).clockwise).toBe(false);
  });

  it('reports what keeps the current from flowing', () => {
    expect(evaluateLoop([wire, on, lamp, wire]).reason).toBe('khong-nguon');
    expect(evaluateLoop([pin, on, lamp, null]).reason).toBe('ho');
    expect(evaluateLoop([pin, offSwitch, lamp, wire]).reason).toBe('cong-tac-mo');
    expect(evaluateLoop([pin, pinBack, lamp, wire]).reason).toBe('pin-nguoc');
    expect(workingParts([pin, offSwitch, lamp, wire])).toEqual([]);
  });

  it('flags a short circuit when nothing uses the energy', () => {
    expect(evaluateLoop([pin, on, wire, wire])).toMatchObject({
      flowing: true,
      reason: 'doan-mach',
    });
    expect(workingParts([pin, on, wire, wire])).toEqual([]);
  });

  it('lets an LED pass current one way only', () => {
    expect(evaluateLoop([pin, on, led, wire]).reason).toBe('kin');
    expect(evaluateLoop([pin, on, ledBack, wire]).reason).toBe('led-nguoc');
    expect(evaluateLoop([pinBack, on, ledBack, wire]).reason).toBe('kin');
    expect(workingParts([pin, lamp, led, { kind: 'chuong' }])).toEqual([1, 2, 3]);
  });
});
