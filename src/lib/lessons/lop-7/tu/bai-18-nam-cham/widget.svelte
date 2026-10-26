<script>
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { REACH, interaction, rightPole, settle, strength } from './engine.js';

  const W = 480;
  const H = 200;
  const Y = 110;
  const L = 150;
  const T = 44;
  const A_LEFT = 20;
  const A_RIGHT = A_LEFT + L;
  const MAX_GAP = W - 10 - L - A_RIGHT;

  /** @typedef {import('./engine.js').Pole} Pole */

  let mode = $state('quan-sat');
  /** @type {Pole} */
  let aLeft = $state('N');
  /** @type {Pole} */
  let bLeft = $state('N');
  let gap = $state(120);
  /** @type {Pole | null} */
  let guess = $state(null);
  /** Whether B was just pushed away by A on release (it then rests out of reach). */
  let pushed = $state(false);

  const shown = new Tween(120, { duration: 380 });
  const handle = $state({ x: A_RIGHT + 120 + L / 2, y: Y });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const hidden = $derived(mode === 'bi-an');
  const aFace = $derived(rightPole(aLeft));
  const kind = $derived(interaction(aFace, bLeft));
  const near = $derived(gap < REACH);
  const pull = $derived(strength(shown.current));
  const arrowLen = $derived(shown.current < REACH ? 14 + 56 * pull : 0);

  /** @param {number} g @param {boolean} animate */
  function moveTo(g, animate) {
    gap = Math.max(0, Math.min(MAX_GAP, Math.round(g)));
    handle.x = A_RIGHT + gap + L / 2;
    handle.y = Y;
    shown.set(gap, { duration: animate && !prefersReducedMotion.current ? 380 : 0 });
  }

  function release() {
    pushed = gap < REACH && kind === 'day';
    moveTo(settle(gap, kind), true);
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      pushed = false;
      moveTo(p.x - L / 2 - A_RIGHT, false);
      return { x: A_RIGHT + gap + L / 2, y: Y };
    },
    onEnd: release,
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ _dy,
      /** @type {boolean} */ big,
    ) => {
      if (dx === 0) return;
      moveTo(gap + dx * (big ? 30 : 10), false);
      release();
    },
  });

  function flipA() {
    aLeft = aLeft === 'N' ? 'S' : 'N';
    release();
  }
  function flipB() {
    bLeft = bLeft === 'N' ? 'S' : 'N';
    guess = null;
    release();
  }
  function newMystery() {
    bLeft = Math.random() < 0.5 ? 'N' : 'S';
    guess = null;
    pushed = false;
    moveTo(120, true);
  }

  /** @param {string | number} v */
  function chooseMode(v) {
    guess = null;
    if (v === 'bi-an') newMystery();
  }

  const name = (/** @type {Pole} */ p) => (p === 'N' ? 'cực Bắc (N)' : 'cực Nam (S)');
  const colour = (/** @type {Pole} */ p) => (p === 'N' ? '#dc2626' : '#2563eb');

  const status = $derived.by(() => {
    if (hidden) {
      if (guess) {
        return guess === bLeft
          ? `Đúng! Đầu trái của nam châm B là ${name(bLeft)}.`
          : `Chưa đúng. Hãy đưa B lại gần A, quan sát hút hay đẩy rồi so với cực đầu phải của A (${name(aFace)}).`;
      }
      if (!near && gap > 0 && !pushed) {
        return `Kéo nam châm B lại gần đầu phải của A (đang là ${name(aFace)}) để thử.`;
      }
      return kind === 'hut'
        ? `Hai nam châm hút nhau. Đầu phải của A là ${name(aFace)}. Vậy đầu trái của B là cực gì?`
        : `Hai nam châm đẩy nhau. Đầu phải của A là ${name(aFace)}. Vậy đầu trái của B là cực gì?`;
    }
    const pair = `Đầu phải của A là ${name(aFace)}, đầu trái của B là ${name(bLeft)}`;
    if (!near && gap > 0 && !pushed) {
      return `${pair}. Hai nam châm còn xa nhau nên lực từ yếu; kéo B lại gần A.`;
    }
    return kind === 'hut'
      ? `${pair}: hai cực khác tên nên hút nhau, B bị kéo dính vào A.`
      : `${pair}: hai cực cùng tên nên đẩy nhau, B bị đẩy ra xa.`;
  });

  const tone = $derived(
    hidden && guess ? (guess === bLeft ? 'ok' : 'warn') : near || pushed ? 'ok' : 'info',
  );
  const bx = $derived(A_RIGHT + shown.current);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'quan-sat', label: 'Quan sát' },
      { value: 'bi-an', label: 'Nam châm bí ẩn' },
    ]}
    bind:value={mode}
    onchange={chooseMode}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Hai thanh nam châm A và B trên cùng một đường thẳng. {status}"
    >
      <line x1="10" y1={Y + T / 2 + 6} x2={W - 10} y2={Y + T / 2 + 6} stroke="#cbd5e1" />

      <!-- magnet A, fixed -->
      <g aria-hidden="true">
        <rect x={A_LEFT} y={Y - T / 2} width={L / 2} height={T} fill={colour(aLeft)} />
        <rect x={A_LEFT + L / 2} y={Y - T / 2} width={L / 2} height={T} fill={colour(aFace)} />
        <text x={A_LEFT + 18} y={Y + 7} class="fill-white text-[20px] font-bold">{aLeft}</text>
        <text x={A_RIGHT - 30} y={Y + 7} class="fill-white text-[20px] font-bold">{aFace}</text>
        <text x={A_LEFT + L / 2} y={Y - T / 2 - 10} text-anchor="middle" class="fill-slate-700"
          >A (cố định)</text
        >
      </g>

      <!-- force arrows -->
      {#if arrowLen > 0}
        {@const dir = kind === 'hut' ? 1 : -1}
        <g
          aria-hidden="true"
          stroke="#16a34a"
          fill="#16a34a"
          stroke-width="4"
          stroke-linecap="round"
        >
          <!-- on A: toward B when attracting, away when repelling -->
          <line
            x1={A_LEFT + L / 2}
            y1={Y - T / 2 - 34}
            x2={A_LEFT + L / 2 + dir * arrowLen}
            y2={Y - T / 2 - 34}
          />
          <path
            d="M {A_LEFT + L / 2 + dir * (arrowLen + 10)} {Y - T / 2 - 34} l {-dir *
              12} -7 l 0 14 Z"
            stroke-width="1"
          />
          <!-- on B -->
          <line
            x1={bx + L / 2}
            y1={Y + T / 2 + 26}
            x2={bx + L / 2 - dir * arrowLen}
            y2={Y + T / 2 + 26}
          />
          <path
            d="M {bx + L / 2 - dir * (arrowLen + 10)} {Y + T / 2 + 26} l {dir * 12} -7 l 0 14 Z"
            stroke-width="1"
          />
        </g>
      {/if}

      <!-- magnet B, draggable -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Nam châm B: kéo ngang hoặc dùng phím mũi tên trái, phải để đưa lại gần hay ra xa nam châm A"
        aria-valuemin="0"
        aria-valuemax={MAX_GAP}
        aria-valuenow={gap}
        aria-valuetext={gap === 0 ? 'chạm vào nam châm A' : `cách nam châm A ${gap} điểm ảnh`}
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <rect
          class="drag-knob"
          x={bx}
          y={Y - T / 2}
          width={L}
          height={T}
          fill="none"
          stroke="#0f172a"
          stroke-width="2"
        />
        <rect
          x={bx}
          y={Y - T / 2}
          width={L / 2}
          height={T}
          fill={hidden ? '#94a3b8' : colour(bLeft)}
        />
        <rect
          x={bx + L / 2}
          y={Y - T / 2}
          width={L / 2}
          height={T}
          fill={hidden ? '#64748b' : colour(rightPole(bLeft))}
        />
        <text x={bx + 14} y={Y + 7} class="fill-white text-[20px] font-bold"
          >{hidden ? '?' : bLeft}</text
        >
        <text x={bx + L - 28} y={Y + 7} class="fill-white text-[20px] font-bold"
          >{hidden ? '?' : rightPole(bLeft)}</text
        >
        <text x={bx + L / 2} y={Y - T / 2 - 10} text-anchor="middle" class="fill-slate-700">B</text>
      </g>
    </svg>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={flipA}>Quay ngược nam châm A</button>
    {#if hidden}
      <button type="button" class={button.quiet} onclick={newMystery}>Nam châm bí ẩn khác</button>
    {:else}
      <button type="button" class={button.quiet} onclick={flipB}>Quay ngược nam châm B</button>
    {/if}
  </div>

  {#if hidden}
    <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Đầu trái của B là">
      <span class="text-slate-700">Đầu trái của B là:</span>
      <button type="button" class={button.secondary} onclick={() => (guess = 'N')}
        >Cực Bắc (N)</button
      >
      <button type="button" class={button.secondary} onclick={() => (guess = 'S')}
        >Cực Nam (S)</button
      >
    </div>
  {/if}

  <FeedbackNote {tone} text={status} />
</div>
