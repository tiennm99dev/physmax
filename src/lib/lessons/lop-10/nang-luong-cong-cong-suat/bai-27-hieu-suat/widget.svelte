<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import {
    DEVICES,
    FLOW,
    WASTE_MAX,
    WASTE_MIN,
    deviceOf,
    flowBands,
    split,
    wasteFromSeam,
  } from './engine.js';

  const W = 360;
  const H = 226;

  let deviceId = $state('xe');
  let total = $state(1000);
  let waste = $state(50);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const device = $derived(deviceOf(deviceId));
  const parts = $derived(split(total, waste));
  const bands = $derived(flowBands(waste));
  const gap = $derived(parts.efficiency - device.typical);

  /** @param {number} percent */
  function setWaste(percent) {
    waste = clamp(percent, WASTE_MIN, WASTE_MAX);
  }

  const note = $derived.by(() => {
    const sum = `$H = \\dfrac{W_{ci}}{W_{tp}} \\cdot 100\\% = \\dfrac{${numTex(parts.useful, 0)}}{${numTex(total, 0)}} \\cdot 100\\% = ${numTex(parts.efficiency, 1)}\\%$.`;
    if (Math.abs(gap) <= 5) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${sum} Gần với hiệu suất cỡ $${device.typical}\\%$ của ${device.label.toLowerCase()} thực tế.`,
      };
    }
    if (gap > 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${sum} Cao hơn nhiều so với mức khoảng $${device.typical}\\%$ của ${device.label.toLowerCase()} thực tế. Kéo tăng phần hao phí để về gần thực tế.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${sum} Thấp hơn mức khoảng $${device.typical}\\%$ của ${device.label.toLowerCase()} thực tế. Giảm hao phí giúp thiết bị đỡ tốn năng lượng hơn.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thiết bị"
    options={DEVICES.map((d) => ({ value: d.value, label: d.label }))}
    bind:value={deviceId}
  />

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label={`Biểu đồ dòng năng lượng của ${device.label}: toàn phần ${formatNumber(total)} jun, có ích ${formatNumber(parts.useful, 0)} jun, hao phí ${formatNumber(parts.waste, 0)} jun.`}
    >
      <text x={FLOW.left} y={FLOW.top - 8} font-size="11" font-weight="600" fill="#334155"
        >{`${device.source}: ${formatNumber(total, 0)} J`}</text
      >
      <path d={bands.supply} fill="#94a3b8" />
      <path d={bands.useful} fill="#10b981" />
      <path d={bands.waste} fill="#f87171" />
      <text
        x={FLOW.right}
        y={FLOW.top - 8}
        font-size="11"
        font-weight="600"
        fill="#047857"
        text-anchor="end">{`${device.useful}: ${formatNumber(parts.useful, 0)} J`}</text
      >
      <text
        x={FLOW.right}
        y={FLOW.top + FLOW.band + FLOW.drop + 14}
        font-size="11"
        font-weight="600"
        fill="#b91c1c"
        text-anchor="end">{`${device.waste}: ${formatNumber(parts.waste, 0)} J`}</text
      >
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Ranh giới có ích và hao phí: kéo lên xuống hoặc dùng phím lên xuống"
        aria-valuemin={WASTE_MIN}
        aria-valuemax={WASTE_MAX}
        aria-valuenow={waste}
        aria-valuetext={`Hao phí ${formatNumber(waste)} phần trăm, hiệu suất ${formatNumber(parts.efficiency)} phần trăm`}
        use:draggable={{
          point: { x: FLOW.split, y: bands.seam },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            setWaste(wasteFromSeam(p.y));
            return p;
          },
          onKeyMove: (_dx, dy, big) => setWaste(waste - dy * (big ? 10 : 1)),
        }}
      >
        <circle class="drag-knob" cx={FLOW.split} cy={bands.seam} r="9" fill="#312e81" />
        <path
          d="M {FLOW.split - 3} {bands.seam - 2} L {FLOW.split} {bands.seam - 5} L {FLOW.split +
            3} {bands.seam - 2} M {FLOW.split - 3} {bands.seam + 2} L {FLOW.split} {bands.seam +
            5} L {FLOW.split + 3} {bands.seam + 2}"
          fill="none"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Tỉ lệ hao phí"
      bind:value={waste}
      min={WASTE_MIN}
      max={WASTE_MAX}
      unit="%"
    />
    <SliderField
      label="Năng lượng toàn phần"
      bind:value={total}
      min={100}
      max={2000}
      step={100}
      unit="J"
    />
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm" aria-live="polite">
    <div class="rounded-xl bg-emerald-50 px-2 py-2">
      <dt class="font-semibold text-emerald-800">Có ích</dt>
      <dd class="tabular-nums">{`${formatNumber(parts.useful, 0)} J`}</dd>
    </div>
    <div class="rounded-xl bg-red-50 px-2 py-2">
      <dt class="font-semibold text-red-800">Hao phí</dt>
      <dd class="tabular-nums">{`${formatNumber(parts.waste, 0)} J`}</dd>
    </div>
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">Hiệu suất H</dt>
      <dd class="tabular-nums">{`${formatNumber(parts.efficiency, 1)}%`}</dd>
    </div>
  </dl>

  <div class="flex justify-end">
    <button type="button" class={button.quiet} onclick={() => (waste = 100 - device.typical)}>
      Về mức thực tế
    </button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
