'use client'

import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'About',        href: '/about' },
  { label: 'Venue',        href: '/venue' },
  { label: 'Committees',   href: '/committees' },
  { label: 'Timeline',     href: '/timeline' },
  { label: 'Apply',        href: '/apply' },
  { label: 'Terms',        href: '/terms' },
  { label: 'Contact',      href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#080b10] border-t border-[#1c232b] overflow-hidden">
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line opacity-50" />

      {/* Background decoration */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.04] bottom-[-300px] left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 dot-grid opacity-[0.08] [mask-image:linear-gradient(to_top,black,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">

          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4 group w-fit">
              <div className="relative">
                <div className="absolute inset-[-8px] rounded-full bg-[#2c5f5d] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-125" />
                <Image
                  src="/logo.png"
                  alt="The Senatus Summit"
                  width={48}
                  height={48}
                  className="rounded-full relative z-10 transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel font-black text-[12px] tracking-[0.3em] text-[#f0f2f5] uppercase group-hover:text-white transition-colors duration-300">
                  SENATUS SUMMIT
                </span>
                <span className="font-inter text-[9px] tracking-[0.15em] text-[#2c5f5d] font-black uppercase opacity-80">
                  2026 Edition
                </span>
              </div>
            </Link>
            <p className="font-inter text-[13px] text-[#475569] leading-relaxed max-w-sm font-medium">
              The premier arena for global discourse. Empowering the next generation of diplomats through high-stakes debate and critical thinking.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2c5f5d] animate-pulse shadow-[0_0_10px_#2c5f5d]" />
              <span className="font-inter text-[9px] font-black tracking-[0.3em] text-[#52a19e] uppercase">July 25–26, 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="font-cinzel font-black text-[10px] tracking-[0.4em] text-[#2c5f5d] uppercase border-b border-[#1c232b] pb-4">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-[12px] font-bold tracking-[0.1em] text-[#475569] hover:text-[#94a3b8] transition-all duration-300 w-fit group flex items-center gap-3"
                >
                  <span className="w-0 h-px bg-[#2c5f5d] group-hover:w-4 transition-all duration-500" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6">
            <h4 className="font-cinzel font-black text-[10px] tracking-[0.4em] text-[#2c5f5d] uppercase border-b border-[#1c232b] pb-4">Connect</h4>
            <div className="flex flex-col gap-5">
              <a
                href="mailto:thesenatussummit@gmail.com"
                className="font-inter text-[12px] font-bold text-[#475569] hover:text-[#52a19e] transition-colors duration-300 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#1c232b] flex items-center justify-center group-hover:border-[#2c5f5d]/50 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#2c5f5d]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                thesenatussummit@gmail.com
              </a>
              <a
                href="https://www.instagram.com/thesenatussummit/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[12px] font-bold text-[#475569] hover:text-[#52a19e] transition-colors duration-300 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#1c232b] flex items-center justify-center group-hover:border-[#2c5f5d]/50 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#2c5f5d]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                @thesenatussummit
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1c232b] to-transparent mb-10 opacity-50" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="font-inter text-[9px] font-black text-[#2a3340] tracking-[0.2em] uppercase">
            © 2026 The Senatus Summit. Global Excellence.
          </p>
          <div className="font-cinzel text-[8px] tracking-[0.4em] text-[#2c5f5d] font-black uppercase whitespace-nowrap hidden lg:block">
            ✦ &nbsp; Where Debate Meets Diplomacy &nbsp; ✦
          </div>
          <p className="font-inter text-[9px] font-black text-[#2a3340] tracking-[0.2em] uppercase">
            Sovereign & Strategic Discourse.
          </p>
        </div>
      </div>
    </footer>
  )
}
