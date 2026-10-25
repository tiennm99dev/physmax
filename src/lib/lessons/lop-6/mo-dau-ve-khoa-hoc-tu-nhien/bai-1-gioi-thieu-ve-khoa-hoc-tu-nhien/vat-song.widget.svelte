<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'song', label: 'Vật sống' },
    { id: 'khong-song', label: 'Vật không sống' },
  ];

  const LIVING = 'Nó trao đổi chất với môi trường, lớn lên và sinh sản.';
  const CARDS = shuffled(
    [
      { id: 'con-meo', label: 'Con mèo', bin: 'song', why: LIVING },
      { id: 'cay-bang', label: 'Cây bàng', bin: 'song', why: LIVING },
      {
        id: 'vi-khuan',
        label: 'Vi khuẩn',
        bin: 'song',
        why: 'Dù rất nhỏ, vi khuẩn vẫn trao đổi chất, lớn lên và sinh sản.',
      },
      { id: 'nam-rom', label: 'Nấm rơm', bin: 'song', why: LIVING },
      { id: 'con-ca', label: 'Con cá đang bơi', bin: 'song', why: LIVING },
      {
        id: 'hon-da',
        label: 'Hòn đá',
        bin: 'khong-song',
        why: 'Hòn đá không trao đổi chất, không lớn lên, không sinh sản.',
      },
      {
        id: 'quat-dien',
        label: 'Quạt điện đang quay',
        bin: 'khong-song',
        why: 'Quạt chuyển động nhờ điện nhưng không lớn lên, không sinh sản.',
      },
      {
        id: 'o-to',
        label: 'Chiếc ô tô đang chạy',
        bin: 'khong-song',
        why: 'Ô tô chuyển động nhờ động cơ, không tự lớn lên hay sinh sản.',
      },
      {
        id: 'robot',
        label: 'Rô-bốt biết nói',
        bin: 'khong-song',
        why: 'Rô-bốt là máy móc do con người chế tạo, không trao đổi chất hay sinh sản.',
      },
      {
        id: 'ngon-lua',
        label: 'Ngọn lửa bếp',
        bin: 'khong-song',
        why: 'Lửa có thể lan rộng nhưng không phải là cơ thể, không sinh sản.',
      },
    ],
    5,
  );
</script>

<CardSorter cards={CARDS} bins={BINS} label="Phân loại vật sống và vật không sống" />
