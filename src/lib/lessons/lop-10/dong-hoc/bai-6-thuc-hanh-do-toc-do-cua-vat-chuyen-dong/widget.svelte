<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex, texNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { snap } from '#lib/core/visuals/svg-math.js';
  import {
    BALL,
    GATE_STEP,
    TRACK,
    analyze,
    clampE,
    clampF,
    compareNote,
    distanceAt,
    idealTime,
    lengthOf,
    reading,
    timeAt,
  } from './engine.js';

  const MAX_READINGS = 5;
  const MIN_FOR_RESULT = 3;
  const W = 360;
  const H = 170;
  const X0 = 24;
  const X1 = 336;
  const Y0 = 44;

  /** @type {import('./engine.js').Mode} */
  let mode = $state('AB');
  let tilt = $state(6);
  let gateE = $state(0.2);
  let gateF = $state(0.7);
  /** @type {Record<import('./engine.js').Mode, number[]>} */
  let readings = $state({ AB: [], A: [], B: [] });
  let draw = $state(0);
  let t = $state(0);
  let running = $state(false);
  let clockCleared = $state(true);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  // The slope is drawn steeper than it is, so that a small tilt can be seen.
  const rise = $derived(30 + tilt * 7);
  /** @param {number} m */
  const pointAt = (m) => ({
    x: X0 + (m / TRACK) * (X1 - X0),
    y: Y0 + (m / TRACK) * rise,
  });
  const ball = $derived(pointAt(distanceAt(t, tilt)));

  const current = $derived(readings[mode]);
  const length = $derived(lengthOf(mode, gateE, gateF));
  const stats = $derived(current.length > 0 ? analyze(current, length.length, length.error) : null);
  const ready = $derived(stats !== null && stats.n >= MIN_FOR_RESULT);
  const clock = $derived.by(() => {
    if (!running) return clockCleared ? 0 : (current.at(-1) ?? 0);
    const tE = timeAt(mode === 'B' ? gateF : gateE, tilt);
    return Math.min(Math.max(0, t - tE), idealTime(mode, gateE, gateF, tilt));
  });
  const speeds = $derived.by(() => {
    /** @type {{ AB?: number, A?: number, B?: number }} */
    const out = {};
    for (const m of /** @type {const} */ (['AB', 'A', 'B'])) {
      if (readings[m].length >= MIN_FOR_RESULT) {
        const { length: len, error } = lengthOf(m, gateE, gateF);
        out[m] = analyze(readings[m], len, error).speed;
      }
    }
    return out;
  });
  const finding = $derived(compareNote(speeds));

  const formula = $derived.by(() => {
    if (!stats) return '';
    const symbol = mode === 'AB' ? 's' : 'd';
    const v = mode === 'AB' ? 'v_{EF}' : mode === 'A' ? 'v_E' : 'v_F';
    return `$${v} = \\dfrac{${symbol}}{\\overline{t}} = \\dfrac{${numTex(length.length, 3)}}{${texFixed(stats.mean)}} \\approx ${texFixed(stats.speed)}$ m/s`;
  });
  const result = $derived.by(() => {
    if (!stats || !ready) return '';
    return `$\\delta v \\approx ${numTex(stats.relative * 100, 2)}\\%$, nên $v = ${texFixed(stats.speed)} \\pm ${texFixed(stats.speedError)}$ m/s.`;
  });

  /** @param {number} v */
  function texFixed(v) {
    return texNumber(formatFixed(v, 3));
  }

  function clearAll() {
    stopLoop?.();
    stopLoop = null;
    running = false;
    t = 0;
    clockCleared = true;
    readings = { AB: [], A: [], B: [] };
  }

  /** @param {number} m */
  function moveE(m) {
    const next = clampE(snap(m, GATE_STEP), gateF);
    if (next !== gateE) {
      gateE = next;
      clearAll();
    }
  }

  /** @param {number} m */
  function moveF(m) {
    const next = clampF(snap(m, GATE_STEP), gateE);
    if (next !== gateF) {
      gateF = next;
      clearAll();
    }
  }

  /** @param {{ x: number, y: number }} p */
  function metresAt(p) {
    return ((p.x - X0) / (X1 - X0)) * TRACK;
  }

  function record() {
    draw += 1;
    clockCleared = false;
    readings[mode] = [...readings[mode], reading(draw, mode, gateE, gateF, tilt)];
  }

  function release() {
    if (running || current.length >= MAX_READINGS) return;
    const last = timeAt(TRACK, tilt);
    if (reducedMotion()) {
      t = 0;
      record();
      return;
    }
    t = 0;
    running = true;
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

  $effect(() => () => stopLoop?.());
</script>

{#snippet gate(
  /** @type {string} */ name,
  /** @type {number} */ m,
  /** @type {(p: { x: number, y: number }) => { x: number, y: number }} */ projector,
  /** @type {(step: number) => void} */ onStep,
  /** @type {string} */ color,
)}
  {@const at = pointAt(m)}
  <g
    class="drag-handle cursor-ew-resize touch-none outline-none"
    role="slider"
    tabindex="0"
    aria-label={`Vị trí cổng quang điện ${name}, tính từ vị trí thả bi`}
    aria-valuemin={0}
    aria-valuemax={TRACK}
    aria-valuenow={m}
    aria-valuetext={`${formatNumber(m, 2)} mét`}
    use:draggable={{
      point: { x: at.x, y: at.y },
      svg: () => board,
      viewBox: { w: W, h: H },
      pad: 0,
      projector,
      onKeyMove: (dx, dy, big) => {
        const dir = dx !== 0 ? dx : -dy;
        if (dir !== 0) onStep(dir * GATE_STEP * (big ? 3 : 1));
      },
    }}
  >
    <path
      class="drag-knob"
      d="M{at.x - 8} {at.y + 5} L{at.x - 8} {at.y - 34} L{at.x + 8} {at.y - 34} L{at.x + 8} {at.y +
        5}"
      fill="none"
      stroke={color}
      stroke-width="5"
    />
    <text x={at.x} y={at.y - 40} font-size="13" font-weight="700" fill={color} text-anchor="middle">
      {name}
    </text>
  </g>
{/snippet}

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="MODE của đồng hồ"
      options={[
        { value: 'AB', label: 'A↔B' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ]}
      bind:value={mode}
    />
    <SliderField
      label="Góc nghiêng của máng"
      bind:value={tilt}
      min={3}
      max={10}
      unit="°"
      oninput={clearAll}
    />
  </div>

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="w-full"
      role="group"
      aria-label="Máng nhôm nghiêng với viên bi thép và hai cổng quang điện E, F. Kéo cổng hoặc dùng phím mũi tên để dời cổng."
    >
      <line
        x1={X0}
        y1={Y0}
        x2={X1}
        y2={Y0 + rise}
        stroke="#94a3b8"
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle cx={ball.x} cy={ball.y - 8} r="6" fill="#334155" />
      {@render gate(
        'E',
        gateE,
        (p) => {
          moveE(metresAt(p));
          return p;
        },
        (step) => moveE(gateE + step),
        '#0284c7',
      )}
      {@render gate(
        'F',
        gateF,
        (p) => {
          moveF(metresAt(p));
          return p;
        },
        (step) => moveF(gateF + step),
        '#c026d3',
      )}
      <text x={X0} y={Y0 + rise + 22} font-size="12" fill="#475569">
        {`EF = ${formatNumber(gateF - gateE, 2)} m, đường kính bi d = ${formatNumber(BALL * 100)} cm`}
      </text>
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
      Thả bi
    </button>
    <button
      type="button"
      class={button.quiet}
      disabled={running}
      onclick={() => (clockCleared = true)}
    >
      RESET
    </button>
    <button type="button" class={button.quiet} disabled={running} onclick={clearAll}>
      Xoá số liệu
    </button>
  </div>

  {#if stats}
    <div class="overflow-x-auto">
      <table class="w-full min-w-64 text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">
          Số đo ở MODE {mode === 'AB' ? 'A↔B' : mode} ({stats.n}/{MAX_READINGS} lần)
        </caption>
        <thead>
          <tr class="border-b border-slate-300 text-slate-600">
            <th scope="col" class="py-1">Lần đo</th>
            <th scope="col" class="py-1">t (s)</th>
          </tr>
        </thead>
        <tbody>
          {#each current as value, i (i)}
            <tr class="border-b border-slate-100">
              <td class="py-1">{i + 1}</td>
              <td class="py-1">{formatFixed(value, 3)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="text-sm text-slate-700"><LiveRichText text={formula} /></p>
    {#if ready}
      <p class="text-sm text-slate-700"><LiveRichText text={result} /></p>
    {/if}
  {/if}

  <FeedbackNote
    tone={finding ? 'ok' : 'info'}
    text={finding ??
      'Mỗi MODE cần ít nhất $3$ lần thả bi. Đo đủ cả MODE A↔B (tốc độ trung bình), MODE A (tốc độ tại $E$) và MODE B (tốc độ tại $F$) rồi so sánh.'}
  />
</div>
