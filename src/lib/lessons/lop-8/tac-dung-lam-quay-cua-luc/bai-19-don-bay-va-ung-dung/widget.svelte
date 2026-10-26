<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    HOLES,
    SPACING_CM,
    TASKS,
    arms,
    balanced,
    balancingEffort,
    effortDirection,
    forceGain,
    leverKind,
    netMoment,
    taskDone,
  } from './engine.js';

  const VW = 360;
  const VH = 270;
  const X0 = 30;
  const GAP = 25;
  const BY = 130;
  const MAX_EFFORT = 200;

  /** @typedef {'o' | 'load' | 'effort'} Part */

  let o = $state(6);
  let load = $state(3);
  let effortAt = $state(12);
  let weight = $state(60);
  let effort = $state(10);
  let taskAt = $state(0);
  let challenge = $state(false);

  const setup = $derived({ o, load, effort: effortAt });
  const d = $derived(arms(setup));
  const kind = $derived(leverKind(setup));
  const need = $derived(balancingEffort(weight, setup));
  const isBalanced = $derived(balanced(weight, effort, setup));
  const net = $derived(netMoment(weight, effort, setup));
  const down = $derived(effortDirection(setup) === 'xuong');
  const gain = $derived(forceGain(setup));
  const task = $derived(TASKS[taskAt]);
  const done = $derived(challenge && taskDone(task, weight, effort, setup));

  // Tilt in degrees, clockwise positive; level when balanced or when F2 acts at O.
  const tilt = $derived(isBalanced || load === o ? 0 : Math.max(-10, Math.min(10, net * 2)));
  const ox = $derived(X0 + o * GAP);
  /** Point of hole `i` on the tilted bar. @param {number} i */
  const at = (i) => {
    const dx = (i - o) * GAP;
    const t = (tilt * Math.PI) / 180;
    return { x: ox + dx * Math.cos(t), y: BY + dx * Math.sin(t) };
  };
  const ends = $derived({ a: at(0), b: at(HOLES - 1) });
  const p1 = $derived(at(load));
  const p2 = $derived(at(effortAt));
  const f1Len = $derived(weight * 0.9);
  const f2Len = $derived(Math.min(100, effort * 0.9));
  const f2End = $derived({ x: p2.x, y: p2.y + (down ? f2Len : -f2Len) });
  const f2Shaft = $derived(shaftEnd(p2.x, p2.y, f2End.x, f2End.y));
  const f1Shaft = $derived(shaftEnd(p1.x, p1.y, p1.x, p1.y + f1Len));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { o: { x: 0, y: 0 }, load: { x: 0, y: 0 }, effort: { x: 0, y: 0 } };

  /** @param {Part} part */
  const holeOf = (part) => (part === 'o' ? o : part === 'load' ? load : effortAt);

  /**
   * Moves one part to hole `i`, unless another part is there.
   * @param {Part} part
   * @param {number} i
   */
  function moveTo(part, i) {
    const next = Math.max(0, Math.min(HOLES - 1, Math.round(i)));
    const taken = /** @type {Part[]} */ (['o', 'load', 'effort'])
      .filter((p) => p !== part)
      .map(holeOf);
    if (taken.includes(next)) return;
    if (part === 'o') o = next;
    else if (part === 'load') load = next;
    else effortAt = next;
  }

  /** Next free hole from `from` in direction `step`. @param {Part} part @param {number} step */
  function stepPart(part, step) {
    let i = holeOf(part) + step;
    while (i >= 0 && i < HOLES) {
      const before = holeOf(part);
      moveTo(part, i);
      if (holeOf(part) !== before) return;
      i += step;
    }
  }

  /** @param {Part} part */
  const dragFor = (part) => ({
    point: scratch[part],
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => moveTo(part, (scratch[part].x - X0) / GAP),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => stepPart(part, dx !== 0 ? dx : -dy),
  });

  const num = (/** @type {number} */ v, k = 2) => formatNumber(v, k);
  const m = (/** @type {number} */ cm) => num(cm / 100);
  const KIND_TEXT = {
    1: 'Đòn bẩy loại 1: điểm tựa O nằm giữa O₁ và O₂.',
    2: 'Đòn bẩy loại 2: điểm tựa O nằm ngoài, vật O₁ ở giữa, lực tác dụng xa điểm tựa hơn vật.',
    3: 'Đòn bẩy loại 3: điểm tựa O nằm ngoài, lực tác dụng O₂ ở giữa, gần điểm tựa hơn vật.',
  };
  const GAIN_TEXT = {
    loi: 'd₂ > d₁ nên F₂ < F₁: được lợi về lực.',
    thiet: 'd₂ < d₁ nên F₂ > F₁: không được lợi về lực (bù lại vật di chuyển nhanh, xa hơn tay).',
    bang: 'd₂ = d₁ nên F₂ = F₁: không được lợi về lực.',
  };

  const feedback = $derived.by(() => {
    if (load === o)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Vật đặt ngay trên điểm tựa: điểm tựa đỡ toàn bộ vật, không cần lực tác dụng. Hãy dời vật ra khỏi O.',
      };
    if (need === null)
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Lực tác dụng đặt ngay tại điểm tựa: giá của lực đi qua trục quay nên không làm đòn bẩy quay. Dời điểm đặt lực ra xa O.',
      };
    const info = `${kind ? KIND_TEXT[kind] : ''} ${gain ? GAIN_TEXT[gain] : ''} Lực tác dụng hướng ${down ? 'xuống dưới' : 'lên trên'}.`;
    if (isBalanced) {
      const exact = need === effort ? '' : ` (đúng ra cần ${num(need)} N)`;
      const prefix = done ? 'Hoàn thành thử thách! ' : '';
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${prefix}Cân bằng: F₁ · d₁ = ${weight} N × ${m(d.d1)} m = ${num((weight * d.d1) / 100)} N·m và F₂ · d₂ = ${effort} N × ${m(d.d2)} m = ${num((effort * d.d2) / 100)} N·m${exact}. ${info}`,
      };
    }
    const loadWins = net * (load - o) > 0;
    if (need > MAX_EFFORT)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Cần lực ${num(need)} N, vượt quá ${MAX_EFFORT} N. Hãy đưa lực ra xa điểm tựa hoặc đưa vật lại gần điểm tựa. ${info}`,
      };
    return {
      tone: /** @type {const} */ ('warn'),
      text: loadWins
        ? `F₂ · d₂ < F₁ · d₁: vật kéo đòn bẩy quay, chưa nâng được. Tăng F₂ hoặc tăng d₂. ${info}`
        : `F₂ · d₂ > F₁ · d₁: lực tác dụng thắng, vật bị nâng lên. Giảm F₂ để giữ đòn bẩy cân bằng. ${info}`,
    };
  });

  function nextTask() {
    if (challenge) taskAt = (taskAt + 1) % TASKS.length;
    challenge = true;
    weight = TASKS[taskAt].weight;
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Trọng lượng vật F₁"
      options={[20, 40, 60].map((v) => ({ value: v, label: `${v} N` }))}
      bind:value={weight}
    />
    <SliderField label="Lực tác dụng F₂" bind:value={effort} min={0} max={MAX_EFFORT} unit="N" />
  </div>

  <div class="grid gap-4 sm:grid-cols-[3fr_2fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="mx-auto block w-full max-w-md touch-none select-none"
        role="img"
        aria-label="Đòn bẩy có {HOLES} lỗ cách nhau {SPACING_CM} xăng-ti-mét. Điểm tựa ở lỗ {o}, vật ở lỗ {load}, lực tác dụng ở lỗ {effortAt}. {isBalanced
          ? 'Đòn bẩy nằm cân bằng.'
          : 'Đòn bẩy đang nghiêng.'}"
      >
        <rect x="0" y={BY + 44} width={VW} height={VH - BY - 44} fill="#e2e8f0" />
        <!-- bar -->
        <line
          x1={ends.a.x}
          y1={ends.a.y}
          x2={ends.b.x}
          y2={ends.b.y}
          stroke="#78350f"
          stroke-width="8"
          stroke-linecap="round"
        />
        {#each Array.from({ length: HOLES }, (_, i) => i) as i (i)}
          {@const h = at(i)}
          <circle cx={h.x} cy={h.y} r="2" fill="#fde68a" />
        {/each}
        <!-- fulcrum -->
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Điểm tựa O: dùng phím mũi tên để dời"
          aria-valuemin={0}
          aria-valuemax={HOLES - 1}
          aria-valuenow={o}
          aria-valuetext="Điểm tựa ở lỗ {o}"
          style="cursor:grab; outline:none"
          use:draggable={dragFor('o')}
        >
          <polygon
            class="drag-knob"
            points="{ox},{BY + 5} {ox - 16},{BY + 44} {ox + 16},{BY + 44}"
            fill="#475569"
            stroke="#1e293b"
            stroke-width="2"
          />
        </g>
        <text x={ox - 4} y={BY + 60} class="fill-slate-800 text-[13px] font-bold">O</text>
        <!-- load -->
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Vật cần nâng: dùng phím mũi tên để dời"
          aria-valuemin={0}
          aria-valuemax={HOLES - 1}
          aria-valuenow={load}
          aria-valuetext="Vật ở lỗ {load}, cách điểm tựa {m(d.d1)} mét"
          style="cursor:grab; outline:none"
          use:draggable={dragFor('load')}
        >
          <rect
            class="drag-knob"
            x={p1.x - 15}
            y={p1.y - 32}
            width="30"
            height="28"
            rx="3"
            fill="#2563eb"
            stroke="#1e3a8a"
            stroke-width="2"
          />
          <text
            x={p1.x}
            y={p1.y - 14}
            text-anchor="middle"
            class="pointer-events-none fill-white text-[10px] font-bold">{weight}N</text
          >
        </g>
        <line x1={p1.x} y1={p1.y} x2={f1Shaft.x} y2={f1Shaft.y} stroke="#1d4ed8" stroke-width="3" />
        <polygon points={arrowHead(p1.x, p1.y, p1.x, p1.y + f1Len)} fill="#1d4ed8" />
        <text x={p1.x + 6} y={p1.y + f1Len} class="fill-blue-800 text-[12px] font-bold">F₁</text>
        <!-- effort -->
        {#if effort > 0}
          <line
            x1={p2.x}
            y1={p2.y}
            x2={f2Shaft.x}
            y2={f2Shaft.y}
            stroke="#dc2626"
            stroke-width="3"
          />
          <polygon points={arrowHead(p2.x, p2.y, f2End.x, f2End.y)} fill="#dc2626" />
          <text
            x={p2.x + 8}
            y={down ? f2End.y : f2End.y + 10}
            class="fill-red-700 text-[12px] font-bold">F₂</text
          >
        {/if}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Điểm đặt lực tác dụng: dùng phím mũi tên để dời"
          aria-valuemin={0}
          aria-valuemax={HOLES - 1}
          aria-valuenow={effortAt}
          aria-valuetext="Lực tác dụng ở lỗ {effortAt}, cách điểm tựa {m(d.d2)} mét"
          style="cursor:grab; outline:none"
          use:draggable={dragFor('effort')}
        >
          <circle
            class="drag-knob"
            cx={p2.x}
            cy={p2.y}
            r="8"
            fill="#fff"
            stroke="#dc2626"
            stroke-width="3"
          />
        </g>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kéo điểm tựa (tam giác), vật (hộp xanh) và điểm đặt lực (chấm đỏ) tới các lỗ. Hai lỗ liền
        nhau cách {SPACING_CM} cm.
      </figcaption>
    </figure>

    <div class="space-y-3">
      <dl class="grid gap-2 text-sm tabular-nums">
        <div class="flex justify-between gap-2 rounded-xl bg-blue-50 px-3 py-2">
          <dt class="text-blue-800">d₁ = OO₁</dt>
          <dd class="font-semibold">{m(d.d1)} m</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-red-50 px-3 py-2">
          <dt class="text-red-800">d₂ = OO₂</dt>
          <dd class="font-semibold">{m(d.d2)} m</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">F₁ · d₁</dt>
          <dd class="font-semibold">{num((weight * d.d1) / 100)} N·m</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">F₂ · d₂</dt>
          <dd class="font-semibold">{num((effort * d.d2) / 100)} N·m</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-indigo-50 px-3 py-2">
          <dt class="text-indigo-700">Loại đòn bẩy</dt>
          <dd class="font-semibold text-indigo-900">{kind ? `Loại ${kind}` : '—'}</dd>
        </div>
      </dl>
      <div class="{card} space-y-2 p-3">
        <p class="text-sm {challenge ? 'font-semibold' : ''} text-slate-700">
          {challenge
            ? `Thử thách: ${task.text}`
            : 'Thử thách: dựng đúng loại đòn bẩy và giữ vật cân bằng với lực cho trước.'}
        </p>
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.secondary} onclick={nextTask}>
            {challenge ? 'Thử thách khác' : 'Bắt đầu thử thách'}
          </button>
          {#if challenge}
            <button type="button" class={button.quiet} onclick={() => (challenge = false)}>
              Thoát thử thách
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
