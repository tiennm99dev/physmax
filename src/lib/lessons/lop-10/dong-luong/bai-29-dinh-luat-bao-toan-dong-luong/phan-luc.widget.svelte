<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { recoil } from './engine.js';

  const W = 360;
  const H = 130;
  const MID = 180;
  const Y = 62;
  /** Seconds of the short animation after firing. */
  const SPAN = 0.8;
  /** Longest momentum arrow, in pixels. */
  const ARROW = 110;

  const SCENES = {
    sung: {
      label: 'Súng bắn đạn',
      body: 'Súng',
      part: 'Đạn',
      action: 'Bắn',
      bodyRange: { label: 'Khối lượng súng M', min: 2, max: 8, step: 1, unit: 'kg', value: 4 },
      partRange: { label: 'Khối lượng đạn m', min: 10, max: 50, step: 5, unit: 'g', value: 20 },
      speedRange: { label: 'Tốc độ đạn v', min: 200, max: 800, step: 50, unit: 'm/s', value: 500 },
      partKg: (/** @type {number} */ v) => v / 1000,
    },
    'ten-lua': {
      label: 'Tên lửa phụt khí',
      body: 'Tên lửa',
      part: 'Khí',
      action: 'Phụt khí',
      bodyRange: {
        label: 'Khối lượng tên lửa còn lại M',
        min: 500,
        max: 2000,
        step: 100,
        unit: 'kg',
        value: 900,
      },
      partRange: {
        label: 'Khối lượng khí phụt ra m',
        min: 50,
        max: 300,
        step: 10,
        unit: 'kg',
        value: 100,
      },
      speedRange: {
        label: 'Tốc độ khí v',
        min: 500,
        max: 3000,
        step: 100,
        unit: 'm/s',
        value: 1800,
      },
      partKg: (/** @type {number} */ v) => v,
    },
  };

  let scene = $state(/** @type {'sung' | 'ten-lua'} */ ('sung'));
  let bodyMass = $state(SCENES.sung.bodyRange.value);
  let partMass = $state(SCENES.sung.partRange.value);
  let speed = $state(SCENES.sung.speedRange.value);
  let elapsed = $state(0);
  let phase = $state(/** @type {'ready' | 'moving' | 'done'} */ ('ready'));

  const def = $derived(SCENES[scene]);
  const partKg = $derived(def.partKg(partMass));
  const bodySpeed = $derived(recoil(bodyMass, partKg, speed));
  const p = $derived(partKg * speed);
  const u = $derived(Math.min(1, elapsed / SPAN));

  /** @param {string | number} next */
  function chooseScene(next) {
    scene = next === 'ten-lua' ? 'ten-lua' : 'sung';
    bodyMass = SCENES[scene].bodyRange.value;
    partMass = SCENES[scene].partRange.value;
    speed = SCENES[scene].speedRange.value;
    reset();
  }

  function reset() {
    phase = 'ready';
    elapsed = 0;
  }

  function fire() {
    elapsed = 0;
    if (reducedMotion()) {
      elapsed = SPAN;
      phase = 'done';
      return;
    }
    phase = 'moving';
  }

  $effect(() => {
    if (phase !== 'moving') return;
    const stop = frameLoop((dt) => {
      elapsed = Math.min(SPAN, elapsed + dt);
      if (elapsed >= SPAN) {
        stop();
        phase = 'done';
      }
    });
    return stop;
  });

  const note = $derived(
    phase === 'ready'
      ? {
          tone: /** @type {const} */ ('info'),
          text: `Trước khi ${def.action.toLowerCase()}, cả hệ đứng yên nên tổng động lượng bằng $0$. Sau đó tổng động lượng phải vẫn bằng $0$.`,
        }
      : {
          tone: /** @type {const} */ ('ok'),
          text: `$mv = ${numTex(p, 2)}$ kg.m/s về một phía nên phần còn lại phải có $MV = ${numTex(p, 2)}$ kg.m/s về phía ngược lại: $V = \\dfrac{mv}{M} = ${numTex(Math.abs(bodySpeed), 2)}$ m/s. Hai động lượng có độ lớn bằng nhau, nhưng vật nặng hơn có tốc độ nhỏ hơn nhiều.`,
        },
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`${def.body} và ${def.part.toLowerCase()}. ${phase === 'ready' ? 'Cả hệ đứng yên.' : `${def.part} bay đi với tốc độ ${formatNumber(speed)}, ${def.body.toLowerCase()} lùi lại với tốc độ ${formatNumber(Math.abs(bodySpeed), 2)} mét trên giây.`}`}
    >
      <rect x={MID - 46 - u * 24} y={Y - 12} width="60" height="24" rx="4" fill="#475569" />
      <text
        x={MID - 16 - u * 24}
        y={Y + 4}
        font-size="12"
        font-weight="700"
        fill="#ffffff"
        text-anchor="middle">{def.body}</text
      >
      {#if phase !== 'ready'}
        <circle cx={MID + 20 + u * 140} cy={Y} r="6" fill="#f59e0b" />
        <text
          x={MID + 20 + u * 140}
          y={Y - 12}
          font-size="12"
          font-weight="600"
          fill="#b45309"
          text-anchor="middle">{def.part}</text
        >
        <ForceArrow
          x1={MID}
          y1={Y + 34}
          x2={MID + ARROW}
          y2={Y + 34}
          color="#b45309"
          label="mv"
          labelDx={-22}
          labelDy={-8}
        />
        <ForceArrow
          x1={MID}
          y1={Y + 50}
          x2={MID - ARROW}
          y2={Y + 50}
          color="#475569"
          label="MV"
          labelDx={4}
          labelDy={-8}
        />
      {/if}
    </svg>
  </div>

  <SegmentedControl
    label="Tình huống"
    options={Object.entries(SCENES).map(([value, s]) => ({ value, label: s.label }))}
    value={scene}
    onchange={chooseScene}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label={def.bodyRange.label}
      bind:value={bodyMass}
      min={def.bodyRange.min}
      max={def.bodyRange.max}
      step={def.bodyRange.step}
      unit={def.bodyRange.unit}
      oninput={reset}
    />
    <SliderField
      label={def.partRange.label}
      bind:value={partMass}
      min={def.partRange.min}
      max={def.partRange.max}
      step={def.partRange.step}
      unit={def.partRange.unit}
      oninput={reset}
    />
    <SliderField
      label={def.speedRange.label}
      bind:value={speed}
      min={def.speedRange.min}
      max={def.speedRange.max}
      step={def.speedRange.step}
      unit={def.speedRange.unit}
      oninput={reset}
    />
  </div>
  <button type="button" class={button.primary} onclick={fire} disabled={phase === 'moving'}>
    {phase === 'done' ? `${def.action} lại` : def.action}
  </button>
  <p class="text-sm tabular-nums text-slate-600" aria-live="polite">
    {phase === 'ready'
      ? `Chưa ${def.action.toLowerCase()}: tổng động lượng bằng 0.`
      : `Vận tốc phần còn lại: ${formatFixed(bodySpeed, 2)} m/s (dấu trừ: ngược chiều với ${def.part.toLowerCase()}).`}
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
