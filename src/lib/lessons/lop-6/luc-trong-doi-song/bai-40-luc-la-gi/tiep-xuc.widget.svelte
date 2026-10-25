<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'tiep-xuc', label: 'Lực tiếp xúc' },
    { id: 'khong-tiep-xuc', label: 'Lực không tiếp xúc' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'mo-cua',
        label: 'Tay đẩy cánh cửa mở ra',
        bin: 'tiep-xuc',
        why: 'Bàn tay chạm vào cánh cửa khi đẩy.',
      },
      {
        id: 'da-bong',
        label: 'Chân cầu thủ đá quả bóng',
        bin: 'tiep-xuc',
        why: 'Chân chạm vào quả bóng lúc đá.',
      },
      {
        id: 'bo-keo-xe',
        label: 'Con bò kéo xe',
        bin: 'tiep-xuc',
        why: 'Con bò nối với xe qua ách và càng xe, lực truyền qua chỗ tiếp xúc.',
      },
      {
        id: 'ban-cung',
        label: 'Dây cung đẩy mũi tên bay đi',
        bin: 'tiep-xuc',
        why: 'Dây cung chạm vào đuôi mũi tên khi bật ra.',
      },
      {
        id: 'nam-cham',
        label: 'Nam châm hút đinh sắt đặt cách nó 1 cm',
        bin: 'khong-tiep-xuc',
        why: 'Nam châm chưa chạm vào đinh sắt mà vẫn hút được.',
      },
      {
        id: 'qua-roi',
        label: 'Trái Đất hút quả táo rơi xuống',
        bin: 'khong-tiep-xuc',
        why: 'Quả táo đang rơi không chạm vào mặt đất nhưng vẫn bị Trái Đất hút.',
      },
      {
        id: 'luoc-hut-giay',
        label: 'Thước nhựa cọ xát vào vải hút vụn giấy',
        bin: 'khong-tiep-xuc',
        why: 'Thước nhiễm điện hút vụn giấy từ xa, chưa cần chạm vào.',
      },
      {
        id: 'nam-cham-day',
        label: 'Hai nam châm đẩy nhau khi đưa hai cực cùng tên lại gần',
        bin: 'khong-tiep-xuc',
        why: 'Hai nam châm chưa chạm nhau đã đẩy nhau ra.',
      },
    ],
    40,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các lực vào nhóm lực tiếp xúc hoặc lực không tiếp xúc"
  hintOnWrong
/>
