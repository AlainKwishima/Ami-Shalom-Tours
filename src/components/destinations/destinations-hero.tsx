"use client";

import { useEffect, useRef } from "react";

export function DestinationsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/Beauty is Africa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider"
            style={{ fontFamily: "Righteous, cursive" }}
          >
            DESTINATIONS
          </h1>
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-4 opacity-90 max-w-2xl mx-auto"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Explore hand-picked places and unforgettable experiences
          </p>
        </div>
      </div>
    </div>
  );
}