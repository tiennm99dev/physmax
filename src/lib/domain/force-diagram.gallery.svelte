<script module>
  export const title = 'Giản đồ lực';
</script>

<script>
  import ForceDiagram from './force-diagram.svelte';

  let forces = $state([
    { label: 'F₁', magnitude: 30, angle: 0 },
    { label: 'F₂', magnitude: 40, angle: 90 },
  ]);
  let onTable = $state([
    { label: 'P', magnitude: 20, angle: 270 },
    { label: 'N', magnitude: 20, angle: 90 },
  ]);
</script>

<div class="grid gap-4 md:grid-cols-2">
  <ForceDiagram bind:forces interactive showComponents label="Tổng hợp hai lực" />
  <ForceDiagram
    bind:forces={onTable}
    interactive
    fixedAngles
    body="box"
    label="Hộp nằm trên bàn: trọng lực và phản lực"
  />
</div>
