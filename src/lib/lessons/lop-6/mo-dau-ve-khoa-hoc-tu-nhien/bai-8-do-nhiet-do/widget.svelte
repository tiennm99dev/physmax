<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { scaleTicks } from '#lib/domain/temperature.js';
  import { parseNumber } from '#lib/units-engine/format.js';
  import FeedbackNote from '../_shared/feedback-note.svelte';
  import {
    ROOM,
    SAMPLES,
    THERMOMETERS,
    judge,
    otherScales,
    restLevel,
    safeFor,
    step,
    toDivision,
  } from './engine.js';

  // Thermometer drawing: tube centred at TX, scale from BOTTOM up to TOP.
  const W = 220;
  const H = 420;
  const TX = 96;
  const TOP = 30;
  const BOTTOM = 350;
  const BULB_Y = 382;

  // Zoom window around the top of the column: 16 px per division.
  const ZW = 130;
  const ZH = 250;
  const ZPX = 16;
  const AIR = 'khong-khi';

  /** @type {import('./engine.js').Thermometer['id']} */
  let thId = $state('thuy-ngan');
  let where = $state(AIR);
  let lastSafe = AIR;
  /** @type {'F' | 'K'} */
  let second = $state('K');
  let level = $state(ROOM);
  let typed = $state('');
  /** @type {import('./engine.js').Verdict | 'chua-nhap' | 'chua-nhung' | null} */
  let verdict = $state(null);
  /** @type {string | null} */
  let refused = $state(null);

  const th = $derived(THERMOMETERS.find((t) => t.id === thId) ?? THERMOMETERS[0]);
  const sample = $derived(SAMPLES.find((s) => s.id === where) ?? null);
  const target = $derived(sample ? sample.temp : ROOM);
  const settled = $derived(
    (th.keepsMax && target <= level) || Math.abs(level - target) <= th.division / 2,
  );

  const y = $derived(linear(th.min, th.max, BOTTOM, TOP));
  const shownLevel = $derived(clamp(level, th.min, th.max));
  const ticks = $derived(scaleTicks(th.min, th.max, th.major, th.division));
  /** @param {number} v */
  const isMid = (v) => Math.abs(v / (5 * th.division) - Math.round(v / (5 * th.division))) < 1e-6;

  /** @param {number} v */
  const fromSecond = (v) => (second === 'F' ? (v - 32) / 1.8 : v - 273);
  const secondTicks = $derived.by(() => {
    const lo = second === 'F' ? otherScales(th.min).f : otherScales(th.min).k;
    const hi = second === 'F' ? otherScales(th.max).f : otherScales(th.max).k;
    const span = hi - lo;
    const big = span > 150 ? 20 : span > 40 ? 10 : 1;
    return scaleTicks(lo, hi, big, big / 2).map((t) => ({ ...t, py: y.map(fromSecond(t.value)) }));
  });

  const zoomTicks = $derived(
    ticks.filter((t) => Math.abs(t.value - shownLevel) <= 7 * th.division + 1e-9),
  );
  /** @param {number} v */
  const zy = (v) => ZH / 2 - ((v - shownLevel) / th.division) * ZPX;

  $effect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const every = reduce ? 500 : 100;
    const id = setInterval(() => {
      const next = step(th, level, target, every / 1000);
      if (next !== level) level = next;
    }, every);
    return () => clearInterval(id);
  });

  /** @param {string | number} id */
  function changeThermometer(id) {
    const t = THERMOMETERS.find((x) => x.id === id) ?? THERMOMETERS[0];
    level = restLevel(t);
    where = AIR;
    lastSafe = AIR;
    refused = null;
    verdict = null;
  }
  /** @param {string | number} id */
  function dip(id) {
    const s = SAMPLES.find((x) => x.id === id);
    verdict = null;
    if (s && !safeFor(th, s)) {
      refused = `Không nhúng được: ${lowerFirst(s.name)} khoảng ${formatNumber(s.temp, 1)} °C, cao hơn GHĐ ${formatNumber(th.max, 1)} °C của ${th.name.split(':')[0].toLowerCase()}. Chất lỏng sẽ dâng tràn ống và nhiệt kế có thể bị vỡ. Hãy chọn nhiệt kế khác.`;
      where = lastSafe;
      return;
    }
    refused = null;
    lastSafe = String(id);
  }
  function shake() {
    level = Math.min(level, th.min);
    verdict = null;
  }
  function record() {
    if (!sample) {
      verdict = 'chua-nhung';
      return;
    }
    const v = parseNumber(typed.replace(/°?\s*C$/i, ''));
    if (Number.isNaN(v)) {
      verdict = 'chua-nhap';
      return;
    }
    verdict = judge({ th, sample, level, typed: v });
  }

  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)} °C`;
  /** Lower-cases only the first letter, so names like Nam keep their capital. */
  const lowerFirst = (/** @type {string} */ t) => t.charAt(0).toLowerCase() + t.slice(1);
  const status = $derived(
    settled
      ? 'Cột chất lỏng đã đứng yên.'
      : level < target
        ? 'Cột chất lỏng đang dâng lên…'
        : 'Cột chất lỏng đang hạ xuống…',
  );

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    if (refused) return { tone: 'warn', text: refused };
    switch (verdict) {
      case null:
        return {
          tone: 'info',
          text: `${sample ? `Bầu nhiệt kế đang ở trong: ${lowerFirst(sample.name)}.` : 'Nhiệt kế đang ở ngoài không khí.'} ${status} Đợi cột chất lỏng đứng yên rồi đọc vạch ngang với đỉnh cột.`,
        };
      case 'chua-nhung':
        return { tone: 'warn', text: 'Hãy chọn nơi cần đo để nhúng bầu nhiệt kế vào trước.' };
      case 'chua-nhap':
        return { tone: 'warn', text: 'Hãy nhập kết quả bằng độ C, ví dụ 37,5.' };
      case 'ngoai-ghd':
        return {
          tone: 'warn',
          text: `Nhiệt độ cần đo nằm ngoài thang đo của nhiệt kế này (từ ${deg(th.min)} đến ${deg(th.max)}), nên cột chất lỏng không chỉ được. Hãy chọn nhiệt kế có thang đo phù hợp.`,
        };
      case 'chua-vay':
        return {
          tone: 'warn',
          text: 'Nhiệt kế y tế vẫn giữ số chỉ của lần đo trước nên cột thuỷ ngân cao hơn nhiệt độ thật. Lấy nhiệt kế ra, vẩy cho thuỷ ngân tụt xuống dưới vạch 35 °C rồi đo lại.',
        };
      case 'chua-on-dinh':
        return {
          tone: 'warn',
          text: 'Cột chất lỏng chưa đứng yên. Hãy đợi thêm một lúc để nhiệt kế nóng (hoặc lạnh) bằng vật cần đo rồi mới đọc.',
        };
      case 'sai-so':
        return {
          tone: 'warn',
          text: `Kết quả chưa đúng. Đọc vạch chia ngang với đỉnh cột chất lỏng; với nhiệt kế này kết quả ghi theo ĐCNN ${deg(th.division)}.`,
        };
      case 'dung': {
        const t = toDivision(sample?.temp ?? 0, th.division);
        const o = otherScales(t);
        return {
          tone: 'ok',
          text: `Chính xác: ${deg(t)}. Đổi sang thang khác: ${formatNumber(o.f, 2)} °F (${formatNumber(t, 1)} × 1,8 + 32) và ${formatNumber(o.k, 1)} K (${formatNumber(t, 1)} + 273).`,
        };
      }
    }
    return { tone: 'info', text: '' };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <div>
      <SegmentedControl
        label="Nhiệt kế"
        options={THERMOMETERS.map((t) => ({ value: t.id, label: t.name.split(':')[0] }))}
        bind:value={thId}
        onchange={changeThermometer}
      />
      <p class="mt-1 text-sm text-slate-600">
        {th.name}{th.keepsMax ? '' : `, đo từ ${deg(th.min)}`}
      </p>
    </div>
    <SegmentedControl
      label="Thang bên phải"
      options={[
        { value: 'K', label: 'Kelvin (K)' },
        { value: 'F', label: 'Fahrenheit (°F)' },
      ]}
      bind:value={second}
    />
  </div>

  <SegmentedControl
    label="Nhúng bầu nhiệt kế vào"
    options={[
      { value: AIR, label: 'Để ngoài không khí' },
      ...SAMPLES.map((s) => ({ value: s.id, label: s.name })),
    ]}
    bind:value={where}
    onchange={dip}
  />

  <div class="grid gap-4 sm:grid-cols-[auto_1fr]">
    <div class="flex justify-center gap-3">
      <figure class="{card} p-2">
        <svg
          viewBox="0 0 {W} {H}"
          class="block w-44 select-none"
          role="img"
          aria-label="{th.name.split(':')[0]}, thang °C bên trái, thang {second === 'F'
            ? '°F'
            : 'K'} bên phải. {status}"
        >
          <rect
            x={TX - 10}
            y={TOP - 14}
            width="20"
            height={BULB_Y - TOP}
            rx="10"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="2"
          />
          <circle cx={TX} cy={BULB_Y} r="22" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
          <rect
            x={TX - 5}
            y={y.map(shownLevel)}
            width="10"
            height={BULB_Y - y.map(shownLevel)}
            fill={th.liquid}
          />
          <circle cx={TX} cy={BULB_Y} r="17" fill={th.liquid} />
          {#each ticks as t (t.value)}
            {@const len = t.major ? 16 : isMid(t.value) ? 11 : 6}
            <line
              x1={TX - 12 - len}
              y1={y.map(t.value)}
              x2={TX - 12}
              y2={y.map(t.value)}
              stroke="#334155"
              stroke-width={t.major ? 1.5 : 0.8}
            />
            {#if t.major}
              <text
                x={TX - 32}
                y={y.map(t.value) + 4}
                text-anchor="end"
                class="fill-slate-700 text-[12px]">{formatNumber(t.value, 1)}</text
              >
            {/if}
          {/each}
          <text
            x={TX - 32}
            y={TOP - 18}
            text-anchor="end"
            class="fill-slate-700 text-[12px] font-bold">°C</text
          >
          {#each secondTicks as t (t.value)}
            <line
              x1={TX + 12}
              y1={t.py}
              x2={TX + 12 + (t.major ? 14 : 7)}
              y2={t.py}
              stroke="#2563eb"
              stroke-width={t.major ? 1.5 : 0.8}
            />
            {#if t.major}
              <text x={TX + 30} y={t.py + 4} class="fill-blue-700 text-[12px]"
                >{formatNumber(t.value, 1)}</text
              >
            {/if}
          {/each}
          <text x={TX + 30} y={TOP - 18} class="fill-blue-700 text-[12px] font-bold"
            >{second === 'F' ? '°F' : 'K'}</text
          >
        </svg>
      </figure>

      <figure class="{card} p-2">
        <svg
          viewBox="0 0 {ZW} {ZH}"
          class="block w-24"
          role="img"
          aria-label="Phóng to đỉnh cột chất lỏng, thang °C"
        >
          <rect x="70" y="0" width="30" height={ZH} fill="#f8fafc" stroke="#94a3b8" />
          <rect x="76" y={ZH / 2} width="18" height={ZH / 2} fill={th.liquid} />
          {#each zoomTicks as t (t.value)}
            {@const mid = isMid(t.value)}
            <line
              x1={mid ? 46 : 56}
              y1={zy(t.value)}
              x2="70"
              y2={zy(t.value)}
              stroke="#334155"
              stroke-width={mid ? 2 : 1}
            />
            {#if mid}
              <text
                x="42"
                y={zy(t.value) + 5}
                text-anchor="end"
                class="fill-slate-800 text-[14px] font-semibold">{formatNumber(t.value, 1)}</text
              >
            {/if}
          {/each}
        </svg>
        <figcaption class="text-center text-xs text-slate-600">Phóng to</figcaption>
      </figure>
    </div>

    <div class="{card} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700" aria-live="polite">{status}</p>
      {#if th.keepsMax}
        <button type="button" class={button.quiet} onclick={shake}>Vẩy nhiệt kế</button>
      {/if}
      <label class="block">
        <span class="mb-1 block text-sm font-semibold text-slate-700">Kết quả đo (°C)</span>
        <input
          class={textInput}
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed}
          onkeydown={(e) => {
            if (e.key === 'Enter') record();
          }}
        />
      </label>
      <button type="button" class={button.primary} onclick={record}>Ghi kết quả</button>
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
