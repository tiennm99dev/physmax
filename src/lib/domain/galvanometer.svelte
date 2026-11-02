<svelte:options namespace="svg" />

<script>
  /**
   * A centre-zero galvanometer (điện kế) drawn inside a parent SVG: a 72 × 74
   * box whose needle swings either way from the 0 at the top. The parent wires it.
   *
   * - `x`, `y`: the top left of the box, in SVG units.
   * - `value`: the deflection, -1 (full left) to 1 (full right).
   * @type {{ x: number, y: number, value: number }}
   */
  let { x, y, value } = $props();

  const PIVOT_X = 36;
  const PIVOT_Y = 64;
  const FULL_SWING = 50;
</script>

<g transform="translate({x} {y})">
  <rect width="72" height="74" rx="8" fill="#f8fafc" stroke="#94a3b8" />
  {#each [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as k (k)}
    {@const a = ((k * 10 - 90) * Math.PI) / 180}
    <line
      x1={PIVOT_X + 46 * Math.cos(a)}
      y1={PIVOT_Y + 46 * Math.sin(a)}
      x2={PIVOT_X + (k % 5 === 0 ? 38 : 42) * Math.cos(a)}
      y2={PIVOT_Y + (k % 5 === 0 ? 38 : 42) * Math.sin(a)}
      stroke="#334155"
    />
  {/each}
  <text x={PIVOT_X} y="12" text-anchor="middle" class="fill-slate-600 text-[9px]">0</text>
  <text x="61" y="70" text-anchor="middle" class="fill-slate-500 text-[10px] font-bold">G</text>
  <line
    x1={PIVOT_X}
    y1={PIVOT_Y}
    x2={PIVOT_X}
    y2={PIVOT_Y - 42}
    stroke="#dc2626"
    stroke-width="2"
    stroke-linecap="round"
    transform="rotate({FULL_SWING * value} {PIVOT_X} {PIVOT_Y})"
  />
  <circle cx={PIVOT_X} cy={PIVOT_Y} r="3" fill="#334155" />
</g>
