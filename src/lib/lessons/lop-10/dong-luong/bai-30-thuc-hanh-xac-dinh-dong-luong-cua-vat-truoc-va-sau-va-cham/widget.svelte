<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import AirCart from '../_shared/air-cart.svelte';
  import {
    CART,
    GATE_1,
    GATE_2,
    SHUTTER,
    TRACK,
    positions,
    runLab,
    runTime,
    worked,
  } from './engine.js';

  const W = 360;
  const H = 110;
  const RAIL = 84;
  const KINDS = [
    { value: 'mem', label: 'Va chạm mềm' },
    { value: 'dan-hoi', label: 'Va chạm đàn hồi' },
  ];
  /** Widest allowed gap between a typed result and the worked one, kg.m/s. */
  const TYPED_TOLERANCE = 0.005;
  /** The bench runs a little faster than real time, so slow carts do not drag. */
  const SPEED_UP = 1.5;
  const px = linear(0, TRACK, 8, W - 8);
  const cartWidth = px.map(CART) - px.map(0);

  let kind = $state('mem');
  let mA = $state(0.4);
  let mB = $state(0.4);
  let v = $state(0.5);
  let run = $state(0);
  let t = $state(0);
  let phase = $state(/** @type {'ready' | 'moving' | 'done'} */ ('ready'));
  let typedBefore = $state('');
  let typedAfter = $state('');
  let rows = $state(
    /** @type {Array<{ id: number, kind: string, mA: number, mB: number, before: number, after: number, gap: number }>} */ ([]),
  );
  let message = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Chọn loại va chạm và khối lượng hai xe, rồi đẩy xe $A$ qua cổng quang $1$.',
    }),
  );

  const collisionKind = $derived(
    kind === 'dan-hoi' ? /** @type {const} */ ('dan-hoi') : /** @type {const} */ ('mem'),
  );
  const setup = $derived({ kind: collisionKind, mA, mB, v });
  const end = $derived(runTime(setup));
  const place = $derived(positions(setup, t));
  const readings = $derived(run > 0 ? runLab(setup, run) : null);
  const answer = $derived(readings ? worked(setup, readings) : null);

  function changed() {
    phase = 'ready';
    t = 0;
    typedBefore = '';
    typedAfter = '';
    message = {
      tone: 'info',
      text: 'Chọn loại va chạm và khối lượng hai xe, rồi đẩy xe $A$ qua cổng quang $1$.',
    };
  }

  function finish() {
    t = end;
    phase = 'done';
    message = {
      tone: 'info',
      text: 'Đọc các thời gian trên đồng hồ. Tính $v = d/t$ rồi tính tổng động lượng trước và sau va chạm. Xe đi ngược lại thì động lượng mang dấu âm.',
    };
  }

  function push() {
    run += 1;
    t = 0;
    typedBefore = '';
    typedAfter = '';
    if (reducedMotion()) {
      finish();
      return;
    }
    phase = 'moving';
  }

  $effect(() => {
    if (phase !== 'moving') return;
    const stop = frameLoop((dt) => {
      const next = Math.min(end, t + dt * SPEED_UP);
      t = next;
      if (next >= end) {
        stop();
        finish();
      }
    });
    return stop;
  });

  function record() {
    if (!answer) return;
    if (rows.some((row) => row.id === run)) {
      message = { tone: 'info', text: 'Lần đo này đã có trong bảng. Hãy đẩy lại để đo lần mới.' };
      return;
    }
    const before = readNumber(typedBefore);
    const after = readNumber(typedAfter);
    if (before === null || after === null) {
      message = { tone: 'warn', text: 'Hãy nhập cả hai kết quả, ví dụ $0{,}2$.' };
      return;
    }
    if (Math.abs(before - answer.before) > TYPED_TOLERANCE) {
      message = {
        tone: 'warn',
        text: 'Tổng động lượng trước va chạm chưa đúng. Xe $B$ đứng yên nên chỉ còn $m_Av_A$, với $v_A = \\dfrac{d}{t}$.',
      };
      return;
    }
    if (Math.abs(after - answer.after) > TYPED_TOLERANCE) {
      message = {
        tone: 'warn',
        text:
          collisionKind === 'mem'
            ? 'Tổng động lượng sau va chạm chưa đúng. Hai xe dính nhau nên $p^{\\prime} = (m_A + m_B)V$.'
            : 'Tổng động lượng sau va chạm chưa đúng. Tính $p^{\\prime} = m_Av_A^{\\prime} + m_Bv_B^{\\prime}$, nhớ dấu âm khi xe đi ngược lại.',
      };
      return;
    }
    rows = [
      ...rows.slice(-4),
      {
        id: run,
        kind: collisionKind === 'mem' ? 'Mềm' : 'Đàn hồi',
        mA,
        mB,
        before: answer.before,
        after: answer.after,
        gap: answer.gap,
      },
    ];
    message = {
      tone: 'ok',
      text: `Đã ghi vào bảng: $p = ${numTex(answer.before, 3)}$ và $p^{\\prime} = ${numTex(answer.after, 3)}$ kg.m/s, lệch khoảng $${numTex(answer.gap, 1)}\\%$. Trong giới hạn sai số, động lượng được bảo toàn. Đổi loại va chạm hoặc khối lượng để đo thêm.`,
    };
  }
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Đệm khí, hai cổng quang và hai xe. ${phase === 'done' ? 'Thí nghiệm đã xong, đọc số liệu trên đồng hồ.' : phase === 'moving' ? 'Các xe đang chuyển động.' : 'Xe A sẵn sàng.'}`}
    >
      <rect x="4" y={RAIL} width={W - 8} height="8" rx="2" fill="#94a3b8" />
      {#each [{ x: GATE_1, name: 'Cổng 1' }, { x: GATE_2, name: 'Cổng 2' }] as gate (gate.name)}
        <rect x={px.map(gate.x) - 2} y={RAIL - 58} width="4" height="58" fill="#334155" />
        <rect x={px.map(gate.x) - 16} y={RAIL - 60} width="32" height="4" fill="#334155" />
        <text
          x={px.map(gate.x)}
          y={RAIL - 66}
          font-size="11"
          font-weight="600"
          fill="#334155"
          text-anchor="middle">{gate.name}</text
        >
      {/each}
      <AirCart x={px.map(place.xA)} y={RAIL} width={cartWidth} name="A" color="#4f46e5" shutter />
      <AirCart x={px.map(place.xB)} y={RAIL} width={cartWidth} name="B" color="#0f766e" shutter />
    </svg>
  </div>

  <SegmentedControl label="Loại va chạm" options={KINDS} bind:value={kind} onchange={changed} />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Khối lượng xe A"
      bind:value={mA}
      min={0.2}
      max={0.6}
      step={0.2}
      unit="kg"
      format={(value) => formatFixed(value, 1)}
      oninput={changed}
    />
    <SliderField
      label="Khối lượng xe B"
      bind:value={mB}
      min={0.2}
      max={0.6}
      step={0.2}
      unit="kg"
      format={(value) => formatFixed(value, 1)}
      oninput={changed}
    />
    <SliderField
      label="Lực đẩy: tốc độ xe A khoảng"
      bind:value={v}
      min={0.4}
      max={0.8}
      step={0.1}
      unit="m/s"
      format={(value) => formatFixed(value, 1)}
      oninput={changed}
    />
  </div>
  <button type="button" class={button.primary} onclick={push} disabled={phase === 'moving'}>
    {phase === 'done' ? 'Đẩy lại, đo lần mới' : 'Đẩy xe A'}
  </button>

  {#if phase === 'done' && readings}
    <div class="{card} p-3 text-sm tabular-nums" aria-live="polite">
      <p class="font-semibold text-slate-700">
        {`Đồng hồ đo thời gian, độ dài tấm cản quang d = ${formatNumber(SHUTTER)} m:`}
      </p>
      <ul class="mt-1 list-disc space-y-1 pl-5 text-slate-700">
        <li>{`Trước va chạm, xe A qua cổng 1: ${formatFixed(readings.before, 3)} s`}</li>
        {#if collisionKind === 'mem'}
          <li>
            {`Sau va chạm, hai xe dính nhau qua cổng 2: ${formatFixed(readings.afterB, 3)} s`}
          </li>
        {:else}
          <li>{`Sau va chạm, xe B qua cổng 2: ${formatFixed(readings.afterB, 3)} s`}</li>
          {#if readings.directionA === 0 || readings.afterA === null}
            <li>Sau va chạm, xe A dừng lại, không qua cổng nào.</li>
          {:else if readings.directionA > 0}
            <li>{`Sau va chạm, xe A đi tiếp, qua cổng 2: ${formatFixed(readings.afterA, 3)} s`}</li>
          {:else}
            <li>
              {`Sau va chạm, xe A đi ngược lại, qua cổng 1: ${formatFixed(readings.afterA, 3)} s`}
            </li>
          {/if}
        {/if}
      </ul>
    </div>
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(event) => {
        event.preventDefault();
        record();
      }}
    >
      <label class="min-w-32 flex-1 text-sm font-semibold text-slate-700">
        p trước (kg.m/s)
        <input class="mt-1 {textInput}" autocomplete="off" bind:value={typedBefore} />
      </label>
      <label class="min-w-32 flex-1 text-sm font-semibold text-slate-700">
        p sau (kg.m/s)
        <input class="mt-1 {textInput}" autocomplete="off" bind:value={typedAfter} />
      </label>
      <button type="submit" class={button.primary}>Ghi vào bảng</button>
    </form>
  {/if}

  <FeedbackNote tone={message.tone} text={message.text} />

  {#if rows.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">Bảng số liệu của em</caption>
        <thead>
          <tr class="bg-slate-100">
            <th scope="col" class="px-2 py-1">Loại</th>
            <th scope="col" class="px-2 py-1">mA (kg)</th>
            <th scope="col" class="px-2 py-1">mB (kg)</th>
            <th scope="col" class="px-2 py-1">p trước</th>
            <th scope="col" class="px-2 py-1">p sau</th>
            <th scope="col" class="px-2 py-1">Lệch</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row.id)}
            <tr class="border-b border-slate-200">
              <td class="px-2 py-1">{row.kind}</td>
              <td class="px-2 py-1">{formatFixed(row.mA, 1)}</td>
              <td class="px-2 py-1">{formatFixed(row.mB, 1)}</td>
              <td class="px-2 py-1">{formatFixed(row.before, 3)}</td>
              <td class="px-2 py-1">{formatFixed(row.after, 3)}</td>
              <td class="px-2 py-1">{`${formatNumber(row.gap, 1)}%`}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
