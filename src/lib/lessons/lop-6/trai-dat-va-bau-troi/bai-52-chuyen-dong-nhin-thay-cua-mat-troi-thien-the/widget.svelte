<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    DEG_PER_HOUR,
    MOMENT_TEXT,
    PLACES,
    clockText,
    hourAt,
    isDay,
    momentOf,
    placeAngle,
    skyPosition,
    spinFor,
    wrap360,
  } from './engine.js';

  // Globe picture, seen from above the North Pole; the Sun shines from the left.
  const VW = 360;
  const VH = 260;
  const CX = 220;
  const CY = 130;
  const R = 92;
  const PIN_R = R - 14;
  const RAYS = [50, 90, 130, 170, 210];
  const MERIDIANS = Array.from({ length: 12 }, (_, i) => i * 30);

  // Sky picture.
  const SW = 360;
  const SH = 170;
  const GROUND = 138;
  const EAST_X = 40;
  const WEST_X = 320;
  const TOP = 110;
  const STARS = [
    [40, 30],
    [90, 55],
    [130, 22],
    [180, 45],
    [215, 18],
    [260, 60],
    [300, 28],
    [330, 70],
    [70, 95],
    [240, 100],
  ];

  let placeId = $state('viet-nam');
  const place = $derived(PLACES.find((p) => p.id === placeId) ?? PLACES[0]);
  // Start with Việt Nam just before sunrise.
  let spin = $state(spinFor(105, 5));
  let playing = $state(false);

  const hour = $derived(hourAt(placeAngle(spin, place.lon)));
  const moment = $derived(momentOf(hour));
  const sun = $derived(skyPosition(hour));
  const others = $derived(
    PLACES.map((p) => {
      const h = hourAt(placeAngle(spin, p.lon));
      return { ...p, hour: h, day: isDay(h) };
    }),
  );

  /** @param {number} angle @param {number} r */
  const at = (angle, r) => {
    const t = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(t), y: CY - r * Math.sin(t) };
  };

  const pin = $derived(at(placeAngle(spin, place.lon), PIN_R));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} next */
  function setSpin(next) {
    spin = wrap360(Math.round(next));
  }

  /** @param {number} hours */
  function turn(hours) {
    setSpin(spin + hours * DEG_PER_HOUR);
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => {
      playing = false;
      const angle = (Math.atan2(-(scratch.y - CY), scratch.x - CX) * 180) / Math.PI;
      setSpin(angle - place.lon);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      playing = false;
      const dir = dx !== 0 ? dx : -dy;
      turn(dir * (big ? 6 : 1));
    },
  });

  $effect(() => {
    if (!playing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const id = setInterval(() => turn(1), 600);
      return () => clearInterval(id);
    }
    let frame = 0;
    let last = performance.now();
    /** @param {number} now */
    const tick = (now) => {
      // Two hours of Earth's spin per second of animation.
      spin = wrap360(spin + ((now - last) / 1000) * 2 * DEG_PER_HOUR);
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  const sky = $derived(
    moment === 'dem' ? '#1e293b' : moment === 'moc' || moment === 'lan' ? '#fdba74' : '#bae6fd',
  );
  const sunXY = $derived(
    sun ? { x: EAST_X + (WEST_X - EAST_X) * sun.across, y: GROUND - TOP * sun.up } : null,
  );
  const arcPath = `M ${EAST_X} ${GROUND} Q ${(EAST_X + WEST_X) / 2} ${GROUND - 2 * TOP} ${WEST_X} ${GROUND}`;

  // Announce once per whole hour so a running animation does not flood readers.
  const shownHour = $derived(Math.floor(hour));
  const status = $derived(
    `Ở ${place.name} (${place.lonText}) đang là khoảng ${clockText(shownHour)} theo giờ Mặt Trời: ${MOMENT_TEXT[momentOf(shownHour)]}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Theo dõi nơi"
    options={PLACES.map((p) => ({ value: p.id, label: p.name }))}
    bind:value={placeId}
  />

  <div class="grid gap-3 md:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="w-full touch-none select-none"
        role="group"
        aria-label="Trái Đất nhìn từ phía trên cực Bắc, Mặt Trời chiếu sáng từ bên trái"
      >
        <rect width={VW} height={VH} fill="#0f172a" />
        <circle cx="-40" cy={CY} r="80" fill="#facc15" />
        <text x="6" y="24" fill="#fde68a" font-size="13" font-weight="700">Mặt Trời</text>
        {#each RAYS as y (y)}
          <line x1="48" y1={y} x2="112" y2={y} stroke="#fde68a" stroke-width="2" />
          <path d="M 112 {y} l -8 -4 v 8 z" fill="#fde68a" />
        {/each}

        <circle cx={CX} cy={CY} r={R} fill="#1e3a5f" />
        <path d="M {CX} {CY - R} A {R} {R} 0 0 0 {CX} {CY + R} Z" fill="#38bdf8" />
        {#each MERIDIANS as m (m)}
          {@const p = at(m + spin, R)}
          <line
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="#e2e8f0"
            stroke-opacity="0.35"
            stroke-width="1"
          />
        {/each}
        <circle cx={CX} cy={CY} r="4" fill="#f8fafc" />
        <text x={CX + 6} y={CY + 16} fill="#f8fafc" font-size="10">Cực Bắc</text>
        <text x={CX - R + 6} y={CY - R - 6} fill="#7dd3fc" font-size="12" font-weight="700"
          >Ngày</text
        >
        <text x={CX + R - 34} y={CY - R - 6} fill="#94a3b8" font-size="12" font-weight="700"
          >Đêm</text
        >

        <path
          d="M {CX + R + 10} {CY + 40} A {R + 10} {R + 10} 0 0 0 {CX + R + 10} {CY - 40}"
          fill="none"
          stroke="#f8fafc"
          stroke-width="2"
        />
        <path d="M {CX + R + 10} {CY - 46} l -5 9 h 10 z" fill="#f8fafc" />

        {#each others.filter((p) => p.id !== placeId) as p (p.id)}
          {@const q = at(placeAngle(spin, p.lon), PIN_R)}
          <circle cx={q.x} cy={q.y} r="4" fill="#cbd5e1" />
          <text x={q.x + 6} y={q.y - 6} fill="#e2e8f0" font-size="10">{p.name}</text>
        {/each}

        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Quay Trái Đất: kéo {place.name} quanh tâm, hoặc dùng phím mũi tên (mỗi lần 1 giờ, giữ Shift 6 giờ)"
          aria-valuemin={0}
          aria-valuemax={24}
          aria-valuenow={Math.round(hour * 10) / 10}
          aria-valuetext="{place.name}: {clockText(hour)}, {isDay(hour) ? 'ban ngày' : 'ban đêm'}"
          style="cursor:grab; outline:none"
          use:draggable={drag}
        >
          <circle
            class="drag-knob"
            cx={pin.x}
            cy={pin.y}
            r="9"
            fill="#f97316"
            stroke="#fff"
            stroke-width="3"
          />
        </g>
        <text
          x={pin.x}
          y={pin.y + (pin.y > CY ? 24 : -14)}
          text-anchor="middle"
          fill="#fed7aa"
          font-size="12"
          font-weight="700">{place.name}</text
        >
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kéo chấm cam để quay Trái Đất. Mũi tên trắng: chiều tự quay, ngược chiều kim đồng hồ khi
        nhìn từ cực Bắc, tức là từ tây sang đông.
      </figcaption>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 {SW} {SH}"
        class="w-full"
        role="img"
        aria-label="Bầu trời {place.name} lúc {clockText(hour)}: {sun
          ? 'có Mặt Trời'
          : 'không thấy Mặt Trời'}"
      >
        <rect width={SW} height={SH} fill={sky} />
        {#if !sun}
          {#each STARS as [x, y] (`${x}-${y}`)}
            <circle cx={x} cy={y} r="1.6" fill="#f8fafc" />
          {/each}
        {/if}
        <path
          d={arcPath}
          fill="none"
          stroke={sun ? '#0369a1' : '#64748b'}
          stroke-dasharray="4 5"
          stroke-width="1.5"
        />
        {#if sunXY}
          <circle
            cx={sunXY.x}
            cy={sunXY.y}
            r="14"
            fill="#facc15"
            stroke="#f59e0b"
            stroke-width="3"
          />
        {/if}
        <rect y={GROUND} width={SW} height={SH - GROUND} fill="#4d7c0f" />
        <circle cx={SW / 2} cy={GROUND - 22} r="5" fill="#0f172a" />
        <line
          x1={SW / 2}
          y1={GROUND - 17}
          x2={SW / 2}
          y2={GROUND - 4}
          stroke="#0f172a"
          stroke-width="3"
        />
        <text x="10" y={GROUND + 20} fill="#f7fee7" font-size="13" font-weight="700">Đông</text>
        <text
          x={SW - 10}
          y={GROUND + 20}
          fill="#f7fee7"
          font-size="13"
          font-weight="700"
          text-anchor="end">Tây</text
        >
        <text x={SW / 2} y={GROUND + 20} fill="#f7fee7" font-size="11" text-anchor="middle"
          >Nam</text
        >
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Bầu trời {place.name}, người quan sát quay mặt về phía nam: bên trái là phía đông, bên phải
        là phía tây.
      </figcaption>
    </figure>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (playing = !playing)}>
      {playing ? 'Dừng lại' : 'Cho Trái Đất tự quay'}
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        playing = false;
        turn(-1);
      }}>Lùi 1 giờ</button
    >
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        playing = false;
        turn(1);
      }}>Thêm 1 giờ</button
    >
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {status}
  </p>

  <div class="{card} overflow-x-auto p-3">
    <table class="w-full text-sm">
      <caption class="mb-2 text-left font-semibold text-slate-700"
        >Cùng một lúc trên Trái Đất (giờ Mặt Trời)</caption
      >
      <thead>
        <tr class="text-left text-slate-500">
          <th class="py-1 pr-2 font-medium">Nơi</th>
          <th class="py-1 pr-2 font-medium">Giờ</th>
          <th class="py-1 font-medium">Ngày hay đêm</th>
        </tr>
      </thead>
      <tbody>
        {#each others as p (p.id)}
          <tr
            class="border-t border-slate-100 {p.id === placeId
              ? 'font-semibold text-orange-700'
              : ''}"
          >
            <td class="py-1 pr-2">{p.name}</td>
            <td class="py-1 pr-2 tabular-nums">{clockText(Math.floor(p.hour))}</td>
            <td class="py-1">{p.day ? 'Ban ngày' : 'Ban đêm'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
