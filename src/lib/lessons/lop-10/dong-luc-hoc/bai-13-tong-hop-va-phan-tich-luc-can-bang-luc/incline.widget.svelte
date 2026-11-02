<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { inclineParts } from './engine.js';

  const W = 360;
  const H = 290;
  const HINGE = { x: 40, y: 225 };
  const SLOPE = 240;
  const PLACE = 140;
  const K = 1.2;

  let alpha = $state(30);
  let weight = $state(40);

  const rad = $derived((alpha * Math.PI) / 180);
  const parts = $derived(inclineParts(weight, alpha));
  const up = $derived({ x: Math.cos(rad), y: -Math.sin(rad) });
  const top = $derived({ x: HINGE.x + SLOPE * up.x, y: HINGE.y + SLOPE * up.y });
  const center = $derived({
    x: HINGE.x + PLACE * up.x - 18 * Math.sin(rad),
    y: HINGE.y + PLACE * up.y - 18 * Math.cos(rad),
  });
  const tipP = $derived({ x: center.x, y: center.y + weight * K });
  const tip1 = $derived({
    x: center.x - parts.along * K * up.x,
    y: center.y - parts.along * K * up.y,
  });
  const tip2 = $derived({
    x: center.x + parts.normal * K * Math.sin(rad),
    y: center.y + parts.normal * K * Math.cos(rad),
  });

  const note = $derived(
    alpha === 0
      ? 'Mặt phẳng nằm ngang: $P_1 = 0$, trọng lực chỉ ép vật xuống mặt đỡ.'
      : `Dốc ${formatNumber(alpha)}°: $P_1$ kéo vật trượt xuống dốc, $P_2$ ép vật vào mặt dốc. Dốc càng lớn thì $P_1$ càng lớn, $P_2$ càng nhỏ.`,
  );
</script>

{#snippet arrow(
  /** @type {{ x: number, y: number }} */ tip,
  /** @type {string} */ color,
  /** @type {string} */ name,
  /** @type {number} */ dx,
  /** @type {number} */ dy,
)}
  {#if Math.hypot(tip.x - center.x, tip.y - center.y) > 1}
    {@const end = shaftEnd(center.x, center.y, tip.x, tip.y, 10)}
    <line x1={center.x} y1={center.y} x2={end.x} y2={end.y} stroke={color} stroke-width="3" />
    <polygon points={arrowHead(center.x, center.y, tip.x, tip.y, 10)} fill={color} />
    <text x={tip.x + dx} y={tip.y + dy} font-size="14" font-weight="700" fill={color}>{name}</text>
  {/if}
{/snippet}

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Vật trên mặt phẳng nghiêng góc ${formatNumber(alpha)} độ. Trọng lực ${formatNumber(weight)} niutơn phân tích thành P1 bằng ${formatNumber(parts.along, 1)} niutơn dọc mặt dốc và P2 bằng ${formatNumber(parts.normal, 1)} niutơn vuông góc mặt dốc.`}
    >
      <polygon
        points={`${HINGE.x},${HINGE.y} ${top.x},${top.y} ${top.x},${HINGE.y}`}
        fill="#f1f5f9"
        stroke="#64748b"
        stroke-width="1.5"
      />
      <line x1="16" y1={HINGE.y} x2={W - 16} y2={HINGE.y} stroke="#64748b" stroke-width="2" />
      <text x={HINGE.x + 34} y={HINGE.y - 6} font-size="12" fill="#475569">
        {`α = ${formatNumber(alpha)}°`}
      </text>
      <rect
        x={center.x - 18}
        y={center.y - 18}
        width="36"
        height="36"
        rx="3"
        fill="#fde68a"
        stroke="#b45309"
        transform={`rotate(${-alpha} ${center.x} ${center.y})`}
      />
      <line
        x1={tip1.x}
        y1={tip1.y}
        x2={tipP.x}
        y2={tipP.y}
        stroke="#94a3b8"
        stroke-dasharray="4 3"
      />
      <line
        x1={tip2.x}
        y1={tip2.y}
        x2={tipP.x}
        y2={tipP.y}
        stroke="#94a3b8"
        stroke-dasharray="4 3"
      />
      {@render arrow(tipP, '#0f172a', 'P', 6, 4)}
      {@render arrow(tip1, '#e11d48', 'P₁', -20, -6)}
      {@render arrow(tip2, '#059669', 'P₂', 6, 14)}
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Góc nghiêng α" bind:value={alpha} min={0} max={60} step={5} unit="°" />
    <SliderField label="Trọng lực P" bind:value={weight} min={10} max={50} step={5} unit="N" />
  </div>

  <dl class="grid grid-cols-2 gap-2 text-center text-sm">
    <div class="rounded-xl bg-rose-50 px-2 py-2">
      <dt class="font-semibold text-rose-800">P₁ = P sin α</dt>
      <dd class="tabular-nums">{`${formatNumber(parts.along, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-emerald-50 px-2 py-2">
      <dt class="font-semibold text-emerald-800">P₂ = P cos α</dt>
      <dd class="tabular-nums">{`${formatNumber(parts.normal, 1)} N`}</dd>
    </div>
  </dl>

  <FeedbackNote tone="info" text={note} />
</div>
