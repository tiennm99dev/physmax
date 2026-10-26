import { describe, expect, it } from 'vitest';
import {
  CAMERA_TIMES,
  CARS,
  TRACK,
  cameraCheck,
  frontAt,
  measuredSpeed,
  stopwatchReading,
  timerReading,
  travelTime,
} from './engine.js';

describe('car on the track', () => {
  it('takes s/v to go between the gates', () => {
    expect(travelTime(50, 0.25)).toBeCloseTo(2);
    expect(travelTime(100, 0.4)).toBeCloseTo(2.5);
  });

  it('moves at its speed and stops at the end of the track', () => {
    expect(frontAt(0.5, 1)).toBeCloseTo(50);
    expect(frontAt(0.5, 100)).toBe(TRACK);
    expect(frontAt(0.5, -1)).toBe(0);
  });

  it('every car crosses the widest gap within the fine timer scale', () => {
    for (const v of CARS) expect(timerReading(travelTime(100, v))).not.toBe(null);
  });
});

describe('reading the clocks', () => {
  it('cuts the digital timer to 0,001 s and blanks past 9,999 s', () => {
    expect(timerReading(1.56256)).toBe(1.562);
    expect(timerReading(2)).toBe(2);
    expect(timerReading(10.2)).toBe(null);
  });

  it('cuts the stopwatch to 0,01 s', () => {
    expect(stopwatchReading(1.2, 2.987)).toBe(1.78);
    expect(stopwatchReading(3, 2)).toBe(0);
  });

  it('turns cm and s into m/s', () => {
    expect(measuredSpeed(50, 1.25)).toBeCloseTo(0.4);
  });
});

describe('speed camera', () => {
  it('matches the book example: 5 m in 0,35 s is about 51,4 km/h', () => {
    const c = cameraCheck(0.35);
    expect(c.v).toBeCloseTo(14.29, 2);
    expect(c.kmh).toBeCloseTo(51.43, 2);
    expect(c.over).toBe(false);
  });

  it('flags cars over 60 km/h but not one exactly at it', () => {
    expect(cameraCheck(0.25).kmh).toBeCloseTo(72);
    expect(cameraCheck(0.25).over).toBe(true);
    expect(cameraCheck(0.3).over).toBe(false);
    expect(CAMERA_TIMES.filter((t) => cameraCheck(t).over).length).toBe(3);
  });
});
