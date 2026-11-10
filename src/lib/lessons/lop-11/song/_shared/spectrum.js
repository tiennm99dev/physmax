/**
 * The electromagnetic spectrum as the grade 11 book lists it, and the colour
 * of visible light by wavelength. Wavelengths are in metres in vacuum.
 *
 * Neighbouring bands overlap a little in the book (ultraviolet ends at 400 nm,
 * visible light starts at 380 nm), so the bands here meet at simple round
 * boundaries for the slider; `range` keeps the book's own text.
 */

/** Speed of light in vacuum, m/s. */
export const C = 3e8;

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   from: number,
 *   to: number,
 *   range: string,
 *   source: string,
 *   use: string,
 *   color: string,
 * }} Band
 */

/** Bands from the shortest wavelength to the longest; `from` inclusive. */
export const BANDS = /** @type {Band[]} */ ([
  {
    id: 'gamma',
    name: 'Tia gamma',
    from: 1e-14,
    to: 1e-11,
    range: 'dưới khoảng $10^{-11}$ m',
    source: 'Hạt nhân phóng xạ, phản ứng hạt nhân',
    use: 'Diệt tế bào ung thư (xạ trị), tiệt trùng thực phẩm và dụng cụ y tế',
    color: '#7c3aed',
  },
  {
    id: 'x',
    name: 'Tia X',
    from: 1e-11,
    to: 1e-8,
    range: 'khoảng $30$ pm đến $3$ nm',
    source: 'Ống tia X (ống Rơn-ghen)',
    use: 'Chụp X-quang, chiếu điện, kiểm tra hành lí, tìm vết nứt trong kim loại',
    color: '#4f46e5',
  },
  {
    id: 'tu-ngoai',
    name: 'Tia tử ngoại',
    from: 1e-8,
    to: 3.8e-7,
    range: '$10$ nm đến $400$ nm',
    source: 'Mặt Trời, hồ quang điện, đèn hơi thuỷ ngân',
    use: 'Tiệt trùng nước và dụng cụ, phát hiện tiền giả, chữa còi xương',
    color: '#9333ea',
  },
  {
    id: 'nhin-thay',
    name: 'Ánh sáng nhìn thấy',
    from: 3.8e-7,
    to: 7.6e-7,
    range: '$0{,}38$ µm đến $0{,}76$ µm',
    source: 'Mặt Trời, đèn, ngọn lửa',
    use: 'Chiếu sáng, giúp mắt nhìn thấy, quang hợp của cây xanh',
    color: '#16a34a',
  },
  {
    id: 'hong-ngoai',
    name: 'Tia hồng ngoại',
    from: 7.6e-7,
    to: 1e-3,
    range: '$0{,}76$ µm đến $1$ mm',
    source: 'Mọi vật có nhiệt độ, như cơ thể người, bếp, lò sưởi',
    use: 'Sưởi ấm, sấy khô, điều khiển từ xa, camera chụp ảnh ban đêm',
    color: '#dc2626',
  },
  {
    id: 'vi-ba',
    name: 'Sóng vi ba',
    from: 1e-3,
    to: 1,
    range: '$1$ mm đến $1$ m',
    source: 'Lò vi sóng, ăng-ten của điện thoại, ra-đa',
    use: 'Lò vi sóng, điện thoại di động, Wi-Fi, ra-đa, liên lạc vệ tinh',
    color: '#ea580c',
  },
  {
    id: 'vo-tuyen',
    name: 'Sóng vô tuyến',
    from: 1,
    to: 1e5,
    range: '$1$ m đến $100$ km',
    source: 'Ăng-ten của đài phát thanh, đài truyền hình',
    use: 'Phát thanh, truyền hình, liên lạc vô tuyến',
    color: '#b45309',
  },
]);

/**
 * The band a wavelength falls in, or null outside the drawn scale.
 * @param {number} wavelength m
 */
export function bandOf(wavelength) {
  const last = BANDS.length - 1;
  return (
    BANDS.find(
      (b, i) =>
        wavelength >= b.from * (1 - 1e-9) &&
        (i === last ? wavelength <= b.to * (1 + 1e-9) : wavelength < b.to * (1 - 1e-9)),
    ) ?? null
  );
}

/** f = c / λ in vacuum. @param {number} wavelength m */
export const frequencyOf = (wavelength) => C / wavelength;

/** λ = c / f in vacuum. @param {number} frequency Hz */
export const wavelengthOf = (frequency) => C / frequency;

/**
 * An approximate sRGB colour for visible light of wavelength `nm`
 * (380 to 760 nm), dimmed near the ends where the eye sees little.
 * @param {number} nm
 */
export function visibleColor(nm) {
  /** @type {[number, number, number]} */
  let rgb;
  if (nm < 440) rgb = [(440 - nm) / 60, 0, 1];
  else if (nm < 490) rgb = [0, (nm - 440) / 50, 1];
  else if (nm < 510) rgb = [0, 1, (510 - nm) / 20];
  else if (nm < 580) rgb = [(nm - 510) / 70, 1, 0];
  else if (nm < 645) rgb = [1, (645 - nm) / 65, 0];
  else rgb = [1, 0, 0];
  const edge =
    nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (760 - nm)) / 60 : 1;
  const k = Math.max(0.3, Math.min(1, edge));
  const hex = rgb
    .map((c) =>
      Math.round(Math.max(0, Math.min(1, c)) * k * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');
  return `#${hex}`;
}

/**
 * The Vietnamese name of a visible colour by wavelength, the seven colours of
 * the rainbow with rounded boundaries.
 * @param {number} nm
 */
export function colorName(nm) {
  if (nm < 430) return 'tím';
  if (nm < 460) return 'chàm';
  if (nm < 500) return 'lam';
  if (nm < 570) return 'lục';
  if (nm < 590) return 'vàng';
  if (nm < 630) return 'cam';
  return 'đỏ';
}
