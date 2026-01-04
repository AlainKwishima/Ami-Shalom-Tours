"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function AboutTestimonials() {
  const testimonials = [
    {
      text: "Ami Shalom Tours exceeded all our expectations! The gorilla trekking experience was life-changing, and our guide's knowledge of the local wildlife and culture was incredible. We felt safe, well-cared-for, and truly immersed in Rwanda's beauty.",
      author: "Sarah & Michael Johnson",
      location: "United States",
      rating: 5,
    },
    {
      text: "From the moment we arrived in Kigali, everything was perfectly organized. The team's attention to detail and genuine care for both travelers and local communities was evident. This wasn't just a vacation—it was a meaningful journey.",
      author: "Emma Thompson",
      location: "United Kingdom",
      rating: 5,
    },
    {
      text: "Our family trip to Rwanda with Ami Shalom Tours was absolutely magical. The guides were patient with our children, the lakeside accommodations were excellent, and we created memories that will last a lifetime. Highly recommend!",
      author: "The Rodriguez Family",
      location: "Spain",
      rating: 5,
    },
    {
      text: "As a solo female traveler, I felt completely safe and supported throughout my journey. The team went above and beyond to ensure I had an authentic experience while respecting my comfort level. Truly exceptional service.",
      author: "Lisa Chen",
      location: "Australia",
      rating: 5,
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
            Traveler Stories
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            WHAT OUR GUESTS SAY
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl relative"
            >
              <Quote className="w-12 h-12 text-yellow-500 mb-4 opacity-50" />
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4
                    className="text-xl font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                  >
                    {testimonial.author}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

