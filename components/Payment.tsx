'use client'

import { useState, useRef, useEffect, useCallback, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, Loader2, X, QrCode, Timer } from 'lucide-react'
import Image from 'next/image'

const TIMER_SECONDS = 180 // 3 minutes

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

export default function Payment() {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [file, setFile]           = useState<File | null>(null)
  const [preview, setPreview]     = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // QR reveal state
  const [qrVisible, setQrVisible]   = useState(false)
  const [timeLeft, setTimeLeft]     = useState(TIMER_SECONDS)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef                    = useRef<ReturnType<typeof setInterval> | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setTimerActive(false)
  }, [])

  const startQr = () => {
    setQrVisible(true)
    setTimeLeft(TIMER_SECONDS)
    setTimerActive(true)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer()
          setQrVisible(false)
          return TIMER_SECONDS
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => () => stopTimer(), [stopTimer])

  const timerColor =
    timeLeft > 90 ? '#2c5f5d' :
    timeLeft > 45 ? '#b45309' :
    '#e11d48'

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
    if (!file)         { setError('Screenshot is required — please upload your payment proof before submitting.'); return }
    if (!agreeToTerms) { setError('You must agree to the Terms & Conditions to proceed.'); return }
    setError('')
    setLoading(true)

    try {
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
        setAgreeToTerms(false)
        stopTimer(); setQrVisible(false)
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

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14 text-center">
          <div className="section-label mb-6 mx-auto">Registration Fee</div>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-[#e5e7eb] leading-tight mb-4">
            Secure Your Seat
          </h2>
          <p className="font-inter text-[#475569] text-sm max-w-md mx-auto">
            Click to reveal the payment QR code, complete your payment, then upload the screenshot below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── QR Panel ── */}
          <motion.div {...fadeUp(0.1)} className="card rounded-2xl p-8 flex flex-col items-center gap-6">

            <div className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">PhonePe / UPI</div>

            <AnimatePresence mode="wait">
              {qrVisible ? (
                /* QR revealed + timer */
                <motion.div
                  key="qr-shown"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-4 w-full"
                >
                  {/* Timer bar */}
                  <div className="w-full flex items-center justify-between px-1">
                    <span className="font-inter text-[9px] tracking-widest uppercase text-[#475569] flex items-center gap-1">
                      <Timer size={10} /> QR expires in
                    </span>
                    <span className="font-cinzel font-bold text-sm" style={{ color: timerColor }}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* Timer progress bar */}
                  <div className="w-full h-px bg-[#1c232b] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: timerColor }}
                      animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                      transition={{ duration: 0.9, ease: 'linear' }}
                    />
                  </div>

                  {/* QR image */}
                  <div className="w-52 h-52 rounded-xl border border-[#1c232b] bg-[#151c24] overflow-hidden flex items-center justify-center">
                    <Image
                      src="/qr.png"
                      alt="PhonePe Payment QR"
                      width={208}
                      height={208}
                      className="object-contain"
                    />
                  </div>

                  <button
                    onClick={() => { stopTimer(); setQrVisible(false) }}
                    className="font-inter text-[9px] tracking-[0.15em] uppercase text-[#333] hover:text-[#475569] transition-colors"
                  >
                    Hide QR
                  </button>
                </motion.div>
              ) : (
                /* Reveal button */
                <motion.div
                  key="qr-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-5"
                >
                  {/* Blurred placeholder */}
                  <div className="relative w-52 h-52 rounded-xl border border-[#1c232b] bg-[#0d1117] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#0a0d12]/80 backdrop-blur-sm z-10" />
                    <QrCode size={72} className="text-[#1c232b] absolute" />
                    <div className="relative z-20 flex flex-col items-center gap-2">
                      <button
                        onClick={startQr}
                        className="btn-primary font-inter font-bold tracking-[0.12em] uppercase text-[10px] px-6 py-2.5 rounded-lg flex items-center gap-2"
                      >
                        <QrCode size={13} />
                        Reveal QR Code
                      </button>
                      <span className="font-inter text-[8px] text-[#333] tracking-wide">3 min timer starts on reveal</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <p className="font-cinzel font-bold text-base text-[#2c5f5d]">Scan & Pay via PhonePe</p>
              <p className="font-inter text-[10px] text-[#475569] mt-1 tracking-wide">After payment, upload screenshot →</p>
            </div>
          </motion.div>

          {/* ── Upload Form ── */}
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

                  {/* File upload — REQUIRED */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter text-[9px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
                      Payment Screenshot <span className="text-rose-500">* Required</span>
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
                        <div className="absolute bottom-2 left-2 font-inter text-[8px] bg-[#0e1a1a] border border-[#1e3232] text-[#5a8a8a] px-2 py-0.5 rounded tracking-wide">
                          ✓ Screenshot attached
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => inputRef.current?.click()}
                        className={`w-full border border-dashed rounded-lg p-8 flex flex-col items-center gap-3 transition-colors group ${
                          error && !file
                            ? 'border-rose-900/60 bg-rose-950/10'
                            : 'border-[#1c232b] hover:border-[#2c5f5d]'
                        }`}
                      >
                        <Upload size={22} className={`transition-colors ${error && !file ? 'text-rose-900/60' : 'text-[#1c232b] group-hover:text-[#2c5f5d]'}`} />
                        <span className="font-inter text-[10px] text-[#333] tracking-wide">Tap to upload screenshot</span>
                        <span className="font-inter text-[9px] text-[#222]">JPG, PNG up to 5 MB</span>
                      </button>
                    )}
                  </div>

                  {/* Terms and Conditions Notice */}
                  <div className="border border-[#1c232b] rounded-xl p-4 bg-[#0d1117] space-y-3 w-full">
                    <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">
                      Terms & Conditions
                    </p>
                    <div className="font-inter text-[10px] text-[#475569] leading-relaxed space-y-1">
                      <p>
                        • <strong>Refund Policy:</strong> Unless the conference is cancelled by the organizing committee, no refunds will be made under any circumstances (including venue or date changes).
                      </p>
                      <p>
                        • <strong>Modifications:</strong> Changes of committees and portfolios are allowed (subject to availability), but no refunds will be issued under any other circumstances.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="agreeToTermsPay"
                        checked={agreeToTerms}
                        onChange={(e) => {
                          setAgreeToTerms(e.target.checked)
                          setError('')
                        }}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-[#1c232b] bg-[#0a0d12] text-[#2c5f5d] focus:ring-[#2c5f5d] accent-[#2c5f5d]"
                      />
                      <label htmlFor="agreeToTermsPay" className="font-inter text-[9px] text-[#475569] leading-tight select-none cursor-pointer">
                        I agree to the refund & portfolio modification policy.
                      </label>
                    </div>
                  </div>

                  {error && <p className="font-inter text-[11px] text-rose-500/80">{error}</p>}

                  {/* Submit — disabled until screenshot attached */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !file}
                    className="btn-primary w-full py-3.5 rounded-md font-cinzel font-medium tracking-[0.15em] text-xs flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    title={!file ? 'Upload your payment screenshot to continue' : ''}
                  >
                    {loading
                      ? <><Loader2 size={14} className="animate-spin" /> Uploading…</>
                      : !file
                        ? 'Upload Screenshot to Continue'
                        : 'Submit Payment Proof'
                    }
                  </button>

                  {!file && (
                    <p className="font-inter text-[9px] text-[#333] text-center tracking-wide">
                      Screenshot upload is mandatory to submit
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
