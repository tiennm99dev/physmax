<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    CONDITIONS,
    DEMAND,
    PROVINCES,
    SOURCES,
    advise,
    barWidth,
    judge,
    provinceOf,
  } from './engine.js';

  const OPTIONS = PROVINCES.map((p) => ({ value: p.id, label: p.label }));

  /** @returns {import('./engine.js').Mix} */
  const emptyMix = () => Object.fromEntries(SOURCES.map((s) => [s.id, 0]));

  let provinceId = $state(PROVINCES[0].id);
  let mix = $state(emptyMix());

  const province = $derived(provinceOf(provinceId));
  const status = $derived(judge(province, mix));
  const feedback = $derived(advise(province, mix));

  function reset() {
    mix = emptyMix();
  }

  /** @param {number} a @param {number} b @param {number} c @param {number} d */
  const outputText = (a, b, c, d) =>
    `Mỗi cụm: mùa mưa ${a} (ngày), ${b} (đêm); mùa khô ${c} (ngày), ${d} (đêm).`;
</script>

<div class="flex flex-col gap-4">
  <SegmentedControl
    label="Tỉnh cần quy hoạch"
    options={OPTIONS}
    bind:value={provinceId}
    onchange={reset}
  />
  <p class="text-sm text-slate-700">{province.about}</p>

  <div class="{card} grid gap-3 p-4" aria-label="Điện cung cấp theo từng tình huống">
    <p class="text-sm font-bold text-slate-800">Điện cung cấp so với nhu cầu</p>
    {#each CONDITIONS as condition, c (condition.id)}
      {@const enough = status.out[c] >= DEMAND[c]}
      <div>
        <p class="flex justify-between gap-2 text-sm text-slate-700">
          <span>{condition.label}</span>
          <span class="font-semibold tabular-nums {enough ? 'text-emerald-700' : 'text-amber-800'}">
            {status.out[c]}/{DEMAND[c]}
            {enough ? 'đủ' : 'thiếu'}
          </span>
        </p>
        <div class="relative mt-1 h-3 rounded-full bg-slate-200" aria-hidden="true">
          <div
            class="h-3 rounded-full {enough ? 'bg-emerald-500' : 'bg-amber-500'}"
            style="width: {barWidth(status.out[c])}%"
          ></div>
          <div
            class="absolute -top-0.5 h-4 w-0.5 bg-slate-800"
            style="left: {barWidth(DEMAND[c])}%"
          ></div>
        </div>
      </div>
    {/each}
    <p class="flex justify-between gap-2 border-t border-slate-200 pt-2 text-sm text-slate-700">
      <span>Chi phí xây dựng</span>
      <span class="font-semibold tabular-nums {status.over ? 'text-amber-800' : 'text-slate-900'}">
        {status.total}/{province.budget}
        {status.over ? 'vượt ngân sách' : ''}
      </span>
    </p>
    <p class="text-xs text-slate-600">
      Vạch đen trên mỗi thanh là nhu cầu điện. Các số liệu là giả định của trò chơi.
    </p>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <ul class="grid gap-3 sm:grid-cols-2">
    {#each SOURCES as source (source.id)}
      {@const site = province.sites[source.id]}
      <li class="{card} grid content-start gap-2 p-3 {site.max === 0 ? 'bg-slate-50' : ''}">
        {#if site.max > 0}
          <Stepper label={source.name} min={0} max={site.max} bind:value={mix[source.id]} />
          <p class="text-xs text-slate-600">
            Tối đa {site.max} cụm · giá {site.cost}/cụm.
            {outputText(site.output[0], site.output[1], site.output[2], site.output[3])}
          </p>
        {:else}
          <p class="text-sm font-semibold text-slate-500">{source.name}: không xây được</p>
        {/if}
        <p class="text-xs text-slate-700">{site.note}</p>
        <details class="text-xs text-slate-700">
          <summary class="cursor-pointer py-1 font-semibold text-indigo-700">Ưu, nhược điểm</summary
          >
          <p class="mt-1"><strong>Ưu điểm:</strong> {source.plus}</p>
          <p class="mt-1"><strong>Nhược điểm:</strong> {source.minus}</p>
        </details>
      </li>
    {/each}
  </ul>

  <div>
    <button type="button" class={button.quiet} onclick={reset}>Xây lại từ đầu</button>
  </div>
</div>
