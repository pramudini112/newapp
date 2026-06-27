import React, { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  Home,
  BedDouble,
  Image,
  DollarSign,
  CheckCircle2,
} from 'lucide-react'

interface Props {
  onBack: () => void
  onDone: () => void
}

// ── Step 1 state ───────────────────────────────────────────────────────────
interface Step1 {
  name: string
  description: string
  type: 'Hostel' | 'Annex' | 'Room' | ''
  location: string
}

// ── Step 2 state ───────────────────────────────────────────────────────────
interface Step2 {
  totalRooms: string
  totalBeds: string
  bathrooms: string
  amenities: string[]
}

// ── Step 3 state ───────────────────────────────────────────────────────────
interface Step3 {
  monthlyRent: string
  deposit: string
  rules: string
}

const AMENITY_OPTIONS = ['WiFi', 'Parking', 'Meals', 'AC', 'Hot Water', 'Laundry', 'CCTV', 'Garden']
const BOARDING_TYPES  = ['Hostel', 'Annex', 'Room'] as const

const STEPS = [
  { label: 'Basic Information', icon: Home        },
  { label: 'Room Details',      icon: BedDouble   },
  { label: 'Pricing & Rules',   icon: DollarSign  },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {STEPS.map((s, i) => {
        const done   = i < current
        const active = i === current
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all duration-300"
                style={{
                  background: done || active ? 'var(--brand-gradient)' : 'hsl(220,20%,92%)',
                  color: done || active ? 'white' : 'var(--text-secondary)',
                }}
              >
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span
                className="text-[9px] font-semibold mt-1 whitespace-nowrap"
                style={{ color: active ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-1 mb-4 rounded-full transition-all duration-300"
                style={{ background: i < current ? 'var(--brand-primary)' : 'hsl(220,20%,88%)' }}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default function AddBoardingPage({ onBack, onDone }: Props) {
  const [step, setStep] = useState(0)

  const [s1, setS1] = useState<Step1>({ name: '', description: '', type: '', location: '' })
  const [s2, setS2] = useState<Step2>({ totalRooms: '', totalBeds: '', bathrooms: '', amenities: [] })
  const [s3, setS3] = useState<Step3>({ monthlyRent: '', deposit: '', rules: '' })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // ── validation ────────────────────────────────────────────────────────
  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!s1.name.trim())        e.name     = 'Boarding name is required'
    if (!s1.description.trim()) e.description = 'Description is required'
    if (!s1.type)               e.type     = 'Please select a boarding type'
    if (!s1.location.trim())    e.location = 'Location is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!s2.totalRooms) e.totalRooms = 'Required'
    if (!s2.totalBeds)  e.totalBeds  = 'Required'
    if (!s2.bathrooms)  e.bathrooms  = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep3 = () => {
    const e: Record<string, string> = {}
    if (!s3.monthlyRent) e.monthlyRent = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 0 && validateStep1()) { setErrors({}); setStep(1) }
    if (step === 1 && validateStep2()) { setErrors({}); setStep(2) }
    if (step === 2 && validateStep3()) { setErrors({}); onDone() }
  }

  const toggleAmenity = (a: string) =>
    setS2(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter(x => x !== a)
        : [...prev.amenities, a],
    }))

  const err = (k: string) => errors[k]
    ? <p className="mt-1 text-[11px] text-red-500">{errors[k]}</p>
    : null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 px-5 pt-5 pb-4 flex items-center gap-3"
        style={{ background: 'white', boxShadow: '0 2px 16px 0 rgba(108,72,234,0.07)' }}
      >
        <button
          onClick={step === 0 ? onBack : () => setStep(s => s - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-50 transition-colors"
        >
          <ArrowLeft size={20} style={{ color: 'var(--brand-primary)' }} />
        </button>
        <h1 className="text-base font-extrabold tracking-tight flex-1 text-center pr-9"
            style={{ color: 'var(--text-primary)' }}>
          Add New Boarding
        </h1>
      </header>

      {/* ── Body ── */}
      <main className="flex-1 overflow-y-auto px-5 pt-6 pb-32 max-w-lg mx-auto w-full">

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* ── STEP 1 : Basic Information ── */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-up">
            <p className="text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--brand-primary)' }}>
              1/3 Basic Information
            </p>

            {/* Boarding Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Boarding Name
              </label>
              <input
                type="text"
                placeholder="Enter boarding name"
                className="input-field"
                style={err('name') ? { borderColor: '#ef4444' } : {}}
                value={s1.name}
                onChange={e => { setS1(p => ({ ...p, name: e.target.value })); setErrors(v => ({ ...v, name: '' })) }}
              />
              {err('name')}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe your property"
                className="input-field resize-none"
                style={err('description') ? { borderColor: '#ef4444' } : {}}
                value={s1.description}
                onChange={e => { setS1(p => ({ ...p, description: e.target.value })); setErrors(v => ({ ...v, description: '' })) }}
              />
              {err('description')}
            </div>

            {/* Boarding Type */}
            <div>
              <label className="block text-xs font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Boarding Type
              </label>
              <div className="flex gap-2">
                {BOARDING_TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setS1(p => ({ ...p, type: t })); setErrors(v => ({ ...v, type: '' })) }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200"
                    style={{
                      borderColor: s1.type === t ? 'var(--brand-primary)' : 'var(--input-border)',
                      background:  s1.type === t ? 'var(--brand-primary)' : 'white',
                      color:       s1.type === t ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {err('type')}
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="input-field pr-32"
                  style={err('location') ? { borderColor: '#ef4444' } : {}}
                  value={s1.location}
                  onChange={e => { setS1(p => ({ ...p, location: e.target.value })); setErrors(v => ({ ...v, location: '' })) }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  <MapPin size={12} /> Select on Map
                </button>
              </div>
              {err('location')}
            </div>
          </div>
        )}

        {/* ── STEP 2 : Room Details ── */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-up">
            <p className="text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--brand-primary)' }}>
              2/3 Room Details
            </p>

            {/* Counts row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Rooms',  key: 'totalRooms' },
                { label: 'Total Beds',   key: 'totalBeds'  },
                { label: 'Bathrooms',    key: 'bathrooms'  },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="input-field text-center"
                    style={err(key) ? { borderColor: '#ef4444' } : {}}
                    value={(s2 as any)[key]}
                    onChange={e => { setS2(p => ({ ...p, [key]: e.target.value })); setErrors(v => ({ ...v, [key]: '' })) }}
                  />
                  {err(key)}
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map(a => {
                  const on = s2.amenities.includes(a)
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200"
                      style={{
                        borderColor: on ? 'var(--brand-primary)' : 'var(--input-border)',
                        background:  on ? 'var(--brand-primary)' : 'white',
                        color:       on ? 'white' : 'var(--text-secondary)',
                      }}
                    >
                      {a}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Photo upload placeholder */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Photos
              </label>
              <div
                className="w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:border-brand-400"
                style={{ borderColor: 'var(--input-border)', background: 'hsl(252,100%,98%)' }}
              >
                <Image size={24} style={{ color: 'var(--brand-primary)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Tap to upload photos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 : Pricing & Rules ── */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-up">
            <p className="text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--brand-primary)' }}>
              3/3 Pricing &amp; Rules
            </p>

            {/* Monthly rent */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Monthly Rent (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold"
                      style={{ color: 'var(--text-secondary)' }}>Rs.</span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="input-field pl-10"
                  style={err('monthlyRent') ? { borderColor: '#ef4444' } : {}}
                  value={s3.monthlyRent}
                  onChange={e => { setS3(p => ({ ...p, monthlyRent: e.target.value })); setErrors(v => ({ ...v, monthlyRent: '' })) }}
                />
              </div>
              {err('monthlyRent')}
            </div>

            {/* Security deposit */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Security Deposit (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold"
                      style={{ color: 'var(--text-secondary)' }}>Rs.</span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="input-field pl-10"
                  value={s3.deposit}
                  onChange={e => setS3(p => ({ ...p, deposit: e.target.value }))}
                />
              </div>
            </div>

            {/* House rules */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                House Rules
              </label>
              <textarea
                rows={4}
                placeholder="e.g. No smoking, No pets, Curfew at 10pm…"
                className="input-field resize-none"
                value={s3.rules}
                onChange={e => setS3(p => ({ ...p, rules: e.target.value }))}
              />
            </div>

            {/* Summary card */}
            {(s1.name || s1.type || s3.monthlyRent) && (
              <div
                className="rounded-2xl p-4 space-y-1.5"
                style={{ background: 'hsl(252,100%,97%)', border: '1.5px solid hsl(252,60%,88%)' }}
              >
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--brand-primary)' }}>Summary</p>
                {s1.name      && <Row label="Name"      value={s1.name} />}
                {s1.type      && <Row label="Type"      value={s1.type} />}
                {s1.location  && <Row label="Location"  value={s1.location} />}
                {s2.totalBeds && <Row label="Total Beds" value={s2.totalBeds} />}
                {s3.monthlyRent && <Row label="Rent"    value={`Rs. ${Number(s3.monthlyRent).toLocaleString()}`} />}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom Next button ── */}
      <div
        className="fixed bottom-0 inset-x-0 px-5 py-4 z-20"
        style={{ background: 'white', boxShadow: '0 -2px 20px 0 rgba(108,72,234,0.09)' }}
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleNext}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {step < 2 ? (
              <>Next <ChevronRight size={16} /></>
            ) : (
              <>Submit Boarding <CheckCircle2 size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}
