<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { card, focusRing } from '#lib/core/ui.js';
  import { BASE_LEVEL, MEASURES, QUIET_LEVEL, noiseLevel } from './engine.js';

  const W = 480;
  const H = 180;
  const GROUND = 150;

  /** @type {string[]} */
  let chosen = $state([]);

  const has = (/** @type {string} */ id) => chosen.includes(id);
  const level = $derived(noiseLevel(chosen));
  /** Bar from 30 dB to 90 dB. */
  const bar = $derived(Math.max(0, Math.min(1, (level - 30) / 60)));

  const status = $derived.by(() => {
    const parts = MEASURES.filter((m) => has(m.id)).map(
      (m) => `${m.how} (${m.change > 0 ? '+' : '−'}${Math.abs(m.change)} dB)`,
    );
    const head = `Mức ồn trong nhà khoảng ${level} dB.`;
    if (chosen.length === 0) {
      return `${head} Nhà sát đường lớn, tiếng xe cộ to và kéo dài: đó là ô nhiễm tiếng ồn. Chọn các biện pháp bên dưới.`;
    }
    const worse = has('san') ? ' Lưu ý: sân đá hoa nhẵn phản xạ âm tốt nên làm nhà ồn hơn.' : '';
    const verdict =
      level <= QUIET_LEVEL
        ? ' Đã đủ yên tĩnh để học tập, nghỉ ngơi.'
        : ' Vẫn còn ồn, hãy kết hợp thêm biện pháp.';
    return `${head} Đã dùng: ${parts.join('; ')}.${worse}${verdict}`;
  });
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label="Đường phố bên trái, ngôi nhà bên phải. Mức ồn trong nhà khoảng {level} dB."
    >
      <rect x="0" y="0" width={W} height={GROUND} fill="#f0f9ff" />
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#cbd5e1" />
      <!-- road and cars -->
      <rect x="0" y={GROUND - 4} width="130" height="12" fill="#475569" />
      <rect x="12" y={GROUND - 30} width="56" height="24" rx="6" fill="#ef4444" />
      <rect x="76" y={GROUND - 40} width="46" height="34" rx="4" fill="#f59e0b" />
      {#if !has('coi')}
        <text x="70" y={GROUND - 56} text-anchor="middle" class="fill-red-600 text-[14px] font-bold"
          >Bíp! Bíp!</text
        >
      {:else}
        <circle cx="40" cy={GROUND - 72} r="14" fill="#fff" stroke="#dc2626" stroke-width="4" />
        <line x1="30" y1={GROUND - 82} x2="50" y2={GROUND - 62} stroke="#dc2626" stroke-width="3" />
        <line x1="40" y1={GROUND - 58} x2="40" y2={GROUND - 40} stroke="#475569" stroke-width="3" />
      {/if}
      <!-- trees -->
      {#if has('cay')}
        {#each [160, 190] as x (x)}
          <rect x={x - 3} y={GROUND - 30} width="6" height="30" fill="#78350f" />
          <circle cx={x} cy={GROUND - 44} r="18" fill="#16a34a" />
        {/each}
      {/if}
      <!-- barrier wall -->
      {#if has('tuong')}
        <rect x="222" y={GROUND - 70} width="14" height="70" fill="#64748b" />
      {/if}
      <!-- yard -->
      {#if has('san')}
        <rect x="250" y={GROUND} width="80" height="8" fill="#f1f5f9" stroke="#94a3b8" />
      {/if}
      <!-- house -->
      <rect x="330" y={GROUND - 80} width="120" height="80" fill="#fde68a" stroke="#92400e" />
      <path d="M320 {GROUND - 80} L390 {GROUND - 124} L460 {GROUND - 80} Z" fill="#b91c1c" />
      <rect
        x="346"
        y={GROUND - 60}
        width="34"
        height="28"
        fill="#bae6fd"
        stroke={has('cua') ? '#1e3a8a' : '#92400e'}
        stroke-width={has('cua') ? 4 : 1.5}
      />
      <!-- sound waves reaching the house -->
      {#each [0, 1, 2] as i (i)}
        <path
          d="M{140 + i * 22} {GROUND - 70} q14 26 0 52"
          fill="none"
          stroke="#dc2626"
          stroke-width="3"
          opacity={Math.max(0.15, bar - i * 0.15)}
        />
      {/each}
      <!-- level meter -->
      <rect x="400" y={GROUND - 66} width="34" height="60" rx="4" fill="#fff" stroke="#475569" />
      <rect
        x="404"
        y={GROUND - 10 - 52 * bar}
        width="26"
        height={52 * bar}
        fill={level <= QUIET_LEVEL ? '#16a34a' : '#dc2626'}
      />
      <text
        x="417"
        y={GROUND + 22}
        text-anchor="middle"
        class="fill-slate-800 text-[16px] font-bold">{level} dB</text
      >
    </svg>
    <figcaption class="px-2 text-center text-sm text-slate-600">
      Ban đầu khoảng {BASE_LEVEL} dB; mục tiêu: {QUIET_LEVEL} dB trở xuống. Các con số chỉ để minh họa.
    </figcaption>
  </figure>

  <fieldset class="{card} space-y-2 p-3">
    <legend class="px-1 text-sm font-semibold text-slate-700">Biện pháp cho ngôi nhà</legend>
    {#each MEASURES as m (m.id)}
      <label
        class="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
      >
        <input
          type="checkbox"
          class="mt-1 size-5 shrink-0 accent-indigo-600 {focusRing}"
          value={m.id}
          bind:group={chosen}
        />
        <span class="text-sm text-slate-800">{m.name}</span>
      </label>
    {/each}
  </fieldset>

  <FeedbackNote
    tone={chosen.length === 0 ? 'info' : level <= QUIET_LEVEL ? 'ok' : 'warn'}
    text={status}
  />
</div>
