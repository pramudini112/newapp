import React, { useState } from 'react'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FavoritesPage from './FavoritesPage'
import BookingsPage from './BookingsPage'
import PlaceDetailPage from './PlaceDetailPage'
import BoardingOwnerDashboard from './BoardingOwnerDashboard'
import { Place } from './data/places'

type Page = 'signup' | 'login' | 'home' | 'favorites' | 'bookings' | 'detail' | 'owner-dashboard'

function App() {
  const [page, setPage]                   = useState<Page>('signup')
  const [userName, setUserName]           = useState('')
  const [favoriteIds, setFavoriteIds]     = useState<number[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [prevPage, setPrevPage]           = useState<Page>('home')

  const toggleFavorite = (id: number) =>
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const openDetail = (place: Place, from: Page = 'home') => {
    setSelectedPlace(place)
    setPrevPage(from)
    setPage('detail')
  }

  if (page === 'signup') {
    return (
      <SignUpPage
        onSuccess={(name?: string) => {
          if (name) setUserName(name)
          setPage('login')
        }}
      />
    )
  }

  if (page === 'login') {
    return (
      <LoginPage
        onSignUp={() => setPage('signup')}
        onLogin={(name?: string, role?: string) => {
          if (name) setUserName(name)
          if (role === 'Boarding Owner') {
            setPage('owner-dashboard')
          } else {
            setPage('home')
          }
        }}
      />
    )
  }

  if (page === 'owner-dashboard') {
    return (
      <BoardingOwnerDashboard
        userName={userName || 'Owner'}
        onLogout={() => setPage('login')}
      />
    )
  }

  if (page === 'detail' && selectedPlace) {
    return (
      <PlaceDetailPage
        place={selectedPlace}
        onBack={() => setPage(prevPage)}
        isFavorite={favoriteIds.includes(selectedPlace.id)}
        onToggleFavorite={toggleFavorite}
      />
    )
  }

  if (page === 'favorites') {
    return (
      <FavoritesPage
        onBack={() => setPage('home')}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onSelectPlace={(place) => openDetail(place, 'favorites')}
      />
    )
  }

  if (page === 'bookings') {
    return <BookingsPage onBack={() => setPage('home')} />
  }

  return (
    <HomePage
      userName={userName || 'Anuradha'}
      onFavorites={() => setPage('favorites')}
      onBookings={() => setPage('bookings')}
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
      onSelectPlace={(place) => openDetail(place, 'home')}
    />
  )
}

export default App
