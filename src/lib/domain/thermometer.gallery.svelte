<script module>
  export const title = 'Nhiệt kế';
</script>

<script>
  import Thermometer from './thermometer.svelte';

  let celsius = $state(37);
</script>

<div class="flex flex-wrap justify-center gap-6">
  <Thermometer bind:celsius secondScale="F" interactive label="Nhiệt kế °C và °F" />
  <Thermometer {celsius} secondScale="K" liquid="#64748b" label="Nhiệt kế °C và K" />
</div>
