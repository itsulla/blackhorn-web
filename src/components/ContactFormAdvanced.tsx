'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

interface AdvancedFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  existingClient: string
  investorType: string
  servicesOfInterest: string[]
  investmentAmount: string
  referralSource: string
  message: string
}

const initialData: AdvancedFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  existingClient: '',
  investorType: '',
  servicesOfInterest: [],
  investmentAmount: '',
  referralSource: '',
  message: '',
}

const investorTypes = [
  'Individual',
  'Family Office',
  'Institutional',
  'Financial Advisor',
  'Other',
]

const serviceOptions = [
  'Portfolio Management',
  'Family Office',
  'Deal Sourcing',
  'Legacy Planning',
  'Real Estate & Financing',
  'Other',
]

const investmentAmounts = [
  'Below USD 1M',
  'USD 1M – 5M',
  'USD 5M – 20M',
  'USD 20M – 50M',
  'Above USD 50M',
  'Prefer not to say',
]

const referralSources = [
  'Referral',
  'Search Engine',
  'Press / Media',
  'Event',
  'Social Media',
  'Other',
]

export default function ContactFormAdvanced() {
  const [form, setForm] = useState<AdvancedFormData>(initialData)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function validate(): string | null {
    if (!form.firstName.trim()) return 'First name is required.'
    if (!form.lastName.trim()) return 'Last name is required.'
    if (!form.email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email.'
    if (!form.existingClient) return 'Please indicate if you are an existing client.'
    if (!form.message.trim()) return 'Message is required.'
    if (form.message.trim().length < 20)
      return 'Please provide a message of at least 20 characters.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const validationError = validate()
    if (validationError) {
      setErrorMsg(validationError)
      return
    }

    setStatus('loading')

    // Build structured message body
    const parts: string[] = []
    parts.push(`--- Contact Form Submission ---`)
    parts.push(`Name: ${form.firstName} ${form.lastName}`)
    parts.push(`Email: ${form.email}`)
    if (form.phone) parts.push(`Phone: ${form.phone}`)
    if (form.company) parts.push(`Company: ${form.company}`)
    parts.push(`Existing Client: ${form.existingClient}`)
    if (form.investorType) parts.push(`Investor Type: ${form.investorType}`)
    if (form.servicesOfInterest.length > 0)
      parts.push(`Services of Interest: ${form.servicesOfInterest.join(', ')}`)
    if (form.investmentAmount)
      parts.push(`Investment Amount: ${form.investmentAmount}`)
    if (form.referralSource)
      parts.push(`Referral Source: ${form.referralSource}`)
    parts.push(``)
    parts.push(`--- Message ---`)
    parts.push(form.message)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: parts.join('\n'),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.message || 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  function update<K extends keyof AdvancedFormData>(
    field: K,
    value: AdvancedFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleService(service: string) {
    setForm((prev) => ({
      ...prev,
      servicesOfInterest: prev.servicesOfInterest.includes(service)
        ? prev.servicesOfInterest.filter((s) => s !== service)
        : [...prev.servicesOfInterest, service],
    }))
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <span className="text-xl text-emerald-500">&#10003;</span>
        </div>
        <h3 className="font-serif text-2xl font-light text-light-text">
          Thank You
        </h3>
        <p className="mt-3 max-w-sm font-sans text-sm font-light text-light-text-secondary">
          A member of our team will be in touch within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Section 1 — About You */}
      <div>
        <h3 className="font-serif text-xl font-light text-light-text">
          About You
        </h3>
        <p className="mt-1 font-sans text-sm text-light-text-secondary">
          Tell us a bit about yourself so we can connect you with the right advisor.
        </p>
        <Separator />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="First Name"
              value={form.firstName}
              onChange={(v) => update('firstName', v)}
              required
            />
            <InputField
              label="Last Name"
              value={form.lastName}
              onChange={(v) => update('lastName', v)}
              required
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update('email', v)}
              required
            />
            <InputField
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(v) => update('phone', v)}
            />
          </div>
          <InputField
            label="Company / Organization"
            value={form.company}
            onChange={(v) => update('company', v)}
          />
        </div>
      </div>

      {/* Section 2 — Your Interest */}
      <div>
        <h3 className="font-serif text-xl font-light text-light-text">
          Your Interest
        </h3>
        <p className="mt-1 font-sans text-sm text-light-text-secondary">
          Help us understand your needs so we can prepare for our conversation.
        </p>
        <Separator />

        <div className="space-y-6">
          {/* Existing client */}
          <div>
            <label className="font-sans text-xs uppercase tracking-wide text-gold-dark">
              Are you an existing client?
              <span className="ml-0.5 text-gold-dark/50">*</span>
            </label>
            <div className="mt-3 flex gap-4">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update('existingClient', opt)}
                  className={`border px-6 py-2.5 font-sans text-sm transition-all duration-300 ${
                    form.existingClient === opt
                      ? 'border-gold bg-gold/10 text-gold-dark'
                      : 'border-light-border text-light-text-secondary hover:border-gold/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Investor type */}
          <SelectField
            label="Investor Type"
            value={form.investorType}
            onChange={(v) => update('investorType', v)}
            options={investorTypes}
          />

          {/* Services of interest */}
          <div>
            <label className="font-sans text-xs uppercase tracking-wide text-gold-dark">
              Services of Interest
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`border px-4 py-2.5 text-left font-sans text-sm transition-all duration-300 ${
                    form.servicesOfInterest.includes(service)
                      ? 'border-gold bg-gold/10 text-gold-dark'
                      : 'border-light-border text-light-text-secondary hover:border-gold/40'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Investment amount */}
          <SelectField
            label="Investment Amount"
            value={form.investmentAmount}
            onChange={(v) => update('investmentAmount', v)}
            options={investmentAmounts}
          />
        </div>
      </div>

      {/* Section 3 — Your Message */}
      <div>
        <h3 className="font-serif text-xl font-light text-light-text">
          Your Message
        </h3>
        <p className="mt-1 font-sans text-sm text-light-text-secondary">
          Share any additional details that will help us prepare for our consultation.
        </p>
        <Separator />

        <div className="space-y-5">
          <SelectField
            label="How did you hear about us?"
            value={form.referralSource}
            onChange={(v) => update('referralSource', v)}
            options={referralSources}
          />

          <div>
            <label className="font-sans text-xs uppercase tracking-wide text-gold-dark">
              Message
              <span className="ml-0.5 text-gold-dark/50">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={5}
              className="mt-2 w-full resize-none border border-light-border bg-white px-4 py-3 font-sans text-sm font-light text-light-text outline-none transition-colors duration-300 placeholder:text-light-text-secondary/40 focus:border-gold focus:ring-1 focus:ring-gold/20"
              placeholder="Tell us about your goals and how we can help..."
            />
          </div>
        </div>
      </div>

      {/* Section 4 — Submit */}
      <div>
        {errorMsg && (
          <p className="mb-4 font-sans text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center bg-gold px-10 py-3.5 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
        </button>

        <p className="mt-4 font-sans text-xs leading-relaxed text-light-text-secondary/60">
          By submitting this form, you agree to our{' '}
          <Link
            href="/terms-and-conditions"
            className="text-gold-dark/60 underline transition-colors hover:text-gold-dark"
          >
            Terms &amp; Conditions
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="text-gold-dark/60 underline transition-colors hover:text-gold-dark"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Separator() {
  return (
    <div className="my-5 flex items-center justify-start">
      <div className="h-[0.5px] w-8 bg-gold-dark/30" />
    </div>
  )
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="font-sans text-xs uppercase tracking-wide text-gold-dark">
        {label}
        {required && <span className="ml-0.5 text-gold-dark/50">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-light-border bg-white px-4 py-3 font-sans text-sm font-light text-light-text outline-none transition-colors duration-300 placeholder:text-light-text-secondary/40 focus:border-gold focus:ring-1 focus:ring-gold/20"
      />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div>
      <label className="font-sans text-xs uppercase tracking-wide text-gold-dark">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-light-border bg-white px-4 py-3 font-sans text-sm font-light text-light-text outline-none transition-colors duration-300 focus:border-gold focus:ring-1 focus:ring-gold/20"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
