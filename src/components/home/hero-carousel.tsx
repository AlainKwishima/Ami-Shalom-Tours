"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/hero.svg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/Beauty is Africa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl lg:text-4xl mb-4 opacity-90 animate-fade-in"
            style={{ fontFamily: "WindSong, cursive" }}
          >
            Amazing Tour
          </p>

          {/* Main Title */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-wider animate-fade-in-up"
            style={{ fontFamily: "Righteous, cursive" }}
          >
            Ami Shalom
          </h1>

          {/* Description */}
          <p className="text-sm md:text-md lg:text-lg mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-delay">
            &ldquo;Beyond The Horizon, Into The Wild. Live The Adventure&rdquo;
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in-delay-2"
          >
            <Link href="/book-tour">Book A Tour</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
