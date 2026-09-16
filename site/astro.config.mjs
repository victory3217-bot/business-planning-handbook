import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const CHAPTER_TITLES = {
  ko: [
    "CH01. 사업의 기준을 정한다",
    "CH02. 사업기회를 찾고 선택한다",
    "CH03. 고객·구매자·문제를 정의한다",
    "CH04. 가치제안·경쟁우위·포지셔닝을 만든다",
    "CH05. 비즈니스모델을 설계한다",
    "CH06. 원가·가격·수익모델을 설계한다",
    "CH07. 사업타당성과 유효시장을 검증한다",
    "CH08. 실행·검증·피보팅하며 수정한다",
  ],
  en: [
    "CH01. Setting Your Business Criteria",
    "CH02. Finding and Selecting a Business Opportunity",
    "CH03. Defining the Customer, the Buyer, and the Problem",
    "CH04. Building the Value Proposition, Competitive Advantage, and Positioning",
    "CH05. Designing the Business Model",
    "CH06. Designing Cost, Price, and Revenue Model",
    "CH07. Validating Business Feasibility and the Effective Market",
    "CH08. Execute, Validate, and Revise Through Pivoting",
  ],
};

// eslint-disable-next-line no-unused-vars
const _titlesReferenceOnly = CHAPTER_TITLES; // titles actually come from each file's H1 via sync-content.mjs

export default defineConfig({
  site: "https://victory3217-bot.github.io",
  base: "/business-planning-handbook/",
  integrations: [
    starlight({
      title: "Business Planning Handbook",
      defaultLocale: "en",
      locales: {
        ko: { label: "한국어", lang: "ko" },
        en: { label: "English", lang: "en" },
      },
      sidebar: [
        {
          label: "Chapters",
          translations: { ko: "챕터" },
          autogenerate: { directory: "chapters" },
        },
        {
          label: "Worksheets & Examples",
          translations: { ko: "워크시트 & 사례" },
          items: [
            {
              label: "Worksheets",
              translations: { ko: "워크시트" },
              autogenerate: { directory: "manual" },
            },
            {
              label: "Examples",
              translations: { ko: "사례" },
              autogenerate: { directory: "examples" },
            },
          ],
        },
      ],
    }),
  ],
});
