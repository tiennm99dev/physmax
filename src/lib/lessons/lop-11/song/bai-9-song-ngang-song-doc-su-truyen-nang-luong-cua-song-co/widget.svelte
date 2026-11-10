<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    AMPLITUDE,
    COUNT,
    MODES,
    compressions,
    directionRight,
    particles,
    rarefactions,
  } from './engine.js';

  const W = 360;
  const H = 160;
  const X0 = 22;
  const STEP = 13.25;
  const MID = 78;
  const ACROSS = 24;
  const DIRECTIONS = [
    { value: 'vuong-goc', label: 'Vuông góc với phương truyền' },
    { value: 'trung', label: 'Trùng với phương truyền' },
  ];

  let mode = $state('ngang');
  let t = $state(0);
  let running = $state(false);
  let marked = $state(12);
  /** @type {Record<string, string>} */
  let answers = $state({ ngang: '', doc: '' });

  const row = $derived(particles(mode, t));
  const dot = $derived(row[marked]);
  const answer = $derived(answers[mode]);
  const solved = $derived(MODES.filter((m) => directionRight(m.value, answers[m.value])).length);
  const crowd = $derived(mode === 'doc' ? compressions(t) : []);
  const thin = $derived(mode === 'doc' ? rarefactions(t) : []);

  /** @param {number} x spacings */
  const px = (x) => X0 + x * STEP;
  /** @param {number} y spacings */
  const py = (y) => MID - y * ACROSS;

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      t = (t + dt * 0.4) % 2;
    });
  });

  function play() {
    if (reducedMotion()) {
      t = (t + 0.125) % 2;
      return;
    }
    running = !running;
  }

  const note = $derived.by(() => {
    if (!answer) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Theo dõi hạt đỏ trong vài chu kì rồi chọn phương dao động của nó so với phương truyền sóng (mũi tên xanh).',
      };
    }
    const right = directionRight(mode, answer);
    if (!right) {
      return {
        tone: /** @type {const} */ ('warn'),
        text:
          mode === 'ngang'
            ? 'Chưa đúng. Hạt đỏ có chạy dọc theo sợi dây không? Hãy nhìn vệt mờ mà nó để lại.'
            : 'Chưa đúng. Hạt đỏ có rời khỏi trục lò xo không? Hãy nhìn vệt mờ mà nó để lại.',
      };
    }
    const done =
      solved === 2
        ? ' Em đã phân biệt được cả hai loại sóng.'
        : ' Chuyển sang loại sóng còn lại để so sánh.';
    return {
      tone: /** @type {const} */ ('ok'),
      text:
        mode === 'ngang'
          ? `Đúng: các phần tử dây dao động vuông góc với phương truyền sóng, đó là sóng ngang.${done}`
          : `Đúng: các vòng lò xo dao động dọc theo phương truyền sóng, tạo ra các vùng nén và vùng dãn xen kẽ, đó là sóng dọc.${done}`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Mô hình" options={MODES} bind:value={mode} />

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label={mode === 'ngang'
        ? `Sợi dây gồm ${COUNT} phần tử, sóng truyền sang phải. Phần tử đánh dấu số ${marked + 1} lệch ${formatNumber(dot.y, 2)} đơn vị khỏi vị trí cân bằng theo phương thẳng đứng.`
        : `Lò xo gồm ${COUNT} vòng, sóng truyền sang phải. Vòng đánh dấu số ${marked + 1} lệch ${formatNumber(dot.x - marked, 2)} đơn vị khỏi vị trí cân bằng theo phương ngang.`}
    >
      <defs>
        <marker
          id="song-9-head"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
        </marker>
      </defs>
      <line
        x1={px(0)}
        x2={px(9)}
        y1={18}
        y2={18}
        stroke="#0f766e"
        stroke-width="2"
        marker-end="url(#song-9-head)"
      />
      <text x={px(9) + 6} y={22} font-size="11" fill="#0f766e">phương truyền sóng</text>
      <line x1={px(0)} x2={px(COUNT - 1)} y1={MID} y2={MID} stroke="#e2e8f0" />

      {#if mode === 'ngang'}
        <rect
          x={px(marked) - 4}
          y={py(AMPLITUDE) - 2}
          width="8"
          height={2 * AMPLITUDE * ACROSS + 4}
          rx="4"
          fill="#fecdd3"
        />
        <polyline
          points={row.map((p) => `${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ')}
          fill="none"
          stroke="#94a3b8"
          stroke-width="1.5"
        />
        {#each row as p (p.i)}
          <circle cx={px(p.x)} cy={py(p.y)} r="4" fill={p.i === marked ? '#be123c' : '#4f46e5'} />
        {/each}
      {:else}
        <rect
          x={px(marked - AMPLITUDE) - 2}
          y={MID - 20}
          width={2 * AMPLITUDE * STEP + 4}
          height="40"
          rx="4"
          fill="#fecdd3"
        />
        {#each row as p (p.i)}
          <line
            x1={px(p.x)}
            x2={px(p.x)}
            y1={MID - 16}
            y2={MID + 16}
            stroke={p.i === marked ? '#be123c' : '#4f46e5'}
            stroke-width={p.i === marked ? 3.5 : 2}
          />
        {/each}
        {#each crowd as x (x)}
          <text
            x={px(x)}
            y={MID + 34}
            font-size="11"
            font-weight="600"
            fill="#b45309"
            text-anchor="middle"
          >
            nén
          </text>
        {/each}
        {#each thin as x (x)}
          <text x={px(x)} y={MID + 34} font-size="11" fill="#475569" text-anchor="middle">dãn</text>
        {/each}
      {/if}
      <text x={px(0)} y={H - 8} font-size="10" fill="#475569">nguồn</text>
    </svg>
    <p class="px-2 text-sm text-slate-600">
      Vệt hồng là vùng mà phần tử đánh dấu (màu đỏ) quét qua khi dao động.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={play} aria-pressed={running}>
      {running ? 'Dừng' : 'Cho sóng chạy'}
    </button>
    <div class="min-w-48 flex-1">
      <SliderField
        label="Phần tử đánh dấu"
        bind:value={marked}
        min={0}
        max={COUNT - 1}
        format={(v) => `số ${v + 1}`}
      />
    </div>
  </div>

  <SegmentedControl
    label="Phần tử đánh dấu dao động theo phương nào?"
    options={DIRECTIONS}
    bind:value={answers[mode]}
  />
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
