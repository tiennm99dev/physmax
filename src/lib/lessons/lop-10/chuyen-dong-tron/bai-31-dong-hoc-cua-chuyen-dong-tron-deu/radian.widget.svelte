<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { TAU, arcPath, pointAt, toDeg, toRad } from '../_shared/circular.js';
  import { angleFrom } from './engine.js';

  const W = 360;
  const H = 280;
  const CX = 180;
  const CY = 140;
  const R_PX = 100;
  const VIEW = { w: W, h: H };
  const MARKS = [1, 2, 3, 4, 5, 6];
  const PRESETS = [
    { label: '1 rad', angle: 1 },
    { label: 'π/2 rad', angle: Math.PI / 2 },
    { label: 'π rad', angle: Math.PI },
  ];

  let radius = $state(2);
  let angle = $state(1);
  let handle = $state(pointAt(CX, CY, R_PX, 1));
  /** @type {SVGSVGElement | null} */
  let svgEl = $state(null);

  const s = $derived(radius * angle);

  /** @param {number} a */
  function setAngle(a) {
    angle = ((a % TAU) + TAU) % TAU;
    handle = pointAt(CX, CY, R_PX, angle);
  }

  /** @param {{ x: number, y: number }} p */
  function project(p) {
    return pointAt(CX, CY, R_PX, angleFrom(p.x - CX, p.y - CY));
  }

  const note = $derived(
    `Cung $AM$ dài $s = r\\theta = ${numTex(radius, 1)} \\cdot ${numTex(angle, 2)} \\approx ${numTex(s, 2)}$ m, gấp $${numTex(angle, 2)}$ lần bán kính, nên $\\theta = \\dfrac{s}{r} \\approx ${numTex(angle, 2)}$ rad $\\approx ${numTex(toDeg(angle), 1)}^\\circ$.`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label={`Đường tròn bán kính ${formatNumber(radius, 1)} mét. Góc ở tâm ${formatNumber(angle, 2)} radian.`}
    >
      <circle cx={CX} cy={CY} r={R_PX} fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
      <path
        d={`${arcPath(CX, CY, R_PX, 0, angle)} L ${CX} ${CY} Z`}
        fill="#fde68a"
        fill-opacity={angle > 1e-6 ? 0.5 : 0}
      />
      <path d={arcPath(CX, CY, R_PX, 0, angle)} fill="none" stroke="#be123c" stroke-width="5" />
      {#each MARKS as mark (mark)}
        {@const inner = pointAt(CX, CY, R_PX - 5, mark)}
        {@const outer = pointAt(CX, CY, R_PX + 7, mark)}
        {@const text = pointAt(CX, CY, R_PX + 19, mark)}
        <line
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke="#334155"
          stroke-width="2"
        />
        <text x={text.x} y={text.y + 4} font-size="12" fill="#334155" text-anchor="middle"
          >{mark}</text
        >
      {/each}
      <line x1={CX} y1={CY} x2={CX + R_PX} y2={CY} stroke="#334155" stroke-width="2" />
      <line x1={CX} y1={CY} x2={handle.x} y2={handle.y} stroke="#334155" stroke-width="2" />
      <circle cx={CX} cy={CY} r="4" fill="#334155" />
      <text x={CX - 16} y={CY + 16} font-size="13" font-weight="600" fill="#334155">O</text>
      <text x={CX + R_PX + 8} y={CY + 16} font-size="13" font-weight="600" fill="#334155">A</text>
      <DragPoint
        drag={{
          point: handle,
          svg: () => svgEl,
          viewBox: VIEW,
          pad: 0,
          projector: project,
          onChange: () => {
            angle = angleFrom(handle.x - CX, handle.y - CY);
          },
          onKeyMove: (dx, dy, big) => {
            const steps = dx !== 0 ? dx : -dy;
            setAngle(angle + steps * toRad(big ? 15 : 5));
          },
        }}
        label={`Điểm M trên đường tròn, góc ${formatNumber(angle, 2)} radian. Dùng phím mũi tên để đổi góc.`}
        r={10}
        color="#be123c"
        name="M"
      />
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Kéo điểm M. Vạch số k trên đường tròn cách A một cung dài bằng k lần bán kính.
    </p>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each PRESETS as preset (preset.label)}
      <button type="button" class={button.quiet} onclick={() => setAngle(preset.angle)}>
        {preset.label}
      </button>
    {/each}
  </div>

  <SliderField
    label="Bán kính r"
    bind:value={radius}
    min={1}
    max={5}
    step={0.5}
    unit="m"
    format={(v) => formatFixed(v, 1)}
  />

  <FeedbackNote tone="info" text={note} />
</div>
