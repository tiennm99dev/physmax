<script>
  import { onDestroy } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import {
    MAX_HEIGHT,
    SPACING,
    advance,
    blockingPoint,
    energies,
    speed,
    start,
    startHeight,
    trackAt,
    trackLength,
  } from './engine.js';

  const W = 380;
  const H = 260;
  const LEFT = 30;
  const GROUND = 232;
  const PX_X = 40;
  const PX_Y = 33;
  const SHAPE = [5, 0.5, 3, 1, 4];

  let heights = $state([...SHAPE]);
  let friction = $state('khong');
  let rider = $state(start(SHAPE));
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const withFriction = $derived(friction === 'co');
  const e = $derived(energies(heights, rider));
  const v = $derived(speed(heights, rider));
  const here = $derived(trackAt(heights, rider.x));
  const blocked = $derived(blockingPoint(heights));

  const sx = (/** @type {number} */ x) => LEFT + x * PX_X;
  const sy = (/** @type {number} */ y) => GROUND - y * PX_Y;
  /** SVG coordinates to one decimal, to keep the path short. */
  const r1 = (/** @type {number} */ v) => Math.round(v * 10) / 10;

  const path = $derived.by(() => {
    const end = trackLength(heights);
    const pts = [];
    for (let k = 0; k <= 80; k++) {
      const x = (end * k) / 80;
      pts.push(`${r1(sx(x))},${r1(sy(trackAt(heights, x).y))}`);
    }
    return `M${pts.join(' L')}`;
  });

  /** Rider drawn on the track, pushed out along its normal. */
  const body = $derived.by(() => {
    const px = sx(rider.x);
    const py = sy(here.y);
    const ang = Math.atan2(-here.slope * PX_Y, PX_X);
    const nx = Math.sin(ang);
    const ny = -Math.cos(ang);
    return { px, py, nx, ny, deg: (ang * 180) / Math.PI };
  });

  function halt() {
    stop?.();
    stop = null;
    running = false;
  }
  onDestroy(halt);

  function reset() {
    halt();
    rider = start(heights);
  }
  function play() {
    if (running) {
      halt();
      return;
    }
    if (rider.resting) rider = start(heights);
    if (reducedMotion()) {
      stepOnce();
      return;
    }
    running = true;
    stop = frameLoop((dt) => {
      rider = advance(heights, rider, dt, withFriction);
      if (rider.resting) halt();
    });
  }
  function stepOnce() {
    rider = advance(heights, rider.resting ? start(heights) : rider, 0.1, withFriction);
  }

  /** @param {number} i @param {number} h */
  function setHeight(i, h) {
    const next = [...heights];
    next[i] = Math.round(Math.min(MAX_HEIGHT, Math.max(0, h)) * 4) / 4;
    heights = next;
    reset();
  }

  const scratch = SHAPE.map(() => ({ x: 0, y: 0 }));
  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch[i],
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setHeight(i, (GROUND - scratch[i].y) / PX_Y),
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => setHeight(i, heights[i] - dy * (big ? 1 : 0.25)),
  });

  const J = (/** @type {number} */ x) => `${formatNumber(x, 0)} J`;
  const pct = (/** @type {number} */ x) =>
    rider.total > 0 ? Math.min(100, (x / rider.total) * 100) : 0;
  const m = (/** @type {number} */ x) => `${formatNumber(x, 2)} m`;

  const bars = $derived([
    { key: 'wd', label: 'Động năng', value: e.wd, color: 'bg-rose-500' },
    { key: 'wt', label: 'Thế năng', value: e.wt, color: 'bg-sky-500' },
    { key: 'w', label: 'Cơ năng = động năng + thế năng', value: e.w, color: 'bg-violet-500' },
    { key: 'heat', label: 'Nhiệt năng do ma sát', value: e.heat, color: 'bg-amber-500' },
  ]);

  // Built from the phase only, so a screen reader hears a change of phase,
  // not every frame; the numbers are in the bars.
  const feedback = $derived.by(() => {
    if (rider.total <= 0)
      return 'Điểm xuất phát đang nằm ở mặt đất: kéo điểm đầu tiên lên cao để ván trượt có thế năng.';
    const start0 = `Cơ năng ban đầu ${J(rider.total)} (chỉ có thế năng ở độ cao ${m(startHeight(heights))}).`;
    if (rider.resting && rider.heat > 0) {
      return `Ván trượt đã dừng hẳn. Ma sát đã chuyển hoá ${J(rider.heat)} cơ năng thành nhiệt năng; cơ năng còn lại ${J(e.w)} chỉ là thế năng ở chỗ dừng.`;
    }
    if (!running && rider.v === 0 && rider.heat === 0) {
      const wall =
        !withFriction && blocked > 0
          ? ` Điểm ${blocked + 1} cao hơn điểm xuất phát: dự đoán xem ván trượt có vượt qua được nó không.`
          : '';
      return `${start0} Nhấn "Thả" để ván trượt chạy.${wall}`;
    }
    const down = here.slope * rider.v < 0;
    const turn = down
      ? 'Đang đi xuống: thế năng chuyển hoá thành động năng.'
      : 'Đang đi lên: động năng chuyển hoá thành thế năng.';
    if (withFriction) {
      return `${turn} Có ma sát: cơ năng giảm dần vì một phần chuyển hoá thành nhiệt năng, nên mỗi lần lên dốc ván trượt lên thấp hơn. Cơ năng cộng nhiệt năng vẫn bằng ${J(rider.total)}.`;
    }
    const stuck =
      blocked > 0
        ? ` Ván trượt không vượt qua được điểm ${blocked + 1} vì điểm này cao hơn điểm xuất phát: nó chỉ lên tới độ cao xuất phát rồi trượt ngược lại.`
        : '';
    return `${turn} Bỏ qua ma sát: cơ năng luôn bằng ${J(rider.total)}.${stuck}`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Ma sát giữa ván và đường trượt"
    options={[
      { value: 'khong', label: 'Bỏ qua ma sát' },
      { value: 'co', label: 'Có ma sát' },
    ]}
    bind:value={friction}
    onchange={reset}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-lg touch-none select-none"
      aria-label="Đường trượt ván. Ván trượt ở độ cao {formatFixed(
        here.y,
        1,
      )} m, tốc độ {formatFixed(v, 1)} m/s."
      role="group"
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#bbf7d0" />
      <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#16a34a" stroke-width="1.5" />
      <text x={W - 6} y={GROUND + 18} text-anchor="end" class="fill-green-800 text-[11px]"
        >mặt đất: mốc thế năng</text
      >
      {#each [0, 2, 4, 6] as k (k)}
        <line x1="0" y1={sy(k)} x2="8" y2={sy(k)} stroke="#94a3b8" />
        <text x="10" y={sy(k) + 4} class="fill-slate-500 text-[10px]">{k} m</text>
      {/each}
      <line
        x1={LEFT}
        y1={sy(startHeight(heights))}
        x2={W - 10}
        y2={sy(startHeight(heights))}
        stroke="#a78bfa"
        stroke-dasharray="5 4"
      />
      <path d="{path} L{sx(trackLength(heights))},{GROUND} L{LEFT},{GROUND} Z" fill="#e2e8f0" />
      <path d={path} fill="none" stroke="#475569" stroke-width="4" stroke-linejoin="round" />
      <line
        x1={LEFT}
        y1={sy(heights[0]) - 26}
        x2={LEFT}
        y2={GROUND}
        stroke="#475569"
        stroke-width="4"
      />
      <line
        x1={sx(trackLength(heights))}
        y1={sy(heights[heights.length - 1]) - 26}
        x2={sx(trackLength(heights))}
        y2={GROUND}
        stroke="#475569"
        stroke-width="4"
      />
      <g transform="translate({body.px + body.nx * 4}, {body.py + body.ny * 4})">
        <rect x="-4" y="-22" width="8" height="18" rx="3" fill="#f97316" />
        <circle cx="0" cy="-27" r="5" fill="#fdba74" />
        <rect
          x="-11"
          y="-4"
          width="22"
          height="4"
          rx="2"
          fill="#0f172a"
          transform="rotate({body.deg})"
        />
      </g>
      {#each heights as h, i (i)}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Độ cao điểm {i + 1} của đường trượt"
          aria-valuemin={0}
          aria-valuemax={MAX_HEIGHT}
          aria-valuenow={h}
          aria-valuetext="{formatNumber(h, 2)} mét"
          style="cursor:ns-resize; outline:none"
          use:draggable={dragFor(i)}
        >
          <circle
            class="drag-knob"
            cx={sx(i * SPACING)}
            cy={sy(h)}
            r="7"
            fill="#fff"
            stroke="#7c3aed"
            stroke-width="3"
          />
        </g>
      {/each}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Kéo các chấm tím lên xuống (hoặc chọn chấm rồi dùng phím mũi tên) để vẽ lại đường trượt. Đường
      nét đứt là độ cao xuất phát.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={play}>{running ? 'Dừng' : 'Thả'}</button>
    <button type="button" class={button.secondary} onclick={stepOnce} disabled={running}
      >Tiến 0,1 s</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Về điểm xuất phát</button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        heights = [...SHAPE];
        reset();
      }}>Đường trượt mẫu</button
    >
  </div>

  <div class="{card} space-y-2 p-3">
    <div class="flex justify-between text-sm tabular-nums text-slate-600">
      <span>Độ cao: <b class="text-slate-900">{formatFixed(here.y, 2)} m</b></span>
      <span>Tốc độ: <b class="text-slate-900">{formatFixed(v, 2)} m/s</b></span>
    </div>
    {#each bars as bar (bar.key)}
      {#if bar.key !== 'heat' || withFriction}
        <div>
          <div class="mb-1 flex justify-between gap-2 text-sm">
            <span class="text-slate-700">{bar.label}</span>
            <span class="font-semibold tabular-nums">{J(bar.value)}</span>
          </div>
          <div class="h-4 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
            <div class="{bar.color} h-full" style="width: {pct(bar.value)}%"></div>
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <FeedbackNote tone={withFriction ? 'warn' : 'info'} text={feedback} />
</div>
