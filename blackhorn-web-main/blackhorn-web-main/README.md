# Blackhorn Wealth Management

Corporate website for Blackhorn Wealth Management — an independent, Hong Kong-based wealth management firm (SFC Licensed, Type 4 & Type 9).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **CMS:** Sanity (headless)
- **Email:** Resend
- **Icons:** Lucide React
- **Package Manager:** pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone https://gitlab.com/RustyRocket/blackhorn-web.git
cd blackhorn-web
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `SANITY_API_TOKEN` | Sanity API token (for server-side mutations) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `https://www.blackhorngrp.com`) |

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity Studio

The CMS schemas live in the `sanity/` directory at the project root.

### Running Sanity Studio locally

```bash
cd sanity
npx sanity dev
```

This opens the studio at [http://localhost:3333](http://localhost:3333).

### Content types

- **Team Members** — staff profiles with bios, credentials, photos
- **Services** — wealth management service offerings
- **Awards** — industry awards and recognition
- **Insights** — articles, market commentary, news
- **Events** — company events with photo galleries
- **Site Settings** — global config (contact info, scam notice toggle)

## Deployment

The project is configured for deployment on **Vercel**.

### Via Vercel Dashboard

1. Import the GitLab repository at [vercel.com/new](https://vercel.com/new)
2. Select **Next.js** as the framework preset
3. Add all environment variables from `.env.example`
4. Deploy

### Via Vercel CLI

```bash
npx vercel --prod
```

## Project Structure

```
src/
  app/           — Next.js App Router pages and API routes
  components/    — React components (layout, home sections, UI primitives)
  lib/           — Sanity client, fonts, constants
  styles/        — Global CSS
sanity/
  schemas/       — Sanity document schemas
  sanity.config.ts
```
