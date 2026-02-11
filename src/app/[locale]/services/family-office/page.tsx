import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'
import Accordion from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Family Office Services | Blackhorn Wealth Management',
  description:
    'Family office services including will and estate planning, trusts, philanthropy, enduring power of attorney, and advance directives from Blackhorn in Hong Kong.',
}

const familyOfficeTopics = [
  {
    title: 'Will & Estate Planning',
    content:
      'A will is a legal document that allows an individual to direct how the property to which he is beneficially entitled at the time of his death to be distributed after his death. Without a will, the assets of the deceased individual will be distributed in accordance with the Intestates\u2019 Estates Ordinance (Cap 481). The benefits of having a will include appointing a trustworthy person to administer their estate, distributing the estate according to their wishes, avoiding a lengthy probate process, minimising estate tax duty, making gifts and donations, and avoiding disputes among family members.',
  },
  {
    title: 'Philanthropy & Impact Investing',
    content:
      'A majority of family offices engage in philanthropy and impact investing. Family offices facilitate philanthropic investments directly or through other mechanisms, such as a family foundation or donor advised funds. The main reason to explore this topic is to educate the next generation of wealth owners to build a lasting legacy.',
  },
  {
    title: 'Family Trusts',
    content:
      'A trust is set up by a trust deed between the settlor and the trustee and often accompanied by a letter of wishes. Once the assets are transferred into the trust, the trustee has control over the assets. Trusts are often set up for the purpose of the welfare, education and well-being of family, and assist with future generations\u2019 estate planning, privacy, tax planning and asset protection, in particular against bankruptcy and divorce.',
  },
  {
    title: 'Enduring Power of Attorney',
    content:
      'With an enduring power of attorney, the donor can appoint and empower the attorney to manage his/her property and financial affairs when he/she becomes mentally incapable. Enduring Power of Attorney Ordinance (Cap 501) lays down the prescribed form and specific requirement for execution.',
  },
  {
    title: 'Advance Directive',
    content:
      'An advance directive for health care is a statement in which a person indicates when mentally competent the form of health care they would like at a future time when they are no longer competent. Although there is currently no legislation governing advance directives in Hong Kong, they will be recognized as valid unless otherwise challenged.',
  },
]

export default function FamilyOfficePage() {
  return (
    <ServicePageLayout
      title="Family Office Services"
      overline="Our Services"
      subtitle="A family office is a powerful arrangement for the preservation of family wealth through trusts and investments, family harmony through internal governance and education, as well as legacy and values planning through philanthropy and foundations."
      currentSlug="family-office"
    >
      <p>
        Our family office advisory practice helps prominent families establish
        and manage comprehensive governance structures that go well beyond
        traditional wealth management. We work across legal, financial, and
        personal dimensions to ensure that your family&apos;s wealth, values,
        and legacy are preserved for generations to come.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Our Family Office Services
      </h2>

      <Accordion items={familyOfficeTopics} defaultOpen={0} />

      {/* Advisory team callout */}
      <div className="mt-10 border-l-2 border-gold/30 pl-6">
        <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
          Advisory Team
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-serif text-base text-light">Peter Tsang</p>
            <p className="mt-1 text-xs text-muted">
              Founding partner of a reputable local law firm with over 30 years
              of experience specialising in wills, trusts, probate, estate
              planning, and the law of succession. Member of the Probate
              Committee of The Law Society of Hong Kong and a Trust and Estate
              Practitioner (TEP) of STEP.
            </p>
          </div>
          <div>
            <p className="font-serif text-base text-light">Andrew Lo</p>
            <p className="mt-1 text-xs text-muted">
              Founder and CEO of EFT Solutions Ltd (HKEX: 8062), specialising
              in electronic fund transfer solutions. Also founded eft Payments
              (Asia) Limited, which processed the first Alipay offline
              transaction in Hong Kong.
            </p>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}
