import DestinationCard from "./DestinationCard";

const destinations = [
  { image: "/assets/cit1.jpg", title: "Delhi" },
  { image: "/assets/city2.jpg", title: "Goa" },
  { image: "/assets/city3.jpg", title: "Manali" },
  { image: "/assets/city4.jpg", title: "Amritsar" },
  { image: "/assets/city5.jpg", title: "Shimla" },
];

export function TopDestinationsSection() {
  return (
    <section
      id="destination"
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
            Choose Your Experience
          </p>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            TOP ATTRACTIONS DESTINATIONS
          </h2>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-8 mb-16 lg:items-end">
          {destinations.map((d, i) => (
            <DestinationCard
              key={i}
              image={d.image}
              title={d.title}
              className={i % 2 === 1 ? "lg:mb-8" : ""}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white text-base md:text-lg mb-4">
            Speak To Our Destination Experts At Call{" "}
            <a
              href="tel:+14589956389"
              className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors duration-200"
            >
              +(45) 899 566 389
            </a>{" "}
            or{" "}
            <button className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors duration-200 underline">
              REQUEST A QUOTE
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
