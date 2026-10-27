<script>
  import { card, focusRing } from '#lib/core/ui.js';
  import CircuitSymbol from '../_shared/circuit-symbol.svelte';

  /** @typedef {import('svelte').ComponentProps<typeof CircuitSymbol>['kind']} SymbolKind */

  /** @type {Array<{ id: string, kind: SymbolKind, closed?: boolean, name: string, use: string }>} */
  const SYMBOLS = [
    {
      id: 'pin',
      kind: 'pin',
      name: 'Nguồn điện (pin)',
      use: 'Vạch dài, mảnh là cực dương (+); vạch ngắn, đậm là cực âm (−). Cung cấp năng lượng điện cho mạch.',
    },
    {
      id: 'bo-pin',
      kind: 'bo-pin',
      name: 'Hai pin mắc nối tiếp',
      use: 'Cực dương của pin này nối với cực âm của pin kia, tạo thành bộ nguồn.',
    },
    {
      id: 'cong-tac-dong',
      kind: 'cong-tac',
      closed: true,
      name: 'Công tắc đóng',
      use: 'Mạch kín, dòng điện chạy qua.',
    },
    {
      id: 'cong-tac-mo',
      kind: 'cong-tac',
      closed: false,
      name: 'Công tắc mở',
      use: 'Mạch hở, không có dòng điện. Công tắc dùng để đóng, ngắt mạch điện.',
    },
    {
      id: 'day',
      kind: 'day',
      name: 'Dây dẫn (dây nối)',
      use: 'Nối các bộ phận của mạch với nhau.',
    },
    {
      id: 'diem-noi',
      kind: 'diem-noi',
      name: 'Chỗ nối hai dây',
      use: 'Dấu chấm đậm ở chỗ các dây dẫn được nối với nhau.',
    },
    { id: 'den', kind: 'den', name: 'Bóng đèn', use: 'Phát sáng khi có dòng điện chạy qua.' },
    {
      id: 'dien-tro',
      kind: 'dien-tro',
      name: 'Điện trở',
      use: 'Linh kiện cản trở dòng điện, dùng để điều chỉnh độ lớn của dòng điện trong mạch.',
    },
    {
      id: 'bien-tro',
      kind: 'bien-tro',
      name: 'Biến trở',
      use: 'Điện trở có thể thay đổi được, dùng để điều chỉnh dòng điện (ví dụ: chỉnh độ sáng của đèn).',
    },
    {
      id: 'chuong',
      kind: 'chuong',
      name: 'Chuông điện',
      use: 'Phát ra âm thanh khi có dòng điện chạy qua.',
    },
    {
      id: 'ampe-ke',
      kind: 'ampe-ke',
      name: 'Ampe kế',
      use: 'Dụng cụ đo cường độ dòng điện (học ở Bài 24).',
    },
    {
      id: 'von-ke',
      kind: 'von-ke',
      name: 'Vôn kế',
      use: 'Dụng cụ đo hiệu điện thế (học ở Bài 24).',
    },
    {
      id: 'diot',
      kind: 'diot',
      name: 'Điốt',
      use: 'Chỉ cho dòng điện đi qua theo một chiều, theo chiều mũi tên của kí hiệu.',
    },
    {
      id: 'led',
      kind: 'led',
      name: 'Điốt phát quang (LED)',
      use: 'Chỉ cho dòng điện đi qua theo một chiều và phát sáng khi có dòng điện chạy qua.',
    },
  ];

  let chosen = $state('pin');
  const info = $derived(SYMBOLS.find((s) => s.id === chosen) ?? SYMBOLS[0]);
</script>

<div class="space-y-3">
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
    {#each SYMBOLS as s (s.id)}
      <button
        type="button"
        class="{card} flex flex-col items-center gap-1 p-2 text-xs font-semibold transition hover:bg-indigo-50 {focusRing} {chosen ===
        s.id
          ? 'ring-2 ring-indigo-500'
          : ''}"
        aria-pressed={chosen === s.id}
        onclick={() => (chosen = s.id)}
      >
        <svg viewBox="-40 -24 80 44" class="h-12 w-full" aria-hidden="true">
          <CircuitSymbol kind={s.kind} closed={s.closed ?? true} len={72} />
        </svg>
        <span class="text-center text-slate-700">{s.name}</span>
      </button>
    {/each}
  </div>
  <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900" aria-live="polite">
    <strong>{info.name}.</strong>
    {info.use}
  </p>
</div>
