'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function Terms() {
  return (
    <section className="relative py-28 md:py-44 px-4 sm:px-6 bg-[#0a0d12] min-h-screen">
      {/* Background decoration */}
      <div className="glow-orb w-[600px] h-[600px] bg-[#2c5f5d] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14 text-center">
          <div className="section-label mb-6 mx-auto">Policy & Rules</div>
          <h1 className="font-cinzel font-black text-3xl md:text-5xl text-[#e5e7eb] leading-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="font-inter text-[#475569] text-xs uppercase tracking-widest">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div {...fadeUp(0.1)} className="card rounded-2xl p-8 md:p-12 space-y-8 font-inter text-[#94a3b8] text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="font-cinzel font-bold text-lg text-[#dedad4] mb-3 uppercase tracking-wider">
              1. Registration & Payment Policy
            </h2>
            <p className="mb-4">
              To secure a delegate seat at The Senatus Summit 2026, the registration fee must be paid in full, and valid proof of payment (screenshot) must be uploaded via our official registration portals. Your seat allotment is only confirmed after payment validation.
            </p>
          </div>

          <div className="border-t border-[#1c232b] pt-8">
            <h2 className="font-cinzel font-bold text-lg text-rose-500/90 mb-3 uppercase tracking-wider flex items-center gap-2">
              2. Refund Policy
            </h2>
            <p className="mb-4 font-semibold text-[#dedad4]">
              Unless the conference is officially cancelled by the organizing committee, there will not be any refunds made under any other circumstances, including but not limited to any change in the venue or dates of the conference.
            </p>
            <p>
              By completing your payment and submitting your registration, you acknowledge and agree that your registration fee is strictly non-refundable, including but not limited to cases of personal scheduling conflicts, failure to attend the conference, portfolio dissatisfaction, travel issues, or changes in the conference venue or dates.
            </p>
          </div>

          <div className="border-t border-[#1c232b] pt-8">
            <h2 className="font-cinzel font-bold text-lg text-[#dedad4] mb-3 uppercase tracking-wider">
              3. Modifications of Committees & Portfolios
            </h2>
            <p className="mb-4">
              We understand that delegates may need to adjust their preferences. The organizing committee allows requests for changes to committee and portfolio assignments subject to the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Changes are subject to availability of seats in the preferred committees.
              </li>
              <li>
                Requests must be submitted in writing to the organizing committee before the final allotment deadline.
              </li>
              <li>
                While portfolio modifications are allowed, they do not entitle the delegate to a refund or discount under any circumstances.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#1c232b] pt-8">
            <h2 className="font-cinzel font-bold text-lg text-[#dedad4] mb-3 uppercase tracking-wider">
              4. Code of Conduct
            </h2>
            <p>
              All delegates are expected to maintain professional diplomacy, respect, and academic integrity throughout the duration of The Senatus Summit. Any form of harassment, discrimination, or serious behavioral misconduct will result in immediate disqualification and removal from the conference, with no refunds issued.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
