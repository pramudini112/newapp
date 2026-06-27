import React, { useState } from 'react'
import { ArrowLeft, MapPin, Star, Heart, Home, Compass, BookOpen, User } from 'lucide-react'
import { ALL_PLACES, Place } from './data/places'

const NAV_ITEMS = [
  { label: 'Home',     Icon: Home     },
  { label: 'Search',   Icon: Compass  },
  { label: 'Bookings', Icon: BookOpen },
  { label: 'Profile',  Icon: User     },
]

interface Props {
  onBack: () => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
  onSelectPlace?: (place: Place) => void
}

export default function FavoritesPage({ onBack, favoriteIds, onToggleFavorite, onSelectPlace }: Props) {
  const [activeNav, setActiveNav] = useState('Home')

  const favorites = ALL_PLACES.filter(p => favoriteIds.includes(p.id))

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
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-brand-50"
            style={{ background: 'hsl(252,100%,97%)' }}
          >
            <ArrowLeft size={18} style={{ color: 'var(--brand-primary)' }} />
          </button>
          <h1 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Favorites
          </h1>
          <span
            className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'hsl(252,100%,96%)', color: 'var(--brand-primary)' }}
          >
            {favorites.length}
          </span>
        </div>

        {/* ── LIST ── */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-24 space-y-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'hsl(252,100%,96%)' }}
              >
                <Heart size={28} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>No favorites yet</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Tap the heart on any listing to save it here.
                </p>
              </div>
            </div>
          ) : (
            favorites.map(item => (
              <button
                key={item.id}
                type="button"
                className="w-full rounded-2xl overflow-hidden flex text-left transition-transform active:scale-[0.98]"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 16px rgba(108,72,234,0.09)',
                }}
                onClick={() => onSelectPlace?.(item)}
              >
                {/* Image */}
                <div className="relative w-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '100px' }}
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
                <div className="flex-1 px-3 py-3.5 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    {/* Heart remove button */}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={e => { e.stopPropagation(); onToggleFavorite(item.id) }}
                      className="flex-shrink-0 mt-0.5 transition-transform active:scale-90 p-1"
                    >
                      <Heart
                        size={17}
                        fill="var(--brand-primary)"
                        style={{ color: 'var(--brand-primary)' }}
                      />
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin size={11} style={{ color: 'var(--text-secondary)' }} />
                    <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                      {item.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <p className="text-xs font-extrabold" style={{ color: 'var(--brand-primary)' }}>
                      {item.price}
                      <span className="font-medium text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                        {' '}/ month
                      </span>
                    </p>
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg"
                      style={{ background: 'hsl(38,95%,95%)' }}
                    >
                      <Star size={11} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                      <span className="text-[11px] font-bold" style={{ color: '#b45309' }}>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
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
