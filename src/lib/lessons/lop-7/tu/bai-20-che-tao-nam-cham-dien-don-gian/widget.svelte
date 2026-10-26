<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { MAX_CLIPS, clipsHeld, poles } from './engine.js';

  const W = 480;
  const H = 270;
  const CY = 95;
  const COIL_X0 = 150;
  const COIL_X1 = 310;
  const TARGETS = [3, 6, 10];

  let on = $state(false);
  let turns = $state(200);
  let current = $state(1);
  let core = $state('sat');
  let reversed = $state(false);
  let targetAt = $state(0);

  const magnet = $derived({ on, turns, current, core: core === 'sat' });
  const held = $derived(clipsHeld(magnet));
  const ends = $derived(poles(on, reversed, current));
  const target = $derived(TARGETS[targetAt]);
  const loops = $derived(Math.round(turns / 20));
  const flowing = $derived(on && current > 0);

  /** Needle angle (SVG degrees, 0 = pointing right) of the compass left of the coil. */
  const needle = $derived(ends ? (ends.left === 'S' ? 0 : 180) : -90);

  const pole = (/** @type {'N' | 'S'} */ p) => (p === 'N' ? 'cực Bắc' : 'cực Nam');
  const amps = (/** @type {number} */ v) => `${formatNumber(v, 1)} A`;

  const status = $derived.by(() => {
    if (!on) {
      return 'Công tắc đang mở: không có dòng điện, ống dây không có từ trường. Các ghim nằm trên bàn, kim nam châm chỉ hướng Bắc.';
    }
    if (!ends) {
      return 'Cường độ dòng điện bằng 0: ống dây không có từ trường. Kéo thanh trượt để tăng dòng điện.';
    }
    const parts = [
      `Nam châm điện hút được ${held} ghim.`,
      `Đầu bên phải là ${pole(ends.right)}, đầu bên trái là ${pole(ends.left)}: cực Bắc của kim nam châm ${ends.left === 'S' ? 'quay vào' : 'quay ra xa'} đầu bên trái.`,
    ];
    if (core !== 'sat') parts.push('Không có lõi sắt non nên từ trường yếu hơn nhiều.');
    if (held === target) parts.push(`Đạt thử thách: hút đúng ${target} ghim!`);
    return parts.join(' ');
  });
  const tone = $derived(flowing && held === target ? 'ok' : flowing ? 'info' : 'warn');

  /** Right tip of the magnet: the end of the core, or of the bare coil. */
  const tip = $derived(core === 'sat' ? COIL_X1 + 35 : COIL_X1);

  /** Positions of the clips hanging from the right tip, two columns. */
  const hanging = $derived(
    Array.from({ length: held }, (_, k) => ({
      x: tip + 7 + (k % 2) * 16,
      y: CY + 18 + Math.floor(k / 2) * 17,
    })),
  );
  const onTable = $derived(
    Array.from({ length: MAX_CLIPS - held }, (_, k) => ({
      x: 300 + (k % 7) * 22,
      y: 246 - Math.floor(k / 7) * 11,
    })),
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class={on ? button.primary : button.secondary}
      aria-pressed={on}
      onclick={() => (on = !on)}>{on ? 'Mở công tắc K' : 'Đóng công tắc K'}</button
    >
    <button type="button" class={button.quiet} onclick={() => (reversed = !reversed)}
      >Đổi chiều dòng điện</button
    >
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <SegmentedControl
      label="Số vòng dây"
      options={[
        { value: 100, label: '100' },
        { value: 200, label: '200' },
        { value: 300, label: '300' },
        { value: 400, label: '400' },
      ]}
      bind:value={turns}
    />
    <SegmentedControl
      label="Lõi trong ống dây"
      options={[
        { value: 'sat', label: 'Lõi sắt non' },
        { value: 'khong', label: 'Không có lõi' },
      ]}
      bind:value={core}
    />
  </div>
  <SliderField
    label="Cường độ dòng điện"
    bind:value={current}
    min={0}
    max={2}
    step={0.1}
    format={amps}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label="Nam châm điện: ống dây {turns} vòng, {core === 'sat'
        ? 'có lõi sắt non'
        : 'không có lõi'}, dòng điện {amps(flowing ? current : 0)}. {status}"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
      <line x1="270" y1="252" x2={W - 10} y2="252" stroke="#a16207" stroke-width="3" />
      <text x={W - 14} y="268" text-anchor="end" class="fill-slate-500 text-[13px]">Mặt bàn</text>

      <!-- core -->
      {#if core === 'sat'}
        <rect
          x={COIL_X0 - 25}
          y={CY - 12}
          width={COIL_X1 - COIL_X0 + 60}
          height="24"
          rx="3"
          fill="#94a3b8"
        />
        <text x={COIL_X0 - 22} y={CY - 28} class="fill-slate-600 text-[13px]">lõi sắt non</text>
      {:else}
        <rect
          x={COIL_X0}
          y={CY - 12}
          width={COIL_X1 - COIL_X0}
          height="24"
          fill="#fff"
          stroke="#cbd5e1"
          stroke-dasharray="4 3"
        />
      {/if}

      <!-- coil -->
      {#each Array.from({ length: loops }, (_, k) => k) as k (k)}
        {@const x = COIL_X0 + ((k + 0.5) * (COIL_X1 - COIL_X0)) / loops}
        <ellipse
          cx={x}
          cy={CY}
          rx="3.2"
          ry="21"
          fill="none"
          stroke={flowing ? '#c2410c' : '#b45309'}
          stroke-width="2.2"
        />
      {/each}

      <!-- pole labels -->
      {#if ends}
        <text
          x={COIL_X0 - 40}
          y={CY + 7}
          text-anchor="middle"
          class="text-[20px] font-bold {ends.left === 'N' ? 'fill-red-600' : 'fill-blue-600'}"
          >{ends.left}</text
        >
        <text
          x={COIL_X1 + 22}
          y={CY - 18}
          text-anchor="middle"
          class="text-[20px] font-bold {ends.right === 'N' ? 'fill-red-600' : 'fill-blue-600'}"
          >{ends.right}</text
        >
      {/if}

      <!-- compass on the left -->
      <g transform="translate(55 {CY})">
        <circle r="24" fill="#fff" stroke="#0f172a" stroke-width="2" />
        <g transform="rotate({needle})">
          <path d="M 19 0 L 0 -5 L 0 5 Z" fill="#dc2626" />
          <path d="M -19 0 L 0 -5 L 0 5 Z" fill="#2563eb" />
        </g>
        <circle r="2.5" fill="#0f172a" />
      </g>

      <!-- clips -->
      {#each hanging as c, k (k)}
        <rect
          x={c.x - 5}
          y={c.y}
          width="10"
          height="16"
          rx="4"
          fill="none"
          stroke="#475569"
          stroke-width="2"
        />
      {/each}
      {#each onTable as c, k (k)}
        <rect
          x={c.x - 8}
          y={c.y - 4}
          width="16"
          height="8"
          rx="3.5"
          fill="none"
          stroke="#475569"
          stroke-width="2"
        />
      {/each}

      <!-- circuit: coil, source and switch K in series -->
      <g fill="none" stroke="#334155" stroke-width="2" aria-hidden="true">
        <path d="M {COIL_X0 + 4} {CY + 21} L {COIL_X0 + 4} 215 L 190 215" />
        <path d="M 200 215 L 240 215" />
        <path d="M 275 215 L {COIL_X1 - 4} 215 L {COIL_X1 - 4} {CY + 21}" />
        {#if on}
          <line x1="240" y1="215" x2="275" y2="215" />
        {:else}
          <line x1="240" y1="215" x2="271" y2="199" />
        {/if}
      </g>
      <g aria-hidden="true">
        <circle cx="240" cy="215" r="3" fill="#334155" />
        <circle cx="275" cy="215" r="3" fill="#334155" />
        {#each [190, 200] as x, k (x)}
          {@const plus = (k === 0) !== reversed}
          <line
            x1={x}
            y1={plus ? 203 : 208}
            x2={x}
            y2={plus ? 227 : 222}
            stroke="#334155"
            stroke-width={plus ? 2.5 : 6}
          />
          <text
            x={k === 0 ? x - 4 : x + 6}
            y="201"
            text-anchor={k === 0 ? 'end' : 'start'}
            class="fill-slate-700 text-[14px]">{plus ? '+' : '−'}</text
          >
        {/each}
        <text x="195" y="245" text-anchor="middle" class="fill-slate-700 text-[13px]"
          >nguồn điện</text
        >
        <text x="257" y="240" text-anchor="middle" class="fill-slate-700 text-[13px]">K</text>
      </g>

      {#if flowing}
        {@const dir = reversed ? 1 : -1}
        <g aria-hidden="true">
          <path d="M {172 + dir * 8} 215 l {-dir * 12} -6 l 0 12 Z" fill="#c2410c" />
          <text x="172" y="206" text-anchor="middle" class="fill-orange-700 text-[13px]">I</text>
        </g>
      {/if}
    </svg>
  </figure>

  <div class="flex flex-wrap items-center gap-2">
    <span class="text-slate-700">Thử thách: chỉnh để nam châm điện hút đúng {target} ghim.</span>
    <button
      type="button"
      class={button.quiet}
      onclick={() => (targetAt = (targetAt + 1) % TARGETS.length)}>Đổi thử thách</button
    >
  </div>

  <FeedbackNote {tone} text={status} />
</div>
