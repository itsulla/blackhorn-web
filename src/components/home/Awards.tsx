import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

const awards = [
  {
    year: '2024',
    org: 'Asian Fund Distributors',
    title: 'Gold Award — Outstanding Wealth Management',
  },
  {
    year: '2024',
    org: 'LGT Private Banking',
    title: 'Top Valued Business Partner',
  },
  {
    year: '2023',
    org: 'WealthBriefingAsia',
    title: 'Best Independent Wealth Manager — Hong Kong',
  },
  {
    year: '2022',
    org: 'Capital CEO',
    title: 'Outstanding Wealth Management Firm',
  },
]

export default function Awards() {
  return (
    <section className="bg-dark py-28">
      <div className="mx-auto max-w-7xl px-12">
        <FadeIn>
          <SectionHeader
            overline="Recognition"
            title="Awards & Accolades"
            highlight="Accolades"
          />
        </FadeIn>

        <div className="space-y-0">
          {awards.map((a, i) => (
            <FadeIn key={`${a.year}-${a.title}`} delay={i * 0.1}>
              <div className="group grid grid-cols-[60px_1fr] items-baseline gap-4 border-b border-gold/10 py-6 transition-colors duration-300 hover:bg-gold/[0.02] md:grid-cols-[80px_200px_1fr] md:gap-8">
                <span className="font-serif text-lg text-gold">
                  {a.year}
                </span>
                <span className="hidden font-sans text-xs uppercase tracking-wide text-muted md:block">
                  {a.org}
                </span>
                <span className="font-serif text-base font-light text-muted transition-colors duration-300 group-hover:text-light">
                  {a.title}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
