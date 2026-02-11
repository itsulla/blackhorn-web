import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  title: string
  bio: unknown[]
  image: SanityImage
  credentials: string[]
  order: number
  linkedinUrl?: string
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  icon: string
  shortDescription: string
  fullDescription: unknown[]
  order: number
}

export interface Award {
  _id: string
  year: string
  organization: string
  title: string
  logo?: SanityImage
  description?: string
}

export interface Insight {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category: string
  excerpt: string
  body: unknown[]
  coverImage: SanityImage
  author?: {
    name: string
    image: SanityImage
  }
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  date: string
  description: unknown[]
  gallery: SanityImage[]
}

export interface SiteSettings {
  _id: string
  companyName: string
  tagline: string
  phone: string
  email: string
  address: string
  scamNotice: unknown[]
  showScamBanner: boolean
}

interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

// ---------------------------------------------------------------------------
// GROQ Queries
// ---------------------------------------------------------------------------

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, slug, title, bio, image, credentials, order, linkedinUrl
    }`
  )
}

export async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, icon, shortDescription, fullDescription, order
    }`
  )
}

export async function getAwards(): Promise<Award[]> {
  return sanityClient.fetch(
    `*[_type == "award"] | order(year desc) {
      _id, year, organization, title, logo, description
    }`
  )
}

export async function getInsights(limit?: number): Promise<Insight[]> {
  const slice = limit ? `[0...${limit}]` : ''
  return sanityClient.fetch(
    `*[_type == "insight"] | order(publishedAt desc) ${slice} {
      _id, title, slug, publishedAt, category, excerpt, body, coverImage,
      author->{ name, image }
    }`
  )
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  return sanityClient.fetch(
    `*[_type == "insight" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, category, excerpt, body, coverImage,
      author->{ name, image }
    }`,
    { slug }
  )
}

export async function getEvents(): Promise<Event[]> {
  return sanityClient.fetch(
    `*[_type == "event"] | order(date desc) {
      _id, title, slug, date, description, gallery
    }`
  )
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      _id, companyName, tagline, phone, email, address, scamNotice, showScamBanner
    }`
  )
}
