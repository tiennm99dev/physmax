<script module>
  export const title = 'Mặt đồng hồ đo điện';
</script>

<script>
  import MeterDial from './meter-dial.svelte';
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <figure>
    <MeterDial letter="A" value={0.36} range={0.6} division={0.02} labelStep={0.1} />
    <figcaption class="mt-1 text-center text-sm text-slate-600">
      Ampe kế, giới hạn đo 0,6 A, độ chia nhỏ nhất 0,02 A: 0,36 A
    </figcaption>
  </figure>
  <figure>
    <MeterDial letter="V" value={null} range={6} division={0.2} labelStep={1} />
    <figcaption class="mt-1 text-center text-sm text-slate-600">
      Vôn kế chưa mắc vào mạch: không có kim
    </figcaption>
  </figure>
</div>
