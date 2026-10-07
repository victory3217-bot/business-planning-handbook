import os
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, "site", "diagrams", "specs")
specs = {
"CH04-value-proposition-positioning": dict(
 chapter="CH04. 가치제안·경쟁우위·포지셔닝을 만든다 / Building the Value Proposition, Competitive Advantage, and Positioning",
 layout="vertical flow of five boxes, 480 x 748 units",
 purpose="Show the single flow the chapter describes: customer problem to product, comparison with competing alternatives, Value Proposition, then positioning checked against the 4P.",
 sources=["1. 핵심 개념: 고객의 문제를 해결하는 상품을 만드는 데서 시작해, 그 상품을 경쟁대안과 비교하고, 그 비교에서 나온 우위를 고객의 인식 속에 자리 잡게 하는 순서.",
  "2. 주요 프레임워크: 문제 → 속성 → 해법 → 제품·서비스 흐름; 경쟁재·대체재 구분; 경쟁우위 7가지 점검 기준; 포지셔닝-4P 정합성 점검.",
  "1. 핵심 개념: 고객문제, 해법·제품, 경쟁대안 대비 선택이유가 하나의 논리로 연결된 상태가 가치제안이다."],
 included="문제 → 속성 → 해법 → 제품·서비스; 경쟁재와 대체재; 비교지표; 경쟁우위 7가지 기준 (중요성·효율성·우월성·가시성·선점성·결정력·수익성); 가치제안; 포지셔닝; 4P 정합성.",
 excluded="Business Model Story; B2C/B2B/B2G emphasis; the ocean radar and digestive medicine cases; example metrics; expanding the 4P into an operating plan (the chapter excludes it as well).",
 rel="Arrows follow the order stated in 1. 핵심 개념; each box is the input of the next. No feedback loop is drawn because the chapter states none for this flow. Gold box: the Value Proposition is a state of logical connection, not a sentence summarizing product merits.",
 ko="문제 → 속성 → 해법 → 제품·서비스; 경쟁대안: 경쟁재 · 대체재; 비교지표 → 경쟁우위 (7가지 점검 기준); 가치제안; 포지셔닝 (4P가 같은 방향을 지원하는지 점검).",
 en="Problem → Attribute → Solution → Product/Service; Competing products and substitutes; Comparison metrics → competitive advantage (seven criteria); Value Proposition; Positioning (check the 4P point the same way).",
 color="Teal = supporting steps. Gold = Value Proposition. Navy = Positioning."),
"CH05-business-model-structure": dict(
 chapter="CH05. 비즈니스모델을 설계한다 / Designing the Business Model",
 layout="three nodes around a central axis node, 480 x 740 units",
 purpose="Show that the Value Proposition is the axis of the business model and that value delivery, value creation, and value capture cannot be designed independently.",
 sources=["2.1: 가치제안을 축으로 비즈니스모델은 가치전달, 가치창출, 가치회수라는 세 구조로 나뉘며, 이 셋은 서로 분리된 채 독립적으로 설계될 수 없다.",
  "2.1 members: 가치전달 (고객·채널·고객관계), 가치창출 (핵심자원·핵심활동·핵심파트너십), 가치회수 (비용구조와 수익원).",
  "2.2: 연결문장이 자연스럽게 이어지지 않으면 캔버스 어딘가의 의사결정이 아직 정리되지 않았다는 뜻이다."],
 included="가치제안 (axis); 가치전달; 가치창출; 가치회수 and their listed members; the interaction note.",
 excluded="The nine-box BMC grid; T-canvas; Business Model Story; cost calculation and pricing (deferred to CH06); How to Sell / How to Make; pairwise arrows between the three structures (the chapter states interaction only in general terms).",
 rel="Plain lines from the Value Proposition to each structure: connected around the axis, no direction implied. Teal note: a choice in one box changes the others; a broken connecting sentence signals an unresolved decision.",
 ko="가치전달; 가치창출; 가치회수; 가치제안 (세 구조를 잇는 축); 한 칸의 선택은 다른 칸을 바꾼다.",
 en="Value delivery; Value creation; Value capture; Value Proposition (the axis joining the three); A choice in one box changes the others.",
 color="Navy = the three structures. Gold = the Value Proposition axis. Teal = supporting note."),
"CH06-price-to-revenue-model": dict(
 chapter="CH06. 원가·가격·수익모델을 설계한다 / Designing Cost, Price, and Revenue Model",
 layout="2x2 inputs, then price, then revenue model, then three lens chips, 480 x 704 units",
 purpose="Show that price results from several inputs, is a consistency check on the business model, and that the revenue model is broader than price.",
 sources=["2. 원가: 가격의 현실적인 하한선.",
  "2. 가격결정의 세 가지 논리: 고객이 받아들일 수 있는 지불범위는 가격의 다른 경계; 경쟁 기반은 누구와 비교할지 먼저 정해야 한다.",
  "2. 채널과 고객관계: 채널의 수수료와 운영비, 고객관계를 유지하는 재원이 가격구조에 반영된다.",
  "1. 핵심 개념: 가격은 비즈니스모델의 여러 요소가 모순 없이 연결되어 있는지를 확인하는 정합성의 기준.",
  "2. 가격에서 수익모델로: 누가·무엇에·얼마를·언제·한 번인가 반복인가; 세 개의 재무 렌즈 (손익의 마진, 자산가치, 현금흐름의 돈의 흐름)."],
 included="원가; 고객가치; 경쟁; 채널·고객관계; 가격; 수익모델; 손익·자산·현금흐름 렌즈.",
 excluded="Cost classifications (fixed/variable, direct/indirect); the three pricing methods as separate branches; value-added pricing; low-price and premium strategy; revenue-stream type lists; fixed vs variable pricing mechanisms.",
 rel="The four teal inputs feed the gold Price box (arrow). Price leads to the navy Revenue model, which is broader than price (arrow). The three lenses are a separate labeled row; the chapter presents them as ways to view the revenue model, so no arrow is drawn.",
 ko="원가 (하한선); 고객가치 (지불범위); 경쟁 (비교대상); 채널·고객관계; 가격; 수익모델; 손익·자산·현금흐름.",
 en="Cost (floor); Customer value (payment range); Competition (who to compare); Channel and relationships; Price; Revenue model; P&L, Asset, Cash flow.",
 color="Teal = inputs and lenses. Gold = Price (consistency check). Navy = Revenue model."),
"CH07-effective-market-steps": dict(
 chapter="CH07. 사업타당성과 유효시장을 검증한다 / Validating Business Feasibility and the Effective Market",
 layout="vertical flow of four segments with a dashed return loop, 480 x 700 units",
 purpose="Show the four segments of the 9-step Effective Market estimation and that the process returns to earlier steps when QCD or the result does not fit.",
 sources=["2. 주요 프레임워크: 9단계는 크게 네 구간으로 묶인다. 1~3단계 가설, 4~5단계 QCD, 6~8단계 실행 가능한 모델, 9단계 유효시장.",
  "2: QCD 중 하나라도 충족되지 않으면 전체 가설을 다시 검토하고, 타겟팅·포지셔닝·유통·가격 가설로 되돌아가 조정한다.",
  "2, 9단계: 규모가 사업목표나 자원조건과 맞지 않으면 앞 단계로 돌아가 가설과 모델을 재조정한다. 3. 적용 과정: 가격(P)×판매수량(Qty)."],
 included="Four segments; Quality/Cost/Delivery; hypothesis to final model to Effective Market; P x Qty; the return loop.",
 excluded="The nine steps individually; total market vs Effective Market; Projected P&L vs Effective Market (SOM/SAM); B2C/B2B/B2G Qty logic; the target of the return loop beyond earlier steps.",
 rel="Solid arrows: progression of the four segments. Dashed gold arrow from the last box back to the first: go back to earlier steps and readjust hypotheses and model. The QCD box states in text that any unmet element returns to the hypotheses.",
 ko="1~3단계 가설; 4~5단계 QCD; 6~8단계 실행 가능한 모델; 9단계 유효시장 (가격 × 판매수량).",
 en="Steps 1-3 hypotheses; Steps 4-5 QCD; Steps 6-8 executable model; Step 9 Effective Market (price x quantity).",
 color="Teal = hypothesis and model segments. Gold = QCD (decision gate). Navy = Effective Market figure."),
"CH08-execution-cycle": dict(
 chapter="CH08. 실행·검증·피보팅하며 수정한다 / Execute, Validate, and Revise Through Pivoting",
 layout="vertical flow of five boxes with a dashed return loop, 480 x 800 units",
 purpose="Show the five questions that execution repeats as a cycle.",
 sources=["3. 적용 과정: 실행은 다섯 가지 질문을 반복하는 순환으로 운영할 수 있다. 검증 전, 실행 설계, 검증 후, 피보팅, 지식축적.",
  "3: 이 질문에 답하고 관련 내용을 수정한 뒤 다시 실행하면 다음 사이클이 시작된다.",
  "2. 검증설계의 4요소와 3. 피보팅 기준: 새로운 아이디어가 아니라 데이터가 기존 가설을 흔들었는가."],
 included="The five questions; the three items of validation design named in step 2 (조사검증대상·측정지표·방법 및 계획); pivot basis; the next-cycle loop.",
 excluded="AI as a supporting layer; Master Plan and back data details; business strategy to execution plan; numeric thresholds (the chapter gives none).",
 rel="Solid arrows: order of the five questions. Dashed gold arrow from the last to the first: after revising and executing again, the next cycle starts.",
 ko="검증 전; 실행 설계; 검증 후; 피보팅; 지식축적.",
 en="Before Validation; Design the Execution; After Validation; Pivoting; Knowledge Accumulation.",
 color="Teal = questions. Gold = Pivoting (decision). The dashed gold loop is the cycle restart."),
}
for name, d in specs.items():
    did = name.split("-", 1)[1]
    t = "# " + name + "\n\n"
    t += "- diagram_id: `" + did + "`\n- chapter: " + d["chapter"] + "\n"
    t += "- files: `ko/diagrams/" + name + ".svg`, `en/diagrams/" + name + ".svg`\n- layout type: " + d["layout"] + "\n\n"
    t += "## Learning purpose\n\n" + d["purpose"] + "\n\n## Source sections\n\n"
    t += "\n".join("- " + x for x in d["sources"]) + "\n\n"
    t += "## Concepts included\n\n" + d["included"] + "\n\n## Concepts intentionally excluded\n\n" + d["excluded"] + "\n\n"
    t += "## Relationship semantics\n\n" + d["rel"] + "\n\n## KO labels\n\n" + d["ko"] + "\n\n## EN labels\n\n" + d["en"] + "\n\n"
    t += "## Color meaning\n\n" + d["color"] + "\n\n## Accessibility description\n\nThe `<desc>` element of each SVG restates the diagram in one paragraph in the matching language.\n"
    open(os.path.join(OUT, name + ".md"), "w", encoding="utf8").write(t)
print("specs written:", len(specs))
