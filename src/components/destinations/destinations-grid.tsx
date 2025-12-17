"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { API_BASE_URL } from "@/lib/constants";
import type { PaginatedDestinations } from "@/lib/api/destinations";

const ITEMS_PER_PAGE = 6;

export function DestinationsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<PaginatedDestinations["data"]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/destinations?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load destinations"))))
      .then((data: PaginatedDestinations) => {
        if (!active) return;
        setItems(data.data ?? []);
        setTotalPages(data.pagination?.totalPages ?? 1);
      })
      .catch(() => {
        setItems([]);
      });
    return () => {
      active = false;
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-600 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Explore Our Tours
          </p>
          <h2
            className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            POPULAR DESTINATIONS
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Choose from our carefully curated selection of destinations around the world. 
            Each tour is designed to provide you with unforgettable experiences and memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {items.map((destination) => (
            <div
              key={destination._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <Image
                  src={destination.images?.[0] ?? destination.gallery?.[0] ?? "/assets/city1.jpg"}
                  alt={destination.title}
                  fill
                  className="object-cover"
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  ★ {destination.rating ?? 5}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <p className="text-yellow-600 text-sm font-medium mb-2">
                  {destination.location}
                </p>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                >
                  {destination.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {destination.description}
                </p>

                {/* Duration and Price */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <span className="text-sm font-medium">{destination.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {destination.price}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  <Link href={`/destinations/${destination._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-6">
            Looking for something different? 
            <span className="font-semibold">Contact our travel experts</span> for custom tours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              asChild
            >
              <a href="/contact">Request Custom Tour</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}