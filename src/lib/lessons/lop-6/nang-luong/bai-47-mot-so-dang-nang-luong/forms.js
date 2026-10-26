/**
 * The forms of energy in the lesson, and everyday things sorted by the form
 * of energy they mainly show.
 */

/** @type {import('#lib/core/card-sorter.js').SortBin[]} */
export const FORMS = [
  { id: 'dong-nang', label: 'Động năng' },
  { id: 'the-nang-hd', label: 'Thế năng hấp dẫn' },
  { id: 'the-nang-dh', label: 'Thế năng đàn hồi' },
  { id: 'nhiet-nang', label: 'Nhiệt năng' },
  { id: 'dien-nang', label: 'Điện năng' },
  { id: 'quang-nang', label: 'Quang năng' },
  { id: 'am', label: 'Năng lượng âm' },
  { id: 'hoa-hoc', label: 'Năng lượng hoá học' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const CARDS = [
  {
    id: 'o-to',
    label: 'Ô tô đang chạy trên đường',
    bin: 'dong-nang',
    why: 'Vật đang chuyển động có động năng.',
  },
  {
    id: 'canh-quat',
    label: 'Cánh quạt đang quay',
    bin: 'dong-nang',
    why: 'Cánh quạt chuyển động nên có động năng.',
  },
  {
    id: 'sach-gia',
    label: 'Quyển sách đặt trên giá cao',
    bin: 'the-nang-hd',
    why: 'Vật ở trên cao so với mặt đất có thế năng hấp dẫn, kể cả khi đứng yên.',
  },
  {
    id: 'ho-thuy-dien',
    label: 'Nước trong hồ chứa của đập thuỷ điện',
    bin: 'the-nang-hd',
    why: 'Nước được giữ ở trên cao nên có thế năng hấp dẫn.',
  },
  {
    id: 'cung',
    label: 'Dây cung đang bị kéo căng',
    bin: 'the-nang-dh',
    why: 'Vật bị biến dạng đàn hồi (dây cung căng) có thế năng đàn hồi.',
  },
  {
    id: 'lo-xo',
    label: 'Lò xo bị nén trong bút bi',
    bin: 'the-nang-dh',
    why: 'Lò xo bị nén có thế năng đàn hồi.',
  },
  {
    id: 'nuoc-soi',
    label: 'Nồi nước đang sôi',
    bin: 'nhiet-nang',
    why: 'Vật nóng có nhiệt năng; vật càng nóng thì nhiệt năng càng lớn.',
  },
  {
    id: 'o-cam',
    label: 'Dòng điện từ ổ cắm chạy vào tivi',
    bin: 'dien-nang',
    why: 'Năng lượng của dòng điện là điện năng.',
  },
  {
    id: 'nang',
    label: 'Ánh nắng Mặt Trời',
    bin: 'quang-nang',
    why: 'Năng lượng của ánh sáng là quang năng.',
  },
  {
    id: 'den-pin',
    label: 'Chùm sáng của đèn pin',
    bin: 'quang-nang',
    why: 'Ánh sáng do nguồn sáng phát ra mang quang năng.',
  },
  {
    id: 'trong',
    label: 'Tiếng trống trường',
    bin: 'am',
    why: 'Âm thanh lan truyền từ nguồn âm mang năng lượng âm.',
  },
  {
    id: 'que-diem',
    label: 'Que diêm chưa quẹt',
    bin: 'hoa-hoc',
    why: 'Năng lượng dự trữ trong thuốc đầu que diêm, giải phóng qua phản ứng cháy, là năng lượng hoá học.',
  },
  {
    id: 'banh-mi',
    label: 'Ổ bánh mì',
    bin: 'hoa-hoc',
    why: 'Thức ăn dự trữ năng lượng hoá học, cơ thể dùng nó để hoạt động.',
  },
  {
    id: 'pin',
    label: 'Viên pin mới chưa dùng',
    bin: 'hoa-hoc',
    why: 'Pin dự trữ năng lượng hoá học; khi dùng, nó tạo ra dòng điện.',
  },
];
