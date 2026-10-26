<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { RACERS, compare, coveredAt, rank } from './engine.js';

  const VW = 480;
  const LEFT = 56;
  const RIGHT = 20;
  const LANE = 40;
  const TOP = 24;
  const VH = TOP + LANE * RACERS.length + 8;
  /** Real seconds the slowest finisher takes on screen. */
  const SHOW = 4;

  let racers = $state(RACERS.map((r) => ({ ...r })));
  let editId = $state(RACERS[0].id);
  /** Race clock in simulated seconds, or -1 before the start. */
  let clock = $state(-1);
  let running = $state(false);

  const editing = $derived(racers.find((r) => r.id === editId) ?? racers[0]);
  const ranked = $derived(rank(racers));
  const maxS = $derived(Math.max(...racers.map((r) => r.s)));
  const maxT = $derived(Math.max(...racers.map((r) => r.t)));
  const X = (/** @type {number} */ s) => LEFT + ((VW - LEFT - RIGHT) * s) / maxS;

  const num = (/** @type {number} */ v, d = 2) => formatNumber(v, d);

  /** One sentence per pair that the book's rules settle without dividing. */
  const pairNotes = $derived.by(() => {
    /** @type {string[]} */
    const out = [];
    for (let i = 0; i < racers.length; i++) {
      for (let j = i + 1; j < racers.length; j++) {
        const a = racers[i];
        const b = racers[j];
        const c = compare(a, b);
        if (c.rule === 'same-s') {
          out.push(
            c.faster
              ? `${a.name} và ${b.name} cùng chạy ${num(a.s)} m: ${c.faster.name} mất ít thời gian hơn nên nhanh hơn.`
              : `${a.name} và ${b.name} cùng chạy ${num(a.s)} m trong cùng thời gian: nhanh như nhau.`,
          );
        } else if (c.rule === 'same-t') {
          out.push(
            `${a.name} và ${b.name} cùng chạy trong ${num(a.t)} s: ${c.faster?.name} đi được quãng đường dài hơn nên nhanh hơn.`,
          );
        }
      }
    }
    return out;
  });

  const leaders = $derived(ranked.filter((r) => r.rank === 1));
  const status = $derived.by(() => {
    const top = leaders
      .map((r) => `${r.name}: v = ${num(r.s)} : ${num(r.t)} = ${num(r.v)} m/s`)
      .join('; ');
    const head =
      leaders.length > 1
        ? `Nhanh nhất có ${leaders.length} bạn cùng tốc độ (${top}).`
        : `${leaders[0].name} nhanh nhất (${top}).`;
    const rule =
      pairNotes.length > 0
        ? ` ${pairNotes[0]}`
        : ' Không có hai bạn nào cùng quãng đường hay cùng thời gian, nên phải so sánh tốc độ v = s/t.';
    return head + rule;
  });

  const clockText = $derived(clock < 0 ? 'Chưa xuất phát' : `t = ${num(clock, 1)} s`);

  $effect(() => {
    if (!running) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      clock = maxT;
      running = false;
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = () => {
      const t = ((performance.now() - start) / 1000) * (maxT / SHOW);
      clock = Math.min(t, maxT);
      if (t >= maxT) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function go() {
    clock = 0;
    running = true;
  }

  function reset() {
    running = false;
    clock = -1;
  }

  function restore() {
    racers = RACERS.map((r) => ({ ...r }));
    reset();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chỉnh số liệu của"
    options={racers.map((r) => ({ value: r.id, label: r.name }))}
    bind:value={editId}
  />
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField
      label="Quãng đường {editing.name} chạy (s)"
      bind:value={editing.s}
      min={20}
      max={200}
      step={10}
      unit="m"
      oninput={reset}
    />
    <SliderField
      label="Thời gian {editing.name} chạy (t)"
      bind:value={editing.t}
      min={4}
      max={40}
      step={1}
      unit="s"
      oninput={reset}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {VW} {VH}"
      class="w-full select-none"
      role="img"
      aria-label="Đường đua bốn làn. {clockText}. {racers
        .map(
          (r) =>
            `${r.name} đã chạy ${num(clock < 0 ? 0 : coveredAt(r, clock), 0)} trên ${num(r.s)} m`,
        )
        .join('; ')}"
    >
      <text x={LEFT} y="16" class="fill-slate-500 text-[12px]">0 m</text>
      <text x={VW - RIGHT} y="16" text-anchor="end" class="fill-slate-500 text-[12px]"
        >{num(maxS)} m</text
      >
      {#each racers as r, i (r.id)}
        {@const y = TOP + i * LANE + LANE / 2}
        {@const pos = clock < 0 ? 0 : coveredAt(r, clock)}
        {@const done = clock >= r.t}
        <rect
          x={LEFT}
          y={TOP + i * LANE + 4}
          width={VW - LEFT - RIGHT}
          height={LANE - 8}
          rx="4"
          fill={r.id === editId ? '#eef2ff' : '#f1f5f9'}
        />
        <text x="6" y={y + 5} class="fill-slate-800 text-[14px] font-semibold">{r.name}</text>
        <line
          x1={X(r.s)}
          y1={TOP + i * LANE + 4}
          x2={X(r.s)}
          y2={TOP + (i + 1) * LANE - 4}
          stroke="#0f172a"
          stroke-width="3"
          stroke-dasharray="4 3"
        />
        <circle
          cx={X(pos)}
          cy={y}
          r="10"
          fill={r.color}
          stroke={done ? '#0f172a' : '#fff'}
          stroke-width="2"
        />
      {/each}
    </svg>
    <figcaption class="px-2 text-center text-sm font-semibold text-slate-700">
      <span class="tabular-nums">{clockText}</span> · vạch đứt là đích của từng bạn
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={go} disabled={running}>Xuất phát</button>
    <button type="button" class={button.quiet} onclick={reset}>Về vạch xuất phát</button>
    <button type="button" class={button.quiet} onclick={restore}>Số liệu ban đầu</button>
  </div>

  <div class="{card} overflow-x-auto p-3">
    <table class="w-full text-sm tabular-nums">
      <caption class="mb-2 text-left font-semibold text-slate-700"
        >Bảng xếp hạng theo tốc độ</caption
      >
      <thead>
        <tr class="text-left text-slate-600">
          <th class="py-1 pr-2">Hạng</th>
          <th class="py-1 pr-2">Tên</th>
          <th class="py-1 pr-2">s (m)</th>
          <th class="py-1 pr-2">t (s)</th>
          <th class="py-1 pr-2">v (m/s)</th>
          <th class="py-1">v (km/h)</th>
        </tr>
      </thead>
      <tbody>
        {#each ranked as r (r.id)}
          <tr class="border-t border-slate-100">
            <td class="py-1 pr-2 font-semibold">{r.rank}</td>
            <td class="py-1 pr-2">
              <span
                class="mr-1 inline-block size-3 rounded-full align-middle"
                style:background={r.color}
              ></span>{r.name}
            </td>
            <td class="py-1 pr-2">{num(r.s)}</td>
            <td class="py-1 pr-2">{num(r.t)}</td>
            <td class="py-1 pr-2">{num(r.v)}</td>
            <td class="py-1">{num(r.kmh, 1)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {status}
  </p>
</div>
