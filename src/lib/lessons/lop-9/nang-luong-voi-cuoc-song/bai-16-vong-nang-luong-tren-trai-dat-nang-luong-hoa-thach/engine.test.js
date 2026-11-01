import { describe, expect, it } from 'vitest';
import {
  CYCLES,
  NODE_H,
  NODE_W,
  SUN_ID,
  cycleOf,
  ringLayout,
  route,
  stageOf,
  walk,
} from './engine.js';

describe('energy cycles', () => {
  it('start every route at the Sun and keep stage ids unique', () => {
    const bad = CYCLES.filter((c) => {
      const steps = route(c);
      return steps[0] !== SUN_ID || new Set(steps).size !== steps.length;
    });
    expect(bad).toEqual([]);
  });

  it('describe the form, the store and the change of every stage', () => {
    const bad = CYCLES.flatMap((c) => c.stages)
      .filter((s) => !s.form || !s.store || !s.change || !s.clue || !s.lines.length)
      .map((s) => s.id);
    expect(bad).toEqual([]);
  });

  it('rejects an unknown cycle or stage', () => {
    expect(() => cycleOf('khong-co')).toThrow();
    expect(() => stageOf(CYCLES[0], 'khong-co')).toThrow();
  });

  it('leads from buried remains to fossil fuel among living things', () => {
    const steps = route(cycleOf('vat-song'));
    expect(steps.indexOf('hoa-thach')).toBe(steps.indexOf('xac') + 1);
    expect(steps.indexOf('thuc-vat')).toBe(1);
  });
});

describe('following the energy', () => {
  const cycle = cycleOf('nuoc');

  it('moves on only at the next stage', () => {
    expect(walk(cycle, 0, SUN_ID)).toMatchObject({ ok: true, done: 1, finished: false });
    expect(walk(cycle, 1, 'may')).toMatchObject({ ok: false, done: 1, finished: false });
    expect(walk(cycle, 1, 'may').clue).toBe(stageOf(cycle, 'bien').clue);
  });

  it('finishes after the last stage and stays finished', () => {
    const steps = route(cycle);
    let done = 0;
    for (const id of steps) done = walk(cycle, done, id).done;
    expect(done).toBe(steps.length);
    expect(walk(cycle, done - 1, steps[steps.length - 1]).finished).toBe(true);
    expect(walk(cycle, done, SUN_ID)).toMatchObject({ ok: false, finished: true });
  });
});

describe('ring layout', () => {
  it('keeps boxes on the board, apart from each other and clear of the Sun', () => {
    const bad = [];
    for (const cycle of CYCLES) {
      const { nodes, edges } = ringLayout(cycle.stages.length, 180, 150, 122, 100);
      if (edges.length !== nodes.length) bad.push(`${cycle.id} edges`);
      nodes.forEach((a, i) => {
        if (a.x - NODE_W / 2 < 0 || a.x + NODE_W / 2 > 360) bad.push(`${cycle.id} x${i}`);
        if (a.y - NODE_H / 2 < 0 || a.y + NODE_H / 2 > 300) bad.push(`${cycle.id} y${i}`);
        if (Math.abs(a.x - 180) < NODE_W / 2 + 32 && Math.abs(a.y - 150) < NODE_H / 2 + 32) {
          bad.push(`${cycle.id} sun${i}`);
        }
        nodes.slice(i + 1).forEach((b, j) => {
          if (Math.abs(a.x - b.x) < NODE_W && Math.abs(a.y - b.y) < NODE_H) {
            bad.push(`${cycle.id} overlap ${i},${i + 1 + j}`);
          }
        });
      });
    }
    expect(bad).toEqual([]);
  });

  it('closes the ring with the last arrow', () => {
    const { nodes, edges } = ringLayout(4, 0, 0, 10, 10);
    expect(edges[3].x2).toBeCloseTo(nodes[0].x, 9);
    expect(edges[3].y2).toBeCloseTo(nodes[0].y, 9);
  });
});
