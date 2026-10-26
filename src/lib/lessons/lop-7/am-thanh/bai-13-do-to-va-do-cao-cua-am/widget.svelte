<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import {
    DIVISIONS,
    SLIDER_STEPS,
    TIME_BASES,
    bestTimeBase,
    classify,
    compareSounds,
    cyclesOnScreen,
    frequencyToSlider,
    sliderToFrequency,
    trace,
  } from './engine.js';

  const W = 480;
  const H = 300;
  const PAD = 10;
  const ROWS = 8;
  const DX = (W - 2 * PAD) / DIVISIONS;
  const DY = (H - 2 * PAD) / ROWS;
  const MID = H / 2;
  /** Above this many vibrations the trace is drawn as a band. */
  const DENSE = 60;

  /** The generator frequency in Hz; the slider moves on a log scale. */
  let f = $state(440);
  let position = $state(frequencyToSlider(440));
  let amplitude = $state(2);
  let baseChoice = $state(/** @type {string | number} */ ('auto'));
  let reference = $state(/** @type {{ f: number, amplitude: number } | null} */ (null));
  let listening = $state(false);

  const range = $derived(classify(f));
  const base = $derived(baseChoice === 'auto' ? bestTimeBase(f) : Number(baseChoice));
  const cycles = $derived(cyclesOnScreen(f, base));

  const X = (/** @type {number} */ x) => PAD + x * DX;
  const Y = (/** @type {number} */ u) => MID - u * DY;
  /** @param {number} freq @param {number} amp */
  const pathOf = (freq, amp) =>
    trace(freq, amp, base, 600)
      .map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)} ${Y(p.u).toFixed(1)}`)
      .join(' ');
  const line = $derived(cycles <= DENSE ? pathOf(f, amplitude) : '');
  const refCycles = $derived(reference ? cyclesOnScreen(reference.f, base) : 0);
  const refLine = $derived(
    reference && refCycles <= DENSE ? pathOf(reference.f, reference.amplitude) : '',
  );

  const hz = (/** @type {number} */ v) => `${fmt(v)} Hz`;
  const ms = (/** @type {number} */ v) => `${formatNumber(v, 1)} ms/ô`;
  const baseOptions = [
    { value: 'auto', label: 'Tự động' },
    ...TIME_BASES.map((b) => ({ value: b, label: ms(b) })),
  ];

  const rangeText = $derived(
    {
      'ha-am': 'hạ âm (dưới 20 Hz): tai người không nghe được',
      'nghe-duoc': 'âm nghe được (từ 20 Hz đến 20 000 Hz)',
      'sieu-am': 'siêu âm (trên 20 000 Hz): tai người không nghe được',
    }[range],
  );

  const status = $derived.by(() => {
    const head = `Tần số ${hz(f)}, biên độ ${formatNumber(amplitude, 1)} ô: ${rangeText}.`;
    if (amplitude === 0) return `${head} Biên độ bằng 0: nguồn không dao động, không có âm.`;
    if (!reference) {
      return `${head} Nhấn "Lưu làm âm mẫu", rồi đổi tần số hoặc biên độ để so sánh độ cao và độ to.`;
    }
    const c = compareSounds({ f, amplitude }, reference);
    const pitch =
      c.pitch > 0
        ? 'tần số lớn hơn nên âm cao hơn (bổng hơn)'
        : c.pitch < 0
          ? 'tần số nhỏ hơn nên âm thấp hơn (trầm hơn)'
          : 'cùng tần số nên cao như nhau';
    const loud =
      c.loudness > 0
        ? 'biên độ lớn hơn nên âm to hơn'
        : c.loudness < 0
          ? 'biên độ nhỏ hơn nên âm nhỏ hơn'
          : 'cùng biên độ nên to như nhau';
    return `${head} So với âm mẫu (${hz(reference.f)}, ${formatNumber(reference.amplitude, 1)} ô): ${pitch}; ${loud}.`;
  });

  /* Sound through the Web Audio API, started only by the button. */
  /** @type {AudioContext | null} */
  let audio = null;
  /** @type {OscillatorNode | null} */
  let osc = null;
  /** @type {GainNode | null} */
  let gain = null;

  /** Quiet on purpose: 0,04 per amplitude division, at most 0,2. */
  const volume = $derived(range === 'nghe-duoc' ? Math.min(0.2, amplitude * 0.04) : 0);

  function stopSound() {
    osc?.stop();
    osc?.disconnect();
    osc = null;
    listening = false;
  }

  function toggleSound() {
    if (listening) {
      stopSound();
      return;
    }
    if (typeof AudioContext === 'undefined') return;
    audio ??= new AudioContext();
    void audio.resume();
    gain = audio.createGain();
    gain.gain.value = volume;
    gain.connect(audio.destination);
    osc = audio.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = Math.min(f, audio.sampleRate / 2);
    osc.connect(gain);
    osc.start();
    listening = true;
  }

  $effect(() => {
    const freq = f;
    const vol = volume;
    if (!listening || !audio || !osc || !gain) return;
    osc.frequency.setTargetAtTime(Math.min(freq, audio.sampleRate / 2), audio.currentTime, 0.02);
    gain.gain.setTargetAtTime(vol, audio.currentTime, 0.02);
  });

  onDestroy(() => {
    stopSound();
    void audio?.close();
  });

  function save() {
    reference = { f, amplitude };
  }

  /** @param {number} freq */
  function preset(freq) {
    f = freq;
    position = frequencyToSlider(freq);
  }
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField
      label="Tần số"
      bind:value={position}
      min={0}
      max={SLIDER_STEPS}
      step={5}
      format={() => hz(f)}
      oninput={(v) => (f = sliderToFrequency(v))}
    />
    <SliderField
      label="Biên độ"
      bind:value={amplitude}
      min={0}
      max={3.5}
      step={0.5}
      unit="ô"
      format={(v) => formatNumber(v, 1)}
    />
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn nhanh tần số">
    {#each [10, 100, 440, 2000, 30000] as p (p)}
      <button type="button" class={button.quiet} onclick={() => preset(p)}>{hz(p)}</button>
    {/each}
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label="Màn hình dao động kí, {ms(base)}. Đường sóng có {formatNumber(
        cycles,
        1,
      )} dao động trên màn hình, đỉnh sóng cao {formatNumber(amplitude, 1)} ô.{reference
        ? ` Đường đứt là âm mẫu ${hz(reference.f)}, biên độ ${formatNumber(reference.amplitude, 1)} ô.`
        : ''}"
    >
      <rect x="0" y="0" width={W} height={H} rx="10" fill="#052e16" />
      {#each Array.from({ length: DIVISIONS + 1 }, (_, i) => i) as i (i)}
        <line
          x1={X(i)}
          y1={PAD}
          x2={X(i)}
          y2={H - PAD}
          stroke="#166534"
          stroke-width={i === DIVISIONS / 2 ? 1.5 : 1}
        />
      {/each}
      {#each Array.from({ length: ROWS + 1 }, (_, i) => i) as i (i)}
        <line
          x1={PAD}
          y1={PAD + i * DY}
          x2={W - PAD}
          y2={PAD + i * DY}
          stroke="#166534"
          stroke-width={i === ROWS / 2 ? 1.5 : 1}
        />
      {/each}

      {#if reference}
        {#if refLine}
          <path
            d={refLine}
            fill="none"
            stroke="#fbbf24"
            stroke-width="2"
            stroke-dasharray="6 4"
            opacity="0.85"
          />
        {:else}
          <rect
            x={PAD}
            y={Y(reference.amplitude)}
            width={W - 2 * PAD}
            height={2 * reference.amplitude * DY}
            fill="#fbbf24"
            opacity="0.2"
          />
        {/if}
      {/if}

      {#if line}
        <path d={line} fill="none" stroke="#4ade80" stroke-width="2.5" />
      {:else}
        <rect
          x={PAD}
          y={Y(amplitude)}
          width={W - 2 * PAD}
          height={2 * amplitude * DY}
          fill="#4ade80"
          opacity="0.55"
        />
      {/if}
    </svg>
    <figcaption class="px-2 pt-1 text-sm text-slate-700">
      <span class="tabular-nums">{ms(base)}</span> · màn hình rộng
      <span class="tabular-nums">{formatNumber(DIVISIONS * base, 1)} ms</span>
      · có khoảng
      <span class="tabular-nums">{formatNumber(cycles, 1)}</span> dao động{cycles > DENSE
        ? ' (quá dày, chọn thang thời gian nhỏ hơn để nhìn rõ)'
        : ''}. Đường đứt màu vàng là âm mẫu.
    </figcaption>
  </figure>

  <SegmentedControl
    label="Thang thời gian của dao động kí"
    options={baseOptions}
    bind:value={baseChoice}
  />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={toggleSound} aria-pressed={listening}>
      {listening ? 'Dừng nghe' : 'Nghe âm'}
    </button>
    <button type="button" class={button.secondary} onclick={save}>Lưu làm âm mẫu</button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => (reference = null)}
      disabled={!reference}>Xóa âm mẫu</button
    >
  </div>
  {#if listening && range !== 'nghe-duoc'}
    <p class="text-sm text-slate-600">
      Loa vẫn đang bật nhưng tần số nằm ngoài vùng tai người nghe được, nên không phát ra tiếng nào
      em nghe thấy.
    </p>
  {/if}

  <FeedbackNote tone={range === 'nghe-duoc' && amplitude > 0 ? 'ok' : 'info'} text={status} />
</div>
