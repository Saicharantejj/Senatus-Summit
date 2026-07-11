'use client'

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import { X, ArrowRight, ChevronDown } from 'lucide-react'

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
    topic: 'Ensuring protection of women and girls in conflict and post-conflict regions, with special emphasis on Afghanistan and Gaza',
    category: 'Gender & Rights',
    color: '#7a5a8a',
    description:
      'Women and girls face unique dangers in war-torn regions like Afghanistan and Gaza, where their rights, safety, and basic freedoms are severely threatened. This committee will address these urgent issues, focusing on how the international community can provide safety, guarantee access to education and healthcare, and protect women from violence during and after conflicts.',
  },
  {
    abbr: 'AIPPM',
    name: 'All India Political Parties Meet',
    topic: 'Analyzing the tension between majoritarian political narratives and the constitutional principle of secularism in India',
    category: 'National Politics',
    color: '#8a6a2c',
    description:
      "India is constitutionally defined as a secular nation where all religions are treated equally. However, the rise of political movements that focus on the desires of the religious majority has sparked a fierce debate about the country's identity. In this committee, you will represent a real-world Indian politician and debate whether secularism can survive alongside majority-focused politics, and what this means for India's future.",
  },
  {
    abbr: 'UNHRC',
    name: 'UN Human Rights Council',
    topic: 'Addressing violations of international humanitarian law in ongoing armed conflicts with special emphasis on civilian protection',
    category: 'Human Rights',
    color: '#8a2c2c',
    description:
      "Even during wars, there are strict international laws designed to protect innocent people. Unfortunately, these laws are frequently broken in today's conflicts. This committee will focus on how to hold nations and groups accountable when they harm civilians, block aid, or target hospitals, and search for real ways to enforce human rights in active conflict zones.",
  },
  {
    abbr: 'UNGA',
    name: 'UN General Assembly',
    topic: 'Deliberation on the Implications of De-dollarization and the Evolving Architecture of Global Reserve Currencies in Ensuring Equitable and Stable International Financial Systems',
    category: 'Global Finance',
    color: '#2c5f5d',
    description:
      'For decades, the US Dollar has been the main currency used for global trade. Now, many countries are trying to move away from using the dollar (called de-dollarization) by using digital currencies or local options instead. This committee will explore how shifting away from the dollar affects international trade, and how to create a fairer, more stable global financial system for every nation.',
  },
  {
    abbr: 'IP',
    name: 'International Press',
    topic: 'Photography, journalism, caricature',
    category: 'Media & Press',
    color: '#4a6a8a',
    description:
      'Unlike other committees that represent countries and draft laws, the International Press is here to document the entire summit. As a member of the press, you will act as a real-world journalist, photographer, or cartoonist. Your job is to visit other committees, interview delegates, capture key moments, and publish articles or draw caricatures that shape how the story of the Senatus Summit is told.',
  },
  {
    abbr: 'FIA',
    name: 'Fédération Internationale de l\'Automobile',
    topic: 'Assessing Regulatory Overreach: The 2026 Active Aerodynamics and Power Unit Overhaul',
    category: 'Sports Governance',
    color: '#6a4a2a',
    description:
      'In 2026, Formula 1 has introduced complex new rules for engines and moving wing parts (active aerodynamics). However, top team bosses are furious: they believe the front wing aero system is too complicated and dangerous, and accuse Mercedes of abusing loopholes in the new engine design. This committee will debate where the sport\'s governing body (FIA) should draw the line between fair rules and controlling the teams too much, following the critical March 15, 2026 pre-season testing freeze.',
  },
]

function CommitteeCard({
  committee,
  index,
  expanded,
  onToggle,
  onClose,
}: {
  committee: Committee
  index: number
  expanded: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: expanded ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={!expanded ? { y: -4 } : undefined}
      onClick={() => !expanded && onToggle()}
      className={`relative rounded-2xl border overflow-hidden ${
        expanded ? 'sm:col-span-2 lg:col-span-3 cursor-default' : 'cursor-pointer'
      }`}
      style={{ borderColor: `${committee.color}${expanded ? '50' : '25'}`, background: '#0d1117' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${committee.color}, transparent)`,
          opacity: expanded ? 0.95 : 0.35,
        }}
      />

      {/* Background glow */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{ background: committee.color, opacity: expanded ? 0.16 : 0.06 }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {!expanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 p-8 flex flex-col gap-6 min-h-[300px]"
          >
            <div className="flex items-start justify-between">
              <span
                className="font-cinzel font-black text-3xl tracking-tighter"
                style={{ color: committee.color }}
              >
                {committee.abbr}
              </span>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className="font-inter text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
                  style={{
                    color: committee.color,
                    borderColor: `${committee.color}40`,
                    background: `${committee.color}10`,
                  }}
                >
                  {committee.category}
                </span>
                {(committee.abbr === 'UNCSW' || committee.abbr === 'FIA') && (
                  <span
                    className="font-inter text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: '#ef4444',
                      borderColor: '#ef444440',
                      background: '#ef444410',
                    }}
                  >
                    {committee.abbr === 'UNCSW' ? 'Filled & Closed' : 'Closed'}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-cinzel font-black text-[15px] text-[#e5e7eb] leading-snug mb-4 tracking-tight">
                {committee.name}
              </h3>
              <div className="w-10 h-px" style={{ background: `${committee.color}60` }} />
            </div>

            <div className="p-4 rounded-xl bg-[#080b10]/60 border border-[#1c232b]/50 mt-auto">
              <p className="font-inter text-[8px] text-[#475569] font-black tracking-[0.3em] uppercase mb-2">
                Agenda Topic
              </p>
              <p className="font-inter text-[13px] text-[#94a3b8] leading-[1.4] font-bold line-clamp-3">
                {committee.topic}
              </p>
            </div>

            {/* "Click to expand" hint */}
            <div className="flex items-center justify-between pt-1">
              <span
                className="font-inter text-[9px] font-black tracking-[0.25em] uppercase flex items-center gap-2"
                style={{ color: committee.color }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: committee.color }}
                />
                Tap to Open
              </span>
              <ChevronDown
                size={16}
                style={{ color: committee.color }}
                className="opacity-70"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="relative z-10 p-8 md:p-12 lg:p-16"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-5 right-5 md:top-7 md:right-7 p-2.5 rounded-full border border-[#1c232b] text-[#475569] hover:text-[#e5e7eb] hover:border-[#2c5f5d] hover:bg-[#0e2020] transition-all duration-300 z-20"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {/* Left column - identifier block */}
              <div className="md:col-span-1 flex flex-col gap-5">
                <span
                  className="font-cinzel font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-none"
                  style={{ color: committee.color }}
                >
                  {committee.abbr}
                </span>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="font-inter text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border self-start"
                    style={{
                      color: committee.color,
                      borderColor: `${committee.color}40`,
                      background: `${committee.color}10`,
                    }}
                  >
                    {committee.category}
                  </span>
                  {(committee.abbr === 'UNCSW' || committee.abbr === 'FIA') && (
                    <span
                      className="font-inter text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border self-start"
                      style={{
                        color: '#ef4444',
                        borderColor: '#ef444440',
                        background: '#ef444410',
                      }}
                    >
                      {committee.abbr === 'UNCSW' ? 'Filled & Closed' : 'Closed'}
                    </span>
                  )}
                </div>
                <h3 className="font-cinzel font-bold text-lg md:text-xl text-[#e5e7eb] leading-snug">
                  {committee.name}
                </h3>
                <div
                  className="w-16 h-px mt-2"
                  style={{ background: `${committee.color}80` }}
                />
              </div>

              {/* Right column - content */}
              <div className="md:col-span-2 flex flex-col gap-8">
                {/* Agenda Topic */}
                <div>
                  <p
                    className="font-inter text-[9px] font-black tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
                    style={{ color: committee.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: committee.color }}
                    />
                    Agenda Topic
                  </p>
                  <p className="font-cinzel font-bold text-lg md:text-xl lg:text-2xl text-[#e5e7eb] leading-snug">
                    {committee.topic}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(90deg, ${committee.color}50, transparent)`,
                  }}
                />

                {/* Executive Brief */}
                <div>
                  <p
                    className="font-inter text-[9px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2"
                    style={{ color: committee.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: committee.color }}
                    />
                    Executive Brief
                  </p>
                  <p className="font-inter text-[14px] md:text-[15px] text-[#94a3b8] leading-relaxed font-medium">
                    {committee.description}
                  </p>
                </div>

                {/* CTA */}
                {committee.abbr === 'UNCSW' || committee.abbr === 'FIA' ? (
                  <div
                    className="self-start font-inter font-black text-[11px] tracking-[0.25em] uppercase px-8 py-4 rounded-xl inline-flex items-center gap-3 border mt-2 opacity-50 cursor-not-allowed"
                    style={{
                      background: '#1a1010',
                      borderColor: '#ef444450',
                      color: '#ef4444',
                    }}
                  >
                    Applications Closed
                  </div>
                ) : (
                  <Link
                    href="/apply"
                    onClick={(e) => e.stopPropagation()}
                    className="self-start font-inter font-black text-[11px] tracking-[0.25em] uppercase px-8 py-4 rounded-xl inline-flex items-center gap-3 border transition-all duration-300 hover:brightness-110 mt-2"
                    style={{
                      background: `${committee.color}20`,
                      borderColor: `${committee.color}60`,
                      color: committee.color,
                      boxShadow: `0 0 24px -4px ${committee.color}50`,
                    }}
                  >
                    Apply for this Committee
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Committees() {
  const [expandedAbbr, setExpandedAbbr] = useState<string | null>(null)

  return (
    <section
      id="committees"
      className="relative py-32 md:py-56 px-4 sm:px-6 border-t border-[#1c232b] bg-[#080b10]"
    >
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
            <span className="gradient-text">Choose Your</span>
            <br />
            <span className="text-[#1c232b] drop-shadow-[0_0_2px_rgba(44,95,93,0.3)]">
              Committee
            </span>
          </h2>
          <p className="font-inter text-[#475569] mt-10 max-w-xl text-xs leading-relaxed font-black uppercase tracking-[0.3em] opacity-80">
            Six specialized committees. Tap any card to dive in.
          </p>
        </motion.div>

        <LayoutGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {committees.map((c, i) => (
              <CommitteeCard
                key={c.abbr}
                committee={c}
                index={i}
                expanded={expandedAbbr === c.abbr}
                onToggle={() => setExpandedAbbr(c.abbr)}
                onClose={() => setExpandedAbbr(null)}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
