<script>
  import { rng, pick } from '#lib/core/drill.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import OscGraph from '../_shared/osc-graph.svelte';
  import SpringMass from '../_shared/spring-mass.svelte';
  import {
    DRAGS,
    F_MAX,
    F_MIN,
    F_STEP,
    NATURAL,
    dampedAt,
    drivenAmplitude,
    drivenAt,
    envelope,
    isResonance,
    lossPerPeriod,
    resonanceCurve,
  } from './engine.js';

  const A0 = 5;
  const F0_FREE = 1;
  const T_FREE = 8;
  const DRIVEN_DRAGS = DRAGS.filter((d) => d.beta > 0);
  const DRAG_COLORS = ['#4f46e5', '#0f766e', '#ea580c'];
  const MODES = [
    { value: 'free', label: 'Tắt dần' },
    { value: 'driven', label: 'Cưỡng bức' },
  ];

  let mode = $state('free');
  let t = $state(0);
  let running = $state(false);

  // Free, damped motion.
  let freeDrag = $state(1);
  const freeBeta = $derived(DRAGS[freeDrag].beta);
  const freeX = $derived(dampedAt(A0, F0_FREE, freeBeta, Math.min(t, T_FREE)));
  const loss = $derived(lossPerPeriod(F0_FREE, freeBeta));

  // Driven motion with a hidden natural frequency.
  let round = $state(1);
  let drivenDrag = $state(1);
  let f = $state(0.5);
  let showCurve = $state(false);
  /** @type {Array<{ drag: number, f: number }>} */
  let visited = $state([{ drag: 1, f: 0.5 }]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let verdict = $state({
    tone: 'info',
    text: 'Đổi tần số $f$ của ngoại lực và theo dõi biên độ. Khi tìm được tần số làm biên độ lớn nhất, bấm Chốt.',
  });
  let found = $state(0);

  const f0 = $derived(pick(rng(round * 4231), NATURAL));
  const drivenBeta = $derived(DRAGS[drivenDrag].beta);
  const amp = $derived(drivenAmplitude(f, f0, drivenBeta));
  const drivenX = $derived(drivenAt(f, f0, drivenBeta, t));

  const marks = $derived([
    ...visited
      .filter((p) => p.drag === drivenDrag)
      .map((p) => ({ x: p.f, y: drivenAmplitude(p.f, f0, drivenBeta), color: '#94a3b8' })),
    { x: f, y: amp, color: '#e11d48' },
  ]);
  const lines = $derived(
    showCurve
      ? DRIVEN_DRAGS.map((d, i) => ({
          points: resonanceCurve(f0, d.beta),
          color: DRAG_COLORS[i],
        }))
      : [],
  );

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t += dt;
      if (mode === 'free' && t >= T_FREE) {
        t = T_FREE;
        running = false;
      }
    });
  });

  function play() {
    if (reducedMotion()) {
      running = false;
      t = mode === 'free' ? Math.min(T_FREE, t + 0.25) : t + 1 / (8 * f);
      return;
    }
    if (mode === 'free' && t >= T_FREE) t = 0;
    running = !running;
  }

  function restart() {
    running = false;
    t = 0;
  }

  /** @param {number} value */
  function setFrequency(value) {
    f = value;
    if (!visited.some((p) => p.drag === drivenDrag && Math.abs(p.f - value) < 1e-9)) {
      visited = [...visited, { drag: drivenDrag, f: value }];
    }
  }

  function lockIn() {
    if (isResonance(f, f0)) {
      found += 1;
      verdict = {
        tone: 'ok',
        text: `Cộng hưởng! Tần số riêng của hệ là $f_0 = ${numTex(f0, 2)}$ Hz. Khi $f = f_0$, biên độ dao động cưỡng bức đạt cực đại $A \\approx ${numTex(amp, 1)}$ cm.`,
      };
      showCurve = true;
      return;
    }
    const best = visited
      .filter((p) => p.drag === drivenDrag)
      .reduce((a, b) =>
        drivenAmplitude(b.f, f0, drivenBeta) > drivenAmplitude(a.f, f0, drivenBeta) ? b : a,
      );
    verdict = {
      tone: 'warn',
      text:
        best.f !== f && drivenAmplitude(best.f, f0, drivenBeta) > amp
          ? `Chưa phải: ở $f = ${numTex(best.f, 2)}$ Hz em đã đo được biên độ lớn hơn. Dò tiếp quanh đó.`
          : `Chưa phải: biên độ còn tăng được nữa. Thử ${f < f0 ? 'tăng' : 'giảm'} $f$ từng bước nhỏ.`,
    };
  }

  function nextSystem() {
    round += 1;
    showCurve = false;
    visited = [{ drag: drivenDrag, f }];
    verdict = {
      tone: 'info',
      text: 'Hệ dao động mới, tần số riêng khác. Dò tần số ngoại lực để tìm đỉnh cộng hưởng.',
    };
  }

  const freeNote = $derived(
    freeBeta === 0
      ? 'Không có lực cản: cơ năng được bảo toàn, biên độ giữ nguyên, vật dao động điều hoà mãi.'
      : `Lực cản làm biên độ giảm dần. Sau mỗi chu kì biên độ chỉ còn $${numTex(loss.amplitude * 100, 0)}\\%$, cơ năng còn $${numTex(loss.energy * 100, 0)}\\%$: mỗi chu kì mất $${numTex(loss.lost * 100, 0)}\\%$ cơ năng, biến thành nhiệt. Lực cản càng lớn, dao động tắt càng nhanh.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Loại dao động"
    options={MODES}
    bind:value={mode}
    onchange={() => restart()}
  />

  {#if mode === 'free'}
    <div class="{card} space-y-2 p-2">
      <SpringMass
        x={freeX}
        range={6}
        marks={[-A0, A0]}
        label={`Con lắc lò xo dao động tắt dần, li độ ${formatNumber(freeX, 1)} xentimét.`}
      />
      <OscGraph
        curves={[
          { f: (s) => envelope(A0, freeBeta, s), color: '#94a3b8', dashed: true },
          { f: (s) => -envelope(A0, freeBeta, s), color: '#94a3b8', dashed: true },
          { f: (s) => dampedAt(A0, F0_FREE, freeBeta, s), color: '#4f46e5', until: t },
        ]}
        tMax={T_FREE}
        yMax={6}
        tStep={1}
        yStep={2}
        yLabel="x (cm)"
        cursor={t > 0 ? Math.min(t, T_FREE) : null}
        label={`Đồ thị li độ theo thời gian của dao động tắt dần. Đường nét đứt là biên độ, giảm từ 5 xentimét xuống ${formatNumber(envelope(A0, freeBeta, T_FREE), 1)} xentimét sau 8 giây.`}
      />
      <p class="px-2 text-sm text-slate-600">
        Tần số riêng 1 Hz, thả vật từ li độ 5 cm. Đường nét đứt nối các đỉnh: đó là biên độ tại từng
        thời điểm.
      </p>
    </div>
    <SegmentedControl
      label="Lực cản của môi trường"
      options={DRAGS.map((d) => ({ value: d.value, label: d.label }))}
      bind:value={freeDrag}
      onchange={() => restart()}
    />
    <div class="flex flex-wrap gap-3">
      <button type="button" class={button.primary} onclick={play}>
        {running ? 'Dừng' : 'Thả vật'}
      </button>
      <button type="button" class={button.secondary} onclick={restart}>Làm lại</button>
    </div>
    <div aria-live="polite">
      <FeedbackNote tone="info" text={freeNote} />
    </div>
  {:else}
    <div class="{card} space-y-2 p-2">
      <SpringMass
        x={drivenX}
        range={8}
        label={`Con lắc lò xo chịu ngoại lực tuần hoàn tần số ${formatNumber(f, 2)} héc, biên độ ${formatNumber(amp, 1)} xentimét.`}
      />
      <XyPlot
        {lines}
        {marks}
        xMax={F_MAX}
        yMax={7}
        xTicks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}
        yTicks={[0, 2, 4, 6]}
        xLabel="f (Hz)"
        yLabel="A (cm)"
        label={`Biên độ dao động cưỡng bức theo tần số ngoại lực. Đã đo ${marks.length} điểm; hiện tại f bằng ${formatNumber(f, 2)} héc, A bằng ${formatNumber(amp, 1)} xentimét.`}
      />
      <p class="px-2 text-sm text-slate-600">
        Chấm đỏ: tần số đang chọn; chấm xám: các tần số đã thử với cùng lực cản.{showCurve
          ? ' Đường cong: tím lực cản nhỏ, xanh lục vừa, cam lớn.'
          : ''}
      </p>
    </div>

    <SliderField
      label="Tần số ngoại lực f"
      bind:value={f}
      min={F_MIN}
      max={F_MAX}
      step={F_STEP}
      unit="Hz"
      format={(v) => formatFixed(v, 2)}
      oninput={setFrequency}
    />
    <SegmentedControl
      label="Lực cản của môi trường"
      options={DRIVEN_DRAGS.map((d) => ({ value: d.value, label: d.label }))}
      bind:value={drivenDrag}
      onchange={() => setFrequency(f)}
    />
    <p class="text-sm text-slate-700" aria-live="polite">
      Vật dao động với tần số {formatFixed(f, 2)} Hz, bằng tần số ngoại lực; biên độ A ≈ {formatNumber(
        amp,
        1,
      )} cm.
    </p>

    <div class="flex flex-wrap gap-3">
      <button type="button" class={button.primary} onclick={lockIn}>Chốt: f = f₀</button>
      <button type="button" class={button.secondary} onclick={play}>
        {running ? 'Dừng' : 'Chạy'}
      </button>
      <button type="button" class={button.secondary} onclick={() => (showCurve = !showCurve)}>
        {showCurve ? 'Ẩn đường cộng hưởng' : 'Hiện đường cộng hưởng'}
      </button>
      <button type="button" class={button.quiet} onclick={nextSystem}>Hệ khác</button>
    </div>
    <div aria-live="polite">
      <FeedbackNote tone={verdict.tone} text={verdict.text} />
    </div>
    <p class="text-sm text-slate-600">Đã tìm đúng tần số riêng của {found} hệ.</p>
  {/if}
</div>
