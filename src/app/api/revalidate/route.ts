import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation webhook for Sanity.
 *
 * Set up in Sanity → Manage → API → Webhooks:
 *   URL:      https://www.blackhorngrp.com/api/revalidate
 *   Trigger:  Create, Update, Delete
 *   Filter:   (leave blank for all document types)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const tag = body._type // Sanity sends the document type

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    return NextResponse.json({ revalidated: false })
  } catch {
    return NextResponse.json({ revalidated: false, error: 'Invalid payload' }, { status: 400 })
  }
}
