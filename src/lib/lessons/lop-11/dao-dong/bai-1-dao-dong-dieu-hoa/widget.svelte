<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import OscGraph from '../_shared/osc-graph.svelte';
  import SpringMass from '../_shared/spring-mass.svelte';
  import {
    MODES,
    fullOscillations,
    isHarmonic,
    isPeriodic,
    pathLength,
    positionAt,
  } from './engine.js';

  /** Seconds of motion the graph holds. */
  const T_MAX = 4;

  /** @type {import('./engine.js').Mode} */
  let mode = $state('dieu-hoa');
  let A = $state(5);
  let T = $state(1);
  let t = $state(0);
  let running = $state(false);

  const x = $derived(positionAt(mode, A, T, t));
  const periodic = $derived(isPeriodic(mode));
  const count = $derived(fullOscillations(t, T));
  const done = $derived(t >= T_MAX - 1e-9);

  function restart() {
    running = false;
    t = 0;
  }

  /** @param {number} dt */
  function advance(dt) {
    t = Math.min(T_MAX, t + dt);
    if (t >= T_MAX) running = false;
  }

  function play() {
    if (done) t = 0;
    if (reducedMotion()) {
      advance(T / 4);
      return;
    }
    running = !running;
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => advance(dt));
  });

  const modeText = $derived(
    {
      'dieu-hoa': `Dao động điều hoà: đồ thị li độ theo thời gian là đường hình sin. Sau mỗi chu kì $T = ${numTex(T, 2)}$ s vật trở lại vị trí cũ theo hướng cũ; li độ luôn nằm trong đoạn từ $-${numTex(A)}$ cm đến $${numTex(A)}$ cm.`,
      'tuan-hoan': `Dao động tuần hoàn nhưng không điều hoà: vật chạy đều qua lại, sau mỗi $${numTex(T, 2)}$ s trạng thái lặp lại như cũ, nhưng đồ thị là đường gấp khúc, không phải đường hình sin.`,
      'tat-dan':
        'Vẫn là dao động cơ (vật chuyển động qua lại quanh vị trí cân bằng O), nhưng không tuần hoàn: mỗi lần quay lại, vật không ra xa được như lần trước, nên trạng thái không lặp lại.',
    }[mode],
  );

  const status = $derived(
    periodic
      ? `t = ${formatFixed(t, 2)} s: li độ x = ${formatFixed(x, 1)} cm, đã thực hiện ${count} dao động toàn phần, đi được ${formatFixed(pathLength(mode, A, T, t), 1)} cm.`
      : `t = ${formatFixed(t, 2)} s: li độ x = ${formatFixed(x, 1)} cm.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Kiểu chuyển động của vật"
    options={MODES}
    bind:value={mode}
    onchange={restart}
  />

  <div class="{card} space-y-2 p-2">
    <SpringMass
      {x}
      range={9}
      marks={mode === 'tat-dan' ? [] : [-A, A]}
      label={`Con lắc lò xo nằm ngang, vị trí cân bằng O. Vật đang ở li độ ${formatNumber(x, 1)} xentimét.`}
    />
    <OscGraph
      curves={[{ f: (s) => positionAt(mode, A, T, s), color: '#4f46e5', until: t }]}
      tMax={T_MAX}
      yMax={9}
      tStep={0.5}
      yStep={3}
      yLabel="x (cm)"
      cursor={t}
      label={`Đồ thị li độ theo thời gian vẽ đến t = ${formatNumber(t, 2)} giây.`}
    />
    <p class="px-2 text-sm text-slate-600">
      Vạch đứt nét là hai vị trí biên; chấm đỏ trên trục là li độ của vật, đường xanh là đồ thị li
      độ theo thời gian.
    </p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={play}>
      {running ? 'Dừng' : done ? 'Chạy lại' : 'Thả vật'}
    </button>
    <button
      type="button"
      class={button.secondary}
      onclick={() => advance(0.1)}
      disabled={running || done}
    >
      Thêm 0,1 s
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Về lúc đầu</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Kéo vật ra rồi thả (A)"
      bind:value={A}
      min={2}
      max={8}
      step={1}
      unit="cm"
      oninput={restart}
    />
    <SliderField
      label="Thời gian lặp lại (T)"
      bind:value={T}
      min={0.5}
      max={2}
      step={0.25}
      unit="s"
      format={(v) => formatFixed(v, 2)}
      oninput={restart}
    />
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold tabular-nums text-slate-700">
    {status}
  </p>
  <FeedbackNote tone={isHarmonic(mode) ? 'ok' : 'warn'} text={modeText} />
</div>
