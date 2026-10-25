<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, linear, snap } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { UNIT, convert, scaleTicks } from './temperature.js';

  /**
   * A liquid thermometer with a °C scale on the left and, optionally, a °F
   * or K scale on the right, so the two readings of one level can be
   * compared. With `interactive`, drag the top of the liquid column or use
   * ↑/↓ (Shift for ten steps) to set the temperature.
   *
   * - `celsius` (bindable): the reading in °C.
   * - `min`, `max`: ends of the °C scale. `major`, `minor`: tick spacing in °C.
   * - `secondScale`: `'F'`, `'K'` or null.
   * - `step`: snap step in °C when interactive.
   * - `liquid`: column colour (red for alcohol, grey for mercury).
   *
   * @type {{
   *   celsius?: number;
   *   min?: number;
   *   max?: number;
   *   major?: number;
   *   minor?: number;
   *   secondScale?: 'F' | 'K' | null;
   *   interactive?: boolean;
   *   step?: number;
   *   liquid?: string;
   *   label?: string;
   *   height?: number;
   *   onchange?: (celsius: number) => void;
   * }}
   */
  let {
    celsius = $bindable(20),
    min = -20,
    max = 110,
    major = 10,
    minor = 2,
    secondScale = null,
    interactive = false,
    step = 1,
    liquid = '#D7263D',
    label = 'Nhiệt kế',
    height = 360,
    onchange,
  } = $props();

  const W = 200;
  const CX = 100;
  const TUBE = 14;
  const TOP = 20;
  const bulbY = $derived(height - 34);
  const BULB = 22;
  const y = $derived(linear(min, max, bulbY - BULB - 6, TOP + 8));
  const cTicks = $derived(scaleTicks(min, max, major, minor));
  const second = $derived.by(() => {
    if (!secondScale) return [];
    const lo = convert(min, 'C', secondScale);
    const hi = convert(max, 'C', secondScale);
    const span = hi - lo;
    const big = span > 150 ? 20 : 10;
    return scaleTicks(lo, hi, big, big / 5).map((t) => ({
      ...t,
      py: y.map(convert(t.value, secondScale, 'C')),
    }));
  });
  const level = $derived(y.map(clamp(celsius, min, max)));
  const fmt = (/** @type {number} */ v) => formatNumber(v, 1);
  const reading = $derived(
    secondScale
      ? `${fmt(celsius)} °C = ${fmt(convert(celsius, 'C', secondScale))} ${UNIT[secondScale]}`
      : `${fmt(celsius)} °C`,
  );

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  /** @param {number} c */
  function setCelsius(c) {
    const next = clamp(snap(c, step), min, max);
    if (next === celsius) return;
    celsius = next;
    onchange?.(celsius);
  }
  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: height },
    pad: 0,
    onChange: () => setCelsius(y.invert(scratch.y)),
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => setCelsius(celsius - dy * step * (big ? 10 : 1)),
  });
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {height}"
    class="mx-auto block w-full max-w-[12rem] select-none"
    style:aspect-ratio="{W} / {height}"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{label}: {reading}"
  >
    <rect
      x={CX - TUBE / 2 - 3}
      y={TOP - 3}
      width={TUBE + 6}
      height={bulbY - TOP}
      rx={(TUBE + 6) / 2}
      fill="#f8fafc"
      stroke="#94a3b8"
      stroke-width="2"
    />
    <circle cx={CX} cy={bulbY} r={BULB + 3} fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <rect x={CX - TUBE / 2 + 2} y={level} width={TUBE - 4} height={bulbY - level} fill={liquid} />
    <circle cx={CX} cy={bulbY} r={BULB - 2} fill={liquid} />

    {#each cTicks as t (t.value)}
      <line
        x1={CX - TUBE / 2 - 6 - (t.major ? 12 : 6)}
        y1={y.map(t.value)}
        x2={CX - TUBE / 2 - 6}
        y2={y.map(t.value)}
        stroke="#334155"
        stroke-width={t.major ? 1.5 : 1}
      />
      {#if t.major}
        <text
          x={CX - TUBE / 2 - 22}
          y={y.map(t.value) + 4}
          text-anchor="end"
          font-size="12"
          fill="#334155">{fmt(t.value)}</text
        >
      {/if}
    {/each}
    <text
      x={CX - TUBE / 2 - 22}
      y={TOP - 6}
      text-anchor="end"
      font-size="12"
      font-weight="700"
      fill="#334155">°C</text
    >
    {#if secondScale}
      {#each second as t (t.value)}
        <line
          x1={CX + TUBE / 2 + 6}
          y1={t.py}
          x2={CX + TUBE / 2 + 6 + (t.major ? 12 : 6)}
          y2={t.py}
          stroke="#2E86AB"
          stroke-width={t.major ? 1.5 : 1}
        />
        {#if t.major}
          <text x={CX + TUBE / 2 + 22} y={t.py + 4} font-size="12" fill="#2E86AB"
            >{fmt(t.value)}</text
          >
        {/if}
      {/each}
      <text x={CX + TUBE / 2 + 22} y={TOP - 6} font-size="12" font-weight="700" fill="#2E86AB"
        >{UNIT[secondScale]}</text
      >
    {/if}

    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Mức chất lỏng — kéo hoặc dùng phím ↑ ↓"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={celsius}
        aria-valuetext={reading}
        aria-orientation="vertical"
        style="cursor:ns-resize; outline:none"
        use:draggable={drag}
      >
        <rect x={CX - 26} y={level - 14} width="52" height="28" fill="transparent" />
        <rect
          x={CX - 13}
          y={level - 4}
          width="26"
          height="8"
          rx="4"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="2"
        />
      </g>
    {/if}
  </svg>
  <figcaption
    class="text-center text-sm font-semibold text-slate-700 tabular-nums"
    aria-live="polite"
  >
    {reading}
  </figcaption>
</figure>

<style>
  .drag-handle:focus-visible rect:nth-child(2) {
    stroke: #4f46e5;
    stroke-width: 3;
  }
</style>
