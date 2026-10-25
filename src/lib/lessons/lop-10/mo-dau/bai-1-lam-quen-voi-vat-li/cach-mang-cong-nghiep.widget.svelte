<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';

  /** The four industrial revolutions and the physics each one stands on. */
  const REVOLUTIONS = [
    {
      value: 1,
      label: 'Lần 1',
      when: 'Cuối thế kỉ XVIII',
      power: 'Máy hơi nước',
      physics: 'Nhiệt học và cơ học: biến nhiệt năng của hơi nước thành cơ năng.',
      change:
        'Máy móc thay sức người và sức kéo của động vật; tàu hoả, tàu thuỷ chạy bằng hơi nước.',
    },
    {
      value: 2,
      label: 'Lần 2',
      when: 'Cuối thế kỉ XIX – đầu thế kỉ XX',
      power: 'Điện năng',
      physics: 'Điện từ học: cảm ứng điện từ (Faraday), máy phát điện và động cơ điện.',
      change: 'Dây chuyền sản xuất hàng loạt, đèn điện, điện thoại, truyền tải điện đi xa.',
    },
    {
      value: 3,
      label: 'Lần 3',
      when: 'Những năm 1970',
      power: 'Điện tử, máy tính và tự động hoá',
      physics: 'Vật lí chất rắn và bán dẫn: tranzito, vi mạch, laser.',
      change: 'Máy tính, Internet và robot công nghiệp tự động hoá sản xuất.',
    },
    {
      value: 4,
      label: 'Lần 4',
      when: 'Đầu thế kỉ XXI đến nay',
      power: 'Trí tuệ nhân tạo, Internet vạn vật, dữ liệu lớn',
      physics: 'Vật lí lượng tử, vật liệu mới, cảm biến và công nghệ nano.',
      change: 'Máy móc kết nối và tự ra quyết định: nhà máy thông minh, xe tự lái.',
    },
  ];

  let chosen = $state(1);
  const r = $derived(REVOLUTIONS.find((x) => x.value === chosen) ?? REVOLUTIONS[0]);
</script>

<div class="space-y-3">
  <SegmentedControl
    label="Cuộc cách mạng công nghiệp"
    options={REVOLUTIONS.map(({ value, label }) => ({ value, label }))}
    bind:value={chosen}
  />
  <ol class="flex gap-1" aria-hidden="true">
    {#each REVOLUTIONS as x (x.value)}
      <li
        class="h-2 flex-1 rounded-full {x.value <= chosen ? 'bg-indigo-500' : 'bg-slate-200'}"
      ></li>
    {/each}
  </ol>
  <div class="{card} space-y-2 p-4" aria-live="polite">
    <p class="text-sm font-semibold text-indigo-700">{r.when}</p>
    <p class="text-lg font-bold text-slate-900">{r.power}</p>
    <p class="text-slate-700"><span class="font-semibold">Nền tảng vật lí:</span> {r.physics}</p>
    <p class="text-slate-700"><span class="font-semibold">Thay đổi:</span> {r.change}</p>
  </div>
</div>
