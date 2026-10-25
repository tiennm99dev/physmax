<script module>
  export const title = 'Đồ thị sóng';
</script>

<script>
  import WavePlot from './wave-plot.svelte';

  let time = $state(0);
  const wave = { amplitude: 2, wavelength: 8, period: 2 };
</script>

<WavePlot waves={[wave]} bind:time marker={4} />
<WavePlot waves={[wave]} along="t" controls={false} label="Li độ của phần tử tại x = 0" />
<WavePlot
  waves={[
    { ...wave, name: 'Sóng tới' },
    { ...wave, direction: -1, name: 'Sóng phản xạ' },
  ]}
  showSum
  time={0.2}
  controls={false}
  label="Sóng dừng: tổng của sóng tới và sóng phản xạ"
/>
