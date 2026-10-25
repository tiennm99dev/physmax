<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import { SITUATIONS, checkFlags } from './engine.js';

  /** @type {string[]} */
  let flagged = $state([]);
  let checked = $state(false);

  const result = $derived(checkFlags(SITUATIONS, flagged));

  /** @param {string} id */
  function toggle(id) {
    flagged = flagged.includes(id) ? flagged.filter((x) => x !== id) : [...flagged, id];
    checked = false;
  }

  function reset() {
    flagged = [];
    checked = false;
  }

  const verdict = $derived.by(() => {
    if (!checked) {
      return `Đã đánh dấu ${flagged.length} tình huống nguy hiểm. Nhấn "Kiểm tra" khi em làm xong.`;
    }
    if (result.perfect) {
      return `Chính xác! Em đã tìm đủ ${result.dangerous} hành vi nguy hiểm và không đánh dấu nhầm hành vi đúng.`;
    }
    const parts = [`Em tìm được ${result.found.length}/${result.dangerous} hành vi nguy hiểm.`];
    if (result.missed.length) parts.push(`Còn sót ${result.missed.length} hành vi.`);
    if (result.wrong.length) parts.push(`Có ${result.wrong.length} hành vi đúng bị đánh dấu nhầm.`);
    return parts.join(' ');
  });
</script>

<div class="space-y-4">
  <ul class="grid gap-2 sm:grid-cols-2">
    {#each SITUATIONS as s, i (s.id)}
      {@const on = flagged.includes(s.id)}
      {@const status = !checked ? null : s.danger === on ? 'ok' : s.danger ? 'missed' : 'wrong'}
      <li>
        <button
          type="button"
          aria-pressed={on}
          class="flex h-full min-h-16 w-full items-start gap-3 rounded-xl border-2 p-3 text-left text-sm transition {focusRing} {on
            ? 'border-rose-500 bg-rose-50'
            : 'border-slate-200 bg-white hover:bg-slate-50'}"
          onclick={() => toggle(s.id)}
        >
          <span
            class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold {on
              ? 'bg-rose-600 text-white'
              : 'bg-slate-200 text-slate-700'}"
            aria-hidden="true">{on ? '!' : i + 1}</span
          >
          <span class="space-y-1">
            <span class="block text-slate-800">{s.text}</span>
            {#if status}
              <span
                class="block font-semibold {status === 'ok' ? 'text-emerald-700' : 'text-rose-700'}"
              >
                {status === 'ok' ? '✓ ' : status === 'missed' ? '✗ Bỏ sót: ' : '✗ Nhầm: '}{s.why}
              </span>
            {/if}
          </span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {checked && result.perfect
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {verdict}
  </p>
</div>
