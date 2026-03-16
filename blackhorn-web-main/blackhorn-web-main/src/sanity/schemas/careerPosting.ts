import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'careerPosting',
  title: 'Career Posting',
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
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Wealth Management', value: 'wealth-management' },
          { title: 'Investment Advisory', value: 'investment-advisory' },
          { title: 'Family Office', value: 'family-office' },
          { title: 'Operations', value: 'operations' },
          { title: 'Compliance', value: 'compliance' },
          { title: 'Marketing', value: 'marketing' },
        ],
      },
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time', value: 'full-time' },
          { title: 'Part-Time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      initialValue: 'full-time',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Hong Kong',
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of job requirements (one per line)',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of benefits (one per line)',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'careers@blackhorngrp.com',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'closingDate',
      title: 'Closing Date',
      type: 'datetime',
      description: 'Optional — leave blank if open-ended',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),

    // Chinese fields
    defineField({
      name: 'title_zh',
      title: 'Job Title (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'description_zh',
      title: 'Job Description (Chinese)',
      type: 'array',
      fieldset: 'chinese',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'requirements_zh',
      title: 'Requirements (Chinese)',
      type: 'array',
      fieldset: 'chinese',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits_zh',
      title: 'Benefits (Chinese)',
      type: 'array',
      fieldset: 'chinese',
      of: [{ type: 'string' }],
    }),
  ],
  orderings: [
    {
      title: 'Publish Date (Newest)',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      status: 'status',
    },
    prepare({ title, department, status }) {
      const statusLabel =
        status === 'open' ? '🟢 Open' : status === 'closed' ? '🔴 Closed' : '📝 Draft'
      return {
        title,
        subtitle: `${statusLabel} — ${department || 'No department'}`,
      }
    },
  },
})
