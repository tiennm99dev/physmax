import { describe, expect, it } from 'vitest';
import {
  equivalentResistance,
  flatNetwork,
  parallelResistance,
  seriesResistance,
  solveCircuit,
} from './circuit.js';
import { clean } from './vector.js';

describe('circuit engine', () => {
  it('adds series resistances and combines parallel ones', () => {
    expect(seriesResistance([10, 20, 30])).toBe(60);
    expect(parallelResistance([6, 3])).toBe(2);
    expect(parallelResistance([30, 30, 30])).toBe(10);
    expect(parallelResistance([10, 0])).toBe(0);
    expect(parallelResistance([])).toBe(Infinity);
    expect(parallelResistance([Infinity, 5])).toBe(5);
  });

  it('shares one current in series and splits voltage by resistance', () => {
    const s = solveCircuit(flatNetwork('series', [4, 8]), 12);
    expect(s.resistance).toBe(12);
    expect(s.current).toBe(1);
    expect(s.resistors.map((r) => r.current)).toEqual([1, 1]);
    expect(s.resistors.map((r) => r.voltage)).toEqual([4, 8]);
    expect(s.power).toBe(12);
  });

  it('shares one voltage in parallel and splits current inversely', () => {
    const p = solveCircuit(flatNetwork('parallel', [6, 3]), 6);
    expect(p.resistance).toBe(2);
    expect(p.current).toBe(3);
    expect(p.resistors.map((r) => [r.label, r.voltage, r.current])).toEqual([
      ['R1', 6, 1],
      ['R2', 6, 2],
    ]);
  });

  it('solves a mixed network: R1 in series with R2 ∥ R3', () => {
    const net = /** @type {import('./circuit.js').Network} */ ({
      type: 'series',
      items: [
        { type: 'resistor', r: 4, label: 'Đèn' },
        { type: 'parallel', items: flatNetwork('parallel', [12, 6]).items },
      ],
    });
    expect(equivalentResistance(net)).toBe(8);
    const s = solveCircuit(net, 16);
    expect(s.current).toBe(2);
    expect(s.resistors).toEqual([
      { label: 'Đèn', r: 4, current: 2, voltage: 8, power: 16 },
      { label: 'R2', r: 12, current: clean(8 / 12), voltage: 8, power: clean((8 * 8) / 12) },
      { label: 'R3', r: 6, current: clean(8 / 6), voltage: 8, power: clean((8 * 8) / 6) },
    ]);
    const kirchhoff = s.resistors[1].current + s.resistors[2].current;
    expect(kirchhoff).toBeCloseTo(s.current, 9);
  });

  it('reports an open circuit: no current, the whole voltage across the gap', () => {
    const s = solveCircuit(flatNetwork('series', [10, Infinity]), 9);
    expect(s.open).toBe(true);
    expect(s.current).toBe(0);
    expect(s.resistors.map((r) => r.voltage)).toEqual([0, 9]);
  });

  it('reports a short circuit', () => {
    const s = solveCircuit(flatNetwork('parallel', [10, 0]), 9);
    expect(s.short).toBe(true);
    expect(s.current).toBe(Infinity);
    expect(s.resistors[0].current).toBe(0);
  });
});
