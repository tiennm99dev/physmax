export const site = {
  title: 'PhysMax',
  repo: 'https://github.com/tiennm99dev/physmax',
  tagline: 'Vật lí tương tác cho học sinh lớp 6-12',
  description:
    'PhysMax giúp học sinh lớp 6-12 học Vật lí theo sách Kết nối tri thức với cuộc sống qua thí nghiệm ảo: kéo lực, đo chuyển động, lắp mạch điện và dò tia sáng.',
};

export const home = {
  gradesTitle: 'Chọn lớp',
  strandsTitle: 'Học theo mạch kiến thức',
  /** @param {number} chapters @param {number} lessons */
  gradeSummary: (chapters, lessons) => `${chapters} chương · ${lessons} bài`,
};

/**
 * School levels on the home page, each with its grade range. Grades 6-9 follow
 * the physics strand of the Khoa học tự nhiên book.
 */
export const levels = [
  { title: 'Trung học cơ sở (Khoa học tự nhiên)', from: 6, to: 9 },
  { title: 'Trung học phổ thông', from: 10, to: 12 },
];

/** @type {Record<string, string>} */
export const grades = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [`lop-${i + 1}`, `Lớp ${i + 1}`]),
);

/** @type {Record<import('#lib/curriculum/index.js').LessonKind, string>} */
export const kinds = {
  theory: 'Lý thuyết',
  practice: 'Luyện tập',
  review: 'Ôn tập',
  activity: 'Hoạt động',
  'chuyen-de': 'Chuyên đề',
};

/**
 * Strand hubs across grades, keyed by the curriculum `strand` slug.
 * @type {Record<string, { title: string, blurb: string }>}
 */
export const strands = {
  'mo-dau-do-luong': {
    title: 'Mở đầu và đo lường',
    blurb: 'Phương pháp học vật lí, an toàn thí nghiệm, đo lường và sai số.',
  },
  'co-hoc': {
    title: 'Cơ học',
    blurb: 'Chuyển động, lực, định luật Newton, động lượng, áp suất và biến dạng.',
  },
  'nang-luong': {
    title: 'Năng lượng',
    blurb: 'Các dạng năng lượng, công, công suất và bảo toàn năng lượng.',
  },
  'thien-van': {
    title: 'Trái Đất và bầu trời',
    blurb: 'Chuyển động nhìn thấy của Mặt Trời, Mặt Trăng và hệ Mặt Trời.',
  },
  'am-hoc': { title: 'Âm học', blurb: 'Sự truyền âm, độ cao, độ to và phản xạ âm.' },
  'quang-hoc': {
    title: 'Quang học',
    blurb: 'Ánh sáng, phản xạ, khúc xạ, gương, lăng kính và thấu kính.',
  },
  'tu-hoc': {
    title: 'Từ học',
    blurb: 'Nam châm, từ trường, cảm ứng điện từ và lực từ.',
  },
  'dien-hoc': {
    title: 'Điện học',
    blurb: 'Điện tích, điện trường, dòng điện, mạch điện và định luật Ohm.',
  },
  'nhiet-hoc': {
    title: 'Nhiệt học',
    blurb: 'Nhiệt độ, nội năng, truyền nhiệt và khí lí tưởng.',
  },
  'dao-dong-song': {
    title: 'Dao động và sóng',
    blurb: 'Dao động điều hoà, sóng cơ, sóng dừng và sóng điện từ.',
  },
  'vat-li-hat-nhan': {
    title: 'Vật lí hạt nhân',
    blurb: 'Cấu trúc hạt nhân, phóng xạ, phân hạch và nhiệt hạch.',
  },
  'chuyen-de': {
    title: 'Chuyên đề học tập',
    blurb: 'Các chuyên đề Vật lí 10, 11, 12 mở rộng theo hướng nghề nghiệp và ứng dụng.',
  },
};
