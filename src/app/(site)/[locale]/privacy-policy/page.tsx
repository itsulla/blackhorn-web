import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Privacy Policy | Blackhorn Wealth Management',
  description:
    'Privacy policy for Blackhorn Wealth Management — how we collect, use, and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-gold">
            Legal
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-2 h-px w-16 bg-gold/40" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 space-y-8 font-sans text-sm leading-[1.85] text-muted">
            <h2 className="font-serif text-xl font-light text-light">
              1. Introduction
            </h2>
            <p>
              Blackhorn Wealth Management Limited (&ldquo;Blackhorn&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
              committed to protecting the privacy and security of your
              personal data. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or engage our services.
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you contact us through our website, subscribe to our
              communications, or engage our services. This may include your
              name, email address, phone number, and other information
              relevant to providing our services.
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              3. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, to communicate with you, to comply with
              legal obligations, and for other purposes described in this
              policy.
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              4. Data Protection
            </h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your personal data against unauthorised or unlawful
              processing, accidental loss, destruction, or damage.
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a
                href="mailto:info@blackhorngrp.com"
                className="text-gold transition-colors duration-300 hover:text-gold-light"
              >
                info@blackhorngrp.com
              </a>
              .
            </p>

            <p className="text-xs italic text-white/30">
              This is a placeholder privacy policy. The full policy will be
              published upon legal review.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 border-t border-gold/10 pt-8">
            <Link
              href="/"
              className="font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
            >
              &larr; Back to Home
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
