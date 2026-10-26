<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { fanSplit } from './engine.js';

  /** @type {0 | 1 | 2 | 3} */
  let level = $state(0);

  const split = $derived(level === 0 ? null : fanSplit(level));
  const J = (/** @type {number} */ v) => `${formatNumber(v, 1)} J`;

  // Sankey-style diagram: band widths are proportional to the energy.
  const SCALE = 2.4; // pixels per joule
  const outs = $derived(
    split
      ? [
          { key: 'k', label: 'Động năng (cánh quạt, gió)', value: split.kinetic, fill: '#f43f5e' },
          { key: 'h', label: 'Nhiệt năng (động cơ nóng lên)', value: split.heat, fill: '#f59e0b' },
          { key: 's', label: 'Năng lượng âm (tiếng ù)', value: split.sound, fill: '#8b5cf6' },
        ]
      : [],
  );
  const bands = $derived.by(() => {
    if (!split) return [];
    let inY = 75 - (split.input * SCALE) / 2;
    let outY = 6;
    return outs.map((o) => {
      const w = Math.max(1.5, o.value * SCALE);
      const band = { ...o, inY, outY, w };
      inY += o.value * SCALE;
      outY += w + 8;
      return band;
    });
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nút số của quạt"
    options={[
      { value: 0, label: 'Tắt' },
      { value: 1, label: 'Số 1' },
      { value: 2, label: 'Số 2' },
      { value: 3, label: 'Số 3' },
    ]}
    bind:value={level}
  />

  <div class="grid items-center gap-3 sm:grid-cols-[8rem_1fr]">
    <svg viewBox="0 0 100 100" class="mx-auto h-28 w-28" aria-hidden="true">
      <g
        style="animation-duration: {level === 0 ? 0 : 1.2 / level}s; transform-origin: 50px 50px;"
        class:spin={level > 0}
      >
        {#each [0, 120, 240] as a (a)}
          <ellipse
            cx="50"
            cy="28"
            rx="10"
            ry="22"
            fill="#93c5fd"
            stroke="#1d4ed8"
            transform="rotate({a} 50 50)"
          />
        {/each}
      </g>
      <circle cx="50" cy="50" r="7" fill="#1e3a8a" />
    </svg>

    <figure class="{card} overflow-hidden p-2">
      {#if split}
        <svg
          viewBox="0 0 400 150"
          class="block w-full"
          role="img"
          aria-label="Mỗi giây quạt nhận {J(split.input)} điện năng, chuyển hoá thành {J(
            split.kinetic,
          )} động năng, {J(split.heat)} nhiệt năng và {J(split.sound)} năng lượng âm."
        >
          <rect
            x="0"
            y={75 - (split.input * SCALE) / 2}
            width="60"
            height={split.input * SCALE}
            fill="#0ea5e9"
          />
          <text x="4" y={75 + 4} class="fill-white text-[11px] font-bold">Điện năng</text>
          {#each bands as band (band.key)}
            <path
              d="M 60 {band.inY} C 150 {band.inY}, 150 {band.outY}, 240 {band.outY} L 240 {band.outY +
                band.w} C 150 {band.outY + band.w}, 150 {band.inY +
                band.value * SCALE}, 60 {band.inY + band.value * SCALE} Z"
              fill={band.fill}
              opacity="0.75"
            />
            <text
              x="246"
              y={band.outY + band.w / 2 + 4}
              class="fill-slate-800 text-[15px] font-semibold">{J(band.value)}</text
            >
          {/each}
        </svg>
      {:else}
        <p class="p-4 text-sm text-slate-500">Bật quạt để xem năng lượng chuyển hoá thế nào.</p>
      {/if}
    </figure>
  </div>

  {#if split}
    <ul class="space-y-1 text-sm">
      {#each outs as o (o.key)}
        <li class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-sm" style="background: {o.fill}" aria-hidden="true"></span>
          <span class="flex-1 text-slate-700">{o.label}</span>
          <span class="font-semibold tabular-nums">{J(o.value)}</span>
        </li>
      {/each}
    </ul>
  {/if}

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {#if split}
      Mỗi giây: điện năng {J(split.input)} → động năng {J(split.kinetic)} + nhiệt năng {J(
        split.heat,
      )} + năng lượng âm {J(split.sound)}. Tổng ba phần đúng bằng {J(split.input)}: năng lượng không
      tự sinh ra, không tự mất đi.
    {:else}
      Quạt tắt: không nhận điện năng, cánh quạt đứng yên.
    {/if}
  </p>
  <p class="text-xs text-slate-500">Các số liệu là số minh hoạ, đã làm tròn.</p>
</div>

<style>
  .spin {
    animation-name: fan-spin;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes fan-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .spin {
      animation: none;
    }
  }
</style>
