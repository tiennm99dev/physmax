<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const bins = [
    { id: 'hut', label: 'Bị nam châm hút' },
    { id: 'khong', label: 'Không bị nam châm hút' },
  ];

  const cards = shuffled(
    [
      { id: 'dinh', label: 'Đinh sắt', bin: 'hut', why: 'Sắt là vật liệu từ nên bị nam châm hút.' },
      {
        id: 'ghim',
        label: 'Ghim giấy bằng thép',
        bin: 'hut',
        why: 'Thép (hợp kim của sắt) là vật liệu từ.',
      },
      { id: 'keo', label: 'Lưỡi kéo thép', bin: 'hut', why: 'Lưỡi kéo làm bằng thép nên bị hút.' },
      { id: 'niken', label: 'Miếng niken', bin: 'hut', why: 'Niken là vật liệu từ.' },
      { id: 'coban', label: 'Miếng coban', bin: 'hut', why: 'Coban là vật liệu từ.' },
      {
        id: 'nhom',
        label: 'Thìa nhôm',
        bin: 'khong',
        why: 'Nhôm là kim loại nhưng không phải vật liệu từ, nam châm không hút nhôm.',
      },
      {
        id: 'dong',
        label: 'Dây đồng',
        bin: 'khong',
        why: 'Đồng là kim loại nhưng nam châm không hút đồng.',
      },
      { id: 'nhua', label: 'Thước nhựa', bin: 'khong', why: 'Nhựa không bị nam châm hút.' },
      { id: 'go', label: 'Bút chì gỗ', bin: 'khong', why: 'Gỗ không bị nam châm hút.' },
      {
        id: 'thuytinh',
        label: 'Cốc thủy tinh',
        bin: 'khong',
        why: 'Thủy tinh không bị nam châm hút.',
      },
    ],
    7,
  );
</script>

<CardSorter
  {cards}
  {bins}
  hintOnWrong
  label="Xếp mỗi vật vào nhóm bị nam châm hút hoặc không bị nam châm hút"
/>
