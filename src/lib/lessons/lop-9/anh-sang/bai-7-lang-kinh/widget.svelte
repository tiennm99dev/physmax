<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { SPECTRUM, prismCorners, traceThrough } from './engine.js';

  const W = 380;
  const H = 320;
  const C = { x: 140, y: 95 };
  const SIDE = 150;
  const SCREEN = 350;
  const BEAM = { x: 8, y: C.y - 25 };
  const FILTER_X = 48;
  const clipId = $props.id();

  let incidence = $state(48);
  /** @type {'none' | 'do' | 'luc' | 'lam'} */
  let filter = $state('none');

  const poly = $derived(prismCorners(C, SIDE, incidence - 30));
  const colours = $derived(filter === 'none' ? SPECTRUM : SPECTRUM.filter((s) => s.id === filter));
  const traces = $derived(
    colours.map((s) => ({ s, t: traceThrough(poly, BEAM, { x: 1, y: 0 }, s.n, SCREEN) })),
  );
  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)}°`;
  const red = $derived(traces.find((x) => x.s.id === 'do'));
  const violet = $derived(traces.find((x) => x.s.id === 'tim'));
  const beamColour = $derived(filter === 'none' ? '#ffffff' : colours[0].color);

  const feedback = $derived.by(() => {
    if (filter !== 'none') {
      const one = traces[0];
      return {
        tone: /** @type {const} */ ('info'),
        text: `Tấm lọc chỉ cho ánh sáng ${one.s.name} đi qua. Chùm sáng ${one.s.name} qua lăng kính vẫn lệch về phía đáy (góc lệch ${deg(one.t.deviation ?? 0)}) nhưng không bị tách thành nhiều màu: đó là ánh sáng đơn sắc.`,
      };
    }
    if (red && violet) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Chùm sáng trắng bị tách thành dải màu từ đỏ đến tím, tất cả đều lệch về phía đáy lăng kính. Tia đỏ lệch ít nhất (${deg(red.t.deviation ?? 0)}), tia tím lệch nhiều nhất (${deg(violet.t.deviation ?? 0)}), vì chiết suất của lăng kính với ánh sáng tím lớn nhất.`,
      };
    }
    return { tone: /** @type {const} */ ('info'), text: 'Xoay lăng kính để chùm sáng ló ra.' };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tấm lọc màu đặt trước lăng kính"
    options={[
      { value: 'none', label: 'Không lọc' },
      { value: 'do', label: 'Lọc đỏ' },
      { value: 'luc', label: 'Lọc lục' },
      { value: 'lam', label: 'Lọc lam' },
    ]}
    bind:value={filter}
  />
  <SliderField
    label="Xoay lăng kính: góc tới ở mặt bên thứ nhất"
    bind:value={incidence}
    min={35}
    max={65}
    unit="°"
  />
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-lg rounded-xl border border-slate-200 bg-slate-900"
    role="img"
    aria-label="Lăng kính, góc tới {deg(incidence)}. {feedback.text.replace(/\$/g, '')}"
  >
    <defs>
      <clipPath id={clipId}><rect x="0" y="0" width={W} height={H} /></clipPath>
    </defs>
    <g clip-path="url(#{clipId})">
      <rect x="0" y={BEAM.y - 7} width="8" height="14" fill="#e2e8f0" />
      <line x1={BEAM.x} y1={BEAM.y} x2={FILTER_X} y2={BEAM.y} stroke="#ffffff" stroke-width="3" />
      {#if filter !== 'none'}
        <rect
          x={FILTER_X - 3}
          y={BEAM.y - 18}
          width="6"
          height="36"
          rx="2"
          fill={beamColour}
          opacity="0.8"
        />
      {/if}
      {#if traces[0]}
        {@const entry = traces[0].t.points[1]}
        <line
          x1={FILTER_X + 3}
          y1={BEAM.y}
          x2={entry.x}
          y2={entry.y}
          stroke={beamColour}
          stroke-width="3"
        />
      {/if}
      <polygon
        points={pointsAttr(poly)}
        fill="#bae6fd"
        fill-opacity="0.25"
        stroke="#7dd3fc"
        stroke-width="2"
      />
      {#each traces as { s, t } (s.id)}
        <polyline
          points={pointsAttr(t.points.slice(1))}
          fill="none"
          stroke={s.color}
          stroke-width="1.8"
          opacity="0.95"
        />
      {/each}
      <line x1={SCREEN} y1="10" x2={SCREEN} y2={H - 10} stroke="#e2e8f0" stroke-width="5" />
      {#each traces as { s, t } (s.id)}
        {#if t.screenY !== null}
          <circle cx={SCREEN} cy={t.screenY} r="4" fill={s.color} />
        {/if}
      {/each}
      <text x={SCREEN - 8} y="22" text-anchor="end" font-size="12" fill="#e2e8f0">màn chắn</text>
      <text
        x={C.x}
        y={C.y + SIDE / 2 / Math.sqrt(3) + 34}
        text-anchor="middle"
        font-size="12"
        fill="#cbd5e1">lăng kính</text
      >
    </g>
  </svg>

  {#if filter === 'none'}
    <ul class="flex flex-wrap gap-1 text-xs" aria-label="Thứ tự các màu trên màn từ trên xuống">
      {#each SPECTRUM as s (s.id)}
        <li class="flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
          <span class="inline-block h-3 w-3 rounded-full" style:background={s.color}></span>
          {s.name}
        </li>
      {/each}
    </ul>
  {/if}
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
