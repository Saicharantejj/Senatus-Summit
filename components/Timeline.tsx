'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  time: string
  title: string
  description: string
  highlight?: boolean
}

const day1: TimelineEvent[] = [
  { time: '8:30 AM',  title: 'Registration & Accreditation', description: 'Delegate check-in, credential verification, and welcome kit distribution.' },
  { time: '10:00 AM', title: 'Opening Ceremony',             description: 'Inaugural address, keynote by Chief Guest, and formal induction of delegates.', highlight: true },
  { time: '11:30 AM', title: 'Committee Session I',          description: 'Opening speeches, position paper presentations, and establishment of the agenda.' },
  { time: '1:00 PM',  title: 'Networking Lunch',             description: 'Structured networking session with senior delegates and faculty advisors.' },
  { time: '2:30 PM',  title: 'Committee Session II',         description: 'Moderated caucus, unmoderated caucus, and working paper drafting.' },
  { time: '4:30 PM',  title: 'High Tea & Cultural Exchange', description: 'Inter-delegation cultural showcase and informal networking.' },
  { time: '5:30 PM',  title: 'Committee Session III',        description: 'Debate on draft resolutions and amendments.' },
  { time: '8:00 PM',  title: 'Cultural Night',               description: 'An evening of art, performance, and diplomacy beyond the committee room.', highlight: true },
]

const day2: TimelineEvent[] = [
  { time: '9:00 AM',  title: 'Committee Session IV',         description: 'Voting on amendments, bloc negotiations, and final resolution drafting.' },
  { time: '11:00 AM', title: 'Crisis Simulation',            description: 'Live global crisis scenario — all committees receive simultaneous crisis updates.', highlight: true },
  { time: '1:00 PM',  title: 'Lunch Break',                  description: 'Delegates continue informal negotiations and finalise alliances.' },
  { time: '2:30 PM',  title: 'Final Committee Session',      description: 'Formal voting procedures, passage of resolutions, and closing statements.' },
  { time: '4:00 PM',  title: 'Press Conference',             description: 'International Press committee presents investigative reports to all delegates.' },
  { time: '5:00 PM',  title: 'Award Ceremony',               description: 'Best Delegate, Outstanding Delegate, and Special Mention awards across all committees.', highlight: true },
  { time: '6:30 PM',  title: 'Closing Banquet',              description: 'Celebratory dinner marking the conclusion of the Senatus Summit 2026.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function DaySection({ day, events, dayLabel }: { day: string; events: TimelineEvent[]; dayLabel: string }) {
  return (
    <div className="mb-24 last:mb-0">
      {/* Day header */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-6 mb-14">
        <span className="font-cinzel font-bold text-sm tracking-[0.25em] text-[#e5e7eb] whitespace-nowrap">{day}</span>
        <span className="font-inter text-[8px] text-[#475569] font-bold tracking-[0.2em] uppercase">{dayLabel}</span>
        <div className="flex-1 h-px bg-[#1c232b]" />
      </motion.div>

      {/* Events — Muted Roadmap */}
      <div className="space-y-6 pl-4 border-l border-[#1c232b]">
        {events.map((event, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.08)}
            className="relative pl-8"
          >
            {/* Dot — Minimal */}
            <div
              className={`absolute left-[-24px] top-[26px] w-2 h-2 rounded-full border ${
                event.highlight
                  ? 'border-[#2c5f5d] bg-[#2c5f5d]'
                  : 'border-[#1c232b] bg-[#0a0d12]'
              }`}
            />

            <div className={`card rounded p-4 sm:p-6 ${event.highlight ? 'border-[#2c5f5d]/30 bg-[#151c24]' : 'bg-[#151c24]'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10">
                <span className="font-inter text-[9px] font-bold text-[#475569] tracking-[0.2em] uppercase whitespace-nowrap mb-2 sm:mb-0 sm:pt-1 sm:w-28 shrink-0">
                  {event.time}
                </span>
                <div>
                  <h4 className={`font-cinzel font-bold text-[13px] mb-2 tracking-wide ${event.highlight ? 'text-[#2c5f5d]' : 'text-[#e5e7eb]'}`}>
                    {event.title}
                  </h4>
                  <p className="font-inter text-[12px] text-[#94a3b8] leading-relaxed font-medium">{event.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-20 md:py-48 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0f141a]">
      <div className="max-w-3xl mx-auto relative z-10">

        <motion.div {...fadeUp(0)} className="mb-24">
          <div className="section-label mb-10">Schedule</div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl text-[#e5e7eb] leading-tight">
            Two Days.<br />
            <span className="text-[#1c232b]">One Vision.</span>
          </h2>
          <p className="font-inter text-[#475569] mt-8 max-w-md text-[10px] font-bold tracking-[0.2em] uppercase leading-relaxed">
            Muted progression through strategic committee sessions.
          </p>
        </motion.div>

        <DaySection day="DAY 01" events={day1} dayLabel="Saturday // 11 July 2026" />
        <DaySection day="DAY 02" events={day2} dayLabel="Sunday // 12 July 2026" />
      </div>
    </section>
  )
}
