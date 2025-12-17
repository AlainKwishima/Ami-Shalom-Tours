import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { BookTourForm } from "@/components/bookings/book-tour-form";

export const metadata: Metadata = {
  title: "Book a Tour | Ami Shalom Tours",
  description:
    "Plan your next adventure with Ami Shalom Tours. Tell us your preferred destination, travel dates, and group size and we will customize the perfect itinerary.",
};

export default function BookTourPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,0.8fr)]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-teal-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
              Plan Your Journey
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Book Your Next Unforgettable Tour
            </h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Share a few details about your dream holiday and our travel experts will curate an
              itinerary tailored to your interests, budget, and travel style. Whether you are seeking
              wildlife encounters, cultural immersion, or seaside relaxation, Ami Shalom Tours will
              handle every detail.
            </p>
            <ul className="space-y-3 text-sm text-gray-700 sm:text-base">
              <li className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                  1
                </span>
                Tell us about your preferred destination, travel dates, and group size.
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                  2
                </span>
                Our specialists design a bespoke itinerary with hand-picked experiences.
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                  3
                </span>
                Confirm your trip and let us take care of logistics, guides, and support.
              </li>
            </ul>
          </div>

          <BookTourForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}


