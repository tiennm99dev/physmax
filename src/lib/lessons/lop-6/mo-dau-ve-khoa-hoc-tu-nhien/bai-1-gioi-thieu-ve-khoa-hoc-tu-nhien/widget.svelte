<script>
  import CardSorter from '../_shared/card-sorter.svelte';
  import { shuffled } from '../_shared/sorter.js';

  /** The fields of natural science used in this lesson, Earth and sky together. */
  const BINS = [
    { id: 'vat-li', label: 'Vật lí học' },
    { id: 'hoa-hoc', label: 'Hoá học' },
    { id: 'sinh-hoc', label: 'Sinh học' },
    { id: 'trai-dat', label: 'Khoa học Trái Đất và bầu trời' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'tao-roi',
        label: 'Quả táo chín rơi từ trên cây xuống',
        bin: 'vat-li',
        why: 'Đây là chuyển động của vật do lực hút của Trái Đất.',
      },
      {
        id: 'den-sang',
        label: 'Bóng đèn sáng khi có dòng điện chạy qua',
        bin: 'vat-li',
        why: 'Điện năng biến đổi thành quang năng và nhiệt năng.',
      },
      {
        id: 'nuoc-bay-hoi',
        label: 'Nước trong cốc bay hơi dần',
        bin: 'vat-li',
        why: 'Nước chỉ chuyển từ thể lỏng sang thể hơi, không tạo ra chất mới.',
      },
      {
        id: 'nam-cham',
        label: 'Nam châm hút đinh sắt',
        bin: 'vat-li',
        why: 'Lực từ của nam châm tác dụng lên vật bằng sắt.',
      },
      {
        id: 'dinh-gi',
        label: 'Đinh sắt để lâu ngoài không khí bị gỉ',
        bin: 'hoa-hoc',
        why: 'Sắt biến đổi thành gỉ sắt, một chất mới.',
      },
      {
        id: 'nen-chay',
        label: 'Nến cháy sinh ra khí carbon dioxide',
        bin: 'hoa-hoc',
        why: 'Sự cháy biến đổi chất tạo nến thành chất khác.',
      },
      {
        id: 'giam-sui-bot',
        label: 'Nhỏ giấm vào vỏ trứng thấy sủi bọt khí',
        bin: 'hoa-hoc',
        why: 'Giấm tác dụng với vỏ trứng tạo ra chất khí mới.',
      },
      {
        id: 'hat-nay-mam',
        label: 'Hạt đỗ nảy mầm thành cây con',
        bin: 'sinh-hoc',
        why: 'Sinh trưởng, phát triển là đặc điểm của vật sống.',
      },
      {
        id: 'ga-de-trung',
        label: 'Gà mái đẻ trứng',
        bin: 'sinh-hoc',
        why: 'Sinh sản là đặc điểm của vật sống.',
      },
      {
        id: 'cay-huong-sang',
        label: 'Lá cây hướng về phía có ánh sáng',
        bin: 'sinh-hoc',
        why: 'Cây phản ứng với ánh sáng: đó là cảm ứng của vật sống.',
      },
      {
        id: 'nui-lua',
        label: 'Núi lửa phun trào',
        bin: 'trai-dat',
        why: 'Hiện tượng xảy ra trong lòng và trên bề mặt Trái Đất.',
      },
      {
        id: 'ngay-dem',
        label: 'Ngày và đêm luân phiên nhau',
        bin: 'trai-dat',
        why: 'Do Trái Đất tự quay quanh trục của nó.',
      },
      {
        id: 'nhat-thuc',
        label: 'Nhật thực',
        bin: 'trai-dat',
        why: 'Mặt Trăng che khuất Mặt Trời: hiện tượng của các thiên thể.',
      },
    ],
    11,
  );
</script>

<CardSorter cards={CARDS} bins={BINS} label="Xếp các hiện tượng tự nhiên vào lĩnh vực nghiên cứu" />
