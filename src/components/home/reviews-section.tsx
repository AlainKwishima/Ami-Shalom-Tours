"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
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

export function ReviewsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-slide functionality
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000); // Auto-slide every 10 seconds

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE_URL}/reviews?limit=10`)
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
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            REAL TRAVELERS REVIEWS
          </p>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            What Our Travelers Say
            <br />
            About The Trip
          </h2>
        </div>

        {/* Carousel with Decorative Images */}
        <div className="relative px-8 lg:px-32">
          {/* Left Decorative Image - Hidden on mobile */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-56 h-56 xl:w-64 xl:h-64">
            <Image
              src="/assets/rev1.svg"
              alt="Travel photos"
              fill
              className="object-contain"
              sizes="256px"
            />
          </div>

          {/* Right Decorative Image - Hidden on mobile */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-56 h-56 xl:w-64 xl:h-64">
            <Image
              src="/assets/rev2.svg"
              alt="Travel items"
              fill
              className="object-contain"
              sizes="256px"
            />
          </div>

          {/* Carousel */}
          <div className="max-w-2xl lg:max-w-3xl mx-auto">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {reviews.map((review) => (
                  <CarouselItem key={review.id}>
                    <div className="p-8 md:p-12 text-center">
                      {/* Review Text */}
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                        {review.text}
                      </p>

                      {/* Star Rating */}
                      <div className="flex justify-center items-center mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className="text-yellow-500 fill-current mx-1"
                          />
                        ))}
                      </div>

                      {/* Author Name */}
                      <h3
                        className="text-white text-xl md:text-2xl font-bold"
                        style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                      >
                        {review.author}
                      </h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <CarouselPrevious className="hidden md:flex left-2 lg:left-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#002B28] text-white z-20" />
              <CarouselNext className="hidden md:flex right-2 lg:right-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#002B28] text-white z-20" />
            </Carousel>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="bg-yellow-400 text-slate-900 hover:bg-yellow-300"
        >
          <Link href="/write-review">Write a Review</Link>
        </Button>
      </div>
    </section>
  );
}
