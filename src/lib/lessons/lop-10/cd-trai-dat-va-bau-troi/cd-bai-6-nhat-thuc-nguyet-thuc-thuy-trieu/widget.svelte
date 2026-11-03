<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    DISC,
    ECLIPSE_NAME,
    eclipseAt,
    eclipseText,
    elongationFromPoint,
    moonLatitude,
    moonOnOrbit,
    wrap180,
  } from './engine.js';

  const W = 360;
  const H = 260;
  const EX = 215;
  const EY = 130;
  const ER = 20;
  const ORBIT = 82;
  const MR = 9;
  const SNAP = 3;

  const uid = $props.id();

  let d = $state(30);
  let s = $state(20);
  let moonSize = $state('near');
  /** @type {SVGSVGElement | undefined} */
  let svg = $state();
  const drag = $state({ x: 0, y: 0 });

  const near = $derived(moonSize === 'near');
  const moon = $derived(moonOnOrbit(d, ORBIT));
  const mx = $derived(EX + moon.x);
  const my = $derived(EY - moon.y);
  const eclipse = $derived(eclipseAt(d, s, near));
  const lat = $derived(moonLatitude(d, s));
  const text = $derived(eclipseText(d, s, near));
  const solar = $derived(eclipse.kind.startsWith('solar'));
  const lunar = $derived(eclipse.kind.startsWith('lunar'));
  const nearNew = $derived(Math.abs(wrap180(d)) < 25);

  /** @param {number} deg */
  function onOrbit(deg) {
    const a = (deg * Math.PI) / 180;
    return { x: EX + ORBIT * Math.cos(a), y: EY - ORBIT * Math.sin(a) };
  }

  const nodeA = $derived(onOrbit(180 - s));
  const nodeB = $derived(onOrbit(360 - s));
  const aboveArc = $derived(
    `M ${nodeA.x} ${nodeA.y} A ${ORBIT} ${ORBIT} 0 0 0 ${nodeB.x} ${nodeB.y}`,
  );
  const belowArc = $derived(
    `M ${nodeB.x} ${nodeB.y} A ${ORBIT} ${ORBIT} 0 0 0 ${nodeA.x} ${nodeA.y}`,
  );

  /** @param {number} value */
  function snapped(value) {
    for (const target of [0, 180, 360]) {
      if (Math.abs(value - target) < SNAP) return target % 360;
    }
    return Math.round(value);
  }

  function fromDrag() {
    d = snapped(elongationFromPoint(drag.x - EX, EY - drag.y));
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {boolean} big
   */
  function onMoonKey(dx, dy, big) {
    const step = big ? 10 : 2;
    d = (((d + (dx || -dy) * step) % 360) + 360) % 360;
  }

  // The discs panel, in pixels per degree of sky.
  const SKY_W = 200;
  const SKY_H = 150;
  const SOLAR_SCALE = 90;
  const LUNAR_SCALE = 50;
  const atNew = $derived(Math.abs(wrap180(d)) < SNAP);
  const atFull = $derived(Math.abs(wrap180(d - 180)) < SNAP);
  const mode = $derived(atNew ? 'solar' : atFull ? 'lunar' : 'none');
  const skyMoon = $derived.by(() => {
    const scale = mode === 'solar' ? SOLAR_SCALE : LUNAR_SCALE;
    const raw = mode === 'solar' ? eclipse.sunGap : eclipse.shadowGap;
    const reach = Math.min(raw * scale, 88);
    const dy = lat >= 0 ? -1 : 1;
    return { x: SKY_W / 2, y: SKY_H / 2 + dy * reach };
  });
  const dark = $derived(eclipse.kind === 'solar-total');
</script>

<div class="space-y-4">
  <div class="grid items-start gap-3 sm:grid-cols-[3fr_2fr]">
    <div class="{card} overflow-hidden">
      <svg
        bind:this={svg}
        viewBox="0 0 {W} {H}"
        class="block h-auto w-full touch-none"
        role="group"
        aria-label="Mặt Trời ở bên trái, Trái Đất ở giữa, Mặt Trăng trên quỹ đạo nhìn từ phía Bắc"
      >
        <rect width={W} height={H} fill="#0f172a" />
        {#each [60, 105, 150, 195] as y (y)}
          <line x1="8" y1={y} x2="48" y2={y} stroke="#fbbf24" stroke-width="2" />
          <path d="M 48 {y - 5} L 58 {y} L 48 {y + 5} Z" fill="#fbbf24" />
        {/each}
        <text x="8" y="26" fill="#fde68a" font-size="16">Ánh sáng Mặt Trời</text>

        <polygon
          points="{EX},{EY - ER} {W},{EY - 8} {W},{EY + 8} {EX},{EY + ER}"
          fill={lunar ? '#7f1d1d' : '#334155'}
        />

        <line
          x1={nodeA.x}
          y1={nodeA.y}
          x2={nodeB.x}
          y2={nodeB.y}
          stroke="#a78bfa"
          stroke-width="1.5"
          stroke-dasharray="3 4"
        />
        <path d={aboveArc} fill="none" stroke="#e2e8f0" stroke-width="2.5" />
        <path d={belowArc} fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="6 5" />
        <circle cx={nodeA.x} cy={nodeA.y} r="4" fill="#a78bfa" />
        <circle cx={nodeB.x} cy={nodeB.y} r="4" fill="#a78bfa" />

        {#if nearNew}
          <polygon
            points="{mx},{my - MR} {EX + moon.x * 0.3},{EY - moon.y * 0.3} {mx},{my + MR}"
            fill={solar ? '#000' : '#334155'}
            opacity="0.85"
          />
        {/if}

        <circle cx={EX} cy={EY} r={ER} fill="#2563eb" />
        <path
          d="M {EX} {EY - ER} A {ER} {ER} 0 0 1 {EX} {EY + ER} Z"
          fill="#0b1220"
          opacity="0.65"
        />
        <text x={EX} y={EY + ER + 18} fill="#cbd5e1" font-size="14" text-anchor="middle"
          >Trái Đất</text
        >

        <g
          class="drag-handle cursor-grab"
          role="slider"
          tabindex="0"
          aria-label="Mặt Trăng trên quỹ đạo"
          aria-valuemin="0"
          aria-valuemax="359"
          aria-valuenow={Math.round(d)}
          aria-valuetext="{formatNumber(d, 0)} độ so với hướng Mặt Trời. {ECLIPSE_NAME[
            eclipse.kind
          ]}"
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
            cx={mx}
            cy={my}
            r={MR}
            fill="#f1f5f9"
            stroke="#fbbf24"
            stroke-width="2"
          />
          <path d="M {mx} {my - MR} A {MR} {MR} 0 0 1 {mx} {my + MR} Z" fill="#475569" />
        </g>
      </svg>
    </div>

    <div class="{card} overflow-hidden">
      <svg
        viewBox="0 0 {SKY_W} {SKY_H}"
        class="block h-auto w-full"
        role="img"
        aria-label="Hình thấy trên bầu trời: {ECLIPSE_NAME[eclipse.kind]}"
      >
        <defs>
          <clipPath id="{uid}-moon">
            <circle cx={skyMoon.x} cy={skyMoon.y} r={DISC.moon * LUNAR_SCALE} />
          </clipPath>
        </defs>
        {#if mode === 'solar'}
          <rect width={SKY_W} height={SKY_H} fill={dark ? '#020617' : '#7dd3fc'} />
          {#if dark}
            <circle
              cx={SKY_W / 2}
              cy={SKY_H / 2}
              r={DISC.sun * SOLAR_SCALE + 10}
              fill="#e0f2fe"
              opacity="0.5"
            />
          {/if}
          <circle cx={SKY_W / 2} cy={SKY_H / 2} r={DISC.sun * SOLAR_SCALE} fill="#fde047" />
          <circle
            cx={skyMoon.x}
            cy={skyMoon.y}
            r={eclipse.moonRadius * SOLAR_SCALE}
            fill="#1e293b"
          />
          <text
            x={SKY_W / 2}
            y={SKY_H - 8}
            font-size="11"
            text-anchor="middle"
            fill={dark ? '#e2e8f0' : '#0c4a6e'}
          >
            Nơi thấy rõ nhất trên Trái Đất
          </text>
        {:else if mode === 'lunar'}
          <rect width={SKY_W} height={SKY_H} fill="#020617" />
          <circle cx={SKY_W / 2} cy={SKY_H / 2} r={DISC.penumbra * LUNAR_SCALE} fill="#334155" />
          <circle cx={SKY_W / 2} cy={SKY_H / 2} r={DISC.umbra * LUNAR_SCALE} fill="#111827" />
          <circle cx={skyMoon.x} cy={skyMoon.y} r={DISC.moon * LUNAR_SCALE} fill="#f1f5f9" />
          <circle
            cx={SKY_W / 2}
            cy={SKY_H / 2}
            r={DISC.umbra * LUNAR_SCALE}
            fill="#991b1b"
            clip-path="url(#{uid}-moon)"
          />
          <text x={SKY_W / 2} y="14" font-size="11" text-anchor="middle" fill="#cbd5e1">
            Bóng tối và nửa tối của Trái Đất
          </text>
        {:else}
          <rect width={SKY_W} height={SKY_H} fill="#1e293b" />
          <text x={SKY_W / 2} y={SKY_H / 2 - 4} font-size="13" text-anchor="middle" fill="#e2e8f0">
            Chưa thẳng hàng,
          </text>
          <text x={SKY_W / 2} y={SKY_H / 2 + 14} font-size="13" text-anchor="middle" fill="#e2e8f0">
            chưa có gì để nhìn.
          </text>
        {/if}
      </svg>
      <p class="px-3 py-2 text-sm font-semibold text-slate-800">{ECLIPSE_NAME[eclipse.kind]}</p>
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => (d = 0)}>Trăng non</button>
    <button type="button" class={button.quiet} onclick={() => (d = 180)}>Trăng tròn</button>
    <button type="button" class={button.quiet} onclick={() => (s = 0)}
      >Đưa Mặt Trời về đường nút</button
    >
  </div>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Góc giữa Mặt Trời và đường nút"
      bind:value={s}
      min={-90}
      max={90}
      unit="°"
    />
    <SegmentedControl
      label="Khoảng cách Mặt Trăng"
      options={[
        { value: 'near', label: 'Gần Trái Đất' },
        { value: 'far', label: 'Xa Trái Đất' },
      ]}
      bind:value={moonSize}
    />
  </div>
  <FeedbackNote tone={eclipse.kind === 'none' ? 'info' : 'ok'} {text} />
  <p class="text-sm text-slate-600">
    Hình không đúng tỉ lệ. Nửa quỹ đạo nét liền ở phía trên mặt phẳng hoàng đạo, nửa nét đứt ở phía
    dưới; đường màu tím nối hai điểm nút. Trong một năm, Mặt Trời trôi khoảng 1° mỗi ngày so với
    đường nút. Chỉ khi góc này nhỏ thì mới có nhật thực, nguyệt thực.
  </p>
</div>
