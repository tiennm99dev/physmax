<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { button, card } from '#lib/core/ui.js';
  import { qty } from '../_shared/materials.js';
  import {
    BALANCE_MAX,
    BATH_LIQUIDS,
    BLOCK,
    BLOCK_MATERIALS,
    BLOCK_VOLUME,
    LOWER,
    buoyancy,
    hung,
    maxLower,
    release,
  } from './engine.js';

  /** @type {Record<string, string>} */
  const BLOCK_COLOR = { sat: '#52525b', nhom: '#cbd5e1', 'nuoc-da': '#e0f2fe', go: '#d6a96b' };
  /** @type {Record<string, string>} */
  const LIQUID_COLOR = {
    nuoc: '#bae6fd',
    'dau-hoa': '#fde68a',
    'nuoc-muoi': '#a5f3fc',
    'thuy-ngan': '#cbd5e1',
  };
  /** @type {Record<string, string>} */
  const FATE_TEXT = {
    chim: 'chìm xuống đáy',
    'lo-lung': 'lơ lửng trong chất lỏng',
    noi: 'nổi lên mặt chất lỏng',
  };

  let blockId = $state('nhom');
  let liquidId = $state('nuoc');
  let lower = $state(LOWER.min);
  let released = $state(false);

  const block = $derived(BLOCK_MATERIALS.find((m) => m.id === blockId) ?? BLOCK_MATERIALS[0]);
  const liquid = $derived(BATH_LIQUIDS.find((l) => l.id === liquidId) ?? BATH_LIQUIDS[0]);
  const h = $derived(hung(block.density, liquid.density, lower));
  const fate = $derived(release(block.density, liquid.density));

  /** Where the block's bottom sits and how much is under liquid, hung or released. */
  const shown = $derived.by(() => {
    if (!released) return { depth: h.depth, volume: h.volume, reading: h.reading };
    const depth =
      fate.fate === 'chim'
        ? LOWER.max
        : fate.fate === 'noi'
          ? (fate.depth ?? 0)
          : clamp(lower, BLOCK.height + 1, LOWER.max - 1);
    const volume = BLOCK.base * Math.min(BLOCK.height, depth);
    return { depth, volume, reading: 0 };
  });
  const FA = $derived(buoyancy(liquid.density, shown.volume));

  // Drawing.
  const VW = 300;
  const VH = 320;
  const SURF = 190;
  const PX = 8;
  const BX = 80;
  const BW = 5 * PX;
  const BH = BLOCK.height * PX;
  const FLOOR = SURF + (LOWER.max + 0.5) * PX;
  const S_TOP = 22;
  const S_PX = 10;
  const bottomY = $derived(SURF + shown.depth * PX);
  const cupFill = $derived((shown.volume / BLOCK_VOLUME) * 46);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: BX, y: 0 };

  /** @param {number} next */
  function setLower(next) {
    lower = clamp(Math.round(next * 2) / 2, LOWER.min, maxLower(block.density, liquid.density));
  }

  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => {
      if (!released) setLower((scratch.y + BH / 2 - SURF) / PX);
    },
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => {
      if (!released) setLower(lower + dy * (big ? 2 : 0.5));
    },
  };

  function rehang() {
    released = false;
    lower = LOWER.min;
  }

  function changeSetup() {
    released = false;
    lower = clamp(lower, LOWER.min, maxLower(block.density, liquid.density));
  }

  const N = (/** @type {number} */ v) => `${qty(v, 2)} N`;

  const status = $derived.by(() => {
    if (released) {
      const why =
        fate.fate === 'chim'
          ? `P = ${N(fate.P)} lớn hơn lực đẩy Archimedes khi vật chìm hẳn (${N(fate.FAFull)})`
          : fate.fate === 'noi'
            ? `P = ${N(fate.P)} nhỏ hơn lực đẩy Archimedes khi vật chìm hẳn (${N(fate.FAFull)}); vật nổi lên tới khi phần chìm cho lực đẩy bằng P = ${N(fate.P)}`
            : `P = ${N(fate.P)} bằng lực đẩy Archimedes khi vật chìm hẳn`;
      return `Thả ra, khối ${block.name.toLowerCase()} ${FATE_TEXT[fate.fate]} trong ${liquid.name.toLowerCase()}: ${why}.`;
    }
    if (h.sunk === 0) {
      return `Khối ${block.name.toLowerCase()} treo trong không khí: lực kế chỉ trọng lượng P = ${N(h.P)}. Kéo vật xuống chất lỏng.`;
    }
    const base = `Phần chìm ${qty(h.volume)} cm³: lực kế chỉ ${N(h.reading)}, lực đẩy Archimedes = P − số chỉ = ${N(h.P)} − ${N(h.reading)} = ${N(h.FA)}. Chất lỏng tràn ra có trọng lượng ${N(h.FA)}.`;
    if (!h.slack) return base;
    return fate.fate === 'lo-lung'
      ? `${base} Dây chùng: vật chìm hẳn mà lực đẩy bằng trọng lượng, vật lơ lửng trong chất lỏng.`
      : `${base} Dây chùng: lực đẩy đã bằng trọng lượng, vật tự nổi.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật (5 cm × 5 cm × 4 cm, V = 100 cm³)"
      options={BLOCK_MATERIALS.map((m) => ({ value: m.id, label: m.name }))}
      bind:value={blockId}
      onchange={changeSetup}
    />
    <SegmentedControl
      label="Chất lỏng trong bình tràn"
      options={BATH_LIQUIDS.map((l) => ({ value: l.id, label: l.name }))}
      bind:value={liquidId}
      onchange={changeSetup}
    />
  </div>

  <div class="grid gap-4 sm:grid-cols-[3fr_2fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="mx-auto block w-full max-w-sm touch-none"
        role="group"
        aria-label="Lực kế treo khối {block.name.toLowerCase()} trên bình tràn chứa {liquid.name.toLowerCase()}, lực kế chỉ {N(
          shown.reading,
        )}"
      >
        <!-- Spring balance -->
        <rect
          x={BX - 22}
          y="6"
          width="44"
          height={BALANCE_MAX * S_PX + 30}
          rx="6"
          fill="#e0f2fe"
          stroke="#0369a1"
        />
        {#each Array.from({ length: BALANCE_MAX + 1 }, (_, i) => i) as t (t)}
          <line
            x1={BX - 22}
            y1={S_TOP + t * S_PX}
            x2={BX - 12}
            y2={S_TOP + t * S_PX}
            stroke="#0c4a6e"
          />
          <text x={BX - 9} y={S_TOP + t * S_PX + 3} class="fill-sky-900 text-[8px]">{t}</text>
        {/each}
        <text x={BX + 6} y={S_TOP - 6} class="fill-sky-900 text-[8px] font-semibold">N</text>
        <line
          x1={BX - 22}
          y1={S_TOP + shown.reading * S_PX}
          x2={BX + 20}
          y2={S_TOP + shown.reading * S_PX}
          stroke="#dc2626"
          stroke-width="2.5"
        />
        {#if !released}
          <line
            x1={BX}
            y1={BALANCE_MAX * S_PX + 36}
            x2={BX}
            y2={bottomY - BH}
            stroke="#334155"
            stroke-width="1.5"
          />
        {/if}

        <!-- Overflow vessel and catch cup -->
        <rect
          x="30"
          y={SURF}
          width="130"
          height={FLOOR - SURF}
          fill={LIQUID_COLOR[liquid.id]}
          opacity="0.85"
        />
        <path
          d="M30 {SURF - 30} V{FLOOR} H160 V{SURF - 2} L190 {SURF + 6}"
          fill="none"
          stroke="#334155"
          stroke-width="2"
        />
        <rect
          x="200"
          y={FLOOR - cupFill}
          width="60"
          height={cupFill}
          fill={LIQUID_COLOR[liquid.id]}
        />
        <path
          d="M200 {FLOOR - 56} V{FLOOR} H260 V{FLOOR - 56}"
          fill="none"
          stroke="#334155"
          stroke-width="2"
        />
        <text x="230" y={FLOOR + 14} text-anchor="middle" class="fill-slate-600 text-[9px]"
          >chất lỏng tràn ra</text
        >
        <text
          x="230"
          y={FLOOR - 62}
          text-anchor="middle"
          class="fill-slate-800 text-[9px] font-semibold">{qty(shown.volume)} cm³</text
        >

        <!-- Block -->
        <g
          class="drag-handle"
          role="slider"
          tabindex={released ? -1 : 0}
          aria-disabled={released}
          aria-label="Vật treo dưới lực kế: kéo lên xuống hoặc dùng phím mũi tên lên, xuống để nhúng vật"
          aria-valuemin={LOWER.min}
          aria-valuemax={LOWER.max}
          aria-valuenow={shown.depth}
          aria-valuetext="Phần chìm {qty(shown.volume)} cm³, lực kế chỉ {N(shown.reading)}"
          style="cursor:{released ? 'default' : 'grab'}; outline:none"
          use:draggable={drag}
        >
          <rect
            class="drag-knob"
            x={BX - BW / 2}
            y={bottomY - BH}
            width={BW}
            height={BH}
            rx="2"
            fill={BLOCK_COLOR[block.id]}
            stroke="#1e293b"
            stroke-width="1.5"
          />
        </g>
        {#if FA > 0}
          <line
            x1={BX + BW / 2 + 10}
            y1={bottomY + 4}
            x2={BX + BW / 2 + 10}
            y2={bottomY - 8 - Math.min(40, FA * 8)}
            stroke="#16a34a"
            stroke-width="2.5"
            marker-end="url(#luc-day-mui-ten)"
          />
          <text x={BX + BW / 2 + 14} y={bottomY - 2} class="fill-green-800 text-[9px] font-semibold"
            >F<tspan dy="2" font-size="7">A</tspan></text
          >
        {/if}
        <defs>
          <marker
            id="luc-day-mui-ten"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#16a34a" />
          </marker>
        </defs>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kéo vật xuống bình tràn. Mũi tên xanh: lực đẩy Archimedes hướng lên.
      </figcaption>
    </figure>

    <div class="space-y-3">
      <dl class="grid gap-2 text-sm tabular-nums">
        <div class="flex justify-between rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Trọng lượng vật P</dt>
          <dd class="font-semibold">{N(h.P)}</dd>
        </div>
        <div class="flex justify-between rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Số chỉ lực kế</dt>
          <dd class="font-semibold">{N(shown.reading)}</dd>
        </div>
        <div class="flex justify-between rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Thể tích phần chìm</dt>
          <dd class="font-semibold">{qty(shown.volume)} cm³</dd>
        </div>
        <div class="flex justify-between rounded-xl bg-green-50 px-3 py-2">
          <dt class="text-green-800">Lực đẩy F<sub>A</sub> = d · V</dt>
          <dd class="font-semibold text-green-900">{N(FA)}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2">
        {#if released}
          <button type="button" class={button.quiet} onclick={rehang}>Treo lại vào lực kế</button>
        {:else}
          <button type="button" class={button.primary} onclick={() => (released = true)}>
            Thả vật khỏi lực kế
          </button>
        {/if}
      </div>
    </div>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {released
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>

<style>
  .drag-handle:focus-visible .drag-knob {
    stroke-width: 4;
    stroke: #4f46e5;
  }
</style>
