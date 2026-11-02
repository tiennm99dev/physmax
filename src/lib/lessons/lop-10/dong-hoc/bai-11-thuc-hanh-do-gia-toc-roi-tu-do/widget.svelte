<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex, texNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import {
    COLUMN,
    GATE,
    MIN_HEIGHTS,
    MIN_READINGS,
    fallenAt,
    heightRow,
    idealTime,
    reading,
    snapGate,
    summarize,
  } from './engine.js';

  const MAX_READINGS = 5;
  const RIG_W = 142;
  const RIG_H = 280;
  const RAIL_X = 60;
  const RAIL_TOP = 30;
  const RAIL_BOTTOM = 266;
  const PLOT_W = 240;
  const PLOT_H = 280;
  const LEFT = 42;
  const RIGHT = 12;
  const TOP = 20;
  const BOTTOM = 34;
  const T2_MAX = 0.3;
  const T2_TICKS = [0, 0.1, 0.2, 0.3];
  const S_TICKS = [0, 0.3, 0.6, 0.9, 1.2];

  let gate = $state(0.4);
  /** @type {Record<string, number[]>} */
  let readings = $state({});
  let draw = $state(0);
  let t = $state(0);
  let running = $state(false);
  let cleared = $state(true);
  /** @type {SVGSVGElement | null} */
  let rig = $state(null);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const key = $derived(String(gate));
  const current = $derived(readings[key] ?? []);
  const clock = $derived.by(() => {
    if (running) return Math.min(t, idealTime(gate));
    return cleared ? 0 : (current.at(-1) ?? 0);
  });
  const rows = $derived(
    Object.entries(readings)
      .map(([s, times]) => heightRow(Number(s), times))
      .sort((a, b) => a.s - b.s),
  );
  const usable = $derived(rows.filter((r) => r.n >= MIN_READINGS));
  const result = $derived(usable.length > 0 ? summarize(usable) : null);
  const ready = $derived(usable.length >= MIN_HEIGHTS);

  const py = linear(0, COLUMN, RAIL_TOP, RAIL_BOTTOM);
  const plotX = linear(0, T2_MAX, LEFT, PLOT_W - RIGHT);
  const plotY = linear(0, COLUMN, PLOT_H - BOTTOM, TOP);
  const cylinderY = $derived(py.map(fallenAt(t)));

  const note = $derived.by(() => {
    if (ready && result) {
      return `Các điểm nằm gần một đường thẳng qua gốc: $s$ tỉ lệ với $t^2$, vật rơi nhanh dần đều. Hệ số góc $k \\approx ${numTex(result.slope, 3)}$ m/s², nên $g = 2k \\approx ${numTex(result.gFromSlope, 2)}$ m/s². Từ bảng: $g = ${texFixed(result.g)} \\pm ${texFixed(Math.max(result.error, 0.001))}$ m/s².`;
    }
    const left = MIN_HEIGHTS - usable.length;
    if (current.length < MIN_READINGS) {
      return `Ở vị trí này cần thêm $${MIN_READINGS - current.length}$ lần thả. Mỗi vị trí cổng đo ít nhất $${MIN_READINGS}$ lần.`;
    }
    return `Đã đủ số đo ở vị trí này. Dời cổng đến vị trí khác: còn thiếu $${left}$ vị trí để vẽ đồ thị $s$ theo $t^2$.`;
  });

  /** @param {number} v */
  function texFixed(v) {
    return texNumber(formatFixed(v, 3));
  }

  /** @param {number} next */
  function moveGate(next) {
    if (running) return;
    const snapped = snapGate(next);
    if (snapped !== gate) {
      gate = snapped;
      cleared = true;
    }
  }

  function record() {
    draw += 1;
    cleared = false;
    readings[key] = [...current, reading(draw, gate)];
  }

  function release() {
    if (running || current.length >= MAX_READINGS) return;
    t = 0;
    if (reducedMotion()) {
      record();
      return;
    }
    running = true;
    const last = idealTime(COLUMN);
    stopLoop = frameLoop((dt) => {
      t = Math.min(last, t + dt);
      if (t >= last) {
        stopLoop?.();
        stopLoop = null;
        running = false;
        record();
        t = 0;
      }
    });
  }

  function clearAll() {
    stopLoop?.();
    stopLoop = null;
    running = false;
    t = 0;
    cleared = true;
    readings = {};
  }

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <div class="{card} grid grid-cols-[35%_1fr] gap-1 p-2">
    <svg
      bind:this={rig}
      viewBox="0 0 {RIG_W} {RIG_H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Máng đứng với nam châm điện, trụ thép và cổng quang điện. Kéo cổng hoặc dùng phím mũi tên để dời cổng."
    >
      <line
        x1={RAIL_X - 14}
        x2={RAIL_X - 14}
        y1={RAIL_TOP - 24}
        y2={RAIL_BOTTOM + 8}
        stroke="#94a3b8"
        stroke-width="6"
      />
      <rect x={RAIL_X - 12} y={RAIL_TOP - 24} width="24" height="10" fill="#dc2626" />
      <text x={RAIL_X + 15} y={RAIL_TOP - 15} font-size="10" fill="#334155">Nam châm</text>
      {#each S_TICKS as tick (tick)}
        <line
          x1={RAIL_X - 22}
          x2={RAIL_X - 17}
          y1={py.map(tick)}
          y2={py.map(tick)}
          stroke="#475569"
        />
        <text x={RAIL_X - 24} y={py.map(tick) + 4} font-size="10" fill="#475569" text-anchor="end">
          {formatNumber(tick)}
        </text>
      {/each}
      <!-- s is measured to the cylinder's lower edge, so that edge sits on the scale. -->
      <rect x={RAIL_X - 5} y={cylinderY - 14} width="10" height="14" rx="2" fill="#334155" />
      <g
        class="drag-handle cursor-ns-resize outline-none"
        role="slider"
        tabindex="0"
        aria-label="Vị trí cổng quang điện, tính từ điểm thả"
        aria-valuemin={GATE.min}
        aria-valuemax={GATE.max}
        aria-valuenow={gate}
        aria-valuetext={`${formatNumber(gate, 1)} mét`}
        use:draggable={{
          point: { x: RAIL_X, y: py.map(gate) },
          svg: () => rig,
          viewBox: { w: RIG_W, h: RIG_H },
          pad: 0,
          projector: (p) => {
            moveGate(py.invert(p.y));
            return p;
          },
          onKeyMove: (_dx, dy) => moveGate(gate + dy * GATE.step),
        }}
      >
        <path
          class="drag-knob"
          d="M{RAIL_X + 26} {py.map(gate) - 8} L{RAIL_X - 10} {py.map(gate) - 8} M{RAIL_X -
            10} {py.map(gate) + 8} L{RAIL_X + 26} {py.map(gate) + 8} M{RAIL_X + 26} {py.map(gate) -
            8} L{RAIL_X + 26} {py.map(gate) + 8}"
          fill="none"
          stroke="#c026d3"
          stroke-width="4"
        />
        <text x={RAIL_X + 32} y={py.map(gate) + 4} font-size="12" font-weight="700" fill="#c026d3">
          E
        </text>
      </g>
    </svg>

    <svg
      viewBox="0 0 {PLOT_W} {PLOT_H}"
      class="w-full"
      role="img"
      aria-label={`Đồ thị s theo t bình phương với ${usable.length} điểm đo.`}
    >
      {#each T2_TICKS as tick (tick)}
        <line
          x1={plotX.map(tick)}
          x2={plotX.map(tick)}
          y1={TOP}
          y2={PLOT_H - BOTTOM}
          stroke="#e2e8f0"
        />
        <text
          x={plotX.map(tick)}
          y={PLOT_H - BOTTOM + 15}
          font-size="11"
          fill="#475569"
          text-anchor="middle"
        >
          {formatNumber(tick)}
        </text>
      {/each}
      {#each S_TICKS as tick (tick)}
        <line
          x1={LEFT}
          x2={PLOT_W - RIGHT}
          y1={plotY.map(tick)}
          y2={plotY.map(tick)}
          stroke="#e2e8f0"
        />
        <text x={LEFT - 6} y={plotY.map(tick) + 4} font-size="11" fill="#475569" text-anchor="end">
          {formatNumber(tick)}
        </text>
      {/each}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={PLOT_H - BOTTOM} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={PLOT_W - RIGHT}
        y1={PLOT_H - BOTTOM}
        y2={PLOT_H - BOTTOM}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text x={6} y={13} font-size="12" font-weight="600" fill="#334155">s (m)</text>
      <text
        x={PLOT_W - RIGHT}
        y={PLOT_H - 3}
        font-size="12"
        font-weight="600"
        fill="#334155"
        text-anchor="end"
      >
        t² (s²)
      </text>
      {#if ready && result}
        <line
          x1={plotX.map(0)}
          y1={plotY.map(0)}
          x2={plotX.map(COLUMN / result.slope)}
          y2={plotY.map(COLUMN)}
          stroke="#4f46e5"
          stroke-width="2.5"
        />
      {/if}
      {#each usable as row (row.s)}
        <circle
          cx={plotX.map(row.tSquared)}
          cy={plotY.map(row.s)}
          r="5"
          fill="#fff"
          stroke="#dc2626"
          stroke-width="2"
        />
      {/each}
    </svg>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <div
      class="rounded-lg bg-slate-900 px-4 py-2 font-mono text-2xl tabular-nums text-emerald-300"
      role="status"
      aria-label="Số chỉ đồng hồ, giây"
    >
      {formatFixed(clock, 3)} s
    </div>
    <button
      type="button"
      class={button.primary}
      disabled={running || current.length >= MAX_READINGS}
      onclick={release}
    >
      Ngắt nam châm, thả trụ
    </button>
    <button type="button" class={button.quiet} disabled={running} onclick={() => (cleared = true)}>
      RESET
    </button>
    <button type="button" class={button.quiet} disabled={running} onclick={clearAll}>
      Xoá số liệu
    </button>
  </div>

  {#if rows.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full min-w-80 text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">
          {`Số đo. Cổng đang ở s = ${formatNumber(gate, 1)} m, đã đo ${current.length}/${MAX_READINGS} lần.`}
        </caption>
        <thead>
          <tr class="border-b border-slate-300 text-slate-600">
            <th scope="col" class="py-1">s (m)</th>
            <th scope="col" class="py-1">Số lần</th>
            <th scope="col" class="py-1">t̄ (s)</th>
            <th scope="col" class="py-1">t̄² (s²)</th>
            <th scope="col" class="py-1">g (m/s²)</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row.s)}
            <tr class="border-b border-slate-100">
              <td class="py-1">{formatNumber(row.s, 1)}</td>
              <td class="py-1">{row.n}</td>
              <td class="py-1">{formatFixed(row.mean, 3)}</td>
              <td class="py-1">{formatFixed(row.tSquared, 4)}</td>
              <td class="py-1">{formatFixed(row.g, 3)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <FeedbackNote tone={ready ? 'ok' : 'info'} text={note} />
</div>
