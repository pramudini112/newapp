import React, { useState } from 'react'
import {
  Menu,
  Bell,
  Search,
  Heart,
  CalendarCheck,
  Star,
  MapPin,
  Home,
  Compass,
  BookOpen,
  User,
  ChevronRight,
} from 'lucide-react'
import { ALL_PLACES, Place } from './data/places'

interface Props {
  userName?: string
  onFavorites?: () => void
  onBookings?: () => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
  onSelectPlace?: (place: Place) => void
}

const RECENTLY_VIEWED_IDS = [1, 2, 3]
const RECOMMENDED_IDS     = [4, 5]

const NAV_ITEMS = [
  { label: 'Home',     Icon: Home     },
  { label: 'Search',   Icon: Compass  },
  { label: 'Bookings', Icon: BookOpen },
  { label: 'Profile',  Icon: User     },
]

export default function HomePage({
  userName = 'Anuradha',
  onFavorites,
  onBookings,
  favoriteIds,
  onToggleFavorite,
  onSelectPlace,
}: Props) {
  const [activeNav, setActiveNav] = useState('Home')
  const [searchQ,   setSearchQ]   = useState('')

  const recentlyViewed = ALL_PLACES.filter(p => RECENTLY_VIEWED_IDS.includes(p.id))
  const recommended    = ALL_PLACES.filter(p => RECOMMENDED_IDS.includes(p.id))

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
        {/* ── PURPLE HEADER ── */}
        <div
          className="relative px-6 pt-8 pb-16 flex-shrink-0"
          style={{ background: 'var(--brand-gradient)', borderRadius: '0 0 2rem 2rem' }}
        >
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
               style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-10 pointer-events-none"
               style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />

          {/* Top bar */}
          <div className="relative flex items-center justify-between mb-5">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.18)' }}>
              <Menu size={18} color="white" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                    style={{ background: 'rgba(255,255,255,0.18)' }}>
              <Bell size={18} color="white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-300 border border-white" />
            </button>
          </div>

          {/* Greeting */}
          <div className="relative mb-6">
            <h1 className="text-[22px] font-extrabold text-white leading-tight">
              Hello, {userName}! 👋
            </h1>
            <p className="text-sm font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Ready to find your perfect stay?
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search location, university, area..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 rounded-2xl text-sm font-medium outline-none"
              style={{
                background: 'rgba(255,255,255,0.96)',
                color: 'var(--text-primary)',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
              }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <Search size={15} color="white" />
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-24 space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Heart,         label: 'Favorites', value: String(favoriteIds.length), color: '#7c3aed', onClick: onFavorites },
              { Icon: CalendarCheck, label: 'Bookings',  value: '3 Active',                 color: '#0ea5e9', onClick: onBookings  },
              { Icon: Star,          label: 'Reviews',   value: '8',                        color: '#f59e0b', onClick: undefined   },
            ].map(({ Icon, label, value, color, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="rounded-2xl p-4 flex flex-col items-center gap-1.5 transition-transform active:scale-95"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 12px rgba(108,72,234,0.08)',
                  cursor: onClick ? 'pointer' : 'default',
                }}
              >
                <Icon size={20} style={{ color }} />
                <p className="text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</p>
                <p className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>{value}</p>
              </button>
            ))}
          </div>

          {/* Recently Viewed */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
                Recently Viewed
              </h2>
              <button className="flex items-center gap-0.5 text-xs font-semibold"
                      style={{ color: 'var(--brand-primary)' }}>
                View All <ChevronRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {recentlyViewed.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full rounded-2xl overflow-hidden flex text-left transition-transform active:scale-[0.98]"
                  style={{ background: 'white', boxShadow: '0 2px 14px rgba(108,72,234,0.08)' }}
                  onClick={() => onSelectPlace?.(item)}
                >
                  {/* Image */}
                  <div className="relative w-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '90px' }}
                    />
                    {item.verified && (
                      <div
                        className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--brand-primary)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-bold leading-tight pr-2" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                      </p>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={e => { e.stopPropagation(); onToggleFavorite(item.id) }}
                        className="flex-shrink-0 mt-0.5 transition-transform active:scale-90 p-1"
                      >
                        <Heart
                          size={16}
                          fill={favoriteIds.includes(item.id) ? '#7c3aed' : 'none'}
                          style={{ color: favoriteIds.includes(item.id) ? '#7c3aed' : 'var(--text-secondary)' }}
                        />
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                        {item.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs font-extrabold" style={{ color: 'var(--brand-primary)' }}>
                        {item.price}
                        <span className="font-medium text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                          {' '}/ month
                        </span>
                      </p>
                      <div className="flex items-center gap-0.5">
                        <Star size={11} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                        <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
                Recommended
              </h2>
              <button className="flex items-center gap-0.5 text-xs font-semibold"
                      style={{ color: 'var(--brand-primary)' }}>
                View All <ChevronRight size={13} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recommended.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="rounded-2xl overflow-hidden text-left transition-transform active:scale-[0.98]"
                  style={{ background: 'white', boxShadow: '0 2px 14px rgba(108,72,234,0.08)' }}
                  onClick={() => onSelectPlace?.(item)}
                >
                  <div className="relative">
                    <img src={item.image} alt={item.name}
                         className="w-full h-24 object-cover" />
                    <div
                      className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg"
                      style={{ background: 'rgba(0,0,0,0.45)' }}
                    >
                      <Star size={9} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                      <span className="text-[10px] font-bold text-white">{item.rating}</span>
                    </div>
                    {/* Heart on recommended card */}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={e => { e.stopPropagation(); onToggleFavorite(item.id) }}
                      className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center transition-transform active:scale-90"
                      style={{ background: 'rgba(255,255,255,0.85)' }}
                    >
                      <Heart
                        size={13}
                        fill={favoriteIds.includes(item.id) ? '#7c3aed' : 'none'}
                        style={{ color: favoriteIds.includes(item.id) ? '#7c3aed' : '#888' }}
                      />
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <MapPin size={9} style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{item.location}</span>
                    </div>
                    <p className="text-xs font-extrabold mt-1.5" style={{ color: 'var(--brand-primary)' }}>
                      {item.price}<span className="text-[9px] font-medium" style={{ color: 'var(--text-secondary)' }}>/mo</span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

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
                  if (label === 'Bookings' && onBookings) onBookings()
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
