'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import TeamMemberModal, { type TeamMember } from './TeamMemberModal'

// ─── Management Team Data ───────────────────────────────────────────────────

const managementTeam: TeamMember[] = [
  {
    name: 'Mary Chiu',
    title: 'Co-Founder',
    image: '/images/team/mary-chiu.webp',
    initials: 'MC',
    bio: [
      'Mary Chiu is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she sits on the firm\u2019s investment committee. With more than 20 years of experience in the asset management and banking industry, Mary was previously with UBS AG, expanding their Global Family Office offering in Greater China by providing investment solutions across the wealth management and institutional banking platform to prominent Hong Kong families. She oversaw more than USD 4Bn of client assets invested across equities, bonds, derivatives, PE and cash management.',
      'Mary started her banking career at Morgan Stanley, where she helped companies raise capital through IPOs and follow-on offerings and assisted Hong Kong listed companies in debt and equity capital issuances. During this time, she was on the deal team of the IPO of MGM China (USD 1.6Bn), the IPO of Swire Properties (USD 2Bn), Henderson Land\u2019s unrated bond offering (US$700MM) and Shangri-La Asia\u2019s unrated bond offering (US$600MM) among others.',
    ],
    education:
      'MBA with Distinction, Cornell University \u00b7 BA Honours (Economics & Philosophy), University of Toronto',
  },
  {
    name: 'Yugi Lee',
    title: 'Co-Founder & CEO',
    image: '/images/team/yugi-lee.webp',
    initials: 'YL',
    bio: [
      'Yugi Lee is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she is an executive member of the firm\u2019s investment committee. She was awarded the \u2018Outstanding CEO Award\u2019 by Capital CEO magazine in 2022.',
      'Prior to setting up Blackhorn, Yugi served as a Director in UBS Wealth Management for over 6 years, primarily responsible for managing the assets of a number of prominent families and listed companies in Hong Kong and Mainland China. She rapidly rose within the industry, becoming a Director at the age of 25, with total assets under management in excess of USD 1 billion.',
      'After graduating from HKUST, she embarked on her banking career at Bank of Shanghai, where she was a key member of the founding team that set up the Hong Kong Branch and obtained a restricted banking license from the Hong Kong Monetary Authority. In 2014, she worked in the Independent Wealth Management (EAM) team at Credit Suisse, providing investment and execution solutions for family offices.',
    ],
    education:
      'BBA (Economics), Hong Kong University of Science and Technology',
  },
  {
    name: 'Alan Lee',
    title: 'Head of Investment Strategy, Managing Director',
    image: '/images/team/alan-lee.webp',
    initials: 'AL',
    bio: [
      'Alan Lee is the Managing Director at Blackhorn, and an executive member of the firm\u2019s investment committee. He is primarily responsible for the management of portfolios and the formulation of investment strategies. He has a proven record in Hong Kong and across Asia in the creation of value for families and individuals through customised solutions across multiple asset classes.',
      'Prior to joining Blackhorn in 2022, Alan spent 15 years in banking with international experience spanning Hong Kong, Singapore, and Australia. He was a Director at UBS Wealth Management Hong Kong for over 8 years, and previously worked at HSBC in Singapore and Citi Australia in Private Banking.',
    ],
    education:
      'Master of Business (Finance), UTS \u00b7 BE (Telecommunications), UNSW',
  },
  {
    name: 'Wilson Hui',
    title: 'Head of Wealth Solutions, Managing Director',
    image: '/images/team/wilson-hui.webp',
    initials: 'WH',
    bio: [
      'Wilson Hui is the Managing Director at Blackhorn and Head of Wealth Solutions. He is an executive member of the firm\u2019s investment committee and primarily focuses on managing family offices and ultra-high net-worth individuals.',
      'With over 12 years of wealth management experience, Wilson was an Executive Director with UBS before joining Blackhorn. His expertise includes managing client relationships and implementing tailor-made wealth management solutions based on comprehensive research and market insights.',
    ],
    education: 'LLB, University of Hong Kong',
  },
  {
    // TODO: Full bio needed from Blackhorn
    name: 'Agnes Wong',
    title: 'Head of Fixed Income',
    image: '/images/team/agnes-wong.webp',
    initials: 'AW',
    bio: [
      'Agnes Wong is the Head of Fixed Income at Blackhorn Wealth Management.',
    ],
  },
]

// ─── Advisory Board Data ────────────────────────────────────────────────────

const advisoryBoard: TeamMember[] = [
  {
    // TODO: Full bio needed from Blackhorn
    name: 'Nejteh Demirian',
    title: 'Advisor',
    image: '/images/team/nejteh-demirian.webp',
    initials: 'ND',
    bio: [
      'Advisory board member at Blackhorn Wealth Management.',
    ],
  },
  {
    name: 'Peter Tsang',
    title: 'Advisor',
    initials: 'PT',
    bio: [
      'Peter is a founding partner of a reputable local law firm and has been a practising lawyer for over 30 years. He specializes in wills, trusts, probate, estate planning, and the law of succession.',
      'He is a member of the Probate Committee of The Law Society of Hong Kong and a Trust and Estate Practitioner (TEP) of STEP.',
    ],
  },
  {
    name: 'Andrew Lo',
    title: 'Advisor',
    initials: 'AL',
    bio: [
      'Andrew is the founder and CEO of EFT Solutions Ltd (HKEX: 8062), specialising in electronic fund transfer solutions. He also founded eft Payments (Asia) Limited, which processed the first Alipay offline transaction in Hong Kong.',
    ],
  },
]

// ─── Team Card Component ────────────────────────────────────────────────────

function TeamCard({
  member,
  onClick,
  index,
}: {
  member: TeamMember
  onClick: () => void
  index: number
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <button
        onClick={onClick}
        className="group block w-full text-left"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden border-[0.5px] border-gold/8 bg-dark-card transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:border-gold/20">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
              View Bio &rarr;
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <h3 className="mt-4 font-serif text-lg font-light text-light transition-colors duration-300 group-hover:text-gold">
          {member.name}
        </h3>
        <p className="mt-1 font-sans text-xs text-muted">
          {member.title}
        </p>
        {/* Excerpt — first sentence */}
        <p className="mt-3 font-sans text-xs font-light leading-relaxed text-muted/60 line-clamp-2">
          {member.bio[0].split('. ').slice(0, 2).join('. ')}.
        </p>
      </button>
    </FadeIn>
  )
}

// ─── Advisory Card Component ────────────────────────────────────────────────

function AdvisoryCard({
  member,
  index,
}: {
  member: TeamMember
  index: number
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="flex gap-5 border-[0.5px] border-gold/8 bg-dark-card p-6 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/15 hover:bg-gold/[0.02]">
        {/* Avatar */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden border-[0.5px] border-gold/12 bg-dark">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="64px"
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
          <h3 className="font-serif text-lg font-light text-light">
            {member.name}
          </h3>
          <p className="mt-0.5 font-sans text-xs uppercase tracking-widest text-gold/60">
            {member.title}
          </p>
          <p className="mt-3 font-sans text-xs font-light leading-relaxed text-muted">
            {member.bio.join(' ')}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <>
      {/* Management Team */}
      <section className="bg-dark py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              Leadership
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
              Meet Our Management Team
            </h2>
            <div className="mt-6 h-[0.5px] w-10 bg-gold" />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {managementTeam.slice(0, 4).map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
                index={i}
              />
            ))}
          </div>

          {/* Agnes — centered single card on a new row */}
          {managementTeam.length > 4 && (
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-auto lg:max-w-[25%] lg:grid-cols-1">
              {managementTeam.slice(4).map((member, i) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  onClick={() => setSelectedMember(member)}
                  index={i + 4}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advisory Board */}
      <section className="border-t border-gold/6 bg-dark-section py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              Advisors
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl">
              Advisory Board
            </h2>
            <div className="mt-6 h-[0.5px] w-10 bg-gold" />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisoryBoard.map((member, i) => (
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
