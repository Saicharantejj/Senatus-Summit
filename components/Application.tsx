'use client'

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Upload, X, QrCode, Timer } from 'lucide-react'
import Image from 'next/image'

const TIMER_SECONDS = 180
function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

interface FormState {
  fullName: string
  email: string
  phone: string
  institution: string
  committeePreference: string
  portfolio1: string
  portfolio2: string
  portfolio3: string
  hasMunExperience: string
  munExperienceDetails: string
  paymentAccountName: string
}

const INITIAL: FormState = {
  fullName: '', email: '', phone: '', institution: '',
  committeePreference: '',
  portfolio1: '', portfolio2: '', portfolio3: '',
  hasMunExperience: '', munExperienceDetails: '',
  paymentAccountName: '',
}

// ─── QR Timer Hook ───────────────────────────────────────────
function useQrTimer() {
  const [qrVisible, setQrVisible] = useState(false)
  const [timeLeft, setTimeLeft]   = useState(TIMER_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null }
  const start = () => {
    stop(); setQrVisible(true); setTimeLeft(TIMER_SECONDS)
    timerRef.current = setInterval(() => {
      setTimeLeft(p => { if (p <= 1) { stop(); setQrVisible(false); return TIMER_SECONDS } return p - 1 })
    }, 1000)
  }
  const hide = () => { stop(); setQrVisible(false) }
  const color = timeLeft > 90 ? '#2c5f5d' : timeLeft > 45 ? '#b45309' : '#e11d48'
  return { qrVisible, timeLeft, start, hide, color }
}

// ─── Per-committee portfolios ────────────────────────────────
const UN_COUNTRIES = [
  'Afghanistan','Argentina','Australia','Austria','Luxembourg','Belgium',
  'Bhutan','Bulgaria','Canada','China','Costa Rica','Cuba','Denmark',
  'Czech Republic','Ethiopia','France','Germany','Greenland','Iceland',
  'Italy','Israel','Japan','Malaysia','Mexico','Morocco','Norway',
  'Philippines','Romania','Russian Federation','Switzerland','Tunisia',
  'UAE','United Kingdom','United States','Sweden','New Zealand','Spain',
  'Ukraine','Finland','Syria','Netherlands','San Marino','Lithuania',
  'Namibia','Malta','Slovakia','Guatemala','Mauritania','Cyprus','Gambia',
  'India','Iran (Islamic Republic Of)','Latvia','Lebanon','Algeria',
  'Armenia','Belarus','Brazil','Belize','Benin','Bosnia and Herzegovina',
  'Botswana','Colombia','Bolivia (Plurinational State of)','Croatia',
  "Democratic People's Republic of Korea","Cote d'Ivoire",'Gabon',
  'Turkey','South Korea','Qatar','Nigeria','Pakistan','Somalia',
  'South Africa','Andorra','Angola','Antigua and Barbuda','Burundi',
  'Cabo Verde','Grenada','Liberia','Libya','Barbados','Montenegro',
  'Nicaragua','Mozambique','Guinea','Nauru','Saint Kitts and Nevis',
  'Saint Lucia','Saint Vincent and the Grenadines','Samoa',
  'Sao Tome and Principe','Yemen','Zambia','Uruguay','Uzbekistan',
  'Vanuatu','Lesotho','Vietnam','Equatorial Guinea','Cameroon',
  'Democratic Republic of the Congo','Egypt',
]

const AIPPM_PORTFOLIOS = [
  'Narendra Modi (BJP)','Nirmala Sitharaman (BJP)','Smriti Irani (BJP)',
  'Maneka Gandhi (BJP)','Amit Shah (BJP)','Jyotiraditya Scindia (BJP)',
  'Nitin Gadkari (BJP)','Ravi Shankar Prasad (BJP)','Dr Harsh Vardhan (BJP)',
  'Vasundhara Raje (BJP)','Ramesh Bidhuri (BJP)','Mahendra Nath Pandey (BJP)',
  'Krishan Pal (BJP)','Virendra Kumar (BJP)','Dharmendra Pradhan (BJP)',
  'Dr. Ramesh Pokhriyal (BJP)','Yogi Aditya Nath (BJP)','Meenakshi Lekhi (BJP)',
  'Kiren Rijiju (BJP)','Syed Shahnawaz Hussain (BJP)','Piyush Goyal (BJP)',
  'Mukhtar Abbas Naqvi (BJP)','Ashwini Vaishnav (BJP)','Shivraj Singh Chauhan (BJP)',
  'Sudhanshu Trivedi (BJP)','Anandiben M Patel (BJP)','Anju Bala (BJP)',
  'Subramanyam Jaishankar (BJP)','Manoharlal Khattar (BJP)','Anurag Singh Thakur (BJP)',
  'Manoj Tiwari (BJP)','Kirron Kher (BJP)','Mansukh Mandaviya (BJP)',
  'Rajnath Singh (BJP)','Aditi Singh (BJP)','Shazia Ilmi (BJP)',
  'Tejasvi Surya (BJP)','Sachin Pilot (INC)','Salman Khurshid (INC)',
  'Mallikarjun Kharge (INC)','Sonia Gandhi (INC)','Rahul Gandhi (INC)',
  'Ambika Soni (INC)','Gaurav Gogoi (INC)','Dr Shashi Tharoor (INC)',
  'Meira Kumar (INC)','P. Chidambaram (INC)','Neeraj Dangi (INC)',
  'Manish Tewari (INC)','Kamal Nath (INC)','KTS Tulsi (INC)',
  'Shaktisinh Gohil (INC)','Jairam Ramesh (INC)','Adhir Ranjan Chowdhury (INC)',
  'Arvind Kejriwal (AAP)','Satyendar Jain (AAP)','Gopal Rai (AAP)',
  'Raghav Chadha (AAP)','Sanjay Singh (AAP)','Atishi (AAP)','Bhagwant Mann (AAP)',
  'Tejashvi Yadav (RJD)','Misa Bharti (RJD)','Rabri Devi (RJD)','Manoj Jha (RJD)',
  'Akhilesh Yadav (SP)','Azam Khan (SP)','Umar Ali Khan (SP)','Ram Gopal Yadav (SP)',
  'Nitish Kumar (JDU)','Sharad Pawar (NCP)','Ajit Pawar (NCP)','Praful Patel (NCP)',
  'Kumari Mayawati (BSP)','Satish Mishra (BSP)','Sangeeta Azad (BSP)',
  'Girish Chandra (BSP)','Sanjay Raut (Shiv Sena)','Uddhav Thackeray (Shiv Sena)',
  'Vinayak Raut (Shiv Sena)','Mamta Banerjee (TMC)',"Derek O'Brien (TMC)",
  'Asaddudin Owaisi (AIMIM)','Imtiaz Jaleel (AIMIM)',
  'Pashupati Kumar Paras (RLJP)','Sitaram Yechury (CPI-M)','Brinda Karat (CPI-M)',
  'Pinaki Mishra (BJD)','Bhartruhari Mahtab (BJD)','Yogendra Yadav (Swaraj India)',
  'N K Premachandran (RSP)','Captain Amarinder Singh (Punjab Lok Congress)',
  'Chirag Paswan (LJP-Ram Vilas)','Raj Thackeray (MNS)',
  'Agatha Sangma (NPP)','K R Reddy (TRS)','Dayanidhi Maran (DMK)',
  'Kanimozhi Karunanidhi (DMK)','Anupriya Patel (Apna Dal)',
  'Harsimrat Kaur Badal (SAD)','JaganMohan Reddy (YSRCP)',
  'Naba Kumar Sarania (Independent)','Ranjan Gogoi (Independent)',
  'Sumalatha Ambareesh (Independent)','Ravindra Singh Bhati (Independent)',
  'Hanuman Beniwal (RLP)','Rajesh Ranjan (Independent)',
]

const FIA_PORTFOLIOS = [
  'FIA President — Mohammed Ben Sulayem',
  'Race Director — Rui Marques',
  'Deputy Race Director — Paul Burns',
  'CEO of Liberty Media — Derek Chang',
  'Tyre Supplier — Pirelli',
  'Fuel Supplier — Shell',
  'Fuel Supplier — Petronas',
  'Fuel Supplier — ExxonMobil',
  'TP Mercedes — Toto Wolff',
  'TD Mercedes — James Allison',
  'Driver Mercedes — George Russell',
  'Driver Mercedes — Kimi Antonelli',
  'TP Ferrari — Frédéric Vasseur',
  'TD Ferrari — Loic Serra',
  'Driver Ferrari — Charles Leclerc',
  'Driver Ferrari — Lewis Hamilton',
  'TP McLaren — Andrea Stella',
  'TD McLaren — Peter Prodromou',
  'Driver McLaren — Lando Norris',
  'Driver McLaren — Oscar Piastri',
  'TP Audi — Mattia Binotto',
  'TD Audi — James Key',
  'Driver Audi — Nico Hulkenberg',
  'Driver Audi — Gabriel Bortoleto',
  'TP Haas — Ayao Komatsu',
  'TD Haas — Andrea De Zordo',
  'Driver Haas — Esteban Ocon',
  'Driver Haas — Oliver Bearman',
  'TP Alpine — Flavio Briatore',
  'TD Alpine — David Sanchez',
  'Driver Alpine — Pierre Gasly',
  'Driver Alpine — Franco Colapinto',
  'TP Red Bull Racing — Laurent Mekie',
  'TD Red Bull Racing — Pierre Wache',
  'Driver Red Bull Racing — Max Verstappen',
  'Driver Red Bull Racing — Isack Hadjar',
  'TP Racing Bulls — Alan Permane',
  'TD Racing Bulls — Tim Goss',
  'Driver Racing Bulls — Liam Lawson',
  'Driver Racing Bulls — Arvid Lindblad',
  'TP Williams — James Vowles',
  'TD Williams — Pat Fry',
  'Driver Williams — Alex Albon',
  'Driver Williams — Carlos Sainz',
  'TP Aston Martin — Adrian Newey',
  'TD Aston Martin — Dan Fallows',
  'Driver Aston Martin — Fernando Alonso',
  'Driver Aston Martin — Lance Stroll',
  'TP Cadillac — Graeme Lowdon',
  'TD Cadillac — Nick Chester',
  'Driver Cadillac — Sergio Perez',
  'Driver Cadillac — Valtteri Bottas',
]

const IP_PORTFOLIOS = [
  ...Array.from({ length: 20 }, (_, i) => `Journalist ${i + 1}`),
  ...Array.from({ length: 20 }, (_, i) => `Photographer ${i + 1}`),
  ...Array.from({ length: 20 }, (_, i) => `Caricaturist ${i + 1}`),
]

const committeePortfolios: Record<string, string[]> = {
  UNGA:  UN_COUNTRIES,
  UNCSW: UN_COUNTRIES,
  UNHRC: UN_COUNTRIES,
  AIPPM: AIPPM_PORTFOLIOS,
  FIA:   FIA_PORTFOLIOS,
  IP:    IP_PORTFOLIOS,
}

const portfolioLabel: Record<string, string> = {
  UNGA:  'Country Preference',
  UNCSW: 'Country Preference',
  UNHRC: 'Country Preference',
  AIPPM: 'Portfolio (Name & Party)',
  FIA:   'Portfolio (Role & Name)',
  IP:    'Role Preference',
}

// ─── Committee options ───────────────────────────────────────
const committeeOptions = [
  { value: 'UNCSW', label: 'UN Commission on the Status of Women (UNCSW)' },
  { value: 'AIPPM', label: 'All India Political Parties Meet (AIPPM)' },
  { value: 'UNHRC', label: 'UN Human Rights Council (UNHRC)' },
  { value: 'UNGA',  label: 'UN General Assembly (UNGA)' },
  { value: 'IP',    label: 'International Press (IP)' },
  { value: 'FIA',   label: 'Fédération Internationale de l\'Automobile (FIA)' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-inter text-[10px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
        {label} {required && <span className="text-[#5a8a8a]">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-inter text-[11px] text-rose-500/80">{error}</p>
      )}
    </div>
  )
}

export default function Application() {
  const [form, setForm]         = useState<FormState>(INITIAL)
  const [errors, setErrors]     = useState<Partial<FormState> & { screenshot?: string; form?: string }>({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [screenshot, setScreenshot]   = useState<File | null>(null)
  const [preview, setPreview]         = useState<string | null>(null)
  const fileRef                       = useRef<HTMLInputElement>(null)
  const qr                            = useQrTimer()

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { setErrors(p => ({ ...p, screenshot: 'File must be under 5 MB.' })); return }
    setScreenshot(f); setErrors(p => ({ ...p, screenshot: undefined }))
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  const handleCommitteeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(p => ({ ...p, committeePreference: e.target.value, portfolio1: '', portfolio2: '', portfolio3: '' }))
    setErrors(p => ({ ...p, committeePreference: undefined, portfolio1: undefined, portfolio2: undefined, portfolio3: undefined }))
  }

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [k]: e.target.value }))
      setErrors(p => ({ ...p, [k]: undefined }))
    }

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.fullName.trim())                            e.fullName = 'Full name is required.'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address.'
    if (!form.phone.match(/^\+?[\d\s\-()]{8,15}$/))      e.phone = 'Enter a valid phone number.'
    if (!form.institution.trim())                         e.institution = 'Institution name is required.'
    if (!form.committeePreference)                        e.committeePreference = 'Please select a committee.'
    if (!form.portfolio1)                                 e.portfolio1 = 'Please select your 1st preference.'
    if (!form.portfolio2)                                 e.portfolio2 = 'Please select your 2nd preference.'
    if (!form.portfolio3)                                 e.portfolio3 = 'Please select your 3rd preference.'
    if (form.portfolio1 && form.portfolio2 && form.portfolio1 === form.portfolio2)
      e.portfolio2 = '2nd preference must differ from 1st.'
    if (form.portfolio1 && form.portfolio3 && form.portfolio1 === form.portfolio3)
      e.portfolio3 = '3rd preference must differ from 1st.'
    if (form.portfolio2 && form.portfolio3 && form.portfolio2 === form.portfolio3)
      e.portfolio3 = '3rd preference must differ from 2nd.'
    if (!form.hasMunExperience) e.hasMunExperience = 'Please select an option.'
    if (!form.paymentAccountName.trim()) e.paymentAccountName = 'Please enter the account name used for payment.'
    setErrors(e)
    if (!screenshot) {
      setErrors(prev => ({ ...prev, ...e, screenshot: 'Payment screenshot is required before submitting.' }))
      return false
    }
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      // Upload screenshot to Google Drive (fire and forget)
      if (screenshot) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload  = () => resolve((reader.result as string).split(',')[1])
          reader.onerror = reject
          reader.readAsDataURL(screenshot)
        })
        fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.fullName, email: form.email, fileName: screenshot.name, fileBase64: base64 }),
        }).catch(() => {})
      }

      // Submit application fields to Formspree as JSON
      const res = await fetch('https://formspree.io/f/mgoryngd', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          'Full Name':            form.fullName,
          'Email':                form.email,
          'Phone':                form.phone,
          'Institution':          form.institution,
          'Committee':            form.committeePreference,
          '1st Portfolio Choice': form.portfolio1,
          '2nd Portfolio Choice': form.portfolio2,
          '3rd Portfolio Choice': form.portfolio3,
          'MUN Experience':        form.hasMunExperience === 'yes' ? 'Yes' : 'No',
          'Experience Details':    form.munExperienceDetails || '—',
          'Payment Account Name':  form.paymentAccountName,
          'Payment Screenshot':    screenshot?.name ?? '—',
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setForm(INITIAL)
        setScreenshot(null); setPreview(null)
        qr.hide()
      } else {
        const msg = data?.errors?.[0]?.message || `Error ${res.status}: Submission failed. Please try again.`
        setErrors(p => ({ ...p, form: msg }))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      setErrors(p => ({ ...p, form: 'Network error — please check your connection and try again.' }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  const portfolios    = form.committeePreference ? committeePortfolios[form.committeePreference] ?? [] : []
  const currentLabel  = form.committeePreference ? portfolioLabel[form.committeePreference] : 'Portfolio'

  const PortfolioSelect = ({ field, rank, exclude }: { field: 'portfolio1'|'portfolio2'|'portfolio3'; rank: string; exclude: string[] }) => (
    <Field label={`${rank} Choice — ${currentLabel}`} required error={errors[field]}>
      <select
        value={form[field]}
        onChange={set(field)}
        disabled={!form.committeePreference}
        className={`form-input ${errors[field] ? 'border-rose-900/60' : ''} disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <option value="">{!form.committeePreference ? 'Select a committee first' : `Select ${rank.toLowerCase()} choice`}</option>
        {portfolios.map(p => (
          <option key={p} value={p} disabled={exclude.includes(p) && form[field] !== p}>
            {exclude.includes(p) && form[field] !== p ? `— ${p}` : p}
          </option>
        ))}
      </select>
    </Field>
  )

  return (
    <section id="apply" className="relative py-20 md:py-40 px-4 sm:px-6 bg-[#0a0d12]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="section-label text-[#94a3b8]">Applications Open</div>
            <a
              href="https://docs.google.com/spreadsheets/d/16HP1FMzmPfQcIU52s8fkBxhD8GQj2j9EYE-7D9j8vZw/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-[9px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border border-[#2c5f5d]/70 bg-[#0e2020] text-[#52a19e] hover:border-[#2c5f5d] hover:text-[#7abfbd] hover:bg-[#0e2a2a] transition-all duration-300 shadow-[0_0_16px_rgba(44,95,93,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c5f5d] animate-pulse shadow-[0_0_6px_#2c5f5d]" />
              Live Matrix
            </a>
          </div>
          <h2 className="font-cinzel font-semibold text-3xl md:text-4xl lg:text-5xl text-[#e5e7eb] leading-tight">
            Claim Your Seat
          </h2>
          <p className="font-inter text-[#555] mt-4 max-w-md text-sm leading-relaxed">
            A confirmation email will be sent to you within 24 hours.
          </p>
        </motion.div>

        {/* Delegate Fees */}
        <motion.div {...fadeUp(0.15)} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">
              Delegate Fees
            </p>
            <span className="font-inter text-[7px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[#2c5f5d]/40 text-[#3d8a87] bg-[#0e1a1a]">
              🐦 Early Bird — Ends June 1
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="card rounded-xl p-5 flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-inter text-[8px] font-bold tracking-[0.18em] uppercase text-[#475569]">
                  UNGA · UNCSW · UNHRC · AIPPM · FIA
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-cinzel font-bold text-xl text-[#2c5f5d]">₹1,750</span>
                  <span className="font-inter text-[9px] text-[#333] line-through">₹2,000</span>
                </div>
                <span className="font-inter text-[9px] text-[#333] tracking-wide">Per delegate</span>
              </div>
            </div>
            <div className="card rounded-xl p-5 flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-inter text-[8px] font-bold tracking-[0.18em] uppercase text-[#475569]">
                  International Press (IP)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-cinzel font-bold text-xl text-[#2c5f5d]">₹1,700</span>
                  <span className="font-inter text-[9px] text-[#333] line-through">₹1,950</span>
                </div>
                <span className="font-inter text-[9px] text-[#333] tracking-wide">Per delegate</span>
              </div>
            </div>
          </div>
          <p className="font-inter text-[9px] text-[#2a2a2a] mt-3 tracking-wide">
            Fee includes access to all sessions, welcome kit, meals, and the closing banquet.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="card rounded-xl p-14 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full border border-[#1e3232] bg-[#0e1a1a] flex items-center justify-center mb-6">
                <CheckCircle className="text-[#5a8a8a]" size={28} />
              </div>
              <h3 className="font-cinzel font-semibold text-xl text-[#dedad4] mb-3">Application Received</h3>
              <p className="font-inter text-[#555] max-w-sm leading-relaxed text-sm mb-8">
                Thank you for applying to the Senatus Summit 2026. A confirmation email will be sent within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-outline font-inter font-medium text-sm tracking-[0.08em] px-6 py-2.5 rounded-md"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              noValidate
              className="card rounded-xl p-5 sm:p-7 md:p-10 space-y-5 md:space-y-6"
            >
              {/* Global error banner */}
              {errors.form && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 font-inter text-xs tracking-wide">
                  ⚠ {errors.form}
                </div>
              )}
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name" required error={errors.fullName}>
                  <input type="text" placeholder="John Doe" value={form.fullName} onChange={set('fullName')}
                    className={`form-input ${errors.fullName ? 'border-rose-900/60' : ''}`} />
                </Field>
                <Field label="Email Address" required error={errors.email}>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')}
                    className={`form-input ${errors.email ? 'border-rose-900/60' : ''}`} />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Phone Number" required error={errors.phone}>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')}
                    className={`form-input ${errors.phone ? 'border-rose-900/60' : ''}`} />
                </Field>
                <Field label="Institution / School" required error={errors.institution}>
                  <input type="text" placeholder="Your college or school" value={form.institution} onChange={set('institution')}
                    className={`form-input ${errors.institution ? 'border-rose-900/60' : ''}`} />
                </Field>
              </div>

              {/* Row 3 — Committee */}
              <Field label="Committee Preference" required error={errors.committeePreference}>
                <select
                  value={form.committeePreference}
                  onChange={handleCommitteeChange}
                  className={`form-input ${errors.committeePreference ? 'border-rose-900/60' : ''}`}
                >
                  <option value="">Select a committee</option>
                  {committeeOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>

              {/* Portfolio Preferences */}
              <div className="space-y-3">
                <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">
                  Portfolio Preferences <span className="text-[#5a8a8a]">*</span>
                  <span className="ml-2 normal-case font-normal text-[#333]">— rank your top 3, we'll allot one</span>
                </p>
                <PortfolioSelect field="portfolio1" rank="1st" exclude={[form.portfolio2, form.portfolio3].filter(Boolean)} />
                <PortfolioSelect field="portfolio2" rank="2nd" exclude={[form.portfolio1, form.portfolio3].filter(Boolean)} />
                <PortfolioSelect field="portfolio3" rank="3rd" exclude={[form.portfolio1, form.portfolio2].filter(Boolean)} />
              </div>

              {/* MUN Experience */}
              <Field label="Prior MUN Experience" required error={errors.hasMunExperience}>
                <div className="flex gap-3">
                  {[
                    { v: 'yes', l: 'Yes, I have experience' },
                    { v: 'no',  l: 'No, this is my first MUN' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.v}
                      onClick={() => {
                        setForm(p => ({ ...p, hasMunExperience: opt.v }))
                        setErrors(p => ({ ...p, hasMunExperience: undefined }))
                      }}
                      className={`flex-1 py-2.5 rounded-md text-xs font-inter font-medium transition-colors duration-200 border ${
                        form.hasMunExperience === opt.v
                          ? 'bg-[#101a1a] border-[#1e3232] text-[#7aa0a0]'
                          : 'bg-transparent border-[#222] text-[#484440] hover:border-[#2e2e2e]'
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </Field>

              {form.hasMunExperience === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                >
                  <Field label="MUN Experience Details">
                    <input type="text" placeholder="e.g. 3 MUNs, Best Delegate at XYZ MUN 2024"
                      value={form.munExperienceDetails} onChange={set('munExperienceDetails')} className="form-input" />
                  </Field>
                </motion.div>
              )}

              {/* ── Payment Section ── */}
              <div className="border border-[#1c232b] rounded-xl p-5 space-y-4 bg-[#0d1117]">
                <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569]">
                  Step — Pay Registration Fee
                </p>

                {/* QR Reveal */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex flex-col items-center gap-3">
                    <AnimatePresence mode="wait">
                      {qr.qrVisible ? (
                        <motion.div key="qr-on" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="font-inter text-[8px] text-[#475569] flex items-center gap-1 uppercase tracking-widest"><Timer size={9} /> Expires in</span>
                            <span className="font-cinzel font-bold text-xs" style={{ color: qr.color }}>{formatTime(qr.timeLeft)}</span>
                          </div>
                          <div className="w-full h-px bg-[#1c232b] rounded overflow-hidden">
                            <motion.div className="h-full" style={{ backgroundColor: qr.color }} animate={{ width: `${(qr.timeLeft / TIMER_SECONDS) * 100}%` }} transition={{ duration: 0.9, ease: 'linear' }} />
                          </div>
                          <div className="w-40 h-40 rounded-lg overflow-hidden border border-[#1c232b] bg-white">
                            <Image src="/qr.png" alt="UPI QR" width={160} height={160} className="object-contain w-full h-full" />
                          </div>
                          <p className="font-cinzel font-bold text-[11px] tracking-[0.12em] text-[#94a3b8]">Badisetty Manasa</p>
                          <p className="font-inter text-[10px] tracking-[0.08em] text-[#475569]">saicharantejj@ptyes</p>
                          <button onClick={qr.hide} className="font-inter text-[8px] text-[#333] hover:text-[#475569] uppercase tracking-widest transition-colors">Hide</button>
                        </motion.div>
                      ) : (
                        <motion.div key="qr-off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                          <div className="w-40 h-40 rounded-lg border border-dashed border-[#1c232b] bg-[#0a0d12] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2c5f5d] transition-colors group" onClick={qr.start}>
                            <QrCode size={32} className="text-[#1c232b] group-hover:text-[#2c5f5d] transition-colors" />
                            <span className="font-inter text-[8px] text-[#333] tracking-widest uppercase">Tap to reveal</span>
                          </div>
                          <button onClick={qr.start} className="btn-primary font-inter text-[9px] tracking-[0.12em] uppercase px-4 py-2 rounded-lg flex items-center gap-1.5">
                            <QrCode size={11} /> Show QR Code
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Account name + Screenshot upload */}
                  <div className="flex-1 flex flex-col gap-4">
                    <Field label="Account Name Used for Payment" required error={errors.paymentAccountName}>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.paymentAccountName}
                        onChange={set('paymentAccountName')}
                        className={`form-input ${errors.paymentAccountName ? 'border-rose-900/60' : ''}`}
                      />
                    </Field>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] font-semibold tracking-[0.14em] uppercase text-[#484440]">
                      Upload Payment Screenshot <span className="text-rose-500">* Required</span>
                    </label>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    {preview ? (
                      <div className="relative rounded-lg overflow-hidden border border-[#1c232b]">
                        <img src={preview} alt="preview" className="w-full object-cover max-h-40" />
                        <button onClick={() => { setScreenshot(null); setPreview(null) }} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0a0d12]/80 border border-[#1c232b] flex items-center justify-center text-[#475569] hover:text-white">
                          <X size={10} />
                        </button>
                        <div className="absolute bottom-2 left-2 font-inter text-[8px] bg-[#0e1a1a] border border-[#1e3232] text-[#5a8a8a] px-2 py-0.5 rounded">✓ Screenshot attached</div>
                      </div>
                    ) : (
                      <button onClick={() => fileRef.current?.click()} className={`w-full border border-dashed rounded-lg p-6 flex flex-col items-center gap-2 transition-colors group ${errors.screenshot ? 'border-rose-900/60 bg-rose-950/10' : 'border-[#1c232b] hover:border-[#2c5f5d]'}`}>
                        <Upload size={18} className={errors.screenshot ? 'text-rose-900/60' : 'text-[#1c232b] group-hover:text-[#2c5f5d] transition-colors'} />
                        <span className="font-inter text-[9px] text-[#333]">Tap to upload screenshot</span>
                      </button>
                    )}
                    {errors.screenshot && <p className="font-inter text-[10px] text-rose-500/80">{errors.screenshot}</p>}
                  </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !screenshot}
                  className="btn-primary w-full py-3.5 rounded-md font-cinzel font-medium tracking-[0.15em] text-xs flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                  ) : !screenshot ? (
                    'Upload Payment Screenshot to Continue'
                  ) : (
                    'Submit Application'
                  )}
                </button>
                <p className="font-inter text-[10px] text-[#333] text-center mt-3 tracking-wide">
                  All information provided is kept strictly confidential.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
