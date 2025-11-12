export interface Destination {
  id: number;
  slug: string;
  image: string;
  title: string;
  location: string;
  description: string;
  fullDescription: string;
  price: string;
  duration: string;
  rating: number;
  gallery: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  notIncluded: string[];
  bestTime: string;
  difficulty: string;
  groupSize: string;
  reviews: {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  events?: {
    title: string;
    date: string;
    description: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: 1,
    slug: "african-safari-adventure",
    image: "/assets/city1.jpg",
    title: "African Safari Adventure",
    location: "Kenya, Africa",
    description: "Experience the wild beauty of Africa with our exclusive safari tours. Witness the Big Five in their natural habitat.",
    fullDescription: "Embark on an unforgettable journey through Kenya's most spectacular national parks and game reserves. This comprehensive safari adventure takes you deep into the heart of Africa, where you'll witness the Big Five - lions, elephants, buffaloes, leopards, and rhinos - in their natural habitat. Our expert guides will lead you through diverse landscapes, from the vast savannas of the Maasai Mara to the scenic beauty of Amboseli National Park.",
    price: "$2,499",
    duration: "7 Days",
    rating: 4.9,
    gallery: [
      "/assets/city1.jpg",
      "/assets/tile1.jpg",
      "/assets/tile2.jpg",
      "/assets/re1.jpg",
      "/assets/re2.jpg",
    ],
    highlights: [
      "Game drives in Maasai Mara National Reserve",
      "Witness the Great Migration (seasonal)",
      "Visit Amboseli National Park with Mount Kilimanjaro views",
      "Cultural interaction with Maasai communities",
      "Professional wildlife photography opportunities",
      "Luxury tented camps and lodges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Arrive at Jomo Kenyatta International Airport, transfer to hotel. Briefing session and welcome dinner.",
      },
      {
        day: 2,
        title: "Nairobi to Maasai Mara",
        description: "Early morning flight to Maasai Mara. Afternoon game drive in search of the Big Five.",
      },
      {
        day: 3,
        title: "Full Day Safari",
        description: "Full day game drives with picnic lunch. Witness the incredible wildlife and natural beauty.",
      },
      {
        day: 4,
        title: "Maasai Village Visit",
        description: "Morning game drive, afternoon visit to Maasai village for cultural experience.",
      },
      {
        day: 5,
        title: "Transfer to Amboseli",
        description: "Fly to Amboseli National Park. Afternoon game drive with Mount Kilimanjaro backdrop.",
      },
      {
        day: 6,
        title: "Amboseli Exploration",
        description: "Full day exploring Amboseli, known for large elephant herds and stunning views.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning game drive, then transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation in luxury lodges/camps",
      "All meals (breakfast, lunch, dinner)",
      "All game drives and park entry fees",
      "Professional English-speaking guide",
      "Internal flights (Nairobi-Maasai Mara-Amboseli)",
      "Airport transfers",
      "Bottled water throughout",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Optional activities",
    ],
    bestTime: "June to October (dry season, best wildlife viewing)",
    difficulty: "Easy to Moderate",
    groupSize: "2-12 people",
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely incredible experience! Saw all the Big Five and our guide was extremely knowledgeable. The accommodations were luxurious and the food was excellent.",
        date: "2024-01-15",
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 5,
        comment: "Best safari experience we've ever had. The Maasai Mara was breathtaking and we witnessed the migration. Highly recommend!",
        date: "2024-02-20",
      },
    ],
    events: [
      {
        title: "Great Migration Viewing",
        date: "July - October",
        description: "Witness one of nature's greatest spectacles as millions of wildebeest and zebras cross the Mara River.",
      },
    ],
  },
  {
    id: 2,
    slug: "asian-cultural-journey",
    image: "/assets/city2.jpg",
    title: "Asian Cultural Journey",
    location: "Thailand, Asia",
    description: "Immerse yourself in rich Asian culture, ancient temples, and vibrant street markets.",
    fullDescription: "Discover the enchanting beauty of Thailand through this immersive cultural journey. From the bustling streets of Bangkok to the ancient temples of Chiang Mai, experience the perfect blend of tradition and modernity. Explore vibrant markets, learn traditional crafts, and savor authentic Thai cuisine while connecting with local communities.",
    price: "$1,899",
    duration: "10 Days",
    rating: 4.8,
    gallery: [
      "/assets/city2.jpg",
      "/assets/tile3.jpg",
      "/assets/tile4.jpg",
      "/assets/re3.jpg",
    ],
    highlights: [
      "Visit iconic temples including Wat Pho and Wat Arun",
      "Explore floating markets and night bazaars",
      "Traditional Thai cooking class",
      "Elephant sanctuary visit",
      "Cultural performances and festivals",
      "Local artisan workshops",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok",
        description: "Arrive in Bangkok, transfer to hotel. Evening welcome dinner and city orientation.",
      },
      {
        day: 2,
        title: "Bangkok Temples",
        description: "Visit Grand Palace, Wat Pho, and Wat Arun. Explore local markets.",
      },
      {
        day: 3,
        title: "Floating Markets",
        description: "Early morning visit to floating markets. Afternoon cooking class.",
      },
      {
        day: 4,
        title: "Travel to Chiang Mai",
        description: "Flight to Chiang Mai. Evening night bazaar exploration.",
      },
      {
        day: 5,
        title: "Elephant Sanctuary",
        description: "Full day at ethical elephant sanctuary. Learn about conservation efforts.",
      },
      {
        day: 6,
        title: "Temple Tour",
        description: "Visit Doi Suthep and other significant temples. Traditional craft workshops.",
      },
      {
        day: 7,
        title: "Cultural Immersion",
        description: "Village visit, traditional performances, and local cuisine experiences.",
      },
      {
        day: 8,
        title: "Free Day",
        description: "Optional activities: zip-lining, spa treatments, or additional temple visits.",
      },
      {
        day: 9,
        title: "Return to Bangkok",
        description: "Return flight to Bangkok. Evening farewell dinner cruise.",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation (4-star hotels)",
      "All meals as specified",
      "All entrance fees and activities",
      "Professional English-speaking guide",
      "Internal flights",
      "Airport transfers",
      "Transportation throughout",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities",
    ],
    bestTime: "November to March (cool, dry season)",
    difficulty: "Easy",
    groupSize: "2-15 people",
    reviews: [
      {
        id: 1,
        author: "Emma Thompson",
        rating: 5,
        comment: "An amazing cultural experience! The temples were stunning and the cooking class was a highlight. Our guide made everything so interesting.",
        date: "2024-03-10",
      },
    ],
  },
  {
    id: 3,
    slug: "european-heritage-tour",
    image: "/assets/city3.jpg",
    title: "European Heritage Tour",
    location: "Italy, Europe",
    description: "Explore historic cities, Renaissance art, and authentic Italian cuisine.",
    fullDescription: "Journey through Italy's most iconic cities, from the ancient ruins of Rome to the Renaissance splendor of Florence and the romantic canals of Venice. This tour combines art, history, and gastronomy for an unforgettable Italian experience.",
    price: "$2,299",
    duration: "8 Days",
    rating: 4.7,
    gallery: [
      "/assets/city3.jpg",
      "/assets/tile5.jpg",
      "/assets/tile6.jpg",
    ],
    highlights: [
      "Colosseum and Roman Forum tour",
      "Vatican Museums and Sistine Chapel",
      "Uffizi Gallery in Florence",
      "Venice gondola ride",
      "Authentic Italian cooking class",
      "Wine tasting in Tuscany",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        description: "Arrive in Rome, transfer to hotel. Evening welcome dinner.",
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Colosseum, Roman Forum, and Palatine Hill tour.",
      },
      {
        day: 3,
        title: "Vatican City",
        description: "Vatican Museums, Sistine Chapel, and St. Peter's Basilica.",
      },
      {
        day: 4,
        title: "Travel to Florence",
        description: "High-speed train to Florence. Afternoon city tour.",
      },
      {
        day: 5,
        title: "Florence Art & Culture",
        description: "Uffizi Gallery, Duomo, and Ponte Vecchio. Evening cooking class.",
      },
      {
        day: 6,
        title: "Tuscany Day Trip",
        description: "Wine tasting tour in Chianti region. Visit medieval towns.",
      },
      {
        day: 7,
        title: "Venice",
        description: "Travel to Venice. Gondola ride and St. Mark's Square.",
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation (4-star hotels)",
      "Breakfast daily, 4 dinners",
      "All entrance fees",
      "Professional guide",
      "Transportation (train, transfers)",
      "Cooking class and wine tasting",
    ],
    notIncluded: [
      "International flights",
      "Lunch and some dinners",
      "Travel insurance",
      "Personal expenses",
      "Tips",
    ],
    bestTime: "April to June, September to October",
    difficulty: "Easy to Moderate",
    groupSize: "2-12 people",
    reviews: [
      {
        id: 1,
        author: "David Martinez",
        rating: 5,
        comment: "Perfect blend of history, art, and food! The Vatican tour was incredible and Florence was absolutely beautiful.",
        date: "2024-04-05",
      },
    ],
  },
  {
    id: 4,
    slug: "south-american-expedition",
    image: "/assets/city4.jpg",
    title: "South American Expedition",
    location: "Peru, South America",
    description: "Discover ancient Incan ruins, vibrant cultures, and breathtaking landscapes.",
    fullDescription: "Explore the wonders of Peru, from the ancient citadel of Machu Picchu to the vibrant culture of Cusco and the stunning beauty of the Sacred Valley. This expedition combines adventure, history, and natural beauty.",
    price: "$2,799",
    duration: "12 Days",
    rating: 4.9,
    gallery: [
      "/assets/city4.jpg",
      "/assets/tile1.jpg",
      "/assets/re4.jpg",
    ],
    highlights: [
      "Machu Picchu guided tour",
      "Inca Trail trek (alternative routes available)",
      "Sacred Valley exploration",
      "Cusco city tour",
      "Traditional Andean markets",
      "Lake Titicaca visit",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Lima",
        description: "Arrive in Lima, transfer to hotel. City tour and welcome dinner.",
      },
      {
        day: 2,
        title: "Lima to Cusco",
        description: "Flight to Cusco. Acclimatization day with light activities.",
      },
      {
        day: 3,
        title: "Sacred Valley",
        description: "Full day exploring Sacred Valley: Pisac market and Ollantaytambo ruins.",
      },
      {
        day: 4,
        title: "Machu Picchu",
        description: "Early train to Aguas Calientes. Guided tour of Machu Picchu.",
      },
      {
        day: 5,
        title: "Machu Picchu Sunrise",
        description: "Optional early morning return to Machu Picchu. Return to Cusco.",
      },
      {
        day: 6,
        title: "Cusco Exploration",
        description: "City tour including Qorikancha, Sacsayhuaman, and San Blas neighborhood.",
      },
      {
        day: 7,
        title: "Rainbow Mountain",
        description: "Day trip to Rainbow Mountain (optional, high altitude).",
      },
      {
        day: 8,
        title: "Travel to Puno",
        description: "Scenic bus journey to Puno with stops at interesting sites.",
      },
      {
        day: 9,
        title: "Lake Titicaca",
        description: "Boat tour to Uros floating islands and Taquile Island.",
      },
      {
        day: 10,
        title: "Return to Cusco",
        description: "Flight back to Cusco. Free afternoon.",
      },
      {
        day: 11,
        title: "Cusco to Lima",
        description: "Return flight to Lima. Farewell dinner.",
      },
      {
        day: 12,
        title: "Departure",
        description: "Transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation",
      "All meals as specified",
      "All entrance fees",
      "Professional guide",
      "Internal flights",
      "Train to Machu Picchu",
      "All transportation",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Tips",
    ],
    bestTime: "May to September (dry season)",
    difficulty: "Moderate to Challenging",
    groupSize: "2-10 people",
    reviews: [
      {
        id: 1,
        author: "Jennifer Lee",
        rating: 5,
        comment: "Machu Picchu was absolutely magical! The entire trip was well-organized and our guide was fantastic. Highly recommend!",
        date: "2024-05-12",
      },
    ],
  },
  {
    id: 5,
    slug: "middle-eastern-wonders",
    image: "/assets/city5.jpg",
    title: "Middle Eastern Wonders",
    location: "Jordan, Middle East",
    description: "Experience the magic of Petra, desert landscapes, and ancient history.",
    fullDescription: "Discover the ancient wonders of Jordan, from the rose-red city of Petra to the otherworldly landscapes of Wadi Rum and the therapeutic waters of the Dead Sea. This journey through history and nature is truly unforgettable.",
    price: "$2,199",
    duration: "6 Days",
    rating: 4.8,
    gallery: [
      "/assets/city5.jpg",
      "/assets/tile2.jpg",
      "/assets/re5.jpg",
    ],
    highlights: [
      "Petra archaeological site (full day)",
      "Wadi Rum desert jeep tour and camping",
      "Dead Sea floating experience",
      "Jerash Roman ruins",
      "Amman city tour",
      "Traditional Bedouin experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Amman",
        description: "Arrive in Amman, transfer to hotel. City tour and welcome dinner.",
      },
      {
        day: 2,
        title: "Jerash & Dead Sea",
        description: "Visit Jerash Roman ruins. Continue to Dead Sea for floating experience.",
      },
      {
        day: 3,
        title: "Petra",
        description: "Full day exploring Petra, including the Treasury, Monastery, and Royal Tombs.",
      },
      {
        day: 4,
        title: "Wadi Rum",
        description: "Desert jeep tour, camel ride, and overnight in Bedouin camp.",
      },
      {
        day: 5,
        title: "Wadi Rum to Amman",
        description: "Morning desert activities. Return to Amman.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation",
      "All meals",
      "All entrance fees",
      "Professional guide",
      "Desert camp accommodation",
      "All transportation",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips",
    ],
    bestTime: "March to May, September to November",
    difficulty: "Easy to Moderate",
    groupSize: "2-12 people",
    reviews: [
      {
        id: 1,
        author: "Robert Wilson",
        rating: 5,
        comment: "Petra exceeded all expectations! The Wadi Rum desert experience was incredible. A truly magical destination.",
        date: "2024-06-18",
      },
    ],
  },
  {
    id: 6,
    slug: "australian-outback-adventure",
    image: "/assets/city6.jpg",
    title: "Australian Outback Adventure",
    location: "Australia, Oceania",
    description: "Explore the unique wildlife, stunning beaches, and vast outback.",
    fullDescription: "Experience the diverse landscapes of Australia, from the iconic Sydney Opera House to the vast Outback, the Great Barrier Reef, and unique wildlife encounters. This comprehensive tour showcases the best of Australia.",
    price: "$3,199",
    duration: "14 Days",
    rating: 4.6,
    gallery: [
      "/assets/city6.jpg",
      "/assets/tile3.jpg",
      "/assets/re6.jpg",
    ],
    highlights: [
      "Sydney Harbour and Opera House",
      "Great Barrier Reef snorkeling",
      "Uluru (Ayers Rock) sunset experience",
      "Kangaroo and koala encounters",
      "Blue Mountains day trip",
      "Cairns and Daintree Rainforest",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sydney",
        description: "Arrive in Sydney, transfer to hotel. Evening harbor cruise.",
      },
      {
        day: 2,
        title: "Sydney City Tour",
        description: "Opera House tour, Harbour Bridge, Bondi Beach, and city highlights.",
      },
      {
        day: 3,
        title: "Blue Mountains",
        description: "Day trip to Blue Mountains. Scenic railway and wildlife park.",
      },
      {
        day: 4,
        title: "Sydney to Cairns",
        description: "Flight to Cairns. Afternoon at leisure.",
      },
      {
        day: 5,
        title: "Great Barrier Reef",
        description: "Full day reef tour with snorkeling and glass-bottom boat.",
      },
      {
        day: 6,
        title: "Daintree Rainforest",
        description: "Day trip to Daintree Rainforest and Cape Tribulation.",
      },
      {
        day: 7,
        title: "Cairns to Alice Springs",
        description: "Flight to Alice Springs. Outback orientation.",
      },
      {
        day: 8,
        title: "Uluru",
        description: "Travel to Uluru. Sunset viewing and cultural center visit.",
      },
      {
        day: 9,
        title: "Uluru Sunrise",
        description: "Early morning sunrise viewing. Base walk around Uluru.",
      },
      {
        day: 10,
        title: "Kata Tjuta",
        description: "Valley of the Winds walk at Kata Tjuta.",
      },
      {
        day: 11,
        title: "Return to Alice Springs",
        description: "Return to Alice Springs. Desert park visit.",
      },
      {
        day: 12,
        title: "Alice Springs to Melbourne",
        description: "Flight to Melbourne. City tour.",
      },
      {
        day: 13,
        title: "Melbourne",
        description: "Free day in Melbourne. Optional Great Ocean Road tour.",
      },
      {
        day: 14,
        title: "Departure",
        description: "Transfer to airport for departure.",
      },
    ],
    included: [
      "All accommodation",
      "Breakfast daily, some meals",
      "All entrance fees",
      "Professional guides",
      "Internal flights",
      "Reef tour and equipment",
      "All transportation",
    ],
    notIncluded: [
      "International flights",
      "Some meals",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Tips",
    ],
    bestTime: "April to October",
    difficulty: "Easy to Moderate",
    groupSize: "2-15 people",
    reviews: [
      {
        id: 1,
        author: "Lisa Anderson",
        rating: 5,
        comment: "Amazing diversity! From the reef to the outback, every day was incredible. The Uluru sunset was breathtaking.",
        date: "2024-07-22",
      },
    ],
  },
  // Add more destinations as needed...
];

export function getDestinationById(id: number): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}

