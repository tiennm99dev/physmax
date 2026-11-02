<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { foot } from '#lib/geom-engine/plane.js';
  import ForceArrow from '../_shared/force-arrow.svelte';
  import { leverArm, moment } from './engine.js';

  const W = 360;
  const H = 210;
  const AXIS = { x: 45, y: 150 };
  /** Pixels per metre along the rod, and per newton along the force. */
  const PX_M = 440;
  const PX_N = 5;

  let force = $state(10);
  let reach = $state(0.4);
  let angle = $state(90);

  const arm = $derived(leverArm(reach, angle));
  const m = $derived(moment(force, arm));
  const rad = $derived((angle * Math.PI) / 180);
  const point = $derived({ x: AXIS.x + reach * PX_M, y: AXIS.y });
  const tip = $derived({
    x: point.x + force * PX_N * Math.cos(rad),
    y: point.y - force * PX_N * Math.sin(rad),
  });
  const footPoint = $derived(foot(AXIS, point, tip));
  /** A long stretch of the force's line of action, to show its "giá". */
  const lineEnds = $derived({
    a: { x: point.x - 300 * Math.cos(rad), y: point.y + 300 * Math.sin(rad) },
    b: { x: point.x + 300 * Math.cos(rad), y: point.y - 300 * Math.sin(rad) },
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Lực ${formatNumber(force)} niutơn, góc ${formatNumber(angle)} độ so với thanh, cánh tay đòn ${formatNumber(arm, 3)} mét, moment ${formatNumber(m, 2)} niutơn mét.`}
    >
      <line
        x1={lineEnds.a.x}
        y1={lineEnds.a.y}
        x2={lineEnds.b.x}
        y2={lineEnds.b.y}
        stroke="#a5b4fc"
        stroke-dasharray="5 4"
      />
      <line
        x1={AXIS.x}
        y1={AXIS.y}
        x2={AXIS.x + 0.5 * PX_M}
        y2={AXIS.y}
        stroke="#b45309"
        stroke-width="7"
        stroke-linecap="round"
      />
      {#if arm > 0.001}
        <line
          x1={AXIS.x}
          y1={AXIS.y}
          x2={footPoint.x}
          y2={footPoint.y}
          stroke="#059669"
          stroke-width="3"
        />
        <text
          x={(AXIS.x + footPoint.x) / 2 - 14}
          y={(AXIS.y + footPoint.y) / 2 - 4}
          font-size="14"
          font-weight="700"
          fill="#059669">d</text
        >
      {/if}
      <ForceArrow
        x1={point.x}
        y1={point.y}
        x2={tip.x}
        y2={tip.y}
        color="#4f46e5"
        label="F"
        labelDx={tip.x < point.x ? -12 : 6}
      />
      <circle cx={AXIS.x} cy={AXIS.y} r="6" fill="#0f172a" />
      <text x={AXIS.x - 14} y={AXIS.y + 22} font-size="13" font-weight="700" fill="#0f172a">O</text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Độ lớn lực F" bind:value={force} min={1} max={15} step={1} unit="N" />
    <SliderField
      label="Điểm đặt cách trục"
      bind:value={reach}
      min={0.1}
      max={0.5}
      step={0.05}
      unit="m"
      format={(v) => formatNumber(v, 2)}
    />
    <SliderField
      label="Góc giữa lực và thanh"
      bind:value={angle}
      min={0}
      max={180}
      step={5}
      unit="°"
    />
  </div>

  <FeedbackNote
    tone={arm < 0.001 ? 'warn' : 'info'}
    text={arm < 0.001
      ? 'Giá của lực đi qua trục quay: $d = 0$ nên $M = 0$, lực không làm thanh quay, dù lực lớn đến đâu.'
      : `Cánh tay đòn là khoảng cách từ trục đến giá của lực: $d = ${numTex(arm, 3)}$ m. Moment lực $M = F \\cdot d = ${numTex(force)} \\cdot ${numTex(arm, 3)} = ${numTex(m, 2)}$ N.m.${angle === 90 ? ' Lực vuông góc với thanh cho cánh tay đòn lớn nhất.' : ''}`}
  />
</div>
