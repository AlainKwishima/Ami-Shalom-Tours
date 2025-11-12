"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Globe } from "lucide-react";

export function CompanyOverview() {
  const stats = [
    { icon: Globe, label: "Countries", value: "Uganda & Beyond", description: "Operating across East Africa" },
    { icon: Users, label: "Team Members", value: "20+", description: "Expert guides and staff" },
    { icon: Award, label: "Years Experience", value: "10+", description: "Creating memorable journeys" },
    { icon: MapPin, label: "Destinations", value: "50+", description: "Curated locations" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              Welcome to Ami Shalom Tours
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Ami Shalom Company LTD is a premier tourism operator specializing in curated, 
                immersive travel experiences across Uganda. From tracking the majestic mountain 
                gorillas of Bwindi, to gliding across serene lakes on boat cruises, to standing 
                in awe beneath thundering waterfalls, we deliver journeys that go beyond 
                sightseeing — offering moments that inspire, educate, and connect.
              </p>
              <p>
                Based in Uganda, we have been serving travelers from around the world for over 
                a decade, building a reputation for excellence, authenticity, and unforgettable 
                adventures. Our deep local knowledge, combined with international standards of 
                service, ensures every journey is both safe and extraordinary.
              </p>
              <p>
                We operate throughout Uganda and extend our services to neighboring countries 
                in East Africa, offering comprehensive travel solutions that showcase the best 
                of the region&apos;s natural beauty, wildlife, and cultural heritage.
              </p>
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
              <Image
                src="/assets/about1.svg"
                alt="Uganda landscape"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl mt-8">
              <Image
                src="/assets/about2.svg"
                alt="Wildlife safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl -mt-8">
              <Image
                src="/assets/about3.svg"
                alt="Cultural experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl">
              <Image
                src="/assets/about4.svg"
                alt="Adventure travel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-yellow-50 transition-colors duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-500 rounded-full">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                  {stat.value}
                </h3>
                <p className="text-yellow-600 font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

