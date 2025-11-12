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
import { getDestinationById } from "@/lib/destinations-data";

interface DestinationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DestinationDetailPageProps) {
  const { id } = await params;
  const destination = getDestinationById(parseInt(id));

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
  const destination = getDestinationById(parseInt(id));

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

