import { describe, expect, it } from 'vitest';
import { MATERIALS, circuitState, loopPoint, material } from './engine.js';

describe('the conductor test circuit', () => {
  it('sorts metals and graphite as conductors, the rest as insulators', () => {
    const conductors = MATERIALS.filter((m) => m.conducts).map((m) => m.id);
    expect(conductors).toEqual(['dong', 'nhom', 'sat', 'than-chi']);
    expect(material('nhua')?.conducts).toBe(false);
    expect(material('khong-co')).toBeUndefined();
  });

  it('needs a source, a closed switch and a conducting sample', () => {
    expect(circuitState({ source: true, closed: true, sample: 'dong' })).toEqual({
      flowing: true,
      reason: 'co-dong-dien',
    });
    expect(circuitState({ source: false, closed: true, sample: 'dong' }).reason).toBe(
      'khong-nguon',
    );
    expect(circuitState({ source: true, closed: false, sample: 'dong' }).reason).toBe(
      'cong-tac-mo',
    );
    expect(circuitState({ source: true, closed: true, sample: null }).reason).toBe('ho');
    expect(circuitState({ source: true, closed: true, sample: 'cao-su' }).reason).toBe('cach-dien');
  });

  it('walks the loop from the negative terminal', () => {
    const box = { left: 0, right: 30, top: 0, bottom: 20 };
    /** @param {number} t @param {number} x @param {number} y */
    const at = (t, x, y) => {
      const p = loopPoint(t, box);
      expect(p.x).toBeCloseTo(x, 9);
      expect(p.y).toBeCloseTo(y, 9);
    };
    at(0, 0, 20);
    at(0.3, 30, 20);
    at(0.5, 30, 0);
    at(0.9, 0, 10);
    at(1.3, 30, 20);
    at(-0.1, 0, 10);
  });
});
