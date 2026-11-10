<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import {
    WATER_SPEED,
    classify,
    countMaxima,
    countMinima,
    pathDifference,
    relativeAmplitude,
    sources,
    surfaceAt,
  } from './engine.js';

  const W = 320;
  const H = 240;
  const PX_PER_CM = 20;
  const HALF_X = W / 2 / PX_PER_CM;
  const HALF_Y = H / 2 / PX_PER_CM;
  const COLS = 160;
  const ROWS = 120;
  const VIEWS = [
    { value: 'bien-do', label: 'Biên độ dao động' },
    { value: 'mat-nuoc', label: 'Mặt nước' },
  ];
  /** Points to find: the kind of point and, for a maximum, its order. */
  const TASKS = [
    { kind: 'max', k: 0, text: 'một điểm cực đại nằm trên đường trung trực của $S_1S_2$' },
    { kind: 'min', k: null, text: 'một điểm cực tiểu (mặt nước đứng yên)' },
    { kind: 'max', k: 2, text: 'một điểm cực đại bậc $2$ ($d_2 - d_1 = 2\\lambda$)' },
    { kind: 'min', k: -1, text: 'một điểm cực tiểu có $d_2 - d_1 = -\\dfrac{\\lambda}{2}$' },
  ];

  let a = $state(6);
  let frequency = $state(15);
  let view = $state('bien-do');
  let t = $state(0);
  let running = $state(false);
  let m = $state({ x: 2, y: 3 });
  let taskAt = $state(0);
  /** @type {HTMLCanvasElement | null} */
  let canvas = $state(null);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const lambda = $derived(WATER_SPEED / frequency);
  const src = $derived(sources(a));
  const pd = $derived(pathDifference(m, a));
  const kindHere = $derived(classify(pd.delta, lambda));
  const task = $derived(TASKS[taskAt]);
  const done = $derived(kindHere.kind === task.kind && (task.k === null || kindHere.k === task.k));

  /** @param {number} x cm */
  const px = (x) => W / 2 + x * PX_PER_CM;
  /** @param {number} y cm */
  const py = (y) => H / 2 - y * PX_PER_CM;
  /** @param {number} v cm */
  const snap = (v) => Math.round(v * 10) / 10;

  $effect(() => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(COLS, ROWS);
    const water = view === 'mat-nuoc';
    for (let r = 0; r < ROWS; r++) {
      const y = HALF_Y - ((r + 0.5) / ROWS) * 2 * HALF_Y;
      for (let c = 0; c < COLS; c++) {
        const x = -HALF_X + ((c + 0.5) / COLS) * 2 * HALF_X;
        const p = { x, y };
        // Water: −2..2 → dark trough to light crest. Amplitude: 0..2 → pale to deep.
        const s = water
          ? (surfaceAt(p, a, lambda, t) + 2) / 4
          : 1 - relativeAmplitude(pathDifference(p, a).delta, lambda) / 2;
        const i = 4 * (r * COLS + c);
        img.data[i] = Math.round(30 + s * 200);
        img.data[i + 1] = Math.round(58 + s * 180);
        img.data[i + 2] = Math.round(138 + s * 115);
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  });

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t = (t + dt * 0.8) % 1;
    });
  });

  function play() {
    view = 'mat-nuoc';
    if (reducedMotion()) {
      t = (t + 0.125) % 1;
      return;
    }
    running = !running;
  }

  /** @param {{ x: number, y: number }} p cm */
  function moveTo(p) {
    m = {
      x: snap(clamp(p.x, -HALF_X + 0.2, HALF_X - 0.2)),
      y: snap(clamp(p.y, -HALF_Y + 0.2, HALF_Y - 0.2)),
    };
  }

  const note = $derived.by(() => {
    const where = `$d_1 = ${numTex(pd.d1, 1)}$ cm, $d_2 = ${numTex(pd.d2, 1)}$ cm, $d_2 - d_1 = ${numTex(pd.delta, 1)}$ cm $\\approx ${numTex(kindHere.ratio, 2)}\\lambda$`;
    const named =
      kindHere.kind === 'max'
        ? `cực đại bậc $k = ${kindHere.k}$ (biên độ gấp đôi)`
        : kindHere.kind === 'min'
          ? `cực tiểu ($d_2 - d_1 = ${numTex(kindHere.k + 0.5)}\\lambda$, gần như đứng yên)`
          : 'điểm dao động với biên độ trung gian';
    if (done) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng! ${where}: M là ${named}. Bấm Điểm khác để tìm tiếp.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${where}: M là ${named}.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <div class="relative mx-auto w-full max-w-md" style:aspect-ratio="{W} / {H}">
      <canvas
        bind:this={canvas}
        width={COLS}
        height={ROWS}
        class="absolute inset-0 size-full rounded-xl"
        style:image-rendering="pixelated"
        aria-hidden="true"
      ></canvas>
      <svg
        bind:this={board}
        viewBox="0 0 {W} {H}"
        class="absolute inset-0 size-full touch-none select-none"
        role="group"
        aria-label={`Mặt nước có hai nguồn S1, S2 cách nhau ${a} xentimét, bước sóng ${formatNumber(lambda, 2)} xentimét. Vùng đậm là nơi dao động mạnh (cực đại), vùng nhạt là nơi gần như đứng yên (cực tiểu).`}
      >
        <line
          x1={px(src[0].x)}
          x2={px(src[1].x)}
          y1={py(0)}
          y2={py(0)}
          stroke="#fbbf24"
          stroke-width="1.5"
        />
        <line
          x1={px(0)}
          x2={px(0)}
          y1="0"
          y2={H}
          stroke="#fbbf24"
          stroke-dasharray="4 4"
          opacity="0.7"
        />
        {#each src as s, i (i)}
          <circle cx={px(s.x)} cy={py(s.y)} r="5" fill="#f97316" stroke="#fff" stroke-width="1.5" />
          <text
            x={px(s.x)}
            y={py(s.y) + 18}
            font-size="11"
            font-weight="700"
            fill="#fff"
            stroke="#0f172a"
            stroke-width="3"
            paint-order="stroke"
            text-anchor="middle"
          >
            S{i + 1}
          </text>
        {/each}
        <line
          x1={px(src[0].x)}
          y1={py(0)}
          x2={px(m.x)}
          y2={py(m.y)}
          stroke="#fff"
          stroke-dasharray="3 3"
        />
        <line
          x1={px(src[1].x)}
          y1={py(0)}
          x2={px(m.x)}
          y2={py(m.y)}
          stroke="#fff"
          stroke-dasharray="3 3"
        />
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label="Điểm M: kéo hoặc dùng phím mũi tên để di chuyển"
          aria-valuemin={-HALF_X}
          aria-valuemax={HALF_X}
          aria-valuenow={m.x}
          aria-valuetext={`M cách S1 ${formatNumber(pd.d1, 1)} xentimét, cách S2 ${formatNumber(pd.d2, 1)} xentimét, hiệu đường đi bằng ${formatNumber(kindHere.ratio, 2)} bước sóng`}
          use:draggable={{
            point: { x: px(m.x), y: py(m.y) },
            svg: () => board,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => {
              moveTo({ x: (p.x - W / 2) / PX_PER_CM, y: (H / 2 - p.y) / PX_PER_CM });
              return p;
            },
            onKeyMove: (dx, dy, big) =>
              moveTo({ x: m.x + dx * (big ? 1 : 0.1), y: m.y - dy * (big ? 1 : 0.1) }),
          }}
        >
          <circle
            class="drag-knob"
            cx={px(m.x)}
            cy={py(m.y)}
            r="7"
            fill="#be123c"
            stroke="#fff"
            stroke-width="2"
          />
        </g>
        <text
          x={px(m.x) + 10}
          y={py(m.y) - 8}
          font-size="12"
          font-weight="700"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="3"
          paint-order="stroke">M</text
        >
      </svg>
    </div>
    <p class="px-2 pt-2 text-sm text-slate-600">
      {view === 'bien-do'
        ? 'Chế độ biên độ: màu càng đậm, nước dao động càng mạnh; các vân nhạt là các đường cực tiểu, gần như đứng yên.'
        : 'Chế độ mặt nước: màu sáng là gợn lồi, màu tối là gợn lõm tại thời điểm đang xét.'}
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <SegmentedControl label="Hiển thị" options={VIEWS} bind:value={view} hideLabel />
    <button type="button" class={button.secondary} onclick={play} aria-pressed={running}>
      {running ? 'Dừng' : 'Cho nước dao động'}
    </button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Khoảng cách S₁S₂" bind:value={a} min={2} max={10} step={1} unit="cm" />
    <SliderField
      label="Tần số f của hai nguồn"
      bind:value={frequency}
      min={5}
      max={30}
      step={1}
      unit="Hz"
    />
  </div>
  <p class="text-sm tabular-nums text-slate-700">
    Tốc độ sóng v = {WATER_SPEED} cm/s, bước sóng λ = v/f = {formatFixed(lambda, 2)} cm. Trên đoạn S₁S₂
    có {countMaxima(a, lambda)} cực đại và {countMinima(a, lambda)} cực tiểu.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />
  <div class="{card} space-y-2 p-3 text-sm">
    <FeedbackNote tone={done ? 'ok' : 'info'} text={`Nhiệm vụ: đặt M vào ${task.text}.`} />
    <button
      type="button"
      class={button.quiet}
      onclick={() => (taskAt = (taskAt + 1) % TASKS.length)}
    >
      Điểm khác
    </button>
  </div>
</div>
