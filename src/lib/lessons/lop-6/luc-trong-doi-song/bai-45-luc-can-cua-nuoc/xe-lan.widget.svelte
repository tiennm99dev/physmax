<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { PLATES, ROLLING, SPEED_MAX, SPEED_MIN, SPEED_STEP, plate, reading } from './engine.js';

  const W = 400;
  const H = 200;
  const BOX_X = 20;
  const BOX_W = 280;
  const RAIL_Y = 70;
  const START = 40;
  const TRAVEL = 180; // pixels the trolley moves along the rail
  const RAIL_M = 0.6; // metres of rail shown
  const PULLEY_X = 320;

  let waterLevel = $state('khong');
  /** @type {import('./engine.js').PlateId} */
  let plateId = $state('nho');
  let speed = $state(0.3);
  let pos = $state(0); // 0..1 along the rail
  let running = $state(false);
  /** @type {null | { balance: number, drag: number }} */
  let last = $state(null);
  /** @type {Array<{ key: string, label: string, value: number }>} */
  let records = $state([]);
  let note = $state('');

  const water = $derived(waterLevel === 'co');
  const p = $derived(plate(plateId));
  const v = $derived(Math.round(speed * 10) / 10);
  const now = $derived(reading(plateId, water, v));
  const shown = $derived(running ? now.balance : 0);

  $effect(() => {
    if (!running) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      pos = 1;
      finish();
      return;
    }
    let frame = 0;
    let prev = performance.now();
    const rate = v / RAIL_M; // fraction of the rail per second
    const tick = (/** @type {number} */ t) => {
      pos = Math.min(1, pos + ((t - prev) / 1000) * rate);
      prev = t;
      if (pos >= 1) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function finish() {
    running = false;
    last = reading(plateId, water, v);
    note = '';
  }
  function pull() {
    pos = 0;
    last = null;
    running = true;
  }
  function changed() {
    running = false;
    pos = 0;
    last = null;
  }
  function record() {
    if (!last) return;
    const key = `${waterLevel}:${plateId}:${v}`;
    const label = `${water ? 'Có nước' : 'Không có nước'}, ${p.name.toLowerCase()}, ${formatNumber(v)} m/s`;
    records = [...records.filter((r) => r.key !== key), { key, label, value: last.balance }];
    note =
      records.length < 2
        ? 'Đã ghi. Hãy đổi một điều kiện (đổ nước vào hộp, thay tấm cản hoặc kéo nhanh hơn) rồi đo lại.'
        : 'So sánh các dòng trong bảng: khi nào lực kế chỉ lớn nhất, khi nào nhỏ nhất?';
  }

  const N = (/** @type {number} */ x) => `${formatFixed(x, 2)} N`;

  const feedback = $derived.by(() => {
    if (running)
      return `Đang kéo xe đều với tốc độ ${formatNumber(v)} m/s: lực kế chỉ ${N(now.balance)}.`;
    if (!last) return 'Nhấn "Kéo xe" để kéo xe lăn chuyển động đều trên ray.';
    if (!water) {
      return `Hộp chưa có nước: lực kế chỉ ${N(last.balance)}, gần như chỉ để thắng lực ma sát của xe lăn (${N(ROLLING)}); lực cản của không khí lên tấm cản rất nhỏ.`;
    }
    return `Có nước: lực kế chỉ ${N(last.balance)}, lớn hơn lúc chưa có nước (${N(ROLLING)}). Phần tăng thêm ${N(last.drag)} là lực cản của nước lên ${p.name.toLowerCase()}.`;
  });

  const trolleyX = $derived(BOX_X + START + pos * TRAVEL);
  const plateH = $derived(plateId === 'nho' ? 36 : 60);
  const springLen = $derived(30 + Math.min(40, shown * 20));
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Hộp nhựa trong suốt"
      options={[
        { value: 'khong', label: 'Chưa có nước' },
        { value: 'co', label: 'Có nước' },
      ]}
      bind:value={waterLevel}
      onchange={changed}
    />
    <SegmentedControl
      label="Tấm cản gắn dưới xe lăn"
      options={PLATES.map((x) => ({ value: x.id, label: x.name.replace('Tấm cản ', '') }))}
      bind:value={plateId}
      onchange={changed}
    />
  </div>

  <SliderField
    label="Tốc độ kéo đều"
    bind:value={speed}
    min={SPEED_MIN}
    max={SPEED_MAX}
    step={SPEED_STEP}
    unit="m/s"
    format={(x) => formatNumber(Math.round(x * 10) / 10)}
    oninput={changed}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label="Xe lăn trên ray, {p.name.toLowerCase()} nhúng vào hộp {water
        ? 'có nước'
        : 'chưa có nước'}. Lực kế chỉ {N(shown)}."
    >
      <!-- box with water -->
      {#if water}
        <rect x={BOX_X} y="96" width={BOX_W} height="90" fill="#bae6fd" />
        <line x1={BOX_X} y1="96" x2={BOX_X + BOX_W} y2="96" stroke="#0284c7" stroke-width="2" />
      {/if}
      <path
        d="M {BOX_X} 60 V 186 H {BOX_X + BOX_W} V 60"
        fill="none"
        stroke="#64748b"
        stroke-width="3"
      />
      <!-- rail -->
      <line x1={BOX_X} y1={RAIL_Y} x2={PULLEY_X} y2={RAIL_Y} stroke="#334155" stroke-width="4" />
      <!-- trolley with plate -->
      <rect x={trolleyX - 30} y={RAIL_Y - 22} width="60" height="14" rx="3" fill="#f59e0b" />
      <circle cx={trolleyX - 18} cy={RAIL_Y - 5} r="5" fill="#334155" />
      <circle cx={trolleyX + 18} cy={RAIL_Y - 5} r="5" fill="#334155" />
      <line
        x1={trolleyX}
        y1={RAIL_Y}
        x2={trolleyX}
        y2={RAIL_Y + 14}
        stroke="#334155"
        stroke-width="3"
      />
      {#if plateId === 'thuon'}
        <path
          d="M {trolleyX - 3} {RAIL_Y + 14} h 6 l 14 {plateH / 2} l -14 {plateH / 2} h -6 Z"
          fill="#a855f7"
          stroke="#581c87"
        />
      {:else}
        <rect
          x={trolleyX - 3}
          y={RAIL_Y + 14}
          width="6"
          height={plateH}
          fill="#a855f7"
          stroke="#581c87"
        />
      {/if}
      <!-- string, pulley and spring balance -->
      <line x1={trolleyX + 30} y1={RAIL_Y - 15} x2={PULLEY_X} y2={RAIL_Y - 15} stroke="#1e293b" />
      <circle cx={PULLEY_X + 8} cy={RAIL_Y - 7} r="8" fill="#e2e8f0" stroke="#334155" />
      <line
        x1={PULLEY_X + 16}
        y1={RAIL_Y - 7}
        x2={PULLEY_X + 16}
        y2={RAIL_Y + 20}
        stroke="#1e293b"
      />
      <polyline
        points="{PULLEY_X + 16},{RAIL_Y + 20} {Array.from(
          { length: 8 },
          (_, i) =>
            `${PULLEY_X + 16 + (i % 2 ? 6 : -6)},${RAIL_Y + 20 + ((i + 0.5) * springLen) / 8}`,
        ).join(' ')} {PULLEY_X + 16},{RAIL_Y + 20 + springLen}"
        fill="none"
        stroke="#334155"
        stroke-width="1.5"
      />
      <rect
        x={PULLEY_X - 10}
        y={RAIL_Y + 20 + springLen}
        width="52"
        height="24"
        rx="5"
        fill="#e0f2fe"
        stroke="#0369a1"
      />
      <text
        x={PULLEY_X + 16}
        y={RAIL_Y + 36 + springLen}
        text-anchor="middle"
        class="fill-sky-900 text-[10px] font-bold">{N(shown)}</text
      >
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Kéo lực kế đều tay: sợi dây vắt qua ròng rọc kéo xe lăn chạy trên ray, tấm cản chuyển động
      trong hộp.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} disabled={running} onclick={pull}>Kéo xe</button>
    <button type="button" class={button.secondary} disabled={!last} onclick={record}
      >Ghi số chỉ</button
    >
  </div>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Số chỉ lực kế khi kéo xe lăn chuyển động đều
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="px-2 py-1">Điều kiện</th>
          <th class="px-2 py-1">Số chỉ lực kế</th>
        </tr>
      </thead>
      <tbody>
        {#each records as r (r.key)}
          <tr class="border-b border-slate-100">
            <td class="px-2 py-1">{r.label}</td>
            <td class="px-2 py-1">{N(r.value)}</td>
          </tr>
        {:else}
          <tr><td colspan="2" class="px-2 py-2 text-slate-500">Chưa ghi số đo nào.</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  {#if note}
    <p class="text-sm text-slate-700" aria-live="polite">{note}</p>
  {/if}
</div>
