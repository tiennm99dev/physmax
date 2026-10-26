<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    CYCLE_DAYS,
    ageDays,
    isWaxing,
    litFraction,
    litPath,
    lunarDay,
    phaseFromPosition,
    phaseName,
    phaseOf,
    positionFromPhase,
    wrap360,
  } from './engine.js';

  const VW = 360;
  const VH = 280;
  const CX = 215;
  const CY = 140;
  const ORBIT = 100;
  const EARTH_R = 22;
  const MOON_R = 13;
  const RAYS = [40, 85, 130, 175, 220, 255];
  const DAY_DEG = 360 / CYCLE_DAYS;

  /** @type {import('./engine.js').PhaseId[]} */
  const TASKS = [
    'tron',
    'ban-nguyet-dau',
    'luoi-liem-cuoi',
    'khong-trang',
    'khuyet-dau',
    'ban-nguyet-cuoi',
  ];

  let phase = $state(40);
  let taskIndex = $state(0);
  /** @type {null | { ok: boolean, text: string }} */
  let verdict = $state(null);

  const seen = $derived(phaseOf(phase));
  const age = $derived(ageDays(phase));
  const lit = $derived(litFraction(phase));
  const target = $derived(TASKS[taskIndex]);

  /** @param {number} angle @param {number} r */
  const at = (angle, r) => {
    const t = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(t), y: CY - r * Math.sin(t) };
  };

  /** Arrowhead on the orbit at `deg`, pointing the way the Moon travels. @param {number} deg */
  const orbitArrow = (deg) => {
    const p = at(deg, ORBIT);
    const t = (deg * Math.PI) / 180;
    const tx = -Math.sin(t);
    const ty = -Math.cos(t);
    const nx = Math.cos(t);
    const ny = -Math.sin(t);
    const tip = { x: p.x + 7 * tx, y: p.y + 7 * ty };
    const b1 = { x: p.x - 5 * tx + 6 * nx, y: p.y - 5 * ty + 6 * ny };
    const b2 = { x: p.x - 5 * tx - 6 * nx, y: p.y - 5 * ty - 6 * ny };
    return `M ${tip.x} ${tip.y} L ${b1.x} ${b1.y} L ${b2.x} ${b2.y} Z`;
  };

  const moon = $derived(at(positionFromPhase(phase), ORBIT));
  // The half of the Moon that faces the Earth, outlined in orange.
  const nearHalf = $derived.by(() => {
    const dx = CX - moon.x;
    const dy = CY - moon.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const a = { x: moon.x - uy * MOON_R, y: moon.y + ux * MOON_R };
    const b = { x: moon.x + uy * MOON_R, y: moon.y - ux * MOON_R };
    return `M ${a.x} ${a.y} A ${MOON_R} ${MOON_R} 0 0 0 ${b.x} ${b.y}`;
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} p */
  function setPhase(p) {
    phase = wrap360(Math.round(p * 10) / 10);
    verdict = null;
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => {
      const angle = (Math.atan2(-(scratch.y - CY), scratch.x - CX) * 180) / Math.PI;
      setPhase(phaseFromPosition(angle));
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const dir = dx !== 0 ? dx : -dy;
      setPhase(phase + dir * (big ? 7 : 1) * DAY_DEG);
    },
  });

  function check() {
    const ok = seen.id === target;
    verdict = ok
      ? { ok, text: `Đúng rồi! Đây là ${phaseName(target).toLowerCase()}.` }
      : {
          ok,
          text: `Chưa đúng: Mặt Trăng ở vị trí này cho ta thấy ${seen.name.toLowerCase()}. ${hintFor(target)}`,
        };
  }

  /** @param {import('./engine.js').PhaseId} id */
  function hintFor(id) {
    switch (id) {
      case 'tron':
        return 'Gợi ý: Trái Đất phải nằm giữa Mặt Trời và Mặt Trăng.';
      case 'khong-trang':
        return 'Gợi ý: Mặt Trăng phải nằm giữa Trái Đất và Mặt Trời, cùng phía với Mặt Trời.';
      case 'ban-nguyet-dau':
      case 'ban-nguyet-cuoi':
        return 'Gợi ý: đường nối Trái Đất với Mặt Trăng vuông góc với đường nối Trái Đất với Mặt Trời; đầu tháng hay cuối tháng tuỳ Mặt Trăng ở nửa nào của quỹ đạo.';
      default:
        return 'Gợi ý: Mặt Trăng đi ngược chiều kim đồng hồ, bắt đầu từ vị trí không trăng (gần Mặt Trời).';
    }
  }

  function nextTask() {
    taskIndex = (taskIndex + 1) % TASKS.length;
    verdict = null;
  }

  const status = $derived(
    `${seen.name}. Đã khoảng ${formatNumber(age, 1)} ngày kể từ lúc không trăng (khoảng ngày ${lunarDay(phase)} âm lịch); phần sáng nhìn thấy chiếm khoảng ${Math.round(lit * 100)}% mặt trăng${lit > 0.01 && lit < 0.99 ? (isWaxing(phase) ? ', sáng ở bên phải' : ', sáng ở bên trái') : ''}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="w-full touch-none select-none"
        role="group"
        aria-label="Mặt Trăng chuyển động quanh Trái Đất, nhìn từ phía trên cực Bắc; Mặt Trời chiếu sáng từ bên trái"
      >
        <rect width={VW} height={VH} fill="#0f172a" />
        <circle cx="-40" cy={CY} r="70" fill="#facc15" />
        <text x="6" y="22" fill="#fde68a" font-size="13" font-weight="700">Mặt Trời</text>
        {#each RAYS as y (y)}
          <line
            x1="40"
            y1={y}
            x2="92"
            y2={y}
            stroke="#fde68a"
            stroke-width="2"
            stroke-opacity="0.8"
          />
          <path d="M 92 {y} l -8 -4 v 8 z" fill="#fde68a" fill-opacity="0.8" />
        {/each}

        <circle
          cx={CX}
          cy={CY}
          r={ORBIT}
          fill="none"
          stroke="#475569"
          stroke-dasharray="4 5"
          stroke-width="1.5"
        />
        {#each [-45, 135] as deg (deg)}
          <path d={orbitArrow(deg)} fill="#94a3b8" />
        {/each}

        <circle cx={CX} cy={CY} r={EARTH_R} fill="#1e3a5f" />
        <path
          d="M {CX} {CY - EARTH_R} A {EARTH_R} {EARTH_R} 0 0 0 {CX} {CY + EARTH_R} Z"
          fill="#38bdf8"
        />
        <text x={CX} y={CY + EARTH_R + 14} fill="#e2e8f0" font-size="11" text-anchor="middle"
          >Trái Đất</text
        >

        <line
          x1={CX}
          y1={CY}
          x2={moon.x}
          y2={moon.y}
          stroke="#f97316"
          stroke-opacity="0.5"
          stroke-dasharray="3 4"
        />

        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Mặt Trăng: kéo quanh quỹ đạo, hoặc dùng phím mũi tên (mỗi lần 1 ngày, giữ Shift 7 ngày)"
          aria-valuemin={0}
          aria-valuemax={30}
          aria-valuenow={Math.round(age * 10) / 10}
          aria-valuetext="{seen.name}, khoảng ngày {lunarDay(phase)} âm lịch"
          style="cursor:grab; outline:none"
          use:draggable={drag}
        >
          <circle class="drag-knob" cx={moon.x} cy={moon.y} r={MOON_R} fill="#334155" />
          <path
            d="M {moon.x} {moon.y - MOON_R} A {MOON_R} {MOON_R} 0 0 0 {moon.x} {moon.y + MOON_R} Z"
            fill="#fef3c7"
          />
          <path d={nearHalf} fill="none" stroke="#f97316" stroke-width="3" />
        </g>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Nhìn từ phía trên cực Bắc. Kéo Mặt Trăng quanh Trái Đất. Nửa bên trái của Mặt Trăng luôn
        được Mặt Trời chiếu sáng; viền cam là nửa hướng về Trái Đất, nửa mà ta nhìn thấy.
      </figcaption>
    </figure>

    <figure class="{card} flex flex-col items-center justify-center gap-2 p-3">
      <svg
        viewBox="0 0 160 160"
        class="w-40 max-w-full"
        role="img"
        aria-label="Hình dạng Mặt Trăng nhìn từ Việt Nam: {seen.name}"
      >
        <rect width="160" height="160" rx="16" fill="#0f172a" />
        <circle cx="80" cy="80" r="56" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <path d={litPath(80, 80, 56, phase)} fill="#fef3c7" />
      </svg>
      <figcaption class="text-center">
        <span class="block text-xs text-slate-500">Nhìn từ Trái Đất (ở Việt Nam)</span>
        <span class="block text-base font-bold text-slate-800">{seen.name}</span>
        <span class="block text-sm tabular-nums text-slate-600"
          >Khoảng ngày {lunarDay(phase)} âm lịch</span
        >
      </figcaption>
    </figure>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => setPhase(phase + DAY_DEG)}
      >Thêm 1 ngày</button
    >
    <button type="button" class={button.quiet} onclick={() => setPhase(phase + 7 * DAY_DEG)}
      >Thêm 1 tuần</button
    >
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {status}
  </p>

  <div class="{card} space-y-3 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {taskIndex + 1}/{TASKS.length}: đặt Mặt Trăng vào vị trí để ở Trái Đất thấy
      <span class="text-indigo-700">{phaseName(target).toLowerCase()}</span>.
    </p>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
      <button type="button" class={button.secondary} onclick={nextTask}>Thử thách khác</button>
    </div>
    <p
      class="text-sm {verdict
        ? verdict.ok
          ? 'text-emerald-700'
          : 'text-rose-700'
        : 'text-slate-500'}"
      aria-live="polite"
    >
      {verdict ? verdict.text : 'Kéo Mặt Trăng rồi nhấn "Kiểm tra".'}
    </p>
  </div>
</div>
