import React, { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Wifi,
  Wind,
  Droplets,
  Camera,
  UtensilsCrossed,
  Car,
  WashingMachine,
  ShieldCheck,
  Dumbbell,
  Trees,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Place } from './data/places'

const AMENITY_ICON: Record<string, React.ElementType> = {
  'Wi-Fi':     Wifi,
  'AC':        Wind,
  'Hot Water': Droplets,
  'CCTV':      Camera,
  'Kitchen':   UtensilsCrossed,
  'Parking':   Car,
  'Laundry':   WashingMachine,
  'Security':  ShieldCheck,
  'Gym':       Dumbbell,
  'Garden':    Trees,
  'Rooftop':   Camera,
}

interface Props {
  place: Place
  onBack: () => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export default function PlaceDetailPage({ place, onBack, isFavorite, onToggleFavorite }: Props) {
  const [imgIndex, setImgIndex] = useState(0)
  const [inquired, setInquired] = useState(false)

  const images = place.images ?? [place.image]
  const total  = images.length

  const prev = () => setImgIndex(i => (i - 1 + total) % total)
  const next = () => setImgIndex(i => (i + 1) % total)

  // Show at most 5 amenities inline, rest as "+N"
  const SHOW = 5
  const visible = place.amenities.slice(0, SHOW)
  const extra   = place.amenities.length - SHOW

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Phone frame */}
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden animate-fade-up flex flex-col"
        style={{
          background: 'white',
          boxShadow: '0 24px 80px 0 rgba(108,72,234,0.18)',
          minHeight: '780px',
        }}
      >
        {/* ── HERO IMAGE ── */}
        <div className="relative w-full flex-shrink-0" style={{ height: '260px' }}>
          <img
            src={images[imgIndex]}
            alt={place.name}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.40) 100%)',
            }}
          />

          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-5 left-5 w-9 h-9 rounded-xl flex items-center justify-center transition-transform active:scale-90"
            style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}
          >
            <ArrowLeft size={18} color="white" />
          </button>

          {/* Top-right actions */}
          <div className="absolute top-5 right-5 flex gap-2">
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}
            >
              <Share2 size={16} color="white" />
            </button>
            <button
              onClick={() => onToggleFavorite(place.id)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform active:scale-90"
              style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}
            >
              <Heart
                size={16}
                fill={isFavorite ? '#fff' : 'none'}
                color="white"
              />
            </button>
          </div>

          {/* Image counter */}
          <div
            className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg text-xs font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          >
            {imgIndex + 1}/{total}
          </div>

          {/* Prev / Next arrows (only if multiple images) */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.30)', backdropFilter: 'blur(4px)' }}
              >
                <ChevronLeft size={16} color="white" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.30)', backdropFilter: 'blur(4px)' }}
              >
                <ChevronRight size={16} color="white" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width:  i === imgIndex ? 18 : 6,
                    height: 6,
                    background: i === imgIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-5">

          {/* Title row */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-xl font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {place.name}
              </h1>
              {/* Rating badge */}
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl flex-shrink-0"
                style={{ background: 'hsl(38,95%,93%)' }}
              >
                <Star size={13} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                <span className="text-sm font-extrabold" style={{ color: '#92400e' }}>{place.rating}</span>
              </div>
            </div>

            {/* Reviews count */}
            <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              ({place.reviews} Reviews)
            </p>

            {/* Location + Price row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <MapPin size={13} style={{ color: 'var(--brand-primary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {place.location}
                </span>
              </div>
              <p className="text-sm font-extrabold" style={{ color: 'var(--brand-primary)' }}>
                {place.price}
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {' '}/ month
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'hsl(252,30%,93%)' }} />

          {/* Amenities */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              {visible.map(a => {
                const Icon = AMENITY_ICON[a] ?? ShieldCheck
                return (
                  <div key={a} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'hsl(252,100%,96%)' }}
                    >
                      <Icon size={17} style={{ color: 'var(--brand-primary)' }} />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      {a}
                    </span>
                  </div>
                )
              })}
              {extra > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'hsl(252,100%,96%)' }}
                  >
                    <span className="text-xs font-extrabold" style={{ color: 'var(--brand-primary)' }}>
                      +{extra}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    More
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'hsl(252,30%,93%)' }} />

          {/* Description */}
          <div>
            <h2 className="text-sm font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
              Description
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {place.description}
            </p>
          </div>

          {/* Map placeholder */}
          <div>
            <h2 className="text-sm font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
              Location
            </h2>
            <div
              className="w-full rounded-2xl overflow-hidden flex items-center justify-center relative"
              style={{ height: 110, background: 'hsl(252,40%,96%)' }}
            >
              <img
                src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=60&auto=format&fit=crop`}
                alt="map"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <MapPin size={16} color="white" />
                </div>
              </div>
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold"
                style={{ background: 'white', color: 'var(--text-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
              >
                {place.location}
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM ACTION BAR ── */}
        <div
          className="absolute bottom-0 inset-x-0 px-5 py-4 flex gap-3"
          style={{
            background: 'white',
            borderTop: '1px solid hsl(252,30%,93%)',
            boxShadow: '0 -4px 20px rgba(108,72,234,0.08)',
          }}
        >
          {/* Save button */}
          <button
            onClick={() => onToggleFavorite(place.id)}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 font-bold text-sm transition-all duration-200 active:scale-95"
            style={{
              borderColor: isFavorite ? 'var(--brand-primary)' : 'hsl(252,30%,88%)',
              color:       isFavorite ? 'var(--brand-primary)' : 'var(--text-secondary)',
              background:  isFavorite ? 'hsl(252,100%,97%)' : 'white',
              minWidth: '90px',
            }}
          >
            <Heart
              size={16}
              fill={isFavorite ? 'var(--brand-primary)' : 'none'}
              style={{ color: isFavorite ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
            />
            Save
          </button>

          {/* Inquire / Book button */}
          <button
            onClick={() => setInquired(true)}
            className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
            style={{
              background: inquired ? 'hsl(142,70%,45%)' : 'var(--brand-gradient)',
              boxShadow: inquired
                ? '0 4px 16px rgba(34,197,94,0.35)'
                : '0 4px 20px rgba(108,72,234,0.38)',
            }}
          >
            {inquired ? '✓ Inquiry Sent!' : 'Inquire / Book'}
          </button>
        </div>
      </div>
    </div>
  )
}
