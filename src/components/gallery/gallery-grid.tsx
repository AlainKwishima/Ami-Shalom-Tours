"use client";

import { useState, useMemo, useEffect } from "react";
import { Pagination } from "@/components/ui/pagination";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  location: string;
  date?: string;
  description?: string;
  destinationId?: number;
};

const images: GalleryImage[] = [
  { id: 1, src: "/assets/tile1.jpg", alt: "Beach sunrise", category: "Beaches", title: "Sunrise Bliss", location: "Zanzibar", date: "March 2024", description: "A breathtaking sunrise over pristine beaches", destinationId: 1 },
  { id: 2, src: "/assets/tile2.jpg", alt: "City lights", category: "Cities", title: "City Lights", location: "Dubai", date: "February 2024", description: "Vibrant cityscape at night", destinationId: 2 },
  { id: 3, src: "/assets/tile3.jpg", alt: "Mountain trail", category: "Mountains", title: "Alpine Trail", location: "Swiss Alps", date: "January 2024", description: "Scenic mountain hiking trail", destinationId: 3 },
  { id: 4, src: "/assets/tile4.jpg", alt: "Desert dune", category: "Deserts", title: "Golden Dunes", location: "Sahara", date: "April 2024", description: "Endless golden sand dunes", destinationId: 5 },
  { id: 5, src: "/assets/tile5.jpg", alt: "Forest river", category: "Nature", title: "River Path", location: "Amazon", date: "May 2024", description: "Serene river through lush forest", destinationId: 4 },
  { id: 6, src: "/assets/tile6.jpg", alt: "Historic town", category: "Culture", title: "Old Town", location: "Marrakesh", date: "June 2024", description: "Historic medina streets", destinationId: 5 },
  { id: 7, src: "/assets/city1.jpg", alt: "Cityscape", category: "Cities", title: "Cityscape", location: "Tokyo", date: "July 2024", description: "Modern urban landscape", destinationId: 2 },
  { id: 8, src: "/assets/re7.jpg", alt: "Resort view", category: "Beaches", title: "Resort Views", location: "Maldives", date: "August 2024", description: "Luxury beachfront resort", destinationId: 1 },
  { id: 9, src: "/assets/cit2.jpg", alt: "Urban colors", category: "Cities", title: "Urban Colors", location: "Lisbon", date: "September 2024", description: "Colorful historic district", destinationId: 3 },
  { id: 10, src: "/assets/city2.jpg", alt: "Tropical paradise", category: "Beaches", title: "Tropical Paradise", location: "Bali", date: "October 2024", description: "Tropical beach paradise", destinationId: 2 },
  { id: 11, src: "/assets/city3.jpg", alt: "Historic architecture", category: "Culture", title: "Historic Architecture", location: "Rome", date: "November 2024", description: "Ancient Roman architecture", destinationId: 3 },
  { id: 12, src: "/assets/city4.jpg", alt: "Mountain peak", category: "Mountains", title: "Mountain Peak", location: "Switzerland", date: "December 2024", description: "Majestic alpine peaks", destinationId: 3 },
  { id: 13, src: "/assets/city5.jpg", alt: "Desert sunset", category: "Deserts", title: "Desert Sunset", location: "Egypt", date: "January 2024", description: "Stunning desert sunset", destinationId: 5 },
  { id: 14, src: "/assets/city6.jpg", alt: "Forest canopy", category: "Nature", title: "Forest Canopy", location: "Costa Rica", date: "February 2024", description: "Lush rainforest canopy", destinationId: 4 },
  { id: 15, src: "/assets/tile7.jpg", alt: "Coastal cliffs", category: "Beaches", title: "Coastal Cliffs", location: "Portugal", date: "March 2024", description: "Dramatic coastal scenery", destinationId: 3 },
  { id: 16, src: "/assets/re1.jpg", alt: "Luxury resort", category: "Beaches", title: "Luxury Resort", location: "Seychelles", date: "April 2024", description: "Exclusive beach resort", destinationId: 1 },
  { id: 17, src: "/assets/re2.jpg", alt: "Modern city", category: "Cities", title: "Modern City", location: "Singapore", date: "May 2024", description: "Futuristic city skyline", destinationId: 2 },
  { id: 18, src: "/assets/re3.jpg", alt: "Mountain lake", category: "Nature", title: "Mountain Lake", location: "Canada", date: "June 2024", description: "Crystal clear mountain lake", destinationId: 3 },
  { id: 19, src: "/assets/re4.jpg", alt: "Cultural festival", category: "Culture", title: "Cultural Festival", location: "India", date: "July 2024", description: "Vibrant cultural celebration", destinationId: 2 },
  { id: 20, src: "/assets/re5.jpg", alt: "Desert oasis", category: "Deserts", title: "Desert Oasis", location: "Morocco", date: "August 2024", description: "Peaceful desert oasis", destinationId: 5 },
];

const ITEMS_PER_PAGE = 12;

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", "Beaches", "Mountains", "Cities", "Deserts", "Nature", "Culture"];

  const filtered = useMemo(() => {
    return selectedCategory === "All" 
      ? images 
      : images.filter(i => i.category === selectedCategory);
  }, [selectedCategory]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Righteous, cursive" }}>Our Photo Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
            Browse memories from our tours and get inspired for your next adventure
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === cat ? "bg-yellow-500 text-black" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedImages.map(img => (
            <div
              key={img.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <button
                onClick={() => setSelectedImage(img)}
                className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </button>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  {img.date && (
                    <>
                      <Calendar className="w-3 h-3" />
                      <span>{img.date}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                  {img.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{img.location}</span>
                </div>
                {img.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{img.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    {img.category}
                  </span>
                  {img.destinationId && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 text-xs"
                    >
                      <Link href={`/destinations/${img.destinationId}`} className="flex items-center gap-1">
                        View More
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full max-h-[70vh] object-contain rounded-xl"
              />
              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                  {selectedImage.title}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm md:text-base opacity-90 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedImage.location}</span>
                  </div>
                  {selectedImage.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedImage.date}</span>
                    </div>
                  )}
                </div>
                {selectedImage.description && (
                  <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto mb-4">
                    {selectedImage.description}
                  </p>
                )}
                <span className="inline-block px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold">
                  {selectedImage.category}
                </span>
                {selectedImage.destinationId && (
                  <div className="mt-6">
                    <Button
                      asChild
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    >
                      <Link href={`/destinations/${selectedImage.destinationId}`} className="flex items-center gap-2">
                        View Destination Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}