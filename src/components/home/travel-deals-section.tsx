"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Star, Clock, Users } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";
import type { Destination } from "@/lib/api/destinations";

interface TravelDealCardProps {
  id: string;
  location: string;
  title: string;
  duration: string;
  destinations: string;
  rating: number;
  reviews: number;
  price: string;
  isPopular?: boolean;
  bgImage: string;
}

const TravelDealCard: React.FC<TravelDealCardProps> = ({
  id,
  location,
  title,
  duration,
  destinations,
  rating,
  reviews,
  price,
  isPopular = false,
  bgImage,
}) => {
  return (
    <div className="relative overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer w-80 h-[500px] group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-bold">
          POPULAR
        </div>
      )}

      {/* Price Badge */}
      <div className="absolute top-4 right-4 text-white">
        <span className="text-sm">from </span>
        <span className="text-yellow-500 font-bold text-lg">{price}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        {/* Location */}
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-yellow-500 mr-2" />
          <span className="text-white text-sm">{location}</span>
        </div>

        {/* Title */}
        <h3
          className="text-white text-xl font-bold mb-3 leading-tight"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          {title}
        </h3>

        {/* Duration & Destinations */}
        <div className="flex items-center mb-3 text-white text-sm">
          <Clock size={16} className="text-yellow-500 mr-2" />
          <span className="mr-4">{duration}</span>
          <Users size={16} className="text-yellow-500 mr-2" />
          <span>{destinations}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${i < Math.floor(rating)
                ? "text-yellow-500 fill-current"
                : "text-gray-400"
                } mr-1`}
            />
          ))}
          <span className="text-white text-sm ml-2">{rating}/5</span>
        </div>

        {/* More Information Button */}
        <Link href={`/destinations/${id}`} className="block">
          <button className="w-full bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold py-2 px-4 transition-all duration-300">
            More Information
          </button>
        </Link>
      </div>
    </div>
  );
};

export function TravelDealsSection() {
  const [deals, setDeals] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/destinations?limit=3`)
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch deals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (deals.length === 0) return null;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Hero Background - Only covers part of the section */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hero1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Dark background for bottom half */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ backgroundColor: "#002B28" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Book Now And Save
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            LAST MINUTE
            <br />
            TRAVEL DEALS
          </h2>
        </div>

        {/* Travel Deal Cards */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {deals.map((deal) => (
            <TravelDealCard
              key={deal._id}
              id={deal._id}
              location={deal.location}
              title={deal.title}
              duration={deal.duration || "Contact us"}
              destinations={deal.location.split(',')[0]}
              rating={deal.rating || 5}
              reviews={0}
              price={deal.price || "TBD"}
              isPopular={true}
              bgImage={deal.images?.[0] || "/assets/re1.jpg"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
