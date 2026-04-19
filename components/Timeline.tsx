import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface TimelineEvent {
  time: string
  title: string
  description: string
  highlight?: boolean
  type?: 'session' | 'break' | 'ceremony' | 'social'
}

// ... (day1 and day2 definitions remain the same)

function EventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const cfg = typeConfig[event.type || 'break']
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 sm:pl-14 group"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[-6px] top-[24px] w-[12px] h-[12px] rounded-full border-2 z-20 transition-all duration-500 group-hover:scale-125"
        style={{
          borderColor: cfg.dot,
          background: event.highlight ? cfg.dot : '#080b10',
          boxShadow: event.highlight ? `0 0 15px ${cfg.dot}80` : `0 0 0px ${cfg.dot}00`,
        }}
      />

      {/* Card */}
      <div
        className="rounded-2xl border p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] bg-[#0d1117]/80 backdrop-blur-xl relative overflow-hidden group/card"
        style={{
          borderColor: event.highlight ? `${cfg.dot}40` : '#1c232b',
        }}
      >
        {/* Hover Highlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{ background: `radial-gradient(circle at top left, ${cfg.dot}08, transparent)` }}
        />

        {event.highlight && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, ${cfg.dot}, transparent)` }}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
          {/* Time + badge column */}
          <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-3 shrink-0 sm:w-40">
            <span className="font-inter text-[9px] font-black text-[#475569] tracking-[0.2em] uppercase whitespace-nowrap opacity-80 group-hover/card:opacity-100 transition-opacity">
              {event.time}
            </span>
            <span className={`font-inter text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-md ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>

          {/* Text */}
          <div className="relative z-10">
            <h4
              className="font-cinzel font-black text-[15px] mb-3 tracking-wide leading-snug group-hover/card:text-white transition-colors duration-300"
              style={{ color: event.highlight ? '#f0f2f5' : '#64748b' }}
            >
              {event.title}
            </h4>
            <p className="font-inter text-[13px] text-[#475569] leading-relaxed font-medium group-hover/card:text-[#94a3b8] transition-colors duration-300">
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="mb-32 last:mb-0 relative">
      {/* Day header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-16"
      >
        <div className="flex items-center gap-6">
          <span
            className="font-cinzel font-black text-[12px] tracking-[0.4em] uppercase px-5 py-2.5 rounded-xl border-2 shadow-lg"
            style={{
              color: '#52a19e',
              borderColor: '#2c5f5d40',
              background: '#0e1a1a',
            }}
          >
            {day}
          </span>
          <div className="flex flex-col">
            <span className="font-cinzel font-black text-lg tracking-[0.05em] text-[#f0f2f5]">{dayLabel}</span>
            <span className="font-inter text-[10px] text-[#2c5f5d] tracking-[0.3em] uppercase font-black opacity-80">{date}</span>
          </div>
        </div>
        <div className="flex-1 h-px opacity-30" style={{ background: 'linear-gradient(90deg, #2c5f5d, transparent)' }} />
      </motion.div>

      {/* Events list with left border */}
      <div
        className="space-y-6 relative"
        style={{
          marginLeft: '5px',
        }}
      >
        {/* Animated Line Overlay */}
        <motion.div
          className="absolute left-0 top-0 w-px origin-top z-10"
          style={{
            height: '100%',
            background: 'linear-gradient(to bottom, #2c5f5d, #3d7d7b, transparent)',
            scaleY: scaleY,
            boxShadow: '0 0 10px #2c5f5d50',
          }}
        />
        {/* Static Background Line */}
        <div className="absolute left-0 top-0 w-px h-full bg-[#1c232b] z-0" />

        {events.map((event, i) => (
          <EventCard key={i} event={event} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 md:py-56 px-4 sm:px-6 border-t border-[#1c232b] bg-[#080b10]">
      {/* Background decoration */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.05] top-1/4 right-0 translate-x-1/4" />
      <div className="glow-orb w-[500px] h-[500px] bg-[#5a5a8a] opacity-[0.04] bottom-1/4 left-0 -translate-x-1/4" />
      <div className="absolute inset-0 dot-grid opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="section-label mb-12">Schedule</div>
          <h2 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
            <span className="gradient-text">Two Days.</span><br />
            <span className="text-[#1c232b] drop-shadow-[0_0_2px_rgba(44,95,93,0.3)]">One Vision.</span>
          </h2>
          <p className="font-inter text-[#475569] mt-10 max-w-lg text-[11px] font-black tracking-[0.3em] uppercase leading-relaxed opacity-80">
            An intensive journey through global diplomacy.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-12 bg-[#0d1117]/40 p-4 rounded-2xl border border-[#1c232b]/50 backdrop-blur-sm w-fit">
            {Object.values(typeConfig).map((v) => (
              <span
                key={v.label}
                className={`font-inter text-[8px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:brightness-125 ${v.badge}`}
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
