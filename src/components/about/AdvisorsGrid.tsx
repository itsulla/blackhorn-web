'use client'

import { useState, useMemo } from 'react'
import { TeamCard } from './TeamGrid'
import TeamMemberModal from './TeamMemberModal'
import {
  type TeamMember,
  advisoryBoard,
  cmsToTeamMember,
} from '@/lib/about'
import type { CMSTeamMember } from '@/lib/sanity/fetch'

interface AdvisorsGridProps {
  cmsAdvisory?: CMSTeamMember[]
}

export default function AdvisorsGrid({ cmsAdvisory }: AdvisorsGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const advisors = useMemo(
    () => {
      const list = cmsAdvisory ? cmsAdvisory.map(cmsToTeamMember) : advisoryBoard
      return list.filter(m => m.name !== 'Andrew Lo')
    },
    [cmsAdvisory]
  )

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  )
}
