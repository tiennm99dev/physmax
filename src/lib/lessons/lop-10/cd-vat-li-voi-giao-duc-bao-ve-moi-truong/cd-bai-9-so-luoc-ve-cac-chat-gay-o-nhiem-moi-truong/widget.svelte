<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import {
    CHALLENGES,
    MEDIA,
    POLLUTANTS,
    SOURCES,
    byMedium,
    checkChallenge,
    dotSpots,
    sourceLabel,
  } from './engine.js';

  /** @type {string[]} */
  let active = $state([]);
  let mode = $state('kham-pha');
  let round = $state(0);
  /** @type {null | { ok: boolean, missing: string[], extra: string[] }} */
  let verdict = $state(null);
  /** @type {string[]} ids of the challenges solved so far */
  let solved = $state([]);

  const reach = $derived(byMedium(active));
  const challenge = $derived(CHALLENGES[round % CHALLENGES.length]);

  /** @param {string} id */
  function toggle(id) {
    active = active.includes(id) ? active.filter((a) => a !== id) : [...active, id];
    verdict = null;
  }

  function check() {
    verdict = checkChallenge(active, challenge);
    if (verdict.ok && !solved.includes(challenge.id)) solved = [...solved, challenge.id];
  }

  function nextRound() {
    round += 1;
    active = [];
    verdict = null;
  }

  /** @param {string | number} m */
  function setMode(m) {
    mode = String(m);
    active = [];
    verdict = null;
  }

  const verdictText = $derived.by(() => {
    if (!verdict) return '';
    if (verdict.ok) return 'Chính xác! Em đã bật đúng tất cả các nguồn.';
    const parts = [];
    if (verdict.missing.length) parts.push(`còn thiếu ${verdict.missing.length} nguồn`);
    if (verdict.extra.length)
      parts.push(
        `bật thừa: ${verdict.extra.map((id) => sourceLabel(id).toLowerCase()).join(', ')}`,
      );
    return `Chưa đúng: ${parts.join('; ')}. Bật hoặc tắt nguồn rồi kiểm tra lại.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'kham-pha', label: 'Khám phá' },
      { value: 'thu-thach', label: 'Thử thách' },
    ]}
    value={mode}
    onchange={setMode}
  />

  <svg
    viewBox="0 0 360 200"
    class="block w-full rounded-xl"
    role="img"
    aria-label="Thành phố ảo: {active.length === 0
      ? 'chưa bật nguồn thải nào'
      : `đang bật ${active.map((id) => sourceLabel(id).toLowerCase()).join(', ')}`}"
  >
    <rect x="0" y="0" width="360" height="80" fill="#e0f2fe" />
    <rect x="0" y="80" width="360" height="44" fill="#ecfccb" />
    <rect x="0" y="124" width="240" height="76" fill="#d6b88f" />
    <rect x="240" y="124" width="120" height="76" fill="#7dd3fc" />
    <text x="6" y="14" font-size="10" font-weight="700" fill="#0369a1">Không khí</text>
    <text x="6" y="194" font-size="10" font-weight="700" fill="#713f12">Đất</text>
    <text x="354" y="194" font-size="10" font-weight="700" fill="#075985" text-anchor="end"
      >Nước</text
    >
    {#each SOURCES as source, i (source.id)}
      {@const x = 26 + i * 50}
      {@const on = active.includes(source.id)}
      <g opacity={on ? 1 : 0.45}>
        <rect
          x={x - 13}
          y="92"
          width="26"
          height="26"
          rx="5"
          fill={on ? source.color : '#94a3b8'}
          stroke="white"
          stroke-width="1.5"
        />
        <text {x} y="109" font-size="11" font-weight="700" fill="white" text-anchor="middle"
          >{i + 1}</text
        >
      </g>
      {#if on}
        {#each MEDIA as medium (medium.id)}
          {#if source.releases.some((r) => r.media.includes(medium.id))}
            {#each dotSpots(i, medium.id) as p, k (k)}
              <circle
                class="drift"
                style:animation-delay="{(k * 0.4 + i * 0.25) % 2}s"
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill={source.color}
                opacity="0.85"
              />
            {/each}
          {/if}
        {/each}
      {/if}
    {/each}
  </svg>

  <ul class="grid gap-2 sm:grid-cols-2" aria-label="Các nguồn thải">
    {#each SOURCES as source, i (source.id)}
      <li>
        <button
          type="button"
          class="flex min-h-11 w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition {active.includes(
            source.id,
          )
            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'} {focusRing}"
          aria-pressed={active.includes(source.id)}
          onclick={() => toggle(source.id)}
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold text-white"
            style:background-color={source.color}
            aria-hidden="true">{i + 1}</span
          >
          {source.label}
        </button>
      </li>
    {/each}
  </ul>

  {#if mode === 'thu-thach'}
    <div class="{card} space-y-3 p-4">
      <p class="text-sm font-semibold text-indigo-700">
        Thử thách {(round % CHALLENGES.length) + 1}/{CHALLENGES.length} · đã giải {solved.length}/{CHALLENGES.length}
      </p>
      <p class="font-semibold text-slate-900">{challenge.prompt}</p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
        <button type="button" class={button.quiet} onclick={nextRound}>Thử thách khác</button>
      </div>
      <div aria-live="polite">
        {#if verdict}
          <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdictText} />
        {/if}
      </div>
    </div>
  {/if}

  {#if mode === 'kham-pha'}
    <div class="grid gap-3 sm:grid-cols-3" aria-live="polite">
      {#each MEDIA as medium (medium.id)}
        <div class="{card} p-3 text-sm">
          <p class="mb-1 font-bold text-slate-900">{medium.label}</p>
          {#if reach[medium.id].length === 0}
            <p class="text-slate-500">Chưa có chất ô nhiễm.</p>
          {:else}
            <ul class="space-y-2">
              {#each reach[medium.id] as row (row.pollutant)}
                <li class="text-slate-700">
                  <span class="font-semibold">{POLLUTANTS[row.pollutant].name}</span>
                  {#if row.via.length}<span class="text-slate-500">
                      ({row.via.join(', ')})</span
                    >{/if}
                  <span class="block text-xs text-slate-600"
                    >{POLLUTANTS[row.pollutant].effect}</span
                  >
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-sm text-slate-600">
      Trong chế độ thử thách, bảng chất ô nhiễm được ẩn đi: hãy dựa vào những gì em đã học.
    </p>
  {/if}
</div>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .drift {
      animation: drift 2.4s ease-in-out infinite alternate;
    }
  }
  @keyframes drift {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(3px, -4px);
    }
  }
</style>
