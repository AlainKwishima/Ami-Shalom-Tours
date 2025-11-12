"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  MapPin, 
  Plane, 
  Hotel, 
  Car, 
  Camera, 
  UtensilsCrossed, 
  Calendar,
  Users,
  Shield,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Service {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: MapPin,
    title: "Tour Packages",
    description: "Comprehensive tour packages covering Uganda's most spectacular destinations. From gorilla trekking to wildlife safaris, we design complete itineraries that showcase the best of East Africa.",
    features: [
      "Gorilla trekking experiences",
      "Wildlife safari tours",
      "Cultural immersion programs",
      "Adventure activities",
      "Multi-day packages",
    ],
    image: "/assets/city1.jpg",
  },
  {
    id: 2,
    icon: Plane,
    title: "Travel Planning",
    description: "Expert travel planning services to help you create the perfect itinerary. Our team handles all the details, from flights and visas to activities and timing, ensuring a seamless experience.",
    features: [
      "Custom itinerary design",
      "Flight booking assistance",
      "Visa processing support",
      "Activity recommendations",
      "Travel documentation",
    ],
    image: "/assets/city2.jpg",
  },
  {
    id: 3,
    icon: Hotel,
    title: "Hotel & Accommodation Booking",
    description: "We partner with the finest hotels, lodges, and resorts across Uganda. From luxury safari lodges to budget-friendly options, we secure accommodations that match your preferences and budget.",
    features: [
      "Luxury safari lodges",
      "Boutique hotels",
      "Budget accommodations",
      "Eco-friendly options",
      "Location-based recommendations",
    ],
    image: "/assets/re7.jpg",
  },
  {
    id: 4,
    icon: Car,
    title: "Transportation Services",
    description: "Reliable and comfortable transportation throughout your journey. Our fleet includes 4x4 safari vehicles, comfortable vans, and private cars, all driven by experienced local drivers.",
    features: [
      "4x4 safari vehicles",
      "Airport transfers",
      "Inter-city transportation",
      "Private car services",
      "Experienced drivers",
    ],
    image: "/assets/city3.jpg",
  },
  {
    id: 5,
    icon: Camera,
    title: "Photography Tours",
    description: "Specialized photography tours for enthusiasts and professionals. Capture stunning wildlife, landscapes, and cultural moments with guidance from experienced photographers and local experts.",
    features: [
      "Wildlife photography",
      "Landscape photography",
      "Cultural documentation",
      "Professional guidance",
      "Equipment recommendations",
    ],
    image: "/assets/tile1.jpg",
  },
  {
    id: 6,
    icon: UtensilsCrossed,
    title: "Culinary Experiences",
    description: "Discover Uganda's rich culinary heritage through authentic food experiences. From traditional cooking classes to local market tours and restaurant recommendations.",
    features: [
      "Cooking classes",
      "Market tours",
      "Restaurant recommendations",
      "Traditional meals",
      "Food and culture tours",
    ],
    image: "/assets/city4.jpg",
  },
  {
    id: 7,
    icon: Calendar,
    title: "Event & Group Tours",
    description: "Organize memorable group tours, corporate retreats, and special events. We handle all logistics for groups of any size, ensuring everyone has an exceptional experience.",
    features: [
      "Group tour coordination",
      "Corporate retreats",
      "Family reunions",
      "Special events",
      "Custom group packages",
    ],
    image: "/assets/city5.jpg",
  },
  {
    id: 8,
    icon: Users,
    title: "Private Guided Tours",
    description: "Personalized private tours tailored to your interests and pace. Enjoy exclusive access, flexible scheduling, and undivided attention from expert guides.",
    features: [
      "Personalized itineraries",
      "Flexible scheduling",
      "Expert private guides",
      "Exclusive access",
      "Customized experiences",
    ],
    image: "/assets/city6.jpg",
  },
  {
    id: 9,
    icon: Shield,
    title: "Travel Insurance & Safety",
    description: "Comprehensive travel insurance options and safety support. We prioritize your safety with well-maintained vehicles, experienced guides, and emergency support throughout your journey.",
    features: [
      "Travel insurance assistance",
      "Safety protocols",
      "Emergency support",
      "24/7 assistance",
      "Medical support",
    ],
    image: "/assets/tile2.jpg",
  },
  {
    id: 10,
    icon: Globe,
    title: "Multi-Country Tours",
    description: "Extended tours covering multiple East African countries. Experience the diversity of the region with seamless cross-border travel arrangements.",
    features: [
      "Kenya & Tanzania tours",
      "Rwanda extensions",
      "Cross-border logistics",
      "Regional expertise",
      "Extended itineraries",
    ],
    image: "/assets/tile3.jpg",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-yellow-600 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            What We Offer
          </p>
          <h2
            className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            COMPREHENSIVE TRAVEL SERVICES
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            From planning to execution, we provide end-to-end travel solutions designed to 
            make your journey seamless, memorable, and extraordinary.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {/* Image */}
                {service.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 bg-yellow-500 rounded-full">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {!service.image && (
                    <div className="mb-4">
                      <div className="p-3 bg-yellow-500 rounded-full inline-block">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  )}
                  
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="text-yellow-500 mr-2 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-sm text-yellow-600 font-medium">
                        +{service.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors duration-200"
                  >
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 p-12 bg-[#002B28] rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Ready to Plan Your Adventure?
          </h3>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Contact our travel experts to create a customized itinerary that perfectly matches 
            your interests, budget, and travel style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-colors duration-200"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 text-lg rounded-lg transition-colors duration-200"
              asChild
            >
              <Link href="/destinations">View Destinations</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

