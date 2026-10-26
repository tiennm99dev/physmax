<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import { CHAINS, HOW, chain, checkChain, waysUsed } from './engine.js';

  let chainId = $state(CHAINS[0].id);
  /** @type {Array<string | null>} */
  let placed = $state(CHAINS[0].items.map(() => null));
  /** @type {string | null} */
  let picked = $state(null);
  let message = $state('Chạm vào một thẻ để đặt nó vào ô trống đầu tiên của chuỗi.');
  let pulse = $state(-1);

  const c = $derived(chain(chainId));
  const pool = $derived(
    shuffled(c.items, 7 + CHAINS.indexOf(c) * 13).filter((it) => !placed.includes(it.id)),
  );
  const result = $derived(checkChain(c, placed));
  const label = (/** @type {string | null} */ id) =>
    c.items.find((it) => it.id === id)?.label ?? '';

  // Once the chain is right, a pulse runs along the links to show the energy
  // moving on; with reduced motion every link simply lights up.
  $effect(() => {
    if (!result.done) {
      pulse = -1;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pulse = c.links.length;
      return;
    }
    pulse = 0;
    const timer = setInterval(() => {
      pulse = pulse >= c.links.length ? 0 : pulse + 1;
    }, 900);
    return () => clearInterval(timer);
  });

  function changeChain() {
    placed = chain(chainId).items.map(() => null);
    picked = null;
    message = 'Chạm vào một thẻ để đặt nó vào ô trống đầu tiên của chuỗi.';
  }

  /** @param {number} slot */
  function putAt(slot) {
    const id = picked;
    if (!id) return;
    const next = placed.map((x) => (x === id ? null : x));
    next[slot] = id;
    placed = next;
    picked = null;
    describe(slot);
  }

  /** @param {string} id */
  function pick(id) {
    const slot = placed.indexOf(null);
    if (slot < 0) return;
    picked = id;
    putAt(slot);
  }

  /** @param {number} slot */
  function takeBack(slot) {
    const id = placed[slot];
    if (!id) return;
    placed = placed.map((x, i) => (i === slot ? null : x));
    message = `Đã lấy "${label(id)}" ra khỏi ô ${slot + 1}.`;
  }

  /** @param {number} slot */
  function describe(slot) {
    const r = checkChain(c, placed);
    if (r.done) {
      message = `Đúng rồi! Năng lượng truyền qua từng khâu bằng: ${waysUsed(c)
        .map((h) => HOW[h])
        .join(', ')}.`;
      return;
    }
    if (slot === 0 && r.startOk === false) {
      message = `"${label(placed[0])}" chưa phải là khâu đầu tiên: nó còn nhận năng lượng từ một vật khác.`;
      return;
    }
    const before = slot > 0 ? r.links[slot - 1] : null;
    const after = r.links[slot] ?? null;
    if (before === 'sai') {
      message = `"${label(placed[slot - 1])}" không truyền năng lượng trực tiếp cho "${label(placed[slot])}". Chạm vào ô để lấy thẻ ra.`;
    } else if (after === 'sai') {
      message = `"${label(placed[slot])}" không truyền năng lượng trực tiếp cho "${label(placed[slot + 1])}".`;
    } else if (before === 'ok') {
      message = `Đúng: ${c.links[slot - 1].text}`;
    } else {
      message = `Đã đặt "${label(placed[slot])}" vào ô ${slot + 1}.`;
    }
  }

  function reset() {
    changeChain();
  }

  /** @param {'ok' | 'sai' | null} s */
  const linkClass = (s) =>
    s === 'ok' ? 'text-emerald-700' : s === 'sai' ? 'text-rose-700' : 'text-slate-400';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn chuỗi năng lượng"
    options={CHAINS.map((x) => ({ value: x.id, label: x.title }))}
    bind:value={chainId}
    onchange={changeChain}
  />

  <div class="{card} p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">Thẻ chưa xếp ({pool.length})</p>
    {#if pool.length === 0}
      <p class="text-sm text-slate-500">Đã xếp hết thẻ.</p>
    {:else}
      <ul class="flex flex-wrap gap-2">
        {#each pool as it (it.id)}
          <li>
            <button
              type="button"
              draggable="true"
              class="min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 {focusRing}"
              aria-label="Đặt thẻ {it.label} vào ô trống tiếp theo"
              onclick={() => pick(it.id)}
              ondragstart={(e) => {
                picked = it.id;
                e.dataTransfer?.setData('text/plain', it.id);
              }}
            >
              {it.label}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <ol class="space-y-1" aria-label="Chuỗi truyền năng lượng">
    {#each placed as id, i (i)}
      <li>
        <button
          type="button"
          class="flex min-h-12 w-full items-center gap-3 rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold transition {focusRing} {id
            ? i === 0 && result.startOk === false
              ? 'border-rose-400 bg-rose-50 text-rose-900'
              : 'border-indigo-300 bg-indigo-50 text-indigo-900'
            : 'border-dashed border-slate-300 bg-slate-50 text-slate-500'} {result.done &&
          pulse >= i
            ? 'ring-2 ring-amber-400'
            : ''}"
          aria-label={id ? `Ô ${i + 1}: ${label(id)}. Chạm để lấy thẻ ra.` : `Ô ${i + 1} còn trống`}
          onclick={() => takeBack(i)}
          ondragover={(e) => e.preventDefault()}
          ondrop={(e) => {
            e.preventDefault();
            const dropped = e.dataTransfer?.getData('text/plain');
            if (dropped) picked = dropped;
            putAt(i);
          }}
        >
          <span
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs text-slate-700 shadow-sm"
            >{i + 1}</span
          >
          <span>{id ? label(id) : 'Ô trống'}</span>
        </button>
        {#if i < c.links.length}
          {@const s = result.links[i]}
          <p class="flex items-start gap-2 py-1 pl-6 text-xs font-semibold {linkClass(s)}">
            <svg
              viewBox="0 0 12 20"
              class="mt-0.5 h-5 w-3 shrink-0 {result.done && pulse === i + 1
                ? 'text-amber-500'
                : ''}"
              aria-hidden="true"
            >
              <path
                d="M6 0 V14 M1 10 L6 18 L11 10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            {#if result.done}
              <span>{HOW[c.links[i].how]}: {c.links[i].text}</span>
            {:else if s === 'ok'}
              <span>Nối đúng</span>
            {:else if s === 'sai'}
              <span>Hai khâu này không nối trực tiếp với nhau</span>
            {/if}
          </p>
        {/if}
      </li>
    {/each}
  </ol>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {result.done
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {message}
  </p>

  <button type="button" class={button.quiet} onclick={reset}>Xếp lại từ đầu</button>
</div>
