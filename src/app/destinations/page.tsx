import { Navbar } from "@/components/layout";
import { DestinationsHero, DestinationsGrid } from "@/components/destinations";
import { Footer } from "@/components/layout/footer";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <DestinationsHero />
      <DestinationsGrid />
      <Footer />
    </div>
  );
}