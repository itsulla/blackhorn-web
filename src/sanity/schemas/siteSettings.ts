import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
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
      name: 'companyName',
      title: 'Company Legal Name',
      type: 'string',
      initialValue: 'Blackhorn Wealth Management Limited',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+852 2709 1388',
    }),
    defineField({
      name: 'email',
      title: 'General Email',
      type: 'string',
      initialValue: 'info@blackhorngrp.com',
    }),
    defineField({
      name: 'careersEmail',
      title: 'Careers Email',
      type: 'string',
      initialValue: 'careers@blackhorngrp.com',
    }),
    defineField({
      name: 'complianceEmail',
      title: 'Compliance Email',
      type: 'string',
      initialValue: 'compliance@blackhorngrp.com',
    }),
    defineField({
      name: 'compliancePhone',
      title: 'Compliance Hotline',
      type: 'string',
      initialValue: '+852 2709 1568',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sfcLicense',
      title: 'SFC License Number',
      type: 'string',
      initialValue: 'BNM924',
    }),
    defineField({
      name: 'sfcTypes',
      title: 'SFC License Types',
      type: 'string',
      initialValue: 'Type 4 & Type 9',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Homepage Hero Heading',
      type: 'string',
      initialValue: 'Intelligent Solutions Beyond Simple Wealth Management',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Homepage Hero Subtext',
      type: 'string',
      initialValue: 'Independent Wealth Management',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'trustBarStats',
      title: 'Trust Bar Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'e.g. "20+"',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'e.g. "Years Experience"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'disclaimerText',
      title: 'Top Bar Disclaimer Text',
      type: 'string',
    }),
    defineField({
      name: 'fraudNoticeText',
      title: 'Fraud Notice Full Text',
      type: 'text',
      rows: 10,
    }),

    // ── Chinese translations ──────────────────────────────────────────
    defineField({
      name: 'companyName_zh',
      title: 'Company Name (Chinese)',
      type: 'string',
      initialValue: '晉羚財富管理有限公司',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'heroHeading_zh',
      title: 'Homepage Hero Heading (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'heroSubtext_zh',
      title: 'Homepage Hero Subtext (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'missionStatement_zh',
      title: 'Mission Statement (Chinese)',
      type: 'text',
      rows: 4,
      fieldset: 'chinese',
    }),
    defineField({
      name: 'disclaimerText_zh',
      title: 'Top Bar Disclaimer Text (Chinese)',
      type: 'string',
      fieldset: 'chinese',
    }),
    defineField({
      name: 'fraudNoticeText_zh',
      title: 'Fraud Notice Full Text (Chinese)',
      type: 'text',
      rows: 10,
      fieldset: 'chinese',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
