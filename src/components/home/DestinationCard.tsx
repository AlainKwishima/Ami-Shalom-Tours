import React from "react";

interface DestinationCardProps {
  image: string;
  title: string;
  className?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  image,
  title,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-4 border-yellow-500 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer w-64 h-96 ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* City Name - Full Width with Transparent Background */}
      <div className="absolute bottom-8 left-0 right-0 bg-black/80 py-4 text-center">
        <h3
          className="text-white text-xl md:text-2xl font-bold"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default DestinationCard;
