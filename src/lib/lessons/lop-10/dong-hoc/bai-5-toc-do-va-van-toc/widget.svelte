<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    RIVER_LENGTH,
    RIVER_WIDTH,
    along,
    courseNote,
    crossing,
    positionAt,
    runTime,
    startOf,
  } from './engine.js';

  const SCALE = 2.45; // pixels per metre on the river drawing
  const LEFT = 8;
  const TOP = 22;
  const W = LEFT * 2 + RIVER_LENGTH * SCALE;
  const H = TOP * 2 + RIVER_WIDTH * SCALE;
  const SPEED_UP = 3; // the run plays three times faster than real time
  const ARROW = 20; // pixels per m/s on the vector panel

  /** @type {'ngang' | 'xuoi' | 'nguoc'} */
  let course = $state('ngang');
  let boat = $state(3);
  let water = $state(2);
  let t = $state(0);
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const end = $derived(runTime(course, boat, water));
  const start = $derived(startOf(course));
  const pos = $derived(positionAt(course, boat, water, t));
  const finish = $derived(positionAt(course, boat, water, end));
  const cross = $derived(crossing(boat, water));
  const net = $derived(course === 'ngang' ? cross.speed : Math.abs(along(boat, water, course)));

  /** @param {number} x */
  const sx = (x) => LEFT + x * SCALE;
  /** @param {number} y */
  const sy = (y) => H - TOP - y * SCALE;

  // Vector panel: the bank-relative velocity is the diagonal of v12 and v23.
  const O = $derived(
    course === 'ngang'
      ? { x: 60, y: 118 }
      : course === 'xuoi'
        ? { x: 30, y: 60 }
        : { x: 150, y: 60 },
  );
  const boatTip = $derived(
    course === 'ngang'
      ? { x: O.x, y: O.y - boat * ARROW }
      : { x: O.x + (course === 'xuoi' ? boat : -boat) * ARROW, y: O.y - 16 },
  );
  const waterTip = $derived({ x: O.x + water * ARROW, y: course === 'ngang' ? O.y : O.y + 16 });
  const netTip = $derived(
    course === 'ngang'
      ? { x: O.x + water * ARROW, y: O.y - boat * ARROW }
      : { x: O.x + (course === 'xuoi' ? boat + water : water - boat) * ARROW, y: O.y },
  );

  // A label goes past the tip of its arrow, so it never sits on the shaft.
  /** @param {{ x: number }} tip */
  const labelDx = (tip) => (tip.x < O.x ? -30 : 6);

  /** @param {number} value @param {number} places */
  const rel = (value, places) =>
    `${tidy(value, places) === tidy(value) ? '=' : '\\approx'} ${numTex(value, places)}`;

  const formula = $derived.by(() => {
    const b = numTex(boat);
    const w = numTex(water);
    if (course === 'ngang') {
      return `$v_{1,3} = \\sqrt{v_{1,2}^2 + v_{2,3}^2} = \\sqrt{${b}^2 + ${w}^2} ${rel(cross.speed, 2)}$ m/s. Qua sông rộng $${RIVER_WIDTH}$ m hết $t = \\dfrac{${RIVER_WIDTH}}{${b}} ${rel(cross.time, 1)}$ s, trôi theo dòng $${numTex(cross.drift, 1)}$ m.`;
    }
    return course === 'xuoi'
      ? `Cùng chiều: $v_{1,3} = v_{1,2} + v_{2,3} = ${b} + ${w} = ${numTex(boat + water)}$ m/s.`
      : `Ngược chiều: $v_{1,3} = |v_{1,2} - v_{2,3}| = |${b} - ${w}| = ${numTex(Math.abs(boat - water))}$ m/s.`;
  });

  function stop() {
    stopLoop?.();
    stopLoop = null;
    running = false;
  }

  function reset() {
    stop();
    t = 0;
  }

  function run() {
    reset();
    if (reducedMotion()) {
      t = end;
      return;
    }
    running = true;
    stopLoop = frameLoop((dt) => {
      t = Math.min(end, t + dt * SPEED_UP);
      if (t >= end) stop();
    });
  }

  $effect(() => stop);
</script>

{#snippet arrow(
  /** @type {{ x: number, y: number }} */ from,
  /** @type {{ x: number, y: number }} */ to,
  /** @type {string} */ color,
  /** @type {string} */ label,
  /** @type {number} */ dx,
  /** @type {number} */ dy,
)}
  {#if Math.hypot(to.x - from.x, to.y - from.y) > 1}
    {@const shaft = shaftEnd(from.x, from.y, to.x, to.y, 10)}
    <line x1={from.x} y1={from.y} x2={shaft.x} y2={shaft.y} stroke={color} stroke-width="3" />
    <polygon points={arrowHead(from.x, from.y, to.x, to.y, 10)} fill={color} />
    <text x={to.x + dx} y={to.y + dy} font-size="13" font-weight="700" fill={color}>{label}</text>
  {/if}
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Mũi thuyền hướng"
    options={[
      { value: 'ngang', label: 'Vuông góc với bờ' },
      { value: 'xuoi', label: 'Xuôi dòng' },
      { value: 'nguoc', label: 'Ngược dòng' },
    ]}
    bind:value={course}
    onchange={reset}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Vận tốc thuyền so với nước"
      bind:value={boat}
      min={2}
      max={5}
      step={0.5}
      unit="m/s"
      oninput={reset}
    />
    <SliderField
      label="Vận tốc dòng nước so với bờ"
      bind:value={water}
      min={0}
      max={4}
      step={0.5}
      unit="m/s"
      oninput={reset}
    />
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full"
      role="img"
      aria-label={`Khúc sông nhìn từ trên xuống, nước chảy từ trái sang phải. Vận tốc của thuyền so với bờ có độ lớn ${formatNumber(net, 2)} mét trên giây.`}
    >
      <rect x="0" y="0" width={W} height={H} fill="#d9f99d" />
      <rect x="0" y={TOP} width={W} height={RIVER_WIDTH * SCALE} fill="#bae6fd" />
      {#each [0.2, 0.5, 0.8] as f (f)}
        <text
          x={W - 10}
          y={TOP + RIVER_WIDTH * SCALE * f + 4}
          font-size="14"
          fill="#0369a1"
          text-anchor="end"
        >
          →
        </text>
      {/each}
      <text x={W - 6} y={15} font-size="12" fill="#3f6212" text-anchor="end">Bờ bên kia</text>
      <text x={W - 6} y={H - 7} font-size="12" fill="#3f6212" text-anchor="end">Bờ bên này</text>
      {#if course === 'ngang'}
        <line
          x1={sx(start.x)}
          y1={sy(0)}
          x2={sx(start.x)}
          y2={sy(RIVER_WIDTH)}
          stroke="#64748b"
          stroke-dasharray="4 4"
        />
      {/if}
      <line
        x1={sx(start.x)}
        y1={sy(start.y)}
        x2={sx(start.x + finish.x)}
        y2={sy(start.y + finish.y)}
        stroke="#dc2626"
        stroke-width="2"
        stroke-dasharray="6 4"
        opacity="0.5"
      />
      <line
        x1={sx(start.x)}
        y1={sy(start.y)}
        x2={sx(start.x + pos.x)}
        y2={sy(start.y + pos.y)}
        stroke="#dc2626"
        stroke-width="3"
      />
      <g
        transform="translate({sx(start.x + pos.x)} {sy(start.y + pos.y)}) rotate({course === 'ngang'
          ? -90
          : course === 'xuoi'
            ? 0
            : 180})"
      >
        <path
          d="M-13 -6 L6 -6 L15 0 L6 6 L-13 6 Z"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
    </svg>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} disabled={running} onclick={run}>
      Cho thuyền chạy
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Về vị trí đầu</button>
    <p class="flex items-center text-sm tabular-nums text-slate-700" aria-live="polite">
      {#if !running && t > 0}
        {`Sau ${formatNumber(t, 1)} s${course === 'ngang' ? `, thuyền trôi ${formatNumber(pos.x, 1)} m theo dòng` : ''}`}
      {/if}
    </p>
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 280 {course === 'ngang' ? 140 : 96}"
      class="mx-auto w-full max-w-sm"
      role="img"
      aria-label="Hình vectơ: vận tốc của thuyền so với bờ bằng tổng vectơ của vận tốc thuyền so với nước và vận tốc nước so với bờ."
    >
      {#if course === 'ngang'}
        {@render arrow(O, boatTip, '#4f46e5', 'v₁,₂', -32, 12)}
        {@render arrow(O, waterTip, '#0284c7', 'v₂,₃', -12, 16)}
        {@render arrow(O, netTip, '#dc2626', 'v₁,₃', 6, 4)}
        {#if water > 0}
          <line
            x1={boatTip.x}
            y1={boatTip.y}
            x2={netTip.x}
            y2={netTip.y}
            stroke="#94a3b8"
            stroke-dasharray="4 3"
          />
          <line
            x1={waterTip.x}
            y1={waterTip.y}
            x2={netTip.x}
            y2={netTip.y}
            stroke="#94a3b8"
            stroke-dasharray="4 3"
          />
        {/if}
      {:else}
        {@render arrow({ x: O.x, y: O.y - 16 }, boatTip, '#4f46e5', 'v₁,₂', labelDx(boatTip), 4)}
        {@render arrow({ x: O.x, y: O.y + 16 }, waterTip, '#0284c7', 'v₂,₃', 6, 4)}
        {@render arrow(O, netTip, '#dc2626', 'v₁,₃', labelDx(netTip), 4)}
      {/if}
    </svg>
    <p class="px-2 pb-1 text-center text-xs text-slate-600">
      1: thuyền; 2: nước; 3: bờ. Mũi tên đỏ là vận tốc của thuyền so với bờ.
    </p>
  </div>

  <p class="text-sm text-slate-700"><LiveRichText text={formula} /></p>
  <FeedbackNote tone="info" text={courseNote(course, boat, water)} />
</div>
