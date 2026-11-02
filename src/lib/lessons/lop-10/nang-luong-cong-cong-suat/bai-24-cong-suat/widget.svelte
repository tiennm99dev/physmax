<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { FLOOR_H, G, HP, REPLAY_SPEED, heightAt, liftWork, powerOf } from './engine.js';

  const W = 360;
  const H = 230;
  const TOP = 36;
  const GROUND = 214;
  const SHAFT_X = 268;
  const STAIR_X = 40;
  const STAIR_W = 150;
  /** The tallest climb the sliders allow, in metres. */
  const MAX_HEIGHT = 30;

  let mass = $state(60);
  let height = $state(15);
  let stairTime = $state(60);
  let liftTime = $state(15);
  let time = $state(0);
  let playing = $state(false);

  const work = $derived(liftWork(mass, height));
  const stairPower = $derived(powerOf(work, stairTime));
  const liftPower = $derived(powerOf(work, liftTime));
  const ratio = $derived(stairTime / liftTime);
  const weight = $derived(mass * G);
  const liftSpeed = $derived(height / liftTime);
  const stairSpeed = $derived(height / stairTime);
  const longest = $derived(Math.max(stairTime, liftTime));
  const pxPerM = (GROUND - TOP) / MAX_HEIGHT;
  const floors = $derived(
    Array.from({ length: height / FLOOR_H + 1 }, (_, i) => GROUND - i * FLOOR_H * pxPerM),
  );
  const stairY = $derived(GROUND - heightAt(height, stairTime, time) * pxPerM);
  const liftY = $derived(GROUND - heightAt(height, liftTime, time) * pxPerM);
  /** The climber walks across the stairs and back on every other floor. */
  const stairX = $derived.by(() => {
    const flight = (GROUND - stairY) / (FLOOR_H * pxPerM);
    const part = flight % 1;
    const across = Math.floor(flight) % 2 === 0 ? part : 1 - part;
    return STAIR_X + across * STAIR_W;
  });
  const finished = $derived(time >= longest);
  const barMax = $derived(Math.max(stairPower, liftPower));
  const bars = $derived([
    {
      name: 'Đi bộ',
      power: stairPower,
      fill: 'bg-amber-500',
      speed: stairSpeed,
    },
    {
      name: 'Thang máy',
      power: liftPower,
      fill: 'bg-indigo-500',
      speed: liftSpeed,
    },
  ]);

  function restart() {
    time = 0;
    playing = false;
  }

  function play() {
    if (reducedMotion()) {
      time = longest;
      return;
    }
    time = 0;
    playing = true;
  }

  $effect(() => {
    if (!playing) return;
    const end = longest;
    const stop = frameLoop((dt) => {
      const next = time + dt * REPLAY_SPEED;
      time = Math.min(next, end);
      if (next >= end) {
        playing = false;
        stop();
      }
    });
    return stop;
  });

  const note = $derived.by(() => {
    if (stairTime === liftTime) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Cùng công, cùng thời gian nên cùng công suất. Hãy đổi một trong hai thời gian.',
      };
    }
    const fast = stairTime > liftTime ? 'Thang máy' : 'Đi bộ';
    const k = Math.max(ratio, 1 / ratio);
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Hai cách đưa người lên cao đều cần công $A = mgh = ${numTex(work, 0)}$ J. ${fast} xong nhanh gấp $${numTex(k, 2)}$ lần nên công suất lớn gấp $${numTex(k, 2)}$ lần: công như nhau, khác nhau ở tốc độ sinh công.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Tòa nhà cao ${formatNumber(height)} mét. Người đi bộ đang ở độ cao ${formatNumber((GROUND - stairY) / pxPerM, 1)} mét, thang máy ở độ cao ${formatNumber((GROUND - liftY) / pxPerM, 1)} mét.`}
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#e2e8f0" />
      {#each floors as y, i (i)}
        <line
          x1={STAIR_X - 14}
          x2={SHAFT_X + 28}
          y1={y}
          y2={y}
          stroke={i === floors.length - 1 ? '#475569' : '#cbd5e1'}
          stroke-width={i === floors.length - 1 ? 2 : 1}
        />
        {#if i < floors.length - 1}
          <line
            x1={i % 2 === 0 ? STAIR_X : STAIR_X + STAIR_W}
            y1={y}
            x2={i % 2 === 0 ? STAIR_X + STAIR_W : STAIR_X}
            y2={floors[i + 1]}
            stroke="#b45309"
            stroke-width="2"
          />
        {/if}
      {/each}
      <rect
        x={SHAFT_X - 18}
        y={GROUND - height * pxPerM}
        width="36"
        height={height * pxPerM}
        fill="#eef2ff"
        stroke="#c7d2fe"
      />
      <rect
        x={SHAFT_X - 15}
        y={liftY - 26}
        width="30"
        height="26"
        rx="2"
        fill="#c7d2fe"
        stroke="#4f46e5"
      />
      <circle cx={SHAFT_X} cy={liftY - 19} r="4" fill="#4f46e5" />
      <rect x={SHAFT_X - 3} y={liftY - 15} width="6" height="14" rx="2" fill="#4f46e5" />
      <circle cx={stairX} cy={stairY - 19} r="4" fill="#b45309" />
      <rect x={stairX - 3} y={stairY - 15} width="6" height="14" rx="2" fill="#b45309" />
      <text x={STAIR_X + STAIR_W / 2} y={H - 3} font-size="11" fill="#334155" text-anchor="middle"
        >Cầu thang bộ</text
      >
      <text x={SHAFT_X} y={H - 3} font-size="11" fill="#334155" text-anchor="middle">Thang máy</text
      >
    </svg>
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <button type="button" class={button.primary} onclick={play} disabled={playing}>
      {finished ? 'Xem lại' : 'Bắt đầu đi lên'}
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Về tầng trệt</button>
    <span class="text-sm tabular-nums text-slate-600"
      >{`t = ${formatNumber(time, 0)} s (tua nhanh ${REPLAY_SPEED} lần)`}</span
    >
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Khối lượng người m"
      bind:value={mass}
      min={40}
      max={80}
      step={5}
      unit="kg"
      oninput={restart}
    />
    <SliderField
      label="Độ cao h"
      bind:value={height}
      min={FLOOR_H}
      max={MAX_HEIGHT}
      step={FLOOR_H}
      unit="m"
      oninput={restart}
    />
    <SliderField
      label="Thời gian đi bộ"
      bind:value={stairTime}
      min={15}
      max={120}
      step={5}
      unit="s"
      oninput={restart}
    />
    <SliderField
      label="Thời gian đi thang máy"
      bind:value={liftTime}
      min={5}
      max={60}
      step={5}
      unit="s"
      oninput={restart}
    />
  </div>

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    {#each bars as bar (bar.name)}
      <div class="rounded-xl bg-slate-100 p-3 text-sm">
        <p class="font-semibold text-slate-800">{bar.name}</p>
        <p class="tabular-nums">{`Công A = ${formatNumber(work, 0)} J`}</p>
        <p class="tabular-nums">
          {`P = A/t = ${formatNumber(bar.power, 1)} W ≈ ${formatNumber(bar.power / HP, 2)} HP`}
        </p>
        <p class="tabular-nums">
          {`P = F.v = ${formatNumber(weight, 0)} N × ${formatNumber(bar.speed, 2)} m/s`}
        </p>
        <div class="mt-2 h-3 overflow-hidden rounded-full bg-white">
          <div
            class="h-full {bar.fill}"
            style:width={`${barMax > 0 ? (bar.power / barMax) * 100 : 0}%`}
          ></div>
        </div>
      </div>
    {/each}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
