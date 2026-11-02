<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pushState } from '#lib/domain/push-motion.js';

  const W = 360;
  const H = 150;
  const FORCE = 2;
  const PUSH = 1;
  const RUN = 3;
  const LIGHT = 1;

  const rx = linear(0, 5, 64, W - 36);

  let heavy = $state(4);
  let time = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const light = $derived(pushState(FORCE, LIGHT, PUSH, time));
  const big = $derived(pushState(FORCE, heavy, PUSH, time));
  const pushing = $derived(playing && time < PUSH);

  function halt() {
    stopLoop?.();
    stopLoop = null;
    playing = false;
  }

  function run() {
    halt();
    if (reducedMotion()) {
      time = RUN;
      return;
    }
    time = 0;
    playing = true;
    stopLoop = frameLoop((dt) => {
      time = Math.min(RUN, time + dt);
      if (time >= RUN) halt();
    });
  }

  /** @param {number} value */
  function pickMass(value) {
    halt();
    heavy = value;
    time = 0;
  }

  const note = $derived(
    time === 0
      ? 'Cùng một lực đẩy, cùng trong một giây. Xe nào đổi vận tốc khó hơn?'
      : `Sau khi đẩy, xe ${formatNumber(LIGHT)} kg đạt ${formatNumber(pushState(FORCE, LIGHT, PUSH, RUN).v, 2)} m/s, xe ${formatNumber(heavy)} kg chỉ đạt ${formatNumber(pushState(FORCE, heavy, PUSH, RUN).v, 2)} m/s. Khối lượng càng lớn, mức quán tính càng lớn, vận tốc càng khó thay đổi.`,
  );

  $effect(() => () => stopLoop?.());
</script>

{#snippet cart(
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ mass,
  /** @type {string} */ color,
)}
  {@const w = 26 + mass * 3}
  {@const h = 12 + mass * 1.2}
  <rect x={x - w / 2} y={y - h - 6} width={w} height={h} rx="3" fill={color} />
  <circle cx={x - w / 3} cy={y - 3} r="3.5" fill="#1e293b" />
  <circle cx={x + w / 3} cy={y - 3} r="3.5" fill="#1e293b" />
  <text {x} y={y - 9} font-size="11" font-weight="700" fill="#fff" text-anchor="middle">
    {`${formatNumber(mass)} kg`}
  </text>
  {#if pushing}
    <line
      x1={x - w / 2 - 28}
      y1={y - 12}
      x2={x - w / 2 - 6}
      y2={y - 12}
      stroke="#e11d48"
      stroke-width="3"
    />
    <polygon
      points={`${x - w / 2},${y - 12} ${x - w / 2 - 8},${y - 16} ${x - w / 2 - 8},${y - 8}`}
      fill="#e11d48"
    />
  {/if}
{/snippet}

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label={`Hai xe chịu cùng một lực đẩy. Xe một kilôgam đi được ${formatNumber(light.x, 1)} mét, xe ${formatNumber(heavy)} kilôgam đi được ${formatNumber(big.x, 1)} mét.`}
    >
      <line x1="14" y1="60" x2={W - 14} y2="60" stroke="#94a3b8" stroke-width="2" />
      <line x1="14" y1="130" x2={W - 14} y2="130" stroke="#94a3b8" stroke-width="2" />
      {@render cart(rx.map(light.x), 60, LIGHT, '#0891b2')}
      {@render cart(rx.map(big.x), 130, heavy, '#4f46e5')}
    </svg>
  </div>
  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Khối lượng xe thứ hai"
      value={heavy}
      min={2}
      max={10}
      step={1}
      unit="kg"
      oninput={pickMass}
    />
    <button type="button" class={button.primary} onclick={run}>Đẩy hai xe</button>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
