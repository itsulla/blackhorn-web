# Blackhorn Wealth Management — Content Gap Report

> **Generated:** February 2025
> **Last build:** 47 pages (en + zh-hant), 0 errors

## Summary

| Metric                | Count |
| --------------------- | ----- |
| Total unique pages    | 20    |
| Fully populated       | 18    |
| Partially populated   | 2     |
| Placeholder / stub    | 2     |

### Page Status Overview

| Page                        | Status       | Notes                                      |
| --------------------------- | ------------ | ------------------------------------------ |
| Homepage                    | Full         | All 7 sections populated                   |
| About                       | Full         | All bios populated (Agnes Wong still short) |
| Awards                      | Full         | 4 awards + gallery                         |
| Careers                     | Full         | Recruitment pitch + benefits grid           |
| Contact                     | Full         | Form, map, dept contacts                   |
| Disclaimer                  | Full         | Real legal text with SFC references         |
| Terms & Conditions          | Full         | Real legal text from Blackhorn              |
| Complaint Handling          | Full         | Compliance contact + procedures             |
| Events (listing)            | Full         | 2 events listed                            |
| Investment Summit 2024      | Full         | 10 speakers + gallery                      |
| Family Office Summit 2023   | Full         | 4 topics + gallery                         |
| Services (index)            | Full         | 5 services in 3+2 grid                     |
| Portfolio Management        | Full         | 11 banks, key capabilities                 |
| Family Office (service)     | Full         | Accordion with 5 topics                    |
| Deal Sourcing               | Full         | "Our Edge" callout                         |
| Real Estate & Financing     | Full         | Split Real Estate + Financing sections      |
| Privacy Policy              | **Partial**  | Generic template, self-labelled placeholder |
| Legacy Planning             | **Partial**  | Thin content, TODO in source               |
| Family Office (standalone)  | **Stub**     | Empty page — just an `<h1>` tag             |
| Insights                    | **Stub**     | Empty page — just an `<h1>` tag             |

---

## Resolved Items

- [x] ~~**About page** → Nejteh Demirian full bio~~ → Added full 3-paragraph bio + education
- [x] ~~**Legal** → Terms & Conditions page~~ → Created with real Blackhorn T&C content
- [x] ~~**Legal** → Complaint Handling page~~ → Created with compliance hotline, email, procedures
- [x] ~~**Legal** → Confirm legal entity name~~ → Confirmed as "Blackhorn Wealth Management Limited", updated across site
- [x] ~~**Footer** → Verify LinkedIn company page URL~~ → Confirmed: `https://www.linkedin.com/company/blackhorn-wealth-management/`
- [x] ~~**Footer** → Add links to all legal pages~~ → Disclaimer, T&Cs, Complaint Handling, Privacy Policy

---

## Content Gaps — Remaining Action Items

### Priority: HIGH (blocks launch or creates legal/professional risk)

- [ ] **Legal** → Privacy Policy needs real, legally reviewed content (PDPO-compliant) → currently shows "This is a placeholder" to visitors
- [ ] **About page** → Agnes Wong full bio needed → currently one-line stub with TODO

### Priority: MEDIUM (noticeable gaps but does not block launch)

- [ ] **Services** → Legacy Planning page needs more detailed content → thinnest of all service pages, has TODO in source
- [ ] **Family Office standalone page** (`/family-office`) → Entire page is an empty stub → needs real content or redirect to `/services/family-office`
- [ ] **Insights page** (`/insights`) → Entire page is an empty stub → needs article listings or "coming soon" treatment
- [ ] **Insights homepage component** → Article cards are not clickable (no `href`) → "Read More" arrows are decorative and misleading
- [ ] **Events** → Family Office Summit 2023 has inferred content → may need review for accuracy
- [ ] **About page** → Peter Tsang headshot needed → currently using initials placeholder
- [ ] **About page** → Andrew Lo headshot needed → currently using initials placeholder
- [ ] **About page** → Higher-resolution team headshots recommended → current Wix-sourced images work but are not ideal
- [ ] **Bilingual** → All Chinese (zh-hant) translations are empty strings → i18n infrastructure is ready, content needed

### Priority: LOW (nice-to-have, not critical for launch)

- [ ] **Insights** → Real articles / market commentary content → placeholder article titles are fine for soft launch
- [ ] **News** → Any press coverage or media mentions to add → no press page exists yet
- [ ] **Images** → Professional team headshots (recommended photo session) → current ones functional but low-res from Wix
- [ ] **Images** → Speaker headshots for non-Blackhorn summit speakers (Dr. Vivian Lam, Jason Cheung) → using initials placeholders
- [ ] **Sanity CMS** → Not yet connected to any frontend components → schemas exist but data is not wired
- [ ] **SEO** → OG images are not set per-page → only site-wide default

---

## Technical Debt (non-content)

- [ ] 7 homepage components have `// TODO: Replace hardcoded strings with useTranslations(...)` → i18n integration pending
- [ ] `sitemap.ts` has TODO for dynamic Sanity routes → commented out
- [ ] `OptimizedImage.tsx` JSDoc examples reference non-existent `/images/hero.jpg` and `/images/bg.jpg` → cosmetic, not rendered
- [ ] `en.json` translations exist but components are not yet wired to `useTranslations()` → all text is hardcoded

---

## Image Audit

- **18 image paths** referenced in rendered code → **all 18 resolve to files on disk**
- **0 broken image references** in production code
- **0 placeholder image service URLs** (no placehold.it, picsum, etc.)
- **0 lorem ipsum** instances found anywhere in codebase
- **0 `href="#"` links** found anywhere in codebase

---

## Build Status

```
pnpm build → 47 pages generated (en + zh-hant) → 0 errors, 0 type errors
Only warning: OptimizedImage.tsx alt prop (JSDoc example, not rendered)
```
