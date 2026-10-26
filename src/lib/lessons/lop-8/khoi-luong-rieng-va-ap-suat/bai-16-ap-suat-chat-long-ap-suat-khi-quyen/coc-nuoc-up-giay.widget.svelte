<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';
  import { cupOutcome } from './engine.js';

  /** @typedef {import('./engine.js').CupPosition} CupPosition */

  const POSITIONS = [
    { value: 'ngua', label: 'Để ngửa' },
    { value: 'nghieng', label: 'Xoay ngang' },
    { value: 'up', label: 'Úp ngược' },
  ];
  /** @type {Record<string, number>} */
  const ANGLE = { ngua: 0, nghieng: 90, up: 180 };

  /** @type {CupPosition} */
  let position = $state('ngua');
  let paper = $state('co');
  let air = $state('co');

  const result = $derived(cupOutcome(position, paper === 'co', air === 'co'));
  const angle = $derived(ANGLE[position]);
  const pressed = $derived(result.stays && position !== 'ngua');

  // Cup around its centre (CX, CY): mouth at the top when upright.
  const CX = 150;
  const CY = 115;
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SegmentedControl
      label="Tờ giấy đậy miệng cốc"
      options={[
        { value: 'co', label: 'Có' },
        { value: 'khong', label: 'Không' },
      ]}
      bind:value={paper}
    />
    <SegmentedControl
      label="Không khí quanh cốc"
      options={[
        { value: 'co', label: 'Bình thường' },
        { value: 'khong', label: 'Đã hút hết' },
      ]}
      bind:value={air}
    />
    <SegmentedControl label="Xoay cốc nước đầy" options={POSITIONS} bind:value={position} />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 300 240"
      class="mx-auto block w-full max-w-sm"
      role="img"
      aria-label="Cốc nước {POSITIONS.find(
        (p) => p.value === position,
      )?.label.toLowerCase()}, {paper === 'co' ? 'có tờ giấy đậy' : 'không có giấy đậy'}, {air ===
      'co'
        ? 'trong không khí'
        : 'trong chuông đã hút hết không khí'}: {result.stays
        ? 'nước vẫn ở trong cốc'
        : 'nước đổ ra ngoài'}."
    >
      {#if air === 'khong'}
        <path
          d="M30 232 V70 Q30 12 150 12 Q270 12 270 70 V232"
          fill="#f1f5f9"
          stroke="#94a3b8"
          stroke-width="2"
        />
        <text x="150" y="28" text-anchor="middle" class="fill-slate-500 text-[10px]"
          >chuông thủy tinh đã hút hết không khí</text
        >
      {/if}
      <rect x="20" y="232" width="260" height="6" fill="#cbd5e1" />
      {#if !result.stays}
        <ellipse cx="150" cy="228" rx="80" ry="6" fill="#7dd3fc" opacity="0.8" />
        {#if paper === 'co'}
          <rect x="170" y="222" width="46" height="3" fill="#f8fafc" stroke="#64748b" />
        {/if}
      {/if}
      <g transform="rotate({angle} {CX} {CY})">
        {#if result.stays}
          <path
            d="M{CX - 34} {CY - 44} L{CX - 28} {CY + 44} H{CX + 28} L{CX + 34} {CY - 44} Z"
            fill="#7dd3fc"
          />
        {/if}
        <path
          d="M{CX - 36} {CY - 46} L{CX - 30} {CY + 46} H{CX + 30} L{CX + 36} {CY - 46}"
          fill="none"
          stroke="#334155"
          stroke-width="3"
          stroke-linejoin="round"
        />
        {#if paper === 'co' && result.stays}
          <rect x={CX - 42} y={CY - 49} width="84" height="3" fill="#f8fafc" stroke="#64748b" />
        {/if}
        {#if pressed}
          {#each [-24, 0, 24] as dx (dx)}
            <line
              x1={CX + dx}
              y1={CY - 76}
              x2={CX + dx}
              y2={CY - 56}
              stroke="#dc2626"
              stroke-width="2.5"
              marker-end="url(#khi-quyen-mui-ten)"
            />
          {/each}
          <line
            x1={CX - 66}
            y1={CY}
            x2={CX - 42}
            y2={CY}
            stroke="#dc2626"
            stroke-width="2.5"
            marker-end="url(#khi-quyen-mui-ten)"
          />
          <line
            x1={CX + 66}
            y1={CY}
            x2={CX + 42}
            y2={CY}
            stroke="#dc2626"
            stroke-width="2.5"
            marker-end="url(#khi-quyen-mui-ten)"
          />
          <line
            x1={CX}
            y1={CY + 76}
            x2={CX}
            y2={CY + 54}
            stroke="#dc2626"
            stroke-width="2.5"
            marker-end="url(#khi-quyen-mui-ten)"
          />
        {/if}
      </g>
      <defs>
        <marker
          id="khi-quyen-mui-ten"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Mũi tên đỏ: không khí bên ngoài ép lên tờ giấy và thành cốc theo mọi phương.
    </figcaption>
  </figure>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {result.stays
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {result.stays ? 'Nước vẫn ở trong cốc.' : 'Nước đổ ra ngoài!'}
    {result.reason}
  </p>
</div>
