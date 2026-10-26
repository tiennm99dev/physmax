<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { facetTilts, fromNormal, incidenceFrom, reflectOnFacet } from './engine.js';

  const W = 480;
  const H = 290;
  const I = { x: 240, y: 250 };
  const R = 190;
  const LASER_R = 170;
  const MAX_I = 80;
  const PATTERN = [-12, 9, 15, -6, -14];
  const OFFSETS = [-100, -50, 0, 50, 100];
  const TARGETS = [30, 55, 20, 45, 65, 10];

  let surface = $state('guong');
  let beam = $state('tia');
  let inc = $state(40);
  let targetAt = $state(0);
  const laser = $state(fromNormal(I, LASER_R, -40));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const rough = $derived(surface === 'go-ghe');
  const tilts = $derived(rough ? facetTilts(inc, PATTERN) : PATTERN.map(() => 0));
  const target = $derived(TARGETS[targetAt]);
  const showTarget = $derived(!rough && beam === 'tia');
  const centre = $derived(reflectOnFacet(inc, tilts[2]));
  const hit = $derived(showTarget && inc === target);

  /** @param {number} next */
  function setInc(next) {
    inc = Math.max(0, Math.min(MAX_I, next));
    const p = fromNormal(I, LASER_R, -inc);
    laser.x = p.x;
    laser.y = p.y;
  }

  const laserDrag = $derived({
    point: laser,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      inc = incidenceFrom(I, p, MAX_I);
      return fromNormal(I, LASER_R, -inc);
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const dir = dx !== 0 ? -dx : dy;
      setInc(inc + dir * (big ? 5 : 1));
    },
  });

  /**
   * Arc around `o` from direction `a` to `b` (degrees from the normal, a < b).
   * @param {{ x: number, y: number }} o @param {number} a @param {number} b @param {number} r
   */
  function arc(o, a, b, r) {
    const s = fromNormal(o, r, a);
    const e = fromNormal(o, r, b);
    return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
  }

  /**
   * Arrowhead at `m` for a ray travelling in direction `travel` (from the normal).
   * @param {{ x: number, y: number }} m @param {number} travel
   */
  function head(m, travel) {
    const a = fromNormal(m, 10, travel + 155);
    const b = fromNormal(m, 10, travel - 155);
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${m.x.toFixed(1)} ${m.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }

  /** @param {number} a @param {number} b */
  const between = (a, b) => [Math.min(a, b), Math.max(a, b)];
  const deg = (/** @type {number} */ v) => `${formatNumber(v, 0)}°`;

  const rays = $derived(
    (beam === 'tia' ? [2] : [0, 1, 2, 3, 4]).map((k) => {
      const at = { x: I.x + OFFSETS[k], y: I.y };
      const r = reflectOnFacet(inc, tilts[k]);
      return {
        k,
        at,
        tilt: tilts[k],
        from: fromNormal(at, beam === 'tia' ? LASER_R : 260, -inc),
        to: fromNormal(at, beam === 'tia' ? R : 260, r.out),
      };
    }),
  );

  /** The rough surface as a zigzag through every facet. */
  const roughPath = $derived.by(() => {
    const pts = [`M 20 ${I.y}`];
    OFFSETS.forEach((o, k) => {
      const t = (tilts[k] * Math.PI) / 180;
      const half = 14;
      const dx = half * Math.cos(t);
      const dy = half * Math.sin(t);
      pts.push(`L ${I.x + o - dx - 8} ${I.y + 4}`);
      pts.push(`L ${(I.x + o - dx).toFixed(1)} ${(I.y - dy).toFixed(1)}`);
      pts.push(`L ${(I.x + o + dx).toFixed(1)} ${(I.y + dy).toFixed(1)}`);
      pts.push(`L ${I.x + o + dx + 8} ${I.y - 4}`);
    });
    pts.push(`L ${W - 20} ${I.y}`);
    return pts.join(' ');
  });

  const status = $derived.by(() => {
    if (beam === 'chum') {
      return rough
        ? 'Mặt gồ ghề: chùm tia tới song song bị hắt lại theo mọi hướng. Đó là phản xạ khuếch tán, ta không nhìn thấy ảnh của vật trên mặt này.'
        : 'Gương phẳng (mặt nhẵn): chùm tia tới song song cho chùm tia phản xạ cũng song song, theo một hướng. Đó là phản xạ gương, ta nhìn thấy ảnh của vật.';
    }
    if (rough) {
      return `Mảnh nhỏ tại I bị nghiêng ${deg(Math.abs(tilts[2]))}. So với pháp tuyến của chính mảnh đó: góc tới ${deg(centre.incidence)}, góc phản xạ ${deg(centre.reflection)}. Định luật vẫn đúng, nhưng mỗi mảnh nghiêng một kiểu nên tia phản xạ đi lệch hướng.`;
    }
    const head = `Góc tới i = ${deg(inc)}, góc phản xạ i' = ${deg(inc)}.`;
    if (hit) return `${head} Tia phản xạ đi trúng ngôi sao!`;
    return `${head} Ngôi sao nằm lệch ${deg(target)} so với pháp tuyến IN. Xoay đèn để tia phản xạ đi trúng ngôi sao.`;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Mặt phản xạ"
      options={[
        { value: 'guong', label: 'Gương phẳng' },
        { value: 'go-ghe', label: 'Mặt gồ ghề' },
      ]}
      bind:value={surface}
    />
    <SegmentedControl
      label="Ánh sáng chiếu tới"
      options={[
        { value: 'tia', label: 'Một tia' },
        { value: 'chum', label: 'Chùm song song' },
      ]}
      bind:value={beam}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Đèn laser chiếu vào {rough
        ? 'mặt gồ ghề'
        : 'gương phẳng'} tại điểm tới I. {status}"
    >
      <!-- surface -->
      {#if rough}
        <path d={roughPath} fill="none" stroke="#475569" stroke-width="3" stroke-linejoin="round" />
      {:else}
        <line x1="20" y1={I.y} x2={W - 20} y2={I.y} stroke="#0ea5e9" stroke-width="4" />
        {#each Array.from({ length: 22 }, (_, k) => 26 + k * 20) as x (x)}
          <line x1={x} y1={I.y + 2} x2={x - 8} y2={I.y + 12} stroke="#64748b" stroke-width="1.2" />
        {/each}
      {/if}

      {#if showTarget}
        {@const star = fromNormal(I, R + 4, target)}
        <path
          d="M {star.x} {star.y - 11} L {star.x + 3.5} {star.y - 3.5} L {star.x + 11} {star.y -
            3} L {star.x + 5} {star.y + 2.5} L {star.x + 7} {star.y + 10} L {star.x} {star.y +
            6} L {star.x - 7} {star.y + 10} L {star.x - 5} {star.y + 2.5} L {star.x - 11} {star.y -
            3} L {star.x - 3.5} {star.y - 3.5} Z"
          fill={hit ? '#16a34a' : '#facc15'}
          stroke="#854d0e"
        />
      {/if}

      {#each rays as ray (ray.k)}
        <!-- local normal -->
        {@const n = fromNormal(ray.at, beam === 'tia' ? 150 : 60, ray.tilt)}
        <line
          x1={ray.at.x}
          y1={ray.at.y}
          x2={n.x}
          y2={n.y}
          stroke="#64748b"
          stroke-width="1.3"
          stroke-dasharray="5 4"
        />
        <line
          x1={ray.from.x}
          y1={ray.from.y}
          x2={ray.at.x}
          y2={ray.at.y}
          stroke="#dc2626"
          stroke-width="2.5"
        />
        <line
          x1={ray.at.x}
          y1={ray.at.y}
          x2={ray.to.x}
          y2={ray.to.y}
          stroke="#ea580c"
          stroke-width="2.5"
        />
        {@const mid1 = { x: (ray.from.x + ray.at.x) / 2, y: (ray.from.y + ray.at.y) / 2 }}
        {@const mid2 = fromNormal(ray.at, 80, reflectOnFacet(inc, ray.tilt).out)}
        <path d={head(mid1, 180 - inc)} fill="none" stroke="#dc2626" stroke-width="2.2" />
        <path
          d={head(mid2, reflectOnFacet(inc, ray.tilt).out)}
          fill="none"
          stroke="#ea580c"
          stroke-width="2.2"
        />
      {/each}

      {#if beam === 'tia'}
        {@const r = reflectOnFacet(inc, tilts[2])}
        {@const [a1, b1] = between(-inc, tilts[2])}
        {@const [a2, b2] = between(tilts[2], r.out)}
        <path d={arc(I, a1, b1, 46)} fill="none" stroke="#dc2626" stroke-width="2" />
        <path d={arc(I, a2, b2, 56)} fill="none" stroke="#ea580c" stroke-width="2" />
        {@const l1 = fromNormal(I, 68, (a1 + b1) / 2)}
        {@const l2 = fromNormal(I, 78, (a2 + b2) / 2)}
        <text x={l1.x} y={l1.y} text-anchor="middle" class="fill-red-700 text-[17px] font-semibold"
          >{deg(r.incidence)}</text
        >
        <text
          x={l2.x}
          y={l2.y}
          text-anchor="middle"
          class="fill-orange-700 text-[17px] font-semibold">{deg(r.reflection)}</text
        >
        {@const nTip = fromNormal(I, 156, tilts[2])}
        <text x={nTip.x + 6} y={nTip.y} class="fill-slate-600 text-[17px] italic">N</text>
        <text x={I.x + 6} y={I.y + 22} class="fill-slate-700 text-[17px] font-semibold">I</text>
        <text
          x={laser.x - 4}
          y={laser.y - 14}
          text-anchor="end"
          class="fill-red-700 text-[17px] font-semibold">S</text
        >
        {@const rTip = fromNormal(I, R - 14, r.out)}
        <text x={rTip.x + 8} y={rTip.y + 16} class="fill-orange-700 text-[17px] font-semibold"
          >R</text
        >
      {/if}

      <!-- laser handle -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đèn laser: kéo theo vòng tròn hoặc dùng phím mũi tên để đổi góc tới"
        aria-valuemin="0"
        aria-valuemax={MAX_I}
        aria-valuenow={inc}
        aria-valuetext="góc tới {deg(inc)}"
        style="cursor:grab; outline:none"
        use:draggable={laserDrag}
      >
        <rect
          class="drag-knob"
          x={laser.x - 16}
          y={laser.y - 7}
          width="32"
          height="14"
          rx="4"
          fill="#1f2937"
          stroke="#fff"
          stroke-width="1.5"
          transform="rotate({90 - inc} {laser.x} {laser.y})"
        />
      </g>
    </svg>
  </figure>

  {#if showTarget}
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.quiet}
        onclick={() => (targetAt = (targetAt + 1) % TARGETS.length)}>Đổi vị trí ngôi sao</button
      >
    </div>
  {/if}

  <FeedbackNote tone={hit ? 'ok' : rough ? 'warn' : 'info'} text={status} />
</div>
