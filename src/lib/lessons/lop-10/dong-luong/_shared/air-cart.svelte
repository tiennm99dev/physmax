<script>
  /**
   * One cart on an air track inside an SVG: `x` is its centre in pixels, `y` the
   * top of the rail it rides on. `shutter` adds the plate that crosses a photogate.
   * @type {{
   *   x: number;
   *   y: number;
   *   width: number;
   *   name: string;
   *   color: string;
   *   shutter?: boolean;
   * }}
   */
  let { x, y, width, name, color, shutter = false } = $props();

  const HEIGHT = 18;
</script>

{#if shutter}
  <rect x={x - 7} y={y - HEIGHT - 16} width="14" height="16" fill="#334155" />
{/if}
<rect x={x - width / 2} y={y - HEIGHT - 2} {width} height={HEIGHT} rx="3" fill={color} />
<text
  {x}
  y={y - 7}
  font-size="12"
  font-weight="700"
  fill="#ffffff"
  text-anchor="middle"
  dominant-baseline="auto">{name}</text
>
