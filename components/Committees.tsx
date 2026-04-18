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
}

const committees: Committee[] = [
  {
    abbr: 'UNCSW',
    name: 'UN Commission on the Status of Women',
    topic: 'Protection of Women in Conflict Zones',
    category: 'Gender & Rights',
    description:
      'Examining the systemic exploitation and violence faced by women in active conflict regions, with a focus on Afghanistan and Gaza. Delegates will draft binding frameworks for accountability and relief.',
  },
  {
    abbr: 'AIPPM',
    name: 'All India Political Parties Meet',
    topic: 'Majoritarian Narratives & Secularism in India',
    category: 'National Politics',
    description:
      "A high-stakes deliberation on the rising tide of majoritarianism and its impact on India's secular constitutional fabric. Delegates represent India's major political parties.",
  },
  {
    abbr: 'UNHRC',
    name: 'UN Human Rights Council',
    topic: 'Violations of Humanitarian Law in Armed Conflicts',
    category: 'Human Rights',
    description:
      'Addressing grave breaches of international humanitarian law in ongoing armed conflicts. Delegates examine accountability mechanisms, civilian protection, and the enforcement of the Geneva Conventions.',
  },
  {
    abbr: 'UNGA',
    name: 'UN General Assembly',
    topic: 'Global Reserve Architecture & Financial Systems',
    category: 'Global Finance',
    description:
      'Reimagining the global reserve currency framework and international monetary architecture. Topics include de-dollarization, digital currencies, and equitable representation in global finance.',
  },
  {
    abbr: 'IP',
    name: 'International Press',
    topic: 'Photography · Journalism · Caricature',
    category: 'Media & Press',
    description:
      'A unique committee where delegates become the press. Cover committee proceedings through investigative journalism, photography, editorial cartoons, and live reporting. The pen is your gavel.',
  },
  {
    abbr: 'FIA',
    name: 'Fédération Internationale de l\'Automobile',
    topic: 'Assessing Regulatory Overreach: The 2026 Active Aerodynamics and Power Unit Overhaul',
    category: 'Sports Governance',
    description:
      'Following the pre-season testing backlash from team principals questioning the overly complex front-wheel active aero system and Mercedes\' potential exploitation of power unit loopholes, delegates convene post the March 15, 2026 freeze date to deliberate on the limits of regulatory authority in international motorsport.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function CommitteeCard({ committee, index }: { committee: Committee; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="perspective-card w-full cursor-pointer"
      style={{ height: 'clamp(260px, 40vw, 300px)' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Front — Flat & Professional */}
        <div className="absolute inset-0 backface-hidden card rounded p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-6">
              <span className="font-cinzel font-bold text-2xl text-[#2c5f5d]">
                {committee.abbr}
              </span>
              <span className="font-inter text-[7px] font-bold tracking-[0.2em] uppercase text-[#475569] border border-[#1c232b] px-2 py-1 bg-[#0a0d12]">
                {committee.category}
              </span>
            </div>
            <h3 className="font-cinzel font-bold text-[13px] text-[#e5e7eb] leading-snug mb-4 tracking-wide">
              {committee.name}
            </h3>
            <div className="w-8 h-px bg-[#1c232b]" />
          </div>

          <div>
            <p className="font-inter text-[7px] text-[#475569] font-bold tracking-[0.25em] uppercase mb-1.5">Agenda Topic</p>
            <p className="font-inter text-[12px] text-[#94a3b8] leading-snug font-medium line-clamp-2">{committee.topic}</p>
          </div>
        </div>

        {/* Back — Simplified */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded p-8 flex flex-col justify-between bg-[#0a0d12] border border-[#1c232b]">
          <div>
            <p className="font-inter text-[7px] font-bold tracking-[0.25em] uppercase text-[#2c5f5d] mb-4">
              Executive Brief
            </p>
            <p className="font-inter text-[12px] text-[#475569] leading-relaxed font-medium">{committee.description}</p>
          </div>
          <Link
            href="/apply"
            onClick={(e) => e.stopPropagation()}
            className="btn-primary font-inter font-bold text-[8px] tracking-[0.15em] uppercase px-5 py-2.5 rounded self-start mt-6 inline-block"
          >
            Submit Application
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Committees() {
  return (
    <section id="committees" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0a0d12]">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header — Professional */}
        <motion.div {...fadeUp(0)} className="mb-24">
          <div className="section-label mb-10">2026 Committees</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl text-[#e5e7eb] leading-tight">
            Choose Your<br />
            <span className="text-[#151c24]">Committees</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-lg text-sm leading-relaxed font-bold uppercase tracking-wider">
            Comprehensive agendas across six specialized simulations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {committees.map((c, i) => (
            <CommitteeCard key={c.abbr} committee={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
