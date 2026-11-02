<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';

  /**
   * Measured points with the fitted line through the origin.
   * @type {{
   *   points: Array<{ x: number, y: number }>;
   *   slope: number | null;
   *   xMax: number;
   *   yMax: number;
   *   xTicks: number[];
   *   yTicks: number[];
   *   xLabel: string;
   *   yLabel: string;
   *   label: string;
   * }}
   */
  let { points, slope, xMax, yMax, xTicks, yTicks, xLabel, yLabel, label } = $props();

  const W = 240;
  const H = 180;
  const LEFT = 30;
  const RIGHT = 12;
  const TOP = 18;
  const BOTTOM = 26;

  const px = $derived(linear(0, xMax, LEFT, W - RIGHT));
  const py = $derived(linear(0, yMax, H - BOTTOM, TOP));
  const lineEnd = $derived.by(() => {
    if (slope === null || points.length < 2) return null;
    const x = Math.min(xMax, yMax / slope);
    return { x, y: slope * x };
  });
</script>

<svg viewBox="0 0 {W} {H}" class="w-full select-none" role="img" aria-label={label}>
  {#each yTicks as tick (tick)}
    <line x1={LEFT} x2={W - RIGHT} y1={py.map(tick)} y2={py.map(tick)} stroke="#e2e8f0" />
    <text x={LEFT - 5} y={py.map(tick) + 4} font-size="10" fill="#475569" text-anchor="end">
      {formatNumber(tick)}
    </text>
  {/each}
  {#each xTicks as tick (tick)}
    <line x1={px.map(tick)} x2={px.map(tick)} y1={TOP} y2={H - BOTTOM} stroke="#e2e8f0" />
    <text x={px.map(tick)} y={H - BOTTOM + 13} font-size="10" fill="#475569" text-anchor="middle">
      {formatNumber(tick)}
    </text>
  {/each}
  <line x1={LEFT} x2={LEFT} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
  <line
    x1={LEFT}
    x2={W - RIGHT}
    y1={H - BOTTOM}
    y2={H - BOTTOM}
    stroke="#334155"
    stroke-width="1.5"
  />
  <text x="2" y="11" font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text x={W - RIGHT} y={H - 2} font-size="11" font-weight="600" fill="#334155" text-anchor="end">
    {xLabel}
  </text>
  {#if lineEnd}
    <line
      x1={px.map(0)}
      y1={py.map(0)}
      x2={px.map(lineEnd.x)}
      y2={py.map(lineEnd.y)}
      stroke="#4f46e5"
      stroke-width="2"
      stroke-dasharray="6 3"
    />
  {/if}
  {#each points as p (p.x)}
    <circle cx={px.map(p.x)} cy={py.map(p.y)} r="4" fill="#e11d48" />
  {/each}
</svg>
