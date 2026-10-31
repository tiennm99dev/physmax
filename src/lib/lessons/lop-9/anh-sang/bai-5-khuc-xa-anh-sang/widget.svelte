<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import BoundaryView from '../_shared/boundary-view.svelte';
  import { MEDIA, boundary } from '../_shared/light.js';
  import { lawCheck } from './engine.js';

  /** @type {'nuoc' | 'thuy-tinh'} */
  let medium = $state('nuoc');
  /** @type {'vao' | 'ra'} */
  let direction = $state('vao');
  let incidence = $state(30);
  /** @type {Array<{ i: number, r: number, ratio: number }>} */
  let rows = $state([]);

  const other = $derived(MEDIA[medium]);
  const n1 = $derived(direction === 'vao' ? 1 : other.n);
  const n2 = $derived(direction === 'vao' ? other.n : 1);
  const top = $derived(direction === 'vao' ? 'Không khí' : cap(other.name));
  const bottom = $derived(direction === 'vao' ? cap(other.name) : 'Không khí');
  const b = $derived(boundary(n1, n2, incidence));
  const check = $derived(lawCheck(rows, n2 / n1));

  /** @param {string} s */
  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function reset() {
    rows = [];
  }
  function record() {
    if (b.refraction === null || b.ratio === null) return;
    if (rows.some((row) => row.i === incidence)) return;
    rows = [...rows, { i: incidence, r: b.refraction, ratio: b.ratio }]
      .sort((a, c) => a.i - c.i)
      .slice(-6);
  }

  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)}°`;
  const canRecord = $derived(
    b.refraction !== null && incidence > 0 && !rows.some((row) => row.i === incidence),
  );

  const feedback = $derived.by(() => {
    if (b.refraction === null) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Không còn tia khúc xạ: toàn bộ ánh sáng bị phản xạ trở lại ${other.name}. Đó là hiện tượng phản xạ toàn phần, em sẽ học ở bài sau. Giảm góc tới để thấy lại tia khúc xạ.`,
      };
    }
    if (incidence === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Tia tới vuông góc với mặt phân cách ($i = 0^\\circ$) thì truyền thẳng, không bị gãy khúc ($r = 0^\\circ$).',
      };
    }
    const side =
      n2 > n1
        ? `Góc khúc xạ nhỏ hơn góc tới: tia khúc xạ lệch lại gần pháp tuyến vì ${bottom.toLowerCase()} chiết quang hơn ${top.toLowerCase()}.`
        : `Góc khúc xạ lớn hơn góc tới: tia khúc xạ lệch xa pháp tuyến vì ${bottom.toLowerCase()} kém chiết quang hơn ${top.toLowerCase()}.`;
    if (check.enough) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${side} Với ${rows.length} lần đo, tỉ số $\\dfrac{\\sin i}{\\sin r}$ luôn bằng ${formatFixed(check.mean, 2)}: đúng bằng $\\dfrac{n_2}{n_1}$, định luật khúc xạ được nghiệm đúng.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${side} Ghi số liệu ở ít nhất ba góc tới khác nhau rồi so sánh các tỉ số $\\dfrac{\\sin i}{\\sin r}$.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Môi trường thứ hai"
      options={[
        { value: 'nuoc', label: 'Nước' },
        { value: 'thuy-tinh', label: 'Thuỷ tinh' },
      ]}
      bind:value={medium}
      onchange={reset}
    />
    <SegmentedControl
      label="Chiều truyền ánh sáng"
      options={[
        { value: 'vao', label: 'Từ không khí vào' },
        { value: 'ra', label: 'Ra không khí' },
      ]}
      bind:value={direction}
      onchange={reset}
    />
  </div>

  <BoundaryView {n1} {n2} topName={top} bottomName={bottom} bind:incidence />
  <SliderField label="Góc tới i" bind:value={incidence} min={0} max={85} unit="°" />

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Góc tới i</dt>
      <dd class="font-semibold">{deg(incidence)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Góc khúc xạ r</dt>
      <dd class="font-semibold">{b.refraction === null ? 'không có' : deg(b.refraction)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">sin i</dt>
      <dd class="font-semibold">{formatFixed(b.sinI, 3)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">sin r</dt>
      <dd class="font-semibold">{b.sinR === null ? '–' : formatFixed(b.sinR, 3)}</dd>
    </div>
  </dl>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record} disabled={!canRecord}>
      Ghi số liệu
    </button>
    <button type="button" class={button.quiet} onclick={reset} disabled={rows.length === 0}>
      Xoá bảng
    </button>
  </div>

  {#if rows.length}
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="pb-1 text-left text-sm font-semibold text-slate-700">
        Bảng số liệu ({top.toLowerCase()} → {bottom.toLowerCase()})
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="p-1">Lần</th>
          <th class="p-1">i</th>
          <th class="p-1">r</th>
          <th class="p-1">sin i / sin r</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row, k (row.i)}
          <tr class="border-b border-slate-100">
            <td class="p-1">{k + 1}</td>
            <td class="p-1">{deg(row.i)}</td>
            <td class="p-1">{deg(row.r)}</td>
            <td class="p-1">{formatFixed(row.ratio, 2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
