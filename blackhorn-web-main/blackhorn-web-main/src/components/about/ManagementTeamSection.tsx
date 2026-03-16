'use client'

import { useState, useMemo } from 'react'
import { TeamCard } from './TeamGrid'
import TeamMemberModal from './TeamMemberModal'
import {
  type TeamMember,
  managementTeam,
  cmsToTeamMember,
} from '@/lib/about'
import type { CMSTeamMember } from '@/lib/sanity/fetch'

interface ManagementTeamSectionProps {
  cmsData?: CMSTeamMember[]
  variant?: 'dark' | 'light'
}

export default function ManagementTeamSection({ cmsData, variant = 'dark' }: ManagementTeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const team = useMemo(
    () => (cmsData ? cmsData.map(cmsToTeamMember) : managementTeam),
    [cmsData]
  )

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <TeamCard
            key={member.name}
            member={member}
            onClick={() => setSelectedMember(member)}
            index={i}
            variant={variant}
          />
        ))}
      </div>

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  )
}
