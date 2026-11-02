<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { balanceReading, percentGap, resultant, splitAngles } from './engine.js';

  const W = 360;
  const H = 320;
  const X = 180;
  const ANCHOR_Y = 16;
  /** Pixels per newton, for arrows and for the stretch of the rubber cord. */
  const K = 15;
  const CORD = 36;
  const STRETCH = 9;
  /** Widest allowed gap between a typed calculation and the true resultant, N. */
  const TYPED_TOLERANCE = 0.06;

  let f1 = $state(3);
  let f2 = $state(4);
  let alpha = $state(90);
  let measured = $state(false);
  let typed = $state('');
  let rows = $state(
    /** @type {Array<{ id: number, f1: number, f2: number, alpha: number, read: number, worked: number, gap: number }>} */ ([]),
  );
  let message = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Đặt hai lực kéo dây cao su đến điểm $O$, rồi bấm nút để thay bằng một lực kế.',
    }),
  );

  const truth = $derived(resultant(f1, f2, alpha));
  const read = $derived(balanceReading(f1, f2, alpha));
  const angles = $derived(splitAngles(f1, f2, alpha));
  const oY = $derived(ANCHOR_Y + CORD + truth * STRETCH);

  /** A force at `deg` from straight down, on the left (-1) or right (1). @param {number} size @param {number} deg @param {number} side */
  const tip = (size, deg, side) => ({
    x: X + side * size * K * Math.sin((deg * Math.PI) / 180),
    y: oY + size * K * Math.cos((deg * Math.PI) / 180),
  });
  const tip1 = $derived(tip(f1, angles.a1, -1));
  const tip2 = $derived(tip(f2, angles.a2, 1));
  const tipR = $derived({ x: X, y: oY + truth * K });

  function changed() {
    measured = false;
    typed = '';
    message = {
      tone: 'info',
      text: 'Đặt hai lực kéo dây cao su đến điểm $O$, rồi bấm nút để thay bằng một lực kế.',
    };
  }

  function measure() {
    measured = true;
    message = {
      tone: 'info',
      text: `Một lực kế kéo dây cao su đến đúng điểm $O$ chỉ $F_{\\text{đo}} = ${numTex(read, 1)}$ N. Bây giờ tính $F$ theo công thức rồi nhập kết quả.`,
    };
  }

  function record() {
    const value = readNumber(typed);
    if (value === null) {
      message = { tone: 'warn', text: 'Hãy nhập kết quả tính được, ví dụ $5{,}2$.' };
      return;
    }
    if (Math.abs(value - truth) > TYPED_TOLERANCE) {
      message = {
        tone: 'warn',
        text: 'Kết quả tính chưa đúng. Xem lại $F^2 = F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha$: với $\\alpha > 90^\\circ$ thì $\\cos\\alpha$ âm.',
      };
      return;
    }
    const gap = percentGap(read, truth);
    rows = [...rows.slice(-4), { id: Date.now(), f1, f2, alpha, read, worked: truth, gap }];
    message = {
      tone: 'ok',
      text: `Đã ghi vào bảng: đo được $${numTex(read, 1)}$ N, tính được $${numTex(truth, 2)}$ N, lệch khoảng $${numTex(gap, 1)}\\%$. Đổi hai lực hoặc góc để đo thêm lần nữa.`,
    };
  }
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Bảng lực. Lực kế một chỉ ${formatNumber(f1, 1)}, lực kế hai chỉ ${formatNumber(f2, 1)} niutơn, góc giữa hai lực ${formatNumber(alpha)} độ.${measured ? ` Lực kế thay thế chỉ ${formatNumber(read, 1)} niutơn.` : ''}`}
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
      <rect x={X - 16} y={ANCHOR_Y - 8} width="32" height="10" fill="#475569" />
      <line
        x1={X}
        y1={ANCHOR_Y}
        x2={X}
        y2={oY}
        stroke="#0f766e"
        stroke-width="4"
        stroke-dasharray="2 2"
      />
      <line x1={X - 22} x2={X + 22} y1={oY} y2={oY} stroke="#94a3b8" stroke-dasharray="3 3" />
      {#if measured}
        <line
          x1={tip1.x}
          y1={tip1.y}
          x2={tipR.x}
          y2={tipR.y}
          stroke="#94a3b8"
          stroke-dasharray="4 3"
        />
        <line
          x1={tip2.x}
          y1={tip2.y}
          x2={tipR.x}
          y2={tipR.y}
          stroke="#94a3b8"
          stroke-dasharray="4 3"
        />
        <ForceArrow
          x1={X}
          y1={oY}
          x2={tipR.x}
          y2={tipR.y}
          color="#be123c"
          label="F"
          labelDx={8}
          labelDy={0}
        />
      {/if}
      <ForceArrow x1={X} y1={oY} x2={tip1.x} y2={tip1.y} color="#4f46e5" label="F₁" />
      <ForceArrow x1={X} y1={oY} x2={tip2.x} y2={tip2.y} color="#0891b2" label="F₂" />
      <circle cx={X} cy={oY} r="4" fill="#0f172a" />
      <text x={X + 10} y={oY - 6} font-size="13" font-weight="700" fill="#0f172a">O</text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Lực kế 1, F₁"
      bind:value={f1}
      min={1}
      max={5}
      step={0.1}
      unit="N"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
    <SliderField
      label="Lực kế 2, F₂"
      bind:value={f2}
      min={1}
      max={5}
      step={0.1}
      unit="N"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
    <SliderField
      label="Góc α giữa hai lực"
      bind:value={alpha}
      min={30}
      max={150}
      step={5}
      unit="°"
      oninput={changed}
    />
  </div>

  {#if !measured}
    <button type="button" class={button.primary} onclick={measure}>Thay bằng một lực kế</button>
  {:else}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(event) => {
        event.preventDefault();
        record();
      }}
    >
      <label class="min-w-40 flex-1 text-sm font-semibold text-slate-700">
        F tính theo công thức (N)
        <input class="mt-1 {textInput}" autocomplete="off" bind:value={typed} />
      </label>
      <button type="submit" class={button.primary}>Ghi vào bảng</button>
    </form>
  {/if}

  <FeedbackNote tone={message.tone} text={message.text} />

  {#if rows.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">Bảng số liệu của em</caption>
        <thead>
          <tr class="bg-slate-100">
            <th scope="col" class="px-2 py-1">F₁ (N)</th>
            <th scope="col" class="px-2 py-1">F₂ (N)</th>
            <th scope="col" class="px-2 py-1">α</th>
            <th scope="col" class="px-2 py-1">F đo (N)</th>
            <th scope="col" class="px-2 py-1">F tính (N)</th>
            <th scope="col" class="px-2 py-1">Lệch</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row.id)}
            <tr class="border-b border-slate-200">
              <td class="px-2 py-1">{formatFixed(row.f1, 1)}</td>
              <td class="px-2 py-1">{formatFixed(row.f2, 1)}</td>
              <td class="px-2 py-1">{`${formatNumber(row.alpha)}°`}</td>
              <td class="px-2 py-1">{formatFixed(row.read, 1)}</td>
              <td class="px-2 py-1">{formatFixed(row.worked, 2)}</td>
              <td class="px-2 py-1">{`${formatNumber(row.gap, 1)}%`}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
