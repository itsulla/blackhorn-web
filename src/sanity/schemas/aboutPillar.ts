import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPillar',
  title: 'About Pillar',
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
      title: 'Pillar Title',
      type: 'string',
      description: 'e.g. "Our Expertise", "Our Philosophy"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'string',
      description: 'Page this pillar links to, e.g. "/about/our-vision" or "/awards"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug — must match the page route (e.g. "our-expertise", "partnerships")',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the pillar appears (1-6)',
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Short intro text shown below the title in the hero section',
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full page content — headings, paragraphs, lists, etc.',
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'title_zh',
      title: 'Pillar Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'description_zh',
      title: 'Description (Chinese)',
      type: 'text',
      rows: 4,
      fieldset: 'chinese',
    }),
    defineField({
      name: 'subtitle_zh',
      title: 'Hero Subtitle (Chinese)',
      type: 'text',
      rows: 3,
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
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: title || 'Untitled Pillar',
        subtitle: order ? `Order: ${order}` : undefined,
      }
    },
  },
})
