<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import SignIcon from './sign-icon.svelte';
  import {
    DOMAIN_LABELS,
    SCENARIOS,
    advance,
    choose,
    isFinished,
    isSolved,
    newRun,
    report,
  } from './engine.js';

  let run = $state(newRun());
  /** @type {number | null} */
  let lastPick = $state(null);
  /** @type {HTMLElement | undefined} */
  let heading = $state();

  const finished = $derived(isFinished(run));
  const scenario = $derived(SCENARIOS[run.index]);
  const solved = $derived(!finished && isSolved(run, run.index));
  const tried = $derived(finished ? [] : run.tried[run.index]);
  const rows = $derived(report(run));
  const firstTries = $derived(rows.reduce((sum, r) => sum + r.firstTry, 0));
  const weak = $derived(rows.filter((r) => r.firstTry < r.total).map((r) => r.label));

  const note = $derived.by(() => {
    if (lastPick === null) {
      return /** @type {const} */ ({ tone: 'info', text: 'Em sẽ làm gì? Chọn một cách xử lí.' });
    }
    const option = scenario.options[lastPick];
    return option.safe
      ? /** @type {const} */ ({ tone: 'ok', text: option.why })
      : /** @type {const} */ ({
          tone: 'warn',
          text: `Chưa an toàn: ${option.why}${solved ? '' : ' Chọn lại nhé.'}`,
        });
  });

  /** @param {number} index */
  function pick(index) {
    run = choose(run, index);
    lastPick = index;
  }

  function next() {
    run = advance(run);
    lastPick = null;
    queueMicrotask(() => heading?.focus());
  }

  function restart() {
    run = newRun();
    lastPick = null;
    queueMicrotask(() => heading?.focus());
  }
</script>

{#if finished}
  <div class="space-y-3">
    <p
      bind:this={heading}
      tabindex="-1"
      class="rounded font-semibold text-slate-800 focus:outline-none"
      aria-live="polite"
    >
      Em xử lí đúng ngay lần đầu {firstTries}/{SCENARIOS.length} tình huống.
    </p>
    <ul class="grid gap-2 sm:grid-cols-2">
      {#each rows as r (r.domain)}
        <li
          class="{card} flex items-center justify-between gap-3 px-4 py-3 text-sm tabular-nums {r.firstTry ===
          r.total
            ? 'text-emerald-800'
            : 'text-amber-900'}"
        >
          <span class="font-semibold">{r.label}</span>
          <span>{r.firstTry}/{r.total}</span>
        </li>
      {/each}
    </ul>
    <FeedbackNote
      tone={weak.length === 0 ? 'ok' : 'info'}
      text={weak.length === 0
        ? 'Rất tốt: em đã chọn được cách an toàn ngay từ lần đầu ở mọi tình huống.'
        : `Nên đọc lại các quy tắc về: ${weak.join(', ')}.`}
    />
    <button type="button" class={button.primary} onclick={restart}>Làm lại từ đầu</button>
  </div>
{:else}
  <div class="space-y-3">
    <p class="text-sm font-semibold text-slate-600 tabular-nums">
      Tình huống {run.index + 1}/{SCENARIOS.length} · {DOMAIN_LABELS[scenario.domain]}
    </p>
    <div class="flex items-start gap-3">
      <div class="shrink-0">
        <SignIcon name={scenario.sign} label="Biển báo minh hoạ tình huống" />
      </div>
      <p
        bind:this={heading}
        tabindex="-1"
        class="rounded font-semibold text-slate-800 focus:outline-none"
      >
        <LiveRichText text={scenario.situation} />
      </p>
    </div>
    <ul class="space-y-2">
      {#each scenario.options as option, i (option.text)}
        {@const picked = tried.includes(i)}
        <li>
          <button
            type="button"
            class="min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm font-medium transition {focusRing} {picked &&
            option.safe
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : picked
                ? 'border-rose-300 bg-rose-50 text-rose-900'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
            aria-pressed={picked}
            disabled={solved && !picked}
            onclick={() => pick(i)}
          >
            <LiveRichText text={option.text} />
          </button>
        </li>
      {/each}
    </ul>
    <FeedbackNote tone={note.tone} text={note.text} />
    <button type="button" class={button.primary} disabled={!solved} onclick={next}>
      {run.index + 1 === SCENARIOS.length ? 'Xem kết quả' : 'Tình huống tiếp theo'}
    </button>
  </div>
{/if}
