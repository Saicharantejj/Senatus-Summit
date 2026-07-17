'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'About',        href: '/about' },
  { label: 'Venue',        href: '/venue' },
  { label: 'Committees',   href: '/committees' },
  { label: 'Timeline',     href: '/timeline' },
  { label: 'Contact',      href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-[#1c232b]/60 bg-[#080b10]/95 py-[7px]">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-12 font-inter text-[8px] font-bold tracking-[0.22em] uppercase">
              <span className="text-[#ef4444]">●</span>
              <span className="text-[#ef4444] mx-3">UNCSW (FILLED) & FIA CLOSED</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">Applications Open for other committees</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#2c5f5d] mx-3">Senatus Summit 2026</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">August 1–2</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">Where Debate Meets Diplomacy</span>
            </span>
          ))}
        </div>
      </div>

      <motion.nav
        className={`fixed top-[31px] left-0 right-0 z-40 transition-all duration-700 ${
          scrolled
            ? 'bg-[#080b10]/80 backdrop-blur-2xl border-b border-[#1c232b] py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[56px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-[-10px] rounded-full bg-[#2c5f5d] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-110" />
              <Image
                src="/logo.png"
                alt="The Senatus Summit"
                width={42}
                height={42}
                className="rounded-full relative z-10 transition-transform duration-500 group-hover:rotate-[5deg]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-[11px] tracking-[0.25em] text-[#e5e7eb] hidden sm:block group-hover:text-white transition-colors duration-300">
                SENATUS SUMMIT
              </span>
              <span className="font-inter text-[8px] tracking-[0.15em] text-[#2c5f5d] font-bold hidden sm:block uppercase opacity-80">2026 Edition</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 relative pb-1 ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-[#475569] hover:text-[#94a3b8]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #2c5f5d, transparent)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-5">
            {/* Live badge */}
            <Link
              href="/apply"
              className="hidden sm:flex items-center gap-2 font-inter text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#2c5f5d]/30 bg-[#0e1a1a] text-[#3d8a87] hover:border-[#2c5f5d]/60 hover:text-[#5aafab] transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c5f5d] animate-pulse shadow-[0_0_6px_#2c5f5d]" />
              Applications Open
            </Link>
            <Link
              href="/apply"
              className="hidden md:block btn-primary font-inter font-bold tracking-[0.15em] text-[10px] px-6 py-3 rounded-full uppercase"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#475569] hover:text-[#e5e7eb] transition-all duration-300 p-2 rounded-xl border border-[#1c232b] hover:border-[#2c5f5d]/50 bg-[#0d1117]/50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-[#080b10]/95 backdrop-blur-3xl border-b border-[#1c232b]"
            >
              <div className="px-6 py-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-inter text-sm font-bold tracking-[0.12em] uppercase py-4 flex items-center justify-between border-b border-[#1c232b]/30 last:border-0 transition-colors ${
                        isActive(link.href) ? 'text-white' : 'text-[#475569] hover:text-[#94a3b8]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#2c5f5d] shadow-[0_0_10px_#2c5f5d]" />}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/apply"
                    className="btn-primary font-inter font-bold text-sm tracking-[0.15em] px-5 py-4 rounded-xl mt-6 text-center uppercase"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
