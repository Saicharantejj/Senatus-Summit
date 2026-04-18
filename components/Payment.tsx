'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, Loader2, ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function Payment() {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [file, setFile]           = useState<File | null>(null)
  const [preview, setPreview]     = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')
  const inputRef                  = useRef<HTMLInputElement>(null)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { setError('File must be under 5 MB.'); return }
    setFile(f)
    setError('')
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  const handleSubmit = async () => {
    if (!name.trim())  { setError('Please enter your name.'); return }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email.'); return }
    if (!file)         { setError('Please upload your payment screenshot.'); return }
    setError('')
    setLoading(true)

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload  = () => resolve((reader.result as string).split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const res  = await fetch('/api/payment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, fileName: file.name, fileBase64: base64 }),
      })
      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setName(''); setEmail(''); setFile(null); setPreview(null)
      } else {
        setError(data.error || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="payment" className="relative py-20 md:py-32 px-4 sm:px-6 border-t border-[#1c232b] bg-[#0a0d12]">
      <div className="max-w-4xl mx-auto">

        <motion.div {...fadeUp(0)} className="mb-14 text-center">
          <div className="section-label mb-6 mx-auto">Registration Fee</div>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-[#e5e7eb] leading-tight mb-4">
            Secure Your Seat
          </h2>
          <p className="font-inter text-[#475569] text-sm max-w-md mx-auto">
            Scan the QR code to pay the registration fee, then upload your payment screenshot below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* QR Code */}
          <motion.div {...fadeUp(0.1)} className="card rounded-2xl p-8 flex flex-col items-center gap-6">
            <div className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">Scan to Pay</div>

            {/* QR code image — drop QR.png into your senatus-summit folder */}
            <div className="w-52 h-52 rounded-xl border border-[#1c232b] bg-[#151c24] flex items-center justify-center overflow-hidden">
              <Image
                src="/qr.png"
                alt="Payment QR Code"
                width={208}
                height={208}
                className="object-contain"
                onError={(e) => {
                  // Show placeholder if QR not uploaded yet
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              {/* Placeholder shown until QR.png is added */}
              <div className="absolute flex flex-col items-center gap-2 text-[#1c232b]">
                <ImageIcon size={40} />
                <span className="font-inter text-[9px] tracking-widest uppercase">QR Coming Soon</span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-cinzel font-bold text-lg text-[#2c5f5d]">UPI / Bank Transfer</p>
              <p className="font-inter text-[10px] text-[#475569] mt-1 tracking-wide">After payment, upload screenshot →</p>
            </div>
          </motion.div>

          {/* Upload form */}
          <motion.div {...fadeUp(0.2)} className="card rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                >
                  <div className="w-14 h-14 rounded-full border border-[#1e3232] bg-[#0e1a1a] flex items-center justify-center">
                    <CheckCircle className="text-[#5a8a8a]" size={28} />
                  </div>
                  <h3 className="font-cinzel font-semibold text-lg text-[#dedad4]">Payment Received!</h3>
                  <p className="font-inter text-[#555] text-sm max-w-xs">
                    Your screenshot has been submitted. We'll verify and confirm your registration within 24 hours.
                  </p>
                  <button onClick={() => setSuccess(false)}
                    className="btn-outline font-inter text-xs tracking-[0.1em] px-5 py-2 rounded-md mt-2">
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569] mb-2">
                    Upload Payment Screenshot
                  </p>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter text-[9px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
                      Full Name <span className="text-[#5a8a8a]">*</span>
                    </label>
                    <input
                      type="text" placeholder="Your name" value={name}
                      onChange={e => { setName(e.target.value); setError('') }}
                      className="form-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter text-[9px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
                      Email Address <span className="text-[#5a8a8a]">*</span>
                    </label>
                    <input
                      type="email" placeholder="your@email.com" value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      className="form-input"
                    />
                  </div>

                  {/* File upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter text-[9px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
                      Payment Screenshot <span className="text-[#5a8a8a]">*</span>
                    </label>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

                    {preview ? (
                      <div className="relative rounded-lg overflow-hidden border border-[#1c232b]">
                        <img src={preview} alt="Screenshot preview" className="w-full object-cover max-h-48" />
                        <button
                          onClick={() => { setFile(null); setPreview(null) }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0a0d12]/80 border border-[#1c232b] flex items-center justify-center text-[#475569] hover:text-[#dedad4]"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => inputRef.current?.click()}
                        className="w-full border border-dashed border-[#1c232b] rounded-lg p-8 flex flex-col items-center gap-3 hover:border-[#2c5f5d] transition-colors group"
                      >
                        <Upload size={22} className="text-[#1c232b] group-hover:text-[#2c5f5d] transition-colors" />
                        <span className="font-inter text-[10px] text-[#333] tracking-wide">Tap to upload screenshot</span>
                        <span className="font-inter text-[9px] text-[#222]">JPG, PNG up to 5 MB</span>
                      </button>
                    )}
                  </div>

                  {error && <p className="font-inter text-[11px] text-rose-500/80">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary w-full py-3.5 rounded-md font-cinzel font-medium tracking-[0.15em] text-xs flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : 'Submit Payment Proof'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
