import { describe, expect, it } from 'vitest';
import {
  DOOR_CM,
  OPEN_MOMENT,
  doorPush,
  leastForce,
  leverArm,
  moment,
  openTime,
  swingSpeed,
} from './engine.js';

describe('turning a door about its hinge', () => {
  it('measures the lever arm from the hinge to the line of action', () => {
    expect(leverArm(80, 90)).toBe(80);
    expect(leverArm(80, 30)).toBe(40);
    expect(leverArm(60, 150)).toBe(30);
    expect(leverArm(80, 0)).toBe(0);
    expect(leverArm(80, 180)).toBe(0);
    expect(leverArm(0, 90)).toBe(0);
  });

  it('computes M = F · d', () => {
    expect(moment(10, 0.8)).toBe(8);
    expect(moment(50, 0.2)).toBe(10);
    expect(moment(0, 0.5)).toBe(0);
  });

  it('tells why the door turns or not', () => {
    expect(doorPush({ force: 10, r: 80, angle: 90 })).toEqual({
      arm: 80,
      moment: 8,
      opens: true,
      reason: 'mo',
    });
    expect(doorPush({ force: 10, r: 80, angle: 90, vertical: true }).reason).toBe('doc');
    expect(doorPush({ force: 30, r: 80, angle: 0 }).reason).toBe('qua-truc');
    expect(doorPush({ force: 30, r: 0, angle: 90 }).reason).toBe('qua-truc');
    expect(doorPush({ force: 0, r: 80, angle: 90 }).reason).toBe('khong-luc');
    expect(doorPush({ force: 10, r: 20, angle: 90 })).toMatchObject({ moment: 2, reason: 'yeu' });
  });

  it('opens a door pushed at the edge, square on, with the least force', () => {
    expect(leastForce(DOOR_CM, 90)).toBe(5);
    expect(leastForce(40, 90)).toBe(10);
    expect(leastForce(80, 30)).toBe(10);
    expect(leastForce(80, 0)).toBeNull();
    expect(doorPush({ force: 5, r: DOOR_CM, angle: 90 }).moment).toBe(OPEN_MOMENT);
    expect(doorPush({ force: 5, r: DOOR_CM, angle: 90 }).opens).toBe(true);
  });

  it('swings faster for a larger moment', () => {
    expect(swingSpeed(3)).toBe(0);
    expect(openTime(3)).toBeNull();
    expect(swingSpeed(4)).toBe(20);
    expect(swingSpeed(8)).toBe(80);
    expect(openTime(8)).toBeLessThan(openTime(4) ?? 0);
    expect(swingSpeed(100)).toBe(180);
  });
});
