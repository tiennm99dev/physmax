<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { colorName, visibleColor } from '../_shared/spectrum.js';
  import { brightness, fringeSpacing } from './engine.js';

  const W = 340;
  const X_MAX = 10;
  const STRIPS = 170;
  const SCREEN_Y = 18;
  const SCREEN_H = 70;

  let nm = $state(600);
  let slits = $state(1);
  let distance = $state(2);
  let order = $state(2);

  const lambdaUm = $derived(nm / 1000);
  const spacing = $derived(fringeSpacing(lambdaUm, distance, slits));
  const tint = $derived(visibleColor(nm));
  const strips = $derived(
    Array.from({ length: STRIPS }, (_, i) => {
      const x = -X_MAX + ((i + 0.5) * 2 * X_MAX) / STRIPS;
      return { i, x, light: brightness(x, spacing) };
    }),
  );
  const xk = $derived(order * spacing);
  /** @param {number} x mm */
  const px = (x) => W / 2 + (x / X_MAX) * (W / 2 - 10);
  const ticks = Array.from({ length: 2 * X_MAX + 1 }, (_, i) => i - X_MAX);
  const visible = $derived(Math.abs(xk) <= X_MAX);
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} 130"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label={`Màn quan sát vân giao thoa ánh sáng màu ${colorName(nm)}, khoảng vân ${formatNumber(spacing, 2)} milimét.`}
    >
      <rect x="10" y={SCREEN_Y} width={W - 20} height={SCREEN_H} fill="#020617" />
      {#each strips as s (s.i)}
        <rect
          x={px(s.x - X_MAX / STRIPS)}
          y={SCREEN_Y}
          width={((W - 20) / STRIPS) * 1.05}
          height={SCREEN_H}
          fill={tint}
          opacity={s.light}
        />
      {/each}
      {#if visible}
        <path d="M {px(xk)} {SCREEN_Y - 2} l -5 -9 h 10 z" fill="#0f172a" />
      {/if}
      <line
        x1="10"
        x2={W - 10}
        y1={SCREEN_Y + SCREEN_H + 6}
        y2={SCREEN_Y + SCREEN_H + 6}
        stroke="#334155"
      />
      {#each ticks as m (m)}
        <line
          x1={px(m)}
          x2={px(m)}
          y1={SCREEN_Y + SCREEN_H + 6}
          y2={SCREEN_Y + SCREEN_H + (m % 5 === 0 ? 14 : 10)}
          stroke="#334155"
        />
        {#if m % 5 === 0}
          <text
            x={px(m)}
            y={SCREEN_Y + SCREEN_H + 26}
            font-size="10"
            fill="#475569"
            text-anchor="middle"
          >
            {m < 0 ? `−${-m}` : m}
          </text>
        {/if}
      {/each}
      <text x={W - 10} y={SCREEN_Y + SCREEN_H + 38} font-size="10" fill="#475569" text-anchor="end">
        x (mm)
      </text>
    </svg>
    <p class="px-2 text-sm text-slate-600">
      Vân sáng trung tâm ở x = 0; mũi tên đen chỉ vân sáng bậc k đang chọn.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Bước sóng λ" bind:value={nm} min={400} max={700} step={10} unit="nm" />
    <SliderField
      label="Khoảng cách hai khe a"
      bind:value={slits}
      min={0.5}
      max={2}
      step={0.1}
      unit="mm"
      format={(v) => formatNumber(v, 1)}
    />
    <SliderField
      label="Khoảng cách từ hai khe đến màn D"
      bind:value={distance}
      min={1}
      max={3}
      step={0.1}
      unit="m"
      format={(v) => formatNumber(v, 1)}
    />
    <SliderField label="Vân sáng bậc k" bind:value={order} min={-5} max={5} step={1} />
  </div>

  <div class="{card} space-y-1 p-3 text-sm text-slate-700" aria-live="polite">
    <p>
      <LiveRichText
        text={`Khoảng vân $i = \\dfrac{\\lambda D}{a} = \\dfrac{${numTex(lambdaUm, 2)} \\cdot ${numTex(distance, 1)}}{${numTex(slits, 1)}} = ${numTex(spacing, 2)}$ mm (với $\\lambda$ tính bằng µm, $D$ bằng m, $a$ bằng mm).`}
      />
    </p>
    <p>
      <LiveRichText
        text={visible
          ? `Vân sáng bậc $k = ${order}$ ở $x = ki = ${numTex(xk, 2)}$ mm; hai vân tối kề nó ở $x = ${numTex((order - 0.5) * spacing, 2)}$ mm và $x = ${numTex((order + 0.5) * spacing, 2)}$ mm.`
          : `Vân sáng bậc $k = ${order}$ ở $x = ${numTex(xk, 2)}$ mm, ngoài phần màn đang vẽ.`}
      />
    </p>
  </div>
</div>
