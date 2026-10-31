<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import BoundaryView from '../_shared/boundary-view.svelte';
  import { MEDIA, boundary } from '../_shared/light.js';
  import { criticalGuessOk } from './engine.js';

  /** @type {'nuoc' | 'thuy-tinh'} */
  let medium = $state('nuoc');
  let incidence = $state(20);
  /** @type {null | { guess: number, ok: boolean }} */
  let answer = $state(null);

  const m = $derived(MEDIA[medium]);
  const b = $derived(boundary(m.n, 1, incidence));
  const critical = $derived(b.critical ?? 90);
  const reflectedPct = $derived(Math.round(b.reflected * 100));
  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)}°`;
  const name = $derived(m.name.charAt(0).toUpperCase() + m.name.slice(1));

  function changed() {
    answer = null;
  }
  function submit() {
    answer = { guess: incidence, ok: criticalGuessOk(m.n, 1, incidence) };
  }

  const feedback = $derived.by(() => {
    if (answer) {
      return answer.ok
        ? {
            tone: /** @type {const} */ ('ok'),
            text: `Đúng rồi! Góc tới hạn khi ánh sáng đi từ ${m.name} ra không khí là $i_\\text{th} \\approx ${texNumber(formatNumber(critical, 1))}^\\circ$ ($\\sin i_\\text{th} = \\dfrac{n_2}{n_1}$). Từ góc này trở lên, tia khúc xạ biến mất.`,
          }
        : {
            tone: /** @type {const} */ ('warn'),
            text: `Chưa đúng: ở góc tới ${deg(answer.guess)} ${b.total ? 'tia khúc xạ đã biến mất từ trước đó, hãy giảm góc tới' : 'vẫn còn tia khúc xạ, hãy tăng góc tới'} và tìm đúng góc mà tia khúc xạ vừa mất.`,
          };
    }
    if (b.total) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Góc tới ${deg(incidence)} lớn hơn hoặc bằng góc tới hạn: không còn tia khúc xạ, toàn bộ ánh sáng bị phản xạ trở lại ${m.name}. Đó là hiện tượng phản xạ toàn phần.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Góc khúc xạ ${deg(b.refraction ?? 0)} lớn hơn góc tới. Khoảng ${reflectedPct}% ánh sáng bị phản xạ, phần còn lại khúc xạ ra không khí. Tăng dần góc tới và quan sát tia khúc xạ.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Ánh sáng đi từ môi trường nào ra không khí?"
    options={[
      { value: 'nuoc', label: 'Nước' },
      { value: 'thuy-tinh', label: 'Thuỷ tinh' },
    ]}
    bind:value={medium}
    onchange={changed}
  />
  <BoundaryView
    n1={m.n}
    n2={1}
    topName={name}
    bottomName="Không khí"
    bind:incidence
    max={80}
    onchange={changed}
  />
  <SliderField
    label="Góc tới i"
    bind:value={incidence}
    min={0}
    max={80}
    unit="°"
    oninput={changed}
  />

  <div class="space-y-1 text-sm">
    <div class="flex justify-between text-slate-700">
      <span>Phản xạ: <strong class="tabular-nums">{reflectedPct}%</strong></span>
      <span>Khúc xạ: <strong class="tabular-nums">{100 - reflectedPct}%</strong></span>
    </div>
    <div
      class="flex h-4 overflow-hidden rounded-full bg-slate-200"
      role="img"
      aria-label="Phần ánh sáng bị phản xạ {reflectedPct}%, khúc xạ {100 - reflectedPct}%"
    >
      <div class="bg-rose-500" style:width="{reflectedPct}%"></div>
      <div class="bg-sky-400" style:width="{100 - reflectedPct}%"></div>
    </div>
    <p class="text-slate-600">
      Góc khúc xạ: <strong class="tabular-nums"
        >{b.refraction === null ? 'không có tia khúc xạ' : deg(b.refraction)}</strong
      >
    </p>
  </div>

  <div class="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-900">
    <p class="font-semibold">Thử thách: tìm góc tới hạn</p>
    <p>Tăng góc tới từng độ một. Khi tia khúc xạ vừa biến mất, nhấn nút bên dưới.</p>
    <button type="button" class="{button.secondary} mt-2" onclick={submit}>
      Tia khúc xạ vừa biến mất ở góc này
    </button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
