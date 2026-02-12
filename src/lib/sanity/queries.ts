import { groq } from 'next-sanity'

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, slug, role, category, bio, order,
    isInvestmentCommittee,
    "photoUrl": photo.asset->url
  }
`

export const managementTeamQuery = groq`
  *[_type == "teamMember" && category == "management"] | order(order asc) {
    _id, name, slug, role, bio, isInvestmentCommittee,
    "photoUrl": photo.asset->url
  }
`

export const advisoryBoardQuery = groq`
  *[_type == "teamMember" && category == "advisory"] | order(order asc) {
    _id, name, slug, role, bio,
    "photoUrl": photo.asset->url
  }
`

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, shortDescription, icon, content, features, order
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, shortDescription, icon, content, features
  }
`

// ---------------------------------------------------------------------------
// Press
// ---------------------------------------------------------------------------

export const pressArticlesQuery = groq`
  *[_type == "pressArticle"] | order(publishDate desc) {
    _id, title, slug, publication, author, publishDate, summary,
    externalUrl, language, titleChinese,
    "heroImageUrl": heroImage.asset->url,
    "thumbnailUrl": thumbnailImage.asset->url
  }
`

export const pressArticleBySlugQuery = groq`
  *[_type == "pressArticle" && slug.current == $slug][0] {
    _id, title, slug, publication, author, publishDate, summary,
    externalUrl, language, titleChinese,
    "heroImageUrl": heroImage.asset->url,
    "thumbnailUrl": thumbnailImage.asset->url
  }
`

// ---------------------------------------------------------------------------
// Awards
// ---------------------------------------------------------------------------

export const awardsQuery = groq`
  *[_type == "award"] | order(year desc, title asc) {
    _id, title, organization, year, category, description,
    "imageUrl": image.asset->url
  }
`

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const eventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id, title, slug, date, location,
    "heroImageUrl": heroImage.asset->url
  }
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id, title, slug, date, location, description,
    ctaText, ctaEmail,
    "heroImageUrl": heroImage.asset->url,
    gallery[] {
      caption,
      "url": asset->url
    },
    speakers[] {
      name, title,
      "photoUrl": photo.asset->url
    }
  }
`

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName, phone, email, careersEmail,
    complianceEmail, compliancePhone,
    address, sfcLicense, sfcTypes, linkedinUrl,
    heroHeading, heroSubtext, missionStatement,
    trustBarStats, disclaimerText, fraudNoticeText
  }
`

// ---------------------------------------------------------------------------
// Legal Pages
// ---------------------------------------------------------------------------

export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id, title, slug, content, lastUpdated
  }
`
