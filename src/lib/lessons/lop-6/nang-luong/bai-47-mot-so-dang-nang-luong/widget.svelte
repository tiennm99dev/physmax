<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { CARDS, FORMS } from './forms.js';

  const DECK = shuffled(CARDS, 47);
</script>

<CardSorter
  cards={DECK}
  bins={FORMS}
  label="Xếp mỗi đồ vật, hiện tượng vào dạng năng lượng chủ yếu của nó"
  hintOnWrong
/>
