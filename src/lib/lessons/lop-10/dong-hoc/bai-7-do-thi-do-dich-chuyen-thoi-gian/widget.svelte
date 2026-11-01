<script>
  import DtPlot from './d-t-plot.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, snap } from '#lib/core/visuals/svg-math.js';
  import {
    D_MAX,
    D_MIN,
    TARGETS,
    T_MAX,
    meanError,
    motionWord,
    slopeAt,
    valueAt,
    verdict,
  } from './engine.js';

  const W = 360;
  const H = 74;
  const X0 = 20;
  const X1 = 340;
  const LINE_Y = 52;
  const SAMPLE_EVERY = 0.1;

  /** @param {number} d */
  const dx = (d) => X0 + ((d - D_MIN) / (D_MAX - D_MIN)) * (X1 - X0);
  const marks = Array.from({ length: (D_MAX - D_MIN) / 5 + 1 }, (_, i) => D_MIN + i * 5);

  let targetId = $state('deu');
  let position = $state(0);
  let t = $state(0);
  /** @type {Array<{ t: number, d: number }>} */
  let samples = $state([]);
  let running = $state(false);
  let reading = $state(0);
  /** @type {SVGSVGElement | null} */
  let track = $state(null);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const target = $derived(TARGETS.find((g) => g.id === targetId) ?? TARGETS[0]);
  const finished = $derived(t >= T_MAX);
  const error = $derived(meanError(samples, target.points));
  const velocity = $derived(slopeAt(samples, running ? t - 0.5 : reading));
  const cursor = $derived(running || samples.length === 0 ? null : reading);
  const note = $derived.by(() => {
    if (finished && target.points.length > 0) return verdict(error);
    if (samples.length < 2) {
      return /** @type {const} */ ({
        tone: 'info',
        text: 'Nhấn "Bắt đầu ghi" rồi kéo nhân vật trên đường thẳng. Đồ thị được vẽ ngay trong lúc em kéo.',
      });
    }
    const at = running ? t : reading;
    return /** @type {const} */ ({
      tone: 'info',
      text: `Tại $t = ${numTex(at, 1)}$ s, $d \\approx ${numTex(valueAt(samples, at), 1)}$ m, độ dốc cho $v \\approx ${numTex(velocity, 1)}$ m/s: nhân vật ${motionWord(velocity)}.`,
    });
  });

  function halt() {
    stopLoop?.();
    stopLoop = null;
    running = false;
  }

  function clear() {
    halt();
    t = 0;
    samples = [];
    reading = 0;
    position = target.points[0]?.d ?? 0;
  }

  /** @param {number} next */
  function sampleTo(next) {
    samples = [...samples, { t: tidy(next, 2), d: position }];
    t = next;
    reading = next;
  }

  function begin() {
    if (finished) clear();
    if (samples.length === 0) sampleTo(0);
    running = true;
    let clock = 0;
    stopLoop = frameLoop((dt) => {
      clock += dt;
      if (clock < SAMPLE_EVERY) return;
      const next = Math.min(T_MAX, tidy(t + clock, 3));
      clock = 0;
      sampleTo(next);
      if (next >= T_MAX) halt();
    });
  }

  function stepOne() {
    if (finished) return;
    if (samples.length === 0) sampleTo(0);
    sampleTo(Math.min(T_MAX, t + 1));
  }

  /** @param {number} d */
  function moveTo(d) {
    position = clamp(snap(d, 0.5), D_MIN, D_MAX);
  }

  $effect(() => halt);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đồ thị cần vẽ"
    options={TARGETS.map((g) => ({ value: g.id, label: g.label }))}
    bind:value={targetId}
    onchange={clear}
  />

  <div class="{card} p-2">
    <svg
      bind:this={track}
      viewBox="0 0 {W} {H}"
      class="w-full"
      role="group"
      aria-label="Đường thẳng có trục độ dịch chuyển, kéo nhân vật dọc theo đường, hoặc dùng phím mũi tên trái và phải."
    >
      <line x1={X0} x2={X1} y1={LINE_Y} y2={LINE_Y} stroke="#64748b" stroke-width="3" />
      {#each marks as d (d)}
        <line x1={dx(d)} x2={dx(d)} y1={LINE_Y - 4} y2={LINE_Y + 4} stroke="#64748b" />
        {#if d % 10 === 0}
          <text x={dx(d)} y={LINE_Y + 18} font-size="11" fill="#475569" text-anchor="middle">
            {formatNumber(d)}
          </text>
        {/if}
      {/each}
      <text x={X0} y={12} font-size="11" fill="#475569">d (m)</text>
      <g
        class="drag-handle cursor-ew-resize touch-none outline-none"
        role="slider"
        tabindex="0"
        aria-label="Vị trí của nhân vật"
        aria-valuemin={D_MIN}
        aria-valuemax={D_MAX}
        aria-valuenow={position}
        aria-valuetext={`${formatNumber(position, 1)} mét`}
        use:draggable={{
          point: { x: dx(position), y: LINE_Y },
          svg: () => track,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            moveTo(D_MIN + ((p.x - X0) / (X1 - X0)) * (D_MAX - D_MIN));
            return p;
          },
          onKeyMove: (x, y, big) => {
            const dir = x !== 0 ? x : -y;
            if (dir !== 0) moveTo(position + dir * (big ? 5 : 1));
          },
        }}
      >
        <circle
          class="drag-knob"
          cx={dx(position)}
          cy={LINE_Y - 24}
          r="9"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="2"
        />
        <line
          x1={dx(position)}
          x2={dx(position)}
          y1={LINE_Y - 15}
          y2={LINE_Y}
          stroke="#4f46e5"
          stroke-width="4"
        />
      </g>
    </svg>
  </div>

  <div class="flex flex-wrap items-center gap-2">
    {#if running}
      <button type="button" class={button.secondary} onclick={halt}>Tạm dừng</button>
    {:else}
      <button type="button" class={button.primary} onclick={begin}>
        {samples.length > 0 && !finished ? 'Ghi tiếp' : 'Bắt đầu ghi'}
      </button>
      <button type="button" class={button.secondary} disabled={finished} onclick={stepOne}>
        Ghi thêm 1 s
      </button>
    {/if}
    <button type="button" class={button.quiet} onclick={clear}>Xoá đồ thị</button>
    <span class="text-sm tabular-nums text-slate-700">
      {`t = ${formatNumber(t, 1)} s / ${T_MAX} s`}
    </span>
  </div>

  <div class="{card} p-2">
    <DtPlot
      points={samples}
      target={target.points}
      tMax={T_MAX}
      tStep={2}
      dMin={D_MIN}
      dMax={D_MAX}
      dStep={10}
      {cursor}
      label={`Đồ thị độ dịch chuyển theo thời gian vừa vẽ, đang ở ${formatNumber(t, 1)} giây, nhân vật ở ${formatNumber(position, 1)} mét.`}
    />
  </div>

  {#if !running && samples.length > 1}
    <SliderField
      label="Đọc đồ thị tại thời điểm"
      bind:value={reading}
      min={0}
      max={t}
      step={0.5}
      unit="s"
    />
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
