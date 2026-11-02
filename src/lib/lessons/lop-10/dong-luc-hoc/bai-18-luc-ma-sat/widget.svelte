<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion, wrap } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '../_shared/force-arrow.svelte';
  import { ticksUpTo } from '../_shared/ticks.js';
  import XyPlot from '../_shared/xy-plot.svelte';
  import {
    AT_REST,
    SURFACES,
    accelerationOf,
    effectivePull,
    frictionOf,
    limitsOf,
    settle,
    stepBlock,
    tracePoints,
  } from './engine.js';

  const W = 360;
  const H = 110;
  const FLOOR = 88;
  /** Room left of and right of the block for the force arrows, in pixels. */
  const MARGIN = 92;
  const PX_PER_METRE = 60;
  const FACES = [
    { value: 'rong', label: 'Mặt rộng' },
    { value: 'hep', label: 'Mặt hẹp' },
  ];

  let surface = $state('go');
  let mass = $state(5);
  let face = $state('rong');
  let pull = $state(0);
  let block = $state(AT_REST);
  let slipped = $state(false);
  let trail = $state(/** @type {Array<{ x: number, y: number }>} */ ([{ x: 0, y: 0 }]));

  const limits = $derived(limitsOf(surface, mass));
  const pullMax = $derived(Math.ceil(limits.maxRest * 1.6));
  const pullStep = $derived(pullMax <= 12 ? 0.5 : 1);
  const felt = $derived(effectivePull(block, pull, limits, pullStep));
  const friction = $derived(frictionOf(block, felt, limits));
  const acceleration = $derived(accelerationOf(block, felt, mass, limits));
  const moving = $derived(block.moving);
  const scale = $derived(84 / pullMax);
  const boxW = $derived(face === 'rong' ? 72 : 36);
  const boxH = $derived(face === 'rong' ? 30 : 60);
  const boxX = $derived(MARGIN + wrap(block.x * PX_PER_METRE, 0, W - 2 * MARGIN - boxW));
  const midY = $derived(FLOOR - boxH / 2);

  function restart() {
    pull = 0;
    block = AT_REST;
    slipped = false;
    trail = [{ x: 0, y: 0 }];
  }

  /** @param {boolean} wasMoving */
  function record(wasMoving) {
    trail = [...trail, ...tracePoints(wasMoving, block, pull, limits)].slice(-300);
  }

  function onPull() {
    const wasMoving = block.moving;
    block = settle(block, pull, limits);
    if (block.moving) slipped = true;
    record(wasMoving);
  }

  $effect(() => {
    if (!moving) return;
    const still = reducedMotion();
    return frameLoop((dt) => {
      const next = stepBlock(block, felt, mass, limits, dt);
      block = still ? { ...next, x: block.x } : next;
      if (!next.moving) record(true);
    });
  });

  const note = $derived.by(() => {
    if (block.moving && acceleration > 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Vật đang trượt nhanh dần: ma sát nghỉ đã nhường chỗ cho ma sát trượt $F_{mst} = \\mu N = ${numTex(limits.mu)} \\cdot ${numTex(limits.normal)} = ${numTex(limits.sliding)}$ N, nhỏ hơn lực ma sát nghỉ cực đại. Thử giảm lực kéo xuống đúng bằng $F_{mst}$.`,
      };
    }
    if (block.moving && acceleration === 0) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Lực kéo vừa bằng $F_{mst}$ (trong phạm vi một vạch của thanh trượt): hợp lực bằng $0$ nên vật trượt thẳng đều. Đây chính là cách đo $F_{mst}$ bằng lực kế.`,
      };
    }
    if (block.moving) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Lực kéo nhỏ hơn $F_{mst}$: vật trượt chậm dần rồi sẽ dừng. Lúc đó ma sát nghỉ lại xuất hiện.`,
      };
    }
    if (pull === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa có lực kéo thì cũng chưa có lực ma sát. Tăng từ từ lực kéo và quan sát đồ thị.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Vật đứng yên: lực ma sát nghỉ tự điều chỉnh để cân bằng với lực kéo, $F_{msn} = F = ${numTex(pull)}$ N.${pull >= limits.maxRest ? ' Đây đã là giá trị cực đại, kéo mạnh hơn một chút là vật trượt.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Cặp bề mặt"
      options={SURFACES.map((s) => ({ value: s.value, label: s.label }))}
      bind:value={surface}
      onchange={restart}
    />
    <SegmentedControl label="Mặt tiếp xúc của vật" options={FACES} bind:value={face} />
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Vật ${formatNumber(mass)} ki lô gam, lực kéo ${formatNumber(pull, 1)} niutơn, lực ma sát ${formatNumber(friction, 1)} niutơn, vật ${block.moving ? 'đang trượt' : 'đứng yên'}.`}
    >
      <rect x="0" y={FLOOR} width={W} height={H - FLOOR} fill="#e2e8f0" />
      <line x1="0" x2={W} y1={FLOOR} y2={FLOOR} stroke="#475569" stroke-width="2" />
      <rect
        x={boxX}
        y={FLOOR - boxH}
        width={boxW}
        height={boxH}
        rx="4"
        fill="#fde68a"
        stroke="#b45309"
      />
      <text
        x={boxX + boxW / 2}
        y={midY + 4}
        font-size="12"
        font-weight="600"
        fill="#78350f"
        text-anchor="middle">{`${formatNumber(mass)} kg`}</text
      >
      <ForceArrow
        x1={boxX + boxW}
        y1={midY}
        x2={boxX + boxW + pull * scale}
        y2={midY}
        color="#4f46e5"
        label="F"
        labelDx={-14}
        labelDy={-8}
      />
      <ForceArrow
        x1={boxX}
        y1={FLOOR - 4}
        x2={boxX - friction * scale}
        y2={FLOOR - 4}
        color="#dc2626"
        label="Fms"
        labelDx={0}
        labelDy={-8}
      />
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Lực kéo F"
      bind:value={pull}
      min={0}
      max={pullMax}
      step={pullStep}
      unit="N"
      oninput={onPull}
    />
    <SliderField
      label="Khối lượng m"
      bind:value={mass}
      min={2}
      max={10}
      step={1}
      unit="kg"
      oninput={restart}
    />
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm" aria-live="polite">
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Áp lực N</dt>
      <dd class="tabular-nums">{`${formatNumber(limits.normal, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-red-50 px-2 py-2">
      <dt class="font-semibold text-red-800">{block.moving ? 'Fmst' : 'Fmsn'}</dt>
      <dd class="tabular-nums">{`${formatNumber(friction, 1)} N`}</dd>
    </div>
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">Gia tốc a</dt>
      <dd class="tabular-nums">{`${formatNumber(acceleration, 2)} m/s²`}</dd>
    </div>
  </dl>

  <div class="{card} p-2">
    <XyPlot
      lines={[{ points: trail, color: '#dc2626' }]}
      marks={[{ x: pull, y: friction, color: '#dc2626' }]}
      guides={slipped
        ? [
            { y: limits.maxRest, label: 'Fmsn cực đại', color: '#4f46e5' },
            { y: limits.sliding, label: 'Fmst', color: '#0f766e' },
          ]
        : []}
      xMax={pullMax}
      yMax={limits.maxRest * 1.3}
      xTicks={ticksUpTo(pullMax)}
      yTicks={ticksUpTo(limits.maxRest * 1.3)}
      xLabel="F (N)"
      yLabel="Fms (N)"
      label={`Đồ thị lực ma sát theo lực kéo. Lực ma sát nghỉ cực đại ${formatNumber(limits.maxRest, 1)} niutơn, lực ma sát trượt ${formatNumber(limits.sliding, 1)} niutơn.`}
    />
  </div>

  <div class="flex justify-end">
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
  {#if face === 'hep'}
    <FeedbackNote
      tone="info"
      text="Đổi sang mặt hẹp: $\mu$ và $N$ không đổi nên lực ma sát vẫn như cũ, dù diện tích tiếp xúc nhỏ đi."
    />
  {/if}
</div>
