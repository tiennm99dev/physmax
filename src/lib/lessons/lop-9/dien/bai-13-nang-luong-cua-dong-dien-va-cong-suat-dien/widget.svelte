<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { GROUP, formatNumber, numTex } from '#lib/core/number-format.js';
  import { card } from '#lib/core/ui.js';
  import { APPLIANCES, DAYS, METER_START, meterDigits, monthlyBill } from './engine.js';

  /** Hours of use a day per appliance, kept in half hours so the stepper counts whole steps. */
  let halves = $state(APPLIANCES.map((a) => a.half));
  let price = $state(2000);

  const bill = $derived(
    monthlyBill(
      APPLIANCES.map((a, i) => ({ name: a.name, power: a.power, hours: halves[i] / 2 })),
      price,
    ),
  );
  const start = meterDigits(METER_START);
  const end = $derived(meterDigits(bill.meterEnd));

  /** @typedef {ReturnType<typeof monthlyBill>['rows'][number]} Row */

  /** A number grouped the book's way, by a narrow space: 1 282,2; 74 400. */
  const num = (/** @type {number} */ v, d = 2) => formatNumber(v, d).replaceAll('.', GROUP);
  const kwh = (/** @type {number} */ v) => num(v, 2);
  const hoursText = (/** @type {number} */ half) => num(half / 2);

  const feedback = $derived.by(() => {
    if (!bill.top) {
      return 'Chưa bật thiết bị nào: công tơ đứng yên, tiền điện bằng $0$. Tăng số giờ dùng mỗi ngày của một thiết bị.';
    }
    const top = bill.top;
    const share = Math.round((top.month / bill.total) * 100);
    let text = `Trong ${DAYS} ngày, công tơ tăng từ ${num(METER_START)} lên ${num(bill.meterEnd, 1)}: gia đình dùng ${kwh(bill.total)} kWh, trả ${num(bill.cost)} đồng. ${top.name} tốn điện nhất: $W = \\mathcal{P} \\cdot t = ${numTex(top.power / 1000, 3)}\\ \\text{kW} \\cdot ${numTex(top.hours)}\\ \\text{h}$ mỗi ngày, chiếm khoảng ${share}% số điện.`;
    const rows = bill.rows.filter((r) => r.month > 0);
    // The starkest pair: the low-power device used most against the
    // high-power device used least.
    const big = rows
      .filter((r) => r.power >= 500)
      .reduce((m, r) => (m === null || r.day < m.day ? r : m), /** @type {Row | null} */ (null));
    const small = rows
      .filter((r) => r.power < 500)
      .reduce((m, r) => (m === null || r.day > m.day ? r : m), /** @type {Row | null} */ (null));
    if (big && small && small.day > big.day) {
      text += ` Chú ý: ${small.name} công suất nhỏ (${num(small.power)} W) nhưng dùng lâu nên tốn điện hơn ${big.name.toLowerCase()} (${num(big.power)} W): năng lượng điện phụ thuộc cả công suất lẫn thời gian dùng.`;
    }
    return text;
  });
</script>

<div class="space-y-4">
  <ul class="space-y-2" aria-label="Thiết bị dùng ở hiệu điện thế 220 V">
    {#each APPLIANCES as a, i (a.id)}
      {@const row = bill.rows[i]}
      <li
        class="{card} flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-3 {row.month > 0
          ? ''
          : 'opacity-70'}"
      >
        <Stepper
          label="{a.name} ({num(a.power)} W), số giờ/ngày"
          bind:value={halves[i]}
          min={0}
          max={48}
          format={hoursText}
        />
        <p class="text-sm tabular-nums text-slate-700">
          {kwh(row.day)} kWh/ngày · <span class="font-semibold">{kwh(row.month)} kWh/tháng</span>
        </p>
      </li>
    {/each}
  </ul>

  <SliderField
    label="Giá điện giả định cho 1 kWh"
    bind:value={price}
    min={1500}
    max={3500}
    step={100}
    unit="đồng"
    format={(v) => num(v)}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    {#each [{ title: 'Công tơ đầu tháng', d: start, v: METER_START }, { title: `Công tơ sau ${DAYS} ngày`, d: end, v: bill.meterEnd }] as m (m.title)}
      <figure class="{card} p-3 text-center">
        <figcaption class="mb-2 text-sm font-semibold text-slate-700">{m.title} (kWh)</figcaption>
        <div
          class="inline-flex gap-1 rounded-lg bg-slate-800 p-2 font-mono text-xl text-white"
          aria-hidden="true"
        >
          {#each m.d.whole as digit, k (k)}
            <span class="w-6 rounded bg-slate-900 py-1">{digit}</span>
          {/each}
          <span class="w-6 rounded bg-rose-700 py-1">{m.d.tenths}</span>
        </div>
        <p class="sr-only">{num(m.v, 1)} kWh</p>
      </figure>
    {/each}
  </div>

  <div class="{card} grid grid-cols-2 gap-2 p-3 text-center" aria-live="polite">
    <div>
      <p class="text-sm text-slate-600">Số điện tháng này</p>
      <p class="text-lg font-bold text-indigo-700 tabular-nums">{kwh(bill.total)} kWh</p>
    </div>
    <div>
      <p class="text-sm text-slate-600">Tiền điện</p>
      <p class="text-lg font-bold text-indigo-700 tabular-nums">{num(bill.cost)} đồng</p>
    </div>
  </div>

  <FeedbackNote tone={bill.top ? 'ok' : 'info'} text={feedback} />
</div>
