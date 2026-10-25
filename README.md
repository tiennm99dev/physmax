# PhysMax

Vật lí tương tác cho học sinh Việt Nam lớp 6-12, theo bộ sách Kết nối tri thức với cuộc sống (KNTT): mạch Vật lí của Khoa học tự nhiên 6-9 và Vật lí 10-12 cùng các Chuyên đề học tập. Học qua thí nghiệm ảo: kéo lực, đo chuyển động, lắp mạch điện, dò tia sáng.

## Status

Mọi bài trong sách đều có trang; bài chưa soạn hiện dạng "Sắp ra mắt" (noindex). Bài mẫu đã soạn: Lớp 10 — Bài 1. Làm quen với Vật lí.

- `/` chọn lớp; `/lop-N/` các chương theo tập; `/lop-N/<chương>/` các bài; `/lop-N/<chương>/<bài>/` bài học.
- `/co-hoc/`, `/dien-hoc/`, `/quang-hoc/`, ... gom chương của một mạch kiến thức qua mọi lớp.
- `/_gallery/` (noindex) hiển thị mọi thành phần trực quan để rà soát.

Live URL: https://tiennm99dev.github.io/physmax/

## Develop

Yêu cầu: Node 24+, npm.

```sh
npm install
npm run dev           # http://localhost:5173/physmax/
npm run lint          # ESLint (eslint-plugin-svelte)
npm run format:check  # Prettier --check
npm run check         # svelte-kit sync + svelte-check --fail-on-warnings (JSDoc strict)
npm test              # Vitest
npm run build         # Static output → build/
npm run size-report   # Kích thước gzip JS của từng bài (sau build)
npm run stubs         # Đếm bài chưa soạn theo lớp, chương
npm run preview       # Serve build/
```

`npm run stubs -- lop-10/<chương>` chỉ đếm một chương và liệt kê bài còn trống; `--strict` trả mã 1 khi phạm vi đó còn bài chưa soạn.

## Deploy

CI (`.github/workflows/ci.yml`) chạy lint, format:check, check, test, build và size-report cho mỗi push/PR; deploy (`.github/workflows/deploy.yml`) chạy lại toàn bộ các bước đó rồi đưa bản build lên GitHub Pages từ `main`, với `SITE_BASE=/<tên repo>`. Xem `RUNBOOK.md` để rollback.

## Architecture

PhysMax là site anh em của [MathMax](https://github.com/tiennm99dev/mathmax) và dùng chung phần lõi với nó.

- **Phần dùng chung (đồng bộ)**: `src/lib/core/`, các engine `src/lib/*-engine/`, `src/routes/`, `src/params/`, `scripts/`, config, workflow và skill soạn bài được chép từ MathMax bằng `scripts/sync-core.sh` của MathMax. Mỗi file có dòng ghi chú "Synced from tiennm99dev/mathmax"; commit nguồn nằm trong `CORE_VERSION`. Không sửa các file này ở đây: sửa ở MathMax, commit, rồi chạy `scripts/sync-core.sh <đường dẫn tới physmax>` trong MathMax.
- **Phần riêng của PhysMax**: `src/lib/curriculum/lop-6.json` … `lop-12.json` và `strands.json` (sinh một lần từ manifest bằng `node scripts/import-curriculum.js --grades 6-12 <manifest>`, sau đó sửa tay), `src/lib/curriculum/curriculum.test.js`, `src/lib/curriculum/legacy-redirects.js` (rỗng), `src/lib/i18n/site.vi.js` (tên site, các mạch kiến thức), `src/lib/domain/`, `src/lib/lessons/` và `static/`.
- **Static**: SvelteKit + `@sveltejs/adapter-static`, cấu hình trong `vite.config.js`: `paths.base` là `/physmax` (tên package; đổi bằng `SITE_BASE`), CSP chế độ `hash`, Tailwind 4, Be Vietnam Pro, KaTeX render sẵn lúc prerender.
- **Language**: JavaScript only (Svelte 5 runes, JSDoc qua `jsconfig.json` với `checkJs: true`).
- **Thành phần Vật lí** (`src/lib/domain/`): mỗi thành phần có engine thuần (không DOM) kèm test Vitest và một demo `<tên>.gallery.svelte` hiện ở `/_gallery/`. Props được mô tả bằng JSDoc ở đầu mỗi file `.svelte`. Góc đo ngược chiều kim đồng hồ từ trục +x, trục y hướng lên.

| Thành phần         | Engine             | Dùng cho                                                               |
| ------------------ | ------------------ | ---------------------------------------------------------------------- |
| `vector-field`     | `vector-field.js`  | điện trường, trường hấp dẫn của nguồn điểm, trường đều, đường sức      |
| `force-diagram`    | `force-diagram.js` | biểu diễn lực, tổng hợp và phân tích lực, cân bằng lực                 |
| `motion-plot`      | `motion.js`        | đồ thị độ dịch chuyển – thời gian, vận tốc – thời gian, số liệu đo     |
| `circuit-board`    | `circuit.js`       | mạch nối tiếp, song song, định luật Ohm, khoá K, ampe kế               |
| `ray-optics-bench` | `optics.js`        | thấu kính hội tụ, phân kì, ba tia đặc biệt; khúc xạ, phản xạ toàn phần |
| `wave-plot`        | `wave.js`          | hình dạng sóng, li độ theo thời gian, giao thoa, sóng dừng             |
| `thermometer`      | `temperature.js`   | thang °C, °F, K; cân bằng nhiệt, nhiệt lượng                           |

`vector.js` (vectơ phẳng) và `arrow.js` (đầu mũi tên SVG) là phần dùng chung của các thành phần trên.

## Adding a lesson

Hợp đồng của một bài học (thư mục, schema `content.vi.js`, số lượng tối thiểu, kiểm tra trước khi merge) là của MathMax và giống hệt ở đây: xem [phần "Adding a lesson" trong README của MathMax](https://github.com/tiennm99dev/mathmax#adding-a-lesson). Agent soạn bài theo brief đồng bộ ở `.claude/skills/write-lesson/SKILL.md`.

Ở PhysMax:

- Người soạn một chương chỉ thêm file trong `src/lib/lessons/lop-N/<chương>/`; slug lấy nguyên từ `src/lib/curriculum/lop-N.json`.
- Dùng thành phần Vật lí ở `src/lib/domain/` (import qua `#lib/domain/...`) trước khi tự vẽ; xem chúng chạy ở `/_gallery/`. Thành phần mới cho nhiều chương được thêm vào `src/lib/domain/` kèm engine, test và demo gallery.
- Bài mẫu: `src/lib/lessons/lop-10/mo-dau/bai-1-lam-quen-voi-vat-li/` — thí nghiệm máng nghiêng của Galilei trên `motion-plot`, với `engine.js` có test và một widget phụ.

```sh
npx vitest run src/lib/lessons/lop-N/<chương>
npm run lint && npm run format:check && npm run check
npm test
npm run build && npm run size-report
npm run stubs -- lop-N/<chương>   # phải báo 0 stubs
```

## License

Apache-2.0. Xem `LICENSE`.
