import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
      title: 'Event Title',
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
      name: 'date',
      title: 'Event Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Venue / Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'title', type: 'string', title: 'Title / Company' },
            {
              name: 'photo',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'title', media: 'photo' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaEmail',
      title: 'CTA Email',
      type: 'string',
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Event Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'description_zh',
      title: 'Description (Chinese)',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'chinese',
    }),
    defineField({
      name: 'ctaText_zh',
      title: 'CTA Button Text (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
  ],
  orderings: [
    {
      title: 'Date (newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
