<script>
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import MotionPlot from '#lib/domain/motion-plot.svelte';
  import { formatNumber } from '#lib/units-engine/format.js';
  import {
    FIT_THRESHOLD,
    bestK,
    fitError,
    hypothesisHolds,
    hypothesisMotion,
    measure,
  } from './engine.js';

  const T_MAX = 5;
  /** @type {Record<import('./engine.js').Hypothesis, string>} */
  const NAMES = { linear: 's tỉ lệ với t', square: 's tỉ lệ với t²' };

  /** @type {import('./engine.js').Hypothesis} */
  let hypothesis = $state('linear');
  let k = $state(0.5);
  let run = $state(0);
  /** @type {import('./engine.js').Reading[]} */
  let data = $state([]);

  const measured = $derived(data.length > 0);
  const error = $derived(fitError(hypothesis, k, data));
  const fits = $derived(measured && error <= FIT_THRESHOLD);
  const motion = $derived(hypothesisMotion(hypothesis, k, T_MAX));
  const formula = $derived(
    hypothesis === 'linear' ? `s = ${formatNumber(k, 2)}·t` : `s = ${formatNumber(k, 2)}·t²`,
  );

  function experiment() {
    run += 1;
    data = measure(run);
  }
  function fitBest() {
    k = Math.round(bestK(hypothesis, data) * 100) / 100;
  }

  const verdict = $derived.by(() => {
    if (!measured) return 'Chọn một giả thuyết, rồi tiến hành thí nghiệm để có số liệu đo.';
    if (fits) {
      return `Giả thuyết "${NAMES[hypothesis]}" với ${formula} khớp số liệu (lệch trung bình ${formatNumber(error * 100, 1)}%).`;
    }
    if (!hypothesisHolds(hypothesis, data)) {
      return `Dù chọn k nào, giả thuyết "${NAMES[hypothesis]}" cũng không đi qua các điểm đo: cần bác bỏ nó.`;
    }
    return `Lệch trung bình ${formatNumber(error * 100, 1)}%: chỉnh k để đường giả thuyết đi qua các điểm đo.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Giả thuyết"
      options={[
        { value: 'linear', label: NAMES.linear },
        { value: 'square', label: NAMES.square },
      ]}
      bind:value={hypothesis}
    />
    <SliderField
      label="Hệ số k"
      bind:value={k}
      min={0.05}
      max={1.5}
      step={0.01}
      format={(v) => formatNumber(v, 2)}
    />
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={experiment}>
      {measured ? 'Làm lại thí nghiệm' : 'Tiến hành thí nghiệm'}
    </button>
    <button type="button" class={button.quiet} onclick={fitBest} disabled={!measured}>
      Tìm k khớp nhất
    </button>
  </div>

  <MotionPlot
    kind="x-t"
    positionSymbol="s"
    motions={[{ name: `Giả thuyết: ${formula}`, motion }]}
    {data}
    dataName="Quãng đường đo được"
    tMax={T_MAX}
    yMin={0}
    yMax={8}
    label="Quãng đường viên bi lăn trên máng nghiêng theo thời gian"
  />

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {fits
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {verdict}
  </p>

  {#if measured}
    <div class="overflow-x-auto">
      <table class="w-full min-w-80 text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">
          Số liệu lần đo thứ {run}
        </caption>
        <thead>
          <tr class="border-b border-slate-300 text-slate-600">
            <th scope="col" class="py-1">t (s)</th>
            <th scope="col" class="py-1">s (m)</th>
            <th scope="col" class="py-1">s / t</th>
            <th scope="col" class="py-1">s / t²</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d (d.t)}
            <tr class="border-b border-slate-100">
              <td class="py-1">{d.t}</td>
              <td class="py-1">{formatNumber(d.value, 2)}</td>
              <td class="py-1">{formatNumber(d.value / d.t, 3)}</td>
              <td class="py-1">{formatNumber(d.value / (d.t * d.t), 3)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
