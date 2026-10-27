import { describe, expect, it } from 'vitest';
import {
  MAX_CHARGE,
  PAPER_BITS,
  bitsLifted,
  chargeSign,
  interaction,
  rodCharge,
} from './engine.js';

describe('charging by rubbing', () => {
  it('follows the book: glass with silk turns positive, plastic with wool negative', () => {
    expect(rodCharge('thuy-tinh', 'lua', 1)).toBe(2);
    expect(rodCharge('nhua', 'len', 1)).toBe(-2);
    expect(chargeSign(rodCharge('thuy-tinh', 'lua', 3))).toBe('duong');
    expect(chargeSign(rodCharge('nhua', 'len', 3))).toBe('am');
  });

  it('keeps the sign whichever cloth rubs the rod', () => {
    expect(rodCharge('nhua', 'lua', 2)).toBe(-4);
    expect(rodCharge('thuy-tinh', 'len', 2)).toBe(4);
  });

  it('starts neutral and stops growing at the model limit', () => {
    expect(rodCharge('nhua', 'len', 0)).toBe(0);
    expect(chargeSign(0)).toBe('trung-hoa');
    expect(rodCharge('nhua', 'len', 100)).toBe(-MAX_CHARGE);
  });

  it('lifts more paper the more the rod is charged', () => {
    expect(bitsLifted(0)).toBe(0);
    expect(bitsLifted(-2)).toBe(1);
    expect(bitsLifted(6)).toBe(3);
    expect(bitsLifted(-MAX_CHARGE)).toBe(PAPER_BITS);
  });

  it('repels like charges and attracts unlike ones', () => {
    expect(interaction(-4, -2)).toBe('day');
    expect(interaction(4, 6)).toBe('day');
    expect(interaction(-4, 4)).toBe('hut');
    expect(interaction(0, 4)).toBe('hut');
    expect(interaction(0, 0)).toBe('khong');
  });
});
