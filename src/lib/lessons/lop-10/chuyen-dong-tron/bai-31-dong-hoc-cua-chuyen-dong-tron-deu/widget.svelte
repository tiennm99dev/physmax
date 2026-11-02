<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { TAU, arcPath, pointAt, slicePath, tangentAt, toDeg } from '../_shared/circular.js';
  import {
    SPEED_GOALS,
    WHEEL_RADIUS,
    compareSpeeds,
    frequencyOf,
    lapsDone,
    periodOf,
    wheelPoint,
  } from './engine.js';

  const W = 360;
  const H = 300;
  const CX = 180;
  const CY = 150;
  const R_PX = 110;
  /** Pixels per m/s for the velocity arrows. */
  const ARROW = 50;
  const A_COLOR = '#be123c';
  const B_COLOR = '#0f766e';
  const SPOKES = [0, 60, 120, 180, 240, 300];

  let omega = $state(2);
  let rA = $state(0.2);
  let rB = $state(0.5);
  let t = $state(0);
  let running = $state(false);
  let goalAt = $state(0);

  const a = $derived(wheelPoint(rA, omega, t));
  const b = $derived(wheelPoint(rB, omega, t));
  const theta = $derived(a.theta);
  const laps = $derived(lapsDone(theta));
  const within = $derived(theta - laps * TAU);
  const compare = $derived(compareSpeeds(rA, rB));
  const period = $derived(periodOf(omega));
  const goal = $derived(SPEED_GOALS[goalAt]);
  const goalMet = $derived(a.v === goal);

  /** @param {number} r */
  const toPx = (r) => (r / WHEEL_RADIUS) * R_PX;
  const pA = $derived(pointAt(CX, CY, toPx(rA), within));
  const pB = $derived(pointAt(CX, CY, toPx(rB), within));
  const dir = $derived(tangentAt(within));

  /** The whole wheel changes speed, so the reading starts over from the zero mark. */
  function restart() {
    t = 0;
  }

  function spin() {
    if (reducedMotion()) {
      t += 1;
      return;
    }
    running = !running;
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t += dt;
    });
  });

  const compareText = $derived.by(() => {
    const same = `Cả bánh xe có chung một tốc độ góc $\\omega = ${numTex(omega, 1)}$ rad/s, nên A và B quét cùng một góc $\\theta$ trong cùng một thời gian.`;
    const speeds = `$v_A = \\omega r_A = ${numTex(a.v, 3)}$ m/s, $v_B = \\omega r_B = ${numTex(b.v, 3)}$ m/s.`;
    if (compare.faster === null) {
      return `${same} Hai điểm cùng cách tâm nên đi cùng quãng đường: ${speeds}`;
    }
    return `${same} Điểm ${compare.faster} xa tâm gấp $${numTex(compare.ratio, 2)}$ lần nên đi quãng đường dài gấp $${numTex(compare.ratio, 2)}$ lần: ${speeds}`;
  });

  const goalText = $derived(
    goalMet
      ? `Đạt: $v_A = ${numTex(omega, 1)} \\cdot ${numTex(rA, 2)} = ${numTex(goal, 1)}$ m/s. Còn những cặp $\\omega$, $r_A$ khác cũng cho tốc độ này. Hãy thử.`
      : `Thử thách: chỉnh $\\omega$ và $r_A$ để điểm A có tốc độ $${numTex(goal, 1)}$ m/s. Hiện $v_A = ${numTex(a.v, 3)}$ m/s.`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Bánh xe quay đều với tốc độ góc ${formatNumber(omega, 1)} radian trên giây. Điểm A cách tâm ${formatNumber(rA, 2)} mét, điểm B cách tâm ${formatNumber(rB, 2)} mét, cùng nằm trên một nan hoa.`}
    >
      <circle cx={CX} cy={CY} r={R_PX + 4} fill="#f1f5f9" stroke="#94a3b8" stroke-width="4" />
      <path d={slicePath(CX, CY, R_PX, 0, within)} fill="#fde68a" fill-opacity="0.55" />
      <g transform={`rotate(${-toDeg(within)} ${CX} ${CY})`}>
        {#each SPOKES as deg (deg)}
          {@const end = pointAt(CX, CY, R_PX, (deg * Math.PI) / 180)}
          <line
            x1={CX}
            y1={CY}
            x2={end.x}
            y2={end.y}
            stroke={deg === 0 ? '#334155' : '#cbd5e1'}
            stroke-width={deg === 0 ? 3 : 2}
          />
        {/each}
      </g>
      <line x1={CX} y1={CY} x2={CX + R_PX + 22} y2={CY} stroke="#64748b" stroke-dasharray="4 3" />
      <path
        d={arcPath(CX, CY, toPx(rA), 0, within)}
        fill="none"
        stroke={A_COLOR}
        stroke-width="3"
      />
      <path
        d={arcPath(CX, CY, toPx(rB), 0, within)}
        fill="none"
        stroke={B_COLOR}
        stroke-width="3"
      />
      <circle cx={CX} cy={CY} r="5" fill="#334155" />
      <ForceArrow
        x1={pA.x}
        y1={pA.y}
        x2={pA.x + dir.x * a.v * ARROW}
        y2={pA.y + dir.y * a.v * ARROW}
        color={A_COLOR}
        label="vA"
      />
      <ForceArrow
        x1={pB.x}
        y1={pB.y}
        x2={pB.x + dir.x * b.v * ARROW}
        y2={pB.y + dir.y * b.v * ARROW}
        color={B_COLOR}
        label="vB"
      />
      <circle cx={pA.x} cy={pA.y} r="6" fill={A_COLOR} stroke="#fff" stroke-width="1.5" />
      <circle cx={pB.x} cy={pB.y} r="6" fill={B_COLOR} stroke="#fff" stroke-width="1.5" />
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Vùng vàng là góc đã quét từ vạch đứt nét, hai cung màu là quãng đường của A và B, mũi tên là
      vận tốc.
    </p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={spin}>
      {running ? 'Dừng' : 'Quay'}
    </button>
    <button type="button" class={button.secondary} onclick={() => (t += 1)} disabled={running}>
      Quay thêm 1 s
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Về vạch 0</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Tốc độ góc ω"
      bind:value={omega}
      min={0.5}
      max={3}
      step={0.1}
      unit="rad/s"
      format={(v) => formatFixed(v, 1)}
      oninput={restart}
    />
    <SliderField
      label="Bán kính điểm A"
      bind:value={rA}
      min={0.1}
      max={WHEEL_RADIUS}
      step={0.05}
      unit="m"
      format={(v) => formatFixed(v, 2)}
    />
    <SliderField
      label="Bán kính điểm B"
      bind:value={rB}
      min={0.1}
      max={WHEEL_RADIUS}
      step={0.05}
      unit="m"
      format={(v) => formatFixed(v, 2)}
    />
  </div>

  <div class="{card} overflow-x-auto p-3">
    <table class="w-full text-center text-sm tabular-nums">
      <thead class="text-slate-600">
        <tr>
          <th scope="col" class="px-1 py-1 font-semibold">Điểm</th>
          <th scope="col" class="px-1 py-1 font-semibold">r (m)</th>
          <th scope="col" class="px-1 py-1 font-semibold">θ (rad)</th>
          <th scope="col" class="px-1 py-1 font-semibold">s (m)</th>
          <th scope="col" class="px-1 py-1 font-semibold">ω (rad/s)</th>
          <th scope="col" class="px-1 py-1 font-semibold">v (m/s)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="px-1 py-1" style:color={A_COLOR}>A</th>
          <td>{formatFixed(rA, 2)}</td>
          <td>{formatFixed(a.theta, 2)}</td>
          <td>{formatFixed(a.s, 2)}</td>
          <td>{formatFixed(omega, 1)}</td>
          <td>{formatFixed(a.v, 2)}</td>
        </tr>
        <tr>
          <th scope="row" class="px-1 py-1" style:color={B_COLOR}>B</th>
          <td>{formatFixed(rB, 2)}</td>
          <td>{formatFixed(b.theta, 2)}</td>
          <td>{formatFixed(b.s, 2)}</td>
          <td>{formatFixed(omega, 1)}</td>
          <td>{formatFixed(b.v, 2)}</td>
        </tr>
      </tbody>
    </table>
    <p class="mt-2 text-sm text-slate-600">
      t = {formatFixed(t, 1)} s, đã quay {laps} vòng. Chu kì T = {formatFixed(period, 2)} s, tần số f
      = {formatFixed(frequencyOf(omega), 2)} Hz.
    </p>
  </div>

  <FeedbackNote tone="info" text={compareText} />
  <FeedbackNote tone={goalMet ? 'ok' : 'info'} text={goalText} />
  <button
    type="button"
    class={button.quiet}
    onclick={() => (goalAt = (goalAt + 1) % SPEED_GOALS.length)}
  >
    Thử thách khác
  </button>
</div>
