<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'phan-luc', label: 'Cặp lực và phản lực (đặt vào hai vật)' },
    { id: 'can-bang', label: 'Cặp lực cân bằng (đặt vào một vật)' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'sach-ban',
        label: 'Sách đè lên bàn và bàn đẩy lại sách',
        bin: 'phan-luc',
        why: 'Một lực đặt vào bàn, một lực đặt vào sách: hai vật tương tác với nhau.',
      },
      {
        id: 'dat-sach',
        label: 'Trái Đất hút sách và sách hút Trái Đất',
        bin: 'phan-luc',
        why: 'Một lực đặt vào sách, một lực đặt vào Trái Đất.',
      },
      {
        id: 'p-n',
        label: 'Trọng lực của sách và lực nâng của bàn lên sách',
        bin: 'can-bang',
        why: 'Cả hai đều đặt vào sách, và sách đứng yên nên chúng cân bằng.',
      },
      {
        id: 'chan-dat',
        label: 'Chân đạp đất về sau và đất đẩy chân về trước',
        bin: 'phan-luc',
        why: 'Một lực đặt vào đất, một lực đặt vào chân.',
      },
      {
        id: 'den-day',
        label: 'Trọng lực của đèn treo và lực căng dây lên đèn',
        bin: 'can-bang',
        why: 'Cả hai đều đặt vào đèn đang đứng yên.',
      },
      {
        id: 'bua-dinh',
        label: 'Búa đập vào đinh và đinh đập lại búa',
        bin: 'phan-luc',
        why: 'Một lực đặt vào đinh, một lực đặt vào búa.',
      },
      {
        id: 'o-to',
        label: 'Lực kéo và lực cản lên ô tô chạy thẳng đều',
        bin: 'can-bang',
        why: 'Cả hai đều đặt vào ô tô, và xe không có gia tốc.',
      },
    ],
    16,
  );
</script>

<CardSorter cards={CARDS} bins={BINS} label="Phân loại các cặp lực" hintOnWrong />
