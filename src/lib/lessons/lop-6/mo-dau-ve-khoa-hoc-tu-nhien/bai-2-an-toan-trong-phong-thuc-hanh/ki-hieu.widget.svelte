<script>
  import CardSorter from '../_shared/card-sorter.svelte';
  import { shuffled } from '../_shared/sorter.js';

  const BINS = [
    { id: 'cam', label: 'Kí hiệu cảnh báo cấm' },
    { id: 'khu-vuc', label: 'Cảnh báo khu vực nguy hiểm' },
    { id: 'hoa-chat', label: 'Nguy hiểm do hoá chất gây ra' },
    { id: 'chi-dan', label: 'Kí hiệu chỉ dẫn thực hiện' },
  ];

  const WHY = {
    cam: 'Hình tròn, viền đỏ, nền trắng, có gạch chéo: điều bị cấm.',
    'khu-vuc': 'Hình tam giác đều, viền đen, nền vàng: khu vực nguy hiểm.',
    'hoa-chat': 'Hình vuông, viền đen, nền đỏ cam: nguy hiểm do hoá chất.',
    'chi-dan': 'Hình chữ nhật, nền xanh hoặc đỏ: chỉ dẫn việc cần làm, nơi cần đến.',
  };

  /** @typedef {'flame' | 'cup' | 'tap' | 'skull' | 'bolt' | 'heat' | 'drops' | 'exit' | 'extinguisher'} Glyph */
  /** @typedef {'cam' | 'khu-vuc' | 'hoa-chat' | 'chi-dan'} Kind */
  /** @type {Array<{ id: string, label: string, bin: Kind, glyph: Glyph, fill?: string }>} */
  const SIGNS = [
    { id: 'cam-lua', label: 'Cấm lửa', bin: 'cam', glyph: 'flame' },
    { id: 'cam-an-uong', label: 'Cấm ăn uống', bin: 'cam', glyph: 'cup' },
    { id: 'cam-nuoc-uong', label: 'Cấm dùng làm nước uống', bin: 'cam', glyph: 'tap' },
    { id: 'dien-cao-the', label: 'Điện cao thế', bin: 'khu-vuc', glyph: 'bolt' },
    { id: 'nhiet-do-cao', label: 'Nhiệt độ cao', bin: 'khu-vuc', glyph: 'heat' },
    { id: 'de-chay', label: 'Chất dễ cháy', bin: 'hoa-chat', glyph: 'flame' },
    { id: 'chat-doc', label: 'Chất độc', bin: 'hoa-chat', glyph: 'skull' },
    { id: 'an-mon', label: 'Chất ăn mòn', bin: 'hoa-chat', glyph: 'drops' },
    { id: 'thoat-hiem', label: 'Lối thoát hiểm', bin: 'chi-dan', glyph: 'exit', fill: '#15803d' },
    {
      id: 'binh-chua-chay',
      label: 'Nơi để bình chữa cháy',
      bin: 'chi-dan',
      glyph: 'extinguisher',
      fill: '#dc2626',
    },
  ];

  const glyphOf = new Map(SIGNS.map((s) => [s.id, s.glyph]));
  const fillOf = new Map(SIGNS.map((s) => [s.id, s.fill ?? '#15803d']));
  const CARDS = shuffled(
    SIGNS.map(({ id, label, bin }) => ({ id, label, bin, why: WHY[bin] })),
    3,
  );
</script>

{#snippet glyph(/** @type {Glyph | undefined} */ g, /** @type {string} */ color)}
  {#if g === 'flame'}
    <path
      d="M20 8c4 5 8 9 8 15a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1 5 3 5-1-4-1-8 1-12z"
      fill={color}
    />
  {:else if g === 'cup'}
    <path d="M12 12h14l-2 18h-10z" fill={color} />
    <path d="M26 15h3a3 3 0 0 1 0 7h-4" fill="none" stroke={color} stroke-width="2" />
  {:else if g === 'tap'}
    <path d="M9 13h16v4h-5v4h-6v-4h-5z" fill={color} />
    <path d="M17 24c2 3 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3 3-6z" fill={color} />
  {:else if g === 'skull'}
    <circle cx="20" cy="17" r="8" fill={color} />
    <rect x="15" y="22" width="10" height="6" rx="1" fill={color} />
    <circle cx="17" cy="17" r="2" fill="#fff" />
    <circle cx="23" cy="17" r="2" fill="#fff" />
  {:else if g === 'bolt'}
    <path d="M22 7l-9 15h6l-3 11 10-16h-6z" fill={color} />
  {:else if g === 'drops'}
    <path d="M13 9c2 3 3 5 3 6a3 3 0 0 1-6 0c0-1 1-3 3-6z" fill={color} />
    <path d="M25 9c2 3 3 5 3 6a3 3 0 0 1-6 0c0-1 1-3 3-6z" fill={color} />
    <rect x="9" y="25" width="22" height="4" fill={color} />
  {:else if g === 'heat'}
    <path
      d="M13 30c-3-4 3-6 0-10s3-6 0-10M20 30c-3-4 3-6 0-10s3-6 0-10M27 30c-3-4 3-6 0-10s3-6 0-10"
      fill="none"
      stroke={color}
      stroke-width="2.5"
    />
  {:else if g === 'exit'}
    <rect x="26" y="9" width="8" height="22" fill="none" stroke={color} stroke-width="2" />
    <circle cx="15" cy="11" r="3" fill={color} />
    <path
      d="M15 15l-4 7M15 15l2 8-4 7M17 23l5 6M13 18l-5 2M15 17l6 2"
      fill="none"
      stroke={color}
      stroke-width="2.5"
      stroke-linecap="round"
    />
  {:else if g === 'extinguisher'}
    <rect x="15" y="14" width="10" height="18" rx="3" fill={color} />
    <path d="M18 14v-4h4v4M22 10h6l2 4" fill="none" stroke={color} stroke-width="2" />
  {/if}
{/snippet}

{#snippet face(/** @type {import('../_shared/sorter.js').SortCard} */ c)}
  <span class="flex items-center gap-2">
    <svg viewBox="0 0 40 40" class="size-10 shrink-0" aria-hidden="true">
      {#if c.bin === 'cam'}
        <circle cx="20" cy="20" r="17" fill="#fff" stroke="#dc2626" stroke-width="4" />
        {@render glyph(glyphOf.get(c.id), '#111827')}
        <path d="M8 8l24 24" stroke="#dc2626" stroke-width="4" />
      {:else if c.bin === 'khu-vuc'}
        <path d="M20 3l18 33h-36z" fill="#facc15" stroke="#111827" stroke-width="2.5" />
        <g transform="translate(8 11) scale(0.6)">
          {@render glyph(glyphOf.get(c.id), '#111827')}
        </g>
      {:else if c.bin === 'hoa-chat'}
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          fill="#f97316"
          stroke="#111827"
          stroke-width="2.5"
        />
        {@render glyph(glyphOf.get(c.id), '#111827')}
      {:else}
        <rect x="1" y="6" width="38" height="28" rx="2" fill={fillOf.get(c.id)} />
        <g transform="translate(4 4) scale(0.8)">
          {@render glyph(glyphOf.get(c.id), '#fff')}
        </g>
      {/if}
    </svg>
    <span>{c.label}</span>
  </span>
{/snippet}

<CardSorter cards={CARDS} bins={BINS} {face} label="Xếp các kí hiệu cảnh báo theo loại" />
