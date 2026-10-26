<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'tiet-kiem', label: 'Tiết kiệm năng lượng' },
    { id: 'lang-phi', label: 'Lãng phí năng lượng' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'tat-den',
        label: 'Tắt đèn trước khi ra khỏi phòng',
        bin: 'tiet-kiem',
        why: 'Không ai trong phòng thì đèn sáng cũng không có ích.',
      },
      {
        id: 'day-nap',
        label: 'Đậy nắp nồi khi nấu canh',
        bin: 'tiet-kiem',
        why: 'Nắp giữ hơi nóng lại, canh sôi nhanh hơn nên tốn ít gas hơn.',
      },
      {
        id: 'phoi-nang',
        label: 'Phơi quần áo ngoài nắng thay vì dùng máy sấy',
        bin: 'tiet-kiem',
        why: 'Năng lượng Mặt Trời làm khô quần áo, không tốn điện.',
      },
      {
        id: 'xe-dap',
        label: 'Đi xe đạp đến trường gần nhà',
        bin: 'tiet-kiem',
        why: 'Đi xe đạp không đốt xăng, không thải khí gây ô nhiễm.',
      },
      {
        id: 'rut-phich',
        label: 'Rút phích cắm ti vi sau khi xem',
        bin: 'tiet-kiem',
        why: 'Ti vi cắm điện ở chế độ chờ vẫn tiêu thụ một ít điện năng.',
      },
      {
        id: 'den-ban-ngay',
        label: 'Đóng rèm, bật đèn để học giữa trưa nắng',
        bin: 'lang-phi',
        why: 'Ban ngày có thể mở rèm để dùng ánh sáng Mặt Trời miễn phí.',
      },
      {
        id: 'tu-lanh',
        label: 'Mở cửa tủ lạnh thật lâu để chọn đồ ăn',
        bin: 'lang-phi',
        why: 'Hơi lạnh thoát ra ngoài, tủ lạnh phải chạy thêm để làm lạnh lại.',
      },
      {
        id: 'dieu-hoa-cua-mo',
        label: 'Bật điều hoà nhưng để cửa sổ mở',
        bin: 'lang-phi',
        why: 'Hơi lạnh bay ra ngoài, điều hoà chạy mãi mà phòng không mát.',
      },
      {
        id: 'quat-ra-choi',
        label: 'Để quạt lớp học chạy suốt giờ ra chơi',
        bin: 'lang-phi',
        why: 'Ra chơi không ai ngồi trong lớp, quạt chạy là lãng phí điện.',
      },
      {
        id: 'nuoc-nong',
        label: 'Bật bình nóng lạnh từ sáng đến tối',
        bin: 'lang-phi',
        why: 'Bình nóng lạnh có công suất rất lớn; chỉ nên bật ít phút trước khi tắm.',
      },
    ],
    51,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các thói quen vào nhóm tiết kiệm hoặc lãng phí năng lượng"
  hintOnWrong
/>
