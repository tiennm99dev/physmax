<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { DIRECTIONS, bearingOf, directionName, isAligned, norm, screenAngle } from './engine.js';

  const W = 480;
  const H = 350;
  const C = { x: 240, y: 175 };
  const R = 92;

  /** Each round: where geographic North lies on the map and one landmark. */
  const ROUNDS = [
    { north: 30, screen: 165, name: 'Cổng trường' },
    { north: 300, screen: 30, name: 'Thư viện' },
    { north: 200, screen: 65, name: 'Nhà thể chất' },
    { north: 110, screen: 20, name: 'Vườn trường' },
    { north: 0, screen: 315, name: 'Căng tin' },
  ];

  let round = $state(0);
  let dial = $state(0);
  /** @type {string | null} */
  let answer = $state(null);
  const knob = $state(polar(R, 0));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const r = $derived(ROUNDS[round]);
  const aligned = $derived(isAligned(dial, r.north));
  const lm = $derived(polar(140, r.screen));
  const truth = $derived(directionName(bearingOf(r.screen, r.north)));

  /** @param {number} radius @param {number} angle clockwise from the top */
  function polar(radius, angle) {
    const t = (angle * Math.PI) / 180;
    return { x: C.x + radius * Math.sin(t), y: C.y - radius * Math.cos(t) };
  }

  /** @param {number} a */
  function setDial(a) {
    dial = norm(a);
    const p = polar(R, dial);
    knob.x = p.x;
    knob.y = p.y;
  }

  const drag = $derived({
    point: knob,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      dial = screenAngle(C, p, 5);
      return polar(R, dial);
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const dir = dx !== 0 ? dx : dy;
      setDial(dial + dir * (big ? 15 : 5));
    },
  });

  function next() {
    round = (round + 1) % ROUNDS.length;
    answer = null;
    setDial(0);
  }

  const dialMarks = [
    { a: 0, t: 'N' },
    { a: 90, t: 'E' },
    { a: 180, t: 'S' },
    { a: 270, t: 'W' },
  ];

  const status = $derived.by(() => {
    if (answer) {
      if (!aligned) {
        return 'Hãy xoay vỏ la bàn cho vạch N trùng với đầu đỏ của kim trước, rồi mới đọc hướng.';
      }
      return answer === truth
        ? `Đúng! ${r.name} nằm ở hướng ${truth}.`
        : `Chưa đúng. Nhìn xem ${r.name} nằm gần vạch nào trên mặt la bàn (N là Bắc, E là Đông, S là Nam, W là Tây).`;
    }
    if (aligned) {
      return `Vạch N đã trùng với đầu đỏ (cực Bắc) của kim. Bây giờ ${r.name} nằm ở hướng nào?`;
    }
    return 'Kim nam châm luôn chỉ hướng Bắc – Nam. Kéo nút tròn trên vỏ la bàn (hoặc dùng phím mũi tên) để vạch N trùng với đầu đỏ của kim.';
  });
  const tone = $derived(answer ? (aligned && answer === truth ? 'ok' : 'warn') : 'info');
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="La bàn đặt trên bản đồ sân trường. {status}"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f0fdf4" />

      <!-- landmark -->
      <g aria-hidden="true">
        <rect x={lm.x - 13} y={lm.y - 13} width="26" height="26" rx="5" fill="#f59e0b" />
        <text
          x={lm.x}
          y={lm.y + (lm.y < C.y ? -20 : 32)}
          text-anchor="middle"
          class="fill-slate-800 text-[16px] font-semibold">{r.name}</text
        >
      </g>

      <!-- compass case and rotating dial -->
      <circle cx={C.x} cy={C.y} r={R + 14} fill="#e2e8f0" stroke="#475569" stroke-width="2" />
      <g transform="rotate({dial} {C.x} {C.y})" aria-hidden="true">
        <circle cx={C.x} cy={C.y} r={R} fill="#fff" stroke="#94a3b8" />
        {#each Array.from({ length: 72 }, (_, k) => k * 5) as a (a)}
          {@const o = polar(R, a)}
          {@const i = polar(a % 45 === 0 ? R - 12 : R - 6, a)}
          <line x1={o.x} y1={o.y} x2={i.x} y2={i.y} stroke="#64748b" />
        {/each}
        {#each dialMarks as m (m.a)}
          {@const p = polar(R - 26, m.a)}
          <text
            x={p.x}
            y={p.y + 7}
            text-anchor="middle"
            transform="rotate({m.a} {p.x} {p.y})"
            class="text-[20px] font-bold {m.t === 'N' ? 'fill-red-700' : 'fill-slate-700'}"
            >{m.t}</text
          >
        {/each}
      </g>

      <!-- needle: red end points to geographic North -->
      <g transform="rotate({r.north} {C.x} {C.y})" aria-hidden="true">
        <path d="M {C.x} {C.y - 62} L {C.x + 9} {C.y} L {C.x - 9} {C.y} Z" fill="#dc2626" />
        <path d="M {C.x} {C.y + 62} L {C.x + 9} {C.y} L {C.x - 9} {C.y} Z" fill="#2563eb" />
        <circle cx={C.x} cy={C.y} r="5" fill="#0f172a" />
      </g>

      <!-- dial knob -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Vỏ la bàn: kéo nút hoặc dùng phím mũi tên để xoay vạch N"
        aria-valuemin="0"
        aria-valuemax="355"
        aria-valuenow={dial}
        aria-valuetext={aligned
          ? 'vạch N trùng với đầu đỏ của kim'
          : 'vạch N chưa trùng với đầu đỏ của kim'}
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={knob.x}
          cy={knob.y}
          r="11"
          fill={aligned ? '#16a34a' : '#0f172a'}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>
  </figure>

  <div role="group" aria-label="{r.name} nằm ở hướng nào?" class="flex flex-wrap gap-2">
    {#each DIRECTIONS as d (d)}
      <button
        type="button"
        class={answer === d ? button.primary : button.quiet}
        aria-pressed={answer === d}
        onclick={() => (answer = d)}>{d}</button
      >
    {/each}
  </div>

  <FeedbackNote {tone} text={status} />

  <button type="button" class={button.secondary} onclick={next}>Đổi vị trí khác</button>
</div>
