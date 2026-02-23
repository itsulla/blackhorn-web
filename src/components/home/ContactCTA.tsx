// TODO: Replace hardcoded strings with useTranslations('contactCta')
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function ContactCTA() {
  return (
    <section className="relative bg-dark-800 py-20 lg:py-24">
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left — heading + text */}
        <FadeIn className="text-center lg:text-left">
          <h2 className="font-serif text-3xl font-light text-light lg:text-4xl">
            Ready to discuss your{' '}
            <span className="italic text-gold">wealth strategy</span>?
          </h2>
          <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-muted">
            Our team is here to help you navigate your financial future.
          </p>
        </FadeIn>

        {/* Right — buttons */}
        <FadeIn delay={0.15} className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Book a Consultation
          </Button>
          <Button href="tel:+85227091388" variant="outline">
            Call Us: (852) 2709 1388
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
