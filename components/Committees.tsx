'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Committee {
  abbr: string
  name: string
  topic: string
  category: string
  description: string
  color: string
}

const committees: Committee[] = [
  {
    abbr: 'UNCSW',
    name: 'UN Commission on the Status of Women',
    topic: 'Protection of Women in Conflict Zones',
    category: 'Gender & Rights',
    color: '#7a5a8a',
    description:
      'Examining the systemic exploitation and violence faced by women in active conflict regions, with a focus on Afghanistan and Gaza. Delegates will draft binding frameworks for accountability and relief.',
  },
  {
    abbr: 'AIPPM',
    name: 'All India Political Parties Meet',
    topic: 'Majoritarian Narratives & Secularism in India',
    category: 'National Politics',
    color: '#8a6a2c',
    description:
      "A high-stakes deliberation on the rising tide of majoritarianism and its impact on India's secular constitutional fabric. Delegates represent India's major political parties.",
  },
  {
    abbr: 'UNHRC',
    name: 'UN Human Rights Council',
    topic: 'Violations of Humanitarian Law in Armed Conflicts',
    category: 'Human Rights',
    color: '#8a2c2c',
    description:
      'Addressing grave breaches of international humanitarian law in ongoing armed conflicts. Delegates examine accountability mechanisms, civilian protection, and the enforcement of the Geneva Conventions.',
  },
  {
    abbr: 'UNGA',
    name: 'UN General Assembly',
    topic: 'Global Reserve Architecture & Financial Systems',
    category: 'Global Finance',
    color: '#2c5f5d',
    description:
      'Reimagining the global reserve currency framework and international monetary architecture. Topics include de-dollarization, digital currencies, and equitable representation in global finance.',
  },
  {
    abbr: 'IP',
    name: 'International Press',
    topic: 'Photography · Journalism · Caricature',
    category: 'Media & Press',
    color: '#4a6a8a',
    description:
      'A unique committee where delegates become the press. Cover committee proceedings through investigative journalism, photography, editorial cartoons, and live reporting. The pen is your gavel.',
  },
  {
    abbr: 'FIA',
    name: 'Fédération Internationale de l\'Automobile',
    topic: 'Assessing Regulatory Overreach: The 2026 Active Aerodynamics and Power Unit Overhaul',
    category: 'Sports Governance',
    color: '#6a4a2a',
    description:
      'Following the pre-season testing backlash from team principals questioning the overly complex front-wheel active aero system and Mercedes\' potential exploitation of power unit loopholes, delegates convene post the March 15, 2026 freeze date to deliberate on the limits of regulatory authority in international motorsport.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function CommitteeCard({ committee, index }: { committee: Committee; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border overflow-hidden cursor-pointer group"
      style={{ borderColor: `${committee.color}25`, background: '#0d1117' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(v => !v)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${committee.color}, transparent)`,
          opacity: hovered ? 0.9 : 0.35,
        }}
      />

      {/* Background glow */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl transition-opacity duration-700"
        style={{ background: committee.color, opacity: hovered ? 0.12 : 0.06 }}
      />

      {/* ── Front content (always visible, fades out on hover) ── */}
      <div
        className="relative z-10 p-8 flex flex-col gap-6 transition-all duration-500"
        style={{ opacity: hovered ? 0 : 1, transform: hovered ? 'translateY(-8px)' : 'translateY(0)' }}
      >
        <div className="flex items-start justify-between">
          <span className="font-cinzel font-black text-3xl tracking-tighter" style={{ color: committee.color }}>
            {committee.abbr}
          </span>
          <span
            className="font-inter text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
            style={{ color: committee.color, borderColor: `${committee.color}40`, background: `${committee.color}10` }}
          >
            {committee.category}
          </span>
        </div>

        <div>
          <h3 className="font-cinzel font-black text-[15px] text-[#e5e7eb] leading-snug mb-4 tracking-tight">
            {committee.name}
          </h3>
          <div className="w-10 h-px" style={{ background: `${committee.color}60` }} />
        </div>

        <div className="p-4 rounded-xl bg-[#080b10]/60 border border-[#1c232b]/50 mt-auto">
          <p className="font-inter text-[8px] text-[#475569] font-black tracking-[0.3em] uppercase mb-2">Agenda Topic</p>
          <p className="font-inter text-[13px] text-[#94a3b8] leading-[1.4] font-bold line-clamp-3">{committee.topic}</p>
        </div>
      </div>

      {/* ── Hover overlay (executive brief) ── */}
      <div
        className="absolute inset-0 z-20 p-8 flex flex-col justify-between transition-all duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          background: `linear-gradient(160deg, ${committee.color}18 0%, #0d1117 60%)`,
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <div>
          <p className="font-inter text-[9px] font-black tracking-[0.3em] uppercase mb-5 flex items-center gap-2" style={{ color: committee.color }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: committee.color }} />
            Executive Brief
          </p>
          <p className="font-inter text-[13px] text-[#94a3b8] leading-relaxed font-medium">{committee.description}</p>
        </div>
        <Link
          href="/apply"
          onClick={(e) => e.stopPropagation()}
          className="font-inter font-black text-[10px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-xl self-start inline-block border transition-all duration-300 hover:brightness-110"
          style={{
            background: `${committee.color}18`,
            borderColor: `${committee.color}55`,
            color: committee.color,
            boxShadow: `0 0 18px -4px ${committee.color}45`,
          }}
        >
          Apply for this Committee →
        </Link>
      </div>
    </motion.div>
  )
}

export default function Committees() {
  return (
    <section id="committees" className="relative py-32 md:py-56 px-4 sm:px-6 border-t border-[#1c232b] bg-[#080b10]">
      {/* Background decoration */}
      <div className="glow-orb w-[700px] h-[700px] bg-[#2c5f5d] opacity-[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-[0.10] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-28"
        >
          <div className="section-label mb-12">2026 Committees</div>
          <h2 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
            <span className="gradient-text">Choose Your</span><br />
            <span className="text-[#1c232b] drop-shadow-[0_0_2px_rgba(44,95,93,0.3)]">Committee</span>
          </h2>
          <p className="font-inter text-[#475569] mt-10 max-w-xl text-xs leading-relaxed font-black uppercase tracking-[0.3em] opacity-80">
            Six specialized committees. Represent. Debate. Lead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {committees.map((c, i) => (
            <CommitteeCard key={c.abbr} committee={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
