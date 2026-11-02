/**
 * Worked dynamics problems for the step-by-step solver. Each problem lists its
 * real forces with sizes worked out from the data, in degrees counter-clockwise
 * from +x (y up), and the Ox axis along the motion. The simulation adds the real
 * forces along Ox on its own, so it can check the answer the learner found by
 * the equations.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** @param {number} deg */
const rad = (deg) => (deg * Math.PI) / 180;

/**
 * Acceleration of a body pulled along a level floor by a force slanting up at
 * `alpha`, with friction on the reduced pressing force N = mg - F sin α.
 * @param {number} m @param {number} force @param {number} alpha degrees @param {number} mu
 */
export function slantedPullAccel(m, force, alpha, mu) {
  const normal = m * G - force * Math.sin(rad(alpha));
  return tidy((force * Math.cos(rad(alpha)) - mu * normal) / m);
}

/**
 * Acceleration of a body sliding down an incline: a = g(sin α - μ cos α).
 * @param {number} alpha degrees @param {number} mu
 */
export function inclineAccel(alpha, mu) {
  return tidy(G * (Math.sin(rad(alpha)) - mu * Math.cos(rad(alpha))));
}

/**
 * The force needed to keep a body moving steadily with a pull slanting up at
 * `alpha`: F cos α = μ(mg - F sin α).
 * @param {number} m @param {number} alpha degrees @param {number} mu
 */
export function steadySlantedPull(m, alpha, mu) {
  return tidy((mu * m * G) / (Math.cos(rad(alpha)) + mu * Math.sin(rad(alpha))));
}

/**
 * Two bodies joined by a light rope, with the pull on the second and the same
 * friction coefficient under both.
 * @param {number} m1 @param {number} m2 @param {number} force @param {number} mu
 * @returns {{ a: number, tension: number }}
 */
export function linkedBodies(m1, m2, force, mu) {
  const a = (force - mu * (m1 + m2) * G) / (m1 + m2);
  return { a: tidy(a), tension: tidy(m1 * (a + mu * G)) };
}

/**
 * Sum of the force components along a direction.
 * @param {Array<{ size: number, angle: number }>} forces
 * @param {number} axis degrees
 */
export function sumAlong(forces, axis) {
  return tidy(forces.reduce((sum, f) => sum + f.size * Math.cos(rad(f.angle - axis)), 0));
}

/**
 * @typedef {object} Problem
 * @property {string} value
 * @property {string} label
 * @property {string} text
 * @property {number} mass
 * @property {number} v0 initial speed, m/s
 * @property {number} axis Ox direction, degrees
 * @property {number} scale pixels per newton
 * @property {number} runTime seconds of simulation
 * @property {Array<{ name: string, tex: string, size: number, angle: number }>} forces
 * @property {Array<{ tex: string, why: string }>} decoys
 * @property {Array<{ text: string, right?: boolean, why: string }>} axes
 * @property {Array<{ tex: string, right?: boolean, why: string }>} equations
 * @property {number} answer the acceleration, m/s²
 * @property {string} ask
 */

const PULL = { m: 10, f: 50, alpha: 30, mu: 0.2 };
const PULL_N = tidy(PULL.m * G - PULL.f * Math.sin(rad(PULL.alpha)));
const SLIDE = { m: 0.5, alpha: 30, mu: 0.3 };
const SLIDE_N = tidy(SLIDE.m * G * Math.cos(rad(SLIDE.alpha)));
const BRAKE = { m: 1500, v0: 20, mu: 0.5 };
const BRAKE_N = BRAKE.m * G;

const INERTIA = {
  tex: 'Lực quán tính đẩy vật đi tiếp',
  why: 'Quán tính không phải là một lực: không có vật nào tác dụng lực đó.',
};
const ON_FLOOR = {
  tex: 'Áp lực của vật lên mặt đỡ',
  why: 'Lực này đặt lên mặt đỡ, không đặt lên vật đang xét. Chỉ vẽ các lực tác dụng lên vật.',
};

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    value: 'ngang',
    label: 'Kéo chếch trên sàn',
    text: 'Kéo thùng $m = 10$ kg đang đứng yên trên sàn ngang bằng dây chếch lên $30^\\circ$, lực kéo $F = 50$ N, hệ số ma sát trượt $\\mu = 0{,}2$. Lấy $g = 9{,}8$ m/s². Tính gia tốc của thùng.',
    mass: PULL.m,
    v0: 0,
    axis: 0,
    scale: 0.6,
    runTime: 2,
    forces: [
      { name: 'P', tex: 'Trọng lực $\\vec{P}$', size: tidy(PULL.m * G), angle: -90 },
      { name: 'N', tex: 'Phản lực $\\vec{N}$ của sàn', size: PULL_N, angle: 90 },
      { name: 'F', tex: 'Lực kéo $\\vec{F}$ của dây', size: PULL.f, angle: PULL.alpha },
      {
        name: 'Fms',
        tex: 'Lực ma sát trượt $\\vec{F}_{mst}$',
        size: tidy(PULL.mu * PULL_N),
        angle: 180,
      },
    ],
    decoys: [INERTIA, ON_FLOOR],
    axes: [
      {
        text: '$Ox$ nằm ngang theo chiều chuyển động, $Oy$ thẳng đứng hướng lên.',
        right: true,
        why: 'Đúng: gia tốc nằm dọc theo $Ox$, nên theo $Oy$ các lực cân bằng.',
      },
      {
        text: '$Ox$ dọc theo dây kéo, $Oy$ vuông góc với dây.',
        why: 'Khi đó gia tốc có thành phần trên cả hai trục, phương trình phức tạp hơn. Hãy chọn $Ox$ theo hướng chuyển động.',
      },
    ],
    equations: [
      {
        tex: '$F\\cos 30^\\circ - \\mu(mg - F\\sin 30^\\circ) = ma$',
        right: true,
        why: 'Đúng: từ $Oy$ ta có $N = mg - F\\sin 30^\\circ$, thay vào $F_{mst} = \\mu N$.',
      },
      {
        tex: '$F\\cos 30^\\circ - \\mu mg = ma$',
        why: 'Dây kéo chếch lên làm áp lực giảm: chiếu lên $Oy$ để tìm $N$, không phải $N = mg$.',
      },
      {
        tex: '$F - \\mu(mg - F\\sin 30^\\circ) = ma$',
        why: 'Chỉ phần $F\\cos 30^\\circ$ của lực kéo nằm dọc theo $Ox$.',
      },
    ],
    answer: slantedPullAccel(PULL.m, PULL.f, PULL.alpha, PULL.mu),
    ask: 'Tính gia tốc $a$ (m/s²), làm tròn đến hai chữ số thập phân.',
  },
  {
    value: 'nghieng',
    label: 'Sách trên mặt nghiêng',
    text: 'Quyển sách $m = 0{,}5$ kg được thả trượt từ trạng thái nghỉ trên mặt bàn nghiêng $30^\\circ$, hệ số ma sát trượt $\\mu = 0{,}3$. Lấy $g = 9{,}8$ m/s². Tính gia tốc của sách.',
    mass: SLIDE.m,
    v0: 0,
    axis: -SLIDE.alpha,
    scale: 9,
    runTime: 2,
    forces: [
      { name: 'P', tex: 'Trọng lực $\\vec{P}$', size: tidy(SLIDE.m * G), angle: -90 },
      { name: 'N', tex: 'Phản lực $\\vec{N}$ của mặt bàn', size: SLIDE_N, angle: 90 - SLIDE.alpha },
      {
        name: 'Fms',
        tex: 'Lực ma sát trượt $\\vec{F}_{mst}$',
        size: tidy(SLIDE.mu * SLIDE_N),
        angle: 180 - SLIDE.alpha,
      },
    ],
    decoys: [
      {
        tex: 'Lực trượt riêng kéo sách xuống dốc',
        why: 'Đó chỉ là thành phần $P\\sin\\alpha$ của trọng lực, không phải thêm một lực nữa.',
      },
      ON_FLOOR,
    ],
    axes: [
      {
        text: '$Ox$ dọc theo mặt nghiêng hướng xuống, $Oy$ vuông góc với mặt nghiêng.',
        right: true,
        why: 'Đúng: gia tốc dọc theo mặt nghiêng, chỉ cần phân tích $\\vec{P}$.',
      },
      {
        text: '$Ox$ nằm ngang, $Oy$ thẳng đứng.',
        why: 'Vật chuyển động xiên so với các trục này, gia tốc có cả hai thành phần. Hãy chọn $Ox$ theo hướng chuyển động.',
      },
    ],
    equations: [
      {
        tex: '$mg\\sin\\alpha - \\mu mg\\cos\\alpha = ma$',
        right: true,
        why: 'Đúng: từ $Oy$ có $N = mg\\cos\\alpha$.',
      },
      {
        tex: '$mg\\sin\\alpha + \\mu mg\\cos\\alpha = ma$',
        why: 'Lực ma sát ngược chiều chuyển động, nên mang dấu trừ khi chiếu lên $Ox$.',
      },
      {
        tex: '$mg\\cos\\alpha - \\mu mg\\sin\\alpha = ma$',
        why: 'Hãy kiểm tra lại góc: với $\\alpha = 0$ (mặt phẳng ngang), thành phần của $\\vec{P}$ dọc mặt phải bằng $0$, tức $mg\\sin\\alpha$.',
      },
    ],
    answer: inclineAccel(SLIDE.alpha, SLIDE.mu),
    ask: 'Tính gia tốc $a$ (m/s²), làm tròn đến hai chữ số thập phân.',
  },
  {
    value: 'ham',
    label: 'Ô tô hãm phanh',
    text: 'Ô tô $m = 1\\,500$ kg đang chạy với tốc độ $20$ m/s trên đường ngang thì phanh gấp, bánh xe trượt với hệ số ma sát trượt $\\mu = 0{,}5$. Lấy $g = 9{,}8$ m/s². Tính gia tốc của xe.',
    mass: BRAKE.m,
    v0: BRAKE.v0,
    axis: 0,
    scale: 0.004,
    runTime: 5,
    forces: [
      { name: 'P', tex: 'Trọng lực $\\vec{P}$', size: tidy(BRAKE_N), angle: -90 },
      { name: 'N', tex: 'Phản lực $\\vec{N}$ của mặt đường', size: tidy(BRAKE_N), angle: 90 },
      {
        name: 'Fms',
        tex: 'Lực ma sát trượt $\\vec{F}_{mst}$',
        size: tidy(BRAKE.mu * BRAKE_N),
        angle: 180,
      },
    ],
    decoys: [
      {
        tex: 'Lực phát động giữ xe tiếp tục chạy',
        why: 'Khi phanh gấp không có lực nào đẩy xe tiến lên. Xe vẫn chạy tiếp là do quán tính.',
      },
      ON_FLOOR,
    ],
    axes: [
      {
        text: '$Ox$ nằm ngang theo chiều chuyển động, $Oy$ thẳng đứng hướng lên.',
        right: true,
        why: 'Đúng: chọn chiều dương là chiều chuyển động, gia tốc sẽ âm vì xe chậm dần.',
      },
      {
        text: '$Ox$ thẳng đứng hướng xuống, $Oy$ nằm ngang.',
        why: 'Chuyển động nằm ngang, nên đặt $Ox$ theo phương ngang để các phương trình đơn giản nhất.',
      },
    ],
    equations: [
      {
        tex: '$-\\mu mg = ma$',
        right: true,
        why: 'Đúng: chỉ có lực ma sát nằm dọc $Ox$, ngược chiều dương, và $N = mg$.',
      },
      {
        tex: '$\\mu mg = ma$',
        why: 'Lực ma sát ngược chiều dương đã chọn, phải mang dấu trừ.',
      },
      {
        tex: '$mg - \\mu mg = ma$',
        why: 'Trọng lực vuông góc với $Ox$, không có thành phần theo $Ox$.',
      },
    ],
    answer: tidy(-BRAKE.mu * G),
    ask: 'Tính gia tốc $a$ (m/s²) theo trục $Ox$, có viết dấu.',
  },
];

/** Widest gap accepted between a typed acceleration and the true one, m/s². */
export const ANSWER_TOLERANCE = 0.02;

/**
 * Whether a typed acceleration is right.
 * @param {number} typed @param {Problem} problem
 */
export function isRightAnswer(typed, problem) {
  return Math.abs(typed - problem.answer) <= ANSWER_TOLERANCE;
}

/**
 * The learner's picked force names compared with the real forces.
 * @param {string[]} picked option texts @param {Problem} problem
 * @returns {{ missing: string[], extra: Array<{ tex: string, why: string }> }}
 */
export function checkForces(picked, problem) {
  return {
    missing: problem.forces.filter((f) => !picked.includes(f.tex)).map((f) => f.tex),
    extra: problem.decoys.filter((d) => picked.includes(d.tex)),
  };
}

/**
 * Where the simulation has the body at time `t`: the acceleration comes from
 * adding the forces along Ox. A braking body stays stopped once its speed is zero.
 * @param {Problem} problem @param {number} t seconds
 * @returns {{ a: number, v: number, s: number }}
 */
export function simulate(problem, t) {
  const a = tidy(sumAlong(problem.forces, problem.axis) / problem.mass);
  const stop = a < 0 && problem.v0 > 0 ? -problem.v0 / a : Infinity;
  const at = Math.min(t, stop);
  return {
    a,
    v: tidy(problem.v0 + a * at),
    s: tidy(problem.v0 * at + (a * at * at) / 2),
  };
}
