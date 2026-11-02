/**
 * Data and pure logic for the history-of-physics lesson: the stages of physics,
 * the milestones on the timeline, the "which came first" duel and the cards
 * sorted into the branches of classical physics.
 */
import { shuffled } from '#lib/core/card-sorter.js';

/** @typedef {'tien' | 'co-dien' | 'hien-dai'} StageId */
/** @typedef {{ id: StageId, label: string, span: string, method: string }} Stage */
/**
 * @typedef {{
 *   id: string,
 *   year: number,
 *   when: string,
 *   who: string,
 *   title: string,
 *   detail: string,
 *   stage: StageId,
 *   crisis?: boolean,
 * }} Milestone
 */
/** @typedef {{ first: Milestone, second: Milestone }} Duel */

/** @type {Stage[]} */
export const STAGES = [
  {
    id: 'tien',
    label: 'Tiền vật lí',
    span: 'Từ thời cổ đại đến trước thế kỉ XVII',
    method: 'Chủ yếu quan sát và suy luận chủ quan, chưa kiểm tra bằng thí nghiệm có hệ thống.',
  },
  {
    id: 'co-dien',
    label: 'Vật lí cổ điển',
    span: 'Từ thế kỉ XVII đến cuối thế kỉ XIX',
    method: 'Phương pháp thực nghiệm kết hợp với toán học để tìm ra các định luật.',
  },
  {
    id: 'hien-dai',
    label: 'Vật lí hiện đại',
    span: 'Từ cuối thế kỉ XIX đến nay',
    method: 'Thực nghiệm và lí thuyết đi sâu vào thế giới vi mô, tốc độ rất lớn và toàn vũ trụ.',
  },
];

/** @type {Milestone[]} */
export const MILESTONES = [
  {
    id: 'aristotle',
    year: -350,
    when: 'Thế kỉ IV TCN',
    who: 'Aristotle',
    title: 'Hệ thống tri thức về tự nhiên',
    detail:
      'Đi từ quan sát cụ thể để khái quát tính chất chung của tự nhiên. Ông cho rằng vật nặng rơi nhanh hơn vật nhẹ, một quan niệm tồn tại gần $2\\,000$ năm.',
    stage: 'tien',
  },
  {
    id: 'archimedes',
    year: -250,
    when: 'Thế kỉ III TCN',
    who: 'Archimedes',
    title: 'Lực đẩy trong chất lỏng và đòn bẩy',
    detail:
      'Lực đẩy Archimedes và quy tắc đòn bẩy sau này thuộc về cơ học chất lưu và cơ học vật rắn.',
    stage: 'tien',
  },
  {
    id: 'copernicus',
    year: 1543,
    when: '1543',
    who: 'Copernicus',
    title: 'Thuyết nhật tâm',
    detail:
      'Đặt Mặt Trời vào trung tâm, Trái Đất và các hành tinh quay quanh nó, mở đường cho Kepler và Newton.',
    stage: 'tien',
  },
  {
    id: 'galilei',
    year: 1609,
    when: '1609',
    who: 'Galilei',
    title: 'Kính thiên văn và phương pháp thực nghiệm',
    detail:
      'Chế tạo kính thiên văn để quan sát bầu trời. Ông xây dựng lí thuyết từ phân tích thí nghiệm và bác bỏ quan niệm vật nặng rơi nhanh hơn vật nhẹ.',
    stage: 'co-dien',
  },
  {
    id: 'kepler',
    year: 1619,
    when: '1609–1619',
    who: 'Kepler',
    title: 'Ba định luật về chuyển động của hành tinh',
    detail: 'Mô tả bằng toán học quỹ đạo các hành tinh, từ số liệu quan sát rất chính xác.',
    stage: 'co-dien',
  },
  {
    id: 'newton',
    year: 1687,
    when: '1687',
    who: 'Newton',
    title: 'Cơ học Newton',
    detail:
      'Ba định luật chuyển động và định luật vạn vật hấp dẫn giải thích cùng lúc chuyển động trên mặt đất và chuyển động của các hành tinh.',
    stage: 'co-dien',
  },
  {
    id: 'watt',
    year: 1769,
    when: '1769',
    who: 'James Watt',
    title: 'Máy hơi nước cải tiến',
    detail:
      'Biến nhiệt thành công cơ học với hiệu suất cao hơn, mở đầu cuộc cách mạng công nghiệp lần thứ nhất và thúc đẩy nhiệt động lực học.',
    stage: 'co-dien',
  },
  {
    id: 'young',
    year: 1801,
    when: '1801',
    who: 'Young',
    title: 'Giao thoa ánh sáng',
    detail: 'Thí nghiệm giao thoa cho thấy ánh sáng có tính chất sóng.',
    stage: 'co-dien',
  },
  {
    id: 'faraday',
    year: 1831,
    when: '1831',
    who: 'Faraday',
    title: 'Cảm ứng điện từ',
    detail:
      'Từ trường biến thiên sinh ra dòng điện. Đây là cơ sở của máy phát điện và cuộc cách mạng công nghiệp lần thứ hai.',
    stage: 'co-dien',
  },
  {
    id: 'maxwell',
    year: 1865,
    when: '1865',
    who: 'Maxwell',
    title: 'Lí thuyết điện từ',
    detail:
      'Trường điện từ lan truyền thành sóng với tốc độ khoảng $300\\,000$ km/s, nên ánh sáng là sóng điện từ. Hertz xác nhận bằng thí nghiệm khoảng 20 năm sau.',
    stage: 'co-dien',
  },
  {
    id: 'rontgen',
    year: 1895,
    when: '1895',
    who: 'Röntgen',
    title: 'Tia X (tia Röntgen)',
    detail: 'Một loại tia đi xuyên qua vật chất mà vật lí đương thời không dự đoán trước.',
    stage: 'hien-dai',
    crisis: true,
  },
  {
    id: 'becquerel',
    year: 1896,
    when: '1896',
    who: 'Becquerel',
    title: 'Hiện tượng phóng xạ',
    detail: 'Muối uranium tự phát ra bức xạ, cho thấy bên trong nguyên tử còn có những biến đổi.',
    stage: 'hien-dai',
    crisis: true,
  },
  {
    id: 'thomson',
    year: 1897,
    when: '1897',
    who: 'J. J. Thomson',
    title: 'Phát hiện electron',
    detail:
      'Làm đổ quan niệm nguyên tử là hạt nhỏ nhất, không thể phân chia được: nguyên tử có cấu trúc bên trong.',
    stage: 'hien-dai',
    crisis: true,
  },
  {
    id: 'planck',
    year: 1900,
    when: '1900',
    who: 'Planck',
    title: 'Thuyết lượng tử năng lượng',
    detail:
      'Năng lượng được phát ra theo từng phần gián đoạn. Giả thuyết này giải thích được bức xạ nhiệt của vật đen, điều vật lí cổ điển không làm được.',
    stage: 'hien-dai',
  },
  {
    id: 'einstein-sr',
    year: 1905,
    when: '1905',
    who: 'Einstein',
    title: 'Thuyết tương đối hẹp',
    detail:
      'Thay đổi cách hiểu về không gian và thời gian khi vật có tốc độ gần tốc độ ánh sáng; dẫn tới hệ thức $E = mc^2$.',
    stage: 'hien-dai',
  },
  {
    id: 'einstein-gr',
    year: 1915,
    when: '1915',
    who: 'Einstein',
    title: 'Thuyết tương đối rộng',
    detail:
      'Mô tả hấp dẫn như độ cong của không thời gian. Hệ thống định vị GPS phải hiệu chỉnh theo thuyết tương đối mới đúng.',
    stage: 'hien-dai',
  },
  {
    id: 'quantum',
    year: 1926,
    when: '1925–1926',
    who: 'Heisenberg, Schrödinger',
    title: 'Cơ học lượng tử',
    detail: 'Lí thuyết mô tả các hạt vi mô, là nền tảng của vật lí nguyên tử, hạt nhân và bán dẫn.',
    stage: 'hien-dai',
  },
  {
    id: 'transistor',
    year: 1947,
    when: '1947',
    who: 'Bardeen, Brattain, Shockley',
    title: 'Transistor',
    detail:
      'Linh kiện bán dẫn đầu tiên thay được đèn điện tử, mở đường cho máy tính và điện thoại.',
    stage: 'hien-dai',
  },
  {
    id: 'laser',
    year: 1960,
    when: '1960',
    who: 'Maiman',
    title: 'Laser đầu tiên',
    detail: 'Nguồn sáng dựa trên bức xạ cảm ứng, ngày nay có mặt từ cáp quang đến dao mổ.',
    stage: 'hien-dai',
  },
  {
    id: 'higgs',
    year: 2012,
    when: '2012',
    who: 'CERN',
    title: 'Xác nhận hạt Higgs',
    detail: 'Máy gia tốc LHC tìm thấy hạt mà lí thuyết đã dự đoán gần 50 năm trước đó.',
    stage: 'hien-dai',
  },
];

/**
 * The stage a year falls in, by the same boundaries the lesson teaches.
 * @param {number} year negative for BC
 * @returns {StageId}
 */
export function stageOfYear(year) {
  if (year < 1600) return 'tien';
  return year < 1895 ? 'co-dien' : 'hien-dai';
}

/**
 * The milestones of one stage, or all of them for 'all', always oldest first.
 * @param {StageId | 'all'} stage
 * @returns {Milestone[]}
 */
export function milestonesIn(stage) {
  const list = stage === 'all' ? MILESTONES : MILESTONES.filter((m) => m.stage === stage);
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Two different milestones from a pool for round `round`, in shuffled order.
 * @param {Milestone[]} pool at least two milestones
 * @param {number} round
 * @returns {Duel}
 */
export function makeDuel(pool, round) {
  const [first, second] = shuffled(pool, round * 7919 + 13);
  return { first, second };
}

/**
 * The round after `round` whose pair differs from the pair shown in `round`.
 * @param {Milestone[]} pool at least three milestones
 * @param {number} round
 * @returns {number}
 */
export function nextRound(pool, round) {
  /** @param {number} r */
  const pair = (r) => {
    const { first, second } = makeDuel(pool, r);
    return [first.id, second.id].sort().join();
  };
  let next = round + 1;
  while (pair(next) === pair(round)) next += 1;
  return next;
}

/**
 * The earlier milestone of a duel.
 * @param {Duel} duel
 * @returns {Milestone}
 */
export function earlierOf(duel) {
  return duel.first.year <= duel.second.year ? duel.first : duel.second;
}

/**
 * The feedback line after the learner picks a milestone of a duel.
 * @param {Duel} duel
 * @param {string} pickedId
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeDuel(duel, pickedId) {
  const early = earlierOf(duel);
  const late = early === duel.first ? duel.second : duel.first;
  const ok = pickedId === early.id;
  const fact = `${early.who}: ${early.title} (${early.when}) có trước ${late.who}: ${late.title} (${late.when}).`;
  return { ok, text: `${ok ? 'Đúng.' : 'Chưa đúng.'} ${fact}` };
}

/** Bins and cards for sorting achievements into the branches of classical physics. */
export const BRANCH_BINS = [
  { id: 'co', label: 'Cơ học' },
  { id: 'nhiet', label: 'Nhiệt học' },
  { id: 'dien-tu', label: 'Điện từ học' },
  { id: 'quang', label: 'Quang học' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const BRANCH_CARDS = [
  {
    id: 'kepler',
    label: 'Ba định luật Kepler',
    bin: 'co',
    why: 'Chuyển động của hành tinh là bài toán của cơ học.',
  },
  {
    id: 'archimedes',
    label: 'Lực đẩy Archimedes',
    bin: 'co',
    why: 'Lực do chất lỏng tác dụng lên vật thuộc cơ học chất lưu.',
  },
  {
    id: 'am',
    label: 'Sóng âm truyền trong không khí',
    bin: 'co',
    why: 'Âm do vật dao động phát ra, truyền nhờ dao động của các phần tử môi trường, nên âm học là một nhánh của cơ học.',
  },
  {
    id: 'may-hoi-nuoc',
    label: 'Máy hơi nước',
    bin: 'nhiet',
    why: 'Máy biến nhiệt thành công, là đối tượng của nhiệt động lực học.',
  },
  {
    id: 'dan-no',
    label: 'Sự dãn nở vì nhiệt',
    bin: 'nhiet',
    why: 'Đây là hiện tượng thuộc nhiệt học.',
  },
  {
    id: 'cam-ung',
    label: 'Cảm ứng điện từ của Faraday',
    bin: 'dien-tu',
    why: 'Từ trường biến thiên sinh ra dòng điện cảm ứng.',
  },
  {
    id: 'may-phat',
    label: 'Máy phát điện',
    bin: 'dien-tu',
    why: 'Máy phát điện hoạt động dựa trên cảm ứng điện từ.',
  },
  {
    id: 'tan-sac',
    label: 'Tán sắc ánh sáng của Newton',
    bin: 'quang',
    why: 'Ánh sáng trắng tách thành nhiều màu là một hiện tượng quang học.',
  },
  {
    id: 'giao-thoa',
    label: 'Giao thoa ánh sáng của Young',
    bin: 'quang',
    why: 'Giao thoa cho thấy ánh sáng có tính chất sóng.',
  },
];
