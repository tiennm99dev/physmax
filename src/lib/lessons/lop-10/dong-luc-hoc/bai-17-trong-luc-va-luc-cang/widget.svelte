<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { tensions, weightOf } from './engine.js';

  const W = 360;
  const H = 290;
  const KNOT = { x: 180, y: 140 };
  const ROPE = 120;
  /** Pixels per newton: the largest tension, at 70 degrees, still fits on the board. */
  const K = 1.1;
  /** What one rope can bear in this picture, in newtons. */
  const ROPE_LIMIT = 120;
  const MODES = [
    { value: 'mot', label: 'Một dây' },
    { value: 'doi-xung', label: 'Hai dây đối xứng' },
    { value: 'lech', label: 'Hai dây lệch' },
  ];

  let mode = $state('doi-xung');
  let mass = $state(5);
  let alpha = $state(30);
  let beta = $state(45);

  const weight = $derived(weightOf(mass));
  const leftAngle = $derived(mode === 'mot' ? 0 : alpha);
  const rightAngle = $derived(mode === 'lech' ? beta : alpha);
  const pull = $derived(
    mode === 'mot' ? { t1: weight, t2: 0 } : tensions(weight, leftAngle, rightAngle),
  );
  const biggest = $derived(Math.max(pull.t1, pull.t2));
  const overload = $derived(biggest > ROPE_LIMIT);

  /** Unit vector along a rope, y down. @param {number} deg @param {number} side -1 left, 1 right */
  function along(deg, side) {
    const r = (deg * Math.PI) / 180;
    return { x: side * Math.sin(r), y: -Math.cos(r) };
  }

  const leftDir = $derived(along(leftAngle, -1));
  const rightDir = $derived(along(rightAngle, 1));
  const hookL = $derived({ x: KNOT.x + leftDir.x * ROPE, y: KNOT.y + leftDir.y * ROPE });
  const hookR = $derived({ x: KNOT.x + rightDir.x * ROPE, y: KNOT.y + rightDir.y * ROPE });
  const tipL = $derived({
    x: KNOT.x + leftDir.x * pull.t1 * K,
    y: KNOT.y + leftDir.y * pull.t1 * K,
  });
  const tipR = $derived({
    x: KNOT.x + rightDir.x * pull.t2 * K,
    y: KNOT.y + rightDir.y * pull.t2 * K,
  });
  const tipP = $derived({ x: KNOT.x, y: KNOT.y + weight * K });
  const tipSum = $derived({ x: KNOT.x, y: KNOT.y - weight * K });

  const note = $derived.by(() => {
    if (overload) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Lực căng lớn nhất ${formatNumber(biggest, 1)} N đã vượt quá $${ROPE_LIMIT}$ N mà dây chịu được: dây sẽ đứt, dù vật không nặng thêm. Hãy giảm góc giữa hai dây.`,
      };
    }
    if (mode === 'mot') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Vật đứng yên nên lực căng cân bằng với trọng lực: $T = P = ${numTex(weight, 1)}$ N.`,
      };
    }
    if (mode === 'doi-xung' && alpha > 60) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Mỗi dây lệch hơn $60^\\circ$ so với phương thẳng đứng: lực căng mỗi dây đã lớn hơn cả trọng lực của vật.',
      };
    }
    if (mode === 'doi-xung') {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Hai dây đối xứng: $T = \\dfrac{P}{2\\cos\\alpha}$. Góc càng lớn, lực căng càng lớn, dù trọng lực không đổi. Hợp lực của hai lực căng luôn cân bằng với $\\vec{P}$.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Dây gần phương thẳng đứng hơn gánh phần lớn trọng lực. Hợp lực của hai lực căng (nét đứt) luôn bằng độ lớn và ngược chiều với $\\vec{P}$.',
    };
  });
</script>

{#snippet arrow(
  /** @type {{ x: number, y: number }} */ tip,
  /** @type {string} */ color,
  /** @type {string} */ name,
  dashed = false,
  labelLeft = tip.x < KNOT.x,
)}
  {#if Math.hypot(tip.x - KNOT.x, tip.y - KNOT.y) > 1}
    {@const end = shaftEnd(KNOT.x, KNOT.y, tip.x, tip.y, 10)}
    <line
      x1={KNOT.x}
      y1={KNOT.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      stroke-width="3"
      stroke-dasharray={dashed ? '6 4' : undefined}
    />
    <polygon points={arrowHead(KNOT.x, KNOT.y, tip.x, tip.y, 10)} fill={color} />
    <text
      x={tip.x + (labelLeft ? -24 : 8)}
      y={tip.y + (tip.y > KNOT.y ? 14 : -4)}
      font-size="14"
      font-weight="700"
      fill={color}>{name}</text
    >
  {/if}
{/snippet}

<div class="space-y-4">
  <SegmentedControl label="Cách treo" options={MODES} bind:value={mode} />

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Vật ${formatNumber(mass)} ki lô gam, trọng lực ${formatNumber(weight, 1)} niutơn, lực căng ${formatNumber(pull.t1, 1)} niutơn${mode === 'mot' ? '' : ` và ${formatNumber(pull.t2, 1)} niutơn`}.`}
    >
      <line
        x1={KNOT.x}
        y1={KNOT.y}
        x2={hookL.x}
        y2={hookL.y}
        stroke={overload ? '#dc2626' : '#94a3b8'}
        stroke-width="2"
      />
      <rect x={hookL.x - 14} y={hookL.y - 6} width="28" height="6" fill="#475569" />
      {#if mode !== 'mot'}
        <line
          x1={KNOT.x}
          y1={KNOT.y}
          x2={hookR.x}
          y2={hookR.y}
          stroke={overload ? '#dc2626' : '#94a3b8'}
          stroke-width="2"
        />
        <rect x={hookR.x - 14} y={hookR.y - 6} width="28" height="6" fill="#475569" />
        <line
          x1={tipL.x}
          y1={tipL.y}
          x2={tipSum.x}
          y2={tipSum.y}
          stroke="#94a3b8"
          stroke-dasharray="4 3"
        />
        <line
          x1={tipR.x}
          y1={tipR.y}
          x2={tipSum.x}
          y2={tipSum.y}
          stroke="#94a3b8"
          stroke-dasharray="4 3"
        />
        {@render arrow(tipSum, '#64748b', '', true)}
      {/if}
      <rect
        x={KNOT.x - 14}
        y={KNOT.y - 10}
        width="28"
        height="20"
        rx="3"
        fill="#fde68a"
        stroke="#b45309"
      />
      {@render arrow(tipL, '#4f46e5', mode === 'mot' ? 'T' : 'T₁', false, mode !== 'mot')}
      {#if mode !== 'mot'}
        {@render arrow(tipR, '#0891b2', 'T₂')}
      {/if}
      {@render arrow(tipP, '#0f172a', 'P')}
      <circle cx={KNOT.x} cy={KNOT.y} r="3.5" fill="#0f172a" />
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Khối lượng m" bind:value={mass} min={2} max={10} step={1} unit="kg" />
    {#if mode !== 'mot'}
      <SliderField
        label={mode === 'lech' ? 'Góc dây trái với phương đứng' : 'Góc mỗi dây với phương đứng α'}
        bind:value={alpha}
        min={0}
        max={70}
        step={5}
        unit="°"
      />
    {/if}
    {#if mode === 'lech'}
      <SliderField
        label="Góc dây phải với phương đứng"
        bind:value={beta}
        min={5}
        max={70}
        step={5}
        unit="°"
      />
    {/if}
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">P = mg</dt>
      <dd class="tabular-nums">{`${formatNumber(weight, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">{mode === 'mot' ? 'T' : 'T₁'}</dt>
      <dd class="tabular-nums">{`${formatNumber(pull.t1, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-cyan-50 px-2 py-2">
      <dt class="font-semibold text-cyan-800">T₂</dt>
      <dd class="tabular-nums">{mode === 'mot' ? 'Không có' : `${formatNumber(pull.t2, 1)} N`}</dd>
    </div>
  </dl>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
