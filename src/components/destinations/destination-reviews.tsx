"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Destination } from "@/lib/api/destinations";

interface DestinationReviewsProps {
  destination: Destination;
}

export function DestinationReviews({ destination }: DestinationReviewsProps) {
  const reviews = destination.highlights || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Traveler Reviews
        </h2>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8">
                &quot;{reviews[currentIndex]}&quot;
              </p>

              <div>
                <p className="font-bold text-gray-900" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>Verified Traveler</p>
                <p className="text-sm text-gray-500">Recent experience</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-yellow-500 w-6" : "bg-gray-200"}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

