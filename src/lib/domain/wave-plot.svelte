<script>
  import { onDestroy } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import { button } from '#lib/core/ui.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { colorAt, linear } from '#lib/core/visuals/svg-math.js';
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { displacement, sampleWaves, superpose } from './wave.js';

  /**
   * Harmonic waves as a snapshot u(x) at time t (`along: 'x'`, the shape of
   * the string) or as the motion u(t) of one point (`along: 't'`). Several
   * waves can be drawn with their sum (giao thoa, sóng dừng). A marked
   * particle shows how one point only moves up and down while the wave runs
   * on. The play button animates time unless the reader prefers reduced
   * motion; the time slider always works.
   *
   * - `waves`: `{ amplitude, wavelength, period, phase?, direction?, name?, color? }`.
   * - `showSum`: draw the superposition of all waves (thick line).
   * - `along`: `'x'` or `'t'`. `from`, `to`: the drawn stretch (default two
   *   wavelengths or periods of the first wave).
   * - `time` (bindable): t for a snapshot. `position` (bindable): x for u(t).
   * - `marker`: x of the highlighted particle on a snapshot, or null.
   * - `controls`: show the play button and the time slider.
   * - `lengthUnit`, `timeUnit`: axis units.
   *
   * @type {{
   *   waves?: Array<import('./wave.js').Wave & { name?: string, color?: string }>;
   *   showSum?: boolean;
   *   along?: 'x' | 't';
   *   from?: number;
   *   to?: number;
   *   time?: number;
   *   position?: number;
   *   marker?: number | null;
   *   controls?: boolean;
   *   lengthUnit?: string;
   *   timeUnit?: string;
   *   label?: string;
   *   width?: number;
   *   height?: number;
   * }}
   */
  let {
    waves = [],
    showSum = false,
    along = 'x',
    from = 0,
    to,
    time = $bindable(0),
    position = $bindable(0),
    marker = null,
    controls = true,
    lengthUnit = 'cm',
    timeUnit = 's',
    label,
    width = 480,
    height = 240,
  } = $props();

  const LEFT = 44;
  const RIGHT = 14;
  const TOP = 18;
  const BOTTOM = 34;

  const first = $derived(waves[0] ?? { amplitude: 1, wavelength: 1, period: 1 });
  const end = $derived(to ?? from + 2 * (along === 'x' ? first.wavelength : first.period));
  const uMax = $derived(
    Math.max(
      0.001,
      showSum
        ? waves.reduce((n, w) => n + Math.abs(w.amplitude), 0)
        : Math.max(...waves.map((w) => Math.abs(w.amplitude))),
    ),
  );
  const uAxis = $derived(niceAxis(-uMax, uMax, 4));
  const sAxis = $derived(niceAxis(from, end, 6));
  const px = $derived(linear(sAxis.min, sAxis.max, LEFT, width - RIGHT));
  const py = $derived(linear(uAxis.min, uAxis.max, height - BOTTOM, TOP));
  const at = $derived(along === 'x' ? time : position);

  /** @param {Array<{ s: number, u: number }>} pts */
  const pathOf = (pts) =>
    pts.map((p) => `${px.map(p.s).toFixed(1)},${py.map(p.u).toFixed(1)}`).join(' ');
  const range = $derived({ along, from: sAxis.min, to: sAxis.max, at, count: 160 });
  const lines = $derived(
    waves.map((w, i) => ({
      color: w.color ?? colorAt(i),
      name: w.name ?? `Sóng ${i + 1}`,
      points: pathOf(sampleWaves([w], range)),
    })),
  );
  const sum = $derived(showSum ? pathOf(sampleWaves(waves, range)) : '');
  const markerU = $derived(
    marker === null || along !== 'x'
      ? 0
      : showSum
        ? superpose(waves, marker, time)
        : displacement(first, marker, time),
  );
  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
  const title = $derived(
    label ??
      (along === 'x'
        ? `Hình dạng sóng tại t = ${fmt(time)} ${timeUnit}`
        : `Li độ của điểm x = ${fmt(position)} ${lengthUnit} theo thời gian`),
  );

  let playing = $state(false);
  /** @type {number | null} */
  let frame = null;
  let last = 0;
  const tick = (/** @type {number} */ now) => {
    // A quarter period per second, looping over the slider's two periods.
    if (last) {
      const next = (time + ((now - last) / 1000) * first.period * 0.25) % (first.period * 2);
      time = Number(next.toFixed(4));
    }
    last = now;
    frame = requestAnimationFrame(tick);
  };
  function toggle() {
    playing = !playing;
    if (playing) {
      last = 0;
      frame = requestAnimationFrame(tick);
    } else if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  }
  $effect(() => {
    if (prefersReducedMotion.current && playing) toggle();
  });
  onDestroy(() => {
    if (frame !== null) cancelAnimationFrame(frame);
  });
</script>

<figure class="space-y-3">
  <svg
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{width} / {height}"
    role="img"
    aria-label="{title}. {waves
      .map(
        (w) =>
          `biên độ ${fmt(w.amplitude)} ${lengthUnit}, bước sóng ${fmt(w.wavelength)} ${lengthUnit}, chu kì ${fmt(w.period)} ${timeUnit}`,
      )
      .join('; ')}"
  >
    {#each uAxis.ticks as u (u)}
      <line x1={LEFT} y1={py.map(u)} x2={width - RIGHT} y2={py.map(u)} stroke="#e2e8f0" />
      <text x={LEFT - 6} y={py.map(u) + 4} text-anchor="end" font-size="12" fill="#64748b"
        >{fmt(u)}</text
      >
    {/each}
    {#each sAxis.ticks as s (s)}
      <text
        x={px.map(s)}
        y={height - BOTTOM + 18}
        text-anchor="middle"
        font-size="12"
        fill="#64748b">{fmt(s)}</text
      >
    {/each}
    <line
      x1={LEFT}
      y1={py.map(0)}
      x2={width - RIGHT}
      y2={py.map(0)}
      stroke="#334155"
      stroke-width="1.5"
    />
    <line x1={LEFT} y1={TOP} x2={LEFT} y2={height - BOTTOM} stroke="#334155" stroke-width="1.5" />
    <text x={LEFT + 4} y={TOP - 4} font-size="12" font-weight="600" fill="#334155"
      >u ({lengthUnit})</text
    >
    <text
      x={width - RIGHT}
      y={height - 4}
      text-anchor="end"
      font-size="12"
      font-weight="600"
      fill="#334155">{along === 'x' ? `x (${lengthUnit})` : `t (${timeUnit})`}</text
    >

    {#each lines as l, i (i)}
      <polyline
        points={l.points}
        fill="none"
        stroke={l.color}
        stroke-width={showSum ? 1.5 : 2.5}
        stroke-dasharray={showSum || i > 0 ? '6 4' : null}
      />
    {/each}
    {#if sum}
      <polyline points={sum} fill="none" stroke="#0f172a" stroke-width="3" />
    {/if}
    {#if marker !== null && along === 'x'}
      <line
        x1={px.map(marker)}
        y1={TOP}
        x2={px.map(marker)}
        y2={height - BOTTOM}
        stroke="#cbd5e1"
        stroke-dasharray="3 3"
      />
      <circle
        cx={px.map(marker)}
        cy={py.map(markerU)}
        r="7"
        fill="#E9B10A"
        stroke="#334155"
        stroke-width="1.5"
      />
    {/if}
  </svg>

  {#if waves.length > 1 || showSum}
    <div class="flex flex-wrap justify-center gap-4 text-sm text-slate-700">
      {#each lines as l, i (i)}
        <span class="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true"
            ><line
              x1="0"
              y1="5"
              x2="28"
              y2="5"
              stroke={l.color}
              stroke-width="3"
              stroke-dasharray="6 4"
            /></svg
          >
          {l.name}
        </span>
      {/each}
      {#if showSum}
        <span class="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true"
            ><line x1="0" y1="5" x2="28" y2="5" stroke="#0f172a" stroke-width="3" /></svg
          >
          Sóng tổng hợp
        </span>
      {/if}
    </div>
  {/if}

  {#if controls}
    <div class="flex flex-wrap items-end gap-3">
      {#if along === 'x' && !prefersReducedMotion.current}
        <button type="button" class={button.secondary} onclick={toggle} aria-pressed={playing}>
          {playing ? 'Dừng' : 'Chạy sóng'}
        </button>
      {/if}
      <div class="min-w-48 flex-1">
        {#if along === 'x'}
          <SliderField
            label="Thời điểm t"
            bind:value={time}
            min={0}
            max={Number((first.period * 2).toFixed(4))}
            step={Number((first.period / 20).toFixed(4))}
            unit={timeUnit}
            format={fmt}
          />
        {:else}
          <SliderField
            label="Vị trí x"
            bind:value={position}
            min={0}
            max={Number((first.wavelength * 2).toFixed(4))}
            step={Number((first.wavelength / 20).toFixed(4))}
            unit={lengthUnit}
            format={fmt}
          />
        {/if}
      </div>
    </div>
  {/if}
  {#if marker !== null && along === 'x'}
    <p class="text-center text-sm text-slate-600 tabular-nums">
      Phần tử tại x = {fmt(marker)}
      {lengthUnit} có li độ u = {fmt(markerU)}
      {lengthUnit}
    </p>
  {/if}
</figure>
