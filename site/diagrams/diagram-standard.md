# Diagram Standard (v0.1 pilot)

Shared visual language for educational diagrams in the Business Planning Handbook.
Diagrams are a compressed visual form of what a chapter already says. They never add concepts, steps, numbers, or examples.

## Source-bound rule

- Every box, label, and arrow must trace to text in the public chapter (`ko/chapters/CHxx.md`, `en/chapters/CHxx.md`).
- Forbidden: steps not in the chapter, outside management theory, external frameworks, invented numbers or cases, concepts added for visual balance, definite arrows for relationships the chapter leaves ambiguous.
- Each diagram has a spec in `site/diagrams/specs/` that lists included concepts, excluded concepts, and what each connector claims. Write the spec first, then the SVG.

## Palette

| Role | Color | Use |
|---|---|---|
| Deep Navy | `#14253D` | core concept / primary node |
| Deep Teal | `#315B62` | supporting concept |
| Warm Gold | `#C49A5A` | decision, emphasis, intersection, key relationship |
| Warm Ivory | `#F6F2EA` | diagram background panel |
| White | `#FFFFFF` | inner panels |
| Charcoal | `#252A30` | main text |
| Muted | `#6B7280` | secondary text (not used on ivory below 16px) |

Meaning is never carried by color alone: pair it with a label, position, or line style (solid / dashed / two-way).

## SVG rules

- Flat, minimal, generous whitespace, subtly rounded boxes, simple arrows. No gradients, no decorative illustration, no icon sets, no shadows.
- `viewBox` only; no fixed pixel width. Canonical width is 480 units so the diagram stays legible at 375px.
- No `<script>`, no external resources, no external fonts, no embedded raster images. System font stack only.
- Text stays as `<text>` (never converted to paths).
- Semantic `<g id="...">` groups; `<title>` and `<desc>` on the root.
- Always include an explicit Warm Ivory background `<rect>` so the diagram stays readable in Starlight dark mode.
- Minimum rendered text: source size at least 16 units for body labels; at 375px width the SVG scales to about 0.68, so avoid anything smaller.
- Layouts are vertical or compact so they do not shrink into unreadable horizontal strips on mobile.

## Localization

- `ko/diagrams/` and `en/diagrams/` hold separate SVGs per locale and are the canonical public diagram source.
- KO and EN versions of the same `diagram_id` share identical geometry, hierarchy, color meaning, and relationships. Only text differs. If English runs longer, break lines rather than shrinking type.
- File name: `CHxx-<diagram_id>.svg`.

## Placement

Insert the diagram right after the chapter has first explained the concept (never as a decorative opener), under a short `###` heading, with meaningful alt text:

```
### 한눈에 보는 사업기준 구조

![사업기준과 후속 의사결정의 관계](../diagrams/CH01-business-criteria.svg)
```

## Build

`site/scripts/sync-content.mjs` copies `ko/diagrams/*.svg` and `en/diagrams/*.svg` next to the synced chapter files at build time. The copies under `site/src/content/docs/` are generated and gitignored.

## Out of scope for the pilot

No Mermaid pipeline. Decide on process diagrams (for example CH08) after the pilot design is approved.
