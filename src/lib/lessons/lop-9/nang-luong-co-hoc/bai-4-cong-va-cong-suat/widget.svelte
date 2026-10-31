<script>
  import { onDestroy } from 'svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { BRICK, compare, liftAt } from './engine.js';

  /** Simulated seconds per real second, so a 2-minute lift plays in 12 s. */
  const SPEED = 10;
  const W = 360;
  const H = 230;
  const GROUND = 210;
  const TOP = 52;

  let height = $state(4);
  let anBricks = $state(10);
  let anTime = $state(50);
  let binhBricks = $state(15);
  let binhTime = $state(60);
  let guess = $state('');
  let elapsed = $state(0);
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const an = $derived(liftAt({ bricks: anBricks, time: anTime }, height, elapsed));
  const binh = $derived(liftAt({ bricks: binhBricks, time: binhTime }, height, elapsed));
  const both = $derived(an.finished && binh.finished);
  const result = $derived(compare(an, binh));
  const longest = $derived(Math.max(anTime, binhTime));

  function halt() {
    stop?.();
    stop = null;
    running = false;
  }
  onDestroy(halt);

  function go() {
    halt();
    if (both || elapsed > 0) elapsed = 0;
    if (reducedMotion()) {
      elapsed = longest;
      return;
    }
    running = true;
    stop = frameLoop((dt) => {
      elapsed = Math.min(longest, elapsed + dt * SPEED);
      if (elapsed >= longest) halt();
    });
  }
  function changed() {
    halt();
    elapsed = 0;
  }

  const people = $derived([
    { key: 'an', name: 'An', s: an, time: anTime, x: 100, color: '#0284c7' },
    { key: 'binh', name: 'Bình', s: binh, time: binhTime, x: 250, color: '#e11d48' },
  ]);
  const scaleY = $derived((GROUND - TOP) / height);

  const J = (/** @type {number} */ v) => `${formatNumber(v, 1)} J`;
  const Wt = (/** @type {number} */ v) => `${formatNumber(v, 2)} W`;
  /** @param {string} who */
  const nameOf = (who) => (who === 'a' ? 'An' : 'Bình');

  const feedback = $derived.by(() => {
    if (!both) {
      if (elapsed === 0) {
        return guess
          ? 'Nhấn "Bắt đầu kéo" để kiểm tra dự đoán.'
          : 'Chọn số viên gạch và thời gian của mỗi bạn, dự đoán ai làm việc khoẻ hơn, rồi nhấn "Bắt đầu kéo".';
      }
      return 'Đang kéo: công thực hiện được tăng dần theo độ cao của thùng gạch.';
    }
    const workText =
      result.moreWork === 'equal'
        ? `Hai bạn thực hiện công bằng nhau (${J(an.work)}).`
        : `${nameOf(result.moreWork)} thực hiện công lớn hơn: An ${J(an.work)}, Bình ${J(binh.work)}.`;
    const powerText =
      result.morePower === 'equal'
        ? `Công suất của hai bạn bằng nhau (${Wt(an.power)}): làm việc khoẻ như nhau.`
        : `Công suất của An là ${Wt(an.power)}, của Bình là ${Wt(binh.power)}: ${nameOf(result.morePower)} làm việc khoẻ hơn.`;
    const note =
      result.moreWork !== 'equal' &&
      result.morePower !== 'equal' &&
      result.moreWork !== result.morePower
        ? ' Người thực hiện công lớn hơn chưa chắc làm việc khoẻ hơn: phải so sánh công thực hiện trong cùng một giây.'
        : '';
    const answer = guess === 'a' ? 'An' : guess === 'b' ? 'Bình' : 'như nhau';
    const verdict = guess
      ? (guess === 'equal' ? result.morePower === 'equal' : guess === result.morePower)
        ? ` Dự đoán "${answer}" của em đúng.`
        : ` Dự đoán "${answer}" của em chưa đúng.`
      : '';
    return `${workText} ${powerText}${note}${verdict}`;
  });
</script>

<div class="space-y-4">
  <SliderField
    label="Độ cao đưa gạch lên h"
    bind:value={height}
    min={2}
    max={10}
    step={1}
    unit="m"
    oninput={changed}
  />
  <div class="grid gap-4 sm:grid-cols-2">
    <div class="space-y-2 rounded-xl bg-sky-50 p-3">
      <p class="font-semibold text-sky-800">An</p>
      <SliderField
        label="Số viên gạch của An (mỗi viên {BRICK} N)"
        bind:value={anBricks}
        min={1}
        max={20}
        oninput={changed}
      />
      <SliderField
        label="Thời gian kéo của An"
        bind:value={anTime}
        min={10}
        max={120}
        step={5}
        unit="s"
        oninput={changed}
      />
    </div>
    <div class="space-y-2 rounded-xl bg-rose-50 p-3">
      <p class="font-semibold text-rose-800">Bình</p>
      <SliderField
        label="Số viên gạch của Bình (mỗi viên {BRICK} N)"
        bind:value={binhBricks}
        min={1}
        max={20}
        oninput={changed}
      />
      <SliderField
        label="Thời gian kéo của Bình"
        bind:value={binhTime}
        min={10}
        max={120}
        step={5}
        unit="s"
        oninput={changed}
      />
    </div>
  </div>

  <SegmentedControl
    label="Dự đoán: ai làm việc khoẻ hơn?"
    options={[
      { value: 'a', label: 'An' },
      { value: 'b', label: 'Bình' },
      { value: 'equal', label: 'Như nhau' },
    ]}
    bind:value={guess}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Thùng gạch của An ở độ cao {formatFixed(
        an.h,
        1,
      )} m, của Bình ở độ cao {formatFixed(binh.h, 1)} m, sau {formatNumber(elapsed, 0)} giây."
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#d6d3d1" />
      <text x="4" y="12" class="fill-stone-600 text-[11px]"
        >Thanh xám: sàn tầng trên, cao {height} m</text
      >
      {#each people as p (p.key)}
        {@const y = GROUND - p.s.h * scaleY}
        <rect x={p.x + 28} y={TOP} width="44" height="6" fill="#78716c" />
        <circle cx={p.x} cy={TOP - 30} r="10" fill="none" stroke="#475569" stroke-width="3" />
        <line x1={p.x + 10} y1={TOP - 30} x2={p.x + 10} y2={y - 22} stroke="#475569" />
        <line x1={p.x - 10} y1={TOP - 30} x2={p.x - 10} y2={GROUND - 30} stroke="#475569" />
        <rect x={p.x - 6} y={y - 22} width="32" height="22" rx="3" fill={p.color} />
        <text x={p.x + 10} y={y - 7} text-anchor="middle" class="fill-white text-[10px] font-bold"
          >{p.key === 'an' ? anBricks : binhBricks}</text
        >
        <circle cx={p.x - 22} cy={GROUND - 40} r="6" fill="#fdba74" />
        <line
          x1={p.x - 22}
          y1={GROUND - 34}
          x2={p.x - 22}
          y2={GROUND - 14}
          stroke="#334155"
          stroke-width="3"
        />
        <line
          x1={p.x - 22}
          y1={GROUND - 28}
          x2={p.x - 10}
          y2={GROUND - 32}
          stroke="#334155"
          stroke-width="2"
        />
        <line
          x1={p.x - 22}
          y1={GROUND - 14}
          x2={p.x - 28}
          y2={GROUND}
          stroke="#334155"
          stroke-width="2"
        />
        <line
          x1={p.x - 22}
          y1={GROUND - 14}
          x2={p.x - 16}
          y2={GROUND}
          stroke="#334155"
          stroke-width="2"
        />
        <text x={p.x - 22} y={GROUND + 14} text-anchor="middle" class="fill-slate-700 text-[11px]"
          >{p.name}</text
        >
      {/each}
    </svg>
  </figure>

  <div class="flex flex-wrap items-center gap-2">
    <button type="button" class={button.primary} onclick={go} disabled={running}
      >{both ? 'Kéo lại' : 'Bắt đầu kéo'}</button
    >
    <span class="text-sm tabular-nums text-slate-600">Thời gian: {formatNumber(elapsed, 0)} s</span>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full min-w-80 text-center text-sm tabular-nums">
      <thead>
        <tr class="border-b border-slate-300 text-slate-600">
          <th scope="col" class="py-1 text-left">Bạn</th>
          <th scope="col" class="py-1">Lực kéo F</th>
          <th scope="col" class="py-1">Công đã làm</th>
          <th scope="col" class="py-1">Thời gian t</th>
          <th scope="col" class="py-1">Công suất</th>
        </tr>
      </thead>
      <tbody>
        {#each people as p (p.key)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 text-left font-semibold">{p.name}</th>
            <td class="py-1">{formatNumber(p.s.force, 0)} N</td>
            <td class="py-1">{J(p.s.workSoFar)}</td>
            <td class="py-1">{p.time} s</td>
            <td class="py-1">{p.s.finished ? Wt(p.s.power) : '…'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="mt-1 text-xs text-slate-500">
      Kéo đều nên lực kéo F bằng trọng lượng gạch; công A = F · s với s = h; công suất bằng công
      chia cho thời gian.
    </p>
  </div>

  <FeedbackNote tone={both ? 'ok' : 'info'} text={feedback} />
</div>
