"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Destination } from "@/lib/api/destinations";

interface DestinationItineraryProps {
  destination: Destination;
}

export function DestinationItinerary({ destination }: DestinationItineraryProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Tour Itinerary
        </h2>
        <div className="space-y-6">
          {(destination.itinerary ?? []).map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6"
            >
              {/* Day Number */}
              <div className="shrink-0 flex justify-center md:block">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                    {day.day}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <h3
                    className="text-lg md:text-xl font-bold text-gray-900"
                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                  >
                    {day.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

