<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import {
    ECHO_MIN,
    MATERIALS,
    SPEED,
    echoDelay,
    hearing,
    materialById,
    minEchoDistance,
  } from './engine.js';

  const W = 480;
  const H = 170;
  const PERSON = 36;
  const ROOM_LEFT = 56;
  const ROOM_RIGHT = 450;
  const D_MAX = 40;
  /** The animation runs this many times slower than real sound. */
  const SLOW = 12;
  /** Seconds shown on the time strip. */
  const T_MAX = 0.25;
  const SW = 480;
  const SH = 150;
  const S_LEFT = 24;
  const S_RIGHT = 460;
  const BASE = 96;

  let materialId = $state('kinh');
  let distance = $state(20);
  /** Real seconds since the clap, or -1 before it. */
  let clock = $state(-1);
  let running = $state(false);

  const material = $derived(materialById(materialId));
  const delay = $derived(echoDelay(distance));
  const heard = $derived(hearing(distance, material));
  const wallX = $derived(PERSON + ((ROOM_RIGHT - PERSON) * distance) / D_MAX);
  const pxPerSecond = $derived((wallX - PERSON) / (distance / SPEED));
  const tx = (/** @type {number} */ t) => S_LEFT + ((S_RIGHT - S_LEFT) * t) / T_MAX;

  /** The pulse on its way: x, and whether it is the reflected one. */
  const pulse = $derived.by(() => {
    if (clock < 0 || clock >= delay) return null;
    const half = delay / 2;
    if (clock <= half) return { x: PERSON + pxPerSecond * clock, back: false };
    return { x: wallX - pxPerSecond * (clock - half), back: true };
  });

  $effect(() => {
    if (!running) return;
    if (reducedMotion()) {
      clock = delay;
      running = false;
      return;
    }
    const end = delay;
    return frameLoop((dt) => {
      const next = clock + dt / SLOW;
      if (next >= end) {
        clock = end;
        running = false;
      } else {
        clock = next;
      }
    });
  });

  function clap() {
    clock = 0;
    running = true;
  }

  function reset() {
    running = false;
    clock = -1;
  }

  const ms = (/** @type {number} */ t) => `${formatNumber(t * 1000, 0)} ms`;
  const m = (/** @type {number} */ d) => `${formatNumber(d, 1)} m`;

  const status = $derived.by(() => {
    const head = `Tường cách ${m(distance)}: âm phản xạ tới tai sau âm trực tiếp 2 · ${formatNumber(distance, 1)} : ${SPEED} ≈ ${formatNumber(delay, 3)} s (${ms(delay)}).`;
    if (heard === 'faint') {
      return `${head} ${material.name} ${material.why} nên phản xạ âm kém, hấp thụ phần lớn âm: âm phản xạ rất nhỏ, gần như không nghe thấy tiếng vang.`;
    }
    if (heard === 'merged') {
      return `${head} Khoảng thời gian này nhỏ hơn 1/15 s ≈ 67 ms nên âm phản xạ hòa vào âm trực tiếp, làm âm nghe to và kéo dài hơn, không thành tiếng vang riêng. Lùi tường ra xa hơn ${m(minEchoDistance())}.`;
    }
    return `${head} Khoảng thời gian này không nhỏ hơn 1/15 s và ${material.name.toLowerCase()} phản xạ âm tốt (${material.why}): nghe rõ tiếng vang.`;
  });

  const wallFill = $derived(
    { kinh: '#bae6fd', 'da-hoa': '#e2e8f0', rem: '#9f1239', xop: '#fde68a' }[material.id] ??
      '#e2e8f0',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Vật liệu phủ bức tường"
    options={MATERIALS.map((x) => ({ value: x.id, label: x.name }))}
    bind:value={materialId}
    onchange={reset}
  />
  <SliderField
    label="Khoảng cách từ người đến tường"
    bind:value={distance}
    min={2}
    max={D_MAX}
    step={0.5}
    unit="m"
    format={(v) => formatNumber(v, 1)}
    oninput={reset}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label="Người vỗ tay bên trái, bức tường {material.name.toLowerCase()} cách {m(
        distance,
      )}. {pulse
        ? pulse.back
          ? 'Âm phản xạ đang trở về.'
          : 'Âm đang truyền tới tường.'
        : clock < 0
          ? 'Chưa vỗ tay.'
          : 'Âm phản xạ đã về tới tai.'}"
    >
      <rect
        x={ROOM_LEFT - 20}
        y="14"
        width={wallX - ROOM_LEFT + 20}
        height={H - 28}
        fill="#f8fafc"
      />
      <line x1="10" y1={H - 14} x2={W - 10} y2={H - 14} stroke="#94a3b8" stroke-width="2" />
      <!-- person -->
      <circle cx={PERSON - 14} cy={H / 2 - 22} r="10" fill="#334155" />
      <line
        x1={PERSON - 14}
        y1={H / 2 - 12}
        x2={PERSON - 14}
        y2={H / 2 + 26}
        stroke="#334155"
        stroke-width="5"
      />
      <line
        x1={PERSON - 14}
        y1={H / 2 - 4}
        x2={PERSON}
        y2={H / 2 - 8}
        stroke="#334155"
        stroke-width="4"
      />
      <!-- wall -->
      <rect
        x={wallX}
        y="14"
        width="16"
        height={H - 28}
        fill={wallFill}
        stroke="#475569"
        stroke-width="1.5"
        stroke-dasharray={material.good ? 'none' : '3 3'}
      />
      <text
        x={Math.min(wallX + 8, W - 40)}
        y="12"
        text-anchor="middle"
        class="fill-slate-700 text-[14px]">{material.name}</text
      >
      {#if pulse}
        {@const r = 34}
        <path
          d={pulse.back
            ? `M${pulse.x + 10} ${H / 2 - r} q-18 ${r} 0 ${2 * r}`
            : `M${pulse.x - 10} ${H / 2 - r} q18 ${r} 0 ${2 * r}`}
          fill="none"
          stroke={pulse.back ? '#dc2626' : '#2563eb'}
          stroke-width="4"
          stroke-linecap="round"
          opacity={pulse.back ? Math.max(0.15, material.reflect) : 1}
        />
      {/if}
      <text
        x={(PERSON + wallX) / 2}
        y={H - 20}
        text-anchor="middle"
        class="fill-slate-600 text-[15px]">d = {m(distance)}</text
      >
    </svg>
  </figure>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {SW} {SH}"
      class="w-full select-none"
      role="img"
      aria-label="Trục thời gian: âm trực tiếp lúc 0, âm phản xạ lúc {ms(
        delay,
      )}, vạch giới hạn 1/15 giây ≈ 67 ms."
    >
      <rect x={tx(0)} y="10" width={tx(ECHO_MIN) - tx(0)} height={BASE - 10} fill="#fef3c7" />
      <text x={tx(ECHO_MIN / 2)} y="22" text-anchor="middle" class="fill-amber-800 text-[13px]"
        >hòa vào</text
      >
      <line x1={S_LEFT} y1={BASE} x2={S_RIGHT} y2={BASE} stroke="#334155" stroke-width="1.5" />
      {#each [0, 0.05, 0.1, 0.15, 0.2, 0.25] as t, i (t)}
        <line x1={tx(t)} y1={BASE} x2={tx(t)} y2={BASE + 5} stroke="#334155" />
        {#if i % 2 === 0}
          <text x={tx(t)} y={BASE + 20} text-anchor="middle" class="fill-slate-600 text-[15px]"
            >{formatNumber(t, 2)} s</text
          >
        {/if}
      {/each}
      <line
        x1={tx(ECHO_MIN)}
        y1="10"
        x2={tx(ECHO_MIN)}
        y2={BASE}
        stroke="#d97706"
        stroke-width="2"
        stroke-dasharray="4 3"
      />
      <text x={tx(ECHO_MIN) + 4} y="40" class="fill-amber-800 text-[15px] font-semibold"
        >1/15 s</text
      >
      <rect x={tx(0)} y={BASE - 56} width="8" height="56" fill="#2563eb" />
      {#if clock >= delay}
        <rect
          x={tx(Math.min(delay, T_MAX)) - 4}
          y={BASE - 56 * material.reflect}
          width="8"
          height={56 * material.reflect}
          fill="#dc2626"
        />
      {/if}
      {#if clock >= 0}
        <line
          x1={tx(Math.min(clock, T_MAX))}
          y1="8"
          x2={tx(Math.min(clock, T_MAX))}
          y2={BASE}
          stroke="#0f172a"
          stroke-width="1"
        />
      {/if}
      <text x={S_LEFT} y={SH - 8} class="fill-blue-700 text-[15px]">■ âm trực tiếp</text>
      <text x={S_LEFT + 170} y={SH - 8} class="fill-red-700 text-[15px]">■ âm phản xạ</text>
    </svg>
    <figcaption class="px-2 text-center text-sm text-slate-600">
      Chiều cao cột cho biết âm mạnh hay yếu. Hình chuyển động chậm hơn thực tế {SLOW} lần.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={clap} disabled={running}>Vỗ tay</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <FeedbackNote
    tone={clock < delay ? 'info' : heard === 'echo' ? 'ok' : 'warn'}
    text={clock < 0
      ? 'Chọn vật liệu, đặt khoảng cách rồi nhấn "Vỗ tay".'
      : clock < delay
        ? 'Âm đang truyền…'
        : status}
  />
</div>
