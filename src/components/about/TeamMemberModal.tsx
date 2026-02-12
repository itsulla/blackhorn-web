'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export interface TeamMember {
  name: string
  title: string
  image?: string
  blurDataURL?: string
  initials: string
  bio: string[]
  education?: string
}

interface TeamMemberModalProps {
  member: TeamMember | null
  onClose: () => void
}

export default function TeamMemberModal({
  member,
  onClose,
}: TeamMemberModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [member, handleKeyDown])

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[60] bg-dark/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease }}
            className="fixed bottom-0 right-0 top-0 z-[70] w-full overflow-y-auto border-l border-gold/10 bg-dark sm:w-[520px]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-muted transition-colors duration-300 hover:text-gold"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="px-10 pb-16 pt-10">
              {/* Image / Initials */}
              <div className="mb-8">
                {member.image ? (
                  <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden border-[0.5px] border-gold/12">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                      {...(member.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: member.blurDataURL } : {})}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] w-full max-w-[280px] items-center justify-center border-[0.5px] border-gold/12 bg-dark-card">
                    <span className="font-serif text-5xl font-light text-gold/30">
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <h2 className="font-serif text-3xl font-light text-light">
                {member.name}
              </h2>
              <p className="mt-2 font-sans text-sm uppercase tracking-widest text-gold">
                {member.title}
              </p>

              {/* Divider */}
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />

              {/* Bio */}
              <div className="mt-6 space-y-4">
                {member.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans text-sm font-light leading-[1.85] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Education */}
              {member.education && (
                <div className="mt-8 border-t border-gold/8 pt-6">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold/60">
                    Education
                  </p>
                  <p className="mt-2 font-sans text-sm font-light text-muted">
                    {member.education}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
