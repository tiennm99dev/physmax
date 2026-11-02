<script module>
  export const title = 'Điện kế và đồ thị dòng điện';
</script>

<script>
  import CurrentTrace from './current-trace.svelte';
  import Galvanometer from './galvanometer.svelte';

  const trace = Array.from({ length: 60 }, (_, k) => ({
    t: k / 10,
    i: Math.sin(k / 3),
  }));
</script>

<div class="space-y-3">
  <svg
    viewBox="0 0 240 90"
    class="mx-auto block w-full max-w-sm"
    role="img"
    aria-label="Ba điện kế"
  >
    <Galvanometer x={4} y={8} value={-0.8} />
    <Galvanometer x={84} y={8} value={0} />
    <Galvanometer x={164} y={8} value={0.5} />
  </svg>
  <CurrentTrace {trace} clock={6} span={6} label="Dòng điện xoay chiều trong 6 giây" />
</div>
