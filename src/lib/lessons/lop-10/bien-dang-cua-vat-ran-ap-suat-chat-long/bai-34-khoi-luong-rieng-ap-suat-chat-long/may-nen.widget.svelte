<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { qty } from '#lib/domain/materials.js';
  import { GOAL, LOADS, STROKE, press } from './engine.js';

  const W = 360;
  const H = 270;
  const SMALL_X = 52;
  const LARGE_X = 225;
  const PIPE_TOP = 225;
  const PIPE_BOTTOM = 250;
  const SMALL_REST = 70;
  const LARGE_REST = 170;
  /** Half width of a cylinder per square root of its area in cm². */
  const WIDTH = 3;
  /** Pixels the small piston travels in one press, and per cm of lift. */
  const PRESS_PX = 50;
  const LIFT_PX = 12;
  /** Seconds of one press. */
  const PRESS_TIME = 0.5;
  const LIQUID = '#bfdbfe';
  const WALL = '#475569';

  let loadId = $state('o-to');
  let force = $state(300);
  let small = $state(10);
  let large = $state(500);
  let lift = $state(0);
  let count = $state(0);
  let pressing = $state(0);
  let moving = $state(false);

  const load = $derived(LOADS.find((l) => l.id === loadId) ?? LOADS[0]);
  const p = $derived(press(force, small, large, load.mass));
  const done = $derived(lift >= GOAL);
  const smallHalf = $derived(WIDTH * Math.sqrt(small));
  const largeHalf = $derived(WIDTH * Math.sqrt(large));
  const smallY = $derived(SMALL_REST + pressing * PRESS_PX);
  const shown = $derived(moving ? Math.min(GOAL, lift + p.rise * pressing) : lift);
  const largeY = $derived(LARGE_REST - shown * LIFT_PX);
  const barMax = $derived(Math.max(p.output, p.weight) * 1.1);

  function restart() {
    lift = 0;
    count = 0;
    pressing = 0;
    moving = false;
  }

  function settle() {
    lift = Math.min(GOAL, tidy(lift + p.rise));
    count += 1;
    pressing = 0;
    moving = false;
  }

  function pressDown() {
    if (moving || done || !p.lifts) return;
    if (reducedMotion()) {
      settle();
      return;
    }
    moving = true;
  }

  $effect(() => {
    if (!moving) return;
    let elapsed = 0;
    const stop = frameLoop((dt) => {
      elapsed += dt;
      if (elapsed >= PRESS_TIME) {
        stop();
        settle();
        return;
      }
      pressing = elapsed / PRESS_TIME;
    });
    return stop;
  });

  /** @param {number} f newtons */
  const barWidth = (f) => `${Math.min(100, (f / barMax) * 100)}%`;

  /** @param {number} v */
  const relation = (v) => (tidy(v, 2) === tidy(v) ? '=' : '\\approx');

  const note = $derived.by(() => {
    const flow = `$p = \\dfrac{F_1}{S_1} = ${numTex(tidy(p.pressure))}$ Pa truyền nguyên vẹn sang pít-tông lớn: $F_2 = p S_2 = ${numTex(tidy(p.output))}$ N`;
    if (!p.lifts) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${flow}, nhỏ hơn trọng lượng $P = ${numTex(tidy(p.weight))}$ N của ${load.label.toLowerCase()}. Nhấn mạnh hơn, hoặc tăng tỉ số $\\dfrac{S_2}{S_1}$.`,
      };
    }
    if (done) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đã nâng lên $${numTex(GOAL)}$ cm sau $${count}$ lần nhấn. Lực được lợi $${numTex(tidy(large / small), 1)}$ lần nhưng đường đi cũng thiệt đúng từng ấy lần: công của $F_1$ bằng công của $F_2$.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${flow}, đủ nâng vật. Mỗi lần nhấn $${numTex(STROKE)}$ cm, pít-tông lớn chỉ lên $d_2 = d_1\\dfrac{S_1}{S_2} ${relation(p.rise)} ${numTex(p.rise, 2)}$ cm. Cần $${p.presses}$ lần để nâng $${numTex(GOAL)}$ cm.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Vật cần nâng"
    options={LOADS.map((l) => ({ value: l.id, label: `${l.label} (${qty(l.mass)} kg)` }))}
    bind:value={loadId}
    onchange={restart}
  />

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Máy nén thuỷ lực: pít-tông nhỏ ${small} xentimét vuông, pít-tông lớn ${large} xentimét vuông. Vật đã được nâng ${formatNumber(lift, 2)} xentimét.`}
    >
      <rect
        x={SMALL_X - smallHalf}
        y={smallY}
        width={2 * smallHalf}
        height={PIPE_BOTTOM - smallY}
        fill={LIQUID}
      />
      <rect
        x={LARGE_X - largeHalf}
        y={largeY}
        width={2 * largeHalf}
        height={PIPE_BOTTOM - largeY}
        fill={LIQUID}
      />
      <rect
        x={SMALL_X}
        y={PIPE_TOP}
        width={LARGE_X - SMALL_X}
        height={PIPE_BOTTOM - PIPE_TOP}
        fill={LIQUID}
      />
      <line
        x1={SMALL_X - smallHalf}
        x2={SMALL_X - smallHalf}
        y1={SMALL_REST - 8}
        y2={PIPE_BOTTOM}
        stroke={WALL}
        stroke-width="2"
      />
      <line
        x1={SMALL_X + smallHalf}
        x2={SMALL_X + smallHalf}
        y1={SMALL_REST - 8}
        y2={PIPE_TOP}
        stroke={WALL}
        stroke-width="2"
      />
      <line
        x1={LARGE_X - largeHalf}
        x2={LARGE_X - largeHalf}
        y1={LARGE_REST - GOAL * LIFT_PX - 8}
        y2={PIPE_TOP}
        stroke={WALL}
        stroke-width="2"
      />
      <line
        x1={LARGE_X + largeHalf}
        x2={LARGE_X + largeHalf}
        y1={LARGE_REST - GOAL * LIFT_PX - 8}
        y2={PIPE_BOTTOM}
        stroke={WALL}
        stroke-width="2"
      />
      <line
        x1={SMALL_X + smallHalf}
        x2={LARGE_X - largeHalf}
        y1={PIPE_TOP}
        y2={PIPE_TOP}
        stroke={WALL}
        stroke-width="2"
      />
      <line
        x1={SMALL_X - smallHalf}
        x2={LARGE_X + largeHalf}
        y1={PIPE_BOTTOM}
        y2={PIPE_BOTTOM}
        stroke={WALL}
        stroke-width="2"
      />
      <rect
        x={SMALL_X - smallHalf}
        y={smallY - 6}
        width={2 * smallHalf}
        height="6"
        fill="#334155"
      />
      <rect
        x={LARGE_X - largeHalf}
        y={largeY - 8}
        width={2 * largeHalf}
        height="8"
        fill="#334155"
      />
      <rect x={LARGE_X - 40} y={largeY - 40} width="80" height="32" rx="5" fill="#64748b" />
      <text
        x={LARGE_X}
        y={largeY - 20}
        font-size="11"
        font-weight="600"
        fill="#fff"
        text-anchor="middle">{load.label}</text
      >
      <ForceArrow
        x1={SMALL_X}
        y1={smallY - 10 - force * 0.08}
        x2={SMALL_X}
        y2={smallY - 8}
        color="#4f46e5"
        label="F₁"
        labelDy={-14}
      />
      <ForceArrow
        x1={LARGE_X}
        y1={PIPE_TOP - 4}
        x2={LARGE_X}
        y2={largeY + 3}
        color="#0f766e"
        label="F₂"
        labelDx={8}
        labelDy={22}
      />
      <text
        x={LARGE_X - 40}
        y={PIPE_BOTTOM - 7}
        font-size="11"
        font-weight="600"
        fill="#1e3a8a"
        text-anchor="middle">p = {qty(tidy(p.pressure))} Pa</text
      >
      <text x={W / 2} y={H - 4} font-size="10" fill="#475569" text-anchor="middle">
        Đã nhấn {count} lần, nâng được {formatFixed(lift, 2)} cm
      </text>
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Hình không theo tỉ lệ. Sau mỗi lần nhấn, van một chiều cho pít-tông nhỏ trở lên và nạp thêm
      chất lỏng, nên pít-tông lớn không bị tụt. Bỏ qua trọng lượng pít-tông, ma sát và chênh lệch độ
      cao của chất lỏng; lấy g = 9,8 m/s².
    </p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={pressDown} disabled={done || !p.lifts}>
      Nhấn pít-tông nhỏ
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Hạ vật xuống</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Lực nhấn F₁"
      bind:value={force}
      min={100}
      max={500}
      step={50}
      unit="N"
      oninput={restart}
    />
    <SliderField
      label="Diện tích S₁"
      bind:value={small}
      min={5}
      max={20}
      step={5}
      unit="cm²"
      oninput={restart}
    />
    <SliderField
      label="Diện tích S₂"
      bind:value={large}
      min={200}
      max={1000}
      step={100}
      unit="cm²"
      oninput={restart}
    />
  </div>

  <div class="{card} space-y-3 p-3 text-sm">
    <div>
      <p class="mb-1 flex justify-between font-semibold text-slate-700">
        <span>Lực nâng F₂ của pít-tông lớn</span>
        <span class="tabular-nums">{qty(tidy(p.output))} N</span>
      </p>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full"
          class:bg-rose-600={!p.lifts}
          class:bg-teal-600={p.lifts}
          style:width={barWidth(p.output)}
        ></div>
      </div>
    </div>
    <div>
      <p class="mb-1 flex justify-between font-semibold text-slate-700">
        <span>Trọng lượng P của vật</span>
        <span class="tabular-nums">{qty(tidy(p.weight))} N</span>
      </p>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-slate-500" style:width={barWidth(p.weight)}></div>
      </div>
    </div>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
