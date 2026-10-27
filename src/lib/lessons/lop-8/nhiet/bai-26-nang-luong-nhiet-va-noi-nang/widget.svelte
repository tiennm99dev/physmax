<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { rng } from '#lib/core/drill.js';
  import { button, card } from '#lib/core/ui.js';
  import {
    compare,
    dotCount,
    drop,
    kineticRatio,
    scatter,
    screenSpeed,
    spread,
    step,
    thermalEnergy,
  } from './engine.js';

  /** @typedef {import('./engine.js').Particle} Particle */
  /** @typedef {import('./engine.js').Box} Box */

  const W = 160;
  const H = 200;
  const FLOOR = 192;
  const INK = 12;
  const BAR_MAX = 3;
  const MASSES = [
    { value: '100', label: '100 g' },
    { value: '200', label: '200 g' },
  ];

  const rand = rng(26);

  let tA = $state(20);
  let tB = $state(80);
  let mA = $state('100');
  let mB = $state('100');
  let playing = $state(!reducedMotion());

  /** @type {Particle[]} */
  let dotsA = $state.raw([]);
  /** @type {Particle[]} */
  let dotsB = $state.raw([]);
  /** @type {Particle[]} */
  let inkA = $state.raw([]);
  /** @type {Particle[]} */
  let inkB = $state.raw([]);
  let inkClock = $state(0);

  const cupA = $derived({ celsius: tA, grams: Number(mA) });
  const cupB = $derived({ celsius: tB, grams: Number(mB) });

  /** @param {number} grams @returns {Box} */
  const waterBox = (grams) => ({
    x0: 22,
    x1: W - 22,
    y0: FLOOR - (grams / 200) * 150 + 6,
    y1: FLOOR - 6,
  });
  const boxA = $derived(waterBox(cupA.grams));
  const boxB = $derived(waterBox(cupB.grams));

  // A new mass of water means a new set of molecules; the ink is poured away.
  $effect(() => {
    dotsA = scatter(rand, dotCount(cupA.grams), boxA);
    inkA = [];
  });
  $effect(() => {
    dotsB = scatter(rand, dotCount(cupB.grams), boxB);
    inkB = [];
  });

  $effect(() => {
    if (!playing) return;
    return frameLoop((dt) => {
      const vA = screenSpeed(tA);
      const vB = screenSpeed(tB);
      dotsA = step(dotsA, dt, vA, rand, boxA);
      dotsB = step(dotsB, dt, vB, rand, boxB);
      if (inkA.length) inkA = step(inkA, dt, vA, rand, boxA);
      if (inkB.length) inkB = step(inkB, dt, vB, rand, boxB);
      if (inkA.length || inkB.length) inkClock += dt;
    });
  });

  function addInk() {
    inkA = drop(rand, INK, { x: W / 2, y: boxA.y0 + 8 }, 3);
    inkB = drop(rand, INK, { x: W / 2, y: boxB.y0 + 8 }, 3);
    inkClock = 0;
  }

  /** Step the frozen animation by hand when motion is reduced. */
  function nudge() {
    for (let i = 0; i < 10; i++) {
      dotsA = step(dotsA, 0.05, screenSpeed(tA), rand, boxA);
      dotsB = step(dotsB, 0.05, screenSpeed(tB), rand, boxB);
      if (inkA.length) inkA = step(inkA, 0.05, screenSpeed(tA), rand, boxA);
      if (inkB.length) inkB = step(inkB, 0.05, screenSpeed(tB), rand, boxB);
    }
    if (inkA.length || inkB.length) inkClock += 0.5;
  }

  /** Water colour from cool blue to warm orange. @param {number} t */
  const tint = (t) => `color-mix(in srgb, #fdba74 ${Math.round(t)}%, #bae6fd)`;

  const verdict = $derived(compare(cupA, cupB));
  const inkSpreadA = $derived(spread(inkA));
  const inkSpreadB = $derived(spread(inkB));

  const feedback = $derived.by(() => {
    const v = verdict;
    const kin =
      v.kinetic === 'bang'
        ? 'Hai cốc cùng nhiệt độ: các phân tử nước ở hai cốc chuyển động nhanh như nhau, động năng trung bình của một phân tử bằng nhau.'
        : `Cốc ${v.kinetic} nóng hơn: các phân tử của nó chuyển động hỗn loạn nhanh hơn, động năng trung bình của một phân tử lớn hơn.`;
    let inner;
    if (v.internal === 'chua-ro') {
      const hot = v.kinetic;
      inner = `Cốc ${hot} nóng hơn nhưng ít nước hơn, nên chỉ nhìn nhiệt độ hay khối lượng thì chưa kết luận được cốc nào có nội năng lớn hơn: phải xét cả hai.`;
    } else if (v.internal === 'bang') {
      inner = 'Cùng nhiệt độ, cùng khối lượng: nội năng của hai cốc bằng nhau.';
    } else if (v.kinetic === 'bang') {
      inner = `Cùng nhiệt độ nhưng cốc ${v.internal} nhiều nước hơn, có nhiều phân tử hơn, nên nội năng của cốc ${v.internal} lớn hơn.`;
    } else {
      inner = `Nội năng của cốc ${v.internal} lớn hơn.`;
    }
    let ink = '';
    if (inkA.length && inkClock > 1.5) {
      const faster =
        Math.abs(inkSpreadA - inkSpreadB) < 2 ? '' : inkSpreadA > inkSpreadB ? 'A' : 'B';
      ink = faster
        ? ` Giọt mực ở cốc ${faster} loang ra nhanh hơn.`
        : ' Giọt mực ở hai cốc loang ra như nhau.';
    }
    return {
      tone: /** @type {'ok' | 'info'} */ (v.internal === 'chua-ro' ? 'info' : 'ok'),
      text: `${kin} ${inner}${ink}`,
    };
  });

  const rows = $derived([
    { name: 'A', cup: cupA },
    { name: 'B', cup: cupB },
  ]);
</script>

{#snippet beaker(
  /** @type {string} */ name,
  /** @type {{ celsius: number, grams: number }} */ cup,
  /** @type {Box} */ box,
  /** @type {Particle[]} */ dots,
  /** @type {Particle[]} */ ink,
)}
  <figure class="{card} p-2 text-center">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-[200px]"
      role="img"
      aria-label="Cốc {name}: {cup.grams} g nước ở {formatNumber(cup.celsius)} °C{ink.length
        ? ', có giọt mực đang loang'
        : ''}."
    >
      <rect
        x="16"
        y={box.y0 - 6}
        width={W - 32}
        height={FLOOR - box.y0 + 6}
        style:fill={tint(cup.celsius)}
      />
      {#each dots as p, i (i)}
        <circle cx={p.x} cy={p.y} r="4" fill="#2563eb" opacity="0.85" />
      {/each}
      {#each ink as p, i (i)}
        <circle cx={p.x} cy={p.y} r="3.2" fill="#9333ea" />
      {/each}
      <path
        d="M14 22 L14 {FLOOR + 2} L{W - 14} {FLOOR + 2} L{W - 14} 22"
        fill="none"
        stroke="#475569"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <text x={W / 2} y="16" text-anchor="middle" class="fill-slate-700 text-[13px] font-bold"
        >Cốc {name}</text
      >
    </svg>
    <figcaption class="text-sm text-slate-600">
      {cup.grams} g nước, {formatNumber(cup.celsius)} °C
    </figcaption>
  </figure>
{/snippet}

<div class="space-y-4">
  <div class="grid grid-cols-2 gap-3">
    {@render beaker('A', cupA, boxA, dotsA, inkA)}
    {@render beaker('B', cupB, boxB, dotsB, inkB)}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={addInk}>Nhỏ mực vào hai cốc</button>
    <button type="button" class={button.secondary} onclick={() => (playing = !playing)}>
      {playing ? 'Tạm dừng' : 'Chạy chuyển động'}
    </button>
    {#if !playing}
      <button type="button" class={button.quiet} onclick={nudge}>Bước tiếp</button>
    {/if}
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="space-y-3">
      <SliderField label="Nhiệt độ cốc A" bind:value={tA} min={0} max={100} unit="°C" />
      <SegmentedControl label="Lượng nước cốc A" options={MASSES} bind:value={mA} />
    </div>
    <div class="space-y-3">
      <SliderField label="Nhiệt độ cốc B" bind:value={tB} min={0} max={100} unit="°C" />
      <SegmentedControl label="Lượng nước cốc B" options={MASSES} bind:value={mB} />
    </div>
  </div>

  <div class="{card} space-y-3 p-3 text-sm">
    <p class="font-semibold text-slate-700">So sánh hai cốc (lấy nước 100 g ở 0 °C làm mốc)</p>
    {#each rows as r (r.name)}
      {@const k = kineticRatio(r.cup.celsius)}
      {@const e = thermalEnergy(r.cup)}
      <div class="space-y-1">
        <div class="flex justify-between gap-2">
          <span>Cốc {r.name}: động năng trung bình một phân tử</span>
          <span class="font-semibold tabular-nums">× {formatFixed(k, 2)}</span>
        </div>
        <div class="h-3 rounded bg-slate-100">
          <div class="h-3 rounded bg-sky-500" style:width="{(100 * k) / 1.5}%"></div>
        </div>
        <div class="flex justify-between gap-2">
          <span>Cốc {r.name}: năng lượng nhiệt (tổng động năng)</span>
          <span class="font-semibold tabular-nums">× {formatFixed(e, 2)}</span>
        </div>
        <div class="h-3 rounded bg-slate-100">
          <div class="h-3 rounded bg-orange-500" style:width="{(100 * e) / BAR_MAX}%"></div>
        </div>
      </div>
    {/each}
    <p class="text-xs text-slate-500">
      Trên hình, chênh lệch tốc độ giữa nước lạnh và nước nóng được phóng đại cho dễ thấy; các con
      số là tỉ lệ theo mô hình hạt.
    </p>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
