<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    BLANK,
    CHALLENGES,
    STAGE,
    STAGES,
    START,
    S_MAX,
    S_STEP,
    checkChallenge,
    describe,
    distanceAt,
    moveCorner,
    stageSpeeds,
  } from './engine.js';

  const VW = 480;
  const VH = 320;
  const L = 52;
  const R = 436;
  const T = 76;
  const B = 280;
  const T_MAX = STAGES * STAGE;
  /** Real seconds the car takes to drive the whole graph. */
  const SHOW = 6;

  const X = (/** @type {number} */ t) => L + ((R - L) * t) / T_MAX;
  const Y = (/** @type {number} */ s) => B - ((B - T) * s) / S_MAX;
  const sOfY = (/** @type {number} */ y) => ((B - y) * S_MAX) / (B - T);
  const roadX = (/** @type {number} */ s) => L + ((R - L) * s) / S_MAX;

  let s = $state([...START]);
  let task = $state('free');
  let cursor = $state(1.5);
  /** Time of the playing car (h), or null when not playing. */
  let playT = $state(/** @type {number | null} */ (null));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  const challenge = $derived(CHALLENGES.find((c) => c.id === task) ?? null);
  const result = $derived(challenge ? checkChallenge(s, challenge) : null);
  const speeds = $derived(stageSpeeds(s));
  const lines = $derived(describe(s));
  const shownT = $derived(playT ?? cursor);
  const shownS = $derived(distanceAt(s, shownT));

  const fullPath = $derived(s.map((v, i) => `${X(i * STAGE)},${Y(v)}`).join(' '));
  const tracedPath = $derived.by(() => {
    const end = playT ?? T_MAX;
    /** @type {string[]} */
    const pts = [];
    for (let i = 0; i < s.length && i * STAGE <= end; i++) pts.push(`${X(i * STAGE)},${Y(s[i])}`);
    pts.push(`${X(end)},${Y(distanceAt(s, end))}`);
    return pts.join(' ');
  });

  /**
   * Starts the graph over: the book's car in free mode, a neutral graph for a challenge.
   * @param {string | number} [mode]
   */
  function redraw(mode = task) {
    s = mode === 'free' ? [...START] : [...BLANK];
  }

  /** @param {number} i @param {number} target */
  function setCorner(i, target) {
    s = moveCorner(s, i, target);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => setCorner(i, sOfY(scratch.y)),
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => {
      if (dy !== 0) setCorner(i, s[i] - dy * S_STEP * (big ? 4 : 1));
    },
  });

  let frame = 0;
  $effect(() => () => cancelAnimationFrame(frame));

  function play() {
    cancelAnimationFrame(frame);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      playT = null;
      cursor = T_MAX;
      return;
    }
    const start = performance.now();
    playT = 0;
    const tick = () => {
      const t = (((performance.now() - start) / 1000) * T_MAX) / SHOW;
      if (t >= T_MAX) {
        playT = null;
        cursor = T_MAX;
        return;
      }
      playT = t;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  const km = (/** @type {number} */ v) => formatNumber(v, 1);
  const h = (/** @type {number} */ v) => formatNumber(v, 2);

  const feedback = $derived.by(() => {
    if (!challenge || !result) {
      return `Tại t = ${h(cursor)} h, xe đã đi được s = ${km(distanceAt(s, cursor))} km. Đoạn càng dốc thì xe chạy càng nhanh; đoạn nằm ngang là xe đứng yên.`;
    }
    if (result.ok) return `Đúng rồi! Đồ thị khớp với mô tả: ${challenge.text}`;
    const i = result.wrong;
    return `Chưa khớp ở đoạn từ ${i * STAGE} h đến ${(i + 1) * STAGE} h: đồ thị cho tốc độ ${speeds[i]} km/h. Đọc lại mô tả và kéo đầu đoạn đó lên hoặc xuống.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nhiệm vụ"
    options={[
      { value: 'free', label: 'Tự do' },
      ...CHALLENGES.map((c) => ({ value: c.id, label: c.label })),
    ]}
    bind:value={task}
    onchange={(v) => redraw(v)}
  />
  {#if challenge}
    <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
      Kéo các chấm để vẽ đồ thị s – t cho chuyển động: {challenge.text}
    </p>
  {/if}

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {VW} {VH}"
      class="mx-auto block w-full max-w-xl select-none"
      style:touch-action="none"
      role="group"
      aria-label="Đồ thị quãng đường – thời gian của xe. {lines.join(' ')}"
    >
      <!-- road with the car -->
      <rect x={L} y="22" width={R - L} height="22" rx="4" fill="#64748b" />
      <line
        x1={L}
        y1="33"
        x2={R}
        y2="33"
        stroke="#f8fafc"
        stroke-width="1.5"
        stroke-dasharray="10 8"
      />
      <text x={L} y="16" class="fill-slate-600 text-[11px]">0 km</text>
      <text x={R} y="16" text-anchor="end" class="fill-slate-600 text-[11px]">{S_MAX} km</text>
      <rect x={roadX(shownS) - 10} y="25" width="20" height="16" rx="4" fill="#dc2626" />

      <!-- grid and axes -->
      {#each Array.from({ length: S_MAX / 20 + 1 }, (_, k) => k * 20) as v (v)}
        <line x1={L} y1={Y(v)} x2={R} y2={Y(v)} stroke="#e2e8f0" />
        {#if v % 40 === 0}
          <text x={L - 6} y={Y(v) + 4} text-anchor="end" class="fill-slate-600 text-[11px]"
            >{v}</text
          >
        {/if}
      {/each}
      {#each Array.from({ length: T_MAX * 2 + 1 }, (_, k) => k / 2) as t (t)}
        <line x1={X(t)} y1={T} x2={X(t)} y2={B} stroke="#e2e8f0" />
        <text x={X(t)} y={B + 16} text-anchor="middle" class="fill-slate-600 text-[11px]"
          >{formatNumber(t)}</text
        >
      {/each}
      <line x1={L} y1={B} x2={R + 8} y2={B} stroke="#0f172a" stroke-width="1.5" />
      <line x1={L} y1={B} x2={L} y2={T - 8} stroke="#0f172a" stroke-width="1.5" />
      <text x={R + 8} y={B + 4} class="fill-slate-800 text-[12px] font-semibold">t (h)</text>
      <text x={L - 4} y={T - 12} text-anchor="end" class="fill-slate-800 text-[12px] font-semibold"
        >s (km)</text
      >

      <!-- graph -->
      <polyline
        points={fullPath}
        fill="none"
        stroke="#2563eb"
        stroke-width="3"
        opacity={playT === null ? 1 : 0.2}
      />
      {#if playT !== null}
        <polyline points={tracedPath} fill="none" stroke="#2563eb" stroke-width="4" />
      {/if}

      <!-- reading guides -->
      <line
        x1={X(shownT)}
        y1={B}
        x2={X(shownT)}
        y2={Y(shownS)}
        stroke="#dc2626"
        stroke-dasharray="4 3"
      />
      <line
        x1={L}
        y1={Y(shownS)}
        x2={X(shownT)}
        y2={Y(shownS)}
        stroke="#dc2626"
        stroke-dasharray="4 3"
      />
      <circle cx={X(shownT)} cy={Y(shownS)} r="5" fill="#dc2626" />

      <!-- stage speeds -->
      {#each speeds as v, i (i)}
        <text
          x={X((i + 0.5) * STAGE)}
          y={T - 4}
          text-anchor="middle"
          class="text-[11px] font-semibold {v === 0 ? 'fill-amber-700' : 'fill-indigo-700'}"
          >{v === 0 ? 'đứng yên' : `${v} km/h`}</text
        >
      {/each}

      <!-- corners -->
      {#each s as v, i (i)}
        {#if i > 0}
          <g
            class="drag-handle"
            role="slider"
            tabindex="0"
            aria-label="Quãng đường sau {i *
              STAGE} giờ: phím mũi tên lên, xuống để đổi độ dốc đoạn {i}"
            aria-valuemin={0}
            aria-valuemax={S_MAX}
            aria-valuenow={v}
            aria-valuetext="{v} km sau {i * STAGE} h; đoạn {i}: {speeds[i - 1]} km/h"
            style="cursor:grab; outline:none"
            use:draggable={dragFor(i)}
          >
            <circle
              class="drag-knob"
              cx={X(i * STAGE)}
              cy={Y(v)}
              r="8"
              fill="#fff"
              stroke="#2563eb"
              stroke-width="3"
            />
          </g>
        {/if}
      {/each}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Kéo các chấm tròn lên, xuống (hoặc dùng phím mũi tên) để đổi độ dốc của từng đoạn.
    </figcaption>
  </figure>

  <div class="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
    <SliderField
      label="Đọc đồ thị tại thời điểm t"
      bind:value={cursor}
      min={0}
      max={T_MAX}
      step={0.25}
      unit="h"
      format={(v) => formatNumber(v, 2)}
    />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={play} disabled={playT !== null}
        >Cho xe chạy</button
      >
      <button type="button" class={button.quiet} onclick={() => redraw()}>Vẽ lại</button>
    </div>
  </div>

  <ul class="{card} space-y-1 p-3 text-sm text-slate-700">
    {#each lines as line, i (i)}
      <li>{line}</li>
    {/each}
  </ul>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {result?.ok
      ? 'bg-emerald-50 text-emerald-800'
      : result
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
