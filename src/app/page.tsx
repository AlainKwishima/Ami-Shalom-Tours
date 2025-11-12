import { Navbar, Footer } from "@/components/layout";
import {
  HeroCarousel,
  AboutSection,
  TravelSection,
  ReasonsSection,
  ExclusiveTourSection,
  BrowseCategorySection,
  TopDestinationsSection,
  TravelDealsSection,
  WhyChooseUsSection,
  TeamSection,
  ReviewsSection,
  FaqSection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <HeroCarousel />
      <AboutSection />
      <TravelSection />
      <ReasonsSection />
      <ExclusiveTourSection />
      <TopDestinationsSection />
      <BrowseCategorySection />
      <TravelDealsSection />
      <WhyChooseUsSection />
      <TeamSection />
      <ReviewsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
