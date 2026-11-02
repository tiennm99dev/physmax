<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'cong', label: 'Thực hiện công' },
    { id: 'nhiet', label: 'Truyền nhiệt' },
    { id: 'buc-xa', label: 'Phát ra bức xạ' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'thang-may',
        label: 'Động cơ điện kéo thang máy đi lên',
        bin: 'cong',
        why: 'Lực do động cơ tác dụng làm thang máy dịch chuyển, nên năng lượng được truyền bằng cách thực hiện công.',
      },
      {
        id: 'pit-tong',
        label: 'Khí cháy trong xi-lanh đẩy pít-tông',
        bin: 'cong',
        why: 'Khí đẩy pít-tông dịch chuyển: khí đã thực hiện công lên pít-tông.',
      },
      {
        id: 'am-nuoc',
        label: 'Ngọn lửa bếp đun nóng ấm nước',
        bin: 'nhiet',
        why: 'Nhiệt lượng truyền từ ngọn lửa sang ấm nước, không có lực nào làm vật dịch chuyển.',
      },
      {
        id: 'thia',
        label: 'Thìa kim loại nóng lên trong cốc trà',
        bin: 'nhiet',
        why: 'Nhiệt truyền từ trà nóng sang thìa khi hai vật tiếp xúc.',
      },
      {
        id: 'mat-troi',
        label: 'Mặt Trời sưởi ấm Trái Đất',
        bin: 'buc-xa',
        why: 'Năng lượng đi qua khoảng không vũ trụ dưới dạng ánh sáng và bức xạ nhiệt.',
      },
      {
        id: 'den',
        label: 'Đèn pin chiếu sáng lên bức tường',
        bin: 'buc-xa',
        why: 'Đèn phát ánh sáng, ánh sáng mang năng lượng tới bức tường.',
      },
    ],
    23,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp mỗi quá trình vào cách truyền năng lượng"
  hintOnWrong
/>
