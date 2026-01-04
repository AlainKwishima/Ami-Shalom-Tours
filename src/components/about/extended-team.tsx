"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Award, Heart } from "lucide-react";

export function ExtendedTeam() {
  const teamCategories = [
    {
      icon: Users,
      title: "Expert Guides",
      description: "Our team of certified tour guides brings years of experience and deep local knowledge. They are passionate storytellers who make every destination come alive.",
      count: "12+",
    },
    {
      icon: Award,
      title: "Operations Team",
      description: "Behind the scenes, our operations team ensures every detail is perfect—from logistics and accommodations to safety and customer service.",
      count: "5+",
    },
    {
      icon: Heart,
      title: "Support Staff",
      description: "Our drivers, hospitality staff, and support team work tirelessly to ensure your comfort and safety throughout your journey.",
      count: "8+",
    },
  ];

  const featuredTeam = [
    {
      name: "Jean Paul Habimana",
      role: "Lead Guide",
      title: "Senior Tour Guide",
      image: "/assets/team1.jpg",
    },
    {
      name: "Divine Mutoni",
      role: "Operations Manager",
      title: "Logistics Expert",
      image: "/assets/team2.jpg",
    },
    {
      name: "Eric Gasana",
      role: "Tour Specialist",
      title: "Cultural Expert",
      image: "/assets/team3.jpg",
    },
    {
      name: "Sandrine Uwase",
      role: "Travel Consultant",
      title: "Customer Success",
      image: "/assets/team4.jpg",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#002B28" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Meet the People
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            OUR EXTENDED TEAM
          </h2>
          <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
            Our success is built on the dedication and expertise of our incredible team members
            who work together to create unforgettable experiences for every traveler.
          </p>
        </motion.div>

        {/* Team Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-500 rounded-full">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                >
                  {category.count} {category.title}
                </h3>
                <p className="text-gray-700">{category.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Team Members */}
        <div>
          <h3
            className="text-3xl font-bold text-white text-center mb-12"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Featured Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h4
                    className="text-yellow-600 text-lg font-bold mb-1"
                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                  >
                    {member.name}
                  </h4>
                  <p className="text-gray-700 text-sm uppercase">{member.role}</p>
                  {member.title && (
                    <p className="text-gray-600 text-xs uppercase mt-1">{member.title}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

