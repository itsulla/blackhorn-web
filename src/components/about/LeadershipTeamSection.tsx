'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import { TeamCard } from './TeamGrid'
import TeamMemberModal from './TeamMemberModal'
import {
  type TeamMember,
  managementTeam,
  advisoryBoard,
  cmsToTeamMember,
} from '@/lib/about'
import type { CMSTeamMember } from '@/lib/sanity/fetch'

interface LeadershipTeamSectionProps {
  cmsManagement?: CMSTeamMember[]
  cmsAdvisory?: CMSTeamMember[]
}

export default function LeadershipTeamSection({ cmsManagement, cmsAdvisory }: LeadershipTeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const tl = useTranslations('leadership')
  const ta = useTranslations('advisors')

  const allMgmt = useMemo(
    () => (cmsManagement ? cmsManagement.map(cmsToTeamMember) : managementTeam),
    [cmsManagement]
  )

  // Split management into co-founders and the rest
  const coFounders = useMemo(
    () => allMgmt.filter(m =>
      m.title.toLowerCase().includes('co-founder') ||
      m.title.toLowerCase().includes('cofounder') ||
      m.title.toLowerCase().includes('founder')
    ),
    [allMgmt]
  )

  const mgmt = useMemo(
    () => allMgmt.filter(m => !coFounders.includes(m)),
    [allMgmt, coFounders]
  )

  // Filter out Andrew Lo from advisory board
  const advisors = useMemo(
    () => {
      const list = cmsAdvisory ? cmsAdvisory.map(cmsToTeamMember) : advisoryBoard
      return list.filter(m => m.name !== 'Andrew Lo')
    },
    [cmsAdvisory]
  )

  return (
    <>
      {/* Co-Founders */}
      {coFounders.length > 0 && (
        <div>
          <FadeIn>
            <p className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
              {tl('coFounders')}
            </p>
            <div className="mt-4 h-[0.5px] w-10 bg-gold-dark/30" />
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {coFounders.map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
                index={i}
                variant="light"
              />
            ))}
          </div>
        </div>
      )}

      {/* Management Team */}
      {mgmt.length > 0 && (
        <div className="mt-24">
          <FadeIn>
            <p className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
              {tl('title')}
            </p>
            <div className="mt-4 h-[0.5px] w-10 bg-gold-dark/30" />
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {mgmt.map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
                index={i}
                variant="light"
              />
            ))}
          </div>
        </div>
      )}

      {/* Advisory Team */}
      <div className="mt-24">
        <FadeIn>
          <p className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
            {ta('title')}
          </p>
          <div className="mt-4 h-[0.5px] w-10 bg-gold-dark/30" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              onClick={() => setSelectedMember(member)}
              index={i}
              variant="light"
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  )
}
