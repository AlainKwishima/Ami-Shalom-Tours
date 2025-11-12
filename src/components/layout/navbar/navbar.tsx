"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu, NavLinks } from ".";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b-2 border-transparent py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="pt-3 md:pt-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Ami Shalom Logo"
                width={100}
                height={100}
                className="h-18 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block pt-6">
            <NavLinks />
          </div>

          {/* Contact Button & Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4 pt-6">
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>

            {/* Social Media Icons */}
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              // size="icon"
              onClick={toggleMobileMenu}
              className="text-white hover:bg-blue-700"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-40 w-40" size={50} />
              ) : (
                <Menu className="h-40 w-40" size={50} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
