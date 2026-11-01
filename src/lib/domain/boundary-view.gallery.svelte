<script module>
  export const title = 'Khúc xạ ánh sáng ở mặt phân cách';
</script>

<script>
  import BoundaryView from './boundary-view.svelte';
  import { MEDIA, boundary } from './light.js';
  import { formatNumber } from '#lib/core/number-format.js';

  let fromAir = $state(40);
  let fromGlass = $state(45);
  const air = MEDIA['khong-khi'];
  const glass = MEDIA['thuy-tinh'];
  const out = $derived(boundary(glass.n, air.n, fromGlass));
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <figure>
    <BoundaryView
      n1={air.n}
      n2={glass.n}
      topName={air.name}
      bottomName={glass.name}
      bind:incidence={fromAir}
    />
    <figcaption class="mt-1 text-center text-sm text-slate-600">
      Từ không khí vào thuỷ tinh: i = {formatNumber(fromAir, 1)}°
    </figcaption>
  </figure>
  <figure>
    <BoundaryView
      n1={glass.n}
      n2={air.n}
      topName={glass.name}
      bottomName={air.name}
      bind:incidence={fromGlass}
    />
    <figcaption class="mt-1 text-center text-sm text-slate-600">
      Từ thuỷ tinh ra không khí: {out.total
        ? `phản xạ toàn phần (i ≥ ${formatNumber(out.critical ?? 0, 1)}°)`
        : `r = ${formatNumber(out.refraction ?? 0, 1)}°`}
    </figcaption>
  </figure>
</div>
