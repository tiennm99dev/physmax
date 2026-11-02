<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    HIT_MARGIN,
    TARGETS,
    droppedHeight,
    flightTime,
    landingNote,
    pathTo,
    peakOf,
    rangeOf,
    stateAt,
  } from './engine.js';

  const W = 380;
  const H = 226;
  const X0 = 30;
  const GROUND = 200;
  const SCALE = 3.2; // pixels per metre on both axes, so the parabola keeps its true shape
  const ARROW = 1.5; // pixels per m/s
  const X_TICKS = [0, 20, 40, 60, 80, 100];
  const Y_TICKS = [0, 20, 40];

  let mode = $state('xien');
  let v0 = $state(20);
  let angle = $state(45);
  let height = $state(20);
  let t = $state(0);
  let running = $state(false);
  let targetIndex = $state(0);
  /** @type {import('./engine.js').Throw | null} */
  let previous = $state(null);
  // The shot last thrown, kept as a dashed line once the controls change.
  /** @type {import('./engine.js').Throw | null} */
  let lastThrown = $state(null);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const horizontal = $derived(mode === 'ngang');
  const shot = $derived(horizontal ? { v0, angle: 0, height } : { v0, angle, height: 0 });
  const tEnd = $derived(flightTime(shot));
  const now = $derived(stateAt(shot, t));
  const landed = $derived(t >= tEnd);
  const target = $derived(TARGETS[targetIndex]);
  const range = $derived(rangeOf(shot));
  const peak = $derived(peakOf(shot));
  const landing = $derived(landingNote(range, target, horizontal));

  /** @param {number} x */
  const sx = (x) => X0 + x * SCALE;
  /** @param {number} y */
  const sy = (y) => GROUND - y * SCALE;
  /** @param {Array<{ x: number, y: number }>} points */
  const line = (points) =>
    points.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');

  const trace = $derived(line(pathTo(shot, t)));
  const ghost = $derived(previous ? line(pathTo(previous, Infinity)) : '');
  const ball = $derived({ x: sx(now.x), y: sy(now.y) });
  const vxTip = $derived(ball.x + now.vx * ARROW);
  const vyTip = $derived(ball.y - now.vy * ARROW);

  const componentsLine = $derived(
    `Lúc $t = ${numTex(now.t, 2)}$ s: $v_x = ${numTex(now.vx, 2)}$ m/s (không đổi), $v_y = ${numTex(now.vy, 2)}$ m/s, $v = \\sqrt{v_x^2 + v_y^2} = ${numTex(now.speed, 2)}$ m/s.`,
  );
  const resultLine = $derived(
    horizontal
      ? `$t = \\sqrt{\\dfrac{2H}{g}} = ${numTex(tEnd, 2)}$ s, $L = v_0 t = ${numTex(range, 2)}$ m. Rơi cùng lúc với vật thả tự do từ cùng độ cao, dù $v_0$ lớn hay nhỏ.`
      : `$H = \\dfrac{v_0^2\\sin^2\\alpha}{2g} = ${numTex(peak, 2)}$ m, $L = \\dfrac{v_0^2\\sin 2\\alpha}{g} = ${numTex(range, 2)}$ m, $t = ${numTex(tEnd, 2)}$ s.`,
  );
  const note = $derived.by(() => {
    if (!landed) {
      return `Mục tiêu: đặt bóng rơi cách điểm ném $${target}$ m (sai lệch không quá $${HIT_MARGIN}$ m). Chỉnh rồi nhấn "Ném", hoặc kéo thanh thời gian để xem hai thành phần vận tốc.`;
    }
    return `${landing.text} Tầm xa $L = ${numTex(range, 1)}$ m, bia ở $${target}$ m.`;
  });

  function halt() {
    stopLoop?.();
    stopLoop = null;
    running = false;
  }

  function reset() {
    halt();
    t = 0;
  }

  function changeShot() {
    if (t > 0) previous = lastThrown;
    reset();
  }

  function fire() {
    lastThrown = shot;
    if (reducedMotion()) {
      halt();
      t = tEnd;
      return;
    }
    halt();
    t = 0;
    running = true;
    stopLoop = frameLoop((dt) => {
      t = Math.min(tEnd, t + dt);
      if (t >= tEnd) halt();
    });
  }

  function nextTarget() {
    targetIndex = (targetIndex + 1) % TARGETS.length;
    reset();
  }

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Kiểu ném"
    options={[
      { value: 'xien', label: 'Ném xiên từ mặt đất' },
      { value: 'ngang', label: 'Ném ngang từ trên cao' },
    ]}
    bind:value={mode}
    onchange={changeShot}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Vận tốc đầu v₀"
      bind:value={v0}
      min={5}
      max={30}
      unit="m/s"
      oninput={changeShot}
    />
    {#if horizontal}
      <SliderField
        label="Độ cao ném H"
        bind:value={height}
        min={5}
        max={45}
        step={5}
        unit="m"
        oninput={changeShot}
      />
    {:else}
      <SliderField
        label="Góc ném α"
        bind:value={angle}
        min={5}
        max={85}
        step={5}
        unit="°"
        oninput={changeShot}
      />
    {/if}
  </div>

  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full"
      role="img"
      aria-label={`Quỹ đạo của bóng. Lúc ${formatNumber(now.t, 2)} giây, bóng cách điểm ném ${formatNumber(now.x, 1)} mét theo phương ngang và cao ${formatNumber(now.y, 1)} mét.`}
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#ecfccb" />
      <line x1={X0} x2={W} y1={GROUND} y2={GROUND} stroke="#334155" stroke-width="1.5" />
      <line x1={X0} x2={X0} y1="8" y2={GROUND} stroke="#334155" stroke-width="1.5" />
      {#each X_TICKS as tick (tick)}
        <line x1={sx(tick)} x2={sx(tick)} y1={GROUND} y2={GROUND + 5} stroke="#334155" />
        <text x={sx(tick)} y={GROUND + 18} font-size="11" fill="#475569" text-anchor="middle">
          {tick}
        </text>
      {/each}
      {#each Y_TICKS as tick (tick)}
        <line x1={X0 - 5} x2={X0} y1={sy(tick)} y2={sy(tick)} stroke="#334155" />
        <text x={X0 - 8} y={sy(tick) + 4} font-size="11" fill="#475569" text-anchor="end">
          {tick}
        </text>
      {/each}
      <text x={X0 + 6} y="16" font-size="12" font-weight="600" fill="#334155">y (m)</text>
      <text
        x={W - 4}
        y={GROUND - 6}
        font-size="12"
        font-weight="600"
        fill="#334155"
        text-anchor="end"
      >
        x (m)
      </text>

      <rect x={sx(target) - 2} y={GROUND - 22} width="4" height="22" fill="#dc2626" />
      <circle
        cx={sx(target)}
        cy={GROUND - 26}
        r="6"
        fill="#fff"
        stroke="#dc2626"
        stroke-width="3"
      />

      {#if ghost}
        <polyline
          points={ghost}
          fill="none"
          stroke="#94a3b8"
          stroke-width="2"
          stroke-dasharray="5 4"
        />
      {/if}
      <polyline points={trace} fill="none" stroke="#4f46e5" stroke-width="2.5" />

      <line
        x1={ball.x}
        x2={ball.x}
        y1={ball.y}
        y2={GROUND}
        stroke="#94a3b8"
        stroke-dasharray="3 3"
      />
      <line x1={X0} x2={ball.x} y1={ball.y} y2={ball.y} stroke="#94a3b8" stroke-dasharray="3 3" />
      <circle cx={ball.x} cy={GROUND} r="3" fill="#0284c7" />
      <circle cx={X0} cy={ball.y} r="3" fill="#dc2626" />

      {#if horizontal}
        <circle cx={X0 + 2} cy={sy(droppedHeight(shot, now.t))} r="5" fill="#f59e0b" />
      {/if}
      <circle cx={ball.x} cy={ball.y} r="6" fill="#0f172a" />

      {#if !landed}
        {@const endX = shaftEnd(ball.x, ball.y, vxTip, ball.y, 8)}
        <line x1={ball.x} y1={ball.y} x2={endX.x} y2={endX.y} stroke="#0284c7" stroke-width="3" />
        <polygon points={arrowHead(ball.x, ball.y, vxTip, ball.y, 8)} fill="#0284c7" />
        {#if Math.abs(now.vy) > 0.5}
          {@const endY = shaftEnd(ball.x, ball.y, ball.x, vyTip, 8)}
          <line x1={ball.x} y1={ball.y} x2={endY.x} y2={endY.y} stroke="#dc2626" stroke-width="3" />
          <polygon points={arrowHead(ball.x, ball.y, ball.x, vyTip, 8)} fill="#dc2626" />
        {/if}
      {/if}
    </svg>
    <p class="flex flex-wrap gap-x-4 gap-y-1 px-2 pt-1 text-xs text-slate-600">
      <span><span class="font-semibold text-sky-700">→ v<sub>x</sub></span>: thành phần ngang</span>
      <span
        ><span class="font-semibold text-rose-700">↕ v<sub>y</sub></span>: thành phần thẳng đứng</span
      >
      {#if horizontal}
        <span><span class="font-semibold text-amber-600">●</span> vật thả rơi tự do</span>
      {/if}
      {#if ghost}
        <span>Nét đứt: lần ném trước</span>
      {/if}
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Thời điểm t"
      value={Math.min(t, tEnd)}
      min={0}
      max={Number(tEnd.toFixed(2))}
      step={0.01}
      unit="s"
      format={(value) => formatFixed(value, 2)}
      oninput={(value) => {
        halt();
        t = value >= Number(tEnd.toFixed(2)) ? tEnd : value;
      }}
    />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} disabled={running} onclick={fire}>Ném</button>
      <button type="button" class={button.quiet} onclick={nextTarget}>Đổi bia</button>
    </div>
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-xl bg-sky-50 px-2 py-2">
      <dt class="font-semibold text-sky-800">Tầm xa L</dt>
      <dd class="tabular-nums">{landed ? `${formatNumber(range, 1)} m` : '…'}</dd>
    </div>
    <div class="rounded-xl bg-rose-50 px-2 py-2">
      <dt class="font-semibold text-rose-800">{horizontal ? 'Độ cao ném' : 'Tầm cao H'}</dt>
      <dd class="tabular-nums">{landed || horizontal ? `${formatNumber(peak, 1)} m` : '…'}</dd>
    </div>
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Thời gian bay</dt>
      <dd class="tabular-nums">{landed ? `${formatNumber(tEnd, 2)} s` : '…'}</dd>
    </div>
  </dl>

  <p class="text-sm text-slate-700"><LiveRichText text={componentsLine} /></p>
  {#if landed}
    <p class="text-sm text-slate-700"><LiveRichText text={resultLine} /></p>
  {/if}

  <FeedbackNote tone={landed && landing.hit ? 'ok' : 'info'} text={note} />
</div>
