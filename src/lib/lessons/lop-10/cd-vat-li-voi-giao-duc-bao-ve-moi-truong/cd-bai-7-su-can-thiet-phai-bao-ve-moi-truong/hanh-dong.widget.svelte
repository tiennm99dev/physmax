<script>
  import RightWrongSorter from '#lib/core/right-wrong-sorter.svelte';
  import { ACTIONS } from './engine.js';
</script>

<RightWrongSorter label="Phân loại các việc làm đối với môi trường" actions={ACTIONS} seed={107} />
