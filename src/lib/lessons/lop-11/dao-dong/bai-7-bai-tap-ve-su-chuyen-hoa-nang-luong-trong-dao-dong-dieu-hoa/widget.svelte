<script>
  import { rng } from '#lib/core/drill.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import SpringMass from '../_shared/spring-mass.svelte';
  import { energies, makeTask, meets, ratioAt, snapTo } from './engine.js';

  const KD = '#0f766e';
  const KT = '#ea580c';
  const KW = '#4f46e5';
  const BAR_W = 230;

  let seed = $state(1);
  let x = $state(0);
  let dragging = $state(false);
  let checked = $state(false);
  let solved = $state(false);
  let solvedCount = $state(0);
  let misses = $state(0);

  const task = $derived(makeTask(rng(seed * 6007 + 11)));
  const e = $derived(energies(task.k, task.A, x));
  const ok = $derived(meets(task, x));

  /** @param {number} at */
  function place(at) {
    x = snapTo(at, task.A);
    checked = false;
  }

  /** @param {PointerEvent} ev @param {(px: number) => number} invert */
  function drag(ev, invert) {
    const g = /** @type {SVGGElement} */ (ev.currentTarget);
    const svg = g.ownerSVGElement;
    if (!svg) return;
    place(invert(clientToSvg(svg, ev.clientX, ev.clientY, 360, 120).x));
  }

  /** @param {KeyboardEvent} ev */
  function nudge(ev) {
    const step = ev.shiftKey ? 1 : 0.1;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') place(x + step);
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') place(x - step);
    else if (ev.key === 'Home') place(-task.A);
    else if (ev.key === 'End') place(task.A);
    else return;
    ev.preventDefault();
  }

  function check() {
    checked = true;
    if (ok) {
      if (!solved) solvedCount += 1;
      solved = true;
    } else {
      misses += 1;
    }
  }

  function next() {
    seed += 1;
    x = 0;
    checked = false;
    solved = false;
    misses = 0;
  }

  /** @param {number} v joules */
  const mj = (v) => `${formatFixed(v * 1000, 1)} mJ`;
  const bars = $derived([
    { name: 'Wđ', value: e.Wd, color: KD },
    { name: 'Wt', value: e.Wt, color: KT },
    { name: 'W', value: e.W, color: KW },
  ]);

  const ratioText = $derived.by(() => {
    const r = ratioAt(task, x);
    return r === null
      ? 'tỉ số $\\dfrac{W_đ}{W_t}$ không xác định vì $W_t = 0$'
      : `$\\dfrac{W_đ}{W_t} = ${numTex(r, 2)}$`;
  });

  const verdict = $derived.by(() => {
    if (!checked) return null;
    const reading = `Ở $x = ${numTex(x, 1)}$ cm: $W_đ = ${numTex(e.Wd * 1000, 1)}$ mJ, $W_t = ${numTex(e.Wt * 1000, 1)}$ mJ, ${ratioText}.`;
    if (ok)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng! ${reading} Vị trí cần tìm: $|x| \\approx ${numTex(task.spot, 2)}$ cm, ở cả hai phía của O.`,
      };
    const way = Math.abs(x) < task.spot ? 'ra xa O hơn' : 'lại gần O hơn';
    return {
      tone: /** @type {const} */ ('warn'),
      text:
        misses >= 2
          ? `Chưa đúng. ${reading} Gợi ý: ${task.steps.join(' ')}`
          : `Chưa đúng. ${reading} Hãy kéo vật ${way}, hoặc tính $|x|$ trước bằng bảo toàn cơ năng.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-2 p-3">
    <p class="text-sm font-semibold text-slate-700">Đề bài số {seed}</p>
    <FeedbackNote
      tone="info"
      text={`Con lắc lò xo có $k = ${task.k}$ N/m dao động điều hoà với biên độ $A = ${task.A}$ cm. Kéo vật đến một vị trí có ${task.goal}, rồi bấm Kiểm tra.`}
    />
  </div>

  <div class="{card} space-y-2 p-2">
    <SpringMass
      {x}
      range={9}
      interactive
      marks={[-task.A, task.A]}
      label={`Con lắc lò xo, vật ở li độ ${formatNumber(x, 1)} xentimét, hai biên ở trừ ${task.A} và ${task.A} xentimét.`}
    >
      {#snippet children({ map, invert, y })}
        <g
          role="slider"
          tabindex="0"
          aria-label="Vị trí của vật, tính bằng xentimét"
          aria-valuemin={-task.A}
          aria-valuemax={task.A}
          aria-valuenow={x}
          aria-valuetext={`${formatNumber(x, 1)} xentimét`}
          class="drag-handle cursor-grab"
          onkeydown={nudge}
          onpointerdown={(ev) => {
            dragging = true;
            /** @type {SVGGElement} */ (ev.currentTarget).setPointerCapture?.(ev.pointerId);
            drag(ev, invert);
          }}
          onpointermove={(ev) => dragging && drag(ev, invert)}
          onpointerup={() => (dragging = false)}
          onpointercancel={() => (dragging = false)}
        >
          <rect
            class="drag-hit"
            x={map(x) - 26}
            y={y - 30}
            width="52"
            height="60"
            fill="transparent"
          />
          <rect
            class="drag-knob"
            x={map(x) - 19}
            y={y - 19}
            width="38"
            height="38"
            rx="6"
            fill="none"
            stroke={dragging ? '#f59e0b' : 'transparent'}
            stroke-width="3"
          />
        </g>
      {/snippet}
    </SpringMass>
    <p class="px-2 text-sm text-slate-600">
      Li độ x = {formatFixed(x, 1)} cm. Kéo khối vuông, hoặc chọn nó rồi dùng phím mũi tên (bước 0,1 cm;
      giữ Shift: 1 cm).
    </p>

    {#if checked}
      <svg
        viewBox="0 0 360 86"
        class="mx-auto block w-full max-w-md select-none"
        role="img"
        aria-label={`Động năng ${mj(e.Wd)}, thế năng ${mj(e.Wt)}, cơ năng ${mj(e.W)}.`}
      >
        {#each bars as b, i (b.name)}
          <text x="10" y={20 + i * 26} font-size="12" font-weight="600" fill={b.color}
            >{b.name}</text
          >
          <rect x="44" y={8 + i * 26} width={BAR_W} height="16" rx="3" fill="#f1f5f9" />
          <rect
            x="44"
            y={8 + i * 26}
            width={e.W > 0 ? (b.value / e.W) * BAR_W : 0}
            height="16"
            rx="3"
            fill={b.color}
          />
          <text x="354" y={20 + i * 26} font-size="11" fill="#334155" text-anchor="end">
            {mj(b.value)}
          </text>
        {/each}
      </svg>
    {/if}
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.secondary} onclick={next}>Đề khác</button>
  </div>

  <div aria-live="polite">
    {#if verdict}
      <FeedbackNote tone={verdict.tone} text={verdict.text} />
    {/if}
  </div>
  <p class="text-sm text-slate-600">Đã giải đúng {solvedCount} đề.</p>
</div>
