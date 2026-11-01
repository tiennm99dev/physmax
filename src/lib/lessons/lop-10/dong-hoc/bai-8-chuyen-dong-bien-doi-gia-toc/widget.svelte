<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop, reducedMotion, wrap } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    KIND_TEXT,
    V_MAX,
    actualAcceleration,
    averageAcceleration,
    classify,
    isIdle,
    signed,
    step,
  } from './engine.js';

  const HISTORY = 20; // seconds kept on the v-t graph
  const SAMPLE_EVERY = 0.2;
  const MIN_STAGE = 0.3; // seconds before a stretch of driving is worth reporting

  /** @type {import('./engine.js').Pedal} */
  let pedal = $state('tha');
  let axisChoice = $state('xe');
  let car = $state({ speed: 0, x: 0, t: 0 });
  /** @type {Array<{ t: number, v: number }>} */
  let history = $state([]);
  let stage = $state({ v0: 0, t0: 0 });
  /** @type {{ v0: number, v: number, dt: number } | null} */
  let lastStage = $state(null);

  const axis = $derived(axisChoice === 'xe' ? 1 : -1);
  const a = $derived(actualAcceleration(car, pedal));
  const v = $derived(car.speed);
  const vSigned = $derived(signed(v, /** @type {1 | -1} */ (axis)));
  const aSigned = $derived(signed(a, /** @type {1 | -1} */ (axis)));
  const kind = $derived(classify(vSigned, aSigned));
  const stageDt = $derived(car.t - stage.t0);
  const shownStage = $derived(
    stageDt >= MIN_STAGE ? { v0: stage.v0, v: car.speed, dt: stageDt } : lastStage,
  );
  const stageText = $derived.by(() => {
    if (!shownStage) return '';
    const v0 = signed(shownStage.v0, /** @type {1 | -1} */ (axis));
    const v1 = signed(shownStage.v, /** @type {1 | -1} */ (axis));
    const avg = averageAcceleration(v0, v1, shownStage.dt);
    return `Chặng vừa rồi: $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{${numTex(v1, 1)} - (${numTex(v0, 1)})}{${numTex(shownStage.dt, 1)}} \\approx ${numTex(avg, 1)}$ m/s².`;
  });

  // Road scene.
  const SCENE_W = 360;
  const CAR_X = 150;
  const offset = $derived(reducedMotion() ? 0 : wrap(-car.x * 6, 0, 40));
  const vTip = $derived(CAR_X + v * 5);
  const aTip = $derived(CAR_X + a * 22);

  // Speed dial: a half circle from 0 to the top speed.
  const DIAL = { cx: 90, cy: 86, r: 66 };
  const dialAngle = $derived(Math.PI * (1 - v / V_MAX));
  const needle = $derived({
    x: DIAL.cx + (DIAL.r - 10) * Math.cos(dialAngle),
    y: DIAL.cy - (DIAL.r - 10) * Math.sin(dialAngle),
  });

  // The v-t graph, signed along the chosen axis.
  const G = { x0: 30, x1: 176, top: 8, bottom: 92 };
  const graph = $derived.by(() => {
    const end = Math.max(HISTORY, car.t);
    const start = end - HISTORY;
    /** @param {number} t */
    const gx = (t) => G.x0 + ((t - start) / HISTORY) * (G.x1 - G.x0);
    /** @param {number} value */
    const gy = (value) =>
      axis === 1
        ? G.bottom - (value / V_MAX) * (G.bottom - G.top)
        : G.top + (-value / V_MAX) * (G.bottom - G.top);
    return history
      .filter((p) => p.t >= start)
      .map((p) => `${gx(p.t).toFixed(1)},${gy(p.v * axis).toFixed(1)}`)
      .join(' ');
  });

  /** @param {import('./engine.js').Pedal} next */
  function press(next) {
    if (pedal === next) return;
    if (stageDt >= MIN_STAGE) lastStage = { v0: stage.v0, v: car.speed, dt: stageDt };
    stage = { v0: car.speed, t0: car.t };
    pedal = next;
  }

  function release() {
    press('tha');
  }

  /** @param {KeyboardEvent} e @param {import('./engine.js').Pedal} next */
  function keyDown(e, next) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    if (!e.repeat) press(next);
  }

  /** @param {KeyboardEvent} e */
  function keyUp(e) {
    if (e.key === ' ' || e.key === 'Enter') release();
  }

  function reset() {
    pedal = 'tha';
    car = { speed: 0, x: 0, t: 0 };
    history = [];
    stage = { v0: 0, t0: 0 };
    lastStage = null;
  }

  $effect(() => {
    let sinceSample = 0;
    return frameLoop((dt) => {
      if (isIdle(car, pedal)) return;
      car = step(car, pedal, dt);
      sinceSample += dt;
      if (sinceSample >= SAMPLE_EVERY) {
        sinceSample = 0;
        history = [
          ...history.filter((p) => p.t >= car.t - HISTORY - 1),
          { t: car.t, v: car.speed },
        ];
      }
    });
  });
</script>

<svelte:window onpointerup={release} onpointercancel={release} onblur={release} />

<div class="space-y-4">
  <SegmentedControl
    label="Chọn chiều dương"
    options={[
      { value: 'xe', label: 'Cùng chiều xe chạy' },
      { value: 'nguoc', label: 'Ngược chiều xe chạy' },
    ]}
    bind:value={axisChoice}
  />

  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {SCENE_W} 96"
      class="w-full"
      role="img"
      aria-label={`Xe trên đường thẳng. Vận tốc ${formatNumber(vSigned, 1)} mét trên giây, gia tốc ${formatNumber(aSigned, 1)} mét trên giây bình phương.`}
    >
      <rect x="0" y="62" width={SCENE_W} height="34" fill="#475569" />
      {#each Array.from({ length: 11 }, (_, i) => i) as i (i)}
        <rect x={i * 40 - offset} y="77" width="20" height="3" fill="#f8fafc" />
      {/each}
      <path
        d="M{CAR_X - 34} 66 L{CAR_X - 34} 50 L{CAR_X - 18} 50 L{CAR_X - 8} 38 L{CAR_X +
          14} 38 L{CAR_X + 26} 50 L{CAR_X + 34} 54 L{CAR_X + 34} 66 Z"
        fill="#4f46e5"
      />
      <circle cx={CAR_X - 20} cy="66" r="6" fill="#0f172a" />
      <circle cx={CAR_X + 20} cy="66" r="6" fill="#0f172a" />
      {#if v > 0}
        {@const end = shaftEnd(CAR_X, 22, vTip, 22, 10)}
        <line x1={CAR_X} y1="22" x2={end.x} y2={end.y} stroke="#0284c7" stroke-width="4" />
        <polygon points={arrowHead(CAR_X, 22, vTip, 22, 10)} fill="#0284c7" />
        <text
          x={Math.min(vTip + 4, SCENE_W - 14)}
          y="20"
          font-size="13"
          font-weight="700"
          fill="#0284c7"
        >
          v
        </text>
      {/if}
      {#if a !== 0}
        {@const end = shaftEnd(CAR_X, 8, aTip, 8, 10)}
        <line x1={CAR_X} y1="8" x2={end.x} y2={end.y} stroke="#dc2626" stroke-width="4" />
        <polygon points={arrowHead(CAR_X, 8, aTip, 8, 10)} fill="#dc2626" />
        <text
          x={a > 0 ? aTip + 4 : aTip - 12}
          y="12"
          font-size="13"
          font-weight="700"
          fill="#dc2626"
        >
          a
        </text>
      {/if}
    </svg>
  </div>

  <div class="grid grid-cols-2 gap-2">
    <button
      type="button"
      class="{button.primary} touch-none select-none {focusRing}"
      aria-pressed={pedal === 'ga'}
      onpointerdown={(e) => {
        e.preventDefault();
        press('ga');
      }}
      onkeydown={(e) => keyDown(e, 'ga')}
      onkeyup={keyUp}
      onblur={release}
    >
      Giữ chân ga
    </button>
    <button
      type="button"
      class="{button.secondary} touch-none select-none {focusRing}"
      aria-pressed={pedal === 'phanh'}
      onpointerdown={(e) => {
        e.preventDefault();
        press('phanh');
      }}
      onkeydown={(e) => keyDown(e, 'phanh')}
      onkeyup={keyUp}
      onblur={release}
    >
      Giữ phanh
    </button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="{card} p-2">
      <svg viewBox="0 0 180 104" class="w-full" role="img" aria-label="Đồng hồ tốc độ">
        <path
          d="M{DIAL.cx - DIAL.r} {DIAL.cy} A{DIAL.r} {DIAL.r} 0 0 1 {DIAL.cx + DIAL.r} {DIAL.cy}"
          fill="none"
          stroke="#cbd5e1"
          stroke-width="8"
        />
        <line
          x1={DIAL.cx}
          y1={DIAL.cy}
          x2={needle.x}
          y2={needle.y}
          stroke="#4f46e5"
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle cx={DIAL.cx} cy={DIAL.cy} r="5" fill="#0f172a" />
        <text
          x={DIAL.cx - DIAL.r}
          y={DIAL.cy + 16}
          font-size="11"
          fill="#475569"
          text-anchor="middle"
        >
          0
        </text>
        <text
          x={DIAL.cx + DIAL.r}
          y={DIAL.cy + 16}
          font-size="11"
          fill="#475569"
          text-anchor="middle"
        >
          {V_MAX}
        </text>
        <text x={DIAL.cx} y={DIAL.cy + 16} font-size="12" fill="#334155" text-anchor="middle">
          {`${formatNumber(v, 1)} m/s`}
        </text>
      </svg>
    </div>
    <div class="{card} p-2">
      <svg
        viewBox="0 0 180 104"
        class="w-full"
        role="img"
        aria-label="Đồ thị vận tốc theo thời gian trong 20 giây gần nhất"
      >
        <line x1={G.x0} x2={G.x0} y1={G.top} y2={G.bottom} stroke="#64748b" />
        <line
          x1={G.x0}
          x2={G.x1}
          y1={axis === 1 ? G.bottom : G.top}
          y2={axis === 1 ? G.bottom : G.top}
          stroke="#64748b"
        />
        <text x={G.x0 - 4} y={G.top + 8} font-size="10" fill="#475569" text-anchor="end">
          {axis === 1 ? V_MAX : 0}
        </text>
        <text x={G.x0 - 4} y={G.bottom} font-size="10" fill="#475569" text-anchor="end">
          {axis === 1 ? 0 : `−${V_MAX}`}
        </text>
        <text x={G.x1} y={G.bottom + 10} font-size="10" fill="#475569" text-anchor="end">t (s)</text
        >
        <text x={G.x0 + 3} y={G.top + 8} font-size="10" fill="#475569">v (m/s)</text>
        <polyline points={graph} fill="none" stroke="#4f46e5" stroke-width="2.5" />
      </svg>
    </div>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-center text-sm">
    <div class="rounded-xl bg-sky-50 px-3 py-2">
      <dt class="font-semibold text-sky-800">Vận tốc</dt>
      <dd class="tabular-nums">{`v = ${formatNumber(vSigned, 1)} m/s`}</dd>
    </div>
    <div class="rounded-xl bg-rose-50 px-3 py-2">
      <dt class="font-semibold text-rose-800">Gia tốc</dt>
      <dd class="tabular-nums">{`a = ${formatNumber(aSigned, 1)} m/s²`}</dd>
    </div>
  </dl>

  {#if stageText}
    <p class="text-sm text-slate-700"><LiveRichText text={stageText} /></p>
  {/if}

  <FeedbackNote tone="info" text={KIND_TEXT[kind]} />

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại xe</button>
</div>
