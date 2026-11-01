<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatFixed, formatNumber, numTex, texNumber } from '#lib/core/number-format.js';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import {
    BALLS,
    INSTRUMENTS,
    analyze,
    covers,
    reading,
    resultChoices,
    resultLine,
    trueValueNote,
  } from './engine.js';

  const MAX_READINGS = 10;
  const MIN_FOR_RESULT = 3;
  // A longer sum in one unbreakable fraction would overflow a phone screen.
  const MAX_WRITTEN_TERMS = 5;

  let instrumentId = $state('kep');
  let ballIndex = $state(0);
  let zero = $state('dung');
  /** @type {number[]} */
  let readings = $state([]);
  let draw = $state(0);
  let showTrue = $state(false);
  /** @type {number | null} */
  let picked = $state(null);

  const instrument = $derived(INSTRUMENTS.find((i) => i.id === instrumentId) ?? INSTRUMENTS[0]);
  const diameter = $derived(BALLS[ballIndex]);
  const shifted = $derived(zero === 'lech');
  const last = $derived(readings.at(-1) ?? null);
  const stats = $derived(readings.length > 0 ? analyze(readings, instrument) : null);
  const ready = $derived(stats !== null && stats.n >= MIN_FOR_RESULT);
  const choices = $derived(ready && stats ? resultChoices(stats, instrument) : null);
  const answered = $derived(choices !== null && picked === choices.answer);

  function clear() {
    readings = [];
    picked = null;
    showTrue = false;
  }

  /** @param {number} times */
  function measure(times) {
    const room = Math.min(times, MAX_READINGS - readings.length);
    const added = Array.from({ length: room }, (_, i) =>
      reading(draw + i + 1, diameter, instrument, shifted),
    );
    draw += room;
    readings = [...readings, ...added];
    picked = null;
  }

  function nextBall() {
    ballIndex = (ballIndex + 1) % BALLS.length;
    clear();
  }

  /** @param {number} value @param {number} [places] */
  const fixed = (value, places = instrument.places) => texNumber(formatFixed(value, places));

  const steps = $derived.by(() => {
    if (!stats) return [];
    const sum =
      stats.n <= MAX_WRITTEN_TERMS
        ? readings.map((r) => fixed(r)).join(' + ')
        : 'd_1 + d_2 + \\ldots + d_{' + stats.n + '}';
    return [
      `Trung bình: $\\overline{d} = \\dfrac{${sum}}{${stats.n}} = ${numTex(stats.mean, 4)}$ mm.`,
      `Sai số ngẫu nhiên tuyệt đối trung bình: $\\overline{\\Delta d} = ${numTex(stats.meanDeviation, 4)}$ mm.`,
      `Sai số dụng cụ (nửa độ chia nhỏ nhất): $\\Delta d_{dc} = ${numTex(stats.toolError, 4)}$ mm.`,
      `Sai số tuyệt đối: $\\Delta d = ${numTex(stats.meanDeviation, 4)} + ${numTex(stats.toolError, 4)} = ${numTex(stats.rawError, 4)}$ mm.`,
    ];
  });

  const X0 = 20;
  const X1 = 340;
  const axis = $derived.by(() => {
    const margin = instrument.spread + instrument.step * 2;
    return { lo: diameter - margin, hi: diameter + instrument.zeroError + margin };
  });
  /** @param {number} value */
  const stripX = (value) => X0 + ((value - axis.lo) / (axis.hi - axis.lo)) * (X1 - X0);

  const JAW_LEFT = 110;
  const ballRadius = $derived(46 * (diameter / 20));
  // The jaw's gap is drawn enlarged, because a real difference would not show.
  const jawGap = $derived(
    last === null ? 26 : Math.min(26, Math.max(0, ((last - diameter) / instrument.spread) * 7)),
  );
  const jawRight = $derived(JAW_LEFT + 2 * ballRadius + jawGap);

  const note = $derived.by(() => {
    if (!stats) {
      return /** @type {const} */ ({
        tone: 'info',
        text: 'Nhấn "Đo một lần" để kẹp viên bi và đọc số đo.',
      });
    }
    if (!ready) {
      return /** @type {const} */ ({
        tone: 'info',
        text: 'Các lần đo khác nhau là do sai số ngẫu nhiên. Đo ít nhất $3$ lần để tính kết quả.',
      });
    }
    if (showTrue) return trueValueNote(covers(stats, diameter), shifted);
    return /** @type {const} */ ({
      tone: 'info',
      text: `Sai số tỉ đối $\\delta d \\approx ${numTex(stats.relative, 2)}\\%$. Thử đổi dụng cụ để xem sai số thay đổi thế nào.`,
    });
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3">
    <SegmentedControl
      label="Dụng cụ đo"
      options={INSTRUMENTS.map((i) => ({ value: i.id, label: i.label }))}
      bind:value={instrumentId}
      onchange={clear}
    />
    <SegmentedControl
      label="Vạch 0 của dụng cụ"
      options={[
        { value: 'dung', label: 'Đúng vạch' },
        { value: 'lech', label: 'Bị lệch' },
      ]}
      bind:value={zero}
      onchange={clear}
    />
  </div>

  <div class="{card} p-3">
    <svg
      viewBox="0 0 360 130"
      class="w-full"
      role="img"
      aria-label={last === null
        ? 'Viên bi đặt giữa hai má của dụng cụ đo, chưa đo.'
        : `Hai má dụng cụ kẹp viên bi, số đọc lần này ${formatFixed(last, instrument.places)} mi-li-mét.`}
    >
      <rect x="30" y="112" width="300" height="8" rx="2" fill="#94a3b8" />
      <rect x={JAW_LEFT - 12} y="16" width="12" height="100" fill="#475569" />
      <rect
        x={jawRight}
        y="16"
        width="12"
        height="100"
        fill="#475569"
        class="motion-safe:transition-all"
      />
      <circle cx={JAW_LEFT + ballRadius} cy="66" r={ballRadius} fill="#6366f1" />
      <circle cx={JAW_LEFT + ballRadius - 8} cy={58} r={ballRadius / 5} fill="#fff" opacity="0.5" />
      <text x="20" y="34" font-size="13" fill="#334155">Viên bi {ballIndex + 1}</text>
      <text x="350" y="34" font-size="15" font-weight="700" fill="#0f172a" text-anchor="end">
        {last === null ? '– mm' : `${formatFixed(last, instrument.places)} mm`}
      </text>
    </svg>
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      disabled={readings.length >= MAX_READINGS}
      onclick={() => measure(1)}
    >
      Đo một lần
    </button>
    <button
      type="button"
      class={button.secondary}
      disabled={readings.length >= MAX_READINGS}
      onclick={() => measure(5)}
    >
      Đo thêm 5 lần
    </button>
    <button type="button" class={button.quiet} onclick={clear}>Xoá số đo</button>
    <button type="button" class={button.quiet} onclick={nextBall}>Đổi viên bi</button>
  </div>

  {#if stats}
    <div class="overflow-x-auto">
      <table class="w-full min-w-64 text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">
          Bảng số đo ({stats.n}/{MAX_READINGS} lần)
        </caption>
        <thead>
          <tr class="border-b border-slate-300 text-slate-600">
            <th scope="col" class="py-1">Lần đo</th>
            <th scope="col" class="py-1">d (mm)</th>
            <th scope="col" class="py-1">Δd (mm)</th>
          </tr>
        </thead>
        <tbody>
          {#each readings as r, i (i)}
            <tr class="border-b border-slate-100">
              <td class="py-1">{i + 1}</td>
              <td class="py-1">{formatFixed(r, instrument.places)}</td>
              <td class="py-1">{formatNumber(stats.deviations[i], 4)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <svg
      viewBox="0 0 360 76"
      class="w-full"
      role="img"
      aria-label={ready
        ? `Các số đo trên trục, khoảng kết quả từ ${formatFixed(stats.roundedMean - stats.error, instrument.places)} đến ${formatFixed(stats.roundedMean + stats.error, instrument.places)} mi-li-mét.`
        : 'Các số đo trên trục.'}
    >
      {#if ready}
        <rect
          x={stripX(stats.roundedMean - stats.error)}
          y="16"
          width={Math.max(
            2,
            stripX(stats.roundedMean + stats.error) - stripX(stats.roundedMean - stats.error),
          )}
          height="30"
          fill="#c7d2fe"
        />
      {/if}
      <line x1={X0} x2={X1} y1="46" y2="46" stroke="#475569" stroke-width="2" />
      {#each readings as r, i (i)}
        <circle cx={stripX(r)} cy={40 - (i % 3) * 7} r="4" fill="#4338ca" />
      {/each}
      {#if showTrue}
        <line
          x1={stripX(diameter)}
          x2={stripX(diameter)}
          y1="8"
          y2="52"
          stroke="#dc2626"
          stroke-width="2.5"
        />
      {/if}
      <text x={X0} y="66" font-size="12" fill="#475569">
        {formatFixed(axis.lo, instrument.places)} mm
      </text>
      <text x={X1} y="66" font-size="12" fill="#475569" text-anchor="end">
        {formatFixed(axis.hi, instrument.places)} mm
      </text>
    </svg>
  {/if}

  {#if ready && stats}
    <ol class="list-decimal space-y-1 pl-5 text-sm text-slate-700">
      {#each steps as step (step)}
        <li><LiveRichText text={step} /></li>
      {/each}
    </ol>

    {#if choices}
      <fieldset class="space-y-2">
        <legend class="text-sm font-semibold text-slate-700">
          <LiveRichText
            text="Làm tròn $\Delta d$ đến hàng của độ chia nhỏ nhất. Kết quả đo ghi thế nào?"
          />
        </legend>
        {#each choices.options as option, i (option)}
          <button
            type="button"
            class="block min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm font-medium tabular-nums {focusRing} {picked ===
              i && i === choices.answer
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : picked === i
                ? 'border-rose-300 bg-rose-50 text-rose-900'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
            aria-pressed={picked === i}
            onclick={() => (picked = i)}
          >
            {option}
          </button>
        {/each}
      </fieldset>
      {#if picked !== null}
        <FeedbackNote
          tone={answered ? 'ok' : 'warn'}
          text={answered
            ? `Đúng: ${resultLine(stats, instrument)}, tức là $\\overline{d}$ và $\\Delta d$ cùng được viết đến hàng của độ chia nhỏ nhất.`
            : 'Chưa đúng: phải cộng cả sai số dụng cụ, rồi làm tròn $\\Delta d$ đến hàng của độ chia nhỏ nhất và viết $\\overline{d}$ đến cùng hàng đó.'}
        />
      {/if}
    {/if}

    <button
      type="button"
      class={button.quiet}
      aria-pressed={showTrue}
      onclick={() => (showTrue = !showTrue)}
    >
      {showTrue ? 'Ẩn giá trị thật' : 'Hiện giá trị thật (vạch đỏ)'}
    </button>
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
