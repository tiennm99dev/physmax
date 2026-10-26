<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import {
    AU_MILLION_KM,
    EARTH_KM,
    PLANETS,
    SUN_KM,
    diameterVsEarth,
    millionKm,
    orbitAngle,
    planet,
    planetsInView,
    turnsAfter,
    viewAu,
  } from './engine.js';

  // Orbit view.
  const OV = 360;
  const OC = OV / 2;
  const OR = 165;

  // Size row: every planet to one scale, the Sun's edge on the left.
  const RW = 360;
  const RH = 150;
  const GAP = 6;
  const SUN_EDGE = 14;
  const sumEarths = PLANETS.reduce((s, p) => s + p.km / EARTH_KM, 0);
  const U = (RW - SUN_EDGE - GAP * (PLANETS.length + 1)) / sumEarths;
  const SUN_R = ((SUN_KM / EARTH_KM) * U) / 2;
  const ROW = PLANETS.reduce(
    (acc, p) => {
      const d = (p.km / EARTH_KM) * U;
      acc.items.push({ p, x: acc.x + d / 2, r: d / 2 });
      acc.x += d + GAP;
      return acc;
    },
    {
      x: SUN_EDGE + GAP,
      items: /** @type {{ p: import('./engine.js').Planet, x: number, r: number }[]} */ ([]),
    },
  ).items;

  const SPEEDS = [
    { value: 'cham', label: 'Chậm: 3 tháng/giây', perSecond: 0.25 },
    { value: 'nhanh', label: 'Nhanh: 5 năm/giây', perSecond: 5 },
  ];

  let mode = $state('quy-dao');
  let zoom = $state(0);
  let selectedId = $state('trai-dat');
  let years = $state(0);
  let playing = $state(false);
  let speed = $state('cham');

  const selected = $derived(planet(selectedId));
  const view = $derived(viewAu(zoom));
  const scale = $derived(OR / view);
  const inView = $derived(planetsInView(view));
  const perSecond = $derived(SPEEDS.find((s) => s.value === speed)?.perSecond ?? 0.25);

  /** @param {import('./engine.js').Planet} p */
  const pos = (p) => {
    const t = (orbitAngle(p, years) * Math.PI) / 180;
    return { x: OC + p.au * scale * Math.cos(t), y: OC - p.au * scale * Math.sin(t) };
  };

  $effect(() => {
    if (!playing) return;
    const rate = perSecond;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const id = setInterval(() => (years += rate), 1000);
      return () => clearInterval(id);
    }
    let frame = 0;
    let last = performance.now();
    /** @param {number} now */
    const tick = (now) => {
      years += ((now - last) / 1000) * rate;
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  const turnsText = (/** @type {import('./engine.js').Planet} */ p) => {
    const n = turnsAfter(p, shownYears);
    return n < 1 ? `${formatNumber(n * 100, 0)}% vòng` : `${formatNumber(n, 1)} vòng`;
  };

  const shownYears = $derived(Math.floor(years * 4) / 4);
  const viewText = $derived(
    `Khung hình rộng ${formatNumber(view, 1)} AU mỗi phía (khoảng ${fmt(Math.round(millionKm(view)))} triệu km) tính từ Mặt Trời.`,
  );
  const bar = $derived(scale >= 20 ? 1 : 10);
  const timeLine = $derived(
    years > 0
      ? `Sau ${formatNumber(shownYears, 2)} năm: Trái Đất đi được ${turnsText(planet('trai-dat'))} quanh Mặt Trời; ${(selected.id === 'trai-dat' ? planet('hai-vuong') : selected).name} đi được ${turnsText(selected.id === 'trai-dat' ? planet('hai-vuong') : selected)}.`
      : 'Năm 0: nhấn "Cho các hành tinh chuyển động" và so sánh hành tinh gần với hành tinh xa.',
  );
  const status = $derived.by(() => {
    if (mode === 'kich-thuoc') {
      const k = diameterVsEarth(selected);
      return selected.id === 'trai-dat'
        ? `Trái Đất có đường kính khoảng ${fmt(EARTH_KM)} km. Mặt Trời có đường kính gấp khoảng ${fmt(Math.round(SUN_KM / EARTH_KM))} lần Trái Đất.`
        : `${selected.name} có đường kính khoảng ${fmt(selected.km)} km, ${k >= 1 ? `gấp khoảng ${formatNumber(k, 1)} lần` : `bằng khoảng ${formatNumber(k, 2)} lần`} đường kính Trái Đất.`;
    }
    const hidden = PLANETS.length - inView.length;
    const fit = hidden
      ? `Còn ${hidden} hành tinh ở ngoài khung hình, kéo thanh trượt để thu nhỏ.`
      : 'Khung hình đã chứa cả tám hành tinh.';
    return `${viewText} ${fit}`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem mô hình"
    options={[
      { value: 'quy-dao', label: 'Quỹ đạo và khoảng cách' },
      { value: 'kich-thuoc', label: 'Kích thước' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'quy-dao'}
    <figure class="{card} mx-auto max-w-md overflow-hidden p-2">
      <svg
        viewBox="0 0 {OV} {OV}"
        class="w-full"
        role="img"
        aria-label="Quỹ đạo các hành tinh quanh Mặt Trời, theo tỉ lệ khoảng cách. {viewText}"
      >
        <rect width={OV} height={OV} fill="#0f172a" />
        {#each PLANETS as p (p.id)}
          <circle
            cx={OC}
            cy={OC}
            r={p.au * scale}
            fill="none"
            stroke={p.id === selectedId ? '#f97316' : '#475569'}
            stroke-width={p.id === selectedId ? 2 : 1}
          />
        {/each}
        {#if view < 4}
          <circle
            cx={OC}
            cy={OC}
            r={2.8 * scale}
            fill="none"
            stroke="#78716c"
            stroke-width={Math.max(2, 1.2 * scale)}
            stroke-opacity="0.25"
          />
        {/if}
        <circle cx={OC} cy={OC} r="7" fill="#facc15" />
        {#each inView as p (p.id)}
          {@const q = pos(p)}
          <circle
            cx={q.x}
            cy={q.y}
            r={p.id === selectedId ? 6 : 4.5}
            fill={p.color}
            stroke={p.id === selectedId ? '#fff' : 'none'}
            stroke-width="2"
          />
          {#if p.id === selectedId || p.au * scale >= 18}
            {@const flip = q.x > OV - 90}
            <text
              x={flip ? q.x - 8 : q.x + 8}
              y={q.y - 6}
              fill="#e2e8f0"
              font-size="11"
              text-anchor={flip ? 'end' : 'start'}>{p.name}</text
            >
          {/if}
        {/each}
        <line
          x1="12"
          y1={OV - 16}
          x2={12 + bar * scale}
          y2={OV - 16}
          stroke="#e2e8f0"
          stroke-width="2"
        />
        <text x="12" y={OV - 22} fill="#e2e8f0" font-size="11">{bar} AU</text>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Khoảng cách đúng tỉ lệ; các chấm hành tinh và Mặt Trời vẽ to hơn thật để dễ nhìn. Vệt mờ
        giữa Hoả tinh và Mộc tinh là vành đai tiểu hành tinh.
      </figcaption>
    </figure>

    <SliderField
      label="Thu nhỏ để thấy các hành tinh xa hơn"
      bind:value={zoom}
      min={0}
      max={100}
      format={() => `bán kính khung ${formatNumber(view, 1)} AU`}
    />

    <div class="flex flex-wrap items-end gap-2">
      <button type="button" class={button.primary} onclick={() => (playing = !playing)}>
        {playing ? 'Dừng lại' : 'Cho các hành tinh chuyển động'}
      </button>
      <button type="button" class={button.quiet} onclick={() => (years += 1)}>Thêm 1 năm</button>
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          years = 0;
          playing = false;
        }}>Về năm 0</button
      >
      <SegmentedControl label="Tốc độ" hideLabel options={SPEEDS} bind:value={speed} />
    </div>
    <p class="text-sm tabular-nums text-slate-700">{timeLine}</p>
  {:else}
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 {RW} {RH}"
        class="w-full"
        role="img"
        aria-label="Tám hành tinh vẽ cùng một tỉ lệ kích thước, cạnh rìa Mặt Trời"
      >
        <rect width={RW} height={RH} fill="#0f172a" />
        <circle cx={SUN_EDGE - SUN_R} cy={RH / 2} r={SUN_R} fill="#facc15" />
        {#each ROW as it (it.p.id)}
          <circle
            cx={it.x}
            cy={RH / 2}
            r={it.r}
            fill={it.p.color}
            stroke={it.p.id === selectedId ? '#fff' : 'none'}
            stroke-width="2"
          />
        {/each}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kích thước đúng tỉ lệ (khoảng cách thì không). Mép vàng bên trái là một phần nhỏ của Mặt
        Trời, to gấp khoảng {fmt(Math.round(SUN_KM / EARTH_KM))} lần Trái Đất.
      </figcaption>
    </figure>
  {/if}

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700"
      >Chọn hành tinh để xem thông tin</legend
    >
    <div class="flex flex-wrap gap-1">
      {#each PLANETS as p, i (p.id)}
        <button
          type="button"
          aria-pressed={p.id === selectedId}
          class="min-h-11 rounded-lg border px-3 text-sm font-semibold {p.id === selectedId
            ? 'border-orange-500 bg-orange-50 text-orange-800'
            : 'border-slate-300 bg-white text-slate-700'} {focusRing}"
          onclick={() => (selectedId = p.id)}>{i + 1}. {p.name}</button
        >
      {/each}
    </div>
  </fieldset>

  <dl class="{card} grid grid-cols-2 gap-x-4 gap-y-2 p-3 text-sm sm:grid-cols-4">
    <div>
      <dt class="text-xs text-slate-500">Thứ tự từ Mặt Trời</dt>
      <dd class="font-semibold text-slate-800">{PLANETS.indexOf(selected) + 1}</dd>
    </div>
    <div>
      <dt class="text-xs text-slate-500">Khoảng cách đến Mặt Trời</dt>
      <dd class="font-semibold tabular-nums text-slate-800">
        {formatNumber(selected.au, 2)} AU ≈ {fmt(Math.round(millionKm(selected.au)))} triệu km
      </dd>
    </div>
    <div>
      <dt class="text-xs text-slate-500">Đường kính</dt>
      <dd class="font-semibold tabular-nums text-slate-800">
        {fmt(selected.km)} km ({formatNumber(diameterVsEarth(selected), 2)} lần Trái Đất)
      </dd>
    </div>
    <div>
      <dt class="text-xs text-slate-500">Quay một vòng quanh Mặt Trời</dt>
      <dd class="font-semibold tabular-nums text-slate-800">
        {formatNumber(selected.periodYears, 2)} năm
      </dd>
    </div>
    <div class="col-span-2 sm:col-span-4">
      <dt class="text-xs text-slate-500">Nhóm</dt>
      <dd class="text-slate-800">
        {selected.group === 'trong'
          ? 'Hành tinh vòng trong: nhỏ, chủ yếu bằng đất đá'
          : 'Hành tinh vòng ngoài: rất lớn, chủ yếu là khí'}
      </dd>
    </div>
  </dl>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {status}
  </p>
  <p class="text-xs text-slate-500">1 AU (đơn vị thiên văn) ≈ {AU_MILLION_KM} triệu km.</p>
</div>
