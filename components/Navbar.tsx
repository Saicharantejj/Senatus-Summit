'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'About',      href: '/about' },
  { label: 'Committees', href: '/committees' },
  { label: 'Timeline',   href: '/timeline' },
  { label: 'Contact',    href: '/contact' },
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
              <span className="text-[#2c5f5d]">●</span>
              <span className="text-[#475569] mx-3">Applications Now Open</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">Seats Filling Fast — Apply Now</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#2c5f5d] mx-3">Senatus Summit 2026</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">July 11–12</span>
              <span className="text-[#1c232b]">·</span>
              <span className="text-[#475569] mx-3">Where Debate Meets Diplomacy</span>
            </span>
          ))}
        </div>
      </div>

      <motion.nav
        className={`fixed top-[31px] left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080b10]/80 backdrop-blur-xl border-b border-[#1c232b]/60 py-2 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[52px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#2c5f5d] opacity-0 group-hover:opacity-20 blur-md transition-all duration-300 scale-150" />
              <Image
                src="/logo.png"
                alt="The Senatus Summit"
                width={40}
                height={40}
                className="rounded-full relative z-10 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-[10px] tracking-[0.22em] text-[#e5e7eb] hidden sm:block group-hover:text-white transition-colors">
                SENATUS SUMMIT
              </span>
              <span className="font-inter text-[7px] tracking-[0.12em] text-[#2c5f5d] hidden sm:block uppercase">2026 Edition</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-200 relative pb-0.5 ${
                  isActive(link.href)
                    ? 'text-[#e5e7eb]'
                    : 'text-[#475569] hover:text-[#94a3b8]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #2c5f5d, transparent)' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="hidden md:block btn-primary font-inter font-semibold tracking-[0.12em] text-[10px] px-5 py-2.5 rounded-lg"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#475569] hover:text-[#e5e7eb] transition-colors p-1.5 rounded-lg border border-[#1c232b] hover:border-[#2c5f5d]"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#080b10]/95 backdrop-blur-xl border-b border-[#1c232b]/60"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-inter text-sm font-medium tracking-[0.1em] uppercase py-3 flex items-center gap-3 border-b border-[#1c232b]/50 last:border-0 transition-colors ${
                        isActive(link.href) ? 'text-[#e5e7eb]' : 'text-[#475569] hover:text-[#94a3b8]'
                      }`}
                    >
                      {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#2c5f5d]" />}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/apply"
                  className="btn-primary font-inter font-semibold text-sm tracking-[0.1em] px-5 py-3 rounded-lg mt-3 text-center"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
