"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function TravelSection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-yellow-500 text-lg md:text-xl mb-4 font-medium">
              We Are The Best
            </p>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8">
              The Perfect Travel Place For You & Your Family
            </h2>

            {/* Divider Line */}
            <div className="w-16 h-1 bg-yellow-500 mb-8"></div>

            {/* Customer Avatars */}
            <div className="mb-6">
              <div className="flex -space-x-3 mb-3">
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt1.jpg" alt="Customer 1" />
                  <AvatarFallback>C1</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt2.jpg" alt="Customer 2" />
                  <AvatarFallback>C2</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt3.jpg" alt="Customer 3" />
                  <AvatarFallback>C3</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt4.jpg" alt="Customer 4" />
                  <AvatarFallback>C4</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt5.jpg" alt="Customer 3" />
                  <AvatarFallback>C3</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="/assets/avt6.jpg" alt="Customer 4" />
                  <AvatarFallback>C4</AvatarFallback>
                </Avatar>
                <Avatar className="w-12 h-12 border-2 border-white bg-yellow-500 text-black font-bold">
                  <AvatarFallback className="bg-yellow-500 text-black text-sm">
                    60+
                  </AvatarFallback>
                </Avatar>
              </div>
              <p className="text-yellow-500 text-lg font-semibold">
                500k+ Happy Customer
              </p>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div
            className="lg:col-span-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-sm">
              <div className="relative h-72 md:h-86 lg:h-[500px] rounded-[7rem] overflow-hidden shadow-2xl border-4 border-yellow-500">
                <Image
                  src="/assets/about5.jpg"
                  alt="Desert road trip with vintage van"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="lg:col-span-1 text-left lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              Waiting for Adventures? don&apos;t miss them
            </p>

            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-8">
              We believe that a journey through Rwanda should be more than just a destination; it should be an emotional connection. From the mist of the mountain forests to the warmth of a Thousand Hills, we craft memories that linger for a lifetime.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center lg:text-right">
                <h3 className="text-yellow-500 text-3xl md:text-4xl font-bold">
                  8
                </h3>
                <p className="text-white text-xs md:text-sm">
                  Years Of
                  <br />
                  Expertise
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-yellow-500 text-3xl md:text-4xl font-bold">
                  1500+
                </h3>
                <p className="text-white text-xs md:text-sm">
                  Satisfied
                  <br />
                  Travelers
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-yellow-500 text-3xl md:text-4xl font-bold">
                  5
                </h3>
                <p className="text-white text-xs md:text-sm">
                  National
                  <br />
                  Parks
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Explore More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
