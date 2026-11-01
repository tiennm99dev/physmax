import { describe, expect, it } from 'vitest';
import {
  APPLIANCES,
  J_PER_KWH,
  METER_START,
  energyJ,
  energyKWh,
  meterDigits,
  monthlyBill,
  ratedCurrent,
} from './engine.js';

describe('electrical energy and power', () => {
  it('computes W = UIt in joules', () => {
    expect(energyJ(220, 5, 600)).toBe(660000);
    expect(energyJ(12, 2, 300)).toBe(7200);
  });

  it('computes W = Pt in kWh and converts to joules', () => {
    expect(energyKWh(60, 5)).toBe(0.3);
    expect(energyKWh(1000, 0.5)).toBe(0.5);
    expect(energyKWh(1000, 1) * J_PER_KWH).toBe(3600000);
  });

  it('gives the rated current I = P/U', () => {
    expect(ratedCurrent(1100, 220)).toBe(5);
    expect(ratedCurrent(100, 220)).toBeCloseTo(0.4545, 4);
  });
});

describe('monthly bill', () => {
  it('adds up the appliances over 30 days', () => {
    const bill = monthlyBill(
      [
        { name: 'Đèn', power: 40, hours: 6 },
        { name: 'Quạt', power: 75, hours: 8 },
        { name: 'Ti vi', power: 100, hours: 4 },
      ],
      2000,
    );
    expect(bill.rows.map((r) => r.day)).toEqual([0.24, 0.6, 0.4]);
    expect(bill.total).toBe(37.2);
    expect(bill.cost).toBe(74400);
    expect(bill.meterEnd).toBe(METER_START + 37.2);
    expect(bill.top?.name).toBe('Quạt');
  });

  it('has no top consumer when nothing runs', () => {
    const bill = monthlyBill([{ name: 'Đèn', power: 40, hours: 0 }], 2000);
    expect(bill.total).toBe(0);
    expect(bill.top).toBe(null);
  });

  it('keeps every bench appliance at a sensible default', () => {
    const bad = APPLIANCES.filter((a) => a.power <= 0 || a.half < 0 || a.half > 48);
    expect(bad).toEqual([]);
  });
});

describe('meter digits', () => {
  it('pads the whole kWh to five wheels and keeps the tenths apart', () => {
    expect(meterDigits(1282.2)).toEqual({ whole: ['0', '1', '2', '8', '2'], tenths: 2 });
    expect(meterDigits(1245)).toEqual({ whole: ['0', '1', '2', '4', '5'], tenths: 0 });
    expect(meterDigits(0.7)).toEqual({ whole: ['0', '0', '0', '0', '0'], tenths: 7 });
  });
});
