'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        width: 'clamp(60px, 16vw, 80px)',
        height: 'clamp(60px, 16vw, 80px)',
        borderRadius: 'clamp(16px, 4vw, 22px)',
        background: 'linear-gradient(160deg, #1a232d 0%, #111820 100%)',
        border: '1px solid #1c232b',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <div className="font-cinzel font-semibold text-xl sm:text-2xl md:text-3xl text-[#dedad4] leading-none mb-1">
        {String(value).padStart(2, '0')}
      </div>
      <div className="font-inter text-[7px] sm:text-[8px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#484440]">
        {label}
      </div>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: 'easeOut' },
})

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-07-11T09:00:00')
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0d12]">
      {/* Muted Border Accents */}
      <div className="absolute inset-x-0 top-[20%] h-px bg-[#1c232b]/50" />
      <div className="absolute inset-x-0 bottom-[20%] h-px bg-[#1c232b]/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20 max-w-5xl mx-auto w-full">

        <motion.div {...fadeUp(0.1)} className="section-label mb-12">
          Model United Nations &nbsp;·&nbsp; 2026
        </motion.div>

        <motion.div {...fadeUp(0.25)} className="mb-10">
          <h1 className="font-cinzel font-bold text-[11vw] sm:text-[10vw] md:text-[80px] lg:text-[92px] leading-[0.9] tracking-[0.05em] text-[#e5e7eb]">
            THE<br />
            <span className="tracking-[0.04em] sm:tracking-[0.10em] md:tracking-[0.16em]">SENATUS SUMMIT</span>
          </h1>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="w-24 h-px bg-[#1c232b] my-8" />

        <motion.p {...fadeUp(0.5)} className="font-inter font-semibold text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#475569] mb-4">
          Where Debate Meets Diplomacy
        </motion.p>

        <motion.div {...fadeUp(0.6)} className="font-inter text-[11px] font-bold tracking-[0.25em] text-[#2c5f5d] mb-16 uppercase">
          11 // 12 &nbsp;July&nbsp; 2026
        </motion.div>

        {/* Countdown — Muted Cards */}
        <motion.div {...fadeUp(0.75)} className="flex items-center gap-2 sm:gap-4 mb-16 sm:mb-20">
          <CountdownBox value={timeLeft.days}    label="Days"  />
          <span className="font-inter text-lg text-[#1c232b] pb-4">:</span>
          <CountdownBox value={timeLeft.hours}   label="Hours" />
          <span className="font-inter text-lg text-[#1c232b] pb-4">:</span>
          <CountdownBox value={timeLeft.minutes} label="Mins"  />
          <span className="font-inter text-lg text-[#1c232b] pb-4">:</span>
          <CountdownBox value={timeLeft.seconds} label="Secs"  />
        </motion.div>

        {/* CTAs — Minimal */}
        <motion.div {...fadeUp(0.9)} className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/apply"
            className="btn-primary font-inter font-bold tracking-[0.2em] uppercase px-12 py-4 rounded text-[9px] w-full sm:w-auto text-center"
          >
            Apply as Delegate
          </Link>
          <Link
            href="/committees"
            className="btn-outline font-inter font-bold tracking-[0.2em] uppercase px-12 py-4 rounded text-[9px] w-full sm:w-auto text-center"
          >
            Explore Committees
          </Link>
        </motion.div>
      </div>

    </section>
  )
}
