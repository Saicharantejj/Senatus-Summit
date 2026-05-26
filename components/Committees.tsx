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
    topic: 'Protection of Women in Active Conflict Zones — Afghanistan & Gaza',
    category: 'Gender & Rights',
    color: '#7a5a8a',
    description:
      "The UN's principal body on gender policy meets to confront one of the most urgent questions of our era: how do we protect women trapped in war when international law keeps failing them? Delegates representing UN member states will tackle Taliban-era Afghanistan and the Gaza crisis head-on — drafting binding frameworks on accountability, humanitarian access, and reparations. Expect intense moral debate, contested evidence, and resolutions that demand more than symbolism.",
  },
  {
    abbr: 'AIPPM',
    name: 'All India Political Parties Meet',
    topic: 'Majoritarian Narratives & the Future of Indian Secularism',
    category: 'National Politics',
    color: '#8a6a2c',
    description:
      "AIPPM is the most politically charged simulation on the docket — a closed-door deliberation where India's leading parties hash out the country's future. You won't represent a country; you'll represent a real Indian politician (Modi, Rahul Gandhi, Owaisi, Mamata Banerjee, and more) and defend their stance on whether India's secular constitution can survive the rise of majoritarian politics. Expect heated cross-questioning, no formal procedure, and the chaotic energy of Indian parliament itself.",
  },
  {
    abbr: 'UNHRC',
    name: 'UN Human Rights Council',
    topic: 'Violations of International Humanitarian Law in Armed Conflicts',
    category: 'Human Rights',
    color: '#8a2c2c',
    description:
      "The UNHRC is the world's primary forum for accountability when wars break the rules. Delegates dissect grave breaches of international humanitarian law — disproportionate force, attacks on civilians and aid workers, the targeting of medical facilities — across today's active conflicts. You'll wrestle with the Geneva Conventions in practice, debate whether universal jurisdiction has teeth, and confront the gap between what international law promises and what it actually delivers. Be ready to argue with both moral clarity and political realism.",
  },
  {
    abbr: 'UNGA',
    name: 'UN General Assembly',
    topic: 'Reimagining the Global Reserve Currency & Financial Architecture',
    category: 'Global Finance',
    color: '#2c5f5d',
    description:
      "The UNGA brings every member state under one roof — making it the largest, most procedurally rigorous, and most diplomatically diverse committee at the Summit. The agenda: rewrite the global financial order. With the US dollar's dominance challenged by BRICS de-dollarization, the rise of CBDCs and stablecoins, and the Global South demanding fairer representation at the IMF and World Bank, delegates must negotiate a new monetary architecture for a multipolar world. Bloc politics, technical economics, and high-stakes diplomacy — all in one room.",
  },
  {
    abbr: 'IP',
    name: 'International Press',
    topic: 'Photography · Journalism · Editorial Cartoons — Be the Press',
    category: 'Media & Press',
    color: '#4a6a8a',
    description:
      "The International Press is the rebel committee — no flags, no portfolios, no resolutions. Instead, you're a working journalist with full access to every committee in session. Photographers capture the moments that define the Summit. Reporters file articles on bloc dynamics, breaking crises, and delegate quotes. Caricaturists skewer the room with editorial cartoons. By the closing ceremony, your bylines, lenses, and pens shape the historical record of Senatus '26 — because the story of this Summit will be the one you tell.",
  },
  {
    abbr: 'FIA',
    name: 'Fédération Internationale de l\'Automobile',
    topic: 'Regulatory Overreach: The 2026 Active Aero & Power Unit Crisis',
    category: 'Sports Governance',
    color: '#6a4a2a',
    description:
      "The FIA governs world motorsport — and in 2026, it's under siege. Following Formula 1's most controversial regulation overhaul in a decade, team principals from Mercedes, Red Bull, Ferrari, and McLaren have openly attacked the new active front-wing aerodynamics and power unit rules, alleging selective enforcement and exploited loopholes. Convening after the March 15 development freeze, delegates representing teams, drivers, sponsors, and FIA officials must decide where sporting oversight ends and regulatory overreach begins. Engineering, politics, and hundreds of millions in dev budgets — all on the table.",
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
