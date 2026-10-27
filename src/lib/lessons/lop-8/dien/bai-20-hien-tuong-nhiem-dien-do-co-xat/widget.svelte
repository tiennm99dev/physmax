<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    CLOTHS,
    MAX_CHARGE,
    PAPER_BITS,
    PER_RUB,
    RODS,
    bitsLifted,
    chargeSign,
    rodCharge,
  } from './engine.js';

  /** Positive charges (nuclei) drawn in each body; electrons start equal. */
  const BASE = 12;
  const RUB_PX = 40;
  const SITE = (/** @type {number} */ i) => 42 + 23 * i;

  let rod = $state(/** @type {import('./engine.js').RodId} */ ('nhua'));
  let cloth = $state(/** @type {import('./engine.js').ClothId} */ ('len'));
  let rubs = $state(0);
  let near = $state(false);
  let shift = $state(0);

  const q = $derived(rodCharge(rod, cloth, rubs));
  const rodElectrons = $derived(BASE - q);
  const clothElectrons = $derived(BASE + q);
  const lifted = $derived(near ? bitsLifted(q) : 0);
  const rodY = $derived(near ? 170 : 46);

  function reset() {
    rubs = 0;
    near = false;
  }

  function rub() {
    near = false;
    rubs += 1;
    shift = shift === 0 ? 24 : 0;
  }

  /** @type {number | null} */
  let lastX = null;
  let travelled = 0;

  /** @param {PointerEvent} e */
  function down(e) {
    lastX = e.clientX;
    travelled = 0;
    /** @type {Element} */ (e.currentTarget).setPointerCapture?.(e.pointerId);
  }

  /** @param {PointerEvent} e */
  function move(e) {
    if (lastX === null) return;
    const el = /** @type {SVGGraphicsElement} */ (e.currentTarget);
    const svg = el.ownerSVGElement;
    const scale = svg ? 360 / svg.getBoundingClientRect().width : 1;
    const dx = (e.clientX - lastX) * scale;
    lastX = e.clientX;
    shift = Math.max(-30, Math.min(30, shift + dx));
    travelled += Math.abs(dx);
    if (travelled >= RUB_PX) {
      travelled = 0;
      near = false;
      rubs += 1;
    }
  }

  function up() {
    lastX = null;
  }

  /** @param {KeyboardEvent} e */
  function key(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      rub();
    }
  }

  const SIGN_WORD = {
    duong: 'nhiễm điện dương',
    am: 'nhiễm điện âm',
    'trung-hoa': 'trung hòa về điện',
  };

  const status = $derived.by(() => {
    const n = Math.abs(q);
    if (n === 0)
      return `${RODS[rod]} và ${CLOTHS[cloth].toLowerCase()} đều trung hòa về điện: số electron bằng số điện tích dương.`;
    const gains = q < 0;
    return `${RODS[rod]} ${gains ? 'nhận thêm' : 'mất bớt'} ${n} electron nên ${SIGN_WORD[chargeSign(q)]}; ${CLOTHS[cloth].toLowerCase()} ${gains ? 'mất bớt' : 'nhận thêm'} ${n} electron nên ${SIGN_WORD[chargeSign(-q)]}.`;
  });

  const feedback = $derived.by(() => {
    if (!near)
      return {
        tone: /** @type {'info' | 'ok'} */ (q === 0 ? 'info' : 'ok'),
        text:
          q === 0
            ? 'Kéo mảnh vải qua lại (hoặc bấm "Cọ xát") để cọ xát vào thanh.'
            : `${status} Bấm "Đưa lại gần vụn giấy" để thử.`,
      };
    if (lifted === 0)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${RODS[rod]} chưa nhiễm điện nên không hút vụn giấy. Hãy cọ xát trước.`,
      };
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${RODS[rod]} ${SIGN_WORD[chargeSign(q)]} hút được ${lifted}/${PAPER_BITS} vụn giấy. Cọ xát càng nhiều, vật nhiễm điện càng mạnh, hút càng nhiều vụn giấy.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Thanh"
      options={[
        { value: 'nhua', label: RODS.nhua },
        { value: 'thuy-tinh', label: RODS['thuy-tinh'] },
      ]}
      bind:value={rod}
      onchange={reset}
    />
    <SegmentedControl
      label="Vải cọ xát"
      options={[
        { value: 'len', label: CLOTHS.len },
        { value: 'lua', label: CLOTHS.lua },
      ]}
      bind:value={cloth}
      onchange={reset}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 300"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label="{RODS[rod]} có {BASE} điện tích dương và {rodElectrons} electron. {near
        ? `Thanh đang ở gần vụn giấy, hút ${lifted} vụn.`
        : ''}"
    >
      <!-- rod -->
      <g style="transition: transform 0.4s" transform="translate(0 {rodY - 46})">
        <text x="30" y="38" class="fill-slate-700 text-[12px] font-semibold">{RODS[rod]}</text>
        <rect
          x="30"
          y="46"
          width="290"
          height="40"
          rx="10"
          fill={rod === 'nhua' ? '#fde68a' : '#e0f2fe'}
          stroke={rod === 'nhua' ? '#b45309' : '#0369a1'}
          stroke-width="2"
        />
        {#each { length: BASE } as _, i (i)}
          <text
            x={SITE(i)}
            y="62"
            text-anchor="middle"
            class="text-[13px] font-bold {i >= rodElectrons ? 'fill-red-600' : 'fill-red-400'}"
            >+</text
          >
          {#if i < rodElectrons}
            <circle cx={SITE(i)} cy="76" r="5" fill="#2563eb" />
            <text x={SITE(i)} y="79.5" text-anchor="middle" class="fill-white text-[10px] font-bold"
              >−</text
            >
          {/if}
        {/each}
        {#each { length: Math.max(0, rodElectrons - BASE) } as _, i (i)}
          <circle cx={SITE(i) + 11.5} cy="58" r="5" fill="#1d4ed8" stroke="#fff" />
          <text
            x={SITE(i) + 11.5}
            y="61.5"
            text-anchor="middle"
            class="fill-white text-[10px] font-bold">−</text
          >
        {/each}
        <text
          x="326"
          y="72"
          class="text-[16px] font-bold {q < 0 ? 'fill-blue-700' : 'fill-red-600'}"
          >{q < 0 ? '−' : q > 0 ? '+' : ''}</text
        >
      </g>

      {#if !near}
        <!-- cloth: drag sideways to rub -->
        <g
          role="button"
          tabindex="0"
          aria-label="{CLOTHS[cloth]}: kéo qua lại hoặc nhấn Enter để cọ xát vào thanh"
          class="drag-handle cursor-grab outline-none"
          onpointerdown={down}
          onpointermove={move}
          onpointerup={up}
          onpointercancel={up}
          onkeydown={key}
          transform="translate({shift} 0)"
          style="transition: transform 0.15s"
        >
          <rect
            class="drag-knob"
            x="30"
            y="104"
            width="290"
            height="40"
            rx="6"
            fill={cloth === 'len' ? '#fecaca' : '#f5f5f4'}
            stroke={cloth === 'len' ? '#b91c1c' : '#78716c'}
            stroke-width="2"
            stroke-dasharray={cloth === 'len' ? '6 3' : ''}
          />
          {#each { length: BASE } as _, i (i)}
            <text
              x={SITE(i)}
              y="120"
              text-anchor="middle"
              class="fill-red-400 text-[13px] font-bold">+</text
            >
            {#if i < clothElectrons}
              <circle cx={SITE(i)} cy="134" r="5" fill="#2563eb" />
              <text
                x={SITE(i)}
                y="137.5"
                text-anchor="middle"
                class="fill-white text-[10px] font-bold">−</text
              >
            {/if}
          {/each}
          {#each { length: Math.max(0, clothElectrons - BASE) } as _, i (i)}
            <circle cx={SITE(i) + 11.5} cy="116" r="5" fill="#1d4ed8" stroke="#fff" />
          {/each}
          <text x="30" y="162" class="fill-slate-700 text-[12px] font-semibold"
            >{CLOTHS[cloth]}</text
          >
        </g>
        {#key rubs}
          {#if rubs > 0 && rubs * PER_RUB <= MAX_CHARGE}
            <g class="hop" aria-hidden="true">
              <circle
                cx="180"
                cy={q < 0 ? 104 : 86}
                r="5"
                fill="#2563eb"
                class={q < 0 ? 'hop-up' : 'hop-down'}
              />
            </g>
          {/if}
        {/key}
      {/if}

      <!-- table with paper bits -->
      <line x1="10" y1="282" x2="350" y2="282" stroke="#94a3b8" stroke-width="3" />
      {#each { length: PAPER_BITS } as _, i (i)}
        {@const up = i < lifted}
        <rect
          x={70 + i * 40}
          y={up ? 218 : 272}
          width="14"
          height="9"
          fill="#fff"
          stroke="#64748b"
          transform="rotate({(i % 3) * 15 - 15} {77 + i * 40} {up ? 222 : 276})"
          style="transition: y 0.4s"
        />
      {/each}
      <text x="12" y="298" class="fill-slate-500 text-[11px]">Vụn giấy</text>
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Chấm xanh là electron (−), dấu + đỏ là điện tích dương của hạt nhân. Kéo mảnh vải qua lại trên
      thanh để cọ xát.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={rub}>Cọ xát</button>
    <button type="button" class={button.secondary} onclick={() => (near = !near)}>
      {near ? 'Nhấc thanh lên' : 'Đưa lại gần vụn giấy'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <dl class="grid gap-2 text-sm sm:grid-cols-2">
    <div class="rounded-xl bg-slate-50 px-3 py-2">
      <dt class="text-slate-600">{RODS[rod]}</dt>
      <dd class="font-semibold">
        {BASE} điện tích dương, {rodElectrons} electron: {SIGN_WORD[chargeSign(q)]}
      </dd>
    </div>
    <div class="rounded-xl bg-slate-50 px-3 py-2">
      <dt class="text-slate-600">{CLOTHS[cloth]}</dt>
      <dd class="font-semibold">
        {BASE} điện tích dương, {clothElectrons} electron: {SIGN_WORD[chargeSign(-q)]}
      </dd>
    </div>
  </dl>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>

<style>
  .hop-up {
    animation: hop-up 0.6s ease-out forwards;
  }
  .hop-down {
    animation: hop-down 0.6s ease-out forwards;
  }
  @keyframes hop-up {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-24px);
      opacity: 0;
    }
  }
  @keyframes hop-down {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(24px);
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hop {
      display: none;
    }
  }
</style>
