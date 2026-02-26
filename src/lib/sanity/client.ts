import { createClient } from '@sanity/client'
import { sanityConfig } from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
})

// Write client for migration only — never expose token to frontend
export const sanityWriteClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
