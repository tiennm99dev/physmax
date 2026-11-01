<script>
  import { formatNumber } from '#lib/core/number-format.js';

  /**
   * A displacement-time graph: an optional dashed line to copy, a drawn line,
   * a cursor and a highlighted segment with its slope triangle.
   * @type {{
   *   points?: Array<{ t: number, d: number }>;
   *   target?: Array<{ t: number, d: number }>;
   *   tMax: number;
   *   tStep: number;
   *   dMin: number;
   *   dMax: number;
   *   dStep: number;
   *   cursor?: number | null;
   *   highlight?: [{ t: number, d: number }, { t: number, d: number }] | null;
   *   label: string;
   * }}
   */
  let {
    points = [],
    target = [],
    tMax,
    tStep,
    dMin,
    dMax,
    dStep,
    cursor = null,
    highlight = null,
    label,
  } = $props();

  const W = 360;
  const H = 240;
  const LEFT = 40;
  const RIGHT = 14;
  const TOP = 24;
  const BOTTOM = 34;

  /** @param {number} t */
  const x = (t) => LEFT + (t / tMax) * (W - LEFT - RIGHT);
  /** @param {number} d */
  const y = (d) => TOP + ((dMax - d) / (dMax - dMin)) * (H - TOP - BOTTOM);
  const tTicks = $derived(
    Array.from({ length: Math.floor(tMax / tStep) + 1 }, (_, i) => i * tStep),
  );
  const dTicks = $derived(
    Array.from({ length: Math.floor((dMax - dMin) / dStep) + 1 }, (_, i) => dMin + i * dStep),
  );
  /** @param {Array<{ t: number, d: number }>} list */
  const line = (list) => list.map((p) => `${x(p.t).toFixed(1)},${y(p.d).toFixed(1)}`).join(' ');
</script>

<svg viewBox="0 0 {W} {H}" class="w-full" role="img" aria-label={label}>
  {#each dTicks as d (d)}
    <line x1={LEFT} x2={W - RIGHT} y1={y(d)} y2={y(d)} stroke={d === 0 ? '#64748b' : '#e2e8f0'} />
    <text x={LEFT - 6} y={y(d) + 4} font-size="11" fill="#475569" text-anchor="end">
      {formatNumber(d)}
    </text>
  {/each}
  {#each tTicks as t (t)}
    <line x1={x(t)} x2={x(t)} y1={y(dMax)} y2={y(dMin)} stroke="#e2e8f0" />
    <text x={x(t)} y={H - BOTTOM + 15} font-size="11" fill="#475569" text-anchor="middle">
      {formatNumber(t)}
    </text>
  {/each}
  <line x1={LEFT} x2={LEFT} y1={y(dMax)} y2={y(dMin)} stroke="#64748b" />
  <text x={W - RIGHT} y={H - 5} font-size="12" fill="#334155" text-anchor="end">t (s)</text>
  <text x={4} y={13} font-size="12" fill="#334155">d (m)</text>

  {#if target.length > 1}
    <polyline
      points={line(target)}
      fill="none"
      stroke="#94a3b8"
      stroke-width="3"
      stroke-dasharray="7 5"
    />
  {/if}
  {#if points.length > 1}
    <polyline
      points={line(points)}
      fill="none"
      stroke="#4f46e5"
      stroke-width="3"
      stroke-linejoin="round"
    />
  {/if}
  {#if highlight}
    {@const [a, b] = highlight}
    <line
      x1={x(a.t)}
      y1={y(a.d)}
      x2={x(b.t)}
      y2={y(b.d)}
      stroke="#dc2626"
      stroke-width="4"
      stroke-linecap="round"
    />
    <line
      x1={x(a.t)}
      y1={y(a.d)}
      x2={x(b.t)}
      y2={y(a.d)}
      stroke="#0284c7"
      stroke-width="2"
      stroke-dasharray="5 3"
    />
    <line
      x1={x(b.t)}
      y1={y(a.d)}
      x2={x(b.t)}
      y2={y(b.d)}
      stroke="#c026d3"
      stroke-width="2"
      stroke-dasharray="5 3"
    />
  {/if}
  {#if cursor !== null}
    <line
      x1={x(cursor)}
      x2={x(cursor)}
      y1={y(dMax)}
      y2={y(dMin)}
      stroke="#dc2626"
      stroke-width="1.5"
    />
  {/if}
</svg>
