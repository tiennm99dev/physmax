<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { centroid, hangAngle, isInside, placed } from './engine.js';

  const W = 360;
  const H = 300;
  const PIN = { x: 180, y: 34 };
  const PLATES = {
    'chu-nhat': {
      label: 'Hình chữ nhật',
      polygon: [
        { x: 0, y: 0 },
        { x: 150, y: 0 },
        { x: 150, y: 90 },
        { x: 0, y: 90 },
      ],
      holes: [
        { x: 12, y: 12 },
        { x: 138, y: 12 },
        { x: 75, y: 78 },
      ],
    },
    'tam-giac': {
      label: 'Tam giác',
      polygon: [
        { x: 0, y: 0 },
        { x: 170, y: 0 },
        { x: 40, y: 120 },
      ],
      holes: [
        { x: 18, y: 10 },
        { x: 140, y: 10 },
        { x: 40, y: 100 },
      ],
    },
    'chu-l': {
      label: 'Chữ L',
      polygon: [
        { x: 0, y: 0 },
        { x: 150, y: 0 },
        { x: 150, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 150 },
        { x: 0, y: 150 },
      ],
      holes: [
        { x: 12, y: 12 },
        { x: 138, y: 25 },
        { x: 25, y: 138 },
      ],
    },
  };
  const OPTIONS = Object.entries(PLATES).map(([value, p]) => ({ value, label: p.label }));
  const NAMES = ['A', 'B', 'C'];

  /** @typedef {keyof typeof PLATES} PlateId */

  /** @type {PlateId} */
  let plateId = $state('chu-l');
  let current = $state(0);
  /** @type {number[]} */
  let traced = $state([0]);

  const plate = $derived(PLATES[plateId]);
  const center = $derived(centroid(plate.polygon));
  const hole = $derived(plate.holes[current]);
  const angle = $derived(hangAngle(hole, center));
  const outside = $derived(!isInside(center, plate.polygon));

  /** @param {{ x: number, y: number }} p */
  const onBoard = (p) => placed(p, hole, PIN, angle);

  const outline = $derived(
    plate.polygon
      .map(onBoard)
      .map((p) => `${p.x},${p.y}`)
      .join(' '),
  );

  /** A traced line, drawn on the plate from its hole through the centre and past it. */
  const lineOf = (/** @type {number} */ i) => {
    const from = plate.holes[i];
    const beyond = {
      x: center.x + (center.x - from.x) * 0.6,
      y: center.y + (center.y - from.y) * 0.6,
    };
    return { a: onBoard(from), b: onBoard(beyond) };
  };

  /** @param {number} i */
  function hang(i) {
    current = i;
    if (!traced.includes(i)) traced = [...traced, i];
  }

  /** @param {string | number} id */
  function pickPlate(id) {
    plateId = /** @type {PlateId} */ (id);
    current = 0;
    traced = [0];
  }

  const found = $derived(traced.length >= 2);
  const note = $derived.by(() => {
    if (!found) {
      return 'Khi vật đứng yên, trọng lực cân bằng với lực căng dây, nên trọng tâm nằm trên đường thẳng đứng đi qua điểm treo. Treo tấm phẳng ở một lỗ khác để vẽ thêm một đường.';
    }
    if (outside) {
      return 'Các đường gặp nhau tại trọng tâm $G$. Với tấm chữ L, $G$ nằm ngoài phần vật liệu: trọng tâm không nhất thiết nằm trên vật.';
    }
    return 'Các đường đều đi qua một điểm: đó là trọng tâm $G$. Với tấm phẳng đồng chất, hình dạng đều đặn, $G$ trùng với tâm hình học của vật.';
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Tấm phẳng" options={OPTIONS} value={plateId} onchange={pickPlate} />

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Tấm ${plate.label} treo ở lỗ ${NAMES[current]}. ${found ? 'Các đường dây dọi gặp nhau tại trọng tâm.' : 'Đã vẽ một đường dây dọi.'}`}
    >
      <rect x={PIN.x - 40} y="6" width="80" height="6" fill="#475569" />
      <line x1={PIN.x} y1="12" x2={PIN.x} y2={PIN.y} stroke="#475569" stroke-width="2" />
      <polygon
        points={outline}
        fill="#fde68a"
        fill-opacity="0.75"
        stroke="#b45309"
        stroke-width="2"
      />

      {#each traced as i (i)}
        {@const line = lineOf(i)}
        <line
          x1={line.a.x}
          y1={line.a.y}
          x2={line.b.x}
          y2={line.b.y}
          stroke={i === current ? '#e11d48' : '#94a3b8'}
          stroke-width="2"
          stroke-dasharray={i === current ? undefined : '6 4'}
        />
      {/each}

      {#each plate.holes as h, i (i)}
        {@const p = onBoard(h)}
        <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#334155" stroke-width="1.5" />
        <text x={p.x + 7} y={p.y + 4} font-size="12" font-weight="700" fill="#334155"
          >{NAMES[i]}</text
        >
      {/each}

      {#if found}
        {@const g = onBoard(center)}
        <circle cx={g.x} cy={g.y} r="5" fill="#4f46e5" />
        <text x={g.x + 8} y={g.y - 6} font-size="14" font-weight="700" fill="#4f46e5">G</text>
      {/if}
    </svg>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each NAMES as name, i (name)}
      <button
        type="button"
        class={i === current ? button.primary : button.quiet}
        onclick={() => hang(i)}
        aria-pressed={i === current}
      >
        {`Treo ở lỗ ${name}`}
      </button>
    {/each}
  </div>

  <FeedbackNote tone={found ? 'ok' : 'info'} text={note} />
</div>
