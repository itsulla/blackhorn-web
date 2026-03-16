import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
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
      title: 'Page Title',
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
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Page Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'content_zh',
      title: 'Page Content (Chinese)',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'chinese',
    }),
  ],
})
