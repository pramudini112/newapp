export interface Place {
  id: number
  name: string
  location: string
  price: string
  rating: number
  reviews: number
  image: string
  images?: string[]
  verified?: boolean
  description: string
  amenities: string[]
}

export const ALL_PLACES: Place[] = [
  {
    id: 1,
    name: 'Green View Annex',
    location: 'Malabe, Sri Lanka',
    price: 'Rs. 15,000',
    rating: 4.6,
    reviews: 108,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80&auto=format&fit=crop',
    ],
    verified: true,
    description: 'A comfortable and cozy annex located in a quiet environment. Perfect for students and working professionals seeking a peaceful stay close to campus.',
    amenities: ['Wi-Fi', 'AC', 'Hot Water', 'CCTV', 'Kitchen', 'Parking', 'Laundry', 'Security'],
  },
  {
    id: 2,
    name: 'Sunrise Boarding House',
    location: 'Nugegoda, Sri Lanka',
    price: 'Rs. 12,500',
    rating: 4.3,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop',
    verified: true,
    description: 'Affordable boarding with all essential amenities. Ideal for university students with easy access to public transport and local eateries.',
    amenities: ['Wi-Fi', 'Hot Water', 'CCTV', 'Kitchen', 'Laundry'],
  },
  {
    id: 3,
    name: 'City View Residency',
    location: 'Colombo 7, Sri Lanka',
    price: 'Rs. 18,000',
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80&auto=format&fit=crop',
    verified: false,
    description: 'Premium city-view rooms with modern furnishings. Enjoy the buzz of Colombo 7 with every convenience at your doorstep.',
    amenities: ['Wi-Fi', 'AC', 'Hot Water', 'CCTV', 'Kitchen', 'Parking', 'Gym', 'Rooftop'],
  },
  {
    id: 4,
    name: 'Lake View Lodge',
    location: 'Kandy, Sri Lanka',
    price: 'Rs. 10,000',
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80&auto=format&fit=crop',
    verified: true,
    description: 'Serene lodge overlooking Kandy Lake. A peaceful retreat for students attending Peradeniya University or exploring the hill capital.',
    amenities: ['Wi-Fi', 'Hot Water', 'Kitchen', 'Parking', 'Garden'],
  },
  {
    id: 5,
    name: 'Palm Garden Stay',
    location: 'Gampaha, Sri Lanka',
    price: 'Rs. 9,500',
    rating: 4.2,
    reviews: 53,
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80&auto=format&fit=crop',
    verified: false,
    description: 'Budget-friendly rooms set in a lush garden environment. A calm and green setting perfect for those who prefer nature over city life.',
    amenities: ['Wi-Fi', 'Hot Water', 'Kitchen', 'Garden', 'Laundry'],
  },
  {
    id: 6,
    name: 'Lake View Room',
    location: 'Nugegoda, Sri Lanka',
    price: 'Rs. 13,000',
    rating: 4.3,
    reviews: 61,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80&auto=format&fit=crop',
    verified: true,
    description: 'Bright and airy rooms with lake views. Close to shopping centres and universities, with a friendly host and a safe neighbourhood.',
    amenities: ['Wi-Fi', 'AC', 'Hot Water', 'CCTV', 'Laundry'],
  },
  {
    id: 7,
    name: 'Sunshine Annex',
    location: 'Boralesgamuwa, Sri Lanka',
    price: 'Rs. 12,000',
    rating: 4.5,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80&auto=format&fit=crop',
    verified: true,
    description: 'Sun-filled rooms in a quiet residential area. Perfect for long-term stays with a homely atmosphere and attentive management.',
    amenities: ['Wi-Fi', 'Hot Water', 'CCTV', 'Kitchen', 'Parking', 'Security'],
  },
]
