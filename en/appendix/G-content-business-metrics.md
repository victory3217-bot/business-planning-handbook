# Appendix G. Content-Business Metrics and Hypothesis Testing

> This appendix is supplementary material for people running a content business (video, newsletter, courses, e-books, memberships); it is not drawn from the Knowledge Modules. The metric names and formulas are proposals for use in this appendix, not standard definitions. Every number here is practice sample data, not figures from a real business or brand.

## Questions this appendix answers

- Which numbers should a content business record?
- How do conversion rate, new customers, and a revenue estimate come out of the calculation?
- In what order do you test a hypothesis with numbers?
- Where do you start if you are not yet measuring your own numbers?

## 1. Core concepts

A content business keeps accumulating visits, subscriptions, and payments after the content is made, so without recorded numbers it is hard to tell what improved and what got worse. Even many operating businesses do not measure the numbers below properly. This appendix therefore does not assume you already have them: you learn the calculations, plan where each number will come from, and practice forming a hypothesis and judging it with numbers. Aspiring founders can follow the same way — learn the calculation on the sample 12 months, then decide which numbers you will use to validate your own idea, which is itself your validation design.

It complements CH06 (cost and price), CH07 (effective market and revenue estimate), and CH08 (validation).

### Seven columns to record

| Column | Definition you decide | Where to get it |
|---|---|---|
| Period | 12 monthly or 12 weekly rows; do not mix | Calendar |
| Exposure/visits | One of video views, page visits, app visits; never add different metrics | Video studio, page analytics |
| New customers | New subscribers, sign-ups, or first-time buyers; keep repeat buyers out | Subscription screen, store records |
| Payments | One payment; decide whether refunds are removed | Store records |
| Revenue (KRW) | Fix pre- or post-tax and fee basis | Settlement statements |
| Repeat customers | Customers who bought again | Purchase history |
| Cost (KRW) | Production, ads, fees; keep your own labor separate | Card and settlement records, ad manager |

If a column does not exist, leave it blank rather than inventing it.

### Formulas and how to read them

Values below use the last three months (2026-08 to 10) of the sample.

| Metric | Formula | Sample value | Reading |
|---|---|---|---|
| Conversion rate | new customers ÷ visits | 719 ÷ 88,000 = 0.817% | Share of visitors who became customers |
| Payments per customer | payments ÷ new customers | 946 ÷ 719 = 1.316 | How often one customer pays |
| Average order value | revenue ÷ payments | 23,650,000 ÷ 946 = 25,000 KRW | Average of one payment |
| Repeat rate | repeat ÷ (new + repeat) | 227 ÷ 946 = 24.0% | Share of customers who come back |
| Cost ratio | cost ÷ revenue | 18,800,000 ÷ 23,650,000 = 79.5% | How much of revenue the cost eats |
| Acquisition cost per customer | cost ÷ new customers | 18,800,000 ÷ 719 = 26,147 KRW | What it costs to bring in one customer |

### Where "new customers" comes from: the past 12 months vs. the next 12 months

- Past 12 months, actual: the sum of new customers over 12 months, 2,684. It already happened.
- Next 12 months, estimate: last-three-month average visits × 12 = 352,000, times the last-three-month conversion rate 0.817%, gives 2,876.

Multiplying by 1.316 payments per customer and 25,000 KRW per payment gives an estimated next-12-month revenue of 94,600,000 KRW. Calculate with unrounded values and round only for display. The estimate is a frame that exposes assumptions, not a forecast.

## 2. Hypothesis testing

1. Write the hypothesis in a form that can be wrong.
2. Set the judging criterion before seeing the result: where support, revision, and discard divide.
3. Calculate with numbers from the same table and judge.

| Hypothesis | Criterion (set in advance) | Calculation | Judgment |
|---|---|---|---|
| More visits bring proportionally more new customers | Support if new-customer growth is at least half of visit growth | Visits 40,500 → 88,000 (+117%), new 605 → 719 (+19%), conversion 1.49% → 0.82% | Revise: look at which visits become customers |
| Buying more visits increases what is left | Support if cost ratio is 50% or lower | Cost ratio 36.9% → 79.5%, acquisition cost 11,570 → 26,147 KRW | Discard: buying more visits is near its limit |
| Raising conversion alone to 1.00% pushes 12-month revenue past KRW 100 million | Support if estimated revenue is at least KRW 100 million | Now 94,600,000 KRW; at 1.00% 115,783,032 KRW | Supported on paper; the 1.00% is an assumption to verify |

Never change the criterion after seeing the result. Twelve months of one business is material for forming a hypothesis, not proof.

## 3. Applying it to your own business

Mark each of the seven columns with ○ if you measure it now or △ if not, and write where you would get each △. Aspiring founders can start from numbers that need no finished product, such as sign-ups per page visit.

## 4. Excel download

[Download practice-data.xlsx](/business-planning-handbook/downloads/content-business/practice-data.xlsx) has three tabs: A1 sample 12 months (inputs plus formulas and the next-12-month estimate), Hypothesis test (the three hypotheses with formulas and blank rows for yours), and Calculation notes (meaning and formula for each metric). A [CSV of the A1 tab](/business-planning-handbook/downloads/content-business/A1-sample-12months.csv) is also available. Do not enter personal information. Use it after you finish the CH01-CH08 worksheets; at the end, give the AI both your Writer answers (.md) and this Excel file to draft and review the business plan.
