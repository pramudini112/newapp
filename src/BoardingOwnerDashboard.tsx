import React, { useState } from 'react'
import AddBoardingPage from './AddBoardingPage'
import ManageAvailabilityPage from './ManageAvailabilityPage'
import {
  Menu,
  Bell,
  Search,
  Home,
  Building2,
  CalendarCheck,
  User,
  ChevronRight,
  BedDouble,
  DollarSign,
  Clock,
  Star,
  MapPin,
  LogOut,
  X,
  Plus,
} from 'lucide-react'

interface Props {
  userName: string
  onLogout: () => void
}

type Tab = 'dashboard' | 'boardings' | 'reservations' | 'profile'

// ── mock data ──────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Boardings',    value: '5',          icon: Building2,     color: '#7c3aed', bg: 'hsl(252,100%,96%)' },
  { label: 'Total Beds',         value: '28',          icon: BedDouble,     color: '#0891b2', bg: 'hsl(196,90%,95%)' },
  { label: 'Active Reservations',value: '12',          icon: CalendarCheck, color: '#059669', bg: 'hsl(160,84%,94%)' },
  { label: 'Monthly Revenue',    value: 'Rs.245,000',  icon: DollarSign,    color: '#7c3aed', bg: 'hsl(252,100%,96%)', wide: true },
  { label: 'Pending Payments',   value: '4',           icon: Clock,         color: '#d97706', bg: 'hsl(38,100%,94%)', warning: true },
  { label: 'Reviews',            value: '32',          icon: Star,          color: '#db2777', bg: 'hsl(330,86%,95%)' },
]

const RESERVATIONS = [
  {
    id: 1,
    property: 'Green View Annex',
    tenant: 'Anuradha Perera',
    checkIn: '01 Jun 2025',
    status: 'Pending',
    avatar: 'AP',
  },
  {
    id: 2,
    property: 'Sunrise Boarding',
    tenant: 'Kasun Silva',
    checkIn: '05 Jun 2025',
    status: 'Confirmed',
    avatar: 'KS',
  },
  {
    id: 3,
    property: 'City View Rooms',
    tenant: 'Nimali Fernando',
    checkIn: '10 Jun 2025',
    status: 'Pending',
    avatar: 'NF',
  },
]

const INITIAL_BOARDINGS = [
  {
    id: 1,
    name: 'Green View Annex',
    location: 'Colombo 05',
    beds: 10,
    occupied: 8,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70&auto=format',
  },
  {
    id: 2,
    name: 'Sunrise Boarding',
    location: 'Kandy Road, Peradeniya',
    beds: 12,
    occupied: 9,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=70&auto=format',
  },
  {
    id: 3,
    name: 'City View Rooms',
    location: 'Nugegoda, Colombo',
    beds: 6,
    occupied: 6,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=70&auto=format',
  },
]

// ── sub-components ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { color: string; bg: string }> = {
    Pending:   { color: '#d97706', bg: 'hsl(38,100%,93%)'  },
    Confirmed: { color: '#059669', bg: 'hsl(160,84%,93%)'  },
    Cancelled: { color: '#dc2626', bg: 'hsl(0,86%,93%)'    },
  }
  const s = styles[status] ?? { color: '#64748b', bg: '#f1f5f9' }
  return (
    <span
      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
      style={{ color: s.color, background: s.bg }}
    >
      {status}
    </span>
  )
}

// ── main component ────────────────────────────────────────────────────────
export default function BoardingOwnerDashboard({ userName, onLogout }: Props) {
  const [tab, setTab]               = useState<Tab>('dashboard')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showAddBoarding, setShowAddBoarding] = useState(false)
  const [boardings, setBoardings]   = useState(INITIAL_BOARDINGS)
  const [managingBoarding, setManagingBoarding] = useState<typeof INITIAL_BOARDINGS[0] | null>(null)

  if (showAddBoarding) {
    return (
      <AddBoardingPage
        onBack={() => setShowAddBoarding(false)}
        onDone={() => setShowAddBoarding(false)}
      />
    )
  }

  if (managingBoarding) {
    return (
      <ManageAvailabilityPage
        boarding={managingBoarding}
        onBack={() => setManagingBoarding(null)}
        onSave={(updated) => {
          setBoardings(prev => prev.map(b => b.id === updated.id ? updated : b))
          setManagingBoarding(null)
        }}
      />
    )
  }

  const TAB_CONFIG: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'dashboard',    label: 'Dashboard',    Icon: Home          },
    { id: 'boardings',    label: 'Boardings',    Icon: Building2     },
    { id: 'reservations', label: 'Reservations', Icon: CalendarCheck },
    { id: 'profile',      label: 'Profile',      Icon: User          },
  ]

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg-page)', fontFamily: 'Inter, sans-serif' }}
    >
      {/* ── Drawer overlay ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setDrawerOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-64 h-full flex flex-col p-6 gap-6"
            style={{ background: 'white' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="self-end p-1 rounded-lg hover:bg-gray-100"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={18} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'var(--brand-gradient)' }}
              >
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{userName}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Boarding Owner</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {TAB_CONFIG.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => { setTab(id); setDrawerOpen(false) }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    color: tab === id ? 'white' : 'var(--text-secondary)',
                    background: tab === id ? 'var(--brand-gradient)' : 'transparent',
                  }}
                >
                  <Icon size={17} /> {label}
                </button>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl w-full text-sm font-semibold hover:bg-red-50 transition-colors"
                style={{ color: '#dc2626' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-30 px-5 pt-5 pb-4"
        style={{ background: 'white', boxShadow: '0 2px 16px 0 rgba(108,72,234,0.07)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-50 transition-colors"
          >
            <Menu size={20} style={{ color: 'var(--text-primary)' }} />
          </button>

          <h1 className="text-base font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Owner Dashboard
          </h1>

          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-50 transition-colors">
              <Bell size={18} style={{ color: 'var(--text-primary)' }} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-50 transition-colors">
              <Search size={18} style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-lg mx-auto px-5 py-5 space-y-5">

          {/* ────────── DASHBOARD TAB ────────── */}
          {tab === 'dashboard' && (
            <>
              {/* Greeting */}
              <div
                className="rounded-2xl px-5 py-5"
                style={{ background: 'var(--brand-gradient)', boxShadow: '0 4px 20px 0 rgba(108,72,234,0.35)' }}
              >
                <h2 className="text-xl font-extrabold text-white">
                  Hello, Owner! 👋
                </h2>
                <p className="text-sm mt-0.5 text-white/80">
                  Here's your property overview.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ label, value, icon: Icon, color, bg, wide, warning }) => (
                  <div
                    key={label}
                    className={`rounded-2xl p-4 transition-shadow duration-200 cursor-pointer${wide ? ' col-span-1' : ''}`}
                    style={{ background: 'hsl(220,20%,96%)', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.13)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 24px 0 rgba(0,0,0,0.13)')}
                  >
                    <p className="text-[11px] font-semibold mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                      {warning && (
                        <span className="w-3.5 h-3.5 rounded-full bg-orange-400 text-white text-[8px] font-black flex items-center justify-center">!</span>
                      )}
                    </p>
                    <p className="text-2xl font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Reservations */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Recent Reservations
                  </h3>
                  <button
                    onClick={() => setTab('reservations')}
                    className="text-xs font-semibold flex items-center gap-0.5"
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    See all <ChevronRight size={13} />
                  </button>
                </div>

                <div className="space-y-3">
                  {RESERVATIONS.map(r => (
                    <div
                      key={r.id}
                      className="flex items-center gap-3 p-4 rounded-2xl"
                      style={{ background: 'white', boxShadow: '0 2px 12px 0 rgba(108,72,234,0.06)' }}
                    >
                      {/* Number badge */}
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'var(--brand-gradient)' }}
                      >
                        {r.id}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                            {r.property}
                          </p>
                          <ChevronRight size={15} style={{ color: 'var(--text-secondary)' }} />
                        </div>

                        <div className="flex items-center gap-2 mt-1.5">
                          {/* Tenant avatar */}
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                            style={{ background: 'var(--brand-gradient)' }}
                          >
                            {r.avatar}
                          </div>
                          <p className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {r.tenant}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                            Check-in: {r.checkIn}
                          </p>
                          <StatusBadge status={r.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ────────── BOARDINGS TAB ────────── */}
          {tab === 'boardings' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>My Boardings</h2>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{BOARDINGS.length} properties listed</p>
                </div>
                <button
                  onClick={() => setShowAddBoarding(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-all active:scale-95"
                  style={{ background: 'var(--brand-gradient)', boxShadow: '0 4px 16px 0 rgba(108,72,234,0.35)' }}
                >
                  <Plus size={14} /> Add Boarding
                </button>
              </div>

              <div className="space-y-4">
                {boardings.map(b => (
                  <div
                    key={b.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'white', boxShadow: '0 2px 16px 0 rgba(108,72,234,0.08)' }}
                  >
                    <div className="relative h-36">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,50,0.6) 0%, transparent 60%)' }} />
                      <div className="absolute bottom-3 left-4">
                        <p className="text-white font-bold text-sm">{b.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-white/80" />
                          <p className="text-white/80 text-[10px]">{b.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-3 pb-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>Total Beds</p>
                            <p className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>{b.beds}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>Occupied</p>
                            <p className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>{b.occupied}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>Vacant</p>
                            <p className="text-base font-extrabold" style={{ color: '#059669' }}>{b.beds - b.occupied}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl"
                                style={{ color: 'var(--brand-primary)', background: 'hsl(252,100%,96%)' }}>
                          View <ChevronRight size={13} />
                        </button>
                      </div>
                      <div className="pb-3">
                        <button
                          onClick={() => setManagingBoarding(b)}
                          className="w-full py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 active:scale-95"
                          style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)', background: 'hsl(252,100%,97%)' }}
                        >
                          Manage Availability
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ────────── RESERVATIONS TAB ────────── */}
          {tab === 'reservations' && (
            <>
              <div>
                <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Reservations</h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{RESERVATIONS.length} total bookings</p>
              </div>

              <div className="space-y-3">
                {RESERVATIONS.map(r => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl"
                    style={{ background: 'white', boxShadow: '0 2px 16px 0 rgba(108,72,234,0.07)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{r.property}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>Check-in: {r.checkIn}</p>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'hsl(252,30%,92%)' }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ background: 'var(--brand-gradient)' }}
                      >
                        {r.avatar}
                      </div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{r.tenant}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ────────── PROFILE TAB ────────── */}
          {tab === 'profile' && (
            <>
              <div className="flex flex-col items-center pt-4 pb-2">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-extrabold mb-4"
                  style={{ background: 'var(--brand-gradient)', boxShadow: '0 4px 20px 0 rgba(108,72,234,0.30)' }}
                >
                  {userName.slice(0, 2).toUpperCase()}
                </div>
                <h2 className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{userName}</h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Boarding Owner</p>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Total Boardings',    value: '5'  },
                  { label: 'Total Beds',         value: '28' },
                  { label: 'Active Reservations',value: '12' },
                  { label: 'Reviews',            value: '32' },
                ].map(item => (
                  <div key={item.label}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                    style={{ background: 'white', boxShadow: '0 2px 12px 0 rgba(108,72,234,0.06)' }}
                  >
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                    <p className="text-sm font-extrabold" style={{ color: 'var(--brand-primary)' }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onLogout}
                className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-95 mt-2"
                style={{ background: 'hsl(0,86%,96%)', color: '#dc2626' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}

        </div>
      </main>

      {/* ── Bottom nav ── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30 px-4 py-3"
        style={{ background: 'white', boxShadow: '0 -2px 20px 0 rgba(108,72,234,0.09)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-around">
          {TAB_CONFIG.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{ background: active ? 'var(--brand-gradient)' : 'transparent' }}
                >
                  <Icon size={17} style={{ color: active ? 'white' : 'var(--text-secondary)' }} />
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
      </nav>
    </div>
  )
}
