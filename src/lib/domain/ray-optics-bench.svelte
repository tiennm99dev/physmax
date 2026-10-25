<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, linear, snap } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { arrowHead } from './arrow.js';
  import { describeImage, principalRays, thinLensImage } from './optics.js';

  /**
   * An optical bench with a thin lens at O, its foci F and F′, an object
   * arrow AB and the three principal rays that build the image A′B′. Real
   * images are drawn solid, virtual ones and the backward extensions of rays
   * dashed. With `interactive`, drag the tip B of the object or use the arrow
   * keys (←/→ move it along the axis, ↑/↓ change its height; Shift for five
   * steps).
   *
   * - `focal` (bindable): focal length in cm, positive for a converging lens
   *   (thấu kính hội tụ), negative for a diverging one (thấu kính phân kì).
   * - `distance` (bindable): object distance d in cm. `objectHeight`
   *   (bindable): object height h in cm.
   * - `range`: half the bench length in cm; the lens sits in the middle.
   * - `step`: snap step in cm.
   *
   * @type {{
   *   focal?: number;
   *   distance?: number;
   *   objectHeight?: number;
   *   interactive?: boolean;
   *   range?: number;
   *   step?: number;
   *   showRays?: boolean;
   *   label?: string;
   *   width?: number;
   *   onchange?: (state: { distance: number, objectHeight: number }) => void;
   * }}
   */
  let {
    focal = $bindable(10),
    distance = $bindable(25),
    objectHeight = $bindable(4),
    interactive = false,
    range = 50,
    step = 1,
    showRays = true,
    label = 'Băng quang học',
    width = 520,
    onchange,
  } = $props();

  const height = $derived(Math.round(width * 0.5));
  const yRange = $derived((range * height) / width);
  const sx = $derived(linear(-range, range, 0, width));
  const sy = $derived(linear(-yRange, yRange, height, 0));
  const clipId = $props.id();

  const image = $derived(thinLensImage(focal, distance));
  const rays = $derived(showRays ? principalRays(focal, distance, objectHeight, range) : []);
  const imageHeight = $derived(objectHeight * image.magnification);
  const converging = $derived(focal > 0);
  const ox = $derived(sx.map(-distance));
  const fmt = (/** @type {number} */ v) => formatNumber(v, 1);

  /** @param {Array<{ x: number, y: number }>} pts */
  const path = (pts) =>
    pts.map((p) => `${sx.map(p.x).toFixed(1)},${sy.map(p.y).toFixed(1)}`).join(' ');
  const rayColors = ['#D7263D', '#1B998B', '#F46036'];

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const maxH = $derived(Math.floor(yRange * 0.8));

  /** @param {number} d @param {number} h */
  function setObject(d, h) {
    const nd = clamp(snap(d, step), step, range - step);
    let nh = clamp(snap(h, step), -maxH, maxH);
    if (nh === 0) nh = objectHeight > 0 ? step : -step;
    if (nd === distance && nh === objectHeight) return;
    distance = nd;
    objectHeight = nh;
    onchange?.({ distance, objectHeight });
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setObject(-sx.invert(scratch.x), sy.invert(scratch.y)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const n = (big ? 5 : 1) * step;
      setObject(distance - dx * n, objectHeight - dy * n);
    },
  });

  // Pixel direction from a lens end back toward its middle: down at the top, up at the bottom.
  const TOP_END = 1;
  const BOTTOM_END = -1;
  const lensHead = (/** @type {number} */ y, /** @type {1 | -1} */ dir) => {
    const x = sx.map(0);
    const tip = sy.map(y);
    // A converging lens has heads pointing outward, a diverging one inward.
    const out = converging ? dir : -dir;
    return arrowHead(x, tip + out * 12, x, tip, 10);
  };

  const summary = $derived(
    image.atInfinity
      ? describeImage(image)
      : `d = ${fmt(distance)} cm, d′ = ${fmt(image.distance)} cm, k = ${formatNumber(image.magnification, 2)}. ${describeImage(image)}.`,
  );
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-2xl select-none rounded-xl border border-slate-200 bg-white"
    style:aspect-ratio="{width} / {height}"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{label}: thấu kính {converging ? 'hội tụ' : 'phân kì'} tiêu cự {fmt(
      Math.abs(focal),
    )} cm. {summary}"
  >
    <defs>
      <clipPath id={clipId}><rect x="0" y="0" {width} {height} /></clipPath>
    </defs>
    <line x1="0" y1={sy.map(0)} x2={width} y2={sy.map(0)} stroke="#334155" stroke-width="1.5" />

    <g clip-path="url(#{clipId})">
      {#each rays as r, i (i)}
        <polyline points={path(r.incident)} fill="none" stroke={rayColors[i]} stroke-width="1.8" />
        <polyline points={path(r.emergent)} fill="none" stroke={rayColors[i]} stroke-width="1.8" />
        {#if r.virtual.length}
          <polyline
            points={path(r.virtual)}
            fill="none"
            stroke={rayColors[i]}
            stroke-width="1.2"
            stroke-dasharray="5 4"
          />
        {/if}
      {/each}

      {#if !image.atInfinity}
        {@const ix = sx.map(image.distance)}
        <line
          x1={ix}
          y1={sy.map(0)}
          x2={ix}
          y2={sy.map(imageHeight)}
          stroke="#7c3aed"
          stroke-width="3"
          stroke-dasharray={image.real ? null : '6 4'}
        />
        <polygon points={arrowHead(ix, sy.map(0), ix, sy.map(imageHeight), 10)} fill="#7c3aed" />
        <text
          x={ix + 6}
          y={sy.map(imageHeight) + (imageHeight > 0 ? -6 : 16)}
          font-size="13"
          fill="#7c3aed">B′</text
        >
      {/if}
    </g>

    <!-- lens -->
    <line
      x1={sx.map(0)}
      y1={sy.map(yRange * 0.85)}
      x2={sx.map(0)}
      y2={sy.map(-yRange * 0.85)}
      stroke="#2E86AB"
      stroke-width="3"
    />
    <polygon points={lensHead(yRange * 0.85, TOP_END)} fill="#2E86AB" />
    <polygon points={lensHead(-yRange * 0.85, BOTTOM_END)} fill="#2E86AB" />
    <text x={sx.map(0) + 6} y={sy.map(0) + 16} font-size="13" fill="#334155">O</text>
    {#each [-1, 1] as side (side)}
      {@const fx = sx.map(side * Math.abs(focal))}
      <circle cx={fx} cy={sy.map(0)} r="3.5" fill="#334155" />
      <text x={fx} y={sy.map(0) + 18} text-anchor="middle" font-size="13" fill="#334155"
        >{side < 0 === converging ? 'F' : 'F′'}</text
      >
    {/each}

    <!-- object AB -->
    <line
      x1={ox}
      y1={sy.map(0)}
      x2={ox}
      y2={sy.map(objectHeight)}
      stroke="#4F46E5"
      stroke-width="3.5"
    />
    <polygon points={arrowHead(ox, sy.map(0), ox, sy.map(objectHeight), 11)} fill="#4F46E5" />
    <text x={ox - 8} y={sy.map(0) + 16} text-anchor="end" font-size="13" fill="#4F46E5">A</text>
    <text x={ox - 8} y={sy.map(objectHeight) + 4} text-anchor="end" font-size="13" fill="#4F46E5"
      >B</text
    >
    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đỉnh B của vật — ←→ dời vật dọc trục, ↑↓ đổi chiều cao"
        aria-valuemin={step}
        aria-valuemax={range - step}
        aria-valuenow={distance}
        aria-valuetext="d = {fmt(distance)} cm, h = {fmt(objectHeight)} cm"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle cx={ox} cy={sy.map(objectHeight)} r="18" fill="transparent" />
        <circle
          cx={ox}
          cy={sy.map(objectHeight)}
          r="7"
          fill="#fff"
          stroke="#4F46E5"
          stroke-width="3"
        />
      </g>
    {/if}
  </svg>
  <figcaption class="text-center text-sm text-slate-700 tabular-nums" aria-live="polite">
    {summary}
  </figcaption>
</figure>

<style>
  .drag-handle:focus-visible circle:nth-child(2) {
    stroke-width: 5;
  }
</style>
