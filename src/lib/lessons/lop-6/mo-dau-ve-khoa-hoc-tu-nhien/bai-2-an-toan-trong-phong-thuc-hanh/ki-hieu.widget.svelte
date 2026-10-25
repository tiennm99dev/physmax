<script>
  import CardSorter from '../_shared/card-sorter.svelte';
  import { shuffled } from '../_shared/sorter.js';

  const BINS = [
    { id: 'cam', label: 'Biển cấm' },
    { id: 'nguy-hiem', label: 'Biển cảnh báo nguy hiểm' },
    { id: 'bat-buoc', label: 'Biển bắt buộc thực hiện' },
  ];

  const WHY = {
    cam: 'Hình tròn, viền đỏ, nền trắng, có gạch chéo: điều bị cấm.',
    'nguy-hiem': 'Hình tam giác đều, viền đen, nền vàng: cảnh báo nguy hiểm.',
    'bat-buoc': 'Hình tròn, nền xanh, hình vẽ trắng: việc bắt buộc phải làm.',
  };

  /** @typedef {'flame' | 'cup' | 'tap' | 'skull' | 'bolt' | 'drops' | 'goggles' | 'glove'} Glyph */
  /** @type {Array<{ id: string, label: string, bin: 'cam' | 'nguy-hiem' | 'bat-buoc', glyph: Glyph }>} */
  const SIGNS = [
    { id: 'cam-lua', label: 'Cấm lửa', bin: 'cam', glyph: 'flame' },
    { id: 'cam-an-uong', label: 'Cấm ăn uống', bin: 'cam', glyph: 'cup' },
    { id: 'cam-nuoc-uong', label: 'Cấm dùng làm nước uống', bin: 'cam', glyph: 'tap' },
    { id: 'de-chay', label: 'Chất dễ cháy', bin: 'nguy-hiem', glyph: 'flame' },
    { id: 'chat-doc', label: 'Chất độc', bin: 'nguy-hiem', glyph: 'skull' },
    { id: 'dien-cao-the', label: 'Điện cao thế', bin: 'nguy-hiem', glyph: 'bolt' },
    { id: 'an-mon', label: 'Chất ăn mòn', bin: 'nguy-hiem', glyph: 'drops' },
    { id: 'deo-kinh', label: 'Phải đeo kính bảo vệ mắt', bin: 'bat-buoc', glyph: 'goggles' },
    { id: 'deo-gang', label: 'Phải đeo găng tay', bin: 'bat-buoc', glyph: 'glove' },
  ];

  const glyphOf = new Map(SIGNS.map((s) => [s.id, s.glyph]));
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
    <circle cx="17" cy="17" r="2" fill="#facc15" />
    <circle cx="23" cy="17" r="2" fill="#facc15" />
  {:else if g === 'bolt'}
    <path d="M22 7l-9 15h6l-3 11 10-16h-6z" fill={color} />
  {:else if g === 'drops'}
    <path d="M13 9c2 3 3 5 3 6a3 3 0 0 1-6 0c0-1 1-3 3-6z" fill={color} />
    <path d="M25 9c2 3 3 5 3 6a3 3 0 0 1-6 0c0-1 1-3 3-6z" fill={color} />
    <rect x="9" y="25" width="22" height="4" fill={color} />
  {:else if g === 'goggles'}
    <circle cx="14" cy="20" r="5" fill="none" stroke={color} stroke-width="3" />
    <circle cx="26" cy="20" r="5" fill="none" stroke={color} stroke-width="3" />
    <path d="M19 20h2M6 19h3M31 19h3" stroke={color} stroke-width="3" />
  {:else if g === 'glove'}
    <path
      d="M13 30v-12h2v-7h2v7h1v-9h2v9h1v-8h2v8h1v-6h2v12c0 4-2 6-5 6h-3c-3 0-5-2-5-6z"
      fill={color}
    />
  {/if}
{/snippet}

{#snippet face(/** @type {import('../_shared/sorter.js').SortCard} */ c)}
  <span class="flex items-center gap-2">
    <svg viewBox="0 0 40 40" class="size-10 shrink-0" aria-hidden="true">
      {#if c.bin === 'cam'}
        <circle cx="20" cy="20" r="17" fill="#fff" stroke="#dc2626" stroke-width="4" />
        {@render glyph(glyphOf.get(c.id), '#111827')}
        <path d="M8 8l24 24" stroke="#dc2626" stroke-width="4" />
      {:else if c.bin === 'nguy-hiem'}
        <path d="M20 3l18 33h-36z" fill="#facc15" stroke="#111827" stroke-width="2.5" />
        <g transform="translate(8 11) scale(0.6)">
          {@render glyph(glyphOf.get(c.id), '#111827')}
        </g>
      {:else}
        <circle cx="20" cy="20" r="18" fill="#1d4ed8" />
        {@render glyph(glyphOf.get(c.id), '#fff')}
      {/if}
    </svg>
    <span>{c.label}</span>
  </span>
{/snippet}

<CardSorter cards={CARDS} bins={BINS} {face} label="Xếp các kí hiệu cảnh báo theo loại biển" />
