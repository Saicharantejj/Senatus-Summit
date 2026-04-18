'use client'

import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'About',      href: '/about' },
  { label: 'Committees', href: '/committees' },
  { label: 'Timeline',   href: '/timeline' },
  { label: 'Apply',      href: '/apply' },
  { label: 'Contact',    href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0d12] border-t border-[#1c232b] py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-8">

          {/* Logo — Muted */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/logo.png"
              alt="The Senatus Summit"
              width={44}
              height={44}
              className="rounded-full transition-opacity duration-300 group-hover:opacity-90"
            />
            <div className="text-left">
              <div className="font-cinzel font-bold text-[10px] tracking-[0.25em] text-[#e5e7eb] uppercase">
                SENATUS SUMMIT
              </div>
              <div className="font-inter text-[8px] font-bold tracking-[0.1em] text-[#475569] uppercase mt-1">
                July 11–12, 2026 Edition
              </div>
            </div>
          </Link>

          {/* Nav — Professional */}
          <nav className="flex flex-wrap items-center justify-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-[9px] font-bold tracking-[0.15em] uppercase text-[#475569] hover:text-[#e5e7eb] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:thesenatussummit@gmail.com"
            className="font-inter text-[9px] font-bold text-[#475569] hover:text-[#2c5f5d] transition-all tracking-[0.1em] border-b border-[#1c232b] pb-1"
          >
            thesenatussummit@gmail.com
          </a>
        </div>

        <div className="w-full h-px bg-[#1c232b] my-10 md:my-16" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="font-inter text-[8px] font-bold text-[#475569] tracking-wider uppercase">
            © 2026 The Senatus Summit. All rights reserved.
          </p>
          <div className="divider-ornament font-cinzel text-[8px] tracking-[0.3em] text-[#1c232b] whitespace-nowrap">
            WHERE DEBATE MEETS DIPLOMACY
          </div>
          <p className="font-inter text-[8px] font-bold text-[#475569] tracking-wider uppercase">
            Built for Diplomatic Excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}
