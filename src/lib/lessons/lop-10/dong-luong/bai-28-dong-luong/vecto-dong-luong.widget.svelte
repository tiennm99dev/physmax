<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { bounce } from './engine.js';

  const W = 360;
  const H = 180;
  const WALL = 340;
  const X0 = 210;
  /** Pixels per kg.m/s. */
  const SCALE = 7;
  /** Heights of the before, after and change arrows. */
  const ROWS = [50, 100, 150];

  let mass = $state(0.4);
  let v1 = $state(10);
  let v2 = $state(8);
  let ms = $state(20);

  const r = $derived(bounce(mass, v1, v2, ms));

  const note = $derived.by(() => {
    const working = `Chọn chiều dương hướng vào tường: $p_1 = ${numTex(r.p1, 2)}$, $p_2 = ${numTex(r.p2, 2)}$, nên $\\Delta p = p_2 - p_1 = ${numTex(r.change, 2)}$ kg.m/s. Lực của tường lên bóng $F = \\dfrac{\\Delta p}{\\Delta t} = ${numTex(r.force, 1)}$ N. Dấu âm cho biết lực hướng ra khỏi tường.`;
    return v2 === 0
      ? {
          tone: /** @type {const} */ ('info'),
          text: `${working} Bóng dừng hẳn: $\\vec{p_2} = \\vec{0}$ nên $|\\Delta p|$ bằng đúng $p_1$.`,
        }
      : {
          tone: /** @type {const} */ ('ok'),
          text: `${working} Vì động lượng là vectơ nên khi bóng bật ngược, $|\\Delta p|$ bằng tổng hai độ lớn chứ không phải hiệu của chúng.`,
        };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Bóng đập vào tường. Động lượng trước ${formatNumber(r.p1, 2)}, sau ${formatNumber(r.p2, 2)}, độ biến thiên ${formatNumber(r.change, 2)} ki-lô-gam mét trên giây.`}
    >
      <rect x={WALL} y="0" width={W - WALL} height={H} fill="#94a3b8" />
      <text x="8" y={ROWS[0] - 16} font-size="12" font-weight="600" fill="#4f46e5">Trước</text>
      <text x="8" y={ROWS[1] - 16} font-size="12" font-weight="600" fill="#0891b2">Sau</text>
      <text x="8" y={ROWS[2] - 16} font-size="12" font-weight="600" fill="#be123c">Biến thiên</text>
      <line x1={X0} x2={X0} y1="16" y2={H - 12} stroke="#cbd5e1" stroke-dasharray="4 3" />
      <circle cx={X0} cy="28" r="9" fill="#f59e0b" />
      <ForceArrow
        x1={X0}
        y1={ROWS[0]}
        x2={X0 + r.p1 * SCALE}
        y2={ROWS[0]}
        color="#4f46e5"
        label="p₁"
      />
      <ForceArrow
        x1={X0}
        y1={ROWS[1]}
        x2={X0 + r.p2 * SCALE}
        y2={ROWS[1]}
        color="#0891b2"
        label="p₂"
      />
      <ForceArrow
        x1={X0}
        y1={ROWS[2]}
        x2={X0 + r.change * SCALE}
        y2={ROWS[2]}
        color="#be123c"
        label="Δp"
      />
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Khối lượng bóng m"
      bind:value={mass}
      min={0.1}
      max={0.6}
      step={0.1}
      unit="kg"
      format={(v) => formatFixed(v, 1)}
    />
    <SliderField
      label="Tốc độ tới"
      bind:value={v1}
      min={5}
      max={20}
      step={1}
      unit="m/s"
      oninput={() => (v2 = Math.min(v2, v1))}
    />
    <SliderField label="Tốc độ bật ra" bind:value={v2} min={0} max={v1} step={1} unit="m/s" />
    <SliderField
      label="Thời gian tiếp xúc Δt"
      bind:value={ms}
      min={5}
      max={100}
      step={5}
      unit="ms"
    />
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
