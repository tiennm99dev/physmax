<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { ROOM, WAX_MELT, convecting, heatColor, tubeStep } from './engine.js';

  /** @typedef {import('./engine.js').FlameAt} FlameAt */

  /** Model seconds per real second. */
  const SPEED = 3;
  const CX = 150;
  const TOP = 24;
  const BOTTOM = 196;
  const MID = (TOP + BOTTOM) / 2;
  const HALF = 26;
  const GRAINS = 12;

  let at = $state(/** @type {FlameAt} */ ('day'));
  let heating = $state(false);
  let tube = $state.raw({ top: ROOM, bottom: ROOM });
  let waxTop = $state(false);
  let waxBottom = $state(false);
  /** Phase of each dye grain round its loop, 0 to 1. */
  let phase = $state.raw(Array.from({ length: GRAINS }, (_, i) => i / GRAINS));

  const still = reducedMotion();
  const flowing = $derived(convecting(tube));
  const busy = $derived(heating || tube.top > ROOM + 0.2 || tube.bottom > ROOM + 0.2);

  $effect(() => {
    if (!busy) return;
    return frameLoop((dt) => {
      const sim = dt * SPEED;
      tube = tubeStep(tube, sim, { heating, at });
      if (tube.top >= WAX_MELT) waxTop = true;
      if (tube.bottom >= WAX_MELT) waxBottom = true;
      if (!still && convecting(tube)) {
        const v = Math.min(0.12, 0.03 * (tube.bottom - tube.top)) * dt;
        phase = phase.map((p) => (p + v) % 1);
      }
    });
  });

  /**
   * Where a dye grain sits: up the middle over the flame, out along the top,
   * down a side and back along the bottom. Even grains use the right loop.
   * @param {number} p
   * @param {number} i
   */
  function grain(p, i) {
    const side = i % 2 === 0 ? 1 : -1;
    const lo = BOTTOM - 14;
    const hi = TOP + 30;
    const x0 = CX + side * 5;
    const x1 = CX + side * (HALF - 7);
    if (p < 0.4) return { x: x0, y: lo - ((lo - hi) * p) / 0.4 };
    if (p < 0.5) return { x: x0 + ((x1 - x0) * (p - 0.4)) / 0.1, y: hi };
    if (p < 0.9) return { x: x1, y: hi + ((lo - hi) * (p - 0.5)) / 0.4 };
    return { x: x1 + ((x0 - x1) * (p - 0.9)) / 0.1, y: lo };
  }

  function reset() {
    heating = false;
    tube = { top: ROOM, bottom: ROOM };
    waxTop = false;
    waxBottom = false;
  }

  /** @param {string | number} v */
  function place(v) {
    at = /** @type {FlameAt} */ (v);
    reset();
  }

  const flameY = $derived(at === 'day' ? BOTTOM + 8 : TOP + 52);

  const feedback = $derived.by(() => {
    if (!heating && tube.top < ROOM + 0.5 && tube.bottom < ROOM + 0.5)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: 'Ống nghiệm đựng nước có rắc vài hạt thuốc tím, một viên sáp ở miệng ống và một viên sáp ở đáy ống. Chọn chỗ đun rồi bấm "Đun".',
      };
    if (at === 'day')
      return {
        tone: /** @type {'ok' | 'info'} */ ('ok'),
        text: flowing
          ? `Đun ở đáy: lớp nước dưới nóng lên, nở ra, nhẹ hơn nên đi lên; lớp nước lạnh ở trên nặng hơn đi xuống thế chỗ, tạo thành dòng đối lưu (thấy rõ qua các hạt thuốc tím). Nước trên và dưới cùng nóng lên nhanh${waxTop ? '; viên sáp ở miệng ống đã chảy' : ''}.`
          : 'Đun ở đáy: chờ một chút để lớp nước dưới nóng lên...',
      };
    return {
      tone: /** @type {'ok' | 'info'} */ ('info'),
      text: `Đun ở gần miệng ống: nước nóng ở trên nhẹ hơn nên vẫn nằm ở trên, không có dòng đối lưu. Nước lại dẫn nhiệt kém, nên đáy ống hầu như vẫn lạnh (${formatFixed(tube.bottom, 1)} °C)${waxTop ? ' dù viên sáp ở miệng ống đã chảy' : ''}; viên sáp ở đáy ${waxBottom ? 'đã chảy' : 'vẫn chưa chảy'}.`,
    };
  });
</script>

<div class="space-y-3">
  <figure class="{card} p-2">
    <svg
      viewBox="0 0 300 240"
      class="mx-auto block w-full max-w-sm"
      role="img"
      aria-label="Ống nghiệm đựng nước được đun ở {at === 'day'
        ? 'đáy'
        : 'gần miệng'}; nước phía trên {formatFixed(tube.top, 0)} độ C, phía dưới {formatFixed(
        tube.bottom,
        0,
      )} độ C{flowing ? ', có dòng đối lưu' : ''}."
    >
      <rect
        x={CX - HALF}
        y={TOP + 10}
        width={HALF * 2}
        height={MID - TOP - 10}
        fill={heatColor(tube.top, 100)}
      />
      <rect
        x={CX - HALF}
        y={MID}
        width={HALF * 2}
        height={BOTTOM - MID}
        fill={heatColor(tube.bottom, 100)}
      />
      {#if flowing}
        <g stroke="#7c3aed" stroke-width="1.5" fill="none" opacity="0.6">
          <path d="M{CX} {BOTTOM - 20} L{CX} {TOP + 34}" marker-end="url(#dl-arrow)" />
          <path
            d="M{CX + HALF - 8} {TOP + 40} L{CX + HALF - 8} {BOTTOM - 22}"
            marker-end="url(#dl-arrow)"
          />
          <path
            d="M{CX - HALF + 8} {TOP + 40} L{CX - HALF + 8} {BOTTOM - 22}"
            marker-end="url(#dl-arrow)"
          />
        </g>
      {/if}
      <defs>
        <marker
          id="dl-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" fill="#7c3aed" />
        </marker>
      </defs>
      {#each phase as p, i (i)}
        {@const g = flowing
          ? grain(p, i)
          : { x: CX + ((i % 4) - 1.5) * 9, y: BOTTOM - 8 - Math.floor(i / 4) * 5 }}
        <circle cx={g.x} cy={g.y} r="2.6" fill="#7e22ce" />
      {/each}
      <!-- wax beads -->
      <ellipse
        cx={CX}
        cy={TOP + 18}
        rx={waxTop ? 10 : 7}
        ry={waxTop ? 2 : 5}
        fill="#fde68a"
        stroke="#ca8a04"
      />
      <ellipse
        cx={CX}
        cy={BOTTOM - 4}
        rx={waxBottom ? 10 : 7}
        ry={waxBottom ? 2 : 5}
        fill="#fde68a"
        stroke="#ca8a04"
      />
      <path
        d="M{CX - HALF} {TOP} L{CX - HALF} {BOTTOM - 4} Q{CX - HALF} {BOTTOM + 6} {CX} {BOTTOM +
          6} Q{CX + HALF} {BOTTOM + 6} {CX + HALF} {BOTTOM - 4} L{CX + HALF} {TOP}"
        fill="none"
        stroke="#475569"
        stroke-width="2.5"
      />
      {#if heating}
        <g transform="translate({at === 'day' ? CX : CX + HALF + 4} {flameY})">
          <path
            d="M0 0 q-9 16 0 28 q9 -12 0 -28"
            fill="#f97316"
            transform={at === 'day' ? '' : 'rotate(-90)'}
          />
        </g>
      {/if}
      <text x={CX + HALF + 10} y={TOP + 22} class="fill-slate-700 text-[11px]"
        >trên: {formatFixed(tube.top, 1)} °C</text
      >
      <text x={CX + HALF + 10} y={BOTTOM - 6} class="fill-slate-700 text-[11px]"
        >dưới: {formatFixed(tube.bottom, 1)} °C</text
      >
      <text x={CX - HALF - 6} y={TOP + 22} text-anchor="end" class="fill-slate-600 text-[10px]"
        >sáp</text
      >
      <text x={CX - HALF - 6} y={BOTTOM - 2} text-anchor="end" class="fill-slate-600 text-[10px]"
        >sáp</text
      >
    </svg>
  </figure>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <SegmentedControl
    label="Chỗ đun"
    options={[
      { value: 'day', label: 'Đun ở đáy ống' },
      { value: 'mieng', label: 'Đun ở gần miệng ống' },
    ]}
    value={at}
    onchange={place}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={heating ? button.secondary : button.primary}
      onclick={() => (heating = !heating)}
    >
      {heating ? 'Tắt lửa' : 'Đun'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
</div>
