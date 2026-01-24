import DestinationCard from "./DestinationCard";

const destinations = [
  { image: "/assets/re1.jpg", title: "Volcanoes NP" },
  { image: "/assets/re4.jpg", title: "Akagera NP" },
  { image: "/assets/about2.jpg", title: "Nyungwe Forest" },
  { image: "/assets/re7.jpg", title: "Lake Kivu" },
  { image: "/assets/city1.jpg", title: "Kigali City" },
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
              href="tel:+250780000000"
              className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors duration-200"
            >
              +250 780 000 000
            </a>{" "}
            or{" "}
            <button className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors duration-200 underline">
              REQUEST A CONSULTATION
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
