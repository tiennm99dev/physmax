<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { GEARS, ROADS, bestGear, pullOf } from './engine.js';

  const V_MAX = 40;
  const F_MAX = 13000;

  let power = $state(60);
  let gear = $state(3);
  let road = $state('thoai');

  const speed = $derived((GEARS.find((g) => g.value === gear) ?? GEARS[0]).speed);
  const need = $derived((ROADS.find((r) => r.value === road) ?? ROADS[0]).need);
  const pull = $derived(pullOf(power * 1000, speed));
  const best = $derived(bestGear(power * 1000, need));
  const curve = $derived(
    Array.from({ length: 64 }, (_, i) => {
      const v = 4 + i * ((V_MAX - 4) / 63);
      return { x: v, y: pullOf(power * 1000, v) };
    }).filter((p) => p.y <= F_MAX),
  );

  const note = $derived.by(() => {
    const sum = `$F = \\dfrac{P}{v} = \\dfrac{${numTex(power * 1000)}}{${speed}} ${Number.isInteger(pull) ? '=' : '\\approx'} ${numTex(pull, 0)}$ N`;
    if (pull < need) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${sum}, chưa đủ lực $${numTex(need)}$ N mà đoạn đường này cần: xe sẽ chậm dần. ${best ? 'Hãy về số thấp hơn để đổi tốc độ lấy lực.' : 'Công suất này quá nhỏ cho đoạn đường này, kể cả ở số 1.'}`,
      };
    }
    if (best && best.value === gear) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${sum}, đủ lực cần thiết $${numTex(need)}$ N. Đây là số cao nhất còn kéo được xe trên đoạn đường này.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${sum}, dư so với lực cần thiết $${numTex(need)}$ N. Có thể lên số cao hơn để xe đi nhanh hơn mà vẫn đủ lực.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl label="Số của hộp số" options={GEARS} bind:value={gear} />
    <SegmentedControl label="Đoạn đường" options={ROADS} bind:value={road} />
  </div>
  <SliderField
    label="Công suất động cơ P"
    bind:value={power}
    min={20}
    max={100}
    step={10}
    unit="kW"
  />
  <div class="{card} p-2">
    <XyPlot
      lines={[{ points: curve, color: '#4f46e5' }]}
      marks={[{ x: speed, y: pull, color: '#dc2626' }]}
      guides={[{ y: need, label: 'Lực cần', color: '#0f766e' }]}
      xMax={V_MAX}
      yMax={F_MAX}
      xTicks={ticksUpTo(V_MAX)}
      yTicks={ticksUpTo(F_MAX)}
      xLabel="v (m/s)"
      yLabel="F (N)"
      label={`Đồ thị lực kéo theo tốc độ ở công suất ${formatNumber(power)} kilôoát. Ở tốc độ ${speed} mét trên giây, lực kéo khoảng ${formatNumber(pull, 0)} niutơn.`}
    />
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
