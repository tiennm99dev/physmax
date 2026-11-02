<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { BRANCH_BINS, BRANCH_CARDS } from './engine.js';

  const cards = shuffled(BRANCH_CARDS, 29);
</script>

<CardSorter {cards} bins={BRANCH_BINS} label="Xếp thành tựu vào các nhánh của vật lí cổ điển" />
