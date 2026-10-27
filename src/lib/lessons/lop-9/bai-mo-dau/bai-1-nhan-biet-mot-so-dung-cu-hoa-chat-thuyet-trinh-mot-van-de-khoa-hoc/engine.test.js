import { describe, expect, it } from 'vitest';
import { EXPERIMENTS, SHELVES, TOOLS, checkKit, toolById } from './engine.js';

/** @param {string} id */
const exp = (id) => {
  const e = EXPERIMENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

describe('tool store', () => {
  it('gives every tool a unique id, a known shelf, a use and a safety note', () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const shelves = new Set(SHELVES.map((s) => s.id));
    for (const t of TOOLS) {
      expect(shelves.has(t.shelf)).toBe(true);
      expect(t.use.length).toBeGreaterThan(10);
      expect(t.safety.length).toBeGreaterThan(10);
    }
  });

  it('names only existing tools in every experiment role', () => {
    for (const e of EXPERIMENTS) {
      for (const r of e.roles) for (const id of r.tools) expect(() => toolById(id)).not.toThrow();
    }
    expect(() => toolById('khong-co')).toThrow();
  });
});

describe('checkKit', () => {
  it('accepts the refraction kit with either light source', () => {
    expect(checkKit(exp('khuc-xa'), ['den', 'ban-ban-tru', 'bang-chia-do']).ok).toBe(true);
    expect(checkKit(exp('khuc-xa'), ['laser', 'ban-ban-tru', 'bang-chia-do']).ok).toBe(true);
  });

  it('names the missing need, not the missing tool', () => {
    const r = checkKit(exp('khuc-xa'), ['laser', 'ban-ban-tru']);
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(['đọc góc tới và góc khúc xạ']);
    expect(r.text).toContain('Còn thiếu');
    expect(r.text).not.toContain('Bảng chia độ');
  });

  it('flags tools the experiment does not use', () => {
    const r = checkKit(exp('thau-kinh'), [
      'den',
      'khe-f',
      'thau-kinh-phan-ki',
      'thau-kinh-hoi-tu',
      'man-chan',
      'gia-quang-hoc',
    ]);
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual([]);
    expect(r.extra).toEqual(['Thấu kính phân kì']);
  });

  it('accepts the induction kit with the LED coil alone or a coil and a galvanometer', () => {
    expect(checkKit(exp('cam-ung'), ['nam-cham', 'cuon-day-led']).ok).toBe(true);
    expect(checkKit(exp('cam-ung'), ['nam-cham', 'cuon-day', 'dien-ke']).ok).toBe(true);
    expect(checkKit(exp('cam-ung'), ['nam-cham', 'cuon-day']).missing).toEqual([
      'phát hiện dòng điện cảm ứng và chiều của nó',
    ]);
  });

  it('flags tools that only repeat a job another taken tool does', () => {
    const both = checkKit(exp('khuc-xa'), ['den', 'laser', 'ban-ban-tru', 'bang-chia-do']);
    expect(both.ok).toBe(false);
    expect(both.repeated).toEqual(['Đèn sợi đốt 12 V', 'Nguồn laser']);
    const coils = checkKit(exp('cam-ung'), ['nam-cham', 'cuon-day-led', 'dien-ke']);
    expect(coils.ok).toBe(false);
    expect(coils.repeated).toEqual(['Điện kế (galvanometer)']);
    expect(coils.text).toContain('trùng việc');
  });

  it('lets a kit carry the power supply and wires a setup may use', () => {
    expect(
      checkKit(exp('thau-kinh'), [
        'bien-ap',
        'day-noi',
        'den',
        'khe-f',
        'thau-kinh-hoi-tu',
        'man-chan',
        'gia-quang-hoc',
      ]).ok,
    ).toBe(true);
    expect(checkKit(exp('cam-ung'), ['nam-cham', 'cuon-day', 'dien-ke', 'day-noi']).ok).toBe(true);
    expect(checkKit(exp('dun-coc'), ['coc', 'den-con', 'kieng', 'luoi', 'day-noi']).extra).toEqual([
      'Dây nối',
    ]);
  });

  it('needs the gauze to heat a beaker', () => {
    const r = checkKit(exp('dun-coc'), ['coc', 'den-con', 'kieng']);
    expect(r.missing).toEqual(['làm nhiệt phân bố đều ở đáy cốc']);
    expect(checkKit(exp('dun-coc'), ['coc', 'den-con', 'kieng', 'luoi']).ok).toBe(true);
  });

  it('reports an empty kit', () => {
    const r = checkKit(exp('chi-thi'), []);
    expect(r.ok).toBe(false);
    expect(r.text).toContain('trống');
  });

  it('has a kit that passes for every experiment', () => {
    for (const e of EXPERIMENTS) {
      const kit = e.roles.map((r) => r.tools[0]);
      expect(checkKit(e, kit).ok).toBe(true);
    }
  });
});
