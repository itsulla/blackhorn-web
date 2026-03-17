'use client'

import { useState, FormEvent } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const initialData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialData)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function validate(): string | null {
    if (!form.firstName.trim()) return 'First name is required.'
    if (!form.lastName.trim()) return 'Last name is required.'
    if (!form.email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
    if (!form.message.trim()) return 'Message is required.'
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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 h-12 w-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
          <span className="text-emerald-400 text-lg">&#10003;</span>
        </div>
        <h3 className="font-serif text-2xl font-light text-light">
          Thank You
        </h3>
        <p className="mt-3 max-w-sm font-sans text-sm font-light text-muted">
          Your message has been sent. Our team will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="First Name"
          value={form.firstName}
          onChange={(v) => update('firstName', v)}
          required
        />
        <Field
          label="Last Name"
          value={form.lastName}
          onChange={(v) => update('lastName', v)}
          required
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update('email', v)}
          required
        />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update('phone', v)}
        />
      </div>
      <Field
        label="Message"
        value={form.message}
        onChange={(v) => update('message', v)}
        textarea
        required
      />

      {errorMsg && (
        <p className="font-sans text-sm text-red-400">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  textarea = false,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  textarea?: boolean
  required?: boolean
}) {
  const inputClasses =
    'mt-2 w-full border border-gold/8 bg-dark-card px-4 py-3 font-sans text-sm font-light text-light outline-none transition-colors duration-300 placeholder:text-muted/30 focus:border-gold/30'

  return (
    <div>
      <label className="font-sans text-xs uppercase tracking-wide text-gold">
        {label}
        {required && <span className="ml-0.5 text-gold/50">*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}
    </div>
  )
}
