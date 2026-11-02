<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { afterForce } from './engine.js';

  const MASS = 1000;
  const BAR_MAX = 400000;

  let v0 = $state(10);
  let force = $state(2000);
  let distance = $state(50);

  const result = $derived(afterForce(MASS, v0, force, distance));

  const rows = $derived([
    { name: 'Động năng đầu', value: result.start, fill: 'bg-amber-400' },
    {
      name: 'Công của lực',
      value: result.work,
      fill: result.work >= 0 ? 'bg-emerald-500' : 'bg-red-500',
    },
    { name: 'Động năng sau', value: result.end, fill: 'bg-amber-600' },
  ]);

  const note = $derived.by(() => {
    const line = `$A = W_{đ2} - W_{đ1}$: $${numTex(result.work / 1000, 1)} = ${numTex(result.end / 1000, 1)} - ${numTex(result.start / 1000, 1)}$ (kJ).`;
    if (v0 === 0 && force < 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Xe đang đứng yên nên không có gì để lực cản lấy đi: công bằng $0$, động năng vẫn bằng $0$. Hãy chọn tốc độ đầu lớn hơn.',
      };
    }
    if (result.stopped) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${line} Lực cản dùng hết động năng sau $${numTex(result.travelled, 1)}$ m, xe dừng lại trước khi hết đoạn đường.`,
      };
    }
    if (force === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${line} Không có công thì động năng không đổi, xe giữ nguyên tốc độ.`,
      };
    }
    return {
      tone: force > 0 ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
      text: `${line} ${force > 0 ? 'Công dương làm động năng tăng' : 'Công âm làm động năng giảm'}: tốc độ cuối là $${numTex(result.speed, 1)}$ m/s.`,
    };
  });
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-700">
    {`Xe khối lượng ${formatNumber(MASS)} kg trên đường ngang, hợp lực dọc theo chuyển động.`}
  </p>
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Tốc độ đầu" bind:value={v0} min={0} max={20} step={2} unit="m/s" />
    <SliderField
      label="Hợp lực (âm: lực cản)"
      bind:value={force}
      min={-4000}
      max={4000}
      step={500}
      unit="N"
    />
    <SliderField label="Quãng đường" bind:value={distance} min={10} max={50} step={5} unit="m" />
  </div>
  <div class="space-y-2" aria-live="polite">
    {#each rows as row (row.name)}
      <div class="grid grid-cols-[6.5rem_1fr_5.5rem] items-center gap-2 text-sm">
        <span class="font-semibold text-slate-700">{row.name}</span>
        <div class="h-4 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full {row.fill}"
            style:width={`${(Math.abs(row.value) / BAR_MAX) * 100}%`}
          ></div>
        </div>
        <span class="text-right tabular-nums">{`${formatNumber(row.value / 1000, 1)} kJ`}</span>
      </div>
    {/each}
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
