<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { SOURCE_NAMES, TILES, TILE_NAMES, canPlace, cityOutput, output } from './engine.js';

  /** @type {Record<string, string>} */
  const TILE_BG = {
    doi: 'bg-lime-100 border-lime-400',
    'mai-nha': 'bg-orange-50 border-orange-300',
    song: 'bg-sky-100 border-sky-400',
    dat: 'bg-amber-50 border-amber-300',
    'bo-bien': 'bg-cyan-50 border-cyan-400',
  };
  /** @type {Record<string, string>} */
  const SOURCE_BAR = { pin: 'bg-yellow-400', gio: 'bg-teal-500', 'thuy-dien': 'bg-blue-600' };

  /** @type {import('./engine.js').SourceId[]} */
  const SOURCES = ['pin', 'gio', 'thuy-dien'];

  let tool = $state('pin');
  /** @type {import('./engine.js').Sky} */
  let sky = $state('nang');
  /** @type {import('./engine.js').Wind} */
  let wind = $state('manh');
  /** @type {import('./engine.js').Season} */
  let season = $state('mua');
  /** @type {import('./engine.js').Placements} */
  let placements = $state({});
  let message = $state('Chọn một nguồn điện, rồi chạm vào ô trên bản đồ để xây.');

  const cond = $derived({ sky, wind, season });
  const city = $derived(cityOutput(placements, cond));
  const MW = (/** @type {number} */ v) => `${formatNumber(v, 1)} MW`;
  const scaleMax = $derived(Math.max(city.demand, city.total) * 1.1);
  const w = (/** @type {number} */ v) => `${(v / scaleMax) * 100}%`;

  /** @param {number} i */
  function tap(i) {
    const kind = TILES[i];
    if (tool === 'go') {
      if (placements[i] === undefined) {
        message = 'Ô này chưa có công trình nào.';
        return;
      }
      const name = SOURCE_NAMES[placements[i]];
      const next = { ...placements };
      delete next[i];
      placements = next;
      message = `Đã gỡ ${name.toLowerCase()} khỏi ô ${TILE_NAMES[kind].toLowerCase()}.`;
      return;
    }
    const source = /** @type {import('./engine.js').SourceId} */ (tool);
    const check = canPlace(source, kind);
    if (!check.ok) {
      message = `Không xây được ${SOURCE_NAMES[source].toLowerCase()} ở ${TILE_NAMES[kind].toLowerCase()}: ${check.why}`;
      return;
    }
    placements = { ...placements, [i]: source };
    message = `Đã xây ${SOURCE_NAMES[source].toLowerCase()} ở ${TILE_NAMES[kind].toLowerCase()}: lúc này phát ${MW(output(source, kind, cond))}.`;
  }

  function clearAll() {
    placements = {};
    message = 'Đã xoá hết các công trình.';
  }

  const status = $derived.by(() => {
    if (Object.keys(placements).length === 0) {
      return `Thành phố cần ${MW(city.demand)}. Chưa có nguồn tái tạo nào: nhà máy nhiệt điện than phải đốt than để phát toàn bộ ${MW(city.demand)}, thải nhiều khí và bụi gây ô nhiễm.`;
    }
    const why = [];
    if (sky === 'dem' && city.by.pin === 0) why.push('ban đêm pin Mặt Trời không phát điện');
    if (sky === 'may') why.push('trời nhiều mây làm pin Mặt Trời phát ít điện');
    if (wind === 'lang') why.push('trời lặng gió nên tua bin đứng yên');
    if (season === 'kho' && city.by['thuy-dien'] > 0) why.push('mùa khô hồ thuỷ điện ít nước');
    if (city.shortfall > 0) {
      return `Nguồn tái tạo phát ${MW(city.total)}, thành phố cần ${MW(city.demand)}: còn thiếu ${MW(city.shortfall)}, nhà máy nhiệt điện than phải bù.${why.length ? ` Vì ${why.join('; ')}.` : ' Hãy xây thêm hoặc chọn chỗ đặt phù hợp hơn.'}`;
    }
    return `Đủ điện! Nguồn tái tạo phát ${MW(city.total)}, đáp ứng đủ nhu cầu ${MW(city.demand)}${city.surplus > 0 ? ` (dư ${MW(city.surplus)})` : ''}; không cần đốt than. Thử đổi sang ban đêm, lặng gió hay mùa khô xem sao.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Công cụ"
    options={[
      { value: 'pin', label: 'Pin Mặt Trời' },
      { value: 'gio', label: 'Tua bin gió' },
      { value: 'thuy-dien', label: 'Thuỷ điện' },
      { value: 'go', label: 'Gỡ bỏ' },
    ]}
    bind:value={tool}
  />

  <div class="grid grid-cols-4 gap-1.5" role="group" aria-label="Bản đồ thành phố ảo">
    {#each TILES as kind, i (i)}
      {@const src = placements[i]}
      <button
        type="button"
        class="flex min-h-20 flex-col items-center justify-center rounded-lg border-2 p-1 text-center {TILE_BG[
          kind
        ]} {focusRing}"
        aria-label="Ô {i + 1}, {TILE_NAMES[kind]}{src
          ? `, có ${SOURCE_NAMES[src]} phát ${MW(output(src, kind, cond))}`
          : ', còn trống'}"
        onclick={() => tap(i)}
      >
        <span class="text-[11px] leading-tight text-slate-600">{TILE_NAMES[kind]}</span>
        {#if src}
          <span class="mt-1 rounded px-1 text-[11px] font-bold leading-tight text-slate-900">
            {SOURCE_NAMES[src]}
          </span>
          <span class="text-[11px] font-semibold tabular-nums text-emerald-700"
            >{MW(output(src, kind, cond))}</span
          >
        {/if}
      </button>
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SegmentedControl
      label="Bầu trời"
      options={[
        { value: 'nang', label: 'Ngày nắng' },
        { value: 'may', label: 'Nhiều mây' },
        { value: 'dem', label: 'Ban đêm' },
      ]}
      bind:value={sky}
    />
    <SegmentedControl
      label="Gió"
      options={[
        { value: 'manh', label: 'Mạnh' },
        { value: 'nhe', label: 'Nhẹ' },
        { value: 'lang', label: 'Lặng' },
      ]}
      bind:value={wind}
    />
    <SegmentedControl
      label="Mùa"
      options={[
        { value: 'mua', label: 'Mùa mưa' },
        { value: 'kho', label: 'Mùa khô' },
      ]}
      bind:value={season}
    />
  </div>

  <div class="{card} space-y-2 p-3">
    <p class="text-sm font-semibold text-slate-700">Sản lượng điện và nhu cầu</p>
    <div class="relative h-6 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
      <div class="flex h-full">
        {#each SOURCES as s (s)}
          <div class="{SOURCE_BAR[s]} h-full" style="width: {w(city.by[s])}"></div>
        {/each}
        <div
          class="h-full bg-slate-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,.25)_4px,rgba(0,0,0,.25)_8px)]"
          style="width: {w(city.shortfall)}"
        ></div>
      </div>
      <div class="absolute inset-y-0 w-0.5 bg-rose-600" style="left: {w(city.demand)}"></div>
    </div>
    <ul class="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
      {#each SOURCES as s (s)}
        <li class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-sm {SOURCE_BAR[s]}" aria-hidden="true"></span>
          <span class="flex-1">{SOURCE_NAMES[s]}</span>
          <span class="font-semibold tabular-nums">{MW(city.by[s])}</span>
        </li>
      {/each}
      <li class="flex items-center gap-2">
        <span class="h-3 w-3 rounded-sm bg-slate-500" aria-hidden="true"></span>
        <span class="flex-1">Nhiệt điện than (bù)</span>
        <span class="font-semibold tabular-nums">{MW(city.shortfall)}</span>
      </li>
    </ul>
    <p class="text-xs text-slate-500">Vạch đỏ: nhu cầu của thành phố ({MW(city.demand)}).</p>
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    <span class="block font-semibold">{message}</span>
    <span class="mt-1 block">{status}</span>
  </p>

  <button type="button" class={button.quiet} onclick={clearAll}>Xoá hết công trình</button>
  <p class="text-xs text-slate-500">Số liệu sản lượng là số minh hoạ, đã làm tròn.</p>
</div>
