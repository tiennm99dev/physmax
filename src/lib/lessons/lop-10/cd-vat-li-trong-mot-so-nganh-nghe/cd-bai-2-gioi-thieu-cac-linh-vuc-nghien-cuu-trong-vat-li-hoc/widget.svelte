<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { CLUES, FIELDS, fieldOf, judgeClue, linksOf } from './engine.js';

  let mode = $state('map');
  /** @type {import('./engine.js').FieldId} */
  let chosen = $state('nano');
  let clueIndex = $state(0);
  /** @type {{ ok: boolean, text: string } | null} */
  let verdict = $state(null);
  let solved = $state(0);
  let misses = $state(0);

  const field = $derived(fieldOf(chosen));
  const links = $derived(linksOf(chosen));
  const linked = $derived(new Set(links.map((l) => l.other)));
  const clue = $derived(CLUES[clueIndex]);
  const finished = $derived(solved === CLUES.length);

  /** @param {import('./engine.js').FieldId} id */
  function press(id) {
    if (mode === 'map') {
      chosen = id;
      return;
    }
    if (verdict?.ok) return;
    verdict = judgeClue(clue, id);
    if (verdict.ok) solved += 1;
    else misses += 1;
  }

  function nextClue() {
    clueIndex = (clueIndex + 1) % CLUES.length;
    verdict = null;
  }

  function restart() {
    clueIndex = 0;
    verdict = null;
    solved = 0;
    misses = 0;
  }

  /** @param {import('./engine.js').FieldId} id */
  function nodeClass(id) {
    if (mode === 'quiz') return 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50';
    if (id === chosen) return 'border-indigo-600 bg-indigo-600 text-white';
    if (linked.has(id)) return 'border-amber-500 bg-amber-50 text-amber-900';
    return 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cách dùng bản đồ"
    options={[
      { value: 'map', label: 'Xem bản đồ' },
      { value: 'quiz', label: 'Đoán nhánh' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'quiz'}
    <div class="{card} space-y-2 p-4">
      <p class="text-sm font-semibold text-indigo-700">
        Hiện tượng {clueIndex + 1}/{CLUES.length}: thuộc nhánh nào?
      </p>
      <p class="text-slate-900"><LiveRichText text={clue.text} /></p>
    </div>
  {/if}

  <div class="relative h-80 w-full" role="group" aria-label="Bản đồ các lĩnh vực của vật lí">
    <svg
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {#each FIELDS as f (f.id)}
        <line
          x1="50"
          y1="50"
          x2={f.x}
          y2={f.y}
          class="stroke-slate-300"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      {/each}
      {#if mode === 'map'}
        {#each links as l (l.other)}
          {@const other = fieldOf(l.other)}
          <line
            x1={field.x}
            y1={field.y}
            x2={other.x}
            y2={other.y}
            class="stroke-amber-500"
            stroke-width="2.5"
            stroke-dasharray="6 4"
            vector-effect="non-scaling-stroke"
          />
        {/each}
      {/if}
    </svg>
    <div
      class="absolute left-1/2 top-1/2 flex w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-slate-800 px-1 py-2 text-center text-xs font-bold text-white"
    >
      Vật lí hiện đại
    </div>
    {#each FIELDS as f (f.id)}
      <button
        type="button"
        class="absolute flex min-h-12 w-[29%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border-2 px-1 py-1 text-center text-xs font-semibold leading-tight transition {nodeClass(
          f.id,
        )} {focusRing}"
        style="left: {f.x}%; top: {f.y}%"
        aria-pressed={mode === 'map' ? chosen === f.id : undefined}
        onclick={() => press(f.id)}
      >
        {f.short}
      </button>
    {/each}
  </div>

  {#if mode === 'map'}
    <div class="{card} space-y-2 p-4 text-sm text-slate-700" aria-live="polite">
      <p class="text-base font-bold text-slate-900">{field.name}</p>
      <p><span class="font-semibold">Đối tượng:</span> <LiveRichText text={field.object} /></p>
      <p><span class="font-semibold">Hiện tượng:</span> {field.phenomena}</p>
      <p><span class="font-semibold">Mô hình lí thuyết:</span> {field.model}</p>
      <p><span class="font-semibold">Thực nghiệm:</span> {field.experiment}</p>
      <p><span class="font-semibold">Ứng dụng:</span> {field.uses}</p>
      <div class="border-t border-slate-200 pt-2">
        <p class="font-semibold text-amber-800">Liên hệ với các nhánh khác:</p>
        <ul class="mt-1 list-disc space-y-1 pl-5">
          {#each links as l (l.other)}
            <li><span class="font-semibold">{fieldOf(l.other).short}:</span> {l.why}</li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    {#if verdict}
      <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
    {/if}
    <div class="flex flex-wrap items-center gap-3">
      {#if finished}
        <button type="button" class={button.primary} onclick={restart}>Làm lại</button>
      {:else if verdict?.ok}
        <button type="button" class={button.primary} onclick={nextClue}>Hiện tượng tiếp theo</button
        >
      {/if}
      <p class="text-sm text-slate-600">
        Đã đoán đúng {solved}/{CLUES.length}, chọn nhầm {misses} lần.
      </p>
    </div>
  {/if}
</div>
