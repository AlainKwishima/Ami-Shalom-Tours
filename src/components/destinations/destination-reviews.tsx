"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Destination } from "@/lib/destinations-data";

interface DestinationReviewsProps {
  destination: Destination;
}

export function DestinationReviews({ destination }: DestinationReviewsProps) {
  if (!destination.reviews || destination.reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Traveler Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destination.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                &quot;{review.comment}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

