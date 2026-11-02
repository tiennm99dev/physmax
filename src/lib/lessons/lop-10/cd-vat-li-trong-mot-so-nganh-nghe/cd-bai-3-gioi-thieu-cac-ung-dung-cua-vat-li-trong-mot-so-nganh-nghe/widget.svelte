<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { CAREERS, isRight, tally } from './engine.js';

  let index = $state(0);
  /** @type {Record<string, number>} */
  let guesses = $state({});
  /** Cards turned back to their front after being answered. @type {Record<string, boolean>} */
  let turnedBack = $state({});

  const career = $derived(CAREERS[index]);
  const guess = $derived(guesses[career.id]);
  const answered = $derived(guess !== undefined);
  const flipped = $derived(answered && !turnedBack[career.id]);
  const stats = $derived(tally(guesses));

  /** @param {number} option */
  function choose(option) {
    if (answered) return;
    guesses = { ...guesses, [career.id]: option };
    turnedBack = { ...turnedBack, [career.id]: false };
  }

  function turn() {
    turnedBack = { ...turnedBack, [career.id]: flipped };
  }

  /** @param {number} step */
  function go(step) {
    index = (index + step + CAREERS.length) % CAREERS.length;
  }

  function restart() {
    guesses = {};
    turnedBack = {};
    index = 0;
  }

  /** @param {import('./engine.js').Career} c */
  function chipClass(c) {
    const g = guesses[c.id];
    if (c.id === career.id) return 'border-indigo-600 bg-indigo-600 text-white';
    if (g === undefined) return 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50';
    return isRight(c, g)
      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
      : 'border-amber-500 bg-amber-50 text-amber-900';
  }
</script>

<div class="space-y-4">
  <ul class="flex flex-wrap gap-2" aria-label="Chọn thẻ ngành nghề">
    {#each CAREERS as c, i (c.id)}
      <li>
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 py-1 text-sm font-medium transition {chipClass(
            c,
          )} {focusRing}"
          aria-current={i === index ? 'true' : undefined}
          onclick={() => (index = i)}
        >
          {c.sector}
        </button>
      </li>
    {/each}
  </ul>

  {#key career.id}
    <div class="[perspective:1200px]">
      <div
        class="grid transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none {flipped
          ? '[transform:rotateY(180deg)]'
          : ''}"
      >
        <div
          class="{card} space-y-3 p-4 [backface-visibility:hidden] [grid-area:1/1]"
          inert={flipped}
        >
          <p class="text-sm font-semibold text-indigo-700">{career.sector}</p>
          <p class="text-lg font-bold text-slate-900">{career.job}</p>
          <p class="text-slate-700">{career.task}</p>
          <p class="text-sm font-semibold text-slate-700">Nghề này dùng nguyên lí vật lí nào?</p>
          <div class="grid gap-2">
            {#each career.options as text, i (text)}
              <button
                type="button"
                class="{button.quiet} justify-start! text-left text-sm"
                disabled={answered}
                onclick={() => choose(i)}
              >
                {text}
              </button>
            {/each}
          </div>
          {#if answered}
            <button type="button" class={button.secondary} onclick={turn}>Lật lại</button>
          {/if}
        </div>

        <div
          class="{card} space-y-3 p-4 [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]"
          inert={!flipped}
        >
          <p class="text-sm font-semibold text-indigo-700">{career.job}</p>
          {#if answered}
            <p
              class="rounded-xl px-3 py-2 text-sm font-semibold {isRight(career, guess)
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-amber-50 text-amber-900'}"
            >
              {isRight(career, guess) ? 'Đúng rồi.' : 'Chưa đúng.'} Đáp án:
              {career.options[career.answer]}.
            </p>
          {/if}
          <p class="text-slate-700"><LiveRichText text={career.why} /></p>
          <div class="flex flex-wrap gap-2">
            <button type="button" class={button.primary} onclick={() => go(1)}>Thẻ tiếp theo</button
            >
            <button type="button" class={button.quiet} onclick={turn}>Lật lại</button>
          </div>
        </div>
      </div>
    </div>
  {/key}

  <p class="sr-only" aria-live="polite">
    {#if answered && flipped}
      {isRight(career, guess) ? 'Đúng.' : 'Chưa đúng.'} Đáp án: {career.options[career.answer]}.
    {/if}
  </p>

  <div class="flex flex-wrap items-center gap-3">
    <p class="text-sm text-slate-600">
      Đã lật {stats.flipped}/{CAREERS.length} thẻ, đoán đúng {stats.right}.
    </p>
    {#if stats.flipped > 0}
      <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
    {/if}
  </div>
</div>
