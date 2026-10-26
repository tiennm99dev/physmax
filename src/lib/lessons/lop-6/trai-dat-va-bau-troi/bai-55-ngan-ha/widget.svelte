<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    LOG_MAX,
    LOG_MIN,
    STOPS,
    distanceText,
    durationText,
    kmAt,
    kmFromLy,
    lightSeconds,
    nextStop,
    posOf,
    sceneAt,
    stopsPassed,
  } from './engine.js';

  const W = 360;
  const SH = 220;
  const RH = 78;
  const RX0 = 14;
  const RX1 = W - 14;
  const AXIS_Y = 30;

  /** @param {number} km */
  const rx = (km) => RX0 + ((Math.log10(km) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (RX1 - RX0);

  const TICKS = [
    { km: 1e6, label: '1 triệu km' },
    { km: 1e9, label: '1 tỉ km' },
    { km: kmFromLy(1), label: '1 năm AS' },
    { km: kmFromLy(1000), label: '' },
    { km: kmFromLy(1e6), label: '1 triệu năm AS' },
  ];

  // Four spiral arms of dots for the galaxy pictures.
  const ARMS = Array.from({ length: 4 }, (_, k) =>
    Array.from({ length: 26 }, (_, i) => {
      const t = i / 25;
      const r = 8 + 82 * t;
      const a = (k * Math.PI) / 2 + 4.2 * t;
      return { x: r * Math.cos(a), y: r * Math.sin(a) * 0.8, s: 2.6 - 1.4 * t };
    }),
  );
  // Where the Solar System sits: about half-way out, on an arm.
  const SUN_IN_GALAXY = ARMS[1][13];

  const FIELD = [
    [30, 40],
    [70, 150],
    [110, 60],
    [150, 190],
    [200, 30],
    [250, 120],
    [290, 70],
    [330, 170],
    [60, 100],
    [310, 25],
    [230, 190],
    [130, 120],
  ];

  let pos = $state(0);
  /** Exact distance of the stop last jumped to, shown while the slider stays there. */
  /** @type {number | null} */
  let exact = $state(null);

  /** @param {number} p */
  const kmFor = (p) => (exact !== null && posOf(exact) === p ? exact : kmAt(p));
  const km = $derived(kmFor(pos));
  const scene = $derived(sceneAt(km));
  const passed = $derived(stopsPassed(km));
  const next = $derived(nextStop(km));
  const last = $derived(passed.at(-1) ?? null);

  /** @param {number} p */
  function goTo(p) {
    pos = Math.min(1000, Math.max(0, p));
  }
  /** @param {import('./engine.js').Stop | null} stop */
  function jump(stop) {
    exact = stop ? stop.km : null;
    goTo(stop ? posOf(stop.km) : 0);
  }
  function forward() {
    if (next) jump(next);
  }
  function back() {
    const before = passed.filter((s) => posOf(s.km) < pos);
    jump(before.at(-1) ?? null);
  }

  /** @type {Record<import('./engine.js').Scene, string>} */
  const SCENE_TEXT = {
    'trai-dat-mat-trang': 'Trái Đất và Mặt Trăng',
    'he-mat-troi': 'Hệ Mặt Trời: Mặt Trời và quỹ đạo các hành tinh',
    'cac-sao':
      'Các ngôi sao gần Mặt Trời: mỗi chấm là một ngôi sao, Mặt Trời chỉ là một trong số đó',
    'ngan-ha': 'Ngân Hà nhìn từ bên ngoài: hình xoắn ốc, Hệ Mặt Trời nằm ở rìa một nhánh',
    'thien-ha': 'Ngân Hà và thiên hà Tiên Nữ: mỗi thiên hà có hàng trăm tỉ ngôi sao',
  };

  const status = $derived(
    `Đang cách Trái Đất khoảng ${distanceText(km)}; ánh sáng đi quãng đường này mất ${durationText(lightSeconds(km))}. ${
      last ? `Đã tới: ${last.name} (${last.note}).` : 'Chưa tới điểm dừng nào.'
    } ${next ? `Tiếp theo: ${next.name}, cách Trái Đất ${distanceText(next.km)}.` : 'Đây là điểm xa nhất của chuyến đi.'}`,
  );
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg viewBox="0 0 {W} {SH}" class="w-full" role="img" aria-label={SCENE_TEXT[scene]}>
      <rect width={W} height={SH} fill="#020617" />
      {#if scene === 'trai-dat-mat-trang'}
        <circle cx="70" cy={SH / 2} r="34" fill="#3b82f6" />
        <path d="M 52 96 q 12 -14 26 -4 q 6 12 -8 20 z" fill="#22c55e" />
        <circle cx="300" cy={SH / 2} r="9" fill="#cbd5e1" />
        <line x1="106" y1={SH / 2} x2="288" y2={SH / 2} stroke="#94a3b8" stroke-dasharray="4 5" />
        <text x="197" y={SH / 2 - 10} fill="#e2e8f0" font-size="12" text-anchor="middle"
          >384 400 km · 1,3 giây ánh sáng</text
        >
        <text x="70" y={SH / 2 + 52} fill="#e2e8f0" font-size="12" text-anchor="middle"
          >Trái Đất</text
        >
        <text x="300" y={SH / 2 + 26} fill="#e2e8f0" font-size="12" text-anchor="middle"
          >Mặt Trăng</text
        >
      {:else if scene === 'he-mat-troi'}
        {#each [16, 24, 32, 44, 70, 88, 104, 118] as r (r)}
          <ellipse cx={W / 2} cy={SH / 2} rx={r * 1.4} ry={r * 0.8} fill="none" stroke="#334155" />
        {/each}
        <circle cx={W / 2} cy={SH / 2} r="9" fill="#facc15" />
        <circle cx={W / 2 + 44 * 1.4} cy={SH / 2} r="3" fill="#3b82f6" />
        <text x={W / 2 + 44 * 1.4 + 6} y={SH / 2 - 6} fill="#e2e8f0" font-size="11">Trái Đất</text>
        <circle cx={W / 2 - 118 * 1.4} cy={SH / 2} r="3" fill="#6366f1" />
        <text x={W / 2 - 118 * 1.4 + 4} y={SH / 2 - 8} fill="#e2e8f0" font-size="11"
          >Hải Vương tinh</text
        >
      {:else if scene === 'cac-sao'}
        {#each FIELD as [x, y] (`${x}-${y}`)}
          <circle cx={x} cy={y} r="2" fill="#f8fafc" />
        {/each}
        <circle cx={W / 2} cy={SH / 2} r="4" fill="#facc15" />
        <text x={W / 2 + 8} y={SH / 2 + 4} fill="#fde68a" font-size="11">Mặt Trời</text>
        <circle cx={W / 2 - 40} cy={SH / 2 + 24} r="2.6" fill="#fca5a5" />
        <text x={W / 2 - 46} y={SH / 2 + 40} fill="#fecaca" font-size="11" text-anchor="middle"
          >Cận Tinh</text
        >
        <circle cx={W / 2 + 92} cy={SH / 2 - 60} r="3" fill="#e0f2fe" />
        <text x={W / 2 + 92} y={SH / 2 - 68} fill="#e0f2fe" font-size="11" text-anchor="middle"
          >Ngưu Lang</text
        >
      {:else}
        {@const gx = scene === 'ngan-ha' ? W / 2 : 90}
        {@const k = scene === 'ngan-ha' ? 1 : 0.55}
        <g transform="translate({gx} {SH / 2}) scale({k})">
          <ellipse rx="22" ry="16" fill="#fde68a" fill-opacity="0.8" />
          {#each ARMS as arm, a (a)}
            {#each arm as d, i (i)}
              <circle cx={d.x} cy={d.y} r={d.s} fill="#c7d2fe" fill-opacity="0.75" />
            {/each}
          {/each}
          {#if scene === 'ngan-ha'}
            <circle cx={SUN_IN_GALAXY.x} cy={SUN_IN_GALAXY.y} r="4" fill="#f97316" />
          {/if}
        </g>
        {#if scene === 'ngan-ha'}
          <text
            x={W / 2 + SUN_IN_GALAXY.x}
            y={SH / 2 + SUN_IN_GALAXY.y - 8}
            fill="#fdba74"
            font-size="11"
            text-anchor="middle">Hệ Mặt Trời ở đây</text
          >
          <text x={W / 2} y={SH - 8} fill="#e2e8f0" font-size="11" text-anchor="middle"
            >Đường kính khoảng 100 000 năm ánh sáng</text
          >
        {:else}
          <text x="90" y={SH - 14} fill="#e2e8f0" font-size="11" text-anchor="middle">Ngân Hà</text>
          <ellipse
            cx="285"
            cy={SH / 2}
            rx="58"
            ry="20"
            fill="#c7d2fe"
            fill-opacity="0.5"
            transform="rotate(-25 285 {SH / 2})"
          />
          <ellipse cx="285" cy={SH / 2} rx="12" ry="7" fill="#fde68a" fill-opacity="0.8" />
          <text x="285" y={SH - 14} fill="#e2e8f0" font-size="11" text-anchor="middle"
            >Thiên hà Tiên Nữ</text
          >
          <line x1="140" y1={SH / 2} x2="222" y2={SH / 2} stroke="#94a3b8" stroke-dasharray="4 5" />
          <text x="181" y={SH / 2 - 8} fill="#e2e8f0" font-size="10" text-anchor="middle"
            >2,5 triệu năm AS</text
          >
        {/if}
      {/if}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">{SCENE_TEXT[scene]}.</figcaption>
  </figure>

  <SliderField
    label="Bay ra xa Trái Đất"
    bind:value={pos}
    min={0}
    max={1000}
    format={(v) => distanceText(kmFor(v))}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {RH}"
      class="w-full"
      role="img"
      aria-label="Thước đo khoảng cách không đều, mỗi vạch lớn gấp hàng nghìn lần vạch trước"
    >
      {#each TICKS as t, i (t.km)}
        <line x1={rx(t.km)} y1={AXIS_Y - 6} x2={rx(t.km)} y2={AXIS_Y + 6} stroke="#64748b" />
        {#if t.label}
          <text
            x={i === TICKS.length - 1 ? RX1 + 10 : rx(t.km)}
            y={AXIS_Y + 20}
            fill="#475569"
            font-size="9"
            text-anchor={i === TICKS.length - 1 ? 'end' : 'middle'}>{t.label}</text
          >
        {/if}
      {/each}
      <line x1={RX0} y1={AXIS_Y} x2={RX1} y2={AXIS_Y} stroke="#64748b" stroke-width="2" />
      <rect x={RX0} y={AXIS_Y - 3} width={Math.max(0, rx(km) - RX0)} height="6" fill="#fdba74" />
      {#each STOPS as s, i (s.id)}
        <circle
          cx={rx(s.km)}
          cy={AXIS_Y}
          r="4"
          fill={s.km <= km * 1.005 ? '#f97316' : '#fff'}
          stroke="#f97316"
          stroke-width="1.5"
        />
        <text
          x={rx(s.km)}
          y={AXIS_Y + (i % 2 ? 44 : -10)}
          fill="#9a3412"
          font-size="9"
          text-anchor="middle">{i + 1}</text
        >
      {/each}
      <path d="M {rx(km)} {AXIS_Y - 8} l -6 -10 h 12 z" fill="#ea580c" />
    </svg>
    <figcaption class="px-2 text-xs text-slate-600">
      Thước đo không đều: mỗi vạch lớn gấp hàng nghìn lần vạch trước (năm AS là năm ánh sáng). Các
      số là điểm dừng trong danh sách dưới đây.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={back} disabled={pos === 0}>Lùi lại</button>
    <button type="button" class={button.primary} onclick={forward} disabled={!next}
      >Tới điểm dừng tiếp theo</button
    >
    <button type="button" class={button.quiet} onclick={() => jump(null)}>Về gần Trái Đất</button>
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {status}
  </p>

  <ol class="{card} space-y-1 p-3 text-sm">
    {#each STOPS as s, i (s.id)}
      {@const done = s.km <= km * 1.005}
      <li
        class="flex flex-wrap justify-between gap-x-3 {done ? 'text-slate-800' : 'text-slate-400'}"
      >
        <span><span class="font-semibold">{i + 1}. {s.name}</span>: {s.note}</span>
        <span class="tabular-nums"
          >{distanceText(s.km)} · ánh sáng đi {durationText(lightSeconds(s.km))}</span
        >
      </li>
    {/each}
  </ol>
</div>
