<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { PLACES, RANGE, THINGS, place, trendFromEarth, weightAt } from './engine.js';

  /** @typedef {import('./engine.js').PlaceId} PlaceId */
  /** @typedef {import('./engine.js').Trend} Trend */

  const TRENDS = [
    { value: 'tang', label: 'Lớn hơn' },
    { value: 'giam', label: 'Nhỏ hơn' },
    { value: 'khong-doi', label: 'Không đổi' },
  ];
  /** @type {Record<string, string>} */
  const TREND_WORD = { tang: 'lớn hơn', giam: 'nhỏ hơn', 'khong-doi': 'không đổi' };

  // Spring balance: 0 N at the top of the scale, 12 px per newton.
  const S_TOP = 40;
  const S_PX = 12;

  let thingId = $state(THINGS[1].id);
  /** @type {PlaceId} */
  let placeId = $state('trai-dat');
  /** Places whose readings are shown; the others wait for a prediction. */
  /** @type {Record<string, boolean>} */
  let seen = $state({ 'trai-dat': true });
  let guessMass = $state('');
  let guessWeight = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);

  const thing = $derived(THINGS.find((t) => t.id === thingId) ?? THINGS[0]);
  const here = $derived(place(placeId));
  const shown = $derived(Boolean(seen[placeId]));
  const P = $derived(weightAt(thing.mass, placeId));
  const pEarth = $derived(weightAt(thing.mass, 'trai-dat'));
  const kg = (/** @type {number} */ v) => `${formatNumber(v, 2)} kg`;
  const N = (/** @type {number} */ v) => `${formatNumber(v, 2)} N`;
  const ticks = Array.from({ length: RANGE + 1 }, (_, i) => i);

  function changePlace() {
    guessMass = '';
    guessWeight = '';
    note = null;
  }
  function changeThing() {
    seen = { 'trai-dat': true };
    changePlace();
  }

  function reveal() {
    if (!guessMass || !guessWeight) {
      note = {
        tone: 'warn',
        text: 'Hãy dự đoán cả khối lượng và trọng lượng trước khi xem kết quả.',
      };
      return;
    }
    const t = trendFromEarth(placeId);
    const okMass = guessMass === t.mass;
    const okWeight = guessWeight === t.weight;
    seen = { ...seen, [placeId]: true };
    const why = `Khối lượng của ${thing.name.toLowerCase()} vẫn là ${kg(thing.mass)}; trọng lượng giảm từ ${N(pEarth)} còn ${N(P)} vì lực hút của ${here.name} yếu hơn lực hút của Trái Đất.`;
    note =
      okMass && okWeight
        ? { tone: 'ok', text: `Em dự đoán đúng cả hai. ${why}` }
        : {
            tone: 'warn',
            text: `${okMass ? 'Khối lượng: đúng.' : `Khối lượng: em đoán ${TREND_WORD[guessMass]}, thực ra không đổi.`} ${okWeight ? 'Trọng lượng: đúng.' : `Trọng lượng: em đoán ${TREND_WORD[guessWeight]}, thực ra ${TREND_WORD[t.weight]}.`} ${why}`,
          };
  }

  const status = $derived(
    shown
      ? `Ở ${here.name}: cân đĩa thăng bằng với quả cân ${kg(thing.mass)}; lực kế chỉ ${N(P)}.`
      : `Đã mang ${thing.name.toLowerCase()} tới ${here.name}. Hãy dự đoán số chỉ của hai dụng cụ so với trên Trái Đất.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật"
      options={THINGS.map((t) => ({
        value: t.id,
        label: `${t.name} ${formatNumber(t.mass, 2)} kg`,
      }))}
      bind:value={thingId}
      onchange={changeThing}
    />
    <SegmentedControl
      label="Nơi đặt vật"
      options={PLACES.map((p) => ({ value: p.id, label: p.name }))}
      bind:value={placeId}
      onchange={changePlace}
    />
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 240 200"
        class="mx-auto block w-full max-w-xs"
        role="img"
        aria-label={shown
          ? `Cân đĩa: bên trái là ${thing.name.toLowerCase()}, bên phải là quả cân ${kg(thing.mass)}, đòn cân nằm ngang.`
          : 'Cân đĩa: chưa xem kết quả.'}
      >
        <rect x="112" y="40" width="16" height="130" fill="#64748b" />
        <rect x="70" y="168" width="100" height="12" rx="4" fill="#475569" />
        <line
          x1="30"
          y1="40"
          x2="210"
          y2="40"
          stroke="#334155"
          stroke-width="5"
          stroke-linecap="round"
        />
        <polygon points="120,30 112,44 128,44" fill="#334155" />
        <line x1="40" y1="40" x2="40" y2="92" stroke="#94a3b8" />
        <line x1="200" y1="40" x2="200" y2="92" stroke="#94a3b8" />
        <rect x="10" y="92" width="60" height="6" rx="3" fill="#94a3b8" />
        <rect x="170" y="92" width="60" height="6" rx="3" fill="#94a3b8" />
        <rect x="16" y="62" width="48" height="30" rx="8" fill="#86efac" stroke="#15803d" />
        <text x="40" y="81" text-anchor="middle" class="fill-green-900 text-[10px] font-semibold"
          >{thing.name}</text
        >
        {#if shown}
          <rect x="180" y="66" width="40" height="26" rx="3" fill="#cbd5e1" stroke="#334155" />
          <text x="200" y="83" text-anchor="middle" class="fill-slate-900 text-[10px] font-bold"
            >{kg(thing.mass)}</text
          >
        {:else}
          <text x="200" y="83" text-anchor="middle" class="fill-slate-400 text-[16px] font-bold"
            >?</text
          >
        {/if}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Cân đĩa so sánh vật với quả cân: đo <strong>khối lượng</strong>
      </figcaption>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 240 340"
        class="mx-auto block w-full max-w-[12rem]"
        role="img"
        aria-label={shown ? `Lực kế: kim chỉ ${N(P)}.` : 'Lực kế: chưa xem kết quả.'}
      >
        <rect x="60" y="14" width="120" height="16" rx="4" fill="#475569" />
        <rect
          x="80"
          y={S_TOP - 10}
          width="80"
          height={RANGE * S_PX + 20}
          rx="10"
          fill="#e0f2fe"
          stroke="#0369a1"
        />
        {#each ticks as t (t)}
          <line
            x1="80"
            y1={S_TOP + t * S_PX}
            x2={t % 5 === 0 ? 100 : 92}
            y2={S_TOP + t * S_PX}
            stroke="#0c4a6e"
          />
          {#if t % 5 === 0}
            <text x="104" y={S_TOP + t * S_PX + 4} class="fill-sky-900 text-[10px]">{t}</text>
          {/if}
        {/each}
        <text x="140" y={S_TOP + 4} class="fill-sky-900 text-[10px] font-semibold">N</text>
        {#if shown}
          <line
            x1="80"
            y1={S_TOP + P * S_PX}
            x2="150"
            y2={S_TOP + P * S_PX}
            stroke="#dc2626"
            stroke-width="3"
          />
          <line
            x1="150"
            y1={S_TOP + P * S_PX}
            x2="150"
            y2={S_TOP + RANGE * S_PX + 20}
            stroke="#334155"
            stroke-width="2"
          />
        {/if}
        <rect
          x="126"
          y={S_TOP + RANGE * S_PX + 20}
          width="48"
          height="30"
          rx="8"
          fill="#86efac"
          stroke="#15803d"
        />
        <text
          x="150"
          y={S_TOP + RANGE * S_PX + 39}
          text-anchor="middle"
          class="fill-green-900 text-[9px] font-semibold">{thing.name}</text
        >
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Lực kế đo lực hút lên vật: đo <strong>trọng lượng</strong>
      </figcaption>
    </figure>
  </div>

  {#if !shown}
    <div class="{card} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700">
        So với khi ở Trái Đất, ở {here.name} thì
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <SegmentedControl label="Khối lượng (cân đĩa)" options={TRENDS} bind:value={guessMass} />
        <SegmentedControl label="Trọng lượng (lực kế)" options={TRENDS} bind:value={guessWeight} />
      </div>
      <button type="button" class={button.primary} onclick={reveal}>Xem kết quả</button>
    </div>
  {/if}

  <div class="overflow-x-auto">
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        {thing.name} ở các nơi
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="px-2 py-1"></th>
          {#each PLACES as p (p.id)}
            <th class="px-2 py-1">{p.name}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-100">
          <th class="px-2 py-1 text-left">Khối lượng</th>
          {#each PLACES as p (p.id)}
            <td class="px-2 py-1">{seen[p.id] ? kg(thing.mass) : '?'}</td>
          {/each}
        </tr>
        <tr>
          <th class="px-2 py-1 text-left">Trọng lượng</th>
          {#each PLACES as p (p.id)}
            <td class="px-2 py-1">{seen[p.id] ? N(weightAt(thing.mass, p.id)) : '?'}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {note?.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : note?.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {note ? note.text : status}
  </p>
</div>
