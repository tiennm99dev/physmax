<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    DIRECTIONS,
    FACING,
    FIGURES,
    GUIDES,
    STARS,
    guideMeasure,
    guidePath,
    horizontal,
    judgeStar,
    project,
    siderealHours,
    starById,
  } from './engine.js';

  const W = 480;
  const H = 400;
  const SCALE = 215;
  const CX = W / 2;
  const CY = 196;
  const TRAIL_HOURS = 3;

  let lat = $state(21);
  let month = $state(1);
  let hour = $state(21);
  /** @type {string} */
  let guideId = $state('gau-lon');
  let showTrails = $state(false);
  let playing = $state(false);
  /** @type {string | null} */
  let tapped = $state(null);
  let found = $state(false);
  let question = $state(0);
  /** @type {string | null} */
  let said = $state(null);

  const lst = $derived(siderealHours(month, hour));
  const center = $derived(Math.min(40, Math.max(32, lat)));
  const daylight = $derived(hour > 6.5 && hour < 17.5);

  /**
   * @param {{ ra: number, dec: number }} star
   * @param {number} [at]
   */
  function place(star, at = lst) {
    const { alt, az } = horizontal(star, lat, at);
    const p = project(alt, az, center);
    return { alt, x: CX + p.x * SCALE, y: CY - p.y * SCALE };
  }

  /** @param {{ x: number, y: number, alt: number }} p */
  function inView(p) {
    return p.alt > 0 && p.x > 6 && p.x < W - 6 && p.y > 6;
  }

  const placed = $derived(STARS.map((s) => ({ ...s, at: place(s) })));
  const figures = $derived(
    FIGURES.map((f) => ({
      id: f.id,
      lines: f.lines
        .map(([a, b]) => ({ a: place(starById(a)), b: place(starById(b)) }))
        .filter((l) => inView(l.a) && inView(l.b)),
    })),
  );
  const horizon = $derived(
    Array.from({ length: 49 }, (_, i) => {
      const p = project(0, -120 + i * 5, center);
      return { x: CX + p.x * SCALE, y: CY - p.y * SCALE };
    }),
  );
  const ground = $derived(pointsAttr([...horizon, { x: W, y: H }, { x: 0, y: H }]));
  const footN = $derived.by(() => {
    const p = project(0, 0, center);
    return { x: CX + p.x * SCALE, y: CY - p.y * SCALE };
  });
  const polarisAt = $derived(place(starById('polaris')));

  const guide = $derived(GUIDES.find((g) => g.id === guideId) ?? null);
  const guideDrawn = $derived.by(() => {
    if (!guide) return null;
    const { line, ticks } = guidePath(guide);
    return {
      line: pointsAttr(line.map((p) => place(p)).filter(inView)),
      ticks: ticks.map((p) => place(p)).filter(inView),
    };
  });
  const guideHidden = $derived.by(() => {
    if (!guide) return false;
    const anchor = guide.id === 'thien-hau' ? 'navi' : guide.through;
    return place(starById(anchor)).alt <= 0;
  });

  const guideNote = $derived.by(() => {
    if (!guide) return 'Tự dò trên trời, không dùng đường dẫn.';
    const units = formatNumber(guideMeasure(guide).units, 1);
    const hidden = guideHidden ? ' Lúc này chòm sao đó ở dưới chân trời, hãy dùng chòm khác.' : '';
    return `${guide.text} Đo trên bầu trời thật được khoảng $${texNumber(units)}$ lần.${hidden}`;
  });
  const trails = $derived.by(() => {
    if (!showTrails) return [];
    const stars = placed.filter((s) => s.mag < 2.8 && s.id !== 'polaris');
    return stars.map((s) => {
      const points = [];
      for (let k = 0; k <= 12; k += 1) {
        const p = place(s, lst - (TRAIL_HOURS * k) / 12);
        if (inView(p)) points.push(p);
      }
      return { id: s.id, points: pointsAttr(points) };
    });
  });

  const hourText = $derived.by(() => {
    const whole = Math.floor(hour) % 24;
    const minutes = Math.round((hour - Math.floor(hour)) * 60);
    return `${whole} giờ ${minutes ? `${minutes} phút` : ''}`.trim();
  });
  const altText = $derived(formatNumber(polarisAt.alt, 0));
  const verdict = $derived(tapped ? judgeStar(tapped) : null);
  const facing = $derived(FACING[question % FACING.length]);

  /** @param {string} id */
  function tap(id) {
    tapped = id;
    if (judgeStar(id).ok) found = true;
  }

  /**
   * @param {KeyboardEvent} e
   * @param {string} id
   */
  function onKey(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tap(id);
    }
  }

  function togglePlay() {
    if (reducedMotion()) {
      hour = (hour + 1) % 24;
      return;
    }
    playing = !playing;
  }

  $effect(() => {
    if (!playing) return;
    return frameLoop((dt) => {
      hour = (hour + dt * 1.5) % 24;
    });
  });

  function nextQuestion() {
    question += 1;
    said = null;
  }
</script>

<div class="space-y-4">
  <div class="{card} overflow-hidden">
    <svg
      viewBox="0 0 {W} {H}"
      class="block h-auto w-full"
      role="group"
      aria-label="Bầu trời khi nhìn về phía Bắc, {hourText}, tháng {month}, vĩ độ {lat} độ Bắc"
    >
      <rect width={W} height={H} fill={daylight ? '#7dd3fc' : '#0f172a'} />
      {#if !daylight}
        {#each figures as f (f.id)}
          {#each f.lines as l, i (i)}
            <line x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke="#94a3b8" stroke-width="1.5" />
          {/each}
        {/each}
        {#each trails as t (t.id)}
          <polyline points={t.points} fill="none" stroke="#fbbf24" stroke-width="1.5" />
        {/each}
        {#if guideDrawn}
          <polyline
            points={guideDrawn.line}
            fill="none"
            stroke="#fda4af"
            stroke-width="2"
            stroke-dasharray="6 5"
          />
          {#each guideDrawn.ticks as t, i (i)}
            <circle cx={t.x} cy={t.y} r="3.5" fill="#fda4af" />
          {/each}
        {/if}
        {#each placed as s (s.id)}
          {#if inView(s.at) && !s.candidate}
            <circle cx={s.at.x} cy={s.at.y} r={Math.max(1.5, 4.4 - s.mag * 0.7)} fill="#e2e8f0" />
          {/if}
        {/each}
        {#each placed as s (s.id)}
          {#if inView(s.at) && s.candidate}
            <g
              class="drag-handle cursor-pointer"
              role="button"
              tabindex="0"
              aria-label={s.id === 'polaris' && !found ? 'Một sao sáng ở phía bắc' : s.name}
              aria-pressed={tapped === s.id}
              onclick={() => tap(s.id)}
              onkeydown={(e) => onKey(e, s.id)}
            >
              <circle cx={s.at.x} cy={s.at.y} r="14" fill="transparent" class="drag-hit" />
              <circle
                class="drag-knob"
                cx={s.at.x}
                cy={s.at.y}
                r={Math.max(3.5, 5.5 - s.mag * 0.7)}
                fill={tapped === s.id ? (s.id === 'polaris' ? '#34d399' : '#fbbf24') : '#f8fafc'}
              />
            </g>
          {/if}
        {/each}
        {#if found}
          <line
            x1={polarisAt.x}
            y1={polarisAt.y}
            x2={footN.x}
            y2={footN.y}
            stroke="#34d399"
            stroke-width="2"
          />
          <text x={polarisAt.x + 10} y={polarisAt.y - 8} fill="#a7f3d0" font-size="16">
            Sao Bắc Cực
          </text>
        {/if}
      {:else}
        <text x={CX} y="110" text-anchor="middle" fill="#0c4a6e" font-size="18">
          Trời đang sáng, không nhìn thấy sao.
        </text>
      {/if}
      <polygon points={ground} fill="#14532d" />
      <text
        x={footN.x}
        y={footN.y + 26}
        text-anchor="middle"
        fill={found ? '#6ee7b7' : '#dcfce7'}
        font-size="19"
        font-weight="700"
      >
        Bắc
      </text>
      <text x="12" y={H - 16} fill="#dcfce7" font-size="17">← Tây</text>
      <text x={W - 12} y={H - 16} fill="#dcfce7" font-size="17" text-anchor="end">Đông →</text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Giờ trong ngày"
      bind:value={hour}
      min={0}
      max={24}
      step={0.25}
      format={() => hourText}
    />
    <SliderField label="Tháng" bind:value={month} min={1} max={12} />
    <SliderField label="Vĩ độ nơi quan sát" bind:value={lat} min={0} max={60} unit="° Bắc" />
    <div class="flex items-end">
      <button type="button" class={button.quiet} onclick={togglePlay}>
        {playing ? 'Dừng lại' : 'Cho bầu trời quay'}
      </button>
    </div>
  </div>

  <SegmentedControl
    label="Đường dẫn tìm Sao Bắc Cực"
    options={[
      { value: 'none', label: 'Không dùng' },
      ...GUIDES.map((g) => ({ value: g.id, label: g.label })),
    ]}
    bind:value={guideId}
  />
  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    <LiveRichText text={guideNote} />
  </p>

  <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
    <input type="checkbox" bind:checked={showTrails} />
    Hiện vệt sao trong {TRAIL_HOURS} giờ vừa qua
  </label>

  {#if verdict}
    <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
  {:else}
    <FeedbackNote tone="info" text="Chạm vào ngôi sao mà em cho là Sao Bắc Cực." />
  {/if}

  {#if found}
    <p class="text-sm text-slate-700">
      Sao Bắc Cực đang cao khoảng {altText}° so với chân trời, xấp xỉ vĩ độ {lat}° Bắc của nơi quan
      sát. Đường thẳng đứng từ sao đó xuống chân trời chỉ hướng Bắc.
    </p>
    <div class="{card} space-y-3 p-4">
      <p class="font-semibold text-slate-900">{facing.prompt}</p>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {#each DIRECTIONS as d (d)}
          <button
            type="button"
            class={button.quiet}
            disabled={said !== null}
            onclick={() => (said = d)}
          >
            {d}
          </button>
        {/each}
      </div>
      {#if said}
        <FeedbackNote
          tone={said === facing.answer ? 'ok' : 'warn'}
          text={said === facing.answer ? `Đúng. ${facing.why}` : `Chưa đúng. ${facing.why}`}
        />
        <button type="button" class={button.primary} onclick={nextQuestion}>Câu khác</button>
      {/if}
    </div>
  {/if}
</div>
