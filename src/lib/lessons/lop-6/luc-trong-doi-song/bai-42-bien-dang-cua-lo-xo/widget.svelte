<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { parseNumber } from '#lib/units-engine/format.js';
  import {
    MAX_WEIGHTS,
    SPRINGS,
    STEP_MASS,
    extension,
    lengthOf,
    overLimit,
    proportional,
    readingOk,
  } from './engine.js';

  // Spring stand: 0 cm of the ruler at the hook, 12 px per centimetre.
  const TOP = 34;
  const PX = 12;
  const RULER_CM = 30;
  const SX = 150;
  const RULER_X = 52;
  const TICKS = Array.from({ length: RULER_CM * 2 + 1 }, (_, i) => i / 2);

  // Graph of Δl against m.
  const GW = 320;
  const GH = 210;
  const GL = 44;
  const GB = 34;
  const GT = 14;
  const GR = 12;
  const M_MAX = 350;
  const DL_MAX = 14;

  let springId = $state(SPRINGS[0].id);
  let count = $state(0);
  let damaged = $state(false);
  let typed = $state('');
  /** @type {Array<{ m: number, l: number, dl: number }>} */
  let rows = $state([]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);

  const spring = $derived(SPRINGS.find((s) => s.id === springId) ?? SPRINGS[0]);
  const mass = $derived(count * STEP_MASS);
  const weights = $derived(Array.from({ length: count }, (_, i) => i));
  const l = $derived(lengthOf(spring, mass, damaged));
  const bottom = $derived(TOP + l * PX);
  const fits = $derived(proportional(rows));

  const coil = $derived.by(() => {
    const turns = 14;
    const start = TOP + 10;
    const end = bottom - 10;
    const pts = [`${SX},${TOP}`, `${SX},${start}`];
    for (let i = 1; i < turns * 2; i++) {
      const y = start + ((end - start) * i) / (turns * 2);
      pts.push(`${SX + (i % 2 ? 12 : -12)},${y}`);
    }
    pts.push(`${SX},${end}`, `${SX},${bottom}`);
    return pts.join(' ');
  });

  const cm = (/** @type {number} */ v) => `${formatNumber(v, 2)} cm`;

  function resetSpring() {
    count = 0;
    damaged = false;
    rows = [];
    typed = '';
    note = null;
  }
  function add() {
    if (count >= MAX_WEIGHTS) return;
    count += 1;
    typed = '';
    if (overLimit(spring, count * STEP_MASS)) {
      damaged = true;
      note = {
        tone: 'warn',
        text: `Treo ${count * STEP_MASS} g là quá giới hạn đàn hồi của lò xo (${spring.limit} g): lò xo dãn vọt ra nhiều hơn hẳn. Hãy bỏ các quả nặng ra để xem nó có trở lại như cũ không.`,
      };
    } else {
      note = null;
    }
  }
  function remove() {
    if (count === 0) return;
    count -= 1;
    typed = '';
    note =
      count === 0 && damaged
        ? {
            tone: 'warn',
            text: `Bỏ hết quả nặng nhưng lò xo dài ${cm(l)}, không trở về chiều dài tự nhiên ${cm(spring.l0)}: lò xo đã bị hỏng vì vượt quá giới hạn đàn hồi. Nhấn "Thay lò xo mới".`,
          }
        : null;
  }
  function record() {
    const v = parseNumber(typed.replace(/cm$/i, ''));
    if (Number.isNaN(v)) {
      note = { tone: 'warn', text: 'Hãy nhập chiều dài đọc trên thước, ví dụ 14 hoặc 14,5.' };
      return;
    }
    if (damaged) {
      note = {
        tone: 'warn',
        text: 'Lò xo đã bị kéo quá giới hạn đàn hồi nên số đo không còn dùng được. Hãy thay lò xo mới rồi đo lại.',
      };
      return;
    }
    if (!readingOk(v, l)) {
      note = {
        tone: 'warn',
        text: 'Chưa đúng. Đặt mắt ngang kim chỉ (vạch đỏ) và đọc vạch chia gần nhất trên thước; mỗi vạch nhỏ là 0,5 cm.',
      };
      return;
    }
    const dl = extension(l, spring.l0);
    rows = [...rows.filter((r) => r.m !== mass), { m: mass, l, dl }].sort((a, b) => a.m - b.m);
    typed = '';
    const used = rows.filter((r) => r.m > 0).length;
    note = {
      tone: 'ok',
      text: `Đúng: l = ${cm(l)}, nên độ dãn Δl = ${cm(l)} − ${cm(spring.l0)} = ${cm(dl)}.${
        used >= 2 && proportional(rows)
          ? ' Các điểm trên đồ thị nằm trên một đường thẳng đi qua gốc: độ dãn tỉ lệ với khối lượng vật treo.'
          : used < 3
            ? ' Treo thêm quả nặng và đo tiếp để vẽ đồ thị.'
            : ''
      }`,
    };
  }

  const gx = (/** @type {number} */ m) => GL + (m / M_MAX) * (GW - GL - GR);
  const gy = (/** @type {number} */ d) => GH - GB - (d / DL_MAX) * (GH - GB - GT);
  const slope = $derived.by(() => {
    const first = rows.find((r) => r.m > 0);
    return first ? first.dl / first.m : 0;
  });

  const status = $derived(
    `${spring.name}, chiều dài tự nhiên ${cm(spring.l0)}. Đang treo ${count} quả nặng (${mass} g).`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Lò xo"
      options={SPRINGS.map((s) => ({ value: s.id, label: s.name }))}
      bind:value={springId}
      onchange={resetSpring}
    />
    <p class="self-end text-sm text-slate-600">
      Mỗi quả nặng có khối lượng {STEP_MASS} g. Thước chia đến 0,5 cm, vạch 0 ngang móc treo.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-[minmax(0,15rem)_1fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 220 500"
        class="mx-auto block w-full max-w-[15rem] select-none"
        role="img"
        aria-label="{status} Kim chỉ vạch {formatFixed(l, 1)} cm trên thước."
      >
        <rect x="20" y={TOP - 14} width="180" height="8" rx="3" fill="#475569" />
        <!-- ruler -->
        <rect
          x={RULER_X - 26}
          y={TOP - 6}
          width="34"
          height={RULER_CM * PX + 12}
          fill="#fef9c3"
          stroke="#a16207"
        />
        {#each TICKS as t (t)}
          {@const whole = Number.isInteger(t)}
          <line
            x1={RULER_X + 8}
            y1={TOP + t * PX}
            x2={RULER_X + 8 - (whole ? (t % 5 === 0 ? 14 : 9) : 5)}
            y2={TOP + t * PX}
            stroke="#713f12"
            stroke-width={whole ? 1.2 : 0.8}
          />
          {#if whole && t % 2 === 0}
            <text
              x={RULER_X - 8}
              y={TOP + t * PX + 4}
              text-anchor="end"
              class="fill-amber-900 text-[9px]">{t}</text
            >
          {/if}
        {/each}
        <text
          x={RULER_X - 9}
          y={TOP + RULER_CM * PX + 20}
          text-anchor="middle"
          class="fill-amber-900 text-[9px]">cm</text
        >

        <!-- spring, pointer and weights -->
        <polyline
          points={coil}
          fill="none"
          stroke={damaged ? '#b45309' : '#334155'}
          stroke-width="2.5"
        />
        <line x1={RULER_X + 8} y1={bottom} x2={SX} y2={bottom} stroke="#dc2626" stroke-width="2" />
        <circle cx={SX} cy={bottom} r="3" fill="#dc2626" />
        {#if count > 0}
          <line x1={SX} y1={bottom} x2={SX} y2={bottom + 8} stroke="#334155" stroke-width="2" />
          {#each weights as i (i)}
            <rect
              x={SX - 24}
              y={bottom + 8 + i * 13}
              width="48"
              height="12"
              rx="3"
              fill="#94a3b8"
              stroke="#334155"
            />
            <text
              x={SX}
              y={bottom + 17.5 + i * 13}
              text-anchor="middle"
              class="fill-slate-900 text-[8px] font-semibold">50 g</text
            >
          {/each}
        {/if}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kim chỉ (vạch đỏ) ở đầu dưới lò xo
      </figcaption>
    </figure>

    <div class="min-w-0 space-y-3">
      <div class="{card} space-y-3 p-3">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class={button.secondary}
            disabled={count >= MAX_WEIGHTS}
            onclick={add}>Treo thêm 1 quả nặng</button
          >
          <button type="button" class={button.quiet} disabled={count === 0} onclick={remove}
            >Bỏ bớt 1 quả nặng</button
          >
          {#if damaged}
            <button type="button" class={button.quiet} onclick={resetSpring}>Thay lò xo mới</button>
          {/if}
        </div>
        <p class="text-sm text-slate-700">
          Khối lượng vật treo: <strong>{mass} g</strong>
        </p>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-slate-700"
            >Chiều dài lò xo l đọc trên thước (cm)</span
          >
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
        <button type="button" class={button.primary} onclick={record}>Ghi vào bảng</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-center text-sm tabular-nums">
          <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
            Bảng kết quả (l₀ = {cm(spring.l0)})
          </caption>
          <thead>
            <tr class="bg-slate-100">
              <th class="px-2 py-1">m (g)</th>
              <th class="px-2 py-1">l (cm)</th>
              <th class="px-2 py-1">Δl = l − l₀ (cm)</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as r (r.m)}
              <tr class="border-b border-slate-100">
                <td class="px-2 py-1">{r.m}</td>
                <td class="px-2 py-1">{formatNumber(r.l, 2)}</td>
                <td class="px-2 py-1">{formatNumber(r.dl, 2)}</td>
              </tr>
            {:else}
              <tr><td colspan="3" class="px-2 py-2 text-slate-500">Chưa có số đo nào.</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <figure class="{card} p-2">
    <svg
      viewBox="0 0 {GW} {GH}"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Đồ thị độ dãn theo khối lượng: {rows.length} điểm đã ghi{fits
        ? ', nằm trên một đường thẳng qua gốc'
        : ''}."
    >
      {#each [0, 50, 100, 150, 200, 250, 300, 350] as m (m)}
        <line x1={gx(m)} y1={GT} x2={gx(m)} y2={GH - GB} stroke="#f1f5f9" />
        <text x={gx(m)} y={GH - GB + 14} text-anchor="middle" class="fill-slate-600 text-[9px]"
          >{m}</text
        >
      {/each}
      {#each [0, 2, 4, 6, 8, 10, 12, 14] as d (d)}
        <line x1={GL} y1={gy(d)} x2={GW - GR} y2={gy(d)} stroke="#f1f5f9" />
        <text x={GL - 6} y={gy(d) + 3} text-anchor="end" class="fill-slate-600 text-[9px]">{d}</text
        >
      {/each}
      <line x1={GL} y1={GH - GB} x2={GW - GR} y2={GH - GB} stroke="#334155" />
      <line x1={GL} y1={GT} x2={GL} y2={GH - GB} stroke="#334155" />
      <text x={(GL + GW) / 2} y={GH - 4} text-anchor="middle" class="fill-slate-700 text-[10px]"
        >m (g)</text
      >
      <text x={GL + 6} y={GT + 2} class="fill-slate-700 text-[10px]">Δl (cm)</text>
      {#if fits}
        {@const mEnd = Math.min(M_MAX, DL_MAX / slope)}
        <line
          x1={gx(0)}
          y1={gy(0)}
          x2={gx(mEnd)}
          y2={gy(slope * mEnd)}
          stroke="#6366f1"
          stroke-dasharray="5 4"
          stroke-width="1.5"
        />
      {/if}
      {#each rows as r (r.m)}
        <circle cx={gx(r.m)} cy={gy(r.dl)} r="4" fill="#dc2626" />
      {/each}
    </svg>
  </figure>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {note?.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : note?.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {note ? note.text : `${status} Đọc chiều dài l rồi ghi vào bảng.`}
  </p>
</div>
