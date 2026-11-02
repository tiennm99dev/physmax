<script>
  import { tracePoints } from './current-trace.js';

  /**
   * A plot of current against time over the last `span` seconds. `pushSample`
   * in `current-trace.js` keeps the samples; `children` draws notes on the plot.
   * @type {{
   *   trace: ReadonlyArray<{ t: number, i: number }>;
   *   clock: number;
   *   span: number;
   *   label: string;
   *   height?: number;
   *   amp?: number;
   *   children?: import('svelte').Snippet;
   * }}
   */
  let { trace, clock, span, label, height = 100, amp = 38, children } = $props();

  const mid = $derived(height / 2);
  const points = $derived(tracePoints(trace, clock, span, mid, amp));
</script>

<svg viewBox="0 0 360 {height}" class="block w-full" role="img" aria-label={label}>
  <line x1="24" y1={mid} x2="354" y2={mid} stroke="#94a3b8" />
  <line x1="24" y1={mid - amp - 4} x2="24" y2={mid + amp + 4} stroke="#94a3b8" />
  <text x="4" y="14" class="fill-slate-600 text-[11px] italic">I</text>
  <text x="346" y={mid + 14} class="fill-slate-600 text-[11px] italic">t</text>
  {@render children?.()}
  {#if trace.length > 1}
    <polyline {points} fill="none" stroke="#4f46e5" stroke-width="2" />
  {/if}
</svg>
