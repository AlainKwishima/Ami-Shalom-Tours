import React from "react";
import {
  Mountain,
  Waves,
  Ship,
  Building2,
  UtensilsCrossed,
  TreePine,
} from "lucide-react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  tourCount: number;
  price: string;
  bgImage: string;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  tourCount,
  price,
  bgImage,
  isActive = false,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border-4 border-yellow-500 h-56 md:h-64 lg:h-72 cursor-pointer transition-all duration-300 hover:scale-105">
      {/* Background Image - Shows on hover or when active */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Active Background Image - Shows for active card */}
      {isActive && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* White Background - Default state */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
        {/* Icon */}
        <div
          className={`mb-4 transition-colors duration-300 ${
            isActive ? "text-white" : "text-black group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${
            isActive ? "text-white" : "text-black group-hover:text-white"
          }`}
        >
          {title}
        </h3>

        {/* Tour Count */}
        <p
          className={`text-sm mb-3 transition-colors duration-300 ${
            isActive
              ? "text-white/90"
              : "text-gray-600 group-hover:text-white/90"
          }`}
        >
          {tourCount} Tours
        </p>

        {/* Price */}
        <div
          className={`transition-colors duration-300 ${
            isActive ? "text-white" : "text-black group-hover:text-white"
          }`}
        >
          <span className="text-sm">from </span>
          <span className="text-yellow-500 font-bold text-lg">{price}</span>
        </div>
      </div>
    </div>
  );
};

const categories = [
  {
    icon: <Mountain size={48} />,
    title: "Adventure",
    tourCount: 12,
    price: "$150",
    bgImage: "/assets/city1.jpg",
  },
  {
    icon: <Waves size={48} />,
    title: "Beaches",
    tourCount: 9,
    price: "$150",
    bgImage: "/assets/city2.jpg",
  },
  {
    icon: <Ship size={48} />,
    title: "Boat Tours",
    tourCount: 7,
    price: "$150",
    bgImage: "/assets/city3.jpg",
  },
  {
    icon: <Building2 size={48} />,
    title: "City Tours",
    tourCount: 15,
    price: "$150",
    bgImage: "/assets/city4.jpg",
  },
  {
    icon: <UtensilsCrossed size={48} />,
    title: "Food",
    tourCount: 10,
    price: "$150",
    bgImage: "/assets/city5.jpg",
  },
  {
    icon: <TreePine size={48} />,
    title: "Hiking",
    tourCount: 7,
    price: "$150",
    bgImage: "/assets/city6.jpg",
  },
];

export function BrowseCategorySection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Browse By Category
          </p>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            FIND INSPIRATION FOR YOUR NEXT TRIP
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              tourCount={category.tourCount}
              price={category.price}
              bgImage={category.bgImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
