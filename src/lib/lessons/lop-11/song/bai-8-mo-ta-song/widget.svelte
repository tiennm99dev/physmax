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
    ROPES,
    ROPE_LENGTH,
    frontAt,
    judgeRuler,
    reached,
    ropeAt,
    wavelengthOf,
  } from './engine.js';

  const W = 360;
  const H = 220;
  const X0 = 24;
  const PX_PER_M = 156;
  const ROPE_Y = 82;
  const PX_PER_CM = 4;
  const RULER_Y = 176;
  const T_MAX = 6;
  /** Position of the yellow bead that shows a single point moving, in metres. */
  const WATCH = 1;

  let ropeId = $state('nhe');
  let frequency = $state(2);
  let amplitude = $state(6);
  let t = $state(0);
  let running = $state(false);
  let a = $state(0.3);
  let b = $state(0.7);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const rope = $derived(ROPES.find((r) => r.value === ropeId) ?? ROPES[0]);
  const shake = $derived({ amplitude, frequency, speed: rope.speed });
  const lambda = $derived(wavelengthOf(shake));
  const period = $derived(1 / frequency);
  const front = $derived(frontAt(shake, t));
  const settle = $derived(ROPE_LENGTH / rope.speed);

  /** @param {number} x metres */
  const px = (x) => X0 + x * PX_PER_M;
  /** @param {number} u centimetres */
  const py = (u) => ROPE_Y - u * PX_PER_CM;

  const path = $derived.by(() => {
    const pts = [];
    for (let i = 0; i <= 200; i++) {
      const x = (ROPE_LENGTH * i) / 200;
      pts.push(`${px(x).toFixed(1)},${py(ropeAt(shake, x, t)).toFixed(1)}`);
    }
    return pts.join(' ');
  });
  const beads = $derived(
    Array.from({ length: 21 }, (_, i) => {
      const x = (ROPE_LENGTH * i) / 20;
      return { x, u: ropeAt(shake, x, t) };
    }),
  );
  const watchU = $derived(ropeAt(shake, WATCH, t));
  const d = $derived(Math.abs(b - a));
  const verdict = $derived(judgeRuler(d, lambda));
  const ticks = Array.from({ length: 21 }, (_, i) => i / 10);
  const marks = $derived([
    { key: 'a', v: a, name: 'thứ nhất' },
    { key: 'b', v: b, name: 'thứ hai' },
  ]);

  function restart() {
    t = 0;
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      let next = t + dt;
      if (next > T_MAX) next -= Math.floor((next - settle) / period) * period;
      t = next;
    });
  });

  function play() {
    if (reducedMotion()) {
      t = Math.min(T_MAX, t + period / 8);
      return;
    }
    running = !running;
  }

  /** @param {number} v metres */
  const snapM = (v) => Math.round(clamp(v, 0, ROPE_LENGTH) * 100) / 100;
  /** @param {number} x pixels */
  const toM = (x) => snapM((x - X0) / PX_PER_M);

  /** @param {string} key @param {number} v */
  function setMark(key, v) {
    if (key === 'a') a = v;
    else b = v;
  }

  const note = $derived.by(() => {
    const dTex = `d = ${numTex(d, 2)}\\ \\text{m}`;
    if (!reached(shake, t, a, b)) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Sóng chưa truyền tới cả hai vạch đo. Bấm Lắc đầu dây, chờ biến dạng lan qua hai vạch rồi bấm Dừng để đo.',
      };
    }
    if (verdict.kind === 'none') {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Kéo hai vạch đo đến hai đỉnh sóng liền kề.',
      };
    }
    if (verdict.kind === 'same' && verdict.k === 1) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng! $${dTex}$: hai điểm gần nhau nhất dao động cùng pha, khoảng cách đó là một bước sóng, $\\lambda = ${numTex(lambda, 2)}$ m. Kiểm tra: $v = \\lambda f = ${numTex(lambda, 2)} \\cdot ${numTex(frequency)} = ${numTex(rope.speed)}$ m/s, đúng tốc độ sóng trên ${rope.label.toLowerCase()}.`,
      };
    }
    if (verdict.kind === 'same') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `$${dTex}$: hai điểm dao động cùng pha nhưng chưa gần nhau nhất; khoảng cách này gồm $${verdict.k}$ bước sóng. Dời một vạch về đỉnh sóng kế bên.`,
      };
    }
    if (verdict.kind === 'opposite') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `$${dTex}$: một điểm ở đỉnh thì điểm kia ở đáy, hai điểm dao động ngược pha. Khoảng cách này bằng $${numTex(verdict.k + 0.5)}$ bước sóng.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `$${dTex}$: hai điểm này không cùng pha, cũng không ngược pha. Đặt mỗi vạch đúng vào một đỉnh sóng.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl touch-none select-none"
      role="group"
      aria-label={`Sợi dây dài 2 mét, nguồn sóng ở đầu trái. Sóng đã truyền được ${formatNumber(front, 2)} mét. Hạt vàng ở giữa dây có li độ ${formatNumber(watchU, 1)} xentimét.`}
    >
      <line x1={X0} x2={px(ROPE_LENGTH)} y1={ROPE_Y} y2={ROPE_Y} stroke="#e2e8f0" />
      <rect
        x={X0 - 18}
        y={py(amplitude) - 6}
        width="14"
        height={2 * amplitude * PX_PER_CM + 12}
        rx="4"
        fill="#f1f5f9"
      />
      <circle cx={X0 - 11} cy={py(ropeAt(shake, 0, t))} r="6" fill="#4f46e5" />
      <text x={X0 - 6} y={ROPE_Y + 62} font-size="10" fill="#475569" text-anchor="start">
        nguồn O
      </text>
      {#if front > 0 && front < ROPE_LENGTH}
        <line
          x1={px(front)}
          x2={px(front)}
          y1={ROPE_Y - 48}
          y2={ROPE_Y + 48}
          stroke="#f59e0b"
          stroke-dasharray="3 3"
        />
        <text x={px(front)} y={ROPE_Y - 52} font-size="10" fill="#b45309" text-anchor="middle">
          đầu sóng
        </text>
      {/if}
      <polyline points={path} fill="none" stroke="#4f46e5" stroke-width="2.5" />
      {#each beads as bead (bead.x)}
        <circle cx={px(bead.x)} cy={py(bead.u)} r="2.5" fill="#312e81" />
      {/each}
      <line
        x1={px(WATCH)}
        x2={px(WATCH)}
        y1={py(amplitude) - 4}
        y2={py(-amplitude) + 4}
        stroke="#fbbf24"
        stroke-width="1"
      />
      <circle cx={px(WATCH)} cy={py(watchU)} r="5.5" fill="#E9B10A" stroke="#334155" />

      <line x1={X0} x2={px(ROPE_LENGTH)} y1={RULER_Y} y2={RULER_Y} stroke="#334155" />
      {#each ticks as m (m)}
        <line
          x1={px(m)}
          x2={px(m)}
          y1={RULER_Y}
          y2={RULER_Y + (Math.round(m * 10) % 5 === 0 ? 8 : 4)}
          stroke="#334155"
        />
        {#if Math.round(m * 10) % 5 === 0}
          <text x={px(m)} y={RULER_Y + 19} font-size="10" fill="#475569" text-anchor="middle">
            {formatNumber(m, 1)}
          </text>
        {/if}
      {/each}
      <text x={px(ROPE_LENGTH)} y={RULER_Y + 34} font-size="10" fill="#475569" text-anchor="end">
        x (m)
      </text>

      {#each marks as mark (mark.key)}
        <line
          x1={px(mark.v)}
          x2={px(mark.v)}
          y1={ROPE_Y - 46}
          y2={RULER_Y}
          stroke="#be123c"
          stroke-dasharray="4 3"
        />
        <g
          class="drag-handle cursor-ew-resize outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Vạch đo ${mark.name}: kéo ngang hoặc dùng phím trái phải`}
          aria-valuemin={0}
          aria-valuemax={ROPE_LENGTH}
          aria-valuenow={mark.v}
          aria-valuetext={`${formatNumber(mark.v, 2)} mét`}
          use:draggable={{
            point: { x: px(mark.v), y: RULER_Y },
            svg: () => board,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => {
              setMark(mark.key, toM(p.x));
              return p;
            },
            onKeyMove: (dx, _dy, big) => setMark(mark.key, snapM(mark.v + dx * (big ? 0.1 : 0.01))),
          }}
        >
          <path
            class="drag-knob"
            d="M {px(mark.v)} {RULER_Y - 2} l -7 -12 h 14 z"
            fill="#be123c"
            stroke="#fff"
          />
        </g>
      {/each}
      <text
        x={(px(a) + px(b)) / 2}
        y={RULER_Y - 20}
        font-size="11"
        font-weight="600"
        fill="#be123c"
        text-anchor="middle"
      >
        d = {formatFixed(d, 2)} m
      </text>
    </svg>
    <p class="px-2 text-sm text-slate-600">
      Hạt vàng ở x = 1 m chỉ dao động lên xuống tại chỗ, còn biến dạng của dây thì lan đi từ nguồn.
      Hai vạch đỏ trên thước đo khoảng cách giữa hai điểm của dây.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={play} aria-pressed={running}>
      {running ? 'Dừng' : 'Lắc đầu dây'}
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        running = false;
        restart();
      }}
    >
      Dây đứng yên
    </button>
    <span class="text-sm tabular-nums text-slate-700">
      t = {formatFixed(t, 2)} s, chu kì T = {formatNumber(period, 2)} s
    </span>
  </div>

  <SegmentedControl label="Loại dây" options={ROPES} bind:value={ropeId} onchange={restart} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Tần số f của nguồn"
      bind:value={frequency}
      min={0.5}
      max={4}
      step={0.5}
      unit="Hz"
      format={(v) => formatNumber(v, 1)}
      oninput={restart}
    />
    <SliderField label="Biên độ A" bind:value={amplitude} min={2} max={10} step={1} unit="cm" />
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
