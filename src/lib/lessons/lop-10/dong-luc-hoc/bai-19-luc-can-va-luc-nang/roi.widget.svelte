<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { DRAG_FACTOR, G, fallSpeed, terminalSpeed } from './engine.js';

  const T_MAX = 20;
  const MODES = [
    { value: 'shut', label: 'Chưa bung dù' },
    { value: 'open', label: 'Đã bung dù' },
  ];

  let mode = $state('shut');
  let mass = $state(70);
  let time = $state(3);

  const k = $derived(mode === 'open' ? DRAG_FACTOR.open : DRAG_FACTOR.shut);
  const top = $derived(terminalSpeed(mass, k));
  const speed = $derived(fallSpeed(mass, k, time));
  const weight = $derived(mass * G);
  const drag = $derived(k * speed * speed);
  const yMax = $derived(mode === 'open' ? 8 : 70);
  const curve = $derived(
    Array.from({ length: 41 }, (_, i) => {
      const t = (T_MAX * i) / 40;
      return { x: t, y: fallSpeed(mass, k, t) };
    }),
  );
  const steady = $derived(speed >= 0.99 * top);
  /** Pixels per newton. */
  const K = 0.07;
</script>

<div class="space-y-4">
  <SegmentedControl label="Người nhảy dù" options={MODES} bind:value={mode} />

  <div class="grid gap-3 sm:grid-cols-[7rem_1fr]">
    <div class="{card} p-2">
      <svg
        viewBox="0 0 120 170"
        class="mx-auto block h-44 w-full select-none"
        role="img"
        aria-label={`Trọng lực ${formatNumber(weight, 0)} niutơn, lực cản ${formatNumber(drag, 0)} niutơn.`}
      >
        {#if mode === 'open'}
          <path d="M 28 30 Q 60 -6 92 30 Z" fill="#fca5a5" stroke="#b91c1c" />
          <line x1="28" y1="30" x2="60" y2="85" stroke="#94a3b8" />
          <line x1="92" y1="30" x2="60" y2="85" stroke="#94a3b8" />
        {/if}
        <circle cx="60" cy="85" r="9" fill="#1e293b" />
        <ForceArrow
          x1={60}
          y1={85}
          x2={60}
          y2={85 + weight * K}
          color="#0f172a"
          label="P"
          labelDx={8}
          labelDy={-4}
        />
        <ForceArrow
          x1={60}
          y1={85}
          x2={60}
          y2={85 - drag * K}
          color="#dc2626"
          label="Fc"
          labelDx={8}
          labelDy={10}
        />
      </svg>
    </div>
    <div class="{card} p-2">
      <XyPlot
        lines={[{ points: curve, color: '#4f46e5' }]}
        marks={[{ x: time, y: speed }]}
        guides={[{ y: Math.min(top, yMax), label: 'Tốc độ giới hạn', color: '#059669' }]}
        xMax={T_MAX}
        {yMax}
        xTicks={ticksUpTo(T_MAX)}
        yTicks={ticksUpTo(yMax)}
        xLabel="t (s)"
        yLabel="v (m/s)"
        label={`Đồ thị tốc độ theo thời gian. Tốc độ tăng dần rồi tiến tới ${formatNumber(top, 1)} mét trên giây.`}
      />
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Thời gian rơi t"
      bind:value={time}
      min={0}
      max={T_MAX}
      step={0.5}
      unit="s"
    />
    <SliderField label="Khối lượng m" bind:value={mass} min={50} max={100} step={5} unit="kg" />
  </div>

  <FeedbackNote
    tone={steady ? 'ok' : 'info'}
    text={steady
      ? `Lực cản đã gần bằng trọng lực nên hợp lực gần bằng $0$: người rơi gần như đều với tốc độ giới hạn khoảng $${numTex(top, 1)}$ m/s.`
      : `Tốc độ $${numTex(speed, 1)}$ m/s còn nhỏ nên lực cản $${numTex(drag, 0)}$ N nhỏ hơn trọng lực $${numTex(weight, 0)}$ N: người vẫn rơi nhanh dần, nhưng gia tốc giảm dần.`}
  />
</div>
