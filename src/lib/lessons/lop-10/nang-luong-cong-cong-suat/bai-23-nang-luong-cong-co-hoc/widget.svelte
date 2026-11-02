<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { MINUS, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arcPath } from '#lib/core/visuals/angle-math.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import {
    ANGLE_STEP,
    FORCE_MAX,
    FORCE_MIN,
    FORCE_STEP,
    KEY_ANGLES,
    aimAt,
    cosOf,
    kindOf,
    workOf,
  } from './engine.js';

  const W = 360;
  const H = 172;
  const FLOOR = 128;
  const CX = 180;
  const CY = 110;
  const PX_PER_N = 1;
  const PX_PER_M = 12;
  /** The largest work the bar can show: 100 N over 10 m. */
  const BAR_MAX = 1000;

  let force = $state(60);
  let distance = $state(8);
  let alpha = $state(30);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const rad = $derived((alpha * Math.PI) / 180);
  const tipX = $derived(CX + force * PX_PER_N * Math.cos(rad));
  const tipY = $derived(CY - force * PX_PER_N * Math.sin(rad));
  const cosine = $derived(cosOf(alpha));
  const along = $derived(force * cosine);
  const work = $derived(workOf(force, distance, alpha));
  const kind = $derived(kindOf(alpha));
  const barSide = $derived((Math.abs(work) / BAR_MAX) * 50);

  const note = $derived.by(() => {
    const exact = Number.isInteger(cosine * 2);
    const sum = `$A = F\\,s\\cos\\alpha ${exact ? '=' : '\\approx'} ${numTex(force)} \\cdot ${numTex(distance)} \\cdot ${numTex(cosine, 3)} ${exact ? '=' : '\\approx'} ${numTex(work, 1)}$ J`;
    if (kind === 'phat-dong') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${sum}. Góc $\\alpha$ nhọn nên $\\cos\\alpha > 0$: $A > 0$ là công phát động, lực góp phần đẩy vật theo chiều chuyển dời.`,
      };
    }
    if (kind === 'can') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${sum}. Góc $\\alpha$ tù nên $\\cos\\alpha < 0$: $A < 0$ là công cản, lực chống lại chuyển dời của vật.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${sum}. Lực vuông góc với hướng chuyển dời nên lực không sinh công, dù lực lớn đến đâu.`,
    };
  });

  /** @param {number} deg */
  function setAlpha(deg) {
    alpha = clamp(deg, 0, 180);
  }

  /** @param {number} newtons */
  function setForce(newtons) {
    force = clamp(newtons, FORCE_MIN, FORCE_MAX);
  }

  /** @param {{ x: number, y: number }} p */
  function aim(p) {
    const next = aimAt(CX, CY, p, PX_PER_N);
    alpha = next.alpha;
    force = next.force;
  }
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label={`Vật chuyển dời sang phải ${formatNumber(distance)} mét, lực ${formatNumber(force)} niutơn hợp với hướng chuyển dời góc ${formatNumber(alpha)} độ.`}
    >
      <rect x="0" y={FLOOR} width={W} height={H - FLOOR} fill="#e2e8f0" />
      <line x1="0" x2={W} y1={FLOOR} y2={FLOOR} stroke="#475569" stroke-width="2" />
      <rect
        x={CX - 30}
        y={CY - 18}
        width="60"
        height={FLOOR - CY + 18}
        rx="4"
        fill="#fde68a"
        stroke="#b45309"
      />
      <path
        d={arcPath({ x: CX, y: CY }, 0, alpha, 22)}
        fill="none"
        stroke="#7c3aed"
        stroke-width="2"
      />
      <text
        x={CX + 32 * Math.cos(rad / 2)}
        y={CY - 32 * Math.sin(rad / 2) + 4}
        font-size="12"
        font-weight="700"
        fill="#7c3aed"
        text-anchor="middle">α</text
      >
      <line
        x1={tipX}
        y1={tipY}
        x2={CX + along * PX_PER_N}
        y2={CY}
        stroke="#94a3b8"
        stroke-dasharray="3 3"
      />
      <ForceArrow
        x1={CX}
        y1={CY}
        x2={CX + along * PX_PER_N}
        y2={CY}
        color="#0f766e"
        dashed
        label={Math.abs(along) > 40 ? 'F cosα' : ''}
        labelDx={along < 0 ? -36 : -32}
        labelDy={15}
      />
      <ForceArrow x1={CX} y1={CY} x2={tipX} y2={tipY} color="#4f46e5" />
      <text
        x={tipX + (Math.cos(rad) >= 0 ? 12 : -22)}
        y={Math.max(tipY - 8, 13)}
        font-size="13"
        font-weight="700"
        fill="#4f46e5">F</text
      >
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Đầu mũi tên lực: phím trái phải xoay lực, phím lên xuống đổi độ lớn"
        aria-valuemin={0}
        aria-valuemax={180}
        aria-valuenow={alpha}
        aria-valuetext={`Góc ${formatNumber(alpha)} độ, lực ${formatNumber(force)} niutơn`}
        use:draggable={{
          point: { x: tipX, y: tipY },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            aim(p);
            return p;
          },
          onKeyMove: (dx, dy, big) => {
            if (dx !== 0) setAlpha(alpha - dx * ANGLE_STEP * (big ? 3 : 1));
            if (dy !== 0) setForce(force - dy * FORCE_STEP * (big ? 3 : 1));
          },
        }}
      >
        <circle class="drag-knob" cx={tipX} cy={tipY} r="8" fill="#4f46e5" />
      </g>
      <ForceArrow
        x1={CX - 60}
        y1={FLOOR + 24}
        x2={CX - 60 + distance * PX_PER_M}
        y2={FLOOR + 24}
        color="#334155"
      />
      <text x={CX - 60} y={FLOOR + 16} font-size="12" font-weight="600" fill="#334155"
        >{`s = ${formatNumber(distance)} m`}</text
      >
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Lực F"
      bind:value={force}
      min={FORCE_MIN}
      max={FORCE_MAX}
      step={FORCE_STEP}
      unit="N"
    />
    <SliderField label="Độ dịch chuyển s" bind:value={distance} min={1} max={10} unit="m" />
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm font-semibold text-slate-700">Thử nhanh góc:</span>
    {#each KEY_ANGLES as deg (deg)}
      <button
        type="button"
        class={alpha === deg ? button.primary : button.quiet}
        aria-pressed={alpha === deg}
        onclick={() => (alpha = deg)}>{`${deg}°`}</button
      >
    {/each}
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      Thanh đo công: <span class="tabular-nums" aria-live="polite"
        >{`${formatNumber(work, 1)} J`}</span
      >
    </p>
    <div
      class="relative h-6 overflow-hidden rounded-full bg-slate-100"
      role="img"
      aria-label={`Công của lực bằng ${formatNumber(work, 1)} jun`}
    >
      <div
        class="absolute inset-y-0 {work >= 0 ? 'bg-emerald-500' : 'bg-red-500'}"
        style:left={work >= 0 ? '50%' : `${50 - barSide}%`}
        style:width={`${barSide}%`}
      ></div>
      <div class="absolute inset-y-0 left-1/2 w-0.5 bg-slate-600"></div>
    </div>
    <div class="mt-1 grid grid-cols-[1fr_auto_1fr] gap-2 text-xs text-slate-600 tabular-nums">
      <span>{`${MINUS}${formatNumber(BAR_MAX)} J (công cản)`}</span>
      <span>0</span>
      <span class="text-right">{`${formatNumber(BAR_MAX)} J (công phát động)`}</span>
    </div>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
