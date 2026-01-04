"use client";

import { motion } from "framer-motion";
import { Handshake, Shield, Leaf, Award } from "lucide-react";

export function Partnerships() {
  const partnerships = [
    {
      icon: Shield,
      title: "Conservation Organizations",
      description: "We partner with wildlife conservation groups to support gorilla protection, anti-poaching efforts, and habitat preservation. A portion of our proceeds goes directly to conservation initiatives.",
    },
    {
      icon: Handshake,
      title: "Local Communities",
      description: "We work closely with local communities to create authentic cultural experiences while ensuring tourism benefits are shared fairly. We support local businesses, artisans, and community projects.",
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism Bodies",
      description: "We are members of sustainable tourism organizations and follow best practices for environmental protection, waste management, and carbon footprint reduction.",
    },
    {
      icon: Award,
      title: "Hospitality Partners",
      description: "We maintain strong relationships with hotels, lodges, and eco-resorts across Rwanda, ensuring our guests enjoy comfortable accommodations that meet our high standards of excellence and sustainability.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-yellow-600 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Working Together
          </p>
          <h2
            className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            OUR PARTNERSHIPS
          </h2>
          <p className="text-gray-700 text-lg mt-4 max-w-3xl mx-auto">
            We believe in the power of collaboration. Our partnerships with conservation groups,
            local communities, and tourism organizations enable us to deliver exceptional experiences
            while making a positive impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerships.map((partnership, index) => {
            const Icon = partnership.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-yellow-500"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-yellow-500 rounded-full flex-shrink-0">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                    >
                      {partnership.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{partnership.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

