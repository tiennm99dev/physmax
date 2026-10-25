<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { COLS, ROWS, TASKS, answerTip, checkArrow, clampNode } from './engine.js';

  const CELL = 24;
  const PAD = 14;
  const VW = COLS * CELL + 2 * PAD;
  const VH = ROWS * CELL + 2 * PAD;
  const GRID_C = Array.from({ length: COLS + 1 }, (_, i) => i);
  const GRID_R = Array.from({ length: ROWS + 1 }, (_, i) => i);
  const START_TAIL = { c: 1, r: 9 };
  const START_TIP = { c: 3, r: 9 };

  let taskId = $state(TASKS[0].id);
  let tail = $state({ ...START_TAIL });
  let tip = $state({ ...START_TIP });
  let checked = $state(false);
  let reveal = $state(false);

  const task = $derived(TASKS.find((t) => t.id === taskId) ?? TASKS[0]);
  const result = $derived(checkArrow(task, tail, tip));
  const key = $derived(answerTip(task));

  /** @param {{ c: number, r: number }} p */
  const X = (p) => PAD + p.c * CELL;
  /** @param {{ c: number, r: number }} p */
  const Y = (p) => PAD + p.r * CELL;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratchTail = { x: 0, y: 0 };
  const scratchTip = { x: 0, y: 0 };

  /**
   * @param {'tail' | 'tip'} which
   * @param {{ c: number, r: number }} next
   */
  function moveTo(which, next) {
    const p = clampNode(next);
    if (which === 'tail') tail = p;
    else tip = p;
    checked = false;
  }

  /** @param {'tail' | 'tip'} which */
  const dragFor = (which) => {
    const scratch = which === 'tail' ? scratchTail : scratchTip;
    return {
      point: scratch,
      svg: () => svgEl ?? null,
      viewBox: { w: VW, h: VH },
      pad: 0,
      onChange: () => moveTo(which, { c: (scratch.x - PAD) / CELL, r: (scratch.y - PAD) / CELL }),
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const p = which === 'tail' ? tail : tip;
        const n = big ? 2 : 1;
        moveTo(which, { c: p.c + dx * n, r: p.r + dy * n });
      },
    };
  };

  function changeTask() {
    tail = { ...START_TAIL };
    tip = { ...START_TIP };
    checked = false;
    reveal = false;
  }

  const N = (/** @type {number} */ v) => `${formatNumber(v, 2)} N`;

  /** What the drawn arrow says, read from its shape. */
  const drawn = $derived.by(() => {
    if (result.empty) return 'Gốc và ngọn mũi tên đang trùng nhau: chưa có mũi tên.';
    const dc = tip.c - tail.c;
    const dr = tip.r - tail.r;
    let way = 'phương xiên';
    if (dr === 0)
      way = `phương nằm ngang, chiều từ ${dc > 0 ? 'trái sang phải' : 'phải sang trái'}`;
    else if (dc === 0)
      way = `phương thẳng đứng, chiều từ ${dr < 0 ? 'dưới lên trên' : 'trên xuống dưới'}`;
    return `Mũi tên dài ${formatNumber(result.length, 2)} ô, ứng với ${N(result.value)}, ${way}.`;
  });

  const rows = $derived([
    {
      ok: result.point,
      text: result.point
        ? 'Điểm đặt: gốc mũi tên ở đúng điểm A.'
        : 'Điểm đặt: gốc mũi tên phải đặt tại điểm A, nơi lực tác dụng lên vật.',
    },
    {
      ok: result.line,
      text: result.line
        ? 'Phương: đúng.'
        : `Phương: chưa đúng, lực có phương ${task.angle % 180 === 0 ? 'nằm ngang' : 'thẳng đứng'}.`,
    },
    {
      ok: result.sense,
      text: result.sense
        ? 'Chiều: đúng.'
        : result.line
          ? 'Chiều: mũi tên đang chỉ ngược chiều của lực.'
          : 'Chiều: sửa phương trước, rồi cho mũi tên chỉ đúng chiều.',
    },
    {
      ok: result.magnitude,
      text: result.magnitude
        ? `Độ lớn: ${formatNumber(result.length, 2)} ô × ${N(task.scale)} = ${N(task.size)}, đúng.`
        : `Độ lớn: mũi tên đang ứng với ${N(result.value)}, cần ${N(task.size)}. Mỗi ô ứng với ${N(task.scale)}.`,
    },
  ]);

  const live = $derived(
    !checked
      ? drawn
      : result.correct
        ? `Chính xác! Mũi tên biểu diễn đúng lực ${N(task.size)}: gốc tại A, đúng phương, chiều và dài ${formatNumber(task.size / task.scale, 2)} ô.`
        : `${drawn} Còn ${rows.filter((r) => !r.ok).length} yếu tố chưa đúng.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Lực cần biểu diễn"
    options={TASKS.map((t, i) => ({ value: t.id, label: `Lực ${i + 1}` }))}
    bind:value={taskId}
    onchange={changeTask}
  />
  <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">{task.text}</p>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {VW} {VH}"
      class="mx-auto block w-full max-w-xl select-none"
      style:touch-action="none"
      role="group"
      aria-label="Lưới ô vuông để vẽ mũi tên lực. {drawn}"
    >
      {#each GRID_C as c (c)}
        <line
          x1={PAD + c * CELL}
          y1={PAD}
          x2={PAD + c * CELL}
          y2={PAD + ROWS * CELL}
          stroke="#e2e8f0"
        />
      {/each}
      {#each GRID_R as r (r)}
        <line
          x1={PAD}
          y1={PAD + r * CELL}
          x2={PAD + COLS * CELL}
          y2={PAD + r * CELL}
          stroke="#e2e8f0"
        />
      {/each}

      {#each [task.object, task.extra] as o, i (i)}
        {#if o}
          <rect
            x={X(o)}
            y={Y(o)}
            width={o.w * CELL}
            height={o.h * CELL}
            rx={o.label === 'Bi sắt' ? CELL : 6}
            fill={i === 0 ? '#fde68a' : '#fecaca'}
            stroke={i === 0 ? '#b45309' : '#b91c1c'}
          />
          <text
            x={X(o) + (o.w * CELL) / 2}
            y={Y(o) + (o.h * CELL) / 2 + 4}
            text-anchor="middle"
            class="text-[11px] font-semibold {i === 0 ? 'fill-amber-900' : 'fill-red-900'}"
            >{o.label}</text
          >
        {/if}
      {/each}

      <circle cx={X(task.at)} cy={Y(task.at)} r="4" fill="#0f172a" />
      <text x={X(task.at) + 6} y={Y(task.at) - 6} class="fill-slate-900 text-[13px] font-bold"
        >A</text
      >

      {#if reveal}
        <line
          x1={X(task.at)}
          y1={Y(task.at)}
          x2={X(key)}
          y2={Y(key)}
          stroke="#16a34a"
          stroke-width="3"
          stroke-dasharray="6 4"
        />
        <polygon points={arrowHead(X(task.at), Y(task.at), X(key), Y(key), 12)} fill="#16a34a" />
      {/if}

      {#if !result.empty}
        {@const end = shaftEnd(X(tail), Y(tail), X(tip), Y(tip), 12)}
        <line x1={X(tail)} y1={Y(tail)} x2={end.x} y2={end.y} stroke="#dc2626" stroke-width="3.5" />
        <polygon points={arrowHead(X(tail), Y(tail), X(tip), Y(tip), 12)} fill="#dc2626" />
        <text
          x={(X(tail) + X(tip)) / 2 + 6}
          y={(Y(tail) + Y(tip)) / 2 - 8}
          class="fill-red-700 text-[13px] font-bold">F</text
        >
      {/if}

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Gốc mũi tên: dùng phím mũi tên để dời từng ô"
        aria-valuemin={0}
        aria-valuemax={COLS}
        aria-valuenow={tail.c}
        aria-valuetext="Gốc ở cột {tail.c}, hàng {tail.r}{result.point ? ', trùng điểm A' : ''}"
        style="cursor:grab; outline:none"
        use:draggable={dragFor('tail')}
      >
        <circle
          class="drag-knob"
          cx={X(tail)}
          cy={Y(tail)}
          r="7"
          fill="#fff"
          stroke="#2563eb"
          stroke-width="3"
        />
      </g>
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Ngọn mũi tên: dùng phím mũi tên để dời từng ô"
        aria-valuemin={0}
        aria-valuemax={COLS}
        aria-valuenow={tip.c}
        aria-valuetext="Ngọn ở cột {tip.c}, hàng {tip.r}. {drawn}"
        style="cursor:grab; outline:none"
        use:draggable={dragFor('tip')}
      >
        <circle
          class="drag-knob"
          cx={X(tip)}
          cy={Y(tip)}
          r="7"
          fill="#fff"
          stroke="#dc2626"
          stroke-width="3"
        />
      </g>
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Kéo chấm xanh (gốc) và chấm đỏ (ngọn) của mũi tên; chúng bám vào các nút lưới.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={() => (reveal = !reveal)}>
      {reveal ? 'Ẩn mũi tên mẫu' : 'Xem mũi tên mẫu'}
    </button>
  </div>

  {#if checked}
    <ul class="space-y-1 text-sm">
      {#each rows as row, i (i)}
        <li class={row.ok ? 'text-emerald-800' : 'text-amber-900'}>
          <span aria-hidden="true">{row.ok ? '✓' : '✗'}</span>
          {row.text}
        </li>
      {/each}
    </ul>
  {/if}

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {checked && result.correct
      ? 'bg-emerald-50 text-emerald-800'
      : checked
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {live}
  </p>
</div>

<style>
  .drag-handle:focus-visible .drag-knob {
    stroke-width: 5;
  }
</style>
