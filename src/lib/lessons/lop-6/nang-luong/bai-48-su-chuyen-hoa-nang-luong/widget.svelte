<script>
  import { onMount } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { budget, rad, startEnergy, swing } from './engine.js';

  const W = 400;
  const H = 230;
  const PIVOT = { x: 200, y: 20 };
  const LEN_PX = 150;
  const DRAG = 0.25;

  let angle = $state(40);
  let air = $state('khong');
  /** @type {import('./engine.js').Swing} */
  let s = $state({ theta: rad(40), omega: 0 });
  let total = $state(startEnergy(40));
  let running = $state(false);
  let reduceMotion = $state(false);

  const drag = $derived(air === 'co' ? DRAG : 0);
  const b = $derived(budget(s, total));
  const bob = $derived({
    x: PIVOT.x + LEN_PX * Math.sin(s.theta),
    y: PIVOT.y + LEN_PX * Math.cos(s.theta),
  });

  onMount(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  $effect(() => {
    if (!running || reduceMotion) return;
    let frame = 0;
    let last = performance.now();
    const tick = (/** @type {number} */ now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s = swing(s, dt, drag);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function release() {
    s = { theta: rad(angle), omega: 0 };
    total = startEnergy(angle);
    running = !reduceMotion;
  }
  function setAngle() {
    running = false;
    s = { theta: rad(angle), omega: 0 };
    total = startEnergy(angle);
  }
  function stepOnce() {
    running = false;
    s = swing(s, 0.1, drag);
  }

  const J = (/** @type {number} */ v) => `${formatFixed(v, 2)} J`;
  const pct = (/** @type {number} */ v) => (total > 0 ? (v / total) * 100 : 0);

  // The live text changes only when the swing moves to another phase, so a
  // screen reader is not flooded while the bob moves; the numbers are in the bars.
  const feedback = $derived.by(() => {
    if (total <= 0) return 'Kéo thanh trượt để nâng quả nặng lên, rồi nhấn "Thả".';
    const k = b.kinetic / total;
    const lost = b.heat / total;
    if (lost > 0.97) {
      return 'Con lắc gần như đã dừng: gần hết năng lượng ban đầu đã chuyển hoá thành nhiệt năng (làm nóng không khí và dây treo). Tổng năng lượng vẫn không đổi.';
    }
    const heatNote =
      lost > 0.02
        ? ' Một phần năng lượng đã chuyển hoá thành nhiệt năng do lực cản không khí, nên con lắc lên thấp dần.'
        : '';
    if (k < 0.03) {
      return `Ở vị trí cao nhất: quả nặng dừng lại trong chốc lát, động năng gần bằng 0, thế năng hấp dẫn lớn nhất.${heatNote}`;
    }
    if (b.potential / total < 0.03) {
      return `Ở vị trí thấp nhất: quả nặng chuyển động nhanh nhất, động năng lớn nhất, thế năng gần bằng 0.${heatNote}`;
    }
    const down = s.theta * s.omega < 0;
    return `${
      down
        ? 'Quả nặng đi xuống: thế năng hấp dẫn đang chuyển hoá thành động năng.'
        : 'Quả nặng đi lên: động năng đang chuyển hoá thành thế năng hấp dẫn.'
    } Tổng các năng lượng luôn bằng năng lượng ban đầu.${heatNote}`;
  });

  const bars = $derived([
    { key: 'dong', label: 'Động năng', value: b.kinetic, color: 'bg-rose-500' },
    { key: 'the', label: 'Thế năng hấp dẫn', value: b.potential, color: 'bg-sky-500' },
    { key: 'nhiet', label: 'Nhiệt năng (do lực cản)', value: b.heat, color: 'bg-amber-500' },
  ]);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Góc kéo lệch ban đầu"
      bind:value={angle}
      min={0}
      max={60}
      step={5}
      unit="°"
      oninput={setAngle}
    />
    <SegmentedControl
      label="Lực cản của không khí"
      options={[
        { value: 'khong', label: 'Bỏ qua' },
        { value: 'co', label: 'Có' },
      ]}
      bind:value={air}
      onchange={setAngle}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Con lắc lệch {formatNumber((s.theta * 180) / Math.PI, 0)} độ. Động năng {J(
        b.kinetic,
      )}, thế năng {J(b.potential)}, nhiệt năng {J(b.heat)}."
    >
      <rect x="140" y="8" width="120" height="12" fill="#94a3b8" />
      <line
        x1={PIVOT.x}
        y1={PIVOT.y}
        x2={PIVOT.x}
        y2={PIVOT.y + LEN_PX + 20}
        stroke="#cbd5e1"
        stroke-dasharray="4 4"
      />
      <!-- lowest point is the zero level of potential energy -->
      <line
        x1="80"
        y1={PIVOT.y + LEN_PX}
        x2="320"
        y2={PIVOT.y + LEN_PX}
        stroke="#94a3b8"
        stroke-dasharray="2 4"
      />
      <text x="322" y={PIVOT.y + LEN_PX + 4} class="fill-slate-500 text-[10px]">mốc thế năng</text>
      <line x1={PIVOT.x} y1={PIVOT.y} x2={bob.x} y2={bob.y} stroke="#334155" stroke-width="2" />
      <circle cx={bob.x} cy={bob.y} r="14" fill="#6366f1" stroke="#312e81" stroke-width="2" />
    </svg>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={release}>Thả</button>
    <button
      type="button"
      class={button.secondary}
      disabled={!running}
      onclick={() => (running = false)}>Dừng</button
    >
    <button type="button" class={button.quiet} onclick={stepOnce}>Tiến 0,1 s</button>
  </div>
  {#if reduceMotion}
    <p class="text-xs text-slate-500">
      Máy của em đang tắt hiệu ứng chuyển động: nhấn "Tiến 0,1 s" để xem con lắc từng bước.
    </p>
  {/if}

  <div class="{card} space-y-2 p-3" aria-label="Thanh năng lượng">
    <div class="flex h-5 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
      {#each bars as bar (bar.key)}
        <div class="{bar.color} h-full" style="width: {pct(bar.value)}%"></div>
      {/each}
    </div>
    {#each bars as bar (bar.key)}
      <div class="flex items-center gap-2 text-sm">
        <span class="h-3 w-3 shrink-0 rounded-sm {bar.color}" aria-hidden="true"></span>
        <span class="flex-1 text-slate-700">{bar.label}</span>
        <span class="font-semibold tabular-nums text-slate-900">{J(bar.value)}</span>
      </div>
    {/each}
    <div class="flex items-center gap-2 border-t border-slate-200 pt-2 text-sm font-bold">
      <span class="flex-1 text-slate-800">Tổng năng lượng</span>
      <span class="tabular-nums text-emerald-700">{J(total)}</span>
    </div>
  </div>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
