<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import {
    HYDRO_CAP,
    RECENT_MIX,
    SOURCES,
    YEARLY_TWH,
    intensity,
    meetsGoal,
    renewableShare,
    setShare,
    shownShares,
    yearlyMt,
  } from './engine.js';

  let mix = $state([...RECENT_MIX]);

  const shown = $derived(shownShares(mix));
  const data = $derived(
    SOURCES.map((s, i) => ({ label: s.label, value: shown[i], color: s.color })),
  );
  const perKwh = $derived(intensity(mix));
  const total = $derived(yearlyMt(mix));
  const base = yearlyMt(RECENT_MIX);
  const change = $derived(((total - base) / base) * 100);
  const green = $derived(renewableShare(shown));

  const note = $derived.by(() => {
    if (shown[2] > HYDRO_CAP)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Thuỷ điện ${shown[2]}% là quá sức: các con sông lớn hầu như đã có đập. Xây thêm hồ chứa sẽ ngập rừng, đất ở. Hãy giữ thuỷ điện không quá ${HYDRO_CAP}%.`,
      };
    if (meetsGoal(mix))
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đạt mục tiêu: phát thải chỉ còn ${formatNumber(total, 0)} triệu tấn CO₂, không quá một nửa so với cơ cấu gần đây.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Thử thách: giảm phát thải xuống còn không quá ${formatNumber(base / 2, 0)} triệu tấn CO₂ mỗi năm (một nửa cơ cấu gần đây), giữ thuỷ điện không quá ${HYDRO_CAP}%.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid items-center gap-4 sm:grid-cols-2">
    <PieChart {data} title="Cơ cấu sản lượng điện" size={260} />
    <div class="{card} space-y-2 p-4 text-sm text-slate-700" aria-live="polite">
      <p>
        Sản lượng điện mỗi năm: <span class="font-semibold">khoảng {YEARLY_TWH} tỉ kWh</span>
      </p>
      <p>
        Phát thải trung bình:
        <span class="font-semibold">{formatNumber(perKwh, 0)} g CO₂/kWh</span>
      </p>
      <p class="text-base">
        Phát thải mỗi năm:
        <span class="font-bold text-indigo-700">{formatNumber(total, 1)} triệu tấn CO₂</span>
      </p>
      <p>
        So với cơ cấu gần đây:
        <span class="font-semibold">
          {Math.abs(change) < 0.05
            ? 'bằng nhau'
            : `${change > 0 ? 'tăng' : 'giảm'} ${formatNumber(Math.abs(change), 0)}%`}
        </span>
      </p>
      <p>Tỉ lệ năng lượng tái tạo (kể cả thuỷ điện): <span class="font-semibold">{green}%</span></p>
    </div>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="{card} grid gap-3 p-4 sm:grid-cols-2">
    {#each SOURCES as source, i (source.id)}
      <div class="flex items-end gap-2">
        <span
          class="mb-4 h-3 w-3 shrink-0 rounded-full"
          style:background-color={source.color}
          aria-hidden="true"
        ></span>
        <div class="min-w-0 flex-1">
          <SliderField
            label="{source.label} ({source.factor} g/kWh)"
            value={shown[i]}
            min={0}
            max={100}
            unit="%"
            oninput={(v) => (mix = setShare(mix, i, v))}
          />
        </div>
      </div>
    {/each}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => (mix = [...RECENT_MIX])}>
      Về cơ cấu gần đây
    </button>
  </div>
  <p class="text-xs text-slate-500">
    Cơ cấu gần đây là số liệu làm tròn, gần với những năm 2022 – 2023. Mức phát thải mỗi kWh tính
    cho cả vòng đời nhà máy, theo giá trị trung vị của IPCC (2014).
  </p>
</div>
