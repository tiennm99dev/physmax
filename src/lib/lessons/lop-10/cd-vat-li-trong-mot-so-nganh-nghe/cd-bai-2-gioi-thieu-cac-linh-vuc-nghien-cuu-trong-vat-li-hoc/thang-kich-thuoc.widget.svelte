<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { SCALE, compareWithPerson } from './engine.js';

  let index = $state(2);
  const stop = $derived(SCALE[index]);
  /** The stop's place on a bar running from the smallest to the largest power of ten. */
  const first = SCALE[0].exponent;
  const span = SCALE[SCALE.length - 1].exponent - first;
  const percent = $derived(((stop.exponent - first) / span) * 100);
  const personPercent = (-first / span) * 100;
</script>

<div class="space-y-3">
  <SliderField
    label="Kích thước"
    bind:value={index}
    min={0}
    max={SCALE.length - 1}
    format={(i) => SCALE[i].thing}
  />
  <div class="relative h-3 rounded-full bg-slate-200" aria-hidden="true">
    <span class="absolute top-0 h-3 w-0.5 bg-slate-500" style="left: {personPercent}%"></span>
    <span
      class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
      style="left: {percent}%"
    ></span>
  </div>
  <p class="text-xs text-slate-600">
    Mỗi đoạn bằng nhau trên thang ứng với cùng một số lần gấp 10. Vạch đứng là kích thước con người,
    cỡ 1 m.
  </p>
  <div class="{card} space-y-1 p-4 text-sm text-slate-700" aria-live="polite">
    <p class="text-base font-bold text-slate-900">{stop.thing}</p>
    <p>Kích thước: <LiveRichText text={stop.size} /></p>
    <p><LiveRichText text={compareWithPerson(stop.exponent)} /></p>
    <p><span class="font-semibold">Lĩnh vực:</span> {stop.fieldName}</p>
  </div>
</div>
