<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import OscGraph from '../_shared/osc-graph.svelte';
  import {
    TAU,
    equationTex,
    lagOf,
    piTex,
    piText,
    stateAt,
    wrapPhase,
  } from '../_shared/oscillation.js';
  import { OMEGAS, TARGETS, compare, phiOfStep, projection } from './engine.js';

  const W = 360;
  const H = 200;
  const CX = 180;
  const CY = 100;
  /** Pixels per centimetre on the circle board. */
  const SCALE = 11;
  const RANGE = 9;
  const T_MAX = 4;
  const MINE = '#4f46e5';
  const TARGET = '#0f766e';

  let A = $state(5);
  let omegaKey = $state('pi');
  let k = $state(0);
  let t = $state(0);
  let running = $state(false);
  let targetAt = $state(0);

  const omega = $derived((OMEGAS.find((o) => o.value === omegaKey) ?? OMEGAS[1]).omega);
  const phi = $derived(phiOfStep(k));
  const period = $derived(TAU / omega);
  const now = $derived(stateAt(A, omega, phi, t));
  const turned = $derived(wrapPhase(now.phase));
  const where = $derived(projection(CX, CY, A * SCALE, now.phase));
  const start = $derived(projection(CX, CY, A * SCALE, phi));
  const target = $derived(TARGETS[targetAt]);
  const result = $derived(compare({ A, omega, phi }, target));

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t = (t + dt) % T_MAX;
    });
  });

  function play() {
    if (reducedMotion()) {
      t = (t + period / 12) % T_MAX;
      return;
    }
    running = !running;
  }

  const feedback = $derived.by(() => {
    if (result.matched) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Trùng khít! Phương trình của đồ thị mẫu là $${equationTex(target.A, target.omega, target.phi)}$ (cm). Bấm Đồ thị khác để thử tiếp.`,
      };
    }
    const parts = [];
    if (!result.sameA) parts.push(`biên độ chưa khớp (đọc đỉnh cao nhất của đường mẫu)`);
    if (!result.sameOmega)
      parts.push(`chu kì chưa khớp (đo khoảng cách hai đỉnh liên tiếp của đường mẫu)`);
    if (result.sameOmega && !result.samePhase) {
      const r = result.relation;
      const lead =
        r.lead === null
          ? ''
          : `: dao động của em ${r.lead === 1 ? 'sớm' : 'trễ'} pha hơn mẫu, tới cùng một trạng thái ${r.lead === 1 ? 'sớm' : 'muộn'} hơn $\\Delta t = ${numTex(lagOf(result.dphi, period), 2)}$ s`;
      parts.push(
        `hai dao động ${r.name === 'lệch pha' ? 'lệch pha nhau' : r.name} $|\\Delta\\varphi| = ${piTex(Math.abs(result.dphi))}$${lead}`,
      );
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Chỉnh $A$, $\\omega$, $\\varphi$ để đường của em trùng đường mẫu đứt nét: ${parts.join('; ')}.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-2 p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Điểm M chuyển động tròn đều trên đường tròn bán kính ${A} xentimét; hình chiếu P của M trên trục Ox có li độ ${formatNumber(now.x, 1)} xentimét.`}
    >
      <line
        x1={CX - RANGE * SCALE - 8}
        x2={CX + RANGE * SCALE + 10}
        y1={CY}
        y2={CY}
        stroke="#334155"
      />
      <path d="M {CX + RANGE * SCALE + 10} {CY} l -7 -4 v 8 z" fill="#334155" />
      <text x={CX + RANGE * SCALE + 6} y={CY - 6} font-size="11" font-weight="600" fill="#334155">
        x
      </text>
      <text x={CX - 4} y={CY + 14} font-size="10" fill="#475569" text-anchor="end">O</text>
      {#each [-A, A] as v (v)}
        <text x={CX + v * SCALE} y={CY + 14} font-size="10" fill="#475569" text-anchor="middle">
          {v < 0 ? `−${A}` : A}
        </text>
      {/each}
      <circle cx={CX} cy={CY} r={A * SCALE} fill="none" stroke="#cbd5e1" stroke-width="2" />
      <line x1={CX} y1={CY} x2={start.m.x} y2={start.m.y} stroke="#94a3b8" stroke-dasharray="3 3" />
      <text x={start.m.x} y={start.m.y - 6} font-size="10" fill="#64748b" text-anchor="middle">
        M₀
      </text>
      <line x1={CX} y1={CY} x2={where.m.x} y2={where.m.y} stroke={MINE} stroke-width="2" />
      <line
        x1={where.m.x}
        y1={where.m.y}
        x2={where.p.x}
        y2={where.p.y}
        stroke="#f59e0b"
        stroke-dasharray="4 3"
      />
      <line x1={CX} y1={CY} x2={where.p.x} y2={CY} stroke="#be123c" stroke-width="4" />
      <circle cx={where.m.x} cy={where.m.y} r="6" fill={MINE} stroke="#fff" stroke-width="1.5" />
      <text x={where.m.x + 8} y={where.m.y - 6} font-size="11" font-weight="600" fill={MINE}>
        M
      </text>
      <circle cx={where.p.x} cy={CY} r="5" fill="#be123c" stroke="#fff" stroke-width="1.5" />
      <text x={where.p.x} y={CY - 8} font-size="11" font-weight="600" fill="#be123c">P</text>
    </svg>
    <OscGraph
      curves={[
        { f: (s) => stateAt(target.A, target.omega, target.phi, s).x, color: TARGET, dashed: true },
        { f: (s) => stateAt(A, omega, phi, s).x, color: MINE },
      ]}
      tMax={T_MAX}
      yMax={RANGE}
      tStep={0.5}
      yStep={3}
      yLabel="x (cm)"
      cursor={t}
      onpick={(v) => {
        running = false;
        t = v;
      }}
      valueText={`t = ${formatNumber(t, 2)} giây, li độ ${formatNumber(now.x, 1)} xentimét`}
      label="Đồ thị li độ theo thời gian: đường liền của em, đường đứt nét là mẫu. Chọn thời điểm bằng cách bấm lên đồ thị hoặc dùng phím mũi tên."
    />
    <p class="px-2 text-sm text-slate-600">
      M quay ngược chiều kim đồng hồ với tốc độ góc ω, xuất phát từ M₀ (góc φ). Hình chiếu P của M
      trên Ox dao động điều hoà; đường liền là đồ thị của P, đường đứt nét là đồ thị mẫu.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={play}>
      {running ? 'Dừng' : 'Chạy'}
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        running = false;
        t = 0;
      }}
    >
      Về t = 0
    </button>
    <span class="text-sm tabular-nums text-slate-700">
      t = {formatFixed(t, 2)} s, pha ωt + φ = {formatFixed(turned, 2)} rad, x = {formatFixed(
        now.x,
        1,
      )} cm
    </span>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Biên độ A" bind:value={A} min={2} max={8} step={1} unit="cm" />
    <SliderField
      label="Pha ban đầu φ"
      bind:value={k}
      min={-6}
      max={6}
      step={1}
      format={(v) => (v === 0 ? '0' : piText(phiOfStep(v)))}
      unit="rad"
    />
  </div>
  <SegmentedControl label="Tần số góc ω" options={OMEGAS} bind:value={omegaKey} />

  <div class="{card} overflow-x-auto p-3 text-center">
    <Tex math={`${equationTex(A, omega, phi)}\\ (\\text{cm})`} />
    <p class="mt-1 text-sm text-slate-600">
      Chu kì T = 2π/ω = {formatNumber(period, 2)} s, tần số f = {formatNumber(1 / period, 2)} Hz.
    </p>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <button
    type="button"
    class={button.secondary}
    onclick={() => (targetAt = (targetAt + 1) % TARGETS.length)}
  >
    Đồ thị khác
  </button>
</div>
