<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import {
    PAIRS,
    TUBE,
    fallDistance,
    fallSpeed,
    fallTime,
    flashes,
    runNote,
    terminalIn,
  } from './engine.js';

  const SLOW = 5; // the fall is shown five times slower than real time
  const FLASH = 0.1; // seconds between stroboscope positions
  const W = 360;
  const H = 300;
  const TUBE_TOP = 30;
  const TUBE_BOTTOM = 280;
  const LANES = [130, 230];
  const AIR_DOTS = Array.from({ length: 36 }, (_, i) => ({
    x: 96 + ((i * 53) % 168),
    y: 40 + ((i * 97) % 234),
  }));

  let pairId = $state(PAIRS[0].id);
  let medium = $state('air');
  let t = $state(0);
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const pair = $derived(PAIRS.find((p) => p.id === pairId) ?? PAIRS[0]);
  const air = $derived(medium === 'air');
  const rows = $derived(
    pair.bodies.map((body, i) => {
      const terminal = terminalIn(body, air);
      const landing = fallTime(TUBE, terminal);
      const now = Math.min(t, landing);
      const fallen = Math.min(TUBE, fallDistance(now, terminal));
      return {
        body,
        lane: LANES[i],
        y: TUBE_TOP + (fallen / TUBE) * (TUBE_BOTTOM - TUBE_TOP),
        landing,
        landed: t >= landing,
        speed: t >= landing ? 0 : fallSpeed(now, terminal),
        marks: flashes(terminal, FLASH, now),
      };
    }),
  );
  const end = $derived(Math.max(...rows.map((r) => r.landing)));
  const finished = $derived(t >= end);
  const note = $derived(
    finished
      ? runNote(pair, air)
      : 'Chọn cặp vật và môi trường rồi nhấn "Thả cùng lúc". Mỗi dấu chấm là vị trí của vật sau $0{,}1$ s, như ảnh hoạt nghiệm.',
  );

  /** @param {number} fallen */
  const yOf = (fallen) => TUBE_TOP + (fallen / TUBE) * (TUBE_BOTTOM - TUBE_TOP);

  function halt() {
    stopLoop?.();
    stopLoop = null;
    running = false;
  }

  function reset() {
    halt();
    t = 0;
  }

  function drop() {
    halt();
    if (reducedMotion()) {
      t = end;
      return;
    }
    t = 0;
    running = true;
    stopLoop = frameLoop((dt) => {
      t = Math.min(end, t + dt / SLOW);
      if (t >= end) halt();
    });
  }

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Trong ống"
      options={[
        { value: 'air', label: 'Có không khí' },
        { value: 'vacuum', label: 'Hút hết không khí' },
      ]}
      bind:value={medium}
      onchange={reset}
    />
    <SegmentedControl
      label="Cặp vật"
      options={PAIRS.map((p) => ({ value: p.id, label: p.label }))}
      bind:value={pairId}
      onchange={reset}
    />
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label={`Ống ${air ? 'có không khí' : 'đã hút hết không khí'} dài ${formatNumber(TUBE)} mét. ${rows
        .map((r) => `${r.body.name}: ${r.landed ? 'đã chạm đáy' : 'đang rơi'}`)
        .join('. ')}.`}
    >
      <rect
        x="88"
        y="18"
        width="184"
        height="268"
        rx="16"
        fill={air ? '#e0f2fe' : '#f8fafc'}
        stroke="#64748b"
        stroke-width="3"
      />
      {#if air}
        {#each AIR_DOTS as dot, i (i)}
          <circle cx={dot.x} cy={dot.y} r="1.6" fill="#7dd3fc" />
        {/each}
      {/if}
      <line x1="70" x2="82" y1={TUBE_TOP} y2={TUBE_TOP} stroke="#475569" />
      <line x1="70" x2="82" y1={TUBE_BOTTOM} y2={TUBE_BOTTOM} stroke="#475569" />
      <line x1="76" x2="76" y1={TUBE_TOP} y2={TUBE_BOTTOM} stroke="#475569" />
      <text x="66" y={(TUBE_TOP + TUBE_BOTTOM) / 2} font-size="12" fill="#334155" text-anchor="end">
        {`${formatNumber(TUBE)} m`}
      </text>

      {#each rows as row (row.body.id)}
        {#each row.marks as mark, i (i)}
          <circle cx={row.lane - 26} cy={yOf(mark)} r="2.5" fill="#475569" />
          <line
            x1={row.lane - 26}
            x2={row.lane - 12}
            y1={yOf(mark)}
            y2={yOf(mark)}
            stroke="#94a3b8"
            stroke-width="1"
          />
        {/each}
        {#if row.body.shape === 'ball'}
          <circle cx={row.lane} cy={row.y} r="9" fill="#334155" />
        {:else if row.body.shape === 'crumple'}
          <path
            d="M{row.lane - 9} {row.y - 2} L{row.lane - 3} {row.y - 9} L{row.lane + 6} {row.y -
              7} L{row.lane + 10} {row.y + 1} L{row.lane + 4} {row.y + 9} L{row.lane - 6} {row.y +
              7} Z"
            fill="#f1f5f9"
            stroke="#475569"
            stroke-width="1.5"
          />
        {:else if row.body.shape === 'sheet'}
          <rect
            x={row.lane - 20}
            y={row.y - 2}
            width="40"
            height="4"
            fill="#f1f5f9"
            stroke="#475569"
            stroke-width="1.5"
          />
        {:else}
          <path
            d="M{row.lane - 16} {row.y + 6} C{row.lane - 6} {row.y - 8} {row.lane + 8} {row.y -
              8} {row.lane + 18} {row.y - 4} C{row.lane + 8} {row.y + 6} {row.lane - 4} {row.y +
              8} {row.lane - 16} {row.y + 6} Z"
            fill="#c084fc"
            stroke="#7c3aed"
          />
        {/if}
        <text
          x={row.lane}
          y="12"
          font-size="12"
          font-weight="600"
          fill="#334155"
          text-anchor="middle"
        >
          {row.body.name}
        </text>
      {/each}
    </svg>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} disabled={running} onclick={drop}>
      Thả cùng lúc
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
    <span class="text-sm text-slate-600">Hình chiếu chậm {SLOW} lần.</span>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full min-w-72 text-center text-sm tabular-nums">
      <caption class="mb-1 text-left font-semibold text-slate-700">
        {`Thời điểm t = ${formatFixed(t, 2)} s`}
      </caption>
      <thead>
        <tr class="border-b border-slate-300 text-slate-600">
          <th scope="col" class="py-1">Vật</th>
          <th scope="col" class="py-1">Tốc độ lúc này (m/s)</th>
          <th scope="col" class="py-1">Chạm đáy sau (s)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.body.id)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 font-medium">{row.body.name}</th>
            <td class="py-1">{row.landed ? 'đã chạm đáy' : formatFixed(row.speed, 2)}</td>
            <td class="py-1">{row.landed ? formatFixed(row.landing, 2) : '…'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={finished ? 'ok' : 'info'} text={note} />
</div>
