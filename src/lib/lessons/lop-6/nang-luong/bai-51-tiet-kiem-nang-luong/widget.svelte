<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import {
    BULB_NAMES,
    DAYS,
    DEVICES,
    PRICE,
    bestTip,
    houseUsage,
    powerOf,
    thriftySettings,
    wastefulSettings,
  } from './engine.js';

  const ROOMS = [...new Set(DEVICES.map((d) => d.room))];
  /** @type {Record<string, string>} */
  const ROOM_BG = {
    'Phòng khách': 'bg-amber-50',
    'Phòng ngủ': 'bg-sky-50',
    Bếp: 'bg-orange-50',
    'Phòng tắm': 'bg-cyan-50',
  };

  /** @returns {import('./engine.js').Settings} */
  function fresh() {
    const s = wastefulSettings();
    for (const d of DEVICES) {
      if (d.lamp) s.bulbs[d.id] = 'soi-dot';
      s.offWhenIdle[d.id] = false;
    }
    return s;
  }

  /** @type {import('./engine.js').Settings} */
  let settings = $state(fresh());

  const usage = $derived(houseUsage(settings));
  const worst = houseUsage(wastefulSettings());
  const best = houseUsage(thriftySettings());
  const tip = $derived(bestTip(settings));

  const kwh = (/** @type {number} */ v) => `${formatNumber(v, 2)} kWh`;
  const money = (/** @type {number} */ v) => `${fmt(Math.round(v))} đồng`;
  const w = (/** @type {number} */ v) => `${(v / worst.month) * 100}%`;

  const saved = $derived(worst.bill - usage.bill);

  const status = $derived.by(() => {
    const head = `Mỗi ngày ngôi nhà dùng ${kwh(usage.day)}; ${DAYS} ngày là ${kwh(usage.month)}, tiền điện ${money(usage.bill)}.`;
    if (!tip) {
      return `${head} Tuyệt vời! Mọi thói quen đều tiết kiệm: rẻ hơn ${money(saved)} mỗi tháng so với khi lãng phí, mà vẫn đủ ánh sáng, mát và nước nóng.`;
    }
    const lead =
      saved > 0
        ? `Đã tiết kiệm được ${money(saved)} mỗi tháng.`
        : 'Ngôi nhà đang lãng phí rất nhiều điện.';
    return `${head} ${lead} Gợi ý: ${tip.text} sẽ bớt thêm ${kwh(tip.savedMonth)}, tức ${money(tip.savedMonth * PRICE)} mỗi tháng.`;
  });

  /** @param {string} id */
  function toggle(id) {
    settings.offWhenIdle[id] = !settings.offWhenIdle[id];
  }

  function reset() {
    settings = fresh();
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    {#each ROOMS as room (room)}
      <section class="rounded-2xl p-3 {ROOM_BG[room]}" aria-label={room}>
        <h4 class="mb-2 text-sm font-bold text-slate-700">{room}</h4>
        <ul class="space-y-3">
          {#each usage.byDevice.filter((r) => r.device.room === room) as r (r.device.id)}
            {@const d = r.device}
            {@const off = settings.offWhenIdle[d.id]}
            <li class="space-y-2 rounded-xl bg-white/80 p-2">
              <div class="flex items-baseline justify-between gap-2 text-sm">
                <span class="font-semibold text-slate-800"
                  >{d.name}
                  <span class="font-normal text-slate-500">{powerOf(d, settings)} W</span></span
                >
                <span class="tabular-nums text-slate-600"
                  >{formatNumber(r.hours, 1)} giờ/ngày · {kwh(r.total)}</span
                >
              </div>
              <button
                type="button"
                class="flex min-h-11 w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm {off
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : 'border-rose-300 bg-rose-50 text-rose-800'} {focusRing}"
                aria-pressed={off}
                aria-label="{d.name}: tắt khi không dùng"
                onclick={() => toggle(d.id)}
              >
                <span
                  class="inline-block h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors motion-reduce:transition-none {off
                    ? 'bg-emerald-500'
                    : 'bg-slate-300'}"
                  aria-hidden="true"
                >
                  <span
                    class="block h-4 w-4 rounded-full bg-white transition-transform motion-reduce:transition-none {off
                      ? 'translate-x-4'
                      : ''}"
                  ></span>
                </span>
                <span>
                  {#if off}
                    Tắt khi không dùng: chỉ chạy {formatNumber(d.needHours, 1)} giờ cần thiết
                  {:else}
                    Lãng phí: {d.wasteLabel} (thêm {formatNumber(d.extraHours, 1)} giờ)
                  {/if}
                </span>
              </button>
              {#if d.lamp}
                <SegmentedControl
                  label="Loại bóng của {d.name.toLowerCase()}"
                  hideLabel
                  options={[
                    { value: 'soi-dot', label: BULB_NAMES['soi-dot'] },
                    { value: 'led', label: BULB_NAMES.led },
                  ]}
                  bind:value={settings.bulbs[d.id]}
                />
              {/if}
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>

  <label
    class="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
  >
    <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={settings.unplug} />
    Rút phích cắm ti vi, điều hoà khi không dùng (bỏ điện chờ)
  </label>

  <div class="{card} space-y-3 p-3">
    <p class="text-sm font-semibold text-slate-700">Hoá đơn tiền điện một tháng ({DAYS} ngày)</p>
    <div class="grid grid-cols-3 gap-2 text-center">
      <div class="rounded-lg bg-slate-50 p-2">
        <p class="text-xs text-slate-500">Mỗi ngày</p>
        <p class="font-bold tabular-nums text-slate-800">{kwh(usage.day)}</p>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <p class="text-xs text-slate-500">Mỗi tháng</p>
        <p class="font-bold tabular-nums text-slate-800">{kwh(usage.month)}</p>
      </div>
      <div class="rounded-lg bg-indigo-50 p-2">
        <p class="text-xs text-slate-500">Tiền điện</p>
        <p class="font-bold tabular-nums text-indigo-700">{money(usage.bill)}</p>
      </div>
    </div>
    <div class="relative h-6 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
      <div class="flex h-full">
        {#each usage.byDevice as r, i (r.device.id)}
          <div
            class="h-full border-r border-white transition-[width] motion-reduce:transition-none {i %
            2
              ? 'bg-indigo-400'
              : 'bg-indigo-600'}"
            style="width: {w(r.total * DAYS)}"
            title={r.device.name}
          ></div>
        {/each}
      </div>
      <div class="absolute inset-y-0 w-0.5 bg-emerald-600" style="left: {w(best.month)}"></div>
    </div>
    <p class="text-xs text-slate-500">
      Cả thanh: nhà lãng phí nhất ({kwh(worst.month)}, {money(worst.bill)}). Vạch xanh: nhà tiết
      kiệm nhất ({kwh(best.month)}, {money(best.bill)}). Mỗi đoạn là một thiết bị.
    </p>
  </div>

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700" aria-live="polite">
    {status}
  </p>

  <button type="button" class={button.quiet} onclick={reset}>Trở về nhà lãng phí</button>
  <p class="text-xs text-slate-500">
    Điện năng (kWh) = công suất (W) × thời gian (giờ) : 1 000. Giá điện minh hoạ {fmt(PRICE)} đồng/kWh.
  </p>
</div>
