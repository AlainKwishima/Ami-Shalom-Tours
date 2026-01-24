"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Destination } from "@/lib/api/destinations";

interface DestinationPricingProps {
  destination: Destination;
}

export function DestinationPricing({ destination }: DestinationPricingProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#002B28" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              What&apos;s Included
            </h2>
            <div className="space-y-3">
              {(destination.included ?? []).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Not Included */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              What&apos;s Not Included
            </h2>
            <div className="space-y-3">
              {(destination.notIncluded ?? []).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3
              className="text-xl md:text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              Ready to Connect?
            </h3>
            <p className="text-gray-700 mb-6">
              Start your adventure today! Contact us to reserve your spot or customize this tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-6 text-lg rounded-lg"
              >
                <Link href="/contact">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-6 text-lg rounded-lg"
              >
                <Link href="/contact">Request a Consultation</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

