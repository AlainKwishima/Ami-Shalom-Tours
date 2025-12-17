"use client";

import Image from "next/image";
import { MapPin, Clock, Star, Users } from "lucide-react";
import { Destination } from "@/lib/api/destinations";

interface DestinationDetailHeroProps {
  destination: Destination;
}

export function DestinationDetailHero({ destination }: DestinationDetailHeroProps) {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Hero Image */}
      <div className="relative w-full h-full">
        <Image
          src={destination.images?.[0] ?? destination.gallery?.[0] ?? "/assets/city1.jpg"}
          alt={destination.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="max-w-3xl">
            {/* Location */}
            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">{destination.location}</span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              {destination.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-lg">{destination.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold">{destination.rating ?? 5}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                <span className="text-lg">{destination.groupSize}</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-500">
                {destination.price}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

