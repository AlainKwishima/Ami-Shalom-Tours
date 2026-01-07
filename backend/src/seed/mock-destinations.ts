export const MOCK_DESTINATIONS = [
  {
    title: 'Mountain Gorilla Expedition',
    slug: 'mountain-gorilla-expedition',
    location: 'Musanze, Rwanda',
    description: 'Experience the life-changing encounter with majestic mountain gorillas in the mist of Volcanoes National Park.',
    fullDescription: 'Join us for an unforgettable trek through the lush rainforests of Volcanoes National Park. Our expert guides will lead you to one of the habituated gorilla families, where you can spend a magical hour observing these gentle giants in their natural habitat.',
    price: '$1,650',
    duration: '3 Days',
    rating: 5.0,
    images: ['/assets/re1.jpg'],
    gallery: ['/assets/re1.jpg', '/assets/re2.jpg', '/assets/re3.jpg'],
    highlights: [
      'Gorilla trekking in Volcanoes National Park',
      'Stunning mountain views',
      'Local cultural visits',
    ],
    included: ['Permit', 'Accommodation', 'Professional guide', 'Park fees'],
    bestTime: 'Dry seasons (June to September, December to February)',
    groupSize: 'Max 8 people per group',
  },
  {
    title: 'Akagera Big Five Safari',
    slug: 'akagera-big-five-safari',
    location: 'Kayonza, Rwanda',
    description: 'Witness the Big Five across the diverse landscapes of Akagera National Park, from savannas to swamplands.',
    fullDescription: 'Akagera National Park is a unique destination in Rwanda, offering traditional African safari experiences. From lions and leopards to elephants and rhinos, explore the rich biodiversity of this stunning park.',
    price: '$450',
    duration: '2 Days',
    rating: 4.8,
    images: ['/assets/re4.jpg'],
    gallery: ['/assets/re4.jpg', '/assets/re5.jpg', '/assets/re6.jpg'],
    highlights: [
      'Game drives to see the Big Five',
      'Boat trip on Lake Ihema',
      'Bird watching (over 500 species)',
    ],
    included: ['Transport', 'Park entrance fees', 'Safari vehicle', 'Game drives'],
    bestTime: 'Year-round, best in June to September',
    groupSize: '2-6 people',
  },
  {
    title: 'Lake Kivu Lakeside Retreat',
    slug: 'lake-kivu-lakeside-retreat',
    location: 'Rubavu, Rwanda',
    description: 'Relax and unwind by the serene shores of Lake Kivu, one of Africa\'s most beautiful inland bodies of water.',
    fullDescription: 'Enjoy the tropical atmosphere of Gisenyi and Lake Kivu. From boat cruises to island visits and relaxing on sandy beaches, this retreat is the perfect way to conclude your Rwandan adventure.',
    price: '$320',
    duration: '3 Days',
    rating: 4.7,
    images: ['/assets/re7.jpg'],
    gallery: ['/assets/re7.jpg', '/assets/re8.jpg', '/assets/re9.jpg'],
    highlights: [
      'Boat cruise on Lake Kivu',
      'Coffee plantation tours',
      'Lakeside relaxation',
    ],
    included: ['Accommodation', 'Boat trips', 'Local transfers'],
    bestTime: 'Dry seasons',
    groupSize: 'Flexible',
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