import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="text-center">
        {/* Logo with pulse animation */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/assets/logo.png"
            alt="Ami Shalom Logo"
            width={150}
            height={150}
            className="mx-auto"
            priority
          />
        </div>

        {/* Loading text */}
        <h2
          className="text-white text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Loading Your Adventure...
        </h2>

        {/* Loading spinner */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Subtitle */}
        <p className="text-white/70 text-lg mt-6">
          Preparing your jungle experience...
        </p>
      </div>
    </div>
  );
}
