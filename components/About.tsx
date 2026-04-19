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
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out expo for a smoother finish
      const easeProgress = 1 - Math.pow(2, -10 * progress)

      const currentCount = Math.floor(easeProgress * value)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value])

  return (
    <div className="card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden group">
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c5f5d15] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
      <div className="font-cinzel font-black text-4xl md:text-6xl gradient-text-accent mb-3 tracking-tighter relative z-10">
        {count}{suffix}
      </div>
      <div className="font-inter text-[10px] text-[#475569] font-black tracking-[0.25em] uppercase relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">{label}</div>
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
    <section id="about" className="relative py-32 md:py-56 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0d1117]">
      {/* Background decoration */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.06] top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-28">
          <div className="section-label mb-12">About the Summit</div>
          <h2 className="font-cinzel font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            <span className="gradient-text">Built for the Bold.</span><br />
            <span className="text-[#1c232b] drop-shadow-[0_0_2px_rgba(44,95,93,0.3)]">Made for Leaders.</span>
          </h2>
        </motion.div>

        {/* Text */}
        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-32 mb-24 md:mb-40">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-inter text-[#94a3b8] text-base md:text-lg leading-relaxed font-medium opacity-90"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-32 md:mb-48"
        >
          {['Debate & Resolution', 'Diplomacy', 'Crisis Simulations', 'Global Affairs'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="font-inter text-[9px] font-black px-6 py-3 rounded-full border border-[#1c232b] text-[#475569] tracking-[0.25em] uppercase bg-[#080b10]/50 hover:border-[#2c5f5d] hover:text-[#52a19e] hover:shadow-[0_0_20px_rgba(44,95,93,0.1)] transition-all duration-500 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatCard {...s} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
