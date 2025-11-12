import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout/footer";
import { ServicesHero, ServicesGrid } from "@/components/services";

export const metadata = {
  title: "Our Services",
  description: "Discover comprehensive travel services from Ami Shalom Tours including tour packages, travel planning, hotel booking, transportation, and more for your perfect Uganda adventure.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <Footer />
    </div>
  );
}

