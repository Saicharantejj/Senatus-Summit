'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  time: string
  title: string
  description: string
  highlight?: boolean
  type?: 'session' | 'break' | 'ceremony' | 'social'
}

const day1: TimelineEvent[] = [
  {
    time: '8:00 – 9:30 AM',
    title: 'Registration & Accreditation',
    description: 'Delegate check-in, credential verification, badge collection, and welcome kit distribution.',
    type: 'ceremony',
  },
  {
    time: '9:30 – 10:30 AM',
    title: 'Opening Ceremony',
    description: 'Inaugural address by the Secretary-General, keynote by Chief Guest, and formal induction of all delegates.',
    highlight: true,
    type: 'ceremony',
  },
  {
    time: '10:30 – 11:00 AM',
    title: 'Breakfast',
    description: 'Complimentary breakfast and informal networking with fellow delegates before committee sessions begin.',
    type: 'break',
  },
  {
    time: '11:00 AM – 1:00 PM',
    title: 'Committee Session I',
    description: 'Opening speeches, position paper presentations, and establishment of the speakers list and agenda.',
    highlight: true,
    type: 'session',
  },
  {
    time: '1:00 – 2:00 PM',
    title: 'Lunch Break',
    description: 'Structured lunch with inter-delegation networking. A great time to form alliances before the afternoon session.',
    type: 'break',
  },
  {
    time: '2:00 – 4:00 PM',
    title: 'Committee Session II',
    description: 'Moderated and unmoderated caucuses, bloc negotiations, and working paper drafting.',
    highlight: true,
    type: 'session',
  },
  {
    time: '4:00 – 6:00 PM',
    title: 'Addressing & Socials',
    description: 'Open floor addresses, cultural exchange, and an informal social hour for delegates to connect beyond the dais.',
    type: 'social',
  },
]

const day2: TimelineEvent[] = [
  {
    time: '9:00 – 9:30 AM',
    title: 'Delegate Arrival & Briefing',
    description: "Morning briefing on the day's agenda, crisis updates, and committee instructions from the dais.",
    type: 'ceremony',
  },
  {
    time: '9:30 – 11:30 AM',
    title: 'Committee Session III',
    description: 'Debate on draft resolutions, crisis simulation updates, and formal voting on amendments.',
    highlight: true,
    type: 'session',
  },
  {
    time: '11:30 AM – 12:00 PM',
    title: 'Tea Break',
    description: 'Short recess with refreshments. Final informal negotiations before closing sessions.',
    type: 'break',
  },
  {
    time: '12:00 – 1:30 PM',
    title: 'Final Committee Session',
    description: 'Formal voting procedures, passage of resolutions, closing statements from delegates.',
    highlight: true,
    type: 'session',
  },
  {
    time: '1:30 – 2:30 PM',
    title: 'Lunch',
    description: 'Celebratory lunch marking the conclusion of committee work.',
    type: 'break',
  },
  {
    time: '2:30 – 4:00 PM',
    title: 'Press Conference',
    description: 'The International Press committee presents investigative reports, editorial cartoons, and live coverage to all delegates.',
    type: 'social',
  },
  {
    time: '4:00 – 5:30 PM',
    title: 'Award Ceremony',
    description: 'Best Delegate, Outstanding Delegate, and Special Mention awards presented across all six committees.',
    highlight: true,
    type: 'ceremony',
  },
  {
    time: '5:30 – 6:30 PM',
    title: 'Closing Ceremony & Banquet',
    description: 'Closing address by the Secretary-General followed by a celebratory banquet marking the end of Senatus Summit 2026.',
    highlight: true,
    type: 'ceremony',
  },
]

const typeConfig: Record<string, { label: string; dot: string; badge: string; glow: string }> = {
  session:  {
    label: 'Committee',
    dot:   '#2c5f5d',
    badge: 'text-[#3d8a87] border-[#2c5f5d]/30 bg-[#0e1a1a]',
    glow:  'rgba(44,95,93,0.08)',
  },
  ceremony: {
    label: 'Ceremony',
    dot:   '#7aa07a',
    badge: 'text-[#7aa07a] border-[#5a7a5a]/30 bg-[#0e160e]',
    glow:  'rgba(90,122,90,0.07)',
  },
  break: {
    label: 'Break',
    dot:   '#2a3340',
    badge: 'text-[#475569] border-[#1c232b] bg-[#0d1117]',
    glow:  'transparent',
  },
  social: {
    label: 'Social',
    dot:   '#7a7aaa',
    badge: 'text-[#7a7aaa] border-[#5a5a8a]/30 bg-[#0e0e1a]',
    glow:  'rgba(90,90,138,0.07)',
  },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: 'easeOut' },
})

function EventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const cfg = typeConfig[event.type || 'break']
  return (
    <motion.div {...fadeUp(index * 0.06)} className="relative pl-8 sm:pl-10">
      {/* Timeline dot */}
      <div
        className="absolute left-[-5px] top-[20px] w-[10px] h-[10px] rounded-full border-2 transition-all duration-300"
        style={{
          borderColor: cfg.dot,
          background: event.highlight ? cfg.dot : '#080b10',
          boxShadow: event.highlight ? `0 0 10px ${cfg.dot}80` : 'none',
        }}
      />

      {/* Card */}
      <div
        className="rounded-xl border p-5 sm:p-6 transition-all duration-300 hover:border-opacity-50"
        style={{
          background: event.highlight
            ? `linear-gradient(135deg, #0d1117, ${cfg.glow !== 'transparent' ? cfg.glow.replace('0.07', '0.12') : '#111720'})`
            : '#0d1117',
          borderColor: event.highlight ? `${cfg.dot}30` : '#1c232b',
          boxShadow: event.highlight ? `0 0 30px ${cfg.glow}` : 'none',
        }}
      >
        {event.highlight && (
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-xl opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${cfg.dot}, transparent)` }}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
          {/* Time + badge column */}
          <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-2 shrink-0 sm:w-36">
            <span className="font-inter text-[8px] font-bold text-[#475569] tracking-[0.15em] uppercase whitespace-nowrap">
              {event.time}
            </span>
            <span className={`font-inter text-[7px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>

          {/* Text */}
          <div>
            <h4
              className="font-cinzel font-bold text-[13px] mb-2 tracking-wide leading-snug"
              style={{ color: event.highlight ? '#e5e7eb' : '#64748b' }}
            >
              {event.title}
            </h4>
            <p className="font-inter text-[11px] text-[#3d4d5c] leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DaySection({
  day, events, dayLabel, date,
}: {
  day: string; events: TimelineEvent[]; dayLabel: string; date: string
}) {
  return (
    <div className="mb-24 last:mb-0">
      {/* Day header */}
      <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-12">
        <div className="flex items-center gap-4">
          <span
            className="font-cinzel font-bold text-[11px] tracking-[0.35em] uppercase px-4 py-2 rounded-lg border"
            style={{
              color: '#2c5f5d',
              borderColor: '#2c5f5d30',
              background: '#0e1a1a',
            }}
          >
            {day}
          </span>
          <div className="flex flex-col">
            <span className="font-cinzel font-bold text-sm tracking-[0.1em] text-[#e5e7eb]">{dayLabel}</span>
            <span className="font-inter text-[8px] text-[#2c5f5d] tracking-[0.15em] uppercase font-bold">{date}</span>
          </div>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #1c232b, transparent)' }} />
      </motion.div>

      {/* Events list with left border */}
      <div
        className="space-y-4 relative"
        style={{
          paddingLeft: '1px',
          borderLeft: '1px solid #1c232b',
          marginLeft: '4px',
        }}
      >
        {events.map((event, i) => (
          <EventCard key={i} event={event} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#080b10]">
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] bg-[#2c5f5d] opacity-[0.04] top-1/3 right-0 translate-x-1/3" />
      <div className="glow-orb w-[400px] h-[400px] bg-[#5a5a8a] opacity-[0.03] bottom-1/4 left-0 -translate-x-1/3" />
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-24">
          <div className="section-label mb-10">Schedule</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gradient-text">Two Days.</span><br />
            <span className="text-[#1c232b]">One Vision.</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-md text-[10px] font-bold tracking-[0.2em] uppercase leading-relaxed">
            A full programme of debate, diplomacy, and excellence.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-2.5 mt-10">
            {Object.values(typeConfig).map((v) => (
              <span
                key={v.label}
                className={`font-inter text-[7px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border ${v.badge}`}
              >
                {v.label}
              </span>
            ))}
          </div>
        </motion.div>

        <DaySection day="DAY 01" dayLabel="Saturday" date="11 July 2026" events={day1} />
        <DaySection day="DAY 02" dayLabel="Sunday"   date="12 July 2026" events={day2} />
      </div>
    </section>
  )
}
