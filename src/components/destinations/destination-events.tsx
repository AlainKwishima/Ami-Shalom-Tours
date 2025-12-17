"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Destination } from "@/lib/api/destinations";

interface DestinationEventsProps {
  destination: Destination;
}

export function DestinationEvents({ destination }: DestinationEventsProps) {
  if (!destination.events || destination.events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Special Events & Seasons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-yellow-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500 rounded-full">
                  <Calendar className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Event Period</p>
                  <p className="text-yellow-600 font-semibold">{event.date}</p>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "Palanquin Dark, sans-serif" }}
              >
                {event.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

