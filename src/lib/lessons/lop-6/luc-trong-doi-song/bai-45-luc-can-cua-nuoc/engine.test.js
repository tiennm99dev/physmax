import { describe, expect, it } from 'vitest';
import {
  BALANCE_MAX,
  DEPTH,
  PLATES,
  SHAPES,
  SPEED_MAX,
  dragAt,
  fall,
  ranking,
  reading,
  stateAt,
  timeToBottom,
  winner,
} from './engine.js';

describe('bodies sinking through a tank', () => {
  it('orders the shapes from streamlined to flat in water', () => {
    expect(ranking('nuoc').map((r) => r.id)).toEqual(['thuon', 'cau', 'hop', 'tam']);
    expect(winner('nuoc')).toBe('thuon');
  });

  it('keeps the gaps in water large enough to see', () => {
    const r = ranking('nuoc');
    for (let i = 1; i < r.length; i++) expect(r[i].time - r[i - 1].time).toBeGreaterThan(0.05);
  });

  it('lets every shape fall almost together in air', () => {
    expect(winner('khong-khi')).toBe('cung-luc');
    for (const r of ranking('khong-khi')) {
      expect(r.time).toBeCloseTo(Math.sqrt(0.1), 2);
      expect(stateAt(fall(r.id, 'khong-khi'), r.time).done).toBe(true);
    }
  });

  it('reaches the bottom exactly at the computed time', () => {
    for (const s of SHAPES) {
      const f = fall(s.id, 'nuoc');
      const t = timeToBottom(f);
      expect(stateAt(f, t - 1e-6).done).toBe(false);
      expect(stateAt(f, t - 1e-6).y).toBeCloseTo(DEPTH, 4);
      expect(stateAt(f, t + 1e-6)).toEqual({ y: DEPTH, v: 0, done: true });
      expect(stateAt(f, t).done).toBe(true);
    }
  });

  it('starts from rest and speeds up towards a steady speed', () => {
    const f = fall('tam', 'nuoc');
    expect(stateAt(f, 0)).toEqual({ y: 0, v: 0, done: false });
    expect(stateAt(f, 0.5).v).toBeCloseTo(f.vt, 3);
  });

  it('gives a far larger resistance in water than in air at the same speed', () => {
    for (const s of SHAPES) {
      expect(dragAt(s.id, 'nuoc', 0.5)).toBeGreaterThan(500 * dragAt(s.id, 'khong-khi', 0.5));
    }
    expect(dragAt('tam', 'nuoc', 0.5)).toBe(0.3);
  });
});

describe('trolley pulled through the box', () => {
  it('reads only rolling friction without water', () => {
    for (const p of PLATES) expect(reading(p.id, false, SPEED_MAX).balance).toBe(0.2);
  });

  it('reads more with water, more for a larger plate and less for a streamlined one', () => {
    expect(reading('nho', true, 0.5)).toEqual({ drag: 0.75, balance: 0.95 });
    expect(reading('lon', true, 0.5)).toEqual({ drag: 1.5, balance: 1.7 });
    expect(reading('thuon', true, 0.5)).toEqual({ drag: 0.5, balance: 0.7 });
  });

  it('grows with the pulling speed and stays on the balance scale', () => {
    expect(reading('lon', true, 0.2).balance).toBeLessThan(reading('lon', true, 0.4).balance);
    for (const p of PLATES)
      expect(reading(p.id, true, SPEED_MAX).balance).toBeLessThan(BALANCE_MAX);
  });
});
