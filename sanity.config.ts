import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'blackhorn',
  title: 'Blackhorn Website',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings as singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Content types
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('pressArticle').title('Press & Media'),
            S.documentTypeListItem('award').title('Awards'),
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
