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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      {/* Announcement bar — Muted */}
      <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-[#1c232b] bg-[#0a0d12] py-[8px]">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-16 font-inter text-[8px] font-bold tracking-[0.2em] text-[#475569] uppercase">
              Applications Now Open &nbsp;·&nbsp; Seats Filling Fast — Apply Now &nbsp;·&nbsp; Senatus Summit 2026 &nbsp;·&nbsp; July 11–12 &nbsp;·&nbsp; Unità Internazionale &nbsp;·&nbsp; Where Debate Meets Diplomacy
            </span>
          ))}
        </div>
      </div>

      <motion.nav
        className={`fixed top-[32px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0f141a] border-b border-[#1c232b] py-2' : 'bg-transparent py-4'
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[52px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="The Senatus Summit"
              width={44}
              height={44}
              className="rounded-full transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-[10px] tracking-[0.2em] text-[#e5e7eb] group-hover:text-white transition-colors duration-200 hidden sm:block">
                SENATUS SUMMIT
              </span>
              <span className="font-inter text-[7px] tracking-[0.1em] text-[#475569] hidden sm:block uppercase">2026 EDITION</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 relative ${
                  isActive(link.href)
                    ? 'text-[#dedad4]'
                    : 'text-[#555] hover:text-[#dedad4]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#5a8a8a]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="hidden md:block btn-primary font-inter font-medium tracking-[0.1em] text-[11px] px-5 py-2 rounded-md"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#555] hover:text-[#dedad4] transition-colors p-1"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#0d0d0d] border-b border-[#1a1a1a]"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-inter text-sm font-medium tracking-[0.1em] uppercase py-2.5 border-b border-[#141414] last:border-0 transition-colors ${
                      isActive(link.href) ? 'text-[#dedad4]' : 'text-[#555]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/apply"
                  className="btn-primary font-inter font-medium text-sm tracking-[0.1em] px-5 py-3 rounded-md mt-3 text-center"
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
