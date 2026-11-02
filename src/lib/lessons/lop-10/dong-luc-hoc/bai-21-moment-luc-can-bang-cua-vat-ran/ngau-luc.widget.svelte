<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { coupleMoments } from './engine.js';

  const W = 360;
  const H = 170;
  const MID_Y = 85;
  /** Pixels per metre of bar, and per newton of force. */
  const PX_M = 480;
  const PX_N = 5;

  let force = $state(8);
  let gap = $state(0.5);
  let toLeft = $state(0.2);

  const d1 = $derived(Math.min(toLeft, gap));
  const d2 = $derived(tidy(gap - d1));
  const moments = $derived(coupleMoments(force, d1, d2));
  /** The bar stays centred on the board and the axis moves along it. */
  const leftX = $derived(W / 2 - (gap * PX_M) / 2);
  const rightX = $derived(W / 2 + (gap * PX_M) / 2);
  const axisX = $derived(leftX + d1 * PX_M);
  const length = $derived(force * PX_N);
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Ngẫu lực, mỗi lực ${formatNumber(force)} niutơn, hai giá cách nhau ${formatNumber(gap, 2)} mét, moment ${formatNumber(moments.total, 2)} niutơn mét.`}
    >
      <line
        x1={leftX}
        y1={MID_Y}
        x2={rightX}
        y2={MID_Y}
        stroke="#b45309"
        stroke-width="7"
        stroke-linecap="round"
      />
      <ForceArrow
        x1={leftX}
        y1={MID_Y}
        x2={leftX}
        y2={MID_Y + length}
        color="#4f46e5"
        label="F₁"
        labelDx={6}
        labelDy={-4}
      />
      <ForceArrow
        x1={rightX}
        y1={MID_Y}
        x2={rightX}
        y2={MID_Y - length}
        color="#dc2626"
        label="F₂"
        labelDx={6}
        labelDy={10}
      />
      <circle cx={axisX} cy={MID_Y} r="6" fill="#0f172a" />
      <text
        x={axisX}
        y={MID_Y + 24}
        font-size="13"
        font-weight="700"
        fill="#0f172a"
        text-anchor="middle"
      >
        O
      </text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Độ lớn mỗi lực F" bind:value={force} min={2} max={14} step={1} unit="N" />
    <SliderField
      label="Khoảng cách hai giá d"
      bind:value={gap}
      min={0.1}
      max={0.6}
      step={0.05}
      unit="m"
      format={(v) => formatNumber(v, 2)}
      oninput={() => (toLeft = Math.min(toLeft, gap))}
    />
    <SliderField
      label="Trục cách lực F₁"
      bind:value={toLeft}
      min={0}
      max={gap}
      step={0.05}
      unit="m"
      format={(v) => formatNumber(v, 2)}
    />
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">Moment F₁</dt>
      <dd class="tabular-nums">{`${formatNumber(moments.m1, 2)} N.m`}</dd>
    </div>
    <div class="rounded-xl bg-red-50 px-2 py-2">
      <dt class="font-semibold text-red-800">Moment F₂</dt>
      <dd class="tabular-nums">{`${formatNumber(moments.m2, 2)} N.m`}</dd>
    </div>
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Tổng</dt>
      <dd class="tabular-nums">{`${formatNumber(moments.total, 2)} N.m`}</dd>
    </div>
  </dl>

  <FeedbackNote
    tone="ok"
    text={`Hai lực cùng làm vật quay một chiều nên moment cộng lại: $M = F \\cdot d = ${numTex(force)} \\cdot ${numTex(gap, 2)} = ${numTex(moments.total, 2)}$ N.m, dù trục đặt ở đâu giữa hai giá. Hợp lực bằng $0$ nên ngẫu lực không làm vật tịnh tiến.`}
  />
</div>
