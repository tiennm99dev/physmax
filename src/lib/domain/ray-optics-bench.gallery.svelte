<script module>
  export const title = 'Băng quang học';
</script>

<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import RayOpticsBench from './ray-optics-bench.svelte';

  let focal = $state(10);
  let distance = $state(25);
  let objectHeight = $state(5);
</script>

<SliderField
  label="Tiêu cự f (âm: thấu kính phân kì)"
  bind:value={focal}
  min={-20}
  max={20}
  step={1}
  unit="cm"
/>
<RayOpticsBench focal={focal === 0 ? 1 : focal} bind:distance bind:objectHeight interactive />
