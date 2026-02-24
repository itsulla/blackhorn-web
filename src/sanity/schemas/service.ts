import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
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
      title: 'Title',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'For homepage cards and previews',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Character',
      type: 'string',
      description: 'Unicode character used as icon, e.g. "◇", "◈", "▽"',
    }),
    defineField({
      name: 'content',
      title: 'Full Page Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Bullet Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'shortDescription_zh',
      title: 'Short Description (Chinese)',
      type: 'text',
      rows: 3,
      fieldset: 'chinese',
    }),
    defineField({
      name: 'content_zh',
      title: 'Full Page Content (Chinese)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      fieldset: 'chinese',
    }),
    defineField({
      name: 'features_zh',
      title: 'Key Features (Chinese)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
      fieldset: 'chinese',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
