import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pressArticle',
  title: 'Press Article',
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
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publication',
      title: 'Publication Name',
      type: 'string',
      description: 'e.g. "Citywire Asia", "Asian Private Banker"',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 5,
      description: 'Written in our own words — do NOT reproduce article text',
    }),
    defineField({
      name: 'externalUrl',
      title: 'Original Article URL',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail / Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Traditional Chinese', value: 'zh-hant' },
        ],
      },
      initialValue: 'en',
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Article Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
      description: 'Replaces the legacy titleChinese field',
    }),
    defineField({
      name: 'summary_zh',
      title: 'Summary (Chinese)',
      type: 'text',
      rows: 5,
      fieldset: 'chinese',
    }),

    // Legacy field — kept for backward compatibility
    defineField({
      name: 'titleChinese',
      title: 'Chinese Title (Legacy)',
      type: 'string',
      description: 'Deprecated — use title_zh instead',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Publish Date (newest)',
      name: 'dateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publication',
      media: 'thumbnailImage',
    },
  },
})
