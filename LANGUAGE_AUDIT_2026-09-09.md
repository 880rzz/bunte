# Multilingual isolation audit — 2026-09-09

## Routes
- `/` — Hungarian (`hu-AT`)
- `/de/` — German (`de-AT`)
- `/en/` — English (`en`)

## Checks completed
- Each route has its own HTML document and its own localized JavaScript data/rendering file.
- No shared UI copy is injected from another language.
- `html lang` is correct on all three pages.
- Each page exposes reciprocal `hreflang` links for `hu-AT`, `de-AT`, `en` and `x-default`.
- The responsive language selector links HU / DE / EN and marks the current language with `aria-current="page"`.
- Filter labels, buttons, status badges, program summaries, source notes, date explanations and footer text are localized per route.
- Poster/source-audit explanations are localized per route.
- Proper names and provider brands (for example Bunte Schule Währing, Singschule Wien, Football School, Verein AKMÖ) are intentionally preserved and are not treated as language leakage.
- URLs, email addresses and building room labels such as `Top 30` are source identifiers and remain unchanged.

## Source integrity
The 13 school spreadsheet entries were cross-checked against the detailed Singschule Wien, Schulschach and Football School materials. Conflicts are displayed rather than silently reconciled.

## Result
PASS — language-specific user-facing copy is isolated by route. The multilingual switcher is responsive and keyboard-accessible.