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
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Itinerary
        </h2>
        <div className="space-y-8">
          {(destination.itinerary ?? []).map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6"
            >
              {/* Day Number */}
              <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                    {day.day}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  <h3
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                  >
                    {day.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

