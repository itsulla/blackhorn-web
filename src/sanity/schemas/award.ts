import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Award Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Awarding Organization',
      type: 'string',
      description: 'e.g. "WealthBriefingAsia", "LGT Private Banking"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Type',
      type: 'string',
      description: 'e.g. "Newcomer", "Top Valued Business Partner"',
    }),
    defineField({
      name: 'image',
      title: 'Award Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Trophy photo, ceremony photo, or certificate',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Year (newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      media: 'image',
    },
  },
})
