<script>
  import DtPlot from './d-t-plot.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { numTex } from '#lib/core/number-format.js';
  import { segmentInfo } from './engine.js';

  const POINTS = [
    { t: 0, d: 1 },
    { t: 3, d: 7 },
    { t: 5, d: 7 },
    { t: 8, d: 1 },
  ];
  const NAMES = ['AB', 'BC', 'CD'];

  let segment = $state(0);

  const a = $derived(POINTS[segment]);
  const b = $derived(POINTS[segment + 1]);
  const info = $derived(segmentInfo(a, b));
  const formula = $derived(
    `Đoạn ${NAMES[segment]}: $\\Delta t = ${numTex(b.t)} - ${numTex(a.t)} = ${numTex(info.dt)}$ s, $\\Delta d = ${numTex(b.d)} - ${numTex(a.d)} = ${numTex(info.dd)}$ m, nên $v = \\dfrac{\\Delta d}{\\Delta t} = ${numTex(info.v)}$ m/s.`,
  );
</script>

<div class="space-y-3">
  <SegmentedControl
    label="Chọn đoạn đồ thị để đọc"
    options={NAMES.map((name, i) => ({ value: i, label: `Đoạn ${name}` }))}
    bind:value={segment}
  />
  <DtPlot
    points={POINTS}
    tMax={8}
    tStep={1}
    dMin={0}
    dMax={8}
    dStep={2}
    highlight={[a, b]}
    label="Đồ thị độ dịch chuyển – thời gian qua các điểm: A lúc 0 giây ở 1 mét, B lúc 3 giây ở 7 mét, C lúc 5 giây ở 7 mét, D lúc 8 giây ở 1 mét."
  />
  <p class="text-sm text-slate-700"><LiveRichText text={formula} /></p>
  <FeedbackNote tone="info" text={`Trên đoạn ${NAMES[segment]}, vật ${info.word}.`} />
</div>
