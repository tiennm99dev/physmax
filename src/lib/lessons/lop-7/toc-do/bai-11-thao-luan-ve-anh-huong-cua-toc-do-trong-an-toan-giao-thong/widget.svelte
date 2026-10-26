<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { DRIVERS, ROADS, outcome, safeGap, stopping, travelledAt } from './engine.js';

  const VW = 480;
  const X0 = 20;
  const X1 = 464;
  /** Length of road drawn (m). */
  const ROAD_M = 220;
  const X = (/** @type {number} */ m) => X0 + ((X1 - X0) * Math.min(m, ROAD_M)) / ROAD_M;

  let kmh = $state(60);
  let gap = $state(40);
  let roadId = $state('kho');
  let driverId = $state('tinh-tao');
  /** Seconds since the obstacle appeared, or null when idle. */
  let clock = $state(/** @type {number | null} */ (null));
  /** @typedef {{ kmh: number, road: string, driver: string, think: number, brake: number, total: number, gap: number, hit: boolean, impact: number }} Trial */
  let trials = $state(/** @type {Trial[]} */ ([]));

  const road = $derived(ROADS.find((r) => r.id === roadId) ?? ROADS[0]);
  const driver = $derived(DRIVERS.find((d) => d.id === driverId) ?? DRIVERS[0]);
  const stop = $derived(stopping(kmh, driver.time, road.decel));
  const end = $derived(outcome(kmh, driver.time, road.decel, gap));
  const running = $derived(clock !== null && clock < stop.time);
  /** Where the car's front is (m). Before a run it waits at 0. */
  const pos = $derived.by(() => {
    if (clock === null) return 0;
    return Math.min(travelledAt(kmh, driver.time, road.decel, clock), end.hit ? gap : Infinity);
  });
  const finished = $derived(clock !== null && (clock >= stop.time || (end.hit && pos >= gap)));
  const rule = $derived(safeGap(kmh));

  const m = (/** @type {number} */ v) => formatNumber(v, 1);

  let frame = 0;
  $effect(() => () => cancelAnimationFrame(frame));

  function brake() {
    cancelAnimationFrame(frame);
    const total = stop.time;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clock = total;
      log();
      return;
    }
    const start = performance.now();
    clock = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const hitNow = end.hit && travelledAt(kmh, driver.time, road.decel, t) >= gap;
      if (t >= total || hitNow) {
        clock = total;
        log();
        return;
      }
      clock = t;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  function log() {
    trials = [
      ...trials,
      {
        kmh,
        road: road.label,
        driver: driver.label,
        think: stop.think,
        brake: stop.brake,
        total: stop.total,
        gap,
        hit: end.hit,
        impact: end.impactKmh,
      },
    ].slice(-8);
  }

  function changed() {
    cancelAnimationFrame(frame);
    clock = null;
  }

  const feedback = $derived.by(() => {
    const parts = `Ở ${kmh} km/h, quãng đường phản ứng ${m(stop.think)} m + quãng đường phanh ${m(stop.brake)} m = quãng đường dừng xe ${m(stop.total)} m.`;
    if (!finished)
      return `Vật cản xuất hiện cách xe ${gap} m. Nhấn "Phanh gấp!" để xem xe có dừng kịp không.`;
    const result = end.hit
      ? `Xe đâm vào vật cản với tốc độ khoảng ${formatNumber(end.impactKmh, 0)} km/h!`
      : `Xe dừng kịp, còn cách vật cản ${m(end.left)} m.`;
    const law =
      rule === null
        ? ''
        : ` Theo quy định, ở tốc độ này phải giữ khoảng cách an toàn tối thiểu ${rule} m với xe phía trước.`;
    return `${result} ${parts}${law}`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField
      label="Tốc độ của xe"
      bind:value={kmh}
      min={20}
      max={120}
      step={10}
      unit="km/h"
      oninput={changed}
    />
    <SliderField
      label="Vật cản xuất hiện cách xe"
      bind:value={gap}
      min={10}
      max={150}
      step={5}
      unit="m"
      oninput={changed}
    />
  </div>
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Mặt đường"
      options={ROADS.map((r) => ({ value: r.id, label: r.label }))}
      bind:value={roadId}
      onchange={changed}
    />
    <SegmentedControl
      label="Người lái (thời gian phản ứng)"
      options={DRIVERS.map((d) => ({ value: d.id, label: d.label }))}
      bind:value={driverId}
      onchange={changed}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {VW} 150"
      class="w-full select-none"
      role="img"
      aria-label="Đoạn đường thẳng, xe ở bên trái, vật cản cách xe {gap} m. {finished
        ? end.hit
          ? 'Xe đã đâm vào vật cản.'
          : `Xe dừng cách vật cản ${m(end.left)} m.`
        : ''}"
    >
      <rect x="0" y="30" width={VW} height="50" fill={roadId === 'uot' ? '#334155' : '#64748b'} />
      <line
        x1="0"
        y1="55"
        x2={VW}
        y2="55"
        stroke="#f8fafc"
        stroke-width="2"
        stroke-dasharray="14 10"
      />
      {#if roadId === 'uot'}
        {#each [60, 150, 240, 330, 420] as px (px)}
          <ellipse cx={px} cy="70" rx="22" ry="4" fill="#7dd3fc" opacity="0.5" />
        {/each}
      {/if}
      <!-- obstacle -->
      <rect x={X(gap)} y="34" width="10" height="20" fill="#f59e0b" stroke="#78350f" />
      <text x={X(gap) + 5} y="24" text-anchor="middle" class="fill-amber-800 text-[11px] font-bold"
        >Vật cản</text
      >
      <!-- car (front at pos) -->
      <rect x={X(pos) - 30} y="38" width="30" height="14" rx="4" fill="#dc2626" />
      <!-- distance bars -->
      {#if clock !== null}
        <rect
          x={X(0)}
          y="92"
          width={X(Math.min(pos, stop.think)) - X(0)}
          height="12"
          fill="#f59e0b"
        />
        {#if pos > stop.think}
          <rect
            x={X(stop.think)}
            y="92"
            width={X(pos) - X(stop.think)}
            height="12"
            fill="#dc2626"
          />
        {/if}
      {/if}
      {#each [0, 40, 80, 120, 160, 200] as mm (mm)}
        <line x1={X(mm)} y1="108" x2={X(mm)} y2="114" stroke="#475569" />
        <text x={X(mm)} y="128" text-anchor="middle" class="fill-slate-600 text-[11px]">{mm} m</text
        >
      {/each}
      <rect x={X0} y="136" width="10" height="10" fill="#f59e0b" />
      <text x={X0 + 14} y="145" class="fill-slate-700 text-[11px]">phản ứng</text>
      <rect x={X0 + 84} y="136" width="10" height="10" fill="#dc2626" />
      <text x={X0 + 98} y="145" class="fill-slate-700 text-[11px]">phanh</text>
    </svg>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={brake} disabled={running}
      >Phanh gấp!</button
    >
    <button type="button" class={button.quiet} onclick={() => (trials = [])}>Xoá bảng</button>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {finished && end.hit
      ? 'bg-red-50 text-red-800'
      : finished
        ? 'bg-emerald-50 text-emerald-800'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="{card} overflow-x-auto p-3">
    <table class="w-full text-sm tabular-nums">
      <caption class="mb-2 text-left font-semibold text-slate-700">Các lần phanh gấp</caption>
      <thead>
        <tr class="text-left text-slate-600">
          <th class="py-1 pr-2">v (km/h)</th>
          <th class="py-1 pr-2">Điều kiện</th>
          <th class="py-1 pr-2">Phản ứng (m)</th>
          <th class="py-1 pr-2">Phanh (m)</th>
          <th class="py-1 pr-2">Dừng xe (m)</th>
          <th class="py-1">Kết quả</th>
        </tr>
      </thead>
      <tbody>
        {#each trials as t, i (i)}
          <tr class="border-t border-slate-100">
            <td class="py-1 pr-2">{t.kmh}</td>
            <td class="py-1 pr-2">{t.road}, {t.driver}</td>
            <td class="py-1 pr-2">{m(t.think)}</td>
            <td class="py-1 pr-2">{m(t.brake)}</td>
            <td class="py-1 pr-2">{m(t.total)}</td>
            <td class="py-1">
              {t.hit
                ? `đâm vật cản ${t.gap} m ở ${formatNumber(t.impact, 0)} km/h`
                : `dừng kịp (vật cản ${t.gap} m)`}
            </td>
          </tr>
        {:else}
          <tr><td colspan="6" class="py-2 text-slate-500">Chưa có lần phanh nào.</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
