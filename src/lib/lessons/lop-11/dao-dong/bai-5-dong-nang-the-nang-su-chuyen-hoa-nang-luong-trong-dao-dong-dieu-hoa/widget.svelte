<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import SpringMass from '../_shared/spring-mass.svelte';
  import { sample } from '../_shared/oscillation.js';
  import { GOALS, PULL_MAX, energies, meets, springMotion } from './engine.js';

  const KD = '#0f766e';
  const KT = '#ea580c';
  const KW = '#4f46e5';
  const GW = 360;
  const GH = 170;
  const BAR_W = 230;

  let k = $state(40);
  let m = $state(0.4);
  let x0 = $state(5);
  let t = $state(0);
  let running = $state(false);
  let dragging = $state(false);
  let goalAt = $state(0);

  const motion = $derived(springMotion(k, m));
  const A = $derived(Math.abs(x0));
  const x = $derived(x0 * Math.cos(motion.omega * t));
  const e = $derived(energies(k, A, x));
  const cap = $derived(energies(k, PULL_MAX, 0).W * 1.08);
  const goal = $derived(GOALS[goalAt]);
  const met = $derived(!running && !dragging && meets(goal, x, A));

  const gx = $derived(linear(-PULL_MAX, PULL_MAX, 30, GW - 20));
  const gy = $derived(linear(0, cap, GH - 24, 14));

  /** @param {Array<{ t: number, y: number }>} pts */
  const pathOf = (pts) =>
    pts
      .map((p, i) => `${i ? 'L' : 'M'} ${gx.map(p.t).toFixed(1)} ${gy.map(p.y).toFixed(1)}`)
      .join(' ');
  const potentialAll = $derived(
    pathOf(sample((s) => energies(k, A, s).Wt, -PULL_MAX, PULL_MAX, 80)),
  );
  const potential = $derived(A > 0 ? pathOf(sample((s) => energies(k, A, s).Wt, -A, A, 60)) : '');
  const kinetic = $derived(A > 0 ? pathOf(sample((s) => energies(k, A, s).Wd, -A, A, 60)) : '');

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t += dt;
    });
  });

  /** @param {number} at cm */
  function release(at) {
    running = false;
    x0 = clamp(Math.round(at * 2) / 2, -PULL_MAX, PULL_MAX);
    t = 0;
  }

  function play() {
    if (A === 0) return;
    if (reducedMotion()) {
      t += motion.T / 24;
      return;
    }
    running = !running;
  }

  /** @param {PointerEvent} ev @param {(px: number) => number} invert */
  function drag(ev, invert) {
    const g = /** @type {SVGGElement} */ (ev.currentTarget);
    const svg = g.ownerSVGElement;
    if (!svg) return;
    release(invert(clientToSvg(svg, ev.clientX, ev.clientY, 360, 120).x));
  }

  /** @param {KeyboardEvent} ev */
  function nudge(ev) {
    const step = ev.shiftKey ? 2 : 0.5;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') release(x + step);
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') release(x - step);
    else return;
    ev.preventDefault();
  }

  /** @param {number} v joules */
  const mj = (v) => `${formatFixed(v * 1000, 1)} mJ`;
  const bars = $derived([
    { name: 'Wđ', value: e.Wd, color: KD },
    { name: 'Wt', value: e.Wt, color: KT },
    { name: 'W', value: e.W, color: KW },
  ]);

  const note = $derived.by(() => {
    if (A === 0) return 'Kéo vật lệch khỏi vị trí cân bằng O rồi thả để nó dao động.';
    if (Math.abs(x) >= A - 1e-6)
      return 'Ở vị trí biên vật đứng yên: $W_đ = 0$, thế năng cực đại và bằng cơ năng.';
    if (Math.abs(x) < A * 0.02)
      return 'Qua vị trí cân bằng: $W_t = 0$, động năng cực đại và bằng cơ năng.';
    return 'Giữa biên và vị trí cân bằng: động năng và thế năng chuyển hoá cho nhau, tổng của chúng luôn bằng cơ năng $W = \\frac{1}{2}kA^2$.';
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-2 p-2">
    <SpringMass
      {x}
      range={9}
      interactive
      marks={A > 0 ? [-A, A] : []}
      label={`Con lắc lò xo, vật ở li độ ${formatNumber(x, 1)} xentimét, biên độ ${formatNumber(A, 1)} xentimét.`}
    >
      {#snippet children({ map, invert, y })}
        <g
          role="slider"
          tabindex="0"
          aria-label="Kéo vật ra rồi thả: vị trí thả vật, tính bằng xentimét"
          aria-valuemin={-PULL_MAX}
          aria-valuemax={PULL_MAX}
          aria-valuenow={x}
          aria-valuetext={`${formatNumber(x, 1)} xentimét`}
          class="drag-handle cursor-grab"
          onkeydown={nudge}
          onpointerdown={(ev) => {
            dragging = true;
            /** @type {SVGGElement} */ (ev.currentTarget).setPointerCapture?.(ev.pointerId);
            drag(ev, invert);
          }}
          onpointermove={(ev) => dragging && drag(ev, invert)}
          onpointerup={() => (dragging = false)}
          onpointercancel={() => (dragging = false)}
        >
          <rect
            class="drag-hit"
            x={map(x) - 26}
            y={y - 30}
            width="52"
            height="60"
            fill="transparent"
          />
          <rect
            class="drag-knob"
            x={map(x) - 19}
            y={y - 19}
            width="38"
            height="38"
            rx="6"
            fill="none"
            stroke={dragging ? '#f59e0b' : 'transparent'}
            stroke-width="3"
          />
        </g>
      {/snippet}
    </SpringMass>

    <svg
      viewBox="0 0 {GW} 86"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Động năng ${mj(e.Wd)}, thế năng ${mj(e.Wt)}, cơ năng ${mj(e.W)}.`}
    >
      {#each bars as b, i (b.name)}
        <text x="10" y={20 + i * 26} font-size="12" font-weight="600" fill={b.color}>{b.name}</text>
        <rect x="44" y={8 + i * 26} width={BAR_W} height="16" rx="3" fill="#f1f5f9" />
        <rect
          x="44"
          y={8 + i * 26}
          width={cap > 0 ? (b.value / cap) * BAR_W : 0}
          height="16"
          rx="3"
          fill={b.color}
        />
        <text x={GW - 6} y={20 + i * 26} font-size="11" fill="#334155" text-anchor="end">
          {mj(b.value)}
        </text>
      {/each}
    </svg>

    <svg
      viewBox="0 0 {GW} {GH}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Đồ thị năng lượng theo li độ: thế năng là parabol, động năng là parabol úp, cơ năng là đường nằm ngang. Vật đang ở li độ ${formatNumber(x, 1)} xentimét.`}
    >
      <line
        x1={gx.map(-PULL_MAX)}
        x2={gx.map(PULL_MAX)}
        y1={gy.map(0)}
        y2={gy.map(0)}
        stroke="#475569"
      />
      <line x1={gx.map(0)} x2={gx.map(0)} y1="8" y2={gy.map(0)} stroke="#475569" />
      {#each [-8, -4, 4, 8] as v (v)}
        <text x={gx.map(v)} y={gy.map(0) + 13} font-size="10" fill="#475569" text-anchor="middle">
          {formatNumber(v)}
        </text>
      {/each}
      <text
        x={GW - 6}
        y={gy.map(0) - 4}
        font-size="11"
        font-weight="600"
        fill="#334155"
        text-anchor="end"
      >
        x (cm)
      </text>
      <text x={gx.map(0) + 4} y="14" font-size="11" font-weight="600" fill="#334155">W</text>
      <path d={potentialAll} fill="none" stroke={KT} stroke-opacity="0.3" stroke-dasharray="4 3" />
      <path d={potential} fill="none" stroke={KT} stroke-width="2.5" />
      <path d={kinetic} fill="none" stroke={KD} stroke-width="2.5" />
      {#if A > 0}
        <line
          x1={gx.map(-A)}
          x2={gx.map(A)}
          y1={gy.map(e.W)}
          y2={gy.map(e.W)}
          stroke={KW}
          stroke-width="2.5"
        />
      {/if}
      <line
        x1={gx.map(x)}
        x2={gx.map(x)}
        y1="8"
        y2={gy.map(0)}
        stroke="#f59e0b"
        stroke-width="1.5"
      />
      <circle cx={gx.map(x)} cy={gy.map(e.Wt)} r="4.5" fill={KT} stroke="#fff" />
      <circle cx={gx.map(x)} cy={gy.map(e.Wd)} r="4.5" fill={KD} stroke="#fff" />
    </svg>
    <p class="px-2 text-sm text-slate-600">
      Cam: thế năng Wt, xanh lục: động năng Wđ, tím: cơ năng W. Kéo khối vuông (hoặc dùng phím mũi
      tên khi nó được chọn) để đặt vị trí thả vật.
    </p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={play} disabled={A === 0}>
      {running ? 'Dừng' : 'Thả vật'}
    </button>
    <button
      type="button"
      class={button.secondary}
      onclick={() => (t -= motion.T / 24)}
      disabled={running || A === 0}
    >
      Lùi T/24
    </button>
    <button
      type="button"
      class={button.secondary}
      onclick={() => (t += motion.T / 24)}
      disabled={running || A === 0}
    >
      Tiến T/24
    </button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Độ cứng k"
      bind:value={k}
      min={20}
      max={100}
      step={10}
      unit="N/m"
      oninput={() => (t = 0)}
    />
    <SliderField
      label="Khối lượng m"
      bind:value={m}
      min={0.1}
      max={1}
      step={0.1}
      unit="kg"
      format={(v) => formatFixed(v, 1)}
      oninput={() => (t = 0)}
    />
  </div>
  <p class="text-sm text-slate-600">
    ω = √(k/m) = {formatNumber(motion.omega, 2)} rad/s, T = {formatNumber(motion.T, 2)} s. Cơ năng W =
    ½kA² chỉ phụ thuộc k và A, không phụ thuộc m.
  </p>

  {#if !running}
    <FeedbackNote tone="info" text={note} />
  {/if}
  <FeedbackNote
    tone={met ? 'ok' : 'info'}
    text={met
      ? `Đúng rồi: ở $|x| = ${numTex(Math.abs(x), 2)}$ cm thì ${goal.text}.`
      : `Thử thách: thả vật, bấm Dừng (hoặc dùng Tiến, Lùi T/24) để vật dừng ở vị trí có ${goal.text}.`}
  />
  <button type="button" class={button.quiet} onclick={() => (goalAt = (goalAt + 1) % GOALS.length)}>
    Thử thách khác
  </button>
</div>
