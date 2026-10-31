<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { LENSES, OBJECT_HEIGHT, focalFromSymmetric, sameHeight, screenImage } from './engine.js';

  const W = 380;
  const H = 132;
  const AXIS = 70;
  const LENS_X = 170;
  const PX = 3; // px per cm along the bench
  const SW = 170;
  const SH = 150;
  const SPX = 12; // px per cm on the screen view
  const filterId = $props.id();

  let lensIndex = $state(1);
  let d = $state(12);
  let d2 = $state(12);
  let linked = $state(true);
  /** @type {Array<{ d: number, d2: number, h2: number, sharp: boolean }>} */
  let rows = $state([]);
  let typed = $state('');
  /** @type {null | { ok: boolean, value: number }} */
  let verdict = $state(null);

  const f = $derived(LENSES[lensIndex]);
  const img = $derived(screenImage(f, d, d2));
  const blurPx = $derived(Math.min(14, (img.blur * SPX) / 2));
  const cm = (/** @type {number} */ v) => `${formatNumber(v, 1)} cm`;

  /** @param {number} v */
  function moveObject(v) {
    if (linked) d2 = v;
    verdict = null;
  }
  /** @param {number} v */
  function moveScreen(v) {
    if (linked) d = v;
    verdict = null;
  }
  function newLens() {
    lensIndex = (lensIndex + 1) % LENSES.length;
    rows = [];
    typed = '';
    verdict = null;
    d = 12;
    d2 = 12;
  }
  function record() {
    rows = [...rows, { d, d2, h2: img.formed ? img.height : 0, sharp: img.sharp }].slice(-3);
  }
  function checkAnswer() {
    const v = readNumber(typed);
    if (v === null) return;
    verdict = { ok: Math.abs(v - f) <= 0.5, value: v };
  }

  const validRows = $derived(
    rows
      .filter((r) => r.sharp && sameHeight(r.h2, OBJECT_HEIGHT))
      .map((r) => focalFromSymmetric(r.d, r.d2)),
  );

  const feedback = $derived.by(() => {
    if (verdict) {
      return verdict.ok
        ? {
            tone: /** @type {const} */ ('ok'),
            text: `Đúng: thấu kính này có tiêu cự $f = ${f}$ cm. Nhấn "Đổi thấu kính" để đo một thấu kính khác.`,
          }
        : {
            tone: /** @type {const} */ ('warn'),
            text: `Chưa đúng. Kiểm tra lại: chỉ dùng những lần đo có ảnh rõ nét và $h' = h$, rồi tính $f = \\dfrac{d + d'}{4}$.`,
          };
    }
    if (!img.formed) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Màn chưa hứng được ảnh: vật đang ở quá gần thấu kính. Dịch vật và màn ra xa thấu kính hơn.',
      };
    }
    if (!img.sharp) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Ảnh trên màn còn mờ. Tiếp tục dịch vật và màn (từng xentimét) cho đến khi ảnh rõ nét.',
      };
    }
    if (!sameHeight(img.height, OBJECT_HEIGHT)) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Ảnh đã rõ nét nhưng cao ${cm(img.height)}, khác chiều cao vật ${cm(OBJECT_HEIGHT)}: chưa dùng được công thức $f = \\dfrac{d + d'}{4}$. Hãy giữ $d = d'$ khi dịch.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Ảnh rõ nét và cao bằng vật ($h' = h$). Ghi lại $d$ và $d'$ vào bảng.`,
    };
  });
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-lg rounded-xl border border-slate-200 bg-white"
    role="img"
    aria-label="Giá quang học: vật cách thấu kính {cm(d)}, màn cách thấu kính {cm(d2)}."
  >
    <rect x="6" y={AXIS + 18} width={W - 12} height="8" rx="2" fill="#cbd5e1" />
    {#each Array.from({ length: 12 }, (_, k) => k) as k (k)}
      <line
        x1={LENS_X - 50 * PX + k * 10 * PX}
        y1={AXIS + 18}
        x2={LENS_X - 50 * PX + k * 10 * PX}
        y2={AXIS + 26}
        stroke="#475569"
      />
    {/each}
    <line x1="6" y1={AXIS} x2={W - 6} y2={AXIS} stroke="#94a3b8" stroke-dasharray="4 3" />
    <!-- object -->
    <rect x={LENS_X - d * PX - 4} y={AXIS - 30} width="8" height="48" fill="#f59e0b" />
    <text
      x={Math.max(36, LENS_X - d * PX)}
      y={AXIS + 46}
      text-anchor="end"
      font-size="12"
      fill="#92400e">vật F</text
    >
    <!-- lens -->
    <ellipse
      cx={LENS_X}
      cy={AXIS}
      rx="6"
      ry="36"
      fill="#bae6fd"
      stroke="#0284c7"
      stroke-width="2"
    />
    <text x={LENS_X} y={AXIS - 42} text-anchor="middle" font-size="12" fill="#0369a1"
      >thấu kính</text
    >
    <!-- screen -->
    <rect x={LENS_X + d2 * PX - 3} y={AXIS - 40} width="6" height="58" fill="#334155" />
    <text
      x={Math.min(W - 32, LENS_X + d2 * PX)}
      y={AXIS + 46}
      text-anchor="start"
      font-size="12"
      fill="#334155">màn</text
    >
  </svg>

  <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
    <div class="space-y-3">
      <SliderField
        label="Khoảng cách từ vật đến thấu kính d"
        bind:value={d}
        min={4}
        max={50}
        unit="cm"
        oninput={moveObject}
      />
      <SliderField
        label="Khoảng cách từ màn đến thấu kính d′"
        bind:value={d2}
        min={4}
        max={60}
        unit="cm"
        oninput={moveScreen}
      />
      <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          class="h-5 w-5 {focusRing}"
          bind:checked={linked}
          onchange={() => {
            if (linked) d2 = d;
            verdict = null;
          }}
        />
        Dịch đồng thời vật và màn (giữ d = d′)
      </label>
    </div>
    <figure class="mx-auto">
      <svg
        viewBox="0 0 {SW} {SH}"
        class="block w-44 rounded-lg border border-slate-300 bg-slate-800"
        role="img"
        aria-label={img.formed
          ? `Màn ảnh: ảnh cao ${cm(img.height)}, ${img.sharp ? 'rõ nét' : 'bị mờ'}.`
          : 'Màn ảnh: không có ảnh.'}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blurPx} />
          </filter>
        </defs>
        <rect x="4" y="4" width={SW - 8} height={SH - 8} fill="#f8fafc" />
        {#each Array.from({ length: 11 }, (_, k) => k - 5) as k (k)}
          <line
            x1="4"
            y1={SH / 2 + k * SPX}
            x2={k % 5 === 0 ? 16 : 10}
            y2={SH / 2 + k * SPX}
            stroke="#64748b"
          />
        {/each}
        {#if img.formed}
          <g filter="url(#{filterId})" opacity={Math.max(0.25, 1 - img.blur / 3)}>
            <g
              transform="translate({SW / 2} {SH / 2}) rotate(180) scale({(img.height * SPX) / 36})"
            >
              <path d="M -9 18 V -18 H 12 V -11 H -2 V -3 H 9 V 4 H -2 V 18 Z" fill="#f59e0b" />
            </g>
          </g>
        {/if}
      </svg>
      <figcaption class="mt-1 text-center text-xs text-slate-600">
        Màn ảnh (vạch chia 1 cm)
      </figcaption>
    </figure>
  </div>

  <dl class="grid grid-cols-3 gap-2 text-sm tabular-nums">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">h (vật)</dt>
      <dd class="font-semibold">{cm(OBJECT_HEIGHT)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">h′ (ảnh)</dt>
      <dd class="font-semibold">{img.formed ? cm(img.height) : 'không có'}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Ảnh</dt>
      <dd class="font-semibold">{img.formed ? (img.sharp ? 'rõ nét' : 'mờ') : '–'}</dd>
    </div>
  </dl>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record}>Ghi kết quả</button>
    <button type="button" class={button.quiet} onclick={newLens}>Đổi thấu kính</button>
  </div>

  {#if rows.length}
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="pb-1 text-left text-sm font-semibold text-slate-700">Bảng kết quả</caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="p-1">Lần</th>
          <th class="p-1">d (cm)</th>
          <th class="p-1">d′ (cm)</th>
          <th class="p-1">h′ (cm)</th>
          <th class="p-1">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r, k (k)}
          <tr class="border-b border-slate-100">
            <td class="p-1">{k + 1}</td>
            <td class="p-1">{formatNumber(r.d, 1)}</td>
            <td class="p-1">{formatNumber(r.d2, 1)}</td>
            <td class="p-1">{formatFixed(r.h2, 1)}</td>
            <td class="p-1">
              {r.sharp && sameHeight(r.h2, OBJECT_HEIGHT)
                ? 'dùng được'
                : r.sharp
                  ? 'h′ ≠ h'
                  : 'ảnh mờ'}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if validRows.length}
      <p class="text-sm text-slate-700">
        Có {validRows.length} lần đo dùng được. Em tự tính f của mỗi lần và giá trị trung bình.
      </p>
    {/if}
  {/if}

  <div class="flex flex-wrap items-end gap-2">
    <label class="min-w-0 flex-1 text-sm font-semibold text-slate-700">
      Tiêu cự em tính được f (cm)
      <input
        class="{textInput} mt-1"
        inputmode="decimal"
        bind:value={typed}
        oninput={() => (verdict = null)}
        onkeydown={(e) => e.key === 'Enter' && checkAnswer()}
      />
    </label>
    <button
      type="button"
      class={button.secondary}
      onclick={checkAnswer}
      disabled={readNumber(typed) === null}>Kiểm tra f</button
    >
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
