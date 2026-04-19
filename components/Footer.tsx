'use client'

import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'About',      href: '/about' },
  { label: 'Committees', href: '/committees' },
  { label: 'Timeline',   href: '/timeline' },
  { label: 'Apply',      href: '/apply' },
  { label: 'Contact',    href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#080b10] border-t border-[#1c232b] overflow-hidden">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #2c5f5d 30%, #2c5f5d 70%, transparent 100%)' }} />

      {/* Background glows */}
      <div className="glow-orb w-[500px] h-[500px] bg-[#2c5f5d] opacity-[0.03] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#2c5f5d] opacity-0 group-hover:opacity-20 blur-md transition-all duration-300 scale-150" />
                <Image
                  src="/logo.png"
                  alt="The Senatus Summit"
                  width={44}
                  height={44}
                  className="rounded-full relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel font-bold text-[10px] tracking-[0.25em] text-[#e5e7eb] uppercase group-hover:text-white transition-colors">
                  SENATUS SUMMIT
                </span>
                <span className="font-inter text-[7px] tracking-[0.12em] text-[#2c5f5d] uppercase">
                  2026 Edition
                </span>
              </div>
            </Link>
            <p className="font-inter text-[11px] text-[#475569] leading-relaxed max-w-[220px]">
              A premier Model United Nations conference for the brightest young minds in debate and diplomacy.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c5f5d]" />
              <span className="font-inter text-[8px] font-bold tracking-[0.2em] text-[#2c5f5d] uppercase">July 11–12, 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="font-cinzel font-bold text-[9px] tracking-[0.3em] text-[#475569] uppercase">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-[11px] font-medium tracking-[0.08em] text-[#475569] hover:text-[#94a3b8] transition-colors duration-200 w-fit group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-[#2c5f5d] group-hover:w-3 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="font-cinzel font-bold text-[9px] tracking-[0.3em] text-[#475569] uppercase">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:thesenatussummit@gmail.com"
                className="font-inter text-[11px] text-[#475569] hover:text-[#2c5f5d] transition-colors duration-200 tracking-wide group flex items-center gap-2"
              >
                <svg className="w-3 h-3 shrink-0 text-[#2c5f5d]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                thesenatussummit@gmail.com
              </a>
              <a
                href="https://instagram.com/the.senatus.summit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[11px] text-[#475569] hover:text-[#2c5f5d] transition-colors duration-200 tracking-wide flex items-center gap-2"
              >
                <svg className="w-3 h-3 shrink-0 text-[#2c5f5d]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @the.senatus.summit
              </a>
            </div>

            <Link
              href="/apply"
              className="btn-primary font-inter font-semibold tracking-[0.12em] text-[9px] px-5 py-2.5 rounded-lg mt-2 w-fit"
            >
              Apply Now →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#1c232b] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[8px] font-medium text-[#2a3340] tracking-wider uppercase">
            © 2026 The Senatus Summit. All rights reserved.
          </p>
          <div className="font-cinzel text-[7px] tracking-[0.35em] text-[#1c2a1a] uppercase whitespace-nowrap">
            ✦ &nbsp; Where Debate Meets Diplomacy &nbsp; ✦
          </div>
          <p className="font-inter text-[8px] font-medium text-[#2a3340] tracking-wider uppercase">
            Built for Diplomatic Excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}
