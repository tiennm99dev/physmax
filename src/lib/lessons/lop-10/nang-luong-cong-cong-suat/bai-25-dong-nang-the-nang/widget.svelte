<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import {
    G,
    LOWEST,
    TRACK,
    TRACK_LENGTH,
    advance,
    heightAt,
    kinetic,
    nextPoint,
    potential,
    slopeAt,
    speedAt,
  } from './engine.js';

  const W = 360;
  const H = 190;
  const GROUND = 170;
  const LEVELS = [
    { value: 0, label: 'Mặt đất' },
    { value: LOWEST, label: 'Đáy dốc sâu nhất' },
  ];

  const px = linear(0, TRACK_LENGTH, 16, W - 16);
  const py = linear(0, TRACK[0].h, GROUND, 24);
  const trackLine = Array.from({ length: 121 }, (_, i) => {
    const x = (i * TRACK_LENGTH) / 120;
    return `${px.map(x)},${py.map(heightAt(x))}`;
  }).join(' ');
  const trackFill = `${px.map(0)},${GROUND} ${trackLine} ${px.map(TRACK_LENGTH)},${GROUND}`;

  let x = $state(0);
  let mass = $state(400);
  let level = $state(0);
  let playing = $state(false);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const height = $derived(heightAt(x));
  const speed = $derived(speedAt(x));
  const slope = $derived(slopeAt(x));
  const wd = $derived(kinetic(mass, speed));
  const wt = $derived(potential(mass, height - level));
  const scale = $derived(potential(mass, TRACK[0].h));
  const carX = $derived(px.map(x));
  const carY = $derived(py.map(height));
  const tilt = $derived(
    (-Math.atan((slope * (py.map(0) - py.map(1))) / (px.map(1) - px.map(0))) * 180) / Math.PI,
  );
  const kmh = $derived(speed * 3.6);

  /** @param {number} next */
  function moveTo(next) {
    playing = false;
    x = clamp(next, 0, TRACK_LENGTH);
  }

  function play() {
    if (reducedMotion()) {
      x = x >= TRACK_LENGTH ? 0 : nextPoint(x);
      return;
    }
    if (x >= TRACK_LENGTH) x = 0;
    playing = !playing;
  }

  $effect(() => {
    if (!playing) return;
    const stop = frameLoop((dt) => {
      const next = advance(x, dt);
      x = next;
      if (next >= TRACK_LENGTH) {
        playing = false;
        stop();
      }
    });
    return stop;
  });

  const note = $derived.by(() => {
    const sums = `$W_đ = \\dfrac{1}{2}mv^2 = ${numTex(wd / 1000, 1)}$ kJ, $W_t = mgh = ${numTex(wt / 1000, 1)}$ kJ.`;
    const levelText =
      level === 0
        ? ''
        : ` Đổi mốc thế năng lên đáy dốc, $W_t$ giảm đi $mg \\cdot ${LOWEST} = ${numTex(potential(mass, LOWEST) / 1000, 1)}$ kJ ở mọi vị trí, còn $W_đ$ giữ nguyên.`;
    if (x <= 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${sums} Tàu đứng yên ở đỉnh cao nhất: chưa có động năng, thế năng lớn nhất.${levelText}`,
      };
    }
    if (Math.abs(slope) < 0.02) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${sums} Tàu ở đỉnh hoặc đáy một đoạn dốc, nơi $W_t$ và $W_đ$ đổi chiều biến thiên.${levelText}`,
      };
    }
    return {
      tone: slope < 0 ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
      text:
        slope < 0
          ? `${sums} Tàu xuống dốc: $h$ giảm nên $W_t$ giảm, $v$ tăng nên $W_đ$ tăng.${levelText}`
          : `${sums} Tàu lên dốc: $h$ tăng nên $W_t$ tăng, $v$ giảm nên $W_đ$ giảm.${levelText}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label={`Đường tàu lượn. Tàu ở độ cao ${formatNumber(height, 1)} mét, tốc độ ${formatNumber(speed, 1)} mét trên giây.`}
    >
      <polygon points={trackFill} fill="#e0f2fe" />
      <polyline points={trackLine} fill="none" stroke="#0369a1" stroke-width="3" />
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#e2e8f0" />
      <line
        x1="0"
        x2={W}
        y1={py.map(level)}
        y2={py.map(level)}
        stroke="#7c3aed"
        stroke-dasharray="5 4"
      />
      <text x="6" y={py.map(level) - 4} font-size="11" font-weight="600" fill="#7c3aed"
        >Mốc thế năng</text
      >
      <line
        x1={carX}
        x2={carX}
        y1={py.map(level)}
        y2={carY}
        stroke="#94a3b8"
        stroke-dasharray="3 3"
      />
      <text
        x={carX > W - 70 ? carX - 5 : carX + 5}
        y={(py.map(level) + carY) / 2}
        font-size="11"
        font-weight="600"
        fill="#475569"
        text-anchor={carX > W - 70 ? 'end' : 'start'}
        >{`h = ${formatNumber(height - level, 1)} m`}</text
      >
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Toa tàu: phím trái phải di chuyển tàu dọc đường ray"
        aria-valuemin={0}
        aria-valuemax={TRACK_LENGTH}
        aria-valuenow={Math.round(x)}
        aria-valuetext={`Độ cao ${formatNumber(height, 1)} mét, tốc độ ${formatNumber(speed, 1)} mét trên giây`}
        use:draggable={{
          point: { x: carX, y: carY },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            moveTo(px.invert(p.x));
            return p;
          },
          onKeyMove: (dx, _dy, big) => moveTo(x + dx * (big ? 10 : 2)),
        }}
      >
        <g transform="rotate({tilt} {carX} {carY})">
          <rect
            class="drag-knob"
            x={carX - 13}
            y={carY - 15}
            width="26"
            height="13"
            rx="3"
            fill="#dc2626"
          />
          <circle cx={carX - 7} cy={carY - 2} r="3" fill="#1e293b" />
          <circle cx={carX + 7} cy={carY - 2} r="3" fill="#1e293b" />
        </g>
      </g>
    </svg>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <button type="button" class={button.primary} onclick={play}>
      {playing ? 'Dừng' : x >= TRACK_LENGTH ? 'Chạy lại' : 'Thả tàu chạy'}
    </button>
    <button type="button" class={button.quiet} onclick={() => moveTo(0)}>Về đỉnh</button>
    <SegmentedControl label="Mốc thế năng" options={LEVELS} bind:value={level} />
  </div>

  <SliderField
    label="Khối lượng tàu m"
    bind:value={mass}
    min={200}
    max={800}
    step={100}
    unit="kg"
  />

  <div class="space-y-2" aria-live="polite">
    <div class="grid grid-cols-[5.5rem_1fr_5.5rem] items-center gap-2 text-sm">
      <span class="font-semibold text-amber-800">Động năng</span>
      <div class="h-4 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full bg-amber-500" style:width={`${(wd / scale) * 100}%`}></div>
      </div>
      <span class="text-right tabular-nums">{`${formatNumber(wd / 1000, 1)} kJ`}</span>
    </div>
    <div class="grid grid-cols-[5.5rem_1fr_5.5rem] items-center gap-2 text-sm">
      <span class="font-semibold text-sky-800">Thế năng</span>
      <div class="h-4 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full bg-sky-500" style:width={`${(wt / scale) * 100}%`}></div>
      </div>
      <span class="text-right tabular-nums">{`${formatNumber(wt / 1000, 1)} kJ`}</span>
    </div>
    <p class="text-sm tabular-nums text-slate-600">
      {`Độ cao so với đất ${formatNumber(height, 1)} m, tốc độ ${formatNumber(speed, 1)} m/s (${formatNumber(kmh, 0)} km/h), g = ${formatNumber(G)} m/s². Bỏ qua ma sát.`}
    </p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
