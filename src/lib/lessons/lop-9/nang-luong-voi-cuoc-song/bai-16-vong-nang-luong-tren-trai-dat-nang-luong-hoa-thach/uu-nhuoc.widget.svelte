<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'uu', label: 'Ưu điểm' },
    { id: 'nhuoc', label: 'Nhược điểm' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'san-co',
        label: 'Có sẵn và khai thác được với khối lượng lớn',
        bin: 'uu',
        why: 'Trữ lượng tập trung trong các mỏ nên có thể khai thác với khối lượng lớn.',
      },
      {
        id: 'van-chuyen',
        label: 'Dễ vận chuyển và tích trữ',
        bin: 'uu',
        why: 'Than, xăng dầu và khí có thể chở đi xa rồi cất trong kho, bể chứa để dùng khi cần.',
      },
      {
        id: 'cong-nghe',
        label: 'Công nghệ khai thác, sử dụng phổ biến',
        bin: 'uu',
        why: 'Động cơ, nhà máy nhiệt điện dùng nhiên liệu hoá thạch đã rất phổ biến nên chi phí thấp.',
      },
      {
        id: 'nang-suat',
        label: 'Không phụ thuộc thời tiết, dùng được cả ngày lẫn đêm',
        bin: 'uu',
        why: 'Nhiên liệu đã tích trữ có thể đốt bất cứ lúc nào, không cần chờ nắng hay gió.',
      },
      {
        id: 'nha-kinh',
        label: 'Khi đốt thải khí gây hiệu ứng nhà kính',
        bin: 'nhuoc',
        why: 'Khí carbon dioxide thải ra làm tăng hiệu ứng nhà kính, góp phần gây biến đổi khí hậu.',
      },
      {
        id: 'o-nhiem',
        label: 'Gây ô nhiễm môi trường, hại sức khoẻ',
        bin: 'nhuoc',
        why: 'Bụi và các khí như CO, SO₂, NO₂ làm ô nhiễm không khí, gây bệnh đường hô hấp.',
      },
      {
        id: 'he-sinh-thai',
        label: 'Khai thác làm thay đổi hệ sinh thái',
        bin: 'nhuoc',
        why: 'Mở mỏ phá vỡ mặt đất và rừng; sự cố tràn dầu làm hại sinh vật biển.',
      },
      {
        id: 'can-kiet',
        label: 'Hình thành rất lâu, dùng hết thì không bù lại kịp',
        bin: 'nhuoc',
        why: 'Phải mất hàng triệu năm mới hình thành, nên nhiên liệu hoá thạch sẽ cạn dần.',
      },
    ],
    16,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp đặc điểm của nhiên liệu hoá thạch vào ô ưu điểm hoặc nhược điểm"
  hintOnWrong
/>
