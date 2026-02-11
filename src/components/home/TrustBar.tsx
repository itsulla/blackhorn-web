// TODO: Replace hardcoded strings with useTranslations('trust')
import FadeIn from '@/components/ui/FadeIn'
import Counter from '@/components/ui/Counter'

const metrics = [
  { target: 15, suffix: '+', label: 'Years of Excellence' },
  { target: 200, suffix: '+', label: 'Families Served' },
  { target: 3, prefix: '$', suffix: 'B+', label: 'Assets Under Management' },
]

export default function TrustBar() {
  return (
    <section className="border-y border-gold/8 bg-dark-section">
      <div className="mx-auto grid max-w-7xl auto-cols-fr grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-12 py-16">
        {metrics.map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.15} className="text-center">
            <span className="font-serif text-4xl font-light text-gold">
              <Counter
                target={m.target}
                prefix={m.prefix}
                suffix={m.suffix}
              />
            </span>
            <p className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
              {m.label}
            </p>
          </FadeIn>
        ))}
        <FadeIn delay={0.45} className="text-center">
          <span className="font-serif text-4xl font-light text-gold">
            Type 4 &amp; 9
          </span>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
            SFC Licensed
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
