# business-planning-handbook v0.1 — Release Candidate (Private, Human Review 대기)

> **상태: Private Release Candidate.** 아직 Public Repository로 이동하지 않았고 GitHub Pages에 배포되지 않았다. CLAUDE.md §18 Private Export Staging 절차에 따라 Human Review와 사용자 승인을 거친 뒤에만 다음 단계(Public Repository / GitHub Pages)로 넘어간다.

## 이 교재의 목적

사업기획의 8개 핵심 영역 — 사업의 기준, 사업기회 탐색, 고객·문제 정의, 가치제안·경쟁우위·포지셔닝, 비즈니스모델, 원가·가격·수익모델, 사업타당성·유효시장, 실행·검증·피보팅 — 을 하나로 연결된 학습 흐름(Learning Path)으로 재구성한 공개교재 초안이다. 아이템을 먼저 정하는 방식이 아니라, 기준 → 기회 → 고객 → 가치제안 → 비즈니스모델 → 가격 → 타당성 → 실행·검증으로 이어지는 판단 순서를 따른다.

## 대상 독자

사업개발의 체계적 방법을 처음 배우는 예비창업자·초기창업자, 또는 초기 사업기획을 담당하는 비전문가. 특정 산업 경험이나 기술 전문성을 전제하지 않는다.

## 8 Chapter Learning Path

| Chapter | 제목 | 핵심 KM (public-eligible) |
|---|---|---|
| CH01 | 사업의 기준을 정한다 | KM001, KM002, KM003, KM004, KM005, KM006, KM008 |
| CH02 | 사업기회를 찾고 선택한다 | KM009–KM017 |
| CH03 | 고객·구매자·문제를 정의한다 | KM018–KM026 |
| CH04 | 가치제안·경쟁우위·포지셔닝을 만든다 | KM027–KM033 |
| CH05 | 비즈니스모델을 설계한다 | KM034–KM042 |
| CH06 | 원가·가격·수익모델을 설계한다 | KM043–KM054 |
| CH07 | 사업타당성과 유효시장을 검증한다 | KM055–KM063 |
| CH08 | 실행·검증·피보팅하며 수정한다 | KM064–KM071, KM073 |

각 Chapter는 동일한 문서 구조(이 장에서 답할 질문 / Learning Objectives / 핵심 개념 / 프레임워크 / 적용 과정 / 흔히 발생하는 판단 오류 / 실무 적용 질문 / 다음 Chapter와의 연결 / 핵심 정리 / Source Map)를 따르며, Chapter당 실습 워크시트 1개(`manual/`)와 KM 본문에 실제로 존재하는 대표 사례(`examples/`)를 포함한다.

## Source of Truth

- 원본 지식 Backbone: Master Note MN01~MN08 (Google Drive `01_Current`, 이 저장소의 원본이 아님)
- 재사용 레이어: Knowledge Module 중 public-eligible로 분류된 71개
- 이 교재는 위 두 자료 **외에 어떤 외부 리서치·웹검색·일반지식도 사용하지 않았다.**
- Chapter-KM 대응관계: [`../source-map.md`](../source-map.md)
- Public Export Coverage: public-eligible Knowledge Module 71/71 covered (`../source-map.md` 참조)

## 이 교재와 Master Note / Knowledge Module의 관계

이 교재는 새로운 Source of Truth가 아니다(CLAUDE.md §19). Knowledge Module의 내용을 학습자용 교재 형식으로 재구성·재서술한 파생 산출물이며, Master Note와 Knowledge Module 원본을 대체하지 않는다. 이 교재 제작 과정에서 새로운 지식이나 해석이 발견되더라도, Master Note나 Knowledge Module에 임의로 역반영하지 않는다.

## v0.1의 성격

이번 버전은 **외부 리서치 없이 현재 Knowledge Base(public-eligible KM 71개)만을 재구성한 v0.1**이다. 완성된 공개 상품이 아니라 Human Review를 위한 Release Candidate이며, 아래 사항이 검토 전 상태로 남아 있다.

- 비공개로 분류된 일부 내부 Knowledge Module은 이 Release Candidate에 포함하지 않았다. 해당 판단기준·개념은 공개 가능한 다른 Knowledge Module의 표현 범위 안에서만 서술했다.
- 현재 Knowledge Module에는 CLAUDE.md §12 기준의 공식 Metadata(`id/title/primary_note/...`)가 아직 부여되지 않은 상태이며, 이 교재 제작이 그 Metadata를 대신 확정하는 근거로 쓰이지 않는다.
- Domain Lens는 아직 적용하지 않았다 (Primary Lens 없이 범용 기준으로 작성).

## Publication Gate

이 Release Candidate는 Human Review 및 사용자 승인 전까지 다음을 수행하지 않는다: Public GitHub Repository 생성, Public Repository로의 push, GitHub Pages 설정/배포. (CLAUDE.md §18)
