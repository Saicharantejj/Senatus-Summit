'use client'

import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

const phones = [
  {
    name: 'Saicharan Tej',
    role: 'Co-Founder & Secretary General',
    number: '+91 79752 98131',
    href: 'tel:+917975298131',
  },
  {
    name: 'Rishika Singh',
    role: 'Co-Founder',
    number: '+91 82875 18294',
    href: 'tel:+918287518294',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function ContactCard({
  href,
  icon,
  label,
  title,
  subtitle,
  delay = 0,
  accentColor = '#2c5f5d',
}: {
  href: string
  icon: React.ReactNode
  label: string
  title: string
  subtitle?: string
  delay?: number
  accentColor?: string
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...fadeUp(delay)}
      className="group relative flex items-center gap-5 rounded-xl border p-6 overflow-hidden transition-all duration-300"
      style={{
        background: '#0d1117',
        borderColor: '#1c232b',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = `${accentColor}40`
        el.style.background = `linear-gradient(135deg, #0d1117, ${accentColor}0a)`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#1c232b'
        el.style.background = '#0d1117'
      }}
    >
      {/* Top gradient line on hover — done via CSS in the parent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Icon box */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300"
        style={{
          background: `${accentColor}10`,
          borderColor: `${accentColor}25`,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="font-inter text-[8px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: accentColor }}>
          {label}
        </div>
        <div className="font-cinzel font-bold text-[13px] text-[#94a3b8] group-hover:text-[#e5e7eb] transition-colors duration-200 truncate">
          {title}
        </div>
        {subtitle && (
          <div className="font-inter text-[10px] text-[#2a3340] mt-0.5">{subtitle}</div>
        )}
      </div>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-[#1c232b] group-hover:text-[#2c5f5d] group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0d1117]">
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] bg-[#2c5f5d] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <div className="section-label mb-10">Contact</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gradient-text">Get In</span><br />
            <span className="text-[#1c232b]">Touch</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-sm text-[11px] leading-relaxed font-bold uppercase tracking-[0.18em]">
            Questions about the summit, committees, or your application?
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-3">

          {/* Email */}
          <ContactCard
            href="mailto:thesenatussummit@gmail.com"
            label="Email"
            title="thesenatussummit@gmail.com"
            delay={0.1}
            accentColor="#2c5f5d"
            icon={<Mail size={18} style={{ color: '#2c5f5d' }} />}
          />

          {/* Instagram */}
          <ContactCard
            href="https://instagram.com/the.senatus.summit"
            label="Instagram"
            title="@the.senatus.summit"
            delay={0.18}
            accentColor="#7a5a8a"
            icon={
              <svg className="w-[18px] h-[18px]" fill="#7a5a8a" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            }
          />

          {/* Phone numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {phones.map((p, i) => (
              <ContactCard
                key={p.name}
                href={p.href}
                label={p.role}
                title={p.name}
                subtitle={p.number}
                delay={0.25 + i * 0.08}
                accentColor="#4a6a8a"
                icon={<Phone size={16} style={{ color: '#4a6a8a' }} />}
              />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-12 rounded-xl border border-[#1c232b] p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d1117, #0e1a1a)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2c5f5d, transparent)' }} />
          <p className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-[#2c5f5d] mb-3">Ready to compete?</p>
          <h3 className="font-cinzel font-bold text-xl text-[#e5e7eb] mb-6">Apply for Senatus Summit 2026</h3>
          <a
            href="/apply"
            className="btn-primary font-inter font-bold tracking-[0.15em] uppercase px-8 py-3 rounded-lg text-[9px] inline-block"
          >
            Submit Application →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
