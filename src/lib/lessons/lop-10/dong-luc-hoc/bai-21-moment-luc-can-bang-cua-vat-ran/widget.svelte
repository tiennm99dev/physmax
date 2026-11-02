<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { PEG_GAP, beamTilt, sideMoment } from './engine.js';

  const W = 360;
  const H = 230;
  const PIVOT = { x: 180, y: 70 };
  /** Pixels between two pegs. */
  const GAP = 32;
  const PEGS = [1, 2, 3, 4, 5];
  const MAX_ON_PEG = 5;
  const WEIGHT_H = 14;
  const ACTIONS = [
    { value: 'them', label: 'Treo thêm' },
    { value: 'bot', label: 'Gỡ bớt' },
  ];

  let action = $state('them');
  let left = $state([0, 0, 2, 0, 0]);
  let right = $state([0, 0, 0, 0, 0]);

  const leftMoment = $derived(sideMoment(left));
  const rightMoment = $derived(sideMoment(right));
  const tilt = $derived(beamTilt(leftMoment, rightMoment));
  const rad = $derived((tilt * Math.PI) / 180);
  const balanced = $derived(leftMoment === rightMoment);
  const equalCounts = $derived(
    left.reduce((a, b) => a + b, 0) === right.reduce((a, b) => a + b, 0),
  );

  /** @param {number} signedPeg negative on the left */
  function pegPoint(signedPeg) {
    return {
      x: PIVOT.x + signedPeg * GAP * Math.cos(rad),
      y: PIVOT.y + signedPeg * GAP * Math.sin(rad),
    };
  }

  /** @param {'left' | 'right'} side @param {number} peg */
  function change(side, peg) {
    const list = side === 'left' ? left : right;
    const next = list.map((n, i) =>
      i === peg - 1 ? Math.max(0, Math.min(MAX_ON_PEG, n + (action === 'them' ? 1 : -1))) : n,
    );
    if (side === 'left') left = next;
    else right = next;
  }

  function clearAll() {
    left = [0, 0, 0, 0, 0];
    right = [0, 0, 0, 0, 0];
  }

  const note = $derived.by(() => {
    const sum = `$M_{\\text{trái}} = ${numTex(leftMoment, 2)}$ N.m, $M_{\\text{phải}} = ${numTex(rightMoment, 2)}$ N.m.`;
    if (leftMoment === 0 && rightMoment === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa có quả nặng nào. Treo một vài quả ở bên trái rồi tìm cách cân bằng ở bên phải.',
      };
    }
    if (balanced) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Thanh cân bằng: ${sum} Tổng moment làm thanh quay ngược chiều kim đồng hồ bằng tổng moment làm thanh quay cùng chiều kim đồng hồ.${equalCounts ? '' : ' Số quả nặng hai bên khác nhau: điều quyết định là moment, không phải lực.'}`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa cân bằng: ${sum} Thanh quay về bên có moment lớn hơn (${leftMoment > rightMoment ? 'bên trái' : 'bên phải'}).`,
    };
  });
</script>

{#snippet hang(/** @type {number} */ signedPeg, /** @type {number} */ count)}
  {#if count > 0}
    {@const p = pegPoint(signedPeg)}
    <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 16} stroke="#475569" />
    {#each { length: count } as _, i (i)}
      <rect
        x={p.x - 10}
        y={p.y + 16 + i * (WEIGHT_H + 2)}
        width="20"
        height={WEIGHT_H}
        rx="3"
        fill="#4f46e5"
      />
    {/each}
  {/if}
{/snippet}

{#snippet pegRow(/** @type {'left' | 'right'} */ side, /** @type {number[]} */ loads)}
  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      {side === 'left' ? 'Bên trái trục' : 'Bên phải trục'}
    </p>
    <div class="grid grid-cols-5 gap-1">
      {#each side === 'left' ? [...PEGS].reverse() : PEGS as peg (peg)}
        <button
          type="button"
          class="{button.quiet} flex-col px-1 py-1 text-xs"
          aria-label={`${action === 'them' ? 'Treo thêm một quả' : 'Gỡ một quả'} ở vị trí ${formatNumber(peg * PEG_GAP * 100)} xăng-ti-mét ${side === 'left' ? 'bên trái' : 'bên phải'}, đang có ${loads[peg - 1]} quả`}
          onclick={() => change(side, peg)}
        >
          <span>{`${formatNumber(peg * PEG_GAP * 100)} cm`}</span>
          <span class="font-bold text-indigo-700">{`${loads[peg - 1]} quả`}</span>
        </button>
      {/each}
    </div>
  </div>
{/snippet}

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Thanh có trục quay. Moment bên trái ${formatNumber(leftMoment, 2)}, bên phải ${formatNumber(rightMoment, 2)} niutơn mét. ${balanced ? 'Thanh cân bằng.' : 'Thanh nghiêng.'}`}
    >
      <polygon
        points="{PIVOT.x},{PIVOT.y} {PIVOT.x - 14},{H - 6} {PIVOT.x + 14},{H - 6}"
        fill="#e2e8f0"
        stroke="#94a3b8"
      />
      <line
        x1={pegPoint(-5.3).x}
        y1={pegPoint(-5.3).y}
        x2={pegPoint(5.3).x}
        y2={pegPoint(5.3).y}
        stroke="#b45309"
        stroke-width="7"
        stroke-linecap="round"
      />
      {#each PEGS as peg (peg)}
        <circle cx={pegPoint(-peg).x} cy={pegPoint(-peg).y} r="2.5" fill="#fff" />
        <circle cx={pegPoint(peg).x} cy={pegPoint(peg).y} r="2.5" fill="#fff" />
        {@render hang(-peg, left[peg - 1])}
        {@render hang(peg, right[peg - 1])}
      {/each}
      <circle cx={PIVOT.x} cy={PIVOT.y} r="6" fill="#0f172a" />
    </svg>
  </div>

  <div class="flex flex-wrap items-end justify-between gap-3">
    <SegmentedControl label="Khi bấm vào một vị trí" options={ACTIONS} bind:value={action} />
    <button type="button" class={button.quiet} onclick={clearAll}>Gỡ hết</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    {@render pegRow('left', left)}
    {@render pegRow('right', right)}
  </div>

  <dl class="grid grid-cols-2 gap-2 text-center text-sm">
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Moment bên trái</dt>
      <dd class="tabular-nums">{`${formatNumber(leftMoment, 2)} N.m`}</dd>
    </div>
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Moment bên phải</dt>
      <dd class="tabular-nums">{`${formatNumber(rightMoment, 2)} N.m`}</dd>
    </div>
  </dl>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
