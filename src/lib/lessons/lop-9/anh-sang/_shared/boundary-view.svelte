<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { angleFromPointer, arcBetween, boundary, rayDir } from './light.js';

  /**
   * A laser ray meeting a flat horizontal boundary at the point I, with the
   * normal NN′, the reflected ray and the refracted ray (faded by how much
   * light is reflected; gone past the critical angle). Drag the laser head,
   * or focus it and use ←/→ (Shift for 5°), to change the angle of incidence.
   *
   * - `n1`, `n2`: refractive indices of the upper (incident) and lower media.
   * - `topName`, `bottomName`: media names shown in each half.
   * - `incidence` (bindable): angle of incidence in degrees.
   * - `max`: largest angle of incidence the laser reaches.
   *
   * @type {{
   *   n1: number;
   *   n2: number;
   *   topName: string;
   *   bottomName: string;
   *   incidence?: number;
   *   max?: number;
   *   onchange?: (incidence: number) => void;
   * }}
   */
  let { n1, n2, topName, bottomName, incidence = $bindable(30), max = 85, onchange } = $props();

  const W = 360;
  const H = 300;
  const I = { x: W / 2, y: H / 2 };
  const R = 125;

  const b = $derived(boundary(n1, n2, incidence));
  const inDir = $derived(rayDir(incidence, true, false));
  const reflDir = $derived(rayDir(incidence, true, true));
  const refrDir = $derived(b.refraction === null ? null : rayDir(b.refraction, false, true));
  const src = $derived({ x: I.x + inDir.x * R, y: I.y + inDir.y * R });

  /** Water and glass get a tint, air stays white. @param {number} n */
  const tint = (n) => (n > 1.4 ? '#dbeafe' : n > 1.01 ? '#e0f2fe' : '#ffffff');

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} deg */
  function setAngle(deg) {
    const v = Math.round(Math.min(max, Math.max(0, deg)));
    if (v === incidence) return;
    incidence = v;
    onchange?.(v);
  }

  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setAngle(angleFromPointer(I, scratch, max)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setAngle(incidence + (dx || -dy) * (big ? 5 : 1)),
  };

  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)}°`;
  const label = $derived(
    `Tia sáng đi từ ${topName} sang ${bottomName}, góc tới ${deg(incidence)}. ` +
      (b.refraction === null
        ? 'Không có tia khúc xạ: toàn bộ ánh sáng bị phản xạ.'
        : `Góc khúc xạ ${deg(b.refraction)}.`),
  );
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-md select-none rounded-xl border border-slate-200"
  style="touch-action:none"
  role="group"
  aria-label={label}
>
  <rect x="0" y="0" width={W} height={I.y} fill={tint(n1)} />
  <rect x="0" y={I.y} width={W} height={H - I.y} fill={tint(n2)} />
  <line x1="0" y1={I.y} x2={W} y2={I.y} stroke="#334155" stroke-width="1.5" />
  <text x="10" y="22" font-size="13" fill="#334155">{topName} (n = {formatNumber(n1, 2)})</text>
  <text x="10" y={H - 12} font-size="13" fill="#334155"
    >{bottomName} (n = {formatNumber(n2, 2)})</text
  >

  <!-- normal -->
  <line
    x1={I.x}
    y1="30"
    x2={I.x}
    y2={H - 30}
    stroke="#64748b"
    stroke-width="1"
    stroke-dasharray="5 4"
  />
  <text x={I.x + 5} y="40" font-size="12" fill="#64748b">N</text>
  <text x={I.x + 5} y={H - 32} font-size="12" fill="#64748b">N′</text>

  <!-- rays -->
  <line
    x1={src.x}
    y1={src.y}
    x2={I.x}
    y2={I.y}
    stroke="#dc2626"
    stroke-width="3"
    stroke-linecap="round"
  />
  <line
    x1={I.x}
    y1={I.y}
    x2={I.x + reflDir.x * R}
    y2={I.y + reflDir.y * R}
    stroke="#dc2626"
    stroke-width="3"
    stroke-linecap="round"
    opacity={Math.max(0.12, b.reflected)}
  />
  {#if refrDir}
    <line
      x1={I.x}
      y1={I.y}
      x2={I.x + refrDir.x * R}
      y2={I.y + refrDir.y * R}
      stroke="#dc2626"
      stroke-width="3"
      stroke-linecap="round"
      opacity={Math.max(0.12, 1 - b.reflected)}
    />
  {/if}

  <!-- angles -->
  {#if incidence > 0}
    <path
      d={arcBetween(I, { x: 0, y: -1 }, inDir, 42)}
      fill="none"
      stroke="#7c3aed"
      stroke-width="2"
    />
    <text
      x={I.x + rayDir(incidence / 2, true, false).x * 58}
      y={I.y + rayDir(incidence / 2, true, false).y * 58 + 4}
      text-anchor="middle"
      font-size="13"
      font-style="italic"
      fill="#7c3aed">i</text
    >
  {/if}
  {#if refrDir && b.refraction && b.refraction > 0}
    <path
      d={arcBetween(I, { x: 0, y: 1 }, refrDir, 42)}
      fill="none"
      stroke="#0f766e"
      stroke-width="2"
    />
    <text
      x={I.x + rayDir(b.refraction / 2, false, true).x * 58}
      y={I.y + rayDir(b.refraction / 2, false, true).y * 58 + 4}
      text-anchor="middle"
      font-size="13"
      font-style="italic"
      fill="#0f766e">r</text
    >
  {/if}
  <text x={I.x - 14} y={I.y + 16} font-size="12" fill="#334155">I</text>

  <!-- laser -->
  <g
    class="drag-handle"
    role="slider"
    tabindex="0"
    aria-label="Đèn laser: kéo hoặc dùng phím mũi tên để đổi góc tới"
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={incidence}
    aria-valuetext="Góc tới {deg(incidence)}"
    style="cursor:grab; outline:none"
    use:draggable={drag}
  >
    <circle
      class="drag-knob"
      cx={src.x}
      cy={src.y}
      r="9"
      fill="#fff"
      stroke="#dc2626"
      stroke-width="3"
    />
  </g>
</svg>
