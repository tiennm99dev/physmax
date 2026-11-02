<script>
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';

  /**
   * One force arrow inside an SVG, tail to tip in pixels, with its name beside
   * the tip. An arrow shorter than a pixel is not drawn.
   * @type {{
   *   x1: number;
   *   y1: number;
   *   x2: number;
   *   y2: number;
   *   color?: string;
   *   label?: string;
   *   dashed?: boolean;
   *   labelDx?: number;
   *   labelDy?: number;
   * }}
   */
  let {
    x1,
    y1,
    x2,
    y2,
    color = '#4f46e5',
    label = '',
    dashed = false,
    labelDx,
    labelDy,
  } = $props();

  const SIZE = 10;
  const end = $derived(shaftEnd(x1, y1, x2, y2, SIZE));
  const dx = $derived(labelDx ?? (x2 < x1 ? -24 : 6));
  const dy = $derived(labelDy ?? (y2 > y1 ? 14 : -4));
</script>

{#if Math.hypot(x2 - x1, y2 - y1) > 1}
  <line
    {x1}
    {y1}
    x2={end.x}
    y2={end.y}
    stroke={color}
    stroke-width="3"
    stroke-dasharray={dashed ? '6 4' : undefined}
  />
  <polygon points={arrowHead(x1, y1, x2, y2, SIZE)} fill={color} />
  {#if label}
    <text x={x2 + dx} y={y2 + dy} font-size="13" font-weight="700" fill={color}>{label}</text>
  {/if}
{/if}
