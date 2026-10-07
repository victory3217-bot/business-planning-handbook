import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { dirname, resolve as __resolve } from "node:path";
import { fileURLToPath } from "node:url";
const REPO = __resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = REPO;
const C = { navy: "#14253D", teal: "#315B62", gold: "#C49A5A", ivory: "#F6F2EA", white: "#FFFFFF", ink: "#252A30", muted: "#6B7280" };
const FONT = "system-ui, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";

// style: fs = font size, lh = line height, w = weight
const ST = {
  big: { fs: 30, lh: 36, w: 700 },
  title: { fs: 20, lh: 27, w: 700 },
  sub: { fs: 17, lh: 23, w: 400 },
  small: { fs: 16, lh: 21, w: 400 },
  tsm: { fs: 18, lh: 25, w: 700 },
};
const warnings = [];
function estWidth(t, st) {
  let w = 0;
  for (const ch of t) w += /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af\u00b7·—]/.test(ch) ? st.fs : st.fs * (st.w >= 700 ? 0.6 : 0.54);
  return w;
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// lines: [{s:'title', t:'..', c:color}]
function block(id, cx, top, boxW, boxH, lines, defaultColor, indent = "    ") {
  const total = lines.reduce((a, l) => a + ST[l.s].lh, 0);
  if (total > boxH - 12) warnings.push(`${id}: text height ${total} > box ${boxH - 12}`);
  let y = top + (boxH - total) / 2;
  const out = [`${indent}<text x="${cx}" y="0" text-anchor="middle" font-family="${FONT}">`];
  out.pop();
  const parts = [];
  for (const l of lines) {
    const st = ST[l.s];
    if (estWidth(l.t, st) > boxW - 16) warnings.push(`${id}: "${l.t}" ~${Math.round(estWidth(l.t, st))} > ${boxW - 16}`);
    const base = Math.round(y + st.lh * 0.5 + st.fs * 0.35);
    parts.push(`${indent}<text x="${cx}" y="${base}" text-anchor="middle" font-size="${st.fs}" font-weight="${st.w}" fill="${l.c || defaultColor}">${esc(l.t)}</text>`);
    y += st.lh;
  }
  return parts.join("\n");
}
function box(x, y, w, h, fill, stroke, sw = 0) {
  return `    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}/>`;
}
function node(id, x, y, w, h, fill, textColor, lines, stroke, sw) {
  return `  <g id="${id}">\n${box(x, y, w, h, fill, stroke, sw)}\n${block(id, x + w / 2, y, w, h, lines, textColor)}\n  </g>`;
}
function heading(x, y, t, fs = 17) {
  return `    <text x="${x}" y="${y}" font-size="${fs}" font-weight="700" fill="${C.ink}">${esc(t)}</text>`;
}
function plainText(x, y, t, st = "small", color = C.ink, anchor = "start") {
  const s = ST[st];
  return `    <text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${s.fs}" font-weight="${s.w}" fill="${color}">${esc(t)}</text>`;
}
function wrapSvg({ W, H, title, desc, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${esc(title)}</title>
  <desc id="d">${esc(desc)}</desc>
  <defs>
    <marker id="arrow-navy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${C.navy}"/>
    </marker>
    <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${C.gold}"/>
    </marker>
  </defs>
  <g id="background">
    <rect width="${W}" height="${H}" rx="14" fill="${C.ivory}"/>
  </g>
${body}
</svg>
`;
}
const line = (x1, y1, x2, y2, o = {}) =>
  `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.color || C.navy}" stroke-width="${o.sw || 2.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.end ? ` marker-end="url(#arrow-${o.end})"` : ""}${o.start ? ` marker-start="url(#arrow-${o.start})"` : ""}/>`;

// ---------------------------------------------------------------- CH01
function ch01(L) {
  const g = [];
  g.push(node("criteria", 40, 24, 400, 72, C.navy, C.white, [
    { s: "title", t: L.a1 }, { s: "sub", t: L.a2, c: C.ivory }]));
  g.push(`  <g id="criteria-items">\n${line(240, 96, 240, 120, { sw: 2.5 })}`);
  const chips = [[40, 120, L.c1], [248, 120, L.c2], [40, 184, L.c3], [248, 184, L.c4]];
  chips.forEach(([x, y, t], i) => {
    g.push(box(x, y, 192, 52, C.teal));
    g.push(block(`chip${i}`, x + 96, y, 192, 52, [{ s: "title", t }], C.white));
  });
  g.push("  </g>");
  g.push(`  <g id="priority-system">\n${line(240, 240, 240, 278, { end: "navy" })}`);
  g.push(box(40, 280, 400, 104, C.gold));
  g.push(block("priority", 240, 280, 400, 104, [{ s: "title", t: L.p1 }, ...L.p2.map((t) => ({ s: "sub", t }))], C.ink));
  g.push("  </g>");
  g.push(`  <g id="downstream">\n${line(240, 384, 240, 420, { end: "navy" })}`);
  g.push(plainText(254, 408, L.flow, "small", C.ink));
  g.push(box(40, 424, 192, 140, C.teal));
  g.push(block("item", 136, 424, 192, 140, [...L.d1.map((t) => ({ s: "title", t })), ...L.d1s.map((t) => ({ s: "small", t, c: C.ivory }))], C.white));
  g.push(box(248, 424, 192, 140, C.teal));
  g.push(block("feasibility", 344, 424, 192, 140, [...L.d2.map((t) => ({ s: "tsm", t })), ...L.d2s.map((t) => ({ s: "small", t, c: C.ivory }))], C.white));
  g.push("  </g>");
  g.push(`  <g id="reopen-loop">\n    <path d="M440 494 H466 V60 H446" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#arrow-gold)"/>\n  </g>`);
  g.push(`  <g id="legend">\n${line(40, 616, 84, 616, { end: "navy" })}`);
  g.push(plainText(96, 622, L.lg1));
  g.push(line(40, 656, 84, 656, { color: C.gold, sw: 3, dash: "7 5", end: "gold" }));
  g.push(plainText(96, 662, L.lg2a));
  g.push(plainText(96, 684, L.lg2b));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 712, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH01 = {
  ko: {
    title: "사업의 기준과 후속 의사결정의 관계",
    desc: "사업의 기준은 라이프스타일, 목표수익, 성장규모, Not-to-do 네 가지 기준으로 이루어지며 하나의 우선순위 체계로 묶인다. 이 체계는 아이템 선택과 시장·가격·타당성 검토에서 필터이자 입력값으로 작동한다. 점선 화살표는 가족상황·자금상황·역할·시장환경이 바뀌어 원하는 결과가 달라졌을 때 기준을 다시 검토한다는 뜻이다.",
    a1: "사업의 기준", a2: "사업가 자신의 판단기준",
    c1: "라이프스타일", c2: "목표수익", c3: "성장규모", c4: "Not-to-do",
    p1: "우선순위 체계", p2: ["무엇을 우선하고 포기할지는", "사업가가 정한다"],
    flow: "필터·입력값으로 작동",
    d1: ["아이템 선택"], d1s: ["Not-to-do를", "직접 사용"],
    d2: ["시장·가격·", "타당성 검토"], d2s: ["사업목적·목표수익이", "전제조건"],
    lg1: "실선 화살표: 판단의 입력·필터로 작동",
    lg2a: "점선 화살표: 상황·원하는 결과가 달라지면", lg2b: "기준을 다시 검토",
  },
  en: {
    title: "Relationship between business criteria and subsequent decisions",
    desc: "Business criteria consist of four criteria — lifestyle, target revenue, growth scale, and Not-to-do — brought together into a single priority system. This system works as a filter and an input in item selection and in the market, pricing, and feasibility review. The dashed arrow means the criteria are reopened when family circumstances, financial circumstances, role, or market environment change and the outcome the entrepreneur wants has changed.",
    a1: "Business Criteria", a2: "The entrepreneur's own judgment criteria",
    c1: "Lifestyle", c2: "Target revenue", c3: "Growth scale", c4: "Not-to-do",
    p1: "Priority system", p2: ["The entrepreneur decides what to", "prioritize and what to give up"],
    flow: "Acts as a filter and input",
    d1: ["Item selection"], d1s: ["Not-to-do is", "used directly"],
    d2: ["Market, pricing,", "feasibility review"], d2s: ["Business purpose and", "target revenue are", "preconditions"],
    lg1: "Solid arrow: input and filter for judgment",
    lg2a: "Dashed arrow: reopen the criteria when", lg2b: "circumstances or desired outcomes change",
  },
};

// ---------------------------------------------------------------- CH02
function ch02(L) {
  const g = [];
  const nodeLines = (n) => [{ s: "big", t: n.k }, ...n.t.map((t) => ({ s: "title", t })), ...n.s.map((t) => ({ s: "small", t, c: C.ivory }))];
  g.push(`  <g id="relations">`);
  g.push(line(208, 105, 272, 105, { start: "navy", end: "navy" }));
  g.push(line(104, 184, 170, 376, { start: "navy", end: "navy" }));
  g.push(line(376, 184, 310, 376, { start: "navy", end: "navy" }));
  g.push("  </g>");
  g.push(node("T", 24, 30, 180, 150, C.navy, C.white, nodeLines(L.T)));
  g.push(node("M", 276, 30, 180, 150, C.navy, C.white, nodeLines(L.M)));
  g.push(node("P", 150, 380, 180, 150, C.navy, C.white, nodeLines(L.P)));
  g.push(node("alignment", 165, 205, 150, 100, C.gold, C.ink, [{ s: "title", t: L.al1 }, ...L.al2.map((t) => ({ s: "small", t }))]));
  g.push(node("note", 40, 560, 400, 92, C.teal, C.white, L.note.map((t) => ({ s: "sub", t }))));
  g.push(`  <g id="legend">`);
  g.push(line(40, 688, 84, 688, { start: "navy", end: "navy" }));
  g.push(plainText(96, 694, L.lg1));
  g.push(plainText(96, 716, L.lg2));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 740, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH02 = {
  ko: {
    title: "TPM 정합성",
    desc: "T(실행 가능한 역량, 무엇을 할 수 있는가), P(상품가설, 무엇을 팔 것인가), M(산업과 시장, 어디에서 사업기회를 찾을 것인가) 세 요소가 서로를 제약하고 수정하는 관계로 연결되어 있고, 세 요소가 하나의 논리로 맞물릴 때 정합성이 만들어진다. 정합성 확인은 사업 검증 완료가 아니라 다음 단계로 넘어갈 만큼 가설이 선명해졌다는 신호다.",
    T: { k: "T", t: ["실행 가능한 역량"], s: ["무엇을 할 수 있는가"] },
    P: { k: "P", t: ["상품가설"], s: ["무엇을 팔 것인가"] },
    M: { k: "M", t: ["산업과 시장"], s: ["어디에서 사업기회를", "찾을 것인가"] },
    al1: "정합성", al2: ["T·P·M이 하나의", "논리로 맞물림"],
    note: ["정합성 확인은 사업 검증이 아니라", "다음 단계로 넘어갈 만큼 가설이", "선명해졌다는 신호다"],
    lg1: "양방향 화살표: 서로를 제약하고",
    lg2: "수정하는 관계",
  },
  en: {
    title: "TPM alignment",
    desc: "T (executable capability: what can you do), P (product hypothesis: what will you sell), and M (industry and market: where will you look for the business opportunity) are connected as elements that constrain and revise each other. Alignment is created when the three lock together into one logic. Confirming alignment is not business validation; it is a signal that the hypothesis is clear enough to move to the next stage.",
    T: { k: "T", t: ["Executable", "capability"], s: ["What can you do"] },
    P: { k: "P", t: ["Product", "hypothesis"], s: ["What will you sell"] },
    M: { k: "M", t: ["Industry", "and market"], s: ["Where will you look", "for the opportunity"] },
    al1: "Alignment", al2: ["T, P, and M lock", "into one logic"],
    note: ["Confirming alignment is not", "business validation; it signals the", "hypothesis is clear enough to move on"],
    lg1: "Two-way arrow: the elements",
    lg2: "constrain and revise each other",
  },
};

// ---------------------------------------------------------------- CH03
function ch03(L) {
  const g = [];
  const cols = [24, 172, 320];
  g.push(`  <g id="roles">`);
  L.roles.forEach((r, i) => {
    g.push(box(cols[i], 24, 136, 106, C.navy));
    g.push(block(`role${i}`, cols[i] + 68, 24, 136, 106, [{ s: "title", t: r.n }, ...(r.e ? [{ s: "small", t: r.e, c: C.ivory }] : []), ...r.q.map((t) => ({ s: "small", t }))], C.white));
  });
  g.push("  </g>");
  g.push(`  <g id="b2c-converged">`);
  g.push(heading(24, 172, L.h1));
  g.push(box(24, 186, 432, 64, C.white, C.gold, 4));
  g.push(block("one-person", 240, 186, 432, 64, [{ s: "title", t: L.one, c: C.navy }], C.navy));
  g.push("  </g>");
  g.push(`  <g id="b2b-b2g-split">`);
  g.push(heading(24, 292, L.h2));
  L.split.forEach((s, i) => {
    g.push(box(cols[i], 306, 136, 96, C.teal));
    g.push(block(`split${i}`, cols[i] + 68, 306, 136, 96, [{ s: "small", t: s.r, c: C.ivory }, ...s.t.map((t) => ({ s: "title", t }))], C.white));
  });
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 430, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH03 = {
  ko: {
    title: "사용자·구매자·지불자 구분",
    desc: "사용자(User)는 실제로 문제를 겪는 사람, 구매자(Buyer)는 구매를 결정하는 사람, 지불자(Payer)는 비용을 지불하는 사람이다. B2C에서는 이 세 역할이 한 사람에게 모일 수 있고, B2B·B2G에서는 현장 사용자, 구매담당자, 예산승인자로 분리되는 경우가 많다.",
    roles: [
      { n: "사용자", e: "User", q: ["실제로 문제를", "겪는 사람"] },
      { n: "구매자", e: "Buyer", q: ["구매를", "결정하는 사람"] },
      { n: "지불자", e: "Payer", q: ["비용을", "지불하는 사람"] },
    ],
    h1: "B2C — 한 사람에게 모일 수 있다", one: "사용자 · 구매자 · 지불자",
    h2: "B2B·B2G — 분리되는 경우가 많다",
    split: [{ r: "사용자", t: ["현장 사용자"] }, { r: "구매자", t: ["구매담당자"] }, { r: "지불자", t: ["예산승인자"] }],
  },
  en: {
    title: "User, Buyer, and Payer roles",
    desc: "The User is the person who actually experiences the problem, the Buyer decides the purchase, and the Payer bears the cost. In B2C these three roles can converge into one person; in B2B and B2G they are frequently split into the field user, the purchasing manager, and the budget approver.",
    roles: [
      { n: "User", q: ["Who experiences", "the problem"] },
      { n: "Buyer", q: ["Who decides", "the purchase"] },
      { n: "Payer", q: ["Who bears", "the cost"] },
    ],
    h1: "B2C — can converge into one person", one: "User · Buyer · Payer",
    h2: "B2B · B2G — frequently split apart",
    split: [{ r: "User", t: ["Field user"] }, { r: "Buyer", t: ["Purchasing", "manager"] }, { r: "Payer", t: ["Budget", "approver"] }],
  },
};

// ---------------------------------------------------------------- shared helper for CH04-CH08
function mk(id, x, y, w, h, fill, titles, subs, subStyle = "sub") {
  const gold = fill === C.gold;
  const tc = gold ? C.ink : C.white;
  const sc = gold ? C.ink : C.ivory;
  const lines = [...titles.map((t) => ({ s: "title", t })), ...subs.map((t) => ({ s: subStyle, t, c: sc }))];
  return `  <g id="${id}">\n${box(x, y, w, h, fill)}\n${block(id, x + w / 2, y, w, h, lines, tc)}\n  </g>`;
}
const down = (cx, y1, y2) => line(cx, y1, cx, y2, { end: "navy" });

// ---------------------------------------------------------------- CH04
function ch04(L) {
  const g = [];
  const X = 40, Wd = 400;
  const ys = [24, 168, 296, 464, 592];
  const hs = [112, 96, 136, 96, 132];
  g.push(mk("problem-to-product", X, ys[0], Wd, hs[0], C.teal, L.b1t, L.b1s));
  g.push(mk("competing-alternatives", X, ys[1], Wd, hs[1], C.teal, L.b2t, L.b2s));
  g.push(mk("metrics-and-advantage", X, ys[2], Wd, hs[2], C.teal, L.b3t, L.b3s));
  g.push(mk("value-proposition", X, ys[3], Wd, hs[3], C.gold, L.b4t, L.b4s));
  g.push(mk("positioning", X, ys[4], Wd, hs[4], C.navy, L.b5t, L.b5s));
  g.push(`  <g id="flow">`);
  for (let i = 0; i < 4; i++) g.push(down(240, ys[i] + hs[i] + 2, ys[i + 1] - 3));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 748, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH04 = {
  ko: {
    title: "고객문제에서 가치제안·포지셔닝까지",
    desc: "고객문제를 문제→속성→해법→제품·서비스로 정리하고, 경쟁재와 대체재를 고객문제 기준으로 파악한 뒤, 비교지표로 비교해 경쟁우위 7가지 기준으로 점검한다. 고객문제·해법·선택이유가 하나의 논리로 연결된 상태가 가치제안이며, 포지셔닝은 그 차이를 고객이 어떤 의미로 인식하게 할 것인가를 정하고 4P가 같은 방향을 지원하는지 점검한다.",
    b1t: ["문제 → 속성 → 해법 →", "제품·서비스"], b1s: ["특정 고객에게 필요한 기능과 성능을", "선택하고 조합한다"],
    b2t: ["경쟁대안: 경쟁재 · 대체재"], b2s: ["고객문제를 기준으로 범위를 정한다"],
    b3t: ["비교지표 → 경쟁우위"], b3s: ["7가지 점검 기준", "중요성·효율성·우월성·가시성", "선점성·결정력·수익성"],
    b4t: ["가치제안"], b4s: ["고객문제·해법·선택이유가", "하나의 논리로 연결된 상태"],
    b5t: ["포지셔닝"], b5s: ["차이를 고객이 어떤 의미로", "인식하게 할 것인가", "4P가 같은 방향을 지원하는지", "점검한다"],
  },
  en: {
    title: "From customer problem to value proposition and positioning",
    desc: "The customer problem is organized as problem, attribute, solution, product/service. Competing products and substitutes are identified based on the customer problem, compared through comparison metrics, and checked against the seven competitive-advantage criteria. The Value Proposition is the state in which the customer problem, the solution, and the reason to choose are linked in one logic. Positioning decides how the customer should perceive the difference and checks that the 4P point in the same direction.",
    b1t: ["Problem → Attribute →", "Solution → Product/Service"], b1s: ["Select and combine the functions and", "performance this customer needs"],
    b2t: ["Competing products", "and substitutes"], b2s: ["Boundary set by the customer problem"],
    b3t: ["Comparison metrics →", "competitive advantage"], b3s: ["Seven criteria: importance, efficiency,", "superiority, visibility, preemptiveness,", "decisiveness, profitability"],
    b4t: ["Value Proposition"], b4s: ["Customer problem, solution, and reason", "to choose, linked in one logic"],
    b5t: ["Positioning"], b5s: ["How the customer should perceive", "the difference", "Check that Product/Service, Price,", "Place, Promotion point the same way"],
  },
};

// ---------------------------------------------------------------- CH05
function ch05(L) {
  const g = [];
  g.push(`  <g id="axis">`);
  g.push(line(180, 181, 180, 211));
  g.push(line(300, 181, 300, 211));
  g.push(line(240, 327, 240, 379));
  g.push("  </g>");
  g.push(mk("value-delivery", 24, 30, 180, 150, C.navy, L.d1, L.d1s, "small"));
  g.push(mk("value-creation", 276, 30, 180, 150, C.navy, L.d2, L.d2s, "small"));
  g.push(mk("value-capture", 150, 380, 180, 150, C.navy, L.d3, L.d3s, "small"));
  g.push(mk("value-proposition", 155, 212, 170, 114, C.gold, L.c1, L.c1s, "small"));
  g.push(mk("note", 40, 560, 400, 92, C.teal, [], L.note));
  g.push(`  <g id="legend">`);
  g.push(line(40, 688, 84, 688));
  g.push(plainText(96, 694, L.lg1));
  g.push(plainText(96, 716, L.lg2));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 740, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH05 = {
  ko: {
    title: "가치제안을 중심으로 한 비즈니스모델의 세 구조",
    desc: "비즈니스모델은 가치제안을 축으로 가치전달(고객·채널·고객관계), 가치창출(핵심자원·핵심활동·핵심파트너십), 가치회수(비용구조·수익원) 세 구조로 나뉘며, 이 셋은 서로 분리된 채 독립적으로 설계될 수 없다. 한 칸의 선택은 다른 칸을 바꾸고, 연결문장이 끊기면 아직 정리되지 않은 의사결정이 있다는 신호다.",
    d1: ["가치전달"], d1s: ["고객 · 채널", "고객관계"],
    d2: ["가치창출"], d2s: ["핵심자원 · 핵심활동", "핵심파트너십"],
    d3: ["가치회수"], d3s: ["비용구조 · 수익원"],
    c1: ["가치제안"], c1s: ["세 구조를 잇는 축"],
    note: ["한 칸의 선택은 다른 칸을 바꾼다.", "연결문장이 끊기면 아직 정리되지 않은", "의사결정이 있다는 신호다"],
    lg1: "선: 가치제안을 축으로 연결된다",
    lg2: "(서로 독립적으로 설계할 수 없다)",
  },
  en: {
    title: "The three structures of the business model around the Value Proposition",
    desc: "Around the Value Proposition, the business model divides into three structures — value delivery (Customer, Channel, Customer Relationships), value creation (Key Resources, Key Activities, Key Partnerships), and value capture (Cost Structure, Revenue Streams) — and these cannot be designed independently of one another. A choice in one box changes the others, and a broken connecting sentence signals a decision that is still unresolved.",
    d1: ["Value delivery"], d1s: ["Customer · Channel", "Customer Relationships"],
    d2: ["Value creation"], d2s: ["Key Resources,", "Key Activities,", "Key Partnerships"],
    d3: ["Value capture"], d3s: ["Cost Structure ·", "Revenue Streams"],
    c1: ["Value", "Proposition"], c1s: ["The axis joining", "the three"],
    note: ["A choice in one box changes the others.", "If the connecting sentence breaks,", "a decision is still unresolved"],
    lg1: "Line: connected around the Value",
    lg2: "Proposition (not designed independently)",
  },
};

// ---------------------------------------------------------------- CH06
function ch06(L) {
  const g = [];
  g.push(mk("cost", 40, 24, 192, 112, C.teal, L.i1, L.i1s));
  g.push(mk("customer-value", 248, 24, 192, 112, C.teal, L.i2, L.i2s));
  g.push(mk("competition", 40, 148, 192, 112, C.teal, L.i3, L.i3s));
  g.push(mk("channel-relationship", 248, 148, 192, 112, C.teal, L.i4, L.i4s));
  g.push(mk("price", 40, 298, 400, 100, C.gold, L.p, L.ps));
  g.push(mk("revenue-model", 40, 436, 400, 110, C.navy, L.r, L.rs));
  g.push(`  <g id="flow">`);
  g.push(down(240, 262, 295));
  g.push(down(240, 400, 433));
  g.push("  </g>");
  g.push(`  <g id="financial-lenses">`);
  g.push(heading(24, 590, L.lh));
  const cols = [24, 172, 320];
  L.lens.forEach((c, i) => g.push(mk(`lens${i}`, cols[i], 606, 136, 72, C.teal, [c.t], [c.s], "small")));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: 704, title: L.title, desc: L.desc, body: g.join("\n") });
}
const CH06 = {
  ko: {
    title: "가격에서 수익모델까지",
    desc: "원가는 가격의 현실적인 하한선이고, 고객이 받아들이는 지불범위는 가격의 다른 경계다. 경쟁은 누구와 비교할지 먼저 정해야 하며, 채널의 수수료와 고객관계 유지비용도 가격에 반영된다. 가격은 비즈니스모델의 요소들이 모순 없이 연결됐는지 확인하는 정합성의 기준이다. 수익모델은 가격보다 넓은 개념이며 손익·자산·현금흐름 세 재무 렌즈로 볼 수 있다.",
    i1: ["원가"], i1s: ["가격의 현실적인", "하한선"],
    i2: ["고객가치"], i2s: ["고객이 받아들이는", "지불범위"],
    i3: ["경쟁"], i3s: ["누구와 비교할지", "먼저 정한다"],
    i4: ["채널·고객관계"], i4s: ["수수료·관계유지", "비용이 반영됨"],
    p: ["가격"], ps: ["비즈니스모델 요소들이 모순 없이", "연결됐는지 확인하는 정합성의 기준"],
    r: ["수익모델"], rs: ["가격보다 넓은 개념", "누가·무엇에·얼마를·언제", "한 번인가 반복인가"],
    lh: "수익모델을 보는 세 개의 재무 렌즈",
    lens: [{ t: "손익", s: "마진" }, { t: "자산", s: "자산가치" }, { t: "현금흐름", s: "돈의 흐름" }],
  },
  en: {
    title: "From price to the revenue model",
    desc: "Cost is the realistic floor for price, and the range customers are willing to pay creates the other boundary. For competition you first decide who to compare against, and channel fees and the cost of maintaining customer relationships also enter the price. Price is a consistency check that the business model elements connect without contradiction. The revenue model is broader than price and can be viewed through three financial lenses: P&L, asset value, and cash flow.",
    i1: ["Cost"], i1s: ["The realistic floor", "for price"],
    i2: ["Customer value"], i2s: ["The range customers", "are willing to pay"],
    i3: ["Competition"], i3s: ["Decide who to", "compare against first"],
    i4: ["Channel and", "relationships"], i4s: ["Fees and relationship", "costs enter the price"],
    p: ["Price"], ps: ["A consistency check that the", "business model elements fit together"],
    r: ["Revenue model"], rs: ["Broader than price", "Who, what for, how much, when,", "one-time or repeating?"],
    lh: "Three financial lenses on a revenue model",
    lens: [{ t: "P&L", s: "Margin" }, { t: "Asset", s: "Asset value" }, { t: "Cash flow", s: "Flow of money" }],
  },
};

// ---------------------------------------------------------------- loop-style flows (CH07, CH08)
function loopFlow(L, spec) {
  const g = [];
  const X = 40, Wd = 380;
  let y = 24;
  const pos = [];
  spec.boxes.forEach((b, i) => {
    g.push(mk(b.id, X, y, Wd, b.h, b.fill, L.boxes[i].t, L.boxes[i].s));
    pos.push([y, b.h]);
    y += b.h + 32;
  });
  g.push(`  <g id="flow">`);
  for (let i = 0; i < pos.length - 1; i++) g.push(down(230, pos[i][0] + pos[i][1] + 2, pos[i + 1][0] - 3));
  g.push("  </g>");
  const first = pos[0], last = pos[pos.length - 1];
  const yLast = last[0] + Math.round(last[1] / 2), yFirst = first[0] + Math.round(first[1] / 2);
  g.push(`  <g id="return-loop">\n    <path d="M420 ${yLast} H452 V${yFirst} H422" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#arrow-gold)"/>\n  </g>`);
  const ly = y - 32 + 40;
  g.push(`  <g id="legend">\n${line(40, ly, 84, ly, { end: "navy" })}`);
  g.push(plainText(96, ly + 6, L.lg1));
  g.push(line(40, ly + 40, 84, ly + 40, { color: C.gold, sw: 3, dash: "7 5", end: "gold" }));
  g.push(plainText(96, ly + 46, L.lg2a));
  g.push(plainText(96, ly + 68, L.lg2b));
  g.push("  </g>");
  return wrapSvg({ W: 480, H: ly + 96, title: L.title, desc: L.desc, body: g.join("\n") });
}
const ch07 = (L) => loopFlow(L, { boxes: [
  { id: "hypothesis", h: 104, fill: C.teal }, { id: "qcd", h: 132, fill: C.gold },
  { id: "executable-model", h: 104, fill: C.teal }, { id: "effective-market", h: 112, fill: C.navy } ] });
const CH07 = {
  ko: {
    title: "유효시장 추정 9단계의 네 구간",
    desc: "유효시장 추정 9단계는 네 구간으로 묶인다. 1~3단계에서 가설을 세우고, 4~5단계에서 QCD로 현실을 확인하며, 6~8단계에서 실행 가능한 모델로 좁히고, 9단계에서 유효시장을 가격×판매수량으로 표현한다. QCD 중 하나라도 충족되지 않으면 가설로 되돌아가고, 결과가 목표나 자원과 맞지 않으면 앞 단계로 돌아가 가설과 모델을 재조정한다.",
    boxes: [
      { t: ["1~3단계 가설을 세운다"], s: ["세분시장·타겟팅 → 포지셔닝", "→ 유통·가격 가설"] },
      { t: ["4~5단계 QCD로 현실을 확인"], s: ["품질(Quality)·비용(Cost)·", "전달(Delivery)을 동시에 검토", "하나라도 맞지 않으면", "가설로 되돌아간다"] },
      { t: ["6~8단계 실행 가능한 모델로"], s: ["최종 타겟팅 → 최종 포지셔닝·4P", "→ 최종 비즈니스모델(BMC)"] },
      { t: ["9단계 유효시장을 숫자로 표현"], s: ["가격(P) × 판매수량(Qty)", "1~8단계에서 검증된", "조건이 반영된 결과"] },
    ],
    lg1: "실선 화살표: 단계의 진행",
    lg2a: "점선 화살표: 앞 단계로 돌아가", lg2b: "가설과 모델을 재조정",
  },
  en: {
    title: "The four segments of the 9-step Effective Market estimation",
    desc: "The 9 steps of Effective Market estimation fall into four segments. Steps 1–3 build the hypothesis, steps 4–5 confirm reality with QCD, steps 6–8 narrow to an executable model, and step 9 expresses the Effective Market as price times sales quantity. If even one QCD element is not satisfied, return to the hypotheses; if the result does not fit the goal or resources, go back to earlier steps and readjust the hypotheses and the model.",
    boxes: [
      { t: ["Steps 1–3: Build hypotheses"], s: ["Segment and target → positioning", "→ distribution and price hypotheses"] },
      { t: ["Steps 4–5: QCD reality check"], s: ["Review Quality, Cost, and Delivery", "together. If any one is not", "satisfied, return to the", "hypotheses"] },
      { t: ["Steps 6–8: Executable model"], s: ["Final targeting → final positioning", "and 4P → final business model (BMC)"] },
      { t: ["Step 9: Effective Market figure"], s: ["Price (P) × sales quantity (Qty)", "Reflects the conditions validated", "in steps 1–8"] },
    ],
    lg1: "Solid arrow: progression of the steps",
    lg2a: "Dashed arrow: go back to earlier steps", lg2b: "and readjust hypotheses and model",
  },
};
const ch08 = (L) => loopFlow(L, { boxes: [
  { id: "before-validation", h: 112, fill: C.teal }, { id: "design-execution", h: 112, fill: C.teal },
  { id: "after-validation", h: 112, fill: C.teal }, { id: "pivoting", h: 112, fill: C.gold },
  { id: "knowledge-accumulation", h: 112, fill: C.teal } ] });
const CH08 = {
  ko: {
    title: "실행의 다섯 가지 질문 순환",
    desc: "실행은 다섯 가지 질문을 반복하는 순환으로 운영한다. 검증 전에는 가장 위험하거나 불확실한 가설을 정하고, 실행 설계에서는 감당 가능한 가장 작은 실행을 조사검증대상·측정지표·방법 및 계획으로 구체화하며, 검증 후에는 데이터가 가설을 지지했는지 수정하게 했는지 폐기하게 했는지 판단한다. 피보팅은 데이터가 기존 가설을 흔들었는지를 기준으로 하고, 지식축적에서 백데이터와 실행결과를 쌓은 뒤 다시 실행하면 다음 사이클이 시작된다.",
    boxes: [
      { t: ["검증 전"], s: ["지금 가장 위험하거나 불확실한", "가설은 무엇인가?"] },
      { t: ["실행 설계"], s: ["감당 가능한 가장 작은 실행은?", "조사검증대상 · 측정지표 ·", "방법 및 계획"] },
      { t: ["검증 후"], s: ["데이터는 가설을 지지했는가,", "수정하게 했는가, 폐기하게 했는가?"] },
      { t: ["피보팅"], s: ["기준: 새 아이디어가 아니라", "데이터가 가설을 흔들었는가", "해당 가설을 다룬 앞 장을 다시 연다"] },
      { t: ["지식축적"], s: ["백데이터와 실행결과를", "어디에 축적해 다음에 쓸 것인가?"] },
    ],
    lg1: "실선 화살표: 질문의 순서",
    lg2a: "점선 화살표: 수정하고 다시 실행하면", lg2b: "다음 사이클이 시작된다",
  },
  en: {
    title: "The five-question execution cycle",
    desc: "Execution runs as a cycle of five repeated questions. Before validation, identify the riskiest or most uncertain hypothesis; in execution design, specify the smallest affordable action through what to investigate, the metrics, and the method and plan; after validation, judge whether the data supported, revised, or discarded the hypothesis. Pivoting is judged by whether the data shook the existing hypothesis, and after knowledge accumulation stores the back data and results, executing again starts the next cycle.",
    boxes: [
      { t: ["Before Validation"], s: ["What is the riskiest or most", "uncertain hypothesis right now?"] },
      { t: ["Design the Execution"], s: ["What is the smallest affordable action?", "What to investigate, metrics,", "method and plan"] },
      { t: ["After Validation"], s: ["Did the data support, revise,", "or discard the hypothesis?"] },
      { t: ["Pivoting"], s: ["Basis: did the data shake the", "existing hypothesis, not a new idea?", "Reopen the chapter on that hypothesis"] },
      { t: ["Knowledge Accumulation"], s: ["Where will you store back data and", "results for the next decision?"] },
    ],
    lg1: "Solid arrow: order of the questions",
    lg2a: "Dashed arrow: revise and execute again", lg2b: "to start the next cycle",
  },
};

const files = [
  ["CH01-business-criteria.svg", ch01, CH01],
  ["CH02-tpm-alignment.svg", ch02, CH02],
  ["CH03-user-buyer-payer.svg", ch03, CH03],
  ["CH04-value-proposition-positioning.svg", ch04, CH04],
  ["CH05-business-model-structure.svg", ch05, CH05],
  ["CH06-price-to-revenue-model.svg", ch06, CH06],
  ["CH07-effective-market-steps.svg", ch07, CH07],
  ["CH08-execution-cycle.svg", ch08, CH08],
];
for (const loc of ["ko", "en"]) {
  mkdirSync(join(ROOT, loc, "diagrams"), { recursive: true });
  for (const [name, fn, data] of files) writeFileSync(join(ROOT, loc, "diagrams", name), fn(data[loc]), "utf8");
}
console.log(warnings.length ? "WARNINGS:\n" + warnings.join("\n") : "no fit warnings");
