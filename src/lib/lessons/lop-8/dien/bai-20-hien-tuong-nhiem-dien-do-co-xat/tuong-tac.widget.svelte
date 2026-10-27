<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';
  import { interaction } from './engine.js';

  const OPTIONS = [
    { value: '-1', label: 'Nhựa cọ len (−)' },
    { value: '1', label: 'Thủy tinh cọ lụa (+)' },
    { value: '0', label: 'Chưa cọ xát' },
  ];
  const NAME = /** @type {Record<number, string>} */ ({
    [-1]: 'nhiễm điện âm',
    1: 'nhiễm điện dương',
    0: 'chưa nhiễm điện',
  });

  let left = $state('-1');
  let right = $state('-1');
  const a = $derived(Number(left));
  const b = $derived(Number(right));

  const kind = $derived(interaction(a, b));
  // Horizontal swing of each hanging rod, in px: apart when they repel.
  const swing = $derived(kind === 'day' ? 34 : kind === 'hut' ? -26 : 0);

  const feedback = $derived.by(() => {
    if (kind === 'khong')
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Hai thanh đều chưa nhiễm điện: không hút, không đẩy nhau.',
      };
    if (kind === 'day')
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hai thanh cùng ${NAME[a]}: điện tích cùng loại nên đẩy nhau.`,
      };
    if (a === 0 || b === 0)
      return {
        tone: /** @type {const} */ ('ok'),
        text: 'Một thanh nhiễm điện, thanh kia chưa: vật nhiễm điện hút vật khác nên hai thanh lại gần nhau.',
      };
    return {
      tone: /** @type {const} */ ('ok'),
      text: 'Một thanh nhiễm điện âm, một thanh nhiễm điện dương: điện tích khác loại nên hút nhau.',
    };
  });

  /** @param {number} v */
  const sign = (v) => (v < 0 ? '−' : v > 0 ? '+' : '');
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl label="Thanh trái" options={OPTIONS} bind:value={left} />
    <SegmentedControl label="Thanh phải" options={OPTIONS} bind:value={right} />
  </div>
  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 220"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Hai thanh treo bằng sợi chỉ: thanh trái {NAME[a]}, thanh phải {NAME[b]}."
    >
      <line x1="40" y1="16" x2="320" y2="16" stroke="#64748b" stroke-width="4" />
      {#each [{ x: 140, v: a, dir: -1 }, { x: 220, v: b, dir: 1 }] as r (r.dir)}
        {@const bx = r.x + r.dir * swing}
        <line x1={r.x} y1="16" x2={bx} y2="150" stroke="#94a3b8" style="transition: all 0.5s" />
        <g style="transition: transform 0.5s" transform="translate({bx - r.x} 0)">
          <rect
            x={r.x - 9}
            y="150"
            width="18"
            height="56"
            rx="6"
            fill={r.v < 0 ? '#fde68a' : r.v > 0 ? '#e0f2fe' : '#f1f5f9'}
            stroke="#475569"
            stroke-width="2"
          />
          {#each [0, 1, 2] as k (k)}
            <text
              x={r.x}
              y={168 + k * 15}
              text-anchor="middle"
              class="text-[14px] font-bold {r.v < 0 ? 'fill-blue-700' : 'fill-red-600'}"
              >{sign(r.v)}</text
            >
          {/each}
        </g>
      {/each}
    </svg>
  </figure>
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
