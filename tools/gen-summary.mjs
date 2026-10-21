// 챕터별 한 장 요약 SVG(ko)와 spec을 생성한다.
// 내용은 각 챕터 「핵심 정리」를 압축한 것이며 새 개념·숫자·사례를 더하지 않는다.
// 실행: node tools/gen-summary.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const C = { navy: "#14253D", teal: "#315B62", gold: "#C49A5A", ivory: "#F6F2EA", white: "#FFFFFF", ink: "#252A30" };
const FONT = "system-ui, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
const W = 480;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function width(t, fs, bold) {
  let w = 0;
  for (const ch of t) w += /[ᄀ-ᇿ㄰-㆏가-힯··—×→]/.test(ch) ? fs : fs * (bold ? 0.6 : 0.54);
  return w;
}
// 공백 단위로 줄바꿈하고, 한 단어가 너무 길면 글자 단위로 자른다.
function wrap(t, fs, maxW, bold = false) {
  const lines = [];
  let cur = "";
  for (const word of t.split(" ")) {
    const tryLine = cur ? cur + " " + word : word;
    if (width(tryLine, fs, bold) <= maxW) { cur = tryLine; continue; }
    if (cur) lines.push(cur);
    cur = "";
    let piece = "";
    for (const ch of word) {
      if (width(piece + ch, fs, bold) > maxW) { lines.push(piece); piece = ch; } else piece += ch;
    }
    cur = piece;
  }
  if (cur) lines.push(cur);
  return lines;
}

const CH = [
  { id: "CH01", title: "사업의 기준을 정한다", short: "사업의 기준", items: [
    ["출발점", "아이템이나 시장이 아니라 사업가 자신의 판단기준에서 시작한다"],
    ["성공의 정의", "라이프스타일과 연결되며 자율성·조직규모·가족·사회적 목적 사이의 우선순위가 필요하다"],
    ["목표수익", "시장규모보다 먼저 정하는 제약조건. 매출과 영업이익을 구분한다"],
    ["성장규모", "자동 목표가 아니라 감수할 대가를 보고 선택하는 전략조건이다"],
    ["Not-to-do", "To-do보다 먼저 정해 제한된 자원을 핵심사업에 모은다"],
    ["다시 검토", "기준은 하나의 우선순위 체계로 묶고, 상황이 달라지면 다시 검토한다"],
  ] },
  { id: "CH02", title: "사업기회를 찾고 선택한다", short: "사업기회", items: [
    ["사업기회", "내부역량과 외부기회의 교집합에서 만들어진다"],
    ["TPM", "무엇을 할 수 있는가·무엇을 팔 것인가·어디에서 기회를 찾을 것인가의 반복적 판단 구조"],
    ["산업과 시장", "산업(넓은 환경)과 시장(실제 거래집단)은 다르다. 산업의 성장이 곧 내 시장의 성장은 아니다"],
    ["Top-down 도구", "표 완성이 아니라 아이템 우선순위 조정을 위해 쓴다"],
    ["세 위험 필터", "시장위험·제품위험·경로위험으로 깊게 투자할 아이템을 거른다"],
    ["정합성", "T→P→M, M→P→T 어느 경로든 T·P·M이 하나의 논리로 맞물려야 한다"],
  ] },
  { id: "CH03", title: "고객·구매자·문제를 정의한다", short: "고객·구매자·문제", items: [
    ["고객 정의", "명사가 아니라 시장의 이름·크기·경쟁구조·채널을 정하는 의사결정이다"],
    ["세 역할", "사용자·구매자·지불자는 같을 수도 다를 수도 있어 구분해야 한다"],
    ["구매논리", "B2C는 개인의 불편·욕구, B2B는 조직성과, B2G는 예산·법령·조달방식"],
    ["세그먼트", "측정·접근·규모·역량 기준으로 반복해 좁히고, 공유된 문제로 다시 정의한다"],
    ["문제의 심각성", "존재만으로는 부족하다. 이상과 현실의 간극과 손실이 클수록 심각하다"],
    ["속성·KBF·접점", "현장의 말은 속성으로 번역하고, 구매요인과 접점으로 타깃을 구체화한다"],
    ["직접 확인", "바꿀 결정에서 거꾸로 질문을 만들어 사용자·구매자·영향자를 섞어 만난다"],
  ] },
  { id: "CH04", title: "가치제안·경쟁우위·포지셔닝을 만든다", short: "가치제안·포지셔닝", items: [
    ["고객이 사는 것", "기술이 아니라 해결 결과다"],
    ["경쟁범위", "제품 카테고리가 아니라 고객문제로 정하고 경쟁재와 대체재를 함께 본다"],
    ["비교지표", "경쟁력 주장은 고객의 구매결정 기준으로 검증 가능해야 한다"],
    ["선언 대신 증거", "우수하다·경쟁사 없음·시장성이 높다는 선언은 수치와 직접 확인한 증거로 바꾼다"],
    ["경쟁우위", "고객의 선택을 움직이고 기업이 반복 제공할 수 있는 차이다"],
    ["가치제안", "고객문제·해법·선택이유가 하나로 연결된 논리다"],
    ["포지셔닝", "상품·가격·채널·커뮤니케이션이 같은 방향을 가리키는지 점검한다"],
  ] },
  { id: "CH05", title: "비즈니스모델을 설계한다", short: "비즈니스모델", items: [
    ["작동논리", "고객가치 창출·전달·돈 버는 구조 세 축이 연결된 사업의 작동논리다"],
    ["정합성", "개별 칸의 완성도보다 한 결정이 다른 요소를 어떻게 바꾸는지 설명할 수 있어야 한다"],
    ["BMC 구조", "가치제안 중심에 전달(고객·채널·관계), 창출(자원·활동·파트너), 회수(비용·수익원)"],
    ["연결문장", "BMC는 인과관계를 보여주는 관계도. 연결문장으로 논리적 충돌을 찾는다"],
    ["T-캔버스·Story", "T-캔버스는 시장·제품 위험을 잇고, Business Model Story는 구매논리로 다시 확인한다"],
    ["사례·벤치마킹", "남의 모델도 같은 칸과 연결문장으로 읽는다. 한 칸만 따라 하면 다른 칸과 충돌한다"],
    ["완성의 뜻", "성공이 아니라 원가·가격·타당성 검증으로 넘어갈 수 있는 상태다"],
  ] },
  { id: "CH06", title: "원가·가격·수익모델을 설계한다", short: "원가·가격·수익모델", items: [
    ["가격", "마지막에 붙이는 숫자가 아니라 비즈니스모델 정합성의 기준이다"],
    ["원가", "활동을 나열해 추정하며 가격의 현실적 하한선이다"],
    ["가치와 경쟁", "고객은 가치를 지불한다. 지불의사에서 원가를 역으로 검토하고, 경쟁가격은 같은 세그먼트 기준으로 본다"],
    ["채널·관계 비용", "수수료·유통마진과 고객관계 비용을 가격구조 안에서 함께 본다"],
    ["가격구조 점검", "소비자가 = 실판매가 + 가격구간, 실판매가 = 총원가 + 이익. 비용률 합이 100%를 넘는지 보고 채널은 공헌이익으로 비교한다"],
    ["수익모델", "누가·무엇에·얼마를·언제·반복적으로 지불하는가, 그리고 가격 메커니즘"],
    ["세 재무 렌즈", "손익·자산·현금흐름으로 같은 사업의 다른 구조를 본다"],
    ["넘기기", "가격(P), 비용·마진 구조, 수익모델이 정리돼야 타당성 검증으로 간다"],
  ] },
  { id: "CH07", title: "사업타당성과 유효시장을 검증한다", short: "사업타당성·유효시장", items: [
    ["사업타당성", "시장의 몇 %가 아니라 사업논리를 자원·비용의 제약에 대입해 보는 과정이다"],
    ["두 시장", "전체 시장과 유효시장은 다르다. Top-down과 Bottom-up을 함께 쓴다"],
    ["구매자 기준", "사용자가 아니라 구매자에 주목한다. B2C·B2B·B2G마다 Qty의 근거가 다르다"],
    ["9단계", "가설(1~3) → QCD(4~5) → 모델 확정(6~8) → 유효시장(9), 앞 단계로 되돌아가는 반복"],
    ["QCD", "순서대로 통과하는 체크리스트가 아니라 동시에 충족해야 하는 조건이다"],
    ["SOM과 SAM", "추정손익(SOM에 가까움)과 유효시장(SAM에 가까움)은 다른 질문이다"],
    ["P의 기준", "구매자 지출 기준인지 우리 매출 기준인지 밝히고 한 문서 안에서 통일한다"],
    ["반복 검증", "예언이 아니라 논리적 증명. 가정이 바뀌면 다시 계산한다"],
  ] },
  { id: "CH08", title: "실행·검증·피보팅하며 수정한다", short: "실행·검증·피보팅", items: [
    ["실행", "계획을 지키는 일이 아니라 계획이 현실과 어긋나는 곳을 찾는 가설검증이다"],
    ["계획과 계획서", "계획은 연결된 가설의 구조, 계획서는 검증 중 쌓인 백데이터의 부산물이다"],
    ["검증설계 4요소", "조사검증대상·측정지표·방법 및 계획·피드백데이터를 연결한다"],
    ["좋은 실험", "작고 반복 가능하며 감당 가능한 위험 안에서 다음 결정을 더 정확하게 만든다"],
    ["피보팅", "새 아이디어가 아니라 데이터가 기존 가설을 흔들었는가로 판단한다"],
    ["전략과 숫자", "비즈니스전략은 모델을 시간·활동·자원·비용으로 번역한 실행계획이다"],
    ["확인 지표·근거 상태", "로드맵에는 기간마다 확인 지표를, 위험에는 발동 조건과 대응을 붙인다. 오픈은 검증이 아니며 숫자에는 사실·가정·확인 필요를 표시한다"],
    ["AI와 사람", "AI는 보조 레이어이고 위험 감수와 최종 결정은 사람의 몫이다"],
    ["학습 사이클", "실행데이터가 앞 장 중 무엇을 다시 열지 알려주는 지속적 학습 사이클이다"],
  ] },
];

// 영문판 데이터: ko와 같은 순서·개수. 각 장 영문 Key Takeaways를 압축한 것이다.
const EN = {
  CH01: { title: "Setting the Criteria for Your Business", short: "Setting the Criteria", items: [
    ["Starting point", "Starts not from an item or a market, but from the entrepreneur's own judgment criteria"],
    ["Success defined", "Tied to lifestyle; needs priorities among autonomy, organization size, family, and social purpose"],
    ["Target revenue", "A constraint set before market size. Distinguish revenue from operating profit"],
    ["Growth scale", "Not an automatic goal but a strategic condition chosen by weighing the costs you accept"],
    ["Not-to-do", "Set before to-do, to focus limited resources on the core business"],
    ["Review again", "Bring the criteria into one priority system, and review it when circumstances change"],
  ] },
  CH02: { title: "Finding and Selecting a Business Opportunity", short: "Business Opportunity", items: [
    ["Opportunity", "Created at the intersection of internal capability and external opportunity"],
    ["TPM", "A repeated judgment: what can you do, what will you sell, where will you look for the opportunity"],
    ["Industry vs. market", "Industry (broad environment) and market (actual transacting group) differ; industry growth is not growth in my market"],
    ["Top-down tools", "Used to adjust item priority, not to complete a table"],
    ["Three risk filters", "Market, product, and channel risk filter which items deserve deeper investment"],
    ["Alignment", "Whether T→P→M or M→P→T, T, P, and M must lock into a single logic"],
  ] },
  CH03: { title: "Defining the Customer, the Buyer, and the Problem", short: "Customer, Buyer, and Problem", items: [
    ["Defining customers", "Not a noun but a decision on the market's name, size, competitive structure, and channels"],
    ["Three roles", "User, Buyer, and Payer may be the same or different, so distinguish them"],
    ["Buying logic", "B2C: individual inconvenience or desire; B2B: organizational performance; B2G: budget, statutes, procurement"],
    ["Segments", "Narrow repeatedly by measurability, accessibility, scale, and capability; redefine by shared problem"],
    ["Problem severity", "Existence is not enough; the larger the gap and the resulting loss, the more severe"],
    ["Attributes, KBF, touchpoints", "Translate field language into attributes; sharpen the target with buying factors and touchpoints"],
    ["Confirm firsthand", "Work backward from the decision to change; meet users, buyers, and influencers"],
  ] },
  CH04: { title: "Building Value Proposition, Advantage, and Positioning", short: "Value Proposition and Positioning", items: [
    ["What customers buy", "Not the technology but the outcome it solves"],
    ["Competitive scope", "Set by the customer problem, not product category; consider competitors and substitutes together"],
    ["Comparison metrics", "A competitiveness claim must be verifiable against the customer's purchase-decision criteria"],
    ["Evidence over claims", "Replace claims of superiority or no competitors with figures and firsthand evidence"],
    ["Competitive advantage", "A difference that moves the customer's choice and that the company can deliver repeatedly"],
    ["Value proposition", "Customer problem, solution, and reason for choice in one connected logic"],
    ["Positioning", "Check that product, price, channel, and communication point the same way"],
  ] },
  CH05: { title: "Designing the Business Model", short: "Business Model", items: [
    ["Operating logic", "Creating, delivering, and making money from customer value, connected on three axes"],
    ["Coherence", "Over the completeness of each box, explain how one decision changes the other components"],
    ["BMC structure", "Value Proposition at center; delivery, creation, and capture connect around it"],
    ["Connecting sentences", "The BMC maps causal relationships; connecting sentences expose logical conflicts"],
    ["T-Canvas and Story", "The T-Canvas links market and product risk; the Story re-checks through buying logic"],
    ["Cases and benchmarking", "Read others' models with the same boxes; copying one box conflicts with the rest"],
    ["Meaning of complete", "Not success, but ready to move on to cost, price, and feasibility validation"],
  ] },
  CH06: { title: "Designing Cost, Price, and Revenue Model", short: "Cost, Price, and Revenue Model", items: [
    ["Price", "Not a number attached last but the standard of business model coherence"],
    ["Cost", "Estimated by listing activities; the realistic floor for price"],
    ["Value and competition", "Customers pay for value; work back from willingness to pay; compare prices within the same segment"],
    ["Channel and relationship costs", "Consider channel fees, distribution margin, and customer relationship costs in the price structure"],
    ["Price structure check", "Check whether cost ratios exceed 100%; compare channels by contribution margin"],
    ["Revenue model", "Who pays, for what, how much, when, and whether repeatedly; plus the pricing mechanism"],
    ["Three financial lenses", "P&L, asset value, and cash flow show different structures of the same business"],
    ["Handing over", "Organize price (P), cost and margin structure, and revenue model before feasibility validation"],
  ] },
  CH07: { title: "Validating Feasibility and the Effective Market", short: "Feasibility and Effective Market", items: [
    ["Business feasibility", "Not a percentage of the total market but testing business logic against resource and cost constraints"],
    ["Two markets", "Total market and Effective Market differ; use Top-down and Bottom-up together"],
    ["Buyer focus", "Focus on the Buyer, not the User; the basis for Qty differs across B2C, B2B, and B2G"],
    ["Nine steps", "Hypothesis (1-3), QCD (4-5), model confirmation (6-8), Effective Market (9); loop back to earlier steps"],
    ["QCD", "Not a sequential checklist but conditions that must be satisfied simultaneously"],
    ["SOM and SAM", "Projected P&L (close to SOM) and Effective Market (close to SAM) answer different questions"],
    ["Basis of P", "State whether P is buyer spending or our revenue, and keep it consistent within a document"],
    ["Iterative validation", "A logical proof, not a prophecy; recalculate whenever assumptions change"],
  ] },
  CH08: { title: "Execute, Validate, and Revise Through Pivoting", short: "Execute, Validate, Pivot", items: [
    ["Execution", "Not sticking to the plan but hypothesis testing that finds where the plan diverges from reality"],
    ["Plan vs. document", "The plan is a structure of connected hypotheses; the document is a byproduct of back data"],
    ["Four validation elements", "Connect what to investigate, metrics, method and plan, and feedback data"],
    ["Good experiment", "Small, repeatable, within affordable risk, and makes the next decision more accurate"],
    ["Pivoting", "Judged not by a new idea but by whether the data shook the existing hypothesis"],
    ["Strategy and numbers", "Strategy translates the model into time, activities, resources, and cost; revise if numbers conflict"],
    ["Back data and Master Plan", "Accumulate the evidence for your judgments as you go"],
    ["AI and people", "AI is a supporting layer; taking on risk and final decisions remain human"],
    ["Learning cycle", "Execution data shows which earlier chapter to reopen, making this an ongoing learning cycle"],
  ] },
};

const warnings = [];
function build(ch0, lang = "ko") {
  const isEn = lang === "en";
  const ch = isEn ? { id: ch0.id, ...EN[ch0.id] } : ch0;
  const PAD = 12, TX = 60, TR = W - PAD - 14;
  const maxW = TR - TX;
  const titleLines = wrap(ch.title, 21, W - 2 * PAD - 16, true);
  const headH = 44 + titleLines.length * 28 + 12;
  let y = headH + 12;
  const rows = [];
  ch.items.forEach(([head, body], i) => {
    const lines = wrap(body, 16, maxW);
    const h = 10 + 23 + lines.length * 21 + 10;
    const cy = y + h / 2;
    let t = `    <rect x="${PAD}" y="${y}" width="${W - 2 * PAD}" height="${h}" rx="10" fill="${C.white}"/>\n`;
    t += `    <circle cx="${PAD + 24}" cy="${y + 10 + 11.5}" r="13" fill="${C.gold}"/>\n`;
    t += `    <text x="${PAD + 24}" y="${y + 10 + 11.5 + 5.5}" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">${i + 1}</text>\n`;
    t += `    <text x="${TX}" y="${y + 10 + 17}" font-size="17" font-weight="700" fill="${C.navy}">${esc(head)}</text>\n`;
    lines.forEach((l, k) => {
      t += `    <text x="${TX}" y="${y + 10 + 23 + k * 21 + 15}" font-size="16" fill="${C.ink}">${esc(l)}</text>\n`;
    });
    rows.push(`  <g id="point-${i + 1}">\n${t.replace(/\n$/, "")}\n  </g>`);
    if (lines.some((l) => width(l, 16, false) > maxW + 1)) warnings.push(`${lang} ${ch.id} row ${i + 1} overflow`);
    y += h + 8;
  });
  const H = y + 4;
  const desc = (isEn ? `${ch.id} ${ch.title}: a one-page summary condensing the chapter's Key Takeaways into ${ch.items.length} points. ` : `${ch.id} ${ch.title}의 핵심 정리를 ${ch.items.length}개 항목으로 압축한 한 장 요약. `) + ch.items.map(([h, b], i) => `${i + 1}. ${h}: ${b}`).join(" ");
  const head =
    `  <g id="header">\n    <rect x="${PAD}" y="${PAD}" width="${W - 2 * PAD}" height="${headH - PAD}" rx="12" fill="${C.navy}"/>\n` +
    `    <text x="${PAD + 16}" y="${PAD + 30}" font-size="16" font-weight="700" fill="${C.gold}">${ch.id} · ${isEn ? "One-Page Summary" : "한 장 요약"}</text>\n` +
    titleLines.map((l, k) => `    <text x="${PAD + 16}" y="${PAD + 30 + 8 + (k + 1) * 28 - 6}" font-size="21" font-weight="700" fill="${C.white}">${esc(l)}</text>`).join("\n") +
    `\n  </g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${esc(isEn ? `${ch.id} One-Page Summary: ${ch.short}` : ch.id + " 한 장 요약: " + ch.short)}</title>
  <desc id="d">${esc(desc)}</desc>
  <g id="background">
    <rect width="${W}" height="${H}" rx="14" fill="${C.ivory}"/>
  </g>
${head}
${rows.join("\n")}
</svg>
`;
  const spec = `# ${ch.id}-summary

- diagram_id: \`summary\`
- chapter: ${ch.id}. ${ch.title}
- files: \`ko/diagrams/${ch.id}-summary.svg\` (en은 후속)
- layout type: header band + ${ch.items.length} numbered point cards, ${W} x ${H} units

## Learning purpose

장을 읽기 전 훑어보기, 읽은 뒤 복습용으로 장 전체의 핵심 정리를 한 장에 압축해 보여 준다.

## Source sections (${ch.id})

- 핵심 정리 (모든 항목은 이 절의 문장을 줄인 것이다)

## Concepts included

${ch.items.map(([h, b], i) => `${i + 1}. ${h} — ${b}`).join("\n")}

## Concepts intentionally excluded

- 핵심 정리에 없는 개념, 단계, 숫자, 사례. 프레임워크 세부, 흔한 오류, 적용 과정은 본문과 다른 다이어그램에 맡긴다.

## Relationship semantics

- 화살표나 연결선이 없다. 번호는 읽는 순서일 뿐 단계의 선후관계를 주장하지 않는다.

## Color meaning

Navy = 제목 띠와 항목 이름. Gold = 번호. White = 항목 카드.
`;
  return { svg, spec };
}

mkdirSync(join(ROOT, "ko", "diagrams"), { recursive: true });
mkdirSync(join(ROOT, "en", "diagrams"), { recursive: true });
mkdirSync(join(ROOT, "site", "diagrams", "specs"), { recursive: true });
for (const ch of CH) {
  const { svg, spec } = build(ch);
  writeFileSync(join(ROOT, "en", "diagrams", `${ch.id}-summary.svg`), build(ch, "en").svg, "utf8");
  writeFileSync(join(ROOT, "ko", "diagrams", `${ch.id}-summary.svg`), svg, "utf8");
  writeFileSync(join(ROOT, "site", "diagrams", "specs", `${ch.id}-summary.md`), spec, "utf8");
}
console.log(warnings.length ? warnings.join("\n") : "ok");
