# tools/

핸드북 유지보수용 스크립트입니다. 교재 본문(ko/en 챕터·워크시트·사례)은 수정하지 않습니다. 모든 스크립트는 저장소 루트를 자동으로 찾으므로 어느 위치에서 실행해도 됩니다.

| 스크립트 | 용도 | 실행 |
|---|---|---|
| `gen.mjs` | CH01~CH08 다이어그램 SVG를 `ko/diagrams`, `en/diagrams`에 생성합니다. 현재 산출물과 동일하게 재현됩니다. | `node tools/gen.mjs` |
| `specs.py` | CH04~CH08 다이어그램 spec을 `site/diagrams/specs`에 생성합니다. | `python tools/specs.py` |
| `wstest.cjs` | 워크시트 작성기(`site/public/worksheet-writer.js`)의 파싱→직렬화 왕복 테스트입니다. 원본 워크시트 Markdown과 대조합니다. | `node tools/wstest.cjs` |
| `check-handbook-cta.mjs` | 메인 사이트(`magisglobal.co.kr`) 핸드북 페이지의 CTA 링크 응답, 카드 수치, 챕터 링크 수를 점검합니다. 읽기 전용입니다. | `node tools/check-handbook-cta.mjs` |

## 참고
- 기준은 CTA 링크 8개(BP 랜딩 ko/en, Pricing 랜딩 ko/en, GitHub 저장소 2개, 가격 진단 계산기 2개), 카드 수치 BP 8/8/9와 Pricing 15/15/13입니다.
- `check-handbook-cta.mjs`가 Pricing 챕터 링크를 "0"으로 세는 것은 경로(`part-1/`) 때문입니다. 이 값은 무시하고 `part-1` 경로를 포함한 정규식으로 따로 확인하세요.
- `wstest.cjs`는 표 빈 셀 공백 차이로 소수의 왕복 불일치를 보고합니다. 출력 내용에는 영향이 없는 기존 차이입니다.
