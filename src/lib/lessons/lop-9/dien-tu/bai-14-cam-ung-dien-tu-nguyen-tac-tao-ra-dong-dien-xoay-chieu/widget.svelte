<script>
  import { onDestroy, onMount } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import {
    RANGE,
    approach,
    inducedCurrent,
    lineCount,
    pushSample,
    rotorCurrent,
    rotorFlux,
    rotorLines,
    rotorQuarter,
    settle,
    signedFlux,
    swing,
  } from './engine.js';

  const W = 360;
  const H = 190;
  const COIL_L = 200;
  const COIL_R = 300;
  const AXIS = 140;
  const PX = 10;
  const MAG = 80;
  /** Slide speed of the magnet, cm/s, and turning speed, degrees per second. */
  const SPEED = 24;
  const OMEGA = 180;
  const SPAN = 6;

  let mode = $state('truot');
  let pole = $state(/** @type {'N' | 'S'} */ ('N'));
  let pos = $state(RANGE);
  let target = $state(RANGE);
  let angle = $state(0);
  let angleTarget = $state(0);
  let spinning = $state(false);
  let reading = $state(0);
  let needle = $state(0);
  let clock = $state(0);
  let trace = $state(/** @type {Array<{ t: number, i: number }>} */ ([]));
  /** @type {(() => void) | null} */
  let stop = null;
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const sliding = $derived(mode === 'truot');
  const lines = $derived(sliding ? lineCount(pos) : rotorLines(angle));
  /** +1 when the lines inside the coil run to the right. */
  const lineDir = $derived(sliding ? (pole === 'N' ? 1 : -1) : Math.sign(rotorFlux(angle)));
  const moving = $derived(sliding ? pos !== target : spinning || angle !== angleTarget);
  const face = $derived(COIL_L - pos * PX);

  function tick(/** @type {number} */ dt) {
    clock += dt;
    if (sliding) {
      const before = signedFlux(pos, pole);
      pos = approach(pos, target, SPEED, dt);
      reading = inducedCurrent(before, signedFlux(pos, pole), dt);
    } else {
      let dir = 0;
      if (spinning) {
        angle = (angle + OMEGA * dt) % 360;
        angleTarget = angle;
        dir = 1;
      } else if (angle !== angleTarget) {
        dir = Math.sign(angleTarget - angle);
        angle = approach(angle, angleTarget, OMEGA, dt);
      }
      reading = dir * rotorCurrent(angle);
    }
    needle = settle(needle, reading, dt);
    trace = pushSample(trace, clock, needle, SPAN);
    if (!moving && needle === 0) halt();
  }

  function halt() {
    stop?.();
    stop = null;
  }
  onDestroy(halt);

  function wake() {
    if (!stop) stop = frameLoop(tick);
  }

  function changeMode() {
    halt();
    spinning = false;
    reading = 0;
    needle = 0;
    trace = [];
    pos = target = RANGE;
    angle = angleTarget = 0;
  }

  /** @param {number} cm */
  function slideTo(cm) {
    target = Math.min(RANGE, Math.max(0, Math.round(cm * 2) / 2));
    wake();
  }

  function flip() {
    pole = pole === 'N' ? 'S' : 'N';
  }

  function toggleSpin() {
    spinning = !spinning;
    if (!spinning) angleTarget = angle;
    wake();
  }

  /** @param {number} deg */
  function turnTo(deg) {
    spinning = false;
    angleTarget = deg;
    wake();
  }

  const grab = { x: 0, y: 0 };
  const dragMagnet = $derived({
    point: grab,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => slideTo((COIL_L - (grab.x + MAG / 2)) / PX),
    /** @param {number} dx @param {number} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => slideTo(target - dx * (big ? 3 : 1)),
  });

  /** Field lines inside the coil, and the stretch from the magnet's face. */
  const fieldLines = $derived(
    Array.from({ length: lines }, (_, j) => ({
      y: AXIS - 18 + ((j + 0.5) * 36) / lines,
      y0: AXIS - 10 + ((j + 0.5) * 20) / lines,
    })),
  );

  const needleDeg = $derived(50 * needle);
  const ledUp = $derived(Math.max(0, needle));
  const ledDown = $derived(Math.max(0, -needle));

  const traceLine = $derived(
    trace
      .map((s) => {
        const x = 24 + ((s.t - (clock - SPAN)) / SPAN) * 328;
        return `${Math.round(x * 10) / 10},${Math.round((50 - 38 * s.i) * 10) / 10}`;
      })
      .join(' '),
  );

  const swingText = (/** @type {number} */ i) => {
    const s = swing(i);
    return s === 'phai' ? 'lệch sang phải' : s === 'trai' ? 'lệch sang trái' : 'chỉ số 0';
  };
  const poleName = (/** @type {'N' | 'S'} */ p) => (p === 'N' ? 'cực Bắc (N)' : 'cực Nam (S)');

  const feedback = $derived.by(() => {
    if (sliding) {
      if (pos === target) {
        return `Nam châm đứng yên, cách cuộn dây ${formatNumber(pos, 1)} cm: số đường sức từ xuyên qua tiết diện cuộn dây không đổi (${lines} đường) nên không có dòng điện cảm ứng, kim điện kế chỉ số 0. Hãy đưa nam châm lại gần hoặc ra xa.`;
      }
      const closer = target < pos;
      const way = closer ? 'trái' : 'phải';
      return `Đưa ${poleName(pole)} ${closer ? 'lại gần' : 'ra xa'} cuộn dây: số đường sức từ xuyên qua cuộn dây ${closer ? 'tăng' : 'giảm'}, trong cuộn dây xuất hiện dòng điện cảm ứng, kim điện kế lệch sang ${pole === 'N' ? way : way === 'trái' ? 'phải' : 'trái'}. Di chuyển càng nhanh, kim lệch càng nhiều.`;
    }
    if (spinning) {
      return 'Nam châm quay đều: số đường sức từ xuyên qua cuộn dây luân phiên tăng, giảm, nên dòng điện cảm ứng luân phiên đổi chiều — hai đèn LED thay nhau sáng, đồ thị dòng điện lúc ở trên, lúc ở dưới trục thời gian. Đó là dòng điện xoay chiều.';
    }
    if (angle !== angleTarget) {
      const q = rotorQuarter(angle);
      return `${poleName(q.pole)} đang quay ${q.closer ? 'lại gần' : 'ra xa'} cuộn dây: số đường sức từ xuyên qua cuộn dây ${q.more ? 'tăng' : 'giảm'}, kim điện kế ${swingText(reading)}.`;
    }
    return `Nam châm đứng yên ở góc ${formatNumber(angle, 0)}°: số đường sức từ qua cuộn dây không đổi (${lines} đường), không có dòng điện cảm ứng. Nhấn "Quay nam châm" hoặc kéo thanh "Góc quay".`;
  });

  let reduce = $state(false);
  onMount(() => {
    reduce = reducedMotion();
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cách làm thay đổi số đường sức từ"
    options={[
      { value: 'truot', label: 'Đưa nam châm vào, ra' },
      { value: 'quay', label: 'Quay nam châm' },
    ]}
    bind:value={mode}
    onchange={changeMode}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-lg touch-none select-none"
      role="group"
      aria-label="Nam châm, cuộn dây kín và điện kế. {lines} đường sức từ xuyên qua cuộn dây, kim điện kế {swingText(
        needle,
      )}."
    >
      <!-- wires: coil, galvanometer and two LEDs facing opposite ways -->
      <g fill="none" stroke="#475569" stroke-width="1.5">
        <polyline points="{COIL_L},{AXIS - 22} {COIL_L},59 214,59" />
        <polyline points="{COIL_R},{AXIS - 22} {COIL_R},108 338,108 338,40 286,40" />
        <line x1="306" y1="108" x2="306" y2="40" />
      </g>
      {#each [{ x: 306, up: true, glow: ledUp, color: '#ef4444' }, { x: 338, up: false, glow: ledDown, color: '#22c55e' }] as led (led.x)}
        <circle cx={led.x} cy="74" r="11" fill={led.color} opacity={led.glow * 0.6} />
        <path
          d={led.up
            ? `M${led.x - 6},80 L${led.x + 6},80 L${led.x},70 Z`
            : `M${led.x - 6},68 L${led.x + 6},68 L${led.x},78 Z`}
          fill={led.glow > 0.05 ? led.color : '#e2e8f0'}
          stroke="#334155"
        />
        <line
          x1={led.x - 6}
          x2={led.x + 6}
          y1={led.up ? 70 : 78}
          y2={led.up ? 70 : 78}
          stroke="#334155"
          stroke-width="1.5"
        />
      {/each}

      <!-- centre-zero galvanometer -->
      <rect x="214" y="22" width="72" height="74" rx="8" fill="#f8fafc" stroke="#94a3b8" />
      {#each [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as k (k)}
        {@const a = ((k * 10 - 90) * Math.PI) / 180}
        <line
          x1={250 + 46 * Math.cos(a)}
          y1={86 + 46 * Math.sin(a)}
          x2={250 + (k % 5 === 0 ? 38 : 42) * Math.cos(a)}
          y2={86 + (k % 5 === 0 ? 38 : 42) * Math.sin(a)}
          stroke="#334155"
        />
      {/each}
      <text x="250" y="34" text-anchor="middle" class="fill-slate-600 text-[9px]">0</text>
      <text x="275" y="92" text-anchor="middle" class="fill-slate-500 text-[10px] font-bold">G</text
      >
      <line
        x1="250"
        y1="86"
        x2="250"
        y2="44"
        stroke="#dc2626"
        stroke-width="2"
        stroke-linecap="round"
        transform="rotate({needleDeg} 250 86)"
      />
      <circle cx="250" cy="86" r="3" fill="#334155" />

      <!-- coil -->
      <rect
        x={COIL_L}
        y={AXIS - 22}
        width={COIL_R - COIL_L}
        height="44"
        fill="#fef3c7"
        opacity="0.6"
      />
      {#each fieldLines as f, j (j)}
        <line
          x1={COIL_L}
          x2={COIL_R}
          y1={f.y}
          y2={f.y}
          stroke="#0284c7"
          stroke-width="1.2"
          opacity="0.8"
        />
        <path
          d={lineDir > 0
            ? `M${COIL_R - 4},${f.y - 3} L${COIL_R + 2},${f.y} L${COIL_R - 4},${f.y + 3}`
            : `M${COIL_L + 4},${f.y - 3} L${COIL_L - 2},${f.y} L${COIL_L + 4},${f.y + 3}`}
          fill="none"
          stroke="#0284c7"
          stroke-width="1.2"
        />
        {#if sliding && face < COIL_L - 2}
          <line
            x1={face}
            y1={f.y0}
            x2={COIL_L}
            y2={f.y}
            stroke="#0284c7"
            stroke-dasharray="3 3"
            opacity="0.7"
          />
        {/if}
      {/each}
      {#each Array.from({ length: 10 }, (_, k) => k) as k (k)}
        <ellipse
          cx={COIL_L + 5 + k * 10}
          cy={AXIS}
          rx="4"
          ry="22"
          fill="none"
          stroke="#b45309"
          stroke-width="2"
        />
      {/each}
      <text
        x={(COIL_L + COIL_R) / 2}
        y={AXIS + 38}
        text-anchor="middle"
        class="fill-amber-800 text-[10px]">cuộn dây kín</text
      >

      {#if sliding}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Nam châm thẳng, {poleName(pole)} hướng vào cuộn dây"
          aria-valuemin={0}
          aria-valuemax={RANGE}
          aria-valuenow={target}
          aria-valuetext="cách cuộn dây {formatNumber(target, 1)} xăng-ti-mét"
          style="cursor:ew-resize; outline:none"
          use:draggable={dragMagnet}
        >
          <g class="drag-knob">
            <rect
              x={face - MAG}
              y={AXIS - 12}
              width={MAG / 2}
              height="24"
              fill={pole === 'N' ? '#2563eb' : '#dc2626'}
            />
            <rect
              x={face - MAG / 2}
              y={AXIS - 12}
              width={MAG / 2}
              height="24"
              fill={pole === 'N' ? '#dc2626' : '#2563eb'}
            />
          </g>
          <text
            x={face - (MAG * 3) / 4}
            y={AXIS + 5}
            text-anchor="middle"
            class="pointer-events-none fill-white text-[13px] font-bold"
            >{pole === 'N' ? 'S' : 'N'}</text
          >
          <text
            x={face - MAG / 4}
            y={AXIS + 5}
            text-anchor="middle"
            class="pointer-events-none fill-white text-[13px] font-bold">{pole}</text
          >
        </g>
        <text x="8" y={H - 8} class="fill-slate-500 text-[10px]"
          >cách cuộn dây {formatNumber(pos, 1)} cm</text
        >
      {:else}
        <g transform="rotate({-angle} 120 {AXIS})">
          <rect x={120 - MAG / 2} y={AXIS - 10} width={MAG / 2} height="20" fill="#2563eb" />
          <rect x="120" y={AXIS - 10} width={MAG / 2} height="20" fill="#dc2626" />
          <text
            x={120 - MAG / 4}
            y={AXIS + 5}
            text-anchor="middle"
            class="fill-white text-[12px] font-bold">S</text
          >
          <text
            x={120 + MAG / 4}
            y={AXIS + 5}
            text-anchor="middle"
            class="fill-white text-[12px] font-bold">N</text
          >
        </g>
        <circle cx="120" cy={AXIS} r="3" fill="#0f172a" />
        <text x="120" y={H - 8} text-anchor="middle" class="fill-slate-500 text-[10px]"
          >trục quay</text
        >
      {/if}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      {#if sliding}
        Kéo nam châm sang trái, sang phải (hoặc chọn nam châm rồi dùng phím mũi tên ←, →). Đường
        xanh là đường sức từ xuyên qua cuộn dây.
      {:else}
        Nam châm quay quanh trục vuông góc với trục cuộn dây. Đèn LED đỏ và LED xanh mắc ngược chiều
        nhau: mỗi đèn chỉ sáng khi dòng điện chạy theo một chiều.
      {/if}
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    {#if sliding}
      <button
        type="button"
        class={button.primary}
        onclick={() => slideTo(0)}
        disabled={target === 0}>Đưa nam châm vào</button
      >
      <button
        type="button"
        class={button.secondary}
        onclick={() => slideTo(RANGE)}
        disabled={target === RANGE}>Kéo nam châm ra</button
      >
      <button type="button" class={button.quiet} onclick={flip}>Đảo cực nam châm</button>
    {:else}
      <button type="button" class={button.primary} onclick={toggleSpin} disabled={reduce}
        >{spinning ? 'Dừng' : 'Quay nam châm'}</button
      >
    {/if}
  </div>
  {#if !sliding}
    {#if reduce}
      <p class="text-sm text-slate-600">
        Máy của em đang bật chế độ giảm chuyển động: hãy quay nam châm bằng thanh trượt dưới đây.
      </p>
    {/if}
    <SliderField
      label="Góc quay của nam châm"
      value={angleTarget}
      min={0}
      max={360}
      step={15}
      unit="°"
      format={(v) => formatNumber(v, 0)}
      oninput={turnTo}
    />
  {/if}

  <div class="{card} p-3">
    <div class="mb-1 flex flex-wrap justify-between gap-2 text-sm text-slate-700">
      <span>Đường sức từ qua cuộn dây: <b class="tabular-nums text-sky-700">{lines}</b></span>
      <span>Kim điện kế: <b class="text-slate-900">{swingText(needle)}</b></span>
    </div>
    <svg
      viewBox="0 0 360 100"
      class="block w-full"
      role="img"
      aria-label="Đồ thị cường độ dòng điện cảm ứng theo thời gian trong {SPAN} giây gần nhất"
    >
      <line x1="24" y1="50" x2="354" y2="50" stroke="#94a3b8" />
      <line x1="24" y1="8" x2="24" y2="92" stroke="#94a3b8" />
      <text x="4" y="14" class="fill-slate-600 text-[11px] italic">I</text>
      <text x="346" y="64" class="fill-slate-600 text-[11px] italic">t</text>
      <text x="28" y="18" class="fill-rose-600 text-[9px]">chiều 1 (LED đỏ)</text>
      <text x="28" y="90" class="fill-green-700 text-[9px]">chiều 2 (LED xanh)</text>
      {#if trace.length > 1}
        <polyline points={traceLine} fill="none" stroke="#4f46e5" stroke-width="2" />
      {/if}
    </svg>
  </div>

  <FeedbackNote tone={moving ? 'ok' : 'info'} text={feedback} />
</div>
