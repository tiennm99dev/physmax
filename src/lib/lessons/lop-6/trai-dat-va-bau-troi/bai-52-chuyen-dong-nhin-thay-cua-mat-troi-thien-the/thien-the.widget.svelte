<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'sao', label: 'Sao (tự phát sáng)' },
    { id: 'hanh-tinh', label: 'Hành tinh' },
    { id: 've-tinh', label: 'Vệ tinh tự nhiên' },
    { id: 'khong', label: 'Không phải thiên thể' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'mat-troi',
        label: 'Mặt Trời',
        bin: 'sao',
        why: 'Mặt Trời tự phát ra ánh sáng: nó là một ngôi sao, ngôi sao gần Trái Đất nhất.',
      },
      {
        id: 'bac-cuc',
        label: 'Sao Bắc Cực',
        bin: 'sao',
        why: 'Sao Bắc Cực là một ngôi sao thật, tự phát sáng, ở rất xa Hệ Mặt Trời.',
      },
      {
        id: 'trai-dat',
        label: 'Trái Đất',
        bin: 'hanh-tinh',
        why: 'Trái Đất không tự phát sáng và chuyển động quanh Mặt Trời: nó là một hành tinh.',
      },
      {
        id: 'sao-hom',
        label: 'Sao Hôm (Kim tinh)',
        bin: 'hanh-tinh',
        why: 'Tên gọi có chữ "sao" nhưng Kim tinh không tự phát sáng; nó là hành tinh quay quanh Mặt Trời, sáng lên nhờ phản chiếu ánh sáng Mặt Trời.',
      },
      {
        id: 'hoa-tinh',
        label: 'Hoả tinh',
        bin: 'hanh-tinh',
        why: 'Hoả tinh không tự phát sáng và quay quanh Mặt Trời: nó là một hành tinh.',
      },
      {
        id: 'mat-trang',
        label: 'Mặt Trăng',
        bin: 've-tinh',
        why: 'Mặt Trăng không tự phát sáng và chuyển động quanh Trái Đất: nó là vệ tinh tự nhiên của Trái Đất.',
      },
      {
        id: 'ganymede',
        label: 'Ganymede (quay quanh Mộc tinh)',
        bin: 've-tinh',
        why: 'Ganymede chuyển động quanh hành tinh Mộc tinh, nên là một vệ tinh tự nhiên.',
      },
      {
        id: 'vinasat',
        label: 'Vệ tinh Vinasat-1',
        bin: 'khong',
        why: 'Vinasat-1 do con người chế tạo và phóng lên: đó là vệ tinh nhân tạo, không phải vật thể tự nhiên.',
      },
      {
        id: 'tram',
        label: 'Trạm Vũ trụ Quốc tế',
        bin: 'khong',
        why: 'Trạm vũ trụ do con người xây dựng, không phải vật thể tự nhiên nên không phải thiên thể.',
      },
    ],
    52,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các vật thể vào nhóm sao, hành tinh, vệ tinh tự nhiên, hoặc không phải thiên thể"
  hintOnWrong
/>
