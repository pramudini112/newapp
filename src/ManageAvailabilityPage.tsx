import React, { useState } from 'react'
import { ArrowLeft, Minus, Plus, BedDouble, CheckCircle2 } from 'lucide-react'

interface Boarding {
  id: number
  name: string
  location: string
  beds: number
  occupied: number
  image: string
}

interface Props {
  boarding: Boarding
  onBack: () => void
  onSave: (updated: Boarding) => void
}

function Counter({
  label,
  value,
  onChange,
  color = 'var(--text-primary)',
  max,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  color?: string
  max?: number
  min?: number
}) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: 'hsl(220,20%,96%)', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.13)' }}
    >
      <div className="flex items-center gap-2">
        <BedDouble size={16} style={{ color: 'var(--brand-primary)' }} />
        <p className="text-xs font-bold tracking-wide" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-150 active:scale-90 disabled:opacity-30"
          style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)', background: 'white' }}
        >
          <Minus size={18} />
        </button>

        <p className="text-4xl font-extrabold tabular-nums" style={{ color }}>{value}</p>

        <button
          onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
          disabled={max !== undefined && value >= max}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-150 active:scale-90 disabled:opacity-30"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}

export default function ManageAvailabilityPage({ boarding, onBack, onSave }: Props) {
  const [totalBeds, setTotalBeds]   = useState(boarding.beds)
  const [occupied,  setOccupied]    = useState(boarding.occupied)
  const [saved,     setSaved]       = useState(false)

  const vacant = totalBeds - occupied

  // keep occupied ≤ totalBeds
  const handleTotalBeds = (v: number) => {
    setTotalBeds(v)
    if (occupied > v) setOccupied(v)
  }

  const handleSave = () => {
    onSave({ ...boarding, beds: totalBeds, occupied })
    setSaved(true)
    setTimeout(() => { setSaved(false); onBack() }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-20 px-5 pt-5 pb-4 flex items-center gap-3"
        style={{ background: 'white', boxShadow: '0 2px 16px 0 rgba(108,72,234,0.07)' }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-50 transition-colors"
        >
          <ArrowLeft size={20} style={{ color: 'var(--brand-primary)' }} />
        </button>
        <h1 className="text-base font-extrabold flex-1 text-center pr-9" style={{ color: 'var(--text-primary)' }}>
          Manage Availability
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-5 pb-32 max-w-lg mx-auto w-full space-y-5">

        {/* Property card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 4px 20px 0 rgba(108,72,234,0.12)' }}
        >
          <img src={boarding.image} alt={boarding.name} className="w-full h-32 object-cover" />
          <div
            className="px-4 py-3"
            style={{ background: 'var(--brand-gradient)' }}
          >
            <p className="text-white font-extrabold text-sm">{boarding.name}</p>
            <p className="text-white/80 text-[11px] mt-0.5">{boarding.location}</p>
          </div>
        </div>

        {/* Live summary bar */}
        <div
          className="rounded-2xl px-5 py-4 flex items-center justify-around"
          style={{ background: 'white', boxShadow: '0 4px 20px 0 rgba(108,72,234,0.09)' }}
        >
          <div className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{totalBeds}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--text-secondary)' }}>Total Beds</p>
          </div>
          <div className="w-px h-10" style={{ background: 'hsl(252,30%,88%)' }} />
          <div className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: '#d97706' }}>{occupied}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--text-secondary)' }}>Occupied</p>
          </div>
          <div className="w-px h-10" style={{ background: 'hsl(252,30%,88%)' }} />
          <div className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: '#059669' }}>{vacant}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--text-secondary)' }}>Vacant</p>
          </div>
        </div>

        {/* Occupancy progress bar */}
        <div>
          <div className="flex justify-between text-[11px] font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            <span>Occupancy</span>
            <span>{totalBeds > 0 ? Math.round((occupied / totalBeds) * 100) : 0}%</span>
          </div>
          <div className="h-3 rounded-full w-full overflow-hidden" style={{ background: 'hsl(252,30%,90%)' }}>
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${totalBeds > 0 ? (occupied / totalBeds) * 100 : 0}%`,
                background: 'var(--brand-gradient)',
              }}
            />
          </div>
        </div>

        {/* Counters */}
        <Counter
          label="TOTAL BEDS"
          value={totalBeds}
          onChange={handleTotalBeds}
          min={1}
          color="var(--text-primary)"
        />

        <Counter
          label="OCCUPIED BEDS"
          value={occupied}
          onChange={setOccupied}
          max={totalBeds}
          min={0}
          color="#d97706"
        />

        {/* Vacant (read-only display) */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'hsl(160,60%,96%)', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.08)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BedDouble size={16} style={{ color: '#059669' }} />
            <p className="text-xs font-bold tracking-wide" style={{ color: '#059669' }}>VACANT BEDS</p>
            <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'hsl(160,84%,88%)', color: '#059669' }}>
              Auto-calculated
            </span>
          </div>
          <p className="text-4xl font-extrabold" style={{ color: '#059669' }}>{vacant}</p>
        </div>

      </main>

      {/* Save button */}
      <div
        className="fixed bottom-0 inset-x-0 px-5 py-4 z-20"
        style={{ background: 'white', boxShadow: '0 -2px 20px 0 rgba(108,72,234,0.09)' }}
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSave}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {saved
              ? <><CheckCircle2 size={18} /> Saved!</>
              : 'Save Changes'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
