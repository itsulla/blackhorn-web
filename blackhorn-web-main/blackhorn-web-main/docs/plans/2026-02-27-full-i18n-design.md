# Full i18n Coverage — Design Document

**Date:** 2026-02-27
**Goal:** Every visible English string goes through translation. Zero stray English when switching to Chinese locale (except proper nouns).

## Approach

Add translation keys for all ~100+ hardcoded strings. Wire all pages/components to use `getTranslations()` (server) or `useTranslations()` (client) from next-intl.

## Files to Modify

### Translation Files
- `src/messages/en.json` — add ~200 new keys across ~15 namespaces
- `src/messages/zh-hant.json` — matching Chinese keys

### Pages (server components, use `getTranslations`)
1. `src/app/(site)/[locale]/about/page.tsx`
2. `src/app/(site)/[locale]/about/our-expertise/page.tsx`
3. `src/app/(site)/[locale]/about/our-philosophy/page.tsx`
4. `src/app/(site)/[locale]/about/partnerships/page.tsx`
5. `src/app/(site)/[locale]/about/commitment-to-results/page.tsx`
6. `src/app/(site)/[locale]/about/leadership/page.tsx`
7. `src/app/(site)/[locale]/about/advisors/page.tsx`
8. `src/app/(site)/[locale]/services/page.tsx`
9. `src/app/(site)/[locale]/contact/page.tsx`
10. `src/app/(site)/[locale]/careers/page.tsx`
11. `src/app/(site)/[locale]/events/page.tsx`
12. `src/app/(site)/[locale]/press/page.tsx`
13. `src/app/(site)/[locale]/awards/page.tsx`
14. `src/app/(site)/[locale]/blog/page.tsx`
15. `src/app/(site)/[locale]/disclaimer/page.tsx`
16. `src/app/(site)/[locale]/privacy-policy/page.tsx`
17. `src/app/(site)/[locale]/important-notice/page.tsx`
18. `src/app/(site)/[locale]/insights/page.tsx`

### Components (client/server as marked)
19. `src/components/ContactForm.tsx` (client)
20. `src/components/ContactFormAdvanced.tsx` (client)
21. `src/components/home/ContactCTA.tsx` (client)
22. `src/components/home/Awards.tsx` (server)
23. `src/components/home/Insights.tsx` (server)
24. `src/components/home/LatestBlog.tsx` (server)
25. `src/components/home/Hero.tsx` (client)
26. `src/components/home/TrustBar.tsx` (client)
27. `src/components/layout/Navbar.tsx` (client)
28. `src/components/about/AboutPageLayout.tsx` (server)

### Data files
29. `src/lib/services.ts` — services array display strings → translation keys
30. `src/lib/about.ts` — aboutLinks display strings → translation keys

## Translation Key Structure

New namespaces to add (preserving all existing keys):
- `aboutHub` — hub page cards and intro
- `expertise` — Our Expertise sub-page
- `philosophy` — Our Philosophy sub-page
- `partnerships` — Partnerships sub-page
- `commitment` — Commitment to Results sub-page
- `servicesHub` — services hub page
- `careers` — careers page
- `eventsPage` — events page
- `pressPage` — press page
- `awardsPage` — awards page
- `contactPage` — contact page (extending existing `contact`)
- `disclaimerPage` — disclaimer page
- `privacyPage` — privacy policy page
- `importantNotice` — important notice page
- `metadata` — page titles and descriptions

## Rules
- DO NOT modify existing translation keys
- DO NOT change design, layout, or styling
- DO NOT break Sanity CMS integration
- Every en.json key must have a zh-hant.json counterpart
- Use formal Hong Kong financial Chinese
