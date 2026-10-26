import { describe, expect, it } from 'vitest';
import {
  DEVICES,
  bestTip,
  cost,
  deviceDay,
  houseUsage,
  kWh,
  thriftySettings,
  wastefulSettings,
} from './engine.js';

/** @param {string} id */
const device = (id) => {
  const d = DEVICES.find((x) => x.id === id);
  if (!d) throw new Error(id);
  return d;
};

describe('electrical energy and cost', () => {
  it('turns watts and hours into kilowatt-hours', () => {
    expect(kWh(1000, 1)).toBe(1);
    expect(kWh(60, 5)).toBe(0.3);
    expect(kWh(2500, 0.5)).toBe(1.25);
  });

  it('prices energy at 2 000 đồng per kWh', () => {
    expect(cost(9)).toBe(18000);
    expect(cost(2.25)).toBe(4500);
  });
});

describe('one appliance', () => {
  it('runs extra hours and draws standby power under wasteful habits', () => {
    const tv = deviceDay(device('tivi'), wastefulSettings());
    expect(tv.hours).toBe(8);
    expect(tv.run).toBe(0.8);
    expect(tv.standby).toBe(0.032);
    expect(tv.total).toBe(0.832);
  });

  it('uses only the needed hours with LED bulbs when thrifty', () => {
    const lamp = deviceDay(device('den-khach'), thriftySettings());
    expect(lamp).toEqual({ hours: 5, run: 0.075, standby: 0, total: 0.075 });
  });
});

describe('the whole home', () => {
  it('adds up a wasteful month', () => {
    const r = houseUsage(wastefulSettings());
    expect(r.day).toBe(16.02);
    expect(r.month).toBe(480.6);
    expect(r.bill).toBe(961200);
  });

  it('adds up a thrifty month', () => {
    const r = houseUsage(thriftySettings());
    expect(r.day).toBe(7.2);
    expect(r.month).toBe(216);
    expect(r.bill).toBe(432000);
  });

  it('points first at the biggest saving and stops when nothing is left', () => {
    const tip = bestTip(wastefulSettings());
    // Water heater: 2 500 W × 1,5 h × 30 days = 112,5 kWh.
    expect(tip?.text).toContain('bình nóng lạnh');
    expect(tip?.savedMonth).toBe(112.5);
    // Switching the air conditioner off adds 3 W of standby for those 3 h.
    const offAc = { ...wastefulSettings(), offWhenIdle: { 'binh-nong': true } };
    expect(bestTip(offAc)?.text).toContain('điều hoà');
    expect(bestTip(offAc)?.savedMonth).toBe(89.73);
    expect(bestTip(thriftySettings())).toBeNull();
  });
});
