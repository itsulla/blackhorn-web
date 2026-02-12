import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
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
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
