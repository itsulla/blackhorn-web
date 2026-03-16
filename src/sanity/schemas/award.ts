import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fieldsets: [
    {
      name: 'chinese',
      title: '中文 Chinese Translation',
      options: { collapsible: true, collapsed: true },
    },
  ],
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

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Award Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'organization_zh',
      title: 'Awarding Organization (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'description_zh',
      title: 'Description (Chinese)',
      type: 'text',
      rows: 3,
      fieldset: 'chinese',
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
