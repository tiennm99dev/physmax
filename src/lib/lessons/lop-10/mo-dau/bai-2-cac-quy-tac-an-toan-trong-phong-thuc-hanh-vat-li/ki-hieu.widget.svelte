<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SignIcon from './sign-icon.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { SIGN_SETS } from './engine.js';

  let setId = $state(SIGN_SETS[0].id);
  const set = $derived(SIGN_SETS.find((s) => s.id === setId) ?? SIGN_SETS[0]);
  /** @type {Record<string, import('./engine.js').SignName>} */
  const signs = $derived(Object.fromEntries(set.cards.map((c) => [c.id, c.sign])));
  const cards = $derived(shuffled(set.cards, setId.length * 31 + 7));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bộ kí hiệu"
    options={SIGN_SETS.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={setId}
  />
  {#key setId}
    <CardSorter {cards} bins={set.bins} label="Ghép kí hiệu: {set.label}" hintOnWrong>
      {#snippet face(card)}
        <span class="flex items-center">
          <SignIcon name={signs[card.id]} label={card.label} size={52} />
        </span>
      {/snippet}
    </CardSorter>
  {/key}
</div>
