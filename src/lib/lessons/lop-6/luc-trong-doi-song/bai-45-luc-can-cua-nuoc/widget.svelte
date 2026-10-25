<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { DEPTH, SHAPES, dragAt, fall, ranking, stateAt, timeToBottom, winner } from './engine.js';

  const W = 360;
  const H = 300;
  const TOP = 36;
  const BOTTOM = 270;
  const LANE = W / SHAPES.length;
  // The race plays at a fifth of real speed so the order can be seen.
  const SLOW = 0.2;
  const COMPARE_V = 0.5;

  /** @type {import('./engine.js').MediumId} */
  let medium = $state('nuoc');
  let guess = $state('');
  let t = $state(0);
  let running = $state(false);
  let finished = $state(false);

  const falls = $derived(SHAPES.map((s) => fall(s.id, medium)));
  const states = $derived(falls.map((f) => stateAt(f, t)));
  const order = $derived(ranking(medium));
  const times = $derived(falls.map((f) => timeToBottom(f)));
  const best = $derived(winner(medium));
  const water = $derived(medium === 'nuoc');

  const guessOptions = [
    ...SHAPES.map((s) => ({ value: s.id, label: s.name })),
    { value: 'cung-luc', label: 'Cùng lúc' },
  ];

  /** @param {string} id */
  const nameOf = (id) =>
    id === 'cung-luc'
      ? 'cả bốn vật chạm đáy gần như cùng lúc'
      : (SHAPES.find((s) => s.id === id)?.name.toLowerCase() ?? '');

  $effect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const end = order[order.length - 1].time;
    const tick = (/** @type {number} */ now) => {
      t = Math.min(end, t + ((now - last) / 1000) * SLOW);
      last = now;
      if (t >= end) {
        running = false;
        finished = true;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function drop() {
    t = 0;
    finished = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      t = order[order.length - 1].time;
      finished = true;
    } else {
      running = true;
    }
  }
  function reset() {
    running = false;
    finished = false;
    t = 0;
  }

  /** @param {number} s */
  const sec = (s) => `${formatFixed(s, 2)} s`;

  const feedback = $derived.by(() => {
    if (running) return 'Các vật đang chìm xuống…';
    if (!finished) {
      return guess
        ? `Nhấn "Thả" để cả bốn vật cùng bắt đầu rơi từ ${water ? 'mặt nước' : 'miệng bể'}.`
        : 'Hãy dự đoán vật nào chạm đáy trước, rồi nhấn "Thả".';
    }
    const result = order.map((r) => `${r.name.toLowerCase()} ${sec(r.time)}`).join(', ');
    const verdict =
      best === 'cung-luc'
        ? 'Trong không khí, lực cản rất nhỏ nên hình dạng hầu như không ảnh hưởng: cả bốn vật chạm đáy gần như cùng lúc.'
        : `Trong nước, ${nameOf(best)} chạm đáy trước, tấm phẳng nằm ngang chạm đáy sau cùng: tấm phẳng có diện tích mặt cản lớn nhất nên chịu lực cản lớn nhất, còn vật hình thuôn rẽ nước tốt nhất nên chịu lực cản nhỏ nhất.`;
    const check = !guess
      ? ''
      : guess === best
        ? 'Em dự đoán đúng! '
        : `Em đã dự đoán ${nameOf(guess)}, nhưng kết quả khác. `;
    return `${check}${verdict} Thời gian thật: ${result}.`;
  });

  /** Bar length for the resistance at the comparison speed. */
  const bars = $derived(SHAPES.map((s) => dragAt(s.id, medium, COMPARE_V)));
  const barMax = $derived(Math.max(dragAt('tam', 'nuoc', COMPARE_V), ...bars));
  /** @param {number} f */
  const forceText = (f) => (f < 0.001 ? '≈ 0 N' : `${formatNumber(f, 3)} N`);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Bể chứa"
      options={[
        { value: 'nuoc', label: 'Nước' },
        { value: 'khong-khi', label: 'Không khí' },
      ]}
      bind:value={medium}
      onchange={reset}
    />
    <SegmentedControl
      label="Dự đoán: vật nào chạm đáy trước?"
      options={guessOptions}
      bind:value={guess}
      onchange={reset}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Bể {water ? 'nước' : 'không khí'} sâu {formatNumber(
        DEPTH * 100,
      )} cm, bốn vật cùng khối lượng, khác hình dạng, được thả cùng lúc."
    >
      <rect
        x="4"
        y={TOP - 8}
        width={W - 8}
        height={BOTTOM - TOP + 16}
        rx="6"
        fill={water ? '#bae6fd' : '#f8fafc'}
        stroke="#64748b"
        stroke-width="2"
      />
      {#if water}
        <line x1="4" y1={TOP - 8} x2={W - 4} y2={TOP - 8} stroke="#0284c7" stroke-width="2" />
      {/if}
      <rect x="4" y={BOTTOM + 8} width={W - 8} height="6" fill="#475569" />
      {#each SHAPES as s, i (s.id)}
        {@const cx = LANE * i + LANE / 2}
        {@const st = states[i]}
        {@const cy = TOP + (st.y / DEPTH) * (BOTTOM - TOP)}
        {#if i > 0}
          <line
            x1={LANE * i}
            y1={TOP}
            x2={LANE * i}
            y2={BOTTOM}
            stroke="#94a3b8"
            stroke-dasharray="3 4"
          />
        {/if}
        <text x={cx} y="16" text-anchor="middle" class="fill-slate-700 text-[10px] font-semibold"
          >{s.name.replace(' nằm ngang', '')}</text
        >
        <g fill="#475569" stroke="#1e293b" stroke-width="1.5">
          {#if s.id === 'thuon'}
            <path
              d="M {cx} {cy - 4} C {cx + 8} {cy - 14} {cx + 8} {cy - 26} {cx} {cy - 32} C {cx -
                8} {cy - 26} {cx - 8} {cy - 14} {cx} {cy - 4} Z"
            />
          {:else if s.id === 'cau'}
            <circle {cx} cy={cy - 11} r="11" />
          {:else if s.id === 'hop'}
            <rect x={cx - 10} y={cy - 20} width="20" height="20" />
          {:else}
            <rect x={cx - 34} y={cy - 6} width="68" height="6" />
          {/if}
        </g>
        <text
          x={cx}
          y={BOTTOM + 28}
          text-anchor="middle"
          class="fill-slate-600 text-[10px] tabular-nums"
        >
          {st.done ? sec(times[i]) : `${formatFixed(st.v, 2)} m/s`}
        </text>
      {/each}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Bốn vật làm cùng một chất, cùng khối lượng, chỉ khác hình dạng. Dưới mỗi vật: tốc độ lúc đang
      chìm, thời gian khi đã chạm đáy. Hình chạy chậm lại 5 lần.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} disabled={running} onclick={drop}>Thả</button>
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {finished
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="{card} p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Lực cản của {water ? 'nước' : 'không khí'} lên mỗi vật khi chuyển động với cùng tốc độ {formatNumber(
        COMPARE_V,
      )} m/s
    </p>
    <ul class="space-y-1.5">
      {#each SHAPES as s, i (s.id)}
        <li class="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-2 text-sm">
          <span class="text-slate-700">{s.name}</span>
          <span class="h-3 rounded bg-slate-100">
            <span
              class="block h-3 rounded bg-sky-600"
              style="width: {Math.max(0.5, (bars[i] / barMax) * 100)}%"
            ></span>
          </span>
          <span class="text-right tabular-nums text-slate-700">{forceText(bars[i])}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>
