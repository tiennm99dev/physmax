<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { qty } from '#lib/domain/materials.js';
  import { BLOCK_MATERIALS, EDGE, closestMaterial, measure } from './engine.js';

  /** @typedef {import('./engine.js').Reading} Reading */

  const MODES = [
    { value: 'kham-pha', label: 'Chọn chất' },
    { value: 'bi-an', label: 'Khối bí ẩn' },
  ];
  /** Order in which the mystery blocks come up. */
  const MYSTERY = ['nhom', 'dong', 'go', 'sat'];
  const MAX_ROWS = 6;

  let mode = $state('kham-pha');
  let materialId = $state('nhom');
  let mysteryAt = $state(0);
  let a = $state(4);
  let b = $state(3);
  let c = $state(2);
  /** @type {Reading[]} */
  let rows = $state([]);
  let guess = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);

  const mat = $derived(
    BLOCK_MATERIALS.find((m) => m.id === (mode === 'bi-an' ? MYSTERY[mysteryAt] : materialId)) ??
      BLOCK_MATERIALS[0],
  );
  const now = $derived(measure(mat.density, a, b, c));
  const hidden = $derived(mode === 'bi-an');
  const blockName = $derived(hidden ? 'khối bí ẩn' : `khối ${mat.name.toLowerCase()}`);

  const g = (/** @type {number} */ v) => `${qty(v, 1)} g`;
  const cm3 = (/** @type {number} */ v) => `${qty(v)} cm³`;
  const ratioText = (/** @type {number} */ r) => `${qty(r, 2)} g/cm³`;

  function reset() {
    rows = [];
    guess = '';
    note = null;
  }

  function record() {
    const same = rows.some((r) => r.a === a && r.b === b && r.c === c);
    if (same) {
      note = {
        tone: 'warn',
        text: 'Kích thước này đã có trong bảng. Hãy đổi kích thước khối rồi ghi tiếp.',
      };
      return;
    }
    rows = [...rows, now].slice(-MAX_ROWS);
    const n = rows.length;
    note =
      n < 2
        ? {
            tone: 'info',
            text: `Đã ghi lần đo 1: m/V = ${ratioText(now.ratio)}. Đổi kích thước khối rồi ghi thêm để so sánh.`,
          }
        : {
            tone: 'ok',
            text: `${n} khối ${hidden ? 'cùng chất' : mat.name.toLowerCase()} có thể tích và khối lượng khác nhau, nhưng tỉ số m/V lần nào cũng bằng ${ratioText(now.ratio)}: đó là khối lượng riêng của chất làm khối, ${qty(now.ratio * 1000)} kg/m³.`,
          };
  }

  function check() {
    if (!guess) {
      note = { tone: 'warn', text: 'Hãy chọn chất em đoán trước khi kiểm tra.' };
      return;
    }
    if (rows.length === 0) {
      note = {
        tone: 'warn',
        text: 'Hãy ghi ít nhất một lần đo khối lượng và thể tích trước khi đoán.',
      };
      return;
    }
    const best = closestMaterial(rows[0].ratio * 1000);
    const picked = BLOCK_MATERIALS.find((m) => m.id === guess);
    note =
      guess === mat.id
        ? {
            tone: 'ok',
            text: `Đúng! m/V = ${ratioText(rows[0].ratio)} = ${qty(mat.density)} kg/m³, khớp với khối lượng riêng của ${mat.name.toLowerCase()} trong bảng.`,
          }
        : {
            tone: 'warn',
            text: `Chưa đúng: ${picked?.name.toLowerCase()} có khối lượng riêng ${qty(picked?.density ?? 0)} kg/m³, còn khối này có m/V = ${ratioText(rows[0].ratio)}, tức ${qty(best.density)} kg/m³. Tra lại bảng khối lượng riêng.`,
          };
  }

  function nextMystery() {
    mysteryAt = (mysteryAt + 1) % MYSTERY.length;
    reset();
  }

  // Oblique drawing: front face a × c, depth b drawn at 45° and halved.
  const PX = 13;
  const OX = 30;
  const BASE = 190;
  const front = $derived({ w: a * PX, h: c * PX });
  const depth = $derived((b * PX) / 2 / Math.SQRT2);
  const top = $derived(
    `${OX},${BASE - front.h} ${OX + depth},${BASE - front.h - depth} ${OX + front.w + depth},${BASE - front.h - depth} ${OX + front.w},${BASE - front.h}`,
  );
  const side = $derived(
    `${OX + front.w},${BASE} ${OX + front.w},${BASE - front.h} ${OX + front.w + depth},${BASE - front.h - depth} ${OX + front.w + depth},${BASE - depth}`,
  );
  /** @type {Record<string, [string, string]>} */
  const COLORS = {
    go: ['#d6a96b', '#a8743a'],
    nhom: ['#cbd5e1', '#64748b'],
    sat: ['#71717a', '#3f3f46'],
    dong: ['#e8915a', '#b45309'],
  };
  const colors = $derived(hidden ? ['#c4b5fd', '#6d28d9'] : (COLORS[mat.id] ?? COLORS.nhom));

  // m–V chart.
  const CW = 300;
  const CH = 200;
  const PAD = { l: 44, r: 10, t: 12, b: 34 };
  /**
   * A round axis end a little above `top`: steps of 20, 100, 500 or 2000.
   * @param {number} top
   */
  const niceMax = (top) => {
    const step = top > 2000 ? 2000 : top > 500 ? 500 : top > 100 ? 100 : 20;
    return Math.ceil((top * 1.1) / step) * step;
  };
  const vMax = $derived(niceMax(Math.max(now.volume, ...rows.map((r) => r.volume), 1)));
  const mMax = $derived(niceMax(Math.max(now.mass, ...rows.map((r) => r.mass), 1)));
  const cx = (/** @type {number} */ v) => PAD.l + (v / vMax) * (CW - PAD.l - PAD.r);
  const cy = (/** @type {number} */ m) => CH - PAD.b - (m / mMax) * (CH - PAD.t - PAD.b);
  const vTicks = $derived([0, vMax / 2, vMax]);
  const mTicks = $derived([0, mMax / 2, mMax]);
  const lineEnd = $derived.by(() => {
    const ratio = rows[0]?.ratio ?? 0;
    const v = Math.min(vMax, mMax / ratio);
    return { x: cx(v), y: cy(ratio * v) };
  });

  const status = $derived(
    `Khối ${a} cm × ${b} cm × ${c} cm: V = ${cm3(now.volume)}, cân chỉ m = ${g(now.mass)}, m/V = ${ratioText(now.ratio)}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl label="Chế độ" options={MODES} bind:value={mode} onchange={reset} />
    {#if hidden}
      <div class="flex items-end">
        <button type="button" class={button.quiet} onclick={nextMystery}>Khối bí ẩn khác</button>
      </div>
    {:else}
      <SegmentedControl
        label="Chất làm khối"
        options={BLOCK_MATERIALS.map((m) => ({ value: m.id, label: m.name }))}
        bind:value={materialId}
        onchange={reset}
      />
    {/if}
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Chiều dài a"
      bind:value={a}
      min={EDGE.min}
      max={EDGE.max}
      unit="cm"
      oninput={() => (note = null)}
    />
    <SliderField
      label="Chiều rộng b"
      bind:value={b}
      min={EDGE.min}
      max={EDGE.max}
      unit="cm"
      oninput={() => (note = null)}
    />
    <SliderField
      label="Chiều cao c"
      bind:value={c}
      min={EDGE.min}
      max={EDGE.max}
      unit="cm"
      oninput={() => (note = null)}
    />
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 220 250"
        class="mx-auto block w-full max-w-xs"
        role="img"
        aria-label="Cân điện tử đặt {blockName} {a} cm × {b} cm × {c} cm, màn hình chỉ {g(
          now.mass,
        )}."
      >
        <rect x="10" y="190" width="200" height="14" rx="4" fill="#94a3b8" />
        <rect x="20" y="204" width="180" height="34" rx="6" fill="#334155" />
        <rect x="60" y="210" width="100" height="22" rx="3" fill="#0f172a" />
        <text
          x="152"
          y="226"
          text-anchor="end"
          class="fill-lime-300 font-mono text-[13px] font-semibold">{g(now.mass)}</text
        >
        <polygon points={side} fill={colors[1]} />
        <polygon points={top} fill={colors[0]} opacity="0.85" />
        <rect
          x={OX}
          y={BASE - front.h}
          width={front.w}
          height={front.h}
          fill={colors[0]}
          stroke={colors[1]}
        />
        {#if hidden}
          <text
            x={OX + front.w / 2}
            y={BASE - front.h / 2 + 5}
            text-anchor="middle"
            class="fill-violet-900 text-[14px] font-bold">?</text
          >
        {/if}
        <text x={OX + front.w / 2} y="184" text-anchor="middle" class="fill-slate-700 text-[10px]"
          >a = {a} cm</text
        >
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Cân điện tử đo khối lượng; thể tích tính từ ba cạnh: V = a · b · c.
      </figcaption>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 {CW} {CH}"
        class="block w-full"
        role="img"
        aria-label="Đồ thị khối lượng theo thể tích với {rows.length} điểm đo{rows.length > 1
          ? ', các điểm nằm trên một đường thẳng đi qua gốc tọa độ'
          : ''}."
      >
        {#each vTicks as v (v)}
          <line x1={cx(v)} y1={PAD.t} x2={cx(v)} y2={CH - PAD.b} stroke="#e2e8f0" />
          <text x={cx(v)} y={CH - PAD.b + 13} text-anchor="middle" class="fill-slate-500 text-[9px]"
            >{qty(v)}</text
          >
        {/each}
        {#each mTicks as m (m)}
          <line x1={PAD.l} y1={cy(m)} x2={CW - PAD.r} y2={cy(m)} stroke="#e2e8f0" />
          <text x={PAD.l - 4} y={cy(m) + 3} text-anchor="end" class="fill-slate-500 text-[9px]"
            >{qty(m)}</text
          >
        {/each}
        <text x={CW - PAD.r} y={CH - 4} text-anchor="end" class="fill-slate-600 text-[9px]"
          >V (cm³)</text
        >
        <text x={PAD.l + 4} y={PAD.t + 8} class="fill-slate-600 text-[9px]">m (g)</text>
        {#if rows.length > 1}
          <line
            x1={cx(0)}
            y1={cy(0)}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="#6366f1"
            stroke-dasharray="5 4"
          />
        {/if}
        {#each rows as r, i (i)}
          <circle cx={cx(r.volume)} cy={cy(r.mass)} r="4.5" fill="#4f46e5" />
        {/each}
        <circle
          cx={cx(now.volume)}
          cy={cy(now.mass)}
          r="5"
          fill="none"
          stroke="#f59e0b"
          stroke-width="2"
        />
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Chấm tím: các lần đã ghi; vòng cam: khối đang đặt trên cân.
      </figcaption>
    </figure>
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm tabular-nums">
    <div class="rounded-xl bg-slate-50 p-2">
      <dt class="text-slate-600">Thể tích V</dt>
      <dd class="font-semibold text-slate-900">{cm3(now.volume)}</dd>
    </div>
    <div class="rounded-xl bg-slate-50 p-2">
      <dt class="text-slate-600">Khối lượng m</dt>
      <dd class="font-semibold text-slate-900">{g(now.mass)}</dd>
    </div>
    <div class="rounded-xl bg-indigo-50 p-2">
      <dt class="text-indigo-700">m/V</dt>
      <dd class="font-semibold text-indigo-900">{ratioText(now.ratio)}</dd>
    </div>
  </dl>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record}>Ghi số đo vào bảng</button>
    <button type="button" class={button.quiet} onclick={reset} disabled={rows.length === 0}
      >Xóa bảng</button
    >
  </div>

  {#if rows.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
          Bảng ghi kết quả ({blockName})
        </caption>
        <thead>
          <tr class="bg-slate-100">
            <th class="px-2 py-1">Lần</th>
            <th class="px-2 py-1">Kích thước (cm)</th>
            <th class="px-2 py-1">V (cm³)</th>
            <th class="px-2 py-1">m (g)</th>
            <th class="px-2 py-1">m/V (g/cm³)</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as r, i (i)}
            <tr class="border-b border-slate-100">
              <td class="px-2 py-1">{i + 1}</td>
              <td class="px-2 py-1">{r.a} × {r.b} × {r.c}</td>
              <td class="px-2 py-1">{qty(r.volume)}</td>
              <td class="px-2 py-1">{qty(r.mass, 1)}</td>
              <td class="px-2 py-1 font-semibold text-indigo-800">{qty(r.ratio, 2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if hidden}
    <div class="{card} space-y-3 p-3">
      <SegmentedControl
        label="Khối bí ẩn làm bằng chất gì?"
        options={BLOCK_MATERIALS.map((m) => ({ value: m.id, label: m.name }))}
        bind:value={guess}
      />
      <button type="button" class={button.secondary} onclick={check}>Kiểm tra</button>
    </div>
  {/if}

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {note?.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : note?.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {note ? note.text : status}
  </p>
</div>
