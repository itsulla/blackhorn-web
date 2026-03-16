import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json()
    const { firstName, lastName, email, phone, message } = body

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Blackhorn Website <noreply@blackhorngrp.com>',
      to: 'info@blackhorngrp.com',
      subject: `Website Enquiry from ${firstName.trim()} ${lastName.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #C9A96E; padding-bottom: 12px;">
            New Website Enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 140px;">Name</td>
              <td style="padding: 8px 12px;">${firstName.trim()} ${lastName.trim()}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            ${phone?.trim() ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Phone</td>
              <td style="padding: 8px 12px;">${phone.trim()}</td>
            </tr>
            ` : ''}
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; white-space: pre-wrap;">${message.trim()}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the Blackhorn Wealth Management website contact form.
          </p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
