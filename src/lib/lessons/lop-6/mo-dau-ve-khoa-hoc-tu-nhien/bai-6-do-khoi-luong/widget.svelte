<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { parseNumber } from '#lib/units-engine/format.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import {
    SCALES,
    THINGS,
    judge,
    pressZero,
    shown,
    suitability,
    toDivision,
    turnScrew,
  } from './engine.js';

  // Dial face: 0 g at the lower left, the range at the lower right, 300° apart.
  const CX = 150;
  const CY = 160;
  const R = 112;
  const SWEEP = 300;

  // Zoom strip around the needle tip: 3 px per gram.
  const ZW = 480;
  const ZH = 110;
  const ZC = 240;
  const ZPX = 3;

  let thingId = $state('tao');
  /** @type {import('./engine.js').ScaleId} */
  let scaleId = $state('dong-ho');
  let zero = $state(SCALES[0].startZero);
  let placed = $state(false);
  let typed = $state('');
  /** @type {import('./engine.js').Verdict | 'chua-nhap' | null} */
  let verdict = $state(null);

  const thing = $derived(THINGS.find((t) => t.id === thingId) ?? THINGS[0]);
  const scale = $derived(SCALES.find((s) => s.id === scaleId) ?? SCALES[0]);
  const load = $derived(placed ? thing.mass : 0);
  const value = $derived(shown(scale, load, zero));
  const isDial = $derived(scale.id === 'dong-ho');

  /** @param {number} v grams → angle in degrees clockwise from 12 o'clock */
  const angleOf = (v) => -SWEEP / 2 + (SWEEP * v) / scale.range;
  /** @param {number} deg @param {number} r */
  const at = (deg, r) => {
    const a = (deg * Math.PI) / 180;
    return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
  };

  // The needle stops at the end of the scale when overloaded and a little below 0.
  const needleValue = $derived(
    value === null ? scale.range + scale.range / 60 : Math.max(-scale.range / 60, value),
  );
  const tip = $derived(at(angleOf(needleValue), R - 14));

  const dialMarks = $derived.by(() => {
    const out = [];
    for (let g = 0; g <= scale.range; g += 100) out.push(g);
    return out;
  });
  const zoomMarks = $derived.by(() => {
    const out = [];
    const from = Math.max(0, Math.ceil((needleValue - 80) / 20) * 20);
    for (let g = from; g <= Math.min(scale.range, needleValue + 80); g += 20) out.push(g);
    return out;
  });

  function resetFor() {
    placed = false;
    verdict = null;
  }
  /** @param {string | number} id */
  function changeScale(id) {
    const s = SCALES.find((x) => x.id === id) ?? SCALES[0];
    zero = s.startZero;
    typed = '';
    resetFor();
  }
  /** @param {number} turns */
  function screw(turns) {
    zero = turnScrew(zero, turns);
    verdict = null;
  }
  function tare() {
    // An overloaded balance cannot be zeroed: it keeps showing O-Ld.
    if (value !== null) zero = pressZero(zero, load);
    verdict = null;
  }
  function togglePlace() {
    placed = !placed;
    verdict = null;
  }
  function record() {
    const v = parseNumber(typed.replace(/g$/i, ''));
    if (Number.isNaN(v)) {
      verdict = 'chua-nhap';
      return;
    }
    verdict = judge({ thing, scale, zero, placed, typed: v });
  }

  const g = (/** @type {number} */ v) => `${formatNumber(v, 1)} g`;
  const display = $derived(value === null ? 'O-Ld' : formatFixed(value, 1));
  const better = $derived(SCALES.find((s) => suitability(s, thing.mass) === 'phu-hop'));
  const status = $derived.by(() => {
    if (isDial) {
      if (value === null) return 'Kim chạm hết thang đo.';
      return placed
        ? 'Vật đang nằm trên đĩa cân.'
        : zero === 0
          ? 'Đĩa cân trống, kim chỉ đúng vạch 0.'
          : `Đĩa cân trống nhưng kim đang chỉ ${g(zero)}, chưa đúng vạch 0.`;
    }
    if (value === null) return 'Màn hình báo quá tải (O-Ld).';
    return `Màn hình hiện ${display} g.`;
  });

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    switch (verdict) {
      case null:
        return {
          tone: 'info',
          text: `${status} Chọn cân, đưa số chỉ về 0 khi đĩa cân còn trống, đặt vật lên đĩa, rồi đọc và ghi kết quả.`,
        };
      case 'chua-nhap':
        return { tone: 'warn', text: 'Hãy nhập kết quả đo bằng gam, ví dụ 186,4.' };
      case 'chua-dat':
        return { tone: 'warn', text: 'Chưa có vật trên đĩa cân. Hãy đặt vật lên đĩa rồi mới đọc.' };
      case 'qua-tai':
        return {
          tone: 'warn',
          text: `${thing.name} nặng hơn GHĐ ${g(scale.range)} của cân này: cân bị quá tải, không đo được và có thể hỏng cân. Hãy chọn cân có GHĐ lớn hơn.`,
        };
      case 'chua-chinh-0':
        return {
          tone: 'warn',
          text: isDial
            ? `Khi đĩa trống, kim không chỉ vạch 0 mà chỉ ${g(zero)}, nên số đọc bị sai đúng chừng ấy. Nhấc vật xuống, vặn ốc điều chỉnh cho kim chỉ đúng vạch 0 rồi cân lại.`
            : 'Cân chưa được đưa về 0 khi đĩa còn trống, nên số hiện trên màn hình không phải khối lượng của vật. Nhấc vật xuống, nhấn nút về 0 rồi cân lại.',
        };
      case 'sai-so':
        return {
          tone: 'warn',
          text: isDial
            ? `Kết quả chưa đúng. Đọc vạch chia gần nhất với đầu kim; với cân này kết quả là bội của ĐCNN ${g(scale.division)}.`
            : 'Kết quả chưa đúng. Đọc đúng số hiện trên màn hình khi số đã ổn định.',
        };
      case 'tho':
        return {
          tone: 'info',
          text: `Đúng với cân này: ${g(toDivision(thing.mass, scale.division))}. Nhưng ĐCNN ${g(scale.division)} quá lớn so với vật; ${better ? better.name.split(':')[0].toLowerCase() : 'cân khác'} đo chính xác hơn.`,
        };
      case 'dung':
        return {
          tone: 'ok',
          text: `Chính xác! ${thing.name} có khối lượng ${g(toDivision(thing.mass, scale.division))}. Em đã chọn cân phù hợp, chỉnh về 0 trước khi cân và đọc đúng.`,
        };
    }
    return { tone: 'info', text: '' };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật cần cân"
      options={THINGS.map((t) => ({ value: t.id, label: t.name }))}
      bind:value={thingId}
      onchange={resetFor}
    />
    <div>
      <SegmentedControl
        label="Cân"
        options={SCALES.map((s) => ({ value: s.id, label: s.name.split(':')[0] }))}
        bind:value={scaleId}
        onchange={changeScale}
      />
      <p class="mt-1 text-sm text-slate-600">{scale.name}</p>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 300 300"
        class="mx-auto block w-full max-w-xs select-none"
        role="img"
        aria-label="{scale.name.split(':')[0]}{placed
          ? `, trên đĩa có ${thing.name.toLowerCase()}`
          : ', đĩa trống'}. {status}"
      >
        <!-- pan and the thing on it -->
        {#if placed}
          <rect
            x="96"
            y={isDial ? 0 : 92}
            width="108"
            height="30"
            rx="10"
            fill="#fde68a"
            stroke="#a16207"
          />
          <text
            x="150"
            y={isDial ? 20 : 112}
            text-anchor="middle"
            class="fill-amber-900 text-[12px] font-semibold">{thing.name}</text
          >
        {/if}
        {#if isDial}
          <rect x="70" y="30" width="160" height="10" rx="5" fill="#94a3b8" />
          <rect x="140" y="38" width="20" height="12" fill="#64748b" />
          <circle cx={CX} cy={CY} r={R + 10} fill="#e2e8f0" stroke="#475569" stroke-width="3" />
          <circle cx={CX} cy={CY} r={R} fill="#fff" stroke="#94a3b8" />
          {#each dialMarks as m (m)}
            {@const big = m % 500 === 0}
            {@const p1 = at(angleOf(m), R)}
            {@const p2 = at(angleOf(m), R - (big ? 14 : 7))}
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#334155"
              stroke-width={big ? 2 : 1}
            />
            {#if big}
              {@const pl = at(angleOf(m), R - 28)}
              <text
                x={pl.x}
                y={pl.y + 4}
                text-anchor="middle"
                class="fill-slate-700 text-[12px] font-semibold">{formatNumber(m / 1000, 1)}</text
              >
            {/if}
          {/each}
          <text x={CX} y={CY + 50} text-anchor="middle" class="fill-slate-500 text-[12px]">kg</text>
          <line
            x1={CX}
            y1={CY}
            x2={tip.x}
            y2={tip.y}
            stroke="#dc2626"
            stroke-width="3"
            stroke-linecap="round"
          />
          <circle cx={CX} cy={CY} r="7" fill="#334155" />
        {:else}
          <rect x="60" y="122" width="180" height="10" rx="5" fill="#94a3b8" />
          <rect x="30" y="140" width="240" height="120" rx="14" fill="#e2e8f0" stroke="#475569" />
          <rect x="60" y="160" width="180" height="56" rx="6" fill="#1e293b" />
          <text
            x="226"
            y="200"
            text-anchor="end"
            class="text-[30px] font-bold tabular-nums"
            fill="#4ade80">{display}</text
          >
          <text x="232" y="232" text-anchor="end" class="fill-slate-600 text-[12px] font-semibold"
            >g</text
          >
        {/if}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">{status}</figcaption>
    </figure>

    <div class="space-y-3">
      {#if isDial}
        <figure class="{card} overflow-hidden p-2">
          <svg
            viewBox="0 0 {ZW} {ZH}"
            class="w-full"
            role="img"
            aria-label="Phóng to mặt cân ở đầu kim, số ghi là gam"
          >
            <rect x="0" y="20" width={ZW} height="80" fill="#fff" />
            {#each zoomMarks as m (m)}
              {@const x = ZC + (m - needleValue) * ZPX}
              <line
                x1={x}
                y1="20"
                x2={x}
                y2={m % 100 === 0 ? 56 : 42}
                stroke="#334155"
                stroke-width={m % 100 === 0 ? 2.5 : 1.2}
              />
              {#if m % 100 === 0}
                <text
                  {x}
                  y="84"
                  text-anchor="middle"
                  class="fill-slate-800 text-[18px] font-semibold">{formatNumber(m, 0)}</text
                >
              {/if}
            {/each}
            <polygon points="{ZC},48 {ZC - 7},4 {ZC + 7},4" fill="#dc2626" />
          </svg>
          <figcaption class="px-2 text-xs text-slate-600">
            Phóng to mặt cân ở đầu kim (số ghi là gam, mắt nhìn vuông góc)
          </figcaption>
        </figure>
      {/if}

      <div class="{card} space-y-3 p-3">
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.secondary} onclick={togglePlace}>
            {placed ? 'Nhấc vật xuống' : 'Đặt vật lên đĩa'}
          </button>
          {#if isDial}
            <button
              type="button"
              class={button.quiet}
              disabled={placed}
              onclick={() => screw(-1)}
              aria-label="Vặn ốc điều chỉnh cho kim lùi một vạch">Vặn ốc: kim lùi</button
            >
            <button
              type="button"
              class={button.quiet}
              disabled={placed}
              onclick={() => screw(1)}
              aria-label="Vặn ốc điều chỉnh cho kim tiến một vạch">Vặn ốc: kim tiến</button
            >
          {:else}
            <button type="button" class={button.quiet} onclick={tare}>Nút về 0</button>
          {/if}
        </div>
        {#if isDial && placed}
          <p class="text-xs text-slate-600">Nhấc vật xuống thì mới chỉnh được kim về vạch 0.</p>
        {/if}
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-slate-700">Kết quả đo (g)</span>
          <input
            class={textInput}
            inputmode="decimal"
            autocomplete="off"
            bind:value={typed}
            onkeydown={(e) => {
              if (e.key === 'Enter') record();
            }}
          />
        </label>
        <button type="button" class={button.primary} onclick={record}>Ghi kết quả</button>
      </div>
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
