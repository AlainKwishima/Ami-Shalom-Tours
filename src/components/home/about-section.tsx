"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-yellow-500 text-lg md:text-xl mb-2 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            We Are The Best
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            ABOUT US
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Images Column */}
          <div className="lg:col-span-3 mb-8 lg:mb-0">
            {/* Mobile Layout */}
            <div className="block lg:hidden space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
                <Image
                  src="/assets/about1.svg"
                  alt="Tropical paradise with crystal clear water"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="relative h-32 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
                <Image
                  src="/assets/about2.svg"
                  alt="Forest canopy view"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Large top image */}
              <div className="absolute top-0 left-0 w-[95%] h-[75%] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl z-10">
                <Image
                  src="/assets/about1.svg"
                  alt="Tropical paradise with crystal clear water"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>

              {/* Small bottom image - positioned overlapping bottom right */}
              <div className="absolute -bottom-0.5 -right-1/4 w-[65%] h-[50%] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl z-40">
                <Image
                  src="/assets/about2.svg"
                  alt="Forest canopy view"
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="lg:col-span-6 text-center px-4 lg:px-12">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Ami Shalom Company LTD Is A Premier Tourism Operator
              Specializing In Curated, Immersive Travel Experiences Across
              Uganda. From Tracking The Majestic Mountain Gorillas Of Bwindi, To
              Gliding Across Serene Lakes On Boat Cruises, To Standing In Awe
              Beneath Thundering Waterfalls, We Deliver Journeys That Go Beyond
              Sightseeing — Offering Moments That Inspire, Educate, And Connect.
            </p>

            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Explore More
            </Button>
          </div>

          {/* Right Images Column */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Mobile Layout */}
            <div className="block lg:hidden space-y-4">
              <div className="relative h-32 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
                <Image
                  src="/assets/about3.svg"
                  alt="Mountain landscape"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
                <Image
                  src="/assets/about4.svg"
                  alt="Majestic tree with sunlight"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Small top image - positioned overlapping top left */}
              <div className="absolute -bottom-0.5 -left-1/4 w-[65%] h-[50%] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl z-40">
                <Image
                  src="/assets/about3.svg"
                  alt="Mountain landscape"
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>

              {/* Large bottom image */}
              <div className="absolute top-0 left-0 w-[95%] h-[75%] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl z-10">
                <Image
                  src="/assets/about4.svg"
                  alt="Majestic tree with sunlight"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
