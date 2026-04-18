'use client'

import { motion } from 'framer-motion'
import { Mail, Instagram, Twitter, Linkedin, Globe } from 'lucide-react'

const socials = [
  { icon: Instagram, label: 'Instagram', handle: '@thesenatussummit', href: '#' },
  { icon: Twitter,   label: 'Twitter / X', handle: '@SenatSummit',    href: '#' },
  { icon: Linkedin,  label: 'LinkedIn',  handle: 'Senatus Summit',    href: '#' },
  { icon: Globe,     label: 'Website',   handle: 'senatussummit.org', href: '#' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-40 px-4 sm:px-6 border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto">

        <motion.div {...fadeUp(0)} className="mb-14">
          <div className="section-label mb-6">Contact</div>
          <h2 className="font-cinzel font-semibold text-3xl md:text-4xl lg:text-5xl text-[#dedad4] leading-tight">
            Get In Touch
          </h2>
          <p className="font-inter text-[#555] mt-4 max-w-md text-sm leading-relaxed">
            Have questions about the summit, committees, or your application? We&apos;re here to help.
          </p>
        </motion.div>

        {/* Email */}
        <motion.a
          href="mailto:thesenatussummit@gmail.com"
          {...fadeUp(0.1)}
          className="flex items-center gap-5 card rounded-xl p-6 mb-4 group"
        >
          <div className="w-10 h-10 rounded border border-[#1e3232] bg-[#0e1a1a] flex items-center justify-center shrink-0 group-hover:border-[#2a4242] transition-colors">
            <Mail className="text-[#5a8a8a]" size={18} />
          </div>
          <div>
            <div className="font-inter text-[9px] font-semibold tracking-[0.18em] uppercase text-[#444] mb-0.5">Primary Contact</div>
            <div className="font-cinzel font-medium text-base text-[#c0bdb8] group-hover:text-[#dedad4] transition-colors">
              thesenatussummit@gmail.com
            </div>
          </div>
        </motion.a>

        {/* Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              {...fadeUp(0.08 * (i + 1))}
              className="card rounded-xl p-5 flex flex-col items-center gap-2.5 text-center group"
            >
              <s.icon className="text-[#444] group-hover:text-[#5a8a8a] transition-colors" size={18} />
              <div className="font-inter text-[10px] font-semibold text-[#484440] tracking-[0.1em] uppercase">{s.label}</div>
              <div className="font-inter text-[11px] text-[#333]">{s.handle}</div>
            </motion.a>
          ))}
        </div>

        <motion.p {...fadeUp(0.5)} className="font-inter text-[11px] text-[#333] mt-10 tracking-wide">
          We typically respond within 24–48 hours on working days.
        </motion.p>
      </div>
    </section>
  )
}
