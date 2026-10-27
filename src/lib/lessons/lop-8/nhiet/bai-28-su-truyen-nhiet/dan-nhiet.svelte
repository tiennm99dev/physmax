<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { PINS, RODS, ROD_CELLS, coldRod, dropPins, heatColor, rod, rodStep } from './engine.js';

  /** Model seconds per real second. */
  const SPEED = 3;
  const XA = 46;
  const XB = 330;
  const ROD_Y = 46;
  const TABLE = 150;
  const cellW = (XB - XA) / ROD_CELLS;
  const cellX = (/** @type {number} */ i) => XA + (i + 0.5) * cellW;

  let material = $state('dong');
  let flame = $state(false);
  let temps = $state.raw(coldRod());
  let dropped = $state.raw(PINS.map(() => false));
  /** Model seconds since the flame was lit. */
  let clock = $state(0);
  /** Results per material: pins dropped and when the last one fell. */
  /** @type {Record<string, { count: number, at: number }>} */
  let results = $state({});

  const still = reducedMotion();
  const kappa = $derived(rod(material).kappa);
  const count = $derived(dropped.filter(Boolean).length);
  const warm = $derived(flame || temps.some((t) => t > 26));

  $effect(() => {
    if (!warm) return;
    return frameLoop((dt) => {
      const sim = dt * SPEED;
      temps = rodStep(temps, sim, kappa, flame);
      if (flame) clock += sim;
      const next = dropPins(temps, dropped);
      if (next.some((d, i) => d !== dropped[i])) {
        dropped = next;
        const n = next.filter(Boolean).length;
        results[material] = { count: n, at: Math.round(clock) };
      }
    });
  });

  function reset() {
    flame = false;
    temps = coldRod();
    dropped = PINS.map(() => false);
    clock = 0;
  }

  /** @param {string | number} v */
  function pick(v) {
    material = String(v);
    reset();
  }

  const feedback = $derived.by(() => {
    const m = rod(material);
    if (!flame && clock === 0)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: `Thanh ${m.label.toLowerCase()} có ${PINS.length} đinh gắn sáp. Bấm "Đốt đầu A" và quan sát thứ tự các đinh rơi.`,
      };
    if (count === 0)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: `Đầu A đang được đốt nóng (${formatNumber(Math.round(clock))} s). Năng lượng nhiệt đang truyền dần dọc theo thanh ${m.label.toLowerCase()}...`,
      };
    const order =
      count === PINS.length
        ? `Cả ${PINS.length} đinh đã rơi`
        : `Đã rơi ${count}/${PINS.length} đinh`;
    const why = m.metal
      ? `${m.label} là kim loại, dẫn nhiệt tốt.`
      : 'Thủy tinh dẫn nhiệt kém: năng lượng nhiệt truyền đi rất chậm, chỉ phần gần ngọn lửa nóng lên.';
    return {
      tone: /** @type {'ok' | 'info'} */ ('ok'),
      text: `${order}, lần lượt từ đầu A (gần ngọn lửa) tới đầu B: năng lượng nhiệt được truyền từ phần nóng sang phần lạnh hơn của thanh nhờ va chạm giữa các hạt (sự dẫn nhiệt). ${why}`,
    };
  });
</script>

<div class="space-y-3">
  <figure class="{card} p-2">
    <svg
      viewBox="0 0 360 170"
      class="mx-auto block w-full max-w-lg"
      role="img"
      aria-label="Thanh {rod(material).label.toLowerCase()} AB nằm ngang, đầu A {flame
        ? 'đang được đốt bằng đèn cồn'
        : 'không được đốt'}; {count} trên {PINS.length} đinh gắn sáp đã rơi."
    >
      <rect x="0" y={TABLE + 2} width="360" height="16" fill="#e7e5e4" />
      <line x1="344" y1={TABLE + 2} x2="344" y2={ROD_Y - 10} stroke="#57534e" stroke-width="4" />
      <line x1="330" y1={ROD_Y} x2="344" y2={ROD_Y} stroke="#57534e" stroke-width="6" />
      {#each temps as t, i (i)}
        <rect
          x={XA + i * cellW}
          y={ROD_Y - 6}
          width={cellW + 0.5}
          height="12"
          fill={heatColor(t)}
        />
      {/each}
      <rect
        x={XA}
        y={ROD_Y - 6}
        width={XB - XA}
        height="12"
        fill="none"
        stroke="#334155"
        stroke-width="1"
      />
      <text x={XA - 6} y={ROD_Y - 10} text-anchor="end" class="fill-slate-700 text-[13px] font-bold"
        >A</text
      >
      <text x={XB + 2} y={ROD_Y - 10} class="fill-slate-700 text-[13px] font-bold">B</text>
      {#each PINS as cell, i (cell)}
        {@const x = cellX(cell)}
        {@const y = dropped[i] ? TABLE - 4 : ROD_Y + 6}
        <g
          style:transform="translate({x}px, {y}px) rotate({dropped[i] ? 80 : 0}deg)"
          style:transition={still ? null : 'transform 0.6s ease-in'}
        >
          <circle cx="0" cy="3" r="4" fill="#fde68a" stroke="#ca8a04" stroke-width="0.8" />
          <line x1="0" y1="6" x2="0" y2="26" stroke="#475569" stroke-width="2" />
        </g>
      {/each}
      {#if flame}
        <path
          d="M{XA + 4} {ROD_Y + 10} q-10 18 0 32 q10 -14 0 -32"
          fill="#f97316"
          class={still ? '' : 'flicker'}
        />
        <path d="M{XA + 4} {ROD_Y + 22} q-5 10 0 18 q5 -8 0 -18" fill="#fde047" />
      {/if}
      <rect
        x={XA - 10}
        y={ROD_Y + 44}
        width="28"
        height="22"
        rx="4"
        fill="#bae6fd"
        stroke="#0369a1"
      />
      <text x={XA + 4} y={ROD_Y + 80} text-anchor="middle" class="fill-slate-600 text-[10px]"
        >đèn cồn</text
      >
    </svg>
  </figure>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <SegmentedControl
    label="Vật liệu của thanh"
    options={RODS.map((r) => ({ value: r.id, label: r.label }))}
    value={material}
    onchange={pick}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={flame ? button.secondary : button.primary}
      onclick={() => (flame = !flame)}
    >
      {flame ? 'Tắt đèn cồn' : 'Đốt đầu A'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  {#if Object.keys(results).length > 0}
    <div class="{card} p-3 text-sm">
      <p class="mb-1 font-semibold text-slate-700">Kết quả đã đo</p>
      <ul class="space-y-0.5">
        {#each RODS.filter((r) => results[r.id]) as r (r.id)}
          <li>
            {r.label}: {results[r.id].count}/{PINS.length} đinh rơi; đinh thứ {results[r.id].count}
            rơi sau khoảng {formatNumber(results[r.id].at)} s
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .flicker {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: flicker 0.35s ease-in-out infinite alternate;
  }
  @keyframes flicker {
    from {
      transform: scaleY(0.9);
    }
    to {
      transform: scaleY(1.08);
    }
  }
</style>
