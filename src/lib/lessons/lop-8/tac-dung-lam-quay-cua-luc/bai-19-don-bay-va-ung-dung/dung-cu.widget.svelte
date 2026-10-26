<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'loai-1', label: 'Loại 1: điểm tựa ở giữa' },
    { id: 'loai-2', label: 'Loại 2: vật ở giữa' },
    { id: 'loai-3', label: 'Loại 3: lực tác dụng ở giữa' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'keo',
        label: 'Kéo cắt giấy',
        bin: 'loai-1',
        why: 'Điểm tựa là đinh ốc nối hai lưỡi kéo, nằm giữa tay cầm (lực tác dụng) và tờ giấy (vật).',
      },
      {
        id: 'bap-benh',
        label: 'Bập bênh',
        bin: 'loai-1',
        why: 'Trục bập bênh là điểm tựa, nằm giữa hai bạn ngồi ở hai đầu.',
      },
      {
        id: 'bua-nho-dinh',
        label: 'Búa nhổ đinh',
        bin: 'loai-1',
        why: 'Điểm tựa là chỗ đầu búa tì lên mặt gỗ, nằm giữa cây đinh và tay cầm cán búa.',
      },
      {
        id: 'kim',
        label: 'Kìm cắt dây thép',
        bin: 'loai-1',
        why: 'Điểm tựa là chốt kìm, nằm giữa tay cầm và sợi dây bị cắt.',
      },
      {
        id: 'mo-nap-chai',
        label: 'Cái mở nắp chai',
        bin: 'loai-2',
        why: 'Điểm tựa là chỗ tì lên đỉnh nắp, mép nắp (vật) ở giữa, tay nâng ở đầu kia, xa điểm tựa nhất: được lợi về lực.',
      },
      {
        id: 'cut-kit',
        label: 'Xe cút kít',
        bin: 'loai-2',
        why: 'Trục bánh xe là điểm tựa, thùng hàng ở giữa, tay nâng ở đầu càng xe: được lợi về lực.',
      },
      {
        id: 'kep-hat',
        label: 'Dụng cụ kẹp vỡ hạt óc chó',
        bin: 'loai-2',
        why: 'Điểm tựa là bản lề ở một đầu, hạt (vật) ở giữa, tay bóp ở đầu kia: được lợi về lực.',
      },
      {
        id: 'dua',
        label: 'Đôi đũa gắp thức ăn',
        bin: 'loai-3',
        why: 'Điểm tựa ở đầu đũa trong lòng bàn tay, ngón tay đặt lực ở giữa, thức ăn ở đầu đũa: không lợi về lực nhưng gắp nhanh, gọn.',
      },
      {
        id: 'can-cau',
        label: 'Cần câu cá',
        bin: 'loai-3',
        why: 'Tay giữ cuối cán là điểm tựa, tay kia đặt lực ở giữa cần, con cá ở đầu cần: không lợi về lực nhưng con cá được nhấc lên nhanh.',
      },
      {
        id: 'kep-gap',
        label: 'Cái kẹp gắp than',
        bin: 'loai-3',
        why: 'Điểm tựa là chỗ nối hai càng kẹp, tay bóp ở giữa, viên than ở đầu kẹp: không lợi về lực.',
      },
    ],
    19,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các dụng cụ đời thường theo loại đòn bẩy"
  hintOnWrong
/>
