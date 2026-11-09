import { tidy } from '#lib/core/number-format.js';

/** Density of air, kg/m³. */
export const AIR_DENSITY = 1.2;
/** Density of water, kg/m³. */
export const WATER_DENSITY = 1000;
/** Gravitational acceleration, m/s². */
export const G = 9.8;
/** Share of the wind's power a turbine turns into electricity. */
export const WIND_CP = 0.4;
/** Below this wind speed the turbine does not turn, m/s. */
export const CUT_IN = 3;
/** The turbine reaches its rated power at this wind speed, m/s. */
export const RATED_SPEED = 12;
/** Above this wind speed the turbine stops to stay safe, m/s. */
export const CUT_OUT = 25;

/** Solar cell types with a typical efficiency. */
export const CELLS = [
  { id: 'don-tinh-the', label: 'Đơn tinh thể', efficiency: 0.2 },
  { id: 'da-tinh-the', label: 'Đa tinh thể', efficiency: 0.16 },
  { id: 'mang-mong', label: 'Màng mỏng', efficiency: 0.12 },
];

/**
 * Electric power of a solar panel, in W: P = η · G · A.
 * @param {number} irradiance sunlight power per square metre G, W/m²
 * @param {number} area panel area A, m²
 * @param {number} efficiency η, from 0 to 1
 */
export function solarPower(irradiance, area, efficiency) {
  return tidy(efficiency * irradiance * area);
}

/**
 * Electric energy of a solar panel in a day, in kWh, when the day's sunshine
 * equals `sunHours` hours at 1 000 W/m².
 * @param {number} area
 * @param {number} efficiency
 * @param {number} sunHours
 */
export function solarDayKwh(area, efficiency, sunHours) {
  return tidy(efficiency * area * sunHours);
}

/**
 * Power the wind carries through the rotor disc, times the turbine's share,
 * in W: P = Cp · ½ ρ π R² v³. Air of mass ρ π R² v t passes through the
 * disc in time t, carrying kinetic energy ½ m v².
 * @param {number} speed wind speed v, m/s
 * @param {number} radius blade length R, m
 */
export function windRaw(speed, radius) {
  return WIND_CP * 0.5 * AIR_DENSITY * Math.PI * radius * radius * speed ** 3;
}

/**
 * Rated power of a turbine with blades `radius` long, in W.
 * @param {number} radius
 */
export function ratedPower(radius) {
  return windRaw(RATED_SPEED, radius);
}

/**
 * Electric power of the turbine at a wind speed, in W: nothing below the
 * cut-in speed or above the cut-out speed, capped at the rated power.
 * @param {number} speed
 * @param {number} radius
 */
export function windPower(speed, radius) {
  if (speed < CUT_IN || speed > CUT_OUT) return 0;
  return Math.min(windRaw(speed, radius), ratedPower(radius));
}

/**
 * Points of the power curve, in MW against m/s.
 * @param {number} radius
 * @param {number} maxSpeed
 * @param {number} [step]
 */
export function powerCurve(radius, maxSpeed, step = 0.5) {
  const points = [];
  for (let v = 0; v <= maxSpeed + 1e-9; v += step) {
    const s = tidy(v);
    // Draw the vertical drops at the cut-in and cut-out speeds.
    if (s === CUT_IN) points.push({ x: s, y: 0 });
    if (s === CUT_OUT) points.push({ x: s, y: windPower(s, radius) / 1e6 });
    points.push({ x: s, y: s === CUT_OUT ? 0 : windPower(s, radius) / 1e6 });
  }
  return points;
}

/**
 * Electric power of a hydropower plant, in W: P = η ρ g Q h.
 * @param {number} flow water flow Q, m³/s
 * @param {number} head height the water falls h, m
 * @param {number} efficiency η, from 0 to 1
 */
export function hydroPower(flow, head, efficiency) {
  return tidy(efficiency * WATER_DENSITY * G * flow * head);
}
