export function GalleryHero() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/Beauty is Africa.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: "Righteous, cursive" }}
          >
            GALLERY
          </h1>
          <p
            className="text-base md:text-xl lg:text-2xl text-white opacity-90"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            Memories From Our Unforgettable Tours Across The Land of a Thousand Hills
          </p>
        </div>
      </div>
    </div>
  );
}