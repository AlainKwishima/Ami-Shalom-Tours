import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Destination", href: "#" },
  { name: "Exclusive Tour", href: "#" },
  { name: "Reviews", href: "#" },
  { name: "FAQS", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Fade Overlay - Gradient from dark teal to transparent */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #002B28 0%, transparent 100%)'
        }}
      ></div>

      {/* Footer Content */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/footer.jpg"
            alt="Footer background"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Logo and Tagline */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-yellow-500 p-3 rounded-lg mr-3">
                  <Briefcase className="h-8 w-8 text-black" />
                </div>
                <h3
                  className="text-white text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                >
                  Ami Shalom
                </h3>
              </div>
              <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
                Discover the World with Ami Shalom Your Ultimate Travel Companion!
              </p>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-px bg-white/30 mb-8"></div>

            {/* Navigation Links */}
            <nav className="mb-12">
              <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`text-white hover:text-yellow-500 transition-colors duration-200 ${
                        link.name === "Home" ? "text-yellow-500" : ""
                      }`}
                      style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white text-sm">
              {/* Phone */}
              <div className="flex items-center">
                <span className="mr-2">Phone:</span>
                <a 
                  href="tel:+11234567890" 
                  className="hover:text-yellow-500 transition-colors duration-200"
                >
                  ++123-456-7890
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Twitter/X"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <span className="mr-2">Email:</span>
                <a 
                  href="mailto:info@FLYFLYagency.com" 
                  className="hover:text-yellow-500 transition-colors duration-200"
                >
                  info@FLYFLYagency.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
