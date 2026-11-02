<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt, formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { arcPath, pointAt } from '../_shared/circular.js';
  import { CAR_MASS, MAX_TILT, ROADS, curve, sweepOnBoard } from './engine.js';

  const W = 360;
  const H = 230;
  const CAR_X = 60;
  const CAR_Y = 200;
  const BOTTOM = -Math.PI / 2;
  const toPx = linear(20, 200, 70, 170);
  /** Pixels per km/h and per newton for the arrows. */
  const V_ARROW = 0.7;
  const F_ARROW = 0.0075;
  /** The bars end at this force, in newtons. */
  const BAR_MAX = 20000;

  let kmh = $state(60);
  let radius = $state(50);
  let mu = $state(0.7);
  let tilt = $state(0);

  const c = $derived(curve(kmh, radius, mu, tilt));
  const roadPx = $derived(toPx.map(radius));
  const roadPath = $derived(arcPath(CAR_X, CAR_Y - roadPx, roadPx, BOTTOM, 0));
  const skidPx = $derived(roadPx * (c.skidRadius / radius));
  const skidPath = $derived.by(() => {
    if (c.holds) return '';
    const sweep = sweepOnBoard(skidPx, CAR_X, CAR_Y, W - 10, 10);
    return arcPath(CAR_X, CAR_Y - skidPx, skidPx, BOTTOM, BOTTOM + sweep);
  });
  const roadEnd = $derived(pointAt(CAR_X, CAR_Y - roadPx, roadPx, 0));
  const force = $derived(Math.min(c.needed, c.available));

  /** @param {number} f newtons */
  const barWidth = (f) => `${Math.min(100, (f / BAR_MAX) * 100)}%`;
  /** @param {number} f newtons */
  const newton = (f) => `${fmt(Math.round(f))} N`;

  const help = $derived(
    tilt === 0
      ? 'Trên đường phẳng, lực ma sát đóng vai trò lực hướng tâm.'
      : 'Trên đường nghiêng, các thành phần nằm ngang của phản lực và của lực ma sát đóng vai trò lực hướng tâm.',
  );

  const note = $derived(
    c.holds
      ? `Xe cần $F_{ht} = m\\dfrac{v^2}{r} \\approx ${numTex(Math.round(c.needed))}$ N, không vượt quá $${numTex(Math.round(c.available))}$ N mà mặt đường tạo được nên xe đi đúng đường cong. ${help} Tốc độ giới hạn ở khúc cua này khoảng $${numTex(c.maxKmh, 0)}$ km/h.`
      : `Xe cần $F_{ht} = m\\dfrac{v^2}{r} \\approx ${numTex(Math.round(c.needed))}$ N nhưng mặt đường chỉ tạo được $${numTex(Math.round(c.available))}$ N, nên xe trượt ra ngoài khúc cua. Giảm tốc xuống dưới khoảng $${numTex(c.maxKmh, 0)}$ km/h, hoặc làm đường nghiêng hơn. ${help}`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Ô tô nhìn từ trên xuống ở đầu khúc cua bán kính ${radius} mét, tốc độ ${kmh} kilômét trên giờ. ${c.holds ? 'Xe đi đúng đường cong.' : 'Xe trượt ra ngoài khúc cua.'}`}
    >
      <path d={roadPath} fill="none" stroke="#cbd5e1" stroke-width="30" />
      <path d={roadPath} fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="8 8" />
      <text x={roadEnd.x + 20} y={roadEnd.y + 18} font-size="12" fill="#475569">r = {radius} m</text
      >
      {#if !c.holds}
        <path d={skidPath} fill="none" stroke="#be123c" stroke-width="3" stroke-dasharray="6 4" />
      {/if}
      <rect x={CAR_X - 15} y={CAR_Y - 8} width="30" height="16" rx="4" fill="#475569" />
      <ForceArrow
        x1={CAR_X}
        y1={CAR_Y}
        x2={CAR_X + kmh * V_ARROW}
        y2={CAR_Y}
        color="#4f46e5"
        label="v"
      />
      <ForceArrow
        x1={CAR_X}
        y1={CAR_Y}
        x2={CAR_X}
        y2={CAR_Y - force * F_ARROW}
        color="#0f766e"
        label="Fht"
      />
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Hình không theo tỉ lệ. Xe khối lượng {fmt(CAR_MASS)} kg; hệ số ma sát của mặt đường là giá trị giả
      định để minh hoạ.
    </p>
  </div>

  <SegmentedControl
    label="Mặt đường"
    options={ROADS.map((r) => ({
      value: r.value,
      label: `${r.label} (μ = ${formatNumber(r.value, 1)})`,
    }))}
    bind:value={mu}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Tốc độ xe" bind:value={kmh} min={20} max={100} step={5} unit="km/h" />
    <SliderField
      label="Bán kính khúc cua"
      bind:value={radius}
      min={20}
      max={200}
      step={10}
      unit="m"
    />
    <SliderField
      label="Góc nghiêng mặt đường"
      bind:value={tilt}
      min={0}
      max={MAX_TILT}
      step={1}
      unit="°"
      format={(v) => formatFixed(v, 0)}
    />
  </div>

  <div class="{card} space-y-3 p-3 text-sm">
    <div>
      <p class="mb-1 flex justify-between font-semibold text-slate-700">
        <span>Lực hướng tâm xe cần</span>
        <span class="tabular-nums">{newton(c.needed)}</span>
      </p>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full"
          class:bg-rose-600={!c.holds}
          class:bg-teal-600={c.holds}
          style:width={barWidth(c.needed)}
        ></div>
      </div>
    </div>
    <div>
      <p class="mb-1 flex justify-between font-semibold text-slate-700">
        <span>Lực lớn nhất mặt đường tạo được</span>
        <span class="tabular-nums">{newton(c.available)}</span>
      </p>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-slate-500" style:width={barWidth(c.available)}></div>
      </div>
    </div>
  </div>

  <FeedbackNote tone={c.holds ? 'ok' : 'warn'} text={note} />
</div>
