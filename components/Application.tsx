'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Lock } from 'lucide-react'

interface FormState {
  fullName: string
  email: string
  phone: string
  institution: string
  portfolioPreference: string
  committeePreference: string
  hasMunExperience: string
  munExperienceDetails: string
}

interface TakenCombo {
  committee: string
  country: string
}

const INITIAL: FormState = {
  fullName: '', email: '', phone: '', institution: '',
  portfolioPreference: '', committeePreference: '',
  hasMunExperience: '', munExperienceDetails: '',
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
  const [form, setForm]               = useState<FormState>(INITIAL)
  const [errors, setErrors]           = useState<Partial<FormState>>({})
  const [loading, setLoading]         = useState(false)
  const [success, setSuccess]         = useState(false)
  const [takenCombos, setTakenCombos] = useState<TakenCombo[]>([])
  const [loadingMatrix, setLoadingMatrix] = useState(true)

  // Fetch taken combos on mount + poll every 30s for live sync with sheet
  useEffect(() => {
    const fetchTaken = () =>
      fetch('/api/taken')
        .then(r => r.json())
        .then(d => setTakenCombos(d.taken || []))
        .catch(() => {})
        .finally(() => setLoadingMatrix(false))

    fetchTaken()
    const interval = setInterval(fetchTaken, 30_000)
    return () => clearInterval(interval)
  }, [])

  const handleCommitteeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(p => ({ ...p, committeePreference: e.target.value, portfolioPreference: '' }))
    setErrors(p => ({ ...p, committeePreference: undefined, portfolioPreference: undefined }))
  }

  const isPortfolioTaken = (portfolio: string) => {
    if (!form.committeePreference) return false
    return takenCombos.some(
      c => c.committee === form.committeePreference && c.country === portfolio
    )
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
    if (!form.portfolioPreference)                        e.portfolioPreference = 'Please select a portfolio.'
    if (form.portfolioPreference && isPortfolioTaken(form.portfolioPreference))
      e.portfolioPreference = 'This portfolio is already taken for the selected committee.'
    if (!form.hasMunExperience)                           e.hasMunExperience = 'Please select an option.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      const payload = {
        'Full Name':          form.fullName,
        'Email':              form.email,
        'Phone':              form.phone,
        'Institution':        form.institution,
        'Committee':          form.committeePreference,
        'Portfolio':          form.portfolioPreference,
        'MUN Experience':     form.hasMunExperience === 'yes' ? 'Yes' : 'No',
        'Experience Details': form.munExperienceDetails || '—',
      }

      // Send to Formspree (email notification)
      const res = await fetch('https://formspree.io/f/mgoryngd', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok) {
        // Also log to Google Sheet for taken tracking (fire and forget)
        fetch('/api/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }).catch(() => {})

        setTakenCombos(prev => [
          ...prev,
          { committee: form.committeePreference, country: form.portfolioPreference },
        ])
        setSuccess(true)
        setForm(INITIAL)
      } else {
        setErrors(p => ({ ...p, portfolioPreference: data?.errors?.[0]?.message || 'Submission failed.' }))
      }
    } catch {
      setErrors(p => ({ ...p, portfolioPreference: 'Submission failed. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  const currentPortfolios = form.committeePreference
    ? committeePortfolios[form.committeePreference] ?? []
    : []

  const currentLabel = form.committeePreference
    ? portfolioLabel[form.committeePreference]
    : 'Portfolio Preference'

  const takenForCommittee = form.committeePreference
    ? takenCombos.filter(c => c.committee === form.committeePreference).map(c => c.country)
    : []

  return (
    <section id="apply" className="relative py-20 md:py-40 px-4 sm:px-6 bg-[#0a0d12]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <div className="section-label mb-6 text-[#94a3b8]">Applications Open</div>
          <h2 className="font-cinzel font-semibold text-3xl md:text-4xl lg:text-5xl text-[#e5e7eb] leading-tight">
            Claim Your Seat
          </h2>
          <p className="font-inter text-[#555] mt-4 max-w-md text-sm leading-relaxed">
            A confirmation email will be sent to you within 24 hours.
          </p>
        </motion.div>

        {/* Delegate Fees */}
        <motion.div {...fadeUp(0.15)} className="mb-10">
          <p className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-[#475569] mb-4">
            Delegate Fees
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="card rounded-xl p-5 flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-inter text-[8px] font-bold tracking-[0.18em] uppercase text-[#475569]">
                  UNGA · UNCSW · UNHRC · AIPPM · FIA
                </span>
                <span className="font-cinzel font-bold text-xl text-[#2c5f5d]">₹1,900</span>
                <span className="font-inter text-[9px] text-[#333] tracking-wide">Per delegate</span>
              </div>
            </div>
            <div className="card rounded-xl p-5 flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-inter text-[8px] font-bold tracking-[0.18em] uppercase text-[#475569]">
                  International Press (IP)
                </span>
                <span className="font-cinzel font-bold text-xl text-[#2c5f5d]">₹1,800</span>
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

              {/* Row 3 — Committee first, then Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <Field label={currentLabel} required error={errors.portfolioPreference}>
                  <select
                    value={form.portfolioPreference}
                    onChange={set('portfolioPreference')}
                    disabled={!form.committeePreference || loadingMatrix}
                    className={`form-input ${errors.portfolioPreference ? 'border-rose-900/60' : ''} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <option value="">
                      {!form.committeePreference
                        ? 'Select a committee first'
                        : loadingMatrix
                        ? 'Loading availability…'
                        : `Select ${currentLabel.toLowerCase()}`}
                    </option>
                    {currentPortfolios.map((p) => {
                      const taken = isPortfolioTaken(p)
                      return (
                        <option key={p} value={p} disabled={taken}>
                          {taken ? `⛔ ${p} — Taken` : p}
                        </option>
                      )
                    })}
                  </select>

                  {form.committeePreference && takenForCommittee.length > 0 && (
                    <div className="flex items-start gap-1.5 mt-1.5">
                      <Lock size={10} className="text-[#475569] mt-0.5 shrink-0" />
                      <p className="font-inter text-[9px] text-[#475569] leading-relaxed">
                        <span className="text-[#5a8a8a]">{takenForCommittee.length} taken</span>
                        {' '}in {form.committeePreference}
                      </p>
                    </div>
                  )}
                </Field>
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

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 rounded-md font-cinzel font-medium tracking-[0.15em] text-xs flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting…</>
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
