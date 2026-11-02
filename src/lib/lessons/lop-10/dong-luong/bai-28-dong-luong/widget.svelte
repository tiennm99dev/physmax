<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { BREAK_FORCE, EGG_MASS, SURFACES, catchEgg, fallProgress } from './engine.js';

  const W = 360;
  const SCENE_H = 170;
  const FLOOR = 148;
  const EGG_X = 90;
  const CHART_H = 210;
  const LEFT = 40;
  const RIGHT = 12;
  const TOP = 24;
  const BOTTOM = 32;
  const T_MAX = 50;
  const F_MAX = 100;
  const T_TICKS = [0, 10, 20, 30, 40, 50];
  const F_TICKS = [0, 25, 50, 75, 100];

  const px = linear(0, T_MAX, LEFT, W - RIGHT);
  const py = linear(0, F_MAX, CHART_H - BOTTOM, TOP);
  const metres = linear(0, 2, FLOOR, 18);

  let height = $state(1.2);
  let ms = $state(4);
  let elapsed = $state(0);
  let phase = $state(/** @type {'ready' | 'falling' | 'landed'} */ ('ready'));
  let trials = $state(
    /** @type {Array<{ ms: number, force: number, broken: boolean, color: string }>} */ ([]),
  );

  const surface = $derived(SURFACES.find((s) => s.value === ms) ?? SURFACES[0]);
  const result = $derived(catchEgg(height, ms));
  const eggY = $derived(
    phase === 'ready'
      ? metres.map(height)
      : metres.map(height) + (FLOOR - 18 - metres.map(height)) * fallProgress(height, elapsed),
  );
  const showBroken = $derived(phase === 'landed' && result.broken);

  function reset() {
    phase = 'ready';
    elapsed = 0;
  }

  function newHeight() {
    reset();
    trials = [];
  }

  function land() {
    phase = 'landed';
    trials = [
      ...trials.filter((t) => t.ms !== ms),
      { ms, force: result.force, broken: result.broken, color: surface.color },
    ];
  }

  function drop() {
    elapsed = 0;
    if (reducedMotion()) {
      elapsed = 10;
      land();
      return;
    }
    phase = 'falling';
  }

  $effect(() => {
    if (phase !== 'falling') return;
    const stop = frameLoop((dt) => {
      elapsed += dt;
      if (fallProgress(height, elapsed) >= 1) {
        stop();
        land();
      }
    });
    return stop;
  });

  const note = $derived.by(() => {
    if (phase !== 'landed') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Trứng $${numTex(EGG_MASS * 1000)}$ g rơi từ độ cao $${numTex(height, 1)}$ m đến sát mặt đỡ với tốc độ $${numTex(result.speed, 2)}$ m/s. Chọn mặt đỡ rồi thả trứng.`,
      };
    }
    const working = `Trứng dừng lại nên độ biến thiên động lượng có độ lớn $\\Delta p = mv = ${numTex(result.momentum, 3)}$ kg.m/s, dù đỡ bằng gì. Lực trung bình $F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{${numTex(result.momentum, 3)}}{${numTex(ms / 1000, 3)}} \\approx ${numTex(result.force, 1)}$ N.`;
    return result.broken
      ? {
          tone: /** @type {const} */ ('warn'),
          text: `${working} Lực vượt ngưỡng $${BREAK_FORCE}$ N nên trứng vỡ. Hãy kéo dài thời gian dừng.`,
        }
      : {
          tone: /** @type {const} */ ('ok'),
          text: `${working} Lực nhỏ hơn ngưỡng $${BREAK_FORCE}$ N nên trứng không vỡ: thời gian dừng dài làm lực giảm.`,
        };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {SCENE_H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Quả trứng rơi từ độ cao ${formatNumber(height, 1)} mét xuống ${surface.label.toLowerCase()}.${phase === 'landed' ? (result.broken ? ' Trứng vỡ.' : ' Trứng không vỡ.') : ''}`}
    >
      <rect x="0" y={FLOOR} width={W} height={SCENE_H - FLOOR} fill="#e2e8f0" />
      <rect x={EGG_X - 44} y={FLOOR - 6} width="88" height="6" rx="3" fill={surface.color} />
      <text x={EGG_X + 54} y={FLOOR - 1} font-size="12" font-weight="600" fill={surface.color}
        >{surface.label}</text
      >
      <line
        x1={EGG_X - 60}
        x2={EGG_X + 60}
        y1={metres.map(height)}
        y2={metres.map(height)}
        stroke="#94a3b8"
        stroke-dasharray="4 3"
      />
      <text x={EGG_X + 66} y={metres.map(height) + 4} font-size="12" fill="#475569"
        >{`h = ${formatFixed(height, 1)} m`}</text
      >
      {#if showBroken}
        <ellipse cx={EGG_X} cy={FLOOR - 9} rx="22" ry="4" fill="#facc15" />
        <path
          d="M {EGG_X - 20} {FLOOR - 10} l 7 -8 l 4 6 l 5 -7 l 4 8 Z M {EGG_X + 6} {FLOOR -
            10} l 6 -7 l 3 5 l 6 -5 l 2 7 Z"
          fill="#fef3c7"
          stroke="#92400e"
        />
      {:else}
        <ellipse
          cx={EGG_X}
          cy={phase === 'landed' ? FLOOR - 18 : eggY}
          rx="10"
          ry="12"
          fill="#fef3c7"
          stroke="#92400e"
          stroke-width="1.5"
        />
      {/if}
    </svg>
  </div>

  <SegmentedControl
    label="Mặt đỡ quả trứng"
    options={SURFACES.map((s) => ({ value: s.value, label: `${s.label} (${s.value} ms)` }))}
    bind:value={ms}
    onchange={reset}
  />
  <SliderField
    label="Độ cao thả h"
    bind:value={height}
    min={0.5}
    max={2}
    step={0.1}
    unit="m"
    format={(v) => formatFixed(v, 1)}
    oninput={newHeight}
  />
  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={drop} disabled={phase === 'falling'}>
      {phase === 'landed' ? 'Thả lại' : 'Thả trứng'}
    </button>
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {CHART_H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={trials.length === 0
        ? 'Đồ thị lực trung bình theo thời gian, chưa có lần thả nào.'
        : `Đồ thị lực trung bình theo thời gian. ${trials
            .map((t) => `Dừng trong ${t.ms} mili giây: lực ${formatNumber(t.force, 1)} niutơn.`)
            .join(' ')}`}
    >
      {#each F_TICKS as tick (tick)}
        <line x1={LEFT} x2={W - RIGHT} y1={py.map(tick)} y2={py.map(tick)} stroke="#e2e8f0" />
        <text x={LEFT - 5} y={py.map(tick) + 4} font-size="11" fill="#475569" text-anchor="end"
          >{tick}</text
        >
      {/each}
      {#each T_TICKS as tick (tick)}
        <text
          x={px.map(tick)}
          y={CHART_H - BOTTOM + 14}
          font-size="11"
          fill="#475569"
          text-anchor="middle">{tick}</text
        >
      {/each}
      {#each trials as t (t.ms)}
        <rect
          x={px.map(0)}
          y={py.map(Math.min(t.force, F_MAX))}
          width={px.map(t.ms) - px.map(0)}
          height={py.map(0) - py.map(Math.min(t.force, F_MAX))}
          fill={t.color}
          fill-opacity="0.25"
          stroke={t.color}
          stroke-width="2"
        />
      {/each}
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={py.map(BREAK_FORCE)}
        y2={py.map(BREAK_FORCE)}
        stroke="#be123c"
        stroke-dasharray="6 4"
      />
      <text
        x={W - RIGHT}
        y={py.map(BREAK_FORCE) - 4}
        font-size="11"
        font-weight="600"
        fill="#be123c"
        text-anchor="end">Ngưỡng vỡ {BREAK_FORCE} N</text
      >
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={py.map(0)} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={py.map(0)}
        y2={py.map(0)}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text x="4" y="12" font-size="11" font-weight="600" fill="#334155">F (N)</text>
      <text
        x={W - RIGHT}
        y={CHART_H - 3}
        font-size="11"
        font-weight="600"
        fill="#334155"
        text-anchor="end">Δt (ms)</text
      >
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Mỗi hình chữ nhật là một lần đỡ: rộng bằng thời gian dừng, cao bằng lực trung bình. Thả từ
      cùng độ cao, các hình có diện tích bằng nhau vì F·Δt đều bằng Δp.
    </p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
