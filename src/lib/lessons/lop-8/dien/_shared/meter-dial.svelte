<script>
  import { formatNumber } from '#lib/core/number-format.js';

  /**
   * The dial of a school ammeter or voltmeter: one tick per smallest division
   * (độ chia nhỏ nhất), a longer tick at each half label step, numbers at each
   * label step, and a needle from −60° (zero) to +60° (full scale). Purely
   * visual (`aria-hidden`): the caller announces the reading in text.
   *
   * - `letter`: 'A' or 'V', printed in the middle of the dial.
   * - `value`: the reading; null hides the needle (meter not connected).
   * - `range`, `division`: giới hạn đo and độ chia nhỏ nhất.
   * - `labelStep`: the gap between numbered marks.
   *
   * @type {{
   *   letter: string;
   *   value: number | null;
   *   range: number;
   *   division: number;
   *   labelStep: number;
   * }}
   */
  let { letter, value, range, division, labelStep } = $props();

  const CX = 100;
  const CY = 112;

  /** @param {number} deg @param {number} r */
  const onDial = (deg, r) => ({
    x: CX + r * Math.sin((deg * Math.PI) / 180),
    y: CY - r * Math.cos((deg * Math.PI) / 180),
  });
  const angleOf = (/** @type {number} */ v) => -60 + 120 * Math.max(0, Math.min(1.05, v / range));

  /** @param {number} v @param {number} step */
  const isMultiple = (v, step) => Math.abs(v / step - Math.round(v / step)) < 1e-6;

  const ticks = $derived(
    Array.from({ length: Math.round(range / division) + 1 }, (_, i) => {
      const v = Math.round(i * division * 1e6) / 1e6;
      const size = isMultiple(v, labelStep) ? 2 : isMultiple(v, labelStep / 2) ? 1 : 0;
      return { v, size, a: angleOf(v) };
    }),
  );
  const needle = $derived(angleOf(value ?? 0));
</script>

<svg viewBox="0 0 200 132" class="mx-auto block w-full max-w-[300px]" aria-hidden="true">
  <rect x="3" y="3" width="194" height="126" rx="12" fill="#f8fafc" stroke="#94a3b8" />
  {#each ticks as t (t.v)}
    {@const p1 = onDial(t.a, 88)}
    {@const p2 = onDial(t.a, [84, 80, 76][t.size])}
    <line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke="#334155"
      stroke-width={[0.6, 1, 1.6][t.size]}
    />
    {#if t.size === 2}
      {@const p3 = onDial(t.a, 66)}
      <text x={p3.x} y={p3.y + 3} text-anchor="middle" class="fill-slate-700 text-[10px]"
        >{formatNumber(t.v)}</text
      >
    {/if}
  {/each}
  <text x={CX} y="98" text-anchor="middle" class="fill-slate-800 text-[18px] font-bold"
    >{letter}</text
  >
  {#if value !== null}
    <line
      x1={CX}
      y1={CY}
      x2={CX}
      y2={CY - 80}
      stroke="#dc2626"
      stroke-width="1.5"
      style="transform: rotate({needle}deg); transform-origin: {CX}px {CY}px"
      class="motion-safe:transition-transform motion-safe:duration-500"
    />
  {/if}
  <circle cx={CX} cy={CY} r="4.5" fill="#1e293b" />
</svg>
