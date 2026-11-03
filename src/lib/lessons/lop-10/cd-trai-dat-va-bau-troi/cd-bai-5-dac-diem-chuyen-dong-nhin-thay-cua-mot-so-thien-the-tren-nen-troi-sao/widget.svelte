<script>
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    PLANETS,
    ZODIAC,
    constellationAt,
    dateText,
    earthAngle,
    elongation,
    isRetrograde,
    maxElongation,
    moonLitPath,
    moonPhase,
    moonPosition,
    orbitAngle,
    planetById,
    seenFromEarth,
    splitRuns,
    sunLon,
    trail,
    visibilityOf,
    wrap180,
    wrap360,
  } from './engine.js';

  const LAST_DAY = 2190;
  const O = { x: 170, y: 170 };
  const AU = 100;
  const STRIP_W = 400;
  const STRIP_H = 150;
  const LAT_PX = 7;
  /** @type {Record<string, string>} */
  const COLOR = { thuy: '#0891b2', kim: '#7c3aed', hoa: '#dc2626' };

  let n = $state(0);
  let playing = $state(false);
  let picked = $state('kim');
  let view = $state('sun');

  const planet = $derived(planetById(picked));
  const sun = $derived(sunLon(n));
  const moon = $derived(moonPosition(n));
  const moonElong = $derived(elongation(moon.lon, n));
  const phase = $derived(moonPhase(moonElong));
  const seen = $derived(seenFromEarth(planet, n));
  const elong = $derived(elongation(seen.lon, n));
  const backward = $derived(isRetrograde(planet, n));

  /** @param {number} angle @param {number} radius */
  function atOrbit(angle, radius) {
    const a = (angle * Math.PI) / 180;
    return { x: O.x + radius * AU * Math.cos(a), y: O.y - radius * AU * Math.sin(a) };
  }

  const earth = $derived(atOrbit(earthAngle(n), 1));
  const bodies = $derived(PLANETS.map((p) => ({ ...p, at: atOrbit(orbitAngle(p, n), p.a) })));
  const moonDot = $derived.by(() => {
    const a = (moon.lon * Math.PI) / 180;
    return { x: earth.x + 13 * Math.cos(a), y: earth.y - 13 * Math.sin(a) };
  });
  const planetAt = $derived(atOrbit(orbitAngle(planet, n), planet.a));

  /**
   * East is on the left, as for someone looking south on the northern
   * hemisphere, so the ecliptic longitude grows leftward.
   * @param {number} lon
   */
  function stripX(lon) {
    const px = STRIP_W / 360;
    if (view === 'sun') return STRIP_W / 2 - wrap180(lon - sun) * px;
    return STRIP_W - wrap360(lon) * px;
  }

  /** @param {number} lat */
  const stripY = (lat) => STRIP_H / 2 - lat * LAT_PX;

  const sunX = $derived(stripX(sun));
  const trailRuns = $derived(
    splitRuns(
      trail(planet, n, 300, 3).map((p) => ({ x: stripX(p.lon), y: stripY(p.lat) })),
      STRIP_W / 2,
    ),
  );
  const zodiacLines = $derived(ZODIAC.map((z) => ({ name: z.name, x: stripX(z.from) })));
  const sunIn = $derived(constellationAt(sun));

  const planetText = $derived.by(() => {
    const side = elong > 0 ? 'phía Đông' : 'phía Tây';
    const angle = formatNumber(Math.abs(elong), 0);
    if (planet.a < 1) {
      const reach = formatNumber(maxElongation(planet), 0);
      const star =
        planet.id === 'kim'
          ? elong > 0
            ? ' Đây là lúc gọi là Sao Hôm.'
            : ' Đây là lúc gọi là Sao Mai.'
          : '';
      return `${planet.name} ở ${side} Mặt Trời ${angle}° (không vượt quá ${reach}° trong mô hình này), nên chỉ thấy gần lúc ${visibilityOf(elong)}.${star}`;
    }
    const going = backward
      ? 'đang đi giật lùi về phía Tây giữa các sao'
      : 'đang đi về phía Đông giữa các sao';
    return `${planet.name} cách Mặt Trời ${angle}° về ${side}, ${going}.`;
  });

  function togglePlay() {
    if (reducedMotion()) {
      n = (n + 10) % LAST_DAY;
      return;
    }
    playing = !playing;
  }

  $effect(() => {
    if (!playing) return;
    return frameLoop((dt) => {
      n = (n + dt * 25) % LAST_DAY;
    });
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Ngày"
      bind:value={n}
      min={0}
      max={LAST_DAY}
      step={1}
      format={(v) => dateText(v)}
    />
    <div class="flex items-end">
      <button type="button" class={button.quiet} onclick={togglePlay}>
        {playing ? 'Dừng lại' : 'Tua nhanh thời gian'}
      </button>
    </div>
  </div>
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Theo dõi"
      options={PLANETS.map((p) => ({ value: p.id, label: p.name }))}
      bind:value={picked}
    />
    <SegmentedControl
      label="Khung nhìn dải hoàng đạo"
      options={[
        { value: 'sun', label: 'Bám theo Mặt Trời' },
        { value: 'stars', label: 'Nền sao đứng yên' },
      ]}
      bind:value={view}
    />
  </div>

  <div class="{card} overflow-hidden">
    <svg
      viewBox="0 0 {STRIP_W} {STRIP_H}"
      class="block h-auto w-full"
      role="img"
      aria-label="Dải hoàng đạo ngày {dateText(
        n,
      )}: Mặt Trời ở chòm {sunIn}, {planet.name} cách Mặt Trời {formatNumber(
        Math.abs(elong),
        0,
      )} độ"
    >
      <rect width={STRIP_W} height={STRIP_H} fill="#0f172a" />
      {#each zodiacLines as z (z.name)}
        <line x1={z.x} y1="0" x2={z.x} y2={STRIP_H} stroke="#334155" stroke-width="1" />
      {/each}
      <line
        x1="0"
        y1={STRIP_H / 2}
        x2={STRIP_W}
        y2={STRIP_H / 2}
        stroke="#fbbf24"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <text x="6" y="16" fill="#cbd5e1" font-size="13">← Đông</text>
      <text x={STRIP_W - 6} y="16" fill="#cbd5e1" font-size="13" text-anchor="end">Tây →</text>
      <text x={STRIP_W / 2} y={STRIP_H - 6} fill="#fbbf24" font-size="13" text-anchor="middle">
        Hoàng đạo; Mặt Trời ở chòm {sunIn}
      </text>
      {#each trailRuns as run, i (i)}
        <polyline points={pointsAttr(run)} fill="none" stroke={COLOR[picked]} stroke-width="1.5" />
      {/each}
      <circle cx={sunX} cy={stripY(0)} r="8" fill="#fbbf24" />
      <circle cx={stripX(moon.lon)} cy={stripY(moon.lat)} r="5" fill="#e2e8f0" />
      <text
        x={stripX(moon.lon)}
        y={stripY(moon.lat) - 8}
        fill="#e2e8f0"
        font-size="12"
        text-anchor="middle"
      >
        Trăng
      </text>
      {#each PLANETS as p (p.id)}
        {@const s = seenFromEarth(p, n)}
        <circle
          cx={stripX(s.lon)}
          cy={stripY(s.lat)}
          r={p.id === picked ? 5 : 3}
          fill={COLOR[p.id]}
          stroke="#f8fafc"
          stroke-width="1"
        />
      {/each}
    </svg>
  </div>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-800"
    aria-live={playing ? 'off' : 'polite'}
  >
    {planetText}
  </p>

  <div class="grid items-center gap-3 sm:grid-cols-2">
    <div class="{card} overflow-hidden">
      <svg
        viewBox="0 0 340 340"
        class="block h-auto w-full"
        role="img"
        aria-label="Mô hình nhật tâm nhìn từ phía Bắc: các hành tinh quay ngược chiều kim đồng hồ quanh Mặt Trời"
      >
        <rect width="340" height="340" fill="#f8fafc" />
        {#each [...PLANETS, { id: 'dat', a: 1 }] as o (o.id)}
          <circle cx={O.x} cy={O.y} r={o.a * AU} fill="none" stroke="#cbd5e1" stroke-width="1" />
        {/each}
        <line x1={earth.x} y1={earth.y} x2={O.x} y2={O.y} stroke="#f59e0b" stroke-width="1.5" />
        <line
          x1={earth.x}
          y1={earth.y}
          x2={planetAt.x}
          y2={planetAt.y}
          stroke={COLOR[picked]}
          stroke-width="1.5"
        />
        <circle cx={O.x} cy={O.y} r="11" fill="#fbbf24" />
        {#each bodies as b (b.id)}
          <circle cx={b.at.x} cy={b.at.y} r={b.id === picked ? 7 : 5} fill={COLOR[b.id]} />
        {/each}
        <circle cx={earth.x} cy={earth.y} r="6" fill="#16a34a" />
        <circle cx={moonDot.x} cy={moonDot.y} r="2.5" fill="#475569" />
        <text x="6" y="330" fill="#475569" font-size="12">Xanh lục: Trái Đất</text>
      </svg>
    </div>
    <div class="space-y-2 text-sm text-slate-800">
      <div class="flex items-center gap-3">
        <svg
          viewBox="0 0 60 60"
          class="h-16 w-16 shrink-0"
          role="img"
          aria-label="Hình dạng Mặt Trăng: {phase.name}"
        >
          <circle cx="30" cy="30" r="26" fill="#334155" />
          <path d={moonLitPath(30, 30, 26, moonElong)} fill="#fde68a" />
        </svg>
        <p>
          Mặt Trăng: {phase.name}, phần sáng {formatNumber(phase.lit * 100, 0)}%.
        </p>
      </div>
      <p>
        Dải trên là bầu trời nhìn thấy, hình dưới là mô hình nhật tâm cùng thời điểm. Vệt màu là
        đường đi của hành tinh trong 300 ngày vừa qua.
      </p>
      <p class="text-slate-600">
        Thử nhìn Hỏa tinh ở khung "Nền sao đứng yên": vệt vẽ nên một vòng nút khi Trái Đất vượt qua
        nó. Mô hình dùng quỹ đạo tròn, nên các góc chỉ gần đúng.
      </p>
    </div>
  </div>
</div>
