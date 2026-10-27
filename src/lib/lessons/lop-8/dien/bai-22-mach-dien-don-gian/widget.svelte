<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead } from '#lib/domain/arrow.js';
  import CircuitSymbol from '../_shared/circuit-symbol.svelte';
  import { PART_NAMES, evaluateLoop, workingParts } from './engine.js';

  /** @typedef {import('./engine.js').Part} Part */
  /** @typedef {import('./engine.js').PartKind} PartKind */
  /** @typedef {import('./engine.js').Slot} Slot */

  const L = 40;
  const R = 320;
  const T = 50;
  const B = 200;
  const SLOT_LEN = 72;
  // Slots clockwise: two on the top wire, one on the right, one at the bottom.
  const PLACES = [
    { x: 110, y: T, angle: 0 },
    { x: 250, y: T, angle: 0 },
    { x: R, y: 125, angle: 90 },
    { x: 180, y: B, angle: 180 },
  ];
  const PALETTE = /** @type {PartKind[]} */ ([
    'pin',
    'cong-tac',
    'den',
    'chuong',
    'led',
    'dien-tro',
    'day',
  ]);

  /** @type {Slot[]} */
  let slots = $state([{ kind: 'pin' }, { kind: 'cong-tac', closed: false }, { kind: 'den' }, null]);
  let selected = $state(3);

  const result = $derived(evaluateLoop(slots));
  const working = $derived(new Set(workingParts(slots)));
  const sel = $derived(slots[selected]);

  /** @param {PartKind | null} kind */
  function place(kind) {
    slots[selected] =
      kind === null
        ? null
        : kind === 'cong-tac'
          ? { kind, closed: false }
          : { kind, flipped: false };
  }

  function flip() {
    const part = slots[selected];
    if (part) slots[selected] = { ...part, flipped: !part.flipped };
  }

  function toggleSwitch() {
    const part = slots[selected];
    if (part?.kind === 'cong-tac') slots[selected] = { ...part, closed: !part.closed };
  }

  /** @param {KeyboardEvent} e @param {number} i */
  function key(e, i) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selected = i;
    }
  }

  /** @param {Slot} s */
  function describe(s) {
    if (!s) return 'để trống';
    if (s.kind === 'cong-tac') return `công tắc ${s.closed ? 'đóng' : 'mở'}`;
    if (s.kind === 'pin' || s.kind === 'led')
      return `${PART_NAMES[s.kind].toLowerCase()}, ${s.flipped ? 'quay ngược' : 'quay xuôi'}`;
    return PART_NAMES[s.kind].toLowerCase();
  }

  // Arrows for the conventional current, on stretches of plain wire.
  const ARROWS = [
    { x: L, y: 125, dx: 0, dy: -1 },
    { x: 180, y: T, dx: 1, dy: 0 },
    { x: R, y: 182, dx: 0, dy: 1 },
    { x: 90, y: B, dx: -1, dy: 0 },
  ];
  const arrows = $derived(
    result.flowing
      ? ARROWS.map((a) => {
          const k = result.clockwise ? 1 : -1;
          return arrowHead(
            a.x - a.dx * k * 10,
            a.y - a.dy * k * 10,
            a.x + a.dx * k * 6,
            a.y + a.dy * k * 6,
            12,
          );
        })
      : [],
  );

  const tones = /** @type {const} */ ({ ok: 'ok', warn: 'warn', info: 'info' });

  const feedback = $derived.by(() => {
    switch (result.reason) {
      case 'khong-nguon':
        return { tone: tones.warn, text: 'Mạch chưa có nguồn điện (pin) nên không có dòng điện.' };
      case 'pin-nguoc':
        return {
          tone: tones.warn,
          text: 'Hai pin quay ngược chiều nhau, triệt tiêu nhau: không có dòng điện. Hãy đảo chiều một pin.',
        };
      case 'ho':
        return {
          tone: tones.info,
          text: 'Còn một chỗ để trống nên mạch hở. Chọn chỗ trống rồi chọn bộ phận để lắp vào (dây nối cũng được).',
        };
      case 'cong-tac-mo':
        return {
          tone: tones.info,
          text: 'Công tắc đang mở: mạch hở, không có dòng điện. Chọn công tắc rồi bấm "Đóng công tắc".',
        };
      case 'doan-mach':
        return {
          tone: tones.warn,
          text: 'Nguy hiểm: hai cực của pin được nối thẳng với nhau bằng dây dẫn (đoản mạch), không qua bộ phận dùng điện nào. Dòng điện rất lớn làm pin nóng, nhanh hỏng.',
        };
      case 'led-nguoc':
        return {
          tone: tones.warn,
          text: 'Đèn LED bị lắp ngược chiều dòng điện: LED chỉ cho dòng điện đi qua theo một chiều nên mạch không có dòng điện. Hãy đảo chiều LED hoặc đảo chiều pin.',
        };
      default:
        return {
          tone: tones.ok,
          text: `Mạch kín: có dòng điện. Chiều dòng điện (mũi tên đỏ) đi từ cực dương của pin, qua dây nối và các bộ phận, về cực âm, tức là ${result.clockwise ? 'cùng' : 'ngược'} chiều kim đồng hồ trên sơ đồ.`,
        };
    }
  });
</script>

{#snippet picture(/** @type {Part} */ part, /** @type {boolean} */ active)}
  {#if part.kind === 'pin'}
    {@const s = part.flipped ? -1 : 1}
    <rect x="-24" y="-11" width="48" height="22" rx="4" fill="#1e293b" />
    <rect x={s > 0 ? 24 : -29} y="-5" width="5" height="10" fill="#94a3b8" />
    <rect x={s > 0 ? 10 : -24} y="-11" width="14" height="22" fill="#dc2626" />
  {:else if part.kind === 'cong-tac'}
    <rect x="-24" y="-8" width="48" height="16" rx="3" fill="#e2e8f0" stroke="#64748b" />
    <circle cx="-16" cy="0" r="3.5" fill="#475569" />
    <circle cx="16" cy="0" r="3.5" fill="#475569" />
    <line
      x1="-16"
      y1="0"
      x2={part.closed ? 16 : 6}
      y2={part.closed ? 0 : -16}
      stroke="#b45309"
      stroke-width="4"
      stroke-linecap="round"
    />
  {:else if part.kind === 'den'}
    {#if active}
      <circle cx="0" cy="-16" r="22" fill="#fde68a" opacity="0.6" />
    {/if}
    <circle
      cx="0"
      cy="-16"
      r="13"
      fill={active ? '#facc15' : '#f8fafc'}
      stroke="#64748b"
      stroke-width="2"
    />
    <rect x="-8" y="-5" width="16" height="10" fill="#94a3b8" />
  {:else if part.kind === 'chuong'}
    <path
      d="M -16 4 A 16 16 0 0 1 16 4 Z"
      fill={active ? '#facc15' : '#cbd5e1'}
      stroke="#475569"
      stroke-width="2"
    />
    <circle cx="0" cy="7" r="3" fill="#475569" />
    {#if active}
      <path
        d="M -22 -14 q -5 8 0 16 M 22 -14 q 5 8 0 16"
        fill="none"
        stroke="#b45309"
        stroke-width="2"
      />
    {/if}
  {:else if part.kind === 'led'}
    {@const s = part.flipped ? -1 : 1}
    {#if active}
      <circle cx="0" cy="-14" r="16" fill="#fecaca" opacity="0.8" />
    {/if}
    <path
      d="M -8 -4 L -8 -16 A 8 8 0 0 1 8 -16 L 8 -4 Z"
      fill={active ? '#ef4444' : '#fca5a5'}
      stroke="#991b1b"
    />
    <line x1={-4 * s} y1="-4" x2={-22 * s} y2="0" stroke="#64748b" stroke-width="2" />
    <line x1={4 * s} y1="-4" x2={16 * s} y2="0" stroke="#64748b" stroke-width="2" />
  {:else if part.kind === 'dien-tro'}
    <rect x="-20" y="-7" width="40" height="14" rx="6" fill="#fde7c4" stroke="#a16207" />
    {#each [-10, -3, 4] as bx (bx)}
      <rect
        x={bx}
        y="-7"
        width="3"
        height="14"
        fill={bx === -10 ? '#7c2d12' : bx === -3 ? '#111827' : '#dc2626'}
      />
    {/each}
  {/if}
{/snippet}

<div class="space-y-4">
  <div class="grid gap-3 lg:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <figcaption class="px-2 text-sm font-semibold text-slate-700">Bàn lắp mạch</figcaption>
      <svg viewBox="0 0 360 240" class="mx-auto block w-full max-w-md select-none">
        <rect
          x={L}
          y={T}
          width={R - L}
          height={B - T}
          fill="none"
          stroke="#dc2626"
          stroke-width="4"
        />
        {#each PLACES as p, i (i)}
          {@const s = slots[i]}
          <g
            role="button"
            tabindex="0"
            aria-label="Vị trí {i + 1}: {describe(s)}{selected === i ? ', đang chọn' : ''}"
            aria-pressed={selected === i}
            class="drag-handle cursor-pointer outline-none"
            onclick={() => (selected = i)}
            onkeydown={(e) => key(e, i)}
          >
            <g transform="translate({p.x} {p.y}) rotate({p.angle})">
              <rect
                class="drag-knob"
                x={-SLOT_LEN / 2}
                y="-32"
                width={SLOT_LEN}
                height="48"
                rx="8"
                fill={selected === i ? '#e0e7ff' : '#fff'}
                stroke={selected === i ? '#4f46e5' : '#cbd5e1'}
                stroke-width="2"
                stroke-dasharray={s ? '' : '5 4'}
              />
              {#if s && s.kind !== 'day'}
                {@render picture(s, working.has(i))}
              {:else if s}
                <line
                  x1={-SLOT_LEN / 2}
                  y1="0"
                  x2={SLOT_LEN / 2}
                  y2="0"
                  stroke="#dc2626"
                  stroke-width="4"
                />
              {/if}
            </g>
          </g>
          <text
            x={p.angle === 90 ? p.x - 46 : p.x}
            y={p.angle === 0 ? p.y + 32 : p.angle === 180 ? p.y + 40 : p.y + 4}
            text-anchor="middle"
            class="pointer-events-none fill-slate-600 text-[11px]"
            >{s ? PART_NAMES[s.kind] : `Trống ${i + 1}`}</text
          >
        {/each}
      </svg>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <figcaption class="px-2 text-sm font-semibold text-slate-700">Sơ đồ mạch điện</figcaption>
      <svg
        viewBox="0 0 360 240"
        class="mx-auto block w-full max-w-md select-none"
        role="img"
        aria-label="Sơ đồ mạch điện: {slots
          .map((s, i) => `vị trí ${i + 1} ${describe(s)}`)
          .join('; ')}. {result.flowing
          ? `Có dòng điện, chạy ${result.clockwise ? 'cùng' : 'ngược'} chiều kim đồng hồ.`
          : 'Không có dòng điện.'}"
      >
        <rect
          x={L}
          y={T}
          width={R - L}
          height={B - T}
          fill="none"
          stroke="#1e293b"
          stroke-width="2"
        />
        {#each PLACES as p, i (i)}
          {@const s = slots[i]}
          <g transform="translate({p.x} {p.y}) rotate({p.angle})">
            <rect x={-SLOT_LEN / 2 + 1} y="-24" width={SLOT_LEN - 2} height="48" fill="#fff" />
            {#if !s}
              <rect
                x={-SLOT_LEN / 2 + 6}
                y="-12"
                width={SLOT_LEN - 12}
                height="24"
                fill="none"
                stroke="#94a3b8"
                stroke-dasharray="4 3"
              />
            {/if}
          </g>
          {#if s}
            <CircuitSymbol
              kind={s.kind}
              x={p.x}
              y={p.y}
              angle={p.angle}
              len={SLOT_LEN}
              closed={s.closed ?? true}
              flipped={s.flipped ?? false}
              active={working.has(i)}
            />
          {/if}
        {/each}
        {#each arrows as pts, i (i)}
          <polygon points={pts} fill="#dc2626" />
        {/each}
      </svg>
    </figure>
  </div>

  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700">
      Vị trí {selected + 1} ({describe(sel)}): chọn bộ phận để lắp vào
    </p>
    <div class="flex flex-wrap gap-2">
      {#each PALETTE as kind (kind)}
        <button
          type="button"
          class="{sel?.kind === kind ? button.primary : button.quiet} text-sm"
          aria-pressed={sel?.kind === kind}
          onclick={() => place(kind)}
        >
          {PART_NAMES[kind]}
        </button>
      {/each}
      <button
        type="button"
        class="{sel === null ? button.primary : button.quiet} text-sm"
        onclick={() => place(null)}
      >
        Để trống
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      {#if sel?.kind === 'cong-tac'}
        <button type="button" class={button.secondary} onclick={toggleSwitch}>
          {sel.closed ? 'Mở công tắc' : 'Đóng công tắc'}
        </button>
      {/if}
      {#if sel?.kind === 'pin' || sel?.kind === 'led'}
        <button type="button" class={button.secondary} onclick={flip}>
          Đảo chiều {PART_NAMES[sel.kind].toLowerCase()}
        </button>
      {/if}
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
