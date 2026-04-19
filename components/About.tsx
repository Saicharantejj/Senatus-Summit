'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 200, suffix: '+', label: 'Expected Delegates' },
  { value: 6,   suffix: '',  label: 'Committees' },
  { value: 2,   suffix: '',  label: 'Days of Debate' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: 'easeOut' },
})

function StatCard({ value, suffix, label, inView }: typeof stats[0] & { inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 60
    const id = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(id) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(id)
  }, [inView, value])

  return (
    <div className="card rounded-xl p-6 md:p-10 flex flex-col items-center text-center relative overflow-hidden group">
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c5f5d08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="font-cinzel font-bold text-3xl md:text-5xl gradient-text-accent mb-2 tracking-wider relative z-10">
        {count}{suffix}
      </div>
      <div className="font-inter text-[9px] text-[#475569] font-bold tracking-[0.2em] uppercase relative z-10">{label}</div>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const paragraphs = [
    'The Senatus Summit is a premier Model United Nations conference that convenes the brightest young minds in debate, diplomacy, and critical thinking. Inspired by the legacy of reasoned discourse, we carry that tradition into the most pressing conversations of our era.',
    'Over two intensive days, delegates immerse themselves in high-stakes committee sessions, representing nations and institutions on issues that shape our world. From conflict zones to financial systems — the Summit challenges you to think deeper.',
  ]

  return (
    <section id="about" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0d1117]">
      {/* Background glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-[#2c5f5d] opacity-[0.04] top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-24">
          <div className="section-label mb-10">About the Summit</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gradient-text">Shaping Tomorrow&apos;s</span><br />
            <span className="text-[#1c232b]">Diplomats</span>
          </h2>
        </motion.div>

        {/* Text */}
        <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-24 mb-20 md:mb-32">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp(i * 0.2)}
              className="font-inter text-[#94a3b8] text-sm md:text-base leading-relaxed font-medium"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Tags */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-32">
          {['Debate & Resolution', 'Diplomacy', 'Crisis Simulations', 'Global Affairs'].map((tag) => (
            <span
              key={tag}
              className="font-inter text-[8px] font-bold px-5 py-2.5 rounded-full border border-[#1c232b] text-[#475569] tracking-[0.2em] uppercase bg-[#0d1117] hover:border-[#2c5f5d] hover:text-[#5a8a8a] transition-colors duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)}>
              <StatCard {...s} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
