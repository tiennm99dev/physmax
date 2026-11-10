<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { sciTex, sciText } from '../_shared/sci.js';
  import {
    bandOf,
    colorName,
    frequencyOf,
    visibleColor,
    wavelengthOf,
  } from '../_shared/spectrum.js';
  import {
    EXP_MAX,
    EXP_MIN,
    EXP_STEP,
    TARGETS,
    bandSpans,
    placed,
    targetBand,
    wavelengthAt,
  } from './engine.js';

  const W = 340;
  const BAR_Y = 26;
  const BAR_H = 34;
  const SHORT = /** @type {Record<string, string>} */ ({
    gamma: 'γ',
    x: 'X',
    'tu-ngoai': 'tử ngoại',
    'nhin-thay': '',
    'hong-ngoai': 'hồng ngoại',
    'vi-ba': 'vi ba',
    'vo-tuyen': 'vô tuyến',
  });
  const spans = bandSpans();
  const rainbow = [380, 430, 470, 520, 570, 600, 650, 760].map((nm, i, all) => ({
    offset: `${((i / (all.length - 1)) * 100).toFixed(0)}%`,
    color: visibleColor(nm),
  }));

  let exp = $state(0);
  let targetAt = $state(0);
  let score = $state(0);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let verdict = $state(null);

  const lambda = $derived(wavelengthAt(exp));
  const band = $derived(bandOf(lambda));
  const f = $derived(frequencyOf(lambda));
  const nm = $derived(lambda * 1e9);
  const markerX = $derived(((exp - EXP_MIN) / (EXP_MAX - EXP_MIN)) * W);
  const target = $derived(TARGETS[targetAt]);
  /** Cycles drawn in the little wave: more cycles for shorter wavelengths. */
  const cycles = $derived(1 + ((EXP_MAX - exp) / (EXP_MAX - EXP_MIN)) * 15);
  const wavePath = $derived.by(() => {
    const pts = [];
    for (let i = 0; i <= 300; i++) {
      const x = (W * i) / 300;
      pts.push(
        `${x.toFixed(1)},${(20 - 12 * Math.sin((2 * Math.PI * cycles * i) / 300)).toFixed(1)}`,
      );
    }
    return pts.join(' ');
  });
  const waveColor = $derived(
    band?.id === 'nhin-thay' ? visibleColor(nm) : (band?.color ?? '#475569'),
  );

  function check() {
    const goal = targetBand(target);
    if (placed(exp, target)) {
      score += 1;
      verdict = {
        tone: 'ok',
        text: `Đúng! $\\lambda = \\dfrac{c}{f} = \\dfrac{3 \\cdot 10^{8}}{${sciTex(target.frequency)}} \\approx ${sciTex(wavelengthOf(target.frequency))}$ m, thuộc vùng ${goal?.name.toLowerCase()}.`,
      };
    } else {
      verdict = {
        tone: 'warn',
        text: `Chưa đúng: vị trí em chọn thuộc vùng ${band ? band.name.toLowerCase() : 'ngoài thang'}. Tính $\\lambda = \\dfrac{c}{f}$ với $c = 3 \\cdot 10^{8}$ m/s rồi kéo tới bước sóng đó.`,
      };
    }
  }

  function next() {
    targetAt = (targetAt + 1) % TARGETS.length;
    verdict = null;
  }
</script>

<div class="space-y-4">
  <div class="{card} space-y-2 p-2">
    <svg
      viewBox="0 0 {W} 92"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label={`Thang sóng điện từ theo bước sóng, từ 10 mũ trừ 13 mét đến 10 mũ 5 mét. Vị trí đang chọn thuộc vùng ${band?.name ?? 'ngoài thang'}.`}
    >
      <defs>
        <linearGradient id="song-11-rainbow">
          {#each rainbow as stop (stop.offset)}
            <stop offset={stop.offset} stop-color={stop.color} />
          {/each}
        </linearGradient>
      </defs>
      {#each spans as s (s.band.id)}
        <rect
          x={s.start * W}
          y={BAR_Y}
          width={(s.end - s.start) * W}
          height={BAR_H}
          fill={s.band.id === 'nhin-thay' ? 'url(#song-11-rainbow)' : s.band.color}
          opacity={s.band.id === 'nhin-thay' ? 1 : band?.id === s.band.id ? 0.9 : 0.35}
        />
        {#if SHORT[s.band.id]}
          <text
            x={((s.start + s.end) / 2) * W}
            y={BAR_Y + BAR_H / 2 + 4}
            font-size="10"
            font-weight="600"
            fill="#0f172a"
            text-anchor="middle">{SHORT[s.band.id]}</text
          >
        {/if}
      {/each}
      <text x={spans[3].start * W} y={BAR_Y - 6} font-size="10" fill="#334155" text-anchor="middle">
        nhìn thấy
      </text>
      <path d="M {markerX} {BAR_Y + BAR_H + 2} l -6 10 h 12 z" fill="#0f172a" />
      <line
        x1={markerX}
        x2={markerX}
        y1={BAR_Y - 2}
        y2={BAR_Y + BAR_H}
        stroke="#0f172a"
        stroke-width="2"
      />
      {#each [-12, -9, -6, -3, 0, 3] as e (e)}
        <text
          x={((e - EXP_MIN) / (EXP_MAX - EXP_MIN)) * W}
          y={88}
          font-size="9"
          fill="#475569"
          text-anchor="middle">{sciText(10 ** e)}</text
        >
      {/each}
    </svg>
    <svg viewBox="0 0 {W} 40" class="mx-auto block w-full max-w-xl" aria-hidden="true">
      <polyline points={wavePath} fill="none" stroke={waveColor} stroke-width="2" />
    </svg>
    <p class="px-2 text-xs text-slate-500">
      Thang chia theo luỹ thừa của 10 (mỗi khoảng chia gấp 1 000 lần); ranh giới giữa các vùng chỉ
      là gần đúng. Hình sóng nhỏ chỉ minh hoạ: bước sóng càng ngắn, sóng càng dày.
    </p>
  </div>

  <SliderField
    label="Bước sóng λ trong chân không"
    bind:value={exp}
    min={EXP_MIN}
    max={EXP_MAX}
    step={EXP_STEP}
    unit="m"
    format={(v) => sciText(10 ** v)}
  />

  <div class="{card} space-y-1 p-3 text-sm text-slate-700" aria-live="polite">
    <p class="text-base font-semibold text-slate-900">{band?.name ?? 'Ngoài thang'}</p>
    <p>
      <LiveRichText
        text={`$\\lambda = ${sciTex(lambda)}$ m, $f = \\dfrac{c}{\\lambda} = ${sciTex(f)}$ Hz.`}
      />
    </p>
    {#if band}
      <p>
        <span class="font-semibold">Bước sóng trong sách:</span>
        <LiveRichText text={band.range} />
      </p>
      <p><span class="font-semibold">Nguồn phát:</span> {band.source}.</p>
      <p><span class="font-semibold">Ứng dụng:</span> {band.use}.</p>
      {#if band.id === 'nhin-thay'}
        <p class="flex items-center gap-2">
          <span class="inline-block size-5 rounded" style:background={visibleColor(nm)}></span>
          Ánh sáng màu {colorName(nm)}, khoảng {Math.round(nm)} nm.
        </p>
      {/if}
    {/if}
  </div>

  <div class="{card} space-y-3 p-3">
    <p class="text-sm font-semibold text-slate-800">
      Xếp chỗ ({score} đúng): <LiveRichText
        text={`${target.what} có tần số $f = ${sciTex(target.frequency)}$ Hz. Kéo bước sóng vào đúng vùng của nó.`}
      />
    </p>
    <div class="flex flex-wrap gap-3">
      <button type="button" class={button.primary} onclick={check}>Kiểm tra vị trí</button>
      <button type="button" class={button.quiet} onclick={next}>Bức xạ khác</button>
    </div>
    {#if verdict}
      <FeedbackNote tone={verdict.tone} text={verdict.text} />
    {/if}
  </div>
</div>
