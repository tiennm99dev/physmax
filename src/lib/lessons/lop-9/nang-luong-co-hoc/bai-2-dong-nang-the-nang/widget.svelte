<script>
  import { onDestroy } from 'svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { potential, weight } from '../_shared/energy.js';
  import { dropAt, fallTime } from './engine.js';

  const W = 360;
  const H = 300;
  const GROUND = 272;
  const PX_PER_M = 12;
  const BALL_X = 190;
  /** Largest energy the sliders allow (5 kg at 20 m), the full width of a bar. */
  const MAX_ENERGY = potential(5, 20);

  let m = $state(2);
  let h0 = $state(10);
  let t = $state(0);
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const s = $derived(dropAt(m, h0, t));
  const tf = $derived(fallTime(h0));
  const ballY = $derived(GROUND - s.h * PX_PER_M);
  const radius = $derived(6 + 2 * m);

  function halt() {
    stop?.();
    stop = null;
    running = false;
  }
  onDestroy(halt);

  function release() {
    halt();
    if (s.landed) t = 0;
    if (reducedMotion()) {
      t = tf;
      return;
    }
    running = true;
    stop = frameLoop((dt) => {
      t = Math.min(tf, t + dt);
      if (t >= tf) halt();
    });
  }
  function reset() {
    halt();
    t = 0;
  }
  function stepOnce() {
    halt();
    t = Math.min(tf, t + 0.1);
  }
  function setStart() {
    halt();
    t = 0;
  }

  const J = (/** @type {number} */ v) => `${formatNumber(v, 1)} J`;
  const width = (/** @type {number} */ v) => `${Math.min(100, (v / MAX_ENERGY) * 100)}%`;

  // Changes only at the three phases, so screen readers are not flooded while
  // the body falls; the numbers stay readable in the table.
  const phase = $derived(t === 0 ? 'top' : s.landed ? 'ground' : 'falling');
  const feedback = $derived.by(() => {
    const P = numTex(weight(m), 1);
    if (phase === 'top') {
      return `Vật đứng yên ở độ cao ${formatNumber(h0, 1)} m: động năng bằng 0, thế năng $W_\\text{t} = P \\cdot h = ${P} \\cdot ${numTex(h0, 1)}$ = ${J(potential(m, h0))}. Tăng khối lượng hoặc độ cao thì thế năng tăng.`;
    }
    if (phase === 'ground') {
      return `Vật chạm đất (mốc thế năng): thế năng bằng 0, tốc độ lớn nhất ${formatNumber(s.v, 1)} m/s nên động năng lớn nhất, ${J(s.wd)}.`;
    }
    return 'Vật đang rơi: độ cao giảm nên thế năng giảm, tốc độ tăng nên động năng tăng.';
  });

  const rows = $derived([
    { key: 'wt', label: 'Thế năng $W_\\text{t}$', value: s.wt, color: 'bg-sky-500' },
    { key: 'wd', label: 'Động năng $W_\\text{đ}$', value: s.wd, color: 'bg-rose-500' },
  ]);
  const ticks = [0, 5, 10, 15, 20];
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Khối lượng m"
      bind:value={m}
      min={0.5}
      max={5}
      step={0.5}
      unit="kg"
      format={(v) => formatNumber(v, 1)}
      oninput={setStart}
    />
    <SliderField
      label="Độ cao ban đầu h"
      bind:value={h0}
      min={1}
      max={20}
      step={1}
      unit="m"
      oninput={setStart}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-sm select-none"
      role="img"
      aria-label="Vật {formatNumber(m, 1)} kg ở độ cao {formatFixed(s.h, 1)} m, tốc độ {formatFixed(
        s.v,
        1,
      )} m/s. Thế năng {J(s.wt)}, động năng {J(s.wd)}."
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#bbf7d0" />
      <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#16a34a" stroke-width="2" />
      <text x={W - 4} y={GROUND + 18} text-anchor="end" class="fill-green-800 text-[11px]"
        >mặt đất: mốc thế năng</text
      >
      <line x1="60" y1={GROUND} x2="60" y2={GROUND - 20 * PX_PER_M} stroke="#64748b" />
      {#each ticks as k (k)}
        <line
          x1="54"
          y1={GROUND - k * PX_PER_M}
          x2="66"
          y2={GROUND - k * PX_PER_M}
          stroke="#64748b"
        />
        <text
          x="48"
          y={GROUND - k * PX_PER_M + 4}
          text-anchor="end"
          class="fill-slate-600 text-[11px]">{k} m</text
        >
      {/each}
      <line
        x1="66"
        y1={GROUND - h0 * PX_PER_M}
        x2={BALL_X + 40}
        y2={GROUND - h0 * PX_PER_M}
        stroke="#94a3b8"
        stroke-dasharray="4 4"
      />
      <line
        x1={BALL_X + 50}
        y1={ballY}
        x2={BALL_X + 50}
        y2={GROUND}
        stroke="#0284c7"
        stroke-width="2"
      />
      <text
        x={BALL_X + 56}
        y={(ballY + GROUND) / 2 + 4}
        class="fill-sky-700 text-[12px] font-semibold">h = {formatFixed(s.h, 1)} m</text
      >
      <circle
        cx={BALL_X}
        cy={ballY - radius}
        r={radius}
        fill="#6366f1"
        stroke="#312e81"
        stroke-width="2"
      />
      {#if s.v > 0.05}
        <line
          x1={BALL_X - radius - 10}
          y1={ballY - radius}
          x2={BALL_X - radius - 10}
          y2={ballY - radius + 4 + s.v * 2.5}
          stroke="#e11d48"
          stroke-width="3"
          marker-end="url(#v-head)"
        />
      {/if}
      <defs>
        <marker
          id="v-head"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#e11d48" />
        </marker>
      </defs>
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Mũi tên đỏ dài theo tốc độ của vật. Bỏ qua sức cản của không khí.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={release}
      >{s.landed ? 'Thả lại' : 'Thả vật'}</button
    >
    <button type="button" class={button.secondary} onclick={stepOnce} disabled={s.landed}
      >Tiến 0,1 s</button
    >
    <button type="button" class={button.quiet} onclick={reset} disabled={t === 0 && !running}
      >Đưa lên lại</button
    >
  </div>

  <div class="{card} space-y-3 p-3">
    <div class="grid grid-cols-3 gap-2 text-center text-sm tabular-nums">
      <div>
        <div class="text-slate-500">Thời gian</div>
        <div class="font-semibold">{formatFixed(s.t, 2)} s</div>
      </div>
      <div>
        <div class="text-slate-500">Độ cao</div>
        <div class="font-semibold">{formatFixed(s.h, 2)} m</div>
      </div>
      <div>
        <div class="text-slate-500">Tốc độ</div>
        <div class="font-semibold">{formatFixed(s.v, 2)} m/s</div>
      </div>
    </div>
    {#each rows as row (row.key)}
      <div>
        <div class="mb-1 flex justify-between text-sm">
          <span class="text-slate-700"><LiveRichText text={row.label} /></span>
          <span class="font-semibold tabular-nums">{J(row.value)}</span>
        </div>
        <div class="h-4 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
          <div class="{row.color} h-full" style="width: {width(row.value)}"></div>
        </div>
      </div>
    {/each}
  </div>

  <FeedbackNote tone="info" text={feedback} />
</div>
