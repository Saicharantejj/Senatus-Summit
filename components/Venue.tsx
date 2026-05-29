'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: 'easeOut' },
})

export default function Venue() {
  return (
    <section id="venue" className="relative py-24 md:py-36 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0d1117] overflow-hidden">
      {/* Background decoration */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.04] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-20">
          <div className="section-label mb-10">The Venue</div>
          <h2 className="font-cinzel font-black text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gradient-text font-black">Official Venue</span><br />
            <span className="text-[#1c232b] drop-shadow-[0_0_2px_rgba(44,95,93,0.3)]">Partner</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Text Details (5 cols) */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div>
              <span className="font-inter text-[9px] font-black tracking-[0.3em] text-[#52a19e] uppercase">
                Host Institution
              </span>
              <h3 className="font-cinzel font-black text-3xl text-[#e5e7eb] mt-3 mb-1 tracking-wide">
                Prudence School
              </h3>
              <p className="font-inter text-[#475569] text-xs font-bold uppercase tracking-[0.15em]">
                Sector 16B, Dwarka
              </p>
            </div>
            
            <p className="font-inter text-sm md:text-base text-[#94a3b8] leading-relaxed font-medium">
              We are proud to partner with Prudence School, Dwarka Sector 16B, as our host institution. The campus boasts state-of-the-art conference facilities, spacious committee rooms, and advanced audio-visual infrastructure, providing delegates with the ideal environment for intense debate and diplomatic resolution.
            </p>
            
            <div className="w-full h-px bg-[#1c232b] my-2" />
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2c5f5d]/10 border border-[#2c5f5d]/20 flex items-center justify-center shrink-0">
                <MapPin className="text-[#52a19e]" size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-inter text-[10px] font-bold text-[#475569] tracking-wider uppercase">Location Address</span>
                <p className="font-inter text-xs text-[#94a3b8] font-medium leading-relaxed">
                  J22C+F34, HAF, Pocket 4, Sector 16B Dwarka, New Delhi, Delhi 110078
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image Card (7 cols) */}
          <motion.div 
            {...fadeUp(0.2)} 
            className="lg:col-span-7 relative group rounded-2xl border border-[#1c232b] bg-[#080b10] overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-end p-8 sm:p-12 hover:border-[#2c5f5d]/30 transition-all duration-500 shadow-2xl"
          >
            {/* Background Image of the building with opacity */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.20] transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.26]"
              style={{ 
                backgroundImage: "url('/venue.jpg')",
              }}
            />
            {/* Gradient overlay to ensure high contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/80 to-transparent z-0" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52a19e] animate-pulse" />
                <span className="font-inter text-[10px] font-bold tracking-[0.25em] text-[#52a19e] uppercase">Dwarka Sector 16B Campus</span>
              </div>
              
              <p className="font-inter text-xs text-[#475569] font-semibold uppercase tracking-wider max-w-md leading-relaxed">
                Conveniently located in Dwarka with excellent connectivity, featuring world-class auditoriums and customized discussion chambers.
              </p>
              
              <a
                href="https://www.google.com/maps?q=J22C%2BF34,+HAF,+Pocket+4,+Sector+16B+Dwarka,+New+Delhi,+Delhi+110078&utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit inline-flex items-center gap-2 rounded-xl bg-[#080b10] border border-[#1c232b] px-6 py-4 font-inter text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase hover:bg-[#2c5f5d] hover:border-[#2c5f5d] hover:text-white hover:shadow-[0_0_25px_rgba(44,95,93,0.4)] transition-all duration-300"
              >
                <span>Navigate on Maps</span>
                <Navigation size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
