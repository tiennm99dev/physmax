import { describe, expect, it } from 'vitest';
import {
  AMMETER,
  COLUMNS,
  LAMPS,
  SOURCES,
  VOLTMETER,
  checkReading,
  divisionOf,
  expectedRow,
  lampById,
  lampCurrent,
  needleAngle,
  readBench,
  snapToDivision,
  solveCircuit,
  sourceById,
} from './engine.js';

describe('the practical bench for current and voltage', () => {
  it('passes the rated current at the rated voltage', () => {
    for (const lamp of LAMPS) expect(lampCurrent(lamp, lamp.ratedU)).toBeCloseTo(lamp.ratedI, 12);
    expect(lampCurrent(LAMPS[0], 0)).toBe(0);
  });

  it('solves the loop so the lamp lets exactly the loop current through', () => {
    for (const s of SOURCES)
      for (const l of LAMPS) {
        const c = solveCircuit(s, l);
        expect(lampCurrent(l, c.lampVoltage)).toBeCloseTo(c.current, 9);
        expect(c.lampVoltage).toBeCloseTo(s.emf - c.current * (s.ohms + AMMETER.ohms), 9);
      }
  });

  it('gives the table readings of the 6 V – 0,5 A lamp', () => {
    expect(expectedRow('1v5', 'd1')).toEqual({ uNguon: 1.5, i1: 0.22, i2: 0.22, uDen: 1.4 });
    expect(expectedRow('3v', 'd1')).toEqual({ uNguon: 3, i1: 0.32, i2: 0.32, uDen: 2.7 });
    expect(expectedRow('6v', 'd1')).toEqual({ uNguon: 6, i1: 0.46, i2: 0.46, uDen: 5.2 });
    expect(expectedRow('cu', 'd1')).toEqual({ uNguon: 1.3, i1: 0.19, i2: 0.19, uDen: 1 });
  });

  it('reads the same current at positions (1) and (2)', () => {
    for (const s of SOURCES)
      for (const l of LAMPS) {
        const at1 = readBench({
          sourceId: s.id,
          lampId: l.id,
          closed: true,
          ammeterAt: '1',
          voltmeterAt: 'den',
        });
        const at2 = readBench({
          sourceId: s.id,
          lampId: l.id,
          closed: true,
          ammeterAt: '2',
          voltmeterAt: 'den',
        });
        expect(at1.ammeter).toBe(at2.ammeter);
      }
  });

  it('shows a lamp voltage below the source voltage, growing with the source', () => {
    for (const l of LAMPS) {
      let last = 0;
      for (const id of ['1v5', '3v', '6v']) {
        const row = expectedRow(id, l.id);
        expect(row.uDen).toBeLessThan(row.uNguon);
        expect(row.i1).toBeGreaterThan(last);
        last = row.i1;
      }
    }
  });

  it('keeps every reading on the meter scales', () => {
    for (const s of SOURCES)
      for (const l of LAMPS) {
        const row = expectedRow(s.id, l.id);
        expect(row.i1).toBeLessThanOrEqual(AMMETER.range);
        expect(row.uNguon).toBeLessThanOrEqual(VOLTMETER.range);
      }
  });

  it('reads no current on an open circuit and the source voltage across the source', () => {
    expect(
      readBench({
        sourceId: '6v',
        lampId: 'd1',
        closed: false,
        ammeterAt: '1',
        voltmeterAt: 'nguon',
      }),
    ).toEqual({ ammeter: 0, voltmeter: 6, lampOn: false, glow: 0 });
    expect(
      readBench({ sourceId: 'cu', lampId: 'd1', closed: false, ammeterAt: '1', voltmeterAt: 'den' })
        .voltmeter,
    ).toBe(0);
  });

  it('shows an old cell below the voltage printed on it', () => {
    const old = sourceById('cu');
    expect(expectedRow('cu', 'd2').uNguon).toBeLessThan(old.nominal);
    expect(expectedRow('1v5', 'd2').uNguon).toBe(sourceById('1v5').nominal);
  });

  it('snaps to divisions and checks readings within one division', () => {
    expect(snapToDivision(0.4628, 0.01)).toBe(0.46);
    expect(snapToDivision(5.213, 0.1)).toBe(5.2);
    expect(checkReading(null, 0.46, 0.01)).toBe('trong');
    expect(checkReading(0.47, 0.46, 0.01)).toBe('dung');
    expect(checkReading(0.48, 0.46, 0.01)).toBe('sai');
    expect(checkReading(5.3, 5.2, 0.1)).toBe('dung');
    expect(divisionOf('i1')).toBe(0.01);
    expect(divisionOf('uDen')).toBe(0.1);
    expect(COLUMNS).toHaveLength(4);
  });

  it('maps readings to needle angles and falls back to the first entries', () => {
    expect(needleAngle(0, 6)).toBe(-60);
    expect(needleAngle(3, 6)).toBe(0);
    expect(needleAngle(0.6, 0.6)).toBe(60);
    expect(needleAngle(9, 6)).toBe(66);
    expect(sourceById('x')).toBe(SOURCES[0]);
    expect(lampById('x')).toBe(LAMPS[0]);
  });
});
