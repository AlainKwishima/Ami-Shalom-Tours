"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface DestinationBreadcrumbsProps {
  destinationTitle: string;
}

export function DestinationBreadcrumbs({ destinationTitle }: DestinationBreadcrumbsProps) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-4" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-500 hover:text-yellow-600 transition-colors flex items-center"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li>
            <Link
              href="/destinations"
              className="text-gray-500 hover:text-yellow-600 transition-colors"
            >
              Destinations
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li className="text-gray-900 font-medium truncate max-w-xs md:max-w-md">
            {destinationTitle}
          </li>
        </ol>
      </div>
    </nav>
  );
}

