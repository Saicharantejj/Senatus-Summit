'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
        background: 'linear-gradient(160deg, #131c26 0%, #0d1117 100%)',
        border: '1px solid #1c232b',
        boxShadow: '0 0 20px rgba(44,95,93,0.15), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
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

const ROLLING_WORDS = ['Debaters', 'Leaders', 'Thinkers']

function RollingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % ROLLING_WORDS.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-flex items-center overflow-hidden" style={{ verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%',   opacity: 1 }}
          exit={{   y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-[#2c5f5d]"
        >
          {ROLLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: 'easeOut' },
})

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const target = new Date('2026-08-01T09:00:00')
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
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-[#080b10]">
      {/* Background Layers */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] mask-radial-faded" />

      {/* Parallax Orbs */}
      <motion.div
        className="glow-orb w-[800px] h-[800px] bg-[#2c5f5d] opacity-[0.12] top-[-200px] left-1/2"
        animate={{
          x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth : 1440) / 2) * 0.02 - 400,
          y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight : 900) / 2) * 0.02,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 200 }}
      />
      <motion.div
        className="glow-orb w-[500px] h-[500px] bg-[#3d7d7b] opacity-[0.08] bottom-[-100px] left-[-100px]"
        animate={{
          x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth : 1440) / 2) * -0.03,
          y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight : 900) / 2) * -0.03,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 200 }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute inset-x-0 top-[25%] h-px shimmer-line opacity-40" />
      <div className="absolute inset-x-0 bottom-[25%] h-px shimmer-line opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20 max-w-6xl mx-auto w-full">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span
            className="font-inter text-[9px] font-black tracking-[0.3em] uppercase px-5 py-2 rounded-full border inline-block"
            style={{
              color: '#94a3b8',
              borderColor: '#1c232b',
              background: 'linear-gradient(135deg, #0d1117, #111720)',
              letterSpacing: '0.28em',
            }}
          >
            you are <span style={{ color: '#2c5f5d' }}>not</span> ready for this
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="font-cinzel font-black text-[12vw] sm:text-[10vw] md:text-[90px] lg:text-[110px] leading-[0.85] tracking-[0.08em] perspective-1000">
            <motion.span
              initial={{ opacity: 0, rotateX: -45 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="gradient-text block mb-4"
            >
              THE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, rotateX: -45 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="gradient-text tracking-[0.05em] sm:tracking-[0.12em] md:tracking-[0.18em] block drop-shadow-2xl"
            >
              SENATUS SUMMIT
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          {...fadeUp(0.9)}
          className="w-48 h-px shimmer-line my-10"
        />

        <motion.p
          {...fadeUp(1.0)}
          className="font-inter font-bold text-[11px] md:text-xs tracking-[0.5em] uppercase text-[#475569] mb-6 opacity-80"
        >
          Where Debate Meets Diplomacy
        </motion.p>

        <motion.div
          {...fadeUp(1.1)}
          className="font-cinzel font-bold text-xl md:text-3xl text-[#f0f2f5] mb-4 h-10 md:h-12 flex items-center gap-3"
        >
          <span className="text-[#475569]">Shaping Tomorrow&apos;s</span>
          <RollingWord />
        </motion.div>

        <motion.div
          {...fadeUp(1.2)}
          className="font-inter text-[12px] font-black tracking-[0.3em] text-[#52a19e] mb-20 uppercase"
        >
          1 // 2 &nbsp;August&nbsp; 2026
        </motion.div>

        {/* Countdown — Enhanced Cards */}
        <motion.div
          {...fadeUp(1.4)}
          className="flex items-center gap-3 sm:gap-6 mb-20 sm:mb-24 scale-110 sm:scale-125"
        >
          <CountdownBox value={timeLeft.days}    label="Days"  />
          <span className="font-inter text-2xl text-[#1c232b] pb-6 font-light opacity-50">:</span>
          <CountdownBox value={timeLeft.hours}   label="Hours" />
          <span className="font-inter text-2xl text-[#1c232b] pb-6 font-light opacity-50">:</span>
          <CountdownBox value={timeLeft.minutes} label="Mins"  />
          <span className="font-inter text-2xl text-[#1c232b] pb-6 font-light opacity-50">:</span>
          <CountdownBox value={timeLeft.seconds} label="Secs"  />
        </motion.div>

        {/* CTAs — Premium Buttons */}
        <motion.div {...fadeUp(1.6)} className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto">
          <Link
            href="/apply"
            className="btn-primary font-inter font-black tracking-[0.25em] uppercase px-16 py-5 rounded-full text-[10px] w-full sm:w-auto text-center shadow-lg shadow-[#2c5f5d]/20"
          >
            Apply as Delegate
          </Link>
          <Link
            href="/committees"
            className="btn-outline font-inter font-black tracking-[0.25em] uppercase px-16 py-5 rounded-full text-[10px] w-full sm:w-auto text-center backdrop-blur-sm"
          >
            Explore Arena
          </Link>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '100px' }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-0 left-1/2 w-px bg-gradient-to-t from-[#2c5f5d] to-transparent opacity-40"
      />
    </section>
  )
}
