<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { criticalAngle } from '#lib/domain/optics.js';
  import { fibrePath } from './engine.js';

  const W = 360;
  const H = 210;
  const X0 = 30;
  const LEN = 310;
  const TOP = 75;
  const CORE = 60;
  const CLAD = 22;
  const N1 = 1.5;
  const RAD = Math.PI / 180;

  let theta = $state(20);
  /** @type {'thap' | 'cao'} */
  let cladding = $state('thap');

  const n2 = $derived(cladding === 'thap' ? 1.2 : 1.6);
  const path = $derived(fibrePath({ theta, n1: N1, n2, length: LEN, width: CORE }));
  const critical = $derived(criticalAngle(N1, n2));
  const delivered = $derived(Math.round(path.delivered * 100));
  const deg = (/** @type {number} */ v) => `${formatNumber(v, 1)}°`;

  /** @param {{ x: number, y: number, up: boolean, angle: number }} leak */
  function leakEnd(leak) {
    const len = CLAD + 30;
    return {
      x: X0 + leak.x + Math.sin(leak.angle * RAD) * len,
      y: TOP + leak.y + (leak.up ? -1 : 1) * Math.cos(leak.angle * RAD) * len,
    };
  }

  const feedback = $derived.by(() => {
    if (theta === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Tia sáng đi dọc theo trục sợi nên không chạm thành sợi lần nào. Tăng góc giữa tia sáng và trục sợi để thấy tia sáng gặp thành sợi.',
      };
    }
    if (critical === null) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Vỏ có chiết suất $${texNumber(formatNumber(n2, 1))}$ lớn hơn lõi: ánh sáng đi từ lõi ra vỏ không bao giờ phản xạ toàn phần, nên ánh sáng thoát ra ngoài ở mỗi lần chạm thành sợi. Chỉ ${delivered}% ánh sáng tới được đầu kia.`,
      };
    }
    if (path.total) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Góc tới ở thành sợi là ${deg(path.wallIncidence)}, không nhỏ hơn góc tới hạn ${deg(critical)}: tia sáng phản xạ toàn phần liên tiếp và truyền tới đầu kia mà gần như không mất ánh sáng.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Góc tới ở thành sợi chỉ là ${deg(path.wallIncidence)}, nhỏ hơn góc tới hạn ${deg(critical)}: mỗi lần chạm thành, một phần ánh sáng khúc xạ ra vỏ. Chỉ ${delivered}% ánh sáng tới được đầu kia. Giảm góc của tia sáng so với trục sợi.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chiết suất của vỏ (lõi có n = 1,5)"
    options={[
      { value: 'thap', label: 'Vỏ n = 1,2' },
      { value: 'cao', label: 'Vỏ n = 1,6' },
    ]}
    bind:value={cladding}
  />
  <SliderField label="Góc giữa tia sáng và trục sợi" bind:value={theta} min={0} max={60} unit="°" />
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-md rounded-xl border border-slate-200 bg-slate-900"
    role="img"
    aria-label="Sợi quang: tia sáng hợp với trục sợi góc {deg(
      theta,
    )}, tới được đầu kia {delivered}% ánh sáng."
  >
    <rect x={X0} y={TOP - CLAD} width={LEN} height={CORE + 2 * CLAD} fill="#475569" />
    <rect x={X0} y={TOP} width={LEN} height={CORE} fill="#1e3a8a" />
    <text x={X0 + 4} y={TOP - CLAD - 6} font-size="12" fill="#cbd5e1"
      >vỏ (n = {formatNumber(n2, 1)})</text
    >
    <text x={X0 + 4} y={TOP + CORE - 6} font-size="12" fill="#bfdbfe">lõi (n = 1,5)</text>
    <circle cx={X0 - 12} cy={TOP + CORE / 2} r="7" fill="#fbbf24" />
    <line
      x1={X0 - 12}
      y1={TOP + CORE / 2}
      x2={X0}
      y2={TOP + CORE / 2}
      stroke="#fbbf24"
      stroke-width="2.5"
    />
    {#each path.segments as s, k (k)}
      <line
        x1={X0 + s.x1}
        y1={TOP + s.y1}
        x2={X0 + s.x2}
        y2={TOP + s.y2}
        stroke="#fbbf24"
        stroke-width="2.5"
        opacity={Math.max(0.1, s.intensity)}
      />
    {/each}
    {#each path.leaks as leak, k (k)}
      {@const end = leakEnd(leak)}
      <line
        x1={X0 + leak.x}
        y1={TOP + leak.y}
        x2={end.x}
        y2={end.y}
        stroke="#f97316"
        stroke-width="2"
        opacity={Math.max(0.15, leak.intensity)}
      />
    {/each}
    <rect
      x={X0 + LEN}
      y={TOP}
      width="10"
      height={CORE}
      fill={delivered > 0 ? '#fde68a' : '#334155'}
      opacity={Math.max(0.2, path.delivered)}
    />
    <text x={W - 6} y={H - 8} text-anchor="end" font-size="13" fill="#fde68a"
      >tới đầu kia: {delivered}%</text
    >
  </svg>
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
