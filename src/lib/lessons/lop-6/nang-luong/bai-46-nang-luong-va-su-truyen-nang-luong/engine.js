/**
 * Energy chains: the learner puts the links of a chain in order, and each
 * neighbouring pair is checked against the chain's real order. A link between
 * two neighbours names how the energy passes on: by a force (tác dụng lực), by
 * heating (truyền nhiệt), by light (ánh sáng), through food (thức ăn) or by
 * burning a fuel (đốt cháy nhiên liệu).
 *
 * Also the toy car blown through a straw: a stronger or longer blow gives the
 * car more energy, so it is pushed harder and rolls farther.
 */

/** @typedef {'luc' | 'nhiet' | 'anh-sang' | 'thuc-an' | 'dot-chay'} HowId */
/** @typedef {{ id: string, label: string }} ChainItem */
/** @typedef {{ how: HowId, text: string }} ChainLink */
/**
 * @typedef {object} Chain
 * @property {string} id
 * @property {string} title
 * @property {ChainItem[]} items in the correct order
 * @property {ChainLink[]} links one fewer than `items`; links[i] joins items[i] and items[i + 1]
 */

/** @type {Record<HowId, string>} */
export const HOW = {
  luc: 'tác dụng lực',
  nhiet: 'truyền nhiệt',
  'anh-sang': 'ánh sáng',
  'thuc-an': 'thức ăn',
  'dot-chay': 'đốt cháy nhiên liệu',
};

/** @type {Chain[]} */
export const CHAINS = [
  {
    id: 'thoi-xe',
    title: 'Thổi xe đồ chơi',
    items: [
      { id: 'nam', label: 'Bạn Nam thổi hơi' },
      { id: 'ong-hut', label: 'Luồng khí trong ống hút' },
      { id: 'buom', label: 'Cánh buồm giấy' },
      { id: 'xe', label: 'Chiếc xe đồ chơi' },
    ],
    links: [
      { how: 'luc', text: 'Bạn Nam dùng hơi đẩy luồng khí chạy qua ống hút.' },
      { how: 'luc', text: 'Luồng khí đập vào cánh buồm, đẩy cánh buồm.' },
      { how: 'luc', text: 'Cánh buồm gắn trên xe, đẩy chiếc xe chạy đi.' },
    ],
  },
  {
    id: 'dun-nuoc',
    title: 'Đun sôi ấm nước',
    items: [
      { id: 'gas', label: 'Khí gas trong bình' },
      { id: 'lua', label: 'Ngọn lửa bếp' },
      { id: 'am', label: 'Đáy ấm nhôm' },
      { id: 'nuoc', label: 'Nước trong ấm' },
      { id: 'nap', label: 'Nắp ấm bị đẩy lên' },
    ],
    links: [
      {
        how: 'dot-chay',
        text: 'Khí gas là nhiên liệu: khi cháy, nó toả ra năng lượng thành ngọn lửa rất nóng.',
      },
      { how: 'nhiet', text: 'Ngọn lửa truyền nhiệt cho đáy ấm.' },
      { how: 'nhiet', text: 'Đáy ấm nóng lên, truyền nhiệt cho nước, nước nóng dần rồi sôi.' },
      { how: 'luc', text: 'Hơi nước bốc lên tác dụng lực đẩy nắp ấm.' },
    ],
  },
  {
    id: 'mat-troi',
    title: 'Từ Mặt Trời đến chiếc xe đạp',
    items: [
      { id: 'mat-troi', label: 'Mặt Trời' },
      { id: 'lua-gao', label: 'Cây lúa cho hạt gạo' },
      { id: 'an', label: 'Bạn An ăn cơm' },
      { id: 'xe-dap', label: 'Chiếc xe đạp' },
    ],
    links: [
      { how: 'anh-sang', text: 'Cây lúa nhận năng lượng ánh sáng Mặt Trời để lớn lên, ra hạt.' },
      {
        how: 'thuc-an',
        text: 'Năng lượng dự trữ trong hạt gạo; bạn An ăn cơm, cơ thể nhận năng lượng từ thức ăn.',
      },
      { how: 'luc', text: 'Bạn An tác dụng lực lên bàn đạp, làm xe đạp chạy.' },
    ],
  },
];

/**
 * @param {string} id
 * @returns {Chain}
 */
export function chain(id) {
  return CHAINS.find((c) => c.id === id) ?? CHAINS[0];
}

/**
 * Check a partly built chain. `placed` holds item ids slot by slot (null for
 * an empty slot). Each link between two filled neighbours is 'ok' when the
 * second item really follows the first in the chain, 'sai' otherwise, and null
 * while a slot is empty. The first slot must hold the chain's start.
 * @param {Chain} c
 * @param {Array<string | null>} placed
 */
export function checkChain(c, placed) {
  const order = c.items.map((it) => it.id);
  /** @type {Array<'ok' | 'sai' | null>} */
  const links = [];
  for (let i = 0; i < order.length - 1; i++) {
    const a = placed[i];
    const b = placed[i + 1];
    if (!a || !b) links.push(null);
    else links.push(order.indexOf(b) === order.indexOf(a) + 1 ? 'ok' : 'sai');
  }
  const startOk = placed[0] == null ? null : placed[0] === order[0];
  const done = order.every((id, i) => placed[i] === id);
  return { links, startOk, done };
}

/** The ways the energy passes along a chain, without repeats, in order. */
/** @param {Chain} c @returns {HowId[]} */
export function waysUsed(c) {
  /** @type {HowId[]} */
  const out = [];
  for (const l of c.links) if (!out.includes(l.how)) out.push(l.how);
  return out;
}

/**
 * Blowing a toy car. `strength` is 1, 2 or 3 (nhẹ, vừa, mạnh) and `seconds`
 * how long the blow lasts. The energy handed to the car grows with both, so
 * the push is stronger (or lasts longer) and the car rolls farther. Units are
 * made up for the lesson: energy in "phần", distance in centimetres.
 * @param {number} strength @param {number} seconds
 */
export function blow(strength, seconds) {
  const s = Math.min(3, Math.max(1, Math.round(strength)));
  const t = Math.min(3, Math.max(1, Math.round(seconds)));
  const energy = s * t;
  return { force: s, energy, distance: energy * 10 };
}
