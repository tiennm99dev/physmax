<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { BULBS, split, totalFor } from './engine.js';

  const W = 400;
  const ROW_H = 100;
  const MAX_BAND = 64; // pixels for the largest total shown

  let mode = $state('dien-nang');
  let total = $state(60);
  let light = $state(10);

  const rows = $derived(
    BULBS.map((b) => {
      const t = mode === 'dien-nang' ? total : totalFor(b.id, light);
      return { bulb: b, ...split(b.id, t) };
    }),
  );
  const scale = $derived(MAX_BAND / Math.max(...rows.map((r) => r.total)));
  const J = (/** @type {number} */ v) => `${formatNumber(v, 1)} J`;
  const pct = (/** @type {number} */ v) => `${formatNumber(v * 100, 0)}%`;

  /**
   * Sankey band shapes for one row: the input bar splits into a light band
   * going straight on and a heat band bending down.
   * @param {{ total: number, useful: number, wasted: number }} r @param {number} top
   */
  function shapes(r, top) {
    const h = r.total * scale;
    const u = r.useful * scale;
    const w = r.wasted * scale;
    const y0 = top + (MAX_BAND - h) / 2 + 18;
    const lightY = y0 - 4;
    const heatY = y0 + u + 10;
    return {
      bar: { y: y0, h },
      light: `M 90 ${y0} C 160 ${y0}, 170 ${lightY}, 250 ${lightY} L 250 ${lightY + u} C 170 ${lightY + u}, 160 ${y0 + u}, 90 ${y0 + u} Z`,
      heat: `M 90 ${y0 + u} C 160 ${y0 + u}, 170 ${heatY}, 250 ${heatY} L 250 ${heatY + w} C 170 ${heatY + w}, 160 ${y0 + u + w}, 90 ${y0 + u + w} Z`,
      lightMid: lightY + u / 2,
      heatMid: heatY + w / 2,
    };
  }

  const feedback = $derived.by(() => {
    const [f, , led] = rows;
    if (mode === 'dien-nang') {
      return `Cùng nhận ${J(total)} điện năng mỗi giây: đèn sợi đốt chỉ cho ${J(f.useful)} quang năng có ích, hao phí ${J(f.wasted)} dưới dạng nhiệt; đèn LED cho ${J(led.useful)} quang năng, hao phí ${J(led.wasted)}. Đèn LED sáng hơn và ít nóng hơn.`;
    }
    return `Để cùng phát ra ${J(light)} quang năng mỗi giây, đèn sợi đốt cần ${J(f.total)} điện năng còn đèn LED chỉ cần ${J(led.total)}. Dùng đèn LED tiết kiệm được ${J(f.total - led.total)} mỗi giây.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="So sánh ba loại đèn"
    options={[
      { value: 'dien-nang', label: 'Cùng điện năng cung cấp' },
      { value: 'do-sang', label: 'Cùng độ sáng' },
    ]}
    bind:value={mode}
  />
  {#if mode === 'dien-nang'}
    <SliderField
      label="Điện năng cung cấp cho mỗi đèn trong 1 giây"
      bind:value={total}
      min={20}
      max={100}
      step={10}
      unit="J"
    />
  {:else}
    <SliderField
      label="Quang năng (ánh sáng) cần có trong 1 giây"
      bind:value={light}
      min={4}
      max={20}
      step={2}
      unit="J"
    />
  {/if}

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {ROW_H * rows.length}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label={rows
        .map(
          (r) =>
            `${r.bulb.name}: điện năng ${J(r.total)}, quang năng có ích ${J(r.useful)}, nhiệt năng hao phí ${J(r.wasted)}.`,
        )
        .join(' ')}
    >
      {#each rows as r, i (r.bulb.id)}
        {@const top = i * ROW_H}
        {@const s = shapes(r, top)}
        <text x="4" y={top + 11} class="fill-slate-800 text-[11px] font-bold">{r.bulb.name}</text>
        <rect x="56" y={s.bar.y} width="34" height={s.bar.h} fill="#0ea5e9" />
        <text x="4" y={s.bar.y + s.bar.h / 2 + 4} class="fill-sky-800 text-[10px]"
          >{J(r.total)}</text
        >
        <path d={s.light} fill="#facc15" opacity="0.9" />
        <path d={s.heat} fill="#ef4444" opacity="0.7" />
        <text x="256" y={s.lightMid + 4} class="fill-yellow-800 text-[10px] font-semibold"
          >Có ích {J(r.useful)} ({pct(r.bulb.useful)})</text
        >
        <text x="256" y={s.heatMid + 4} class="fill-red-800 text-[10px] font-semibold"
          >Hao phí {J(r.wasted)}</text
        >
      {/each}
    </svg>
    <figcaption class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 text-xs text-slate-600">
      <span class="text-sky-700">Xanh: điện năng cung cấp (toàn phần)</span>
      <span class="text-yellow-700">Vàng: quang năng có ích</span>
      <span class="text-red-700">Đỏ: nhiệt năng hao phí</span>
    </figcaption>
  </figure>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {feedback}
  </p>
  <p class="text-xs text-slate-500">
    Tỉ lệ có ích là số gần đúng: đèn sợi đốt khoảng 10%, đèn compact khoảng 25%, đèn LED khoảng 40%.
  </p>
</div>
