<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { DEFORMATION_BINS, DEFORMATION_CARDS } from './engine.js';

  const cards = shuffled(DEFORMATION_CARDS, 33);
</script>

<CardSorter
  {cards}
  bins={DEFORMATION_BINS}
  label="Xếp các trường hợp vào biến dạng kéo hoặc biến dạng nén"
  hintOnWrong
/>
