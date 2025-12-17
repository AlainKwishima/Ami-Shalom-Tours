import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { WriteReviewForm } from "@/components/reviews/write-review-form";

export const metadata: Metadata = {
  title: "Share Your Experience | Ami Shalom Tours",
  description:
    "Tell us about your adventure with Ami Shalom Tours. Leave a review and rate our services to help other travelers plan their dream holidays.",
};

export default function WriteReviewPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-600">
              We value your feedback
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Tell Us About Your Journey
            </h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Every testimonial helps fellow travellers choose the right tour and guides us as we
              craft even better experiences. Share the moments that stood out, the guides that made a
              difference, and the memories you will cherish.
            </p>
            <ul className="space-y-3 text-sm text-gray-700 sm:text-base">
              <li>• What made your trip unforgettable?</li>
              <li>• How would you rate the service delivered by Ami Shalom Tours?</li>
              <li>• Would you recommend us to family and friends?</li>
            </ul>
          </div>

          <WriteReviewForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}


