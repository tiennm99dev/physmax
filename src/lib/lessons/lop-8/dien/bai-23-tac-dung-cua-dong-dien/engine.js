/**
 * The effects of an electric current (tác dụng của dòng điện) and the devices
 * that use them, with the small models the device cards animate: a heater
 * warming towards its working temperature, copper plating out on the
 * electrode joined to the negative terminal, an LED that passes current one
 * way only, and a fuse wire that melts when too many appliances are on.
 */

/** @typedef {'nhiet' | 'phat-sang' | 'tu' | 'hoa-hoc' | 'sinh-li'} Effect */

/** @type {Record<Effect, string>} */
export const EFFECTS = {
  nhiet: 'Tác dụng nhiệt',
  'phat-sang': 'Tác dụng phát sáng',
  tu: 'Tác dụng từ',
  'hoa-hoc': 'Tác dụng hóa học',
  'sinh-li': 'Tác dụng sinh lí',
};

/**
 * @typedef {object} Device
 * @property {string} id
 * @property {string} label
 * @property {Effect[]} effects the effects the device is built to use
 * @property {string} why
 */

/** @type {Device[]} */
export const DEVICES = [
  {
    id: 'ban-la',
    label: 'Bàn là',
    effects: ['nhiet'],
    why: 'Dòng điện chạy qua dây đốt nóng làm nó nóng lên, đế bàn là nóng để là phẳng quần áo.',
  },
  {
    id: 'am-dien',
    label: 'Ấm điện',
    effects: ['nhiet'],
    why: 'Dòng điện chạy qua dây đốt nóng (mâm nhiệt) ở đáy ấm làm nó nóng lên và đun sôi nước.',
  },
  {
    id: 'den-soi-dot',
    label: 'Bóng đèn sợi đốt',
    effects: ['nhiet', 'phat-sang'],
    why: 'Dòng điện làm dây tóc bằng vonfram nóng lên tới khoảng 2 500 °C nên phát sáng: vừa có tác dụng nhiệt, vừa có tác dụng phát sáng.',
  },
  {
    id: 'den-led',
    label: 'Đèn LED',
    effects: ['phat-sang'],
    why: 'Dòng điện chạy qua điốt phát quang làm nó phát sáng khi còn nguội; đèn chỉ hơi ấm nên rất tiết kiệm điện.',
  },
  {
    id: 'chuong',
    label: 'Chuông điện',
    effects: ['tu'],
    why: 'Dòng điện chạy qua cuộn dây biến nó thành nam châm điện, hút thanh thép có gắn búa gõ vào chuông.',
  },
  {
    id: 'ma-dien',
    label: 'Bình mạ đồng',
    effects: ['hoa-hoc'],
    why: 'Dòng điện chạy qua dung dịch copper(II) sulfate làm đồng tách ra, bám vào điện cực nối với cực âm của nguồn.',
  },
  {
    id: 'dien-cham',
    label: 'Máy điện châm',
    effects: ['sinh-li'],
    why: 'Dòng điện rất nhỏ chạy qua cơ thể kích thích các cơ, dây thần kinh; được dùng để chữa bệnh, giảm đau.',
  },
  {
    id: 'cau-chi',
    label: 'Cầu chì',
    effects: ['nhiet'],
    why: 'Dòng điện quá lớn làm dây chảy nóng lên đến nóng chảy và đứt, ngắt mạch để bảo vệ các thiết bị khác.',
  },
];

/**
 * @param {string} id
 * @returns {Device | undefined}
 */
export function device(id) {
  return DEVICES.find((d) => d.id === id);
}

/**
 * Compares the effects a learner picked with the device's own.
 * @param {string} id device id
 * @param {Effect[]} picked
 * @returns {{ correct: boolean, missing: Effect[], extra: Effect[] }}
 */
export function checkEffects(id, picked) {
  const want = device(id)?.effects ?? [];
  const missing = want.filter((e) => !picked.includes(e));
  const extra = picked.filter((e) => !want.includes(e));
  return { correct: missing.length === 0 && extra.length === 0, missing, extra };
}

/**
 * Temperature in °C of a heater switched on for `t` seconds, rising from the
 * room towards its working temperature (a simple exponential approach).
 * @param {number} t seconds
 * @param {number} target working temperature, °C
 * @param {number} [room] room temperature, °C
 * @param {number} [tau] time constant, s
 */
export function warmUp(t, target, room = 25, tau = 4) {
  if (t <= 0) return room;
  return Math.round(target - (target - room) * Math.exp(-t / tau));
}

/**
 * Which electrode copper plates out on: the one joined to the negative
 * terminal of the source.
 * @param {boolean} leftIsNegative whether the left carbon rod is on the − terminal
 * @returns {'trai' | 'phai'}
 */
export function platedElectrode(leftIsNegative) {
  return leftIsNegative ? 'trai' : 'phai';
}

/**
 * Whether an LED lights: only when it is the right way round, its long leg
 * (anode) towards the positive terminal.
 * @param {boolean} longLegToPositive
 */
export function ledLights(longLegToPositive) {
  return longLegToPositive;
}

/** Current, in A, each appliance on the fused line draws. */
export const AMPS_PER_APPLIANCE = 4;

/** Rated current of the fuse, in A: it melts above this. */
export const FUSE_RATING = 10;

/**
 * Current in the fused line and whether the fuse wire melts.
 * @param {number} appliances number switched on
 */
export function fuseLine(appliances) {
  const current = appliances * AMPS_PER_APPLIANCE;
  return { current, melts: current > FUSE_RATING };
}
