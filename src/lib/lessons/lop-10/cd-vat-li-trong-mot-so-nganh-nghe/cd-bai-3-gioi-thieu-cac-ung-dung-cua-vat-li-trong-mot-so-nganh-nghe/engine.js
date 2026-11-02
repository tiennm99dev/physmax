/**
 * Data and pure logic for the physics-in-careers lesson: the flip cards that
 * link a job to the physics it uses, and the suggestions from a learner's
 * interests.
 */

/**
 * @typedef {{
 *   id: string,
 *   sector: string,
 *   job: string,
 *   task: string,
 *   options: string[],
 *   answer: number,
 *   why: string,
 * }} Career
 */
/** @typedef {{ id: string, label: string, careers: string[] }} Interest */
/** @typedef {{ id: string, sector: string, job: string, study: string, reasons: string[] }} Suggestion */

/** @type {Career[]} */
export const CAREERS = [
  {
    id: 'quan-su',
    sector: 'Quân sự',
    job: 'Kĩ sư vũ khí',
    task: 'Máy bắn đá thời xưa ném được hòn đá nặng đi rất xa bằng một đối trọng và cánh tay dài.',
    options: ['Nguyên lí đòn bẩy', 'Lực đẩy Archimedes', 'Cảm ứng điện từ'],
    answer: 0,
    why: 'Đối trọng ở cánh tay ngắn làm đầu cánh tay dài chuyển động nhanh hơn nhiều: đó là đòn bẩy. Cung tên dùng lực đàn hồi; máy bay phản lực dựa trên bảo toàn động lượng.',
  },
  {
    id: 'hat-nhan',
    sector: 'Công nghiệp hạt nhân',
    job: 'Kĩ sư nhà máy điện hạt nhân',
    task: 'Một lượng nhiên liệu nhỏ trong lò phản ứng tạo ra năng lượng rất lớn để chạy máy phát điện.',
    options: [
      'Đốt cháy nhiên liệu trong không khí',
      'Phản ứng phân hạch hạt nhân',
      'Hiện tượng quang điện',
    ],
    answer: 1,
    why: 'Khi hạt nhân uranium phân hạch, một phần khối lượng chuyển thành năng lượng theo $E = mc^2$. Năng lượng đó đun nóng nước, tạo hơi quay tua-bin.',
  },
  {
    id: 'nang-luong',
    sector: 'Năng lượng',
    job: 'Kĩ sư điện mặt trời',
    task: 'Các tấm pin trên mái nhà biến ánh sáng thành dòng điện mà không có bộ phận chuyển động.',
    options: [
      'Sự dãn nở vì nhiệt',
      'Hiện tượng phóng xạ',
      'Hiệu ứng quang điện trong chất bán dẫn',
    ],
    answer: 2,
    why: 'Ánh sáng giải phóng các hạt mang điện trong lớp bán dẫn của pin, tạo thành dòng điện.',
  },
  {
    id: 'y-te',
    sector: 'Y tế',
    job: 'Bác sĩ chẩn đoán hình ảnh',
    task: 'Ảnh X-quang cho thấy rõ xương gãy mà không cần phẫu thuật.',
    options: [
      'Tia X bị xương hấp thụ nhiều hơn mô mềm',
      'Tia X làm xương phát sáng trong tối',
      'Xương phản xạ sóng âm về phim',
    ],
    answer: 0,
    why: 'Tia X có khả năng đâm xuyên, và bị xương hấp thụ mạnh hơn mô mềm, nên hình xương hiện rõ.',
  },
  {
    id: 'giao-thong',
    sector: 'Giao thông',
    job: 'Kĩ sư cầu đường',
    task: 'Mặt đường ở khúc cua được làm nghiêng vào phía trong để xe đi an toàn hơn.',
    options: [
      'Để tăng khối lượng của xe',
      'Để giảm trọng lực tác dụng lên xe',
      'Để hợp lực góp phần tạo lực hướng tâm',
    ],
    answer: 2,
    why: 'Xe đi trên đường cong cần lực hướng tâm. Trên mặt đường nghiêng, phản lực của mặt đường có thành phần hướng vào tâm cung đường.',
  },
  {
    id: 'dien-tu',
    sector: 'Kĩ thuật điện tử',
    job: 'Kĩ sư thiết kế chip',
    task: 'Hàng tỉ công tắc siêu nhỏ trong một con chip xử lí thông tin rất nhanh.',
    options: [
      'Bánh răng siêu nhỏ',
      'Transistor bán dẫn đóng, ngắt dòng điện',
      'Rơ-le chứa nam châm vĩnh cửu',
    ],
    answer: 1,
    why: 'Transistor là linh kiện bán dẫn đóng, ngắt được dòng điện. Vật lí bán dẫn cũng tạo ra LED, photodiode và diode laser.',
  },
  {
    id: 'co-khi',
    sector: 'Cơ khí, tự động hoá',
    job: 'Kĩ sư cơ điện tử',
    task: 'Cánh tay robot trên dây chuyền tự dừng khi có vật cản ở phía trước.',
    options: [
      'Cảm biến đổi đại lượng vật lí thành tín hiệu điện để điều khiển',
      'Trọng lực kéo cánh tay về vị trí cũ',
      'Không khí đẩy cánh tay lùi lại',
    ],
    answer: 0,
    why: 'Cảm biến khoảng cách cho tín hiệu điện, bộ điều khiển dùng tín hiệu đó để dừng động cơ. Đây là tự động hoá có phản hồi.',
  },
  {
    id: 'thong-tin',
    sector: 'Thông tin, truyền thông',
    job: 'Kĩ sư viễn thông',
    task: 'Điện thoại thông minh liên lạc với trạm thu phát ở cách xa mà không cần dây nối.',
    options: [
      'Sóng âm truyền trong không khí',
      'Dòng điện chạy trong không khí',
      'Sóng điện từ, cụ thể là sóng vô tuyến',
    ],
    answer: 2,
    why: 'Vật lí vô tuyến nghiên cứu dao động điện từ và sóng vô tuyến để thiết kế bộ thu phát. Định vị GPS và mạng không dây cũng dùng sóng này.',
  },
  {
    id: 'khi-tuong',
    sector: 'Khí tượng, thuỷ văn',
    job: 'Dự báo viên khí tượng',
    task: 'Bản tin dự báo đường đi của cơn bão trong những ngày tới.',
    options: [
      'Dựa vào số liệu của năm trước, không cần tính toán',
      'Mô hình vật lí – toán học chạy trên siêu máy tính',
      'Đo lực đẩy Archimedes của từng đám mây',
    ],
    answer: 1,
    why: 'Khí quyển tuân theo các định luật của cơ học chất lưu và nhiệt học. Siêu máy tính giải các mô hình đó với dữ liệu từ vệ tinh, radar và trạm đo.',
  },
  {
    id: 'nong-nghiep',
    sector: 'Nông nghiệp',
    job: 'Kĩ sư nông nghiệp công nghệ cao',
    task: 'Trái cây sau khi chiếu xạ giữ được lâu hơn mà không cần thêm chất bảo quản.',
    options: [
      'Bức xạ tiêu diệt vi sinh vật và làm chậm chín',
      'Bức xạ làm trái cây lạnh đi',
      'Bức xạ bơm thêm nước vào trái cây',
    ],
    answer: 0,
    why: 'Chiếu xạ tiêu diệt vi sinh vật, làm chậm mọc mầm và chín hỏng. Chiếu xạ cũng giúp tạo giống cây trồng mới.',
  },
  {
    id: 'lam-nghiep',
    sector: 'Lâm nghiệp',
    job: 'Kĩ sư lâm nghiệp',
    task: 'Hệ thống tự động cảnh báo nguy cơ cháy rừng và theo dõi diện tích rừng từ xa.',
    options: [
      'Con người đi tuần là cách duy nhất',
      'Đo trọng lượng của từng cây',
      'Cảm biến nhiệt độ, độ ẩm, gió và ảnh viễn thám từ vệ tinh',
    ],
    answer: 2,
    why: 'Cảm biến đo nhiệt độ, độ ẩm, tốc độ gió để cảnh báo cháy. Viễn thám dùng bức xạ điện từ từ mặt đất để lập ảnh rừng từ vệ tinh.',
  },
  {
    id: 'tai-chinh',
    sector: 'Tài chính, kinh tế',
    job: 'Chuyên viên phân tích dữ liệu tài chính',
    task: 'Dự báo trao đổi thương mại giữa hai nước theo quy mô kinh tế và khoảng cách giữa chúng.',
    options: [
      'Định luật khúc xạ ánh sáng',
      'Mô hình có dạng công thức lực hấp dẫn',
      'Định luật về cảm ứng từ',
    ],
    answer: 1,
    why: 'Mô hình lực hấp dẫn trong kinh tế có dạng giống định luật vạn vật hấp dẫn: quy mô kinh tế đóng vai trò như khối lượng. Các nhà vật lí còn áp dụng phương pháp của cơ học thống kê vào tài chính.',
  },
];

/** @type {Interest[]} */
export const INTERESTS = [
  {
    id: 'lap-rap',
    label: 'Thích tháo lắp máy móc, làm mô hình',
    careers: ['co-khi', 'giao-thong', 'quan-su'],
  },
  {
    id: 'lap-trinh',
    label: 'Thích lập trình và mạch điện tử',
    careers: ['dien-tu', 'co-khi', 'thong-tin'],
  },
  {
    id: 'cham-soc',
    label: 'Muốn chăm sóc sức khoẻ con người',
    careers: ['y-te', 'nong-nghiep'],
  },
  {
    id: 'moi-truong',
    label: 'Quan tâm đến thiên nhiên và môi trường',
    careers: ['khi-tuong', 'lam-nghiep', 'nong-nghiep', 'nang-luong'],
  },
  {
    id: 'so-lieu',
    label: 'Thích làm việc với số liệu và mô hình toán',
    careers: ['tai-chinh', 'khi-tuong'],
  },
  {
    id: 'cong-trinh',
    label: 'Muốn góp phần vào những công trình lớn',
    careers: ['hat-nhan', 'nang-luong', 'giao-thong'],
  },
];

/** What to focus on in physics for each sector. @type {Record<string, string>} */
const STUDY = {
  'quan-su': 'cơ học, vật liệu, động lượng',
  'hat-nhan': 'vật lí hạt nhân, nhiệt học',
  'nang-luong': 'chất bán dẫn, điện học',
  'y-te': 'các loại bức xạ, sóng âm, từ trường',
  'giao-thong': 'động lực học, chuyển động tròn',
  'dien-tu': 'điện học, chất bán dẫn',
  'co-khi': 'cơ học, cảm biến, điều khiển',
  'thong-tin': 'dao động, sóng điện từ',
  'khi-tuong': 'nhiệt học, cơ học chất lưu',
  'nong-nghiep': 'bức xạ, nhiệt học, cảm biến',
  'lam-nghiep': 'sóng điện từ, cảm biến',
  'tai-chinh': 'cơ học thống kê, mô hình toán học',
};

/**
 * The careers matching the chosen interests, the most matches first; ties keep
 * the order of `CAREERS`.
 * @param {string[]} chosen interest ids
 * @param {number} [limit]
 * @returns {Suggestion[]}
 */
export function suggest(chosen, limit = 3) {
  const picked = INTERESTS.filter((i) => chosen.includes(i.id));
  return CAREERS.map((c) => ({
    id: c.id,
    sector: c.sector,
    job: c.job,
    study: STUDY[c.id],
    reasons: picked.filter((i) => i.careers.includes(c.id)).map((i) => i.label),
  }))
    .filter((s) => s.reasons.length > 0)
    .sort((a, b) => b.reasons.length - a.reasons.length)
    .slice(0, limit);
}

/**
 * Whether this option is the physics a career uses.
 * @param {Career} career @param {number} option
 */
export function isRight(career, option) {
  return career.answer === option;
}

/**
 * Tallies the flipped cards.
 * @param {Record<string, number>} guesses option index by career id
 * @returns {{ flipped: number, right: number }}
 */
export function tally(guesses) {
  let right = 0;
  let flipped = 0;
  for (const career of CAREERS) {
    const guess = guesses[career.id];
    if (guess === undefined) continue;
    flipped += 1;
    if (isRight(career, guess)) right += 1;
  }
  return { flipped, right };
}
