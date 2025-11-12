import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/assets/logo.png"
            alt="Ami Shalom Logo"
            width={120}
            height={120}
            className="mx-auto opacity-80"
            priority
          />
        </div>

        {/* 404 Text */}
        <h1
          className="text-yellow-500 text-8xl md:text-9xl font-bold mb-4"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          404
        </h1>

        {/* Main message */}
        <h2
          className="text-white text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Lost in the Jungle?
        </h2>

        {/* Description */}
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          Looks like you&apos;ve wandered off the beaten path! The page
          you&apos;re looking for doesn&apos;t exist, but don&apos;t worry - our
          expert guides can help you find your way back.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link
              href="javascript:history.back()"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            Need help? Contact our guides at{" "}
            <a
              href="tel:+14589956389"
              className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
            >
              +(45) 899 566 389
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
