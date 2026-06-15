# NEXA_PROPIEDADES_ARCHITECTURE.md — Decision

**Date:** 2026-06-15
**Repo:** [`Ai-Whisperers/nexa-propiedades`](https://github.com/Ai-Whisperers/nexa-propiedades)
**Decision-maker:** TBD (default: keep as-is — see below)

## TL;DR

`nexa-propiedades` is **not** on Pages Router (the original REPO_COMPARISON.md was wrong). It is a single-page App Router site with a hand-rolled content registry in `pages/*.json`. It works. Migrating to the personal nexa pattern would be **~3 days of work for ~0 user-facing benefit**. **Recommendation: keep as-is.**

## Reality (corrected from REPO_COMPARISON.md)

| What REPO_COMPARISON said | What's actually there |
|---|---|
| "nexa-propiedades uses Pages Router (`pages/`) | The `pages/` dir is a **JSON content registry**, not the Next.js Pages Router. There are 8 `*.json` files there: blog, contacto, equipo, home, privacidad, propiedades, servicios, testimonios. |
| "less sophisticated routing" | The app has a single `src/app/page.tsx` (App Router) that reads from `pages/*.json` + `content/*.json` and renders the requested page based on URL search params or internal navigation. No `[slug]` dynamic — content is selected client-side. |
| "different from personal nexa" | True: it has its own simpler content pattern (no `nexa-pages/*.json`, no `[locale]/[slug]`). The two Nexa sites have **two different content models** that both work. |

## The two patterns (side-by-side)

### Personal nexa-paraguay (gold standard)
- **Content registry:** `nexa-pages/<slug>.json` (27 files)
- **Page resolution:** `src/app/[locale]/[slug]/page.tsx` + `generateStaticParams()` (SSG)
- **Content storage:** `content/{es,en,nl,de}.json` (4 files, 200-280KB each)
- **i18n resolution:** `pickLocale(value, locale)` for per-locale objects
- **Sections:** `SectionsRenderer` + 30+ sections from `@ai-whisperers/sections` package
- **Customization:** 14 local component overrides in `src/components/`
- **Image registry:** 118 entries, 14 categories, per-locale alt in `images.json`

### nexa-propiedades (current)
- **Content registry:** `pages/<slug>.json` (8 files: home, propiedades, servicios, blog, contacto, equipo, testimonios, privacidad)
- **Page resolution:** Single `src/app/page.tsx` reads from registry, selects by search param
- **Content storage:** `content/{es,en,pt}.json` (3 files, 6-9KB each — much smaller)
- **i18n:** 3 locales (no NL, no DE — Brazilian Portuguese instead)
- **Components:** Minimal (`src/components/` empty per audit; relies on `@ai-whisperers/ui`)
- **Image registry:** 22 entries in `images.json`

## Cost of migration (App Router + nexa-pages pattern)

| Step | Effort | Risk |
|---|---|---|
| Add `[slug]/page.tsx` with `generateStaticParams` | 2h | Low (mechanical port) |
| Convert `pages/*.json` to `nexa-pages/*.json` schema | 3h | Medium (schema differs: sections array vs flat keys) |
| Migrate `content/{es,en,pt}.json` to per-locale object schema | 4h | Medium (pt is unique to this site) |
| Move from client-side page selection to SSG | 1h | Low (just routing) |
| Rebuild images.json with full per-locale alt | 2h | Low |
| Re-test all 3 locales + 8 pages | 2h | Medium |
| Total | **~14h (~2 days)** | Medium |

## Benefit of migration

- **Consistency with personal nexa** (one content pattern across both Nexa sites)
- **Better SEO** (real per-page URLs instead of search params)
- **Faster initial load** (SSG instead of client-rendered from a single bundle)
- **Easier to onboard new pages** (consistent schema)

## Cost of NOT migrating

- **Maintenance drag**: each Nexa site has its own content schema, so changes to one don't transfer
- **SEO is weaker** for nexa-propiedades (search params aren't indexable as nicely as `/propiedades`)
- **Lower Lighthouse score** due to client-rendered content
- **Harder to add pages**: must edit `pages/*.json` + `src/app/page.tsx` together; no SSG regen

## Recommendation: **keep as-is** (B) but with one small upgrade

**Rationale:**
- This site isn't being actively scaled. The current architecture works.
- 2 days of migration has no immediate business return.
- The two sites serve different verticals (relocation vs propiedades) with different content needs.
- If the personal nexa pattern gets adopted as the platform standard (Step 6.1.7 in REPO_COMPARISON.md), then migrate both at the same time.

**Small upgrade (30m, do this):**
- Add a `docs/ARCHITECTURE.md` to nexa-propiedades that explains: "this site uses a hand-rolled single-page App Router pattern. Migration to `nexa-pages`+`[locale]/[slug]` is tracked in the parent monorepo's REPO_COMPARISON.md."

**Defer:**
- Full migration until either: (a) Sonia asks for it, (b) personal nexa pattern becomes platform standard, (c) the site grows past 8 pages and the manual approach becomes painful.

## Open questions for Sonia / Kiki

1. Is nexa-propiedades currently generating leads? (If yes, SEO matters; if no, defer.)
2. How many more pages do you anticipate adding? (If 5+, migrate now.)
3. Is the Brazilian Portuguese locale important to keep, or can it be dropped for es/en/nl alignment?

Default: assume "no" to all three, defer migration.
