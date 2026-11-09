<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { HOTSPOTS, ISSUES, LANDS, issueLabel, project, tally } from './engine.js';

  const BOARD = { width: 360, height: 170, top: 85 };

  const lands = LANDS.map((ring) => pointsAttr(ring.map(([lon, lat]) => project(lon, lat, BOARD))));
  const spots = HOTSPOTS.map((s, i) => ({ ...s, n: i + 1, ...project(s.lon, s.lat, BOARD) }));

  let selected = $state(0);
  /** @type {Record<string, import('./engine.js').IssueId>} */
  let guesses = $state({});

  const spot = $derived(spots[selected]);
  const guess = $derived(guesses[spot.id]);
  const score = $derived(tally(guesses));

  /** @param {import('./engine.js').IssueId} issue */
  function choose(issue) {
    if (guess !== undefined) return;
    guesses = { ...guesses, [spot.id]: issue };
  }

  /** @param {string} id */
  function fill(id) {
    const g = guesses[id];
    if (g === undefined) return '#f59e0b';
    return g === HOTSPOTS.find((h) => h.id === id)?.issue ? '#10b981' : '#e11d48';
  }

  /** @param {KeyboardEvent} e @param {number} i */
  function onKey(e, i) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selected = i;
    }
  }

  function next() {
    const open = spots.findIndex((s, i) => i > selected && guesses[s.id] === undefined);
    const first = spots.findIndex((s) => guesses[s.id] === undefined);
    selected = open >= 0 ? open : first >= 0 ? first : (selected + 1) % spots.length;
  }

  function restart() {
    guesses = {};
    selected = 0;
  }
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {BOARD.width} {BOARD.height}"
    class="block w-full overflow-hidden rounded-xl bg-sky-100"
    role="group"
    aria-label="Bản đồ thế giới với {spots.length} điểm nóng môi trường"
  >
    {#each lands as points, i (i)}
      <polygon {points} fill="#bbf7d0" stroke="#4d7c0f" stroke-width="0.6" />
    {/each}
    {#each spots as s, i (s.id)}
      <g
        role="button"
        tabindex="-1"
        class="cursor-pointer outline-none"
        aria-label="Điểm nóng {s.n}: {s.place}"
        aria-pressed={i === selected}
        onclick={() => (selected = i)}
        onkeydown={(e) => onKey(e, i)}
      >
        <circle
          cx={s.x}
          cy={s.y}
          r={i === selected ? 9 : 7}
          fill={fill(s.id)}
          stroke={i === selected ? '#312e81' : 'white'}
          stroke-width="2"
        />
        <text
          x={s.x}
          y={s.y + 3.5}
          font-size="9"
          font-weight="700"
          fill="white"
          text-anchor="middle"
          pointer-events="none">{s.n}</text
        >
      </g>
    {/each}
  </svg>

  <ul class="flex flex-wrap gap-2" aria-label="Chọn điểm nóng">
    {#each spots as s, i (s.id)}
      <li>
        <button
          type="button"
          class="flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 px-3 text-sm font-bold text-white {focusRing}"
          style:background-color={fill(s.id)}
          style:border-color={i === selected ? '#312e81' : 'white'}
          aria-label="Điểm nóng {s.n}: {s.place}"
          aria-current={i === selected ? 'true' : undefined}
          onclick={() => (selected = i)}
        >
          {s.n}
        </button>
      </li>
    {/each}
  </ul>

  <div class="{card} space-y-3 p-4">
    <p class="text-sm font-semibold text-indigo-700">Điểm nóng {spot.n}/{spots.length}</p>
    <p class="text-lg font-bold text-slate-900">{spot.place}</p>
    <p class="text-slate-700">{spot.sign}</p>
    <p class="text-sm font-semibold text-slate-700">Đây là biểu hiện của vấn đề môi trường nào?</p>
    <div class="grid gap-2 sm:grid-cols-2">
      {#each ISSUES as issue (issue.id)}
        <button
          type="button"
          class="{button.quiet} justify-start! text-left text-sm {guess === issue.id
            ? 'ring-2 ring-indigo-500'
            : ''}"
          disabled={guess !== undefined}
          onclick={() => choose(issue.id)}
        >
          {issue.label}
        </button>
      {/each}
    </div>
    <div aria-live="polite" class="space-y-2">
      {#if guess !== undefined}
        <FeedbackNote
          tone={guess === spot.issue ? 'ok' : 'warn'}
          text="{guess === spot.issue ? 'Đúng rồi.' : 'Chưa đúng.'} Vấn đề chính: {issueLabel(
            spot.issue,
          )}."
        />
        <p class="text-sm text-slate-700">
          <span class="font-semibold">Số liệu:</span>
          {spot.fact}
        </p>
        <p class="text-sm text-slate-700">
          <span class="font-semibold">Nguyên nhân:</span>
          {spot.cause}
        </p>
      {/if}
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={next}>Điểm tiếp theo</button>
      {#if score.done > 0}
        <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
      {/if}
    </div>
  </div>

  <p class="text-sm text-slate-600">
    Đã xét {score.done}/{spots.length} điểm, đúng {score.right}. Chấm vàng: chưa xét; xanh: đúng;
    đỏ: chưa đúng.
  </p>
</div>
