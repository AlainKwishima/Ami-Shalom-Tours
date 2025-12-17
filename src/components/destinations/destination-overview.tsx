"use client";

import { motion } from "framer-motion";
import { CheckCircle, Calendar, Mountain, Users as UsersIcon } from "lucide-react";
import { Destination } from "@/lib/api/destinations";

interface DestinationOverviewProps {
  destination: Destination;
}

export function DestinationOverview({ destination }: DestinationOverviewProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Palanquin Dark, sans-serif" }}
              >
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg mb-4">{destination.fullDescription}</p>
              </div>

              {/* Highlights */}
              <div className="mt-8">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                >
                  Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(destination.highlights ?? []).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-6 sticky top-24"
            >
              <h3
                className="text-xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Palanquin Dark, sans-serif" }}
              >
                Trip Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Best Time</p>
                    <p className="text-gray-900 font-medium">{destination.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mountain className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="text-gray-900 font-medium">{destination.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UsersIcon className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="text-gray-900 font-medium">{destination.groupSize}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

