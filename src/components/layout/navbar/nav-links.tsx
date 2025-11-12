"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", isExternal: false },
  { href: "/about", label: "About", isExternal: false },
  { href: "/services", label: "Services", isExternal: false },
  { href: "/destinations", label: "Destinations", isExternal: false },
  { href: "/gallery", label: "Gallery", isExternal: false },
];

interface NavLinksProps {
  className?: string;
  onItemClick?: () => void;
}

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export function NavLinks({ className = "", onItemClick }: NavLinksProps) {
  const handleClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const elementId = href.substring(1);
      smoothScrollTo(elementId);
      onItemClick?.();
    } else if (href === "/") {
      // For home, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      onItemClick?.();
    } else {
      // For route navigations, let Next.js handle navigation and close menu
      onItemClick?.();
    }
  };

  return (
    <div className={`flex space-x-8 ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
          onClick={(e) => handleClick(item.href, e)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
