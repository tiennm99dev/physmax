<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    NATURAL,
    SPRINGS,
    coilPoints,
    forceAt,
    permanentSet,
    pullPath,
    releasePath,
    stateOf,
    stretchAt,
  } from './engine.js';

  const W = 220;
  const H = 340;
  const X = 110;
  const TOP = 14;
  /** Pixels per metre of spring and per newton of arrow. */
  const PX = 450;
  const F_ARROW = 8;
  const DAMAGED = '#be123c';
  const RULER = [0, 10, 20, 30, 40, 50, 60];
  const X_MAX = 40;
  const Y_MAX = 16;

  /** @type {SVGSVGElement | undefined} */
  let board = $state();
  let springId = $state(SPRINGS[1].id);
  let force = $state(0);
  /** The largest force each spring has felt. */
  let peaks = $state(Object.fromEntries(SPRINGS.map((s) => [s.id, 0])));

  const spring = $derived(SPRINGS.find((s) => s.id === springId) ?? SPRINGS[0]);
  const peak = $derived(peaks[spring.id]);
  const stretch = $derived(stretchAt(spring, force, peak));
  const endY = $derived(TOP + (NATURAL + stretch) * PX);
  const stage = $derived(stateOf(spring, force, peak));
  const hurt = $derived(peak > spring.limit);
  const cm = $derived(tidy(stretch * 100));
  const coil = $derived(pointsAttr(coilPoints(X, TOP, endY)));

  const plotLines = $derived([
    ...SPRINGS.filter((s) => s.id !== spring.id && peaks[s.id] > 0).map((s) => ({
      points: pullPath(s, peaks[s.id]),
      color: `${s.color}66`,
    })),
    { points: pullPath(spring, peak), color: spring.color },
    ...(hurt ? [{ points: releasePath(spring, peak), color: DAMAGED }] : []),
  ]);
  const guides = $derived(
    hurt ? [{ y: spring.limit, label: 'Giới hạn đàn hồi', color: DAMAGED }] : [],
  );

  /** @param {number} value */
  function setForce(value) {
    force = tidy(clamp(value, 0, spring.max), 1);
    if (force > peaks[spring.id]) peaks[spring.id] = force;
  }

  function newSpring() {
    peaks[spring.id] = 0;
    force = 0;
  }

  const lengthCm = $derived(tidy((NATURAL + stretch) * 100));
  const ratio = $derived(stretch > 0 ? force / stretch : 0);
  const sets = $derived(tidy(permanentSet(spring, peak) * 100));

  const note = $derived.by(() => {
    if (stage === 'rest') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${spring.name} đang ở chiều dài tự nhiên $l_0 = ${numTex(NATURAL * 100)}$ cm. Kéo đầu lò xo xuống để tạo độ dãn.`,
      };
    }
    if (stage === 'elastic') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `$F_{\\text{đh}} = ${numTex(force, 1)}$ N, $|\\Delta l| = ${numTex(cm, 1)}$ cm $= ${numTex(tidy(stretch), 3)}$ m. Tỉ số $\\dfrac{F_{\\text{đh}}}{|\\Delta l|} = ${numTex(tidy(ratio))}$ N/m không đổi khi lực thay đổi: đó là độ cứng $k$. Thả tay, lò xo về đúng chiều dài cũ.`,
      };
    }
    if (stage === 'beyond') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Đã vượt giới hạn đàn hồi ($${numTex(spring.limit)}$ N). Đồ thị rời đường thẳng, tỉ số lực trên độ dãn chỉ còn khoảng $${numTex(ratio, 1)}$ N/m. Định luật Hooke không còn đúng. Thử thả tay xem sao.`,
      };
    }
    if (stage === 'released') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Không còn lực kéo nhưng lò xo vẫn dãn $${numTex(sets, 1)}$ cm so với $l_0$: nó không lấy lại được chiều dài ban đầu. Muốn đo lại, hãy thay lò xo mới.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Lò xo này đã vượt giới hạn đàn hồi một lần: dưới lực $${numTex(force, 1)}$ N, độ dãn là $${numTex(cm, 1)}$ cm, lớn hơn so với lò xo mới. Đồ thị đi trên đường màu đỏ, không còn qua gốc toạ độ.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn lò xo"
    options={SPRINGS.map((s) => ({ value: s.id, label: s.name }))}
    bind:value={springId}
    onchange={() => (force = 0)}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="{card} p-2">
      <svg
        bind:this={board}
        viewBox="0 0 {W} {H}"
        class="mx-auto block w-full max-w-xs select-none"
        role="group"
        aria-label={`${spring.name} treo thẳng đứng, chiều dài ${formatNumber(lengthCm, 1)} xentimét, lực kéo ${formatNumber(force, 1)} niutơn.`}
      >
        <rect x="60" y={TOP - 8} width="100" height="8" fill="#64748b" />
        <line x1="34" x2="34" y1={TOP} y2={TOP + 0.6 * PX} stroke="#94a3b8" />
        {#each RULER as mark (mark)}
          <line
            x1="28"
            x2="34"
            y1={TOP + (mark / 100) * PX}
            y2={TOP + (mark / 100) * PX}
            stroke="#94a3b8"
          />
          <text
            x="25"
            y={TOP + (mark / 100) * PX + 4}
            font-size="10"
            fill="#475569"
            text-anchor="end">{mark}</text
          >
        {/each}
        <text x="4" y={TOP + 0.6 * PX + 18} font-size="10" fill="#475569">(cm)</text>
        <line
          x1="60"
          x2="165"
          y1={TOP + NATURAL * PX}
          y2={TOP + NATURAL * PX}
          stroke="#94a3b8"
          stroke-dasharray="4 4"
        />
        <text x="168" y={TOP + NATURAL * PX + 4} font-size="11" fill="#475569">l₀</text>
        <polyline
          points={coil}
          fill="none"
          stroke={hurt ? DAMAGED : spring.color}
          stroke-width="2.5"
          stroke-linejoin="round"
        />
        <ForceArrow
          x1={X + 16}
          y1={endY}
          x2={X + 16}
          y2={endY + force * F_ARROW}
          color="#4f46e5"
          label="F"
        />
        <ForceArrow
          x1={X - 16}
          y1={endY}
          x2={X - 16}
          y2={endY - force * F_ARROW}
          color="#0f766e"
          label="Fđh"
          labelDx={-26}
        />
        <g
          class="drag-handle cursor-ns-resize outline-none"
          role="slider"
          tabindex="0"
          aria-label="Kéo đầu dưới của lò xo"
          aria-valuemin={0}
          aria-valuemax={spring.max}
          aria-valuenow={force}
          aria-valuetext={`Lực kéo ${formatNumber(force, 1)} niutơn, độ dãn ${formatNumber(cm, 1)} xentimét`}
          use:draggable={{
            point: { x: X, y: endY },
            svg: () => board ?? null,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => {
              setForce(forceAt(spring, (p.y - TOP) / PX - NATURAL, peak));
              return p;
            },
            onKeyMove: (dx, dy, big) => setForce(force + (dx + dy) * (big ? 1 : 0.1)),
          }}
        >
          <circle
            class="drag-knob"
            cx={X}
            cy={endY}
            r="9"
            fill={hurt ? DAMAGED : spring.color}
            stroke="#fff"
            stroke-width="2"
          />
        </g>
      </svg>
      <p class="px-2 pb-1 text-sm text-slate-600 tabular-nums">
        Chiều dài l = {formatFixed(lengthCm, 1)} cm, độ dãn = {formatFixed(cm, 1)} cm.
      </p>
    </div>

    <div class="{card} p-2">
      <XyPlot
        lines={plotLines}
        marks={[{ x: cm, y: force, color: hurt ? DAMAGED : spring.color }]}
        {guides}
        xMax={X_MAX}
        yMax={Y_MAX}
        xTicks={ticksUpTo(X_MAX)}
        yTicks={ticksUpTo(Y_MAX)}
        xLabel="|Δl| (cm)"
        yLabel="F (N)"
        label={`Đồ thị lực theo độ dãn của ${spring.name}: lực ${formatNumber(force, 1)} niutơn, độ dãn ${formatNumber(cm, 1)} xentimét.`}
      />
      <p class="px-2 pt-1 pb-1 text-sm text-slate-600">
        Thử đủ ba lò xo: đồ thị của các lò xo đã kéo vẫn được giữ lại, đường nào dốc hơn thì lò xo
        đó cứng hơn.
      </p>
    </div>
  </div>

  <SliderField
    label="Lực kéo F"
    bind:value={force}
    min={0}
    max={spring.max}
    step={0.1}
    unit="N"
    format={(v) => formatFixed(v, 1)}
    oninput={setForce}
  />

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={() => setForce(0)}>Thả tay</button>
    <button type="button" class={button.quiet} onclick={newSpring}>Thay lò xo mới</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
