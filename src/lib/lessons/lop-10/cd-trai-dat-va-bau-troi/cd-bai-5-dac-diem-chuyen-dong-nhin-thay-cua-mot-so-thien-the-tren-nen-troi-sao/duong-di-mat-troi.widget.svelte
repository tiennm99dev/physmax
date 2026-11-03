<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    MARKS,
    dateText,
    dayLength,
    declination,
    durationText,
    noonSun,
    riseOffset,
    sunPosition,
  } from './engine.js';

  const R = 140;
  const C = 170;

  let day = $state(78);
  let lat = $state(21);
  let hour = $state(9);

  const dec = $derived(declination(day));

  /**
   * The sky dome seen from above: the zenith in the middle, north on top, east
   * on the right, as a diagram on the ground.
   * @param {number} alt @param {number} az
   */
  function dome(alt, az) {
    const r = R * Math.cos((alt * Math.PI) / 180);
    const a = (az * Math.PI) / 180;
    return { x: C + r * Math.sin(a), y: C - r * Math.cos(a) };
  }

  /** @param {number} d */
  function pathOf(d) {
    const points = [];
    for (let h = 0; h <= 24; h += 0.1) {
      const p = sunPosition(lat, d, h);
      if (p.alt >= 0) points.push(dome(p.alt, p.az));
    }
    return pointsAttr(points);
  }

  const guides = $derived(
    MARKS.filter((m) => m.id !== 'thu').map((m) => ({ ...m, line: pathOf(declination(m.day)) })),
  );
  const path = $derived(pathOf(dec));
  const now = $derived(sunPosition(lat, dec, hour));
  const nowAt = $derived(dome(now.alt, now.az));

  const hours = $derived(dayLength(lat, dec));
  const offset = $derived(riseOffset(lat, dec));
  const noon = $derived(noonSun(lat, dec));
  const riseText = $derived.by(() => {
    if (Math.abs(offset) < 0.5) return 'Mặt Trời mọc gần đúng hướng Đông, lặn gần đúng hướng Tây.';
    const side = offset > 0 ? 'Bắc' : 'Nam';
    return `Mặt Trời mọc lệch về phía ${side} ${formatNumber(Math.abs(offset), 0)}° so với hướng Đông, lặn cũng lệch như vậy so với hướng Tây.`;
  });
  const noonText = $derived(
    noon.side === 'đỉnh đầu'
      ? 'Giữa trưa Mặt Trời ở gần đúng đỉnh đầu.'
      : `Giữa trưa Mặt Trời cao ${formatNumber(noon.alt, 1)}°, ở phía ${noon.side} đỉnh đầu.`,
  );
  const lengthText = $derived(`Ban ngày dài ${durationText(hours)}.`);
  const hourText = $derived(
    `${Math.floor(hour)} giờ${hour % 1 ? ` ${Math.round((hour % 1) * 60)} phút` : ''}`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2">
    {#each MARKS as m (m.id)}
      <button
        type="button"
        class={button.quiet}
        aria-pressed={day === m.day}
        onclick={() => (day = m.day)}
      >
        {m.name}
      </button>
    {/each}
  </div>
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Ngày trong năm"
      bind:value={day}
      min={0}
      max={364}
      format={(v) => dateText(v).slice(0, 5)}
    />
    <SliderField label="Vĩ độ" bind:value={lat} min={0} max={40} unit="° Bắc" />
    <SliderField
      label="Giờ Mặt Trời"
      bind:value={hour}
      min={4}
      max={20}
      step={0.25}
      format={() => hourText}
    />
  </div>
  <div class="{card} mx-auto max-w-md overflow-hidden">
    <svg
      viewBox="0 0 340 340"
      class="block h-auto w-full"
      role="img"
      aria-label="Đường đi của Mặt Trời trên bầu trời trong ngày {dateText(day).slice(
        0,
        5,
      )} ở vĩ độ {lat} độ Bắc"
    >
      <rect width="340" height="340" fill="#f0f9ff" />
      <circle cx={C} cy={C} r={R} fill="#fff" stroke="#64748b" stroke-width="1.5" />
      <line x1={C} y1={C - R} x2={C} y2={C + R} stroke="#cbd5e1" />
      <line x1={C - R} y1={C} x2={C + R} y2={C} stroke="#cbd5e1" />
      <text x={C} y="20" text-anchor="middle" font-size="15" fill="#334155">Bắc</text>
      <text x={C} y="332" text-anchor="middle" font-size="15" fill="#334155">Nam</text>
      <text x="6" y={C - 6} font-size="15" fill="#334155">Tây</text>
      <text x="334" y={C - 6} text-anchor="end" font-size="15" fill="#334155">Đông</text>
      {#each guides as g (g.id)}
        <polyline
          points={g.line}
          fill="none"
          stroke="#cbd5e1"
          stroke-width="1.5"
          stroke-dasharray="5 4"
        />
      {/each}
      <polyline points={path} fill="none" stroke="#f59e0b" stroke-width="3" />
      <circle cx={C} cy={C} r="3" fill="#334155" />
      {#if now.alt >= 0}
        <circle
          cx={nowAt.x}
          cy={nowAt.y}
          r="9"
          fill="#fbbf24"
          stroke="#b45309"
          stroke-width="1.5"
        />
      {/if}
    </svg>
  </div>
  <FeedbackNote
    tone="info"
    text="{riseText} {noonText} {lengthText}{now.alt < 0
      ? ' Lúc này Mặt Trời ở dưới chân trời.'
      : ''}"
  />
  <p class="text-sm text-slate-600">
    Sơ đồ nhìn bầu trời từ trên xuống, tâm là đỉnh đầu, vòng tròn là chân trời. Nét đứt là ba đường
    đi lúc xuân phân (cũng là thu phân), hạ chí và đông chí. Ở nơi có vĩ độ khoảng 21° như Hà Nội,
    thử tìm những ngày Mặt Trời đi qua phía Bắc của đỉnh đầu.
  </p>
</div>
