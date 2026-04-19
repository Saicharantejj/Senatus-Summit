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
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      className="perspective-card w-full cursor-pointer"
      style={{ height: 'clamp(260px, 40vw, 310px)' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border p-7 flex flex-col justify-between overflow-hidden"
          style={{
            background: '#111720',
            borderColor: `${committee.color}30`,
          }}
        >
          {/* Top glow accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, ${committee.color}, transparent)` }}
          />
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
            style={{ background: committee.color }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <span
                className="font-cinzel font-bold text-2xl tracking-wider"
                style={{ color: committee.color }}
              >
                {committee.abbr}
              </span>
              <span
                className="font-inter text-[7px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border"
                style={{
                  color: committee.color,
                  borderColor: `${committee.color}40`,
                  background: `${committee.color}10`,
                }}
              >
                {committee.category}
              </span>
            </div>
            <h3 className="font-cinzel font-bold text-[13px] text-[#e5e7eb] leading-snug mb-4 tracking-wide">
              {committee.name}
            </h3>
            <div className="w-8 h-px" style={{ background: `${committee.color}60` }} />
          </div>

          <div className="relative z-10">
            <p className="font-inter text-[7px] text-[#475569] font-bold tracking-[0.25em] uppercase mb-1.5">Agenda Topic</p>
            <p className="font-inter text-[12px] text-[#94a3b8] leading-snug font-medium line-clamp-2">{committee.topic}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl border p-7 flex flex-col justify-between overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #0d1117, ${committee.color}18)`,
            borderColor: `${committee.color}40`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, ${committee.color}, transparent)` }}
          />
          <div className="relative z-10">
            <p className="font-inter text-[7px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: committee.color }}>
              Executive Brief
            </p>
            <p className="font-inter text-[12px] text-[#94a3b8] leading-relaxed">{committee.description}</p>
          </div>
          <Link
            href="/apply"
            onClick={(e) => e.stopPropagation()}
            className="font-inter font-bold text-[8px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-lg self-start mt-6 inline-block border transition-all duration-200 hover:opacity-90"
            style={{
              background: `${committee.color}20`,
              borderColor: `${committee.color}50`,
              color: committee.color,
            }}
          >
            Apply for this Committee →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Committees() {
  return (
    <section id="committees" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#080b10]">
      {/* Background glow */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div {...fadeUp(0)} className="mb-24">
          <div className="section-label mb-10">2026 Committees</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gradient-text">Choose Your</span><br />
            <span className="text-[#1c232b]">Arena</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-lg text-[11px] leading-relaxed font-bold uppercase tracking-[0.2em]">
            Six specialized committees. Hover to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((c, i) => (
            <CommitteeCard key={c.abbr} committee={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
