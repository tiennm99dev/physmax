<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { EXPERIMENTS, SHELVES, TOOLS, checkKit, toolById } from './engine.js';

  /** @typedef {import('./engine.js').Shelf} Shelf */

  let expId = $state(EXPERIMENTS[0].id);
  let shelf = $state(/** @type {Shelf} */ ('quang'));
  let openId = $state(TOOLS[0].id);
  /** @type {string[]} */
  let kit = $state([]);
  /** @type {string[]} */
  let seen = $state([TOOLS[0].id]);
  /** @type {string[]} */
  let done = $state([]);
  let checked = $state(false);

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const shelfTools = $derived(TOOLS.filter((t) => t.shelf === shelf));
  const current = $derived(toolById(openId));
  const inKit = $derived(kit.includes(openId));
  const result = $derived(checkKit(exp, kit));

  const expOptions = EXPERIMENTS.map((e, i) => ({ value: e.id, label: `${i + 1}. ${e.title}` }));
  const shelfOptions = SHELVES.map((s) => ({ value: s.id, label: s.label }));

  /** @param {string} id */
  function show(id) {
    openId = id;
    if (!seen.includes(id)) seen = [...seen, id];
  }

  /** @param {string} id */
  function toggle(id) {
    kit = kit.includes(id) ? kit.filter((x) => x !== id) : [...kit, id];
    checked = false;
  }

  function newExperiment() {
    kit = [];
    checked = false;
  }

  function check() {
    checked = true;
    if (result.ok && !done.includes(exp.id)) done = [...done, exp.id];
  }

  const feedback = $derived.by(() => {
    if (!checked) {
      return {
        tone: /** @type {const} */ ('info'),
        text: kit.length
          ? `Bộ dụng cụ có ${kit.length} món. Khi thấy đủ, nhấn "Kiểm tra bộ dụng cụ".`
          : 'Bấm vào từng dụng cụ trong kho để xem tên, công dụng, lưu ý an toàn, rồi thêm những dụng cụ cần cho thí nghiệm vào bộ dụng cụ.',
      };
    }
    return {
      tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
      text: result.text,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn thí nghiệm"
    options={expOptions}
    bind:value={expId}
    onchange={newExperiment}
  />
  <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
    <span class="font-semibold">Mục tiêu:</span>
    {exp.goal}
    <span class="block pt-1 text-xs text-indigo-700">
      Đã lắp đúng {done.length}/{EXPERIMENTS.length} thí nghiệm · Đã xem {seen.length}/{TOOLS.length}
      dụng cụ, hoá chất.
    </span>
  </p>

  <div class="grid gap-4 lg:grid-cols-2">
    <section class="space-y-3" aria-label="Kho dụng cụ">
      <SegmentedControl label="Kệ trong kho" options={shelfOptions} bind:value={shelf} />
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {#each shelfTools as t (t.id)}
          {@const taken = kit.includes(t.id)}
          <li>
            <button
              type="button"
              class="flex min-h-14 w-full flex-col items-start justify-center rounded-lg border px-3 py-2 text-left text-sm font-semibold transition {focusRing} {openId ===
              t.id
                ? 'border-indigo-600 ring-1 ring-indigo-600'
                : 'border-slate-300'} {taken
                ? 'bg-emerald-50 text-emerald-900'
                : 'bg-white text-slate-800 hover:bg-slate-50'}"
              aria-pressed={openId === t.id}
              aria-label="{t.name}{taken ? ', đã có trong bộ dụng cụ' : ''}"
              onclick={() => show(t.id)}
            >
              <span>{t.name}</span>
              {#if taken}<span class="text-xs font-normal">✓ trong bộ</span>{/if}
            </button>
          </li>
        {/each}
      </ul>

      <div class="space-y-2 rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
        <h4 class="font-semibold text-slate-900">{current.name}</h4>
        <p class="text-sm text-slate-700">
          <span class="font-semibold">Công dụng:</span>
          {current.use}
        </p>
        <p class="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span class="font-semibold">Lưu ý an toàn:</span>
          {current.safety}
        </p>
        <button
          type="button"
          class={inKit ? button.quiet : button.secondary}
          onclick={() => toggle(current.id)}
        >
          {inKit ? 'Bỏ khỏi bộ dụng cụ' : 'Thêm vào bộ dụng cụ'}
        </button>
      </div>
    </section>

    <section class="space-y-3" aria-label="Bộ dụng cụ cho thí nghiệm">
      <h4 class="text-sm font-semibold text-slate-700">
        Bộ dụng cụ cho thí nghiệm "{exp.title}"
      </h4>
      {#if kit.length}
        <ul class="flex flex-wrap gap-2">
          {#each kit as id (id)}
            {@const t = toolById(id)}
            <li>
              <button
                type="button"
                class="min-h-11 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm text-emerald-900 hover:bg-emerald-100 {focusRing}"
                aria-label="Bỏ {t.name} khỏi bộ dụng cụ"
                onclick={() => toggle(id)}
              >
                {t.name} <span aria-hidden="true">×</span>
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p
          class="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500"
        >
          Chưa có dụng cụ nào.
        </p>
      {/if}
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={check}>Kiểm tra bộ dụng cụ</button>
        <button type="button" class={button.quiet} onclick={newExperiment} disabled={!kit.length}>
          Làm lại
        </button>
      </div>
      <FeedbackNote tone={feedback.tone} text={feedback.text} />
      {#if checked && result.ok}
        <ul class="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {#each exp.roles as r (r.need)}
            <li>
              Để {r.need}: {r.tools
                .filter((id) => kit.includes(id))
                .map((id) => toolById(id).name)
                .join(', ')}.
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  </div>
</div>
