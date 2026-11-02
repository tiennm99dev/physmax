<script>
  import { onMount } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, snap } from '#lib/core/visuals/svg-math.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { DRAG, kineticOf, mechanicalOf, potentialOf, releaseAt, stepSwing } from './engine.js';

  const W = 360;
  const H = 210;
  const PIVOT_X = 180;
  const PIVOT_Y = 16;
  const ROPE_PX = 160;
  const T_MAX = 30;
  const STEP_SECONDS = 0.2;
  const SAMPLE_EVERY = 0.1;
  const MODES = [
    { value: 'khong', label: 'Không lực cản' },
    { value: 'co', label: 'Có lực cản' },
  ];

  let mass = $state(2);
  let angle = $state(60);
  let mode = $state('khong');
  let swing = $state(releaseAt(60));
  let running = $state(false);
  let time = $state(0);
  /** Mechanical energy held fixed while nothing drags on the bob, in J. */
  let held = $state(mechanicalOf(2, releaseAt(60)));
  /** @type {SVGSVGElement | null} */
  let board = $state(null);
  /** @type {Array<{ t: number, wt: number, wd: number, w: number }>} */
  let trace = $state([]);
  let sinceSample = 0;
  let still = $state(false);

  onMount(() => {
    still = reducedMotion();
  });

  const drag = $derived(mode === 'co' ? DRAG : 0);
  const released = $derived(mechanicalOf(mass, releaseAt(angle)));
  const wt = $derived(potentialOf(mass, swing.theta));
  const total = $derived(drag > 0 ? wt + kineticOf(mass, swing.omega) : held);
  const wd = $derived(Math.max(0, total - wt));
  const lost = $derived(Math.max(0, released - total));
  const bobX = $derived(PIVOT_X + ROPE_PX * Math.sin(swing.theta));
  const bobY = $derived(PIVOT_Y + ROPE_PX * Math.cos(swing.theta));
  const rest = $derived(time === 0 && !running);
  const atEnd = $derived(time >= T_MAX);
  const yMax = $derived(released * 1.1);
  const lines = $derived([
    { points: trace.map((p) => ({ x: p.t, y: p.w })), color: '#334155' },
    { points: trace.map((p) => ({ x: p.t, y: p.wt })), color: '#0ea5e9' },
    { points: trace.map((p) => ({ x: p.t, y: p.wd })), color: '#f59e0b' },
  ]);
  const segments = $derived([
    { name: 'Thế năng', value: wt, fill: '#0ea5e9' },
    { name: 'Động năng', value: wd, fill: '#f59e0b' },
    { name: 'Nhiệt do lực cản', value: lost, fill: '#ef4444' },
  ]);

  function reset() {
    running = false;
    time = 0;
    sinceSample = 0;
    trace = [];
    swing = releaseAt(angle);
    held = mechanicalOf(mass, swing);
  }

  /** @param {number} deg */
  function setAngle(deg) {
    angle = clamp(snap(deg, 5), 10, 80);
    reset();
  }

  /** @param {number} dt */
  function advance(dt) {
    swing = stepSwing(swing, dt, drag);
    time = Math.min(T_MAX, time + dt);
    sinceSample += dt;
    if (sinceSample >= SAMPLE_EVERY) {
      sinceSample = 0;
      trace = [...trace, { t: time, wt, wd, w: total }];
    }
    if (time >= T_MAX) running = false;
  }

  function play() {
    if (atEnd) reset();
    if (rest && trace.length === 0) {
      trace = [{ t: 0, wt, wd, w: total }];
    }
    if (still) {
      for (let i = 0; i < 2; i += 1) advance(STEP_SECONDS / 2);
      return;
    }
    running = !running;
  }

  /** Switching friction off keeps whatever energy is left from that moment on. */
  function onMode() {
    held = mechanicalOf(mass, swing);
  }

  $effect(() => {
    if (!running) return;
    return frameLoop(advance);
  });

  const note = $derived.by(() => {
    const sum = `$W = W_đ + W_t = ${numTex(wd, 1)} + ${numTex(wt, 1)} = ${numTex(total, 1)}$ J`;
    if (drag > 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${sum}. Có lực cản nên cơ năng giảm dần: phần đã mất $${numTex(lost, 1)}$ J chuyển thành nhiệt, biên độ nhỏ dần.`,
      };
    }
    if (lost > 0.05) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${sum}. Tắt lực cản: cơ năng còn lại không giảm nữa, nhưng phần $${numTex(lost, 1)}$ J đã thành nhiệt không tự quay về.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${sum}. Không có lực cản: động năng và thế năng đổi cho nhau, cơ năng không đổi.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label={`Con lắc đơn, góc lệch ban đầu ${formatNumber(angle)} độ. Thế năng ${formatNumber(wt, 1)} jun, động năng ${formatNumber(wd, 1)} jun.`}
    >
      <line
        x1={PIVOT_X - 40}
        x2={PIVOT_X + 40}
        y1={PIVOT_Y}
        y2={PIVOT_Y}
        stroke="#475569"
        stroke-width="3"
      />
      <line
        x1={PIVOT_X}
        x2={PIVOT_X}
        y1={PIVOT_Y}
        y2={PIVOT_Y + ROPE_PX + 8}
        stroke="#cbd5e1"
        stroke-dasharray="4 4"
      />
      <line
        x1="20"
        x2={W - 20}
        y1={PIVOT_Y + ROPE_PX}
        y2={PIVOT_Y + ROPE_PX}
        stroke="#7c3aed"
        stroke-dasharray="5 4"
      />
      <text x="20" y={PIVOT_Y + ROPE_PX + 14} font-size="11" font-weight="600" fill="#7c3aed"
        >Mốc thế năng</text
      >
      <line x1={PIVOT_X} y1={PIVOT_Y} x2={bobX} y2={bobY} stroke="#334155" stroke-width="2" />
      {#if rest}
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label="Quả nặng: kéo hoặc dùng phím trái phải để chọn góc lệch ban đầu"
          aria-valuemin={10}
          aria-valuemax={80}
          aria-valuenow={angle}
          aria-valuetext={`Góc lệch ${formatNumber(angle)} độ`}
          use:draggable={{
            point: { x: bobX, y: bobY },
            svg: () => board,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => {
              setAngle((Math.atan2(p.x - PIVOT_X, p.y - PIVOT_Y) * 180) / Math.PI);
              return p;
            },
            onKeyMove: (dx, _dy, big) => setAngle(angle + dx * (big ? 15 : 5)),
          }}
        >
          <circle class="drag-knob" cx={bobX} cy={bobY} r="12" fill="#dc2626" />
        </g>
      {:else}
        <circle cx={bobX} cy={bobY} r="12" fill="#dc2626" />
      {/if}
    </svg>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <button type="button" class={button.primary} onclick={play}>
      {still
        ? `Tiến ${formatNumber(STEP_SECONDS)} s`
        : running
          ? 'Tạm dừng'
          : atEnd
            ? 'Thả lại'
            : 'Thả con lắc'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
    <SegmentedControl label="Lực cản" options={MODES} bind:value={mode} onchange={onMode} />
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Góc lệch ban đầu"
      bind:value={angle}
      min={10}
      max={80}
      step={5}
      unit="°"
      oninput={reset}
    />
    <SliderField
      label="Khối lượng m"
      bind:value={mass}
      min={0.5}
      max={4}
      step={0.5}
      unit="kg"
      oninput={reset}
    />
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      Biểu đồ năng lượng so với cơ năng lúc thả
      <span class="tabular-nums">{`(${formatNumber(released, 1)} J)`}</span>
    </p>
    <div
      class="flex h-6 overflow-hidden rounded-full bg-slate-100"
      role="img"
      aria-label={`Thế năng ${formatNumber(wt, 1)} jun, động năng ${formatNumber(wd, 1)} jun, nhiệt ${formatNumber(lost, 1)} jun.`}
    >
      {#each segments as seg (seg.name)}
        <div
          class="h-full"
          style:width={`${(seg.value / released) * 100}%`}
          style:background-color={seg.fill}
        ></div>
      {/each}
    </div>
    <ul class="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs tabular-nums text-slate-700">
      {#each segments as seg (seg.name)}
        <li>
          <span
            class="mr-1 inline-block h-2 w-2 rounded-full"
            style:background-color={seg.fill}
            aria-hidden="true"
          ></span>{`${seg.name}: ${formatNumber(seg.value, 1)} J`}
        </li>
      {/each}
    </ul>
  </div>

  <div class="{card} p-2">
    <XyPlot
      {lines}
      xMax={T_MAX}
      {yMax}
      xTicks={ticksUpTo(T_MAX)}
      yTicks={ticksUpTo(yMax)}
      xLabel="t (s)"
      yLabel="W (J)"
      label={`Đồ thị cơ năng, thế năng và động năng theo thời gian. Cơ năng hiện tại ${formatNumber(total, 1)} jun.`}
    />
    <p class="px-2 pb-1 text-xs text-slate-600">
      Đường xám đậm: cơ năng. Đường xanh: thế năng. Đường cam: động năng.
    </p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
