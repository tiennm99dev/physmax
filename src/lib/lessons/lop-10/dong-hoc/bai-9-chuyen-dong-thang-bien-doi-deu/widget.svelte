<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    KIND_TEXT,
    T_MAX,
    T_MIN,
    V_MAX,
    V_MIN,
    accelerationOf,
    areaPieces,
    classify,
    displacementAt,
    distanceAt,
    pieceArea,
    roadExtent,
    velocityAt,
  } from './engine.js';

  const W = 360;
  const H = 250;
  const LEFT = 36;
  const RIGHT = 14;
  const TOP = 18;
  const BOTTOM = 28;
  const V_TICKS = [-10, -5, 0, 5, 10, 15, 20];
  const T_TICKS = [0, 2, 4, 6, 8, 10];
  const PRESETS = [
    { label: 'Nhanh dần từ nghỉ', v0: 0, vEnd: 15, T: 6 },
    { label: 'Chậm dần đến dừng', v0: 15, vEnd: 0, T: 6 },
    { label: 'Đổi chiều', v0: 12, vEnd: -8, T: 10 },
    { label: 'Thẳng đều', v0: 10, vEnd: 10, T: 8 },
  ];

  let v0 = $state(5);
  let vEnd = $state(15);
  let T = $state(8);
  let time = $state(8);
  let playing = $state(false);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const px = linear(0, T_MAX, LEFT, W - RIGHT);
  const py = linear(V_MIN, V_MAX, H - BOTTOM, TOP);

  const a = $derived(accelerationOf(v0, vEnd, T));
  const v = $derived(velocityAt(v0, a, time));
  const d = $derived(displacementAt(v0, a, time));
  const s = $derived(distanceAt(v0, a, time));
  const pieces = $derived(areaPieces(v0, a, time));
  const kind = $derived(classify(v, a));

  // The road below the graph runs from −extent to +extent metres, inset far
  // enough that the longest velocity arrow (44 units) stays on the drawing.
  const extent = $derived(roadExtent(v0, a, T));
  const rx = $derived(linear(-extent, extent, 60, W - 60));

  /** @param {number} value */
  const term = (value) => (value < 0 ? `(${numTex(value, 2)})` : numTex(value, 2));
  const velocityLine = $derived(
    `$v = v_0 + at = ${numTex(v0, 2)} + ${term(a)} \\cdot ${numTex(time, 1)} = ${numTex(v, 2)}$ m/s`,
  );
  const formulaLine = $derived(
    `$d = v_0t + \\dfrac{1}{2}at^2 = ${numTex(v0, 2)} \\cdot ${numTex(time, 1)} + \\dfrac{1}{2} \\cdot ${term(a)} \\cdot ${numTex(time, 1)}^2 = ${numTex(d, 2)}$ m`,
  );
  const areaLine = $derived.by(() => {
    if (pieces.length === 2) {
      const [first, second] = pieces.map(pieceArea);
      return `Hai phần diện tích trái dấu: $${numTex(first, 2)} + ${term(second)} = ${numTex(d, 2)}$ m là độ dịch chuyển, còn quãng đường là $${numTex(Math.abs(first), 2)} + ${numTex(Math.abs(second), 2)} = ${numTex(s, 2)}$ m.`;
    }
    return `Diện tích tô màu: $\\dfrac{(v_0 + v)t}{2} = \\dfrac{(${numTex(v0, 2)} + ${term(v)}) \\cdot ${numTex(time, 1)}}{2} = ${numTex(d, 2)}$ m, đúng bằng độ dịch chuyển.`;
  });

  function stop() {
    stopLoop?.();
    stopLoop = null;
    playing = false;
  }

  function play() {
    if (playing) {
      stop();
      return;
    }
    if (reducedMotion()) {
      time = T;
      return;
    }
    if (time >= T) time = 0;
    playing = true;
    stopLoop = frameLoop((dt) => {
      time = Math.min(T, time + dt);
      if (time >= T) stop();
    });
  }

  /** @param {number} next */
  function setV0(next) {
    v0 = clamp(Math.round(next), V_MIN, V_MAX);
    stop();
  }

  /** @param {number} next */
  function setEnd(next) {
    vEnd = clamp(Math.round(next), V_MIN, V_MAX);
    stop();
  }

  /** @param {number} next */
  function setT(next) {
    T = clamp(Math.round(next), T_MIN, T_MAX);
    time = Math.min(time, T);
    stop();
  }

  /** @param {typeof PRESETS[number]} preset */
  function choose(preset) {
    stop();
    v0 = preset.v0;
    vEnd = preset.vEnd;
    T = preset.T;
    time = preset.T;
  }

  /** @param {Array<{ t: number, v: number }>} points */
  const polygon = (points) =>
    points.map((p) => `${px.map(p.t).toFixed(1)},${py.map(p.v).toFixed(1)}`).join(' ');

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2">
    {#each PRESETS as preset (preset.label)}
      <button type="button" class={button.quiet} onclick={() => choose(preset)}>
        {preset.label}
      </button>
    {/each}
  </div>

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Đồ thị vận tốc theo thời gian. Kéo hai đầu đoạn thẳng hoặc dùng phím mũi tên để đổi vận tốc đầu, vận tốc cuối và thời gian."
    >
      {#each V_TICKS as tick (tick)}
        <line
          x1={LEFT}
          x2={W - RIGHT}
          y1={py.map(tick)}
          y2={py.map(tick)}
          stroke={tick === 0 ? '#334155' : '#e2e8f0'}
          stroke-width={tick === 0 ? 1.5 : 1}
        />
        <text x={LEFT - 10} y={py.map(tick) + 4} font-size="11" fill="#475569" text-anchor="end">
          {formatNumber(tick)}
        </text>
      {/each}
      {#each T_TICKS as tick (tick)}
        <line x1={px.map(tick)} x2={px.map(tick)} y1={TOP} y2={H - BOTTOM} stroke="#e2e8f0" />
        <text
          x={px.map(tick)}
          y={H - BOTTOM + 15}
          font-size="11"
          fill="#475569"
          text-anchor="middle"
        >
          {tick}
        </text>
      {/each}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
      <text x={4} y={10} font-size="12" font-weight="600" fill="#334155">v (m/s)</text>
      <text
        x={W - RIGHT}
        y={H - 2}
        font-size="12"
        font-weight="600"
        fill="#334155"
        text-anchor="end"
      >
        t (s)
      </text>

      {#each pieces as piece, i (i)}
        <polygon
          points={polygon(piece.points)}
          fill={piece.sign > 0 ? '#4f46e5' : '#e11d48'}
          fill-opacity="0.22"
        />
      {/each}
      <line
        x1={px.map(0)}
        y1={py.map(v0)}
        x2={px.map(T)}
        y2={py.map(vEnd)}
        stroke="#4f46e5"
        stroke-width="3"
        stroke-linecap="round"
      />
      <line
        x1={px.map(time)}
        x2={px.map(time)}
        y1={TOP}
        y2={H - BOTTOM}
        stroke="#0f172a"
        stroke-dasharray="4 3"
      />
      <circle cx={px.map(time)} cy={py.map(v)} r="4" fill="#0f172a" />

      <g
        class="drag-handle cursor-ns-resize outline-none"
        role="slider"
        tabindex="0"
        aria-label="Vận tốc đầu v0, phím lên xuống để đổi"
        aria-valuemin={V_MIN}
        aria-valuemax={V_MAX}
        aria-valuenow={v0}
        aria-valuetext={`${formatNumber(v0)} mét trên giây`}
        use:draggable={{
          point: { x: px.map(0), y: py.map(v0) },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            setV0(py.invert(p.y));
            return p;
          },
          onKeyMove: (_dx, dy, big) => setV0(v0 - dy * (big ? 5 : 1)),
        }}
      >
        <circle class="drag-knob" cx={px.map(0)} cy={py.map(v0)} r="8" fill="#0284c7" />
      </g>
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Đầu cuối của đồ thị: phím lên xuống đổi vận tốc cuối, phím trái phải đổi thời gian"
        aria-valuemin={V_MIN}
        aria-valuemax={V_MAX}
        aria-valuenow={vEnd}
        aria-valuetext={`Vận tốc ${formatNumber(vEnd)} mét trên giây tại thời điểm ${T} giây`}
        use:draggable={{
          point: { x: px.map(T), y: py.map(vEnd) },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            setEnd(py.invert(p.y));
            setT(px.invert(p.x));
            return p;
          },
          onKeyMove: (dx, dy, big) => {
            if (dy !== 0) setEnd(vEnd - dy * (big ? 5 : 1));
            if (dx !== 0) setT(T + dx);
          },
        }}
      >
        <circle class="drag-knob" cx={px.map(T)} cy={py.map(vEnd)} r="8" fill="#c026d3" />
      </g>
    </svg>

    <svg
      viewBox="0 0 {W} 64"
      class="mt-1 w-full"
      role="img"
      aria-label={`Vị trí của xe: độ dịch chuyển ${formatNumber(d, 1)} mét, vận tốc ${formatNumber(v, 1)} mét trên giây.`}
    >
      <line x1="22" x2={W - 22} y1="40" y2="40" stroke="#475569" stroke-width="2" />
      {#each [-extent, 0, extent] as mark (mark)}
        <line x1={rx.map(mark)} x2={rx.map(mark)} y1="35" y2="45" stroke="#475569" />
        <text x={rx.map(mark)} y="60" font-size="11" fill="#475569" text-anchor="middle">
          {`${formatNumber(mark)} m`}
        </text>
      {/each}
      <line
        x1={rx.map(0)}
        x2={rx.map(d)}
        y1="40"
        y2="40"
        stroke={d >= 0 ? '#4f46e5' : '#e11d48'}
        stroke-width="4"
      />
      <rect x={rx.map(d) - 12} y="24" width="24" height="12" rx="3" fill="#0f172a" />
      {#if v !== 0}
        {@const tip = rx.map(d) + clamp(v, -20, 20) * 2.2}
        {@const end = shaftEnd(rx.map(d), 14, tip, 14, 7)}
        <line x1={rx.map(d)} y1="14" x2={end.x} y2={end.y} stroke="#0284c7" stroke-width="3" />
        <polygon points={arrowHead(rx.map(d), 14, tip, 14, 7)} fill="#0284c7" />
      {/if}
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Thời điểm t"
      value={time}
      min={0}
      max={T}
      step={0.1}
      unit="s"
      format={(value) => formatNumber(value, 1)}
      oninput={(value) => {
        stop();
        time = value;
      }}
    />
    <button type="button" class={button.primary} onclick={play}>
      {playing ? 'Dừng lại' : 'Cho xe chạy'}
    </button>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-4">
    <div class="rounded-xl bg-sky-50 px-2 py-2">
      <dt class="font-semibold text-sky-800">Gia tốc</dt>
      <dd class="tabular-nums">{`a = ${formatNumber(a, 2)} m/s²`}</dd>
    </div>
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">Vận tốc</dt>
      <dd class="tabular-nums">{`v = ${formatNumber(v, 2)} m/s`}</dd>
    </div>
    <div class="rounded-xl bg-violet-50 px-2 py-2">
      <dt class="font-semibold text-violet-800">Độ dịch chuyển</dt>
      <dd class="tabular-nums">{`d = ${formatNumber(d, 2)} m`}</dd>
    </div>
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Quãng đường</dt>
      <dd class="tabular-nums">{`s = ${formatNumber(s, 2)} m`}</dd>
    </div>
  </dl>

  <div class="space-y-1 overflow-x-auto text-sm text-slate-700">
    <p><LiveRichText text={velocityLine} /></p>
    <p><LiveRichText text={formulaLine} /></p>
    <p><LiveRichText text={areaLine} /></p>
  </div>

  <FeedbackNote tone="info" text={KIND_TEXT[kind]} />
</div>
