<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    elongationFromPoint,
    moonOnOrbit,
    tideHeight,
    tideKind,
    tideRange,
    waterAt,
  } from './engine.js';

  const W = 340;
  const H = 240;
  const EX = 190;
  const EY = 120;
  const ER = 40;
  const ORBIT = 92;
  const BULGE = 11;
  const PLOT_W = 340;
  const PLOT_H = 120;
  const SPAN = 25;

  let d = $state(50);
  let hours = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svg = $state();
  const drag = $state({ x: 0, y: 0 });

  const moon = $derived(moonOnOrbit(d, ORBIT));
  const moonDir = $derived(180 + d);
  const water = $derived(
    pointsAttr(
      Array.from({ length: 121 }, (_, i) => {
        const phi = i * 3;
        const r = ER + 15 + BULGE * tideHeight(phi - moonDir, d);
        const a = (phi * Math.PI) / 180;
        return { x: EX + r * Math.cos(a), y: EY - r * Math.sin(a) };
      }),
    ),
  );
  const kind = $derived(tideKind(d));
  const range = $derived(tideRange(d));
  const observer = $derived.by(() => {
    const a = ((moonDir + (hours / 24.84) * 360) * Math.PI) / 180;
    return { x: EX + ER * Math.cos(a), y: EY - ER * Math.sin(a) };
  });

  /** @param {number} t */
  const plotX = (t) => (t / SPAN) * (PLOT_W - 16) + 8;
  /** @param {number} h */
  const plotY = (h) => PLOT_H / 2 - h * 34;
  const curve = $derived(
    pointsAttr(
      Array.from({ length: 101 }, (_, i) => {
        const t = (i * SPAN) / 100;
        return { x: plotX(t), y: plotY(waterAt(t, d)) };
      }),
    ),
  );

  const note = $derived.by(() => {
    const big = formatNumber(range, 2);
    if (kind === 'cuong') {
      return `Triều cường: Mặt Trời và Mặt Trăng gần thẳng hàng với Trái Đất, hai chỗ phồng trùng nhau, biên độ khoảng ${big} lần triều do riêng Mặt Trăng.`;
    }
    if (kind === 'kem') {
      return `Triều kém: hướng Mặt Trời vuông góc với hướng Mặt Trăng, hai chỗ phồng làm yếu nhau, biên độ chỉ khoảng ${big} lần triều do riêng Mặt Trăng.`;
    }
    return `Triều trung gian: biên độ khoảng ${big} lần triều do riêng Mặt Trăng. Kéo Mặt Trăng tới vị trí trăng non, trăng tròn hoặc bán nguyệt để so sánh.`;
  });
  const waterNow = $derived(waterAt(hours, d));

  function fromDrag() {
    d = Math.round(elongationFromPoint(drag.x - EX, EY - drag.y));
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {boolean} big
   */
  function onMoonKey(dx, dy, big) {
    d = (((d + (dx || -dy) * (big ? 15 : 3)) % 360) + 360) % 360;
  }
</script>

<div class="space-y-3">
  <div class="{card} overflow-hidden">
    <svg
      bind:this={svg}
      viewBox="0 0 {W} {H}"
      class="block h-auto w-full touch-none"
      role="group"
      aria-label="Mô hình nước biển phồng theo vị trí Mặt Trăng và Mặt Trời"
    >
      <rect width={W} height={H} fill="#0f172a" />
      {#each [50, 120, 190] as y (y)}
        <line x1="6" y1={y} x2="40" y2={y} stroke="#fbbf24" stroke-width="2" />
        <path d="M 40 {y - 5} L 50 {y} L 40 {y + 5} Z" fill="#fbbf24" />
      {/each}
      <text x="6" y="24" fill="#fde68a" font-size="14">Mặt Trời</text>
      <circle
        cx={EX}
        cy={EY}
        r={ORBIT}
        fill="none"
        stroke="#475569"
        stroke-width="1.5"
        stroke-dasharray="4 4"
      />
      <polygon points={water} fill="#38bdf8" opacity="0.75" />
      <circle cx={EX} cy={EY} r={ER} fill="#166534" />
      <circle
        cx={observer.x}
        cy={observer.y}
        r="5"
        fill="#fbbf24"
        stroke="#0f172a"
        stroke-width="1.5"
      />
      <g
        class="drag-handle cursor-grab"
        role="slider"
        tabindex="0"
        aria-label="Mặt Trăng trên quỹ đạo"
        aria-valuemin="0"
        aria-valuemax="359"
        aria-valuenow={d}
        aria-valuetext="{d} độ so với hướng Mặt Trời"
        use:draggable={{
          point: drag,
          svg: () => svg ?? null,
          viewBox: { w: W, h: H },
          pad: 0,
          onChange: fromDrag,
          onKeyMove: onMoonKey,
        }}
      >
        <circle
          class="drag-knob"
          cx={EX + moon.x}
          cy={EY - moon.y}
          r="10"
          fill="#f1f5f9"
          stroke="#fbbf24"
          stroke-width="2"
        />
      </g>
    </svg>
  </div>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => (d = 0)}>Trăng non</button>
    <button type="button" class={button.quiet} onclick={() => (d = 90)}>Bán nguyệt đầu tháng</button
    >
    <button type="button" class={button.quiet} onclick={() => (d = 180)}>Trăng tròn</button>
    <button type="button" class={button.quiet} onclick={() => (d = 270)}
      >Bán nguyệt cuối tháng</button
    >
  </div>
  <FeedbackNote tone={kind === 'trung-gian' ? 'info' : 'ok'} text={note} />
  <SliderField
    label="Số giờ sau khi Mặt Trăng qua đỉnh đầu điểm vàng"
    bind:value={hours}
    min={0}
    max={SPAN}
    step={0.5}
    format={(v) => formatNumber(v, 1)}
    unit="giờ"
  />
  <div class="{card} overflow-hidden">
    <svg
      viewBox="0 0 {PLOT_W} {PLOT_H}"
      class="block h-auto w-full"
      role="img"
      aria-label="Mực nước tại điểm vàng trong khoảng một ngày, lúc này {waterNow >= 0
        ? 'cao'
        : 'thấp'} hơn mức trung bình"
    >
      <rect width={PLOT_W} height={PLOT_H} fill="#f8fafc" />
      <line x1="8" y1={PLOT_H / 2} x2={PLOT_W - 8} y2={PLOT_H / 2} stroke="#94a3b8" />
      <polyline points={curve} fill="none" stroke="#0284c7" stroke-width="2.5" />
      <circle cx={plotX(hours)} cy={plotY(waterNow)} r="5" fill="#fbbf24" stroke="#92400e" />
      <text x="10" y="14" font-size="12" fill="#475569">Mực nước tại điểm vàng</text>
      <text x={PLOT_W - 8} y={PLOT_H - 6} font-size="12" fill="#475569" text-anchor="end">
        Thời gian: 25 giờ
      </text>
    </svg>
  </div>
  <p class="text-sm text-slate-600">
    Lớp nước vẽ phồng lên rất nhiều so với thực tế. Mô hình coi cả Trái Đất phủ nước đều; ở bờ biển
    thật, đường bờ và đáy biển làm thay đổi đáng kể số lần và độ cao của triều.
  </p>
</div>
