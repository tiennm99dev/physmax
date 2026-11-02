<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { qty } from '#lib/domain/materials.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    G,
    MAX_DEPTH,
    PA,
    TANK_LIQUIDS,
    columnPressure,
    halfWidth,
    keepInside,
    pressureAt,
  } from './engine.js';

  const W = 360;
  const H = 340;
  const CX = 180;
  const SURFACE = 40;
  /** Pixels per metre of depth, and per kilopascal of pressure arrow. */
  const PX = 24;
  const ARROW = 0.4;
  const SENSOR_R = 8;
  const SHAPES = [
    { value: 'thang', label: 'Bình thẳng' },
    { value: 'loe', label: 'Bình loe' },
  ];
  const COLORS = /** @type {Record<string, string>} */ ({
    xang: '#fde68a',
    'dau-hoa': '#fcd9a8',
    nuoc: '#bfdbfe',
    'nuoc-muoi': '#a5d8e6',
  });
  const RULER = [0, 2, 4, 6, 8, 10];
  const Y_MAX = 250;

  /** @type {SVGSVGElement | undefined} */
  let board = $state();
  let liquidId = $state('nuoc');
  let shape = $state(/** @type {'thang' | 'loe'} */ ('thang'));
  let depth = $state(4);
  let offset = $state(0);

  const liquid = $derived(TANK_LIQUIDS.find((l) => l.id === liquidId) ?? TANK_LIQUIDS[0]);
  const column = $derived(tidy(columnPressure(liquid.density, depth)));
  const total = $derived(tidy(pressureAt(liquid.density, depth)));
  const sensorX = $derived(CX + keepInside(shape, depth, offset));
  const sensorY = $derived(SURFACE + depth * PX);
  const arrow = $derived((column / 1000) * ARROW);

  const tank = $derived(
    pointsAttr([
      { x: CX - halfWidth(shape, 0), y: SURFACE },
      { x: CX + halfWidth(shape, 0), y: SURFACE },
      { x: CX + halfWidth(shape, MAX_DEPTH), y: SURFACE + MAX_DEPTH * PX },
      { x: CX - halfWidth(shape, MAX_DEPTH), y: SURFACE + MAX_DEPTH * PX },
    ]),
  );

  /** A straight pressure line from the surface to the bottom, in m and kPa. */
  const lineOf = (/** @type {number} */ density) => [
    { x: 0, y: PA / 1000 },
    { x: MAX_DEPTH, y: pressureAt(density, MAX_DEPTH) / 1000 },
  ];

  const plotLines = $derived([
    ...TANK_LIQUIDS.filter((l) => l.id !== liquid.id).map((l) => ({
      points: lineOf(l.density),
      color: '#cbd5e1',
    })),
    { points: lineOf(liquid.density), color: '#4f46e5' },
  ]);

  /**
   * @param {number} nextDepth @param {number} nextOffset
   */
  function moveTo(nextDepth, nextOffset) {
    depth = tidy(clamp(nextDepth, 0, MAX_DEPTH), 1);
    offset = keepInside(shape, depth, nextOffset);
  }

  const note = $derived(
    depth === 0
      ? `Ở mặt thoáng, $h = 0$ nên áp suất đúng bằng áp suất khí quyển $p_a = ${numTex(PA)}$ Pa. Kéo cảm biến xuống sâu hơn.`
      : `$p = p_a + \\rho g h = ${numTex(PA)} + ${numTex(liquid.density)} \\cdot ${numTex(G)} \\cdot ${numTex(depth, 1)} = ${numTex(total)}$ Pa. Kéo ngang theo đường đứt nét hoặc đổi dạng bình: cùng độ sâu thì áp suất không đổi.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Chất lỏng"
      options={TANK_LIQUIDS.map((l) => ({ value: l.id, label: l.name }))}
      bind:value={liquidId}
    />
    <SegmentedControl
      label="Dạng bình"
      options={SHAPES}
      bind:value={shape}
      onchange={() => moveTo(depth, offset)}
    />
  </div>

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="group"
      aria-label={`Bình đựng ${liquid.name.toLowerCase()}, cảm biến ở độ sâu ${formatNumber(depth, 1)} mét, áp suất ${qty(total)} paxcan.`}
    >
      <polygon points={tank} fill={COLORS[liquid.id]} stroke="#475569" stroke-width="2" />
      <text x={CX} y={SURFACE - 14} font-size="11" fill="#475569" text-anchor="middle">
        Mặt thoáng, áp suất khí quyển pa
      </text>
      {#each RULER as mark (mark)}
        <line x1="24" x2="30" y1={SURFACE + mark * PX} y2={SURFACE + mark * PX} stroke="#64748b" />
        <text x="21" y={SURFACE + mark * PX + 4} font-size="10" fill="#475569" text-anchor="end"
          >{mark}</text
        >
      {/each}
      <text x="4" y={SURFACE - 8} font-size="10" fill="#475569">h (m)</text>
      <line
        x1={CX - halfWidth(shape, depth)}
        x2={CX + halfWidth(shape, depth)}
        y1={sensorY}
        y2={sensorY}
        stroke="#475569"
        stroke-dasharray="5 4"
      />
      <ForceArrow
        x1={sensorX - SENSOR_R - arrow}
        y1={sensorY}
        x2={sensorX - SENSOR_R}
        y2={sensorY}
        color="#be123c"
      />
      <ForceArrow
        x1={sensorX + SENSOR_R + arrow}
        y1={sensorY}
        x2={sensorX + SENSOR_R}
        y2={sensorY}
        color="#be123c"
      />
      <ForceArrow
        x1={sensorX}
        y1={sensorY - SENSOR_R - arrow}
        x2={sensorX}
        y2={sensorY - SENSOR_R}
        color="#be123c"
      />
      <ForceArrow
        x1={sensorX}
        y1={sensorY + SENSOR_R + arrow}
        x2={sensorX}
        y2={sensorY + SENSOR_R}
        color="#be123c"
      />
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Cảm biến áp suất"
        aria-valuemin={0}
        aria-valuemax={MAX_DEPTH}
        aria-valuenow={depth}
        aria-valuetext={`Độ sâu ${formatNumber(depth, 1)} mét, áp suất ${qty(total)} paxcan`}
        use:draggable={{
          point: { x: sensorX, y: sensorY },
          svg: () => board ?? null,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            moveTo((p.y - SURFACE) / PX, p.x - CX);
            return p;
          },
          onKeyMove: (dx, dy, big) => moveTo(depth + dy * (big ? 1 : 0.1), offset + dx * 6),
        }}
      >
        <circle
          class="drag-knob"
          cx={sensorX}
          cy={sensorY}
          r={SENSOR_R}
          fill="#334155"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Mũi tên đỏ biểu diễn áp suất do cột chất lỏng gây ra lên cảm biến: như nhau theo mọi phương.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="{card} space-y-2 p-3 text-sm">
      <p class="flex justify-between gap-3 text-slate-700">
        <span>Do cột chất lỏng, ρgh</span>
        <span class="font-semibold tabular-nums">{qty(column)} Pa</span>
      </p>
      <p class="flex justify-between gap-3 text-slate-700">
        <span>Áp suất khí quyển, pa</span>
        <span class="font-semibold tabular-nums">{qty(PA)} Pa</span>
      </p>
      <p class="flex justify-between gap-3 border-t border-slate-200 pt-2 text-slate-900">
        <span class="font-semibold">Áp suất tại cảm biến, p</span>
        <span class="font-bold tabular-nums text-indigo-700">{qty(total)} Pa</span>
      </p>
      <p class="pt-1 text-slate-600">
        Xuống sâu khoảng 10 m trong nước, áp suất tăng thêm gần bằng áp suất khí quyển.
      </p>
    </div>
    <div class="{card} p-2">
      <XyPlot
        lines={plotLines}
        marks={[{ x: depth, y: total / 1000 }]}
        guides={[{ y: PA / 1000, label: 'pa' }]}
        xMax={MAX_DEPTH}
        yMax={Y_MAX}
        xTicks={ticksUpTo(MAX_DEPTH)}
        yTicks={ticksUpTo(Y_MAX)}
        xLabel="h (m)"
        yLabel="p (kPa)"
        label={`Đồ thị áp suất theo độ sâu của ${liquid.name.toLowerCase()}: đường thẳng bắt đầu từ áp suất khí quyển. Tại ${formatNumber(depth, 1)} mét, áp suất là ${formatNumber(total / 1000, 1)} kilôpaxcan.`}
      />
    </div>
  </div>

  <FeedbackNote tone="info" text={note} />
</div>
