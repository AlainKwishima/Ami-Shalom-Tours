"use client";

import React from "react";
import { motion } from "framer-motion";

interface ReasonImage {
  src: string;
  alt: string;
  size: "sm" | "md" | "lg";
}

interface ReasonData {
  id: number;
  text: string;
  position: "left" | "right";
  images: ReasonImage[];
}

const reasonsData: ReasonData[] = [
  {
    id: 1,
    text: "Rwanda is world-renowned as the premier destination for tracking the majestic Mountain Gorillas in their natural habitat within the Volcanoes National Park. This life-changing encounter offers a unique glimpse into the lives of these gentle giants while supporting vital conservation efforts.",
    position: "left",
    images: [
      {
        src: "/assets/re1.jpg",
        alt: "Mountain Gorilla in Volcanoes NP",
        size: "lg" as const,
      },
      {
        src: "/assets/re2.jpg",
        alt: "Lush Rwandan rainforest",
        size: "md" as const,
      },
    ],
  },
  {
    id: 2,
    text: "Known as the 'Singapore of Africa,' Kigali is celebrated as the cleanest and safest city on the continent. Beyond its spotless streets, you'll find a vibrant cultural hub filled with world-class art galleries, busy markets, and a deeply moving history of resilience.",
    position: "right",
    images: [
      {
        src: "/assets/re3.jpg",
        alt: "Clean streets of Kigali",
        size: "lg" as const,
      },
      {
        src: "/assets/re4.jpg",
        alt: "Modern architecture in Rwanda",
        size: "md" as const,
      },
    ],
  },
  {
    id: 3,
    text: "Akagera National Park offers a complete Big Five safari experience. From the vast savanna plains to the serene Lake Ihema, witness lions, rhinos, elephants, buffalos, and leopards in a landscape where hills meet the horizon.",
    position: "left",
    images: [
      {
        src: "/assets/re5.jpg",
        alt: "Safari in Akagera NP",
        size: "sm" as const,
      },
      {
        src: "/assets/re6.jpg",
        alt: "Elephants in the savanna",
        size: "sm" as const,
      },
    ],
  },
  {
    id: 4,
    text: "Step into one of Africa's oldest rainforests. Nyungwe National Park is a biodiversity hotspot, home to 13 primate species including chimpanzees and Colobus monkeys, and features the breathtaking 70-meter high Canopy Walkway.",
    position: "right",
    images: [
      {
        src: "/assets/re7.jpg",
        alt: "Nyungwe Canopy Walk",
        size: "md" as const,
      },
      {
        src: "/assets/re8.jpg",
        alt: "Colobus Monkey in Nyungwe",
        size: "md" as const,
      },
    ],
  },
  {
    id: 5,
    text: "Experience the heart of Rwanda through its people. From the rhythmic Intore dancers to the traditional Imigongo art, Rwandan culture is a beautiful tapestry of hospitality, storytelling, and craftsmanship that welcomes every traveler as a friend.",
    position: "left",
    images: [
      {
        src: "/assets/re9.jpg",
        alt: "Traditional Intore dancers",
        size: "sm" as const,
      },
      {
        src: "/assets/re10.jpg",
        alt: "Rwandan hospitality",
        size: "sm" as const,
      },
    ],
  },
];

interface DiamondImageProps {
  src: string;
  alt: string;
  size: "sm" | "md" | "lg";
  className?: string;
}

const DiamondImage: React.FC<DiamondImageProps> = ({
  src,
  alt,
  size,
  className = "",
}) => {
  const sizeClasses: Record<"sm" | "md" | "lg", string> = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-32 h-32 md:w-40 md:h-40",
    lg: "w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full rotate-45 overflow-hidden border-[5px] border-[#002B28] shadow-xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover -rotate-45 scale-150"
        />
      </div>
    </div>
  );
};

export function ReasonsSection() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-base md:text-lg mb-3 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Reasons
          </p>
          <h2
            className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            FIVE REASONS WHY YOU SHOULD VISIT Ami Shalom
          </h2>
        </div>

        {/* Reasons Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-600 hidden lg:block"></div>

          {/* Timeline Items */}
          <div className="space-y-16 lg:space-y-20">
            {reasonsData.map((reason, index) => (
              <motion.div
                key={reason.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-20 hidden lg:block border-2 border-gray-600"></div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col items-center gap-8">
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {reason.images.map((image, imgIndex) => (
                      <DiamondImage
                        key={imgIndex}
                        src={image.src}
                        alt={image.alt}
                        size={image.size}
                        className={imgIndex === 1 ? "-ml-8" : ""}
                      />
                    ))}
                  </div>
                  <div className="text-center max-w-md">
                    <p className="text-white text-xs md:text-sm leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  {reason.position === "left" ? (
                    <>
                      {/* Images on Left */}
                      <div className="flex justify-end items-center gap-6 pr-12">
                        {reason.images.map((image, imgIndex) => (
                          <DiamondImage
                            key={imgIndex}
                            src={image.src}
                            alt={image.alt}
                            size={image.size}
                            className={imgIndex === 1 ? "-ml-12" : ""}
                          />
                        ))}
                      </div>
                      {/* Text on Right */}
                      <div className="pl-12">
                        <p className="text-white text-xs md:text-sm leading-relaxed max-w-md">
                          {reason.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Text on Left */}
                      <div className="pr-12 text-right flex justify-end">
                        <p className="text-white text-xs md:text-sm leading-relaxed max-w-md">
                          {reason.text}
                        </p>
                      </div>
                      {/* Images on Right */}
                      <div className="flex justify-start items-center gap-6 pl-12">
                        {reason.images.map((image, imgIndex) => (
                          <DiamondImage
                            key={imgIndex}
                            src={image.src}
                            alt={image.alt}
                            size={image.size}
                            className={imgIndex === 1 ? "-ml-12" : ""}
                          />
                        ))}
                      </div>
                    </>
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
