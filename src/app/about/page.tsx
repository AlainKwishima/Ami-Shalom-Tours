import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout/footer";
import {
  AboutHero,
  CompanyOverview,
  MissionVisionValues,
  OurStory,
  ExtendedTeam,
  Partnerships,
  AboutTestimonials,
} from "@/components/about";

export const metadata = {
  title: "About Us",
  description: "Learn about Ami Shalom Tours - our mission, vision, values, team, and commitment to creating unforgettable travel experiences in Rwanda and East Africa.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHero />
      <CompanyOverview />
      <MissionVisionValues />
      <OurStory />
      <ExtendedTeam />
      <Partnerships />
      <AboutTestimonials />
      <Footer />
    </div>
  );
}

