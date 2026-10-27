import { describe, expect, it } from 'vitest';
import {
  DEVICES,
  EFFECTS,
  FUSE_RATING,
  checkEffects,
  fuseLine,
  ledLights,
  platedElectrode,
  warmUp,
} from './engine.js';

describe('effects of an electric current', () => {
  it('names one or more known effects for every device', () => {
    for (const d of DEVICES) {
      expect(d.effects.length).toBeGreaterThan(0);
      for (const e of d.effects) expect(EFFECTS[e]).toBeTruthy();
    }
  });

  it('checks the picked effects exactly', () => {
    expect(checkEffects('den-soi-dot', ['phat-sang', 'nhiet'])).toEqual({
      correct: true,
      missing: [],
      extra: [],
    });
    expect(checkEffects('den-soi-dot', ['phat-sang'])).toEqual({
      correct: false,
      missing: ['nhiet'],
      extra: [],
    });
    expect(checkEffects('chuong', ['tu', 'nhiet']).extra).toEqual(['nhiet']);
    expect(checkEffects('ma-dien', ['hoa-hoc']).correct).toBe(true);
  });

  it('warms a heater from room temperature towards its target', () => {
    expect(warmUp(0, 100)).toBe(25);
    expect(warmUp(4, 100)).toBe(72);
    expect(warmUp(60, 100)).toBe(100);
    expect(warmUp(2, 200)).toBeGreaterThan(warmUp(1, 200));
  });

  it('plates copper on the electrode joined to the negative terminal', () => {
    expect(platedElectrode(true)).toBe('trai');
    expect(platedElectrode(false)).toBe('phai');
  });

  it('lights an LED only the right way round', () => {
    expect(ledLights(true)).toBe(true);
    expect(ledLights(false)).toBe(false);
  });

  it('melts the fuse when the line current passes its rating', () => {
    expect(fuseLine(2)).toEqual({ current: 8, melts: false });
    expect(fuseLine(3)).toEqual({ current: 12, melts: true });
    expect(fuseLine(0).current).toBeLessThanOrEqual(FUSE_RATING);
  });
});
