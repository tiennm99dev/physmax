<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { linear, snap, clamp } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { arrowHead, shaftEnd } from './arrow.js';
  import { arrowLength, fieldAt, sampleField, traceFieldLine } from './vector-field.js';

  /**
   * A field drawn as a grid of arrows, made by point sources (charges, masses)
   * plus an optional uniform part. Arrow length grows with the field's size on
   * a log scale and the colour darkens where it is strong. With `interactive`,
   * each source can be dragged or moved with the arrow keys (Shift for bigger
   * steps), snapping to `snapStep` field units.
   *
   * - `sources` (bindable): `{ x, y, strength, label? }` in field units, y up.
   *   Positive strength points away (a + charge), negative toward (a − charge
   *   or a mass).
   * - `bounds`: visible region `{ xMin, xMax, yMin, yMax }`; the height follows
   *   from the aspect ratio.
   * - `uniform`: constant field added everywhere, such as `{ x: 0, y: -9.8 }`.
   * - `nx`: arrows per row (rows follow the aspect ratio).
   * - `showLines`: trace field lines out of positive sources (or into
   *   negative ones when there is no positive source).
   * - `probe` (bindable): a point whose field is read out, or null.
   * - `fieldName`, `unit`: words for the readout ("Cường độ điện trường", "V/m").
   *
   * @type {{
   *   sources?: Array<{ x: number, y: number, strength: number, label?: string }>;
   *   bounds?: { xMin: number, xMax: number, yMin: number, yMax: number };
   *   uniform?: { x: number, y: number };
   *   nx?: number;
   *   interactive?: boolean;
   *   snapStep?: number;
   *   showLines?: boolean;
   *   probe?: { x: number, y: number } | null;
   *   fieldName?: string;
   *   unit?: string;
   *   label?: string;
   *   width?: number;
   *   onchange?: (sources: Array<{ x: number, y: number, strength: number }>) => void;
   * }}
   */
  let {
    sources = $bindable([]),
    bounds = { xMin: -5, xMax: 5, yMin: -3, yMax: 3 },
    uniform = { x: 0, y: 0 },
    nx = 15,
    interactive = false,
    snapStep = 0.5,
    showLines = false,
    probe = $bindable(null),
    fieldName = 'Cường độ trường',
    unit = '',
    label = 'Trường vectơ',
    width = 480,
    onchange,
  } = $props();

  const spanX = $derived(bounds.xMax - bounds.xMin);
  const spanY = $derived(bounds.yMax - bounds.yMin);
  const height = $derived(Math.round((width * spanY) / spanX));
  const ny = $derived(Math.max(1, Math.round((nx * spanY) / spanX)));
  const sx = $derived(linear(bounds.xMin, bounds.xMax, 0, width));
  const sy = $derived(linear(bounds.yMin, bounds.yMax, height, 0));
  const cell = $derived(width / nx);

  const samples = $derived(
    sampleField(sources, bounds, { nx, ny, uniform, minDistance: (spanX / nx) * 0.6 }),
  );
  // Half-length arrows at the median strength keep the picture readable for
  // any choice of source strengths.
  const ref = $derived.by(() => {
    const ms = samples.map((s) => s.magnitude).sort((a, b) => a - b);
    return ms.length ? ms[Math.floor(ms.length / 2)] || 1 : 1;
  });
  const arrows = $derived(
    samples.map((s) => {
      const len = arrowLength(s.magnitude, ref, cell * 0.85);
      const ux = s.magnitude ? s.field.x / s.magnitude : 0;
      const uy = s.magnitude ? s.field.y / s.magnitude : 0;
      const cx = sx.map(s.at.x);
      const cy = sy.map(s.at.y);
      const x1 = cx - (ux * len) / 2;
      const y1 = cy + (uy * len) / 2;
      const x2 = cx + (ux * len) / 2;
      const y2 = cy - (uy * len) / 2;
      const strength = Math.min(1, Math.log1p(s.magnitude / ref) / Math.log1p(8));
      return { x1, y1, x2, y2, end: shaftEnd(x1, y1, x2, y2, 6), opacity: 0.35 + 0.65 * strength };
    }),
  );

  const lines = $derived.by(() => {
    if (!showLines || sources.length === 0) return [];
    const positive = sources.filter((s) => s.strength > 0);
    const seeds = positive.length ? positive : sources.filter((s) => s.strength < 0);
    const step = (positive.length ? 1 : -1) * spanX * 0.01;
    const r = spanX * 0.03;
    return seeds.flatMap((s, si) =>
      Array.from({ length: 12 }, (_, k) => {
        const a = (k * Math.PI) / 6 + si * 0.2;
        const start = { x: s.x + r * Math.cos(a), y: s.y + r * Math.sin(a) };
        const pts = traceFieldLine(sources, start, { bounds, step, uniform, stopRadius: r });
        return pts.map((p) => `${sx.map(p.x).toFixed(1)},${sy.map(p.y).toFixed(1)}`).join(' ');
      }),
    );
  });

  const probeField = $derived(probe ? fieldAt(sources, probe, { uniform }) : null);
  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} i @param {number} x @param {number} y */
  function moveSource(i, x, y) {
    const nxt = {
      x: clamp(snap(x, snapStep), bounds.xMin, bounds.xMax),
      y: clamp(snap(y, snapStep), bounds.yMin, bounds.yMax),
    };
    if (nxt.x === sources[i].x && nxt.y === sources[i].y) return;
    sources = sources.map((s, j) => (j === i ? { ...s, ...nxt } : s));
    onchange?.(sources);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => moveSource(i, sx.invert(scratch.x), sy.invert(scratch.y)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const k = snapStep * (big ? 4 : 1);
      moveSource(i, sources[i].x + dx * k, sources[i].y - dy * k);
    },
  });

  /** @param {{ strength: number, label?: string }} s */
  const nameOf = (s) => s.label ?? (s.strength > 0 ? '+' : '−');
  const describe = $derived(
    sources.length
      ? sources.map((s) => `${nameOf(s)} tại (${fmt(s.x)}; ${fmt(s.y)})`).join(', ')
      : 'Trường đều',
  );
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-xl select-none rounded-xl border border-slate-200 bg-white"
    style:aspect-ratio="{width} / {height}"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{label}. {describe}"
  >
    {#each lines as pts, i (i)}
      <polyline points={pts} fill="none" stroke="#94a3b8" stroke-width="1.2" />
    {/each}
    {#each arrows as a, i (i)}
      <g opacity={a.opacity}>
        <line x1={a.x1} y1={a.y1} x2={a.end.x} y2={a.end.y} stroke="#4F46E5" stroke-width="2" />
        <polygon points={arrowHead(a.x1, a.y1, a.x2, a.y2, 6)} fill="#4F46E5" />
      </g>
    {/each}
    {#if probe && probeField}
      {@const px = sx.map(probe.x)}
      {@const py = sy.map(probe.y)}
      <circle cx={px} cy={py} r="4" fill="#E9B10A" stroke="#334155" />
    {/if}
    {#each sources as s, i (i)}
      {@const cx = sx.map(s.x)}
      {@const cy = sy.map(s.y)}
      {@const color = s.strength > 0 ? '#D7263D' : '#2E86AB'}
      {#if interactive}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Nguồn {nameOf(s)} — kéo hoặc dùng phím mũi tên"
          aria-valuemin={bounds.xMin}
          aria-valuemax={bounds.xMax}
          aria-valuenow={s.x}
          aria-valuetext="({fmt(s.x)}; {fmt(s.y)})"
          style="cursor:grab; outline:none"
          use:draggable={dragFor(i)}
        >
          <circle {cx} {cy} r="22" fill="transparent" />
          <circle {cx} {cy} r="13" fill={color} stroke="#fff" stroke-width="2" />
          <text x={cx} y={cy + 5} text-anchor="middle" font-size="15" font-weight="700" fill="#fff"
            >{nameOf(s)}</text
          >
        </g>
      {:else}
        <circle {cx} {cy} r="13" fill={color} stroke="#fff" stroke-width="2" />
        <text x={cx} y={cy + 5} text-anchor="middle" font-size="15" font-weight="700" fill="#fff"
          >{nameOf(s)}</text
        >
      {/if}
    {/each}
  </svg>
  {#if probe && probeField}
    <figcaption class="text-center text-sm text-slate-600 tabular-nums" aria-live="polite">
      {fieldName} tại ({fmt(probe.x)}; {fmt(probe.y)}): {fmt(
        Math.hypot(probeField.x, probeField.y),
      )}
      {unit}
    </figcaption>
  {/if}
</figure>

<style>
  .drag-handle:focus-visible circle:nth-child(2) {
    stroke: #1e1b4b;
    stroke-width: 3;
  }
</style>
