import { describe, expect, it } from 'vitest';
import {
  G,
  LOWEST,
  TRACK,
  TRACK_LENGTH,
  advance,
  afterForce,
  heightAt,
  kinetic,
  nextPoint,
  potential,
  slopeAt,
  speedAt,
} from './engine.js';

describe('energy formulas', () => {
  it('follows the book', () => {
    expect(kinetic(1500, 20)).toBe(300000);
    expect(potential(2, 10)).toBe(196);
    expect(potential(2, 6)).toBe(117.6);
    expect(potential(5, -4)).toBe(-196);
  });

  it('keeps a four-fold energy for a doubled speed', () => {
    expect(kinetic(3, 8) / kinetic(3, 4)).toBe(4);
  });
});

describe('the track', () => {
  it('passes through its crests and dips, level there', () => {
    const bad = TRACK.filter((p) => Math.abs(heightAt(p.x) - p.h) > 1e-9 || slopeAt(p.x) !== 0);
    expect(bad).toEqual([]);
  });

  it('never goes below the lowest point nor above the start', () => {
    const heights = Array.from({ length: 201 }, (_, i) => heightAt(i / 2));
    expect(Math.min(...heights)).toBeCloseTo(LOWEST, 6);
    expect(Math.max(...heights)).toBe(TRACK[0].h);
  });

  it('gives the speed that energy allows', () => {
    expect(speedAt(0)).toBe(0);
    expect(speedAt(30)).toBeCloseTo(Math.sqrt(2 * G * 25), 9);
  });

  it('trades kinetic and potential energy with a constant sum', () => {
    const sums = [0, 13, 30, 47, 80, 100].map(
      (x) => kinetic(400, speedAt(x)) + potential(400, heightAt(x)),
    );
    const bad = sums.filter((s) => Math.abs(s - potential(400, 30)) > 1e-6);
    expect(bad).toEqual([]);
  });

  it('carries a car from the start to the end', () => {
    let x = 0;
    let steps = 0;
    while (x < TRACK_LENGTH && steps < 1000) {
      x = advance(x, 0.05);
      steps += 1;
    }
    expect(x).toBe(TRACK_LENGTH);
    expect(steps).toBeLessThan(1000);
  });

  it('steps from point to point', () => {
    expect(nextPoint(0)).toBe(30);
    expect(nextPoint(30)).toBe(55);
    expect(nextPoint(100)).toBe(100);
  });
});

describe('the work-energy theorem', () => {
  it('adds the work of a driving force', () => {
    const r = afterForce(1000, 10, 1500, 100);
    expect(r.start).toBe(50000);
    expect(r.work).toBe(150000);
    expect(r.end).toBe(200000);
    expect(r.speed).toBeCloseTo(20, 9);
    expect(r.stopped).toBe(false);
  });

  it('takes away the work of a resisting force', () => {
    const r = afterForce(1000, 20, -2000, 50);
    expect(r.end).toBe(100000);
    expect(r.speed).toBeCloseTo(Math.sqrt(200), 9);
  });

  it('stops a body whose energy runs out', () => {
    const r = afterForce(1200, 20, -6000, 80);
    expect(r.stopped).toBe(true);
    expect(r.travelled).toBe(40);
    expect(r.work).toBe(-240000);
    expect(r.end).toBe(0);
  });

  it('reaches rest exactly at the end of the distance', () => {
    const r = afterForce(1200, 20, -6000, 40);
    expect(r.end).toBe(0);
    expect(r.stopped).toBe(false);
    expect(r.speed).toBe(0);
  });
});
