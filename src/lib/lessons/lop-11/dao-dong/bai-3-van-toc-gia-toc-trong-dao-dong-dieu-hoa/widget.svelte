<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import OscGraph from '../_shared/osc-graph.svelte';
  import SpringMass from '../_shared/spring-mass.svelte';
  import { TAU, piText, stateAt } from '../_shared/oscillation.js';
  import { GOALS, axisFor, extremes, motionKind, reached } from './engine.js';

  const PERIODS = [
    { value: '2', label: 'T = 2 s' },
    { value: '1', label: 'T = 1 s' },
  ];
  const X_COLOR = '#4f46e5';
  const V_COLOR = '#0f766e';
  const A_COLOR = '#be123c';
  /** Pixels of arrow at the largest speed or acceleration. */
  const ARROW = 44;

  let A = $state(5);
  let periodKey = $state('2');
  let t = $state(0);
  let running = $state(false);
  let goalAt = $state(0);

  const T = $derived(Number(periodKey));
  const omega = $derived(TAU / T);
  const tMax = $derived(2 * T);
  const now = $derived(stateAt(A, omega, 0, t));
  const ext = $derived(extremes(A, omega));
  const vAxis = $derived(axisFor(ext.vMax));
  const aAxis = $derived(axisFor(ext.aMax));
  const kind = $derived(motionKind(now.x, now.v, A));
  const goal = $derived(GOALS[goalAt]);
  const met = $derived(!running && reached(goal, now.phase));
  const graphs = $derived([
    {
      name: 'x',
      unit: 'cm',
      color: X_COLOR,
      axis: { yMax: 10, yStep: 5 },
      key: /** @type {const} */ ('x'),
    },
    { name: 'v', unit: 'cm/s', color: V_COLOR, axis: vAxis, key: /** @type {const} */ ('v') },
    { name: 'a', unit: 'cm/s²', color: A_COLOR, axis: aAxis, key: /** @type {const} */ ('a') },
  ]);

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t = (t + dt) % tMax;
    });
  });

  /** @param {number} v */
  function pick(v) {
    running = false;
    t = v;
  }

  function play() {
    if (reducedMotion()) {
      t = (t + T / 8) % tMax;
      return;
    }
    running = !running;
  }

  const kindText = $derived(
    {
      bien: 'Vật ở vị trí biên: $v = 0$, gia tốc có độ lớn cực đại và hướng về vị trí cân bằng.',
      'can-bang': 'Vật qua vị trí cân bằng: tốc độ cực đại $|v| = \\omega A$, gia tốc bằng $0$.',
      'nhanh-dan':
        'Vật đang đi về vị trí cân bằng: $\\vec{v}$ và $\\vec{a}$ cùng chiều, vật chuyển động nhanh dần.',
      'cham-dan':
        'Vật đang đi ra biên: $\\vec{v}$ và $\\vec{a}$ ngược chiều, vật chuyển động chậm dần.',
    }[kind],
  );

  const readout = $derived(
    `t = ${formatFixed(t, 2)} s: x = ${formatFixed(now.x, 1)} cm, v = ${formatFixed(now.v, 1)} cm/s, a = ${formatFixed(now.a, 0)} cm/s²`,
  );
  const valueText = $derived(readout.replace('cm/s²', 'xentimét trên giây bình phương'));
</script>

<div class="space-y-4">
  <div class="{card} space-y-1 p-2">
    <SpringMass
      x={now.x}
      range={9}
      marks={[-A, A]}
      label={`Vật ở li độ ${formatNumber(now.x, 1)} xentimét. Mũi tên xanh lục là vận tốc, mũi tên đỏ là gia tốc.`}
    >
      {#snippet children({ map, y })}
        <ForceArrow
          x1={map(now.x)}
          y1={y - 26}
          x2={map(now.x) + (now.v / ext.vMax) * ARROW}
          y2={y - 26}
          color={V_COLOR}
          label="v"
        />
        <ForceArrow
          x1={map(now.x)}
          y1={y + 26}
          x2={map(now.x) + (now.a / ext.aMax) * ARROW}
          y2={y + 26}
          color={A_COLOR}
          label="a"
        />
      {/snippet}
    </SpringMass>
    {#each graphs as g (g.name)}
      <OscGraph
        curves={[{ f: (s) => stateAt(A, omega, 0, s)[g.key], color: g.color }]}
        {tMax}
        yMax={g.axis.yMax}
        tStep={T / 2}
        yStep={g.axis.yStep}
        yLabel={`${g.name} (${g.unit})`}
        cursor={t}
        onpick={pick}
        keyStep={T / 40}
        {valueText}
        height={120}
        label={`Đồ thị ${g.name} theo thời gian. Bấm, kéo hoặc dùng phím mũi tên để chọn thời điểm.`}
      />
    {/each}
    <p class="px-2 text-sm tabular-nums text-slate-700">{readout}</p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={play}>
      {running ? 'Dừng' : 'Chạy'}
    </button>
    <button type="button" class={button.quiet} onclick={() => pick(0)}>Về t = 0</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Biên độ A" bind:value={A} min={2} max={8} step={1} unit="cm" />
    <SegmentedControl
      label="Chu kì"
      options={PERIODS}
      bind:value={periodKey}
      onchange={() => pick(0)}
    />
  </div>

  <p class="text-sm text-slate-600">
    x = {A}cos({piText(omega)}t) cm: v<sub>max</sub> = ωA = {formatNumber(ext.vMax, 1)} cm/s, a<sub
      >max</sub
    >
    = ω²A = {formatNumber(ext.aMax, 0)} cm/s².
  </p>

  {#if !running}
    <FeedbackNote tone="info" text={kindText} />
  {/if}
  <FeedbackNote
    tone={met ? 'ok' : 'info'}
    text={met
      ? `Đúng rồi: tại $t = ${numTex(t, 2)}$ s thì ${goal.text}. Để ý vị trí của điểm này trên cả ba đồ thị.`
      : `Thử thách: dừng hình hoặc chọn trên đồ thị một thời điểm mà ${goal.text}.`}
  />
  <button
    type="button"
    class={button.secondary}
    onclick={() => (goalAt = (goalAt + 1) % GOALS.length)}
  >
    Thử thách khác
  </button>
</div>
