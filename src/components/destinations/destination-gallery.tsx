"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Destination } from "@/lib/destinations-data";

interface DestinationGalleryProps {
  destination: Destination;
}

export function DestinationGallery({ destination }: DestinationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destination.gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image}
                alt={`${destination.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-yellow-500 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              <Image
                src={selectedImage}
                alt={destination.title}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

