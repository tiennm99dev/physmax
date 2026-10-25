/**
 * The virtual laboratory: situations a pupil might meet in the school lab,
 * each safe or dangerous, and the check of which ones the learner flagged.
 */

/** @typedef {{ id: string, text: string, danger: boolean, why: string }} Situation */

/** @type {Situation[]} */
export const SITUATIONS = [
  {
    id: 'an-uong',
    text: 'Lan vừa làm thí nghiệm vừa ăn bánh, uống nước.',
    danger: true,
    why: 'Hoá chất có thể dính vào thức ăn, nước uống và đi vào cơ thể. Không ăn uống trong phòng thực hành.',
  },
  {
    id: 'bao-ho',
    text: 'Nam đeo kính bảo vệ mắt, găng tay và mặc áo choàng trước khi làm thí nghiệm.',
    danger: false,
    why: 'Đúng quy định: đồ bảo hộ giúp tránh hoá chất bắn vào mắt, dính vào da.',
  },
  {
    id: 'ngui-hoa-chat',
    text: 'Hùng ghé sát mũi vào miệng lọ để ngửi hoá chất.',
    danger: true,
    why: 'Hít trực tiếp hoá chất có thể gây ngộ độc. Không ngửi, không nếm hoá chất.',
  },
  {
    id: 'dua-nghich',
    text: 'Hai bạn chạy đuổi nhau giữa các bàn thí nghiệm.',
    danger: true,
    why: 'Chạy nhảy, đùa nghịch dễ làm đổ vỡ dụng cụ, hoá chất và gây tai nạn.',
  },
  {
    id: 'tu-y',
    text: 'Mai tự lấy hoá chất làm thí nghiệm khi giáo viên chưa vào lớp.',
    danger: true,
    why: 'Chỉ làm thí nghiệm khi có sự hướng dẫn và giám sát của giáo viên.',
  },
  {
    id: 'tay-uot',
    text: 'Tuấn tay còn ướt đã cắm phích điện của đèn vào ổ điện.',
    danger: true,
    why: 'Nước dẫn điện, tay ướt chạm vào thiết bị điện có thể bị điện giật.',
  },
  {
    id: 'bao-vo',
    text: 'Làm vỡ ống nghiệm, Hà báo ngay cho giáo viên và không tự nhặt mảnh vỡ bằng tay.',
    danger: false,
    why: 'Đúng: báo ngay cho giáo viên khi có sự cố; mảnh thuỷ tinh vỡ dễ gây đứt tay.',
  },
  {
    id: 'doc-nhan',
    text: 'Trước khi dùng, Bình đọc kĩ nhãn và kí hiệu cảnh báo trên lọ hoá chất.',
    danger: false,
    why: 'Đúng: nhãn và kí hiệu cho biết hoá chất là gì và nguy hiểm thế nào.',
  },
  {
    id: 'do-bon-rua',
    text: 'Làm xong, Long đổ hết hoá chất thừa vào bồn rửa tay.',
    danger: true,
    why: 'Hoá chất thừa phải được thu gom, xử lí đúng nơi quy định, không đổ bừa vào bồn rửa.',
  },
  {
    id: 'rua-tay',
    text: 'Sau buổi thực hành, Linh dọn dẹp bàn và rửa tay bằng xà phòng.',
    danger: false,
    why: 'Đúng: rửa tay bằng xà phòng sau khi làm việc với hoá chất, mẫu vật.',
  },
];

/**
 * Compare the flagged situations with the dangerous ones.
 * @param {Situation[]} situations @param {Iterable<string>} flagged ids marked dangerous
 */
export function checkFlags(situations, flagged) {
  const set = new Set(flagged);
  const found = situations.filter((s) => s.danger && set.has(s.id)).map((s) => s.id);
  const missed = situations.filter((s) => s.danger && !set.has(s.id)).map((s) => s.id);
  const wrong = situations.filter((s) => !s.danger && set.has(s.id)).map((s) => s.id);
  const dangerous = found.length + missed.length;
  return { found, missed, wrong, dangerous, perfect: missed.length === 0 && wrong.length === 0 };
}
