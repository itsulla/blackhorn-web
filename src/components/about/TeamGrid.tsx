'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import TeamMemberModal from './TeamMemberModal'
import {
  type TeamMember,
  managementTeam,
  advisoryBoard,
  cmsToTeamMember,
} from '@/lib/about'
import type { CMSTeamMember } from '@/lib/sanity/fetch'

// ─── Team Card Component ────────────────────────────────────────────────────

export function TeamCard({
  member,
  onClick,
  index,
  variant = 'dark',
}: {
  member: TeamMember
  onClick: () => void
  index: number
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'
  const locale = useLocale()
  const tl = useTranslations('leadership')

  const displayName = locale === 'zh-hant' && member.name_zh ? member.name_zh : member.name
  const displayTitle = locale === 'zh-hant' && member.title_zh ? member.title_zh : member.title
  const displayBio = locale === 'zh-hant' && member.bio_zh?.length ? member.bio_zh : member.bio

  return (
    <FadeIn delay={index * 0.1}>
      <button
        onClick={onClick}
        className="group block w-full text-left"
      >
        {/* Image */}
        <div className={`relative aspect-[3/4] w-full overflow-hidden transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          isLight
            ? 'border border-light-border bg-white group-hover:border-gold/30'
            : 'border-[0.5px] border-gold/8 bg-dark-card group-hover:border-gold/20'
        }`}>
          {member.image ? (
            <Image
              src={member.image}
              alt={displayName}
              fill
              className="object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              {...(member.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: member.blurDataURL } : {})}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-5xl font-light text-gold/20 transition-colors duration-300 group-hover:text-gold/40">
                {member.initials}
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100">
            <span className="p-5 font-sans text-[10px] uppercase tracking-widest text-gold">
              {tl('viewBio')} &rarr;
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <h3 className={`mt-4 font-serif text-lg font-light transition-colors duration-300 group-hover:text-gold ${
          isLight ? 'text-light-text' : 'text-light'
        }`}>
          {displayName}
        </h3>
        <p className={`mt-1 font-sans text-xs ${isLight ? 'text-light-text-secondary' : 'text-muted'}`}>
          {displayTitle}
        </p>
        {/* Excerpt — first sentence */}
        <p className={`mt-3 font-sans text-xs font-light leading-relaxed line-clamp-2 ${
          isLight ? 'text-light-text-secondary/60' : 'text-muted/60'
        }`}>
          {displayBio[0].split('. ').slice(0, 2).join('. ')}.
        </p>
      </button>
    </FadeIn>
  )
}

// ─── Advisory Card Component ────────────────────────────────────────────────

export function AdvisoryCard({
  member,
  index,
  variant = 'dark',
}: {
  member: TeamMember
  index: number
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'
  const locale = useLocale()

  const displayName = locale === 'zh-hant' && member.name_zh ? member.name_zh : member.name
  const displayTitle = locale === 'zh-hant' && member.title_zh ? member.title_zh : member.title
  const displayBio = locale === 'zh-hant' && member.bio_zh?.length ? member.bio_zh : member.bio

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`flex gap-5 p-6 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        isLight
          ? 'border border-light-border bg-white shadow-sm hover:border-gold/30 hover:bg-gold/[0.01]'
          : 'border-[0.5px] border-gold/8 bg-dark-card hover:border-gold/15 hover:bg-gold/[0.02]'
      }`}>
        {/* Avatar */}
        <div className={`relative h-16 w-16 flex-shrink-0 overflow-hidden ${
          isLight ? 'border border-light-border bg-light-bg' : 'border-[0.5px] border-gold/12 bg-dark'
        }`}>
          {member.image ? (
            <Image
              src={member.image}
              alt={displayName}
              fill
              className="object-cover object-top"
              sizes="64px"
              {...(member.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: member.blurDataURL } : {})}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-lg font-light text-gold/30">
                {member.initials}
              </span>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className={`font-serif text-lg font-light ${isLight ? 'text-light-text' : 'text-light'}`}>
            {displayName}
          </h3>
          <p className={`mt-0.5 font-sans text-xs uppercase tracking-widest ${isLight ? 'text-gold-dark/60' : 'text-gold/60'}`}>
            {displayTitle}
          </p>
          <p className={`mt-3 font-sans text-xs font-light leading-relaxed ${isLight ? 'text-light-text-secondary' : 'text-muted'}`}>
            {displayBio.join(' ')}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

interface TeamGridProps {
  cmsManagement?: CMSTeamMember[]
  cmsAdvisory?: CMSTeamMember[]
}

export default function TeamGrid({ cmsManagement, cmsAdvisory }: TeamGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const tl = useTranslations('leadership')
  const ta = useTranslations('advisors')

  // Use CMS data if provided, otherwise fall back to hardcoded
  const mgmt = useMemo(
    () => (cmsManagement ? cmsManagement.map(cmsToTeamMember) : managementTeam),
    [cmsManagement]
  )
  const advisors = useMemo(
    () => (cmsAdvisory ? cmsAdvisory.map(cmsToTeamMember) : advisoryBoard),
    [cmsAdvisory]
  )

  return (
    <>
      {/* Management Team */}
      <section className="bg-dark py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              {tl('overline')}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
              {tl('title')}
            </h2>
            <div className="mt-6 h-[0.5px] w-10 bg-gold" />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {mgmt.map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="border-t border-gold/6 bg-dark-section py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              {ta('overline')}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl">
              {ta('title')}
            </h2>
            <div className="mt-6 h-[0.5px] w-10 bg-gold" />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisors.map((member, i) => (
              <AdvisoryCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  )
}
