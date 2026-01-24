"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components/layout";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Mock Data for Search
const allTours = [
    {
        available: true,
        id: "tour-1",
        title: "Gorilla Trekking Adventure",
        location: "Volcanoes National Park",
        duration: "3 Days",
        price: 1500,
        image: "/assets/hero1.jpg",
        category: "Wildlife"
    },
    {
        available: true,
        id: "tour-2",
        title: "Akagera Safari Experience",
        location: "Akagera National Park",
        duration: "2 Days",
        price: 450,
        image: "/assets/city2.jpg",
        category: "Safari"
    },
    {
        available: true,
        id: "tour-3",
        title: "Nyungwe Canopy Walk",
        location: "Nyungwe Forest",
        duration: "3 Days",
        price: 600,
        image: "/assets/city1.jpg",
        category: "Nature"
    },
    {
        available: true,
        id: "tour-4",
        title: "Kigali City Cultural Tour",
        location: "Kigali",
        duration: "1 Day",
        price: 100,
        image: "/assets/hero2.jpg",
        category: "Culture"
    },
    {
        available: true,
        id: "tour-5",
        title: "Lake Kivu Relaxation",
        location: "Rubavu / Karongi",
        duration: "2 Days",
        price: 300,
        image: "/assets/re5.jpg",
        category: "Relaxation"
    },
];

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const results = allTours.filter(tour =>
        tour.title.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query) ||
        tour.category.toLowerCase().includes(query)
    );

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Header */}
            <div className="bg-[#002B28] pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    Search Results
                </h1>
                <div className="max-w-xl mx-auto relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search destinations, tours..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 border-none focus:ring-2 focus:ring-yellow-500"
                            defaultValue={query}
                            onChange={(e) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set("q", e.target.value);
                                window.history.replaceState({}, "", url);
                                // Force re-render would require state management, but this input is just for show essentially if we don't bind it. 
                                // For a simple version let's just let the user see the result of their initial navigation.
                                // To make it interactive we'd need a form or state. 
                                // Simple redirection for now:
                                // window.location.href = `/search?q=${e.target.value}`;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/search?q=${(e.target as HTMLInputElement).value}`;
                                }
                            }}
                        />
                    </div>
                    {query && (
                        <p className="mt-4 text-gray-300">
                            Showing results for "<span className="text-yellow-500 font-semibold">{query}</span>"
                        </p>
                    )}
                </div>
            </div>

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[50vh]">
                <div className="max-w-7xl mx-auto">
                    {results.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500 mb-6">No tours found matching your search.</p>
                            <Button asChild className="bg-teal-600 hover:bg-teal-700">
                                <Link href="/destinations">View All Destinations</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {results.map((tour) => (
                                <Link href={`/destinations/${tour.id}`} key={tour.id} className="block group">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        <div className="relative h-56 w-full">
                                            <Image
                                                src={tour.image}
                                                alt={tour.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                                                {tour.category}
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <MapPin className="h-4 w-4 mr-1 text-yellow-500" />
                                                {tour.location}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                                                {tour.title}
                                            </h3>

                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {tour.duration}
                                                </div>
                                                <div className="text-lg font-bold text-teal-600">
                                                    ${tour.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
