import { defineField, defineType } from 'sanity'

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
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
