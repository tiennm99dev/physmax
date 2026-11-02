<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { parallelPoint, springShares } from './engine.js';

  const W = 360;
  const H = 260;
  /** The bar and the hanging points, in centimetres from the left spring. */
  const BAR = 30;
  const A = 3;
  const B = 27;
  const LEFT_X = 40;
  const PX_CM = 280 / BAR;
  const CEILING = 14;
  /** Bar height with no load, and pixels of spring stretch per newton. */
  const REST = 56;
  const STRETCH = 20;
  /** Half a mark of the position slider, in centimetres. */
  const NEAR = 0.5;
  const MODES = [
    { value: 'rieng', label: 'Treo ở A và B' },
    { value: 'chung', label: 'Treo chung tại O' },
  ];

  let n1 = $state(1);
  let n2 = $state(2);
  let mode = $state('rieng');
  let spot = $state(10);

  /** Each weight is half a newton. */
  const f1 = $derived(n1 * 0.5);
  const f2 = $derived(n2 * 0.5);
  const total = $derived(f1 + f2);
  const point = $derived(parallelPoint(f1, A, f2, B));
  const apart = $derived(
    springShares(BAR, [
      { force: f1, at: A },
      { force: f2, at: B },
    ]),
  );
  const together = $derived(springShares(BAR, [{ force: total, at: spot }]));
  const now = $derived(mode === 'rieng' ? apart : together);
  const leftY = $derived(REST + now.left * STRETCH);
  const rightY = $derived(REST + now.right * STRETCH);
  const near = $derived(Math.abs(spot - point) <= NEAR);
  const d1 = $derived(tidy(spot - A));
  const d2 = $derived(tidy(B - spot));

  /** @param {number} cm */
  const xOf = (cm) => LEFT_X + cm * PX_CM;
  /** @param {number} cm */
  const yOf = (cm) => leftY + ((rightY - leftY) * cm) / BAR;

  /** Zigzag spring from the ceiling down to a bar end. @param {number} x @param {number} bottom */
  function spring(x, bottom) {
    const turns = 8;
    const points = [{ x, y: CEILING }];
    for (let i = 1; i < turns; i += 1) {
      points.push({
        x: x + (i % 2 === 0 ? -6 : 6),
        y: CEILING + ((bottom - CEILING) * i) / turns,
      });
    }
    points.push({ x, y: bottom });
    return pointsAttr(points);
  }

  const note = $derived.by(() => {
    if (mode === 'rieng') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Hai lực song song cùng chiều $F_1 = ${numTex(f1, 1)}$ N tại $A$ và $F_2 = ${numTex(f2, 1)}$ N tại $B$ kéo thanh xuống. Vạch đứt ghi lại vị trí của thanh. Chuyển sang treo chung để tìm điểm đặt của hợp lực.`,
      };
    }
    if (near) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Thanh về đúng vạch đứt: một lực $F = F_1 + F_2 = ${numTex(total, 1)}$ N đặt tại $O$ có tác dụng như hai lực. Đo được $d_1 = ${numTex(d1)}$ cm, $d_2 = ${numTex(d2)}$ cm, và $\\dfrac{F_1}{F_2} = ${numTex(f1 / f2, 2)}$ gần bằng $\\dfrac{d_2}{d_1} = ${numTex(d2 / d1, 2)}$.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Thanh chưa trùng vạch đứt. Đầu ${now.left > apart.left ? 'trái' : 'phải'} đang bị kéo xuống quá nhiều: hãy dời điểm treo $O$ về phía ${now.left > apart.left ? 'phải' : 'trái'}.`,
    };
  });
</script>

{#snippet stack(/** @type {number} */ cm, /** @type {number} */ count, /** @type {string} */ name)}
  <line x1={xOf(cm)} y1={yOf(cm)} x2={xOf(cm)} y2={yOf(cm) + 20} stroke="#475569" />
  {#each { length: count } as _, i (i)}
    <rect x={xOf(cm) - 11} y={yOf(cm) + 20 + i * 12} width="22" height="10" rx="2" fill="#4f46e5" />
  {/each}
  <text
    x={xOf(cm)}
    y={yOf(cm) - 8}
    font-size="13"
    font-weight="700"
    fill="#0f172a"
    text-anchor="middle">{name}</text
  >
{/snippet}

<div class="space-y-4">
  <SegmentedControl label="Cách treo" options={MODES} bind:value={mode} />

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Thanh treo trên hai lò xo. ${mode === 'rieng' ? 'Các quả nặng treo ở A và B.' : `Tất cả quả nặng treo tại O, cách đầu trái ${formatNumber(spot)} xăng-ti-mét.`} ${mode === 'chung' && near ? 'Thanh trùng vị trí ban đầu.' : ''}`}
    >
      <rect x="0" y="0" width={W} height={CEILING} fill="#94a3b8" />
      <polyline points={spring(xOf(0), leftY)} fill="none" stroke="#64748b" stroke-width="2" />
      <polyline points={spring(xOf(BAR), rightY)} fill="none" stroke="#64748b" stroke-width="2" />
      <line
        x1={xOf(0)}
        y1={REST + apart.left * STRETCH}
        x2={xOf(BAR)}
        y2={REST + apart.right * STRETCH}
        stroke="#059669"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      <line
        x1={xOf(0)}
        y1={leftY}
        x2={xOf(BAR)}
        y2={rightY}
        stroke="#b45309"
        stroke-width="6"
        stroke-linecap="round"
      />
      {#if mode === 'rieng'}
        {@render stack(A, n1, 'A')}
        {@render stack(B, n2, 'B')}
      {:else}
        {@render stack(spot, n1 + n2, 'O')}
      {/if}
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Số quả nặng ở A"
      bind:value={n1}
      min={1}
      max={4}
      step={1}
      format={(v) => `${formatNumber(v)} quả, ${formatFixed(v * 0.5, 1)} N`}
    />
    <SliderField
      label="Số quả nặng ở B"
      bind:value={n2}
      min={1}
      max={4}
      step={1}
      format={(v) => `${formatNumber(v)} quả, ${formatFixed(v * 0.5, 1)} N`}
    />
    {#if mode === 'chung'}
      <SliderField
        label="Điểm treo O, cách đầu trái"
        bind:value={spot}
        min={A}
        max={B}
        step={1}
        unit="cm"
      />
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
