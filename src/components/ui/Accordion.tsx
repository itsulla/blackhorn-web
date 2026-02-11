'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface AccordionItem {
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  /** If true, first item starts expanded */
  defaultOpen?: number
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="divide-y divide-gold/8 border-y border-gold/8">
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            onClick={() => toggle(i)}
            className="group flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:text-gold"
          >
            <h3 className="font-serif text-lg font-light text-light transition-colors duration-300 group-hover:text-gold">
              {item.title}
            </h3>
            <motion.svg
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3, ease }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 text-gold/50"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden"
              >
                <p className="pb-6 font-sans text-sm font-light leading-[1.85] text-muted">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
