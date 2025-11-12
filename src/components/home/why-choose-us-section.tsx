import React from "react";

interface ReasonCardProps {
  title: string;
  description: string;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ title, description }) => {
  return (
    <div className="text-center px-4 py-6">
      {/* Title */}
      <h3
        className="text-white text-lg md:text-xl font-bold mb-4"
        style={{ fontFamily: "Palanquin Dark, sans-serif" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-white text-sm md:text-base leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};

const reasons = [
  {
    title: "SAFETY FIRST",
    description:
      "All Our Guides And Trek Leaders Have Been Trained By Medical Specialists In Handling Altitude Illness And Are Proficient In First-Aid.",
  },
  {
    title: "TREK EXPERTS",
    description:
      "All Our Guides Are Certified Local Tour Guides And Trained In Things On Informed Safety Policies. Guide Also Receives Informed Training.",
  },
  {
    title: "RAINFOREST ALLIANCE",
    description:
      "We Have The Tick Of Approval Indicating That We Meet And Operate At The Highest Standards In Environmental.",
  },
  {
    title: "LOCAL MATTERS",
    description:
      "Our Team Members Live And Work In The Andean Region, Which Means Revenue From All Our Treks Benefit The Local Economy.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="services" className="relative">
      {/* Top Section - Dark Background with Content */}
      <div
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#002B28" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p
              className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              Why Us
            </p>
            <h2
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              REASONS WHY YOU
              <br />
              SHOULD CHOOSE US
            </h2>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {reasons.map((reason, index) => (
              <div key={index} className="relative">
                {/* Vertical Divider - Only on desktop */}
                {index < reasons.length - 1 && (
                  <div className="hidden lg:block absolute top-0 -right-6 w-px h-full bg-yellow-500"></div>
                )}

                <ReasonCard
                  title={reason.title}
                  description={reason.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Hero Background with CTA */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center justify-center">
        {/* Background Image - Covers enough height for button */}
        <div
          className="absolute inset-0 h-64 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/hero2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Dark background for rest of section */}
        <div
          className="absolute inset-0 top-64"
          style={{ backgroundColor: "#002B28" }}
        ></div>

        {/* CTA Content */}
        <div className="relative z-10 text-center">
          <div className="border-4 border-yellow-500 inline-block p-2">
            <button
              className="bg-white rounded-lg text-black font-semibold px-6 py-3 text-base md:text-md transition-all duration-300 hover:bg-gray-100"
              style={{ fontFamily: "Palanquin Dark, sans-serif" }}
            >
              TRAVEL TOGETHER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
