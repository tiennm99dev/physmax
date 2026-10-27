<script>
  /**
   * @typedef {'pin' | 'bo-pin' | 'cong-tac' | 'den' | 'dien-tro' | 'bien-tro' | 'cau-chi'
   *   | 'chuong' | 'ampe-ke' | 'von-ke' | 'diot' | 'led' | 'day' | 'diem-noi'} SymbolKind
   */

  /**
   * One circuit-diagram symbol as the KHTN 8 book draws it, placed on a wire
   * that runs from (x − len/2, y) to (x + len/2, y) before rotation, so the
   * symbol's leads meet the wires drawn up to its two ends. Use inside an
   * `<svg>`.
   *
   * - `kind`: which part (see `SymbolKind`).
   * - `x`, `y`: centre; `angle`: rotation in degrees (0 = wire left to right).
   * - `len`: length from lead end to lead end.
   * - `closed`: a switch drawn closed (default) or open.
   * - `flipped`: mirror a polar part end to end. Unflipped, every polar part
   *   suits a current running towards +x: the source's positive plate (long,
   *   thin) is at the +x end, a diode's arrow points to +x, and a meter's +
   *   terminal is at the −x end, where that current enters.
   * - `active`: a lamp, LED or bell drawn as working (lit or ringing).
   *
   * @type {{
   *   kind: SymbolKind;
   *   x?: number;
   *   y?: number;
   *   angle?: number;
   *   len?: number;
   *   closed?: boolean;
   *   flipped?: boolean;
   *   active?: boolean;
   * }}
   */
  let {
    kind,
    x = 0,
    y = 0,
    angle = 0,
    len = 64,
    closed = true,
    flipped = false,
    active = false,
  } = $props();

  const h = $derived(len / 2);
  const s = $derived(flipped ? -1 : 1);
  const ink = '#1e293b';

  /** Half-width of the body of each part, where its leads stop. */
  const body = $derived(
    {
      pin: 4,
      'bo-pin': 12,
      'cong-tac': 12,
      den: 12,
      'dien-tro': 16,
      'bien-tro': 16,
      'cau-chi': 16,
      chuong: 12,
      'ampe-ke': 13,
      'von-ke': 13,
      diot: 8,
      led: 8,
      day: h,
      'diem-noi': h,
    }[kind],
  );
  // Text sits at a point of the rotated symbol but stays upright.
  const upright = (/** @type {number} */ lx, /** @type {number} */ ly) =>
    `translate(${lx} ${ly}) rotate(${-angle})`;
</script>

<g transform="translate({x} {y}) rotate({angle})" stroke={ink} fill="none" stroke-width="2">
  {#if kind === 'day' || kind === 'diem-noi'}
    <line x1={-h} y1="0" x2={h} y2="0" />
    {#if kind === 'diem-noi'}
      <circle r="4" fill={ink} stroke="none" />
    {/if}
  {:else}
    <line x1={-h} y1="0" x2={-body} y2="0" />
    <line x1={body} y1="0" x2={h} y2="0" />
  {/if}

  {#if kind === 'pin'}
    <line x1={4 * s} y1="-15" x2={4 * s} y2="15" />
    <line x1={-4 * s} y1="-8" x2={-4 * s} y2="8" stroke-width="5" />
    <text
      transform={upright(12 * s, -12)}
      fill={ink}
      stroke="none"
      font-size="13"
      text-anchor="middle">+</text
    >
  {:else if kind === 'bo-pin'}
    {#each [-8, 8] as off (off)}
      <line x1={(off + 4) * s} y1="-15" x2={(off + 4) * s} y2="15" />
      <line x1={(off - 4) * s} y1="-8" x2={(off - 4) * s} y2="8" stroke-width="5" />
    {/each}
    <line x1="-4" y1="0" x2="4" y2="0" />
    <text
      transform={upright(20 * s, -12)}
      fill={ink}
      stroke="none"
      font-size="13"
      text-anchor="middle">+</text
    >
  {:else if kind === 'cong-tac'}
    <circle cx="-12" cy="0" r="3" fill="#fff" />
    <circle cx="12" cy="0" r="3" fill="#fff" />
    {#if closed}
      <line x1="-12" y1="0" x2="12" y2="0" />
    {:else}
      <line x1="-12" y1="0" x2="8" y2="-13" />
    {/if}
  {:else if kind === 'den'}
    <circle
      r="12"
      fill={active ? '#fde68a' : '#fff'}
      stroke={active ? '#b45309' : ink}
      class={active ? 'drop-shadow-[0_0_6px_#facc15]' : ''}
    />
    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
  {:else if kind === 'dien-tro' || kind === 'bien-tro' || kind === 'cau-chi'}
    <rect
      x="-16"
      y={kind === 'cau-chi' ? -6 : -8}
      width="32"
      height={kind === 'cau-chi' ? 12 : 16}
      fill="#fff"
    />
    {#if kind === 'cau-chi'}
      <line x1="-16" y1="0" x2="16" y2="0" />
    {/if}
    {#if kind === 'bien-tro'}
      <line x1="-16" y1="14" x2="14" y2="-12" />
      <polygon points="18,-16 8,-13 15,-6" fill={ink} stroke="none" />
    {/if}
  {:else if kind === 'chuong'}
    <path
      d="M -12 0 A 12 12 0 0 1 12 0 Z"
      fill={active ? '#fde68a' : '#fff'}
      class={active ? 'origin-center animate-pulse' : ''}
    />
    {#if active}
      <path d="M -17 -12 q -4 6 0 12 M 17 -12 q 4 6 0 12" stroke="#b45309" stroke-width="1.5" />
    {/if}
  {:else if kind === 'ampe-ke' || kind === 'von-ke'}
    <circle r="13" fill="#fff" />
    <text
      transform={upright(0, 0)}
      fill={ink}
      stroke="none"
      font-size="15"
      font-weight="700"
      text-anchor="middle"
      dominant-baseline="central">{kind === 'ampe-ke' ? 'A' : 'V'}</text
    >
    <text
      transform={upright(-20 * s, -9)}
      fill={ink}
      stroke="none"
      font-size="12"
      text-anchor="middle">+</text
    >
    <text
      transform={upright(20 * s, -9)}
      fill={ink}
      stroke="none"
      font-size="12"
      text-anchor="middle">−</text
    >
  {:else if kind === 'diot' || kind === 'led'}
    <polygon
      points="{-8 * s},-9 {-8 * s},9 {8 * s},0"
      fill={kind === 'led' && active ? '#fca5a5' : '#fff'}
    />
    <line x1={8 * s} y1="-9" x2={8 * s} y2="9" />
    {#if kind === 'led'}
      <g stroke={active ? '#dc2626' : ink} stroke-width="1.5">
        <line x1="-1" y1="-11" x2="5" y2="-19" />
        <line x1="5" y1="-11" x2="11" y2="-19" />
        <polyline points="1,-19 5,-19 5,-15" />
        <polyline points="7,-19 11,-19 11,-15" />
      </g>
    {/if}
  {/if}
</g>
