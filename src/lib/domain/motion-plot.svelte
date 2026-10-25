<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, colorAt, linear, snap } from '#lib/core/visuals/svg-math.js';
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { sampleMotion, stateAt } from './motion.js';

  /**
   * Position-time (x-t) or velocity-time (v-t) graph of straight-line motions,
   * with optional measured points. A time cursor (draggable, or ←/→ in steps
   * of `cursorStep`, Shift for five) reads off x and v of every motion; on a
   * v-t graph the area under the line up to the cursor is shaded, since it
   * equals the displacement.
   *
   * - `kind`: `'x-t'` or `'v-t'`.
   * - `motions`: `{ name, motion, color? }` where `motion` is a `motion.js`
   *   Motion `{ x0?, v0?, stages: [{ duration, acceleration }] }`.
   * - `data`: measured points `{ t, value }` drawn as dots; `dataName` labels them.
   * - `tMax`: end of the time axis. `yMin`, `yMax`: value axis (auto when unset).
   * - `cursor` (bindable): the cursor time, or null to hide it.
   * - `timeUnit`, `positionUnit`, `velocityUnit`: axis units. `positionSymbol`:
   *   the position axis letter, `d` for độ dịch chuyển (grade 10) or `s` for
   *   quãng đường (grade 7).
   *
   * @type {{
   *   kind?: 'x-t' | 'v-t';
   *   motions?: Array<{ name: string, motion: import('./motion.js').Motion, color?: string }>;
   *   data?: Array<{ t: number, value: number }>;
   *   dataName?: string;
   *   tMax?: number;
   *   yMin?: number;
   *   yMax?: number;
   *   cursor?: number | null;
   *   cursorStep?: number;
   *   showArea?: boolean;
   *   timeUnit?: string;
   *   positionUnit?: string;
   *   velocityUnit?: string;
   *   positionSymbol?: string;
   *   label?: string;
   *   width?: number;
   *   height?: number;
   * }}
   */
  let {
    kind = 'x-t',
    motions = [],
    data = [],
    dataName = 'Số liệu đo',
    tMax = 10,
    yMin,
    yMax,
    cursor = $bindable(null),
    cursorStep = 0.1,
    showArea = true,
    timeUnit = 's',
    positionUnit = 'm',
    velocityUnit = 'm/s',
    positionSymbol = 'x',
    label,
    width = 480,
    height = 300,
  } = $props();

  const clipId = $props.id();
  const LEFT = 52;
  const RIGHT = 16;
  const TOP = 26;
  const BOTTOM = 40;

  const valueOf = (/** @type {{ x: number, v: number }} */ s) => (kind === 'x-t' ? s.x : s.v);
  const curves = $derived(
    motions.map((m, i) => ({
      ...m,
      color: m.color ?? colorAt(i),
      states: sampleMotion(m.motion, tMax, 80),
    })),
  );
  const yAxis = $derived.by(() => {
    const all = [...curves.flatMap((c) => c.states.map(valueOf)), ...data.map((d) => d.value)];
    return niceAxis(yMin ?? Math.min(0, ...all), yMax ?? Math.max(1, ...all), 5);
  });
  const tAxis = $derived(niceAxis(0, tMax, 6));
  const px = $derived(linear(0, tAxis.max, LEFT, width - RIGHT));
  const py = $derived(linear(yAxis.min, yAxis.max, height - BOTTOM, TOP));
  const yZero = $derived(py.map(clamp(0, yAxis.min, yAxis.max)));

  const unitY = $derived(kind === 'x-t' ? positionUnit : velocityUnit);
  const yName = $derived(kind === 'x-t' ? positionSymbol : 'v');
  const title = $derived(
    label ?? (kind === 'x-t' ? `Đồ thị ${positionSymbol} – t` : 'Đồ thị vận tốc – thời gian'),
  );
  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);

  /** @param {Array<{ t: number, x: number, v: number }>} states */
  const pathOf = (states) =>
    states.map((s) => `${px.map(s.t).toFixed(1)},${py.map(valueOf(s)).toFixed(1)}`).join(' ');

  /** Shaded area under the first v-t line from 0 to the cursor. */
  const area = $derived.by(() => {
    if (kind !== 'v-t' || !showArea || cursor === null || curves.length === 0) return '';
    const t1 = cursor;
    const pts = curves[0].states.filter((s) => s.t < t1);
    pts.push(stateAt(curves[0].motion, t1));
    return `${px.map(0)},${yZero} ${pathOf(pts)} ${px.map(t1)},${yZero}`;
  });

  const readings = $derived(
    cursor === null ? [] : curves.map((c) => ({ ...c, state: stateAt(c.motion, cursor ?? 0) })),
  );

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  /** @param {number} t */
  const setCursor = (t) => {
    cursor = clamp(snap(t, cursorStep), 0, tMax);
  };
  const cursorDrag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setCursor(px.invert(scratch.x)),
    /** @param {number} dx @param {number} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => setCursor((cursor ?? 0) + dx * cursorStep * (big ? 5 : 1)),
  });
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{width} / {height}"
    style:touch-action={cursor === null ? null : 'none'}
    role={cursor === null ? 'img' : 'group'}
    aria-label="{title}. {motions.map((m) => m.name).join(', ')}"
  >
    {#each yAxis.ticks as v (v)}
      <line
        x1={LEFT}
        y1={py.map(v)}
        x2={width - RIGHT}
        y2={py.map(v)}
        stroke="#e2e8f0"
        stroke-width="1"
      />
      <text x={LEFT - 6} y={py.map(v) + 4} text-anchor="end" font-size="12" fill="#64748b"
        >{fmt(v)}</text
      >
    {/each}
    {#each tAxis.ticks as t (t)}
      <line x1={px.map(t)} y1={yZero - 4} x2={px.map(t)} y2={yZero + 4} stroke="#334155" />
      <text
        x={px.map(t)}
        y={height - BOTTOM + 18}
        text-anchor="middle"
        font-size="12"
        fill="#64748b">{fmt(t)}</text
      >
    {/each}
    <line
      x1={LEFT}
      y1={TOP - 6}
      x2={LEFT}
      y2={height - BOTTOM}
      stroke="#334155"
      stroke-width="1.5"
    />
    <line x1={LEFT} y1={yZero} x2={width - RIGHT} y2={yZero} stroke="#334155" stroke-width="1.5" />
    <text x={LEFT - 6} y={TOP - 12} font-size="12" font-weight="600" fill="#334155"
      >{yName} ({unitY})</text
    >
    <text
      x={width - RIGHT}
      y={height - 6}
      text-anchor="end"
      font-size="12"
      font-weight="600"
      fill="#334155">t ({timeUnit})</text
    >

    <defs>
      <clipPath id={clipId}>
        <rect
          x={LEFT}
          y={TOP - 6}
          width={width - LEFT - RIGHT}
          height={height - BOTTOM - TOP + 6}
        />
      </clipPath>
    </defs>
    <g clip-path="url(#{clipId})">
      {#if area}
        <polygon points={area} fill="#4F46E5" fill-opacity="0.15" />
      {/if}
      {#each curves as c, i (i)}
        <polyline
          points={pathOf(c.states)}
          fill="none"
          stroke={c.color}
          stroke-width="2.5"
          stroke-linejoin="round"
          stroke-dasharray={i > 0 ? '7 4' : null}
        />
      {/each}
    </g>
    {#each data as d, i (i)}
      <circle
        cx={px.map(d.t)}
        cy={py.map(d.value)}
        r="4.5"
        fill="#fff"
        stroke="#D7263D"
        stroke-width="2"
      />
    {/each}

    {#if cursor !== null}
      {@const cx = px.map(cursor)}
      <line x1={cx} y1={TOP} x2={cx} y2={height - BOTTOM} stroke="#0f172a" stroke-dasharray="4 3" />
      {#each readings as r, i (i)}
        <circle {cx} cy={py.map(valueOf(r.state))} r="5" fill={r.color} />
      {/each}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Thời điểm t — kéo hoặc dùng phím ← →"
        aria-valuemin={0}
        aria-valuemax={tMax}
        aria-valuenow={cursor}
        aria-valuetext="t = {fmt(cursor)} {timeUnit}"
        style="cursor:ew-resize; outline:none"
        use:draggable={cursorDrag}
      >
        <rect
          x={cx - 14}
          y={TOP - 24}
          width="28"
          height={height - BOTTOM - TOP + 24}
          fill="transparent"
        />
        <rect x={cx - 9} y={TOP - 20} width="18" height="16" rx="4" fill="#0f172a" />
      </g>
    {/if}
  </svg>
  <figcaption class="space-y-1 text-center text-sm text-slate-700 tabular-nums">
    {#if motions.length > 1 || data.length}
      <span class="flex flex-wrap justify-center gap-4">
        {#each curves as c, i (i)}
          <span class="flex items-center gap-2">
            <svg width="28" height="10" aria-hidden="true">
              <line
                x1="0"
                y1="5"
                x2="28"
                y2="5"
                stroke={c.color}
                stroke-width="3"
                stroke-dasharray={i > 0 ? '7 4' : null}
              />
            </svg>
            {c.name}
          </span>
        {/each}
        {#if data.length}
          <span class="flex items-center gap-2">
            <svg width="12" height="12" aria-hidden="true">
              <circle cx="6" cy="6" r="4" fill="#fff" stroke="#D7263D" stroke-width="2" />
            </svg>
            {dataName}
          </span>
        {/if}
      </span>
    {/if}
    {#if cursor !== null}
      <span class="block" aria-live="polite">
        t = {fmt(cursor)}
        {timeUnit}:
        {#each readings as r, i (i)}
          {i > 0 ? ' · ' : ''}{motions.length > 1 ? `${r.name}: ` : ''}{positionSymbol} = {fmt(
            r.state.x,
          )}
          {positionUnit}, v = {fmt(r.state.v)}
          {velocityUnit}
        {/each}
      </span>
    {/if}
  </figcaption>
</figure>

<style>
  .drag-handle:focus-visible rect:nth-child(2) {
    fill: #4f46e5;
  }
</style>
