import { describe, expect, it } from 'vitest';
import {
  DEVICES,
  FLOW,
  WASTE_MAX,
  WASTE_MIN,
  bandPath,
  deviceOf,
  efficiency,
  flowBands,
  split,
  wasteFromSeam,
} from './engine.js';

describe('efficiency', () => {
  it('is useful over total, in percent', () => {
    expect(efficiency(75, 100)).toBe(75);
    expect(efficiency(150, 500)).toBe(30);
    expect(efficiency(3920, 5000)).toBe(78.4);
  });

  it('gives nothing for no supply', () => {
    expect(efficiency(0, 0)).toBe(0);
  });

  it('splits the supply with nothing left over', () => {
    const s = split(1000, 70);
    expect(s.useful).toBe(300);
    expect(s.waste).toBe(700);
    expect(s.efficiency).toBe(30);
    expect(s.useful + s.waste).toBe(1000);
  });

  it('names every device with a sensible typical value', () => {
    const bad = DEVICES.filter((d) => d.typical <= 0 || d.typical >= 100);
    expect(bad).toEqual([]);
    expect(deviceOf('quat').typical).toBe(80);
    expect(deviceOf('khac')).toBe(DEVICES[0]);
  });
});

describe('the flow drawing', () => {
  it('keeps the two outgoing bands as wide as the supply', () => {
    const f = flowBands(70);
    expect(f.usefulH + f.wasteH).toBeCloseTo(FLOW.band, 9);
    expect(f.usefulH).toBeCloseTo(FLOW.band * 0.3, 9);
    expect(f.seam).toBeCloseTo(FLOW.top + FLOW.band * 0.3, 9);
  });

  it('closes each band', () => {
    expect(bandPath(0, 0, 10, 20, 5, 15)).toBe(
      'M 0 0 C 10 0 10 5 20 5 L 20 15 C 10 15 10 10 0 10 Z',
    );
  });

  it('turns a dragged seam back into the percentage', () => {
    expect(wasteFromSeam(flowBands(70).seam)).toBe(70);
    expect(wasteFromSeam(flowBands(5).seam)).toBe(5);
    expect(wasteFromSeam(-100)).toBe(WASTE_MAX);
    expect(wasteFromSeam(900)).toBe(WASTE_MIN);
  });
});
