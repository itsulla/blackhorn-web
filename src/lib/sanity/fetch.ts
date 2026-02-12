/**
 * Sanity data fetching layer with built-in fallbacks.
 *
 * Every fetch function returns hardcoded defaults when the CMS is empty or
 * the query fails, so the site always renders correctly.
 */

import { sanityClient } from './client'
import {
  siteSettingsQuery,
  managementTeamQuery,
  advisoryBoardQuery,
  servicesQuery,
  pressArticlesQuery,
  pressArticleBySlugQuery,
  awardsQuery,
  eventsQuery,
  eventBySlugQuery,
  legalPageBySlugQuery,
} from './queries'

// ---------------------------------------------------------------------------
// Types (CMS-shaped)
// ---------------------------------------------------------------------------

export interface CMSSiteSettings {
  companyName?: string
  phone?: string
  email?: string
  careersEmail?: string
  complianceEmail?: string
  compliancePhone?: string
  address?: string
  sfcLicense?: string
  sfcTypes?: string
  linkedinUrl?: string
  heroHeading?: string
  heroSubtext?: string
  missionStatement?: string
  trustBarStats?: Array<{ value: string; label: string }>
  disclaimerText?: string
  fraudNoticeText?: string
}

export interface CMSTeamMember {
  _id: string
  name: string
  slug?: { current: string }
  role: string
  bio: string
  isInvestmentCommittee?: boolean
  photoUrl?: string
}

export interface CMSService {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon: string
  content?: unknown[]
  features?: Array<{ title: string; description: string }>
  order: number
}

export interface CMSPressArticle {
  _id: string
  title: string
  slug: { current: string }
  publication: string
  author?: string
  publishDate: string
  summary: string
  externalUrl?: string
  language?: string
  titleChinese?: string
  heroImageUrl?: string
  thumbnailUrl?: string
}

export interface CMSAward {
  _id: string
  title: string
  organization: string
  year: number
  category?: string
  description?: string
  imageUrl?: string
}

export interface CMSEvent {
  _id: string
  title: string
  slug: { current: string }
  date: string
  location?: string
  heroImageUrl?: string
}

export interface CMSEventDetail extends CMSEvent {
  description?: unknown[]
  ctaText?: string
  ctaEmail?: string
  gallery?: Array<{ caption?: string; url: string }>
  speakers?: Array<{ name: string; title: string; photoUrl?: string }>
}

export interface CMSLegalPage {
  _id: string
  title: string
  slug: { current: string }
  content?: unknown[]
  lastUpdated?: string
}

// ---------------------------------------------------------------------------
// Safe fetch helper
// ---------------------------------------------------------------------------

async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  tags?: string[]
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params ?? {}, {
      next: tags ? { tags } : undefined,
    })
  } catch (error) {
    console.warn('[Sanity] Fetch failed, using fallback:', error)
    return null
  }
}

// ---------------------------------------------------------------------------
// Public fetch functions
// ---------------------------------------------------------------------------

export async function fetchSiteSettings(): Promise<CMSSiteSettings | null> {
  return safeFetch<CMSSiteSettings>(siteSettingsQuery, {}, ['siteSettings'])
}

export async function fetchManagementTeam(): Promise<CMSTeamMember[]> {
  const data = await safeFetch<CMSTeamMember[]>(managementTeamQuery, {}, ['teamMember'])
  return data && data.length > 0 ? data : []
}

export async function fetchAdvisoryBoard(): Promise<CMSTeamMember[]> {
  const data = await safeFetch<CMSTeamMember[]>(advisoryBoardQuery, {}, ['teamMember'])
  return data && data.length > 0 ? data : []
}

export async function fetchServices(): Promise<CMSService[]> {
  const data = await safeFetch<CMSService[]>(servicesQuery, {}, ['service'])
  return data && data.length > 0 ? data : []
}

export async function fetchPressArticles(): Promise<CMSPressArticle[]> {
  const data = await safeFetch<CMSPressArticle[]>(pressArticlesQuery, {}, ['pressArticle'])
  return data && data.length > 0 ? data : []
}

export async function fetchPressArticleBySlug(
  slug: string
): Promise<CMSPressArticle | null> {
  return safeFetch<CMSPressArticle>(pressArticleBySlugQuery, { slug }, ['pressArticle'])
}

export async function fetchAwards(): Promise<CMSAward[]> {
  const data = await safeFetch<CMSAward[]>(awardsQuery, {}, ['award'])
  return data && data.length > 0 ? data : []
}

export async function fetchEvents(): Promise<CMSEvent[]> {
  const data = await safeFetch<CMSEvent[]>(eventsQuery, {}, ['event'])
  return data && data.length > 0 ? data : []
}

export async function fetchEventBySlug(
  slug: string
): Promise<CMSEventDetail | null> {
  return safeFetch<CMSEventDetail>(eventBySlugQuery, { slug }, ['event'])
}

export async function fetchLegalPage(
  slug: string
): Promise<CMSLegalPage | null> {
  return safeFetch<CMSLegalPage>(legalPageBySlugQuery, { slug }, ['legalPage'])
}
