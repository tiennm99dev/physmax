<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import {
    MAP,
    MISSIONS,
    STEPS,
    addLeg,
    compareNote,
    directionText,
    displacement,
    lengthRelation,
    meets,
    pathLength,
    snapToMap,
    walk,
  } from './engine.js';

  const CELL = 26;
  const PAD = 14;
  const W = (MAP.xMax - MAP.xMin) * CELL + 2 * PAD;
  const H = (MAP.yMax - MAP.yMin) * CELL + 2 * PAD;
  const START = { x: 0, y: 0 };

  /** @param {number} x */
  const px = (x) => PAD + (x - MAP.xMin) * CELL;
  /** @param {number} y */
  const py = (y) => PAD + (MAP.yMax - y) * CELL;

  const xs = Array.from({ length: MAP.xMax - MAP.xMin + 1 }, (_, i) => MAP.xMin + i);
  const ys = Array.from({ length: MAP.yMax - MAP.yMin + 1 }, (_, i) => MAP.yMin + i);

  let route = $state([START]);
  let missionId = $state(MISSIONS[0].id);
  /** @type {SVGSVGElement | undefined} */
  let board = $state();

  const mission = $derived(MISSIONS.find((m) => m.id === missionId) ?? MISSIONS[0]);
  const s = $derived(pathLength(route));
  const d = $derived(displacement(route));
  const done = $derived(meets(route, mission));
  const last = $derived(route.at(-1) ?? START);
  const line = $derived(route.map((p) => `${px(p.x)},${py(p.y)}`).join(' '));
  const shaft = $derived(shaftEnd(px(0), py(0), px(last.x), py(last.y), 12));
  const head = $derived(arrowHead(px(0), py(0), px(last.x), py(last.y), 12));

  /** @param {MouseEvent} e */
  function tap(e) {
    if (!board) return;
    const at = clientToSvg(board, e.clientX, e.clientY, W, H);
    route = addLeg(
      route,
      snapToMap(MAP.xMin + (at.x - PAD) / CELL, MAP.yMax - (at.y - PAD) / CELL),
    );
  }

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    /** @type {Record<string, { x: number, y: number }>} */
    const keys = {
      ArrowUp: STEPS.bac,
      ArrowDown: STEPS.nam,
      ArrowRight: STEPS.dong,
      ArrowLeft: STEPS.tay,
    };
    const step = keys[e.key];
    if (!step) return;
    e.preventDefault();
    route = walk(route, step);
  }

  function undo() {
    if (route.length > 1) route = route.slice(0, -1);
  }

  function clear() {
    route = [START];
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nhiệm vụ"
    options={MISSIONS.map((m) => ({ value: m.id, label: m.label }))}
    bind:value={missionId}
    onchange={clear}
  />
  <p class="text-sm text-slate-700"><LiveRichText text={mission.ask} /></p>

  <div class="{card} p-2">
    <svg bind:this={board} viewBox="0 0 {W} {H}" class="w-full">
      <title>Bản đồ lưới, mỗi ô dài 1 km, phía trên là hướng Bắc</title>
      {#each xs as x (x)}
        <line
          x1={px(x)}
          x2={px(x)}
          y1={py(MAP.yMax)}
          y2={py(MAP.yMin)}
          stroke={x === 0 ? '#94a3b8' : '#e2e8f0'}
        />
      {/each}
      {#each ys as y (y)}
        <line
          x1={px(MAP.xMin)}
          x2={px(MAP.xMax)}
          y1={py(y)}
          y2={py(y)}
          stroke={y === 0 ? '#94a3b8' : '#e2e8f0'}
        />
      {/each}
      <text x={px(0) + 4} y={py(MAP.yMax) + 11} font-size="11" font-weight="700" fill="#475569">
        B
      </text>
      <text
        x={px(MAP.xMax) - 2}
        y={py(0) - 4}
        font-size="11"
        font-weight="700"
        fill="#475569"
        text-anchor="end"
      >
        Đ
      </text>
      <polyline
        points={line}
        fill="none"
        stroke="#4f46e5"
        stroke-width="3"
        stroke-linejoin="round"
      />
      {#if d.size > 0}
        <line
          x1={px(0)}
          y1={py(0)}
          x2={shaft.x}
          y2={shaft.y}
          stroke="#dc2626"
          stroke-width="3"
          stroke-dasharray="7 4"
        />
        <polygon points={head} fill="#dc2626" />
      {/if}
      <circle cx={px(0)} cy={py(0)} r="6" fill="#0f172a" />
      <circle cx={px(last.x)} cy={py(last.y)} r="6" fill="#4f46e5" stroke="#fff" stroke-width="2" />
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        fill="transparent"
        role="button"
        tabindex="0"
        class="cursor-pointer outline-none focus-visible:stroke-indigo-500 focus-visible:stroke-2"
        aria-label={`Bản đồ lưới. Chạm một điểm để đi thẳng tới đó, hoặc dùng phím mũi tên để đi 1 ki-lô-mét. Xe đang ở ${formatNumber(last.x)} ki-lô-mét theo hướng Đông, ${formatNumber(last.y)} ki-lô-mét theo hướng Bắc.`}
        onclick={tap}
        onkeydown={onKey}
      />
    </svg>
  </div>

  <div class="grid grid-cols-3 gap-2 sm:max-w-xs" role="group" aria-label="Đi 1 km theo hướng">
    <span></span>
    <button
      type="button"
      class="{button.secondary} {focusRing}"
      onclick={() => (route = walk(route, STEPS.bac))}>Bắc</button
    >
    <span></span>
    <button
      type="button"
      class="{button.secondary} {focusRing}"
      onclick={() => (route = walk(route, STEPS.tay))}>Tây</button
    >
    <button
      type="button"
      class="{button.secondary} {focusRing}"
      onclick={() => (route = walk(route, STEPS.nam))}>Nam</button
    >
    <button
      type="button"
      class="{button.secondary} {focusRing}"
      onclick={() => (route = walk(route, STEPS.dong))}>Đông</button
    >
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} disabled={route.length < 2} onclick={undo}>
      Lùi một chặng
    </button>
    <button type="button" class={button.quiet} disabled={route.length < 2} onclick={clear}>
      Xoá lộ trình
    </button>
  </div>

  <dl class="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
    <div class="rounded-xl bg-indigo-50 px-4 py-3">
      <dt class="font-semibold text-indigo-800">Quãng đường (đường xanh)</dt>
      <dd><LiveRichText text={`$s ${lengthRelation(s)}$ km`} /></dd>
    </div>
    <div class="rounded-xl bg-rose-50 px-4 py-3">
      <dt class="font-semibold text-rose-800">Độ dịch chuyển (mũi tên đỏ)</dt>
      <dd>
        <LiveRichText text={`$d ${lengthRelation(d.size)}$ km, ${directionText(d.x, d.y)}`} />
      </dd>
    </div>
  </dl>
  {#if d.x !== 0 && d.y !== 0}
    <p class="text-sm text-slate-700">
      <LiveRichText
        text={`Tổng hợp: $d = \\sqrt{${numTex(Math.abs(d.x))}^2 + ${numTex(Math.abs(d.y))}^2} ${lengthRelation(d.size)}$ km, với $${numTex(Math.abs(d.x))}$ km theo phương Đông – Tây và $${numTex(Math.abs(d.y))}$ km theo phương Bắc – Nam.`}
      />
    </p>
  {/if}

  <FeedbackNote tone={done ? 'ok' : 'info'} text={done ? mission.done : compareNote(route)} />
</div>
