export const MOCK_DESTINATIONS = [
  {
    title: 'African Safari Adventure',
    slug: 'african-safari-adventure',
    location: 'Kenya, Africa',
    description:
      'Experience the wild beauty of Africa with our exclusive safari tours. Witness the Big Five in their natural habitat.',
    fullDescription:
      "Embark on an unforgettable journey through Kenya's most spectacular national parks and game reserves.",
    price: '$2,499',
    duration: '7 Days',
    rating: 4.9,
    images: ['/assets/city1.jpg'],
    gallery: ['/assets/city1.jpg', '/assets/tile1.jpg', '/assets/tile2.jpg'],
    highlights: [
      'Game drives in Maasai Mara National Reserve',
      'Witness the Great Migration (seasonal)',
      'Visit Amboseli National Park with Mount Kilimanjaro views',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Nairobi', description: 'Transfer to hotel.' },
      { day: 2, title: 'Nairobi to Maasai Mara', description: 'Afternoon game drive.' },
    ],
    included: ['Accommodation', 'Meals', 'Park fees', 'Guide'],
    notIncluded: ['International flights', 'Visa fees'],
    bestTime: 'June to October',
    difficulty: 'Easy to Moderate',
    groupSize: '2-12 people',
    events: [{ title: 'Great Migration Viewing', date: 'July - October', description: 'Witness crossings.' }],
  },
  {
    title: 'Asian Cultural Journey',
    slug: 'asian-cultural-journey',
    location: 'Thailand, Asia',
    description:
      'Immerse yourself in rich Asian culture, ancient temples, and vibrant street markets.',
    fullDescription:
      'Discover the enchanting beauty of Thailand through this immersive cultural journey.',
    price: '$1,899',
    duration: '10 Days',
    rating: 4.8,
    images: ['/assets/city2.jpg'],
    gallery: ['/assets/city2.jpg', '/assets/tile3.jpg', '/assets/tile4.jpg'],
    highlights: ['Visit iconic temples', 'Explore floating markets', 'Cooking class'],
    included: ['Accommodation', 'Meals', 'Entrance fees'],
    notIncluded: ['International flights', 'Insurance'],
    bestTime: 'Nov to Mar',
    difficulty: 'Easy',
    groupSize: '2-15 people',
  },
];

export const MOCK_REVIEWS = [
  { name: 'Sarah Johnson', rating: 5, message: 'Absolutely incredible experience!' },
  { name: 'Michael Chen', rating: 5, message: 'Best safari experience we have ever had.' },
];

export const MOCK_PAGES = [
  {
    slug: 'home',
    title: 'Homepage',
    sections: {
      hero_title: 'Ami Shalom - Your Travel Experience',
      hero_subtitle: 'Expert guided tours, exclusive destinations, and unforgettable adventures await.',
      reasons_title: 'Why Choose Us',
    },
  },
];