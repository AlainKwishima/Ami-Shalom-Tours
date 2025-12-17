import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout/footer";
import {
  DestinationDetailHero,
  DestinationBreadcrumbs,
  DestinationOverview,
  DestinationGallery,
  DestinationItinerary,
  DestinationPricing,
  DestinationEvents,
  DestinationReviews,
} from "@/components/destinations";
import { API_BASE_URL } from "@/lib/constants";
import type { Destination } from "@/lib/api/destinations";

interface DestinationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DestinationDetailPageProps) {
  const { id } = await params;
  const res = await fetch(`${API_BASE_URL}/destinations/${id}`, { cache: "no-store" });
  const destination = res.ok ? ((await res.json()) as Destination) : null;

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: destination.title,
    description: destination.description,
  };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { id } = await params;
  const res = await fetch(`${API_BASE_URL}/destinations/${id}`, { cache: "no-store" });
  const destination = res.ok ? ((await res.json()) as Destination) : null;

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <DestinationBreadcrumbs destinationTitle={destination.title} />
      <DestinationDetailHero destination={destination} />
      <DestinationOverview destination={destination} />
      <DestinationGallery destination={destination} />
      <DestinationItinerary destination={destination} />
      <DestinationEvents destination={destination} />
      <DestinationPricing destination={destination} />
      <DestinationReviews destination={destination} />
      <Footer />
    </div>
  );
}

