<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { STAGES, judgeDuel, makeDuel, milestonesIn, nextRound } from './engine.js';

  /** @type {Record<import('./engine.js').StageId, { dot: string, text: string }>} */
  const STAGE_STYLE = {
    tien: { dot: 'bg-amber-500', text: 'text-amber-800' },
    'co-dien': { dot: 'bg-indigo-500', text: 'text-indigo-700' },
    'hien-dai': { dot: 'bg-emerald-500', text: 'text-emerald-800' },
  };

  let mode = $state('line');
  /** @type {import('./engine.js').StageId | 'all'} */
  let stage = $state('all');
  /** @type {string | null} */
  let open = $state(null);
  let round = $state(0);
  /** @type {string | null} */
  let picked = $state(null);
  let right = $state(0);
  let played = $state(0);

  const list = $derived(milestonesIn(stage));
  const info = $derived(STAGES.find((s) => s.id === stage) ?? null);
  const duel = $derived(makeDuel(list, round));
  const verdict = $derived(picked ? judgeDuel(duel, picked) : null);

  function nextDuel() {
    round = nextRound(list, round);
    picked = null;
  }

  /** @param {string} id */
  function pick(id) {
    if (picked) return;
    picked = id;
    played += 1;
    if (judgeDuel(duel, id).ok) right += 1;
  }

  /** @param {string | number} value */
  function changeStage(value) {
    stage = /** @type {import('./engine.js').StageId | 'all'} */ (value);
    open = null;
    picked = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cách xem"
    options={[
      { value: 'line', label: 'Dòng thời gian' },
      { value: 'duel', label: 'Đố thứ tự' },
    ]}
    bind:value={mode}
  />
  <SegmentedControl
    label="Lọc theo giai đoạn"
    options={[
      { value: 'all', label: 'Tất cả' },
      ...STAGES.map(({ id, label }) => ({ value: id, label })),
    ]}
    value={stage}
    onchange={changeStage}
  />

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {#if info}
      <span class="font-semibold">{info.label} ({info.span}).</span>
      {info.method}
    {:else}
      <span class="font-semibold">{list.length} mốc qua ba giai đoạn.</span>
      Chọn một giai đoạn để xem phương pháp nghiên cứu của nó.
    {/if}
  </p>

  {#if mode === 'line'}
    <ol class="space-y-2">
      {#each list as m (m.id)}
        <li class="{card} overflow-hidden">
          <button
            type="button"
            class="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50 {focusRing}"
            aria-expanded={open === m.id}
            onclick={() => (open = open === m.id ? null : m.id)}
          >
            <span
              class="h-3 w-3 shrink-0 rounded-full {STAGE_STYLE[m.stage].dot}"
              aria-hidden="true"
            ></span>
            <span class="w-24 shrink-0 text-sm font-bold tabular-nums {STAGE_STYLE[m.stage].text}">
              {m.when}
            </span>
            <span class="min-w-0 flex-1 text-sm text-slate-800">
              <span class="font-semibold">{m.who}:</span>
              {m.title}
            </span>
          </button>
          {#if open === m.id}
            <div class="border-t border-slate-200 px-4 py-3 text-sm text-slate-700">
              {#if m.crisis}
                <p class="mb-1 font-semibold text-rose-700">
                  Phát hiện góp phần gây khủng hoảng của vật lí cuối thế kỉ XIX
                </p>
              {/if}
              <p><LiveRichText text={m.detail} /></p>
            </div>
          {/if}
        </li>
      {/each}
    </ol>
  {:else}
    <div class="{card} space-y-3 p-4">
      <p class="font-semibold text-slate-900">Mốc nào xảy ra trước?</p>
      <div class="grid gap-2 sm:grid-cols-2">
        {#each [duel.first, duel.second] as m (m.id)}
          <button
            type="button"
            class="{button.quiet} justify-start! text-left"
            disabled={picked !== null}
            onclick={() => pick(m.id)}
          >
            <span>
              <span class="block">{m.who}</span>
              <span class="block text-sm font-normal">{m.title}</span>
            </span>
          </button>
        {/each}
      </div>
      {#if verdict}
        <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
        <button type="button" class={button.primary} onclick={nextDuel}>Câu khác</button>
      {/if}
      <p class="text-sm text-slate-600">Đúng {right} trên {played} câu đã trả lời.</p>
    </div>
  {/if}
</div>
