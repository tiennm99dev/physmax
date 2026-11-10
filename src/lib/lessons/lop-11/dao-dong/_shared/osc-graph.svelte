<script>
  import { formatNumber, tidy } from '#lib/core/number-format.js';
  import { focusRing } from '#lib/core/ui.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import { sample } from './oscillation.js';

  /**
   * A signed graph of quantities against time, the way the book draws an
   * oscillation: the time axis through the middle, curves above and below.
   * - `curves`: `{ f, color?, dashed?, until? }`, each `f(t)` drawn from 0 to
   *   `until` (default `tMax`), so a curve can be traced as time runs.
   * - `cursor`: a time marked by a vertical line and a dot on every curve.
   * - `onpick`: when set, the graph is a slider over time: press or drag on
   *   it, or use the arrow keys (`keyStep` seconds, Shift for ten), and it
   *   reports the time; `valueText` is what screen readers hear.
   * @type {{
   *   curves: Array<{ f: (t: number) => number, color?: string, dashed?: boolean, until?: number }>;
   *   tMax: number;
   *   yMax: number;
   *   tStep: number;
   *   yStep: number;
   *   yLabel: string;
   *   label: string;
   *   cursor?: number | null;
   *   onpick?: (t: number) => void;
   *   keyStep?: number;
   *   valueText?: string;
   *   height?: number;
   * }}
   */
  let {
    curves,
    tMax,
    yMax,
    tStep,
    yStep,
    yLabel,
    label,
    cursor = null,
    onpick,
    keyStep = 0.05,
    valueText = '',
    height = 170,
  } = $props();

  const W = 360;
  const LEFT = 40;
  const RIGHT = 26;
  const TOP = 16;
  const BOTTOM = 10;

  /** @type {SVGSVGElement | undefined} */
  let svg = $state();
  let dragging = $state(false);

  const px = $derived(linear(0, tMax, LEFT, W - RIGHT));
  const py = $derived(linear(-yMax, yMax, height - BOTTOM, TOP));

  /** @param {number} step @param {number} max */
  function ticks(step, max) {
    const out = [];
    for (let i = 0; i * step <= max + 1e-9; i += 1) out.push(tidy(i * step));
    return out;
  }

  const tTicks = $derived(ticks(tStep, tMax).filter((t) => t > 0));
  const yTicks = $derived(ticks(yStep, yMax).flatMap((y) => (y === 0 ? [0] : [y, -y])));

  /** @param {{ f: (t: number) => number, until?: number }} c */
  function pathOf(c) {
    const end = Math.min(c.until ?? tMax, tMax);
    if (end <= 0) return '';
    const n = Math.max(2, Math.round((160 * end) / tMax));
    return sample(c.f, 0, end, n)
      .map((p, i) => `${i ? 'L' : 'M'} ${px.map(p.t).toFixed(1)} ${py.map(p.y).toFixed(1)}`)
      .join(' ');
  }

  /** @param {PointerEvent} e */
  function pick(e) {
    if (!onpick || !svg) return;
    const p = clientToSvg(svg, e.clientX, e.clientY, W, height);
    onpick(clamp(px.invert(p.x), 0, tMax));
  }

  /** @param {KeyboardEvent} e */
  function onkeydown(e) {
    if (!onpick) return;
    const now = cursor ?? 0;
    const step = e.shiftKey ? keyStep * 10 : keyStep;
    /** @type {number | null} */
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = now + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = now - step;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tMax;
    if (next === null) return;
    e.preventDefault();
    onpick(clamp(tidy(next, 6), 0, tMax));
  }
</script>

{#if onpick}
  <svg
    bind:this={svg}
    viewBox="0 0 {W} {height}"
    class="mx-auto block w-full max-w-md cursor-crosshair touch-none select-none rounded-lg {focusRing}"
    role="slider"
    tabindex="0"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={tMax}
    aria-valuenow={cursor ?? 0}
    aria-valuetext={valueText}
    {onkeydown}
    onpointerdown={(e) => {
      dragging = true;
      svg?.setPointerCapture?.(e.pointerId);
      pick(e);
    }}
    onpointermove={(e) => dragging && pick(e)}
    onpointerup={() => (dragging = false)}
    onpointercancel={() => (dragging = false)}
  >
    {@render body()}
  </svg>
{:else}
  <svg
    viewBox="0 0 {W} {height}"
    class="mx-auto block w-full max-w-md select-none"
    role="img"
    aria-label={label}
  >
    {@render body()}
  </svg>
{/if}

{#snippet body()}
  {#each yTicks as y (y)}
    <line
      x1={LEFT}
      x2={W - RIGHT}
      y1={py.map(y)}
      y2={py.map(y)}
      stroke={y === 0 ? '#475569' : '#e2e8f0'}
    />
    <text x={LEFT - 5} y={py.map(y) + 3.5} font-size="10" fill="#475569" text-anchor="end">
      {formatNumber(y)}
    </text>
  {/each}
  {#each tTicks as t (t)}
    <line x1={px.map(t)} x2={px.map(t)} y1={TOP} y2={height - BOTTOM} stroke="#e2e8f0" />
    <text x={px.map(t)} y={py.map(0) + 12} font-size="10" fill="#475569" text-anchor="middle">
      {formatNumber(t)}
    </text>
  {/each}
  <line x1={LEFT} x2={LEFT} y1={TOP - 6} y2={height - BOTTOM} stroke="#475569" />
  <text x={LEFT + 4} y={TOP - 4} font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text
    x={W - 4}
    y={py.map(0) - 4}
    font-size="11"
    font-weight="600"
    fill="#334155"
    text-anchor="end"
  >
    t (s)
  </text>
  {#each curves as c, i (i)}
    <path
      d={pathOf(c)}
      fill="none"
      stroke={c.color ?? '#4f46e5'}
      stroke-width="2.5"
      stroke-dasharray={c.dashed ? '6 4' : undefined}
    />
  {/each}
  {#if cursor !== null}
    <line
      x1={px.map(cursor)}
      x2={px.map(cursor)}
      y1={TOP}
      y2={height - BOTTOM}
      stroke="#f59e0b"
      stroke-width="1.5"
    />
    {#each curves as c, i (i)}
      {#if !c.dashed && cursor <= (c.until ?? tMax) + 1e-9}
        <circle
          cx={px.map(cursor)}
          cy={py.map(c.f(cursor))}
          r="4.5"
          fill={c.color ?? '#4f46e5'}
          stroke="#fff"
          stroke-width="1.5"
        />
      {/if}
    {/each}
  {/if}
{/snippet}
