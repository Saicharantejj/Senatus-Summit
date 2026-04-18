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
    description: 'Morning briefing on the day\'s agenda, crisis updates, and committee instructions from the dais.',
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

const typeColors: Record<string, string> = {
  session:  'border-[#2c5f5d] bg-[#2c5f5d]',
  ceremony: 'border-[#5a7a5a] bg-[#5a7a5a]',
  break:    'border-[#1c232b] bg-[#0a0d12]',
  social:   'border-[#5a5a8a] bg-[#5a5a8a]',
}

const typeBadge: Record<string, { label: string; color: string }> = {
  session:  { label: 'Committee', color: 'text-[#2c5f5d] border-[#2c5f5d]/30 bg-[#0e1a1a]' },
  ceremony: { label: 'Ceremony',  color: 'text-[#7aa07a] border-[#5a7a5a]/30 bg-[#0e160e]' },
  break:    { label: 'Break',     color: 'text-[#475569] border-[#1c232b]    bg-[#151c24]' },
  social:   { label: 'Social',    color: 'text-[#7a7aaa] border-[#5a5a8a]/30 bg-[#0e0e1a]' },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function DaySection({ day, events, dayLabel, date }: { day: string; events: TimelineEvent[]; dayLabel: string; date: string }) {
  return (
    <div className="mb-20 last:mb-0">
      {/* Day header */}
      <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-10">
        <span className="font-cinzel font-bold text-sm tracking-[0.25em] text-[#e5e7eb] whitespace-nowrap">{day}</span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="font-inter text-[8px] text-[#475569] font-bold tracking-[0.2em] uppercase">{dayLabel}</span>
          <span className="hidden sm:block text-[#1c232b]">·</span>
          <span className="font-cinzel text-[10px] text-[#2c5f5d] tracking-[0.1em]">{date}</span>
        </div>
        <div className="flex-1 h-px bg-[#1c232b]" />
      </motion.div>

      {/* Events */}
      <div className="space-y-4 pl-3 sm:pl-4 border-l border-[#1c232b]">
        {events.map((event, i) => {
          const badge = typeBadge[event.type || 'break']
          const dot   = typeColors[event.type || 'break']
          return (
            <motion.div key={i} {...fadeUp(i * 0.06)} className="relative pl-6 sm:pl-8">
              {/* Timeline dot */}
              <div className={`absolute left-[-20px] sm:left-[-24px] top-[22px] w-2 h-2 rounded-full border ${dot}`} />

              <div className={`card rounded-lg p-4 sm:p-5 ${event.highlight ? 'border-[#2c5f5d]/20' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                  {/* Time + badge */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1.5 mb-2 sm:mb-0 sm:w-36 shrink-0">
                    <span className="font-inter text-[8px] font-bold text-[#475569] tracking-[0.15em] uppercase whitespace-nowrap">
                      {event.time}
                    </span>
                    <span className={`font-inter text-[7px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className={`font-cinzel font-bold text-[13px] mb-1.5 tracking-wide ${event.highlight ? 'text-[#dedad4]' : 'text-[#94a3b8]'}`}>
                      {event.title}
                    </h4>
                    <p className="font-inter text-[11px] text-[#475569] leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0f141a]">
      <div className="max-w-3xl mx-auto relative z-10">

        <motion.div {...fadeUp(0)} className="mb-20">
          <div className="section-label mb-10">Schedule</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl text-[#e5e7eb] leading-tight">
            Two Days.<br />
            <span className="text-[#1c232b]">One Vision.</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-md text-[10px] font-bold tracking-[0.2em] uppercase leading-relaxed">
            A full programme of debate, diplomacy, and excellence.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-8">
            {Object.entries(typeBadge).map(([, v]) => (
              <span key={v.label} className={`font-inter text-[7px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded border ${v.color}`}>
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
