"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export function MissionVisionValues() {
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      content: "To provide exceptional, authentic travel experiences that connect visitors with the natural beauty, wildlife, and rich cultural heritage of Rwanda. We are committed to sustainable tourism practices that honor conservation and benefit our local communities.",
      color: "bg-yellow-500",
    },
    {
      icon: Eye,
      title: "Our Vision",
      content: "To be the leading tourism operator in Rwanda, recognized for our commitment to peace (Shalom), sustainability, and authentic cultural experiences. We envision a future where travel preserves the Land of a Thousand Hills for generations to come.",
      color: "bg-[#002B28]",
    },
    {
      icon: Heart,
      title: "Our Values",
      content: [
        "Authenticity: We showcase the real Rwanda, from the mist of Volcanoes NP to the heart of our communities.",
        "Excellence: We maintain the highest standards in safety, hospitality, and professional guiding.",
        "Conservation: We protect Rwanda's biodiversity, especially our mountain gorillas and Big Five.",
        "Hospitality: Every traveler is welcomed as a friend (Ami) with the warmth of Rwandan culture.",
        "Integrity: We operate with transparency, respect, and a commitment to our nation's progress.",
      ],
      color: "bg-yellow-500",
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
            What Drives Us
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            MISSION, VISION & VALUES
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`${section.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                >
                  {section.title}
                </h3>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3 text-gray-700">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

