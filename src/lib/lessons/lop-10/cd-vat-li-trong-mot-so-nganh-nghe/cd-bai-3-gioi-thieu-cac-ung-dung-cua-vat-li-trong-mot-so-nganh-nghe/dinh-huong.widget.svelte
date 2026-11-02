<script>
  import { card, focusRing } from '#lib/core/ui.js';
  import { INTERESTS, suggest } from './engine.js';

  /** @type {string[]} */
  let chosen = $state([]);
  const list = $derived(suggest(chosen));
</script>

<div class="space-y-3">
  <fieldset class="{card} p-3">
    <legend class="px-1 text-sm font-semibold text-slate-700">Em thấy mình giống điều nào?</legend>
    <div class="grid gap-1 sm:grid-cols-2">
      {#each INTERESTS as interest (interest.id)}
        <label
          class="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-800 hover:bg-slate-50"
        >
          <input
            type="checkbox"
            class="h-5 w-5 shrink-0 accent-indigo-600 {focusRing}"
            value={interest.id}
            bind:group={chosen}
          />
          {interest.label}
        </label>
      {/each}
    </div>
  </fieldset>

  <div aria-live="polite" class="space-y-2">
    {#if list.length === 0}
      <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
        Chọn ít nhất một điều để xem những ngành có thể phù hợp với em.
      </p>
    {:else}
      {#each list as s (s.id)}
        <div class="{card} p-3 text-sm text-slate-700">
          <p class="font-bold text-slate-900">{s.sector}: {s.job}</p>
          <p><span class="font-semibold">Vì em:</span> {s.reasons.join('; ').toLowerCase()}.</p>
          <p><span class="font-semibold">Nên chú ý học:</span> {s.study}.</p>
        </div>
      {/each}
      <p class="text-sm text-slate-600">
        Đây chỉ là gợi ý để em tìm hiểu thêm, không phải kết luận về nghề của em.
      </p>
    {/if}
  </div>
</div>
