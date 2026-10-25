<script module>
  export const title = 'Mạch điện';
</script>

<script>
  import CircuitBoard from './circuit-board.svelte';

  let mode = $state(/** @type {'series' | 'parallel'} */ ('series'));
  let resistors = $state([10, 20]);
  let voltage = $state(12);
</script>

<CircuitBoard bind:mode bind:resistors bind:voltage interactive />
<CircuitBoard mode="parallel" resistors={[6, 3, 2]} voltage={6} label="Ba điện trở song song" />
