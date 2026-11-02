<script module>
  export const title = 'Đồ thị nhỏ và mũi tên lực';
</script>

<script>
  import ForceArrow from './force-arrow.svelte';
  import XyPlot from './xy-plot.svelte';
  import { pushState } from './push-motion.js';
  import { ticksUpTo } from './ticks.js';

  const points = Array.from({ length: 21 }, (_, k) => ({
    x: k / 2,
    y: pushState(2, 1, 4, k / 2).v,
  }));
</script>

<div class="space-y-3">
  <XyPlot
    lines={[{ points }]}
    marks={[{ x: 4, y: 8 }]}
    guides={[{ y: 8, label: 'v = 8 m/s' }]}
    xMax={10}
    yMax={10}
    xTicks={ticksUpTo(10)}
    yTicks={ticksUpTo(10)}
    xLabel="t (s)"
    yLabel="v (m/s)"
    label="Vận tốc tăng đều trong 4 giây đầu, rồi không đổi"
  />
  <svg viewBox="0 0 240 70" class="mx-auto block w-full max-w-sm" role="img" aria-label="Hai lực">
    <ForceArrow x1={120} y1={35} x2={210} y2={35} label="F" />
    <ForceArrow x1={120} y1={35} x2={60} y2={35} color="#dc2626" label="Fms" dashed />
  </svg>
</div>
