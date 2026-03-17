import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'scamNotice',
      title: 'Scam / Fraud Notice',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'showScamBanner',
      title: 'Show Scam Banner',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'careersMessage',
      title: 'Careers — No Positions Message',
      description: 'Shown on the Careers page when there are no open positions',
      type: 'string',
    }),
    defineField({
      name: 'careersMessage_zh',
      title: 'Careers — No Positions Message (Chinese)',
      type: 'string',
    }),
    // ── Page Hero Images ─────────────────────────────────────────
    defineField({
      name: 'heroImages',
      title: 'Page Hero Images',
      description: 'Upload hero/banner images for each page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'pageKey',
              type: 'string',
              title: 'Page',
              options: {
                list: [
                  { title: 'Homepage', value: 'home' },
                  { title: 'About', value: 'about' },
                  { title: 'About — Our Vision', value: 'about-our-vision' },
                  { title: 'About — Leadership / Our Team', value: 'about-leadership' },
                  { title: 'About — Our Location', value: 'about-our-location' },
                  { title: 'Awards', value: 'awards' },
                  { title: 'Services', value: 'services' },
                  { title: 'Services — Wealth Management', value: 'services-wealth-management' },
                  { title: 'Services — Family Office', value: 'services-family-office' },
                  { title: 'Careers', value: 'careers' },
                  { title: 'Insights & Media', value: 'insights' },
                  { title: 'Contact', value: 'contact' },
                ],
              },
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Hero Image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }),
          ],
          preview: {
            select: { pageKey: 'pageKey', media: 'image' },
            prepare({ pageKey, media }) {
              return { title: pageKey ?? 'Unknown page', media }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
