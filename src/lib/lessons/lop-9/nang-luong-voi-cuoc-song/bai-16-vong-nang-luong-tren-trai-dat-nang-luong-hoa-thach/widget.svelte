<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    CYCLES,
    NODE_H,
    NODE_W,
    SUN_ID,
    cycleOf,
    ringLayout,
    route,
    stageOf,
    walk,
  } from './engine.js';

  const CYCLE_OPTIONS = CYCLES.map((c) => ({ value: c.id, label: c.label }));
  const MODES = [
    { value: 'xem', label: 'Xem từng khâu' },
    { value: 'di-theo', label: 'Đi theo năng lượng' },
  ];

  let cycleId = $state(CYCLES[0].id);
  let mode = $state('xem');
  let selected = $state(SUN_ID);
  let done = $state(0);
  let note = $state('');
  let wrong = $state(false);

  const cycle = $derived(cycleOf(cycleId));
  const layout = $derived(ringLayout(cycle.stages.length, 180, 150, 122, 100));
  const stage = $derived(stageOf(cycle, selected));
  const steps = $derived(route(cycle));
  const finished = $derived(mode === 'di-theo' && done === steps.length);
  const following = $derived(mode === 'di-theo');

  function start() {
    selected = SUN_ID;
    done = 0;
    wrong = false;
    note = '';
  }

  /** @param {string} id */
  function press(id) {
    if (!following) {
      selected = id;
      return;
    }
    if (finished) return;
    const result = walk(cycle, done, id);
    wrong = !result.ok;
    done = result.done;
    note = result.clue;
    if (result.ok) selected = id;
  }

  /**
   * @param {string} id
   * @returns {'current' | 'reached' | 'waiting'}
   */
  function look(id) {
    if (id === selected && (!following || done > 0)) return 'current';
    if (following && steps.indexOf(id) < done) return 'reached';
    return 'waiting';
  }

  const FILL = { current: 'fill-indigo-600', reached: 'fill-indigo-100', waiting: 'fill-white' };
  const INK = { current: 'fill-white', reached: 'fill-indigo-900', waiting: 'fill-slate-800' };

  /** @param {number} i */
  function arrowLit(i) {
    return !following || finished || done >= i + 3;
  }

  /** @param {KeyboardEvent} e @param {string} id */
  function onKey(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      press(id);
    }
  }

  const feedback = $derived.by(() => {
    if (!following) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Bấm vào từng khâu để xem năng lượng ở dạng nào, được lưu trữ ở đâu và chuyển hoá ra sao. Ở mỗi khâu luôn có một phần năng lượng tản ra môi trường dưới dạng nhiệt.',
      };
    }
    if (finished) {
      return { tone: /** @type {const} */ ('ok'), text: `Đã đi hết vòng. ${cycle.finished}` };
    }
    if (done === 0 && !wrong) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Năng lượng xuất phát từ đâu? Bấm vào khâu đầu tiên, rồi lần lượt bấm khâu năng lượng đi tới tiếp theo.',
      };
    }
    if (wrong) {
      return { tone: /** @type {const} */ ('warn'), text: `Chưa phải khâu này. Gợi ý: ${note}` };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đúng rồi (${done}/${steps.length} khâu). Khâu tiếp theo: ${note}`,
    };
  });
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Vòng năng lượng"
      options={CYCLE_OPTIONS}
      bind:value={cycleId}
      onchange={start}
    />
    <SegmentedControl label="Cách học" options={MODES} bind:value={mode} onchange={start} />
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 360 300"
      class="mx-auto block w-full max-w-lg"
      role="group"
      aria-label="Sơ đồ vòng năng lượng: {cycle.label}"
    >
      {#each layout.edges as edge, i (i)}
        {@const closing = i === layout.edges.length - 1}
        <g class={arrowLit(i) ? 'stroke-indigo-500' : 'stroke-slate-300'}>
          <line
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke-width="2"
            stroke-dasharray={closing ? '5 4' : undefined}
          />
          <polygon
            points="-7,-6 7,0 -7,6"
            class={arrowLit(i) ? 'fill-indigo-500' : 'fill-slate-300'}
            stroke="none"
            transform="translate({edge.mx} {edge.my}) rotate({edge.angle})"
          />
        </g>
      {/each}

      <line
        x1="180"
        y1="150"
        x2={layout.nodes[0].x}
        y2={layout.nodes[0].y}
        class="stroke-amber-400"
        stroke-width="3"
      />

      {#each cycle.stages as s, i (s.id)}
        {@const pos = layout.nodes[i]}
        {@const state = look(s.id)}
        <g
          class="drag-handle cursor-pointer"
          role="button"
          tabindex="0"
          aria-label="{s.name}{state === 'reached' ? ', đã đi qua' : ''}"
          aria-pressed={selected === s.id}
          onclick={() => press(s.id)}
          onkeydown={(e) => onKey(e, s.id)}
        >
          <rect
            x={pos.x - NODE_W / 2}
            y={pos.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            rx="10"
            class="drag-knob {FILL[state]} stroke-indigo-400"
            stroke-width="1.5"
          />
          {#each s.lines as line, j (j)}
            <text
              x={pos.x}
              y={pos.y + 4.5 + (j - (s.lines.length - 1) / 2) * 15}
              text-anchor="middle"
              font-size="12.5"
              font-weight="600"
              class={INK[state]}>{line}</text
            >
          {/each}
        </g>
      {/each}

      <g
        class="drag-handle cursor-pointer"
        role="button"
        tabindex="0"
        aria-label="Mặt Trời"
        aria-pressed={selected === SUN_ID}
        onclick={() => press(SUN_ID)}
        onkeydown={(e) => onKey(e, SUN_ID)}
      >
        <circle
          cx="180"
          cy="150"
          r="30"
          class="drag-knob {look(SUN_ID) === 'current'
            ? 'fill-amber-400 stroke-amber-700'
            : 'fill-amber-200 stroke-amber-500'}"
          stroke-width="2"
        />
        <text
          x="180"
          y="154"
          text-anchor="middle"
          font-size="12"
          font-weight="700"
          class="fill-amber-950">Mặt Trời</text
        >
      </g>
    </svg>
  </div>

  {#if !following || done > 0}
    <div class="{card} grid gap-2 p-4 text-sm text-slate-700" aria-live="polite">
      <p class="text-base font-bold text-indigo-800">{stage.name}</p>
      <p><strong>Dạng năng lượng:</strong> {stage.form}.</p>
      <p><strong>Lưu trữ:</strong> {stage.store}</p>
      <p><strong>Chuyển hoá:</strong> {stage.change}</p>
    </div>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <p class="text-sm text-slate-600">{cycle.closing}</p>

  {#if following}
    <div>
      <button type="button" class={button.quiet} onclick={start}>Đi lại từ đầu</button>
    </div>
  {/if}
</div>
