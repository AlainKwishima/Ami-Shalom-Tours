"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

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

        {/* Error icon */}
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
        </div>

        {/* Main message */}
        <h1
          className="text-white text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Oops! Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          We encountered an unexpected error during your jungle adventure.
          Don&apos;t worry, our technical guides are working to fix this issue.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            If the problem persists, contact our support team at{" "}
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
