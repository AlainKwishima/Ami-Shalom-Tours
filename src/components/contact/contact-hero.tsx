"use client";

import { useEffect, useRef } from "react";

export function ContactHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
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

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider"
            style={{ fontFamily: "Righteous, cursive" }}
          >
            CONTACT US
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-2xl lg:text-3xl mb-4 opacity-90 max-w-2xl mx-auto"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            We&apos;re Here To Help Plan Your Perfect Journey
          </p>
        </div>
      </div>
    </div>
  );
}