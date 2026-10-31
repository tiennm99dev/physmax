<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'co', label: 'Lực có thực hiện công' },
    { id: 'khong', label: 'Lực không thực hiện công' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'dau-tau',
        label: 'Lực kéo của đầu tàu khi đoàn tàu chạy',
        bin: 'co',
        why: 'Đoàn tàu dịch chuyển theo hướng của lực kéo.',
      },
      {
        id: 'gau-nuoc',
        label: 'Lực kéo của người kéo gàu nước từ giếng lên',
        bin: 'co',
        why: 'Gàu nước đi lên, theo hướng của lực kéo.',
      },
      {
        id: 'qua-buoi',
        label: 'Trọng lực tác dụng lên quả bưởi rơi từ trên cây xuống',
        bin: 'co',
        why: 'Quả bưởi dịch chuyển xuống dưới, theo hướng của trọng lực.',
      },
      {
        id: 'xe-nang',
        label: 'Lực nâng của xe nâng khi nâng thùng hàng lên cao',
        bin: 'co',
        why: 'Thùng hàng dịch chuyển lên trên, theo hướng của lực nâng.',
      },
      {
        id: 'luc-si',
        label: 'Lực của lực sĩ đang giữ quả tạ đứng yên trên cao',
        bin: 'khong',
        why: 'Quả tạ không dịch chuyển nên lực không thực hiện công, dù lực sĩ rất mỏi.',
      },
      {
        id: 'day-tuong',
        label: 'Lực đẩy của người đẩy bức tường mà tường không xê dịch',
        bin: 'khong',
        why: 'Bức tường không dịch chuyển, nên quãng đường dịch chuyển bằng 0 và công bằng 0.',
      },
      {
        id: 'bi-lan',
        label: 'Trọng lực tác dụng lên hòn bi lăn trên mặt bàn nằm ngang',
        bin: 'khong',
        why: 'Trọng lực có phương thẳng đứng, vuông góc với phương dịch chuyển nằm ngang của hòn bi, nên không thực hiện công.',
      },
      {
        id: 'mat-ban',
        label: 'Lực đỡ của mặt bàn lên quyển sách nằm yên trên bàn',
        bin: 'khong',
        why: 'Quyển sách đứng yên, không dịch chuyển, nên lực đỡ không thực hiện công.',
      },
    ],
    41,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các trường hợp vào nhóm lực có thực hiện công hoặc không thực hiện công"
  hintOnWrong
/>
