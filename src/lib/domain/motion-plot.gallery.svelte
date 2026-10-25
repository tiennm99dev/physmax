<script module>
  export const title = 'Đồ thị chuyển động';
</script>

<script>
  import MotionPlot from './motion-plot.svelte';

  const car = {
    stages: [
      { duration: 4, acceleration: 2 },
      { duration: 4, acceleration: 0 },
      { duration: 2, acceleration: -4 },
    ],
  };
  const bike = { v0: 5, stages: [{ duration: 10, acceleration: 0 }] };
  let cursor = $state(/** @type {number | null} */ (3));
</script>

<MotionPlot
  kind="x-t"
  positionSymbol="d"
  motions={[
    { name: 'Ô tô', motion: car },
    { name: 'Xe đạp', motion: bike },
  ]}
  data={[
    { t: 2, value: 4.3 },
    { t: 4, value: 15.6 },
    { t: 6, value: 32.4 },
  ]}
  tMax={10}
  bind:cursor
/>
<MotionPlot kind="v-t" motions={[{ name: 'Ô tô', motion: car }]} tMax={10} bind:cursor />
