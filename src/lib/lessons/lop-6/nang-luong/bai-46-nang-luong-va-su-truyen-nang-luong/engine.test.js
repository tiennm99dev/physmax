import { describe, expect, it } from 'vitest';
import { CHAINS, HOW, blow, chain, checkChain, waysUsed } from './engine.js';

describe('energy chains', () => {
  it('gives every chain one link fewer than its items, each with a known way', () => {
    for (const c of CHAINS) {
      expect(c.links.length, c.id).toBe(c.items.length - 1);
      for (const l of c.links) expect(HOW[l.how], c.id).toBeTruthy();
      expect(new Set(c.items.map((i) => i.id)).size, c.id).toBe(c.items.length);
    }
  });

  it('accepts the correct order and marks every link', () => {
    const c = chain('thoi-xe');
    const r = checkChain(
      c,
      c.items.map((i) => i.id),
    );
    expect(r).toEqual({ links: ['ok', 'ok', 'ok'], startOk: true, done: true });
  });

  it('marks wrong neighbours and leaves empty slots unchecked', () => {
    const c = chain('thoi-xe');
    const r = checkChain(c, ['nam', 'buom', 'ong-hut', null]);
    expect(r.links).toEqual(['sai', 'sai', null]);
    expect(r.startOk).toBe(true);
    expect(r.done).toBe(false);
  });

  it('flags a chain that starts in the middle even when its links follow on', () => {
    const c = chain('dun-nuoc');
    const r = checkChain(c, ['lua', 'am', 'nuoc', 'nap', null]);
    expect(r.links).toEqual(['ok', 'ok', 'ok', null]);
    expect(r.startOk).toBe(false);
    expect(r.done).toBe(false);
  });

  it('lists the ways the energy passes, once each', () => {
    expect(waysUsed(chain('dun-nuoc'))).toEqual(['dot-chay', 'nhiet', 'luc']);
    expect(waysUsed(chain('thoi-xe'))).toEqual(['luc']);
    expect(chain('khong-co').id).toBe(CHAINS[0].id);
  });
});

describe('blowing a toy car', () => {
  it('gives more energy and a longer roll for a stronger or longer blow', () => {
    expect(blow(1, 1)).toEqual({ force: 1, energy: 1, distance: 10 });
    expect(blow(3, 1).distance).toBeGreaterThan(blow(1, 1).distance);
    expect(blow(2, 3).energy).toBe(6);
    expect(blow(9, 0)).toEqual({ force: 3, energy: 3, distance: 30 });
  });
});
