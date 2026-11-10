<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';

  /**
   * A horizontal spring pendulum (con lắc lò xo nằm ngang): a wall, a spring
   * and a block whose centre sits at position `x` on an axis Ox with its
   * origin at the equilibrium position O. `range` is the half-width of the
   * axis, in the same unit as `x`; `marks` draws dashed lines at chosen
   * positions (the two ends ±A). `children` draws over the board and gets
   * `{ map, invert, y }`: position to pixels, pixels back to position and the
   * block's centre line, for a drag handle drawn in `children` (the board is
   * 360 × 120). Set `interactive` then, so the board is a group rather than a
   * picture and a drag on it does not scroll the page.
   * @type {{
   *   x: number;
   *   range: number;
   *   label: string;
   *   unit?: string;
   *   marks?: number[];
   *   interactive?: boolean;
   *   children?: import('svelte').Snippet<[{ map: (x: number) => number, invert: (px: number) => number, y: number }]>;
   * }}
   */
  let { x, range, label, unit = 'cm', marks = [], interactive = false, children } = $props();

  const W = 360;
  const H = 120;
  const WALL = 16;
  const BLOCK = 34;
  const MID_Y = 52;
  const AXIS_Y = 92;
  const COILS = 12;

  const px = $derived(linear(-range, range, 150, W - 30));
  const left = $derived(px.map(x) - BLOCK / 2);
  const spring = $derived.by(() => {
    const start = WALL + 4;
    const end = left;
    const lead = 8;
    const span = end - start - 2 * lead;
    const pts = [`M ${start} ${MID_Y}`, `L ${start + lead} ${MID_Y}`];
    for (let i = 1; i <= COILS; i += 1) {
      const xx = start + lead + (span * (i - 0.5)) / COILS;
      pts.push(`L ${xx.toFixed(1)} ${MID_Y + (i % 2 ? -9 : 9)}`);
    }
    pts.push(`L ${end - lead} ${MID_Y}`, `L ${end} ${MID_Y}`);
    return pts.join(' ');
  });
  const ticks = $derived.by(() => {
    const step = range >= 8 ? 5 : range >= 4 ? 2 : 1;
    const out = [];
    for (let v = -Math.floor(range / step) * step; v <= range + 1e-9; v += step) out.push(v);
    return out;
  });
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-md select-none {interactive ? 'touch-none' : ''}"
  role={interactive ? 'group' : 'img'}
  aria-label={label}
>
  <rect x="0" y="16" width={WALL} height={MID_Y + 12} fill="#94a3b8" />
  <line x1={WALL} x2={W - 8} y1={MID_Y + 20} y2={MID_Y + 20} stroke="#64748b" stroke-width="2" />
  {#each marks as m (m)}
    <line
      x1={px.map(m)}
      x2={px.map(m)}
      y1="10"
      y2={AXIS_Y}
      stroke="#94a3b8"
      stroke-dasharray="4 3"
    />
  {/each}
  <line x1={px.map(0)} x2={px.map(0)} y1="10" y2={AXIS_Y} stroke="#334155" stroke-dasharray="2 3" />
  <path d={spring} fill="none" stroke="#475569" stroke-width="2" stroke-linejoin="round" />
  <rect
    x={left}
    y={MID_Y - BLOCK / 2}
    width={BLOCK}
    height={BLOCK}
    rx="4"
    fill="#6366f1"
    stroke="#3730a3"
  />
  <line x1={px.map(-range)} x2={px.map(range) + 10} y1={AXIS_Y} y2={AXIS_Y} stroke="#334155" />
  <path d="M {px.map(range) + 10} {AXIS_Y} l -7 -4 v 8 z" fill="#334155" />
  <text x={px.map(range) + 8} y={AXIS_Y - 6} font-size="11" font-weight="600" fill="#334155">
    x
  </text>
  {#each ticks as v (v)}
    <line x1={px.map(v)} x2={px.map(v)} y1={AXIS_Y - 3} y2={AXIS_Y + 3} stroke="#334155" />
    <text x={px.map(v)} y={AXIS_Y + 15} font-size="10" fill="#475569" text-anchor="middle">
      {v === 0 ? 'O' : formatNumber(v)}
    </text>
  {/each}
  <text x={W - 8} y={H - 2} font-size="10" fill="#64748b" text-anchor="end">({unit})</text>
  <circle cx={px.map(x)} cy={AXIS_Y} r="3.5" fill="#be123c" />
  {@render children?.({ map: px.map, invert: px.invert, y: MID_Y })}
</svg>
