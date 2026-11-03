import { formatNumber } from '#lib/core/number-format.js';

/**
 * Sun, Earth and Moon of the lesson. The Moon's place is one angle `d` from the
 * Sun (0 is new moon, 180 is full moon), and `s` is the Sun's angle from the
 * line where the Moon's tilted orbit crosses the ecliptic. Angular sizes are
 * the real ones, in degrees, as seen from Earth.
 */

const RAD = Math.PI / 180;

export const INCLINATION = 5.145;
const SUN_RADIUS = 0.267;
const MOON_NEAR = 0.279;
const MOON_FAR = 0.245;
const MOON_MEAN = 0.26;
const UMBRA = 0.75;
const PENUMBRA = 1.28;
/** Shift of the Moon's place on the Sun for the best placed observer on Earth. */
const PARALLAX = 0.95;

/** Height of the Sun's tide raised, relative to the Moon's. */
export const SUN_TIDE = 0.46;

/** @param {number} deg wrapped to [-180, 180) */
export function wrap180(deg) {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

/**
 * Angle of the Moon above the ecliptic, in degrees.
 * @param {number} d @param {number} s
 */
export function moonLatitude(d, s) {
  return Math.asin(Math.sin(INCLINATION * RAD) * Math.sin((d + s) * RAD)) / RAD;
}

/**
 * @typedef {'none' | 'solar-partial' | 'solar-total' | 'solar-annular' | 'lunar-penumbral' | 'lunar-partial' | 'lunar-total'} EclipseKind
 */

/**
 * The eclipse the geometry gives, if any, with the discs to draw: the Sun and
 * the Moon for the best placed observer, or the Moon and Earth's shadow.
 * @param {number} d @param {number} s @param {boolean} near whether the Moon is at its closest
 * @returns {{ kind: EclipseKind, gap: number, moonRadius: number, sunGap: number, shadowGap: number }}
 */
export function eclipseAt(d, s, near) {
  const lat = moonLatitude(d, s);
  const moonRadius = near ? MOON_NEAR : MOON_FAR;
  const fromSun = Math.hypot(wrap180(d), lat);
  const fromShadow = Math.hypot(wrap180(d - 180), lat);
  const sunGap = Math.max(0, fromSun - PARALLAX);
  const shadowGap = fromShadow;
  /** @type {EclipseKind} */
  let kind = 'none';
  let gap = fromSun;
  if (sunGap < SUN_RADIUS + moonRadius) {
    if (fromSun >= PARALLAX) kind = 'solar-partial';
    else kind = near ? 'solar-total' : 'solar-annular';
  } else if (fromShadow < PENUMBRA + MOON_MEAN) {
    gap = fromShadow;
    if (fromShadow <= UMBRA - MOON_MEAN) kind = 'lunar-total';
    else if (fromShadow < UMBRA + MOON_MEAN) kind = 'lunar-partial';
    else kind = 'lunar-penumbral';
  }
  return { kind, gap, moonRadius, sunGap, shadowGap };
}

/** @type {Record<EclipseKind, string>} */
export const ECLIPSE_NAME = {
  none: 'Không có nhật thực, nguyệt thực',
  'solar-partial': 'Nhật thực một phần',
  'solar-total': 'Nhật thực toàn phần',
  'solar-annular': 'Nhật thực hình khuyên',
  'lunar-penumbral': 'Nguyệt thực nửa tối',
  'lunar-partial': 'Nguyệt thực một phần',
  'lunar-total': 'Nguyệt thực toàn phần',
};

/**
 * What the learner reads about the current place of the Moon.
 * @param {number} d @param {number} s @param {boolean} near
 */
export function eclipseText(d, s, near) {
  const { kind } = eclipseAt(d, s, near);
  const lat = Math.abs(moonLatitude(d, s));
  const e = wrap180(d);
  const newMoon = Math.abs(e) < 3;
  const fullMoon = Math.abs(wrap180(d - 180)) < 3;
  if (kind === 'none') {
    if (newMoon || fullMoon) {
      if (Math.abs(newMoon ? e : wrap180(d - 180)) >= 1) {
        return `Gần thẳng hàng rồi. Kéo Mặt Trăng thêm một chút đến đúng vị trí ${newMoon ? 'trăng non' : 'trăng tròn'}.`;
      }
      const side = moonLatitude(d, s) > 0 ? 'phía trên' : 'phía dưới';
      const what = newMoon
        ? 'bóng của Mặt Trăng đi lệch khỏi Trái Đất'
        : 'Mặt Trăng đi lệch khỏi bóng của Trái Đất';
      return `Nhìn từ trên xuống thì thẳng hàng, nhưng Mặt Trăng ở ${side} mặt phẳng hoàng đạo khoảng ${formatNumber(lat, 1)}°, nên ${what}. Hãy đưa Mặt Trời về gần đường nút.`;
    }
    return 'Ba thiên thể chưa thẳng hàng. Kéo Mặt Trăng đến vị trí trăng non hoặc trăng tròn.';
  }
  /** @type {Record<EclipseKind, string>} */
  const said = {
    none: '',
    'solar-partial':
      'Trăng non, gần đường nút: Mặt Trăng che một phần đĩa Mặt Trời ở một vùng trên Trái Đất.',
    'solar-total':
      'Trăng non, rất gần đường nút, Mặt Trăng ở gần: vùng tối của Mặt Trăng chạm tới Trái Đất, ở đó Mặt Trời bị che kín.',
    'solar-annular':
      'Trăng non, rất gần đường nút, nhưng Mặt Trăng ở xa: đĩa Mặt Trăng trông nhỏ hơn đĩa Mặt Trời, để lộ một vòng sáng.',
    'lunar-penumbral':
      'Trăng tròn đi vào vùng nửa tối của Trái Đất: trăng hơi mờ đi, mắt khó nhận ra.',
    'lunar-partial':
      'Trăng tròn gần đường nút: một phần Mặt Trăng đi vào vùng bóng tối của Trái Đất.',
    'lunar-total':
      'Trăng tròn rất gần đường nút: toàn bộ Mặt Trăng nằm trong vùng bóng tối của Trái Đất, trăng có màu đỏ sậm.',
  };
  return said[kind];
}

/**
 * Tide height over the globe, relative to the height of the Moon's tide alone.
 * `angle` is measured from the direction of the Moon, `d` from the Sun.
 * @param {number} angle @param {number} d
 */
export function tideHeight(angle, d) {
  return Math.cos(2 * angle * RAD) + SUN_TIDE * Math.cos(2 * (angle + d) * RAD);
}

/**
 * Peak height of the combined tide: the two bulges add at new and full moon
 * and work against each other at the quarters.
 * @param {number} d
 */
export function tideRange(d) {
  return Math.hypot(1 + SUN_TIDE * Math.cos(2 * d * RAD), SUN_TIDE * Math.sin(2 * d * RAD));
}

/**
 * Classifies the tide by the Moon's angle to the Sun.
 * @param {number} d
 * @returns {'cuong' | 'kem' | 'trung-gian'}
 */
export function tideKind(d) {
  const r = tideRange(d);
  if (r > 1.4) return 'cuong';
  if (r < 0.62) return 'kem';
  return 'trung-gian';
}

/**
 * Water height at one place as the day goes on: `hours` after the Moon was
 * overhead. Earth turns relative to the Moon once in about 24 h 50 min.
 * @param {number} hours @param {number} d
 */
export function waterAt(hours, d) {
  return tideHeight((hours / 24.84) * 360, d);
}

/**
 * The Moon's angle from the Sun for a point on its orbit, seen from the north
 * with the Sun on the left: it goes counterclockwise from new moon.
 * @param {number} x @param {number} y relative to Earth, y up
 */
export function elongationFromPoint(x, y) {
  return (((Math.atan2(y, x) / RAD - 180) % 360) + 360) % 360;
}

/**
 * Moon position on its orbit in the drawing.
 * @param {number} d @param {number} radius
 */
export function moonOnOrbit(d, radius) {
  const a = (180 + d) * RAD;
  return { x: radius * Math.cos(a), y: radius * Math.sin(a) };
}

/**
 * Shadow length behind a sphere, from similar triangles: a sphere of radius `r`
 * in the light of a sphere of radius `big` at distance `dist`.
 * @param {number} dist @param {number} r @param {number} big
 */
export function shadowLength(dist, r, big) {
  return (dist * r) / (big - r);
}

/** Moon's mean angular radius, for the drawing of the discs. */
export const DISC = { sun: SUN_RADIUS, umbra: UMBRA, penumbra: PENUMBRA, moon: MOON_MEAN };
