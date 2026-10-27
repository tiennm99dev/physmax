<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { ROOM, SURFACES, bottleStep, heatColor, intensity } from './engine.js';

  /** Model seconds per real second. */
  const SPEED = 6;
  const LAMP_X = 34;
  const LAMP_Y = 110;
  const PX_PER_CM = 4.6;
  const ROWS = [62, 158];

  let on = $state(false);
  let screen = $state(false);
  let distance = $state(30);
  let temps = $state.raw(SURFACES.map(() => ROOM));
  /** Model seconds the lamp has been on. */
  let clock = $state(0);

  const still = reducedMotion();
  const power = $derived(intensity(distance, { on, screen }));
  const bottleX = $derived(LAMP_X + 18 + distance * PX_PER_CM);
  const busy = $derived(on || temps.some((t) => t > ROOM + 0.05));

  $effect(() => {
    if (!busy) return;
    return frameLoop((dt) => {
      const sim = dt * SPEED;
      temps = SURFACES.map((s, i) =>
        bottleStep(temps[i], sim, { absorb: s.absorb, intensity: power }),
      );
      if (on) clock += sim;
    });
  });

  function reset() {
    on = false;
    screen = false;
    temps = SURFACES.map(() => ROOM);
    clock = 0;
  }

  const feedback = $derived.by(() => {
    const [dark, white] = temps;
    if (!on && clock === 0)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: 'Hai bình giống nhau đặt cách đèn sưởi cùng một khoảng: một bình phủ đen, xù xì; một bình trắng, bóng. Bật đèn và so sánh nhiệt độ hai bình.',
      };
    if (on && screen)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: 'Tấm gỗ chắn giữa đèn và hai bình: các tia nhiệt truyền theo đường thẳng nên bị chặn lại, hai bình không nhận thêm năng lượng nhiệt và nguội dần.',
      };
    if (!on)
      return {
        tone: /** @type {'ok' | 'info'} */ ('info'),
        text: 'Đèn đã tắt: hai bình không nhận thêm tia nhiệt và nguội dần về nhiệt độ phòng.',
      };
    const gap = dark - white;
    return {
      tone: /** @type {'ok' | 'info'} */ ('ok'),
      text: `Đèn truyền năng lượng nhiệt cho hai bình bằng các tia nhiệt đi thẳng (bức xạ nhiệt), không cần không khí làm trung gian. Bình đen đang ở ${formatFixed(dark, 1)} °C, bình trắng ở ${formatFixed(white, 1)} °C${gap > 1 ? ': bề mặt sẫm màu, xù xì hấp thụ tia nhiệt tốt hơn bề mặt sáng màu, nhẵn bóng' : ''}. Đặt hai bình xa đèn hơn thì chúng nóng lên chậm hơn.`,
    };
  });
</script>

<div class="space-y-3">
  <figure class="{card} p-2">
    <svg
      viewBox="0 0 360 220"
      class="mx-auto block w-full max-w-lg"
      role="img"
      aria-label="Đèn sưởi {on
        ? 'đang bật'
        : 'đang tắt'}, cách hai bình {distance} xăng-ti-mét{screen
        ? ', có tấm gỗ chắn ở giữa'
        : ''}. Bình phủ đen {formatFixed(temps[0], 1)} độ C, bình trắng bóng {formatFixed(
        temps[1],
        1,
      )} độ C."
    >
      <!-- lamp -->
      <circle cx={LAMP_X} cy={LAMP_Y} r="16" fill={on ? '#f97316' : '#cbd5e1'} stroke="#475569" />
      <rect x={LAMP_X - 6} y={LAMP_Y + 16} width="12" height="80" fill="#94a3b8" />
      <text x={LAMP_X} y={LAMP_Y - 22} text-anchor="middle" class="fill-slate-700 text-[10px]"
        >đèn sưởi</text
      >
      {#if on}
        {#each ROWS as y (y)}
          {@const end = screen ? (LAMP_X + bottleX) / 2 - 6 : bottleX - 18}
          {#each [-6, 0, 6] as k (k)}
            <line
              x1={LAMP_X + 18}
              y1={LAMP_Y + k * 0.3 + (y - LAMP_Y) * 0.12}
              x2={end}
              y2={LAMP_Y + (y - LAMP_Y) * ((end - LAMP_X) / (bottleX - LAMP_X)) + k}
              stroke="#ef4444"
              stroke-width="1.6"
              stroke-dasharray="6 5"
              class={still ? '' : 'ray'}
              opacity={0.35 + 0.65 * Math.min(1, power)}
            />
          {/each}
        {/each}
      {/if}
      {#if screen}
        <rect x={(LAMP_X + bottleX) / 2 - 6} y="20" width="10" height="186" fill="#a16207" />
        <text
          x={(LAMP_X + bottleX) / 2}
          y="16"
          text-anchor="middle"
          class="fill-slate-700 text-[10px]">tấm gỗ</text
        >
      {/if}
      {#each SURFACES as s, i (s.id)}
        {@const y = ROWS[i]}
        <rect
          x={bottleX - 16}
          y={y - 30}
          width="32"
          height="56"
          rx="8"
          fill={s.id === 'den' ? '#1f2937' : '#f8fafc'}
          stroke="#475569"
        />
        <rect x={bottleX - 5} y={y - 40} width="10" height="12" fill="#94a3b8" />
        <rect
          x={bottleX + 22}
          y={y - 10}
          width="60"
          height="20"
          rx="4"
          fill={heatColor(temps[i], 75)}
        />
        <text
          x={bottleX + 52}
          y={y + 4}
          text-anchor="middle"
          class="fill-slate-900 text-[11px] font-semibold">{formatFixed(temps[i], 1)} °C</text
        >
        <text x={bottleX} y={y + 40} text-anchor="middle" class="fill-slate-600 text-[9px]"
          >{s.label}</text
        >
      {/each}
    </svg>
  </figure>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <SliderField
    label="Khoảng cách từ đèn tới hai bình"
    bind:value={distance}
    min={20}
    max={45}
    unit="cm"
  />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={on ? button.secondary : button.primary} onclick={() => (on = !on)}>
      {on ? 'Tắt đèn' : 'Bật đèn'}
    </button>
    <button
      type="button"
      class={button.secondary}
      onclick={() => (screen = !screen)}
      aria-pressed={screen}
    >
      {screen ? 'Bỏ tấm chắn' : 'Đặt tấm gỗ chắn'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
</div>

<style>
  .ray {
    animation: ray 0.8s linear infinite;
  }
  @keyframes ray {
    to {
      stroke-dashoffset: -11;
    }
  }
</style>
