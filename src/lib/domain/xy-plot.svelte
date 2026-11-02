<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A small graph from the origin: lines, marked points and labelled
   * horizontal guides, on a fixed pair of axes.
   * @type {{
   *   lines?: Array<{ points: Array<{ x: number, y: number }>, color?: string }>;
   *   marks?: Array<{ x: number, y: number, color?: string }>;
   *   guides?: Array<{ y: number, label: string, color?: string }>;
   *   xMax: number;
   *   yMax: number;
   *   xTicks: number[];
   *   yTicks: number[];
   *   xLabel: string;
   *   yLabel: string;
   *   label: string;
   * }}
   */
  let {
    lines = [],
    marks = [],
    guides = [],
    xMax,
    yMax,
    xTicks,
    yTicks,
    xLabel,
    yLabel,
    label,
  } = $props();

  const W = 320;
  const H = 200;
  const LEFT = 34;
  const RIGHT = 12;
  const TOP = 20;
  const BOTTOM = 28;

  const px = $derived(linear(0, xMax, LEFT, W - RIGHT));
  const py = $derived(linear(0, yMax, H - BOTTOM, TOP));
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-md select-none"
  role="img"
  aria-label={label}
>
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
  <text x="2" y="12" font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text x={W - RIGHT} y={H - 3} font-size="11" font-weight="600" fill="#334155" text-anchor="end">
    {xLabel}
  </text>
  {#each guides as guide, i (i)}
    <line
      x1={LEFT}
      x2={W - RIGHT}
      y1={py.map(guide.y)}
      y2={py.map(guide.y)}
      stroke={guide.color ?? '#64748b'}
      stroke-dasharray="5 4"
    />
    <text
      x={W - RIGHT}
      y={py.map(guide.y) - 4}
      font-size="10"
      font-weight="600"
      fill={guide.color ?? '#64748b'}
      text-anchor="end">{guide.label}</text
    >
  {/each}
  {#each lines as line, i (i)}
    <polyline
      points={pointsAttr(line.points.map((p) => ({ x: px.map(p.x), y: py.map(p.y) })))}
      fill="none"
      stroke={line.color ?? '#4f46e5'}
      stroke-width="2.5"
      stroke-linejoin="round"
    />
  {/each}
  {#each marks as mark, i (i)}
    <circle cx={px.map(mark.x)} cy={py.map(mark.y)} r="4.5" fill={mark.color ?? '#e11d48'} />
  {/each}
</svg>
