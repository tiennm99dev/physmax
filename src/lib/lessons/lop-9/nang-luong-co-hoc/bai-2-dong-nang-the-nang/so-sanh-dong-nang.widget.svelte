<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { compareKinetic } from './engine.js';

  let mA = $state(1000);
  let vA = $state(10);
  let mB = $state(1000);
  let vB = $state(20);

  const c = $derived(compareKinetic({ m: mA, v: vA }, { m: mB, v: vB }));
  const top = $derived(Math.max(c.wa, c.wb, 1));
  const kJ = (/** @type {number} */ w) => `${formatNumber(w / 1000, 1)} kJ`;
  const times = (/** @type {number} */ k) => formatNumber(k, 2);

  const cars = $derived([
    { key: 'A', m: mA, v: vA, w: c.wa, color: '#0284c7', bar: 'bg-sky-500' },
    { key: 'B', m: mB, v: vB, w: c.wb, color: '#e11d48', bar: 'bg-rose-500' },
  ]);

  const feedback = $derived.by(() => {
    const parts = `So với xe A, khối lượng xe B bằng ${times(c.massFactor)} lần, tốc độ bằng ${times(c.speedFactor)} lần`;
    const sum = `nên động năng bằng $${numTex(c.massFactor, 2)} \\cdot ${numTex(c.speedFactor, 2)}^2$ = ${times(c.ratio)} lần.`;
    const note =
      c.massFactor === 1 && c.speedFactor === 2
        ? ' Tốc độ gấp đôi thì động năng gấp bốn, vì $W_\\text{đ}$ tỉ lệ với $v^2$.'
        : c.speedFactor === 1 && c.massFactor !== 1
          ? ' Cùng tốc độ: động năng tỉ lệ với khối lượng.'
          : '';
    return `${parts}, ${sum}${note}`;
  });
</script>

<div class="{card} space-y-4 p-3">
  <div class="grid gap-4 sm:grid-cols-2">
    {#each cars as car (car.key)}
      <div class="space-y-2">
        <svg viewBox="0 0 160 50" class="block h-12 w-full" role="img" aria-label="Xe {car.key}">
          <rect x="10" y="14" width="70" height="22" rx="5" fill={car.color} />
          <rect x="28" y="6" width="34" height="12" rx="3" fill={car.color} opacity="0.7" />
          <circle cx="26" cy="38" r="7" fill="#1e293b" />
          <circle cx="64" cy="38" r="7" fill="#1e293b" />
          <line x1="86" y1="25" x2={88 + car.v * 2.2} y2="25" stroke={car.color} stroke-width="3" />
          <text x="40" y="30" class="fill-white text-[12px] font-bold">{car.key}</text>
        </svg>
        {#if car.key === 'A'}
          <SliderField
            label="Khối lượng xe A"
            bind:value={mA}
            min={500}
            max={3000}
            step={250}
            unit="kg"
          />
          <SliderField label="Tốc độ xe A" bind:value={vA} min={5} max={30} step={5} unit="m/s" />
        {:else}
          <SliderField
            label="Khối lượng xe B"
            bind:value={mB}
            min={500}
            max={3000}
            step={250}
            unit="kg"
          />
          <SliderField label="Tốc độ xe B" bind:value={vB} min={5} max={30} step={5} unit="m/s" />
        {/if}
      </div>
    {/each}
  </div>

  <div class="space-y-2">
    {#each cars as car (car.key)}
      <div>
        <div class="mb-1 flex justify-between text-sm">
          <span class="text-slate-700">Động năng xe {car.key}</span>
          <span class="font-semibold tabular-nums">{kJ(car.w)}</span>
        </div>
        <div class="h-4 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
          <div class="{car.bar} h-full" style="width: {(car.w / top) * 100}%"></div>
        </div>
      </div>
    {/each}
  </div>

  <FeedbackNote tone="info" text={feedback} />
</div>
