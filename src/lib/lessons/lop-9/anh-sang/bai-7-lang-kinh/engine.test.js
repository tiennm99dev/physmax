import { describe, expect, it } from 'vitest';
import { LIGHTS, SPECTRUM, bend, prismCorners, seenColour, traceThrough } from './engine.js';

const C = { x: 170, y: 160 };
const SIDE = 150;
const beam = { x: 0, y: C.y - 25 };
const right = { x: 1, y: 0 };

describe('prism ray tracing', () => {
  it('bends a ray by the refraction law and reflects past the critical angle', () => {
    const d = { x: Math.sin(30 * (Math.PI / 180)), y: Math.cos(30 * (Math.PI / 180)) };
    const b = bend(d, { x: 0, y: -1 }, 1, 1.5);
    expect(b.total).toBe(false);
    expect(Math.asin(b.dir.x) / (Math.PI / 180)).toBeCloseTo(19.4712, 3);
    const t = bend({ x: Math.sin(0.8), y: Math.cos(0.8) }, { x: 0, y: 1 }, 1.5, 1);
    expect(t.total).toBe(true);
  });

  it('gives the minimum deviation 2i − A at the symmetric passage', () => {
    // At rotation r the first face meets the beam at i = 30° + r.
    const i = Math.asin(1.5 * Math.sin(30 * (Math.PI / 180))) / (Math.PI / 180);
    const poly = prismCorners(C, SIDE, i - 30);
    const tr = traceThrough(poly, beam, right, 1.5, 380);
    expect(tr.entry).toBe(2);
    expect(tr.exit).toBe(0);
    expect(tr.deviation).toBeCloseTo(2 * i - 60, 6);
  });

  it('bends every colour toward the base, violet most and red least', () => {
    const bad = [];
    for (const rot of [5, 15, 25, 40]) {
      const poly = prismCorners(C, SIDE, rot);
      const devs = SPECTRUM.map((s) => traceThrough(poly, beam, right, s.n, 380));
      if (devs.some((t) => t.entry !== 2 || t.exit !== 0 || !t.out || t.out.y <= 0)) bad.push(rot);
      for (let k = 1; k < devs.length; k++) {
        if ((devs[k].deviation ?? 0) <= (devs[k - 1].deviation ?? 0)) bad.push(`${rot}:${k}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('colour of objects', () => {
  it('shows the colour scattered back, black when none is', () => {
    const white = ['do', 'luc', 'lam'];
    expect(seenColour(white, LIGHTS.trang.parts)).toBe('trang');
    expect(seenColour(white, LIGHTS.do.parts)).toBe('do');
    expect(seenColour(['do'], LIGHTS.trang.parts)).toBe('do');
    expect(seenColour(['do'], LIGHTS.lam.parts)).toBe('den');
    expect(seenColour(['luc'], LIGHTS.luc.parts)).toBe('luc');
    expect(seenColour([], LIGHTS.trang.parts)).toBe('den');
  });
});
