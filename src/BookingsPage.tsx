import React, { useState } from 'react'
import { ArrowLeft, MapPin, Heart, Home, Compass, BookOpen, User, Calendar } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home',     Icon: Home     },
  { label: 'Search',   Icon: Compass  },
  { label: 'Bookings', Icon: BookOpen },
  { label: 'Profile',  Icon: User     },
]

type Tab = 'Active' | 'Completed' | 'Cancelled'

const ALL_BOOKINGS = [
  {
    id: 1,
    name: 'Green View Annex',
    location: 'Malabe, Sri Lanka',
    checkIn: '01 Jun 2025',
    checkOut: '01 Dec 2025',
    status: 'Active' as Tab,
    statusLabel: 'Confirmed',
    statusColor: '#7c3aed',
    statusBg: 'hsl(252,100%,95%)',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Blue Haven Hostel',
    location: 'Colombo, Sri Lanka',
    checkIn: '10 Mar 2025',
    checkOut: '10 Nov 2025',
    status: 'Active' as Tab,
    statusLabel: 'Pending',
    statusColor: '#d97706',
    statusBg: 'hsl(38,100%,93%)',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Sunshine Annex',
    location: 'Boralesgamuwa, Sri Lanka',
    checkIn: '05 Jan 2025',
    checkOut: '05 Sep 2025',
    status: 'Completed' as Tab,
    statusLabel: 'Completed',
    statusColor: '#16a34a',
    statusBg: 'hsl(142,76%,93%)',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'City View Residency',
    location: 'Colombo 7, Sri Lanka',
    checkIn: '01 Feb 2025',
    checkOut: '01 Aug 2025',
    status: 'Cancelled' as Tab,
    statusLabel: 'Cancelled',
    statusColor: '#dc2626',
    statusBg: 'hsl(0,86%,94%)',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80&auto=format&fit=crop',
  },
]

interface Props {
  onBack: () => void
}

export default function BookingsPage({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Active')
  const [activeNav, setActiveNav] = useState('Bookings')
  const [savedIds, setSavedIds]   = useState<number[]>([])

  const toggle = (id: number) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const filtered = ALL_BOOKINGS.filter(b => b.status === activeTab)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Phone frame */}
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden animate-fade-up flex flex-col"
        style={{
          background: '#f4f3fb',
          boxShadow: '0 24px 80px 0 rgba(108,72,234,0.18)',
          minHeight: '780px',
        }}
      >
        {/* Top gradient bar */}
        <div
          className="absolute inset-x-0 top-0 h-1.5 rounded-t-[2.5rem]"
          style={{ background: 'var(--brand-gradient)' }}
        />

        {/* ── HEADER ── */}
        <div
          className="flex-shrink-0 px-5 pt-8 pb-4 flex items-center gap-3"
          style={{ background: 'white', borderBottom: '1px solid hsl(252,30%,93%)' }}
        >
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'hsl(252,100%,97%)' }}
          >
            <ArrowLeft size={18} style={{ color: 'var(--brand-primary)' }} />
          </button>
          <h1 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            My Bookings
          </h1>
        </div>

        {/* ── TABS ── */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3"
          style={{ background: 'white', borderBottom: '1px solid hsl(252,30%,93%)' }}
        >
          {(['Active', 'Completed', 'Cancelled'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-2xl text-xs font-bold transition-all duration-200"
              style={
                activeTab === tab
                  ? {
                      background: 'var(--brand-gradient)',
                      color: 'white',
                      boxShadow: '0 3px 12px rgba(108,72,234,0.30)',
                    }
                  : {
                      background: 'hsl(252,50%,97%)',
                      color: 'var(--text-secondary)',
                    }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── LIST ── */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-56 gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'hsl(252,100%,96%)' }}
              >
                <Calendar size={26} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <p className="text-sm font-semibold text-center" style={{ color: 'var(--text-secondary)' }}>
                No {activeTab.toLowerCase()} bookings yet.
              </p>
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 16px rgba(108,72,234,0.08)',
                }}
              >
                <div className="flex">
                  {/* Image */}
                  <div className="relative w-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '108px' }}
                    />
                    {/* Heart */}
                    <button
                      onClick={() => toggle(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.85)' }}
                    >
                      <Heart
                        size={13}
                        fill={savedIds.includes(item.id) ? 'var(--brand-primary)' : 'none'}
                        style={{ color: savedIds.includes(item.id) ? 'var(--brand-primary)' : '#888' }}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                    {/* Name + status */}
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                      </p>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0"
                        style={{ color: item.statusColor, background: item.statusBg }}
                      >
                        {item.statusLabel}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={10} style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                        {item.location}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="mt-2 flex gap-3">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                          Check-in
                        </p>
                        <p className="text-[11px] font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                          {item.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                          Check-out
                        </p>
                        <p className="text-[11px] font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                          {item.checkOut}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action strip for active bookings */}
                {item.status === 'Active' && (
                  <div
                    className="flex border-t"
                    style={{ borderColor: 'hsl(252,30%,93%)' }}
                  >
                    <button
                      className="flex-1 py-2.5 text-xs font-bold transition-colors"
                      style={{ color: '#dc2626' }}
                    >
                      Cancel
                    </button>
                    <div style={{ width: '1px', background: 'hsl(252,30%,93%)' }} />
                    <button
                      className="flex-1 py-2.5 text-xs font-bold transition-colors"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      View Details
                    </button>
                  </div>
                )}
                {item.status === 'Completed' && (
                  <div
                    className="flex border-t"
                    style={{ borderColor: 'hsl(252,30%,93%)' }}
                  >
                    <button
                      className="flex-1 py-2.5 text-xs font-bold"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      Leave a Review
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* ── BOTTOM NAV ── */}
        <div
          className="absolute bottom-0 inset-x-0 flex items-center justify-around px-2 py-3"
          style={{
            background: 'white',
            borderTop: '1px solid hsl(252,30%,93%)',
            boxShadow: '0 -4px 20px rgba(108,72,234,0.08)',
          }}
        >
          {NAV_ITEMS.map(({ label, Icon }) => {
            const active = activeNav === label
            return (
              <button
                key={label}
                onClick={() => {
                  setActiveNav(label)
                  if (label === 'Home') onBack()
                }}
                className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-150"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-150"
                  style={active ? { background: 'hsl(252,100%,96%)' } : {}}
                >
                  <Icon
                    size={19}
                    style={{ color: active ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
                  />
                </div>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: active ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
