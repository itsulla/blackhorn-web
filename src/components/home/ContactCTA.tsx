import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function ContactCTA() {
  return (
    <section className="relative bg-dark py-28">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[700px] px-12 text-center">
        <FadeIn>
          <SectionHeader
            overline="Get in Touch"
            title="Begin Your Wealth Journey"
            highlight="Wealth Journey"
          />
          <p className="mx-auto mt-[-2rem] mb-10 max-w-lg font-sans text-base font-light leading-relaxed text-muted">
            Whether you are seeking to preserve generational wealth, explore new
            investment opportunities, or structure a family office, our team is
            ready to help.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={`mailto:${SITE_CONFIG.email}`} variant="primary">
              Schedule a Meeting
            </Button>
            <Button href={`tel:${SITE_CONFIG.phone}`} variant="outline">
              {SITE_CONFIG.phone}
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            <div className="text-center">
              <p className="font-sans text-[10px] uppercase tracking-widest text-muted/50">
                Office
              </p>
              <p className="mt-2 max-w-[220px] font-sans text-sm font-light text-muted">
                {SITE_CONFIG.address}
              </p>
            </div>
            <div className="text-center">
              <p className="font-sans text-[10px] uppercase tracking-widest text-muted/50">
                Email
              </p>
              <p className="mt-2 font-sans text-sm font-light text-muted">
                {SITE_CONFIG.email}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
