"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/constants";

interface Review {
    id: string;
    text: string;
    rating: number;
    author: string;
}

const defaultReviews: Review[] = [
    {
        id: "1",
        text: '"Absolutely Wonderful! Just The Right Amount Of Time Spent Snorkeling And One Of The Most Beautiful Beaches I Have Ever Seen. Customer Service Was Professional. Highly Recommend."',
        rating: 5,
        author: "JOHN DOE",
    },
    {
        id: "2",
        text: '"An amazing experience from start to finish! Our tour guide was knowledgeable and friendly. The destinations were breathtaking and well-organized. Would definitely book again!"',
        rating: 5,
        author: "SARAH SMITH",
    },
    {
        id: "3",
        text: '"Best vacation ever! Everything was perfectly planned and executed. The accommodations were excellent and the itinerary was well-balanced. Highly recommend this tour company!"',
        rating: 5,
        author: "MICHAEL JOHNSON",
    },
    {
        id: "4",
        text: '"Exceptional service and unforgettable memories! The attention to detail and personalized touches made this trip truly special. Cannot wait to book our next adventure!"',
        rating: 5,
        author: "EMILY DAVIS",
    },
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(defaultReviews);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetch(`${API_BASE_URL}/reviews?limit=50`) // Fetch more for the full page
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load reviews");
                }
                return response.json();
            })
            .then((data) => {
                if (!isMounted) return;
                if (Array.isArray(data?.data) && data.data.length) {
                    const mapped: Review[] = data.data.map(
                        (item: { id?: string; _id?: string; message: string; rating: number; name: string }) => ({
                            id:
                                item.id ??
                                item._id ??
                                (typeof crypto !== "undefined" && crypto.randomUUID
                                    ? crypto.randomUUID()
                                    : Math.random().toString(36).slice(2)),
                            text: item.message,
                            rating: item.rating ?? 5,
                            author: item.name?.toUpperCase?.() ?? item.name ?? "Traveller",
                        }),
                    );
                    setReviews(mapped);
                }
            })
            .catch(() => {
                // keep defaults on failure
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#002B28] min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <p
                            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
                            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                        >
                            TESTIMONIALS
                        </p>
                        <h1
                            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                        >
                            What Our Travelers Say
                        </h1>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                                {/* Star Rating */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={`mx-0.5 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-600"}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                                    "{review.text.replace(/^"|"$/g, '')}"
                                </p>

                                <h3
                                    className="text-white text-lg font-bold tracking-wide"
                                    style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                                >
                                    - {review.author}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold px-8 py-6 text-lg"
                        >
                            <Link href="/write-review">Write Your Review</Link>
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
