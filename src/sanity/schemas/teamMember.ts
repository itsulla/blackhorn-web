import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Co-Founder & CEO", "Managing Director"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Management Team', value: 'management' },
          { title: 'Advisory Board', value: 'advisory' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isInvestmentCommittee',
      title: 'Investment Committee Member',
      type: 'boolean',
      initialValue: false,
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'name_zh',
      title: 'Name (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'role_zh',
      title: 'Role / Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'bio_zh',
      title: 'Biography (Chinese)',
      type: 'text',
      rows: 8,
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
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
