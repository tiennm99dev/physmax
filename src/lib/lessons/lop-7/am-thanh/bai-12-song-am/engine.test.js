import { describe, expect, it } from 'vitest';
import { MEDIA, isReached, layerOffset, mediumById, sourceOffset, travelTime } from './engine.js';

const source = { amplitude: 4, frequency: 2, duration: Infinity };

describe('media', () => {
  it('orders the speed of sound gas < liquid < solid', () => {
    const [air, water, steel] = MEDIA;
    expect(air.speed).toBeLessThan(water.speed);
    expect(water.speed).toBeLessThan(steel.speed);
    expect(air.screenSpeed).toBeLessThan(water.screenSpeed);
    expect(water.screenSpeed).toBeLessThan(steel.screenSpeed);
  });

  it('carries no sound in a vacuum', () => {
    expect(mediumById('vacuum').speed).toBe(0);
    expect(travelTime(100, mediumById('vacuum'))).toBe(Infinity);
  });

  it('falls back to air for an unknown id', () => {
    expect(mediumById('glass').id).toBe('air');
  });
});

describe('vibration of the source', () => {
  it('is still before the start and after the source stops', () => {
    expect(sourceOffset(-0.1, source)).toBe(0);
    expect(sourceOffset(2, { ...source, duration: 1 })).toBe(0);
  });

  it('reaches its amplitude a quarter period after the start', () => {
    expect(sourceOffset(0.125, source)).toBeCloseTo(4);
  });
});

describe('layers of the medium', () => {
  it('repeat the source motion x / v later', () => {
    expect(layerOffset(340, 1.125, 340, source)).toBeCloseTo(sourceOffset(0.125, source));
  });

  it('stay still until the vibration arrives', () => {
    expect(layerOffset(680, 1.9, 340, source)).toBe(0);
    expect(isReached(680, 1.9, 340, Infinity)).toBe(false);
    expect(isReached(680, 2.1, 340, Infinity)).toBe(true);
  });

  it('stop again once the tail of a short sound has passed', () => {
    expect(isReached(340, 2.5, 340, 1)).toBe(false);
  });

  it('never move in a vacuum', () => {
    expect(layerOffset(10, 5, 0, source)).toBe(0);
    expect(isReached(0, 5, 0, Infinity)).toBe(false);
  });
});

describe('travel time', () => {
  it('is distance over speed', () => {
    expect(travelTime(1020, mediumById('air'))).toBeCloseTo(3);
    expect(travelTime(3000, mediumById('water'))).toBeCloseTo(2);
    expect(travelTime(1200, mediumById('steel'))).toBeCloseTo(0.2);
  });
});
