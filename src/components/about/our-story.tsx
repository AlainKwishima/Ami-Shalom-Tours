 "use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

export function OurStory() {
  const milestones = [
    {
      year: "2014",
      title: "The Beginning",
      description: "Ami Shalom Tours was founded with a vision to share the beauty of Uganda with the world. Starting with small group tours, we focused on authentic experiences and personal connections.",
      icon: Calendar,
    },
    {
      year: "2017",
      title: "Expansion",
      description: "We expanded our operations across Uganda, adding gorilla trekking, wildlife safaris, and cultural tours to our portfolio. Our team grew to include expert local guides.",
      icon: MapPin,
    },
    {
      year: "2020",
      title: "Recognition",
      description: "Despite global challenges, we adapted and continued to serve travelers safely. We received recognition for our commitment to sustainable tourism and community support.",
      icon: Users,
    },
    {
      year: "2024",
      title: "Today",
      description: "We are a trusted name in East African tourism, offering comprehensive travel solutions with a team of 20+ professionals and partnerships across the region.",
      icon: Users,
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
            Our Journey
          </p>
          <h2
            className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            OUR STORY
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
          >
            <p>
              Ami Shalom Tours was born from a deep love for Uganda and a desire to share its 
              incredible natural beauty, diverse wildlife, and rich cultural heritage with travelers 
              from around the world. What started as a small operation with a handful of passionate 
              guides has grown into a premier tourism company serving thousands of visitors annually.
            </p>
            <p>
              Our journey began in 2014 when our founders recognized the need for authentic, 
              responsible tourism that benefits both visitors and local communities. We set out 
              to create experiences that go beyond typical tours—immersive journeys that educate, 
              inspire, and create lasting connections.
            </p>
            <p>
              Over the years, we&apos;ve built strong relationships with local communities, conservation 
              organizations, and hospitality partners. This network allows us to offer exclusive 
              access to some of Uganda&apos;s most spectacular destinations while ensuring our operations 
              support sustainable development and wildlife conservation.
            </p>
            <p>
              Today, we&apos;re proud to be a trusted name in East African tourism, known for our 
              expertise, reliability, and commitment to creating extraordinary travel experiences. 
              Our story continues to unfold with every journey we facilitate, every smile we create, 
              and every memory we help preserve.
            </p>
          </motion.div>

          {/* Story Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl"
          >
            <Image
              src="/assets/about5.jpg"
              alt="Ami Shalom Tours team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-500"></div>
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-1 ${isEven ? "lg:text-right" : ""}`}>
                    <div
                      className={`inline-block p-6 bg-white rounded-2xl shadow-lg border-2 border-yellow-500 ${
                        isEven ? "lg:ml-auto" : ""
                      }`}
                      style={{ maxWidth: "500px" }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-yellow-500 rounded-full">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

