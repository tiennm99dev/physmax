<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    BOUNDS,
    SCENES,
    fieldLines,
    filings,
    inside,
    needleAngle,
    pushOut,
    relativeStrength,
    strengthWord,
  } from './engine.js';

  const W = 480;
  const H = 300;
  const S = W / (BOUNDS.xMax - BOUNDS.xMin);
  const sx = (/** @type {number} */ x) => (x - BOUNDS.xMin) * S;
  const sy = (/** @type {number} */ y) => (BOUNDS.yMax - y) * S;
  const fx = (/** @type {number} */ px) => px / S + BOUNDS.xMin;
  const fy = (/** @type {number} */ py) => BOUNDS.yMax - py / S;

  /** @type {'thang' | 'chu-u' | 'trai-dat'} */
  let sceneId = $state('thang');
  let showFilings = $state(false);
  let showLines = $state(false);
  let showGrid = $state(false);
  let probe = $state({ x: 3.5, y: 1.5 });
  const handle = $state({ x: sx(3.5), y: sy(1.5) });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const scene = $derived(SCENES[sceneId]);
  const dust = $derived(filings(scene, 3200));
  const lines = $derived(fieldLines(scene, 14));
  const grid = $derived.by(() => {
    /** @type {Array<{ x: number, y: number, angle: number }>} */
    const out = [];
    for (let x = BOUNDS.xMin + 0.75; x < BOUNDS.xMax; x += 1.5) {
      for (let y = BOUNDS.yMin + 0.6; y < BOUNDS.yMax; y += 1.25) {
        const p = { x, y };
        if (!inside(scene, p)) out.push({ x, y, angle: needleAngle(scene, p) });
      }
    }
    return out;
  });
  const angle = $derived(needleAngle(scene, probe));
  const rel = $derived(relativeStrength(scene, probe));

  /** @param {{ x: number, y: number }} p field units */
  function place(p) {
    const q = pushOut(scene, p);
    probe = q;
    handle.x = sx(q.x);
    handle.y = sy(q.y);
  }

  /** @param {string | number} v */
  function chooseScene(v) {
    sceneId = /** @type {'thang' | 'chu-u' | 'trai-dat'} */ (v);
    place(v === 'trai-dat' ? { x: 2.3, y: 0 } : { x: 3.5, y: 1.5 });
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = pushOut(scene, { x: fx(p.x), y: fy(p.y) });
      probe = q;
      return { x: sx(q.x), y: sy(q.y) };
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const step = big ? 1 : 0.25;
      place({ x: probe.x + dx * step, y: probe.y - dy * step });
    },
  });

  const WORDS = [
    'sang phải',
    'chéo lên bên phải',
    'lên trên',
    'chéo lên bên trái',
    'sang trái',
    'chéo xuống bên trái',
    'xuống dưới',
    'chéo xuống bên phải',
  ];
  const way = (/** @type {number} */ a) => WORDS[Math.round((((a % 360) + 360) % 360) / 45) % 8];

  /** @param {{ x: number, y: number }[]} l */
  function linePath(l) {
    return l
      .map((p, i) => `${i ? 'L' : 'M'} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`)
      .join(' ');
  }

  /** Arrowhead in the middle of the visible part of a field line. @param {{ x: number, y: number }[]} l */
  function lineArrow(l) {
    const visible = l.map((p, i) => i).filter((i) => i > 0 && !inside(scene, l[i]));
    if (visible.length < 6) return '';
    const i = visible[Math.floor(visible.length / 2)];
    const a = l[i - 1];
    const b = l[i];
    const ang = Math.atan2(-(b.y - a.y), b.x - a.x);
    const tip = { x: sx(b.x), y: sy(b.y) };
    const back = (/** @type {number} */ d) => ({
      x: tip.x - 9 * Math.cos(ang + d),
      y: tip.y - 9 * Math.sin(ang + d),
    });
    const p1 = back(0.45);
    const p2 = back(-0.45);
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z`;
  }

  const status = $derived.by(() => {
    const w = strengthWord(rel);
    const head = `Cực Bắc (đầu đỏ) của kim nam châm chỉ ${way(angle)}. Từ trường ở đây ${w}.`;
    if (sceneId === 'trai-dat') {
      return `${head} Trên mặt đất, kim nam châm luôn chỉ gần đúng hướng Bắc – Nam địa lí: Trái Đất có từ trường.`;
    }
    if (showLines) {
      return `${head} Kim nam châm nằm dọc theo đường sức từ; chiều từ cực Nam sang cực Bắc của kim là chiều của đường sức từ.`;
    }
    if (w === 'mạnh') return `${head} Gần hai cực, mạt sắt bám dày: từ trường mạnh nhất ở hai cực.`;
    return `${head} Thử kéo kim lại gần một cực, hoặc bật "Rắc mạt sắt" và "Đường sức từ".`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nam châm"
    options={[
      { value: 'thang', label: 'Thanh nam châm' },
      { value: 'chu-u', label: 'Nam châm chữ U' },
      { value: 'trai-dat', label: 'Trái Đất' },
    ]}
    bind:value={sceneId}
    onchange={chooseScene}
  />

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={showFilings ? button.primary : button.quiet}
      aria-pressed={showFilings}
      onclick={() => (showFilings = !showFilings)}>Rắc mạt sắt</button
    >
    <button
      type="button"
      class={showLines ? button.primary : button.quiet}
      aria-pressed={showLines}
      onclick={() => (showLines = !showLines)}>Đường sức từ</button
    >
    <button
      type="button"
      class={showGrid ? button.primary : button.quiet}
      aria-pressed={showGrid}
      onclick={() => (showGrid = !showGrid)}>Nhiều kim nam châm</button
    >
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Từ trường quanh {sceneId === 'thang'
        ? 'thanh nam châm'
        : sceneId === 'chu-u'
          ? 'nam châm chữ U'
          : 'Trái Đất'}. {status}"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />

      {#if showFilings}
        <g stroke="#334155" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
          {#each dust as d, i (i)}
            {@const c = Math.cos((d.angle * Math.PI) / 180) * 4}
            {@const s = Math.sin((d.angle * Math.PI) / 180) * 4}
            <line x1={sx(d.x) - c} y1={sy(d.y) + s} x2={sx(d.x) + c} y2={sy(d.y) - s} />
          {/each}
        </g>
      {/if}

      {#if showLines}
        <g aria-hidden="true">
          {#each lines as l, i (i)}
            <path d={linePath(l)} fill="none" stroke="#7c3aed" stroke-width="1.6" />
            <path d={lineArrow(l)} fill="#7c3aed" />
          {/each}
        </g>
      {/if}

      {#if showGrid}
        <g aria-hidden="true">
          {#each grid as g (`${g.x},${g.y}`)}
            <g transform="translate({sx(g.x)} {sy(g.y)}) rotate({-g.angle})">
              <path d="M 11 0 L 0 -3.5 L 0 3.5 Z" fill="#dc2626" />
              <path d="M -11 0 L 0 -3.5 L 0 3.5 Z" fill="#2563eb" />
            </g>
          {/each}
        </g>
      {/if}

      <!-- the magnet or the Earth -->
      <g aria-hidden="true">
        {#if sceneId === 'thang'}
          <rect x={sx(-2)} y={sy(0.45)} width={2 * S} height={0.9 * S} fill="#2563eb" />
          <rect x={sx(0)} y={sy(0.45)} width={2 * S} height={0.9 * S} fill="#dc2626" />
          <text x={sx(-1.6)} y={sy(0) + 7} class="fill-white text-[20px] font-bold">S</text>
          <text x={sx(1.3)} y={sy(0) + 7} class="fill-white text-[20px] font-bold">N</text>
        {:else if sceneId === 'chu-u'}
          {#each scene.boxes as b, i (i)}
            <rect
              x={sx(b.x0)}
              y={sy(b.y1)}
              width={(b.x1 - b.x0) * S}
              height={(b.y1 - b.y0) * S}
              fill="#94a3b8"
            />
          {/each}
          <rect x={sx(-1.6)} y={sy(0.95)} width={0.8 * S} height={0.9 * S} fill="#dc2626" />
          <rect x={sx(0.8)} y={sy(0.95)} width={0.8 * S} height={0.9 * S} fill="#2563eb" />
          <text x={sx(-1.2)} y={sy(0.45) + 7} text-anchor="middle" class="fill-white font-bold"
            >N</text
          >
          <text x={sx(1.2)} y={sy(0.45) + 7} text-anchor="middle" class="fill-white font-bold"
            >S</text
          >
        {:else}
          <circle cx={sx(0)} cy={sy(0)} r={1.9 * S} fill="#bae6fd" stroke="#0369a1" />
          <line
            x1={sx(0)}
            y1={sy(2.25)}
            x2={sx(0)}
            y2={sy(-2.25)}
            stroke="#0f172a"
            stroke-dasharray="5 4"
          />
          <line
            x1={sx(0.38)}
            y1={sy(1.8)}
            x2={sx(-0.38)}
            y2={sy(-1.8)}
            stroke="#7c3aed"
            stroke-dasharray="3 3"
          />
          <text
            stroke="#fff"
            stroke-width="4"
            paint-order="stroke"
            x={sx(0)}
            y={sy(2.35)}
            text-anchor="middle"
            class="fill-slate-800 text-[15px]">Bắc địa lí</text
          >
          <text
            stroke="#fff"
            stroke-width="4"
            paint-order="stroke"
            x={sx(0)}
            y={sy(-2.35) + 14}
            text-anchor="middle"
            class="fill-slate-800 text-[15px]">Nam địa lí</text
          >
          <text
            stroke="#fff"
            stroke-width="4"
            paint-order="stroke"
            x={sx(0.5)}
            y={sy(1.5)}
            class="fill-violet-700 text-[14px]">Nam địa từ</text
          >
          <text
            stroke="#fff"
            stroke-width="4"
            paint-order="stroke"
            x={sx(-0.5)}
            y={sy(-1.5) + 4}
            text-anchor="end"
            class="fill-violet-700 text-[14px]">Bắc địa từ</text
          >
        {/if}
      </g>

      <!-- movable compass -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Kim nam châm thử: kéo hoặc dùng phím mũi tên để di chuyển"
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuenow={Math.round((angle + 360) % 360)}
        aria-valuetext="cực Bắc của kim chỉ {way(angle)}, từ trường {strengthWord(rel)}"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={handle.x}
          cy={handle.y}
          r="19"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="2"
        />
        <g transform="translate({handle.x} {handle.y}) rotate({-angle})">
          <path d="M 16 0 L 0 -5 L 0 5 Z" fill="#dc2626" />
          <path d="M -16 0 L 0 -5 L 0 5 Z" fill="#2563eb" />
          <circle r="2.5" fill="#0f172a" />
        </g>
      </g>
    </svg>
  </figure>

  <FeedbackNote tone="info" text={status} />
</div>
