<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'guong', label: 'Phản xạ gương (thấy ảnh)' },
    { id: 'khuech-tan', label: 'Phản xạ khuếch tán' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'ho',
        label: 'Mặt hồ phẳng lặng',
        bin: 'guong',
        why: 'Mặt nước yên lặng nhẵn, in rõ hình cây cối bên bờ.',
      },
      {
        id: 'inox',
        label: 'Nồi inox mới đánh bóng',
        bin: 'guong',
        why: 'Bề mặt kim loại nhẵn bóng, soi được mặt mình.',
      },
      {
        id: 'kinh',
        label: 'Mặt kính cửa sổ sạch lúc trời tối',
        bin: 'guong',
        why: 'Mặt kính nhẵn, ban đêm nhìn vào thấy ảnh của căn phòng.',
      },
      {
        id: 'giay',
        label: 'Trang giấy vở',
        bin: 'khuech-tan',
        why: 'Sợi giấy làm bề mặt gồ ghề, ánh sáng bị hắt theo mọi hướng.',
      },
      {
        id: 'tuong',
        label: 'Bức tường quét vôi',
        bin: 'khuech-tan',
        why: 'Lớp vôi sần sùi, không cho ảnh của vật.',
      },
      {
        id: 'ho-gon-song',
        label: 'Mặt hồ gợn sóng khi có gió',
        bin: 'khuech-tan',
        why: 'Sóng làm mặt nước gồ ghề, hình cây cối bị vỡ vụn, không còn ảnh rõ.',
      },
      {
        id: 'vai',
        label: 'Tấm vải bông',
        bin: 'khuech-tan',
        why: 'Sợi vải đan vào nhau tạo bề mặt gồ ghề.',
      },
    ],
    16,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp mỗi bề mặt vào loại phản xạ ánh sáng của nó"
  hintOnWrong
/>
