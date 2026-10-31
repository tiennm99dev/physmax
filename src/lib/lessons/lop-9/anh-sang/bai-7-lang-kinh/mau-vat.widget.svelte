<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { LIGHTS, seenColour } from './engine.js';

  const OBJECTS = /** @type {const} */ ([
    { id: 'trang', name: 'Tờ giấy trắng', scatters: ['do', 'luc', 'lam'] },
    { id: 'do', name: 'Tờ giấy đỏ', scatters: ['do'] },
    { id: 'luc', name: 'Chiếc lá xanh lục', scatters: ['luc'] },
    { id: 'lam', name: 'Tờ giấy lam', scatters: ['lam'] },
    { id: 'den', name: 'Mảnh vải đen', scatters: [] },
  ]);
  const SWATCH = {
    trang: '#f8fafc',
    do: '#dc2626',
    luc: '#16a34a',
    lam: '#2563eb',
    den: '#0f172a',
  };
  const NAMES = { trang: 'trắng', do: 'đỏ', luc: 'lục', lam: 'lam', den: 'đen' };
  const CHOICES = /** @type {const} */ (['trang', 'do', 'luc', 'lam', 'den']);

  let light = $state(/** @type {import('./engine.js').LightId} */ ('do'));
  /** @type {Record<string, string>} */
  let guesses = $state({});
  let checked = $state(false);

  const truth = $derived(
    Object.fromEntries(OBJECTS.map((o) => [o.id, seenColour(o.scatters, LIGHTS[light].parts)])),
  );
  const allGuessed = $derived(OBJECTS.every((o) => guesses[o.id]));
  const right = $derived(OBJECTS.filter((o) => guesses[o.id] === truth[o.id]).length);
  const lightSwatch = $derived(
    light === 'trang'
      ? '#fffbeb'
      : light === 'do'
        ? '#fee2e2'
        : light === 'luc'
          ? '#dcfce7'
          : '#dbeafe',
  );

  function changeLight() {
    guesses = {};
    checked = false;
  }

  const feedback = $derived.by(() => {
    if (!checked) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Chiếu ánh sáng ${LIGHTS[light].name} vào các vật. Đoán xem mỗi vật trông có màu gì, rồi nhấn "Kiểm tra".`,
      };
    }
    if (right === OBJECTS.length) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng cả ${right} vật! Mỗi vật chỉ phản xạ (hắt lại) mạnh ánh sáng cùng màu với nó và hấp thụ các màu khác; nếu trong ánh sáng chiếu tới không có màu đó, vật trông màu đen.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Em đoán đúng ${right}/${OBJECTS.length} vật. Gợi ý: vật màu nào thì phản xạ mạnh ánh sáng màu đó; vật trắng phản xạ mọi màu; vật đen không phản xạ màu nào. Đổi đáp án rồi kiểm tra lại.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Màu ánh sáng chiếu vào vật"
    options={Object.entries(LIGHTS).map(([value, l]) => ({ value, label: `Ánh sáng ${l.name}` }))}
    bind:value={light}
    onchange={changeLight}
  />
  <ul class="grid grid-cols-1 gap-3 rounded-xl p-3 sm:grid-cols-2" style:background={lightSwatch}>
    {#each OBJECTS as o (o.id)}
      {@const id = `${o.id}-guess`}
      <li class="flex items-center gap-3 rounded-lg bg-white/70 p-2">
        <span
          class="inline-block h-12 w-12 shrink-0 rounded-lg border border-slate-300"
          style:background={checked ? SWATCH[truth[o.id]] : '#cbd5e1'}
          aria-hidden="true"
        ></span>
        <div class="min-w-0 flex-1 text-sm">
          <label for={id} class="block font-semibold text-slate-800">
            {o.name} <span class="font-normal text-slate-600">(trong ánh sáng trắng)</span>
          </label>
          <select
            {id}
            class="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-2 {focusRing}"
            value={guesses[o.id] ?? ''}
            onchange={(e) => {
              guesses = { ...guesses, [o.id]: e.currentTarget.value };
              checked = false;
            }}
          >
            <option value="" disabled>Trông có màu…</option>
            {#each CHOICES as c (c)}
              <option value={c}>{NAMES[c]}</option>
            {/each}
          </select>
          {#if checked}
            <p class={guesses[o.id] === truth[o.id] ? 'text-emerald-700' : 'text-rose-700'}>
              {guesses[o.id] === truth[o.id] ? 'Đúng' : 'Chưa đúng'}: trông màu {NAMES[truth[o.id]]}
            </p>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    class={button.primary}
    disabled={!allGuessed}
    onclick={() => (checked = true)}
  >
    Kiểm tra
  </button>
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
