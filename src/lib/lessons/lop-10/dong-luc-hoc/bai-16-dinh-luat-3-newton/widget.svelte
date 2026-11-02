<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { PUSH_TIME, RUN_TIME, outcome, rinkExtent, skatersAt } from './engine.js';

  const W = 360;
  const H = 150;
  const ICE = 118;
  const F_MAX = 300;
  const WHO = [
    { value: 'A', label: 'A đẩy B' },
    { value: 'B', label: 'B đẩy A' },
    { value: 'ca-hai', label: 'Cả hai đẩy' },
  ];
  /** Half the gap between the skaters at the start of the push, in pixels. */
  const GAP = 16;
  /** A run plays at half speed, so the force meters can be read during the push. */
  const PLAY_RATE = 0.5;

  let massA = $state(50);
  let massB = $state(75);
  let force = $state(150);
  let who = $state('A');
  let time = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const result = $derived(outcome(force, massA, massB));
  const now = $derived(skatersAt(force, massA, massB, time));
  const extent = $derived(rinkExtent(force, massA, massB));
  const rx = $derived(linear(-extent, extent, GAP + 24, W - GAP - 24));
  const posA = $derived(rx.map(now.xA) - GAP);
  const posB = $derived(rx.map(now.xB) + GAP);
  const pushing = $derived(now.reading > 0);
  const meterShare = $derived(now.reading / F_MAX);

  function halt() {
    stopLoop?.();
    stopLoop = null;
    playing = false;
  }

  function reset() {
    halt();
    time = 0;
  }

  function run() {
    halt();
    if (reducedMotion()) {
      time = RUN_TIME;
      return;
    }
    time = 0;
    playing = true;
    stopLoop = frameLoop((dt) => {
      time = Math.min(RUN_TIME, time + dt * PLAY_RATE);
      if (time >= RUN_TIME) halt();
    });
  }

  const pusherText = $derived(
    who === 'ca-hai' ? 'Cả hai cùng đẩy' : who === 'A' ? 'Chỉ A đẩy' : 'Chỉ B đẩy',
  );
  const note = $derived.by(() => {
    if (time === 0) {
      return 'Đoán trước khi thử: người nặng hơn có đẩy mạnh hơn không, và số chỉ của hai lực kế có khác nhau không?';
    }
    if (pushing) {
      return `${pusherText}, nhưng hai lực kế cùng chỉ ${formatNumber(force)} N: lực và phản lực xuất hiện đồng thời, cùng độ lớn.`;
    }
    const verdict =
      massA === massB
        ? 'Hai người cùng khối lượng nên bị đẩy ra với vận tốc như nhau.'
        : `Lực như nhau, nhưng người ${massA < massB ? 'A' : 'B'} nhẹ hơn nên có gia tốc lớn hơn và trượt nhanh hơn.`;
    return `Hai lực kế cùng về $0$ khi hai người rời nhau. ${verdict} Hai lực đặt vào hai người khác nhau nên không triệt tiêu nhau.`;
  });

  $effect(() => () => stopLoop?.());
</script>

{#snippet skater(
  /** @type {number} */ x,
  /** @type {number} */ mass,
  /** @type {string} */ name,
  /** @type {string} */ color,
  /** @type {number} */ dir,
)}
  {@const body = 8 + mass / 12}
  <circle cx={x} cy={ICE - 46} r="8" fill={color} />
  <rect x={x - body / 2} y={ICE - 36} width={body} height="24" rx="4" fill={color} />
  <line x1={x - 5} y1={ICE - 12} x2={x - 7} y2={ICE - 3} stroke={color} stroke-width="4" />
  <line x1={x + 5} y1={ICE - 12} x2={x + 7} y2={ICE - 3} stroke={color} stroke-width="4" />
  <line x1={x - 12} y1={ICE - 2} x2={x + 12} y2={ICE - 2} stroke="#475569" stroke-width="2" />
  {#if pushing}
    <line x1={x} y1={ICE - 30} x2={x - dir * 15} y2={ICE - 30} stroke={color} stroke-width="4" />
  {/if}
  <text {x} y={ICE - 58} font-size="12" font-weight="700" fill={color} text-anchor="middle">
    {name}
  </text>
{/snippet}

{#snippet forceArrow(
  /** @type {number} */ x,
  /** @type {number} */ dir,
  /** @type {string} */ name,
)}
  {@const tip = x + dir * (14 + (force / F_MAX) * 44)}
  {@const end = shaftEnd(x, ICE - 22, tip, ICE - 22, 8)}
  <line x1={x} y1={ICE - 22} x2={end.x} y2={end.y} stroke="#e11d48" stroke-width="3" />
  <polygon points={arrowHead(x, ICE - 22, tip, ICE - 22, 8)} fill="#e11d48" />
  <text x={tip} y={ICE - 27} font-size="11" font-weight="700" fill="#e11d48" text-anchor="middle"
    >{name}</text
  >
{/snippet}

{#snippet meter(/** @type {string} */ name)}
  <div class="rounded-xl bg-slate-100 px-3 py-2">
    <div class="flex items-baseline justify-between text-sm font-semibold text-slate-700">
      <span>{name}</span>
      <span class="tabular-nums">{`${formatNumber(now.reading)} N`}</span>
    </div>
    <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-slate-300">
      <div class="h-full bg-rose-500" style:width="{meterShare * 100}%"></div>
    </div>
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl label="Ai đẩy" options={WHO} bind:value={who} onchange={reset} />

  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label={`Hai người trên sân băng. Lực kế của A và của B cùng chỉ ${formatNumber(now.reading)} niutơn.`}
    >
      <rect x="0" y={ICE} width={W} height={H - ICE} fill="#e0f2fe" />
      <line x1="0" y1={ICE} x2={W} y2={ICE} stroke="#0284c7" stroke-width="2" />
      <line x1={rx.map(0)} y1={ICE} x2={rx.map(0)} y2={ICE + 8} stroke="#475569" />
      <text x={rx.map(0)} y={ICE + 22} font-size="11" fill="#475569" text-anchor="middle">0</text>
      {@render skater(posA, massA, 'A', '#4f46e5', -1)}
      {@render skater(posB, massB, 'B', '#c026d3', 1)}
      {#if pushing}
        {@render forceArrow(posA, -1, 'F(B→A)')}
        {@render forceArrow(posB, 1, 'F(A→B)')}
      {/if}
    </svg>
  </div>

  <div class="grid grid-cols-2 gap-2" aria-live="polite">
    {@render meter('Lực kế trên A')}
    {@render meter('Lực kế trên B')}
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Khối lượng A"
      bind:value={massA}
      min={30}
      max={90}
      step={5}
      unit="kg"
      oninput={reset}
    />
    <SliderField
      label="Khối lượng B"
      bind:value={massB}
      min={30}
      max={90}
      step={5}
      unit="kg"
      oninput={reset}
    />
    <SliderField
      label="Lực đẩy"
      bind:value={force}
      min={50}
      max={F_MAX}
      step={10}
      unit="N"
      oninput={reset}
    />
  </div>

  <button type="button" class={button.primary} onclick={run} disabled={playing}>Đẩy nhau</button>

  <div class="overflow-x-auto">
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="mb-1 text-left font-semibold text-slate-700">
        {`Kết quả sau ${formatNumber(PUSH_TIME)} s đẩy nhau`}
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th scope="col" class="px-2 py-1 font-semibold">Người</th>
          <th scope="col" class="px-2 py-1 font-semibold">Lực chịu</th>
          <th scope="col" class="px-2 py-1 font-semibold">Gia tốc</th>
          <th scope="col" class="px-2 py-1 font-semibold">Vận tốc khi rời nhau</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-100">
          <td class="px-2 py-1">A</td>
          <td class="px-2 py-1">{`${formatNumber(force)} N`}</td>
          <td class="px-2 py-1">{`${formatNumber(result.aA, 2)} m/s²`}</td>
          <td class="px-2 py-1">{`${formatNumber(result.vA, 2)} m/s`}</td>
        </tr>
        <tr class="border-b border-slate-100">
          <td class="px-2 py-1">B</td>
          <td class="px-2 py-1">{`${formatNumber(force)} N`}</td>
          <td class="px-2 py-1">{`${formatNumber(result.aB, 2)} m/s²`}</td>
          <td class="px-2 py-1">{`${formatNumber(result.vB, 2)} m/s`}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={time > 0 ? 'ok' : 'info'} text={note} />
</div>
