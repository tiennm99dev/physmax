<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import ForceArrow from '../_shared/force-arrow.svelte';
  import { SHAPES, STALL, airForces, streamline } from './engine.js';

  const W = 360;
  const H = 240;
  const CX = 160;
  const CY = 130;
  /** Pixels per newton of force. */
  const K = 0.6;
  /** How far the back edge of each shape sits from its centre, where the arrows start. */
  const EDGE = { tam: 5, cau: 28, giot: 52, canh: 60 };
  const LEVELS = [-90, -60, -30, 30, 60, 90];

  let shape = $state('tam');
  let speed = $state(30);
  let alpha = $state(8);

  const isWing = $derived(shape === 'canh');
  const back = $derived(CX + (EDGE[/** @type {keyof typeof EDGE} */ (shape)] ?? 0));
  const forces = $derived(airForces(shape, speed, alpha));
  const lines = $derived(
    LEVELS.map((d) => streamline(shape, CY + d, CX, CY, W, isWing ? alpha : 0)),
  );
  const flowTime = $derived(speed > 0 ? `${18 / (speed * 6)}s` : '0s');

  const note = $derived.by(() => {
    if (speed === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Không có gió, vật đứng yên so với không khí: không có lực cản, cũng không có lực nâng. Tăng tốc độ gió lên.',
      };
    }
    if (isWing && alpha > STALL) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Cánh ngẩng quá nhiều: dòng khí bị tách khỏi mặt trên cánh, lực nâng giảm trong khi lực cản tăng mạnh.',
      };
    }
    if (isWing) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: 'Cánh làm dòng khí đổi hướng, tạo lực nâng vuông góc với hướng gió, lớn hơn lực cản nhiều lần. Ngẩng cánh vừa phải hoặc tăng tốc độ thì lực nâng tăng.',
      };
    }
    if (shape === 'giot') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: 'Thân vật thon dần về phía sau, dòng khí bám theo thân: lực cản rất nhỏ. Đây là hình dạng khí động học.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Dòng khí bị chặn và tạo xoáy phía sau vật nên lực cản lớn. Đổi sang giọt nước cùng tốc độ gió để so sánh; tăng tốc độ gió cũng làm lực cản tăng nhanh.',
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Hình dạng vật" options={SHAPES} bind:value={shape} />

  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Ống khí động: gió ${formatNumber(speed)} mét trên giây, lực cản ${formatNumber(forces.drag, 1)} niutơn, lực nâng ${formatNumber(forces.lift, 1)} niutơn.`}
    >
      <rect x="0" y="0" width={W} height={H} fill="#f0f9ff" />
      {#each lines as line, i (i)}
        <polyline
          class={speed > 0 ? 'flow' : ''}
          style:--flow-time={flowTime}
          points={pointsAttr(line)}
          fill="none"
          stroke="#7dd3fc"
          stroke-width="2"
          stroke-dasharray="10 8"
        />
      {/each}
      {#if speed > 0 && (shape === 'tam' || shape === 'cau')}
        <g fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3">
          <circle cx={CX + 46} cy={CY - 18} r="14" />
          <circle cx={CX + 46} cy={CY + 18} r="14" />
          <circle cx={CX + 76} cy={CY - 6} r="9" />
        </g>
      {/if}

      {#if shape === 'tam'}
        <rect x={CX - 5} y={CY - 38} width="10" height="76" rx="2" fill="#475569" />
      {:else if shape === 'cau'}
        <circle cx={CX} cy={CY} r="28" fill="#475569" />
      {:else if shape === 'giot'}
        <path
          d="M {CX - 28} {CY} C {CX - 28} {CY - 26}, {CX + 10} {CY - 22}, {CX + 52} {CY} C {CX +
            10} {CY + 22}, {CX - 28} {CY + 26}, {CX - 28} {CY} Z"
          fill="#475569"
        />
      {:else}
        <path
          transform="rotate({-alpha} {CX} {CY})"
          d="M {CX - 52} {CY} C {CX - 40} {CY - 20}, {CX + 10} {CY - 18}, {CX + 60} {CY} C {CX +
            10} {CY + 5}, {CX - 40} {CY + 8}, {CX - 52} {CY} Z"
          fill="#475569"
        />
      {/if}

      <ForceArrow
        x1={back}
        y1={CY}
        x2={back + forces.drag * K}
        y2={CY}
        color="#dc2626"
        label="Lực cản"
        labelDx={-20}
        labelDy={22}
      />
      <ForceArrow
        x1={CX}
        y1={CY - 14}
        x2={CX}
        y2={CY - 14 - forces.lift * K}
        color="#059669"
        label="Lực nâng"
        labelDx={8}
        labelDy={6}
      />
      <text x="8" y="18" font-size="12" font-weight="600" fill="#0369a1">Gió →</text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Tốc độ gió" bind:value={speed} min={0} max={40} step={1} unit="m/s" />
    {#if isWing}
      <SliderField
        label="Góc ngẩng của cánh"
        bind:value={alpha}
        min={0}
        max={25}
        step={1}
        unit="°"
      />
    {/if}
  </div>

  <dl class="grid grid-cols-2 gap-2 text-center text-sm" aria-live="polite">
    <div class="rounded-xl bg-red-50 px-2 py-2">
      <dt class="font-semibold text-red-800">Lực cản</dt>
      <dd class="tabular-nums">{`${formatNumber(forces.drag, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-emerald-50 px-2 py-2">
      <dt class="font-semibold text-emerald-800">Lực nâng</dt>
      <dd class="tabular-nums">{`${formatNumber(forces.lift, 1)} N`}</dd>
    </div>
  </dl>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>

<style>
  .flow {
    animation: flow var(--flow-time) linear infinite;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -18;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow {
      animation: none;
    }
  }
</style>
