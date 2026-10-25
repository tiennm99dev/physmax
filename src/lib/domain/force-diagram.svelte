<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, colorAt, snap } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { arrowHead, shaftEnd } from './arrow.js';
  import { components, describeDirection, isBalanced, resultant } from './force-diagram.js';
  import { toPolar } from './vector.js';

  /**
   * Forces acting on one body, drawn as arrows from its centre to scale, with
   * the resultant (hợp lực) dashed. With `interactive`, drag an arrow tip to
   * change its size and direction; with the keyboard, ↑/↓ change the size by
   * `magnitudeStep` and ←/→ turn it by `angleStep` (Shift: five steps).
   *
   * - `forces` (bindable): `{ label, magnitude, angle, color? }`, angle in
   *   degrees counter-clockwise from the +x axis (0 right, 90 up).
   * - `maxMagnitude`: the size that reaches the edge of the drawing.
   * - `showResultant`, `showComponents` (dotted x and y parts of each force).
   * - `fixedAngles`: lock directions so only sizes change (weight, normal force).
   * - `body`: `'box'` (a crate) or `'dot'` (a point mass).
   *
   * @type {{
   *   forces?: Array<{ label: string, magnitude: number, angle: number, color?: string }>;
   *   interactive?: boolean;
   *   maxMagnitude?: number;
   *   magnitudeStep?: number;
   *   angleStep?: number;
   *   fixedAngles?: boolean;
   *   showResultant?: boolean;
   *   showComponents?: boolean;
   *   body?: 'box' | 'dot';
   *   unit?: string;
   *   label?: string;
   *   size?: number;
   *   onchange?: (forces: Array<{ label: string, magnitude: number, angle: number }>) => void;
   * }}
   */
  let {
    forces = $bindable([]),
    interactive = false,
    maxMagnitude = 50,
    magnitudeStep = 1,
    angleStep = 15,
    fixedAngles = false,
    showResultant = true,
    showComponents = false,
    body = 'box',
    unit = 'N',
    label = 'Giản đồ lực',
    size = 360,
    onchange,
  } = $props();

  const C = $derived(size / 2);
  const reach = $derived(size / 2 - 34);
  const k = $derived(reach / maxMagnitude);
  const result = $derived(resultant(forces));
  const balanced = $derived(isBalanced(forces, magnitudeStep / 100));
  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);

  /** Tip of a force arrow in pixels. @param {{ magnitude: number, angle: number }} f */
  const tipOf = (f) => {
    const v = components(f);
    return { x: C + v.x * k, y: C - v.y * k };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} i @param {number} magnitude @param {number} angle */
  function setForce(i, magnitude, angle) {
    const m = clamp(snap(magnitude, magnitudeStep), 0, maxMagnitude);
    const a = fixedAngles ? forces[i].angle : ((snap(angle, angleStep) % 360) + 360) % 360;
    if (m === forces[i].magnitude && a === forces[i].angle) return;
    forces = forces.map((f, j) => (j === i ? { ...f, magnitude: m, angle: a } : f));
    onchange?.(forces);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: size, h: size },
    pad: 0,
    onChange: () => {
      const p = toPolar({ x: (scratch.x - C) / k, y: (C - scratch.y) / k });
      if (fixedAngles) {
        // Project onto the fixed direction, so dragging past the centre gives 0.
        const along = components({ magnitude: 1, angle: forces[i].angle });
        const m = ((scratch.x - C) * along.x + (C - scratch.y) * along.y) / k;
        setForce(i, Math.max(0, m), forces[i].angle);
      } else {
        setForce(i, p.magnitude, p.angle);
      }
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const n = big ? 5 : 1;
      const f = forces[i];
      setForce(i, f.magnitude - dy * magnitudeStep * n, f.angle - dx * angleStep * n);
    },
  });

  /** @param {{ label: string, magnitude: number, angle: number }} f */
  const say = (f) => `${f.label} ${fmt(f.magnitude)} ${unit}, ${describeDirection(f.angle)}`;
  const summary = $derived(
    balanced
      ? 'Các lực cân bằng: hợp lực bằng 0.'
      : `Hợp lực ${fmt(result.magnitude)} ${unit}, ${describeDirection(result.angle)}.`,
  );
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {size} {size}"
    class="mx-auto block w-full max-w-sm select-none rounded-xl border border-slate-200 bg-white"
    style:aspect-ratio="1 / 1"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{label}. {forces.map(say).join('; ')}. {summary}"
  >
    <line x1="12" y1={C} x2={size - 12} y2={C} stroke="#e2e8f0" stroke-dasharray="4 4" />
    <line x1={C} y1="12" x2={C} y2={size - 12} stroke="#e2e8f0" stroke-dasharray="4 4" />
    {#if body === 'box'}
      <rect x={C - 26} y={C - 26} width="52" height="52" rx="4" fill="#fde68a" stroke="#b45309" />
    {:else}
      <circle cx={C} cy={C} r="9" fill="#334155" />
    {/if}

    {#each forces as f, i (i)}
      {@const tip = tipOf(f)}
      {@const color = f.color ?? colorAt(i)}
      {#if showComponents && f.magnitude > 0}
        <line x1={C} y1={C} x2={tip.x} y2={C} stroke={color} stroke-dasharray="3 3" />
        <line x1={C} y1={C} x2={C} y2={tip.y} stroke={color} stroke-dasharray="3 3" />
        <line x1={tip.x} y1={C} x2={tip.x} y2={tip.y} stroke={color} stroke-opacity="0.4" />
        <line x1={C} y1={tip.y} x2={tip.x} y2={tip.y} stroke={color} stroke-opacity="0.4" />
      {/if}
      {#if f.magnitude > 0}
        {@const end = shaftEnd(C, C, tip.x, tip.y, 12)}
        <line x1={C} y1={C} x2={end.x} y2={end.y} stroke={color} stroke-width="3.5" />
        <polygon points={arrowHead(C, C, tip.x, tip.y, 12)} fill={color} />
      {/if}
      <text
        x={tip.x + (tip.x >= C ? 10 : -10)}
        y={tip.y + (tip.y > C ? 18 : -8)}
        text-anchor={tip.x >= C ? 'start' : 'end'}
        font-size="14"
        font-weight="700"
        fill={color}>{f.label}</text
      >
      {#if interactive}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Lực {f.label}: ↑↓ đổi độ lớn{fixedAngles ? '' : ', ←→ đổi hướng'}"
          aria-valuemin={0}
          aria-valuemax={maxMagnitude}
          aria-valuenow={f.magnitude}
          aria-valuetext={say(f)}
          style="cursor:grab; outline:none"
          use:draggable={dragFor(i)}
        >
          <circle cx={tip.x} cy={tip.y} r="18" fill="transparent" />
          <circle cx={tip.x} cy={tip.y} r="7" fill="#fff" stroke={color} stroke-width="3" />
        </g>
      {/if}
    {/each}

    {#if showResultant && !balanced}
      {@const tip = tipOf(result)}
      {@const end = shaftEnd(C, C, tip.x, tip.y, 12)}
      <line
        x1={C}
        y1={C}
        x2={end.x}
        y2={end.y}
        stroke="#0f172a"
        stroke-width="2.5"
        stroke-dasharray="7 4"
      />
      <polygon points={arrowHead(C, C, tip.x, tip.y, 12)} fill="#0f172a" />
    {/if}
  </svg>
  <figcaption class="space-y-1 text-center text-sm text-slate-700 tabular-nums">
    <span class="flex flex-wrap justify-center gap-x-4 gap-y-1">
      {#each forces as f, i (i)}
        <span style:color={f.color ?? colorAt(i)} class="font-semibold"
          >{f.label} = {fmt(f.magnitude)} {unit}</span
        >
      {/each}
    </span>
    {#if showResultant}
      <span class="block font-semibold" aria-live="polite">{summary}</span>
    {/if}
  </figcaption>
</figure>

<style>
  .drag-handle:focus-visible circle:nth-child(2) {
    stroke-width: 5;
  }
</style>
