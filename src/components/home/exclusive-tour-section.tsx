"use client";

import React, { useState, useEffect } from "react";

interface DiamondImageProps {
  src: string;
  alt: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const DiamondImage: React.FC<DiamondImageProps> = ({
  src,
  alt,
  size,
  className = "",
}) => {
  const sizeClasses: Record<"xs" | "sm" | "md" | "lg" | "xl", string> = {
    xs: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
    sm: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28",
    md: "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
    lg: "w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36",
    xl: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} ${className} transition-all duration-1000 ease-in-out`}
    >
      <div className="w-full h-full rotate-45 overflow-hidden border-[6px] border-white shadow-2xl rounded-lg transition-all duration-1000">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover -rotate-45 scale-150 transition-all duration-1000"
        />
      </div>
    </div>
  );
};

const tourImages = [
  { src: "/assets/tile1.jpg", alt: "Tour destination 1" },
  { src: "/assets/tile2.jpg", alt: "Tour destination 2" },
  { src: "/assets/tile3.jpg", alt: "Tour destination 3" },
  { src: "/assets/tile4.jpg", alt: "Tour destination 4" },
  { src: "/assets/tile5.jpg", alt: "Tour destination 5" },
  { src: "/assets/tile6.jpg", alt: "Tour destination 6" },
  { src: "/assets/tile7.jpg", alt: "Tour destination 7" },
];

// Position definitions for the diamond formation
const positions = [
  { top: "0", left: "8%", lgLeft: "12%", size: "xs" as const }, // Top left
  { top: "20%", left: "15%", lgLeft: "18%", size: "sm" as const }, // Left
  { top: "40%", left: "25%", lgLeft: "28%", size: "md" as const }, // Center left
  { top: "50%", left: "50%", lgLeft: "50%", size: "xl" as const }, // Center - largest
  { top: "40%", right: "25%", lgRight: "28%", size: "md" as const }, // Center right
  { top: "20%", right: "15%", lgRight: "18%", size: "sm" as const }, // Right
  { top: "0", right: "8%", lgRight: "12%", size: "xs" as const }, // Top right
];

export function ExclusiveTourSection() {
  // Track which image is at which position (0-6)
  const [imagePositions, setImagePositions] = useState(
    tourImages.map((_, index) => index % positions.length)
  );

  // Rotate images to next position every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImagePositions((prev) =>
        prev.map((pos) => (pos + 1) % positions.length)
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get position data for a specific image
  const getPositionForImage = (imageIndex: number) => {
    const positionIndex = imagePositions[imageIndex];
    return positions[positionIndex];
  };

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Every Month New Tour
          </p>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            EXCLUSIVE TOUR
          </h2>
        </div>

        {/* Diamond Gallery */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full">
            {/* Mobile Layout - Simple Grid with Dynamic Images */}
            <div className="grid grid-cols-2 gap-8 justify-items-center md:hidden">
              {tourImages.slice(0, 6).map((image, index) => (
                <DiamondImage
                  key={`mobile-${index}`}
                  src={image.src}
                  alt={image.alt}
                  size="md"
                />
              ))}
            </div>

            {/* Desktop Layout - Dynamic Diamond Formation */}
            <div className="hidden md:block relative h-[400px] lg:h-[450px]">
              {tourImages.map((image, imageIndex) => {
                const position = getPositionForImage(imageIndex);

                return (
                  <div
                    key={`image-${imageIndex}`}
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{
                      top: position.top,
                      left: position.left,
                      right: position.right,
                      transform:
                        position.left === "50%"
                          ? "translate(-50%, -50%)"
                          : undefined,
                    }}
                  >
                    <DiamondImage
                      src={image.src}
                      alt={image.alt}
                      size={position.size}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* View Gallery Button */}
        <div className="text-center">
          <a
            href="/gallery"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
          >
            View Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
