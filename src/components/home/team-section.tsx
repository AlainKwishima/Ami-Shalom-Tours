"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  title: string;
  image: string;
  className?: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  title,
  image,
  className = "",
}) => {
  const isRightAligned = className.includes("right");

  return (
    <>
      {/* Mobile Layout - Combined card */}
      <div className="lg:hidden">
        <div className="border-2 border-yellow-500 bg-[#002B28] overflow-hidden shadow-xl">
          {/* Image */}
          <div className="relative w-full h-64">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw"
            />
          </div>

          {/* Team Member Info */}
          <div className="p-6">
            <h3
              className="text-yellow-500 text-lg font-bold mb-2"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              {name}
            </h3>
            <p className="text-white text-sm uppercase">{role}</p>
            {title && <p className="text-white text-xs uppercase">{title}</p>}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Image above container */}
      <div className={`hidden lg:block relative pt-40 md:pt-52 ${className}`}>
        {/* Team Member Image - Positioned ABOVE the container */}
        <div
          className={`absolute top-24 ${
            isRightAligned ? "-right-5" : "-left-5"
          } w-48 h-64 md:w-56 md:h-80 overflow-hidden shadow-xl z-10`}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>

        {/* Yellow Border Container */}
        <div className="relative border-2 border-yellow-500 bg-[#002B28] p-6 min-h-[360px] flex flex-col justify-end">
          {/* Team Member Info at Bottom */}
          <div>
            <h3
              className="text-yellow-500 text-lg md:text-xl font-bold mb-2"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              {name}
            </h3>
            <p className="text-white text-sm uppercase">{role}</p>
            {title && <p className="text-white text-xs uppercase">{title}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

const teamMembers = [
  {
    name: "ARTEMIY LEVONOV",
    role: "CHIEF INSTRUCTOR",
    title: "TOUR GUIDE",
    image: "/assets/team1.jpg",
  },
  {
    name: "EVELINE MORTAK",
    role: "INSTRUCTOR",
    title: "TOUR GUIDE",
    image: "/assets/team2.jpg",
  },
  {
    name: "ALEKSANDRA VISOTSKA",
    role: "TOUR GUIDE",
    title: "",
    image: "/assets/team3.jpg",
  },
  {
    name: "JAYSON MANYER",
    role: "TOUR GUIDE",
    title: "DRIVER",
    image: "/assets/team4.jpg",
  },
];

export function TeamSection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            THE BEST TEAM ON
            <br />
            YOUR JOURNEY
          </h2>
          <p
            className="text-yellow-500 text-xl md:text-2xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            OUR TEAM
          </p>
          <p className="text-white text-sm md:text-base max-w-3xl mx-auto">
            Our Pride! We Are Happy To Create For You An Unforgettable Adventure
            <br />
            That You Will Remember For A Lifetime
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                title={member.title}
                image={member.image}
                className={`${index % 2 === 0 ? "lg:mt-12 right" : ""}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
